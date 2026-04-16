# 02 — Database Schema (Prisma)

> Full Prisma schema พร้อม rationale สำหรับ DaoJai
> อ้างอิง Prisma best practices + `migration-best-practices` + `schema-conventions`

---

## 1. Design Principles

1. **cuid()** เป็น PK หลัก — URL-safe, sortable, Postgres-friendly
2. **Table naming**: PascalCase singular (`User`, `Reading`) — default Prisma convention
3. **Column naming**: camelCase
4. **Timestamps**: `createdAt`, `updatedAt` ในทุก mutable table
5. **Soft delete** สำหรับ user-generated data (deletedAt) — PDPA compliance
6. **JSONB** สำหรับ content ที่ structure เปลี่ยนบ่อย + reading breakdown
7. **Enum** สำหรับ fixed values (ReadingType, ZodiacSign, SubscriptionTier)
8. **Indexed fields**: foreign keys + query hot paths (userId+date, sign+date)
9. **Relations**: explicit naming, `onDelete: Cascade` เฉพาะ owned data

---

## 2. Schema: `packages/db/prisma/schema.prisma`

```prisma
// --- Prisma client generator ---
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ============================================================
// USERS & AUTH
// ============================================================

model User {
  id            String    @id @default(cuid())
  email         String?   @unique
  emailVerified DateTime?
  name          String?
  displayName   String?
  avatarUrl     String?

  // Auth providers  
  accounts      Account[]
  sessions      Session[]

  // App data
  birthProfile     BirthProfile?
  readings         Reading[]
  compatibilities  Compatibility[]
  journalEntries   JournalEntry[]
  subscriptions    Subscription[]
  pushSubscriptions PushSubscription[]
  streak           UserStreak?

  // Metadata
  locale        String    @default("th")
  timezone      String    @default("Asia/Bangkok")

  // Soft delete for PDPA
  deletedAt     DateTime?

  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  @@index([email])
  @@index([deletedAt])
}

// NextAuth.js tables (simplified)
model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String   // google | line | email
  providerAccountId String
  refresh_token     String?  @db.Text
  access_token      String?  @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?  @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@index([userId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
}

// Guest sessions (no user account yet)
model GuestSession {
  id            String    @id @default(cuid())
  cookieId      String    @unique                 // random uuid set as cookie
  birthProfile  Json?                             // inline { birthDate, sunSign, ... }
  lastActive    DateTime  @default(now())
  convertedUserId String?                         // when guest signs up

  createdAt     DateTime  @default(now())
  expiresAt     DateTime                          // 30 days from creation

  @@index([cookieId])
  @@index([expiresAt])
}

// ============================================================
// BIRTH PROFILE
// ============================================================

model BirthProfile {
  id            String    @id @default(cuid())
  userId        String    @unique
  user          User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  // Core input
  birthDate     DateTime  @db.Date
  birthTime     String?                              // "HH:mm" (optional)
  bornAtNight   Boolean   @default(false)
  birthPlace    String?                              // "Bangkok, Thailand"
  birthLat      Float?
  birthLng      Float?
  timezone      String    @default("Asia/Bangkok")
  gender        Gender?

  // Computed (cached for performance)
  sunSign         ZodiacSign
  thaiDay         ThaiDay                            // sunday..saturday + wednesday_night
  zodiacAnimal    ZodiacAnimal
  lifePathNumber  Int                                // 1-9 or master 11/22/33
  nameNumber      Int?

  // Western (if birthTime provided)
  moonSign        ZodiacSign?
  risingSign      ZodiacSign?

  // Thai taksa (8 stars by position) — stored as JSON for flexibility
  taksa           Json?                              // { boriwan, ayu, det, sri, moola, utsaha, montri, kalakini }
  auspiciousColors String[]
  forbiddenColors  String[]

  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

// ============================================================
// TAROT CONTENT (editable via admin)
// ============================================================

model TarotCard {
  id            String    @id                         // "major-00", "cups-ace", "wands-king"
  arcana        ArcanaType
  suit          TarotSuit?
  number        Int                                    // 0-21 major, 1-14 minor
  nameEn        String
  nameTh        String
  imageUrl      String
  thumbnailUrl  String?

  // Keywords (short)
  keywordsUp    String[]                               // upright keywords
  keywordsRev   String[]                               // reversed keywords

  // Meanings by category (JSONB for flex)
  // structure: { general: { upright, reversed }, love: {...}, career: {...}, ... }
  meanings      Json

  element       Element?
  astrology     String?                                // "Mars", "Aries"

  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  @@index([arcana])
}

model TarotDeck {
  id            String    @id @default(cuid())
  slug          String    @unique                      // "rider-waite-default", "thai-mythology"
  name          String
  description   String?
  coverUrl      String
  
  isDefault     Boolean   @default(false)
  isPremium     Boolean   @default(false)
  priceThb      Int?                                   // null if free
  
  cardBackUrl   String                                 // image for card-back
  imageBasePath String                                 // prefix for card images
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

// ============================================================
// READINGS (all reading types in one table, discriminated)
// ============================================================

model Reading {
  id            String       @id @default(cuid())
  userId        String?                                // null if guest
  guestId       String?                                // guest session cookieId
  user          User?        @relation(fields: [userId], references: [id], onDelete: Cascade)

  type          ReadingType
  
  // Tarot-specific
  spreadType    TarotSpread?                           // SINGLE, THREE_CARD, CELTIC_CROSS, ...
  deckId        String?                                // which deck used
  drawnCards    Json?                                  // [{ cardId, position, isReversed }]

  // Horoscope-specific
  sign          ZodiacSign?
  forDate       DateTime?    @db.Date

  // User context
  question      String?                                // user-entered question
  category      String?                                // general | love | career | money | health

  // Generated content (cached)
  content       Json                                   // full reading body
  summary       String?                                // short preview

  // User feedback
  userFeedback  ReadingFeedback?                       // accurate | inaccurate | neutral
  savedNote     String?                                // user private note

  // Sharing
  shareSlug     String?      @unique                   // for sharable URL
  shareCount    Int          @default(0)

  createdAt     DateTime     @default(now())

  @@index([userId, createdAt(sort: Desc)])
  @@index([guestId])
  @@index([type, createdAt(sort: Desc)])
  @@index([shareSlug])
  @@index([userId, type, forDate])
}

// ============================================================
// DAILY HOROSCOPE (pre-generated content)
// ============================================================

model DailyHoroscope {
  id            String       @id @default(cuid())
  sign          ZodiacSign
  forDate       DateTime     @db.Date
  locale        String       @default("th")

  // Main content (structured per research/02)
  overview      String
  categories    Json                                  // love/career/money/health/luck with score + text
  lucky         Json                                  // color/number/direction/time
  avoid         String?
  advice        String
  mantra        String?

  // Astrology context (audit trail)
  moonPhase     String?
  majorAspects  Json?

  // Content pipeline
  generatedBy   String                                // "ai-gpt4", "human-editor-{id}"
  reviewedBy    String?
  status        ContentStatus @default(DRAFT)          // DRAFT | PUBLISHED | ARCHIVED

  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt

  @@unique([sign, forDate, locale])
  @@index([forDate, status])
}

// ============================================================
// COMPATIBILITY
// ============================================================

model Compatibility {
  id                String    @id @default(cuid())
  userId            String?                                // null if guest
  guestId           String?
  user              User?     @relation(fields: [userId], references: [id], onDelete: Cascade)

  // Person A (usually self from profile)
  personAName       String
  personABirth      DateTime  @db.Date
  personABirthTime  String?
  personASunSign    ZodiacSign
  personAThaiDay    ThaiDay
  personAAnimal     ZodiacAnimal
  personALifePath   Int

  // Person B
  personBName       String
  personBBirth      DateTime  @db.Date
  personBBirthTime  String?
  personBSunSign    ZodiacSign
  personBThaiDay    ThaiDay
  personBAnimal     ZodiacAnimal
  personBLifePath   Int

  relationshipType  RelationshipType

  // Scores
  overallScore      Int                                   // 0-100
  tier              CompatibilityTier                     // SOULMATE ... TOUGH
  breakdown         Json                                  // 5 system scores
  dimensions        Json                                  // emotion, comm, physical, ...

  // Narrative
  advice            String    @db.Text
  greenFlags        String[]
  redFlags          String[]

  // Sharing
  shareSlug         String?   @unique
  shareCount        Int       @default(0)

  createdAt         DateTime  @default(now())

  @@index([userId, createdAt(sort: Desc)])
  @@index([guestId])
  @@index([shareSlug])
}

// ============================================================
// JOURNAL (premium feature — private user notes)
// ============================================================

model JournalEntry {
  id          String    @id @default(cuid())
  userId      String
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  readingId   String?                                     // link to Reading (optional)
  title       String?
  content     String    @db.Text
  mood        String?                                     // emoji or text
  tags        String[]

  isEncrypted Boolean   @default(false)

  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@index([userId, createdAt(sort: Desc)])
}

// ============================================================
// STREAK & GAMIFICATION
// ============================================================

model UserStreak {
  id            String    @id @default(cuid())
  userId        String    @unique
  user          User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  currentStreak Int       @default(0)
  longestStreak Int       @default(0)
  lastActiveDate DateTime @db.Date

  badges        String[]                                    // e.g., ["7_day", "30_day", "tarot_master"]

  updatedAt     DateTime  @updatedAt
}

// ============================================================
// SUBSCRIPTIONS / PAYMENTS
// ============================================================

model Subscription {
  id                String           @id @default(cuid())
  userId            String
  user              User             @relation(fields: [userId], references: [id], onDelete: Cascade)

  tier              SubscriptionTier                         // FREE | SHINE
  status            SubscriptionStatus                       // ACTIVE | PAST_DUE | CANCELED | EXPIRED
  provider          PaymentProvider                          // OMISE | STRIPE | APPLE | GOOGLE
  providerSubId     String?          @unique                 // ID from provider

  currentPeriodStart DateTime
  currentPeriodEnd   DateTime
  cancelAt           DateTime?
  canceledAt         DateTime?

  priceThb          Int                                      // snapshot pricing at subscribe time
  interval          BillingInterval                          // MONTHLY | YEARLY

  createdAt         DateTime         @default(now())
  updatedAt         DateTime         @updatedAt

  @@index([userId, status])
}

model Transaction {
  id            String            @id @default(cuid())
  userId        String
  type          TransactionType                              // SUBSCRIPTION | IAP | MARKETPLACE
  amountThb     Int
  currency      String            @default("THB")
  status        TransactionStatus                            // PENDING | SUCCEEDED | FAILED | REFUNDED
  provider      PaymentProvider
  providerRef   String?                                       // Omise charge id, Stripe payment_intent
  metadata      Json?

  createdAt     DateTime          @default(now())

  @@index([userId, createdAt(sort: Desc)])
  @@index([providerRef])
}

// ============================================================
// PUSH NOTIFICATIONS
// ============================================================

model PushSubscription {
  id          String    @id @default(cuid())
  userId      String
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  channel     PushChannel                                     // WEB | LINE | EMAIL
  endpoint    String                                          // web push endpoint or LINE userId
  p256dh      String?                                         // web push only
  auth        String?                                         // web push only
  userAgent   String?

  // Preferences
  enabledDaily     Boolean @default(true)
  enabledWeekly    Boolean @default(true)
  enabledReminders Boolean @default(false)

  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@unique([userId, channel, endpoint])
  @@index([userId])
}

// ============================================================
// FEATURE FLAGS / CONTENT EXPERIMENTS (optional, future)
// ============================================================

model FeatureFlag {
  id          String    @id @default(cuid())
  key         String    @unique
  enabled     Boolean   @default(false)
  rolloutPct  Int       @default(0)                           // 0-100
  description String?
  updatedAt   DateTime  @updatedAt
}

// ============================================================
// ENUMS
// ============================================================

enum Gender {
  MALE
  FEMALE
  OTHER
  PREFER_NOT_TO_SAY
}

enum ZodiacSign {
  ARIES
  TAURUS
  GEMINI
  CANCER
  LEO
  VIRGO
  LIBRA
  SCORPIO
  SAGITTARIUS
  CAPRICORN
  AQUARIUS
  PISCES
}

enum ZodiacAnimal {
  RAT
  OX
  TIGER
  RABBIT
  DRAGON
  SNAKE
  HORSE
  GOAT
  MONKEY
  ROOSTER
  DOG
  PIG
}

enum ThaiDay {
  SUNDAY
  MONDAY
  TUESDAY
  WEDNESDAY_DAY
  WEDNESDAY_NIGHT
  THURSDAY
  FRIDAY
  SATURDAY
}

enum ArcanaType {
  MAJOR
  MINOR
}

enum TarotSuit {
  CUPS
  PENTACLES
  SWORDS
  WANDS
}

enum TarotSpread {
  SINGLE
  THREE_CARD
  FIVE_CARD
  CELTIC_CROSS
  RELATIONSHIP
  HORSESHOE
}

enum Element {
  FIRE
  EARTH
  AIR
  WATER
}

enum ReadingType {
  DAILY_HOROSCOPE
  TAROT_SINGLE
  TAROT_THREE
  TAROT_CELTIC
  TAROT_RELATIONSHIP
  BIRTH_FORTUNE
  COMPATIBILITY
  MONTHLY_DEEP
}

enum ReadingFeedback {
  ACCURATE
  INACCURATE
  NEUTRAL
}

enum ContentStatus {
  DRAFT
  REVIEW
  PUBLISHED
  ARCHIVED
}

enum RelationshipType {
  LOVE
  FRIENDSHIP
  FAMILY
  BUSINESS
  COLLEAGUE
}

enum CompatibilityTier {
  SOULMATE
  HIGH_MATCH
  GOOD_MATCH
  MIXED
  NEUTRAL
  CHALLENGING
  TOUGH
}

enum SubscriptionTier {
  FREE
  SHINE            // DaoJai premium
}

enum SubscriptionStatus {
  ACTIVE
  PAST_DUE
  CANCELED
  EXPIRED
  TRIALING
}

enum PaymentProvider {
  OMISE
  STRIPE
  APPLE_IAP
  GOOGLE_PLAY
  PROMPTPAY
  TRUEMONEY
}

enum BillingInterval {
  MONTHLY
  YEARLY
}

enum TransactionType {
  SUBSCRIPTION
  IAP
  MARKETPLACE
  REFUND
}

enum TransactionStatus {
  PENDING
  SUCCEEDED
  FAILED
  REFUNDED
}

enum PushChannel {
  WEB
  LINE
  EMAIL
}
```

