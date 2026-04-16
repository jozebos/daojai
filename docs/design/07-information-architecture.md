# 07 — Information Architecture & Key Flows

> Sitemap, navigation structure, และ user flows หลักสำหรับ DaoJai

---

## 1. Sitemap

```
daojai.com
│
├── / (Home / Today)                              [public, guest-friendly]
│   └── Hero: "ดวงวันนี้ของคุณ"
│
├── /onboarding                                   [first-time]
│   ├── /step-1-welcome
│   ├── /step-2-birthday
│   ├── /step-3-preferences
│   └── /step-4-result
│
├── /horoscope                                    [public]
│   ├── /horoscope                                → landing สิบสองราศี
│   └── /horoscope/[sign]                         → e.g. /horoscope/leo
│       └── ?date=YYYY-MM-DD                      → ดวงย้อนหลัง
│
├── /tarot                                        [public + semi-gated]
│   ├── /tarot                                    → hub: choose spread
│   ├── /tarot/daily                              → 1-card daily
│   ├── /tarot/3-card                             → 3-card spread
│   ├── /tarot/love                               → 7-card relationship
│   ├── /tarot/celtic                             → 10-card Celtic Cross [premium]
│   └── /tarot/cards                              → สำรับไพ่ 78 ใบ (educational)
│       └── /tarot/cards/[id]                     → รายละเอียดไพ่ใบเดียว
│
├── /birth-chart                                  [needs profile]
│   ├── /birth-chart                              → landing
│   └── /birth-chart/me                           → personal chart
│
├── /compatibility                                [public, can guest]
│   ├── /compatibility                            → form
│   ├── /compatibility/result/[slug]              → shared result (public)
│   └── /compatibility/history                    → [auth] past checks
│
├── /journal                                      [premium]
│   ├── /journal                                  → list
│   └── /journal/[id]                             → entry
│
├── /readings                                     [auth]
│   └── /readings/history                         → all past readings
│
├── /shine                                        [public]
│   ├── /shine                                    → premium landing
│   └── /shine/checkout                           → checkout flow
│
├── /settings                                     [auth]
│   ├── /settings/profile
│   ├── /settings/preferences                     → theme, notifications
│   ├── /settings/subscription
│   ├── /settings/data-export
│   └── /settings/delete-account
│
├── /sign-in                                      [public]
│   ├── /sign-in/error
│   └── /sign-in/verify-request                   → magic link
│
├── /share                                        [public]
│   └── /share/[slug]                             → share card view
│
├── /about                                        [public marketing]
├── /pricing                                      [public marketing]
├── /blog                                         [public — SEO]
│   └── /blog/[slug]
│
├── /privacy
├── /terms
├── /help
└── /api/*                                        [REST + webhooks]
```

---

## 2. Navigation Structure

### 2.1 Primary navigation (mobile bottom bar, 5 tabs)

```
┌──────────────────────────────────────────┐
│                                          │
│         [ App Content ]                  │
│                                          │
├──────────────────────────────────────────┤
│  🌟       🎴       💞       👤       ⚙️  │
│ Today   Tarot   Compat    Me    Set   │
└──────────────────────────────────────────┘
```

| Tab | Icon | Label (TH) | Route |
|-----|------|-----------|-------|
| 1 | 🌟 (sun/moon) | วันนี้ | `/` |
| 2 | 🎴 (cards) | ไพ่ | `/tarot` |
| 3 | 💞 (hearts) | คู่ | `/compatibility` |
| 4 | 👤 (profile) | ของฉัน | `/birth-chart/me` or `/sign-in` |
| 5 | ⚙️ (gear) | ตั้งค่า | `/settings` |

### 2.2 Desktop navigation (top bar)

```
┌──────────────────────────────────────────────────────┐
│ ✨ เดาใจ    วันนี้  ไพ่  คู่  แผนที่ดาว  |  🎯 Shine  👤│
└──────────────────────────────────────────────────────┘
```

### 2.3 Secondary navigation

- **Tarot hub**: หมุนเลือก spread ใน card pile
- **Settings**: sub-menu left sidebar (desktop), list (mobile)

---

## 3. Key User Flows

### 3.1 First-time visitor (Guest path)

