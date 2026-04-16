# 01 — ไพ่ยิปซี (Tarot)

> Research deep-dive เพื่อออกแบบ feature "เปิดไพ่ยิปซี" บน DaoJai

---

## 1. ภาพรวม (Overview)

**ไพ่ทาโรต์ (Tarot)** — คนไทยนิยมเรียก "ไพ่ยิปซี" — เป็นชุดไพ่ทำนายที่มีต้นกำเนิดจากยุโรปช่วงกลางศตวรรษที่ 15 (ประมาณ ค.ศ. 1430–1450) ในอิตาลีตอนเหนือ เดิมทีเป็นไพ่ใช้เล่นเกมชื่อ _tarocchi_ ต่อมาในช่วงปลายศตวรรษที่ 18 (ค.ศ. 1781) นักไสยศาสตร์ฝรั่งเศสชื่อ **Antoine Court de Gébelin** เสนอว่าไพ่ทาโรต์มีรากมาจากความรู้โบราณของอียิปต์ และเริ่มใช้เพื่อการทำนาย

คำว่า "ไพ่ยิปซี" ในภาษาไทยมาจากความเข้าใจผิดในอดีตว่า **คนยิปซี (Romani people)** เป็นผู้นำไพ่นี้มาเผยแพร่ ทั้งที่จริงๆ ไม่ใช่ต้นกำเนิดของไพ่นี้ แต่ชื่อยังติดตลาดอยู่

### จุดเด่นของไพ่ทาโรต์ในบริบท UX สมัยใหม่

- **Visual-first**: ภาพไพ่เป็น storytelling ด้วยตัวเอง → เหมาะกับ mobile/web UX
- **Interactive**: การสับไพ่ เลือกไพ่ เปิดไพ่ = micro-interaction ที่ทำให้ user engaged
- **Shareable**: ไพ่ที่จับได้แต่ละวัน/แต่ละคำถาม สามารถ screenshot แชร์ IG story ได้ง่าย
- **Self-reflection tool**: ไม่ได้ทำนายอนาคตตายตัว แต่สะท้อนสิ่งที่ผู้ถามเผชิญอยู่

---

## 2. โครงสร้างไพ่มาตรฐาน (Rider-Waite-Smith — RWS)

**Rider-Waite-Smith (RWS)** คือสำรับที่เป็น _de-facto standard_ ของโลก ตีพิมพ์ปี ค.ศ. 1909 โดย **A. E. Waite** (ข้อความ) และ **Pamela Colman Smith** (ภาพ) — สำรับนี้เป็นต้นแบบของ 90%+ ของสำรับ modern tarot ทุกวันนี้ (รวม Thoth, Morgan-Greer, Wild Unknown, ฯลฯ)

### 78 ใบ แบ่งเป็น 2 กลุ่ม

```
ไพ่ทาโรต์ (78 ใบ)
├── Major Arcana (22 ใบ) — เหตุการณ์ใหญ่ / บทเรียนชีวิต
└── Minor Arcana (56 ใบ) — เหตุการณ์ประจำวัน แบ่ง 4 ชุด
    ├── Cups / ถ้วย (14 ใบ) — อารมณ์ ความรัก
    ├── Pentacles / เหรียญ (14 ใบ) — เงิน งาน สุขภาพ
    ├── Swords / ดาบ (14 ใบ) — ความคิด การตัดสินใจ
    └── Wands / ไม้เท้า (14 ใบ) — แรงบันดาลใจ แพสชัน
```

### 2.1 Major Arcana (22 ใบ, เลข 0–XXI)

ลำดับนี้เรียกว่า **"Fool's Journey"** — การเดินทางของจิตวิญญาณ

