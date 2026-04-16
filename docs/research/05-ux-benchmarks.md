# 05 — UX Benchmarks: คู่แข่งและ best practice

> Research deep-dive วิเคราะห์ UX ของเว็บ/แอปดูดวงทั้งไทยและต่างประเทศ เพื่อใช้ออกแบบ DaoJai

---

## 1. ภาพรวมตลาด (Market Map)

ตลาดแอป/เว็บดูดวงแบ่งได้ 4 tier ตาม UX ลึก-ตื้น:

```
UX Depth
  │
  │  ⭐ Modern/Delightful
  │  └─ Co-Star, The Pattern, Sanctuary
  │
  │  ⭐ Functional/Clean
  │  └─ AstroStyle, Cafe Astrology, Moonly
  │
  │  ⭐ Content-heavy/Classic
  │  └─ Horoscope.com, Astrology.com, Ganeshaspeaks
  │
  │  ⭐ Portal-style (TH)
  │  └─ Sanook, Kapook, MThai, Horoworld, Myhora
  │
  └─────────────────────────→  Content breadth
```

**ช่องว่างตลาดไทย**: ยังไม่มี product ไทยที่เป็น **Modern/Delightful** จริงจัง
→ **DaoJai จะวางตัวเองในช่องนี้** (เป็น Co-Star เวอร์ชันไทย + เก่งเรื่องโหราศาสตร์ไทยด้วย)

---

## 2. Competitor Deep-Dive (International)

### 2.1 Co-Star Astrology ⭐⭐⭐⭐⭐

- **URL**: https://www.costarastrology.com/
- **Platform**: iOS, Android, Web
- **Founded**: 2017, USA
- **Users**: 20M+ downloads (2023 data)

#### จุดเด่น (ที่ควรเลียน)

- **Minimal typography-first design** — ใช้ Helvetica สีขาว/ดำ สวยแบบ magazine
- **Push notifications ฉลาด** — ส่งข้อความกวนๆ, poetic เช่น "You might be feeling suddenly sensitive"
- **Personalization จากเวลาเกิด** — คำนวณ chart จริง ไม่ใช่แค่ Sun Sign
- **Friend compatibility** — เห็น chart เพื่อน วิเคราะห์ด้วยกัน
- **"Day at a glance" chart view** — UI ง่ายมาก 1 หน้าจบ
- **Data-first, no illustrations** — มี confidence ในตัวเนื้อหา

#### จุดอ่อน / สิ่งที่ DaoJai ทำดีกว่าได้

- ❌ ไม่มีภาษาไทย
- ❌ ไม่มี Tarot
- ❌ ไม่มี Thai astrology concepts
- ❌ Tone ค่อนข้าง dark (บางทีขู่ user)

### 2.2 The Pattern ⭐⭐⭐⭐⭐

- **URL**: https://thepattern.com/
- **Platform**: iOS, Android, Web
- **Founded**: 2017, USA

#### จุดเด่น

- **"Your Pattern" — deeply personal reading** — ข้อความยาวที่ทำให้ user รู้สึก seen
- **"Bonds" feature** — deep relationship analysis ระหว่างเพื่อน
- **Subscription model แน่น** — premium = unlock เนื้อหายาว
- **Live 1-on-1 readings** (premium) — marketplace astrology reader

#### Takeaway

- "deep long-form text" ที่เข้าถึงอารมณ์ user มี impact สูงมาก
- **Monetization strategy**: premium subscription + live reader marketplace

### 2.3 Sanctuary ⭐⭐⭐⭐

- **URL**: https://www.sanctuaryworld.com/
- **Founded**: 2019, USA

#### จุดเด่น

- **Live chat กับนักพยากรณ์จริง** — text-based, jupee ต่อครั้ง
- **On-demand readings** — นึกจะดูเมื่อไหร่ก็ได้
- **Mix of automated + human** — daily automated, deep reading โดยคนจริง

### 2.4 Horoscope.com ⭐⭐⭐

