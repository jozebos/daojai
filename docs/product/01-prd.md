# 01 — Product Requirements Document (PRD)

> DaoJai MVP — Product specification สำหรับ launch Phase 1

**Version**: 1.0 Draft
**Last updated**: 2026-04-17
**Owner**: Product Team

---

## 1. Executive Summary

### 1.1 Product

**DaoJai (เดาใจ)** — แอปดูดวงออนไลน์ที่ผสานโหราศาสตร์สากลและไทย เน้น UX ที่สะอาด ใช้ง่าย และสนุก
สำหรับผู้ใช้ Gen Z / Millennial ไทยโดยเฉพาะ

### 1.2 Problem

- ผู้ใช้ Gen Z ไทยต้องการ "ดวงรายวัน" แต่เว็บไทยปัจจุบัน UX เก่า ไม่ tailored, portal รกตา
- ไม่มีแอปไทยที่ **mobile-first + modern + Thai-culture-aware** ในตลาด
- แอปสากลอย่าง Co-Star ไม่รองรับภาษาไทยหรือโหราศาสตร์ไทย (ทักษา, เลข 7 ตัว, ปีนักษัตร)

### 1.3 Solution

Product ที่รวม:
1. **ดวงรายวัน** — 12 ราศีสากล + generate content AI + human review
2. **ไพ่ทาโรต์** — Rider-Waite-Smith พร้อมคำอธิบายไทย Gen Z-friendly
3. **ดวงตามวันเกิด** — ทักษา 8 ดาว + เลข 7 ตัว + ปีนักษัตร + Big 3 (Sun/Moon/Rising)
4. **ดวงสมพงษ์** — Composite score รวม 5 ระบบ

พร้อม brand mascot "ใจ (Jai)" + voice อบอุ่นไม่ขู่

### 1.4 Target Users

- **Primary**: คนไทยอายุ 18-34 ปี (Gen Z + Millennial)
- **Secondary**: คู่รัก 20-40 ที่อยากเช็คสมพงษ์
- **Tertiary**: คนทำงานที่ต้องการ daily ritual ตอนเช้า

### 1.5 Success Metrics (north star)

**DAU ที่มี meaningful action ≥ 1 ครั้ง/วัน**

Supporting metrics:
- 7-day retention ≥ 40%
- DAU/MAU ≥ 25%
- Share rate per reading ≥ 5%

---

## 2. Goals & Non-Goals

### 2.1 Goals (Phase 1 — MVP, 3 เดือนแรก)

✅ เปิดใช้งานได้โดยไม่ต้อง signup (guest mode)
✅ 4 core features ทำงานครบ (daily/tarot/birth/compat)
✅ Mobile-first PWA
✅ Support LINE + Google login
✅ Share card สำหรับ IG story
✅ Push notification daily
✅ Content stream stable (AI + 1 editor)

### 2.2 Non-Goals (ทำ Phase หลัง)

❌ Native iOS/Android app (ใช้ PWA)
❌ Live reader marketplace
❌ Premium subscription ช่วง 6 เดือนแรก
❌ English language (Thai only)
❌ Natal chart แบบ full (เฉพาะ Sun/Moon/Rising Big 3)
❌ Voice/AR features
❌ Community / group chat
❌ E-commerce (affiliate)

---

## 3. User Personas

### 3.1 Persona 1: "น้อง Earth" — Primary target

- **อายุ**: 22 ปี, นักศึกษาปี 4 กรุงเทพ
- **อาชีพ**: Freelance graphic designer
- **อุปกรณ์**: iPhone 13 (95% use), MacBook Air
- **พฤติกรรม**:
  - เปิดแอปมือถือ 5 ชม./วัน
  - ติดตาม TikTok fortune teller 3-5 คน
  - Screenshot ดวงของตัวเองแชร์ IG story สัปดาห์ละ 1-2 ครั้ง
  - ใช้ LINE คุยเพื่อนประจำ
- **Pain points**:
  - เว็บ Sanook ดูเก่า, ad หนัก
  - Co-Star ภาษาอังกฤษอ่านเหนื่อย
  - ไม่รู้ว่า "สีห้าม" ของตัวเองคืออะไร
- **Goals**:
  - เช้าอยากรู้ "วันนี้เป็นยังไง" สั้นๆ
  - อยากเช็คดวงคู่กับแฟนที่เริ่มคุย
  - อยากได้ content สวยแชร์ลง IG

### 3.2 Persona 2: "พี่ต้น" — Secondary target

