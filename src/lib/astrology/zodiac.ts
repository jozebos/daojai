import { type DateInput, getDateParts } from "../utils/date";

export type WesternElement = "fire" | "earth" | "air" | "water";
export type ZodiacModality = "cardinal" | "fixed" | "mutable";

export type ZodiacSignKey =
  | "aries"
  | "taurus"
  | "gemini"
  | "cancer"
  | "leo"
  | "virgo"
  | "libra"
  | "scorpio"
  | "sagittarius"
  | "capricorn"
  | "aquarius"
  | "pisces";

export interface ZodiacSign {
  key: ZodiacSignKey;
  name_en: string;
  name_th: string;
  symbol: string;
  element: WesternElement;
  modality: ZodiacModality;
  startMonth: number;
  startDay: number;
  endMonth: number;
  endDay: number;
}

export interface ZodiacCuspInfo {
  isCusp: boolean;
  cuspWith?: ZodiacSignKey;
  cuspLabelTh?: string;
  boundary?: {
    month: number;
    day: number;
  };
}

export interface WesternZodiacResult extends ZodiacSign {
  cusp: ZodiacCuspInfo;
}

export const WESTERN_ELEMENT_NAMES_TH: Record<WesternElement, string> = {
  fire: "ธาตุไฟ",
  earth: "ธาตุดิน",
  air: "ธาตุลม",
  water: "ธาตุน้ำ",
};

export const WESTERN_ZODIAC_SIGNS: readonly ZodiacSign[] = [
  {
    key: "aries",
    name_en: "Aries",
    name_th: "เมษ",
    symbol: "♈",
    element: "fire",
    modality: "cardinal",
    startMonth: 3,
    startDay: 21,
    endMonth: 4,
    endDay: 19,
  },
  {
    key: "taurus",
    name_en: "Taurus",
    name_th: "พฤษภ",
    symbol: "♉",
    element: "earth",
    modality: "fixed",
    startMonth: 4,
    startDay: 20,
    endMonth: 5,
    endDay: 20,
  },
  {
    key: "gemini",
    name_en: "Gemini",
    name_th: "เมถุน",
    symbol: "♊",
    element: "air",
    modality: "mutable",
    startMonth: 5,
    startDay: 21,
    endMonth: 6,
    endDay: 20,
  },
  {
    key: "cancer",
    name_en: "Cancer",
    name_th: "กรกฎ",
    symbol: "♋",
    element: "water",
    modality: "cardinal",
    startMonth: 6,
    startDay: 21,
    endMonth: 7,
    endDay: 22,
  },
  {
    key: "leo",
    name_en: "Leo",
    name_th: "สิงห์",
    symbol: "♌",
    element: "fire",
    modality: "fixed",
    startMonth: 7,
    startDay: 23,
    endMonth: 8,
    endDay: 22,
  },
  {
    key: "virgo",
    name_en: "Virgo",
    name_th: "กันย์",
    symbol: "♍",
    element: "earth",
    modality: "mutable",
    startMonth: 8,
    startDay: 23,
    endMonth: 9,
    endDay: 22,
  },
  {
    key: "libra",
    name_en: "Libra",
    name_th: "ตุลย์",
    symbol: "♎",
    element: "air",
    modality: "cardinal",
    startMonth: 9,
    startDay: 23,
    endMonth: 10,
    endDay: 22,
  },
  {
    key: "scorpio",
    name_en: "Scorpio",
    name_th: "พิจิก",
    symbol: "♏",
    element: "water",
    modality: "fixed",
    startMonth: 10,
    startDay: 23,
    endMonth: 11,
    endDay: 21,
  },
  {
    key: "sagittarius",
    name_en: "Sagittarius",
    name_th: "ธนู",
    symbol: "♐",
    element: "fire",
    modality: "mutable",
    startMonth: 11,
    startDay: 22,
    endMonth: 12,
    endDay: 21,
  },
  {
    key: "capricorn",
    name_en: "Capricorn",
    name_th: "มังกร",
    symbol: "♑",
    element: "earth",
    modality: "cardinal",
    startMonth: 12,
    startDay: 22,
    endMonth: 1,
    endDay: 19,
  },
  {
    key: "aquarius",
    name_en: "Aquarius",
    name_th: "กุมภ์",
    symbol: "♒",
    element: "air",
    modality: "fixed",
    startMonth: 1,
    startDay: 20,
    endMonth: 2,
    endDay: 18,
  },
  {
    key: "pisces",
    name_en: "Pisces",
    name_th: "มีน",
    symbol: "♓",
    element: "water",
    modality: "mutable",
    startMonth: 2,
    startDay: 19,
    endMonth: 3,
    endDay: 20,
  },
] as const;

function isWithinSignRange(month: number, day: number, sign: ZodiacSign): boolean {
  const target = month * 100 + day;
  const start = sign.startMonth * 100 + sign.startDay;
  const end = sign.endMonth * 100 + sign.endDay;

  if (start <= end) {
    return target >= start && target <= end;
  }

  return target >= start || target <= end;
}

export function getWesternZodiacSignByKey(key: ZodiacSignKey): ZodiacSign {
  const sign = WESTERN_ZODIAC_SIGNS.find((entry) => entry.key === key);

  if (!sign) {
    throw new Error(`Unknown zodiac sign key: ${key}`);
  }

  return sign;
}

export function getWesternZodiacSignFromMonthDay(
  month: number,
  day: number,
): WesternZodiacResult {
  const signIndex = WESTERN_ZODIAC_SIGNS.findIndex((entry) =>
    isWithinSignRange(month, day, entry),
  );

  if (signIndex < 0) {
    throw new Error(`Unable to resolve zodiac sign for ${month}/${day}`);
  }

  const sign = WESTERN_ZODIAC_SIGNS[signIndex];
  const previousSign = WESTERN_ZODIAC_SIGNS[(signIndex + WESTERN_ZODIAC_SIGNS.length - 1) % WESTERN_ZODIAC_SIGNS.length];
  const nextSign = WESTERN_ZODIAC_SIGNS[(signIndex + 1) % WESTERN_ZODIAC_SIGNS.length];
  const isStartBoundary = month === sign.startMonth && day === sign.startDay;
  const isEndBoundary = month === sign.endMonth && day === sign.endDay;

  if (isStartBoundary) {
    return {
      ...sign,
      cusp: {
        isCusp: true,
        cuspWith: previousSign.key,
        cuspLabelTh: `${previousSign.name_th} / ${sign.name_th}`,
        boundary: {
          month,
          day,
        },
      },
    };
  }

  if (isEndBoundary) {
    return {
      ...sign,
      cusp: {
        isCusp: true,
        cuspWith: nextSign.key,
        cuspLabelTh: `${sign.name_th} / ${nextSign.name_th}`,
        boundary: {
          month,
          day,
        },
      },
    };
  }

  return {
    ...sign,
    cusp: {
      isCusp: false,
    },
  };
}

export function getWesternZodiacSign(input: DateInput): WesternZodiacResult {
  const { month, day } = getDateParts(input);
  return getWesternZodiacSignFromMonthDay(month, day);
}
