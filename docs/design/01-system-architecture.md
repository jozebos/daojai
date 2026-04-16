# 01 — System Architecture

> Architecture overview, tech stack, infrastructure & scalability สำหรับ DaoJai

---

## 1. Architecture Overview

### 1.1 High-level diagram

```
┌──────────────────────────────────────────────────────┐
│                     Client Layer                     │
│  ┌─────────┐  ┌─────────┐  ┌──────────────────┐      │
│  │   Web   │  │   PWA   │  │  LINE LIFF App   │      │
│  │ Browser │  │ Install │  │  (in LINE chat)  │      │
│  └────┬────┘  └────┬────┘  └────────┬─────────┘      │
└───────┼────────────┼────────────────┼────────────────┘
        │            │                │
        └────────────┴────────────────┘
                     │ HTTPS
┌────────────────────▼─────────────────────────────────┐
│               Edge / CDN Layer                       │
│  Vercel Edge Network (static assets, ISR)            │
│  Cloudflare (optional DDoS/WAF)                      │
└────────────────────┬─────────────────────────────────┘
                     │
┌────────────────────▼─────────────────────────────────┐
│                Application Layer                     │
│  Next.js 14 (App Router) on Vercel                   │
│  ┌────────────────────────────────────────────┐      │
│  │  React Server Components (SSR/ISR)         │      │
│  │  Server Actions (mutations)                │      │
│  │  Route Handlers /api/* (public API)        │      │
│  │  Middleware (auth, rate limit, i18n)       │      │
│  └────────────────────────────────────────────┘      │
└────┬──────────────┬──────────────┬───────────────────┘
     │              │              │
     │              │              │
┌────▼────┐  ┌──────▼─────┐  ┌─────▼────────────────┐
│ Postgres│  │   Redis    │  │   External Services  │
│ Prisma  │  │ (Upstash)  │  │                      │
│  ORM    │  │  - cache   │  │ • LINE Messaging API │
│         │  │  - session │  │ • OpenAI (content)   │
│ Neon /  │  │  - queue   │  │ • Omise (payment)    │
│ Supabase│  │            │  │ • Resend (email)     │
│ / Prisma│  │            │  │ • PostHog (analytics)│
│ Postgres│  │            │  │ • Cloudflare Images  │
└─────────┘  └────────────┘  │ • S3/R2 (deck images)│
                             │ • Sentry (errors)    │
                             └──────────────────────┘
```

### 1.2 Architectural principles

1. **Monolith-first**: เริ่มด้วย Next.js monorepo — แยก microservice ตอน scale จริง
2. **Serverless-native**: ใช้ Vercel functions + edge — ไม่มี long-running server ช่วงแรก
3. **Cache-heavy**: daily horoscope เดียวกันทั้งวัน → cache aggressive
4. **Edge-first for read, regional for write**: static content จาก edge, DB write ไป region ไทย/สิงคโปร์
5. **Content-layer separation**: content = data ใน DB (editable โดย editor) ไม่ใช่ hardcode

---

## 2. Tech Stack Decisions

### 2.1 Frontend

| Category | Choice | Why |
|----------|--------|-----|
| Framework | **Next.js 14 App Router** | RSC + Server Actions, SEO ดี, ISR built-in |
| Language | **TypeScript (strict)** | Type safety across stack |
| Styling | **Tailwind CSS + shadcn/ui** | DX ดี, ประกอบได้, customize สีได้ง่าย |
| State (client) | **Zustand + TanStack Query** | Simple global state + server cache |
| Animation | **Framer Motion + Lottie** | Page transitions + ไพ่ flip, ดาวหมุน |
| Forms | **React Hook Form + Zod** | Standard stack, validation พร้อม infer type |
| Icons | **Lucide + custom SVG** | consistent + บาง icon ดวงต้องทำเอง |
| Dates | **date-fns + date-fns-tz** | Bangkok timezone + Thai locale |
| i18n | **next-intl** | Thai primary, English Phase 4 |

### 2.2 Backend