---

## 3. Rationale: เหตุผลการออกแบบสำคัญ

### 3.1 ทำไมรวม Reading เป็น single table (discriminated union)

**Alternative**: แยก `TarotReading`, `DailyReading`, `BirthReading` คนละ table
**เลือก**: single `Reading` table with `type` enum

**เหตุผล**:
- Queries ประเภท "ประวัติ reading ทั้งหมดของ user" ง่ายกว่า (single query)
- Share link, feedback, bookmark — uniform schema
- JSONB ใน `content` ให้ flexibility ต่อ type
- ใช้ discriminated TS union ที่ app layer สำหรับ type safety

### 3.2 ทำไม DailyHoroscope แยกจาก Reading

- DailyHoroscope คือ **content library** (12 × 365 = 4,380 entries/year) ที่ share กับทุก user
- Reading คือ **instance ของ user การใช้งาน** (user A เปิดดู horoscope วันนี้ = 1 Reading record)
- แยกช่วยให้ update content ได้โดยไม่กระทบ reading history

### 3.3 Guest mode via GuestSession

- เก็บ cookieId ใน HttpOnly cookie (30 วัน)
- Birth profile เก็บเป็น JSON inline (ไม่ต้อง FK ซับซ้อน)
- ถ้า user signup ภายหลัง → migrate guest data → ลบ GuestSession
- Reading/Compatibility ของ guest ใช้ `guestId` แทน `userId`

