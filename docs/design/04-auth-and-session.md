# 04 — Auth & Session

> Authentication flow, guest mode, session management, PDPA compliance

---

## 1. Auth Strategy Overview

DaoJai ใช้ **dual-track session**:

1. **Guest session** (no account) — cookie-based, 30 วัน, no PII beyond birthday
2. **User session** (account) — NextAuth.js JWT, multi-provider

**Goal**: ลด friction ให้ user ลองก่อน signup หลัง (Co-Star-style onboarding)

---

## 2. Providers Support

### 2.1 Priority order

| Provider | Priority | Target user | Why |
|----------|----------|-------------|-----|
| **Google** | P0 | all users | ubiquitous, easy |
| **LINE Login** | P0 | TH users (80%+ penetration) | native TH channel |
| **Email magic link** | P1 | privacy-conscious | NextAuth EmailProvider |
| Apple Sign-in | P2 | iOS users | required if iOS native |
| Facebook | P3 | older demographic | skip unless needed |
| Credentials (password) | P3 | — | avoid if possible |

### 2.2 LINE Login setup

- Register at [LINE Developers Console](https://developers.line.biz/console/)
- Channel type: **LINE Login**
- Scopes: `profile`, `openid`, `email`
- Callback URL: `https://daojai.com/api/auth/callback/line`

```typescript
// packages/auth/providers/line.ts
import type { OAuthConfig } from 'next-auth/providers/oauth';

export function LineProvider(options: { clientId: string; clientSecret: string }): OAuthConfig<LineProfile> {
  return {
    id: 'line',
    name: 'LINE',
    type: 'oauth',
    authorization: {
      url: 'https://access.line.me/oauth2/v2.1/authorize',
      params: { scope: 'profile openid email' },
    },
    token: 'https://api.line.me/oauth2/v2.1/token',
    userinfo: 'https://api.line.me/v2/profile',
    idToken: true,
    checks: ['state', 'pkce'],
    profile(p) {
      return {
        id: p.userId,
        name: p.displayName,
        email: p.email ?? null,
        image: p.pictureUrl,
      };
    },
    clientId: options.clientId,
    clientSecret: options.clientSecret,
  };
}
```

---

## 3. NextAuth.js Configuration

`apps/web/lib/auth.ts`:

```typescript
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { LineProvider } from '@daojai/auth/providers/line';
import { prisma } from '@daojai/db';
import { migrateGuestToUser } from '@/lib/guest';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    LineProvider({
      clientId: process.env.AUTH_LINE_ID!,
      clientSecret: process.env.AUTH_LINE_SECRET!,
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER!,
      from: 'DaoJai <hello@daojai.com>',
    }),
  ],
  pages: {
    signIn: '/sign-in',
    error: '/sign-in/error',
    verifyRequest: '/sign-in/verify-request',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // Can add additional logic here (e.g., block certain emails)
      return true;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.tier = token.tier as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.tier = await fetchUserTier(user.id);
      }
      return token;
    },
  },
  events: {
    async signIn({ user, isNewUser }) {
      if (isNewUser) {
        // Migrate guest → user
        await migrateGuestToUser(user.id);
        track('signup.completed', { userId: user.id });
      }
    },
  },
});
```

---

## 4. Guest Session Mechanics

### 4.1 Cookie spec

| Field | Value |
|-------|-------|
| Name | `daojai_guest` |
| Value | `cookieId` (32-char random) |
| HttpOnly | `true` |
| Secure | `true` (prod) |
| SameSite | `Lax` |
| Max-Age | `2592000` (30 days) |
| Path | `/` |

### 4.2 Flow

```
Request comes in
   ↓
Middleware reads cookie
   ↓
If cookie present → find GuestSession by cookieId
   If found → use (extend expiration)
   If not found → create new GuestSession, re-set cookie
If no cookie → create GuestSession + set cookie
   ↓
Proceed with request (userId from auth() OR guestId from cookie)
```

### 4.3 Helper function

```typescript
// lib/session.ts
import { auth } from '@/lib/auth';
import { cookies } from 'next/headers';
import { nanoid } from 'nanoid';
import { prisma } from '@daojai/db';

export async function getSessionOrGuest(): Promise<
  | { userId: string; guestId: null }
  | { userId: null; guestId: string }
> {
  const session = await auth();
  if (session?.user?.id) {
    return { userId: session.user.id, guestId: null };
  }

  const cookieStore = cookies();
  let cookieId = cookieStore.get('daojai_guest')?.value;

  if (!cookieId) {
    cookieId = nanoid(32);
    cookieStore.set('daojai_guest', cookieId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    });
    await prisma.guestSession.create({
      data: {
        cookieId,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      },
    });
  } else {
    // Extend expiration if exists
    await prisma.guestSession.updateMany({
      where: { cookieId },
      data: { lastActive: new Date() },
    });
  }

  return { userId: null, guestId: cookieId };
}
```

### 4.4 Middleware

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Ensure guest cookie exists on ALL public routes (idempotent)
  if (!req.cookies.get('daojai_guest') && !req.nextUrl.pathname.startsWith('/api/')) {
    // Let server actions set it lazily to avoid DB calls in middleware
  }

  // Rate limiting, i18n, etc

  return res;
}