- **URL**: https://www.horoscope.com/
- **Traffic**: ~50M visits/month (SimilarWeb estimate)

#### จุดเด่น

- **SEO king** — content หนา keyword ทุกคำ
- **Quick daily horoscope** — หน้าแรกได้ 12 ราศีทันที

#### จุดอ่อน

- UI เก่า ad เยอะ mobile ยังไม่ดี

### 2.5 Astrology.com ⭐⭐⭐⭐

#### จุดเด่น

- **Tarot readings** — 5+ spreads ให้เลือก
- **Personalized** เมื่อ login
- Content quality สูง

### 2.6 Moonly ⭐⭐⭐⭐

- **URL**: https://moonly.app/
- **Focus**: Lunar cycle, manifestation, meditation

#### จุดเด่น

- **UI สวยมาก** สายพระจันทร์
- **Ritual-based feature** — ของ new moon, full moon
- **Community & affirmations** รายวัน

---

## 3. Competitor Deep-Dive (ไทย)

### 3.1 Sanook Horoscope

- **URL**: https://horoscope.sanook.com/
- **Model**: Portal + ads

#### จุดเด่น

- **SEO ไทยดีที่สุด** — ติด top keyword "ดวงวันนี้", "ดวงรายสัปดาห์"
- **Content หลากหลาย** — ดวงจีน, ดวงไทย, เลข 7 ตัว, ทักษา, ไพ่, ความฝัน
- **Free & no login required**

#### จุดอ่อน

- ❌ UI เก่า ad หนักเกิน
- ❌ Personalization ~0
- ❌ Mobile UX ยัง desktop-first
- ❌ No notification, no history
- ❌ ไม่มี interactive element

### 3.2 Myhora (อ.ลักษณ์ เรขานิเทศ)

- **URL**: https://www.myhora.com/

#### จุดเด่น

- **ลึกด้านโหราศาสตร์ไทย** — natal chart, ทักษา, มหาทักษา เต็มรูปแบบ
- **Brand authority** — อ.ลักษณ์ดังมากในไทย
- **Calculator-heavy** — มี auto-generate หลายแบบ

#### จุดอ่อน

- ❌ UI ยุค 2005 ไม่ responsive
- ❌ ไม่มี gamification
- ❌ ดูจริงจังมาก (Gen Z เข้าไม่ถึง)
- ❌ ไม่มีมือถือ native app

### 3.3 Horoworld

- **URL**: https://www.horoworld.com/

#### จุดเด่น

- **Clean UI ที่สุดในไทย** (relatively)
- **Tarot + horoscope + compatibility** ครบ
- **Daily push via LINE OA**

#### จุดอ่อน

- Still desktop-first
- Content ค่อนข้าง generic (machine-generated feel)

### 3.4 LINE MAN Fortune / LINE Horoscope (stickers & OAs)

- คนไทยใช้ LINE ดูดวงผ่าน OA ของหมอดูแต่ละคน
- Opportunity: ถ้าเราทำ DaoJai ให้มี **LINE LIFF app** หรือ chatbot ผสานได้ = ลดอัตรา churn มาก

### 3.5 ดูดวง via TikTok / Instagram (Thai fortune tellers)

- @mordooman (หมอดูแมน) — TikTok 2M+ followers
- @wongneaw — ไพ่กาแฟ
- @jrh.tarot — tarot reading
- **Strategy**: พาร์ทเนอร์ contenter ให้ใช้ DaoJai เป็น product วาง underneath

---

## 4. Features Matrix (Competitor Comparison)

