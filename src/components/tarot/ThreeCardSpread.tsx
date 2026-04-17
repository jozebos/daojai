import { useState, useEffect, useCallback, useRef } from "react";
import { drawThreeCardSpread, getTarotMeaningByOrientation } from "@/lib/tarot/draw";
import type { ThreeCardSpreadItem, TarotThreeCardPosition } from "@/lib/tarot/draw";
import { toDateKey } from "@/lib/utils/date";
import { getCardImageUrl } from "@/lib/tarot/card-images";

function getOrCreateUserId(): string {
  const key = "daojai-user-id";
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
}

type Step = "category" | "shuffling" | "picking" | "revealing" | "done";

interface Category {
  key: string;
  label: string;
  icon: string;
}

const CATEGORIES: Category[] = [
  { key: "general", label: "ชีวิตทั่วไป", icon: "🌟" },
  { key: "love", label: "ความรัก", icon: "💕" },
  { key: "work", label: "การงาน", icon: "💼" },
  { key: "money", label: "การเงิน", icon: "💰" },
  { key: "health", label: "สุขภาพ", icon: "🌿" },
];

const POSITION_LABELS: Record<TarotThreeCardPosition, { th: string; en: string }> = {
  past: { th: "อดีต", en: "Past" },
  present: { th: "ปัจจุบัน", en: "Present" },
  future: { th: "อนาคต", en: "Future" },
};

const ELEMENT_COLORS: Record<string, { from: string; to: string }> = {
  fire: { from: "#F59E0B", to: "#DC2626" },
  water: { from: "#7DD3FC", to: "#8B5CF6" },
  air: { from: "#C4B5FD", to: "#7DD3FC" },
  earth: { from: "#86EFAC", to: "#F59E0B" },
  spirit: { from: "#FFD580", to: "#C4B5FD" },
};