| Category | Choice | Why |
|----------|--------|-----|
| API | **Next.js Route Handlers + Server Actions** | ไม่ต้องแยก backend ช่วงแรก |
| Validation | **Zod** | shared schemas FE/BE |
| ORM | **Prisma** | Type-safe + migration tool + Prisma Postgres support |
| DB | **PostgreSQL** (Neon / Prisma Postgres) | Serverless Postgres, cost-effective |
| Cache/Queue | **Upstash Redis** | Serverless Redis, fit Vercel |
| Auth | **NextAuth.js v5 (Auth.js)** | Google, LINE, Email, Credentials |
| Payment | **Omise (TH) + Stripe (intl)** | Omise: TH-native, PromptPay; Stripe: global |
| Push | **Web Push API + LINE Notify** | ครอบคลุม iOS/Android/desktop |
| LLM | **OpenAI GPT-4o / Claude** | content generation pipeline |
| Search | **Postgres FTS** (เริ่ม) → Meilisearch (ถ้าโต) | journal search, content search |

### 2.3 Infrastructure

| Category | Choice | Alternative |
|----------|--------|-----|
| Hosting | **Vercel** | Railway, Cloudflare Pages |
| DB hosting | **Prisma Postgres** or **Neon** | Supabase, Railway Postgres |
| Image CDN | **Cloudflare Images** or **Cloudinary** | Vercel Image (เริ่ม) |
| Object storage | **Cloudflare R2** | S3 |
| Email | **Resend** | Postmark |
| SMS | **Twilio** (หรือ AWS SNS) | ถ้าใช้ ไม่บังคับ |
| Monitoring | **Sentry + PostHog + Vercel Analytics** | — |
| CI/CD | **Vercel auto-deploy** + **GitHub Actions** | preview deployments branch |

### 2.4 Dev Tooling

- **Package manager**: pnpm (monorepo-ready)
- **Monorepo**: Turborepo (เพื่อจัด apps/web, apps/admin, packages/shared)
- **Linting**: Biome หรือ ESLint + Prettier
- **Testing**: Vitest (unit) + Playwright (E2E) + Storybook (component)
- **Commit hooks**: Husky + lint-staged + Commitlint

---

## 3. Repository Structure (Proposed)

```
daojai/
├── apps/
│   ├── web/                  # Main user-facing Next.js app
│   │   ├── app/              # App Router
│   │   │   ├── (marketing)/  # landing, about, pricing
│   │   │   ├── (app)/        # authenticated app
│   │   │   ├── api/          # route handlers
│   │   │   └── layout.tsx
│   │   ├── components/
│   │   ├── lib/
│   │   └── ...
│   └── admin/                # (Phase 2) CMS สำหรับ editor
│
├── packages/
│   ├── db/                   # Prisma schema + client
│   ├── ui/                   # Shared shadcn-based components
│   ├── astrology/            # Business logic: sun sign, taksa, tarot
│   ├── content/              # Content generation + templates
│   ├── config/               # Env + runtime config
│   └── types/                # Shared TS types
│
├── docs/                     # ← this folder
│   ├── research/
│   ├── design/
│   └── product/
│
├── content/                  # Seed content (markdown/json)
│   ├── tarot/
│   ├── horoscope/
│   └── compatibility/
│
├── .github/
│   └── workflows/
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

---

## 4. Data Flow Patterns

### 4.1 Daily Horoscope (Read-heavy, cacheable)

```
User opens /horoscope/leo
    ↓
Next.js RSC checks cache (Redis: "horoscope:leo:2026-04-17")
    ↓ (miss)
Query DB: DailyHoroscope where sign=leo, date=2026-04-17
    ↓ (not yet generated)
Trigger: content generation pipeline
    ↓
Save to DB + cache
    ↓
Return HTML (ISR revalidate: 6 hours)
```

**Cache strategy**:
- Vercel Edge cache: 24 hours per locale + sign
- Redis: 12 hours key
- Browser cache: 1 hour
- Background regeneration: 00:00 Bangkok time ทุกวัน

### 4.2 Tarot Daily Card (Deterministic per user per day)

```
User logged in → tap "Today's Card"
    ↓
Server Action: drawDailyCard(userId, date)
    ↓
Check DB: Reading where userId=X, type=TAROT_1, date=today
    ↓ (not yet drawn)
seed = hash(userId + date)
cardIndex = seed % 78
card = TAROT_CARDS[cardIndex]
isReversed = (seed >> 8) % 2 === 0
    ↓
Save Reading record
    ↓
