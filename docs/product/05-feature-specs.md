# 05 — Feature Specifications

> Detailed user-facing specifications per feature — ready for engineering to implement

---

## 📋 Format

Each feature spec contains:
- **Overview** (1-2 sentence)
- **User stories** (as a... I want... so that...)
- **UI/UX specifications**
- **Acceptance criteria** (testable)
- **Edge cases**
- **Analytics events**
- **Dependencies**

---

## F1 — Onboarding

### Overview

4-step flow for new users to set up birth profile and reach their first reading in < 60 seconds.

### User stories

- **US-1.1** As a first-time visitor, I want to try DaoJai quickly, so that I don't feel forced to sign up
- **US-1.2** As a user, I want to enter my birthday easily, so that I get personalized readings
- **US-1.3** As a user, I want to skip optional steps, so that I can get to content faster

### UI/UX

**Step 1 — Welcome**
- Mascot Jai waves
- Headline: "ยินดีต้อนรับสู่ DaoJai ✨"
- Subtitle: "เดาใจเขา เดาใจคุณ — ในแบบของคุณ"
- CTA: "เริ่มเลย →"
- Bottom: "มีบัญชีอยู่แล้ว? [เข้าสู่ระบบ]"

**Step 2 — Birthday** (required)
- Headline: "ขอวันเกิดคุณหน่อยนะ ✨"
- Subtitle: "เพื่อคำนวณดาวประจำตัวให้แม่นยำ"
- DatePicker: default Thai year display (พ.ศ.), toggle ค.ศ.
  - Year range: 1924-2008 (100 years back)
- Toggle: "ใส่เวลาเกิดด้วย?" (optional)
  - If on: TimePicker HH:MM
- CTA: "ถัดไป →" (disabled if no date)
- Back button

**Step 3 — Preferences** (skippable)
- Headline: "ปรับให้เป็นคุณ"
- Fields:
  - Nickname (text, optional)
  - Theme: [ดาร์ก] [สว่าง] [อัตโนมัติ] (default: ดาร์ก)
  - Notification: "ส่งดวงวันนี้เช้า 7 โมงไหม?" Yes/No
  - Language: [ไทย] [English] (default: ไทย)
- CTA: "ถัดไป →" or "ข้ามไปก่อน"

**Step 4 — Reveal**
- Loading animation: 3-5 seconds "กำลังคำนวณเดาใจของคุณ..."
- Reveal: "ยินดีต้อนรับ, {ชื่อเล่น}! 🌟"
- Show:
  - Sun sign ("คุณคือราศีสิงห์ ♌︎")
  - วันเกิดไทย + ดาวประจำวัน
  - Preview ดวงวันนี้ (1 sentence)
- CTA: "ไปดูดวงวันนี้ →" → `/dashboard`

### Acceptance criteria

- [ ] User can complete Step 1-4 in < 60 seconds
- [ ] Step 2 birthday input validates (no future dates, reasonable range)
- [ ] Step 3 fully skippable (all fields optional)
- [ ] Guest session created at Step 1 (not waiting for signup)
- [ ] Profile saved to backend at Step 4 reveal
- [ ] Back button works at any step without data loss
- [ ] Mascot animations play smoothly (or show static fallback if reduce-motion)
- [ ] Works on 320px wide screen

### Edge cases

- User closes browser mid-onboarding → next visit: resume at last step completed
- User enters date in future → error message "ลองเช็ควันเกิดอีกทีนะ"
- User enters very old date (< 1900) → warn "ใส่วันจริงใช่ไหม?"

### Analytics

- `onboarding.started` at Step 1 mount
- `onboarding.step_completed` { step: 1-4 }
- `onboarding.skipped_step` { step }
- `onboarding.completed` { durationSec, hadTime, hadNickname }
- `onboarding.abandoned` { lastStep }

### Dependencies

- Birth profile compute library (packages/astrology)
- Mascot Lottie (welcome wave, thinking)
- DatePicker with Thai year

---

## F2 — Daily Horoscope

### Overview

Personalized daily horoscope for user's sun sign, updated at 00:00 Bangkok, with 5 category breakdowns.

### User stories

- **US-2.1** As a user, I want to see my horoscope as soon as I open the app, so that I don't search
- **US-2.2** As a user, I want to know specific categories (love, career, ...), so that I can plan my day
- **US-2.3** As a user, I want to share my horoscope to IG, so that my friends see it

