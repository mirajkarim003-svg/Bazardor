import type { Category, Product } from "./types";

/**
 * Main API first (the one from the latest mail), then the two alternatives
 * from the assignment sheet as fallbacks.
 */
const UPSTREAMS = [
  "https://openapi.programming-hero.com/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

export interface UpstreamResult {
  ok: boolean;
  status: number;
  data: unknown;
}

/** Try every upstream in order and return the first successful JSON response. */
export async function fetchUpstream(
  path: string,
  revalidate = 300
): Promise<UpstreamResult> {
  let last: UpstreamResult = { ok: false, status: 502, data: null };

  for (const base of UPSTREAMS) {
    try {
      const res = await fetch(`${base}${path}`, {
        next: { revalidate },
        headers: { accept: "application/json" },
      });
      if (res.ok) {
        return { ok: true, status: res.status, data: await res.json() };
      }
      // A real 404 means "this item does not exist" – no point asking mirrors.
      if (res.status === 404) return { ok: false, status: 404, data: null };
      last = { ok: false, status: res.status, data: null };
    } catch {
      // network error -> try next upstream
    }
  }
  return last;
}

/** Some API versions may wrap the array in { data: [...] }. Handle both. */
function unwrapArray<T>(data: unknown): T[] {
  if (Array.isArray(data)) return data as T[];
  if (data && typeof data === "object") {
    const inner = (data as { data?: unknown; products?: unknown; categories?: unknown });
    const candidate = inner.data ?? inner.products ?? inner.categories;
    if (Array.isArray(candidate)) return candidate as T[];
  }
  return [];
}

export async function getProducts(): Promise<Product[]> {
  const res = await fetchUpstream("/products");
  return res.ok ? unwrapArray<Product>(res.data) : [];
}

export async function getCategories(): Promise<Category[]> {
  const res = await fetchUpstream("/categories");
  return res.ok ? unwrapArray<Category>(res.data) : [];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find((p) => p.slug === slug) ?? null;
}
