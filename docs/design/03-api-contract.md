# 03 — API Contract

> REST endpoints + Server Actions + shared types สำหรับ DaoJai

---

## 1. API Design Philosophy

1. **Server Actions first** สำหรับ mutations ภายในแอป (Next.js App Router native)
2. **REST / Route Handlers** สำหรับ:
   - Public / 3rd-party consumption (webhook, LINE LIFF, future B2B)
   - Cacheable GET endpoints (edge cache)
   - Webhooks (payment, LINE)
3. **Shared validation** ด้วย Zod — schema อยู่ใน `packages/types`
4. **Error format** ตาม RFC 7807 (Problem Details)
5. **Versioning**: URL prefix `/api/v1/`

---

## 2. Base Conventions

### 2.1 Request headers

```
Content-Type: application/json
Accept-Language: th | en
Authorization: Bearer <JWT>           # optional (authenticated)
X-Guest-Id: <cookieId>                # optional (guest mode)
X-Timezone: Asia/Bangkok               # optional, default Bangkok
```

### 2.2 Response envelope

**Success**:
```json
{
  "data": { /* payload */ },
  "meta": {
    "requestId": "req_abc123",
    "serverTime": "2026-04-17T08:30:00Z"
  }
}
```

**Error** (RFC 7807 Problem Details):
```json
{
  "type": "https://daojai.com/errors/validation",
  "title": "Validation failed",
  "status": 400,
  "detail": "birthDate is required",
  "instance": "/api/v1/profile",
  "errors": [
    { "field": "birthDate", "code": "required" }
  ]
}
```

### 2.3 Status codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created (new resource) |
| 204 | Success, no content |
| 400 | Validation error |
| 401 | Unauthenticated |
| 403 | Forbidden (premium required, etc) |
| 404 | Not found |
| 409 | Conflict (e.g., already drew daily) |
| 429 | Rate limit |
| 500 | Server error |

### 2.4 Rate limiting

- Guest: 60 req/min per IP
- Logged in: 120 req/min per user
- Specific: drawDaily 1 per day per user, compatibility 10/day free, 50/day premium
- Headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`

---

## 3. Shared Types (packages/types)

```typescript
// ---------------- Enums (mirror Prisma) ----------------
export type ZodiacSign =
  | 'aries' | 'taurus' | 'gemini' | 'cancer'
  | 'leo' | 'virgo' | 'libra' | 'scorpio'
  | 'sagittarius' | 'capricorn' | 'aquarius' | 'pisces';

export type ThaiDay =
  | 'sunday' | 'monday' | 'tuesday'
  | 'wednesday_day' | 'wednesday_night'
  | 'thursday' | 'friday' | 'saturday';

export type ZodiacAnimal =
  | 'rat' | 'ox' | 'tiger' | 'rabbit' | 'dragon' | 'snake'
  | 'horse' | 'goat' | 'monkey' | 'rooster' | 'dog' | 'pig';

export type ReadingType =
  | 'daily_horoscope' | 'tarot_single' | 'tarot_three'
  | 'tarot_celtic' | 'tarot_relationship'
  | 'birth_fortune' | 'compatibility' | 'monthly_deep';

// ---------------- Domain DTOs ----------------

export type BirthProfileDto = {
  birthDate: string;         // ISO "YYYY-MM-DD"
  birthTime?: string;        // "HH:mm"
  birthPlace?: string;
  bornAtNight?: boolean;
  timezone?: string;
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
};

export type BirthProfileComputedDto = BirthProfileDto & {
  sunSign: ZodiacSign;
  thaiDay: ThaiDay;
  zodiacAnimal: ZodiacAnimal;
  lifePathNumber: number;
  moonSign?: ZodiacSign;
  risingSign?: ZodiacSign;
  taksa?: Record<string, string>;
  auspiciousColors: string[];
  forbiddenColors: string[];
  buddhaDay: { name: string; imageUrl: string; mantra: string };
};

