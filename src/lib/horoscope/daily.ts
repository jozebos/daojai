import { pickDeterministic, hashString } from "../utils/hash";
import { type DateInput, getDateParts, toDateKey } from "../utils/date";
import { getThaiDayFortune } from "../astrology/thai-day";
import {
  getWesternZodiacSign,
  getWesternZodiacSignByKey,
  type WesternElement,
  type WesternZodiacResult,
  type ZodiacSignKey,
} from "../astrology/zodiac";
import {
  HOROSCOPE_ADVICE_TEMPLATES,
  HOROSCOPE_CATEGORY_LABELS,
  HOROSCOPE_CATEGORY_TEMPLATES,
  HOROSCOPE_OVERVIEW_TEMPLATES,
  type HoroscopeCategory,
  type HoroscopeScore,
} from "./templates";

export interface DailyHoroscopeScores {
  love: HoroscopeScore;
  career: HoroscopeScore;
  money: HoroscopeScore;
  health: HoroscopeScore;
  luck: HoroscopeScore;
}

export interface DailyHoroscope {
  sign: ZodiacSignKey;
  signNameTh: string;
  date: string;
  scores: DailyHoroscopeScores;
  categoryMessages: Record<HoroscopeCategory, string>;
  luckyColor: string;
  luckyNumber: number;
  luckyDirection: string;
  overviewText: string;
  adviceText: string;
}

const CATEGORY_ORDER: readonly HoroscopeCategory[] = [
  "love",
  "career",
  "money",
  "health",
  "luck",
] as const;

const ELEMENT_CATEGORY_BIAS: Record<WesternElement, Record<HoroscopeCategory, number>> = {
  fire: {
    love: 0,
    career: 2,
    money: 0,
    health: -1,
    luck: 2,
  },
  earth: {
    love: 0,
    career: 1,
    money: 2,
    health: 2,
    luck: 0,
  },
  air: {
    love: 1,
    career: 2,
    money: 0,
    health: -1,
    luck: 1,
  },
  water: {
    love: 2,
    career: 0,
    money: 0,
    health: 1,
    luck: 1,
  },
};

const LUCKY_COLORS_BY_ELEMENT: Record<WesternElement, readonly string[]> = {
  fire: ["แดง", "ทอง", "ส้ม", "ชมพูพีช"],
  earth: ["ครีม", "น้ำตาลอ่อน", "เขียวมะกอก", "ทองอมทราย"],
  air: ["ฟ้า", "เหลืองอ่อน", "ลาเวนเดอร์", "เงิน"],
  water: ["น้ำเงิน", "ขาว", "มิ้นต์", "เทาเงิน"],
};

const LUCKY_DIRECTIONS_BY_ELEMENT: Record<WesternElement, readonly string[]> = {
  fire: ["ทิศใต้", "ทิศตะวันออก", "ทิศตะวันออกเฉียงใต้"],
  earth: ["ทิศตะวันตกเฉียงใต้", "ทิศตะวันตก", "ทิศตะวันออกเฉียงเหนือ"],
  air: ["ทิศตะวันตก", "ทิศเหนือ", "ทิศตะวันตกเฉียงเหนือ"],
  water: ["ทิศเหนือ", "ทิศตะวันออกเฉียงเหนือ", "ทิศตะวันออก"],
};

function toHoroscopeScore(value: number): HoroscopeScore {
  if (value >= 5) {
    return 5;
  }

  if (value <= 1) {
    return 1;
  }

  return value as HoroscopeScore;
}

function resolveSign(
  input: ZodiacSignKey | WesternZodiacResult,
): WesternZodiacResult {
  if (typeof input === "string") {
    return {
      ...getWesternZodiacSignByKey(input),
      cusp: {
        isCusp: false,
      },
    };
  }

  return input;
}

function calculateCategoryScore(
  sign: WesternZodiacResult,
  dateKey: string,
  weekday: number,
  category: HoroscopeCategory,
): HoroscopeScore {
  const base = hashString(`${sign.key}-${dateKey}-${category}`) % 100;
  const categoryIndex = CATEGORY_ORDER.indexOf(category);
  const weekdayShift = ((weekday + categoryIndex * 2) % 5) - 2;
  const bias = ELEMENT_CATEGORY_BIAS[sign.element][category] * 8;
  const adjusted = Math.max(0, Math.min(99, base + bias + weekdayShift * 5));

  return toHoroscopeScore(Math.floor(adjusted / 20) + 1);
}