| Feature | Co-Star | Pattern | Sanook | Myhora | Horoworld | **DaoJai (plan)** |
|---------|---------|---------|--------|--------|-----------|-------|
| Daily horoscope | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Tarot | ❌ | ❌ | ✅ | ❌ | ✅ | ✅ |
| Compatibility | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Thai astrology (ทักษา) | ❌ | ❌ | ✅ | ✅ | ⚠️ | ✅ |
| Natal chart | ✅ | ✅ | ❌ | ✅ | ❌ | ⚠️ Phase 3 |
| Mobile app | ✅ | ✅ | ❌ | ❌ | ❌ | ⚠️ PWA first |
| Push notification | ✅ | ✅ | ❌ | ❌ | LINE | ✅ |
| Thai language | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ |
| Modern UI | ✅ | ✅ | ❌ | ❌ | ⚠️ | ✅ |
| Share to IG | ⚠️ | ⚠️ | ❌ | ❌ | ❌ | ✅ |
| Gamification | ❌ | ⚠️ | ❌ | ❌ | ❌ | ✅ |
| Journal/history | ⚠️ | ✅ | ❌ | ❌ | ❌ | ✅ |
| AI custom reading | ❌ | ⚠️ | ❌ | ❌ | ❌ | ✅ (premium) |
| Human consult | ⚠️ | ✅ | ❌ | ❌ | ❌ | ⚠️ Phase 3 |

---

## 5. UX Patterns ที่ควรใช้

### 5.1 First-Run Experience (FRE)

**Best practice** (อ้างอิง Co-Star, Sanctuary):
1. Opening visual ให้ user "wow" ก่อน (animation ดาว / moon phase)
2. ถามข้อมูลทีละ 1 อย่าง — **never multi-field form**
3. Frame question เป็นการสนทนา: "Hi ✨ เราจะขอถามวันเกิดคุณก่อนนะ"
4. Skip option ชัดเจน — ไม่ต้องบังคับ
5. จบด้วย "Here you are" — คำกล่าวต้อนรับที่ใช้ data ที่ user เพิ่งใส่

### 5.2 Daily Ritual Loop

```
Morning notification (07:00)
  └─ "เดาใจวันนี้รอคุณแล้ว ✨"
       └─ Tap → app opens → Daily card/horoscope
            └─ Read (30-60 วิ)
                 └─ React (heart/save/share)
                      └─ Optional: Tarot pull / journal entry
                           └─ Streak +1
```

### 5.3 Sharing & Viral

**IG Story Card Formula** (1080x1920):
- 🌌 Background: gradient สวย (nebula/aurora)
- 📝 Quote: 1-2 ประโยคสั้นๆ จาก reading
- 🎴 Visual: ไพ่ที่จับได้ หรือ ราศี symbol
- 🔗 Sticker: "daojai.com / ดูของคุณ"

### 5.4 Empty States / Error Handling

- ใช้ empty state เป็น **opportunity** — เช่น "ยังไม่เคยเปิดไพ่เหรอ? มาเปิดใบแรกกัน 🎴"
- Error ไม่ใช่แค่ "Something went wrong" — ใส่ personality "โอ๊ย ดาวหลงทางนิดนึง ลองใหม่นะ"

### 5.5 Dark Mode

- **Default DARK** สำหรับแอปดูดวง (vibe เข้ากับดาว/ราศี)
- Light mode = optional

### 5.6 Haptic Feedback (Mobile)

- เมื่อ flip ไพ่: strong haptic
- เมื่อ scroll daily: light tap
- เมื่อ streak update: success feedback

---

## 6. UI Design Patterns (specific)

### 6.1 Typography

- **Headings**: Display font สวย สะอาด (Playfair Display, DM Serif Display, Cormorant)
- **Body**: Sans-serif modern (Inter, IBM Plex, Sarabun สำหรับไทย)
- **Thai font ที่แนะนำ**: IBM Plex Sans Thai, Noto Sans Thai, K2D, Sarabun
- **Scale**: 48 / 32 / 24 / 18 / 16 / 14 / 12

### 6.2 Color Palette (proposal for DaoJai)

