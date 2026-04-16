#!/usr/bin/env bun
import { writeFileSync, mkdirSync, existsSync, readdirSync } from "fs";
import { join } from "path";

// ─── Configuration ──────────────────────────────────────────────────────────

const OUTPUT_DIR = join(import.meta.dir, "..", "src", "assets", "tarot");
const API_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "google/gemini-2.5-flash-image";
const API_KEY = process.env.OPENROUTER_API_KEY ?? "";

const CONCURRENCY = 4;
const PER_REQUEST_TIMEOUT_MS = 60_000;
const TOTAL_TIMEOUT_MS = 10 * 60_000;
const FIRST_BATCH_TIMEOUT_MS = 5 * 60_000;

const COLORS = {
  midnight: "#0F0E2E",
  indigo: "#1E1B4B",
  gold: "#FFD580",
  lavender: "#C4B5FD",
  pink: "#FCA5A5",
  deepPurple: "#2D1B69",
  softWhite: "#F5F3FF",
};

// ─── Card Definitions ───────────────────────────────────────────────────────

interface CardDef {
  id: string;
  filename: string;
  name: string;
  suit?: string;
  number?: number;
}

const MAJOR_ARCANA: CardDef[] = [
  { id: "major-00", filename: "major-00-fool", name: "The Fool" },
  { id: "major-01", filename: "major-01-magician", name: "The Magician" },
  { id: "major-02", filename: "major-02-high-priestess", name: "The High Priestess" },
  { id: "major-03", filename: "major-03-empress", name: "The Empress" },
  { id: "major-04", filename: "major-04-emperor", name: "The Emperor" },
  { id: "major-05", filename: "major-05-hierophant", name: "The Hierophant" },
  { id: "major-06", filename: "major-06-lovers", name: "The Lovers" },
  { id: "major-07", filename: "major-07-chariot", name: "The Chariot" },
  { id: "major-08", filename: "major-08-strength", name: "Strength" },
  { id: "major-09", filename: "major-09-hermit", name: "The Hermit" },
  { id: "major-10", filename: "major-10-wheel-of-fortune", name: "Wheel of Fortune" },
  { id: "major-11", filename: "major-11-justice", name: "Justice" },
  { id: "major-12", filename: "major-12-hanged-man", name: "The Hanged Man" },
  { id: "major-13", filename: "major-13-death", name: "Death" },
  { id: "major-14", filename: "major-14-temperance", name: "Temperance" },
  { id: "major-15", filename: "major-15-devil", name: "The Devil" },
  { id: "major-16", filename: "major-16-tower", name: "The Tower" },
  { id: "major-17", filename: "major-17-star", name: "The Star" },
  { id: "major-18", filename: "major-18-moon", name: "The Moon" },
  { id: "major-19", filename: "major-19-sun", name: "The Sun" },
  { id: "major-20", filename: "major-20-judgement", name: "Judgement" },
  { id: "major-21", filename: "major-21-world", name: "The World" },
];

const SUITS = ["wands", "cups", "swords", "pentacles"] as const;
const RANK_NAMES: Record<number, string> = {
  1: "ace", 2: "two", 3: "three", 4: "four", 5: "five",
  6: "six", 7: "seven", 8: "eight", 9: "nine", 10: "ten",
  11: "page", 12: "knight", 13: "queen", 14: "king",
};

function buildMinorArcana(): CardDef[] {
  const cards: CardDef[] = [];
  for (const suit of SUITS) {
    for (let n = 1; n <= 14; n++) {
      const nn = String(n).padStart(2, "0");
      const rankName = RANK_NAMES[n];
      cards.push({
        id: `${suit}-${nn}`,
        filename: `${suit}-${nn}-${rankName}`,
        name: `${rankName.charAt(0).toUpperCase() + rankName.slice(1)} of ${suit.charAt(0).toUpperCase() + suit.slice(1)}`,
        suit,
        number: n,
      });
    }
  }
  return cards;
}

