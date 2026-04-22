import { useState, useEffect, useCallback } from "react";
import { drawDailyTarotCard, getTarotMeaningByOrientation } from "@/lib/tarot/draw";
import type { DailyTarotDraw } from "@/lib/tarot/draw";
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

const ELEMENT_COLORS: Record<string, { from: string; to: string }> = {
  fire: { from: "#F59E0B", to: "#DC2626" },
  water: { from: "#7DD3FC", to: "#8B5CF6" },
  air: { from: "#C4B5FD", to: "#7DD3FC" },
  earth: { from: "#86EFAC", to: "#F59E0B" },
  spirit: { from: "#FFD580", to: "#C4B5FD" },
};

export default function DailyCard() {
  const [draw, setDraw] = useState<DailyTarotDraw | null>(null);
  const [flipped, setFlipped] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied">("idle");
  const [feedback, setFeedback] = useState<"none" | "liked" | "disliked">("none");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const userId = getOrCreateUserId();
    const today = toDateKey(new Date());
    const result = drawDailyTarotCard(userId, today);
    setDraw(result);
  }, []);

  const handleFlip = useCallback(() => {
    if (flipped || animating) return;
    setAnimating(true);
    setFlipped(true);
    setTimeout(() => setAnimating(false), 700);
  }, [flipped, animating]);

  if (!draw) return null;

  const { card, orientation } = draw;
  const meaning = getTarotMeaningByOrientation(draw);
  const isReversed = orientation === "reversed";
  const colors = ELEMENT_COLORS[card.element] ?? ELEMENT_COLORS.spirit;
  const today = toDateKey(new Date());

  const shareText = `วันนี้ได้ไพ่ ${card.name_th} (${card.name_en}) จาก #เดาใจ 🔮 ลองดูดวงของคุณที่ daojai.com/tarot/daily`;
  const shareUrl = "https://daojai.com/tarot/daily";

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title: `ไพ่ประจำวัน: ${card.name_th}`, text: shareText, url: shareUrl });
      } catch { /* cancelled */ }
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
      localStorage.setItem(
        `daojai-feedback-daily-tarot-${today}`,
        JSON.stringify({ type: "daily-tarot", liked, timestamp: new Date().toISOString(), cardId: card.id }),
      );
    } catch { /* localStorage unavailable */ }
  }

  function handleSave() {
    try {
      const raw = localStorage.getItem("daojai-reading-history") || "[]";
      const history = JSON.parse(raw);
      history.push({
        type: "daily-tarot",
        date: new Date().toISOString(),
        data: { cardId: card.id, cardName: card.name_th, cardNameEn: card.name_en, orientation },
      });
      localStorage.setItem("daojai-reading-history", JSON.stringify(history));
      setSaved(true);
    } catch { /* localStorage unavailable */ }
  }

  return (
    <div className="flex flex-col items-center w-full max-w-sm mx-auto">
      <div
        className="daily-card-scene"
        style={{ perspective: "1000px" }}
      >
        <button
          type="button"
          onClick={handleFlip}
          disabled={flipped}
          aria-label={flipped ? `ไพ่ ${card.name_th}` : "แตะเพื่อเปิดไพ่"}
          className="daily-card-inner"
          style={{
            transform: flipped ? "rotateY(180deg)" : "rotateY(0)",
            transition: "transform 0.65s cubic-bezier(0.4, 0, 0.2, 1)",
            transformStyle: "preserve-3d",
          }}
        >
          <div
            className="daily-card-face daily-card-back"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="daily-card-back-inner">
              <div className="daily-card-back-pattern" aria-hidden="true">
                {Array.from({ length: 12 }).map((_, i) => (
                  <span
                    key={i}
                    className="daily-card-star"
                    style={{
                      top: `${15 + (i % 4) * 22}%`,
                      left: `${10 + Math.floor(i / 4) * 30}%`,
                      animationDelay: `${i * 0.3}s`,
                    }}
                  />
                ))}
              </div>
              <div className="daily-card-back-center">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <path
                    d="M24 4l4.47 9.06L38 14.94 30.83 22l1.69 9.88L24 27.68l-8.52 4.2L17.17 22 10 14.94l9.53-1.88L24 4z"
                    fill="#FFD580"
                    opacity="0.9"
                  />
                </svg>
              </div>
              <span className="daily-card-back-label">แตะเพื่อเปิดไพ่</span>
            </div>
          </div>

          <div
            className="daily-card-face daily-card-front"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className="daily-card-front-inner">
              <div
                className="daily-card-element-strip"
                style={{
                  background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
                }}
              />

              <div
                className="daily-card-image-area"
                style={{
                  background: "none",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <img
                  src={getCardImageUrl(card.id)}
                  alt={card.name_th}
                  width={200}
                  height={300}
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
              </div>

              <div className="daily-card-info" style={{ background: "linear-gradient(to bottom, rgba(15,14,46,0.9), rgba(30,27,75,0.95))" }}>
                <h2 className="daily-card-name">{card.name_th}</h2>
                <p className="daily-card-name-en">{card.name_en}</p>
                <div className="daily-card-orientation-badge" data-reversed={isReversed}>
                  {isReversed ? "กลับหัว (Reversed)" : "ตั้งตรง (Upright)"}
                </div>
              </div>
            </div>
          </div>
        </button>
      </div>

      {flipped && (
        <div className="daily-card-meaning animate-[fade-in-up_0.6s_ease-out_0.3s_both]">
          <div className="daily-card-keywords">
            {card.keywords_th.map((kw) => (
              <span key={kw} className="daily-card-keyword">{kw}</span>
            ))}
          </div>

          <p className="daily-card-meaning-text">{meaning}</p>

          {/* Share Section */}
          <div className="daojai-share-section">
            <p className="daojai-share-title">แชร์ผลให้เพื่อนดู</p>
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

          {/* Feedback */}
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

          {/* Save Prompt */}
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

          <div className="daily-card-actions" style={{ marginTop: "0.75rem" }}>
            <a
              href={`/tarot/cards/${card.id}`}
              className="daily-card-btn daily-card-btn--detail"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
                <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
              </svg>
              ดูไพ่ใบนี้
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

function romanize(num: number): string {
  const map: [number, string][] = [
    [21, "XXI"], [20, "XX"], [19, "XIX"], [18, "XVIII"], [17, "XVII"],
    [16, "XVI"], [15, "XV"], [14, "XIV"], [13, "XIII"], [12, "XII"],
    [11, "XI"], [10, "X"], [9, "IX"], [8, "VIII"], [7, "VII"],
    [6, "VI"], [5, "V"], [4, "IV"], [3, "III"], [2, "II"], [1, "I"], [0, "0"],
  ];
  for (const [val, str] of map) {
    if (num >= val) return str;
  }
  return String(num);
}