```
Primary:    Deep Indigo     #1E1B4B   (ท้องฟ้ายามค่ำคืน)
Accent:     Stardust Gold   #FFD580   (ดาว, ความหวัง)
Soft:       Lavender Mist   #C4B5FD   (ดวงจันทร์ละมุน)
Dark BG:    Midnight Navy   #0F0E2E
Light BG:   Cream Paper     #F7F3EC   (สำหรับ light mode)
Success:    Sage Green      #86EFAC
Warning:    Sunset Coral    #FCA5A5
```

- Avoid คู่ที่ generic: "purple + black" (ทุกแอปดูดวงใช้ — ดูไม่ differentiated)

### 6.3 Illustration Style

3 ทางเลือก:
1. **Celestial Line Art** (Co-Star style) — minimal, editorial
2. **Watercolor Mystic** — soft, hand-drawn
3. **3D Rendered** (Kaedim/Blender) — premium, novel

→ **แนะนำ**: ผสม 1 + 2 — line art สำหรับ icons + watercolor สำหรับ ไพ่/backdrop

### 6.4 Animation

- **Lottie** สำหรับ micro-animation (stars twinkling, ไพ่ flip)
- **Framer Motion** สำหรับ page transitions
- **Canvas / WebGL** สำหรับ pro animations (ดาวหมุน, nebula)
- ไม่ใช้ animation overkill — รักษา frame rate 60fps

---

## 7. Mobile-First Principles

### 7.1 Touch Target

- Minimum 44×44pt (Apple HIG), 48×48dp (Material)
- ไพ่ที่ user tap → should be minimum 80×120pt

### 7.2 Thumb Zone

```
┌─────────────┐
│   HARD      │  ← content/info
│             │
│   OK        │
│             │
│   EASY      │  ← main action buttons (bottom)
└─────────────┘
```

Primary actions: bottom of screen. Avoid top-corner buttons.

### 7.3 One-Hand Use

Bottom sheet / modal ขึ้นจากล่าง ไม่ใช่กลางจอ

### 7.4 Performance

- FCP < 1.5s
- LCP < 2.5s
- Images: WebP, lazy loading
- Next.js: Server Components + streaming

---

## 8. Accessibility (A11y)

- **Contrast ratio** ≥ 4.5:1 (ดาวสีทองบน indigo ต้องเช็ค)
- **Focus indicators** ชัดเจน (especially ไพ่ที่ flip)
- **Alt text** ทุกภาพไพ่ (ตาบอดสามารถได้ยิน screen reader อ่าน "The Fool, upright")
- **Reduce motion** setting — respect `prefers-reduced-motion`
- **Font size** scalable — ไม่ใช้ px fixed, ใช้ rem/em

---

## 9. Analytics & Key Metrics

### 9.1 North Star Metric

**"Daily Active Users (DAU) with ≥1 meaningful action"**
- Meaningful action = อ่านดวง / เปิดไพ่ / เช็คสมพงษ์

### 9.2 Core Metrics

| Metric | Target (6 months) |
|--------|-----|
| DAU / MAU ratio | ≥ 25% |
| 7-day retention | ≥ 40% |
| Daily push CTR | ≥ 20% |
| Share rate (per reading) | ≥ 5% |
| Session length | 2-4 min |

### 9.3 Funnel

```
Visit → Sign up (or guest)
      → First horoscope reading
      → Return Day 2
      → Return Day 7
      → Share 1 reading
      → Upgrade to premium (optional)
```

### 9.4 Event Tracking (แนะนำ)

- `reading.viewed` (type: daily/tarot/compat)
- `reading.shared` (platform)
- `ritual.started` (ไพ่)
- `ritual.completed`
- `streak.updated`
- `subscription.upgraded`

---

## 10. Lessons Learned (ศึกษาเคสจริง)

### 10.1 Co-Star "grew 5x after adding push notifications with sass"

- Push ที่มี personality = open rate 2x
- Push ตอน transit (เช่น moon enters Aries) = CTR สูง
- **Apply**: DaoJai ควรใช้ push ที่มี voice ของแบรนด์

### 10.2 The Pattern success: "deep reads make people pay"

