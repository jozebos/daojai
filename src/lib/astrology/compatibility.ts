import type { DateInput } from "../utils/date";
import {
  getChineseElementRelation,
  getChineseZodiac,
  isChineseZodiacClash,
  isChineseZodiacHarm,
  isChineseZodiacPunishment,
  isChineseZodiacTrine,
  type ChineseElementRelation,
  type ChineseZodiacProfile,
} from "./chinese-zodiac";
import {
  calculateLifePathNumber,
  isMasterNumber,
  normalizeLifePathNumber,
  type BaseLifePathNumber,
  type LifePathNumber,
} from "./numerology";
import {
  getThaiDayFortune,
  type ThaiDayFortune,
  type ThaiDayKey,
} from "./thai-day";
import {
  getWesternZodiacSign,
  type WesternElement,
  type WesternZodiacResult,
} from "./zodiac";

export interface CompatibilityPersonInput {
  birthDate: DateInput;
  bornAtNight?: boolean;
  label?: string;
}

export type CompatibilitySystemKey =
  | "thaiDay"
  | "chineseAnimal"
  | "chineseElement"
  | "westernElement"
  | "numerology";

export type CompatibilityTierKey =
  | "soulmate"
  | "high-match"
  | "good-match"
  | "mixed"
  | "neutral"
  | "challenging"
  | "tough";

export interface CompatibilityProfile {
  birthDate: DateInput;
  thaiDay: ThaiDayFortune;
  westernSign: WesternZodiacResult;
  chineseZodiac: ChineseZodiacProfile;
  lifePathNumber: LifePathNumber;
}

export interface CompatibilityBreakdownEntry {
  score: number;
  weight: number;
  label: string;
  insight: string;
}

export interface CompatibilityTier {
  key: CompatibilityTierKey;
  emoji: string;
  label: string;
  description: string;
}

export interface CompatibilityResult {
  overall: number;
  tier: CompatibilityTier;
  breakdown: Record<CompatibilitySystemKey, CompatibilityBreakdownEntry>;
  greenFlags: string[];
  redFlags: string[];
  advice: string;
  profiles: {
    personA: CompatibilityProfile;
    personB: CompatibilityProfile;
  };
}

type ThaiDayRelation = "mitr" | "sahai" | "same" | "neutral" | "challenging";
type NumerologyRelation = "master" | "same" | "best" | "neutral" | "challenging";

const COMPATIBILITY_WEIGHTS: Record<CompatibilitySystemKey, number> = {
  thaiDay: 0.25,
  chineseAnimal: 0.2,
  chineseElement: 0.1,
  westernElement: 0.25,
  numerology: 0.2,
};

const THAI_DAY_RELATION_SCORES: Record<ThaiDayRelation, number> = {
  mitr: 85,
  sahai: 90,
  same: 60,
  neutral: 55,
  challenging: 30,
};

const THAI_DAY_RELATION_LABELS: Record<ThaiDayRelation, string> = {
  mitr: "มิตร",
  sahai: "สหาย",
  same: "เสมอ",
  neutral: "ศูนย์",
  challenging: "ศัตรู",
};

const THAI_DAY_MATRIX: Record<ThaiDayKey, Record<ThaiDayKey, ThaiDayRelation>> = {
  sunday: {
    sunday: "same",
    monday: "mitr",
    tuesday: "challenging",
    wednesday: "neutral",
    thursday: "mitr",
    friday: "sahai",
    saturday: "challenging",
  },
  monday: {
    sunday: "mitr",
    monday: "same",
    tuesday: "challenging",
    wednesday: "mitr",
    thursday: "sahai",
    friday: "neutral",
    saturday: "challenging",
  },
  tuesday: {
    sunday: "challenging",
    monday: "challenging",
    tuesday: "same",
    wednesday: "neutral",
    thursday: "challenging",
    friday: "mitr",
    saturday: "sahai",
  },
  wednesday: {
    sunday: "neutral",
    monday: "mitr",
    tuesday: "neutral",
    wednesday: "same",
    thursday: "challenging",
    friday: "mitr",
    saturday: "neutral",
  },
  thursday: {
    sunday: "mitr",
    monday: "sahai",
    tuesday: "challenging",
    wednesday: "challenging",
    thursday: "same",
    friday: "neutral",
    saturday: "mitr",
  },
  friday: {
    sunday: "sahai",
    monday: "neutral",
    tuesday: "mitr",
    wednesday: "mitr",
    thursday: "neutral",
    friday: "same",
    saturday: "challenging",
  },
  saturday: {
    sunday: "challenging",
    monday: "challenging",
    tuesday: "sahai",
    wednesday: "neutral",
    thursday: "mitr",
    friday: "challenging",
    saturday: "same",
  },
};

