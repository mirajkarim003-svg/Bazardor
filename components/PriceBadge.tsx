import type { ChangeDir } from "@/lib/types";
import { formatBnDecimal } from "@/lib/bn";

export default function PriceBadge({
  dir,
  pct,
  size = "md",
}: {
  dir: ChangeDir;
  pct: number;
  size?: "sm" | "md";
}) {
  const abs = Math.abs(pct);
  const styles =
    dir === "up"
      ? "bg-green-100 text-green-700"
      : dir === "down"
      ? "bg-red-100 text-red-700"
      : "bg-gray-100 text-gray-600";
  const symbol = dir === "up" ? "▲" : dir === "down" ? "▼" : "—";
  const text = size === "sm" ? "text-xs px-1.5 py-0.5" : "text-sm px-2 py-1";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-semibold whitespace-nowrap ${styles} ${text}`}
    >
      {symbol} {formatBnDecimal(abs)}%
    </span>
  );
}
