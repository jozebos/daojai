# 06 — Mascot & Brand Identity

> Design brief สำหรับ mascot + brand voice ของ DaoJai

---

## 1. Why a Mascot?

คุณเลือก **มี mascot ตั้งแต่ launch** — เหตุผลเชิงกลยุทธ์:

1. **Memorable** — คนจำ character ง่ายกว่าจำ logo flat
2. **Emotional anchor** — user รู้สึกเหมือนมี "เพื่อน" แทน app
3. **TikTok/IG asset** — mascot = sticker + meme + animation ready
4. **Brand extend** — ทำสินค้า merch, plushie, LINE sticker ได้
5. **Differentiation** — ไม่มีแอปดูดวงไทยที่มี mascot จริงจัง

### Benchmark mascots

- **Duolingo Owl** (Duo) — push notification iconic
- **LINE Brown & Cony** — sticker empire
- **Mailchimp Freddie** — brand personality
- **Slack** — not mascot per-se but icon w/ personality

---

## 2. Mascot Concept: "ใจ" (Jai)

### 2.1 Character name

**ใจ (Jai)** — แปลตรงตัว "heart/mind" ตรงกับชื่อแบรนด์ "เดาใจ"

Alternate คำเรียก:
- "น้องใจ" (Nong Jai) — เวลาเรียกน่ารักๆ
- "Jai" — English version

### 2.2 Character concept

> Jai คือ **หัวใจน้อยที่รู้จักเดา** — อ่านใจฟ้า อ่านใจคน และชวนคุณอ่านใจตัวเอง

Jai เป็น personification ของ "ใจ" — ส่วนที่รู้สึก + ส่วนที่รู้ (intuitive) ของผู้ใช้
ทำหน้าที่เป็นเพื่อนร่วมทาง ไม่ใช่หมอดูที่ตัดสิน

**Visual description**:
- รูปร่าง: หัวใจกลมนุ่ม บวกกับแฉกดาวรอบตัว (hybrid heart-star) — จำง่าย unique
- ขนาด: chibi proportions — หัว 60% ของตัว, ไม่มีแขนก็ได้ (หรือแขนสั้นแบบ Kirby)
- สี: Pink soft (ตัวหลัก) + Gold (แฉก/glow รอบ) + Indigo (เงา/outline)
- ตา: กลมใหญ่ มีประกาย star-sparkle ข้างใน เหมือน Ghibli/Sanrio
- ปาก: เล็กยิ้ม (ไม่อ้า)
- **Feature สำคัญ**:
  - ดวงตาเปล่งแสงเล็กๆ เวลา "กำลังเดา" (loading)
  - รอบตัวมี ✨ ลอยขึ้นเบาๆ แทนการ breathing

**Personality**:
- อายุโดยประมาณ: equivalent 7-10 ขวบ (น้องที่ฉลาดเกินวัย, old soul)
- บุคลิก: อ่อนโยน, ช่างสังเกต, กวนเบาๆ, ฉลาดแต่ไม่โอ้อวด, เชิงบวก
- **Intuitive > Analytical** — Jai "เดา" ด้วยความรู้สึก ไม่ใช่คำนวณเป๊ะๆ
- คำพูดติดปาก:
  - "ลองเดาใจตัวเองดูก่อนนะ~"
  - "Jai เดาว่า..."
  - "ฟ้าบอก Jai ว่า..."
  - "วันนี้ใจคุณรู้สึกยังไงบ้าง?"
- ชอบ: ดาวตก, น้ำชาอุ่น, คนที่กล้าพูดความรู้สึก
- ไม่ชอบ: คำขู่, การตัดสินกันตายตัว, ความเร่งรีบ

### 2.3 Color palette (same as brand)

```css
/* Jai's appearance — heart-star hybrid */
--jai-body:       #FCA5A5   /* soft pink (main body) */
--jai-points:     #FFD580   /* stardust gold (star points/glow) */
--jai-sparkle:    #FFF3C4   /* eye sparkle */
--jai-cheek:      #FDA4AF   /* rosy cheek blush */
--jai-outline:    #1E1B4B   /* deep indigo outline */
--jai-shadow:     #0F0E2E   /* midnight navy drop shadow */
```

### 2.4 Expressions needed (sprite sheet)

| State | Usage |
|-------|-------|
| Idle (แฉกดาวกระพริบเบาๆ) | home screen, standby |
| Happy (ยิ้มตาหยี ✨) | daily good reading, streak update |
| **Guessing (ตาเปล่งแสง)** | loading, analyzing — ตอนกำลัง "เดาใจ" |
| Surprised (ตาโต) | rare good reading, special event |
| Worried (ตาเศร้าเล็กน้อย) | challenging card like The Tower — but still supportive |
| Sleepy (ตาหลับ) | late-night usage, error state gentle |
| Sparkle (แฉกเรืองสุด) | success state, premium unlock |
| Holding card (ถือไพ่ tarot) | tarot reading screen |
| Waving (โบกแฉก) | onboarding hello, goodbye |
| Pointing (ชี้) | tutorial / tips |

