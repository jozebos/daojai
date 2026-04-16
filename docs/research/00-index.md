# 00 — Research Index & Next Steps

> สรุป research ทั้งหมด และชี้ทิศทางไปสู่ phase ออกแบบระบบ

---

## 📚 Research Documents

| # | หัวข้อ | ไฟล์ | สถานะ |
|---|-----|----|----|
| 01 | ไพ่ยิปซี (Tarot) | [01-tarot.md](./01-tarot.md) | ✅ Done |
| 02 | ดวงรายวัน (Daily Horoscope) | [02-daily-horoscope.md](./02-daily-horoscope.md) | ✅ Done |
| 03 | ดวงตามวันเกิด (Birth Fortune) | [03-birth-fortune.md](./03-birth-fortune.md) | ✅ Done |
| 04 | ดวงสมพงษ์ (Compatibility) | [04-compatibility.md](./04-compatibility.md) | ✅ Done |
| 05 | UX Benchmarks | [05-ux-benchmarks.md](./05-ux-benchmarks.md) | ✅ Done |
| 06 | Monetization | [06-monetization.md](./06-monetization.md) | ✅ Done |

---

## 🎯 Key Findings (10 จุดสำคัญ)

### 1. ช่องว่างตลาดไทยชัดเจน
ยังไม่มีแอปดูดวง modern + Gen Z-first ในไทย → Co-Star ไทยยังว่างอยู่

### 2. 4 core features สมเหตุสมผล
Tarot + Daily + Birth + Compatibility ครอบคลุม 80% ของ use case ดูดวง Gen Z

### 3. Content production เป็นงานใหญ่ที่สุด
ประมาณ **6-8 สัปดาห์** สำหรับทีม 1-2 คน (ใช้ AI assist)
- Tarot 78 × 10 entries = 780 texts
- Daily x365 x12 ราศี (AI generate)
- Compatibility ~8,000 words
- Birth fortune ~50 profiles

### 4. Thai astrology + Western ต้องรวมกัน
คนไทย Gen Z เสพทั้ง 2 ระบบ — ทักษา (วันเกิด) + Sun Sign (สากล)
→ MVP ต้องรองรับทั้ง 2 ระบบ แต่โชว์เป็น "view" ที่ผู้ใช้เลือกได้

### 5. Rider-Waite-Smith เป็น public domain แล้ว
สามารถใช้ภาพต้นฉบับฟรี ไม่ต้องจ่าย license

### 6. Daily ritual = retention engine
Push 07:00 + share card = loop สำคัญที่สุด
Co-Star ยืนยัน: push notification with personality = retention +2x

### 7. Monetization: subscription + IAP + virtual goods
- Free tier ก่อน 6 เดือนแรก (เน้น growth)
- Premium ฿99/mo, IAP ฿99-฿199
- Virtual tarot deck theme = Gen Z love

### 8. LINE + TikTok เป็นช่องทางสำคัญ
- LINE LIFF app + LINE Notify = retention channel
- TikTok organic + micro-influencer = acquisition channel

### 9. Tech stack ใช้ Next.js + Prisma + Postgres พอแล้ว
- Swiss Ephemeris ถ้าจะ full natal chart (Phase 3)
- AI LLM สำหรับ content generation ทั้งหมด

### 10. Ethical framing = brand differentiator
ห้ามขู่ / ห้ามชี้ชะตาตายตัว / ใช้ภาษา supportive
→ จะเป็นจุดต่างกับ competitor ไทยที่ยังใช้ tone เก่า

---

## 🧠 Feature Prioritization (MoSCoW)

### Must Have (MVP Phase 1)

- ✅ Auth (Google, LINE, Email)
- ✅ Birthday profile setup (Sun sign, Thai day, Chinese animal, Life Path)
- ✅ Daily horoscope (12 ราศี)
- ✅ Tarot daily card (1 ใบ/วัน)
- ✅ Tarot 3-card spread
- ✅ Compatibility check (ใช้วันเกิด)
- ✅ Profile dashboard (Your Identity Card)
- ✅ Push notification (web push + LINE Notify)

