import { useState, useEffect, type CSSProperties } from "react";
import {
  getWesternZodiacSign,
  WESTERN_ELEMENT_NAMES_TH,
  type WesternZodiacResult,
} from "@/lib/astrology/zodiac";
import {
  calculateTaksaFromBirthDate,
  type TaksaResult,
} from "@/lib/astrology/taksa";
import {
  calculateLifePathNumber,
  getLifePathMeaning,
  isMasterNumber,
  type LifePathMeaning,
  type LifePathNumber,
} from "@/lib/astrology/numerology";
import {
  getThaiDayFortune,
  type ThaiDayFortune,
} from "@/lib/astrology/thai-day";
import {
  getChineseZodiac,
  type ChineseZodiacProfile,
} from "@/lib/astrology/chinese-zodiac";
import { formatThaiDate, getDateParts } from "@/lib/utils/date";

// ─── Constants ───

const STORAGE_KEY = "daojai-birthday";
const STORAGE_NAME_KEY = "daojai-name";

const TAB_KEYS = ["zodiac", "taksa", "lifepath", "thaiday"] as const;
type TabKey = (typeof TAB_KEYS)[number];

const TAB_LABELS: Record<TabKey, { label: string; icon: string }> = {
  zodiac: { label: "ราศี", icon: "♈" },
  taksa: { label: "ทักษา", icon: "☉" },
  lifepath: { label: "เลขชีวิต", icon: "#" },
  thaiday: { label: "วันเกิด", icon: "🗓" },
};

const ELEMENT_EMOJI: Record<string, string> = {
  fire: "🔥",
  earth: "🌍",
  air: "💨",
  water: "🌊",
};

const MODALITY_TH: Record<string, string> = {
  cardinal: "ราศีจร (Cardinal)",
  fixed: "ราศีสถิร (Fixed)",
  mutable: "ราศีทวิภาค (Mutable)",
};

const ZODIAC_DESCRIPTIONS: Record<string, string> = {
  aries: "กล้าบุกเบิก มีพลังเริ่มต้น ชอบเป็นคนแรกที่ลงมือทำ",
  taurus: "มั่นคง รักความสบาย มีรสนิยมดี และอดทนเป็นเลิศ",
  gemini: "หัวไว ช่างพูด ปรับตัวเก่ง สนใจหลายเรื่องพร้อมกัน",
  cancer: "อ่อนโยน ดูแลคนเก่ง ผูกพันกับบ้านและครอบครัว",
  leo: "มีออร่า รักศักดิ์ศรี ใจกว้าง และชอบเป็นจุดสนใจ",
  virgo: "ละเอียด วิเคราะห์เก่ง ชอบช่วยเหลือ และมีระเบียบ",
  libra: "รักความสมดุล มีเสน่ห์ ชอบความยุติธรรม และเข้าสังคมเก่ง",
  scorpio: "ลึกซึ้ง เข้มข้น มีสัญชาตญาณแรง และจริงจังกับทุกอย่าง",
  sagittarius: "รักอิสระ มองโลกกว้าง ชอบผจญภัย และมีอารมณ์ขัน",
  capricorn: "ทะเยอทะยาน มีวินัย วางแผนเก่ง และมุ่งมั่นสู่เป้าหมาย",
  aquarius: "คิดนอกกรอบ รักอิสระ มีจิตสาธารณะ และไม่ชอบตามใคร",
  pisces: "จินตนาการสูง เห็นอกเห็นใจ อ่อนไหว และมีโลกภายในที่ลึก",
};

// ─── Types ───

interface ProfileData {
  dateStr: string;
  zodiac: WesternZodiacResult;
  taksa: TaksaResult;
  lifePathNumber: LifePathNumber;
  lifePathMeaning: LifePathMeaning;
  thaiDay: ThaiDayFortune;
  chineseZodiac: ChineseZodiacProfile;
  thaiDateFormatted: string;
}

// ─── Main Component ───

