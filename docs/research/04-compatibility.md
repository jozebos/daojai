# 04 — ดวงสมพงษ์ (Compatibility)

> Research deep-dive เพื่อออกแบบ feature "ดูดวงคู่ / สมพงษ์" บน DaoJai

---

## 1. ภาพรวม

**ดวงสมพงษ์** ในภาษาไทย = การดูดวงคู่ (คนสองคนเข้ากันได้ไหม) ใช้ได้กับ:

- **คู่รัก / คู่สมรส** (มากที่สุด)
- **คู่ธุรกิจ / หุ้นส่วน**
- **เพื่อน / พี่น้อง**
- **ผู้บังคับบัญชากับลูกน้อง**

ศาสตร์ที่ใช้ในตลาดไทยมี**หลายระบบผสมกัน**:

1. **วันเกิดสมพงษ์** (ไทยดั้งเดิม) — 7 × 7 = 49 คู่
2. **ปีนักษัตรสมพงษ์** (จีน/ไทย) — 12 × 12 = 144 คู่
3. **เลขสมพงษ์** (Life Path compatibility) — 9 × 9 คู่
4. **ราศีสมพงษ์ (Western)** — 12 × 12 = 144 คู่
5. **Synastry** — เปรียบเทียบ natal chart เต็ม (advanced)
6. **ไพ่สมพงษ์** — Tarot relationship spread

**DaoJai strategy**: ให้ user ป้อน **ข้อมูลแค่วันเกิด + เพศ** ของทั้ง 2 คน → คำนวณหลายมุมมอง → **ให้คะแนนรวม** แบบ Composite Score

---

## 2. วันเกิดสมพงษ์ (Thai Traditional)

### 2.1 หลักการ

พิจารณา **วันในสัปดาห์ (7 วัน)** ที่เกิดของทั้งคู่ เทียบกับตาราง 49 ช่อง (7×7)
แต่ละคู่จะได้ระดับ "สมพงษ์ / ไม่ถูกกัน / เฉยๆ"

### 2.2 ประเภทความเข้ากัน

| ระดับ | ความหมาย |
|------|-------|
| **มิตร (เพื่อน)** | เข้ากันได้ดี สมพงษ์ |
| **สหาย (ช่วยเหลือ)** | เสริมส่งกัน |
| **ศัตรู (ผิดใจ)** | ขัดกัน ทะเลาะง่าย |
| **ศูนย์ (กลางๆ)** | ไม่ดีไม่ร้าย |
| **เสมอ (วันเดียวกัน)** | คล้ายกันมากไป ต้องปรับ |

### 2.3 ตาราง 49 คู่ (สรุปหลัก)

ตัวอย่างคู่ยอดนิยม (อ้างอิงจากตำราโหรไทย):

| ชาย / หญิง | อา | จ | อ | พ | พฤ | ศ | ส |
|---|---|---|---|---|---|---|---|
| **อาทิตย์** | เสมอ | มิตร | ศัตรู | ศูนย์ | มิตร | สหาย | ศัตรู |
| **จันทร์** | มิตร | เสมอ | ศัตรู | มิตร | สหาย | ศูนย์ | ศัตรู |
| **อังคาร** | ศัตรู | ศัตรู | เสมอ | ศูนย์ | ศัตรู | มิตร | สหาย |
| **พุธ** | ศูนย์ | มิตร | ศูนย์ | เสมอ | ศัตรู | มิตร | ศูนย์ |
| **พฤหัสบดี** | มิตร | สหาย | ศัตรู | ศัตรู | เสมอ | ศูนย์ | มิตร |
| **ศุกร์** | สหาย | ศูนย์ | มิตร | มิตร | ศูนย์ | เสมอ | ศัตรู |
| **เสาร์** | ศัตรู | ศัตรู | สหาย | ศูนย์ | มิตร | ศัตรู | เสมอ |

> ⚠️ *ตารางนี้เป็นการสรุปคร่าวๆ ตำราโหรแต่ละเล่มอาจต่างกันเล็กน้อย — DaoJai ควรเลือก 1 ตำราเป็นมาตรฐาน และบันทึก source*

### 2.4 Scoring สำหรับ DaoJai

