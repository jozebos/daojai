# 00 — Design Phase Index

> System design, database, API, auth, content, brand, และ IA สำหรับ DaoJai

---

## 📚 Design Documents

| # | เรื่อง | ไฟล์ | สถานะ |
|---|-----|----|----|
| 01 | System Architecture | [01-system-architecture.md](./01-system-architecture.md) | ✅ Done |
| 02 | Database Schema (Prisma) | [02-db-schema.md](./02-db-schema.md) | ✅ Done |
| 03 | API Contract | [03-api-contract.md](./03-api-contract.md) | ✅ Done |
| 04 | Auth & Session | [04-auth-and-session.md](./04-auth-and-session.md) | ✅ Done |
| 05 | Content Pipeline (AI+Human) | [05-content-pipeline.md](./05-content-pipeline.md) | ✅ Done |
| 06 | Mascot & Brand | [06-mascot-and-brand.md](./06-mascot-and-brand.md) | ✅ Done |
| 07 | Information Architecture | [07-information-architecture.md](./07-information-architecture.md) | ✅ Done |

---

## 🧭 Quick Reference

### Tech Stack Summary

```
Frontend  : Next.js 14 (App Router) + TypeScript + Tailwind + shadcn/ui
State     : Zustand + TanStack Query
Animation : Framer Motion + Lottie
Backend   : Next.js Route Handlers + Server Actions
ORM       : Prisma
DB        : PostgreSQL (Prisma Postgres / Neon)
Cache     : Upstash Redis
Auth      : NextAuth.js v5 (Google + LINE + Email)
LLM       : OpenAI GPT-4o (primary) + Claude 3.5 (fallback)
Payment   : Omise (TH) + Stripe (intl)
Hosting   : Vercel
Monorepo  : Turborepo + pnpm
```

### DB Tables (key ones)

- `User`, `Account`, `Session`, `GuestSession`
- `BirthProfile`
- `TarotCard`, `TarotDeck`
- `Reading` (all types in one table, discriminated)
- `DailyHoroscope` (shared content, indexed by sign+date)
- `Compatibility`
- `JournalEntry`
- `UserStreak`
- `Subscription`, `Transaction`
- `PushSubscription`

### Brand at a glance

- **Name**: เดาใจ / DaoJai
- **Mascot**: ใจ (Jai) — ดาวหัวใจ น้องจิ๋ว
- **Colors**: Indigo + Gold + Lavender + Soft Pink
- **Voice**: เพื่อนสนิทที่รู้เรื่องดวง Gen Z native
- **Typography TH**: IBM Plex Sans Thai + Anuphan
- **Tone**: อบอุ่น, กวนเบาๆ, เชิงบวก, ไม่ขู่

---

## 🏗 Architecture in One Diagram

```
Client (Web/PWA/LINE LIFF)
         ↓
Vercel Edge (CDN + ISR)
         ↓
Next.js 14 (RSC + Server Actions + Route Handlers)
         ↓
    ┌────┼────┐
    ↓    ↓    ↓
Postgres Redis  External
(Prisma) (Upstash) (LINE, Omise, OpenAI, Resend, PostHog)
```

---

## 📊 Key Numbers

### Complexity

- 28 screens / routes (MVP)
- ~15 unique layouts
- ~30 DB tables / enums
- ~25 REST endpoints
- ~15 Server Actions
- ~10 mascot expressions needed
- ~780 tarot content entries
- ~4,380 daily horoscope entries/year

### Cost (estimated)

| Stage | Monthly Infra | Notes |
|-------|---------------|-------|
| Launch (< 1K users) | ~฿340 | mostly free tier |
| Growth (50K MAU) | ~฿12,000 | Pro Vercel + LLM cost |
| Scale (500K MAU) | ~฿80,000 | dedicated DB + scaling |

### Timeline

| Phase | Duration | Output |
|-------|----------|--------|
| 0. Research | **Done** | 6 research docs |
| 1. Design | **Done** | 7 design docs |
| 2. Pre-dev | 1-2 weeks | Figma wireframes, mascot design commission |
| 3. MVP build | 12 weeks | Sprints 1-6 per IA |
| 4. Soft launch | 2 weeks | Beta + feedback iteration |
| 5. Public launch | - | marketing + press |

---

## ✅ Ready-to-build Deliverables

### For engineering

- [x] DB schema (Prisma) — ready to run `prisma migrate dev`
- [x] API endpoints spec — ready for OpenAPI spec
- [x] Auth flow — ready to implement with NextAuth v5
- [x] Server Actions signatures — ready to scaffold
- [x] Content pipeline — ready to wire OpenAI + safety filter
- [x] Tech stack choices — locked

### For design

