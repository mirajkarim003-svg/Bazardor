const EN_TO_BN = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

/** Convert any English digits inside a string to Bengali digits. */
export function digitsToBn(input: string | number): string {
  return String(input).replace(/\d/g, (d) => EN_TO_BN[Number(d)]);
}

/** Convert any Bengali digits inside a string to English digits. */
export function digitsToEn(input: string): string {
  return input.replace(/[০-৯]/g, (d) => String(EN_TO_BN.indexOf(d)));
}

/**
 * Parse a number that may contain Bengali digits / commas / currency text
 * ("১,৮৫০ টাকা" -> 1850). Used so sorting is always numeric, never string-based.
 */
export function parseBnNumber(input: string | number): number {
  if (typeof input === "number") return input;
  const cleaned = digitsToEn(input).replace(/,/g, "").replace(/[^\d.\-]/g, "");
  const n = parseFloat(cleaned);
  return Number.isFinite(n) ? n : 0;
}

/** 1850 -> "১,৮৫০" */
export function formatBnNumber(n: number): string {
  return digitsToBn(Math.round(n).toLocaleString("en-US"));
}

/** 2.1 -> "২.১" */
export function formatBnDecimal(n: number, digits = 1): string {
  return digitsToBn(n.toFixed(digits));
}

/** 148 -> "১৪৮ টাকা" */
export function formatTaka(n: number): string {
  return `${formatBnNumber(n)} টাকা`;
}

const UNIT_LABELS: Record<string, string> = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  liter: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
  pcs: "প্রতি পিস",
};

const UNIT_SHORT: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  liter: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
  pcs: "পিস",
};

export function unitLabel(unit: string): string {
  return UNIT_LABELS[unit] ?? `প্রতি ${unit}`;
}

export function unitShort(unit: string): string {
  return UNIT_SHORT[unit] ?? unit;
}

/** Today's date in Bangla, e.g. "রবিবার, ১১ অক্টোবর ২০২৬" */
export function banglaDate(date: Date = new Date()): string {
  return new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(date);
}
