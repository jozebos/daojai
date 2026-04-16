# 04 — Success Metrics (KPIs, OKRs, North Star)

> How we measure DaoJai's progress and success

---

## 🎯 North Star Metric

> **Daily Active Users with at least 1 meaningful action (MADAU)**

**Why this metric?**
- "Meaningful action" = อ่านดวง / เปิดไพ่ / เช็คสมพงษ์ / edit profile
- กรองผู้ใช้ที่เปิดแล้วปิดทันที
- Leading indicator ของ retention, word-of-mouth, revenue

### Sub-metrics ที่รองรับ north star

- Depth: session length, actions per session
- Breadth: features used per user
- Retention: 1-day, 7-day, 30-day
- Velocity: time to first meaningful action (TTFA)

---

## 📊 Funnel Metrics (Acquisition → Retention → Revenue)

### Acquisition

| Metric | Definition | Target (Month 6) | Target (Year 1) |
|--------|-----------|----|----|
| Unique visitors / month | distinct visitors | 50K | 200K |
| New signup conversion | visitor → account | 8% | 12% |
| Sign-up → active (D1) | signup that returns Day 1 | 60% | 75% |
| Organic traffic ratio | organic / total | 40% | 60% |
| CAC blended | paid cost / new user | ฿50 | ฿30 |

### Activation

| Metric | Target |
|--------|--------|
| Onboarding completion | ≥ 85% reach step 4 |
| Time to first reading | < 60 seconds from landing |
| Birth profile completion | ≥ 95% (after onboarding) |

### Retention

| Metric | Target (Month 6) | Target (Year 1) |
|--------|------------------|------------------|
| D1 retention | 60% | 70% |
| D7 retention | 35% | 45% |
| D30 retention | 15% | 25% |
| **DAU/MAU** | **22%** | **28%** |
| Monthly churn | < 12% | < 8% |

### Engagement

| Metric | Target |
|--------|--------|
| Sessions per DAU | 1.5 |
| Session length | 3 min avg |
| Readings per user/week | 4 |
| Share rate per reading | 5% |
| Push open rate | 20% |

### Revenue (Phase 2+, Month 7+)

| Metric | Target (Month 12) |
|--------|------------------|
| Free → Premium conversion | 2.5% |
| MRR | ฿200K |
| ARR | ฿2.4M |
| ARPU (paying) | ฿99 |
| ARPU (blended) | ฿10 |
| LTV (paying) | ฿2,000 (20 months avg) |
| LTV:CAC | ≥ 3:1 |

---

## 🏆 OKRs by Phase

### Phase 1 (Pre-dev, Weeks 1-2)

**Objective**: Set foundation for efficient development

- KR1: Design system complete in Figma — 100% of 28 screens wireframed
- KR2: Mascot v1 delivered — 10 expressions + 3 Lottie animations
- KR3: Infrastructure provisioned — 100% of services (Vercel, DB, Redis, APIs) accessible
- KR4: Legal draft complete — Privacy Policy + ToS first draft

### Phase 2 (MVP Build, Weeks 3-14)

**Objective**: Ship a delightful MVP ready for beta

- KR1: 4 core features complete (daily/tarot/birth/compat) — 100% acceptance criteria
- KR2: Content library seeded — 78 tarot × all categories + 30 days horoscope ahead
- KR3: Performance targets met — LCP < 2.5s on p75 devices
- KR4: Zero P0 bugs at end of S6

### Phase 3 (Beta & Launch, Weeks 15-16)

**Objective**: Public launch with viral potential

- KR1: 500 beta users onboarded with feedback collected
- KR2: At least 3 TikTok micro-influencer posts go live
- KR3: Zero P0 bugs in first 14 days post-launch
- KR4: Launch day DAU ≥ 2,000

### Phase 4 (Growth, Month 5-10)

**Objective**: Achieve product-market fit signals + introduce revenue

- KR1: MAU reaches 50,000 by Month 10
- KR2: D7 retention stabilizes at 40%+
- KR3: Premium launches with ≥ 2% conversion in first 90 days
- KR4: Organic traffic = 60% of total by Month 10
- KR5: NPS ≥ 50

### Phase 5 (Scale, Month 11+)

**Objective**: Reach #1 position in TH spiritual app market

- KR1: MAU reaches 200,000
- KR2: MRR ≥ ฿1M
- KR3: Launch native apps with 30% MAU share within 6 months
- KR4: Launch English version in 3+ countries

---

## 🧩 Feature-level Metrics

### Daily Horoscope

| Metric | Target |
|--------|--------|
| Daily readers / DAU | ≥ 80% |
| Avg read time | 40-60 seconds |
| Share rate | ≥ 5% |
| Feedback ratio (accurate/total) | ≥ 70% |
| Content complaint rate | < 0.5% |

### Tarot

| Metric | Target |
|--------|--------|
| Daily card pull rate / DAU | ≥ 30% |
| 3-card spread weekly use rate | ≥ 20% |
| Avg cards viewed (encyclopedia) | 5 per session |
| Animation satisfaction (qual) | "delightful" feedback > 50% |

### Compatibility

| Metric | Target |
|--------|--------|
| % MAU who tries | ≥ 30% |
| Avg checks per user | 2-3 |
| Share rate | ≥ 15% (higher than horoscope) |
| Result page viral coefficient (K-factor) | ≥ 0.5 |