const WESTERN_ELEMENT_MATRIX: Record<WesternElement, Record<WesternElement, number>> = {
  fire: {
    fire: 82,
    earth: 64,
    air: 90,
    water: 48,
  },
  earth: {
    fire: 64,
    earth: 82,
    air: 52,
    water: 90,
  },
  air: {
    fire: 90,
    earth: 52,
    air: 82,
    water: 58,
  },
  water: {
    fire: 48,
    earth: 90,
    air: 58,
    water: 82,
  },
};

const NUMEROLOGY_BEST_MATCHES: Record<BaseLifePathNumber, readonly BaseLifePathNumber[]> = {
  1: [3, 5, 6],
  2: [4, 6, 8],
  3: [1, 5, 6],
  4: [2, 7, 8],
  5: [1, 3, 7],
  6: [2, 3, 8, 9],
  7: [4, 5],
  8: [2, 4, 6],
  9: [3, 6],
};

const NUMEROLOGY_CHALLENGING_MATCHES: Record<BaseLifePathNumber, readonly BaseLifePathNumber[]> = {
  1: [4, 7],
  2: [1, 5],
  3: [4, 7],
  4: [3, 5],
  5: [2, 4],
  6: [4, 5],
  7: [1, 3, 8],
  8: [1, 5],
  9: [4, 7, 8],
};

function clampScore(score: number): number {
  return Math.max(0, Math.min(100, Math.round(score)));
}

function buildCompatibilityProfile(input: CompatibilityPersonInput): CompatibilityProfile {
  return {
    birthDate: input.birthDate,
    thaiDay: getThaiDayFortune(input.birthDate),
    westernSign: getWesternZodiacSign(input.birthDate),
    chineseZodiac: getChineseZodiac(input.birthDate),
    lifePathNumber: calculateLifePathNumber(input.birthDate),
  };
}

function getThaiDayCompatibility(
  dayA: ThaiDayKey,
  dayB: ThaiDayKey,
): CompatibilityBreakdownEntry {
  const relation = THAI_DAY_MATRIX[dayA][dayB];
  const label = THAI_DAY_RELATION_LABELS[relation];
  const score = THAI_DAY_RELATION_SCORES[relation];

  const insightMap: Record<ThaiDayRelation, string> = {
    sahai: "จังหวะชีวิตช่วยกันประคองดี เหมือนอีกคนเติมในจุดที่อีกคนขาด",
    mitr: "เคมีรายวันค่อนข้างเข้ากัน คุยกันแล้วไปต่อได้ไม่ยาก",
    same: "คล้ายกันมากจนเข้าใจกันไว แต่ถ้าดื้อพร้อมกันก็อาจชนกันเองได้",
    neutral: "ความสัมพันธ์นี้อยู่กลาง ๆ ต้องอาศัยการคุยให้ชัดถึงจะไหลลื่น",
    challenging: "จังหวะพื้นฐานค่อนข้างสวนกัน ควรเว้นที่ว่างและเช็กความรู้สึกกันบ่อย ๆ",
  };

  return {
    score,
    weight: COMPATIBILITY_WEIGHTS.thaiDay,
    label,
    insight: insightMap[relation],
  };
}