const MINOR_ARCANA = buildMinorArcana();
const ALL_CARDS: CardDef[] = [...MAJOR_ARCANA, ...MINOR_ARCANA];

// ─── AI Generation ──────────────────────────────────────────────────────────

async function generateCardAI(card: CardDef): Promise<Buffer | null> {
  if (!API_KEY) return null;

  const prompt = `Create a tarot card illustration for "${card.name}". Style: celestial watercolor with soft lines, indigo (#1E1B4B) and gold (#FFD580) color palette, mystical Thai-inspired spiritual elements, portrait orientation 3:4 aspect ratio. The card should have an ornate border frame. No text on the card.`;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), PER_REQUEST_TIMEOUT_MS);

    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: "user", content: prompt }],
        modalities: ["image", "text"],
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) {
      console.error(`  API error for ${card.name}: ${res.status}`);
      return null;
    }

    const data = await res.json();
    const images = data?.choices?.[0]?.message?.images;

    if (images && images.length > 0) {
      const dataUrl: string = images[0]?.image_url?.url ?? "";
      if (dataUrl.startsWith("data:image/")) {
        const b64 = dataUrl.split(",", 2)[1];
        return Buffer.from(b64, "base64");
      }
    }

    // OpenRouter may return images in content array instead of images field
    const content = data?.choices?.[0]?.message?.content;
    if (Array.isArray(content)) {
      for (const part of content) {
        if (part.type === "image_url") {
          const url = part.image_url?.url ?? "";
          if (url.startsWith("data:image/")) {
            const b64 = url.split(",", 2)[1];
            return Buffer.from(b64, "base64");
          }
        }
      }
    }

    console.error(`  No image in response for ${card.name}`);
    return null;
  } catch (err: any) {
    console.error(`  Error generating ${card.name}: ${err.message}`);
    return null;
  }
}

async function generateCardBackAI(): Promise<Buffer | null> {
  if (!API_KEY) return null;

  const prompt = `Create the back design of a tarot card. Style: mystical celestial pattern, centered 8-pointed star motif, indigo (#1E1B4B) background with gold (#FFD580) and lavender (#C4B5FD) ornamental patterns. Symmetrical sacred geometry, Thai-inspired lotus and celestial elements. Portrait orientation 3:4 aspect ratio. No text.`;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), PER_REQUEST_TIMEOUT_MS);

    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: "user", content: prompt }],
        modalities: ["image", "text"],
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);
    if (!res.ok) return null;

    const data = await res.json();
    const images = data?.choices?.[0]?.message?.images;
    if (images?.[0]?.image_url?.url?.startsWith("data:image/")) {
      return Buffer.from(images[0].image_url.url.split(",", 2)[1], "base64");
    }
    return null;
  } catch {
    return null;
  }
}

// ─── SVG Placeholder Generation ─────────────────────────────────────────────

