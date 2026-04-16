# 06 — Monetization

> Research deep-dive วิเคราะห์โมเดลทำเงินของแอป/เว็บดูดวง + กลยุทธ์แนะนำสำหรับ DaoJai

---

## 1. ภาพรวมตลาด

### 1.1 ขนาดตลาด

- **Global astrology market**: ~$12-15B (2024, รวม offline+online)
  - Source: Allied Market Research, Grand View Research
- **Fortune-telling app market**: ~$3-4B (2024)
- **Thailand**: ยังไม่มีรายงาน official แต่ประเมิน ~2,000-5,000 ล้านบาท/ปี (รวม offline)

### 1.2 แนวโน้ม (2024-2026)

- 📈 AI + astrology = trend แรงสุด (ChatGPT-based readings)
- 📈 Gen Z ใช้เงินกับสายมูมากกว่า Gen ก่อน 2x (Nielsen 2023)
- 📈 Subscription model โตเร็วกว่า ads/one-time purchase
- 📉 Pure ads-supported model กำไรต่ำ

---

## 2. Monetization Models (ภาพรวม 10 แบบ)

### 2.1 Freemium Subscription ⭐⭐⭐⭐⭐

**Model**: ใช้ฟรีได้พื้นฐาน, จ่ายเพื่อ unlock feature ลึกขึ้น

**ตัวอย่าง**:
- **Co-Star**: Free = Sun sign daily, Premium $4.99/mo = full chart + unlimited compatibility
- **The Pattern**: Free = basic, Premium $9.99/mo = long-form readings + 1-on-1
- **Moonly**: Free = limited, Premium $39.99/yr

**ข้อดี**:
- Recurring revenue มั่นคง
- Predictable LTV
- Upsell path ชัดเจน

**ข้อเสีย**:
- Conversion rate ต่ำ (1-5% เป็น average)
- ต้องมี premium content ที่น่าจ่ายเงิน

**DaoJai fit**: ★★★★★

**Pricing แนะนำ**:
- Free tier: ดวงรายวัน, ไพ่วันละ 1 ใบ, เช็คสมพงษ์วันละ 1 คู่
- DaoJai **Shine** (Premium): ฿99/เดือน หรือ ฿890/ปี
  - Unlimited tarot + spreads
  - Deep monthly reading
  - Natal chart เต็ม
  - Journal history
  - Ad-free

### 2.2 In-App Purchase (IAP) ⭐⭐⭐⭐

**Model**: ขายเป็นครั้งๆ — เปิดดูเนื้อหาเฉพาะเจาะจง

**ตัวอย่าง**:
- **Sanook Horoscope**: จ่าย ฿59 ดูดวงรายละเอียด
- **Ganeshaspeaks**: ซื้อ "Career Report" ฿199-฿499

**ข้อดี**:
- ไม่ต้อง commit รายเดือน — user ลองง่าย
- Conversion สูงกว่า subscription (~10-15%)
- ROI ต่อ report สูง

**ข้อเสีย**:
- LTV ไม่คงที่
- ต้องออก content ใหม่เรื่อยๆ

**DaoJai fit**: ★★★★ — ใช้เสริม subscription

**ตัวอย่าง IAP**:
- "รายงานรายปี 2026" ฿99
- "วิเคราะห์ความสัมพันธ์เจาะลึก" ฿149
- "ดูดวงย้อนหลังเมื่อ 5 ปีก่อน" ฿59

### 2.3 Human Reader Marketplace ⭐⭐⭐⭐

**Model**: แพลตฟอร์มจับคู่ user กับหมอดูจริง

**ตัวอย่าง**:
- **Sanctuary**: chat reading $5-$10/นาที (แชร์ 70/30 กับหมอดู)
- **Purple Garden**: voice/chat/video reading
- **TikTok Live Tarot**: ส่ง gift ระหว่างหมอดู live อ่านไพ่

**ข้อดี**:
- Revenue ต่อ session สูง (~฿300-฿1,500/reading)
- Brand trust เพิ่ม (มี expert จริง)
- Supply-side easier to scale than content

**ข้อเสีย**:
- Operational หนัก (KYC, quality control, dispute)
- Take rate ต่ำ (20-30%) → หลังหัก
- ต้องมี reader มากพอจะ match demand