### UI/UX

**Dashboard hero (`/`)**
```
┌───────────────────────────────────────┐
│  [Mascot]  อรุณสวัสดิ์, {ชื่อ} ~          │
│                                       │
│  ♌︎ ดวงวันนี้ของราศีสิงห์                │
│  17 เมษายน 2026 • 2nd quarter moon    │
│                                       │
│  [Gradient card - tap to expand]      │
│  วันนี้พระอาทิตย์ส่งพลังให้...            │
│  ★★★★☆ พลังงานวันนี้                    │
│                                       │
│  [Read full →]  [Share ↗]             │
└───────────────────────────────────────┘
```

**Full horoscope page (`/horoscope/[sign]`)**

Layout:
1. Header: ราศี + วันที่ + moon phase (small)
2. Overview (3 lines)
3. 5 categories: ความรัก | การงาน | การเงิน | สุขภาพ | โชคลาภ (each with ★ score)
4. Lucky items: สี, เลข, ทิศ, เวลา (horizontal scroll on mobile)
5. Should avoid
6. Advice
7. Mantra (italic, special styling)
8. Action bar: Share | Screenshot | Pull tarot card

### Acceptance criteria

- [ ] Content loads from edge cache (< 200ms)
- [ ] Share button generates 1080x1920 IG story image
- [ ] Image includes DaoJai branding + mascot + horoscope summary
- [ ] User can view horoscope for other signs (tab switcher top)
- [ ] Date parameter works `?date=YYYY-MM-DD` for history
- [ ] No ads in reading view

### Edge cases

- Content not yet generated → show yesterday's + "กำลังเตรียมของวันนี้~"
- User's sign not set → redirect to onboarding
- Future date requested → 404

### Analytics

- `horoscope.viewed` { sign, date, isOwnSign, source: "dashboard"|"direct"|"nav" }
- `horoscope.shared` { sign, platform }
- `horoscope.sign_switched` { from, to }

---

## F3 — Tarot Daily Card

### Overview

One tarot card per user per day, deterministic (same seed = same card), with ritual UI.

### User stories

- **US-3.1** As a user, I want a daily tarot card as a ritual, so that I have a small moment of reflection
- **US-3.2** As a user, I want the card to feel "earned" via ritual, so that it feels meaningful

### UI/UX

**Entry** `/tarot/daily`
- Card back in center of screen
- Subtitle: "ไพ่วันนี้ของคุณ — ยังไม่เปิด"
- Card back subtle animation (floating)
- CTA: "แตะเพื่อสับไพ่" or if already drawn: "ดูไพ่"

**Ritual (new draw only)**
1. Tap card back → shuffle animation (2 sec, cards fly)
2. After shuffle: "หายใจลึกๆ 3 ครั้ง แล้วแตะเพื่อเปิด"
3. User taps → card flip animation (500ms)
4. Card reveal full screen with name
5. Progressive disclosure:
   - Hero: card image + name + upright/reversed badge
   - Below: keywords (chips)
   - Below: general meaning (expandable)
   - Below: Today's relevance (AI-enhanced via LLM for context)
   - Bottom: Actions [Save] [Share] [Pull 3-card instead]

**If already drawn today**:
- Show card directly
- Badge: "ไพ่วันนี้ของคุณ (เปิดแล้วเวลา 07:34)"

### Acceptance criteria

- [ ] Draw idempotent per user per day (same card)
- [ ] Guest can draw (by cookie id)
- [ ] Card back animation smooth 60fps
- [ ] Flip animation respects reduced-motion
- [ ] Haptic feedback on shuffle + flip (mobile)
- [ ] Share generates image with card + key insight
- [ ] Navigation to 3-card spread retains context

### Edge cases

- User changes device mid-day → same card (by userId)
- Guest moves to different device → different card (cookie not shared)
- Timezone: always Bangkok day boundary

### Analytics

- `tarot.daily_viewed`
- `tarot.ritual_started`
- `tarot.card_revealed` { cardId, isReversed, wasNewDraw }
- `tarot.daily_shared`

---

## F4 — Tarot 3-Card Spread

### Overview

