# 03 — Sprint Plan (MVP 12 weeks)

> Detailed sprint-by-sprint breakdown สำหรับการ build MVP

---

## 📐 Assumptions

- **Sprint length**: 2 weeks
- **Team size** (MVP):
  - 1 Tech Lead (full-stack)
  - 1 Frontend dev
  - 1 Content editor (part-time, 50%)
  - 1 Designer (part-time, 50%)
  - 1 PM (part-time, 25%)
- **Velocity estimate**: 30-40 story points per sprint (small team)
- **Definition of Done** (DoD):
  - Code merged to main
  - Tests passing (unit + E2E critical paths)
  - Deployed to staging
  - Design review signed off
  - PM acceptance

---

## Sprint 1 — Foundation (Weeks 3-4)

**Goal**: Ship auth, navigation, onboarding, design system

### Stories

| ID | Story | SP | Owner |
|----|-------|----|----|
| S1-01 | Setup monorepo (Turborepo + pnpm workspaces) | 3 | TL |
| S1-02 | Prisma schema init + migrate + seed | 5 | TL |
| S1-03 | Design tokens → Tailwind config | 3 | FE |
| S1-04 | shadcn/ui installation + custom theme | 3 | FE |
| S1-05 | App shell: layout, bottom nav, top bar | 5 | FE |
| S1-06 | Dark mode toggle + persist | 2 | FE |
| S1-07 | NextAuth v5 setup + Google provider | 5 | TL |
| S1-08 | LINE provider integration | 5 | TL |
| S1-09 | Guest session + cookie middleware | 5 | TL |
| S1-10 | Onboarding screens (4 steps) | 8 | FE |
| S1-11 | Birth profile compute library (sun sign, Thai day, life path) | 5 | TL |
| S1-12 | Landing page skeleton | 3 | FE |
| S1-13 | 404 / 500 / loading error pages (with mascot placeholder) | 2 | FE |

**Sprint 1 total**: 54 SP

### Deliverables

- ✅ User can sign up with Google or LINE
- ✅ User can go through onboarding and see their sun sign
- ✅ Guest session works (persists on refresh)
- ✅ Dark mode toggle works
- ✅ Repo deployed to staging via Vercel

### Blockers / risks

- Mascot animation not ready → use placeholder SVG
- LINE Developer channel approval delay → start early in week 1

---

## Sprint 2 — Daily Horoscope (Weeks 5-6)

**Goal**: Ship daily horoscope end-to-end with content pipeline

### Stories

| ID | Story | SP | Owner |
|----|-------|----|----|
| S2-01 | DailyHoroscope model + CRUD | 3 | TL |
| S2-02 | OpenAI client wrapper + prompt templates | 5 | TL |
| S2-03 | Astrology context fetcher (Swiss Eph basics) | 5 | TL |
| S2-04 | Content generation pipeline (cron + manual trigger) | 8 | TL |
| S2-05 | Safety filter (banned words, flag for review) | 5 | TL |
| S2-06 | `/horoscope/[sign]` page (server component) | 5 | FE |
| S2-07 | Dashboard hero with today's horoscope | 5 | FE |
| S2-08 | Content editor dashboard (view, edit, approve — simple) | 8 | TL |
| S2-09 | Share card generator (Satori → PNG) | 5 | FE |
| S2-10 | Seed first 30 days content manually | 5 | Content |
| S2-11 | i18n setup (next-intl) Thai default | 3 | FE |

**Sprint 2 total**: 57 SP

### Deliverables

- ✅ Daily horoscope live on site
- ✅ Content can be generated + reviewed
- ✅ Share card downloadable
- ✅ Dashboard shows personalized today

### Success checkpoint

- [ ] Content pipeline successfully generates 12 signs in < 5 minutes
- [ ] Share card renders correctly on IG story size (1080x1920)
- [ ] `/horoscope/leo` loads < 2 seconds (cached)

---

## Sprint 3 — Tarot (Weeks 7-8)

**Goal**: Ship tarot daily + 3-card spread with full interactivity

### Stories

| ID | Story | SP | Owner |
|----|-------|----|----|
| S3-01 | TarotCard + TarotDeck seed (78 cards) | 5 | TL |
| S3-02 | Public-domain RWS images integration | 3 | FE |
| S3-03 | Tarot daily card — server action + page | 5 | TL |
| S3-04 | Card flip animation (Framer Motion) | 3 | FE |
| S3-05 | Tarot 3-card — interactive shuffle UI | 8 | FE |
| S3-06 | Fan-of-78 cards with touch/click selection | 8 | FE |
| S3-07 | Tarot card encyclopedia `/tarot/cards` | 5 | FE |
| S3-08 | Card detail page `/tarot/cards/[id]` | 3 | FE |
| S3-09 | LLM narrative for 3-card spread | 5 | TL |
| S3-10 | Share tarot reading card | 3 | FE |
| S3-11 | Haptic feedback integration | 2 | FE |
| S3-12 | Tarot content writing (78 cards × general + love) | 8 | Content |

