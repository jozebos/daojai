# 00 — Product Phase Index

> PRD, roadmap, sprint plans, metrics, and feature specs สำหรับ DaoJai

---

## 📚 Product Documents

| # | เรื่อง | ไฟล์ | สถานะ |
|---|-----|----|----|
| 01 | Product Requirements Document (PRD) | [01-prd.md](./01-prd.md) | ✅ Done |
| 02 | Product Roadmap | [02-roadmap.md](./02-roadmap.md) | ✅ Done |
| 03 | Sprint Plan (MVP 12 weeks) | [03-sprint-plan.md](./03-sprint-plan.md) | ✅ Done |
| 04 | Success Metrics (KPI/OKR) | [04-success-metrics.md](./04-success-metrics.md) | ✅ Done |
| 05 | Feature Specifications | [05-feature-specs.md](./05-feature-specs.md) | ✅ Done |

---

## 🎯 TL;DR

**What**: เดาใจ (DaoJai) — แอปดูดวงไทย Gen Z โมเดิร์น PWA
**Why**: ช่องว่างตลาดไทย ไม่มี "Co-Star" ภาษาไทย + โหราศาสตร์ไทย
**Who**: Gen Z / Millennial ไทย 18-34
**How**: Next.js + Prisma + LLM content + mascot-driven brand

**MVP Scope**: 4 core features — Daily horoscope / Tarot / Birth chart / Compatibility
**Timeline**: 14-16 weeks (2 week pre-dev + 12 week build + 2 week beta)
**Team**: 1 TL + 1 FE + 1 Content (50%) + 1 Designer (50%) + 1 PM (25%)
**North Star**: DAU with meaningful action
**Monetization**: FREE-ONLY for 6 months → Shine Premium ฿99/mo from Month 7

---

## 🗓 Phase Progression

```
[✅ DONE]     Phase 0: Research          → 6 research docs
[✅ DONE]     Phase 0: System Design     → 7 design docs
[✅ DONE]     Phase 0: Product Specs     → 5 product docs  ← you are here
[▶ NEXT]      Phase 1: Pre-development   → 2 weeks
              Phase 2: MVP Build         → 12 weeks (6 sprints)
              Phase 3: Beta + Launch     → 2 weeks
              Phase 4: Growth + Monetize → 6 months
              Phase 5: Scale             → 9+ months
```

---

## ✅ Decisions Captured

### Business

- ✅ Name: เดาใจ (DaoJai) / daojai.com
- ✅ Mascot: ใจ (Jai) — ดาวหัวใจ
- ✅ Free-only Phase 1 (6 months) → Premium Phase 2
- ✅ LINE LIFF: Phase 2 (web-first)
- ✅ No live reader marketplace in MVP

### Technical

- ✅ Next.js 14 App Router + TypeScript
- ✅ Prisma ORM + PostgreSQL
- ✅ NextAuth v5 (Google + LINE + Email)
- ✅ Guest mode enabled
- ✅ OpenAI GPT-4o (primary) + Claude (fallback)
- ✅ Vercel hosting
- ✅ Turborepo monorepo

### Content

- ✅ Hybrid: AI-generated + human editor review
- ✅ Safety filter (banned words) + flag for review
- ✅ Thai primary, English Phase 4

### Design

- ✅ Dark mode default
- ✅ PWA first, native apps Phase 5
- ✅ Design tokens exported for Tailwind

---

## 🔑 Critical Success Factors

### Must not fail

1. **Content pipeline stability** — ต้อง generate ทุกวันโดยไม่แทรกมือ
2. **Onboarding completion ≥ 85%** — ถ้าคนยังไม่ผ่าน step 2 = DOA
3. **Daily push retention** — ถ้า push open rate < 10% = viral engine พัง
4. **No P0 bugs in first 30 days** — trust หายยากกว่าสร้าง

### Differentiators

1. **Brand "ใจ (Jai)"** — personality ต่างจากทุกแอป
2. **Multi-system compatibility** — รวม 5 systems ที่ไม่มีใครทำ
3. **ภาษา Gen Z** — ไม่ใช่คำโหรโบราณ
4. **UX ที่ใส่ใจ ritual** — ไพ่ยิปซีรู้สึกขลังจริงๆ

---

## 🚧 Open Items Waiting Decision

### Before Sprint 1 starts

- [ ] Team staffing finalized (hire 1 more FE?)
- [ ] Mascot illustrator commissioned
- [ ] Domain registered
- [ ] Legal reviewer contracted
- [ ] Infrastructure accounts all active

### During MVP

