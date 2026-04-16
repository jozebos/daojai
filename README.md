# เดาใจ (DaoJai)

> เดาใจเขา เดาใจคุณ — _Read the stars, hear your heart._

เว็บไซต์ดูดวงสำหรับคนไทยรุ่น Gen Z / Millennial ที่เน้น **UX สะอาด ใช้ง่าย สวย และสนุก** ผสาน
ภูมิปัญญาโหราศาสตร์ไทย + สากล (ไพ่ยิปซี) ให้จับต้องได้ในชีวิตประจำวัน

---

## 🎯 Vision

ทำให้การดูดวงเป็นเรื่อง **ปลอบใจและสร้างแรงบันดาลใจ** ไม่ใช่ขู่ให้กลัว
ใช้โหราศาสตร์เป็นเครื่องมือสะท้อนตัวเอง (self-reflection) มากกว่าการทำนายโชคชะตาตายตัว

## 👥 Target Audience

- **Primary**: คนไทยอายุ 18–34 ปี (Gen Z / Millennial) ที่สนใจสายมู แต่ชอบ UX ที่ดูโมเดิร์น
- **Secondary**: คนทำงานที่อยากได้ quick daily ritual ตอนเช้า / คู่รักที่อยากตรวจสมพงษ์

## ✨ Core Features (MVP)

1. **เปิดไพ่ยิปซี (Tarot)** — daily card, 3-card spread, Celtic Cross
2. **ดวงรายวัน (Daily Horoscope)** — ตาม 12 ราศีสากล และ/หรือราศีไทยจันทรคติ
3. **ดวงตามวันเกิด (Birth Fortune)** — เลข 7 ตัว, ทักษา, โหราศาสตร์ไทย
4. **ดวงสมพงษ์ (Compatibility)** — คู่รัก/คู่มิตร/คู่ธุรกิจ โดยใช้ดวงของทั้งสองคน

## 🛠 Tech Stack (planned)

- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind + shadcn/ui
- **Backend**: Next.js API Routes + Prisma ORM
- **Database**: PostgreSQL (Neon / Supabase / Prisma Postgres)
- **Auth**: NextAuth.js (Google, Facebook, LINE)
- **Hosting**: Vercel
- **Analytics**: PostHog / GA4
- **Payment** (future): Stripe + Omise (สำหรับ TH)

## 📁 Structure

```
daojai/
├── README.md                              # ← คุณอยู่ที่นี่
├── docs/
│   ├── research/       [6 docs]           # Research deep-dive แต่ละเรื่อง
│   │   ├── 00-index.md
│   │   ├── 01-tarot.md
│   │   ├── 02-daily-horoscope.md
│   │   ├── 03-birth-fortune.md
│   │   ├── 04-compatibility.md
│   │   ├── 05-ux-benchmarks.md
│   │   └── 06-monetization.md
│   │
│   ├── design/         [7 docs]           # System design
│   │   ├── 00-index.md
│   │   ├── 01-system-architecture.md
│   │   ├── 02-db-schema.md
│   │   ├── 03-api-contract.md
│   │   ├── 04-auth-and-session.md
│   │   ├── 05-content-pipeline.md
│   │   ├── 06-mascot-and-brand.md
│   │   └── 07-information-architecture.md
│   │
│   └── product/        [5 docs]           # PRD, Roadmap, Sprint, Metrics
│       ├── 00-index.md
│       ├── 01-prd.md
│       ├── 02-roadmap.md
│       ├── 03-sprint-plan.md
│       ├── 04-success-metrics.md
│       └── 05-feature-specs.md
│
└── apps/                                   # (ต่อไป) โค้ดจริง — coming soon
```

## 📚 Document Index (quick links)

- **Start here**: [docs/product/00-index.md](./docs/product/00-index.md) — TL;DR + decisions
- **Research**: [docs/research/00-index.md](./docs/research/00-index.md)
- **System design**: [docs/design/00-index.md](./docs/design/00-index.md)
- **PRD**: [docs/product/01-prd.md](./docs/product/01-prd.md)
- **Sprint plan**: [docs/product/03-sprint-plan.md](./docs/product/03-sprint-plan.md)

## 🎨 Brand Rationale — ทำไมชื่อ "เดาใจ"

- **เดา** = ทาย, คาดเดา, อ่านเชิง — งานหลักของหมอดู แต่ไม่ใช่แบบมั่วๆ
- **ใจ** = หัวใจ, ความรู้สึก, สิ่งที่อยู่ข้างใน
- รวมกัน: **"เดาใจ"** = อ่านใจ — ไม่ใช่แค่ใจของฟ้า/ดาว แต่รวมถึง**ใจของตัวคุณเอง**
- ตรงกับ mission: ดวงคือเครื่องมือ**สะท้อนใจ** ไม่ใช่ชี้ชะตาตายตัว
- เล่นกับสำนวนที่คนไทยใช้จริง: "เดาใจเขาออก?", "เดาใจฟ้าไม่ถูก", "ลองเดาใจตัวเองดูสิ"
- ออกเสียง 2 พยางค์ จำง่าย ฟังเป็นมิตร ไทย 100% แต่ไม่เชย
- โดเมน: `daojai.com` (Latin) พิมพ์ง่าย universal
- Tagline TH: **"เดาใจเขา เดาใจคุณ"**
- Tagline EN: **"Read the stars, hear your heart"**

### 🎯 เล่นคำใน product

- **เดาใจไพ่** — เปิดไพ่ยิปซี
- **เดาใจดาว** — ดวงวันนี้ตามราศี
- **เดาใจเธอ เดาใจเขา** — ดวงสมพงษ์
- **เดาใจตัวเอง** — ดวงวันเกิด / self-reflection

## 🗓 Roadmap (draft)

- **Phase 0 — Research** (ปัจจุบัน): รวบรวมองค์ความรู้ + benchmark UX
- **Phase 1 — Design**: System design, DB schema, UI wireframe
- **Phase 2 — MVP**: 4 core features, auth, daily notification
- **Phase 3 — Growth**: content SEO, social share, premium tier
- **Phase 4 — Monetize**: subscription, in-app purchase, affiliate

---

_Last updated: 2026-04-17_
