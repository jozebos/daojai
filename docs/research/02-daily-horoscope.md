# 02 — ดวงรายวัน (Daily Horoscope)

> Research deep-dive เพื่อออกแบบ feature "ดวงรายวัน" บน DaoJai

---

## 1. ภาพรวม

**ดวงรายวัน (Daily Horoscope)** คือการทำนายดวงชะตาประจำวันที่คำนวณจาก **ตำแหน่งดาวเคราะห์** ณ เวลานั้น
เทียบกับดวงของผู้ถาม — ในตลาดไทย มี 2 ระบบที่คนใช้กันหลัก:

1. **โหราศาสตร์สากล (Western Astrology)** — 12 ราศี เช่น ราศีสิงห์, ราศีเมษ
2. **โหราศาสตร์ไทย/จันทรคติ (Thai Astrology)** — อิงระบบดาว 7 ตัว + ราศีไทย

**DaoJai strategy**: รองรับ **ทั้งสองระบบ** แต่เริ่ม MVP ด้วย Western (สากล) เพราะ content มีเยอะสุด และเป็นที่คุ้นเคยของ Gen Z

---

## 2. 12 ราศี ระบบสากล (Western Zodiac)

ราศีสากลคำนวณจาก **วันเดือนเกิด (Gregorian calendar)** → ตำแหน่ง Sun Sign บนท้องฟ้า

| ราศี (TH) | Sign (EN) | สัญลักษณ์ | ช่วงวันเกิด | ธาตุ | Modality | ดาวปกครอง |
|--------|-----|-------|------|------|-----|------|
| เมษ | Aries | ♈︎ | 21 มี.ค. – 19 เม.ย. | Fire | Cardinal | Mars |
| พฤษภ | Taurus | ♉︎ | 20 เม.ย. – 20 พ.ค. | Earth | Fixed | Venus |
| เมถุน | Gemini | ♊︎ | 21 พ.ค. – 20 มิ.ย. | Air | Mutable | Mercury |
| กรกฎ | Cancer | ♋︎ | 21 มิ.ย. – 22 ก.ค. | Water | Cardinal | Moon |
| สิงห์ | Leo | ♌︎ | 23 ก.ค. – 22 ส.ค. | Fire | Fixed | Sun |
| กันย์ | Virgo | ♍︎ | 23 ส.ค. – 22 ก.ย. | Earth | Mutable | Mercury |
| ตุลย์ | Libra | ♎︎ | 23 ก.ย. – 22 ต.ค. | Air | Cardinal | Venus |
| พิจิก | Scorpio | ♏︎ | 23 ต.ค. – 21 พ.ย. | Water | Fixed | Pluto / Mars |
| ธนู | Sagittarius | ♐︎ | 22 พ.ย. – 21 ธ.ค. | Fire | Mutable | Jupiter |
| มังกร | Capricorn | ♑︎ | 22 ธ.ค. – 19 ม.ค. | Earth | Cardinal | Saturn |
| กุมภ์ | Aquarius | ♒︎ | 20 ม.ค. – 18 ก.พ. | Air | Fixed | Uranus / Saturn |
| มีน | Pisces | ♓︎ | 19 ก.พ. – 20 มี.ค. | Water | Mutable | Neptune / Jupiter |

### 2.1 การจำแนกตามธาตุ (Elements)

| ธาตุ | ราศี | บุคลิกคร่าวๆ |
|------|-----|----|
| **Fire / ไฟ** | เมษ, สิงห์, ธนู | กระตือรือร้น, มั่นใจ, ใจร้อน |
| **Earth / ดิน** | พฤษภ, กันย์, มังกร | มั่นคง, ปฏิบัตินิยม, อดทน |
| **Air / ลม** | เมถุน, ตุลย์, กุมภ์ | คิดเยอะ, สังคม, ช่างพูด |
| **Water / น้ำ** | กรกฎ, พิจิก, มีน | อ่อนไหว, สัญชาตญาณสูง, อารมณ์ |

### 2.2 Modality (ลักษณะการแสดงออก)