**Sprint 3 total**: 58 SP

### Deliverables

- ✅ User can pull daily tarot card
- ✅ User can do 3-card interactive spread
- ✅ User can browse all 78 cards
- ✅ Reading shareable

---

## Sprint 4 — Compat + Birth Fortune (Weeks 9-10)

**Goal**: Ship compatibility check + birth chart dashboard

### Stories

| ID | Story | SP | Owner |
|----|-------|----|----|
| S4-01 | Compatibility scoring engine (5 systems) | 8 | TL |
| S4-02 | LLM advice generation for compatibility | 5 | TL |
| S4-03 | Compatibility form UI (2 persons, relationship type) | 5 | FE |
| S4-04 | Compatibility result page with breakdown | 8 | FE |
| S4-05 | Public share URL `/compatibility/result/[slug]` | 5 | FE |
| S4-06 | OG image for compat share | 3 | FE |
| S4-07 | Birth chart dashboard `/birth-chart/me` with 4 tabs | 8 | FE |
| S4-08 | ทักษา visualization (8-star wheel) | 5 | FE |
| S4-09 | Compatibility content library (49+144+81 combos) | 8 | Content |
| S4-10 | Birth fortune content (ทักษา × 7 + life path 1-9) | 5 | Content |

**Sprint 4 total**: 60 SP

### Deliverables

- ✅ User can check compatibility with anyone
- ✅ Results shareable via public URL
- ✅ User sees comprehensive birth chart view

---

## Sprint 5 — Polish & Push (Weeks 11-12)

**Goal**: Push notifications, streak, reading history, polish

### Stories

| ID | Story | SP | Owner |
|----|-------|----|----|
| S5-01 | Web Push setup (VAPID keys, subscription) | 5 | TL |
| S5-02 | LINE Notify integration | 5 | TL |
| S5-03 | Daily push cron (07:00 BKK, per user timezone) | 5 | TL |
| S5-04 | Push preferences in settings | 3 | FE |
| S5-05 | Streak model + computation | 5 | TL |
| S5-06 | Streak UI with milestone animations | 3 | FE |
| S5-07 | Reading history page | 5 | FE |
| S5-08 | User profile settings (edit name, delete account) | 5 | FE |
| S5-09 | Data export (PDPA) | 5 | TL |
| S5-10 | Performance optimization pass (LCP, CLS) | 5 | FE |
| S5-11 | Analytics integration (PostHog) | 3 | TL |
| S5-12 | SEO meta + sitemap.xml + robots.txt | 3 | FE |

**Sprint 5 total**: 52 SP

### Deliverables

- ✅ Push notifications firing daily
- ✅ Streak system working
- ✅ User can see reading history
- ✅ PDPA export + delete works
- ✅ Core Web Vitals green

---

## Sprint 6 — Beta Prep (Weeks 13-14)

**Goal**: Bug bash, landing page polish, content finalization, beta deploy

### Stories

| ID | Story | SP | Owner |
|----|-------|----|----|
| S6-01 | Landing page hero + features + pricing section | 8 | FE |
| S6-02 | Blog setup + 3 initial SEO posts | 5 | Content |
| S6-03 | Help/FAQ page (20 questions) | 3 | Content |
| S6-04 | Privacy policy + Terms finalization | 3 | Legal |
| S6-05 | Bug bash + triage (whole team) | 8 | All |
| S6-06 | Load test (k6) at 100 req/s | 3 | TL |
| S6-07 | Sentry + alerting setup | 3 | TL |
| S6-08 | Mascot Lottie animations integrated (all states) | 5 | FE |
| S6-09 | E2E test critical paths (Playwright) | 5 | TL |
| S6-10 | Waitlist signup page + email collection | 3 | FE |
| S6-11 | Onboarding email series (welcome, day 2, day 7) | 5 | Content |
| S6-12 | Beta user feedback form + scheduling | 2 | PM |
| S6-13 | Accessibility audit pass | 3 | FE |

**Sprint 6 total**: 56 SP

### Deliverables

- ✅ Beta-ready product (no P0/P1 bugs)
- ✅ Marketing landing polished
- ✅ Legal signed off
- ✅ Monitoring/alerting live
- ✅ E2E tests green
- ✅ Beta rollout ready