| No. | ชื่อ (EN) | ชื่อ (TH นิยม) | ธีมหลัก (upright) |
|-----|-----------|------|-------------|
| 0 | The Fool | นักเดินทาง / คนโง่ | จุดเริ่มต้น, ความกล้า, ไม่กลัว |
| I | The Magician | นักมายากล | พลังสร้างสรรค์, ลงมือทำ |
| II | The High Priestess | นักบวชหญิง | สัญชาตญาณ, ความลับ |
| III | The Empress | จักรพรรดินี | ความอุดมสมบูรณ์, ความเป็นแม่ |
| IV | The Emperor | จักรพรรดิ | โครงสร้าง, อำนาจ, ผู้นำ |
| V | The Hierophant | สมเด็จพระสันตะปาปา | ประเพณี, ระบบ, ครู |
| VI | The Lovers | คู่รัก | ความรัก, การเลือก |
| VII | The Chariot | รถศึก | ชัยชนะ, ควบคุมตัวเอง |
| VIII | Strength | พลัง | ความแข็งแกร่งภายใน, ความอดทน |
| IX | The Hermit | ฤๅษี | การทบทวนตัวเอง, ปัญญาภายใน |
| X | Wheel of Fortune | กงล้อโชคชะตา | การเปลี่ยนแปลง, วัฏจักร |
| XI | Justice | ความยุติธรรม | ความเที่ยงธรรม, กรรม |
| XII | The Hanged Man | คนห้อยหัว | การยอมรับ, มองมุมใหม่ |
| XIII | Death | ความตาย | การสิ้นสุด, เริ่มต้นใหม่ (ไม่ใช่ตายจริง) |
| XIV | Temperance | ความพอดี | สมดุล, การผสมผสาน |
| XV | The Devil | ปีศาจ | พันธนาการ, ความหลงใหล, วัตถุนิยม |
| XVI | The Tower | หอคอย | การล่มสลาย, เปลี่ยนแปลงฉับพลัน |
| XVII | The Star | ดวงดาว | ความหวัง, แรงบันดาลใจ |
| XVIII | The Moon | พระจันทร์ | สัญชาตญาณ, ความกลัว, ภาพลวง |
| XIX | The Sun | ดวงอาทิตย์ | ความสำเร็จ, ความสุข |
| XX | Judgement | การพิพากษา | การตื่นรู้, เรียกร้อง |
| XXI | The World | โลก | ความสมบูรณ์, การบรรลุผล |

### 2.2 Minor Arcana (56 ใบ, 4 ชุด × 14 ใบ)

แต่ละชุดมี **Ace → 10** (10 ใบ) และ **ไพ่ราชสำนัก (Court cards) 4 ใบ**: Page, Knight, Queen, King

| ชุด (Suit) | Element | ขอบเขตชีวิต |
|-----------|---------|---------|
| **Cups (ถ้วย)** | Water / น้ำ | ความรู้สึก, ความสัมพันธ์ |
| **Pentacles (เหรียญ)** | Earth / ดิน | เงิน, งาน, กายภาพ |
| **Swords (ดาบ)** | Air / ลม | ความคิด, คำพูด, ความขัดแย้ง |
| **Wands (ไม้เท้า)** | Fire / ไฟ | แพสชัน, ความคิดสร้างสรรค์, การกระทำ |

#### ความหมายเลข 1–10 (กรอบคิด)

- **Ace (1)**: การเริ่มต้นใหม่ในด้านนั้น
- **2**: ความสมดุล, ทางเลือก, คู่
- **3**: การเติบโต, การร่วมมือ
- **4**: ความมั่นคง, โครงสร้าง
- **5**: ความท้าทาย, ความขัดแย้ง
- **6**: ความสามัคคี, การช่วยเหลือ
- **7**: การทบทวน, ความลังเล
- **8**: การเคลื่อนไหว, พลัง
- **9**: ใกล้บรรลุผล, ความเต็มตื้น
- **10**: การสิ้นสุดวัฏจักร, ความครบถ้วน

---

## 3. ไพ่กลับหัว (Reversed Cards)

เวลาสับแล้วเปิดไพ่ ถ้าไพ่ออกกลับหัว (reversed) ความหมายจะเปลี่ยน — โดยทั่วไปจะแสดง:

- **ด้านตรงข้าม** ของความหมายปกติ
- **พลังงานที่ถูกบล็อก** หรือยังไม่แสดงออก
- **แง่ลึกภายใน** ที่ยังไม่ได้ออกมา
- **เวอร์ชันที่มากเกินไป** ของความหมายปกติ

> 🔑 **ในแอป UX**: ควรให้ user เลือกได้ว่าจะเปิดการอ่านแบบ "มีไพ่กลับหัว" หรือ "upright-only"
> (สำรับ Rider-Waite จริงๆ มี probability สับกลับหัวประมาณ 50% ถ้าสับถูกวิธี)

---

## 4. การวางไพ่ (Spreads) — 5 แบบยอดนิยม

### 4.1 Single Card / Daily Draw (1 ใบ) ⭐ สำหรับ daily feature

- **ใช้**: ดวงวันนี้, ข้อความประจำวัน, meditation
- **UX**: tap สับไพ่ → เปิด 1 ใบ → คำอธิบาย 1 หน้าจอ
- **MVP fit**: ★★★★★ — ทำก่อนสุด