### 3.4 Taksa stored as JSON

- ทักษา 8 ตำแหน่ง × 8 ดาว = 64 combinations
- เก็บเป็น JSON structured: `{ boriwan: "jupiter", ayu: "sun", ... }`
- Simpler than normalized (ไม่ค่อยถูก query ด้วย SQL)

### 3.5 Soft delete (deletedAt)

- User delete = mark `deletedAt` + hard delete 30 วันหลัง (PDPA)
- Queries default filter out deleted
- Compliance-safe + recoverable for accidental deletion

---

## 4. Indexing Strategy

### 4.1 Primary indexes (critical query paths)

| Table | Index | Query use case |
|-------|-------|----------------|
| `Reading` | `(userId, createdAt DESC)` | list user's readings |
| `Reading` | `(userId, type, forDate)` | check "did user already draw daily today" |
| `Reading` | `(guestId)` | guest-mode readings |
| `DailyHoroscope` | `(sign, forDate, locale)` unique | fetch today's horoscope for sign |
| `DailyHoroscope` | `(forDate, status)` | bulk ops on date |
| `Compatibility` | `(userId, createdAt DESC)` | list compat checks |
| `Subscription` | `(userId, status)` | check active subscription |
| `Transaction` | `(userId, createdAt DESC)` | transaction history |
| `TarotCard` | `(arcana)` | filter by major/minor |