**DaoJai fit**: ★★★ (Phase 3)

**แนวทาง**:
- Partner กับหมอดูที่มี following ใน TikTok/IG แล้ว
- ไม่ต้อง KYC แบบ banking — เริ่มจาก invite-only
- Price range ฿200-฿800/30-นาที

### 2.4 Advertising (Display + Native) ⭐⭐

**Model**: แสดง ad Google AdSense, affiliate, native content

**ตัวอย่าง**: Sanook, Kapook, Horoworld

**ข้อดี**:
- ไม่ต้องขอเงินจาก user
- Passive revenue

**ข้อเสีย**:
- RPM ต่ำ (Thai market ~฿30-฿60 per 1000 impressions)
- UX พังถ้าใส่เยอะ
- Ad blockers เยอะขึ้น
- Thai ad network ราคา dump

**DaoJai fit**: ★★ — ไม่แนะนำในช่วงแรก
- ถ้ามี จะใส่เฉพาะ free tier
- No ads ใน reading screen (UX sacred!)

### 2.5 Affiliate Commerce (ของมงคล) ⭐⭐⭐⭐

**Model**: แนะนำสินค้ามงคล → affiliate link ไปขาย

**ตัวอย่าง**:
- **Astrology.com**: แนะนำหินมงคล → Amazon affiliate
- ไทย: หมอดูขายของมงคลผ่าน LINE

**ข้อดี**:
- Margin สูง (30-50% on gemstones/crystals)
- User อยากได้ของมงคลอยู่แล้ว
- สินค้าไม่ต้อง stock เอง

**ข้อเสีย**:
- ต้องหา supplier คุณภาพ
- Return rate ต้องจัดการ

**DaoJai fit**: ★★★★ (Phase 2-3)

**ตัวอย่าง**:
- ตามวันเกิด → แนะนำหินมงคล (ราหูต้องมีมูนสโตน ฯลฯ)
- ตามราศี → สร้อย, ต้นไม้, น้ำหอม
- Partner กับแบรนด์: shops.line.me, Shopee, Lazada affiliate

### 2.6 Sponsorship / Branded Content ⭐⭐⭐

**Model**: แบรนด์จ่ายให้ทำ content ธีมดวง

**ตัวอย่าง**:
- Co-Star × Glossier campaign "beauty based on your sign"
- Thai: Marvelous, Warrix ทำ content x หมอดู

**DaoJai fit**: ★★★ (หลัง audience หนา)

### 2.7 Premium Content Bundle ⭐⭐⭐

**Model**: ขาย "pack" ของ reading ครบชุด

**ตัวอย่าง**:
- ฿299 = ดวงปี + ดวงรัก + ดวงการเงิน (3 in 1)
- ฿599 = "Zodiac Encyclopedia" ebook + audio

**DaoJai fit**: ★★★ (Phase 2+)

### 2.8 Virtual Goods / Cosmetics ⭐⭐⭐

**Model**: ขายของตกแต่ง UI — สำรับไพ่พรีเมียม, theme, avatar

**ตัวอย่าง**:
- **Moonly**: ขาย "moon crystal pack" ตกแต่งแอป
- LINE stickers: หมอดู stickers ดัง

**DaoJai fit**: ★★★★ — **fits Gen Z**
- ขายสำรับไพ่ digital ธีมต่างๆ (Thai mythology, anime, watercolor)
- Theme profile card (aurora, vintage, minimal)
- Custom avatar / mascot

**Pricing**:
- ฿29-฿89 per deck/theme
- Bundle ฿199 unlock 5 themes

### 2.9 B2B / API Licensing ⭐⭐⭐

**Model**: ขาย API ดวงให้แบรนด์อื่น

**ตัวอย่าง**:
- **The Pattern**: license readings ไปแบรนด์ health
- Astrology API: ~$0.005/request on RapidAPI

**DaoJai fit**: ★★ (Phase 4+)

### 2.10 Membership / Community ⭐⭐⭐

**Model**: ขาย access เข้า community (Discord/Circle)

**ตัวอย่าง**:
- Sanctuary community: $9.99/mo + event
- Tarot Patreon: ฿200/mo = weekly live reading