export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico).*)'],
};
```

---

## 5. Guest → User Migration

เมื่อ guest user sign up → ต้อง merge data เข้า new User account

```typescript
// lib/guest.ts
export async function migrateGuestToUser(userId: string) {
  const cookieId = (await cookies()).get('daojai_guest')?.value;
  if (!cookieId) return;

  const guest = await prisma.guestSession.findUnique({ where: { cookieId } });
  if (!guest) return;

  await prisma.$transaction(async (tx) => {
    // 1. Create birth profile from guest data
    if (guest.birthProfile) {
      await tx.birthProfile.upsert({
        where: { userId },
        create: { userId, ...parseBirthProfile(guest.birthProfile) },
        update: { /* optional: merge if already exists */ },
      });
    }

    // 2. Transfer readings
    await tx.reading.updateMany({
      where: { guestId: cookieId },
      data: { userId, guestId: null },
    });

    // 3. Transfer compatibilities
    await tx.compatibility.updateMany({
      where: { guestId: cookieId },
      data: { userId, guestId: null },
    });

    // 4. Mark guest session converted
    await tx.guestSession.update({
      where: { cookieId },
      data: { convertedUserId: userId, expiresAt: new Date() },
    });
  });

  // Clear guest cookie
  (await cookies()).delete('daojai_guest');
  track('guest.migrated', { userId });
}
```

**Edge case**: user had profile before + guest had profile →
- Prefer user's existing profile (don't overwrite)
- But migrate readings/compatibilities (no conflict)

---

## 6. Session Refresh / Rotation

- JWT session: 30 วัน default
- Rotating refresh strategy: update `iat` (issued at) every request → sliding expiration
- On sensitive ops (change password, delete account) → require re-auth within 5 minutes

---

## 7. Authorization / Permissions

### 7.1 Roles

```typescript
type UserRole = 'user' | 'editor' | 'admin' | 'reader_partner';
```

- **user** — default
- **editor** — can publish content (admin panel)
- **admin** — full system access
- **reader_partner** — live reader marketplace (Phase 3)

### 7.2 Premium tier check

```typescript
async function requirePremium(userId: string) {
  const sub = await prisma.subscription.findFirst({
    where: { userId, status: 'ACTIVE', tier: 'SHINE' },
  });
  if (!sub) throw new ForbiddenError('PREMIUM_REQUIRED');
  return sub;
}
```

### 7.3 Rate limit / quota

```typescript
// Free tier: tarot 3 draws/day, compatibility 1/day
// Shine tier: unlimited
async function enforceQuota(feature: string, subjectId: string) {
  const tier = await getTier(subjectId);
  const limit = QUOTAS[feature][tier];
  if (limit === Infinity) return;

  const count = await getTodayCount(feature, subjectId);
  if (count >= limit) {
    throw new QuotaError('QUOTA_EXCEEDED', { feature, limit });
  }
}
```

---

## 8. PDPA Compliance

### 8.1 Consent flow

ที่ signup + การ set birth profile ต้องขอ consent explicit:

```
☑ ฉันเข้าใจว่า DaoJai เก็บข้อมูลวันเกิด (และเวลาเกิด) เพื่อคำนวณดวง
☑ ฉันยอมรับ นโยบายความเป็นส่วนตัว และ เงื่อนไขการใช้งาน
```

### 8.2 Data subject rights (PDPA ม. 30-33)

| Right | Implementation |
|-------|---------------|
| Access | `/settings/data-export` — JSON download |
| Rectification | `/settings/profile` — edit in place |
| Erasure | `/settings/delete-account` — 7 วัน cooling off + hard delete |
| Portability | JSON export (right 30 days) |
| Restriction | Pause reading history (toggle) |
| Objection | Unsubscribe from emails |

### 8.3 Data minimization

- ไม่เก็บ **รหัสผ่าน** (ใช้ OAuth only + email magic link)
- ไม่เก็บ **IP ในการ analytics** (anonymize)
- เก็บ **birthTime** encrypted ใน DB (AES-256 column encryption)
- Delete log > 90 วัน

### 8.4 Privacy policy page

`/privacy` (ต้องมี):
- ข้อมูลที่เก็บ
- วัตถุประสงค์
- ระยะเวลาเก็บ
- Partner third parties (OpenAI, Vercel, LINE, etc)
- Contact DPO email
- Complaints procedure

---

## 9. Security Considerations

### 9.1 OWASP Top 10 mitigations

| Risk | Mitigation |
|------|-----------|
| A01 Broken access control | auth middleware on every protected route + server-side role check |
| A02 Cryptographic failures | TLS only, encrypted columns for birthTime, secret rotation |
| A03 Injection | Prisma parameterized queries (no raw SQL) |
| A04 Insecure design | threat model reviewed per feature |
| A05 Security misconfiguration | least-privilege DB user, no `.env` in git |
| A07 Auth failures | rate limit sign-in, lockout after 10 failed attempts |
| A09 Security logging | Sentry + Axiom for security events |

### 9.2 Sign-in abuse

- Rate limit sign-in: 5 attempts / 15 min / IP
- Magic link: signed JWT, single-use, expire 10 min
- CAPTCHA (Cloudflare Turnstile) on sign-up if abuse detected

### 9.3 Session hijacking

- JWT signed with strong secret (256-bit), stored HttpOnly + Secure + SameSite=Lax
- Absolute expiration 90 วัน (beyond sliding)
- On password/auth change → invalidate all sessions

### 9.4 Abuse: bot creating fake guest sessions

- Short cookie lifetime if no action taken (7 days if no profile set)
- Cleanup job: delete GuestSession age > 30 วัน + no activity

---

## 10. Email / Magic Link

### 10.1 Template

```
Subject: เข้าสู่ DaoJai ✨ (ลิงก์ใช้ได้ 10 นาที)