| Modality | ราศี | ธรรมชาติ |
|---------|-----|---------|
| **Cardinal** (ผู้ริเริ่ม) | เมษ, กรกฎ, ตุลย์, มังกร | เริ่มต้น, ผู้นำ |
| **Fixed** (ผู้ยืนหยัด) | พฤษภ, สิงห์, พิจิก, กุมภ์ | มั่นคง, ดื้อ |
| **Mutable** (ผู้ปรับตัว) | เมถุน, กันย์, ธนู, มีน | ยืดหยุ่น, หลากหลาย |

---

## 3. ราศีไทย (โหราศาสตร์จันทรคติ)

ในระบบไทยโบราณใช้ **ราศีจันทร์ (Moon Sign)** เป็นหลัก ไม่ใช่ Sun Sign แบบตะวันตก
ช่วงราศีไทยจะเลื่อน ~24 วัน จากสากล เพราะใช้ "ระบบนิรายนะ" (sidereal) แทน "ระบบสายะนะ" (tropical)

> ⚠️ **หมายเหตุสำคัญ**: ในแอป DaoJai แนะนำให้ใช้ "Sun Sign สากล" เป็น default เพราะ Gen Z คุ้นเคย
> แต่เปิด option "ราศีไทย" ใน advanced setting

### ความแตกต่างประมาณการ (Lahiri ayanamsa ~24°)

| ราศีสากล (Tropical) | ราศีไทย (Sidereal) |
|--------|---------|
| 21 มี.ค. – 19 เม.ย. Aries | ~14 เม.ย. – 14 พ.ค. เมษ |
| 20 เม.ย. – 20 พ.ค. Taurus | ~15 พ.ค. – 14 มิ.ย. พฤษภ |
| ... | ... |

*(ช่วงวันต่างกันประมาณ 24–25 วัน)*

---

## 4. ทฤษฎีคำนวณ "ดวงรายวัน" 

### 4.1 หลักการแบบสากล

การทำนายดวงรายวันอิง **การเคลื่อนของดาวเคราะห์ (transits)** เทียบกับ Sun Sign ของผู้ถาม:

- **Moon transit** (เคลื่อนผ่านทุกราศีภายใน ~2.5 วัน) → อารมณ์ประจำวัน
- **Mercury retrograde** → การสื่อสาร, การเดินทาง
- **Venus transit** → ความรัก, การเงิน
- **Mars transit** → พลังงาน, ความขัดแย้ง
- **Aspect** (มุมระหว่างดาว) เช่น conjunction, trine, square → จังหวะดี/ไม่ดี

### 4.2 วิธีจริงที่ "เว็บดวงรายวัน" ทำ (การค้นคว้าตลาด)

จากการศึกษาเว็บไทย (Sanook, Kapook, Horoworld) และต่างประเทศ (horoscope.com, Astrology.com):

1. **เขียน content ล่วงหน้า** โดยโหรในทีม — ไม่ได้คำนวณ real-time
2. **Template-based** — ใช้ template "ดวงวันนี้: ความรัก X, การงาน Y, การเงิน Z, โชค W"
3. **แบ่งตาม 12 ราศี × 7 วัน = 84 entry ต่อสัปดาห์** หรือ × 365 = ~4,380 entries ต่อปี
4. **บางเจ้าใช้ AI** (GPT) generate คร่าวๆ แล้วคนรีวิว

### 4.3 ทางเลือกด้าน Astrology Engine (ถ้าจะคำนวณจริง)

ถ้าต้องการคำนวณดวงจริงต้องใช้ **Swiss Ephemeris** — library คำนวณตำแหน่งดาวเคราะห์ทางดาราศาสตร์จริง

| Library | ภาษา | License | หมายเหตุ |
|--------|-----|---------|---------|
| **Swiss Ephemeris** (pyswisseph) | Python/C | GPL / Commercial | มาตรฐานอุตสาหกรรม |
| **astro.js** / **astronomia** | JS | MIT | ใน Node.js / browser |
| **swisseph-api** (npm) | TypeScript | MIT | wrapper ของ SE |
| **AstroAPI** (external) | REST | paid | SaaS |

---

## 5. โครงสร้าง Content ดวงรายวัน (Template)