- **อายุ**: 29 ปี, Product manager สตาร์ทอัพ
- **อาชีพ**: Working
- **อุปกรณ์**: Samsung S23 + Windows
- **พฤติกรรม**:
  - ใช้แอปเยอะตอน commute 30-40 นาที
  - ซื้อ subscription ได้ (Netflix, Spotify, YouTube Premium)
  - ดูดวงเพื่อ "ปลอบใจ" ไม่ใช่ "เชื่อแรง"
- **Goals**:
  - อยากเข้าใจตัวเองมากขึ้น
  - ชอบข้อมูลละเอียด — ทักษา, Natal chart
  - อาจจ่าย ฿99/mo ถ้า premium ดีจริง

### 3.3 Persona 3: "คุณมิน" — Tertiary

- **อายุ**: 35, HR manager
- **พฤติกรรม**: ใช้ LINE OA receive ข้อมูลดวงจากเพจดัง
- **Goals**: Daily push ที่ simple + quick

---

## 4. Product Scope (MVP)

### 4.1 Features prioritization (MoSCoW)

#### 🔴 Must Have

| ID | Feature | Effort (SP) |
|----|---------|------|
| F1 | Onboarding (4 steps) | 8 |
| F2 | Birth profile (compute sun sign + Thai day + ทักษา + life path) | 13 |
| F3 | Daily horoscope (12 signs) | 13 |
| F4 | Tarot daily card | 8 |
| F5 | Tarot 3-card spread | 13 |
| F6 | Compatibility check | 21 |
| F7 | Profile dashboard | 8 |
| F8 | Auth: Google + LINE + Email | 13 |
| F9 | Guest mode + migration | 8 |
| F10 | Push notifications (web + LINE) | 13 |
| F11 | Share card (IG story template) | 8 |
| F12 | Content pipeline (AI daily generation) | 21 |
| F13 | Mascot integration (Lottie) | 5 |
| F14 | Design system + theme (dark/light) | 13 |
| F15 | Settings (profile, preferences, delete account) | 8 |

**Must Have total**: 173 story points

#### 🟡 Should Have

| ID | Feature | Effort |
|----|---------|------|
| F16 | Tarot Celtic Cross (10 cards) | 13 |
| F17 | Reading history | 8 |
| F18 | Streak + gamification | 8 |
| F19 | Tarot encyclopedia (78 cards pages) | 8 |
| F20 | Monthly deep reading | 13 |

**Should Have total**: 50 SP

#### 🟢 Could Have (Phase 2)

- Premium subscription (Shine)
- Journal
- Reading feedback
- Horoscope week/month view
- AI custom advice

#### ⚪ Won't Have (MVP)

- Native app
- Live reader marketplace
- Community
- E-commerce

### 4.2 Success criteria per feature

| Feature | Success definition |
|---------|-------------------|
| Onboarding | > 80% complete step 2 (birthday) |
| Daily horoscope | > 50% return Day 2 to check |
| Tarot daily | > 30% pull card daily |
| Compatibility | > 5% users try |
| Share card | > 5% of readings shared |

---

## 5. User Journey Maps

### 5.1 First-time visitor

```
Discover (TikTok/friend) → Visit daojai.com → Onboarding →
Get first reading → React "ตรงจริง!" → Share to friend → Return Day 2
```

**Friction points to reduce**:
- Step 2 birthday input must be < 30 seconds
- First reading visible < 10 seconds after signup
- Share flow < 3 taps

### 5.2 Daily user (returning)

```
Morning push 07:00 → Open app → Read horoscope (1-2 min) →
Pull tarot daily → Share occasionally → Close app
```

**Session length target**: 2-4 minutes daily

### 5.3 Compat check (viral mechanic)

```
Friend shares compat card IG story → Click bio link →
daojai.com → Try own compat → Share → cycle
```

---

## 6. Functional Requirements (detailed)

### 6.1 FR-Onboarding

**FR-OB-01**: User เข้าครั้งแรก เห็น landing → CTA "ลองเลย"
**FR-OB-02**: Step 1 — welcome + mascot intro (5-10 sec)
**FR-OB-03**: Step 2 — ป้อนวันเกิด (required). DatePicker + time (optional)
**FR-OB-04**: Step 3 — preferences (optional): notifications, language, theme
**FR-OB-05**: Step 4 — reveal "Your Big 3 / ทักษาของคุณ" (animated)

**Non-functional**:
- Each step < 2 seconds load
- Can go back
- Progress indicator visible