**DaoJai fit**: ★★★ (Phase 3)

---

## 3. Pricing Psychology

### 3.1 Thai market benchmarks

| Category | Price range (THB) |
|---------|----|
| Single online tarot reading | ฿100-฿500 |
| Monthly subscription (spiritual app) | ฿59-฿299 |
| Yearly subscription | ฿590-฿2,990 |
| Deep report (one-time) | ฿199-฿999 |
| Live tarot reading (30 min) | ฿300-฿1,500 |

### 3.2 Price anchoring

ผู้ใช้ไทย Gen Z จุดตัดสินใจ:
- **< ฿100** → "ได้ ลอง"
- **฿100-฿300** → "คิดหน่อยแต่น่าลอง"
- **฿300-฿999** → "ต้องมั่นใจมาก"
- **> ฿1,000** → "ขอก่อนเช็คหลาย review"

### 3.3 Price experiments แนะนำ

- **Free trial 7 วัน** ดีกว่า freemium ล้วน (conversion 3x)
- **Discount ครั้งแรก** (50% off first month) — Gen Z คุ้นเคยจาก Netflix
- **Yearly saves 30%** framing ได้ผลมาก
- **Trial paywall** หน้าฟีเจอร์ premium — "ปลดล็อคเพื่อดู" CTA ชัดเจน

---

## 4. Revenue Forecast (แบบ conservative)

### 4.1 สมมุติฐาน (Year 1)

- Monthly Active Users (MAU): 50,000 ภายในปีที่ 1
- Free → Premium conversion: 3%
- Premium MRR: ฿99
- IAP attach rate: 5%, avg ฿150 per purchase
- Ads CPM: ฿50 / 1000 view

### 4.2 Projection (monthly, ปลายปีที่ 1)

| แหล่งรายได้ | สมมุติฐาน | MRR (THB) |
|------|------|------|
| Subscription | 50,000 × 3% × ฿99 | ฿148,500 |
| IAP | 50,000 × 5% × ฿150 | ฿375,000 |
| Ads (free tier 47,500 users × 3 views/day × 30 วัน × ฿50/1000) | | ฿213,750 |
| Affiliate (0.5% × 50,000 × ฿100 commission) | | ฿25,000 |
| **รวม MRR** | | **~฿762,250** |
| **ARR** | | **~฿9.1M** |

### 4.3 Path to ฿10M ARR

- **ทำได้** ถ้า MAU ถึง 50K + conversion 3-5% ในปีที่ 1
- ขึ้นกับ viral loop, content quality, SEO

### 4.4 Benchmark (compare)

- Co-Star: ~$20M ARR ที่ 5M MAU (global)
- Sanook Horoscope: คาดการณ์ ฿30-50M ARR (portal, ads-heavy)

---

## 5. Feature-to-Revenue Mapping

| Feature | Revenue model | Tier |
|---------|---|---|
| ดวงรายวัน | Ads (free) / Ad-free (premium) | Free + Premium |
| Tarot daily card | Free |
| Tarot 3-card | Free (1 ครั้ง/วัน) |
| Tarot Celtic Cross (10 ใบ) | Premium | Premium |
| ดวงวันเกิด (Basic) | Free | Free |
| Natal chart เต็ม | Premium | Premium |
| Compatibility (1 คู่/วัน) | Free | Free |
| Unlimited compatibility | Premium | Premium |
| Deep monthly reading | IAP ฿99 | IAP |
| Yearly forecast report | IAP ฿199 | IAP |
| Live reader consultation | Marketplace | Commission |
| Custom ไพ่ deck | Virtual goods | IAP |
| Journal & history | Premium | Premium |
| AI custom insight | Premium | Premium |
| หินมงคล recommendation | Affiliate | Commission |

---

## 6. กฎหมาย / Compliance (ไทย)

### 6.1 กฎหมายดวง

- ประเทศไทยไม่มีกฎหมายห้ามดูดวง
- การเก็บเงินค่าดูดวงไม่ผิด **ถ้าไม่ได้หลอกลวง**
- ถ้าหลอก claim ผลลัพธ์ที่ไม่มีจริง → เข้าข่ายฉ้อโกง (ประมวลกฎหมายอาญา มาตรา 341)