### 2.5 Motion guidelines

- **Idle animation**: แฉกดาวกระพริบสลับ + ✨ ลอยขึ้น 2-3 pixels (breathing)
- **"Guessing" animation**: ตาหมุนเป็นเกลียว 2-3 รอบ + แฉกเรืองขึ้น (use ตอน loading tarot/compat)
- **Transition**: smooth ease-out, 300-500ms
- **Reaction**: responsive to user tap (squash & stretch)
- **Never**: jerky, violent, strobing

---

## 3. Alternate Mascot Concepts (backup, for decision)

ถ้าอยากลองทางอื่น ขอเสนอ:

### 3.1 น้องดาวแมว (Cat-Star) 🐱⭐

- แมวตัวเล็กที่มีดาวเป็นหาง หรือแมวนั่งในจานดาว
- เสน่ห์: Gen Z ไทยรักแมวมาก
- Risk: เหมือน Co-Star ไป, ไม่ unique

### 3.2 นางฟ้าดาว (Dao Angel) 👼

- เด็กหญิงตัวจิ๋ว ปีกเล็กๆ สวมมงกุฎดาว
- เสน่ห์: สายมูชอบ, premium feel
- Risk: gendered (male user อาจไม่สะดุด)

### 3.3 ดาวไดโนเสาร์ (Dino-Star) 🦖

- ไดโนเสาร์น้อยใส่หมวกดาว
- เสน่ห์: ใหม่ แปลก memorable
- Risk: ไม่ตรง mood spiritual

### 3.4 เจ้าชายน้อย (Prince Star) 👑

- Inspired by Little Prince — คนยืนบนดาวดวงเล็ก
- เสน่ห์: วรรณกรรมคลาสสิก
- Risk: คล้าย reference เกินไป

> **แนะนำหลัก: "ใจ (Jai) — ดาวหัวใจ"** เพราะตรงชื่อแบรนด์และ unique

---

## 4. Brand Identity System

### 4.1 Logo

**Primary logo**:

```
┌────────────────────────┐
│   ✨                    │
│    ✨ เดาใจ             │
│   ✨  DaoJai            │
└────────────────────────┘
```

องค์ประกอบ:
- **Wordmark ไทย** "เดาใจ" เป็น primary (TH-first)
- **English** "DaoJai" as secondary (ใต้/หลัง)
- **Symbol**: 3 ดาวเรียงขนาดไม่เท่ากัน กลุ่มหนึ่ง
- **Optional**: หัวใจเล็กแทรก มีจุดเล็กกลาง

**Variations**:
- Horizontal (wide)
- Stacked (square for app icon)
- Symbol-only (favicon, loading)
- Mascot + wordmark

### 4.2 Typography

| Role | Font | Weight | หมายเหตุ |
|------|------|--------|---------|
| **Brand wordmark** | Custom / Canva-Sans style | Bold | โลโก้เท่านั้น |
| **Display heading** (TH) | **Anuphan** or **Noto Serif Thai** | 700 | ใช้หน้าใหญ่ (landing hero) |
| **Display heading** (EN) | Playfair Display | 700 | หน้าภาษาอังกฤษ |
| **Body** (TH) | **IBM Plex Sans Thai** | 400/500 | อ่านยาว |
| **Body** (EN) | Inter | 400/500 | |
| **UI** | IBM Plex Sans Thai | 500/600 | buttons, labels |
| **Mono** | JetBrains Mono / IBM Plex Mono | 400 | code/numbers |

**Scale (rem based on 16px)**:

```
Display-1:  4rem     (64px)
Display-2:  3rem     (48px)
Display-3:  2.25rem  (36px)
Heading-1:  1.75rem  (28px)
Heading-2:  1.5rem   (24px)
Heading-3:  1.25rem  (20px)
Body-lg:    1.125rem (18px)
Body:       1rem     (16px)
Body-sm:    0.875rem (14px)
Caption:    0.75rem  (12px)
```

### 4.3 Color System

#### Primary palette