Interactive 3-card spread with past/present/future positions, user selects cards from a fan of 78.

### User stories

- **US-4.1** As a user, I want to ask a specific question and get 3 cards, so that I feel control
- **US-4.2** As a user, I want to see the cards as a story, so that it makes sense together

### UI/UX

**Step 1 — Question**
- Optional text input: "คุณอยากถามเรื่องอะไร?"
- Quick chips: [ชีวิต] [ความรัก] [การงาน] [การเงิน] [สุขภาพ]
- CTA: "สับไพ่ →"

**Step 2 — Shuffle**
- Full-screen animation: cards shuffling (~3 seconds)
- Mascot: "กำลังสับให้นะ ~"
- Haptic on mobile

**Step 3 — Select**
- Fan of 78 face-down cards (arc shape)
- Instruction: "เลือก 3 ใบที่รู้สึกว่าเรียกคุณ"
- User taps → selected card glows + lifts up + moves to reveal area
- Counter: "1/3, 2/3, 3/3"
- After 3 selected → auto proceed to reveal

**Step 4 — Reveal (sequential)**
- Card 1 flips → "อดีต" label → meaning reveals (stagger)
- User scrolls / swipes → Card 2 "ปัจจุบัน"
- Scroll → Card 3 "อนาคต"

**Step 5 — Narrative**
- LLM-generated story connecting 3 cards (30-50 words)
- Actions: [Save] [Share] [New reading]

### Acceptance criteria

- [ ] 78 cards shuffle uniformly (Fisher-Yates)
- [ ] User can choose any 3 (no hidden bias)
- [ ] Reversed cards appear ~50% of time (toggle in settings)
- [ ] LLM narrative generates in < 5 sec, shows spinner
- [ ] Share includes all 3 cards + narrative snippet
- [ ] Guest rate limit: 1 spread per 6 hours; logged free: 3/day

### Edge cases

- LLM fails → show pre-written generic narrative
- User closes mid-selection → unsaved, can retry
- User double-taps same card → ignore (already selected)

### Analytics

- `tarot.spread_started` { spreadType: 'three_card', category }
- `tarot.card_selected` { position, cardId }
- `tarot.spread_completed` { durationSec }
- `tarot.narrative_generated` { latencyMs }

---

## F5 — Compatibility Check

### Overview

Calculate compatibility score (0-100) between 2 people using 5 astrological systems, with breakdown and advice.

### User stories

- **US-5.1** As a user, I want to check if I'm compatible with someone, so that I understand dynamics
- **US-5.2** As a user, I want to share my compatibility result, so that my partner can see it

### UI/UX

**Entry** `/compatibility`

**Step 1 — Type selection**
- 5 chips: [คู่รัก] [คู่คุย] [เพื่อน] [ครอบครัว] [คู่ธุรกิจ]
- Default: คู่รัก

**Step 2 — Person A**
- Toggle: "เป็นฉันเอง" (auto-fill from profile)
- If user logged in + has profile → auto-check
- Name + birthday (+ optional time)

**Step 3 — Person B**
- Name (required, shows in result)
- Birthday (required)
- Birth time (optional)
- Optional: profile picture (for avatar in result)

**Step 4 — Calculating animation**
- 2 dots/stars orbiting each other, converging
- Mascot Jai thinking expression
- 3-5 seconds

**Step 5 — Result page**
```
┌───────────────────────────────────────┐
│  [Avatar A] + [Avatar B]              │
│  นิก × มิน                            │
│  (คู่รัก)                             │
│                                       │
│        ◉ 82 / 100                    │
│       🥰 High Match                   │
│                                       │
│  [Radar chart 5 dimensions]           │
│  อารมณ์   █████████░                  │
│  สื่อสาร  ████████░░                  │
│  ฟิสิคอล  █████████░                  │
│  ยืนยาว  ██████░░░░                   │
│  มิตรภาพ  ██████████                  │
│                                       │
│  ✨ จุดแข็ง                            │
│  • เคมีเรื่องเป้าหมายตรงกัน           │
│  • สื่อสารได้เปิด                     │
│  • เล่นด้วยกันได้                     │
│                                       │
│  ⚠️ ข้อสังเกต                          │
│  • มีความต้องการเรื่องเวลาไม่ตรง       │
│  • คนหนึ่งชอบวางแผน อีกคนชอบสบายๆ      │
│                                       │
│  💡 คำแนะนำ                           │
│  (2 paragraphs...)                    │
│                                       │
│  [ แชร์ลง IG ] [ เซฟรูป ]             │
└───────────────────────────────────────┘
```