function getChineseAnimalCompatibility(
  profileA: ChineseZodiacProfile,
  profileB: ChineseZodiacProfile,
): CompatibilityBreakdownEntry {
  const animalA = profileA.animal.key;
  const animalB = profileB.animal.key;

  if (animalA === animalB) {
    return {
      score: 70,
      weight: COMPATIBILITY_WEIGHTS.chineseAnimal,
      label: "ปีเดียวกัน",
      insight: "ไลฟ์สไตล์และแรงขับพื้นฐานคล้ายกัน เลยเข้าใจกันเร็วแต่ก็สะท้อนกันแรงเหมือนกัน",
    };
  }

  if (isChineseZodiacTrine(animalA, animalB)) {
    return {
      score: 95,
      weight: COMPATIBILITY_WEIGHTS.chineseAnimal,
      label: "สามมิตร",
      insight: "ดวงปีเกิดหนุนกันดี เป็นคู่ที่ส่งพลังบวกและช่วยกันโตได้ง่าย",
    };
  }

  if (isChineseZodiacClash(animalA, animalB)) {
    return {
      score: 25,
      weight: COMPATIBILITY_WEIGHTS.chineseAnimal,
      label: "คู่ปะทะ",
      insight: "แรงขับตามปีเกิดค่อนข้างชนกัน ต้องสื่อสารเรื่องพื้นที่ส่วนตัวและจังหวะชีวิตให้ชัด",
    };
  }

  if (isChineseZodiacHarm(animalA, animalB)) {
    return {
      score: 40,
      weight: COMPATIBILITY_WEIGHTS.chineseAnimal,
      label: "คู่ทำลาย",
      insight: "มีโอกาสเผลอสะสมเรื่องเล็กจนกลายเป็นแผลใจ ถ้าคุยเร็วจะเซฟความรู้สึกกันได้มาก",
    };
  }

  if (isChineseZodiacPunishment(animalA, animalB)) {
    return {
      score: 45,
      weight: COMPATIBILITY_WEIGHTS.chineseAnimal,
      label: "คู่โทษ",
      insight: "บางมุมอาจไปแตะ trigger กันง่าย ต้องค่อย ๆ เรียนรู้วิธีง้อและวิธีพักกันอย่างนุ่มนวล",
    };
  }

  return {
    score: 65,
    weight: COMPATIBILITY_WEIGHTS.chineseAnimal,
    label: "กลาง ๆ",
    insight: "ปีเกิดไม่ได้หนุนหรือดึงมากนัก ความเข้ากันจะขึ้นกับการเลือกดูแลกันในชีวิตจริง",
  };
}

function getChineseElementCompatibility(
  relation: ChineseElementRelation,
): CompatibilityBreakdownEntry {
  const relationMap: Record<ChineseElementRelation, CompatibilityBreakdownEntry> = {
    same: {
      score: 78,
      weight: COMPATIBILITY_WEIGHTS.chineseElement,
      label: "ธาตุเดียวกัน",
      insight: "พลังชีวิตใกล้เคียงกัน เลยอ่านกันง่ายและจับจังหวะกันค่อนข้างไว",
    },
    generating: {
      score: 88,
      weight: COMPATIBILITY_WEIGHTS.chineseElement,
      label: "ธาตุหนุนกัน",
      insight: "ธาตุของคู่นี้ช่วยส่งกันต่อ ทำให้เวลาร่วมมือกันมักเห็นพลังบวกชัด",
    },
    balanced: {
      score: 68,
      weight: COMPATIBILITY_WEIGHTS.chineseElement,
      label: "ธาตุสมดุล",
      insight: "ต่างกันพอให้เรียนรู้กันได้ ถ้าเปิดใจฟังอีกฝั่งจะกลายเป็นคู่ที่บาลานซ์ดี",
    },
    controlling: {
      score: 42,
      weight: COMPATIBILITY_WEIGHTS.chineseElement,
      label: "ธาตุกดกัน",
      insight: "มีแนวโน้มเผลอควบคุมหรือกดจังหวะกัน ต้องตั้งขอบเขตและพูดให้ตรงแต่ไม่แรงเกิน",
    },
  };

  return relationMap[relation];
}