### 4.2 Three-Card Spread (3 ใบ)

| ตำแหน่ง | ความหมาย (แบบยอดนิยม) |
|--------|---------------|
| 1 | อดีต (Past) |
| 2 | ปัจจุบัน (Present) |
| 3 | อนาคต (Future) |

ตัวแปรอื่นของ 3-card spread:
- **Situation / Action / Outcome**
- **Mind / Body / Spirit**
- **You / Partner / Relationship**

- **UX**: สับไพ่ → ลาก 3 ใบ → flip ทีละใบ เล่า narrative
- **MVP fit**: ★★★★★

### 4.3 Celtic Cross (10 ใบ) — Classical

รูปแบบคลาสสิก ตั้งแต่สมัย A.E. Waite

```
           5
           │
  4 ─  1,2  ─ 6
           │
           3

                10
                9
                8
                7
```

| # | ตำแหน่ง | ความหมาย |
|---|--------|---------|
| 1 | Present | สถานการณ์ปัจจุบัน |
| 2 | Challenge | อุปสรรคที่ข้ามทับ |
| 3 | Past | อดีตล่าสุด |
| 4 | Foundation | รากฐาน / อดีตไกล |
| 5 | Conscious goal | เป้าหมายที่ตั้งใจ |
| 6 | Near future | อนาคตใกล้ |
| 7 | Self | ตัวคุณ |
| 8 | Environment | คนรอบข้าง |
| 9 | Hopes/Fears | ความหวัง/ความกลัว |
| 10 | Outcome | ผลลัพธ์สุดท้าย |

- **UX**: ต้องการ gesture dramatic + zoom-in แต่ละไพ่
- **MVP fit**: ★★★ (Phase 2, ซับซ้อน)

### 4.4 Relationship Spread (7 ใบ)

| # | ความหมาย |
|---|---------|
| 1 | ตัวคุณในความสัมพันธ์ |
| 2 | ตัวเขาในความสัมพันธ์ |
| 3 | พลังความสัมพันธ์ |
| 4 | จุดแข็ง |
| 5 | ความท้าทาย |
| 6 | คำแนะนำ |
| 7 | อนาคต |

- **MVP fit**: ★★★★ (ต่อยอด "ดวงสมพงษ์")

### 4.5 Horseshoe Spread (7 ใบ, โค้งเกือกม้า)

| # | ความหมาย |
|---|---------|
| 1 | อดีต |
| 2 | ปัจจุบัน |
| 3 | อนาคตใกล้ |
| 4 | ตัวคุณตอนนี้ |
| 5 | อิทธิพลภายนอก |
| 6 | อุปสรรค |
| 7 | ผลลัพธ์ |

- **MVP fit**: ★★★

---

## 5. พิธีกรรมการอ่านไพ่ (Ritual — สำคัญต่อ UX)

คนที่เคยดูไพ่มืออาชีพจะรู้ว่า **ritual** ก่อนอ่านเป็นส่วนที่ทำให้ "ดวง" รู้สึกขลัง ใน UX เราต้องแปลสิ่งนี้ให้เป็น digital ritual:

1. **ตั้งใจ (Intention)** — ผู้ถามคิดคำถามในใจ
2. **สับไพ่ (Shuffle)** — แบบ physical หรือ mental
3. **เคาะ/ตัดไพ่ (Cut)** — แบ่งสำรับ 3 กอง
4. **หยิบ/สุ่ม (Draw)** — เปิด 1 หรือหลายใบ
5. **ตีความ (Interpret)** — อ่านตามตำแหน่ง + สัญชาตญาณ

### 🎨 Digital Ritual Translation (สำหรับ DaoJai)

| Physical | Digital UX |
|----------|-----------|
| ตั้งใจ | TextField ให้พิมพ์/พูดคำถาม + animation หายใจ 3 ครั้ง |
| สับไพ่ | Swipe gesture + haptic feedback + สัมผัสสำรับแบบ 3D tilt |
| ตัดไพ่ | ลาก/ตบกลางจอเพื่อตัดสำรับ |
| หยิบ | Tap ไพ่ในแนวพัด (fan) |
| เปิด | Flip animation + เสียง whoosh + โชว์ภาพไพ่เต็มจอ |
| อ่าน | Progressive disclosure: ภาพ → keyword → คำอธิบาย → คำแนะนำ |

---

## 6. Algorithm / Data Structure สำหรับ DaoJai

### 6.1 Shuffling — Fisher-Yates algorithm