### Acceptance criteria

- [ ] Scoring algorithm documented + tested (deterministic per input pair)
- [ ] LLM advice generated in < 8 sec, streaming
- [ ] Result has unique URL `/compatibility/result/[slug]`
- [ ] OG image renders (compat card for social embedding)
- [ ] Share URL works publicly (no auth required to view)
- [ ] Guest: 1 check/day free; logged free: 3/day; premium: unlimited
- [ ] Tier emoji matches score accurately

### Edge cases

- Same birthday two people → "คู่แฝด! ถ้าไม่ใช่เกิดวันเดียวกัน ลองเช็คนะ" fun tone
- Birth before 1900 → error
- Same person twice → "เช็คตัวเองเหรอ? ลองเพื่อนคนอื่นดีกว่า 😄"

### Analytics

- `compat.started`
- `compat.completed` { overall, tier, relType, hasTimes }
- `compat.shared` { platform }
- `compat.viewed_shared` { slug } (viewer analytics)

---

## F6 — Birth Chart Dashboard

### Overview

Comprehensive personal "chart" showing 4 systems of birth interpretation.

### User stories

- **US-6.1** As a user, I want to see all my astrology data in one place, so that I understand myself
- **US-6.2** As a user, I want beautiful share cards of my profile, so that I can show friends

### UI/UX

**Top card — The Big 3**
```
┌───────────────────────────────────────┐
│  Your Big 3 ⭐                          │
│  ☉ Sun:    ♌︎ สิงห์                    │
│  ☽ Moon:   ♋︎ กรกฎ (ใส่เวลาเพิ่ม)       │
│  ↑ Rising: ♎︎ ตุลย์                     │
└───────────────────────────────────────┘
```

**Tabs** (swipeable on mobile):
1. **Big 3** — Sun/Moon/Rising with 2-sentence description each
2. **ทักษา** — 8-star wheel visualization + list (บริวาร → กาลกิณี)
3. **เลขชีวิต** — Life Path number + meaning
4. **ปีนักษัตร & พระ** — Animal + Buddha image + day info

**Action**:
- "แชร์โปรไฟล์ของฉัน" → generate beautiful profile card (IG-story size)
- "ดูรายละเอียดเพิ่ม" → article per topic

### Acceptance criteria

- [ ] All 4 tabs computed correctly from birth date
- [ ] Moon/Rising only shown if birthTime provided (otherwise skeleton + CTA to add)
- [ ] ทักษา wheel animates (8 stars rotating subtle)
- [ ] Profile card shareable with all 4 data points
- [ ] Can revisit any time from nav

### Edge cases

- No birthTime → show Big 3 as Sun only + prompt to add
- Master numbers (11/22/33) → show master badge, explain

### Analytics

- `birth_chart.viewed` { tab? }
- `birth_chart.tab_switched` { from, to }
- `birth_chart.shared`
- `birth_chart.added_birth_time`

---

## F7 — Push Notifications

### Overview

Daily morning push + weekly insights + re-engagement for inactive users.

### User stories

- **US-7.1** As a user, I want a daily ritual reminder, so that I don't forget to check
- **US-7.2** As a user, I want to control notification frequency, so that I'm not spammed

### Specification

**Daily push** (07:00 user timezone)
- Channel: Web Push OR LINE Notify (user choice)
- Content variations (to avoid fatigue):
  - "เดาใจวันนี้รอคุณแล้ว ✨"
  - "เปิดดูดวงวันนี้สักนิด — เราจะบอกว่า..."
  - "สัปดาห์นี้ {day} — {mood hint}"
  - "พลังงานวันนี้... แตกต่างนะ เข้ามาดู"
- Deep link → `/` (dashboard)

**Milestone push**
- Streak 7 days: "🎉 7 วันแล้ว! เก่งมาก"
- Streak 30 days: "🔥 30 วันต่อเนื่อง — ของจริง"

**Re-engagement**
- Day 3 no-activity: "เดาใจคิดถึงคุณนะ ✨"
- Day 7: "แล้วกลับมาคุยกันใหม่?"
- Day 14: reduce frequency

