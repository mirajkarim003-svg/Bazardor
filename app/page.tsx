import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import { getProducts } from "@/lib/api";
import { topFallers, topRisers } from "@/lib/products";

function SectionHeading({
  title,
  subtitle,
  id,
}: {
  title: string;
  subtitle?: string;
  id?: string;
}) {
  return (
    <div id={id} className="mb-5 scroll-mt-32">
      <h2 className="text-2xl font-extrabold text-gray-900">{title}</h2>
      {subtitle && <p className="mt-1 text-gray-600">{subtitle}</p>}
    </div>
  );
}

export default async function HomePage() {
  const products = await getProducts();

  if (!products.length) {
    return (
      <>
        <Hero />
        <div className="mx-auto max-w-6xl px-4 py-16 text-center">
          <p className="text-5xl">📡</p>
          <h2 className="mt-3 text-xl font-bold">এই মুহূর্তে তথ্য লোড করা যাচ্ছে না</h2>
          <p className="mt-1 text-gray-600">কিছুক্ষণ পরে পেজটি রিফ্রেশ করুন।</p>
        </div>
      </>
    );
  }

  const risers = topRisers(products);
  const fallers = topFallers(products);

  return (
    <>
      <Hero />

      <div className="mx-auto max-w-6xl space-y-14 px-4 py-12">
        <section aria-labelledby="risers">
          <SectionHeading id="risers" title="আজ দাম বেড়েছে ▲" subtitle="সবচেয়ে বেশি দাম বাড়া ৬টি পণ্য" />
          <ProductGrid products={risers} />
        </section>

        <section aria-labelledby="fallers">
          <SectionHeading id="fallers" title="আজ দাম কমেছে ▼" subtitle="সবচেয়ে বেশি দাম কমা ৬টি পণ্য" />
          <ProductGrid products={fallers} />
        </section>

        <section>
          <SectionHeading
            id="সব-পণ্য"
            title="সব পণ্য"
            subtitle="প্রয়োজনীয় সব পণ্যের আজকের দাম ও দামের পরিবর্তন"
          />
          <ProductGrid products={products} />
        </section>
      </div>
    </>
  );
}