Return { card, orientation, meaning }
```

**Guest mode**: same logic but seed = hash(sessionId + date) stored in cookie

### 4.3 Compatibility Check (Compute-heavy, one-off)

```
User submits form → Server Action: checkCompat(personA, personB)
    ↓
Compute 5 scores in parallel:
  - thaiDayScore = lookup(dayA, dayB) in compatibility matrix
  - chineseScore = computeTrine(animalA, animalB)
  - westernScore = computeAspects(sunA, sunB)
  - numerologyScore = lookup(pathA, pathB)
  - moonScore = computeMoon(if time provided)
    ↓
Weighted sum → overall score
    ↓
LLM call: generateAdvice(scores, context) — async
    ↓
Save Compatibility record
    ↓
Return scores immediately, stream advice
```

---

## 5. Security & Privacy

### 5.1 Authentication

- **Guest session**: HttpOnly cookie, 30-day sliding expiration, no PII
- **Logged-in session**: NextAuth.js JWT → HttpOnly secure cookie
- **CSRF**: Next.js built-in + SameSite=Lax cookies
- **Rate limit**: Upstash Ratelimit, per IP + per userId

### 5.2 Data privacy (PDPA compliance)

- **Sensitive data**: วันเดือนปีเกิด + เวลา + สถานที่เกิด + ชื่อ = sensitive
- **Encryption at rest**: Postgres column encryption for birthTime (AES-256)
- **Right to deletion**: account delete flow → purge cascade 30 วัน
- **Data export**: JSON download ของ user data
- **Consent**: ถามเฉพาะข้อมูลที่จำเป็น + explicit opt-in

### 5.3 Content safety

- **Reading content filter**: block Cards ที่ generate คำ harmful (LLM safety layer)
- **Ethical disclaimer**: ทุกหน้า reading มี "สำหรับความบันเทิงและสะท้อนตัวเอง"
- **Health warning**: ถ้า user พูดเรื่องฆ่าตัวตาย → redirect สู่สายด่วนสุขภาพจิต 1323

### 5.4 Infra security

- **Secrets**: Vercel environment variables (never git commit)
- **DB connection**: TLS required, IP allowlist
- **Webhooks**: signed (HMAC) for Omise/Stripe/LINE
- **Dependencies**: weekly dependabot + snyk scan

---

## 6. Performance Targets

### 6.1 Core Web Vitals

| Metric | Target | Stretch |
|--------|--------|---------|
| LCP (Largest Contentful Paint) | < 2.5s | < 1.8s |
| INP (Interaction to Next Paint) | < 200ms | < 100ms |
| CLS (Cumulative Layout Shift) | < 0.1 | < 0.05 |
| TTFB (Time to First Byte) | < 600ms | < 300ms |

### 6.2 Optimization tactics

- **RSC + streaming** — skeleton immediately, hydrate progressively
- **next/image** — WebP/AVIF, responsive sizes
- **Tarot deck images**: 78 × 200KB (webp) = ~15MB total, preload top 10
- **Font**: `next/font/google` + subset for Thai
- **JS bundle**: < 100KB gzipped ต่อ route
- **Edge ISR** สำหรับ daily horoscope pages

### 6.3 Scalability limits (initial plan)

- Vercel Hobby → Pro เมื่อ > 100K visits/month
- Neon free tier → Scale เมื่อ > 10GB storage หรือ > 100 DB connections
- Upstash free → Pay-as-you-go เมื่อ > 10K commands/day

---

## 7. Observability

### 7.1 Monitoring stack

- **Sentry** — JS/server errors + performance
- **PostHog** — product analytics + session replay + feature flags
- **Vercel Analytics** — web vitals + traffic
- **Uptime** — Better Stack หรือ Vercel Monitoring
- **Logs** — Vercel Logs + Axiom (structured)

### 7.2 Key events to track

```typescript
// Product events
track('reading.viewed',     { type, sign, cardId })
track('reading.shared',     { platform, readingId })
track('tarot.shuffle',      { spreadType })
track('tarot.revealed',     { cardId, isReversed })
track('compatibility.check',{ score, relType })
track('streak.updated',     { days })