### 4.2 Future: composite indexes

- Journal search: `GIN(to_tsvector('thai', content))` — Postgres full-text Thai (via pgroonga extension หรือ custom config)

---

## 5. Data Volume Estimates

| Table | Year 1 (50K MAU) | Year 3 (500K MAU) |
|-------|------------------|-------------------|
| `User` | 50K | 500K |
| `Reading` (~5/user/mo) | 3M | 30M |
| `DailyHoroscope` | ~4.4K | ~13K (static) |
| `Compatibility` | ~100K | ~1M |
| `TarotCard` | 78 × decks | ~300 total |
| `Transaction` | ~30K | ~300K |

**Storage estimate Year 1**: ~2-5 GB
**Storage estimate Year 3**: ~30-50 GB

→ Postgres comfortably handles. Partition `Reading` by `createdAt` monthly เมื่อ > 100M rows

---

## 6. Migration Strategy

### 6.1 Initial migration

```bash
pnpm prisma migrate dev --name init
```

สร้าง `migrations/001_init/migration.sql` — ครอบคลุมทุก enum + table

### 6.2 Seed data

`packages/db/prisma/seed.ts`:

1. 78 TarotCard (from content/tarot/cards.json)
2. Default TarotDeck "rider-waite-default"
3. DailyHoroscope สำหรับ ±30 วันแรก (seed เพื่อ demo/test)

