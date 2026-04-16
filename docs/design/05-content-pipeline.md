# 05 — Content Pipeline (Hybrid AI + Human)

> วิธีผลิต content อัตโนมัติ + คน review → คุณภาพดี, scale ได้, brand voice คงที่

---

## 1. Strategy Overview

DaoJai มี content 4 ประเภท:

| Content | Volume | Update frequency | Source |
|---------|--------|------------------|--------|
| **Tarot card meanings** | 78 × 10 = 780 entries | Once (rarely edit) | Human-written ตั้งต้น → AI translate to TH |
| **Daily horoscope** | 12 signs × 365 = 4,380/yr | Daily automatic | **AI-gen + human review** (hybrid core) |
| **Compatibility advice** | generated per pair | On-demand (per check) | **AI-gen on demand** |
| **Monthly deep reading** | per sign × per month | Monthly | **Editor curated** |

### Principle

> **AI does volume, human protects voice & ethics**

---

## 2. Pipeline Architecture

```
┌─────────────────────────────────────────────────┐
│  Trigger                                        │
│   • Cron: 22:00 Bangkok (prep tomorrow)         │
│   • Admin manual: "Regenerate for 2026-05-01"   │
│   • On-demand: user requests                    │
└────────────────────┬────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────┐
│  Prompt Builder                                 │
│   • Fetch astrology context (Swiss Ephemeris)   │
│   • Get brand voice template                    │
│   • Apply safety guardrails                     │
└────────────────────┬────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────┐
│  LLM Call (with fallback)                       │
│   Primary:  OpenAI GPT-4o                       │
│   Fallback: Anthropic Claude 3.5 Sonnet         │
│   • Structured output (JSON schema)             │
│   • Temperature 0.7                             │
└────────────────────┬────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────┐
│  Safety Filter                                  │
│   • Check banned words (ขู่, ตาย, หายนะ, ...)    │
│   • Check sensitive topics (health, death)      │
│   • Check factual accuracy (numerology calc)    │
└────────────────────┬────────────────────────────┘
                     │
              ┌──────┴──────┐
              │             │
        ┌─────▼─────┐  ┌────▼──────┐
        │  Passed   │  │   Flag    │
        │   Safe    │  │  for human│
        └─────┬─────┘  └─────┬─────┘
              │              │
              ▼              ▼
┌─────────────────────┐ ┌──────────────────┐
│ status: PUBLISHED   │ │ status: REVIEW   │
│ (auto-publish)      │ │ (manual approve) │
└─────────┬───────────┘ └────────┬─────────┘
          │                      │
          └──────────┬───────────┘
                     ▼
┌─────────────────────────────────────────────────┐
│  Database: DailyHoroscope / Reading / etc       │
└─────────────────────────────────────────────────┘
```

---

## 3. LLM Prompt Templates

### 3.1 System Prompt (global for all content)

```
คุณคือนักเขียน content สำหรับ DaoJai แอปดูดวงสำหรับคน Gen Z ไทย

แบรนด์ DaoJai:
- Tone: อบอุ่น, กระตือรือร้น, ไม่จริงจังเกินไป, เหมือนเพื่อนสนิทให้คำแนะนำ
- Voice: ใช้คำไทยที่คน Gen Z (18-30) พูดจริง ไม่ใช่ศัพท์โหรเก่า
- Mission: ทำให้ผู้อ่านรู้สึก seen และมีพลัง ไม่ใช่กลัวหรือยอมแพ้

หลักสำคัญ:
1. ห้ามทำนายความตาย, โรคร้ายแรง, การตั้งครรภ์
2. ห้ามใช้คำขู่ (หายนะ, ซวยหนัก, ดวงดับ, ตาย)
3. ห้ามสัญญาผลลัพธ์เด็ดขาด ("จะรวยแน่", "จะเจอเนื้อคู่แน่")
4. ใช้คำที่อ่อนโยน: "อาจจะ", "มีโอกาส", "ลอง", "ข้อสังเกต"
5. ให้คำแนะนำ actionable เสมอ (ไม่ใช่แค่บรรยาย)
6. หลีกเลี่ยงการ generate สิ่งที่ต้องการผู้เชี่ยวชาญจริง (การแพทย์, กฎหมาย, การเงินเจาะจง)

Output: JSON ตาม schema ที่ระบุ ใช้ภาษาไทยเสมอ
```

### 3.2 Daily Horoscope Prompt