export default function BirthProfile() {
  const [name, setName] = useState("");
  const [dateStr, setDateStr] = useState("");
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>("zodiac");
  const [transitioning, setTransitioning] = useState(false);

  // Load saved data from localStorage
  useEffect(() => {
    try {
      const savedDate = localStorage.getItem(STORAGE_KEY);
      const savedName = localStorage.getItem(STORAGE_NAME_KEY);
      if (savedName) setName(savedName);
      if (savedDate) {
        setDateStr(savedDate);
        computeProfile(savedDate);
      }
    } catch {
      // localStorage unavailable
    }
  }, []);

  function computeProfile(date: string) {
    try {
      const zodiac = getWesternZodiacSign(date);
      const taksa = calculateTaksaFromBirthDate(date);
      const lpn = calculateLifePathNumber(date);
      const lpm = getLifePathMeaning(lpn);
      const thaiDay = getThaiDayFortune(date);
      const chineseZodiac = getChineseZodiac(date);
      const thaiDateFormatted = formatThaiDate(date);

      setProfile({
        dateStr: date,
        zodiac,
        taksa,
        lifePathNumber: lpn,
        lifePathMeaning: lpm,
        thaiDay,
        chineseZodiac,
        thaiDateFormatted,
      });
    } catch {
      setProfile(null);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!dateStr) return;
    try {
      localStorage.setItem(STORAGE_KEY, dateStr);
      if (name.trim()) localStorage.setItem(STORAGE_NAME_KEY, name.trim());
    } catch {
      // localStorage unavailable
    }
    computeProfile(dateStr);
  }

  function handleReset() {
    setProfile(null);
    setActiveTab("zodiac");
  }

  function switchTab(tab: TabKey) {
    if (tab === activeTab) return;
    setTransitioning(true);
    setTimeout(() => {
      setActiveTab(tab);
      setTransitioning(false);
    }, 150);
  }

  // ─── Form State ───
  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] animate-[fade-in-up_0.6s_ease-out_both]">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-5xl mb-4 animate-[float_4s_ease-in-out_infinite]">
              🌟
            </div>
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-accent-gold mb-2">
              แผนที่ดาวของคุณ
            </h1>
            <p className="text-text-muted text-sm">
              ใส่วันเกิดเพื่อดูดวงส่วนตัว
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="birth-name"
                className="block text-sm font-medium text-lavender-300 mb-1.5"
              >
                ชื่อของคุณ{" "}
                <span className="text-text-muted text-xs">(ไม่บังคับ)</span>
              </label>
              <input
                id="birth-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="เช่น มิว"
                className="w-full px-4 py-3 rounded-xl bg-surface-indigo/60 border border-lavender-500/20 text-text-on-dark placeholder:text-text-muted/50 focus:outline-none focus:border-accent-gold/50 focus:ring-1 focus:ring-accent-gold/30 transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="birth-date"
                className="block text-sm font-medium text-lavender-300 mb-1.5"
              >
                วันเกิดของคุณ
              </label>
              <input
                id="birth-date"
                type="date"
                value={dateStr}
                onChange={(e) => setDateStr(e.target.value)}
                required
                max={new Date().toISOString().split("T")[0]}
                className="w-full px-4 py-3 rounded-xl bg-surface-indigo/60 border border-lavender-500/20 text-text-on-dark focus:outline-none focus:border-accent-gold/50 focus:ring-1 focus:ring-accent-gold/30 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={!dateStr}
              className="w-full py-3.5 rounded-xl font-display font-bold text-base bg-gradient-to-r from-accent-gold to-accent-gold-deep text-surface-midnight shadow-[0_0_20px_rgba(255,213,128,0.3)] hover:shadow-[0_0_36px_rgba(255,213,128,0.5)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:hover:scale-100 disabled:hover:shadow-none transition-all duration-200 cursor-pointer disabled:cursor-not-allowed"
            >
              ดูดวง ✨
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ─── Results State ───
  const displayName = name.trim() || "คุณ";

  return (
    <div className="max-w-2xl mx-auto animate-[fade-in-up_0.5s_ease-out_both]">
      {/* Profile Header */}
      <div className="text-center mb-6">
        <p className="text-text-muted text-sm mb-1">
          {profile.thaiDateFormatted}
        </p>
        <h1 className="font-display font-bold text-2xl sm:text-3xl text-accent-gold mb-1">
          {displayName}
        </h1>
        <p className="text-lavender-300 text-sm">
          {profile.zodiac.symbol} {profile.zodiac.name_th} •{" "}
          {profile.thaiDay.dayNameTh} • เลข {profile.lifePathNumber}
        </p>
        <button
          onClick={handleReset}
          className="mt-3 text-xs text-text-muted hover:text-accent-gold transition-colors cursor-pointer"
        >
          เปลี่ยนวันเกิด
        </button>
      </div>

      {/* Tab Bar */}
      <div className="flex gap-1 mb-6 overflow-x-auto scrollbar-hide pb-1 -mx-1 px-1">
        {TAB_KEYS.map((key) => (
          <button
            key={key}
            onClick={() => switchTab(key)}
            className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
              activeTab === key
                ? "bg-accent-gold/15 text-accent-gold border border-accent-gold/30 shadow-[0_0_12px_rgba(255,213,128,0.15)]"
                : "text-text-muted hover:text-lavender-300 hover:bg-lavender-500/10 border border-transparent"
            }`}
          >
            <span className="text-base">{TAB_LABELS[key].icon}</span>
            <span>{TAB_LABELS[key].label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div
        className="transition-all duration-150"
        style={{
          opacity: transitioning ? 0 : 1,
          transform: transitioning ? "translateY(8px)" : "translateY(0)",
        }}
      >
        {activeTab === "zodiac" && <ZodiacTab data={profile} />}
        {activeTab === "taksa" && <TaksaTab data={profile} />}
        {activeTab === "lifepath" && <LifePathTab data={profile} />}
        {activeTab === "thaiday" && <ThaiDayTab data={profile} />}
      </div>
    </div>
  );
}

// ─── Tab 1: Zodiac ───

function ZodiacTab({ data }: { data: ProfileData }) {
  const { zodiac } = data;
  const desc = ZODIAC_DESCRIPTIONS[zodiac.key] || "";

  return (
    <div className="space-y-4">
      {/* Main Sign Card */}
      <div className="rounded-2xl bg-surface-indigo/50 border border-lavender-500/15 p-6 text-center">
        <div className="text-6xl mb-3">{zodiac.symbol}</div>
        <h2 className="font-display font-bold text-2xl text-lavender-100 mb-1">
          ราศี{zodiac.name_th}
        </h2>
        <p className="text-lavender-300 text-sm mb-4">{zodiac.name_en}</p>
        {desc && (
          <p className="text-text-on-dark/80 text-sm leading-relaxed max-w-sm mx-auto">
            {desc}
          </p>
        )}
        {zodiac.cusp.isCusp && zodiac.cusp.cuspLabelTh && (
          <div className="mt-4 inline-block px-3 py-1 rounded-full bg-lavender-500/15 text-lavender-300 text-xs">
            คัสป์: {zodiac.cusp.cuspLabelTh}
          </div>
        )}
      </div>

      {/* Element & Modality */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-surface-indigo/40 border border-lavender-500/10 p-4 text-center">
          <div className="text-2xl mb-1">
            {ELEMENT_EMOJI[zodiac.element] || ""}
          </div>
          <p className="text-xs text-text-muted mb-0.5">ธาตุ</p>
          <p className="font-display font-bold text-sm text-lavender-100">
            {WESTERN_ELEMENT_NAMES_TH[zodiac.element]}
          </p>
        </div>
        <div className="rounded-xl bg-surface-indigo/40 border border-lavender-500/10 p-4 text-center">
          <div className="text-2xl mb-1">🔄</div>
          <p className="text-xs text-text-muted mb-0.5">คุณภาพ</p>
          <p className="font-display font-bold text-sm text-lavender-100">
            {MODALITY_TH[zodiac.modality] || zodiac.modality}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Tab 2: Taksa ───

function TaksaTab({ data }: { data: ProfileData }) {
  const { taksa } = data;

  return (
    <div className="space-y-4">
      {/* Birth Planet */}
      <div className="rounded-2xl bg-surface-indigo/50 border border-lavender-500/15 p-5 text-center">
        <p className="text-xs text-text-muted mb-1">ดาวประจำวันเกิด</p>
        <div className="text-4xl mb-1">{taksa.birthPlanet.symbol}</div>
        <h2 className="font-display font-bold text-xl text-accent-gold">
          {taksa.birthPlanet.name_th}
        </h2>
        <p className="text-text-on-dark/70 text-xs mt-1">
          {taksa.birthPlanet.meaning_th}
        </p>
      </div>

      {/* 8-Position Wheel */}
      <div className="rounded-2xl bg-surface-indigo/50 border border-lavender-500/15 p-5">
        <h3 className="font-display font-bold text-sm text-lavender-100 text-center mb-5">
          ทักษา 8 ตำแหน่ง
        </h3>

        {/* Octagon wheel layout */}
        <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] mx-auto">
          {/* Center circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-accent-gold/10 border border-accent-gold/30 flex items-center justify-center">
              <span className="text-accent-gold text-xl">
                {taksa.birthPlanet.symbol}
              </span>
            </div>
          </div>

          {/* Connecting ring */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 320 320"
          >
            <circle
              cx="160"
              cy="160"
              r="110"
              fill="none"
              stroke="rgba(196,181,253,0.12)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          </svg>

          {/* 8 positions around the circle */}
          {taksa.orderedAssignments.map((assignment, i) => {
            const angle = (i * 360) / 8 - 90; // start from top
            const rad = (angle * Math.PI) / 180;
            const radius = 42; // percentage from center
            const x = 50 + radius * Math.cos(rad);
            const y = 50 + radius * Math.sin(rad);
            const isKalakini = assignment.role.key === "kalakini";

            return (
              <div
                key={assignment.role.key}
                className="absolute flex flex-col items-center"
                style={
                  {
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: "translate(-50%, -50%)",
                  } as CSSProperties
                }
              >
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex flex-col items-center justify-center border transition-all ${
                    isKalakini
                      ? "bg-red-900/30 border-red-500/30"
                      : "bg-surface-indigo/80 border-lavender-500/20 hover:border-accent-gold/40"
                  }`}
                >
                  <span className="text-base leading-none">
                    {assignment.planet.symbol}
                  </span>
                  <span
                    className={`text-[9px] sm:text-[10px] mt-0.5 leading-none ${isKalakini ? "text-red-300" : "text-lavender-300"}`}
                  >
                    {assignment.planet.name_th}
                  </span>
                </div>
                <span
                  className={`text-[9px] sm:text-[10px] mt-1 font-medium leading-none ${isKalakini ? "text-red-400" : "text-accent-gold/80"}`}
                >
                  {assignment.role.name_th}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Role Details List */}
      <div className="space-y-2">
        {taksa.orderedAssignments.map((assignment) => {
          const isKalakini = assignment.role.key === "kalakini";
          return (
            <div
              key={assignment.role.key}
              className={`rounded-xl border p-3 flex items-start gap-3 ${
                isKalakini
                  ? "bg-red-900/15 border-red-500/20"
                  : "bg-surface-indigo/30 border-lavender-500/10"
              }`}
            >
              <span className="text-lg flex-shrink-0 mt-0.5">
                {assignment.planet.symbol}
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`font-display font-bold text-sm ${isKalakini ? "text-red-300" : "text-lavender-100"}`}
                  >
                    {assignment.role.name_th}
                  </span>
                  <span className="text-text-muted text-xs">
                    {assignment.planet.name_th}
                  </span>
                </div>
                <p className="text-text-on-dark/60 text-xs mt-0.5 leading-relaxed">
                  {assignment.role.meaning_th}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Auspicious / Caution Colors */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-surface-indigo/40 border border-lavender-500/10 p-4">
          <p className="text-xs text-text-muted mb-2">สีมงคล (ทักษา)</p>
          <div className="flex flex-wrap gap-1.5">
            {taksa.auspiciousColors.map((c) => (
              <span
                key={c}
                className="px-2.5 py-1 rounded-full bg-sage-green/15 text-sage-green text-xs"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-xl bg-surface-indigo/40 border border-lavender-500/10 p-4">
          <p className="text-xs text-text-muted mb-2">สีควรเลี่ยง</p>
          <div className="flex flex-wrap gap-1.5">
            {taksa.cautionColors.map((c) => (
              <span
                key={c}
                className="px-2.5 py-1 rounded-full bg-pink-soft/15 text-pink-soft text-xs"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Tab 3: Life Path ───

function LifePathTab({ data }: { data: ProfileData }) {
  const { lifePathNumber, lifePathMeaning } = data;
  const isMaster = isMasterNumber(lifePathNumber);

  // Derive lucky numbers from birth date digits
  const { year, month, day } = getDateParts(data.dateStr);
  const digits = `${day}${month}${year}`.split("").map(Number);
  const uniqueDigits = Array.from(new Set(digits)).filter((d) => d > 0);
  const luckyNumbers = uniqueDigits.slice(0, 4);

  return (
    <div className="space-y-4">
      {/* Main Number */}
      <div className="rounded-2xl bg-surface-indigo/50 border border-lavender-500/15 p-6 text-center">
        {isMaster && (
          <div className="inline-block px-3 py-1 rounded-full bg-accent-gold/15 text-accent-gold text-xs font-medium mb-3">
            ✦ Master Number
          </div>
        )}
        <div className="text-7xl sm:text-8xl font-display font-bold text-accent-gold mb-2 leading-none">
          {lifePathNumber}
        </div>
        <h2 className="font-display font-bold text-xl text-lavender-100 mb-1">
          {lifePathMeaning.title_th}
        </h2>
        <p className="text-lavender-300 text-sm mb-4">
          {lifePathMeaning.archetype_th}
        </p>
        <p className="text-text-on-dark/80 text-sm leading-relaxed max-w-md mx-auto">
          {lifePathMeaning.description_th}
        </p>
      </div>

      {/* Strengths & Watchouts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="rounded-xl bg-surface-indigo/40 border border-lavender-500/10 p-4">
          <h3 className="font-display font-bold text-sm text-sage-green mb-3 flex items-center gap-1.5">
            <span>💪</span> จุดแข็ง
          </h3>
          <ul className="space-y-2">
            {lifePathMeaning.strengths.map((s, i) => (
              <li
                key={i}
                className="text-text-on-dark/70 text-sm flex items-start gap-2"
              >
                <span className="text-sage-green/60 mt-1 text-xs">●</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl bg-surface-indigo/40 border border-lavender-500/10 p-4">
          <h3 className="font-display font-bold text-sm text-pink-soft mb-3 flex items-center gap-1.5">
            <span>👀</span> จุดระวัง
          </h3>
          <ul className="space-y-2">
            {lifePathMeaning.watchouts.map((w, i) => (
              <li
                key={i}
                className="text-text-on-dark/70 text-sm flex items-start gap-2"
              >
                <span className="text-pink-soft/60 mt-1 text-xs">●</span>
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Lucky Numbers */}
      <div className="rounded-xl bg-surface-indigo/40 border border-lavender-500/10 p-4 text-center">
        <p className="text-xs text-text-muted mb-3">เลขมงคลจากวันเกิด</p>
        <div className="flex items-center justify-center gap-3">
          {luckyNumbers.map((n, i) => (
            <div
              key={i}
              className="w-12 h-12 rounded-xl bg-accent-gold/10 border border-accent-gold/25 flex items-center justify-center"
            >
              <span className="font-display font-bold text-lg text-accent-gold">
                {n}
              </span>
            </div>
          ))}
          <div className="w-12 h-12 rounded-xl bg-lavender-500/10 border border-lavender-500/20 flex items-center justify-center">
            <span className="font-display font-bold text-lg text-lavender-300">
              {lifePathNumber}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Tab 4: Thai Day ───

function ThaiDayTab({ data }: { data: ProfileData }) {
  const { thaiDay, chineseZodiac } = data;

  return (
    <div className="space-y-4">
      {/* Day of Week */}
      <div className="rounded-2xl bg-surface-indigo/50 border border-lavender-500/15 p-6 text-center">
        <p className="text-xs text-text-muted mb-2">คุณเกิด</p>
        <h2 className="font-display font-bold text-3xl text-lavender-100 mb-1">
          {thaiDay.dayNameTh}
        </h2>
        <p className="text-lavender-300 text-sm mb-4">
          ดาวประจำวัน: {thaiDay.rulingPlanet}
        </p>

        {/* Personality Traits */}
        <div className="space-y-2 max-w-sm mx-auto">
          {thaiDay.personalityTraits.map((trait, i) => (
            <div
              key={i}
              className="px-3 py-2 rounded-lg bg-lavender-500/8 text-text-on-dark/80 text-sm"
            >
              {trait}
            </div>
          ))}
        </div>
      </div>

      {/* Buddha Image */}
      <div className="rounded-xl bg-surface-indigo/40 border border-lavender-500/10 p-4">
        <h3 className="font-display font-bold text-sm text-accent-gold mb-2 flex items-center gap-1.5">
          <span>🙏</span> พระประจำวัน
        </h3>
        <p className="font-display font-bold text-base text-lavender-100 mb-1">
          {thaiDay.buddha.name_th}
        </p>
        <p className="text-text-on-dark/70 text-sm leading-relaxed">
          {thaiDay.buddha.meaning_th}
        </p>
        <p className="text-text-muted text-xs mt-2 italic">
          {thaiDay.buddha.mantra_th}
        </p>
      </div>

      {/* Colors */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-surface-indigo/40 border border-lavender-500/10 p-4">
          <h3 className="text-xs text-text-muted mb-2.5">สีมงคล</h3>
          <div className="space-y-1.5">
            {thaiDay.auspiciousColors.map((color) => (
              <div key={color} className="flex items-center gap-2">
                <ColorSwatch color={color} />
                <span className="text-sm text-lavender-100">{color}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl bg-surface-indigo/40 border border-lavender-500/10 p-4">
          <h3 className="text-xs text-text-muted mb-2.5">สีต้องห้าม</h3>
          <div className="space-y-1.5">
            {thaiDay.cautionColors.map((color) => (
              <div key={color} className="flex items-center gap-2">
                <ColorSwatch color={color} />
                <span className="text-sm text-pink-soft/80">{color}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chinese Zodiac */}
      <div className="rounded-xl bg-surface-indigo/40 border border-lavender-500/10 p-4">
        <h3 className="font-display font-bold text-sm text-accent-gold mb-3 flex items-center gap-1.5">
          <span>🐉</span> นักษัตรจีน
        </h3>
        <div className="flex items-center gap-4 mb-3">
          <div className="text-center">
            <p className="font-display font-bold text-lg text-lavender-100">
              ปี{chineseZodiac.animal.yearNameTh}
            </p>
            <p className="text-text-muted text-xs">
              {chineseZodiac.animal.animalNameTh} (
              {chineseZodiac.animal.name_en})
            </p>
          </div>
          <div className="h-8 w-px bg-lavender-500/15" />
          <div className="text-center">
            <p className="font-display font-bold text-sm text-lavender-300">
              {chineseZodiac.elementNameTh}
            </p>
            <p className="text-text-muted text-xs">
              {chineseZodiac.cycleLabelTh}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {chineseZodiac.animal.traits_th.map((trait) => (
            <span
              key={trait}
              className="px-2.5 py-1 rounded-full bg-lavender-500/10 text-lavender-300 text-xs"
            >
              {trait}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Color Swatch Helper ───

const THAI_COLOR_MAP: Record<string, string> = {
  แดง: "#EF4444",
  "แดงเข้ม": "#B91C1C",
  ส้ม: "#F97316",
  แสด: "#EA580C",
  ทอง: "#F59E0B",
  เหลือง: "#EAB308",
  ครีม: "#FEF3C7",
  "เหลืองอำพัน": "#D97706",
  เขียว: "#22C55E",
  "เขียวมิ้นต์": "#34D399",
  "เขียวอ่อน": "#86EFAC",
  "ฟ้าอมเขียว": "#2DD4BF",
  ฟ้า: "#38BDF8",
  "น้ำเงิน": "#3B82F6",
  "น้ำเงินเข้ม": "#1E40AF",
  ชมพู: "#F472B6",
  "ม่วงแดง": "#A21CAF",
  ม่วง: "#8B5CF6",
  ดำ: "#1F2937",
  เทา: "#6B7280",
  ขาว: "#F9FAFB",
};

function ColorSwatch({ color }: { color: string }) {
  const hex = THAI_COLOR_MAP[color] || "#8B5CF6";
  return (
    <span
      className="inline-block w-5 h-5 rounded-full border border-white/20 flex-shrink-0"
      style={{ backgroundColor: hex }}
    />
  );
}