// User events  
track('signup.started',     { provider })
track('signup.completed',   { provider })
track('subscription.upgrade',{ tier })
track('subscription.cancel',{ reason })
```

### 7.3 Alerting

- Sentry error rate > 1% → Slack
- API p95 latency > 1s → Slack
- DB connection > 80% → Slack
- Payment webhook failure → Slack + email oncall

---

## 8. Deployment Strategy

### 8.1 Environments

| Env | URL | Purpose |
|-----|-----|---------|
| Production | https://daojai.com | live users |
| Staging | https://staging.daojai.com | internal QA |
| Preview | https://pr-{N}.daojai.vercel.app | per-PR auto preview |
| Local | http://localhost:3000 | dev |

### 8.2 Migrations

- **Prisma Migrate** — checked into repo
- Run on deploy via GitHub Actions (prod) / Vercel build command
- Expand-contract pattern for non-breaking migrations

### 8.3 Feature flags

- **PostHog feature flags** — gradual rollout
- Examples: `premium-subscription`, `live-reader-marketplace`, `ai-advice`

---

## 9. Cost Estimate (Year 1, MVP)

### 9.1 Monthly cost at launch (0–1K users)

| Service | Plan | Monthly |
|---------|------|---------|
| Vercel | Hobby (free) | ฿0 |
| Prisma Postgres / Neon | Free tier | ฿0 |
| Upstash Redis | Free tier | ฿0 |
| Domain | daojai.com | ~฿40 |
| Cloudflare Images | Free tier | ฿0 |
| Resend | Free 3K emails/mo | ฿0 |
| OpenAI API | ~100 calls/day | ~฿300 |
| PostHog | Free 1M events/mo | ฿0 |
| Sentry | Free 5K errors/mo | ฿0 |
| **Total** | | **~฿340** |

### 9.2 At 50K MAU

| Service | Plan | Monthly |
|---------|------|---------|
| Vercel Pro | ~$20/seat × 2 = $40 | ~฿1,400 |
| Neon Scale | ~$19 | ~฿680 |
| Upstash Redis | pay-as-you-go | ~฿500 |
| Cloudflare Images | ~$5-20 | ~฿700 |
| Resend | ~฿700 |
| OpenAI | ~฿8,000 (daily gen + compat advice) |
| PostHog | Free tier | ฿0 |
| **Total** | | **~฿12,000/เดือน** |

### 9.3 ROI

- ที่ 50K MAU, conservative MRR ~฿762K (จาก research 06)
- Gross margin = (762K - 12K) / 762K ≈ **98%**
- มาก เพราะ fixed cost ต่ำ + high-margin subscription

---

## 10. Scalability Plan

### 10.1 Phase 1 (< 10K MAU)

- Monolith Next.js
- Single Postgres instance
- No separate workers

### 10.2 Phase 2 (10K–100K MAU)

- Introduce Inngest / Trigger.dev for **async jobs** (daily content gen, push notifications)
- Redis caching layer aggressive
- DB read replica (if needed)

### 10.3 Phase 3 (> 100K MAU)

- Separate services:
  - `content-service` (AI pipeline)
  - `notification-service`
  - `payment-service`
- Dedicated Postgres + connection pool (PgBouncer)
- CDN expansion (Cloudflare for Asia edge)

---

## 11. Open Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|-----------|
| OpenAI API rate limit / downtime | Medium | High | Fallback to Claude; cache generated content |
| LINE API TOS change | Low | Medium | Abstract behind adapter interface |
| Vercel pricing change | Low | Medium | Portable (Dockerfile as backup) |
| PDPA violation | Low | Very High | Legal review + consent flow |
| Content hallucination (harmful) | Medium | High | LLM safety layer + human review |
| Traffic spike (viral TikTok) | Medium | Low | Serverless = auto-scale |

---

## 12. Decision Log

| # | Decision | Date | Reason |
|---|----------|------|--------|
| 1 | Next.js 14 monolith | 2026-04-17 | fastest to MVP, stays fine to 100K users |
| 2 | Prisma + Postgres | 2026-04-17 | TypeScript native, strong migration story |
| 3 | Guest mode enabled | 2026-04-17 | lower activation friction |
| 4 | PWA before native | 2026-04-17 | save dev cost, TH Android friendly |
| 5 | Thai only at launch | 2026-04-17 | focus, English phase 4 |
| 6 | Hybrid AI+human content | 2026-04-17 | balance cost + quality |
| 7 | Vercel hosting | 2026-04-17 | DX + TH latency acceptable |

---

_Last updated: 2026-04-17_ — Next: [02-db-schema.md](./02-db-schema.md)
