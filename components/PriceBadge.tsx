import type { ChangeDir } from "@/lib/types";
import { formatBnDecimal } from "@/lib/bn";

// Colours follow the Figma: price increase = red, decrease = green, flat = gray.
export default function PriceBadge({ dir, pct }: { dir: ChangeDir; pct: number }) {
  const styles =
    dir === "up"
      ? "bg-red-50 text-red-600"
      : dir === "down"
      ? "bg-green-50 text-green-600"
      : "bg-gray-100 text-gray-500";
  const num = formatBnDecimal(Math.abs(pct));
  const text = dir === "up" ? `▲ ${num}%` : dir === "down" ? `▼ ${num}%` : `—${num}%`;

  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-semibold whitespace-nowrap ${styles}`}
    >
      {text}
    </span>
  );
}