**Control**
- Settings page:
  - Daily on/off
  - Weekly on/off
  - Re-engage on/off
  - Channel preference (web/LINE/email)
  - Quiet hours

### Acceptance criteria

- [ ] Web Push permission asked politely (not on Day 1)
- [ ] LINE Notify link works via OA
- [ ] Cron sends to user's timezone
- [ ] User can opt-out instantly
- [ ] Analytics tracks open rate + CTR

### Edge cases

- User denied web push → fall back to LINE offer
- LINE unbind → re-ask
- Daylight saving / timezone shift → use IANA tz

### Analytics

- `push.permission_prompted`
- `push.permission_granted` { channel }
- `push.permission_denied`
- `push.sent` { type, channel, messageId }
- `push.clicked` { type, messageId }
- `push.dismissed`

---

## F8 — Sharing

### Overview

Generate beautiful 1080x1920 IG-story-sized PNG with branding for any reading.

### Technical approach

- Use **Satori** (Vercel's JSX-to-SVG lib) + **@resvg/resvg-js** (SVG to PNG)
- Server-side render via OG image API routes
- Template system: horoscope, tarot single, tarot spread, compatibility, profile

### Templates

**Horoscope template**
```
┌─── 1080 × 1920 ───┐
│ DAOJAI logo top   │
│                   │
│ [Mascot peeking]  │
│                   │
│ ♌︎ ราศีสิงห์        │
│ 17 เม.ย. 2026     │
│                   │
│ [key insight      │
│  quote - 2 lines] │
│                   │
│ [star rating]     │
│                   │
│ daojai.com bottom │
└───────────────────┘
```

### Acceptance criteria

- [ ] Images render in < 3 seconds
- [ ] All templates have consistent branding
- [ ] Dynamic text fits (truncate with ellipsis)
- [ ] No broken unicode (Thai correct)
- [ ] Image downloadable + Web Share API supports on mobile
- [ ] OG image also used as link preview

### Edge cases

- Very long user name → truncate
- User with emoji in name → preserve
- Image generation fails → fallback to simple card

### Analytics

- `share.requested` { type }
- `share.generated` { type, latencyMs }
- `share.downloaded` { type }
- `share.native_shared` { type, platform }

---

## F9 — Reading History

### Overview

List of past readings for logged-in users.

### UI

- List view with cards: date, type, preview
- Filter: by type (all | horoscope | tarot | compat)
- Tap → full reading detail
- Swipe to delete (with confirm)

### Acceptance criteria

- [ ] Paginated (20 per page)
- [ ] Sort: newest first
- [ ] Search by question/category (Phase 2)
- [ ] Delete = soft delete + auto-purge after 30 days
- [ ] Guest: no history (prompt to sign up)

---

## F10 — Settings

### Overview

User account, preferences, data control.

### Sections

1. **Profile**
   - Edit name, birthday, birth time, place
   - Change avatar

2. **Preferences**
   - Theme (dark/light/auto)
   - Language (th/en)
   - Notifications (daily, weekly, re-engage)
   - Reduced motion
   - Reading deck preference

3. **Subscription** (Phase 2)
   - Current tier
   - Change/cancel
   - Payment history

4. **Data & Privacy**
   - Export my data (JSON)
   - Delete account (7-day cooling off)
   - Data sharing consent toggle
   - Connected accounts (unlink)

5. **Help & About**
   - Help center link
   - Contact support
   - Version info
   - Legal: Privacy, Terms

### Acceptance criteria

- [ ] All changes save immediately + confirm toast
- [ ] Delete account triggers confirmation flow + email
- [ ] Data export generates ZIP with JSON + images
- [ ] Timezone auto-detect with override option

---

## 📊 Feature Dependency Graph

```
F1 Onboarding
    ↓
F2 Daily Horoscope  ← F7 Push
    ↓
F3 Tarot Daily ← F8 Share
    ↓
F4 Tarot 3-card
    ↓
F5 Compatibility ← F8 Share
    ↓
F6 Birth Chart ← F8 Share
    ↓
F9 History (requires auth)
F10 Settings (requires auth)
```

---

_See also: [01-prd.md](./01-prd.md) for high-level requirements_