### Should Have (Phase 2)

- ⚠️ Tarot Celtic Cross (10 cards)
- ⚠️ Tarot Love spread (7 cards)
- ⚠️ Journal / reading history
- ⚠️ Share card generator (IG story 1080x1920)
- ⚠️ Streak + gamification
- ⚠️ Deep monthly reading (IAP)
- ⚠️ Premium subscription tier
- ⚠️ Thai Buddhist imagery (พระประจำวัน)

### Could Have (Phase 3)

- 🔮 Full natal chart (Swiss Ephemeris)
- 🔮 Synastry เต็ม
- 🔮 AI custom reading
- 🔮 Live reader marketplace
- 🔮 Community / groups
- 🔮 Affiliate commerce (หินมงคล)

### Won't Have (at launch)

- ❌ Native iOS/Android app (PWA first)
- ❌ Physical product shop
- ❌ Multi-language (Thai only to start; English Phase 4)
- ❌ Voice reading
- ❌ AR features

---

## 🏗 Suggested System Design (High-level)

```
┌────────────────────────────────────────┐
│           Frontend (PWA)               │
│  Next.js 14 App Router + TypeScript    │
│  shadcn/ui + Tailwind + Framer Motion  │
└──────────────┬─────────────────────────┘
               │ HTTPS
┌──────────────▼─────────────────────────┐
│           API Layer                    │
│  Next.js API Routes + Server Actions   │
│  - /api/horoscope/daily                │
│  - /api/tarot/draw                     │
│  - /api/compatibility                  │
│  - /api/profile                        │
└──────────────┬─────────────────────────┘
               │
       ┌───────┼────────┐
       │       │        │
┌──────▼──┐ ┌──▼───┐ ┌──▼──────┐
│ Prisma  │ │ Redis│ │ LLM API │
│ + Postgres │Cache │ │ (OpenAI)│
└─────────┘ └──────┘ └─────────┘
       │
┌──────▼──────────────────────┐
│  External Services           │
│  - LINE Messaging API        │
│  - Omise (payment)           │
│  - PostHog (analytics)       │
│  - Resend (email)            │
│  - Cloudinary (images)       │
└──────────────────────────────┘
```

### DB Schema (draft)

```prisma
model User {
  id            String    @id @default(cuid())
  email         String?   @unique
  lineId        String?   @unique
  displayName   String
  avatarUrl     String?
  createdAt     DateTime  @default(now())
  
  birthProfile  BirthProfile?
  readings      Reading[]
  compatibilities Compatibility[]
  subscription  Subscription?
}

model BirthProfile {
  id            String    @id @default(cuid())
  userId        String    @unique
  user          User      @relation(fields: [userId], references: [id])
  birthDate     DateTime
  birthTime     String?   // "HH:mm"
  birthPlace    String?
  timezone      String    @default("Asia/Bangkok")
  bornAtNight   Boolean   @default(false)
  
  // Computed (cached)
  sunSign       String
  thaiDay       String
  zodiacAnimal  String
  lifePathNumber Int
}

model Reading {
  id            String    @id @default(cuid())
  userId        String
  user          User      @relation(fields: [userId], references: [id])
  type          ReadingType  // DAILY_HOROSCOPE | TAROT_1 | TAROT_3 | TAROT_10
  cards         Json?     // tarot cards drawn
  question      String?
  content       String    @db.Text
  mood          String?   // user reaction: accurate/inaccurate/neutral
  createdAt     DateTime  @default(now())
}

model Compatibility {
  id            String    @id @default(cuid())
  userId        String
  user          User      @relation(fields: [userId], references: [id])
  partnerName   String
  partnerBirth  DateTime
  relationshipType String  // love/friend/family/business
  overallScore  Int
  breakdown     Json      // dimensions
  advice        String    @db.Text
  createdAt     DateTime  @default(now())
}

model TarotCard {
  id            String    @id     // "major-00", "cups-ace"
  arcana        String    // major/minor
  suit          String?
  number        Int
  nameEn        String
  nameTh        String
  imageUrl      String
  keywordsUp    String[]
  keywordsRev   String[]
  meanings      Json      // by category (love/career/etc)
}

model DailyHoroscope {
  id            String    @id @default(cuid())
  sign          String
  date          DateTime  @db.Date
  content       Json      // full schema
  @@unique([sign, date])
}

model Subscription {
  id            String    @id @default(cuid())
  userId        String    @unique
  user          User      @relation(fields: [userId], references: [id])
  tier          String    // FREE | SHINE
  provider      String    // stripe/omise/apple/google
  status        String    // active/past_due/canceled
  currentPeriodEnd DateTime
}

enum ReadingType {
  DAILY_HOROSCOPE
  TAROT_1
  TAROT_3
  TAROT_10
  BIRTH_FORTUNE
  COMPATIBILITY
  MONTHLY_DEEP
}
```

