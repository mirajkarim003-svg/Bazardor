import type { Product } from "@/lib/types";
import { formatBnDecimal, formatBnNumber, unitShort } from "@/lib/bn";

function TickerItem({ p }: { p: Product }) {
  const { dir, pct } = p.change;
  const color =
    dir === "up" ? "text-green-300" : dir === "down" ? "text-red-300" : "text-gray-300";
  const symbol = dir === "up" ? "▲" : dir === "down" ? "▼" : "—";

  return (
    <span className="inline-flex items-center gap-2 px-5 text-sm whitespace-nowrap">
      <span aria-hidden>{p.image}</span>
      <span className="font-semibold">{p.nameBn}</span>
      <span className="text-gray-200">
        {formatBnNumber(p.today)} টাকা/{unitShort(p.unit)}
      </span>
      <span className={`font-semibold ${color}`}>
        {symbol} {formatBnDecimal(Math.abs(pct))}%
      </span>
      <span className="pl-3 text-gray-500" aria-hidden>
        •
      </span>
    </span>
  );
}

export default function PriceTicker({ products }: { products: Product[] }) {
  if (!products.length) return null;

  return (
    <div
      className="overflow-hidden bg-emerald-900 py-2 text-white"
      role="marquee"
      aria-label="আজকের দামের তালিকা"
    >
      {/* The list is rendered twice so translateX(-50%) loops seamlessly */}
      <div className="ticker-track flex w-max animate-marquee">
        <div className="flex">
          {products.map((p) => (
            <TickerItem key={`a-${p.id}`} p={p} />
          ))}
        </div>
        <div className="flex" aria-hidden>
          {products.map((p) => (
            <TickerItem key={`b-${p.id}`} p={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