const SUIT_SVG_PATHS: Record<string, string> = {
  wands: `<g transform="translate(150,220) scale(2.5)" fill="${COLORS.gold}" stroke="${COLORS.gold}" stroke-width="0.5">
    <rect x="-3" y="-40" width="6" height="80" rx="3" />
    <circle cx="0" cy="-42" r="8" fill="none" stroke="${COLORS.gold}" stroke-width="1.5" />
    <path d="M-6,-35 Q0,-50 6,-35" fill="none" stroke="${COLORS.pink}" stroke-width="1" />
    <path d="M-4,-30 Q0,-42 4,-30" fill="none" stroke="${COLORS.lavender}" stroke-width="0.8" />
    <circle cx="0" cy="-42" r="3" fill="${COLORS.pink}" opacity="0.6" />
  </g>`,
  cups: `<g transform="translate(150,220) scale(2.5)" fill="none" stroke="${COLORS.gold}" stroke-width="1.5">
    <path d="M-15,10 Q-18,-15 0,-20 Q18,-15 15,10 Z" fill="${COLORS.indigo}" />
    <path d="M-15,10 L-10,15 L10,15 L15,10" fill="${COLORS.indigo}" />
    <ellipse cx="0" cy="-20" rx="5" ry="2" fill="${COLORS.lavender}" opacity="0.5" />
    <path d="M0,15 L0,25" />
    <ellipse cx="0" cy="28" rx="12" ry="3" />
    <path d="M-8,-10 Q0,-5 8,-10" stroke="${COLORS.pink}" stroke-width="0.8" opacity="0.6" />
  </g>`,
  swords: `<g transform="translate(150,220) scale(2.5)" fill="${COLORS.gold}" stroke="${COLORS.gold}" stroke-width="0.5">
    <rect x="-1.5" y="-45" width="3" height="70" rx="1" />
    <polygon points="0,-48 -5,-38 5,-38" />
    <rect x="-15" y="-10" width="30" height="3" rx="1.5" />
    <circle cx="0" cy="-8" r="4" fill="none" stroke="${COLORS.lavender}" stroke-width="1" />
  </g>`,
  pentacles: `<g transform="translate(150,220) scale(2.5)" fill="none" stroke="${COLORS.gold}" stroke-width="1.5">
    <circle cx="0" cy="0" r="22" />
    <circle cx="0" cy="0" r="18" stroke="${COLORS.lavender}" stroke-width="0.8" />
    <polygon points="0,-16 3.8,-5 15.2,-5 6.2,2 9.5,13 0,7 -9.5,13 -6.2,2 -15.2,-5 -3.8,-5" fill="${COLORS.gold}" opacity="0.3" stroke="${COLORS.gold}" />
  </g>`,
};

function getSuitGradient(suit?: string): { from: string; via: string; to: string } {
  switch (suit) {
    case "wands":
      return { from: COLORS.indigo, via: "#2D1B4B", to: "#4A1942" };
    case "cups":
      return { from: COLORS.indigo, via: "#1B2B4B", to: "#1B3B5B" };
    case "swords":
      return { from: COLORS.indigo, via: "#2B1B3B", to: "#1B1B3B" };
    case "pentacles":
      return { from: COLORS.indigo, via: "#2B2B1B", to: "#3B2B1B" };
    default:
      return { from: COLORS.midnight, via: COLORS.indigo, to: COLORS.deepPurple };
  }
}

