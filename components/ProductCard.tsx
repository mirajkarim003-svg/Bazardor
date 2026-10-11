import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatTaka, unitLabel } from "@/lib/bn";
import PriceBadge from "./PriceBadge";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-3xl">
          <span aria-hidden>{product.image}</span>
        </div>
        <div className="min-w-0">
          <h3 className="truncate text-lg font-bold text-gray-900 group-hover:text-emerald-700">
            {product.nameBn}
          </h3>
          <p className="text-sm text-gray-500">{unitLabel(product.unit)}</p>
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between gap-2 border-t border-dashed border-gray-200 pt-3">
        <div>
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="text-xl font-extrabold text-gray-900">
            {formatTaka(product.today)}
          </p>
        </div>
        <PriceBadge dir={product.change.dir} pct={product.change.pct} />
      </div>
    </Link>
  );
}