### 5.1 Schema ที่แนะนำสำหรับ DaoJai

```typescript
type DailyHoroscope = {
  sign: ZodiacSign;          // "aries" | ... | "pisces"
  date: string;              // ISO "YYYY-MM-DD"
  overview: string;          // 2-3 ประโยคสรุป
  categories: {
    love:    { score: 1-5; text: string };
    career:  { score: 1-5; text: string };
    money:   { score: 1-5; text: string };
    health:  { score: 1-5; text: string };
    luck:    { score: 1-5; text: string };
  };
  lucky: {
    color: string;           // "แดงเลือดหมู"
    number: number;          // 7
    direction: string;       // "ตะวันออก"
    time?: string;           // "09:00-11:00"
  };
  avoid: string;             // "หลีกเลี่ยงการตัดสินใจเรื่องเงินก่อน 15:00"
  advice: string;            // 1-2 ประโยค
  mantra?: string;           // "ฉันกำลังเรียนรู้ที่จะปล่อยวาง"
};
```

### 5.2 ตัวอย่าง (ราศีสิงห์ วันที่ X)

```
♌︎ Leo — ราศีสิงห์
📅 17 เมษายน 2026

🌟 Overview
วันนี้พระอาทิตย์ส่งพลังให้คุณกล้าแสดงออกมากขึ้น แต่ Moon square Mars เตือนให้ระวัง
คำพูดที่อาจทิ่มแทงคนรอบข้างโดยไม่ตั้งใจ

💕 ความรัก ★★★★☆
— เจอคนคุยแล้วรู้สึกปัง อย่ารีบเกินไป ให้เวลาค่อยๆ รู้จักกัน

💼 การงาน ★★★☆☆
— มีคนขอคำแนะนำเยอะ คุณเป็นที่พึ่ง แต่ระวังเหนื่อยแทนคนอื่น

💰 การเงิน ★★★☆☆
— ไม่ใช่วันเสี่ยงดวง อย่าเพิ่งลงทุนอะไรใหม่ รอดูสัก 2-3 วัน

🌿 สุขภาพ ★★★★☆
— พักผ่อนเพียงพอแล้ว ลองขยับตัวออกกำลังเบาๆ ช่วยให้อารมณ์ดี

🎰 โชคลาภ ★★☆☆☆
— วันนี้โชคไม่จัด เน้นสร้างเองมากกว่ารอ

🍀 สีมงคล: ส้มทอง
🔢 เลขมงคล: 5
🧭 ทิศมงคล: ตะวันออกเฉียงใต้

⚠️ สิ่งที่ควรเลี่ยง: คำพูดกระแทกในแชทกลุ่มเพื่อน

✨ คำแนะนำ: ก่อนพิมพ์ reply ให้หายใจ 3 ครั้งเสมอ

🙏 คาถาประจำวัน: "ความสว่างของฉันเติบโตเมื่อฉันรู้จักฟัง"
```

---

## 6. Algorithm คำนวณราศี (จาก birthday)

### 6.1 Western Sun Sign

```typescript
function getSunSign(birthDate: Date): ZodiacSign {
  const month = birthDate.getMonth() + 1; // 1-12
  const day = birthDate.getDate();
  const mmdd = month * 100 + day;

  if (mmdd >= 321 && mmdd <= 419) return 'aries';
  if (mmdd >= 420 && mmdd <= 520) return 'taurus';
  if (mmdd >= 521 && mmdd <= 620) return 'gemini';
  if (mmdd >= 621 && mmdd <= 722) return 'cancer';
  if (mmdd >= 723 && mmdd <= 822) return 'leo';
  if (mmdd >= 823 && mmdd <= 922) return 'virgo';
  if (mmdd >= 923 && mmdd <= 1022) return 'libra';
  if (mmdd >= 1023 && mmdd <= 1121) return 'scorpio';
  if (mmdd >= 1122 && mmdd <= 1221) return 'sagittarius';
  if (mmdd >= 1222 || mmdd <= 119) return 'capricorn';
  if (mmdd >= 120 && mmdd <= 218) return 'aquarius';
  return 'pisces'; // 219 - 320
}
```