- [x] Sitemap + IA
- [x] Design tokens (colors, space, radius, shadow)
- [x] Typography scale
- [x] Mascot concept brief
- [x] Voice & tone examples

### For content

- [x] LLM prompts (daily horoscope, tarot, compatibility)
- [x] Safety filter rules
- [x] Brand voice do's & don'ts
- [x] Content production workflow

---

## 🎯 Open Decisions (to confirm before sprint 1)

### Business / product

| Question | Options | Recommendation |
|---|---|---|
| MVP monetization? | Free only, free+paywall, ads | **Free-only first 6 months** |
| LINE LIFF support? | Phase 1 or Phase 2 | **Phase 2** (test web first) |
| Editor team structure? | 1 editor, 2 editors, outsource | **1 FT editor + AI** |
| Mascot ownership? | freelance (portfolio) vs agency | **Freelance illustrator ~฿30K** |

### Technical

| Question | Options | Recommendation |
|---|---|---|
| Prisma Postgres vs Neon? | | **Prisma Postgres** (better DX + new feature) |
| Monorepo package manager? | pnpm, bun, npm | **pnpm + Turborepo** |
| E2E test framework? | Playwright, Cypress | **Playwright** |
| Error monitoring? | Sentry, Datadog | **Sentry** (free tier generous) |

### Design

| Question | Options | Recommendation |
|---|---|---|
| Dark mode default? | Dark, Light, Auto | **Dark default, light toggle** |
| Languages at launch? | TH only, TH+EN | **TH only**, EN Phase 4 |
| Native-feel mobile? | PWA only, PWA + Capacitor | **PWA only first** |

---

## 🚀 Next Steps (Phase 2 - Pre-dev)

### Week 1

1. **Figma wireframes** — translate IA to actual wireframes
2. **Design tokens** export ไป Figma + Tailwind config
3. **Commission mascot illustrator** — brief ready in doc 06
4. **Domain registration** — daojai.com
5. **Infrastructure setup**:
   - Vercel project created
   - Prisma Postgres / Neon account
   - Upstash Redis
   - OpenAI + Anthropic API keys
   - LINE Developer account + channel
   - Omise sandbox account

### Week 2

1. **Mascot delivery** (if 2-week turnaround)
2. **Figma wireframes** complete for all 28 screens
3. **Content kickoff**: start writing Tarot 78 card meanings
4. **Repo setup**:
   - Monorepo scaffolding (Turborepo + pnpm)
   - packages/db, packages/ui, packages/types
   - CI/CD (GitHub Actions)
   - Preview deployments

---

## 📖 Cross-references

### Research ← → Design

- Research `01-tarot` → Design `05-content-pipeline` (Tarot generation)
- Research `02-daily-horoscope` → Design `05-content-pipeline` (Daily template)
- Research `03-birth-fortune` → Design `02-db-schema` (BirthProfile)
- Research `04-compatibility` → Design `03-api-contract` (checkCompatibility action)
- Research `05-ux-benchmarks` → Design `06-mascot-and-brand` + `07-information-architecture`
- Research `06-monetization` → Design `04-auth-and-session` (premium) + `02-db-schema` (Subscription)

---

## 📁 Full File Tree

```
daojai/
├── README.md
└── docs/
    ├── research/
    │   ├── 00-index.md
    │   ├── 01-tarot.md
    │   ├── 02-daily-horoscope.md
    │   ├── 03-birth-fortune.md
    │   ├── 04-compatibility.md
    │   ├── 05-ux-benchmarks.md
    │   └── 06-monetization.md
    └── design/
        ├── 00-index.md                ← you are here
        ├── 01-system-architecture.md
        ├── 02-db-schema.md
        ├── 03-api-contract.md
        ├── 04-auth-and-session.md
        ├── 05-content-pipeline.md
        ├── 06-mascot-and-brand.md
        └── 07-information-architecture.md
```

---

## 💡 Final Notes

### เน้นย้ำ 3 ข้อ

1. **Start simple, ship fast** — MVP เป็น free-only 6 เดือนแรก ให้เก็บ feedback จริงก่อน monetize
2. **Brand > features** — ใจ (Jai) + voice ที่ sharp จะทำให้ DaoJai ต่างจากคู่แข่งไทย
3. **Content is the product** — content pipeline ต้อง stable ก่อน launch สม่ำเสมอทุกวัน

### Risk to watch

- **OpenAI policy change** → keep Claude fallback warm
- **LINE API pricing** → negotiate early
- **PDPA enforcement tightening** → legal review before launch
- **Viral spike (TikTok)** → serverless absorbs but LLM cost spikes → cap

---

✨ **Design phase complete** — DaoJai พร้อมเข้า pre-dev + implementation phase

_Last updated: 2026-04-17_