- [ ] A/B test onboarding copy (Week 6)
- [ ] Push notification content style (Week 10)
- [ ] Landing page design freeze (Week 13)

### Before public launch

- [ ] Launch marketing budget approved (~฿120K)
- [ ] Influencer outreach list
- [ ] Crisis comms plan (if something breaks viral)

---

## 📁 Full Project Documentation Tree

```
daojai/
├── README.md
└── docs/
    ├── research/          [6 docs, ~2,600 lines]
    │   ├── 00-index.md
    │   ├── 01-tarot.md
    │   ├── 02-daily-horoscope.md
    │   ├── 03-birth-fortune.md
    │   ├── 04-compatibility.md
    │   ├── 05-ux-benchmarks.md
    │   └── 06-monetization.md
    │
    ├── design/            [7 docs, ~4,200 lines]
    │   ├── 00-index.md
    │   ├── 01-system-architecture.md
    │   ├── 02-db-schema.md
    │   ├── 03-api-contract.md
    │   ├── 04-auth-and-session.md
    │   ├── 05-content-pipeline.md
    │   ├── 06-mascot-and-brand.md
    │   └── 07-information-architecture.md
    │
    └── product/           [5 docs, ~2,500 lines]
        ├── 00-index.md    ← you are here
        ├── 01-prd.md
        ├── 02-roadmap.md
        ├── 03-sprint-plan.md
        ├── 04-success-metrics.md
        └── 05-feature-specs.md
```

**Total**: 18 markdown documents, ~9,000+ lines, ~120,000+ words

---

## 🎬 What to do RIGHT NOW

### If you're the Founder / PM

1. Review PRD + Roadmap, adjust any scope that doesn't fit vision
2. Make hiring decisions (additional FE dev?)
3. Start mascot commission brief
4. Register domain + legal entity (if not yet)

### If you're the Tech Lead

1. Review system architecture + DB schema
2. Scaffold monorepo (Turborepo + pnpm)
3. Set up Prisma + run initial migration
4. Set up CI/CD (GitHub Actions → Vercel)
5. Provision all infra services

### If you're the Designer

1. Review brand + IA docs
2. Start Figma wireframes following IA structure
3. Create design tokens in Figma
4. Review mascot brief

### If you're the Content Lead

1. Review content pipeline + voice guidelines
2. Start writing Tarot 78 card content
3. Draft first 30 daily horoscope entries for launch
4. Set up content workflow (Notion/Linear)

---

## 📞 Key Contacts & Roles (TBD)

| Role | Owner | Responsibility |
|------|-------|---------------|
| Product Owner | TBD | Priority decisions, metrics |
| Tech Lead | TBD | Architecture, scaling |
| Frontend | TBD | UI implementation |
| Content Editor | TBD | Content quality + voice |
| Designer | TBD | Visual + UX |
| Legal | TBD | PDPA, contracts |

---

## 📖 Referenced Documents

### Research phase

- Tarot 78 cards: [research/01-tarot.md](../research/01-tarot.md)
- Horoscope system: [research/02-daily-horoscope.md](../research/02-daily-horoscope.md)
- Thai astrology: [research/03-birth-fortune.md](../research/03-birth-fortune.md)
- Compatibility scoring: [research/04-compatibility.md](../research/04-compatibility.md)
- UX competitive analysis: [research/05-ux-benchmarks.md](../research/05-ux-benchmarks.md)
- Business model: [research/06-monetization.md](../research/06-monetization.md)

### Design phase

- Architecture: [design/01-system-architecture.md](../design/01-system-architecture.md)
- Database: [design/02-db-schema.md](../design/02-db-schema.md)
- API: [design/03-api-contract.md](../design/03-api-contract.md)
- Auth: [design/04-auth-and-session.md](../design/04-auth-and-session.md)
- Content pipeline: [design/05-content-pipeline.md](../design/05-content-pipeline.md)
- Brand: [design/06-mascot-and-brand.md](../design/06-mascot-and-brand.md)
- IA & flows: [design/07-information-architecture.md](../design/07-information-architecture.md)

---

## 💡 Final Thoughts

DaoJai อยู่ในจุดที่ **foundation แข็งแรงที่สุดเท่าที่จะเป็นได้** ก่อนเริ่ม code
- Research ครอบคลุม ✓
- Architecture ตัดสินแล้ว ✓
- Database schema พร้อม migrate ✓
- Feature specs ละเอียดพอที่ engineer ลงมือได้ ✓
- Metrics + OKRs วัดผลได้ ✓

> **"Plan the work, work the plan"** — ต่อไปคือการ execute

_Last updated: 2026-04-17_ — Good luck, stargazer! ✨🌟