```typescript
const THAI_DAY_COMPATIBILITY: Record<CompatibilityType, number> = {
  mitr:   85,   // มิตร
  sahai:  90,   // สหาย (ดีที่สุด)
  sanyut: 60,   // เสมอ/คล้ายกัน
  soon:   55,   // ศูนย์
  sattru: 30,   // ศัตรู
};
```

---

## 3. ปีนักษัตรสมพงษ์ (Chinese Zodiac)

### 3.1 กลุ่มสามมิตร (Trine / 三合)

12 นักษัตรแบ่งเป็น 4 กลุ่ม กลุ่มละ 3 = **กลุ่มสามมิตร** ที่เข้ากันดีที่สุด

| กลุ่ม (ธีม) | นักษัตร (ไทย) | ความหมายร่วม |
|--------|---------|------|
| **กลุ่มนักสร้าง** | ชวด + มะโรง + วอก | ใฝ่ก้าวหน้า ทะเยอทะยาน |
| **กลุ่มผู้ยืนหยัด** | ฉลู + มะเส็ง + ระกา | ขยัน มีวินัย |
| **กลุ่มผู้แสวง** | ขาล + มะเมีย + จอ | กล้าหาญ รักอิสระ |
| **กลุ่มผู้โอบอ้อม** | เถาะ + มะแม + กุน | เมตตา ละเอียดอ่อน |

### 3.2 คู่ปะทะ (Clash / 相沖)

นักษัตรที่อยู่ตรงข้ามกันบนวงล้อ (ต่าง 6 ปี) = ขัดแย้งที่สุด

| คู่ปะทะ |
|------|
| ชวด ↔ มะเมีย (หนู ↔ ม้า) |
| ฉลู ↔ มะแม (วัว ↔ แพะ) |
| ขาล ↔ วอก (เสือ ↔ ลิง) |
| เถาะ ↔ ระกา (กระต่าย ↔ ไก่) |
| มะโรง ↔ จอ (มังกร ↔ หมา) |
| มะเส็ง ↔ กุน (งู ↔ หมู) |

### 3.3 คู่โทษ (Punishment / 相刑), คู่ทำลาย (Harm / 相害)

คู่รองที่ไม่ดี แต่ระดับเบากว่า clash — สามารถปรับกันได้

### 3.4 Scoring

```typescript
function chineseZodiacScore(a: Animal, b: Animal): number {
  if (a === b) return 70;                        // เดียวกัน
  if (isTrine(a, b)) return 95;                  // สามมิตร
  if (isClash(a, b)) return 25;                  // ปะทะ
  if (isHarm(a, b)) return 40;                   // ทำลาย
  if (isPunishment(a, b)) return 45;             // โทษ
  return 65;                                     // neutral
}
```

---

## 4. ราศีสมพงษ์ (Western Zodiac)

### 4.1 หลักการทั่วไป

- **ธาตุเดียวกัน (Fire-Fire, Water-Water)** = เข้าใจกัน (~75-85%)
- **ธาตุเสริมกัน (Fire-Air, Water-Earth)** = ส่งเสริม (~80-90%)
- **ธาตุขัดกัน (Fire-Water, Earth-Air)** = ต้องปรับ (~45-60%)

### 4.2 คู่เสริม (Trine — ห่าง 120°)

ในวงจักรราศี ถ้าห่างกัน 4 ตำแหน่ง = ธาตุเดียวกัน = trine

- Fire trine: เมษ + สิงห์ + ธนู
- Earth trine: พฤษภ + กันย์ + มังกร
- Air trine: เมถุน + ตุลย์ + กุมภ์
- Water trine: กรกฎ + พิจิก + มีน

### 4.3 คู่เสริมอีกแบบ (Sextile — ห่าง 60°)

- Fire ↔ Air (เสริมกัน)
- Earth ↔ Water (เสริมกัน)

### 4.4 คู่ขัด (Square — ห่าง 90°, Opposite — ห่าง 180°)

- Square = ตึงเครียด แต่กระตุ้นให้เติบโต
- Opposite = ตรงข้าม แต่ดึงดูดกัน ("คู่กรรม")

### 4.5 ตาราง 12 × 12 — Quick Score

