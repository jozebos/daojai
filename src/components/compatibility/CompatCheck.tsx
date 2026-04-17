import { useState } from "react";
import {
  calculateCompatibility,
  type CompatibilityResult,
  type CompatibilitySystemKey,
} from "@/lib/astrology/compatibility";

type Step = "form" | "loading" | "results";
type RelationshipType = "lover" | "friend" | "family" | "business";

const RELATIONSHIP_OPTIONS: { key: RelationshipType; emoji: string; label: string }[] = [
  { key: "lover", emoji: "\u{1F495}", label: "\u0E04\u0E39\u0E48\u0E23\u0E31\u0E01" },
  { key: "friend", emoji: "\u{1F46B}", label: "\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E19" },
  { key: "family", emoji: "\u{1F468}\u200D\u{1F469}\u200D\u{1F467}", label: "\u0E04\u0E23\u0E2D\u0E1A\u0E04\u0E23\u0E31\u0E27" },
  { key: "business", emoji: "\u{1F4BC}", label: "\u0E04\u0E39\u0E48\u0E18\u0E38\u0E23\u0E01\u0E34\u0E08" },
];

const DIMENSION_LABELS: Record<CompatibilitySystemKey, string> = {
  thaiDay: "\u0E27\u0E31\u0E19\u0E40\u0E01\u0E34\u0E14\u0E44\u0E17\u0E22",
  chineseAnimal: "\u0E19\u0E31\u0E01\u0E29\u0E31\u0E15\u0E23",
  westernElement: "\u0E23\u0E32\u0E28\u0E35",
  numerology: "\u0E40\u0E25\u0E02\u0E0A\u0E35\u0E27\u0E34\u0E15",
  chineseElement: "\u0E20\u0E32\u0E1E\u0E23\u0E27\u0E21",
};

const DIMENSION_ORDER: CompatibilitySystemKey[] = [
  "thaiDay",
  "chineseAnimal",
  "westernElement",
  "numerology",
  "chineseElement",
];

function getTierLabel(overall: number): string {
  if (overall >= 80) return "\u0E04\u0E39\u0E48\u0E17\u0E35\u0E48\u0E25\u0E07\u0E15\u0E31\u0E27\u0E21\u0E32\u0E01 \u2728";
  if (overall >= 65) return "\u0E40\u0E02\u0E49\u0E32\u0E01\u0E31\u0E19\u0E44\u0E14\u0E49\u0E14\u0E35 \u{1F4AB}";
  if (overall >= 45) return "\u0E15\u0E49\u0E2D\u0E07\u0E1B\u0E23\u0E31\u0E1A\u0E08\u0E39\u0E19\u0E01\u0E31\u0E19\u0E2B\u0E19\u0E48\u0E2D\u0E22 \u{1F319}";
  return "\u0E17\u0E49\u0E32\u0E17\u0E32\u0E22\u0E41\u0E15\u0E48\u0E40\u0E15\u0E34\u0E1A\u0E42\u0E15\u0E14\u0E49\u0E27\u0E22\u0E01\u0E31\u0E19\u0E44\u0E14\u0E49 \u{1F331}";
}

function scoreColor(score: number): string {
  if (score > 70) return "text-sage-green";
  if (score >= 40) return "text-accent-gold";
  return "text-pink-soft";
}

function barGradient(score: number): string {
  if (score > 70) return "from-sage-green/80 to-sage-green";
  if (score >= 40) return "from-accent-gold/80 to-accent-gold";
  return "from-pink-soft/80 to-pink-soft";
}