```typescript
// สับไพ่แบบไม่ bias (uniform distribution)
function shuffle<T>(deck: T[]): T[] {
  const arr = [...deck];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
```

### 6.2 Reversed card probability

```typescript
function drawWithOrientation(card: Card) {
  return {
    card,
    isReversed: Math.random() < 0.5, // ~50% chance, ปรับได้
  };
}
```

### 6.3 Card data model (ตัวอย่าง)

```typescript
type TarotCard = {
  id: string;              // "major-00", "cups-ace", "wands-king"
  arcana: 'major' | 'minor';
  suit?: 'cups' | 'pentacles' | 'swords' | 'wands';
  number: number;          // 0-21 for major, 1-14 for minor
  name: { en: string; th: string };
  image: string;           // URL / asset path
  keywords: {
    upright: string[];
    reversed: string[];
  };
  meanings: {
    general: { upright: string; reversed: string };
    love:    { upright: string; reversed: string };
    career:  { upright: string; reversed: string };
    money:   { upright: string; reversed: string };
    health:  { upright: string; reversed: string };
  };
  element?: 'fire' | 'water' | 'air' | 'earth';
  astrology?: string;      // "Aries", "Saturn", etc.
};
```

### 6.4 Daily Card — deterministic per user per day

เพื่อให้ user ได้ไพ่ **ใบเดิม** ตลอดทั้งวัน (ไม่ได้เปลี่ยนไปเปลี่ยนมา) ใช้ seeded random:

```typescript
// seed = userId + YYYY-MM-DD → hash → index
function dailyCard(userId: string, date: Date, deck: Card[]): Card {
  const dateStr = date.toISOString().slice(0, 10);
  const seed = hashString(`${userId}-${dateStr}`);
  return deck[seed % deck.length];
}
```

**รายละเอียด**:
- ใช้ SHA-256 หรือ murmurhash3
- เก็บลง DB เพื่อ cache และ user ดูย้อนหลังได้

---

## 7. Content Database (ปริมาณที่ต้องเตรียม)

| รายการ | ปริมาณ |
|-------|-------|
| ภาพไพ่ 78 ใบ | 78 × ~500KB (webp) = ~39MB |
| ภาพ flip-back (หลังไพ่) | 1 × ~200KB |
| คำอธิบาย upright + reversed × 5 หัวข้อ | 78 × 10 paragraphs = 780 paragraphs |
| ข้อความไทย | ต้องแปล / เขียนใหม่ให้เป็นธรรมชาติ (ไม่ใช่ translate ตรงๆ) |
| Keywords (tagging) | 78 × ~6 keywords = ~470 keywords |

### 7.1 แหล่งภาพไพ่ (Public Domain)

- **Rider-Waite-Smith** deck — ภาพต้นฉบับปี 1909 **เข้าสู่ public domain แล้ว** ในปี 2022 (70 ปีหลัง Pamela Colman Smith เสียชีวิต)
- หาได้ที่ Wikimedia Commons, Sacred Texts Archive

### 7.2 คู่มือเขียน content ภาษาไทย (แนวทาง)

- **โทน**: เชิงบวก, สนับสนุน, ไม่ขู่ให้กลัว
- **ความยาว per card**: 80–150 คำ ต่อหัวข้อย่อย
- **Format**: keyword → คำอธิบาย → ข้อแนะนำ

ตัวอย่าง The Fool (upright, general):
> ✨ **The Fool / นักเดินทาง** — การเริ่มต้นที่ไร้ขีดจำกัด
>
> วันนี้คุณกำลังยืนอยู่บนขอบของการเริ่มต้นใหม่ ไพ่นี้กระซิบว่า "อย่ากลัวที่จะก้าว"
> ไม่ใช่ว่าคุณจะไม่รู้จุดหมาย แต่มันเป็นการกล้าออกเดินทางโดยที่ยังไม่มีคำตอบ
>
> **คำแนะนำ**: ถ้ามีความคิดใหม่ผุดขึ้นมา ลองจดไว้แล้วลงมือทำเป็น baby step

---

## 8. บริบทไทย (Thai Context)