| Sign | ธาตุ | Best match | Avoid |
|------|------|-----------|-------|
| Aries | Fire | Leo, Sagittarius, Aquarius, Gemini | Cancer, Capricorn |
| Taurus | Earth | Virgo, Capricorn, Cancer, Pisces | Aquarius, Leo |
| Gemini | Air | Libra, Aquarius, Aries, Leo | Virgo, Pisces |
| Cancer | Water | Scorpio, Pisces, Taurus, Virgo | Aries, Libra |
| Leo | Fire | Aries, Sagittarius, Libra, Gemini | Taurus, Scorpio |
| Virgo | Earth | Taurus, Capricorn, Cancer, Scorpio | Gemini, Sagittarius |
| Libra | Air | Gemini, Aquarius, Leo, Sagittarius | Cancer, Capricorn |
| Scorpio | Water | Cancer, Pisces, Virgo, Capricorn | Leo, Aquarius |
| Sagittarius | Fire | Aries, Leo, Libra, Aquarius | Virgo, Pisces |
| Capricorn | Earth | Taurus, Virgo, Scorpio, Pisces | Aries, Libra |
| Aquarius | Air | Gemini, Libra, Aries, Sagittarius | Taurus, Scorpio |
| Pisces | Water | Cancer, Scorpio, Taurus, Capricorn | Gemini, Sagittarius |

---

## 5. Synastry (Natal Chart Comparison — Advanced)

### 5.1 หลักการ

ไม่ใช่แค่เทียบ Sun Sign แต่เทียบ **planet placement** ทั้งหมดระหว่าง 2 คน
- **Sun-Moon aspect**: ภาพรวมความเข้ากัน
- **Venus-Mars aspect**: ความดึงดูดทางเพศ
- **Moon-Moon aspect**: ความเข้ากันทางอารมณ์
- **Mercury-Mercury**: การสื่อสาร
- **Saturn aspect**: ความมั่นคงยาวนาน

### 5.2 Composite Chart

วิธีขั้น advanced — หา midpoint ของทุก planet ของทั้ง 2 คน = "ดวงของความสัมพันธ์" เป็นเอกเทศ

> 🔧 **DaoJai MVP**: ไม่ทำ synastry เต็ม เริ่มจาก **Sun-Moon-Rising comparison** ก็พอสำหรับ wow-factor

---

## 6. เลขสมพงษ์ (Numerology Compatibility)

เปรียบเทียบ **Life Path Number** ของทั้งคู่

### 6.1 คู่เลขที่เข้ากัน (Classical)

| Life Path | Best match | Neutral | Challenging |
|----|---|---|---|
| 1 | 3, 5, 6 | 1, 9 | 4, 7 |
| 2 | 4, 6, 8 | 2, 9 | 1, 5 |
| 3 | 1, 5, 6 | 3, 9 | 4, 7 |
| 4 | 2, 7, 8 | 4, 6 | 3, 5 |
| 5 | 1, 3, 7 | 5, 9 | 2, 4 |
| 6 | 2, 3, 8, 9 | 1, 6 | 4, 5 |
| 7 | 4, 5 | 7 | 1, 3, 8 |
| 8 | 2, 4, 6 | 8, 9 | 1, 5 |
| 9 | 3, 6 | 1, 2, 5, 9 | 4, 7, 8 |

---

## 7. ไพ่สมพงษ์ (Tarot Relationship Spread)

### 7.1 รูปแบบ 7-card Love Spread (ดูละเอียดแล้วที่ 01-tarot.md)

เพิ่มบริบทสำหรับ "ดวงสมพงษ์":
- User ป้อนชื่อทั้งคู่
- สับไพ่ → เปิด 7 ใบ → narrative เล่าเป็นเรื่อง

### 7.2 Alternative — 5-card spread

| # | ตำแหน่ง |
|---|---|
| 1 | ตัวคุณ |
| 2 | ตัวเขา |
| 3 | สิ่งเชื่อมคุณทั้งคู่ |
| 4 | สิ่งที่ต้องระวัง |
| 5 | ศักยภาพของความสัมพันธ์ |

---

## 8. Composite Score Algorithm (DaoJai's Secret Sauce)

เราจะรวมหลายมุมมองให้ได้ **"คะแนนสมพงษ์ 0-100"** พร้อม breakdown

### 8.1 สูตรที่แนะนำ

