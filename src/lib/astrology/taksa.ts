import type { DateInput } from "../utils/date";
import { getThaiDayKey, type ThaiDayKey } from "./thai-day";

export type TaksaRoleKey =
  | "boriwan"
  | "ayu"
  | "det"
  | "sri"
  | "moola"
  | "utsaha"
  | "montri"
  | "kalakini";

export type TaksaPlanetKey =
  | "sun"
  | "moon"
  | "mars"
  | "mercury"
  | "saturn"
  | "jupiter"
  | "rahu"
  | "venus";

export interface TaksaRoleDefinition {
  key: TaksaRoleKey;
  name_th: string;
  meaning_th: string;
}

export interface TaksaPlanet {
  key: TaksaPlanetKey;
  name_th: string;
  thaiNumber: string;
  symbol: string;
  power: number;
  element_th: string;
  colors: readonly string[];
  meaning_th: string;
}

export interface TaksaRoleAssignment {
  role: TaksaRoleDefinition;
  planet: TaksaPlanet;
}

export interface TaksaCalculationOptions {
  bornAtNight?: boolean;
}

export interface TaksaResult {
  birthDay: ThaiDayKey;
  bornAtNight: boolean;
  birthPlanet: TaksaPlanet;
  assignments: Record<TaksaRoleKey, TaksaPlanet>;
  orderedAssignments: readonly TaksaRoleAssignment[];
  auspiciousColors: readonly string[];
  cautionColors: readonly string[];
}

export const TAKSA_ROLES: readonly TaksaRoleDefinition[] = [
  { key: "boriwan", name_th: "บริวาร", meaning_th: "คนรอบตัว ลูกน้อง ทีม และเครือข่าย" },
  { key: "ayu", name_th: "อายุ", meaning_th: "พลังชีวิต สุขภาพ และความยืนระยะ" },
  { key: "det", name_th: "เดช", meaning_th: "อำนาจ ภาพลักษณ์ และบารมี" },
  { key: "sri", name_th: "ศรี", meaning_th: "ทรัพย์ โชคลาภ และสิ่งที่ดึงดูดเข้ามา" },
  { key: "moola", name_th: "มูละ", meaning_th: "รากฐาน บ้าน ครอบครัว และสิ่งที่ตั้งต้นชีวิต" },
  { key: "utsaha", name_th: "อุตสาหะ", meaning_th: "การงาน ความขยัน และความเพียร" },
  { key: "montri", name_th: "มนตรี", meaning_th: "ผู้ใหญ่ เมนเทอร์ และคนที่คอยหนุน" },
  { key: "kalakini", name_th: "กาลกิณี", meaning_th: "สิ่งที่ควรเลี่ยง สีไม่ถูกโฉลก และจุดที่ต้องระวัง" },
] as const;

