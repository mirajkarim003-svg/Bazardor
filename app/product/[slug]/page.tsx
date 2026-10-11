import Link from "next/link";
import { notFound } from "next/navigation";
import PriceBadge from "@/components/PriceBadge";
import { getProductBySlug } from "@/lib/api";
import { formatBnDecimal, formatBnNumber, formatTaka, unitLabel } from "@/lib/bn";
import { summarize } from "@/lib/products";
import type { MarketPrice } from "@/lib/types";

function StatCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "green" | "red" | "blue";
}) {
  const tones = {
    green: "border-green-200 bg-green-50 text-green-700",
    red: "border-red-200 bg-red-50 text-red-700",
    blue: "border-sky-200 bg-sky-50 text-sky-700",
  } as const;
  return (
    <div className={`rounded-2xl border p-5 ${tones[tone]}`}>
      <p className="text-sm font-semibold">{label}</p>
      <p className="mt-1 text-2xl font-extrabold sm:text-3xl">{value}</p>
    </div>
  );
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(decodeURIComponent(slug));
  if (!product) notFound();

  const { min, max, avg } = summarize(product);
  const range = Math.max(max - min, 1);

  // Group markets by division, keeping the API order
  const byDivision = new Map<string, MarketPrice[]>();
  for (const m of product.markets ?? []) {
    byDivision.set(m.division, [...(byDivision.get(m.division) ?? []), m]);
  }

  const { dir, pct } = product.change;
  const trendText =
    dir === "up"
      ? `গতকালের চেয়ে ${formatBnDecimal(Math.abs(pct))}% বেড়েছে`
      : dir === "down"
      ? `গতকালের চেয়ে ${formatBnDecimal(Math.abs(pct))}% কমেছে`
      : "গতকালের মতোই স্থিতিশীল";

  const history = [
    { label: "গতকাল", value: product.yesterday },
    { label: "গত সপ্তাহ", value: product.lastWeek },
    { label: "গত মাস", value: product.lastMonth },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <nav className="mb-5 text-sm text-gray-500" aria-label="breadcrumb">
        <Link href="/" className="hover:text-emerald-700">
          হোম
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/category/${product.category}`} className="hover:text-emerald-700">
          {product.categoryNameBn}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">{product.nameBn}</span>
      </nav>

      {/* Summary */}
      <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-6xl">
            <span aria-hidden>{product.image}</span>
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-3xl font-extrabold text-gray-900">{product.nameBn}</h1>
            <p className="mt-1 text-gray-600">
              আজকের বাজারদর {formatTaka(product.today)} ({unitLabel(product.unit)}) —{" "}
              {trendText}।
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Link
                href={`/category/${product.category}`}
                className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700 hover:bg-emerald-200"
              >
                {product.categoryIcon} {product.categoryNameBn}
              </Link>
              <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700">
                {unitLabel(product.unit)}
              </span>
              <PriceBadge dir={dir} pct={pct} />
            </div>
          </div>
          <div className="sm:text-right">
            <p className="text-sm text-gray-500">আজকের দাম</p>
            <p className="text-3xl font-extrabold text-gray-900">{formatTaka(product.today)}</p>
          </div>
        </div>
      </section>

      {/* Price summary */}
      <section className="mt-8" aria-labelledby="price-summary">
        <h2 id="price-summary" className="mb-4 text-xl font-bold">
          দামের সারসংক্ষেপ
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard label="সর্বনিম্ন দাম" value={formatTaka(min)} tone="green" />
          <StatCard label="সর্বোচ্চ দাম" value={formatTaka(max)} tone="red" />
          <StatCard label="গড় দাম" value={formatTaka(avg)} tone="blue" />
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          {history.map((h) => (
            <div key={h.label} className="rounded-xl border border-gray-200 bg-white p-4 text-center">
              <p className="text-xs text-gray-500 sm:text-sm">{h.label}</p>
              <p className="mt-1 text-base font-bold sm:text-lg">{formatTaka(h.value)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Market wise */}
      <section className="mt-10" aria-labelledby="market-wise">
        <h2 id="market-wise" className="mb-4 text-xl font-bold">
          বাজারভিত্তিক আজকের দাম
        </h2>

        <div className="space-y-6">
          {[...byDivision.entries()].map(([division, markets]) => (
            <div key={division} className="rounded-2xl border border-gray-200 bg-white p-5">
              <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-emerald-700">
                📍 {division} বিভাগ
              </h3>
              <ul className="divide-y divide-gray-100">
                {markets.map((m) => {
                  const left = ((m.min - min) / range) * 100;
                  const width = Math.max(((m.max - m.min) / range) * 100, 2);
                  return (
                    <li key={m.market} className="py-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-semibold text-gray-800">{m.market}</span>
                        <span className="text-sm text-gray-700">
                          <span className="font-bold text-green-700">{formatBnNumber(m.min)}</span>
                          {" – "}
                          <span className="font-bold text-red-700">{formatBnNumber(m.max)}</span>{" "}
                          টাকা
                        </span>
                      </div>
                      <div className="relative mt-2 h-2 rounded-full bg-gray-100" aria-hidden>
                        <div
                          className="absolute h-2 rounded-full bg-emerald-500"
                          style={{ left: `${left}%`, width: `${Math.min(width, 100 - left)}%` }}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-10">
        <Link href="/" className="btn btn-outline border-emerald-600 text-emerald-700 hover:bg-emerald-600 hover:border-emerald-600 hover:text-white">
          ← সব পণ্যে ফিরে যান
        </Link>
      </div>
    </div>
  );
}
