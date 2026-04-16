import { type DateInput, getDateParts } from "../utils/date";

export type ChineseZodiacAnimalKey =
  | "rat"
  | "ox"
  | "tiger"
  | "rabbit"
  | "dragon"
  | "snake"
  | "horse"
  | "goat"
  | "monkey"
  | "rooster"
  | "dog"
  | "pig";

export type ChineseElement = "wood" | "fire" | "earth" | "metal" | "water";

export type ChineseElementRelation =
  | "same"
  | "generating"
  | "balanced"
  | "controlling";

export interface ChineseZodiacAnimal {
  key: ChineseZodiacAnimalKey;
  name_en: string;
  yearNameTh: string;
  animalNameTh: string;
  traits_th: readonly string[];
}

export interface ChineseZodiacProfile {
  animal: ChineseZodiacAnimal;
  element: ChineseElement;
  elementNameTh: string;
  effectiveYear: number;
  adjustedForApproximateLunarNewYear: boolean;
  cycleLabelTh: string;
}

const LUNAR_NEW_YEAR_APPROX_MONTH = 2;
const LUNAR_NEW_YEAR_APPROX_DAY = 4;

export const CHINESE_ELEMENT_NAMES_TH: Record<ChineseElement, string> = {
  wood: "ธาตุไม้",
  fire: "ธาตุไฟ",
  earth: "ธาตุดิน",
  metal: "ธาตุทอง",
  water: "ธาตุน้ำ",
};

export const CHINESE_ZODIAC_ANIMALS: readonly ChineseZodiacAnimal[] = [
  {
    key: "rat",
    name_en: "Rat",
    yearNameTh: "ชวด",
    animalNameTh: "หนู",
    traits_th: ["หัวไว", "เอาตัวรอดเก่ง", "มองโอกาสเป็น"],
  },
  {
    key: "ox",
    name_en: "Ox",
    yearNameTh: "ฉลู",
    animalNameTh: "วัว",
    traits_th: ["ขยัน", "มั่นคง", "ใจสู้แบบเงียบ ๆ"],
  },
  {
    key: "tiger",
    name_en: "Tiger",
    yearNameTh: "ขาล",
    animalNameTh: "เสือ",
    traits_th: ["กล้าชน", "รักอิสระ", "มีคาริสม่า"],
  },
  {
    key: "rabbit",
    name_en: "Rabbit",
    yearNameTh: "เถาะ",
    animalNameTh: "กระต่าย",
    traits_th: ["ละมุน", "เซนซิทีฟ", "คุยด้วยแล้วสบายใจ"],
  },
  {
    key: "dragon",
    name_en: "Dragon",
    yearNameTh: "มะโรง",
    animalNameTh: "มังกร",
    traits_th: ["ทะเยอทะยาน", "โดดเด่น", "ชอบสร้างอะไรใหญ่"],
  },
  {
    key: "snake",
    name_en: "Snake",
    yearNameTh: "มะเส็ง",
    animalNameTh: "งู",
    traits_th: ["คิดลึก", "อ่านเกมขาด", "มีเสน่ห์แบบนิ่ง ๆ"],
  },
  {
    key: "horse",
    name_en: "Horse",
    yearNameTh: "มะเมีย",
    animalNameTh: "ม้า",
    traits_th: ["รักอิสระ", "พลังเยอะ", "ตรงไปข้างหน้าเก่ง"],
  },
  {
    key: "goat",
    name_en: "Goat",
    yearNameTh: "มะแม",
    animalNameTh: "แพะ",
    traits_th: ["อ่อนโยน", "มีศิลปะ", "รับความรู้สึกคนเก่ง"],
  },
  {
    key: "monkey",
    name_en: "Monkey",
    yearNameTh: "วอก",
    animalNameTh: "ลิง",
    traits_th: ["คล่องตัว", "ไหวพริบดี", "แก้เกมไว"],
  },
  {
    key: "rooster",
    name_en: "Rooster",
    yearNameTh: "ระกา",
    animalNameTh: "ไก่",
    traits_th: ["ละเอียด", "มีวินัย", "ชอบความชัดเจน"],
  },
  {
    key: "dog",
    name_en: "Dog",
    yearNameTh: "จอ",
    animalNameTh: "หมา",
    traits_th: ["ซื่อสัตย์", "ปกป้องคนที่รัก", "จริงใจ"],
  },
  {
    key: "pig",
    name_en: "Pig",
    yearNameTh: "กุน",
    animalNameTh: "หมู",
    traits_th: ["ใจกว้าง", "ชอบความสบาย", "พร้อมแบ่งปัน"],
  },
] as const;

const ELEMENT_ORDER: readonly ChineseElement[] = [
  "wood",
  "fire",
  "earth",
  "metal",
  "water",
] as const;