### 6.2 FR-Daily Horoscope

**FR-DH-01**: User เลือกราศีของตัวเอง → เห็นดวงวันนี้
**FR-DH-02**: Overview + 5 categories (love/career/money/health/luck) with score 1-5
**FR-DH-03**: Lucky items (color, number, direction)
**FR-DH-04**: Advice + mantra
**FR-DH-05**: Share button → IG story card

**Content requirements**:
- 12 signs × 365 days = 4,380 entries/year
- Generated 22:00 Bangkok, published 00:00
- Fallback to yesterday if fail
- Voice: positive, supportive, Gen Z

### 6.3 FR-Tarot

**FR-T-01 (daily)**: User pulls 1 card/day, deterministic per user+date
**FR-T-02 (3-card)**: Interactive shuffle → fan of 78 → user tap 3 → reveal
**FR-T-03**: Each card shows: image, name (TH+EN), upright/reversed indicator, meaning (general + category)
**FR-T-04**: Encyclopedia: browse all 78 cards with search/filter

**Non-functional**:
- Shuffle animation < 2 sec
- Card flip 400ms smooth
- Haptic feedback on mobile
- Images preload top 20

### 6.4 FR-Birth Fortune

**FR-BF-01**: Computed from birthday auto
**FR-BF-02**: Show 4 tabs:
  - Big 3 (Sun/Moon/Rising)
  - ทักษาพยากรณ์ (8 stars)
  - เลขชีวิต (Life Path)
  - ปีนักษัตร + พระประจำวัน
**FR-BF-03**: "สีมงคล + สีต้องห้าม" prominent
**FR-BF-04**: Share profile card

### 6.5 FR-Compatibility

**FR-C-01**: Form: Person A (auto from profile) + Person B + relationship type
**FR-C-02**: Compute 5 system scores → overall 0-100 + tier
**FR-C-03**: Show breakdown + 5 dimensions + advice + green/red flags
**FR-C-04**: Generate shareable slug (public URL)
**FR-C-05**: Guest mode: 1 check/day; logged in free: 3/day; (future premium: unlimited)

### 6.6 FR-Auth

**FR-A-01**: Guest = no login, cookie session 30 days
**FR-A-02**: Sign-in with Google (P0), LINE (P0), Email magic link (P1)
**FR-A-03**: On sign-up, migrate guest data
**FR-A-04**: Sign-out, sessions list, delete account (PDPA)

### 6.7 FR-Push

**FR-P-01**: Web push daily 07:00 (user timezone)
**FR-P-02**: LINE Notify option
**FR-P-03**: User can toggle in settings
**FR-P-04**: Message has personality (e.g., "เดาใจวันนี้รอคุณแล้ว ✨")

### 6.8 FR-Share

**FR-SH-01**: Generate 1080x1920 image server-side (via Satori / OG image)
**FR-SH-02**: Include DaoJai branding, mascot, reading highlight
**FR-SH-03**: Shareable via Web Share API + direct download
**FR-SH-04**: Link carries slug → landing page for viewer

---

## 7. Non-functional Requirements

### 7.1 Performance

- LCP < 2.5s (target < 1.8s)
- TTFB < 600ms
- CLS < 0.1
- Daily horoscope fully cached (< 100ms from edge)

### 7.2 Reliability

- Uptime target: 99.5% (Phase 1), 99.9% (Phase 2)
- Max 1 minute total downtime per deploy
- LLM fallback: OpenAI → Claude → cached

### 7.3 Security

- TLS only
- PDPA compliant
- No password storage (OAuth + magic link)
- Rate limiting all endpoints
- Sensitive data (birthTime) encrypted at rest

### 7.4 Accessibility

- WCAG 2.1 AA compliance
- Thai screen reader (NVDA TH, iOS/Android TH TTS)
- Reduced motion setting
- Contrast ratio ≥ 4.5:1

### 7.5 Browser/Device support

- iOS Safari 15+
- Chrome/Edge/Firefox latest 2 versions
- Samsung Internet (TH Android user base)
- Viewport 320px min width

### 7.6 Localization

- Thai primary (Buddhist calendar visible เป็น option)
- English as fallback (Phase 4 full EN)

---

## 8. Data Requirements

### 8.1 User data captured