```css
/* Surface */
--surface-midnight: #0F0E2E;     /* deepest background */
--surface-indigo:   #1E1B4B;     /* card background dark */
--surface-cream:    #F7F3EC;     /* light mode bg */
--surface-white:    #FFFFFF;

/* Accent */
--accent-gold:      #FFD580;     /* star gold */
--accent-gold-deep: #F59E0B;     /* CTA hover */

/* Soft */
--lavender-100:     #EDE9FE;
--lavender-300:     #C4B5FD;     /* soft purple accent */
--lavender-500:     #8B5CF6;

/* Mood colors */
--pink-soft:        #FCA5A5;     /* love/heart */
--sage-green:       #86EFAC;     /* growth/success */
--sunset:           #FCA5A5;     /* warning gentle */
--sky:              #7DD3FC;     /* wisdom */

/* Neutral */
--text-primary:     #0F0E2E;
--text-secondary:   #64748B;
--border:           #E2E8F0;
```

#### Dark mode

```css
[data-theme="dark"] {
  --bg:               #0F0E2E;
  --surface:          #1E1B4B;
  --text-primary:     #F7F3EC;
  --text-secondary:   #A1A1AA;
}
```

#### Mood-based gradient (for reading cards)

```css
/* Positive reading */
background: linear-gradient(135deg, #FFD580 0%, #FCA5A5 50%, #C4B5FD 100%);

/* Neutral/thoughtful */
background: linear-gradient(135deg, #1E1B4B 0%, #C4B5FD 100%);

/* Challenging but supportive */
background: linear-gradient(135deg, #86EFAC 0%, #7DD3FC 100%);
```

### 4.4 Spacing system (4px base)

```
xs:  4px    sm:  8px    md:  12px
lg:  16px   xl:  24px   2xl: 32px
3xl: 48px   4xl: 64px   5xl: 96px
```

### 4.5 Radius

```
sm:  4px    md:  8px    lg:  12px
xl:  16px   2xl: 24px   full: 9999px
```

### 4.6 Shadow

```css
/* Soft */
--shadow-sm:  0 1px 2px rgba(15, 14, 46, 0.05);
--shadow-md:  0 4px 8px rgba(15, 14, 46, 0.10);
--shadow-lg:  0 10px 24px rgba(15, 14, 46, 0.15);

/* Glow (for star effect) */
--glow-gold:  0 0 20px rgba(255, 213, 128, 0.4);
--glow-lavender: 0 0 24px rgba(196, 181, 253, 0.5);
```

---

## 5. Voice & Tone

### 5.1 Voice (constant — brand personality)

DaoJai speaks like:

- **เพื่อนสนิทที่รู้เรื่องดวง** ไม่ใช่ครูบาอาจารย์
- **ฉลาดแต่ไม่โอ้อวด** — ข้อมูลถูก แต่บอกแบบ humble
- **เชิงบวกแบบจริงใจ** — ไม่ดึง toxic positivity, แต่หา silver lining
- **Gen Z native** — ใช้ภาษาปัจจุบัน แต่ไม่ cringe

### 5.2 Tone (ปรับตาม context)

| Context | Tone | ตัวอย่าง |
|---------|------|---------|
| Greeting (morning) | อบอุ่น, pep | "อรุณสวัสดิ์ ~ วันนี้ดาวมีอะไรมาบอก" |
| Good news | excited, celebrate | "โอ้โห! ดวงวันนี้ดีมากเลย ✨" |
| Challenging card | supportive | "ไพ่ใบนี้ดูหนักก็จริง แต่มันไม่ใช่เรื่องร้าย ลองมอง..." |
| Error | กวนเบาๆ apologetic | "โอ้ย ดาวหลงทางนิดนึง ลองใหม่นะ" |
| Payment | ตรงไปตรงมา | "Premium plan ฿99/เดือน ยกเลิกได้ทุกเมื่อ" |
| Goodbye | อ่อนโยน | "แล้วมาคุยกันใหม่พรุ่งนี้นะ ~" |

### 5.3 Tone dimensions

```
Serious  ←─────────●─────→  Playful       (40/60 — leaning playful)
Formal   ←──●──────────────→  Casual       (25/75 — leaning casual)
Quiet    ←───────●──────────→  Energetic   (50/50)
Edgy     ←────────────●─────→  Warm        (70/30 — leaning warm)
```

### 5.4 Copy examples (side-by-side)

| Bad | DaoJai |
|-----|---------|
| "Welcome back" | "กลับมาแล้ว เจอกันอีกรอบนะ ✨" |
| "Birth date required" | "ขอวันเกิดหน่อยนะ~ เพื่อคำนวณดวงให้" |
| "Error: Invalid input" | "โอ๊ย วันที่มันไม่ตรงแฮะ ลองเช็คอีกทีนะ" |
| "Subscription cancelled" | "ยกเลิก Shine เรียบร้อย~ เราจะคิดถึงคุณนะ" |
| "Draw daily card" | "เปิดไพ่วันนี้" |
| "Check compatibility" | "เช็คคู่เรา ~" |

---

## 6. Visual Style Guide

### 6.1 Illustration style

**Chosen**: **Celestial Soft Line + Watercolor accent**