### 6.2 วันในสัปดาห์ (สำหรับดวงวันเกิดไทย)

```typescript
// คืน 0-6: อาทิตย์, จันทร์, อังคาร, พุธ(กลางวัน), พฤหัส, ศุกร์, เสาร์
// + พุธกลางคืน (สำหรับโหราศาสตร์ไทยแยก พุธ เป็น 2)
function getThaiDayOfWeek(birthDate: Date, bornAtNight = false): ThaiDay {
  const dow = birthDate.getDay();
  if (dow === 3 && bornAtNight) return 'wednesday_night'; // พุธกลางคืน = ราหู
  return THAI_DAYS[dow];
}
```

---

## 7. Content Production Plan

### 7.1 ปริมาณที่ต้องเตรียม (สเกลจริง)

| แนวทาง | ปริมาณ content |
|-------|---------|
| A. รายวัน 12 ราศี × 365 วัน | 4,380 entries/ปี (หนักมาก) |
| B. รายสัปดาห์ 12 ราศี × 52 | 624 entries/ปี |
| C. ใช้ AI generate + human review | ทำ A ได้สบาย |
| D. **แนะนำ**: AI generate รายวัน + editor review weekly | ผสม A + C |

### 7.2 AI Prompt Template (สำหรับ LLM เขียนดวง)

```
คุณคือนักเขียน content ดวงรายวันให้เว็บ DaoJai
กลุ่มเป้าหมาย: คนไทย Gen Z (18-30) 
โทน: เชิงบวก, สนับสนุน, ไม่ขู่ให้กลัว, ไม่จริงจังเกินไป

ข้อมูลวันนี้:
- วันที่: {date}
- ราศี: {sign}
- Moon transit: {moon_position}
- Major aspects: {aspects}
- Mercury retrograde: {is_retrograde}

เขียนดวงรายวันตาม schema:
1. Overview (2-3 ประโยค)
2. ความรัก (+ คะแนน 1-5)
3. การงาน (+ คะแนน 1-5)
4. การเงิน (+ คะแนน 1-5)
5. สุขภาพ (+ คะแนน 1-5)
6. โชคลาภ (+ คะแนน 1-5)
7. สี/เลข/ทิศมงคล
8. สิ่งที่ควรเลี่ยง
9. คำแนะนำ
10. คาถาประจำวัน

ห้าม:
- ทำนายเรื่องความตาย, โรคร้าย, การตั้งครรภ์
- ใช้คำขู่ ("ระวัง!", "หายนะ", "ซวยหนัก")
- สัญญาผลลัพธ์ ("จะรวยแน่นอน")

ใช้คำว่า "อาจจะ", "มีแนวโน้ม", "ลอง", "ข้อสังเกต"
```

---

## 8. Micro-interaction & UX

### 8.1 Journey แนะนำ

1. **First visit**: ถามวันเกิด → คำนวณราศี → onboarding 3 จอ
2. **Returning user (daily)**: เปิดแอป → ดวงวันนี้โผล่เลย (hero section) → scroll ดูรายละเอียด
3. **Push notification** 07:00 ทุกวัน: "เดาใจวันนี้ของคุณเตรียมไว้แล้ว ✨"
4. **Share button**: screenshot-ready card สวยๆ สำหรับ IG story (1080x1920)

### 8.2 Gamification

- **Streak** — อ่านดวงติดกัน 7 วัน ได้ badge
- **Lucky jar** — sticker ดวงดี เก็บสะสม
- **Weekly recap** — summary สัปดาห์ที่ผ่านมา
- **Monthly Vibes** — ธีม mood board ของเดือน

### 8.3 แนวคิด "Mood Log"

- หลังอ่านดวง ให้ user กดว่า "ตรง / ไม่ตรง / งั้นๆ"
- สะสมเป็น data → เอาไป personalize → สร้าง engagement loop

---

## 9. บริบทไทย (Thai-specific)

### 9.1 ความเชื่อยอดนิยมในไทย (Gen Z Edition)