### 6.2 PDPA

- ต้องมี **privacy policy** ชัดเจน
- เก็บข้อมูล sensitive (วันเกิด, เวลา, สถานที่) = ต้องขอ consent
- ต้องมี DPO / contact ตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล

### 6.3 ภาษี (รายได้)

- Subscription = ภาษีมูลค่าเพิ่ม 7%
- ถ้า revenue > ฿1.8M/ปี = ต้องจด VAT
- Revenue ต่างประเทศ (Apple/Google Play) ยังมี withhold tax ต้นทาง

### 6.4 Payment gateways (TH)

| Gateway | Fee | หมายเหตุ |
|---------|-----|---------|
| **Omise** | 3.65% + ฿10 per transaction | ไทย native, ดีสุด |
| **Stripe** | 3.65% + ฿10 | Global, ต้องมี account |
| **2C2P** | 3-5% | Legacy, ยังใช้กันเยอะ |
| **TrueMoney Wallet** | 2-3% | popular in TH |
| **PromptPay** | 0% (direct transfer) | low-cost option |
| **Apple IAP** | 30% (15% ถ้า Small Business) | iOS only |
| **Google Play Billing** | 15% | Android only |

### 6.5 App store fees

- Apple: 30% (15% SBP), 15% หลังปีแรก subscription
- Google Play: same as Apple
- **Web payment**: ไม่เสีย (ใช้ Omise/Stripe 3.65%)

→ Strategy: Web-first → paywall ใน web แทน mobile (save 20%+ margin)

---

## 7. Churn & Retention

### 7.1 Churn rate benchmark

- Industry average monthly churn: 5-8%
- Co-Star-like: ~3-5%
- Fortune-teller apps high churn (seasonal)

### 7.2 Retention tactics

1. **Daily push ที่มี value** — "ดวงคุณพร้อมแล้ว"
2. **Streak & badge** — gamification retention +30%
3. **Personalized monthly summary** — email/LINE
4. **Re-engagement**: user ไม่เข้า 3 วัน → ส่ง "เดาใจคิดถึงคุณ ✨"
5. **Annual membership lock** — yearly มี discount → lower churn

---

## 8. Growth / Acquisition

### 8.1 Channel ROI (estimated for TH)

| Channel | CAC (THB) | Quality | หมายเหตุ |
|---------|-----|-----|-----|
| TikTok organic | ~฿5-฿20 | High | if viral |
| TikTok ads | ฿20-฿50 | Medium | scalable |
| IG Reels | ฿15-฿40 | High | Gen Z native |
| Facebook ads | ฿40-฿80 | Medium-low | เริ่มเบา |
| Google Ads | ฿30-฿100 | High intent | SEO competitor |
| LINE OA broadcast | ฿0.30/message | Medium | after base exists |
| Influencer (micro) | ฿3,000-฿10,000/post | Very High | แนะนำจริง |
| Influencer (mega) | ฿50,000+/post | Variable | brand push |

### 8.2 SEO opportunity

TH keyword ดวง traffic (ประเมิน):

| Keyword | Monthly search (TH) |
|---------|-----|
| "ดวงวันนี้" | 1M+ |
| "ดูดวง" | 800K+ |
| "ดวงรายวัน" | 300K+ |
| "ไพ่ยิปซี" | 150K+ |
| "ดวงสมพงษ์" | 100K+ |
| "ดวงตามวันเกิด" | 80K+ |

→ SEO ไทยยังไม่ saturated เหมือน EN
→ DaoJai blog + content hub = ช่อง traffic หลัก

---

## 9. Thailand-specific Growth Tactics

### 9.1 TikTok first

- **Format hits**: "เปิดไพ่ให้แฟน" 15-30 วิ, "ดวงตามวันเกิด challenge"
- **Hashtag**: #ดวงวันนี้ #หมอดู #ไพ่ยิปซี
- **UGC loop**: ให้ user export share-card → แนบ link bio

### 9.2 LINE OA + LIFF app

- LINE OA broadcast daily horoscope
- LIFF app = run DaoJai ใน LINE (no download)
- Cross-subscribe LINE Notify = ดวงส่งเข้า LINE

