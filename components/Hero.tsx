import Image from "next/image";

export default function Hero() {
  return (
    <section className="grid items-center gap-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 md:grid-cols-2">
      <div>
        <p className="mb-3 inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          প্রতিদিনের বাজারদর
        </p>
        <h1 className="text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl">
          আজকের বাজারের দাম এক নজরে
        </h1>
        <p className="mt-3 max-w-md text-sm text-gray-600 sm:text-base">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার আজকের দাম এবং দামের ওঠানামা
          দেখুন—বাজারে যাওয়ার আগেই জেনে নিন।
        </p>
        <a
          href="#সব-পণ্য"
          className="btn mt-5 border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-700"
        >
          সব পণ্যের দাম দেখুন
        </a>
      </div>

      <div className="flex justify-center md:justify-end">
        <Image
          src="/bazar-hero.png"
          alt="বাজারের সবজির ঝুড়ি"
          width={640}
          height={480}
          priority
          className="h-auto w-full max-w-xs md:max-w-sm"
        />
      </div>
    </section>
  );
}