function getWesternElementCompatibility(
  elementA: WesternElement,
  elementB: WesternElement,
): CompatibilityBreakdownEntry {
  const score = WESTERN_ELEMENT_MATRIX[elementA][elementB];

  if (elementA === elementB) {
    return {
      score,
      weight: COMPATIBILITY_WEIGHTS.westernElement,
      label: "ธาตุเดียวกัน",
      insight: "รสนิยมและวิธีตอบสนองต่อโลกคล้ายกัน เลยเข้าใจกันไวแบบไม่ต้องแปลเยอะ",
    };
  }

  if (
    (elementA === "fire" && elementB === "air") ||
    (elementA === "air" && elementB === "fire") ||
    (elementA === "water" && elementB === "earth") ||
    (elementA === "earth" && elementB === "water")
  ) {
    return {
      score,
      weight: COMPATIBILITY_WEIGHTS.westernElement,
      label: "ธาตุเสริมกัน",
      insight: "ต่างสไตล์แต่ส่งกันดี คนหนึ่งจุดไฟ อีกคนช่วยต่อยอดให้เป็นรูปเป็นร่าง",
    };
  }

  if (
    (elementA === "fire" && elementB === "water") ||
    (elementA === "water" && elementB === "fire")
  ) {
    return {
      score,
      weight: COMPATIBILITY_WEIGHTS.westernElement,
      label: "ธาตุตีกันแรง",
      insight: "คนนึงพุ่ง คนนึงซึมลึก ถ้าไม่จูนจังหวะอาจรู้สึกว่าอีกฝ่ายไม่เข้าใจกันจริง ๆ",
    };
  }

  if (
    (elementA === "earth" && elementB === "air") ||
    (elementA === "air" && elementB === "earth")
  ) {
    return {
      score,
      weight: COMPATIBILITY_WEIGHTS.westernElement,
      label: "ธาตุคนละภาษา",
      insight: "คนหนึ่งเน้นความจริงจับต้องได้ อีกคนเน้นไอเดียและอิสระ ต้องแปลใจให้กันเยอะหน่อย",
    };
  }

  return {
    score,
    weight: COMPATIBILITY_WEIGHTS.westernElement,
    label: "ธาตุต่างกันพอดี",
    insight: "มีความต่างที่ทำให้เรียนรู้กันได้ ถ้าไม่รีบตัดสินอีกฝ่ายเร็วเกินไป ความสัมพันธ์จะน่าสนใจมาก",
  };
}

function getNumerologyCompatibility(
  numberA: LifePathNumber,
  numberB: LifePathNumber,
): CompatibilityBreakdownEntry {
  const baseA = normalizeLifePathNumber(numberA);
  const baseB = normalizeLifePathNumber(numberB);

  let relation: NumerologyRelation = "neutral";
  let score = 67;

  if (numberA === numberB && isMasterNumber(numberA) && isMasterNumber(numberB)) {
    relation = "master";
    score = 92;
  } else if (baseA === baseB) {
    relation = "same";
    score = 72;
  } else if (NUMEROLOGY_BEST_MATCHES[baseA].includes(baseB)) {
    relation = "best";
    score = 88;
  } else if (NUMEROLOGY_CHALLENGING_MATCHES[baseA].includes(baseB)) {
    relation = "challenging";
    score = 46;
  }

  const labelMap: Record<NumerologyRelation, string> = {
    master: "มาสเตอร์นัมเบอร์ตรงกัน",
    same: "เลขจังหวะคล้ายกัน",
    best: "เลขส่งเสริมกัน",
    neutral: "เลขกลาง ๆ",
    challenging: "เลขต้องปรับจูน",
  };

  const insightMap: Record<NumerologyRelation, string> = {
    master: "พลังชีวิตระดับลึกสอดคล้องกันมาก เป็นคู่ที่เข้าใจกันแบบไม่ต้องพูดครบทุกคำ",
    same: "วิธีคิดพื้นฐานคล้ายกัน เลยเข้าใจเหตุผลกันง่าย แต่อาจติดลูปเดิมพร้อมกันได้",
    best: "เลขชีวิตหนุนกันดี คนหนึ่งพาเริ่ม อีกคนช่วยต่อยอดหรือประคองให้ไปไกลขึ้น",
    neutral: "เลขชีวิตไม่ได้ชนหรือหนุนชัดเจน ความสัมพันธ์จึงไปได้ตามวิธีดูแลกันจริง ๆ",
    challenging: "วิธีมองโลกต่างกันพอสมควร ต้องคุยเรื่องความคาดหวังให้ตรงตั้งแต่ต้นจะช่วยมาก",
  };

  return {
    score,
    weight: COMPATIBILITY_WEIGHTS.numerology,
    label: labelMap[relation],
    insight: insightMap[relation],
  };
}

