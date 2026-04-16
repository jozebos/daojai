# 02 — Product Roadmap

> Phased roadmap สำหรับ DaoJai ตั้งแต่ Phase 0 (research) → Phase 5+ (scale)

---

## 🗓 High-level Timeline

```
Phase 0 — Research & Design            [DONE ✅]   weeks -8 to -1
Phase 1 — Pre-development              [NEXT]     weeks 1-2
Phase 2 — MVP Build                    [FOCUS]    weeks 3-14
Phase 3 — Beta & Launch                           weeks 15-16
Phase 4 — Growth & Monetize            weeks 17-38 (6 เดือนหลัง launch)
Phase 5 — Scale & Expand               month 9+ (advanced features)
```

---

## Phase 0 — Research & Design ✅

**Status**: COMPLETE
**Duration**: ~8 weeks
**Deliverables**:

- ✅ 6 research documents (tarot, horoscope, birth, compat, UX, monetize)
- ✅ 7 design documents (architecture, DB, API, auth, content, brand, IA)
- ✅ Name locked: เดาใจ (DaoJai) / daojai.com
- ✅ Mascot concept: ใจ (Jai)
- ✅ Decisions: Next.js + Prisma + Postgres, guest mode, hybrid content

---

## Phase 1 — Pre-development (Weeks 1-2)

**Goal**: เตรียมทุกอย่างให้พร้อมก่อนเขียนโค้ด

### Deliverables

| Item | Owner | Duration |
|------|-------|----------|
| Register domain daojai.com + DNS | PM | 1 day |
| Figma wireframes all 28 screens | Designer | 5 days |
| Figma design system tokens | Designer | 2 days |
| Commission mascot illustrator | PM + Designer | 3 days briefing, 5-10 days wait |
| Infrastructure accounts setup | DevOps | 2 days |
| LINE Developer channel | DevOps | 1 day |
| Privacy policy + ToS draft | Legal | 5 days |
| Git repo + Turborepo scaffold | Dev | 2 days |
| CI/CD skeleton (GitHub Actions) | Dev | 2 days |
| Prisma Postgres setup + test connection | Dev | 1 day |
| OpenAI + Anthropic API keys | DevOps | 1 day |

### Exit criteria

- ✅ Figma design signed off
- ✅ Mascot first draft delivered
- ✅ Repo scaffolded with empty packages
- ✅ CI/CD running tests
- ✅ Infra accounts provisioned

---

## Phase 2 — MVP Build (Weeks 3-14, 12 weeks)

**Goal**: Ship 4 core features to soft launch quality

### Sprint overview (2-week sprints)

| Sprint | Weeks | Theme | Key features |
|--------|-------|-------|--------------|
| **S1** | 3-4 | Foundation | Layout, nav, auth, onboarding, design system |
| **S2** | 5-6 | Daily Horoscope | 12 signs, content pipeline, share card |
| **S3** | 7-8 | Tarot | Daily card + 3-card spread |
| **S4** | 9-10 | Compat + Birth | Compatibility + birth fortune dashboard |
| **S5** | 11-12 | Polish + Push | Notifications, streak, history |
| **S6** | 13-14 | Beta prep | Bug bash, performance, landing |

**Details in `03-sprint-plan.md`**

### Key milestones

- **Week 4**: Auth working end-to-end (Google + LINE + guest)
- **Week 6**: Daily horoscope generating live content
- **Week 8**: Tarot fully interactive (shuffle → reveal)
- **Week 10**: Compatibility shareable results
- **Week 12**: Push notifications firing
- **Week 14**: Beta-ready (feature complete)

### Content milestones

- **Week 4**: Tarot card content 50% complete (39/78 cards)
- **Week 6**: Tarot content 100% + daily horoscope first 30 days seeded
- **Week 8**: Compatibility advice library 80%
- **Week 10**: Birth fortune content (ทักษา, life path) 100%
- **Week 12**: Legal content (privacy, terms, help) finalized

---

## Phase 3 — Beta & Public Launch (Weeks 15-16)

### Week 15 — Soft Launch Beta

**Audience**: 50-100 invited users (friends, family, waitlist)
**Goals**:
- Discover P0 bugs
- Validate onboarding (≥ 80% complete step 2)
- Gather first qualitative feedback
- Test push notifications at scale

**Activities**:
- Daily standups + bug triage
- 1-on-1 user interviews (5-10 sessions)
- Analytics dashboard setup
- A/B test onboarding copy

### Week 16 — Public Launch

**Activities**:

- **Day 1 (Tue/Wed, best TH social media day)**:
  - Launch announcement on all channels
  - IG/TikTok post from brand account
  - LINE OA broadcast
  - Email waitlist (if exists)

