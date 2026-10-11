import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatBnNumber, unitLabel } from "@/lib/bn";
import PriceBadge from "./PriceBadge";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-emerald-300 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
    >
      <div className="flex items-center gap-3">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-50 text-xl"
          aria-hidden
        >
          {product.image}
        </span>
        <div className="min-w-0">
          <h3 className="truncate font-bold leading-tight text-gray-900 group-hover:text-emerald-700">
            {product.nameBn}
          </h3>
          <p className="text-xs text-gray-500">{unitLabel(product.unit)}</p>
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between gap-2">
        <div>
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="text-gray-900">
            <span className="text-xl font-extrabold">{formatBnNumber(product.today)}</span>{" "}
            <span className="text-sm text-gray-600">টাকা</span>
          </p>
        </div>
        <PriceBadge dir={product.change.dir} pct={product.change.pct} />
      </div>
    </Link>
  );
}