---

## 🎯 Overall MVP Tally

| Sprint | Stories | SP |
|--------|---------|----|
| S1 Foundation | 13 | 54 |
| S2 Daily Horoscope | 11 | 57 |
| S3 Tarot | 12 | 58 |
| S4 Compat + Birth | 10 | 60 |
| S5 Polish & Push | 12 | 52 |
| S6 Beta Prep | 13 | 56 |
| **Total** | **71 stories** | **337 SP** |

At 35 SP/sprint velocity target → **9.6 sprints needed** — ใช้ **6 sprints ด้วย team ขยาย**
→ Either: expand team, cut scope, or extend to 14-16 weeks

### Realistic scenario adjustments

**If team is exactly as planned (1 TL + 1 FE)**: expect 12-14 weeks → **beta at week 16**

**To hit week 14 beta**: need
- 2 full FE devs (not 1) — hire 1 more
- Cut "Should Have" from Phase 1 (Celtic Cross, Encyclopedia)
- Use more off-the-shelf (shadcn heavy, don't reinvent)

---

## 🏃 Daily/Weekly Rhythm

### Daily

- Standup 9:30 AM (15 min) — async Slack OK
- End-of-day PR reviews

### Weekly

- Monday: Sprint planning (if start) + Look-ahead
- Tuesday-Thursday: Execution
- Friday: Demo + retro (if sprint end) + content/design review

### Per Sprint (every 2 weeks)

- **Week 1, Mon**: Sprint planning + user story refinement
- **Week 2, Fri**: Sprint demo + retrospective
- **Between**: showcase WIP every Friday

---

## 📋 Cross-cutting Work Streams

Run in parallel to sprints:

### Content writing stream

- Continuous from Week 3 onwards
- Week 4: Tarot card meanings (39/78)
- Week 6: Tarot complete + first 30 days horoscope
- Week 8: Compatibility advice library
- Week 10: Birth fortune content
- Week 12: Legal + FAQ + Help
- Week 14: Blog launch posts

### Design stream

- Continuous from Week 3 onwards
- Figma screens as sprint progresses
- Mascot animation specs handed to illustrator/animator
- Design QA per sprint end

### QA stream

- Week 3-12: Continuous as dev
- Week 13-14: Focused bug bash
- Week 15: Beta = final QA

---

## 🚨 Risk Management

### Per-sprint risks

| Sprint | Main risk | Mitigation |
|--------|-----------|------------|
| S1 | LINE API approval slow | Start in Week 1, have Email magic link fallback |
| S2 | LLM content quality | Start prompt tuning week 1, manual review initially |
| S3 | Tarot animation complexity | Use off-the-shelf Lottie if custom too slow |
| S4 | Compat scoring bugs | Extensive unit tests + known combinations |
| S5 | Push notification permissions | Explain well in UI, soft-ask pattern |
| S6 | Performance regression | Load test early (week 12) |

### Contingency buffers

- Built-in 15% time for bug fixes (already in velocity)
- 1 extra week buffer before beta (Week 15 is buffer, not committed)
- Cut scope early if behind: drop Encyclopedia, drop Celtic Cross, drop streak milestones

---

## ✅ Exit Criteria — MVP complete

### Functional

- [ ] 4 core features live & stable
- [ ] Auth (Google + LINE + guest) working
- [ ] Push (web + LINE) firing
- [ ] Share cards working across iOS + Android
- [ ] 90%+ critical path E2E tests green

### Non-functional

- [ ] LCP < 2.5s on slow 4G
- [ ] No P0 or P1 bugs open
- [ ] Sentry error rate < 1%
- [ ] Accessibility WCAG AA pass
- [ ] Security review passed (OWASP checklist)

### Content

- [ ] 78 tarot cards × 5 categories × 2 orientations complete
- [ ] Daily horoscope generating daily without human intervention > 90% of time
- [ ] Compatibility advice library covers 90% of scenarios
- [ ] Privacy policy + ToS legally reviewed

### Business

- [ ] Landing page ready for traffic
- [ ] Beta signups > 100
- [ ] Analytics tracking all key events
- [ ] 3+ TikTok creators briefed for launch

---

## 📝 Retrospective Framework

At end of every sprint:

- **What went well?**
- **What didn't?**
- **What to try differently?**
- **Action items** (max 3, assigned)

Use **Start/Stop/Continue** or **Lean Coffee** format.

---

_See also: [04-success-metrics.md](./04-success-metrics.md) for measuring success_