```
Landing page
    ↓  tap "ดวงวันนี้ของฉัน"
/onboarding/step-1-welcome
    ↓  tap "ลองกันเลย"
/onboarding/step-2-birthday
    [DatePicker + optional time toggle]
    ↓  tap "ถัดไป"
/onboarding/step-3-preferences (optional)
    [language, theme, notification preferences]
    ↓  tap "เสร็จ!"
/onboarding/step-4-result
    [animation: "กำลังคำนวณเดาใจของคุณ..." 3-5 sec]
    ↓
/dashboard (home)
    [Hero: "เดาใจวันนี้ของคุณ" + daily card preview]
```

**Interaction detail**:
- Step 2 = ต้องกรอกอย่างน้อยวันเดือนปี (time optional)
- Skip option ไม่มีที่ step 2 (required)
- Progress indicator บนสุด
- Back button active

### 3.2 Returning user (Daily ritual)

```
Push notification 07:00 "เดาใจวันนี้รอคุณแล้ว ✨"
    ↓  tap notification
App opens → /
    ↓
Hero: today's horoscope preview + mascot wave animation
    ↓  scroll / tap
Read horoscope
    ↓  tap "เปิดไพ่วันนี้"
Tarot daily card → flip animation → reading
    ↓  tap "เก็บไว้ดู" or "แชร์"
Share card preview (IG story template)
    ↓
Streak updated → confetti if 7/30/100 day milestone
```

### 3.3 Compatibility check flow

```
/compatibility (from nav)
    ↓
"คุณอยากเช็คดวงคู่กับใคร?"
Type selector: [คู่รัก] [เพื่อน] [ครอบครัว] [คู่ธุรกิจ]
    ↓
Person A: "ข้อมูลคุณ" (auto-fill from profile or guest profile)
    [Name field]  [Birthday field]
    ↓
Person B:
    [Nickname]  [Birthday]  [Optional: profile pic]
    ↓  tap "คำนวณ"
Loading animation: 2 ดาวโคจรเข้าหากัน (3-5 sec)
    ↓
Result page:
    "You scored 82 🌟 High Match"
    [Overall big number + tier emoji]
    [5 dimensions bar graph]
    [Green flags card]
    [Red flags card]
    [Advice paragraph]
    [Share card button]
    ↓
Share card preview → [Copy link] [Save image]
```

### 3.4 Tarot 3-card spread flow

```
/tarot → select "3-card spread"
    ↓
"คุณอยากถามเรื่องอะไร?" (optional text input)
Quick categories: [ชีวิตทั่วไป] [ความรัก] [การงาน] [การเงิน] [สุขภาพ]
    ↓  tap "สับไพ่"
Shuffle animation (cards fly, mascot สั่นคอ "กำลังสับ~")
    ↓
Fan of 78 cards in arc
Instructions: "เลือก 3 ใบที่คุณรู้สึก"
    ↓  user taps 3 cards (haptic feedback)
Each tap: selected card slides out with glow
    ↓  all 3 selected → tap "เปิดไพ่"
Card 1 flip + "อดีต" label + meaning expand
    ↓  scroll / tap next
Card 2 flip + "ปัจจุบัน" + meaning
    ↓
Card 3 flip + "อนาคต" + meaning
    ↓
Narrative summary: LLM-generated bridging the 3 cards
    ↓
Actions: [แชร์] [บันทึก] [อ่านไพ่ใหม่]
```

### 3.5 Signup-after-guest flow (conversion moment)

```
Guest is using app → tries premium feature OR tap "เก็บไว้ดู"
    ↓
Modal: "เก็บดวงของคุณไว้ — ไม่ต้องกรอกใหม่ทุกครั้ง"
[Google] [LINE] [Email]
    ↓  tap [Google]
Google OAuth consent
    ↓
Callback → /api/auth/callback/google
    ↓
Server detects guest cookie → migrateGuestToUser
    ↓
Redirect to /dashboard with "ยินดีต้อนรับสู่ DaoJai! ✨" toast
    ↓
Continue where left off (reading saved, streak preserved)
```

### 3.6 Premium upgrade flow