export default function ThreeCardSpread() {
  const [step, setStep] = useState<Step>("category");
  const [category, setCategory] = useState<string>("");
  const [spread, setSpread] = useState<readonly ThreeCardSpreadItem[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [revealedIdx, setRevealedIdx] = useState<number>(0);
  const shuffleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!category) return;
    const userId = getOrCreateUserId();
    const today = toDateKey(new Date());
    const seedUserId = `${userId}-${category}`;
    const result = drawThreeCardSpread(seedUserId, today);
    setSpread(result);
  }, [category]);

  useEffect(() => {
    return () => {
      if (shuffleTimerRef.current) clearTimeout(shuffleTimerRef.current);
    };
  }, []);

  const handleCategorySelect = useCallback((key: string) => {
    setCategory(key);
    setStep("shuffling");
    shuffleTimerRef.current = setTimeout(() => {
      setStep("picking");
    }, 2200);
  }, []);

  const handleCardPick = useCallback((idx: number) => {
    if (step !== "picking") return;
    setSelected((prev) => {
      if (prev.includes(idx)) return prev.filter((i) => i !== idx);
      if (prev.length >= 3) return prev;
      return [...prev, idx];
    });
  }, [step]);

  const handleReveal = useCallback(() => {
    setStep("revealing");
    setRevealedIdx(0);
    setTimeout(() => setRevealedIdx(1), 600);
    setTimeout(() => setRevealedIdx(2), 1200);
    setTimeout(() => {
      setRevealedIdx(3);
      setStep("done");
    }, 1800);
  }, []);

  const handleReset = useCallback(() => {
    setStep("category");
    setCategory("");
    setSpread([]);
    setSelected([]);
    setRevealedIdx(0);
  }, []);

  if (step === "category") {
    return (
      <div className="w-full max-w-md mx-auto animate-[fade-in-up_0.5s_ease-out_both]">
        <p className="text-center text-lavender-300 text-sm mb-6">เลือกหมวดที่อยากถาม</p>
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => handleCategorySelect(cat.key)}
              className="spread-category-btn"
            >
              <span className="text-2xl mb-1">{cat.icon}</span>
              <span className="font-display font-bold text-sm text-lavender-100">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (step === "shuffling") {
    return (
      <div className="w-full max-w-md mx-auto flex flex-col items-center py-12 animate-[fade-in-up_0.3s_ease-out_both]">
        <p className="text-lavender-300 text-sm mb-8">กำลังสับไพ่...</p>
        <div className="spread-shuffle-container">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="spread-shuffle-card"
              style={{
                animationDelay: `${i * 0.12}s`,
                zIndex: 5 - i,
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (step === "picking") {
    const faceDownCards = Array.from({ length: 12 });
    return (
      <div className="w-full max-w-lg mx-auto animate-[fade-in-up_0.5s_ease-out_both]">
        <p className="text-center text-lavender-300 text-sm mb-2">
          เลือกไพ่ 3 ใบ ({selected.length}/3)
        </p>
        <p className="text-center text-text-muted text-xs mb-6">
          {CATEGORIES.find((c) => c.key === category)?.label}
        </p>

        <div className="grid grid-cols-4 gap-3 sm:gap-4 mb-6">
          {faceDownCards.map((_, idx) => {
            const isSelected = selected.includes(idx);
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleCardPick(idx)}
                disabled={selected.length >= 3 && !isSelected}
                aria-label={`ไพ่ใบที่ ${idx + 1}${isSelected ? " (เลือกแล้ว)" : ""}`}
                className={`spread-pick-card ${isSelected ? "spread-pick-card--selected" : ""}`}
                style={{ animationDelay: `${idx * 0.04}s` }}
              >
                <div className="spread-pick-card-inner">
                  <svg width="20" height="20" viewBox="0 0 48 48" fill="none" opacity="0.6">
                    <path
                      d="M24 4l4.47 9.06L38 14.94 30.83 22l1.69 9.88L24 27.68l-8.52 4.2L17.17 22 10 14.94l9.53-1.88L24 4z"
                      fill={isSelected ? "#FFD580" : "#C4B5FD"}
                    />
                  </svg>
                </div>
                {isSelected && (
                  <span className="spread-pick-badge">
                    {selected.indexOf(idx) + 1}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {selected.length === 3 && (
          <div className="flex justify-center animate-[fade-in-up_0.4s_ease-out_both]">
            <button
              type="button"
              onClick={handleReveal}
              className="spread-reveal-btn"
            >
              เปิดไพ่
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    );
  }

  const positions: TarotThreeCardPosition[] = ["past", "present", "future"];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="grid grid-cols-3 gap-3 sm:gap-5 mb-8">
        {positions.map((pos, idx) => {
          const item = spread[idx];
          if (!item) return null;

          const isRevealed = idx < revealedIdx;
          const label = POSITION_LABELS[pos];
          const colors = ELEMENT_COLORS[item.card.element] ?? ELEMENT_COLORS.spirit;
          const isReversed = item.orientation === "reversed";

          return (
            <div key={pos} className="flex flex-col items-center">
              <span className="text-xs font-display font-bold text-lavender-300 mb-2 tracking-wide uppercase">
                {label.th}
              </span>

              <div
                className="spread-reveal-scene"
                style={{ perspective: "800px" }}
              >
                <div
                  className="spread-reveal-inner"
                  style={{
                    transform: isRevealed ? "rotateY(180deg)" : "rotateY(0)",
                    transition: "transform 0.65s cubic-bezier(0.4, 0, 0.2, 1)",
                    transitionDelay: isRevealed ? "0s" : "0s",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className="spread-reveal-face spread-reveal-back" style={{ backfaceVisibility: "hidden" }}>
                    <div className="spread-card-back-design">
                      <svg width="24" height="24" viewBox="0 0 48 48" fill="none">
                        <path
                          d="M24 4l4.47 9.06L38 14.94 30.83 22l1.69 9.88L24 27.68l-8.52 4.2L17.17 22 10 14.94l9.53-1.88L24 4z"
                          fill="#FFD580"
                          opacity="0.7"
                        />
                      </svg>
                    </div>
                  </div>

                  <div
                    className="spread-reveal-face spread-reveal-front"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <div
                      className="spread-card-front-design"
                      style={{
                        background: `linear-gradient(160deg, ${colors.from}18, ${colors.to}18)`,
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={getCardImageUrl(item.card.id)}
                        alt={item.card.name_th}
                        width={160}
                        height={240}
                        loading="eager"
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          height: "100%",
                          borderRadius: "inherit",
                          position: "absolute",
                          inset: 0,
                        }}
                      />
                      <div style={{ position: "relative", zIndex: 1 }}>
                        <div
                          className="spread-card-element-dot"
                          style={{
                            background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
                          }}
                        />
                        <span className="spread-card-name">{item.card.name_th}</span>
                        <span className="spread-card-orientation" data-reversed={isReversed}>
                          {isReversed ? "กลับหัว" : "ตั้งตรง"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <span className="text-[10px] text-text-muted mt-1.5">{label.en}</span>
            </div>
          );
        })}
      </div>

      {step === "done" && (
        <div className="spread-meanings animate-[fade-in-up_0.6s_ease-out_0.2s_both]">
          {positions.map((pos, idx) => {
            const item = spread[idx];
            if (!item) return null;
            const label = POSITION_LABELS[pos];
            const meaning = getTarotMeaningByOrientation(item);

            return (
              <div key={pos} className="spread-meaning-card">
                <div className="spread-meaning-header">
                  <span className="spread-meaning-position">{label.th}</span>
                  <span className="spread-meaning-card-name">{item.card.name_th}</span>
                </div>
                <div className="spread-meaning-keywords">
                  {item.card.keywords_th.map((kw) => (
                    <span key={kw} className="spread-meaning-keyword">{kw}</span>
                  ))}
                </div>
                <p className="spread-meaning-text">{meaning}</p>
              </div>
            );
          })}

          <div className="spread-narrative">
            <h3 className="spread-narrative-title">สรุปภาพรวม</h3>
            <p className="spread-narrative-text">
              {generateNarrative(spread, category)}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 mt-6">
            <button
              type="button"
              onClick={handleReset}
              className="spread-action-btn spread-action-btn--secondary"
            >
              เปิดไพ่ใหม่
            </button>
            <button
              type="button"
              onClick={() => {
                const names = spread.map((s) => s.card.name_th).join(", ");
                if (navigator.share) {
                  navigator.share({
                    title: "ไพ่ 3 ใบจากเดาใจ",
                    text: `ได้ไพ่: ${names}`,
                    url: window.location.href,
                  }).catch(() => {});
                }
              }}
              className="spread-action-btn spread-action-btn--primary"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
              แชร์ผลไพ่
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function generateNarrative(spread: readonly ThreeCardSpreadItem[], category: string): string {
  if (spread.length < 3) return "";

  const past = spread[0];
  const present = spread[1];
  const future = spread[2];

  const catLabel = CATEGORIES.find((c) => c.key === category)?.label ?? "ชีวิต";

  return `ในเรื่อง${catLabel} ไพ่อดีตของคุณคือ "${past.card.name_th}" ซึ่งบอกว่าพลังที่ผ่านมาเกี่ยวข้องกับ${past.card.keywords_th[0]} ` +
    `ส่วนปัจจุบัน "${present.card.name_th}" ชี้ว่าตอนนี้คุณกำลังอยู่ในจังหวะของ${present.card.keywords_th[0]} ` +
    `และอนาคต "${future.card.name_th}" บอกว่าหากคุณเปิดรับพลังของ${future.card.keywords_th[0]} เส้นทางข้างหน้าจะค่อย ๆ ชัดขึ้นเอง`;
}