function getCompatibilityTier(score: number): CompatibilityTier {
  if (score >= 90) {
    return {
      key: "soulmate",
      emoji: "💞",
      label: "Soulmate",
      description: "เข้ากันได้แรงแบบเหมือนจักรวาลช่วยจูนคลื่นให้แล้ว",
    };
  }

  if (score >= 80) {
    return {
      key: "high-match",
      emoji: "🥰",
      label: "High Match",
      description: "เคมีดีมาก ถ้ารักษาจังหวะนี้ไว้จะไปได้ไกล",
    };
  }

  if (score >= 70) {
    return {
      key: "good-match",
      emoji: "😊",
      label: "Good Match",
      description: "เข้ากันได้ดี มีบางจุดต้องปรับแต่ภาพรวมไปต่อสวย",
    };
  }

  if (score >= 60) {
    return {
      key: "mixed",
      emoji: "🤔",
      label: "Mixed",
      description: "มีทั้งจุดหวานและจุดท้าทาย ต้องอาศัยการคุยตรง ๆ",
    };
  }

  if (score >= 50) {
    return {
      key: "neutral",
      emoji: "😐",
      label: "Neutral",
      description: "กลาง ๆ ไม่ได้แย่แต่ต้องสร้างความเข้าใจเพิ่มเอง",
    };
  }

  if (score >= 40) {
    return {
      key: "challenging",
      emoji: "😰",
      label: "Challenging",
      description: "ต้องใช้ความเข้าใจสูง ถ้าจะไปต่อควรคุยเรื่อง expectation ให้ชัด",
    };
  }

  return {
    key: "tough",
    emoji: "💥",
    label: "Tough",
    description: "เคมีพื้นฐานค่อนข้างชนกัน แต่ไม่ใช่ไปต่อไม่ได้ แค่ต้องตั้งใจดูแลกันมากกว่าปกติ",
  };
}

function createFlagText(
  system: CompatibilitySystemKey,
  entry: CompatibilityBreakdownEntry,
  mode: "green" | "red",
): string {
  if (mode === "green") {
    const greenMap: Record<CompatibilitySystemKey, string> = {
      thaiDay: "จังหวะประจำวันคุยกันง่าย เวลาชีวิตเร่งยังหาจุดลงกลางได้ไว",
      chineseAnimal: "ปีเกิดส่งพลังเข้าหากัน ทำให้ความสัมพันธ์มีแรงสนับสนุนตามธรรมชาติ",
      chineseElement: "ธาตุจีนช่วยกันเสริม mood และแรงขับ เลยไปด้วยกันได้ลื่นขึ้น",
      westernElement: "สไตล์ใช้ชีวิตแบบราศีช่วยต่อกันดี คนหนึ่งเป็นพลังให้อีกคนเติบโต",
      numerology: "เลขชีวิตหนุนกันชัด เรื่องเป้าหมายและบทเรียนเลยเข้าใจกันได้ลึก",
    };

    return greenMap[system];
  }

  const redMap: Record<CompatibilitySystemKey, string> = {
    thaiDay: `พื้นฐานวันเกิดให้พลังแบบ${entry.label} ควรคุยเรื่องจังหวะชีวิตและพื้นที่ส่วนตัวให้ชัด`,
    chineseAnimal: `ปีเกิดให้โจทย์แบบ${entry.label} ถ้ามีเรื่องค้างคาอย่าปล่อยให้เดาใจกันเอง`,
    chineseElement: `ธาตุจีนมีโหมด${entry.label} เลยต้องระวังการเผลอควบคุมหรือรับแรงกันแรงไป`,
    westernElement: `ธาตุราศีออกแนว${entry.label} ควรฟังภาษาความรักของกันและกันมากขึ้น`,
    numerology: `เลขชีวิตมีบทเรียนแบบ${entry.label} ถ้าจะไปต่อให้ตั้งกติกาเรื่องความคาดหวังตั้งแต่ต้น`,
  };

  return redMap[system];
}