- User ยอมจ่ายเพื่อ reading ที่ยาวและเจาะลึก
- **Apply**: Premium tier ของ DaoJai ควรมี "Deep Monthly Reading"

### 10.3 Sanctuary failure points

- ครั้งแรกเปิด live reading ราคา $5/นาที user complaint เรื่อง transparency
- **Apply**: ถ้ามี marketplace, ต้องเคลียร์ราคาและ review ก่อนจอง

### 10.4 Thai context: LINE is king

- ~90% ของผู้ใช้อินเทอร์เน็ตไทยมี LINE
- LINE Notify / LINE Login / LINE LIFF (Liff App) = viable channel
- **Apply**: Phase 2 ควรมี LINE login + LINE Notify as alternative channel

---

## 11. Reference

### UX articles

- **NN Group: The UX of Onboarding** — https://www.nngroup.com/articles/onboarding/
- **Growth.Design case studies** — https://growth.design/case-studies
- **Co-Star behind the design** — https://uxdesign.cc/co-star-astrology-design-analysis
- **Mobile Thumb Zone** (Steven Hoober) — https://www.uxmatters.com/mt/archives/2013/02/how-do-users-really-hold-mobile-devices.php

### Product teardown (YouTube/articles)

- Co-Star UX teardown (multiple on Medium/UXdesign.cc)
- The Pattern interview on Product Hunt

### Thai-specific market research

- **Kepios / DataReportal — Thailand Digital 2026 Report** — https://datareportal.com/reports/digital-2026-thailand
- **LINE Thailand Business Report** — https://linebiz.com/th/
- **Thai consumer behavior on spiritual content** — Nielsen, Kantar reports

### Direct product URLs

- Co-Star: https://www.costarastrology.com/
- The Pattern: https://thepattern.com/
- Sanctuary: https://www.sanctuaryworld.com/
- Moonly: https://moonly.app/
- Horoscope.com: https://www.horoscope.com/
- Astrology.com: https://www.astrology.com/
- Sanook: https://horoscope.sanook.com/
- Myhora: https://www.myhora.com/
- Horoworld: https://www.horoworld.com/
- MThai: https://horoscope.mthai.com/
- Kapook: https://horoscope.kapook.com/

### Design systems references

- Apple HIG — https://developer.apple.com/design/human-interface-guidelines
- Material Design 3 — https://m3.material.io/
- shadcn/ui — https://ui.shadcn.com/ (แนะนำสำหรับ DaoJai)

---

## 12. ข้อสรุปสำหรับ DaoJai (UX Principles)

### ✅ 10 UX commandments

1. **Thai-first, Gen Z-native** — ภาษาเหมือนเพื่อนคุยกัน
2. **Positive framing** — ไม่ขู่ ไม่ดิสเครดิต ไม่ตัดสิน
3. **Ritual over raw info** — ต้องมี intention, action, reveal
4. **Mobile-first, PWA-ready** — 80% traffic คาดว่าจากมือถือ
5. **Dark mode default** — mood astrology
6. **Shareable by design** — IG story card คือ viral engine
7. **Delightful micro-interaction** — haptic, sound, animation
8. **Progressive disclosure** — ไม่ทุ่มข้อมูลหมดในจอเดียว
9. **Personalization ตั้งแต่จอ 2** — Co-Star ทำได้ DaoJai ก็ควรได้
10. **ชัดเจน in every reading** — "เราทำนายจากข้อมูลนี้ ไม่ใช่ fortune ตายตัว"

### 🎯 Positioning statement

> "DaoJai คือแอปดูดวงที่ทำให้คุณรู้สึก **seen** ไม่ใช่รู้สึก **doomed** — ใช้โหราศาสตร์ทั้งสากลและไทย เป็นเครื่องสะท้อนใจประจำวัน"

---

_Last updated: 2026-04-17_ — ไฟล์ต่อไป: [06-monetization.md](./06-monetization.md)
