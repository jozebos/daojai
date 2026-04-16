import { type DateInput, getDateParts } from "../utils/date";

export type ThaiDayKey =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";

export interface BuddhaForDay {
  name_th: string;
  mantra_th: string;
  meaning_th: string;
}

export interface ThaiDayFortune {
  key: ThaiDayKey;
  dayIndex: number;
  dayNameTh: string;
  dayNameEn: string;
  rulingPlanet: string;
  auspiciousColors: readonly string[];
  cautionColors: readonly string[];
  personalityTraits: readonly string[];
  buddha: BuddhaForDay;
}

export const THAI_DAY_KEYS: readonly ThaiDayKey[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
] as const;

const THAI_DAY_KEY_SET = new Set<ThaiDayKey>(THAI_DAY_KEYS);

export const THAI_DAY_FORTUNES: Record<ThaiDayKey, ThaiDayFortune> = {
  sunday: {
    key: "sunday",
    dayIndex: 0,
    dayNameTh: "วันอาทิตย์",
    dayNameEn: "Sunday",
    rulingPlanet: "พระอาทิตย์",
    auspiciousColors: ["แดง", "ส้ม", "ทอง"],
    cautionColors: ["ฟ้า", "น้ำเงิน"],
    personalityTraits: [
      "กล้าเริ่มก่อนใคร",
      "มีออร่าเวลาเป็นผู้นำ",
      "รักศักดิ์ศรีและชอบเห็นภาพใหญ่",
    ],
    buddha: {
      name_th: "ปางถวายเนตร",
      mantra_th: "อุเทตะยัญจักขุมา...",
      meaning_th: "เสริมวิสัยทัศน์ มองเกมไกล และตื่นรู้ก่อนลงมือ",
    },
  },
  monday: {
    key: "monday",
    dayIndex: 1,
    dayNameTh: "วันจันทร์",
    dayNameEn: "Monday",
    rulingPlanet: "พระจันทร์",
    auspiciousColors: ["เหลือง", "ครีม", "ขาว"],
    cautionColors: ["แดง"],
    personalityTraits: [
      "รับฟีลคนรอบตัวเก่ง",
      "อ่อนโยนแต่ลึก ๆ ใจแข็ง",
      "มีเสน่ห์จากความละมุนและความใส่ใจ",
    ],
    buddha: {
      name_th: "ปางห้ามญาติ",
      mantra_th: "อิติปิโสภะคะวา...",
      meaning_th: "ช่วยให้ใจเย็น เคลียร์ความขัดแย้งด้วยความเมตตา",
    },
  },
  tuesday: {
    key: "tuesday",
    dayIndex: 2,
    dayNameTh: "วันอังคาร",
    dayNameEn: "Tuesday",
    rulingPlanet: "พระอังคาร",
    auspiciousColors: ["ชมพู", "แดงเข้ม", "ม่วงแดง"],
    cautionColors: ["เหลือง", "ครีม"],
    personalityTraits: [
      "พลังเยอะ ลุยจริงไม่ขายฝัน",
      "พูดตรงและตัดสินใจไว",
      "ถ้าตั้งใจอะไรแล้วจะดันจนสุด",
    ],
    buddha: {
      name_th: "ปางไสยาสน์",
      mantra_th: "ยัสสานุภาวะโต...",
      meaning_th: "เตือนให้พักเป็น จัดสมดุลระหว่างแรงฮึดกับการฟื้นพลัง",
    },
  },
  wednesday: {
    key: "wednesday",
    dayIndex: 3,
    dayNameTh: "วันพุธ",
    dayNameEn: "Wednesday",
    rulingPlanet: "พระพุธ",
    auspiciousColors: ["เขียว", "เขียวมิ้นต์", "ฟ้าอมเขียว"],
    cautionColors: ["ชมพู"],
    personalityTraits: [
      "หัวไวและชอบเรียนรู้อะไรใหม่",
      "สื่อสารเก่ง จับประเด็นไว",
      "ปรับตัวเก่งแบบคนเอาตัวรอดเป็น",
    ],
    buddha: {
      name_th: "ปางอุ้มบาตร",
      mantra_th: "สัพพาสีวิสะ...",
      meaning_th: "หนุนเรื่องการให้ การรับ และการคุยกันแบบจริงใจ",
    },
  },
  thursday: {
    key: "thursday",
    dayIndex: 4,
    dayNameTh: "วันพฤหัสบดี",
    dayNameEn: "Thursday",
    rulingPlanet: "พระพฤหัสบดี",
    auspiciousColors: ["ส้ม", "แสด", "เหลืองอำพัน"],
    cautionColors: ["ดำ", "ม่วง"],
    personalityTraits: [
      "มีเมตตาและเป็นที่พึ่งให้คนอื่นได้",
      "ชอบเติบโตจากความรู้และประสบการณ์",
      "วางตัวดี มีโหมดครูในตัวเอง",
    ],
    buddha: {
      name_th: "ปางสมาธิ",
      mantra_th: "อัตถิ อัตถะกะถา...",
      meaning_th: "พาใจกลับมานิ่ง แล้วใช้ปัญญาตัดสินแบบไม่รีบ",
    },
  },
  friday: {
    key: "friday",
    dayIndex: 5,
    dayNameTh: "วันศุกร์",
    dayNameEn: "Friday",
    rulingPlanet: "พระศุกร์",
    auspiciousColors: ["ฟ้า", "ชมพู", "เขียวอ่อน"],
    cautionColors: ["เทา", "ดำ"],
    personalityTraits: [
      "เสน่ห์มาแบบธรรมชาติ ไม่ต้องพยายามมาก",
      "รักความสวยงามและบรรยากาศดี ๆ",
      "เข้าใจความสัมพันธ์และอ่านอารมณ์คนเก่ง",
    ],
    buddha: {
      name_th: "ปางรำพึง",
      mantra_th: "อัปปะสันเนหิ...",
      meaning_th: "เสริมการคิดลึกอย่างนุ่มนวล และเห็นค่าของใจตัวเอง",
    },
  },
  saturday: {
    key: "saturday",
    dayIndex: 6,
    dayNameTh: "วันเสาร์",
    dayNameEn: "Saturday",
    rulingPlanet: "พระเสาร์",
    auspiciousColors: ["ม่วง", "ดำ", "น้ำเงินเข้ม"],
    cautionColors: ["ส้ม", "แสด"],
    personalityTraits: [
      "อึดและอดทนกว่าที่คนอื่นคิด",
      "มองเกมยาว วางแผนเป็นขั้นตอน",
      "ผ่านเรื่องหนักได้เพราะใจนิ่งและมีวินัย",
    ],
    buddha: {
      name_th: "ปางนาคปรก",
      mantra_th: "ยะโตหัง ภะคินิ...",
      meaning_th: "ช่วยคุ้มครองใจให้มั่นคง และผ่านแรงกดดันอย่างสงบ",
    },
  },
};

export function getThaiDayKey(input: number | DateInput): ThaiDayKey {
  const weekday = typeof input === "number" ? input : getDateParts(input).weekday;

  if (!Number.isInteger(weekday) || weekday < 0 || weekday > 6) {
    throw new Error(`Weekday index must be between 0 and 6, received ${weekday}`);
  }

  return THAI_DAY_KEYS[weekday];
}

export function getThaiDayFortuneByKey(key: ThaiDayKey): ThaiDayFortune {
  return THAI_DAY_FORTUNES[key];
}

export function getThaiDayFortune(
  input: ThaiDayKey | number | DateInput,
): ThaiDayFortune {
  if (typeof input === "string" && THAI_DAY_KEY_SET.has(input as ThaiDayKey)) {
    return getThaiDayFortuneByKey(input as ThaiDayKey);
  }

  return getThaiDayFortuneByKey(getThaiDayKey(input as number | DateInput));
}