---

## 📅 Next Steps (คำแนะนำลำดับงาน)

### Week 1–2: Design Foundation
1. **Design system**: tokens (color, typography, spacing), shadcn/ui base theme
2. **Wireframe** 15 main screens (Figma)
3. **Brand identity**: logo DaoJai + character mascot (optional)

### Week 3–4: Technical Setup
1. Setup Next.js 14 + Prisma + Postgres (Prisma Postgres หรือ Neon)
2. Auth flow (NextAuth: Google + LINE + Email)
3. DB schema + migrations
4. i18n setup (Thai primary)

### Week 5–8: MVP Features
1. Birthday profile + dashboard
2. Daily horoscope (seed content 12 signs × 30 days)
3. Tarot daily card + 3-card spread
4. Compatibility (basic 4-system composite)
5. Share card (HTML to PNG via Satori)

### Week 9–10: Content Seeding
1. 78 Tarot cards × basic meanings (via LLM + human review)
2. Initial daily horoscope 90 days (AI-assisted)
3. Compatibility advice library

### Week 11–12: Polish & Soft launch
1. Push notification (web push + LINE)
2. Analytics (PostHog)
3. Soft launch beta (friends & family + waitlist)

---

## 🎨 Design Deliverables ที่ต้องทำถัดไป

ใน `docs/design/` (สร้างใหม่):

- `design-system.md` — tokens, typography, color
- `information-architecture.md` — sitemap + navigation
- `user-flows.md` — 5-8 key user flows
- `wireframes.md` — reference to Figma
- `component-library.md` — shadcn extension for DaoJai

ใน `docs/product/`:

- `prd.md` — Product Requirements Document
- `roadmap.md` — Phase 1-4 timeline
- `feature-specs/` — detailed spec each feature

---

## 💡 Open Questions (to discuss ก่อนเริ่มออกแบบ)

1. **Native app vs PWA?** → แนะนำ PWA ก่อน, native Phase 3 (save ค่า dev)
2. **Auth provider priority?** → Google + LINE สำคัญสุดใน TH
3. **Live reader marketplace in Phase 1?** → ไม่แนะนำ — focus core ก่อน
4. **AI-generated content ทั้งหมด vs hybrid?** → Hybrid — template + AI + human review
5. **หมอดูจริงเป็น content partner?** → Yes, 1-2 คนในช่วง launch จะดี (credibility)
6. **Mascot/character ตั้งแต่แรก?** → ช่วยสร้าง brand ได้มาก แต่ optional
7. **สมัครสมาชิกบังคับ vs guest mode?** → Guest mode ดู daily + tarot ได้ 1 ใบ → force signup ถ้าเก็บ history

---

## ✅ Status

Research Phase **COMPLETE** — พร้อมเข้า Design Phase

**Total research**: ~45,000+ words covering 6 major areas
**Time spent**: Phase 0 Research
**Next**: Phase 1 — System Design + Wireframe

---

_Last updated: 2026-04-17_