function generateSVGPlaceholder(card: CardDef): string {
  const grad = getSuitGradient(card.suit);
  const suitKey = card.suit ?? "major";
  const suitArt = SUIT_SVG_PATHS[suitKey] ?? SUIT_SVG_PATHS.pentacles;
  const romanNumerals = ["0", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX", "XXI"];
  const numberDisplay = card.suit
    ? (card.number ?? 1).toString()
    : romanNumerals[parseInt(card.id.split("-")[1])] ?? "";

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 450" width="300" height="450">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0.3" y2="1">
      <stop offset="0%" stop-color="${grad.from}" />
      <stop offset="50%" stop-color="${grad.via}" />
      <stop offset="100%" stop-color="${grad.to}" />
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="40%" r="50%">
      <stop offset="0%" stop-color="${COLORS.lavender}" stop-opacity="0.15" />
      <stop offset="100%" stop-color="transparent" stop-opacity="0" />
    </radialGradient>
    <filter id="softglow">
      <feGaussianBlur stdDeviation="2" result="blur" />
      <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
    </filter>
    <pattern id="stars" width="40" height="40" patternUnits="userSpaceOnUse">
      <circle cx="20" cy="20" r="0.5" fill="${COLORS.gold}" opacity="0.3" />
      <circle cx="5" cy="8" r="0.3" fill="${COLORS.lavender}" opacity="0.2" />
      <circle cx="35" cy="32" r="0.4" fill="${COLORS.gold}" opacity="0.2" />
      <circle cx="12" cy="35" r="0.3" fill="${COLORS.pink}" opacity="0.15" />
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="300" height="450" rx="12" fill="url(#bg)" />
  <rect width="300" height="450" rx="12" fill="url(#stars)" />
  <rect width="300" height="450" rx="12" fill="url(#glow)" />

  <!-- Ornate Border -->
  <rect x="8" y="8" width="284" height="434" rx="8" fill="none" stroke="${COLORS.gold}" stroke-width="1.5" opacity="0.6" />
  <rect x="14" y="14" width="272" height="422" rx="6" fill="none" stroke="${COLORS.gold}" stroke-width="0.5" opacity="0.3" />

  <!-- Corner Ornaments -->
  <g opacity="0.5" fill="${COLORS.gold}">
    <!-- Top-left -->
    <path d="M20,25 Q25,20 30,25 Q25,30 20,25 Z" />
    <circle cx="25" cy="25" r="2" />
    <!-- Top-right -->
    <path d="M270,25 Q275,20 280,25 Q275,30 270,25 Z" />
    <circle cx="275" cy="25" r="2" />
    <!-- Bottom-left -->
    <path d="M20,425 Q25,420 30,425 Q25,430 20,425 Z" />
    <circle cx="25" cy="425" r="2" />
    <!-- Bottom-right -->
    <path d="M270,425 Q275,420 280,425 Q275,430 270,425 Z" />
    <circle cx="275" cy="425" r="2" />
  </g>

  <!-- Celestial decorative arcs -->
  <path d="M50,60 Q150,30 250,60" fill="none" stroke="${COLORS.gold}" stroke-width="0.5" opacity="0.3" />
  <path d="M50,390 Q150,420 250,390" fill="none" stroke="${COLORS.gold}" stroke-width="0.5" opacity="0.3" />

  <!-- Suit Symbol / Art -->
  ${suitArt}

  <!-- Number -->
  <text x="150" y="95" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="22" fill="${COLORS.gold}" filter="url(#softglow)" opacity="0.8">${numberDisplay}</text>

  <!-- Card Name -->
  <text x="150" y="380" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="${card.name.length > 18 ? 13 : card.name.length > 14 ? 15 : 17}" fill="${COLORS.gold}" filter="url(#softglow)" letter-spacing="1.5">${card.name}</text>

  <!-- Subtle decorative line under name -->
  <line x1="80" y1="390" x2="220" y2="390" stroke="${COLORS.gold}" stroke-width="0.5" opacity="0.3" />

  <!-- Small stars scattered -->
  <circle cx="60" cy="140" r="1" fill="${COLORS.lavender}" opacity="0.4" />
  <circle cx="240" cy="180" r="1.2" fill="${COLORS.gold}" opacity="0.3" />
  <circle cx="80" cy="300" r="0.8" fill="${COLORS.pink}" opacity="0.3" />
  <circle cx="220" cy="120" r="1" fill="${COLORS.gold}" opacity="0.35" />
  <circle cx="100" cy="350" r="0.7" fill="${COLORS.lavender}" opacity="0.25" />
  <circle cx="200" cy="340" r="0.9" fill="${COLORS.gold}" opacity="0.3" />
</svg>`;
}

function generateCardBackSVG(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 450" width="300" height="450">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0.5" y2="1">
      <stop offset="0%" stop-color="${COLORS.midnight}" />
      <stop offset="40%" stop-color="${COLORS.indigo}" />
      <stop offset="100%" stop-color="${COLORS.deepPurple}" />
    </linearGradient>
    <radialGradient id="centerGlow" cx="50%" cy="50%" r="35%">
      <stop offset="0%" stop-color="${COLORS.gold}" stop-opacity="0.12" />
      <stop offset="100%" stop-color="transparent" />
    </radialGradient>
    <pattern id="bgPattern" width="30" height="30" patternUnits="userSpaceOnUse">
      <circle cx="15" cy="15" r="0.5" fill="${COLORS.gold}" opacity="0.15" />
      <circle cx="0" cy="0" r="0.3" fill="${COLORS.lavender}" opacity="0.1" />
      <circle cx="30" cy="30" r="0.3" fill="${COLORS.lavender}" opacity="0.1" />
    </pattern>
    <filter id="glow">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="300" height="450" rx="12" fill="url(#bg)" />
  <rect width="300" height="450" rx="12" fill="url(#bgPattern)" />
  <rect width="300" height="450" rx="12" fill="url(#centerGlow)" />

  <!-- Outer border -->
  <rect x="8" y="8" width="284" height="434" rx="8" fill="none" stroke="${COLORS.gold}" stroke-width="1.5" opacity="0.5" />
  <rect x="14" y="14" width="272" height="422" rx="6" fill="none" stroke="${COLORS.gold}" stroke-width="0.5" opacity="0.25" />

  <!-- Ornate diamond frame -->
  <rect x="40" y="60" width="220" height="330" rx="4" fill="none" stroke="${COLORS.gold}" stroke-width="0.8" opacity="0.3" transform="rotate(0,150,225)" />

  <!-- Sacred geometry: concentric circles -->
  <circle cx="150" cy="225" r="90" fill="none" stroke="${COLORS.gold}" stroke-width="0.5" opacity="0.2" />
  <circle cx="150" cy="225" r="70" fill="none" stroke="${COLORS.lavender}" stroke-width="0.5" opacity="0.2" />
  <circle cx="150" cy="225" r="50" fill="none" stroke="${COLORS.gold}" stroke-width="0.8" opacity="0.3" />

  <!-- 8-pointed star (DaoJai motif) -->
  <g transform="translate(150,225)" filter="url(#glow)" opacity="0.8">
    <!-- Outer star -->
    <polygon points="0,-45 12,-12 45,-12 18,8 28,45 0,22 -28,45 -18,8 -45,-12 -12,-12" fill="none" stroke="${COLORS.gold}" stroke-width="1.2" />
    <!-- Inner star (rotated 22.5°) -->
    <polygon points="0,-35 9,-9 35,-9 14,6 22,35 0,17 -22,35 -14,6 -35,-9 -9,-9" fill="${COLORS.gold}" opacity="0.08" stroke="${COLORS.gold}" stroke-width="0.6" transform="rotate(22.5)" />
    <!-- Center point -->
    <circle r="5" fill="${COLORS.gold}" opacity="0.5" />
    <circle r="8" fill="none" stroke="${COLORS.lavender}" stroke-width="0.5" opacity="0.5" />
  </g>

  <!-- Thai-inspired lotus petals around star -->
  <g transform="translate(150,225)" opacity="0.3" fill="none" stroke="${COLORS.pink}">
    ${[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => `<path d="M0,0 Q12,-60 0,-75 Q-12,-60 0,0" transform="rotate(${angle})" stroke-width="0.6" />`).join("\n    ")}
  </g>

  <!-- Corner lotus/floral ornaments -->
  <g opacity="0.4" fill="${COLORS.gold}">
    <g transform="translate(30,35)">
      <path d="M0,-8 Q4,-4 0,0 Q-4,-4 0,-8" /><path d="M0,0 Q4,4 0,8 Q-4,4 0,0" /><path d="M-8,0 Q-4,-4 0,0 Q-4,4 -8,0" /><path d="M0,0 Q4,-4 8,0 Q4,4 0,0" />
    </g>
    <g transform="translate(270,35)">
      <path d="M0,-8 Q4,-4 0,0 Q-4,-4 0,-8" /><path d="M0,0 Q4,4 0,8 Q-4,4 0,0" /><path d="M-8,0 Q-4,-4 0,0 Q-4,4 -8,0" /><path d="M0,0 Q4,-4 8,0 Q4,4 0,0" />
    </g>
    <g transform="translate(30,415)">
      <path d="M0,-8 Q4,-4 0,0 Q-4,-4 0,-8" /><path d="M0,0 Q4,4 0,8 Q-4,4 0,0" /><path d="M-8,0 Q-4,-4 0,0 Q-4,4 -8,0" /><path d="M0,0 Q4,-4 8,0 Q4,4 0,0" />
    </g>
    <g transform="translate(270,415)">
      <path d="M0,-8 Q4,-4 0,0 Q-4,-4 0,-8" /><path d="M0,0 Q4,4 0,8 Q-4,4 0,0" /><path d="M-8,0 Q-4,-4 0,0 Q-4,4 -8,0" /><path d="M0,0 Q4,-4 8,0 Q4,4 0,0" />
    </g>
  </g>

  <!-- DaoJai text -->
  <text x="150" y="360" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="14" fill="${COLORS.gold}" opacity="0.5" letter-spacing="4" filter="url(#glow)">DAO JAI</text>

  <!-- Decorative line -->
  <line x1="100" y1="370" x2="200" y2="370" stroke="${COLORS.gold}" stroke-width="0.5" opacity="0.25" />

  <!-- Small scattered stars -->
  <circle cx="55" cy="100" r="0.8" fill="${COLORS.lavender}" opacity="0.3" />
  <circle cx="245" cy="120" r="0.6" fill="${COLORS.gold}" opacity="0.25" />
  <circle cx="70" cy="350" r="0.7" fill="${COLORS.pink}" opacity="0.2" />
  <circle cx="230" cy="330" r="0.9" fill="${COLORS.gold}" opacity="0.3" />
  <circle cx="50" cy="250" r="0.5" fill="${COLORS.lavender}" opacity="0.2" />
  <circle cx="250" cy="200" r="0.6" fill="${COLORS.gold}" opacity="0.2" />
</svg>`;
}

// ─── Batch Processing ───────────────────────────────────────────────────────

async function processInBatches<T, R>(
  items: T[],
  fn: (item: T) => Promise<R>,
  concurrency: number,
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let index = 0;

  async function worker() {
    while (index < items.length) {
      const i = index++;
      results[i] = await fn(items[i]);
    }
  }

  const workers = Array.from({ length: Math.min(concurrency, items.length) }, () => worker());
  await Promise.all(workers);
  return results;
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function main() {
  mkdirSync(OUTPUT_DIR, { recursive: true });

  // Check what already exists
  const existing = new Set(readdirSync(OUTPUT_DIR));
  const allNeeded = [...ALL_CARDS.map((c) => c.filename), "card-back"];
  const missing = allNeeded.filter(
    (f) => !existing.has(`${f}.png`) && !existing.has(`${f}.svg`),
  );

  if (missing.length === 0) {
    console.log("✅ All 79 card images already exist. Nothing to generate.");
    return;
  }

  console.log(`📦 Need to generate ${missing.length} card images.`);

  const missingCards = ALL_CARDS.filter(
    (c) => !existing.has(`${c.filename}.png`) && !existing.has(`${c.filename}.svg`),
  );
  const needCardBack =
    !existing.has("card-back.png") && !existing.has("card-back.svg");

  // Attempt AI generation
  let useAI = !!API_KEY;
  let aiSuccessCount = 0;

  if (useAI) {
    console.log("\n🤖 Attempting AI image generation via OpenRouter...");
    console.log(`   Model: ${MODEL}`);

    // Test with first card
    const startTime = Date.now();
    const testCard = missingCards[0];
    if (testCard) {
      console.log(`   Testing with: ${testCard.name}...`);
      const testResult = await generateCardAI(testCard);

      if (testResult && testResult.length > 1000) {
        const elapsed = Date.now() - startTime;
        console.log(`   ✅ Test succeeded (${(testResult.length / 1024).toFixed(1)}KB, ${(elapsed / 1000).toFixed(1)}s)`);
        writeFileSync(join(OUTPUT_DIR, `${testCard.filename}.png`), testResult);
        aiSuccessCount++;

        // Estimate total time
        const estimatedTotal = (elapsed / 1000) * (missingCards.length / CONCURRENCY);
        console.log(`   ⏱ Estimated total: ${(estimatedTotal / 60).toFixed(1)} minutes for ${missingCards.length} cards`);

        if (estimatedTotal > TOTAL_TIMEOUT_MS / 1000) {
          console.log("   ⚠ Too slow — switching to SVG placeholders for remaining cards.");
          useAI = false;
        }
      } else {
        console.log("   ❌ Test failed — using SVG placeholders.");
        useAI = false;
      }
    }
  } else {
    console.log("\n⚠ No OPENROUTER_API_KEY — using SVG placeholders.");
  }

  if (useAI && missingCards.length > 1) {
    console.log("\n🎨 Generating remaining cards via AI...");
    const remainingCards = missingCards.slice(1); // first already done
    const batchStartTime = Date.now();
    let svgFallbackCount = 0;

    const results = await processInBatches(
      remainingCards,
      async (card) => {
        // Check if we've exceeded the first batch timeout
        if (Date.now() - batchStartTime > FIRST_BATCH_TIMEOUT_MS) {
          return { card, data: null, timedOut: true };
        }
        const data = await generateCardAI(card);
        return { card, data, timedOut: false };
      },
      CONCURRENCY,
    );

    let sawTimeout = false;
    for (const { card, data, timedOut } of results) {
      if (timedOut || !data || data.length < 1000) {
        if (timedOut && !sawTimeout) {
          console.log("\n   ⏱ Batch timeout reached — switching to SVG for remaining cards.");
          sawTimeout = true;
        }
        // SVG fallback
        const svg = generateSVGPlaceholder(card);
        writeFileSync(join(OUTPUT_DIR, `${card.filename}.svg`), svg);
        svgFallbackCount++;
      } else {
        writeFileSync(join(OUTPUT_DIR, `${card.filename}.png`), data);
        aiSuccessCount++;
      }
    }

    console.log(`   AI: ${aiSuccessCount} | SVG fallback: ${svgFallbackCount}`);
  }

  // Generate SVG for any remaining cards not yet handled
  if (!useAI) {
    console.log("\n🖼 Generating SVG placeholders...");
    for (const card of missingCards) {
      const pngPath = join(OUTPUT_DIR, `${card.filename}.png`);
      const svgPath = join(OUTPUT_DIR, `${card.filename}.svg`);
      if (!existsSync(pngPath) && !existsSync(svgPath)) {
        const svg = generateSVGPlaceholder(card);
        writeFileSync(svgPath, svg);
      }
    }
    console.log(`   Generated ${missingCards.length} SVG placeholders.`);
  }

  // Card back
  if (needCardBack) {
    let cardBackDone = false;
    if (useAI) {
      console.log("\n🎴 Generating card back via AI...");
      const backData = await generateCardBackAI();
      if (backData && backData.length > 1000) {
        writeFileSync(join(OUTPUT_DIR, "card-back.png"), backData);
        console.log("   ✅ Card back generated (AI).");
        cardBackDone = true;
      }
    }
    if (!cardBackDone) {
      const svg = generateCardBackSVG();
      writeFileSync(join(OUTPUT_DIR, "card-back.svg"), svg);
      console.log("   🖼 Card back generated (SVG).");
    }
  }

  // Summary
  const files = readdirSync(OUTPUT_DIR);
  const pngCount = files.filter((f) => f.endsWith(".png")).length;
  const svgCount = files.filter((f) => f.endsWith(".svg")).length;
  console.log(`\n✅ Done! ${pngCount} PNGs + ${svgCount} SVGs = ${pngCount + svgCount} total files in src/assets/tarot/`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
