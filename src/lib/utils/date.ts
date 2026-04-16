export type DateInput = Date | string;

export interface DateParts {
  year: number;
  month: number;
  day: number;
  weekday: number;
}

const ISO_DATE_ONLY_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

export const THAI_DAY_NAMES = [
  "อาทิตย์",
  "จันทร์",
  "อังคาร",
  "พุธ",
  "พฤหัสบดี",
  "ศุกร์",
  "เสาร์",
] as const;

export const THAI_MONTH_NAMES = [
  "มกราคม",
  "กุมภาพันธ์",
  "มีนาคม",
  "เมษายน",
  "พฤษภาคม",
  "มิถุนายน",
  "กรกฎาคม",
  "สิงหาคม",
  "กันยายน",
  "ตุลาคม",
  "พฤศจิกายน",
  "ธันวาคม",
] as const;

function createLocalDate(year: number, month: number, day: number): Date {
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    throw new Error(`Invalid calendar date: ${year}-${month}-${day}`);
  }

  return date;
}

export function normalizeDateInput(input: DateInput): Date {
  if (input instanceof Date) {
    if (Number.isNaN(input.getTime())) {
      throw new Error("Invalid Date object received");
    }

    return createLocalDate(
      input.getFullYear(),
      input.getMonth() + 1,
      input.getDate(),
    );
  }

  const trimmed = input.trim();
  const isoMatch = ISO_DATE_ONLY_PATTERN.exec(trimmed);

  if (isoMatch) {
    const [, yearText, monthText, dayText] = isoMatch;
    return createLocalDate(
      Number(yearText),
      Number(monthText),
      Number(dayText),
    );
  }

  const parsed = new Date(trimmed);

  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`Unable to parse date input: ${input}`);
  }

  return createLocalDate(
    parsed.getFullYear(),
    parsed.getMonth() + 1,
    parsed.getDate(),
  );
}

export function getDateParts(input: DateInput): DateParts {
  const date = normalizeDateInput(input);

  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    weekday: date.getDay(),
  };
}

export function toDateKey(input: DateInput): string {
  const { year, month, day } = getDateParts(input);

  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function toThaiBuddhistYear(year: number): number {
  return year + 543;
}

export function getThaiDayName(input: number | DateInput): string {
  const weekday = typeof input === "number" ? input : getDateParts(input).weekday;

  if (!Number.isInteger(weekday) || weekday < 0 || weekday > 6) {
    throw new Error(`Weekday index must be between 0 and 6, received ${weekday}`);
  }

  return THAI_DAY_NAMES[weekday];
}

export function getThaiMonthName(input: number | DateInput): string {
  const monthIndex = typeof input === "number" ? input - 1 : getDateParts(input).month - 1;

  if (!Number.isInteger(monthIndex) || monthIndex < 0 || monthIndex > 11) {
    throw new Error(`Month index must be between 1 and 12, received ${input}`);
  }

  return THAI_MONTH_NAMES[monthIndex];
}

export function formatThaiDate(input: DateInput): string {
  const { year, month, day } = getDateParts(input);

  return `${day} ${getThaiMonthName(month)} ${toThaiBuddhistYear(year)}`;
}
