import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import { getProducts } from "@/lib/api";
import { topFallers, topRisers } from "@/lib/products";

export default async function HomePage() {
  const products = await getProducts();

  if (!products.length) {
    return (
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-6">
        <Hero />
        <div className="py-12 text-center">
          <p className="text-5xl">📡</p>
          <h2 className="mt-3 text-xl font-bold">এই মুহূর্তে তথ্য লোড করা যাচ্ছে না</h2>
          <p className="mt-1 text-gray-600">কিছুক্ষণ পরে পেজটি রিফ্রেশ করুন।</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-6">
      <Hero />

      <section>
        <h2 className="mb-3 text-base font-bold text-gray-900">
          আজ দাম বেড়েছে <span className="text-red-500">▲</span>
        </h2>
        <ProductGrid products={topRisers(products)} />
      </section>

      <section>
        <h2 className="mb-3 text-base font-bold text-gray-900">
          আজ দাম কমেছে <span className="text-green-600">▼</span>
        </h2>
        <ProductGrid products={topFallers(products)} />
      </section>

      <section id="সব-পণ্য" className="scroll-mt-4">
        <h2 className="text-base font-bold text-gray-900">সব পণ্য</h2>
        <p className="mb-3 text-sm text-gray-500">
          প্রয়োজনীয় সব পণ্যের আজকের দাম ও পরিবর্তন এক জায়গায়
        </p>
        <ProductGrid products={products} />
      </section>
    </div>
  );
}