| Data | Required | Purpose | Retention |
|------|----------|---------|-----------|
| Email | No (OAuth optional) | Login, push | Until delete |
| Birth date | Yes | Astrology | Until delete |
| Birth time | Optional | Precise Moon/Rising | Until delete |
| Birth place | Optional | Natal chart | Until delete |
| Name | Optional | Personalization | Until delete |
| Gender | Optional | Pronoun | Until delete |
| Auth tokens | Yes (if login) | Session | 30 days sliding |
| Readings | Yes (if action) | History | Until delete |
| Analytics events | Yes (anonymized) | Product improvement | 2 years |

### 8.2 PDPA compliance

- Explicit consent before collecting sensitive data
- Right to access: JSON export
- Right to erasure: 7-day cooling off + hard delete
- Data sharing disclosed: LLM (anonymized), analytics

---

## 9. Content Requirements

### 9.1 MVP launch content

- [ ] 78 Tarot cards × 5 categories × 2 orientations = 780 entries
- [ ] 12 zodiac basic profiles (~200 words each)
- [ ] Daily horoscope seed (first 30 days) for initial launch
- [ ] Compatibility advice library (49 + 144 + 81 + 144 ≈ 418 combinations — use templates)
- [ ] Birth fortune content (Life Path 1-9 + 11/22/33 = 12 profiles; ทักษา per day etc.)
- [ ] Onboarding copy
- [ ] Legal (privacy, terms)
- [ ] Help/FAQ (20-30 questions)

### 9.2 Ongoing content (post-launch)

- Daily horoscope: 12 × 1/day (AI + editor review)
- Weekly deep reading: 12 × 1/week
- Blog posts (SEO): 2-4/week

### 9.3 Content sources

- Tarot: public domain (Biddy Tarot as reference, rewritten TH)
- Zodiac: combine Western astrology + Thai astrology texts
- Daily: AI-generated via OpenAI (with astrology context from Swiss Ephemeris)

---

## 10. Dependencies

### 10.1 External services

- Vercel (hosting)
- Prisma Postgres / Neon (DB)
- Upstash (Redis)
- OpenAI (LLM) + Anthropic (fallback)
- LINE Developer (login + notify)
- Google (OAuth)
- Resend (email)
- Omise (payment, Phase 2)
- Cloudflare R2 / Images

### 10.2 Internal dependencies

- Design team (Figma wireframes)
- Content team (1 editor)
- Illustrator (freelance, mascot)
- Legal (PDPA policy review)

---

## 11. Risks & Mitigations

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|-----------|
| Content hallucination harmful | M | H | Safety filter + human review queue |
| LLM cost runs away at scale | M | M | Caching + prompt optimization + budget alerts |
| Low conversion guest → signup | H | M | Delayed signup wall, save-reading hook |
| TikTok trend dies | M | M | SEO + LINE OA backup channel |
| PDPA fine | L | H | Legal review pre-launch |
| Competitor copies fast | H | M | Content moat + brand (ใจ mascot) |
| Developer team turnover | L | M | Strong docs (this one!) + onboarding |

---

## 12. Launch Plan

### 12.1 Beta (Soft launch)

- **Date**: T+10 weeks from dev start
- **Audience**: 50-100 friends & family + waitlist
- **Goal**: Find critical bugs, validate copy/tone
- **Duration**: 2 weeks

### 12.2 Public launch

- **Date**: T+12 weeks
- **Channels**:
  - TikTok micro-influencer seeding (5-10 creators)
  - IG/Facebook paid ads (modest budget ฿30K)
  - LINE OA announcement (if existing audience)
  - Product Hunt (English version — optional)
  - PR: tech media coverage (pitch Brand Inside, Marketeer)

### 12.3 Post-launch (30 days)

- Daily metrics review
- User feedback session weekly
- Content cadence stable
- Bug fix SLA: P0 < 4h, P1 < 24h

---

## 13. Open Questions

| # | Question | Decision needed by |
|---|----------|-------------------|
| 1 | LINE LIFF support in Phase 1? | Week 3 |
| 2 | Push notification content style (A/B test vs fixed)? | Week 5 |
| 3 | Default deck sprite size (performance trade-off)? | Week 4 |
| 4 | Referral program Phase 1 or 2? | Week 8 |
| 5 | Free tier: ads or strict free? | Week 10 |

---

## 14. Approvals

| Role | Name | Signed |
|------|------|--------|
| Product Owner | - | - |
| Engineering Lead | - | - |
| Design Lead | - | - |
| Content Lead | - | - |

---

_See also: [02-roadmap.md](./02-roadmap.md), [03-sprint-plan.md](./03-sprint-plan.md)_