- **ความเชื่อเฉพาะถิ่น**: คนไทยมักมองไพ่ The Tower, Death, The Devil ในแง่ลบจัดเกินจริง ต้อง **ใส่ disclaimer** ใน UX ว่าไพ่เหล่านี้มักหมายถึงการเปลี่ยนแปลง ไม่ใช่ความตายจริง
- **ไพ่ยิปซี Gen Z Thai**: TikTok trend ทำให้คำว่า "The Tower" กลายเป็น slang "โดน Tower" = เรื่องพังหมด → สามารถใช้ภาษานี้ได้ในคำอธิบาย
- **หมอดูไพ่ดัง TH (market reference)**:
  - หมอดูแมน (TikTok @mordooman) — millennial audience
  - Tarot by Jane
  - Horoworld (horoworld.com)
  - MThai Horoscope

---

## 9. ข้อกฎหมายและ Ethical Consideration

- **Thailand**: ไม่มีกฎหมายห้ามดูดวง แต่การหลอกลวงเพื่อเงินเข้าข่าย "ฉ้อโกง" ตามประมวลกฎหมายอาญา มาตรา 341
- **Ethical guideline สากล** (American Tarot Association):
  1. ไม่ทำนายเรื่องความตาย / โรคร้าย / การตั้งครรภ์ (ให้ส่งต่อแพทย์)
  2. ไม่วินิจฉัยโรค
  3. เคารพสิทธิผู้ถาม (privacy)
- **UX implication**: ต้องมี disclaimer footer + health warning + มี option escalate ไปผู้เชี่ยวชาญจริง

---

## 10. Reference / แหล่งศึกษาเพิ่ม

### หนังสือคลาสสิก

- **A. E. Waite** — _The Pictorial Key to the Tarot_ (1910) ข้อความต้นฉบับของสำรับ Rider-Waite
- **Eden Gray** — _A Complete Guide to the Tarot_ (1970)
- **Rachel Pollack** — _Seventy-Eight Degrees of Wisdom_ (1980) — classic modern interpretation
- **Mary K. Greer** — _Tarot for Yourself_ (1984)

### เว็บไซต์อ้างอิง

- **Biddy Tarot** — https://www.biddytarot.com/tarot-card-meanings/ (คำอธิบายภาษาอังกฤษที่ครบและกระชับที่สุด)
- **Labyrinthos Academy** — https://labyrinthos.co/blogs/tarot-card-meanings-list (UI สวย เหมาะเป็น UX benchmark)
- **Learn Tarot (Joan Bunning)** — https://www.learntarot.com/ (คอร์สฟรี structured)
- **The Tarot Lady (Theresa Reed)** — https://www.thetarotlady.com/

### Wikipedia

- https://en.wikipedia.org/wiki/Tarot
- https://en.wikipedia.org/wiki/Rider%E2%80%93Waite_Tarot
- https://en.wikipedia.org/wiki/Major_Arcana
- https://en.wikipedia.org/wiki/Minor_Arcana

### Thai sources

- **Sanook Horoscope** — https://horoscope.sanook.com/
- **Horoworld** — https://www.horoworld.com/
- **MThai Horoscope** — https://horoscope.mthai.com/
- **Kapook Horoscope** — https://horoscope.kapook.com/

### Open dataset

- **Rider-Waite deck on Wikimedia Commons** — https://commons.wikimedia.org/wiki/Category:Rider-Waite_tarot_deck
- **Public Domain Tarot Images** — https://www.sacred-texts.com/tarot/

---

## 11. ข้อสรุปสำหรับ DaoJai

### ✅ MVP scope (Phase 2)

1. **Daily Card** — 1 ไพ่ต่อวัน, กดเปิด, อ่าน, แชร์
2. **3-Card Spread** — อดีต-ปัจจุบัน-อนาคต
3. **Love Spread (Relationship 7 cards)** — เชื่อมกับดวงสมพงษ์

### 🎁 Differentiator vs คู่แข่งไทย

- UI Ritual ที่ละเอียด (sound + haptic + animation)
- คำอธิบายภาษาไทยที่เขียนใหม่แบบ Gen Z-friendly (ไม่ใช่ translate ตรง)
- Reading history + journal — user เก็บ reading ย้อนหลังดูได้
- AI-assist "ขยายความ" ให้ตาม user context (premium feature)

### 🗂 Content production effort

- **78 cards × 5 หัวข้อ × 2 orientation (upright/reversed) = 780 entries**
- ถ้าคนเขียน 1 คน ทำวันละ 10 entries = **78 วัน**
- ตัวช่วย: ใช้ LLM เป็น first-draft แล้วคนแก้ให้เป็นโทนแบรนด์ → ย่นเหลือ **14–21 วัน**

---

_Last updated: 2026-04-17_ — ไฟล์ต่อไป: [02-daily-horoscope.md](./02-daily-horoscope.md)