export type TarotCardDto = {
  id: string;
  nameEn: string;
  nameTh: string;
  arcana: 'major' | 'minor';
  suit?: 'cups' | 'pentacles' | 'swords' | 'wands';
  number: number;
  imageUrl: string;
  keywordsUp: string[];
  keywordsRev: string[];
};

export type DrawnCardDto = {
  card: TarotCardDto;
  position: number;
  positionLabel?: string;      // "past", "present", "future"
  isReversed: boolean;
  meaning: {
    keywords: string[];
    description: string;
    advice: string;
  };
};

export type DailyHoroscopeDto = {
  sign: ZodiacSign;
  date: string;
  overview: string;
  categories: {
    love:    { score: number; text: string };
    career:  { score: number; text: string };
    money:   { score: number; text: string };
    health:  { score: number; text: string };
    luck:    { score: number; text: string };
  };
  lucky: {
    color: string;
    number: number;
    direction: string;
    time?: string;
  };
  avoid?: string;
  advice: string;
  mantra?: string;
};

export type CompatibilityDto = {
  personA: { name: string; sunSign: ZodiacSign; thaiDay: ThaiDay; animal: ZodiacAnimal; lifePath: number };
  personB: { name: string; sunSign: ZodiacSign; thaiDay: ThaiDay; animal: ZodiacAnimal; lifePath: number };
  relationshipType: 'love' | 'friendship' | 'family' | 'business' | 'colleague';
  overallScore: number;        // 0-100
  tier: 'soulmate' | 'high_match' | 'good_match' | 'mixed' | 'neutral' | 'challenging' | 'tough';
  breakdown: {
    thaiDay: { score: number; weight: number };
    chineseZodiac: { score: number; weight: number };
    westernSun: { score: number; weight: number };
    numerology: { score: number; weight: number };
    moonSign: { score: number; weight: number };
    risingSign: { score: number; weight: number };
  };
  dimensions: {
    emotion: number;
    communication: number;
    physical: number;
    stability: number;
    friendship: number;
  };
  advice: string;
  greenFlags: string[];
  redFlags: string[];
};
```

---

## 4. REST Endpoints

### 4.1 Auth (`/api/v1/auth/*` — NextAuth.js handles most)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/auth/session` | Get current session (NextAuth built-in) |
| POST | `/api/auth/signin/:provider` | google, line, email |
| POST | `/api/auth/signout` | Sign out |
| GET | `/api/auth/providers` | Available providers |

### 4.2 Profile

#### `POST /api/v1/profile` — Create/update birth profile

**Auth**: logged in OR guest (uses guestId)

**Body** (Zod: `BirthProfileCreateSchema`):
```json
{
  "birthDate": "1995-05-24",
  "birthTime": "14:30",
  "bornAtNight": false,
  "birthPlace": "Bangkok",
  "timezone": "Asia/Bangkok",
  "gender": "female"
}
```

**Response 201**:
```json
{
  "data": {
    "profile": { /* BirthProfileComputedDto */ }
  }
}
```

#### `GET /api/v1/profile/me` — Get current profile

**Response 200**: `{ data: { profile: BirthProfileComputedDto } }`

---

### 4.3 Daily Horoscope

#### `GET /api/v1/horoscope/:sign` — Get horoscope

**Path param**: `sign` (lowercase ZodiacSign)
**Query**: `date?=YYYY-MM-DD` (default today), `locale?=th|en`

**Auth**: not required (public, cached)

**Cache**: edge 6 hours, revalidate on publish

**Response 200**:
```json
{
  "data": {
    "horoscope": { /* DailyHoroscopeDto */ }
  }
}
```

#### `GET /api/v1/horoscope` — Get all 12 signs for a date

**Query**: `date?=YYYY-MM-DD`, `locale?=th|en`

**Response 200**:
```json
{
  "data": {
    "horoscopes": [ /* 12 × DailyHoroscopeDto */ ]
  }
}
```

---

### 4.4 Tarot

#### `GET /api/v1/tarot/cards` — List all cards

**Query**: `deckId?` (default "rider-waite-default")

**Response 200**:
```json
{
  "data": {
    "deck": { "id": "rider-waite-default", "name": "...", "cardBackUrl": "..." },
    "cards": [ /* 78 × TarotCardDto */ ]
  }
}
```

#### `GET /api/v1/tarot/cards/:id` — Card detail

**Response 200**: `{ data: { card: TarotCardDetailDto } }` (with full meanings)

#### `GET /api/v1/tarot/decks` — List available decks

**Response 200**: list of decks (marked isPremium, priceThb)

---

### 4.5 Compatibility

#### `GET /api/v1/compatibility/:slug` — Public share view

**Auth**: not required (public by slug)
**Cache**: edge cacheable

**Response 200**:
```json
{
  "data": {
    "compatibility": { /* CompatibilityDto (stripped of sensitive data) */ },
    "shareMeta": {
      "imageUrl": "https://daojai.com/og/compat/abc.png",
      "twitterCard": "summary_large_image"
    }
  }
}
```

---

### 4.6 Webhooks (internal, not for public)

| Path | Description |
|------|-------------|
| `POST /api/webhooks/omise` | Omise payment events (HMAC-signed) |
| `POST /api/webhooks/stripe` | Stripe events (signature verified) |
| `POST /api/webhooks/line` | LINE Messaging API events |
| `POST /api/webhooks/apple-iap` | Apple App Store server notifications |
| `POST /api/webhooks/google-play` | Google Play RTDN |

All webhooks:
- Verify signature
- Idempotent (dedupe by event ID)
- Return 200 quickly, process async (queue)

---

### 4.7 Content generation (internal, admin-only)

#### `POST /api/v1/admin/horoscope/generate` — Admin trigger generation

**Auth**: admin role required

**Body**:
```json
{
  "dateFrom": "2026-04-17",
  "dateTo": "2026-04-23",
  "signs": ["aries"],
  "forceRegenerate": false
}
```

**Response 202**: `{ data: { jobId: "job_123" } }` (async)

#### `GET /api/v1/admin/horoscope/jobs/:jobId` — Job status

---

## 5. Server Actions (preferred for in-app mutations)

Server Actions live in `apps/web/app/actions/*.ts`. Used for UI mutations — direct RPC from React components.

### 5.1 `createBirthProfile`

```typescript
// apps/web/app/actions/profile.ts
'use server';

import { z } from 'zod';
import { BirthProfileCreateSchema } from '@daojai/types';

export async function createBirthProfile(input: z.infer<typeof BirthProfileCreateSchema>) {
  // 1. Parse + validate
  const parsed = BirthProfileCreateSchema.parse(input);

  // 2. Get session (user or guest)
  const { userId, guestId } = await getSessionOrGuest();

  // 3. Compute astrology
  const computed = await computeBirthProfile(parsed);

  // 4. Save
  if (userId) {
    await prisma.birthProfile.upsert({ where: { userId }, ... });
  } else {
    await prisma.guestSession.update({ where: { cookieId: guestId }, data: { birthProfile: computed } });
  }

  // 5. Revalidate paths
  revalidatePath('/dashboard');

  return { success: true, profile: computed };
}
```

### 5.2 `drawDailyCard`

```typescript
export async function drawDailyCard() {
  const { userId, guestId } = await getSessionOrGuest();
  const today = startOfDayInBangkok(new Date());

  // Idempotent: check if already drawn
  const existing = await prisma.reading.findFirst({
    where: {
      OR: [
        { userId, type: 'TAROT_SINGLE', forDate: today },
        { guestId, type: 'TAROT_SINGLE', forDate: today },
      ],
    },
  });
  if (existing) {
    return { reading: serialize(existing), wasAlreadyDrawn: true };
  }

  // Seeded random
  const seedBase = userId ?? guestId!;
  const seed = hashString(`${seedBase}-${format(today, 'yyyy-MM-dd')}`);
  const cardIndex = seed % 78;
  const isReversed = ((seed >> 8) & 1) === 0;

  const card = await prisma.tarotCard.findFirst({ skip: cardIndex, orderBy: { id: 'asc' } });

  const reading = await prisma.reading.create({
    data: {
      userId, guestId,
      type: 'TAROT_SINGLE',
      spreadType: 'SINGLE',
      forDate: today,
      drawnCards: [{ cardId: card!.id, position: 0, isReversed }],
      content: buildTarotContent({ card: card!, isReversed }),
    },
  });

  return { reading: serialize(reading), wasAlreadyDrawn: false };
}
```

### 5.3 `drawThreeCardSpread`

```typescript
export async function drawThreeCardSpread(input: { question?: string }) {
  const { userId, guestId } = await getSessionOrGuest();
  await enforceRateLimit('tarot_three', userId ?? guestId!);

  const deck = await loadDeck();
  const shuffled = shuffleFisherYates(deck, randomSeed());
  const drawn = shuffled.slice(0, 3).map((card, i) => ({
    card,
    position: i,
    positionLabel: ['past', 'present', 'future'][i],
    isReversed: Math.random() < 0.5,
  }));

  const content = await generateTarotSpreadNarrative(drawn, input.question);

  const reading = await prisma.reading.create({
    data: {
      userId, guestId,
      type: 'TAROT_THREE',
      spreadType: 'THREE_CARD',
      drawnCards: drawn.map(d => ({ cardId: d.card.id, position: d.position, isReversed: d.isReversed })),
      question: input.question,
      content,
    },
  });
  return { reading };
}
```

### 5.4 `checkCompatibility`

```typescript
export async function checkCompatibility(input: CompatibilityInputDto) {
  const { userId, guestId } = await getSessionOrGuest();
  await enforceQuota('compatibility', userId ?? guestId!);

  const personA = input.useSelf
    ? await getUserBirthProfile(userId, guestId)
    : input.personA;
  const personB = input.personB;

  // Parallel scoring
  const [thaiDay, chinese, western, numerology, moonSign] = await Promise.all([
    computeThaiDayScore(personA, personB),
    computeChineseZodiacScore(personA, personB),
    computeWesternSunScore(personA, personB),
    computeNumerologyScore(personA, personB),
    personA.birthTime && personB.birthTime
      ? computeMoonScore(personA, personB)
      : null,
  ]);

  const overall = weightedAverage([thaiDay, chinese, western, numerology, moonSign]);
  const dimensions = mapToDimensions({ thaiDay, chinese, western, numerology, moonSign });

  // Generate narrative via LLM (streamed)
  const narrative = await generateCompatibilityNarrative({
    personA, personB, relType: input.relationshipType,
    scores: { thaiDay, chinese, western, numerology, moonSign, overall, dimensions },
  });

  const record = await prisma.compatibility.create({
    data: {
      userId, guestId,
      personAName: personA.name,
      personABirth: personA.birthDate,
      // ... all fields
      overallScore: overall,
      tier: scoreToTier(overall),
      breakdown: { thaiDay, chinese, western, numerology, moonSign },
      dimensions,
      advice: narrative.advice,
      greenFlags: narrative.greenFlags,
      redFlags: narrative.redFlags,
      shareSlug: generateSlug(),
    },
  });

  return record;
}
```

### 5.5 `submitReadingFeedback`

```typescript
export async function submitReadingFeedback(readingId: string, feedback: 'accurate' | 'inaccurate' | 'neutral') {
  const { userId, guestId } = await getSessionOrGuest();
  await prisma.reading.update({
    where: { id: readingId },
    data: { userFeedback: feedback.toUpperCase() as any },
  });
  track('reading.feedback', { readingId, feedback });
  return { success: true };
}
```

### 5.6 `upgradeSubscription`

```typescript
export async function upgradeSubscription(input: { tier: 'shine'; interval: 'monthly' | 'yearly' }) {
  const { userId } = await requireAuth();
  const amount = input.interval === 'yearly' ? 89000 : 9900; // satang

  const checkout = await omise.createCheckoutSession({
    amount,
    currency: 'thb',
    customerId: (await getOmiseCustomerId(userId)),
    metadata: { userId, tier: input.tier, interval: input.interval },
  });

  return { checkoutUrl: checkout.url };
}
```

---

## 6. Validation Schemas (Zod)

```typescript
// packages/types/src/schemas.ts

import { z } from 'zod';

export const BirthProfileCreateSchema = z.object({
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  birthTime: z.string().regex(/^\d{2}:\d{2}$/).optional(),
  bornAtNight: z.boolean().default(false),
  birthPlace: z.string().max(200).optional(),
  timezone: z.string().default('Asia/Bangkok'),
  gender: z.enum(['male','female','other','prefer_not_to_say']).optional(),
});

export const ThreeCardDrawSchema = z.object({
  question: z.string().max(500).optional(),
  category: z.enum(['general', 'love', 'career', 'money', 'health']).default('general'),
});

export const CompatibilityInputSchema = z.object({
  useSelf: z.boolean().default(true),
  personA: z.object({
    name: z.string().min(1).max(50),
    birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    birthTime: z.string().regex(/^\d{2}:\d{2}$/).optional(),
  }).optional(),
  personB: z.object({
    name: z.string().min(1).max(50),
    birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    birthTime: z.string().regex(/^\d{2}:\d{2}$/).optional(),
  }),
  relationshipType: z.enum(['love','friendship','family','business','colleague']),
});
```

---

## 7. Error Codes

```
AUTH_REQUIRED            — endpoint needs auth
PREMIUM_REQUIRED         — feature locked to subscribers
RATE_LIMITED             — too many requests
QUOTA_EXCEEDED           — daily quota for this feature
ALREADY_PERFORMED        — idempotent conflict (e.g., drew today)
PROFILE_NOT_SETUP        — user needs birth profile first
INVALID_INPUT            — validation failed
CONTENT_GENERATING       — content still being generated, retry in X sec
PAYMENT_FAILED           — payment provider error
```

---

## 8. OpenAPI Spec (future)

สร้าง `openapi.yaml` ทีหลัง สำหรับ:
- Public API documentation
- Generating API clients (TypeScript, Python, Postman collection)
- เปิดใช้ GPT tools / external integrations

---

## 9. Testing

### 9.1 Contract tests

- `packages/types` ทุก DTO ต้องมี Zod schema + `satisfies` test
- Request/response snapshot tests ใน Route Handlers

### 9.2 API integration tests

- Vitest + msw (mock Prisma, LLM, payment)
- ทุก endpoint mint test case: happy + validation fail + unauthorized + rate limited

### 9.3 Load tests (Phase 2)

- k6 / Artillery
- Target: 1000 req/s burst on daily horoscope endpoint

---

## 10. Example End-to-End Flow

### Flow: Guest opens app → reads horoscope → signs up

```
1. GET /api/auth/session                    → null (guest)
2. Cookie set: guestId=abc123 (HttpOnly, 30d)
3. POST /api/v1/profile                     → compute + store in GuestSession.birthProfile
   Body: { birthDate: "1995-05-24" }
   Response: { data: { profile: { sunSign: "gemini", ... } } }
4. GET /api/v1/horoscope/gemini             → 200 (edge cached)
5. drawDailyCard() (server action)          → create Reading with guestId
6. User clicks "Save my reading" → prompts signup
7. POST /api/auth/signin/google             → NextAuth handles
8. Server: detect guestId cookie → migrate GuestSession → User
   • Update Reading.guestId → Reading.userId
   • Create BirthProfile from GuestSession.birthProfile
   • Delete GuestSession
9. Redirect → /dashboard
```

---

## 11. API Versioning Policy

- **MAJOR** version in URL (`/api/v1`, `/api/v2`): breaking changes
- **Additive changes** (new field, new endpoint): same version
- **Deprecation** ย้อนมาอีก 6 เดือน before remove
- Header `X-API-Version` แสดง exact version ที่ server ใช้

---

_Last updated: 2026-04-17_ — Next: [04-auth-and-session.md](./04-auth-and-session.md)