```typescript
type CompatibilityInput = {
  personA: BirthProfile;
  personB: BirthProfile;
};

type CompatibilityScore = {
  overall: number;                 // 0-100
  breakdown: {
    thaiDay:        { score: number; weight: 0.20 };
    chineseZodiac:  { score: number; weight: 0.15 };
    westernSun:     { score: number; weight: 0.25 };
    numerology:     { score: number; weight: 0.15 };
    moonSign:       { score: number; weight: 0.15 };
    risingSign:     { score: number; weight: 0.10 };
  };
  dimensions: {
    emotion:        number;        // อารมณ์
    communication:  number;        // การสื่อสาร
    physical:       number;        // ดึงดูด/ทางเพศ
    stability:      number;        // ความมั่นคงยาวนาน
    friendship:     number;        // มิตรภาพ
  };
  advice: string;                  // คำแนะนำเฉพาะคู่
  redFlags: string[];              // จุดที่ต้องระวัง
  greenFlags: string[];            // จุดแข็ง
};

function calculate(input: CompatibilityInput): CompatibilityScore {
  // weighted sum
  let total = 0;
  for (const key of keys) {
    total += score[key] * weight[key];
  }
  return { overall: Math.round(total), ... };
}
```

### 8.2 Dimension Mapping

| Dimension | Source |
|-----------|--------|
| **Emotion (อารมณ์)** | Moon ↔ Moon, Water element |
| **Communication (สื่อสาร)** | Mercury ↔ Mercury, Air element, วันพุธ |
| **Physical (ดึงดูด)** | Venus ↔ Mars, Fire element |
| **Stability (ยืนยาว)** | Saturn, ทักษา "อายุ" |
| **Friendship (มิตรภาพ)** | ทักษา "บริวาร", Chinese trine |

### 8.3 Score Tiers

| คะแนน | ระดับ | คำอธิบาย |
|------|----|----|
| 90–100 | 💞 Soulmate | ขนาดดาราศาสตร์ยัง envy |
| 80–89 | 🥰 High Match | เข้ากันได้ดีมาก |
| 70–79 | 😊 Good Match | เข้ากันได้ดี ต้องปรับเล็กน้อย |
| 60–69 | 🤔 Mixed | มีทั้งดีและต้องแก้ |
| 50–59 | 😐 Neutral | ไม่ดีไม่ร้าย |
| 40–49 | 😰 Challenging | ต้องใช้ความเข้าใจสูง |
| 0–39 | 💥 Tough | ระวัง mismatch |

---

## 9. UX Flow & Gamification

### 9.1 Flow แนะนำ

```
Step 1: "Check your compatibility 💞"
Step 2: ข้อมูล You (auto-fill จาก profile)
Step 3: ข้อมูลอีกคน
  - [ชื่อเล่น]  [รูปถ่าย (optional)]  [วันเกิด]  [เพศ]
Step 4: ประเภทความสัมพันธ์
  - [ ] คู่รัก  [ ] คู่คุย  [ ] เพื่อน  [ ] พี่น้อง  [ ] คู่ธุรกิจ
Step 5: "กำลังเช็ค..." animation ดาว 2 ดวงโคจรเข้าหากัน 3-5 วิ
Step 6: Reveal — "You scored 🌟 82 — High Match"
Step 7: Breakdown + advice + ของชิ้นเดียวกันเป็น share card
```

### 9.2 Share Card สำหรับ IG Story

- Format: 1080x1920
- Content: avatar 2 คน + คะแนน + 1 ประโยคหวานๆ
- CTA: "เช็คของคุณที่ daojai.com"

### 9.3 Gamification

- บันทึกคู่ที่เคยเช็ค → โปรไฟล์ "เพื่อนใน DaoJai"
- Leaderboard (ปิดได้) — คู่ที่ score สูงสุดในเพื่อน
- Invite link — เพื่อนเข้ามาเช็คของตัวเอง → viral loop

---

## 10. บริบทไทย (Cultural Sensitivity)

### 10.1 ห้าม! 🚫

- ❌ **ห้ามบอกว่า "คู่นี้ห้ามแต่งงาน"** — ผิดจริยธรรม, ทำลายชีวิตคนได้
- ❌ **ห้ามบอก "ถ้าแต่งจะหย่า"** — ใช้คำว่า "ต้องปรับตัวมาก" แทน
- ❌ **ห้ามตัดสินเด็ดขาดทาง religion/เพศ**

### 10.2 คำที่ใช้แทน