```
User hits locked feature e.g., /tarot/celtic
    ↓
Premium paywall screen:
    "Celtic Cross — ต้อง Shine ✨"
    [benefits list]
    [฿99/เดือน] [฿890/ปี ประหยัด 25%]  ← toggle
    [เริ่มทดลอง 7 วันฟรี]
    ↓  tap subscribe
/shine/checkout
    [Omise payment sheet: credit card / PromptPay / TrueMoney]
    ↓  successful payment
Success page: "ยินดีด้วย! คุณเป็น Shine member แล้ว ✨"
    ↓ redirect
Back to feature that was locked → now unlocked
```

---

## 4. Screen Inventory (MVP)

### 4.1 Marketing (unauthenticated)

1. `/` — Landing (hero + teaser + CTA)
2. `/about` — About us
3. `/pricing` — Pricing / Shine
4. `/privacy`, `/terms` — Legal
5. `/blog`, `/blog/[slug]` — SEO content (optional MVP)

### 4.2 Core app

6. `/onboarding/*` — 4-step
7. `/dashboard` — Today's overview (after onboarding)
8. `/horoscope/[sign]` — sign-specific daily
9. `/tarot` — Tarot hub
10. `/tarot/daily` — 1-card
11. `/tarot/3-card` — 3-card interactive
12. `/tarot/love` — love spread [needs profile]
13. `/tarot/cards`, `/tarot/cards/[id]` — encyclopedia
14. `/compatibility` — form
15. `/compatibility/result/[slug]` — result (public, shareable)
16. `/birth-chart/me` — personal chart
17. `/readings/history` — past readings [auth]
18. `/share/[slug]` — share card view (public OG image)

### 4.3 Auth

19. `/sign-in`, `/sign-in/verify-request`, `/sign-in/error`

### 4.4 Settings

20. `/settings/profile`
21. `/settings/preferences` — notifications, theme
22. `/settings/subscription`
23. `/settings/data-export`
24. `/settings/delete-account`

### 4.5 Premium

25. `/shine` — premium landing
26. `/shine/checkout` — checkout
27. `/tarot/celtic` — 10-card [premium]
28. `/journal`, `/journal/[id]` — private journal [premium]

**Total MVP screens**: ~28 (core work 15-20 unique layouts)

---

## 5. Content Hierarchy (per page example)

### 5.1 `/dashboard` (home)

```
┌─────────────────────────────────────────┐
│  [Mascot waving] อรุณสวัสดิ์ คุณชื่อ ~  │
│                                         │
│  ─── วันนี้ของคุณ ─────────────────       │
│  [Big card: Today's horoscope hero]     │
│  ★★★★☆  พลังงานวันนี้                     │
│  [Read full →]                          │
│                                         │
│  ─── ไพ่วันนี้ ───────────────────        │
│  [Card back]                            │
│  [เปิดไพ่วันนี้]                         │
│                                         │
│  ─── การแนะนำ ────────────────────        │
│  [ ] เช็คดวงคู่กับเพื่อน                    │
│  [ ] อ่านบทความ "ความหมายของ Mercury..."   │
│                                         │
│  ─── Streak ───────────────────           │
│  [🔥 7 วัน ติด!]                          │
└─────────────────────────────────────────┘
```

### 5.2 `/horoscope/leo` (single sign view)

```
┌─────────────────────────────────────────┐
│  ← [back]                    [share]    │
│                                         │
│  ♌︎  ราศีสิงห์ • 17 เม.ย.                │
│                                         │
│  [Overview paragraph]                    │
│                                         │
│  💕 ความรัก ★★★★☆                         │
│  [Text 40 words]                        │
│                                         │
│  💼 การงาน ★★★☆☆                          │
│  [Text 40 words]                        │
│                                         │
│  💰 การเงิน ★★★☆☆                         │
│  🌿 สุขภาพ ★★★★☆                          │
│  🎰 โชคลาภ ★★☆☆☆                          │
│                                         │
│  🍀 สีมงคล: ส้มทอง                        │
│  🔢 เลขมงคล: 5                           │
│  🧭 ทิศ: ตะวันออกเฉียงใต้                  │
│                                         │
│  ⚠️ สิ่งที่ควรเลี่ยง                      │
│  [Text]                                 │
│                                         │
│  ✨ คำแนะนำ                               │
│  [Text]                                 │
│                                         │
│  🙏 คาถาวันนี้                            │
│  [Italic text]                          │
│                                         │
│  ┌──────────┐  ┌──────────┐              │
│  │แชร์รูป IG│  │ดวงสัปดาห์│              │
│  └──────────┘  └──────────┘              │
└─────────────────────────────────────────┘
```

