import { ProductGridSkeleton } from "@/components/ProductGrid";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-6">
      <div className="skeleton h-56 w-full rounded-2xl" />
      <div className="space-y-3">
        <div className="skeleton h-5 w-40" />
        <ProductGridSkeleton count={6} />
      </div>
    </div>
  );
}