- **Day 2-3**: Follow-up with micro-influencers (5-10 creators get early access + honest review)

- **Day 7**: Post-launch metrics review + quick wins patch

### Launch budget (estimated)

| Item | THB |
|------|-----|
| Paid ads (TikTok + FB) | 50,000 |
| Micro-influencer seeding | 40,000 |
| PR outreach | 10,000 |
| Launch party / event | 20,000 |
| **Total** | **120,000** |

---

## Phase 4 — Growth & Monetize (Month 5-10)

**Goals**:
- MAU: 10K → 50K
- Introduce **DaoJai Shine** (premium)
- Launch marketplace trial run
- Content SEO flywheel

### Month 5-6 — Growth Foundation

- SEO optimization: 200+ indexed pages
- Blog content: 2 posts/week
- Referral program (invite friend → free premium week)
- Analytics improvements
- Performance optimizations
- User feedback integration

### Month 7-8 — Monetization Launch

- **Shine Premium** goes live
  - ฿99/mo, ฿890/yr (25% off)
  - 7-day free trial
  - Features: unlimited tarot spreads, Celtic Cross, journal, monthly deep reading, ad-free
- **IAP library**:
  - Monthly deep reading ฿99
  - Yearly forecast ฿199
- **Virtual tarot decks** ฿29-99
- **Affiliate setup**: หินมงคลของ partner

### Month 9-10 — Marketplace MVP

- **Live reader marketplace** (invite-only)
  - 5-10 curated readers
  - Chat reading ฿300-800/session
  - DaoJai takes 25%
- Community features (comments on readings)
- AI advice feature (premium only)

### Phase 4 metrics targets

| Metric | Month 6 | Month 10 |
|--------|---------|----------|
| MAU | 15K | 50K |
| DAU/MAU | 22% | 25% |
| 7-day retention | 35% | 42% |
| Premium conversion | - | 2.5% |
| MRR | - | ฿150K |
| ARPU | - | ฿12 |

---

## Phase 5 — Scale & Expand (Month 11+)

### 5.1 Native mobile apps (iOS + Android)

- React Native / Expo (share logic with web)
- App Store optimization
- Native push better retention
- Target: 30% MAU from native apps

### 5.2 International expansion

- **English version** launch
  - Target: Southeast Asia first (Singapore, Philippines, Malaysia)
  - Adapt content (remove some Thai-specific features OR keep as "cultural insights")
- Later: Indonesia (largest SEA market)

### 5.3 Advanced features

- **Full natal chart** (Swiss Ephemeris) — premium only
- **Synastry relationship chart** — beyond Sun+Moon, full planet comparison
- **Solar return readings** — annual chart for birthday
- **Progressions** — advanced predictive
- **AI conversational reader** — chat with AI reader trained on DaoJai voice

### 5.4 Brand extensions

- **LINE sticker pack** (Jai) — ฿50-90/pack
- **Plushie merch** (limited edition)
- **Physical tarot deck** collab with illustrator
- **Workshops** (online/offline) — พ.ร.บ. tarot for beginners

---

## 🎯 Long-term Vision (3 Years)

- **Thailand #1 spiritual app** brand
- 1M+ MAU
- ARR ฿100M+
- Active community (Discord, in-app groups)
- Partnership with major Thai lifestyle brands
- Expansion to 5+ SEA countries

---

## Key Decisions to Revisit

| Decision | Revisit date | Trigger |
|----------|--------------|---------|
| Free-only period | Month 6 | If CAC > LTV × 3 |
| Native app timing | Month 8 | If > 40% traffic from mobile web |
| Marketplace launch | Month 9 | If > 20K MAU sustained |
| English expansion | Year 2 | If TH market saturated (growth < 15% MoM) |

---

## Dependencies & Critical Path

```
Mascot design  ──→  Design system  ──→  Dev S1
                      ↓
                 Content templates  ──→  Content library  ──→  Dev S2
                      ↓
              Infrastructure setup  ──→  Dev S1-S6
                      ↓
              Legal review  ──→  Dev S5  ──→  Beta
                                             ↓
                                     Public launch
```

### Critical path items (delays = launch delay)

- ✨ Mascot delivery (Week 2)
- ✨ Content pipeline end-to-end test (Week 6)
- ✨ Performance target met (Week 12)
- ✨ Legal / PDPA review (Week 13)
- ✨ App store / PWA manifest ready (Week 14)

---

## Revisions Log

| Date | Change | Reason |
|------|--------|--------|
| 2026-04-17 | Initial draft | Research & design complete |

---

_See also: [03-sprint-plan.md](./03-sprint-plan.md) for sprint-level detail_