```
ข้อมูลวันที่ทำนาย:
- วันที่: {date}
- ราศี (Western): {sign}
- ดาวเคราะห์:
  - Sun: {sun_position}
  - Moon: {moon_sign} (transits {duration})
  - Mercury: {mercury_position}, {is_retrograde ? "retrograde" : "direct"}
  - Venus: {venus_position}
  - Mars: {mars_position}
- Aspects สำคัญวันนี้: {major_aspects}

Context เพิ่ม (สำหรับ flavor):
- Day of week: {day_of_week}
- Moon phase: {moon_phase}
- Special events: {special_astro_events}

สร้างดวงรายวันตาม JSON schema ต่อไปนี้ (ภาษาไทย):

{
  "overview": "สรุปพลังงานวันนี้ 2-3 ประโยค ≤80 คำ",
  "categories": {
    "love": { "score": 1-5, "text": "เรื่องความรัก/ความสัมพันธ์ 30-50 คำ" },
    "career": { "score": 1-5, "text": "เรื่องการงาน 30-50 คำ" },
    "money": { "score": 1-5, "text": "เรื่องการเงิน 30-50 คำ" },
    "health": { "score": 1-5, "text": "เรื่องสุขภาพกาย-ใจ 30-50 คำ" },
    "luck": { "score": 1-5, "text": "เรื่องโชคลาภ 30-50 คำ" }
  },
  "lucky": {
    "color": "ชื่อสีไทย",
    "number": 1-9,
    "direction": "ทิศใดทิศหนึ่งใน 8 ทิศ",
    "time": "HH:MM-HH:MM" (optional)
  },
  "avoid": "สิ่งที่ควรเลี่ยงวันนี้ 1 ประโยค ≤30 คำ",
  "advice": "คำแนะนำ main 1-2 ประโยค ≤50 คำ",
  "mantra": "คาถาหรือ affirmation 1 ประโยคสวยๆ"
}

ตัวอย่าง love text ที่ดี:
"วันนี้มีโอกาสเจอคนที่อยู่ในสายตามานาน อย่ากดดันให้ต้องเกิดอะไรทันที ค่อยๆ คุยไป ฟังให้เยอะ"

ตัวอย่าง career text ที่ดี:
"มีโปรเจกต์ใหม่ที่คนอาจขอความเห็น ข้อสังเกตคือ อย่าบอกทุกอย่างในวันเดียว เก็บ idea ดีไว้ timing ถูก"

ห้าม:
- "ระวัง! ดวงคุณจะ..."
- "คุณจะเจอเนื้อคู่แน่ๆ"
- "งานจะพังถ้าไม่ระวัง"
```

### 3.3 Tarot Card Interpretation Prompt (per-card stub)

```
คุณต้องเขียนคำอธิบายไพ่ Tarot: {card_name_en} / {card_name_th}
({arcana}{suit}{number}, Rider-Waite-Smith)

ทิศทาง: {upright | reversed}

Keywords มาตรฐาน:
- Upright: {keywords_up}
- Reversed: {keywords_rev}

สร้าง JSON:
{
  "general": "คำอธิบายทั่วไป 80-120 คำ (ไทย Gen Z)",
  "love": "ด้านความรัก 60-80 คำ",
  "career": "ด้านงาน 60-80 คำ",
  "money": "ด้านเงิน 40-60 คำ",
  "health": "ด้านสุขภาพ 40-60 คำ (ห้ามวินิจฉัยโรค)"
}

Tone ตัวอย่าง:
"The Fool ตอนนี้คุณกำลังยืนที่ปลายหน้าผา แต่ไม่ใช่เพื่อตก — มันคือการกระโดดแบบตั้งใจ ไม่รู้จุดหมายชัด แต่รู้ว่าต้องไป"
```

### 3.4 Compatibility Narrative Prompt

```
ข้อมูลคู่:
- A: {nameA} - {sunA} {thaiDayA} {animalA} Life Path {lifeA}
- B: {nameB} - {sunB} {thaiDayB} {animalB} Life Path {lifeB}
- ความสัมพันธ์: {relationshipType}

คะแนนที่คำนวณแล้ว:
- Overall: {overall}/100, tier: {tier}
- Breakdown: {breakdown_json}
- Dimensions: {dimensions_json}

สร้าง JSON:
{
  "advice": "คำแนะนำสำหรับคู่นี้ 150-250 คำ ไทย Gen Z",
  "greenFlags": ["จุดแข็ง 3-5 ข้อ"],
  "redFlags": ["จุดที่ต้องระวัง 2-4 ข้อ"]
}

หลัก:
- ห้ามบอกว่า "คู่นี้ต้องเลิก"
- ห้ามบอกว่า "ต้องแต่งแน่"
- บอกทั้งจุดที่ดี + ข้อสังเกต อย่างสมดุล
- ใช้ชื่อคน แทนคำว่า "ผู้ชาย/ผู้หญิง"
- ใช้คำ positive framing เช่น "ต้องคุยกันให้ชัด" แทน "ชอบทะเลาะ"

ตัวอย่าง greenFlag:
"มินกับต่ายคิดเรื่องเป้าหมายชีวิตคล้ายกัน เวลาวางแผนเที่ยว/เงิน จะเห็นพ้องเร็ว"

ตัวอย่าง redFlag:
"เวลามีเรื่องเครียด ต่ายอาจเงียบ ส่วนมินอยากพูดเคลียร์ — ต้องตกลงวิธีสื่อสารตอนอารมณ์ลง"
```