Run: `pnpm prisma db seed`

### 6.3 Production migrations

- **Expand-contract** สำหรับ breaking changes
- **Never** DROP COLUMN ตรงๆ — mark deprecated → null out → drop ใน migration 2 release หลัง
- Use `prisma migrate deploy` ใน CI/CD (ห้าม `prisma migrate dev` ใน prod)
- Migration review: PR + migration SQL ต้อง approve 2 คน

> อ้างอิง: `migration-best-practices.mdc` rule

---

## 7. Backup & Recovery

- **Automated daily backup** จาก Neon / Prisma Postgres (point-in-time restore 7 วัน)
- **Weekly export** → S3 (encrypted) — 90 days retention
- **DR test**: test restore ทุก quarter

---

## 8. Access Patterns Summary

### 8.1 Hot paths (optimize heavily)

1. `GET /horoscope/{sign}/today` — cache-first (edge + redis + DB)
2. `POST /tarot/draw-daily` — user-scoped, idempotent per day
3. `GET /compatibility/{slug}` — by share slug
4. `GET /profile/dashboard` — user profile + today's data

### 8.2 Cold paths

1. `GET /reading-history` — paginated, last 50 by default
2. `GET /admin/content/*` — admin CMS
3. Batch jobs: daily horoscope generation, push notifications

---

## 9. Evolution Roadmap

### Phase 1 (MVP) — schema ตามที่ระบุข้างบน

### Phase 2 (additions)

- `LiveReading` — marketplace live reader sessions
- `ReaderProfile` — หมอดูใน marketplace
- `GroupChat` — community groups
- `Affiliate` — commerce links + commission

### Phase 3 (big ones)

- Partition `Reading` by month
- Consider CQRS: writes → Postgres, reads → read replica + materialized views
- Consider event sourcing สำหรับ user activity (analytics backbone)

---

## 10. Quick Start Commands

```bash
# Install
pnpm --filter @daojai/db add prisma @prisma/client

# Init
pnpm prisma init

# Edit schema.prisma

# Dev migration
pnpm prisma migrate dev --name init

# Generate client
pnpm prisma generate

# Open studio
pnpm prisma studio

# Seed
pnpm prisma db seed

# Prod deploy
pnpm prisma migrate deploy
```

---

_Last updated: 2026-04-17_ — Next: [03-api-contract.md](./03-api-contract.md)