### 9.3 Partner กับ mega spiritual IG/TikTok

- Revenue share หรือ affiliate ให้ content creator
- Whitelabel partnership = creator มีแอปเป็นของตัวเอง

### 9.4 Sanook/Kapook partnership (content syndication)

- DaoJai content ลง portal → backlink SEO
- Portal get content ฟรี, DaoJai get distribution

---

## 10. Reference

### Industry reports

- **Allied Market Research — Astrology Market** — https://www.alliedmarketresearch.com/
- **Grand View Research — Horoscope Apps** — https://www.grandviewresearch.com/
- **Sensor Tower — Lifestyle App Revenue** — https://sensortower.com/
- **App Annie / data.ai** — mobile app benchmarks

### Thai specific

- **Kepios Digital 2026 Thailand** — https://datareportal.com/reports/digital-2026-thailand
- **LINE for Business Thailand** — https://linebiz.com/th/
- **Ookbee, Meb, Joylada reports** — digital content ไทย benchmarks

### Pricing & SaaS metrics

- **First Round — SaaS Pricing Guide** — https://review.firstround.com/
- **OpenView — SaaS Benchmarks** — https://openviewpartners.com/saas-benchmarks/
- **ProfitWell / Paddle** — https://www.paddle.com/

### Payment & compliance (TH)

- **PDPA ประเทศไทย** — https://www.mdes.go.th/law/detail/pdpa
- **Omise Docs** — https://www.omise.co/docs
- **Stripe Thailand** — https://stripe.com/th
- **Thai Revenue Department** — https://www.rd.go.th/

### Case studies / articles

- Co-Star Series A raise: $5M — TechCrunch 2019
- Sanctuary Series A: $5M — TechCrunch 2020
- Ganeshaspeaks revenue model — Inc42 India coverage

### Legal TH

- ประมวลกฎหมายอาญา มาตรา 341 (ฉ้อโกง)
- พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562
- พ.ร.บ. ว่าด้วยการกระทำความผิดเกี่ยวกับคอมพิวเตอร์ พ.ศ. 2550

---

## 11. ข้อสรุปสำหรับ DaoJai (Monetization Strategy)

### ✅ Phase 1 (MVP, 0-6 เดือน) — Focus on growth

- **Free tier** หลัก — daily horoscope, tarot 1 ใบ/วัน, sompong 1 คู่/วัน
- **ไม่มี ads** (save UX)
- **ไม่มี premium** ช่วงแรก
- **KPI**: MAU, retention

### ✅ Phase 2 (6-12 เดือน) — Introduce revenue

- เปิด **DaoJai Shine** (Premium) ฿99/mo, ฿890/yr
  - Unlimited tarot spreads
  - Natal chart เต็ม
  - Journal + history
  - Ad-free (ถ้าตอนนั้นใส่ ads free tier)
- **IAP**: Monthly deep reading ฿99, Yearly forecast ฿199
- **Virtual goods**: Tarot deck theme ฿29-฿99
- Target: 2-3% conversion = ฿100K+ MRR

### ✅ Phase 3 (12-24 เดือน) — Scale

- **Marketplace** — live reader (take rate 25%)
- **Affiliate commerce** — หินมงคล, ของมงคล (margin 20-40%)
- **B2B sponsorship** — แบรนด์ยินดีจ่าย branded content
- **Possibly**: Ads บน free tier (careful UX)

### 🎯 Revenue mix target (Year 2)

```
Subscription       40%   ← recurring, predictable
IAP (reports)      25%   ← high margin
Virtual goods      10%   ← Gen Z love
Affiliate          15%   ← passive
Marketplace        7%    ← growing
Ads                3%    ← low impact
```

### 💡 Key principle

> **"User trust ก่อน revenue"** — ช่วงแรกอย่าเร่งเก็บเงิน ให้สร้าง product ที่ user รักและ recommend ก่อน เพราะดวงเป็น market ที่พึ่ง word-of-mouth ที่สุดในบรรดา consumer app

---

_Last updated: 2026-04-17_ — ไฟล์ต่อไป: [00-index.md](./00-index.md)