---

## 4. Structured Output (JSON Schema)

ใช้ **OpenAI structured output** (JSON schema mode) หรือ **Anthropic tool-use** เพื่อให้ output parse ได้เสมอ

```typescript
// packages/content/schemas.ts
import { z } from 'zod';

export const DailyHoroscopeSchema = z.object({
  overview: z.string().min(20).max(300),
  categories: z.object({
    love: z.object({ score: z.number().min(1).max(5), text: z.string().min(30).max(300) }),
    career: z.object({ score: z.number().min(1).max(5), text: z.string().min(30).max(300) }),
    money: z.object({ score: z.number().min(1).max(5), text: z.string().min(30).max(300) }),
    health: z.object({ score: z.number().min(1).max(5), text: z.string().min(30).max(300) }),
    luck: z.object({ score: z.number().min(1).max(5), text: z.string().min(30).max(300) }),
  }),
  lucky: z.object({
    color: z.string(),
    number: z.number().min(1).max(99),
    direction: z.string(),
    time: z.string().optional(),
  }),
  avoid: z.string().optional(),
  advice: z.string().min(10).max(300),
  mantra: z.string().optional(),
});

export type DailyHoroscopeSchemaT = z.infer<typeof DailyHoroscopeSchema>;
```

---

## 5. LLM Client Code

```typescript
// packages/content/llm.ts
import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import { DailyHoroscopeSchema } from './schemas';
import { zodToJsonSchema } from 'zod-to-json-schema';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function generateDailyHoroscope(input: HoroscopeInput) {
  const prompt = buildPrompt(input);

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-2024-08-06',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: prompt },
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'daily_horoscope',
          strict: true,
          schema: zodToJsonSchema(DailyHoroscopeSchema),
        },
      },
      temperature: 0.7,
    });
    const raw = completion.choices[0].message.content!;
    return DailyHoroscopeSchema.parse(JSON.parse(raw));
  } catch (error) {
    console.warn('OpenAI failed, falling back to Claude', error);
    return generateWithClaude(input);
  }
}

async function generateWithClaude(input: HoroscopeInput) {
  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 2000,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: buildPrompt(input) }],
  });
  const text = response.content[0].type === 'text' ? response.content[0].text : '';
  const json = extractJson(text);
  return DailyHoroscopeSchema.parse(json);
}
```

---

## 6. Safety Filter

```typescript
// packages/content/safety.ts

const BANNED_PATTERNS = [
  /ตาย(ที่|ก่อน|แน่|เร็ว)/,
  /ฆ่าตัว/,
  /หายนะ/,
  /ดวงดับ/,
  /มะเร็ง/,
  /(เลิก|หย่า)กันแน่/,
  /ตั้งครรภ์/,
  /^ระวัง!\s/,
];

const SENSITIVE_TOPICS = [
  'กินยา', 'ลงทุนหุ้น', 'โรคหัวใจ', 'โรคจิต',
];

export function checkSafety(content: string): { safe: boolean; flags: string[] } {
  const flags: string[] = [];

  for (const pattern of BANNED_PATTERNS) {
    if (pattern.test(content)) {
      flags.push(`banned:${pattern.source}`);
    }
  }

  for (const topic of SENSITIVE_TOPICS) {
    if (content.includes(topic)) {
      flags.push(`sensitive:${topic}`);
    }
  }

  // Additional: PII leak check
  if (/\d{13}/.test(content)) flags.push('pii:id_number');
  if (/0\d{9}/.test(content)) flags.push('pii:phone');

  return { safe: flags.length === 0, flags };
}
```

---

## 7. Cost Management

### 7.1 Token estimate

**Daily horoscope** (all 12 signs):
- Input: ~500 tokens × 12 = 6,000 tokens
- Output: ~800 tokens × 12 = 9,600 tokens
- Total: ~15,600 tokens/day

**Cost per day** (GPT-4o):
- Input: 6,000 × $2.50 / 1M = $0.015
- Output: 9,600 × $10 / 1M = $0.096
- **~$0.11/day = ~฿4/day = ~฿1,460/year**

**Compatibility narrative**:
- ~2,000 tokens in+out per check
- At 10K checks/month: 20M tokens = ~฿2,500/month

### 7.2 Cost reduction tactics