function getOverallScore(scores: DailyHoroscopeScores): HoroscopeScore {
  const total = CATEGORY_ORDER.reduce((sum, category) => sum + scores[category], 0);
  return toHoroscopeScore(Math.round(total / CATEGORY_ORDER.length));
}

function buildCategoryMessages(
  sign: WesternZodiacResult,
  dateKey: string,
  scores: DailyHoroscopeScores,
): Record<HoroscopeCategory, string> {
  const messages = {} as Record<HoroscopeCategory, string>;

  for (const category of CATEGORY_ORDER) {
    const variants = HOROSCOPE_CATEGORY_TEMPLATES[category][scores[category]];
    messages[category] = pickDeterministic(
      variants,
      `${sign.key}-${dateKey}-${category}-message`,
    );
  }

  return messages;
}

function getBestCategory(scores: DailyHoroscopeScores): HoroscopeCategory {
  return CATEGORY_ORDER.reduce((best, current) =>
    scores[current] > scores[best] ? current : best,
  );
}

function getFocusCategory(scores: DailyHoroscopeScores): HoroscopeCategory {
  return CATEGORY_ORDER.reduce((lowest, current) =>
    scores[current] < scores[lowest] ? current : lowest,
  );
}

export function generateDailyHoroscope(
  signInput: ZodiacSignKey | WesternZodiacResult,
  date: DateInput,
): DailyHoroscope {
  const sign = resolveSign(signInput);
  const dateKey = toDateKey(date);
  const { weekday } = getDateParts(date);
  const thaiDay = getThaiDayFortune(date);

  const scores: DailyHoroscopeScores = {
    love: calculateCategoryScore(sign, dateKey, weekday, "love"),
    career: calculateCategoryScore(sign, dateKey, weekday, "career"),
    money: calculateCategoryScore(sign, dateKey, weekday, "money"),
    health: calculateCategoryScore(sign, dateKey, weekday, "health"),
    luck: calculateCategoryScore(sign, dateKey, weekday, "luck"),
  };

  const overallScore = getOverallScore(scores);
  const categoryMessages = buildCategoryMessages(sign, dateKey, scores);
  const bestCategory = getBestCategory(scores);
  const focusCategory = getFocusCategory(scores);
  const colorPool = Array.from(
    new Set([
      ...LUCKY_COLORS_BY_ELEMENT[sign.element],
      ...thaiDay.auspiciousColors,
    ]),
  );

  const luckyColor = pickDeterministic(colorPool, `${sign.key}-${dateKey}-color`);
  const luckyDirection = pickDeterministic(
    LUCKY_DIRECTIONS_BY_ELEMENT[sign.element],
    `${sign.key}-${dateKey}-direction`,
  );
  const luckyNumber = (hashString(`${sign.key}-${dateKey}-number`) % 99) + 1;
  const overviewLead = pickDeterministic(
    HOROSCOPE_OVERVIEW_TEMPLATES[overallScore],
    `${sign.key}-${dateKey}-overview`,
  );
  const adviceLead = pickDeterministic(
    HOROSCOPE_ADVICE_TEMPLATES[overallScore],
    `${sign.key}-${dateKey}-advice`,
  );

  const overviewText = `${overviewLead} เรื่อง${HOROSCOPE_CATEGORY_LABELS[bestCategory]}เด่นเป็นพิเศษ — ${categoryMessages[bestCategory]}`;
  const adviceText = `${adviceLead} ถ้าวันนี้จะโฟกัสเพิ่มอีกนิด ลองดูเรื่อง${HOROSCOPE_CATEGORY_LABELS[focusCategory]} — ${categoryMessages[focusCategory]}`;

  return {
    sign: sign.key,
    signNameTh: sign.name_th,
    date: dateKey,
    scores,
    categoryMessages,
    luckyColor,
    luckyNumber,
    luckyDirection,
    overviewText,
    adviceText,
  };
}

export function generateDailyHoroscopeFromBirthDate(
  birthDate: DateInput,
  date: DateInput,
): DailyHoroscope {
  return generateDailyHoroscope(getWesternZodiacSign(birthDate), date);
}