- **"ดวงวันเกิด"** คนไทยพูดรวมทั้งวันในสัปดาห์ที่เกิด + เดือน
- **สีมงคลประจำวัน** — คนไทยให้ความสำคัญกับสีเสื้อตามวัน (โหราศาสตร์ไทยทักษา):
  - อาทิตย์: แดง
  - จันทร์: เหลือง/ครีม
  - อังคาร: ชมพู
  - พุธ: เขียว
  - พฤหัสบดี: ส้ม
  - ศุกร์: ฟ้า
  - เสาร์: ดำ/ม่วง
- **เลขมงคล** — 9 (ก้าวหน้า), 6 (สมดุล), 8 (เฮง), 5 (ห้า = ฮ้า สนุก)

### 9.2 ภาษา Gen Z ใน content

- แทนคำว่า "จะเจอ" = "ได้เจอ", "มีโอกาสเจอ"
- แทน "ระวัง!" = "เตือนเบาๆ ว่า..."
- ใช้ emoji appropriately (ไม่มากเกิน)
- ตัวอย่างคำฮิต: "ปัง", "ดิบดี", "ฟีลดี", "ตึง"

---

## 10. Reference

### เว็บไทย (UX benchmark)

- **Sanook Horoscope** — https://horoscope.sanook.com/ (market leader, content หนาแน่น)
- **Kapook Horoscope** — https://horoscope.kapook.com/
- **MThai Horoscope** — https://horoscope.mthai.com/
- **Horoworld** — https://www.horoworld.com/ (focus on interpretation quality)
- **Astrotheme** — https://www.astrotheme.com/ (สากล แต่มี TH community)

### เว็บสากล (content & UX)

- **Horoscope.com** — https://www.horoscope.com/ (classic, SEO king)
- **Astrology.com** — https://www.astrology.com/
- **Co-Star Astrology** — https://www.costarastrology.com/ (mobile-first, Gen Z favorite)
- **The Pattern** — https://thepattern.com/ (relationship-focused)
- **AstroStyle** (Astrotwins) — https://astrostyle.com/

### หนังสือ / แหล่งความรู้

- **Linda Goodman** — _Sun Signs_ (1968) — คลาสสิกสำหรับคำอธิบายราศี
- **Joanna Martine Woolfolk** — _The Only Astrology Book You'll Ever Need_
- **Kevin Burk** — _Astrology: Understanding the Birth Chart_

### Technical

- **Swiss Ephemeris** — https://www.astro.com/swisseph/ (engine คำนวณดาว)
- **NASA JPL HORIZONS** — https://ssd.jpl.nasa.gov/horizons/ (ephemeris ฟรี, ใช้ API ได้)
- **Astrolog** (open source) — https://www.astrolog.org/

### Wikipedia

- https://en.wikipedia.org/wiki/Astrological_sign
- https://en.wikipedia.org/wiki/Western_astrology
- https://en.wikipedia.org/wiki/Thai_zodiac

---

## 11. ข้อสรุปสำหรับ DaoJai

### ✅ MVP scope

1. **Western Sun Sign** — 12 ราศี, คำนวณจากวันเกิด
2. **Daily content** — ใช้ AI generate + editor review
3. **Category breakdown** — love/career/money/health/luck
4. **Lucky items** — color, number, direction
5. **Share to IG story** — ออกแบบ card ส่งออกเป็น 1080x1920

### 🎁 Differentiator

- "Mood log" ย้อนดูได้ → เปรียบเทียบดวงทำนายกับสิ่งที่เกิดจริง
- Streak + gamification แบบแอป fitness
- Push notification เช้า 07:00 เป็น daily ritual ของผู้ใช้
- ภาษา Gen Z จริง (ไม่ใช่ภาษาโหรเก่า)

### 🗂 Content effort

- ถ้า **AI + human review**: ทีม 1 คน ดูแล content ได้ครบ 12 ราศี ต่อวัน ใน ~1 ชั่วโมง
- **Cost estimate**: LLM API ~$0.10/day × 12 ราศี × 365 = ~$438/ปี (ถูกมาก)

---

_Last updated: 2026-04-17_ — ไฟล์ต่อไป: [03-birth-fortune.md](./03-birth-fortune.md)
