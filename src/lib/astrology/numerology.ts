import { type DateInput, getDateParts } from "../utils/date";

export type BaseLifePathNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type LifePathNumber = BaseLifePathNumber | 11 | 22 | 33;

export interface LifePathMeaning {
  number: LifePathNumber;
  title_th: string;
  archetype_th: string;
  description_th: string;
  strengths: readonly string[];
  watchouts: readonly string[];
}

const LIFE_PATH_VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33] as const;

export const MASTER_NUMBERS = [11, 22, 33] as const;

export const LIFE_PATH_MEANINGS: Record<LifePathNumber, LifePathMeaning> = {
  1: {
    number: 1,
    title_th: "ผู้นำ",
    archetype_th: "คนเปิดเกม",
    description_th:
      "เลข 1 มาแบบคนกล้าคิดกล้าทำ ชอบเริ่มต้นอะไรด้วยตัวเอง และรู้สึกมีไฟเวลามีเป้าชัด ๆ",
    strengths: ["ตัดสินใจไว", "มีสปิริตนักบุกเบิก", "ยืนด้วยขาตัวเองได้ดี"],
    watchouts: ["เผลอเร่งทุกคนตามจังหวะตัวเอง", "ไม่ชอบขอความช่วยเหลือ", "ใจร้อนได้ง่าย"],
  },
  2: {
    number: 2,
    title_th: "คู่หู",
    archetype_th: "คนประคองใจ",
    description_th:
      "เลข 2 เด่นเรื่องความอ่อนโยน การรับฟัง และการสร้างสมดุล คุณมักเป็นคนที่ทำให้บรรยากาศดีขึ้นแบบไม่ต้องเสียงดัง",
    strengths: ["เข้าใจคนอื่นเก่ง", "ทำงานเป็นทีมดี", "เก็บรายละเอียดทางอารมณ์ได้ไว"],
    watchouts: ["เกรงใจจนลืมตัวเอง", "ลังเลเวลาต้องเลือก", "รับพลังลบคนอื่นมากไป"],
  },
  3: {
    number: 3,
    title_th: "นักสร้างสรรค์",
    archetype_th: "คนปล่อยแสง",
    description_th:
      "เลข 3 มีพลังของการแสดงออก ความสนุก และการคิดงานแบบมีสีสัน คุณมักดึงคนอื่นเข้ามาหาได้ด้วยความเป็นธรรมชาติ",
    strengths: ["ครีเอทีฟสูง", "สื่อสารเก่ง", "มีเสน่ห์เวลาได้เป็นตัวเอง"],
    watchouts: ["เบื่อง่าย", "อารมณ์ขึ้นลงเร็ว", "เริ่มหลายอย่างพร้อมกันจนล้น"],
  },
  4: {
    number: 4,
    title_th: "ผู้สร้าง",
    archetype_th: "คนวางฐาน",
    description_th:
      "เลข 4 คือพลังของระบบ ระเบียบ และความรับผิดชอบ คุณรู้สึกมั่นใจเมื่อทุกอย่างมีแผนและจับต้องได้จริง",
    strengths: ["วางแผนเก่ง", "สม่ำเสมอ", "เชื่อถือได้"],
    watchouts: ["เข้มกับตัวเองเกินไป", "ยืดหยุ่นยากเมื่อแผนเปลี่ยน", "ชอบคิดวนเรื่องความมั่นคง"],
  },
  5: {
    number: 5,
    title_th: "นักผจญภัย",
    archetype_th: "คนรักอิสระ",
    description_th:
      "เลข 5 เป็นพลังแห่งการเปลี่ยนแปลง การเดินทาง และประสบการณ์ใหม่ ๆ คุณโตไวเมื่อได้ลองของจริงมากกว่านั่งคิดอย่างเดียว",
    strengths: ["ปรับตัวเร็ว", "กล้าลอง", "มีเสน่ห์แบบสดใหม่"],
    watchouts: ["ไม่ชอบข้อจำกัด", "เปลี่ยนใจไว", "เผลอหนีความนิ่งที่จำเป็น"],
  },
  6: {
    number: 6,
    title_th: "ผู้ดูแล",
    archetype_th: "คนให้ใจ",
    description_th:
      "เลข 6 เด่นเรื่องความรัก ความรับผิดชอบ และการสร้างพื้นที่ปลอดภัยให้คนรอบตัว คุณให้ความสำคัญกับความสัมพันธ์ที่มั่นคงและจริงใจ",
    strengths: ["ดูแลเก่ง", "อบอุ่น", "มีเซนส์เรื่องบ้านและครอบครัว"],
    watchouts: ["ชอบแบกแทนคนอื่น", "คาดหวังเพราะรักมาก", "รู้สึกผิดง่ายเวลาปล่อยมือ"],
  },
  7: {
    number: 7,
    title_th: "นักคิด",
    archetype_th: "คนมองลึก",
    description_th:
      "เลข 7 คือคนที่ชอบเข้าใจโลกให้ลึกกว่าเดิม สนใจความหมายเบื้องหลังและต้องมีเวลาอยู่กับตัวเองเพื่อรีชาร์จใจ",
    strengths: ["วิเคราะห์เก่ง", "มีสัญชาตญาณดี", "มองเห็นรายละเอียดที่คนอื่นมองข้าม"],
    watchouts: ["เก็บตัวจนคนเดาใจยาก", "คิดลึกจนเหนื่อยเอง", "เปิดใจช้ากับเรื่องใหม่"],
  },
  8: {
    number: 8,
    title_th: "นักบริหาร",
    archetype_th: "คนขับเคลื่อนผลลัพธ์",
    description_th:
      "เลข 8 ขับเคลื่อนด้วยเป้าหมายใหญ่ ความทะเยอทะยาน และความต้องการเห็นผลจริง คุณเก่งเรื่องจัดการทรัพยากรและเปลี่ยนแรงกดดันให้เป็นพลัง",
    strengths: ["โฟกัสดี", "จัดการเก่ง", "มีภาวะผู้นำเรื่องงานและเงิน"],
    watchouts: ["กดดันตัวเองหนัก", "เผลอวัดคุณค่าจากผลงาน", "แข็งกับความรู้สึกตัวเองเกินไป"],
  },
  9: {
    number: 9,
    title_th: "นักมนุษยธรรม",
    archetype_th: "คนมองภาพใหญ่ของหัวใจ",
    description_th:
      "เลข 9 พาให้คุณเห็นคุณค่าของผู้คนและการส่งต่อสิ่งดี ๆ คุณมีพลังของความเมตตาและมักอยากทำบางอย่างที่มีความหมายกว่าประโยชน์ส่วนตัว",
    strengths: ["เห็นอกเห็นใจสูง", "เข้าใจภาพรวมของชีวิต", "มีพลังเยียวยาคนรอบตัว"],
    watchouts: ["ยอมมากไปเพราะสงสาร", "ปล่อยเรื่องค้างคาในใจยาก", "คาดหวังกับโลกมากเกินไป"],
  },
  11: {
    number: 11,
    title_th: "ผู้จุดประกาย",
    archetype_th: "มาสเตอร์นัมเบอร์แห่งแรงบันดาลใจ",
    description_th:
      "เลข 11 เป็นมาสเตอร์นัมเบอร์ของคนที่รับคลื่นความรู้สึกและภาพใหญ่ได้ไว คุณมีแสงของคนชวนให้ผู้อื่นกล้าเชื่อในบางอย่างอีกครั้ง",
    strengths: ["อินทูอิทีฟแรง", "สร้างแรงบันดาลใจเก่ง", "จับพลังของคนและบรรยากาศได้ไว"],
    watchouts: ["ไวต่ออารมณ์มาก", "กดดันกับความคาดหวังสูง", "ต้องบาลานซ์ระหว่างฝันกับโลกจริง"],
  },
  22: {
    number: 22,
    title_th: "ผู้สร้างสิ่งใหญ่",
    archetype_th: "มาสเตอร์นัมเบอร์แห่งการลงมือจริง",
    description_th:
      "เลข 22 มีพลังแบบคนที่ฝันใหญ่และทำให้เกิดขึ้นได้จริง เมื่อโฟกัสดี คุณสามารถเปลี่ยนไอเดียระดับวิสัยทัศน์ให้กลายเป็นระบบที่จับต้องได้",
    strengths: ["คิดใหญ่แต่ทำเป็นขั้น", "สร้างผลลัพธ์ระยะยาวเก่ง", "มีพลังผู้นำเชิงโครงสร้าง"],
    watchouts: ["แบกความคาดหวังเยอะ", "เครียดง่ายเวลาแผนสะดุด", "เผลอควบคุมทุกอย่างเอง"],
  },
  33: {
    number: 33,
    title_th: "ผู้เยียวยา",
    archetype_th: "มาสเตอร์นัมเบอร์แห่งการให้",
    description_th:
      "เลข 33 คือพลังของความรักแบบมีสติ การดูแลผู้คน และการยกระดับหัวใจของคนรอบตัว คุณมักมีพลังอบอุ่นที่ทำให้คนรู้สึกปลอดภัยอย่างไม่น่าเชื่อ",
    strengths: ["เยียวยาคนเก่ง", "มีเมตตาสูง", "สร้างพลังบวกแบบจริงใจ"],
    watchouts: ["เผลอเสียสละเกินจำเป็น", "เหนื่อยง่ายเพราะรับทุกเรื่อง", "ต้องฝึกวางขอบเขตให้ชัด"],
  },
};