- **Line art**: thin (1.5-2px), rounded ends, no sharp corners
- **Background textures**: subtle noise/grain overlay
- **Watercolor**: for tarot cards + hero sections
- **Reference**: Studio Ghibli gentle palettes, Sanrio chibi proportions

### 6.2 Iconography

- **Lucide icons** base (outline, 24px default)
- **Custom icons** สำหรับ: ไพ่แต่ละใบ, สัญลักษณ์ราศี, ทักษา 8 ดาว, พระประจำวัน
- **Style**: line art 2px, rounded caps

### 6.3 Photography/imagery

- **Avoid**: stock photo คนชี้ดวงดาว, ลูกแก้ว cliche
- **Prefer**: abstract celestial shots, flat-lay tarot, mystical textures
- **Source**: Unsplash (filtered), custom watercolor commissions

### 6.4 Motion principles

- **Spring physics** over linear ease
- **Stagger children** (100ms delay) for list appearance
- **Respect reduced motion** — provide non-animated alternative
- **Max duration**: 800ms for any single transition

---

## 7. Mascot Deliverables Checklist

Phase 1 (pre-launch):

- [ ] Character design brief + style guide (this doc)
- [ ] 10 expressions × 2 sizes (mobile + desktop)
- [ ] Idle animation loop (Lottie JSON, ~3s)
- [ ] Happy celebration animation
- [ ] Thinking/loading animation
- [ ] App icon with Jai (square)
- [ ] Favicon variations
- [ ] OG image template with Jai

Phase 2:

- [ ] LINE sticker pack (40 stickers) — ขายได้ 50-60 THB/pack
- [ ] GIF animations for social sharing
- [ ] Seasonal variations (Songkran Jai, NY Jai)
- [ ] Jai voicelines (audio ~20 clips)

Phase 3:

- [ ] Jai plushie prototype
- [ ] Jai merch (t-shirts, phone cases)
- [ ] Collaboration special editions

---

## 8. Design Token Export

```typescript
// packages/ui/src/tokens.ts

export const colors = {
  surface: {
    midnight: '#0F0E2E',
    indigo: '#1E1B4B',
    cream: '#F7F3EC',
    white: '#FFFFFF',
  },
  accent: {
    gold: '#FFD580',
    goldDeep: '#F59E0B',
  },
  lavender: {
    100: '#EDE9FE',
    300: '#C4B5FD',
    500: '#8B5CF6',
  },
  mood: {
    pink: '#FCA5A5',
    sage: '#86EFAC',
    sky: '#7DD3FC',
  },
  text: {
    primary: '#0F0E2E',
    secondary: '#64748B',
    onDark: '#F7F3EC',
  },
} as const;

export const space = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '0.75rem',
  lg: '1rem',
  xl: '1.5rem',
  '2xl': '2rem',
  '3xl': '3rem',
  '4xl': '4rem',
} as const;

export const radius = {
  sm: '0.25rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  '2xl': '1.5rem',
  full: '9999px',
} as const;

export const shadow = {
  sm: '0 1px 2px rgba(15, 14, 46, 0.05)',
  md: '0 4px 8px rgba(15, 14, 46, 0.10)',
  lg: '0 10px 24px rgba(15, 14, 46, 0.15)',
  glowGold: '0 0 20px rgba(255, 213, 128, 0.4)',
  glowLavender: '0 0 24px rgba(196, 181, 253, 0.5)',
} as const;
```

---

## 9. Decision & Next Steps

### 9.1 Mascot — approved concept

**ใจ (Jai)** — ดาว 5 แฉกกลม มีหัวใจกลางตัว สี indigo + gold + pink
บุคลิก: เพื่อนเด็กๆ ที่ฉลาด เชิงบวก อบอุ่น

### 9.2 Next actions

1. Commission illustrator ทำ character sheet (ประมาณ ฿15K-฿30K สำหรับ 10 expressions)
2. Commission Lottie animator ทำ idle + happy + thinking (~฿10K-฿20K)
3. ทำ design tokens ใน Figma + export
4. Logo finalize + variations

### 9.3 Budget estimate

| Item | Est (THB) |
|------|-----------|
| Logo design | 10,000 - 25,000 |
| Mascot character sheet | 15,000 - 30,000 |
| Mascot animations (Lottie) | 10,000 - 20,000 |
| Brand guidelines doc | 5,000 - 10,000 |
| **Total** | **40,000 - 85,000** |

หรือ budget-friendly:
- ใช้ Midjourney/Stable Diffusion มาสร้าง base concept
- Hire illustrator freelance ปรับ → cost ลดเหลือ ~฿15K

---

_Last updated: 2026-04-17_ — Next: [07-information-architecture.md](./07-information-architecture.md)
