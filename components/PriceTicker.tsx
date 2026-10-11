import type { Product } from "@/lib/types";
import { formatBnDecimal, formatBnNumber, unitShort } from "@/lib/bn";

function TickerItem({ p }: { p: Product }) {
  const { dir, pct } = p.change;
  const color =
    dir === "up" ? "text-red-600" : dir === "down" ? "text-green-600" : "text-gray-500";
  const symbol = dir === "up" ? "▲" : dir === "down" ? "▼" : "—";

  return (
    <span className="inline-flex shrink-0 items-center gap-2 px-6 text-sm whitespace-nowrap">
      <span aria-hidden>{p.image}</span>
      <span className="font-semibold text-gray-900">{p.nameBn}</span>
      <span className="text-gray-600">
        {formatBnNumber(p.today)} টাকা/{unitShort(p.unit)}
      </span>
      <span className={`font-semibold ${color}`}>
        {symbol} {formatBnDecimal(Math.abs(pct))}%
      </span>
    </span>
  );
}

export default function PriceTicker({ products }: { products: Product[] }) {
  if (!products.length) return null;

  return (
    <div
      className="overflow-hidden border-b border-gray-200 bg-white py-2.5"
      aria-label="আজকের দামের তালিকা"
    >
      <div className="ticker-track flex w-max">
        <div className="flex shrink-0">
          {products.map((p) => (
            <TickerItem key={`a-${p.id}`} p={p} />
          ))}
        </div>
        <div className="flex shrink-0" aria-hidden>
          {products.map((p) => (
            <TickerItem key={`b-${p.id}`} p={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
