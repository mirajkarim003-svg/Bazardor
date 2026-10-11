"use client";

import { useEffect, useMemo, useState } from "react";
import type { Category, Product } from "@/lib/types";
import { sortProducts, type SortMode } from "@/lib/products";
import ProductGrid, { ProductGridSkeleton } from "./ProductGrid";
import NotFoundView from "./NotFoundView";

type State =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; category: Category | null; products: Product[] };

export default function CategoryClient({ slug }: { slug: string }) {
  const [state, setState] = useState<State>({ status: "loading" });
  const [sort, setSort] = useState<SortMode>("default");

  useEffect(() => {
    let cancelled = false;
    setState({ status: "loading" });

    async function load() {
      try {
        const [pRes, cRes] = await Promise.all([
          fetch(`/api/market/products?category=${encodeURIComponent(slug)}`),
          fetch("/api/market/categories"),
        ]);

        const products: Product[] = pRes.ok ? await pRes.json() : [];
        const categories: Category[] = cRes.ok ? await cRes.json() : [];
        const category = categories.find((c) => c.slug === slug) ?? null;

        // Defensive: keep only items that really belong to this category.
        const list = Array.isArray(products)
          ? products.filter((p) => p.category === slug)
          : [];

        if (!cancelled) setState({ status: "ready", category, products: list });
      } catch {
        if (!cancelled) setState({ status: "error" });
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const sorted = useMemo(
    () => (state.status === "ready" ? sortProducts(state.products, sort) : []),
    [state, sort]
  );

  if (state.status === "loading") {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-6 flex items-center justify-between">
          <div className="skeleton h-9 w-48" />
          <div className="skeleton h-10 w-56" />
        </div>
        <ProductGridSkeleton count={8} />
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <NotFoundView
        title="তথ্য লোড করা যায়নি"
        message="ইন্টারনেট সংযোগ দেখে কিছুক্ষণ পরে আবার চেষ্টা করুন।"
      />
    );
  }

  // Invalid slug or a category without items -> 404-style empty state
  if (!state.category || state.products.length === 0) {
    return (
      <NotFoundView
        title="এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি"
        message="ক্যাটাগরিটি হয়তো ঠিক নয় অথবা এখানে এখনো কোনো পণ্য যোগ করা হয়নি।"
      />
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="flex items-center gap-3 text-3xl font-extrabold text-gray-900">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-3xl">
            {state.category.icon}
          </span>
          {state.category.nameBn}
        </h1>

        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          <span>সাজান:</span>
          <span className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortMode)}
              className="appearance-none rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-9 text-sm font-medium text-gray-800 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            >
              <option value="default">ডিফল্ট</option>
              <option value="asc">দাম: কম থেকে বেশি</option>
              <option value="desc">দাম: বেশি থেকে কম</option>
            </select>
            <svg
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </label>
      </div>

      <ProductGrid products={sorted} />
    </div>
  );
}