| อย่าใช้ | ใช้แทน |
|--------|------|
| "ดวงดับ" | "ช่วงที่ต้องระวัง" |
| "คู่ชง" | "คู่ที่ต้องสื่อสารให้ชัด" |
| "เป็นคู่กรรม" | "มีบทเรียนที่ต้องเรียนรู้ด้วยกัน" |
| "ห้ามแต่งงาน" | "ถ้าจะไปต่อต้องรู้จุดนี้" |
| "จะเลิกกันแน่" | "อาจต้องเผชิญความท้าทาย" |

### 10.3 "รักแฟนตัวเองไหม?" — คำถามที่ user อยากตอบ

Gen Z มักจะเช็ค **หลังทะเลาะกัน** เพื่อ validate ความรู้สึก
→ UX ต้องไม่ตัดสินใจแทน user แค่ **ให้ข้อมูล + คำแนะนำปรับตัว**

---

## 11. Reference

### หนังสือ / แหล่งไทย

- **พรหมชาติ** — ตำราทำนายไทยโบราณ มีบทดวงสมพงษ์
- **คัมภีร์โหราศาสตร์สากลฉบับสมบูรณ์** — สำหรับ Western compatibility
- **Linda Goodman** — _Linda Goodman's Love Signs_ (1978) คลาสสิกเรื่องคู่ราศี

### เว็บไทย

- **Myhora Compatibility** — https://www.myhora.com/ดวงสมพงษ์/
- **Horoworld สมพงษ์** — https://www.horoworld.com/compatibility/
- **Sanook ดวงคู่** — https://horoscope.sanook.com/couple/
- **Kapook ดูดวงคู่** — https://horoscope.kapook.com/

### เว็บสากล

- **Astrology.com Compatibility** — https://www.astrology.com/compatibility
- **Cafe Astrology Synastry** — https://cafeastrology.com/compatibility.html
- **The Pattern (app)** — https://thepattern.com/ — UX เรื่อง "Bonds" เด่นมาก
- **Co-Star** — https://www.costarastrology.com/ — feature "Check Compatibility"
- **AstroSeek Synastry** — https://horoscopes.astro-seek.com/synastry-partner-horoscope-relationship-chart

### Technical

- **Swiss Ephemeris** สำหรับ synastry aspects
- **Astrolog** open source — https://www.astrolog.org/

### Wikipedia

- https://en.wikipedia.org/wiki/Astrological_compatibility
- https://en.wikipedia.org/wiki/Synastry
- https://en.wikipedia.org/wiki/Chinese_zodiac#Combinations

---

## 12. ข้อสรุปสำหรับ DaoJai

### ✅ MVP scope

1. **Input**: วันเกิด (+ optional เวลา) ของ 2 คน
2. **Compute**:
   - วันเกิดสมพงษ์ไทย
   - Chinese trine/clash
   - Western Sun compatibility
   - Numerology
3. **Output**:
   - Overall score 0-100 + emoji tier
   - Breakdown 5 dimensions
   - 3 strengths + 3 things to watch
   - Advice (1-2 paragraphs)
4. **Share card** — สวยสำหรับ IG story

### 🎁 Differentiator vs คู่แข่งไทย

- **Multi-system scoring** — ไม่มีเว็บไทยไหนรวมทุกศาสตร์มาเป็น 1 คะแนน
- **Dimension breakdown** — ไม่ใช่แค่ "คู่กันดี/ไม่ดี" แต่บอกชัดว่า "สื่อสารดีแต่เรื่อง money ต้องคุย"
- **Positive framing** — ไม่ขู่, ไม่ดิสเครดิตความสัมพันธ์
- **Save & history** — user เช็คได้หลายคู่ เก็บไว้เปรียบเทียบ

### 🗂 Content effort

- ตารางวันเกิด 7×7 = 49 combo → เขียน description ~30 คำ × 49 = **1,470 คำ**
- Chinese 12×12 = 144 combo (แต่ symmetric ~78) → **~2,300 คำ**
- Western 12×12 = 144 combo (symmetric ~78) → **~2,300 คำ**
- Life Path 9×9 = 81 combo (symmetric ~45) → **~1,300 คำ**
- Advice template ~ 20 variations

**รวม**: ~8,000 คำ = **~1 สัปดาห์** ของ content writer (+ AI assist)

---

_Last updated: 2026-04-17_ — ไฟล์ต่อไป: [05-ux-benchmarks.md](./05-ux-benchmarks.md)