export const TAKSA_PLANETS: Record<TaksaPlanetKey, TaksaPlanet> = {
  sun: {
    key: "sun",
    name_th: "อาทิตย์",
    thaiNumber: "๑",
    symbol: "☉",
    power: 6,
    element_th: "ไฟ",
    colors: ["แดง"],
    meaning_th: "พลังผู้นำ ความชัดเจน ความมั่นใจ และศักดิ์ศรี",
  },
  moon: {
    key: "moon",
    name_th: "จันทร์",
    thaiNumber: "๒",
    symbol: "☽",
    power: 15,
    element_th: "น้ำ",
    colors: ["เหลือง", "ครีม"],
    meaning_th: "อารมณ์ ความรัก ความอ่อนโยน และพลังการดูแล",
  },
  mars: {
    key: "mars",
    name_th: "อังคาร",
    thaiNumber: "๓",
    symbol: "♂",
    power: 8,
    element_th: "ไฟ",
    colors: ["ชมพู"],
    meaning_th: "แรงผลัก ความกล้า ความขยัน และความตรงไปตรงมา",
  },
  mercury: {
    key: "mercury",
    name_th: "พุธ",
    thaiNumber: "๔",
    symbol: "☿",
    power: 17,
    element_th: "ดิน",
    colors: ["เขียว"],
    meaning_th: "ปัญญา การพูด การค้า และการปรับตัว",
  },
  saturn: {
    key: "saturn",
    name_th: "เสาร์",
    thaiNumber: "๗",
    symbol: "♄",
    power: 10,
    element_th: "ดิน",
    colors: ["ดำ", "ม่วง"],
    meaning_th: "ความอดทน ข้อสอบชีวิต ความหนักแน่น และวินัย",
  },
  jupiter: {
    key: "jupiter",
    name_th: "พฤหัสบดี",
    thaiNumber: "๕",
    symbol: "♃",
    power: 19,
    element_th: "ลม",
    colors: ["ส้ม", "แสด"],
    meaning_th: "ครู เมตตา ปัญญาสูง และการเติบโตแบบมีหลัก",
  },
  rahu: {
    key: "rahu",
    name_th: "ราหู",
    thaiNumber: "๘",
    symbol: "☊",
    power: 12,
    element_th: "ลม",
    colors: ["เทา", "ดำ"],
    meaning_th: "สิ่งลึกซ่อน การเปลี่ยนเร็ว ต่างแดน และเรื่องนอกกรอบ",
  },
  venus: {
    key: "venus",
    name_th: "ศุกร์",
    thaiNumber: "๖",
    symbol: "♀",
    power: 21,
    element_th: "น้ำ",
    colors: ["ฟ้า", "น้ำเงิน"],
    meaning_th: "เสน่ห์ ศิลปะ ความรัก ความสุขสบาย และความงาม",
  },
};

export const TAKSA_PLANET_ORDER: readonly TaksaPlanetKey[] = [
  "sun",
  "moon",
  "mars",
  "mercury",
  "saturn",
  "jupiter",
  "rahu",
  "venus",
] as const;

const BIRTH_DAY_PLANET_MAP: Record<ThaiDayKey, TaksaPlanetKey> = {
  sunday: "sun",
  monday: "moon",
  tuesday: "mars",
  wednesday: "mercury",
  thursday: "jupiter",
  friday: "venus",
  saturday: "saturn",
};

function uniqueColors(colors: readonly string[]): readonly string[] {
  return Array.from(new Set(colors));
}

export function getTaksaBirthPlanet(
  day: ThaiDayKey,
  options: TaksaCalculationOptions = {},
): TaksaPlanet {
  if (day === "wednesday" && options.bornAtNight) {
    return TAKSA_PLANETS.rahu;
  }

  return TAKSA_PLANETS[BIRTH_DAY_PLANET_MAP[day]];
}

export function calculateTaksa(
  day: ThaiDayKey,
  options: TaksaCalculationOptions = {},
): TaksaResult {
  const birthPlanet = getTaksaBirthPlanet(day, options);
  const startIndex = TAKSA_PLANET_ORDER.indexOf(birthPlanet.key);

  if (startIndex < 0) {
    throw new Error(`Unable to find taksa birth planet for ${day}`);
  }

  const assignments = {} as Record<TaksaRoleKey, TaksaPlanet>;
  const orderedAssignments = TAKSA_ROLES.map((role, roleIndex) => {
    const planetKey = TAKSA_PLANET_ORDER[(startIndex + roleIndex) % TAKSA_PLANET_ORDER.length];
    const planet = TAKSA_PLANETS[planetKey];
    assignments[role.key] = planet;

    return {
      role,
      planet,
    };
  });

  const auspiciousColors = uniqueColors([
    ...assignments.sri.colors,
    ...assignments.det.colors,
    ...assignments.montri.colors,
  ]);

  return {
    birthDay: day,
    bornAtNight: day === "wednesday" ? Boolean(options.bornAtNight) : false,
    birthPlanet,
    assignments,
    orderedAssignments,
    auspiciousColors,
    cautionColors: uniqueColors(assignments.kalakini.colors),
  };
}

export function calculateTaksaFromBirthDate(
  birthDate: DateInput,
  options: TaksaCalculationOptions = {},
): TaksaResult {
  return calculateTaksa(getThaiDayKey(birthDate), options);
}