export default function CompatCheck() {
  const [step, setStep] = useState<Step>("form");
  const [relType, setRelType] = useState<RelationshipType>("lover");
  const [nameA, setNameA] = useState("");
  const [nameB, setNameB] = useState("");
  const [dateA, setDateA] = useState("");
  const [dateB, setDateB] = useState("");
  const [result, setResult] = useState<CompatibilityResult | null>(null);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied">("idle");
  const [feedback, setFeedback] = useState<"none" | "liked" | "disliked">("none");
  const [saved, setSaved] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!dateA || !dateB) return;

    setStep("loading");

    setTimeout(() => {
      const res = calculateCompatibility(
        { birthDate: dateA, label: nameA || undefined },
        { birthDate: dateB, label: nameB || undefined },
      );
      setResult(res);
      setStep("results");
    }, 2400);
  }

  function reset() {
    setStep("form");
    setResult(null);
    setNameA("");
    setNameB("");
    setDateA("");
    setDateB("");
    setRelType("lover");
    setCopyStatus("idle");
    setFeedback("none");
    setSaved(false);
  }

  if (step === "loading") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 animate-[fade-in-up_0.5s_ease-out_both]">
        <div className="orbit-container" aria-hidden="true">
          <div className="orbit-ring">
            <div className="orbit-star orbit-star-a" />
            <div className="orbit-star orbit-star-b" />
          </div>
        </div>
        <p className="font-display text-lavender-300 text-lg animate-pulse">
          กำลังอ่านดวงให้...
        </p>

        <style>{`
          .orbit-container {
            width: 120px;
            height: 120px;
            position: relative;
          }
          .orbit-ring {
            width: 100%;
            height: 100%;
            position: relative;
            animation: orbit-spin 2.4s linear infinite;
          }
          .orbit-star {
            position: absolute;
            width: 16px;
            height: 16px;
            border-radius: 50%;
          }
          .orbit-star-a {
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            background: #FFD580;
            box-shadow: 0 0 16px rgba(255,213,128,0.7), 0 0 40px rgba(255,213,128,0.3);
          }
          .orbit-star-b {
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            background: #C4B5FD;
            box-shadow: 0 0 16px rgba(196,181,253,0.7), 0 0 40px rgba(196,181,253,0.3);
          }
          @keyframes orbit-spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (step === "results" && result) {
    const { overall, tier, breakdown, greenFlags, redFlags, advice } = result;
    const displayNameA = nameA || "คนที่ 1";
    const displayNameB = nameB || "คนที่ 2";

    const shareText = `เช็คดวงคู่ได้ ${overall}% จาก #เดาใจ 💕 ลองเช็คคู่ของคุณที่ daojai.com/compatibility`;

    async function handleShare() {
      if (navigator.share) {
        try {
          await navigator.share({ title: "เช็คดวงคู่ — เดาใจ", text: shareText, url: "https://daojai.com/compatibility" });
        } catch { /* user cancelled */ }
      } else {
        handleCopy();
      }
    }

    async function handleCopy() {
      try {
        await navigator.clipboard.writeText(shareText);
        setCopyStatus("copied");
        setTimeout(() => setCopyStatus("idle"), 2000);
      } catch { /* clipboard unavailable */ }
    }

    function handleFeedback(liked: boolean) {
      setFeedback(liked ? "liked" : "disliked");
      try {
        const today = new Date().toISOString().split("T")[0];
        localStorage.setItem(
          `daojai-feedback-compatibility-${today}`,
          JSON.stringify({ type: "compatibility", liked, timestamp: new Date().toISOString() }),
        );
      } catch { /* localStorage unavailable */ }
    }

    function handleSave() {
      try {
        const raw = localStorage.getItem("daojai-reading-history") || "[]";
        const history = JSON.parse(raw);
        history.push({
          type: "compatibility",
          date: new Date().toISOString(),
          data: { overall, dateA, dateB, nameA: displayNameA, nameB: displayNameB },
        });
        localStorage.setItem("daojai-reading-history", JSON.stringify(history));
        setSaved(true);
      } catch { /* localStorage unavailable */ }
    }

    return (
      <div className="max-w-lg mx-auto space-y-6 animate-[fade-in-up_0.6s_ease-out_both]">
        <div className="text-center space-y-1 pt-2">
          <p className="text-sm text-text-muted font-display">
            {displayNameA} & {displayNameB}
          </p>
          <p className="text-xs text-lavender-300/60">
            {RELATIONSHIP_OPTIONS.find((o) => o.key === relType)?.emoji}{" "}
            {RELATIONSHIP_OPTIONS.find((o) => o.key === relType)?.label}
          </p>
        </div>

        <div className="relative flex flex-col items-center py-8">
          <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <div
              className="w-40 h-40 rounded-full opacity-20 blur-2xl"
              style={{
                background:
                  overall > 70
                    ? "radial-gradient(circle, #86EFAC, transparent)"
                    : overall >= 40
                      ? "radial-gradient(circle, #FFD580, transparent)"
                      : "radial-gradient(circle, #FCA5A5, transparent)",
              }}
            />
          </div>
          <span
            className={`relative font-display font-bold text-7xl sm:text-8xl ${scoreColor(overall)}`}
            style={{
              textShadow:
                overall > 70
                  ? "0 0 30px rgba(134,239,172,0.4)"
                  : overall >= 40
                    ? "0 0 30px rgba(255,213,128,0.4)"
                    : "0 0 30px rgba(252,165,165,0.4)",
            }}
          >
            {overall}
          </span>
          <span className="text-text-muted text-sm mt-1">คะแนนจาก 100</span>
          <p className="font-display text-lg text-lavender-100 mt-2">
            {getTierLabel(overall)}
          </p>
          <p className="text-xs text-text-muted mt-1 text-center max-w-xs">
            {tier.emoji} {tier.description}
          </p>
        </div>

        <div
          className="rounded-2xl p-5 space-y-4"
          style={{
            background: "rgba(30,27,75,0.45)",
            border: "1px solid rgba(196,181,253,0.12)",
            backdropFilter: "blur(12px)",
          }}
        >
          <h3 className="font-display font-bold text-sm text-lavender-100 mb-3">
            คะแนนรายมิติ
          </h3>
          {DIMENSION_ORDER.map((key) => {
            const entry = breakdown[key];
            return (
              <div key={key} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-lavender-300">
                    {DIMENSION_LABELS[key]}
                  </span>
                  <span className={`font-bold ${scoreColor(entry.score)}`}>
                    {entry.score}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-surface-midnight/60 overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${barGradient(entry.score)} transition-all duration-700 ease-out`}
                    style={{ width: `${entry.score}%` }}
                  />
                </div>
                <p className="text-[11px] text-text-muted leading-relaxed">
                  {entry.label} — {entry.insight}
                </p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            className="rounded-2xl p-4 space-y-2"
            style={{
              background: "rgba(134,239,172,0.06)",
              border: "1px solid rgba(134,239,172,0.15)",
            }}
          >
            <h4 className="font-display font-bold text-sm text-sage-green flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-sage-green">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              สิ่งที่เข้ากันดี
            </h4>
            <ul className="space-y-1.5">
              {greenFlags.map((flag, i) => (
                <li key={i} className="text-xs text-text-muted leading-relaxed flex gap-1.5">
                  <span className="text-sage-green mt-0.5 shrink-0">•</span>
                  {flag}
                </li>
              ))}
            </ul>
          </div>

          <div
            className="rounded-2xl p-4 space-y-2"
            style={{
              background: "rgba(252,165,165,0.06)",
              border: "1px solid rgba(252,165,165,0.15)",
            }}
          >
            <h4 className="font-display font-bold text-sm text-pink-soft flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-pink-soft">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              สิ่งที่ต้องระวัง
            </h4>
            <ul className="space-y-1.5">
              {redFlags.map((flag, i) => (
                <li key={i} className="text-xs text-text-muted leading-relaxed flex gap-1.5">
                  <span className="text-pink-soft mt-0.5 shrink-0">•</span>
                  {flag}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="rounded-2xl p-5"
          style={{
            background: "rgba(30,27,75,0.45)",
            border: "1px solid rgba(196,181,253,0.12)",
            backdropFilter: "blur(12px)",
          }}
        >
          <h4 className="font-display font-bold text-sm text-accent-gold mb-2 flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-gold">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            คำแนะนำจากดวงดาว
          </h4>
          <p className="text-sm text-text-muted leading-relaxed">{advice}</p>
        </div>

        <div className="daojai-share-section">
          <p className="daojai-share-title">แชร์ผลดวงคู่</p>
          <div className="daojai-share-actions">
            <button type="button" onClick={handleShare} className="daojai-share-btn daojai-share-btn--gold">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
              แชร์
            </button>
            <button type="button" onClick={handleCopy} className="daojai-share-btn daojai-share-btn--subtle">
              {copyStatus === "copied" ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  คัดลอกแล้ว!
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                  </svg>
                  คัดลอกลิงก์
                </>
              )}
            </button>
          </div>
        </div>

        <div className="daojai-feedback-section">
          {feedback === "none" ? (
            <>
              <button type="button" onClick={() => handleFeedback(true)} className="daojai-feedback-btn">👍 ตรง!</button>
              <button type="button" onClick={() => handleFeedback(false)} className="daojai-feedback-btn">👎 ไม่ตรง</button>
            </>
          ) : (
            <span className="daojai-feedback-thanks">บันทึกแล้ว ขอบคุณ! ✨</span>
          )}
        </div>

        {!saved ? (
          <button type="button" onClick={handleSave} className="daojai-save-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" />
            </svg>
            บันทึกผลไว้ดูย้อนหลัง?
          </button>
        ) : (
          <p className="daojai-save-toast">บันทึกแล้ว! ดูย้อนหลังได้ที่หน้า &lsquo;ของฉัน&rsquo; ✨</p>
        )}

        <div className="flex justify-center pb-4">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium text-lavender-300 border border-lavender-500/20 hover:border-lavender-500/40 hover:bg-lavender-500/10 transition-all duration-200 cursor-pointer"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="1 4 1 10 7 10" />
              <path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
            </svg>
            ลองใหม่
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto space-y-6 animate-[fade-in-up_0.5s_ease-out_both]"
    >
      <div className="text-center space-y-1 pt-2">
        <h1 className="font-display font-bold text-2xl sm:text-3xl text-accent-gold">
          เช็คดวงคู่
        </h1>
        <p className="text-sm text-text-muted">
          ดูความเข้ากันจาก 5 ระบบดวงดาว
        </p>
      </div>

      <fieldset className="space-y-2">
        <legend className="font-display text-sm text-lavender-300 mb-2">
          ความสัมพันธ์
        </legend>
        <div className="grid grid-cols-4 gap-2">
          {RELATIONSHIP_OPTIONS.map((opt) => {
            const active = relType === opt.key;
            return (
              <button
                key={opt.key}
                type="button"
                onClick={() => setRelType(opt.key)}
                className={`flex flex-col items-center gap-1 py-3 px-2 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer ${
                  active
                    ? "bg-accent-gold/15 text-accent-gold border border-accent-gold/30 shadow-[0_0_12px_rgba(255,213,128,0.15)]"
                    : "text-text-muted border border-lavender-500/10 hover:border-lavender-500/20 hover:bg-lavender-500/5"
                }`}
                style={{
                  background: active ? undefined : "rgba(30,27,75,0.35)",
                }}
              >
                <span className="text-lg">{opt.emoji}</span>
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <div
        className="rounded-2xl p-4 space-y-3"
        style={{
          background: "rgba(30,27,75,0.45)",
          border: "1px solid rgba(196,181,253,0.12)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="flex items-center gap-2">
          <span
            className="flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold text-surface-midnight"
            style={{ background: "linear-gradient(135deg, #FFD580, #F59E0B)" }}
          >
            A
          </span>
          <span className="font-display text-sm font-bold text-lavender-100">
            คนที่ 1
          </span>
        </div>
        <div className="space-y-2">
          <input
            type="text"
            placeholder="ชื่อเล่น (ไม่จำเป็น)"
            value={nameA}
            onChange={(e) => setNameA(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl text-sm bg-surface-midnight/60 text-text-on-dark placeholder-text-muted border border-lavender-500/10 focus:border-accent-gold/40 focus:outline-none focus:ring-1 focus:ring-accent-gold/20 transition-colors"
          />
          <input
            type="date"
            required
            value={dateA}
            onChange={(e) => setDateA(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl text-sm bg-surface-midnight/60 text-text-on-dark border border-lavender-500/10 focus:border-accent-gold/40 focus:outline-none focus:ring-1 focus:ring-accent-gold/20 transition-colors"
            style={{ colorScheme: "dark", color: "#EDE9FE" }}
          />
        </div>
      </div>

      <div className="flex items-center justify-center" aria-hidden="true">
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-lavender-500/10 border border-lavender-500/15">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-lavender-300">
            <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3z" />
          </svg>
        </div>
      </div>

      <div
        className="rounded-2xl p-4 space-y-3"
        style={{
          background: "rgba(30,27,75,0.45)",
          border: "1px solid rgba(196,181,253,0.12)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="flex items-center gap-2">
          <span
            className="flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold text-surface-midnight"
            style={{ background: "linear-gradient(135deg, #C4B5FD, #8B5CF6)" }}
          >
            B
          </span>
          <span className="font-display text-sm font-bold text-lavender-100">
            คนที่ 2
          </span>
        </div>
        <div className="space-y-2">
          <input
            type="text"
            placeholder="ชื่อเล่น (ไม่จำเป็น)"
            value={nameB}
            onChange={(e) => setNameB(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl text-sm bg-surface-midnight/60 text-text-on-dark placeholder-text-muted border border-lavender-500/10 focus:border-accent-gold/40 focus:outline-none focus:ring-1 focus:ring-accent-gold/20 transition-colors"
          />
          <input
            type="date"
            required
            value={dateB}
            onChange={(e) => setDateB(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl text-sm bg-surface-midnight/60 text-text-on-dark border border-lavender-500/10 focus:border-accent-gold/40 focus:outline-none focus:ring-1 focus:ring-accent-gold/20 transition-colors"
            style={{ colorScheme: "dark", color: "#EDE9FE" }}
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-3.5 rounded-full font-display font-bold text-base text-surface-midnight bg-gradient-to-r from-accent-gold to-accent-gold-deep shadow-[0_0_24px_rgba(255,213,128,0.3)] hover:shadow-[0_0_40px_rgba(255,213,128,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
      >
        ดูดวงคู่เลย
      </button>
    </form>
  );
}