function sumDigits(value: number): number {
  return Math.abs(value)
    .toString()
    .split("")
    .reduce((total, digit) => total + Number(digit), 0);
}

export function isMasterNumber(value: number): value is 11 | 22 | 33 {
  return MASTER_NUMBERS.includes(value as 11 | 22 | 33);
}

function toLifePathNumber(value: number): LifePathNumber {
  if (LIFE_PATH_VALUES.includes(value as LifePathNumber)) {
    return value as LifePathNumber;
  }

  throw new Error(`Invalid life path number: ${value}`);
}

export function reduceNumerologyNumber(value: number): LifePathNumber {
  let current = Math.abs(Math.trunc(value));

  while (current > 9 && !isMasterNumber(current)) {
    current = sumDigits(current);
  }

  return toLifePathNumber(current);
}

export function calculateLifePathNumber(input: DateInput): LifePathNumber {
  const { year, month, day } = getDateParts(input);
  const total = `${day}${month}${year}`
    .split("")
    .reduce((sum, digit) => sum + Number(digit), 0);

  return reduceNumerologyNumber(total);
}

export function normalizeLifePathNumber(number: LifePathNumber): BaseLifePathNumber {
  switch (number) {
    case 11:
      return 2;
    case 22:
      return 4;
    case 33:
      return 6;
    default:
      return number;
  }
}

export function getLifePathMeaning(number: LifePathNumber): LifePathMeaning {
  return LIFE_PATH_MEANINGS[number];
}
