import Link from "next/link";
import { notFound } from "next/navigation";
import PriceBadge from "@/components/PriceBadge";
import { getProductBySlug } from "@/lib/api";
import { formatBnDecimal, formatBnNumber, unitLabel, unitShort } from "@/lib/bn";
import { summarize } from "@/lib/products";

function StatBox({
  label,
  value,
  note,
  color,
}: {
  label: string;
  value: string;
  note: string;
  color: string;
}) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <p className="text-xs text-gray-500">{label}</p>
      <p className={`mt-1 text-xl font-extrabold ${color}`}>
        {value} <span className="text-sm font-medium text-gray-600">টাকা</span>
      </p>
      <p className="mt-1 text-xs text-gray-500">{note}</p>
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

  const markets = product.markets ?? [];
  const { min, max, avg } = summarize(product);
  const lowest = markets.find((m) => m.min === min);
  const highest = markets.find((m) => m.max === max);

  return (
    <div className="mx-auto max-w-6xl space-y-5 px-4 py-6">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-500" aria-label="breadcrumb">
        <Link href="/" className="hover:text-emerald-700">
          হোম
        </Link>
        <span className="mx-1.5">/</span>
        <Link href={`/category/${product.category}`} className="hover:text-emerald-700">
          {product.categoryNameBn}
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-gray-700">{product.nameBn}</span>
      </nav>

      {/* Summary */}
      <section className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center">
        <span
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-4xl"
          aria-hidden
        >
          {product.image}
        </span>

        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-extrabold text-gray-900">{product.nameBn}</h1>
          <p className="mt-1 text-sm text-gray-500">
            {formatBnNumber(markets.length)}টি বাজারের তথ্য অনুযায়ী আজকের গড় দাম{" "}
            {formatBnDecimal(avg, 2)} টাকা ({unitLabel(product.unit)})।
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
            <Link
              href={`/category/${product.category}`}
              className="rounded-full bg-emerald-50 px-2.5 py-1 font-medium text-emerald-700 hover:bg-emerald-100"
            >
              {product.categoryNameBn}
            </Link>
            <span className="rounded-full bg-gray-100 px-2.5 py-1 font-medium text-gray-600">
              {unitLabel(product.unit)}
            </span>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 px-5 py-3 text-center sm:min-w-40">
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="text-3xl font-extrabold text-emerald-600">{formatBnNumber(product.today)}</p>
          <p className="text-xs text-gray-500">টাকা / {unitShort(product.unit)}</p>
          <div className="mt-1.5">
            <PriceBadge dir={product.change.dir} pct={product.change.pct} />
          </div>
        </div>
      </section>

      {/* Price summary */}
      <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="mb-3 font-bold text-gray-900">বাজার সারসংক্ষেপ</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <StatBox
            label="সর্বনিম্ন দাম"
            value={formatBnNumber(min)}
            note={lowest ? `সবচেয়ে কম: ${lowest.market}` : "—"}
            color="text-green-600"
          />
          <StatBox
            label="সর্বোচ্চ দাম"
            value={formatBnNumber(max)}
            note={highest ? `সবচেয়ে বেশি: ${highest.market}` : "—"}
            color="text-red-600"
          />
          <StatBox
            label="গড় দাম"
            value={formatBnDecimal(avg, 2)}
            note={`${formatBnNumber(markets.length)}টি বাজারের গড়`}
            color="text-sky-600"
          />
        </div>
      </section>

      {/* Market wise table */}
      <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="mb-3 font-bold text-gray-900">বাজারভিত্তিক আজকের দাম</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-700">
                <th className="border border-gray-300 px-3 py-2 font-semibold">বাজার</th>
                <th className="border border-gray-300 px-3 py-2 font-semibold">বিভাগ</th>
                <th className="border border-gray-300 px-3 py-2 text-right font-semibold">সর্বনিম্ন</th>
                <th className="border border-gray-300 px-3 py-2 text-right font-semibold">সর্বোচ্চ</th>
                <th className="border border-gray-300 px-3 py-2 text-right font-semibold">গড়</th>
              </tr>
            </thead>
            <tbody>
              {markets.map((m, i) => (
                <tr key={`${m.market}-${i}`} className={i % 2 ? "bg-gray-50" : "bg-white"}>
                  <td className="border border-gray-300 px-3 py-2 font-medium text-gray-800">{m.market}</td>
                  <td className="border border-gray-300 px-3 py-2 text-gray-600">{m.division}</td>
                  <td className="border border-gray-300 px-3 py-2 text-right text-green-700">
                    {formatBnNumber(m.min)} টাকা
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-right text-red-700">
                    {formatBnNumber(m.max)} টাকা
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-right font-semibold text-gray-800">
                    {formatBnDecimal((m.min + m.max) / 2, 2)} টাকা
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