### Birth Chart

| Metric | Target |
|--------|--------|
| Birth time provided | ≥ 40% |
| Revisits to birth-chart page | 2+ per month |
| Screenshots of profile card (via analytics) | ≥ 20% |

### Premium (Phase 2+)

| Metric | Target |
|--------|--------|
| Trial start rate (visit pricing → start trial) | 15% |
| Trial → paid conversion | 30% |
| 6-month retention | 70% |
| Yearly plan adoption | 40% of paying |

---

## 📈 Measurement Infrastructure

### Tools

- **PostHog** — product analytics (events, funnels, cohorts, session replay)
- **Vercel Analytics** — traffic + Core Web Vitals
- **Sentry** — errors + performance
- **Prisma + custom queries** — business metrics DB query
- **Slack + Datadog** — alerts for anomalies

### Event taxonomy

```typescript
// Core product events
track('app.viewed',           { route, userId?, guestId? })
track('onboarding.started')
track('onboarding.completed', { durationSec })
track('profile.created',      { hasBirthTime, hasPlace })

track('horoscope.viewed',     { sign, isOwnSign })
track('horoscope.shared',     { platform, sign })

track('tarot.ritual_started', { spreadType })
track('tarot.card_drawn',     { cardId, isReversed, spreadType, position })
track('tarot.ritual_completed', { spreadType, durationSec, cardsDrawn })
track('tarot.shared',         { platform, spreadType })

track('compatibility.started')
track('compatibility.completed', { overallScore, tier, relType })
track('compatibility.shared', { platform, tier })

track('reading.saved',        { readingId, type })
track('reading.feedback',     { readingId, feedback })

track('push.subscribed',      { channel })
track('push.clicked',         { content })

track('streak.updated',       { days, milestone? })

track('signup.started',       { provider })
track('signup.completed',     { provider, wasGuest })

// Phase 2+
track('subscription.viewed')
track('subscription.checkout_started', { interval })
track('subscription.activated', { tier, interval })
track('subscription.canceled', { reason?, daysActive })
```

### Dashboards

- **Realtime** — DAU now, errors, active pushes
- **Daily** — acquisition funnel, retention cohorts, feature adoption
- **Weekly** — sprint metrics vs targets, content pipeline health
- **Monthly** — OKR progress, revenue (when applicable), NPS

### Reporting cadence

- **Daily auto-digest** Slack at 9:00 (yesterday's key metrics)
- **Weekly review** Monday morning team meeting
- **Monthly business review** all-hands
- **Quarterly OKR check** + next quarter planning

---

## 🎤 Qualitative Metrics

### User satisfaction

- **NPS** — survey 30 days post-signup, "How likely would you recommend?"
  - Target: ≥ 40 (good), ≥ 50 (great), ≥ 70 (excellent)
- **CSAT** after each reading — "How was this reading?"
  - Target: ≥ 4.2 / 5

### User feedback collection

- In-app feedback button
- Post-reading reaction (accurate / neutral / inaccurate)
- Monthly user interview (5-10 users)
- App store reviews (when native launches)
- Social listening (TikTok/IG mentions)

---

## ⚠️ Early Warning Signals

| Signal | Meaning | Action |
|--------|---------|--------|
| D1 retention < 50% | Onboarding broken | Onboarding audit |
| Push open rate < 10% | Message not resonating | A/B test copy |
| Share rate < 2% | UX/content not shareable | Design review |
| Content complaint > 1% | AI content issues | Review + tighten safety filter |
| Sentry error rate > 2% | Bug regression | Hotfix + root cause |
| LLM cost > budget × 1.5 | Runaway cost | Cap + optimize prompts |
| CAC > LTV / 3 | Unprofitable growth | Pause paid, focus organic |

---

## 💡 Metrics Principles

1. **Start with lagging, add leading** — Revenue is lagging; engagement is leading
2. **One metric per level** — Don't dilute with too many "important" metrics
3. **Instrument before launch** — Every critical event tracked from Day 1
4. **Review religiously** — Monday morning meeting inviolable
5. **Act on data** — Every metric has an owner + action plan if off-track
6. **Avoid vanity metrics** — Don't celebrate pageviews without retention

---

## 🏁 Definition of Success

### 3-month success (post-launch)

- [ ] 10,000 MAU
- [ ] D7 retention ≥ 35%
- [ ] NPS ≥ 35
- [ ] 3 viral moments (content that 10K+ people shared)
- [ ] Break-even on CAC within 6 months (cumulative)

### 12-month success

- [ ] 100,000 MAU
- [ ] MRR ≥ ฿200,000 (from premium + IAP)
- [ ] Featured on at least 2 tech media (Brand Inside, Thairath, etc.)
- [ ] TikTok community of 20+ creators using DaoJai as go-to tool
- [ ] Team grown to 6-8 people sustainably

### 24-month success

- [ ] Thailand's #1 spiritual app
- [ ] 500K MAU
- [ ] ARR ฿25M+
- [ ] Profitable unit economics
- [ ] Native mobile apps launched

---

_See also: [01-prd.md](./01-prd.md) for feature-level definitions of done_