export function calculateCompatibility(
  personA: CompatibilityPersonInput,
  personB: CompatibilityPersonInput,
): CompatibilityResult {
  const profileA = buildCompatibilityProfile(personA);
  const profileB = buildCompatibilityProfile(personB);

  const breakdown: Record<CompatibilitySystemKey, CompatibilityBreakdownEntry> = {
    thaiDay: getThaiDayCompatibility(profileA.thaiDay.key, profileB.thaiDay.key),
    chineseAnimal: getChineseAnimalCompatibility(profileA.chineseZodiac, profileB.chineseZodiac),
    chineseElement: getChineseElementCompatibility(
      getChineseElementRelation(
        profileA.chineseZodiac.element,
        profileB.chineseZodiac.element,
      ),
    ),
    westernElement: getWesternElementCompatibility(
      profileA.westernSign.element,
      profileB.westernSign.element,
    ),
    numerology: getNumerologyCompatibility(
      profileA.lifePathNumber,
      profileB.lifePathNumber,
    ),
  };

  const overall = clampScore(
    Object.values(breakdown).reduce(
      (total, entry) => total + entry.score * entry.weight,
      0,
    ),
  );

  const rankedEntries = (Object.entries(breakdown) as [
    CompatibilitySystemKey,
    CompatibilityBreakdownEntry,
  ][]).sort((entryA, entryB) => entryB[1].score - entryA[1].score);

  const greenFlags = rankedEntries
    .filter(([, entry]) => entry.score >= 80)
    .slice(0, 3)
    .map(([system, entry]) => createFlagText(system, entry, "green"));

  if (greenFlags.length === 0) {
    greenFlags.push(createFlagText(rankedEntries[0][0], rankedEntries[0][1], "green"));
  }

  const redFlags = rankedEntries
    .filter(([, entry]) => entry.score <= 55)
    .slice(-3)
    .map(([system, entry]) => createFlagText(system, entry, "red"));

  if (redFlags.length === 0) {
    redFlags.push("ภาพรวมไม่ได้มี red flag ชัด แต่ยังควรคุยกันตรง ๆ เรื่องสิ่งที่แต่ละคนต้องการ");
  }

  const strongest = rankedEntries[0][1];
  const weakest = rankedEntries[rankedEntries.length - 1][1];
  const tier = getCompatibilityTier(overall);

  const advice = `${tier.emoji} ภาพรวมคู่นี้อยู่ในโซน ${tier.label} — ${tier.description} จุดที่เด่นสุดคือ ${strongest.label.toLowerCase()} เพราะ ${strongest.insight.toLowerCase()} ส่วนมุมที่ต้องประคองเพิ่มคือ ${weakest.label.toLowerCase()} ลองใช้การคุยตรง ๆ แบบไม่ตัดสิน แล้วความสัมพันธ์นี้จะชัดขึ้นเยอะเลย`;

  return {
    overall,
    tier,
    breakdown,
    greenFlags,
    redFlags,
    advice,
    profiles: {
      personA: profileA,
      personB: profileB,
    },
  };
}
