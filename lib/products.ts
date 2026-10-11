import type { Product } from "./types";
import { parseBnNumber } from "./bn";

export type SortMode = "default" | "asc" | "desc";

/** Always a real number, even if the API ever returns "১৪৮ টাকা" style strings. */
export function priceOf(p: Product): number {
  return parseBnNumber(p.today as number | string);
}

export function sortProducts(list: Product[], mode: SortMode): Product[] {
  if (mode === "default") return list;
  const copy = [...list];
  copy.sort((a, b) => (mode === "asc" ? priceOf(a) - priceOf(b) : priceOf(b) - priceOf(a)));
  return copy;
}

export function topRisers(list: Product[], n = 6): Product[] {
  return list
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, n);
}

export function topFallers(list: Product[], n = 6): Product[] {
  return list
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct) // most negative first
    .slice(0, n);
}

export interface PriceSummary {
  min: number;
  max: number;
  avg: number;
}

/** min = lowest market minimum, max = highest market maximum, avg = mean of market mid-points */
export function summarize(p: Product): PriceSummary {
  if (!p.markets?.length) {
    const t = priceOf(p);
    return { min: t, max: t, avg: t };
  }
  const min = Math.min(...p.markets.map((m) => m.min));
  const max = Math.max(...p.markets.map((m) => m.max));
  const avg =
    p.markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) / p.markets.length;
  return { min, max, avg };
}