---

## 6. Responsive Breakpoints

```css
/* Mobile first */
sm:  640px   — small tablet portrait
md:  768px   — tablet
lg:  1024px  — small desktop
xl:  1280px  — desktop
2xl: 1536px  — large desktop
```

- Target primary: **375-428px** (mobile)
- Tablet + desktop: adapt layout (sidebar nav instead of bottom)

---

## 7. State Machine Examples

### 7.1 Reading state

```
IDLE
  ↓ user request
PREPARING    (loading UI, calculating)
  ↓
SHUFFLING    (animation)
  ↓
SELECTING    (user picks cards)
  ↓
REVEALING    (flip animation)
  ↓ waits for LLM if narrative needed
NARRATING    (streaming LLM text)
  ↓
COMPLETED
  ↓ user action
(SAVING | SHARING | REDRAWING)
```

### 7.2 Subscription state

```
INACTIVE  ─── upgrade ──→  TRIALING (7 days)
                                ↓
                            ACTIVE  ←── payment
                              │
                    ┌─────────┼──────────┐
                    ↓         ↓          ↓
                PAST_DUE   CANCELED   EXPIRED
                    ↓
                 ACTIVE (retry) | EXPIRED
```

---

## 8. Loading States / Skeletons

Every screen has 3 states: **loading, success, error**

| State | Visual |
|-------|--------|
| Loading | Skeleton matching final layout, shimmer effect |
| Success | Content rendered |
| Error | Mascot sad face + retry button + "โอ๊ย..." message |
| Empty | Mascot inviting + CTA |

---

## 9. Error Handling Pages

- `/404` — mascot looking confused, redirect to home
- `/500` — mascot reassuring, retry + support link
- Rate limited (429) — inline modal: "ใจเย็นๆ ดาวกำลังพัก ลองอีกครั้งใน X วินาที"
- Premium required — paywall modal (not redirect)

---

## 10. Accessibility Wiring

- Every button has aria-label in TH + EN
- Route transitions announce to screen reader
- Focus trap in modals
- Skip-to-content link
- All images have meaningful alt (ไพ่ = "The Fool, กลับหัว")

---

## 11. SEO Page Structure

Each public page has:

- `<title>` template: `${pageTitle} • เดาใจ`
- `<meta name="description">` ~155 chars TH
- `<meta property="og:*">` full OG card
- `<link rel="canonical">` for date-specific pages
- JSON-LD structured data:
  - `Article` for blog
  - `WebApplication` for app
  - `Organization` for brand

### Priority SEO pages

1. `/horoscope/[sign]` — 12 signs × daily = SEO gold mine
2. `/tarot/cards/[id]` — 78 pages × each card meaning
3. `/compatibility/[signA]-[signB]` (future) — 144 pages
4. `/blog/*` — long-tail content

---

## 12. Implementation Priority (screen order)

**Sprint 1 (weeks 1-2)**: Foundation
- Layout shell, navigation, theme system
- Onboarding flow
- Dashboard skeleton
- Auth screens

**Sprint 2 (weeks 3-4)**: Core reading features
- `/horoscope/[sign]` — daily view
- `/tarot/daily` — 1-card
- Share card generation

**Sprint 3 (weeks 5-6)**: Compatibility + 3-card
- `/compatibility` + result
- `/tarot/3-card`

**Sprint 4 (weeks 7-8)**: Profile + History
- `/birth-chart/me`
- `/readings/history`
- Settings

**Sprint 5 (weeks 9-10)**: Premium + Polish
- `/shine` + checkout
- Celtic Cross
- Journal

**Sprint 6 (weeks 11-12)**: Marketing + launch
- Landing page polish
- Blog setup
- Soft launch

---

_Last updated: 2026-04-17_ — Next: [00-index.md](./00-index.md)