- **Cache generated content** — daily horoscope ทำครั้งเดียว/วัน
- **Batch generation** — ทำทีเดียว 12 signs แทน 12 calls
- **Use smaller model** เมื่อเหมาะ — gpt-4o-mini สำหรับ short copy
- **Prompt caching** (Anthropic) — system prompt cache 90% cost reduction
- **Self-host fallback** — ทดลอง Llama 3 ผ่าน Groq/Together AI สำหรับ non-critical

---

## 8. Content Admin Panel (Phase 2)

`apps/admin` — CMS dashboard สำหรับ editor:

### 8.1 Features

- **Queue view**: pending review items (status=REVIEW)
- **Calendar view**: upcoming dates + content readiness
- **Preview**: ดูก่อน publish
- **Edit inline**: Monaco editor + markdown
- **Bulk actions**: regenerate, publish all, archive
- **Metrics**: read count, feedback ratio per content

### 8.2 Workflow

```
Scheduled Job (22:00)
   ↓
Generate content for tomorrow
   ↓
Auto-safety check
   ├─ Pass → status=PUBLISHED → live next day 00:00
   └─ Flag → status=REVIEW → Slack/email notify editor
                 ↓
              Editor opens admin, reviews, edits, approves
                 ↓
              status=PUBLISHED
```

### 8.3 Editor roles

- **Editor-in-chief**: approve all, brand voice keeper
- **Editor**: review flagged, edit drafts
- **Intern**: spot-check only, cannot publish

---

## 9. Content Versioning

เก็บ version ของ content:

```typescript
model DailyHoroscopeVersion {
  id            String   @id @default(cuid())
  horoscopeId   String
  horoscope     DailyHoroscope @relation(fields: [horoscopeId], references: [id])
  content       Json
  editedBy      String?
  editedAt      DateTime @default(now())
  note          String?
}
```

→ สามารถ rollback ได้ + ดูประวัติ edit

---

## 10. Brand Voice Guidelines

### 10.1 Do

✅ ใช้คำอ่อนโยน: "ลอง", "อาจจะ", "มีโอกาส"
✅ บอกคำแนะนำ actionable: "ก่อนตอบ reply ให้หายใจ 3 ครั้ง"
✅ ใช้ emoji 1-2 ตัวต่อย่อหน้า (ไม่ใส่ทุกประโยค)
✅ เล่าเป็น narrative: "วันนี้คุณจะรู้สึกว่า..."
✅ ตัวอย่างรูปธรรม: "เช่น เวลาคุยกับเจ้านาย"

### 10.2 Don't

❌ คำขู่: "ระวัง!", "หายนะ", "ซวยหนัก"
❌ คำโหรจริงจัง: "ดวงพิฆาต", "กาลกิณีเข้าครอบ"
❌ สัญญาผลลัพธ์: "จะรวยแน่", "จะเจอเนื้อคู่ปีนี้"
❌ คำ dated: "ท่าน", "นายน้อย" (ยกเว้นตั้งใจล้อเล่น)
❌ ศัพท์อังกฤษ random: "Universe will conspire..." (ยกเว้นมีเหตุผล)

### 10.3 Reference voice samples

**Good example** (daily love):
> "วันนี้คนที่คุยอยู่อาจตอบช้า ไม่ใช่เพราะหายเฉยๆ แต่ของเค้าเองก็มีเรื่องวุ่น ลอง DM ไปแบบไม่กดดัน เช่น ส่งเพลงดีๆ ไปให้"

**Bad example**:
> "ระวัง! ดวงความรักสัปดาห์นี้แย่มาก ถ้าไม่ระวังอาจจะเลิกกัน ต้องทำบุญด่วน"

---

## 11. Human Review SLA

| Priority | SLA |
|----------|-----|
| Daily horoscope flagged | 4 ชม (ก่อน 04:00 publish) |
| Compatibility flagged | 24 ชม |
| Monthly reading | 3 วันก่อน publish |
| User-reported content | 24 ชม |

---

## 12. Metrics & Monitoring

Track per-content:

- `content.generated` { type, signs, sessionId, durationMs, tokensIn, tokensOut }
- `content.flagged` { type, flags, sessionId }
- `content.published` { type, id, reviewedBy? }
- `content.feedback` { type, id, accurate|inaccurate|neutral, userId }
- `content.llm_fallback` { from: 'openai', to: 'claude', reason }

**Dashboard**:
- Accuracy rate (positive feedback / total)
- Flag rate (flagged / total)
- Cost/day
- Generation latency p50/p95

---

## 13. Disaster Recovery

- **LLM down**: fallback chain (GPT-4o → Claude → cached generic content)
- **Content generation fails**: serve yesterday's content + notify editor
- **Banned content passes filter**: user report → immediate remove → root cause analysis

---

_Last updated: 2026-04-17_ — Next: [06-mascot-and-brand.md](./06-mascot-and-brand.md)