const GENERATING_RELATIONS: Record<ChineseElement, ChineseElement> = {
  wood: "fire",
  fire: "earth",
  earth: "metal",
  metal: "water",
  water: "wood",
};

const CONTROLLING_RELATIONS: Record<ChineseElement, ChineseElement> = {
  wood: "earth",
  fire: "metal",
  earth: "water",
  metal: "wood",
  water: "fire",
};

const TRINE_GROUPS: readonly (readonly ChineseZodiacAnimalKey[])[] = [
  ["rat", "dragon", "monkey"],
  ["ox", "snake", "rooster"],
  ["tiger", "horse", "dog"],
  ["rabbit", "goat", "pig"],
] as const;

const CLASH_PAIRS = new Set([
  "dog-dragon",
  "goat-ox",
  "horse-rat",
  "monkey-tiger",
  "pig-snake",
  "rabbit-rooster",
]);

const HARM_PAIRS = new Set([
  "dog-rooster",
  "dragon-rabbit",
  "goat-rat",
  "horse-ox",
  "pig-monkey",
  "snake-tiger",
]);

const PUNISHMENT_PAIRS = new Set([
  "dog-goat",
  "dog-ox",
  "goat-ox",
  "monkey-snake",
  "monkey-tiger",
  "rat-rabbit",
  "snake-tiger",
]);

function mod(value: number, divisor: number): number {
  return ((value % divisor) + divisor) % divisor;
}

function toPairKey(
  animalA: ChineseZodiacAnimalKey,
  animalB: ChineseZodiacAnimalKey,
): string {
  return [animalA, animalB].sort().join("-");
}

export function resolveChineseZodiacYear(
  input: DateInput | number,
): { effectiveYear: number; adjusted: boolean } {
  if (typeof input === "number") {
    return {
      effectiveYear: input,
      adjusted: false,
    };
  }

  const { year, month, day } = getDateParts(input);
  const adjusted = month < LUNAR_NEW_YEAR_APPROX_MONTH ||
    (month === LUNAR_NEW_YEAR_APPROX_MONTH && day < LUNAR_NEW_YEAR_APPROX_DAY);

  return {
    effectiveYear: adjusted ? year - 1 : year,
    adjusted,
  };
}

export function getChineseZodiacAnimalByKey(
  key: ChineseZodiacAnimalKey,
): ChineseZodiacAnimal {
  const animal = CHINESE_ZODIAC_ANIMALS.find((entry) => entry.key === key);

  if (!animal) {
    throw new Error(`Unknown Chinese zodiac animal: ${key}`);
  }

  return animal;
}

export function getChineseZodiac(
  input: DateInput | number,
): ChineseZodiacProfile {
  const { effectiveYear, adjusted } = resolveChineseZodiacYear(input);
  const animal = CHINESE_ZODIAC_ANIMALS[mod(effectiveYear - 4, 12)];
  const element = ELEMENT_ORDER[Math.floor(mod(effectiveYear - 4, 10) / 2)];
  const elementNameTh = CHINESE_ELEMENT_NAMES_TH[element];

  return {
    animal,
    element,
    elementNameTh,
    effectiveYear,
    adjustedForApproximateLunarNewYear: adjusted,
    cycleLabelTh: `${animal.yearNameTh}${elementNameTh}`,
  };
}

export function isChineseZodiacTrine(
  animalA: ChineseZodiacAnimalKey,
  animalB: ChineseZodiacAnimalKey,
): boolean {
  return TRINE_GROUPS.some(
    (group) => group.includes(animalA) && group.includes(animalB),
  );
}

export function isChineseZodiacClash(
  animalA: ChineseZodiacAnimalKey,
  animalB: ChineseZodiacAnimalKey,
): boolean {
  return CLASH_PAIRS.has(toPairKey(animalA, animalB));
}

export function isChineseZodiacHarm(
  animalA: ChineseZodiacAnimalKey,
  animalB: ChineseZodiacAnimalKey,
): boolean {
  return HARM_PAIRS.has(toPairKey(animalA, animalB));
}

export function isChineseZodiacPunishment(
  animalA: ChineseZodiacAnimalKey,
  animalB: ChineseZodiacAnimalKey,
): boolean {
  return PUNISHMENT_PAIRS.has(toPairKey(animalA, animalB));
}

export function getChineseElementRelation(
  elementA: ChineseElement,
  elementB: ChineseElement,
): ChineseElementRelation {
  if (elementA === elementB) {
    return "same";
  }

  if (
    GENERATING_RELATIONS[elementA] === elementB ||
    GENERATING_RELATIONS[elementB] === elementA
  ) {
    return "generating";
  }

  if (
    CONTROLLING_RELATIONS[elementA] === elementB ||
    CONTROLLING_RELATIONS[elementB] === elementA
  ) {
    return "controlling";
  }

  return "balanced";
}