สวัสดีค่ะ {name},

คลิกที่ลิงก์ด้านล่างเพื่อเข้าใช้งาน DaoJai:

[เข้าสู่ระบบ] {link}

ถ้าคุณไม่ได้ขอลิงก์นี้ ไม่ต้องทำอะไรค่ะ ลิงก์จะหมดอายุใน 10 นาที

ด้วยรัก,
ทีม DaoJai 🌟
```

### 10.2 Setup (Resend)

```typescript
// packages/auth/email.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendMagicLink(params: { to: string; url: string; name?: string }) {
  await resend.emails.send({
    from: 'DaoJai <hello@daojai.com>',
    to: params.to,
    subject: 'เข้าสู่ DaoJai ✨',
    react: MagicLinkEmail({ url: params.url, name: params.name }),
  });
}
```

---

## 11. Sign-up / Sign-in UI

### 11.1 Screen: `/sign-in`

```
┌────────────────────────────────┐
│                                │
│    ✨ DaoJai                   │
│   เข้าสู่ระบบ เพื่อเก็บดวงของคุณ  │
│                                │
│   [Google]  เข้าด้วย Google    │
│   [LINE ]   เข้าด้วย LINE       │
│                                │
│   ─── หรือ ───                  │
│                                │
│   [email input]                │
│   [ส่งลิงก์เข้าอีเมล]           │
│                                │
│   ผูก นโยบายความเป็นส่วนตัว    │
└────────────────────────────────┘
```

### 11.2 Sign-up CTA placement

- **ไม่บังคับ** signup หน้าแรก — ให้ guest ลองก่อน
- **ขอ signup** ตอนนี้:
  - User กด "เก็บ reading"
  - User กด "เช็คสมพงษ์ครั้งที่ 2"
  - User กด "push notification"
  - User กด "upgrade premium"

### 11.3 Signup copy

> "เก็บดวงของคุณไว้ — ไม่ต้องกรอกใหม่ทุกครั้ง"
>
> [Google] [LINE] [Email]
>
> ✨ ใช้งานได้ฟรี ไม่มีค่าใช้จ่ายซ่อนเร้น

---

## 12. Testing Auth

### 12.1 E2E scenarios (Playwright)

1. Guest creates profile → refreshes → profile persists
2. Guest creates profile → signs up with Google → profile migrated
3. User signs out → signs in again → session restored
4. Sign-in rate limit kicks in after 5 attempts
5. Magic link expires after 10 min
6. Delete account → data gone after 7 days

### 12.2 Security tests

- CSRF: state param checked
- Session fixation: new session ID after sign-in
- XSS in profile name: sanitized (DOMPurify)
- SQL injection: Prisma parameterized

---

## 13. Open Decisions

| Decision | Recommendation |
|----------|---------------|
| Allow passwords? | **No** — OAuth + magic link only (reduce surface) |
| 2FA? | Phase 2 — TOTP for premium users |
| Session duration | 30 days sliding, 90 days absolute |
| Cross-device login | Yes, unlimited sessions |
| Sign in from LINE LIFF? | Yes, skip NextAuth, use LIFF SDK direct |

---

_Last updated: 2026-04-17_ — Next: [05-content-pipeline.md](./05-content-pipeline.md)
