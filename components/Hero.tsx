export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-emerald-50 via-white to-amber-50">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 md:grid-cols-2 md:py-16">
        <div>
          <p className="mb-3 inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700 sm:text-sm">
            📊 প্রতিদিনের বাজার আপডেট
          </p>
          <h1 className="text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
            আজকের বাজার দর,
            <span className="block text-emerald-600">এক নজরে জেনে নিন</span>
          </h1>
          <p className="mt-4 max-w-lg text-base text-gray-600 sm:text-lg">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস ও মসলার সর্বশেষ দাম এবং দামের ওঠানামা
            দেখুন—বাজারে যাওয়ার আগেই সিদ্ধান্ত নিন।
          </p>
          {/* Anchor link: scrolls on the same page, no route change */}
          <a
            href="#সব-পণ্য"
            className="btn mt-6 border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-700 btn-md sm:btn-lg"
          >
            সব পণ্যের দাম দেখুন ↓
          </a>
        </div>

        {/* Banner illustration (pure CSS/emoji so it never breaks offline) */}
        <div className="relative mx-auto w-full max-w-md" aria-hidden>
          <div className="grid grid-cols-3 gap-3 rounded-3xl bg-white p-5 shadow-xl ring-1 ring-emerald-100">
            {["🍚", "🫘", "🫙", "🥔", "🧅", "🌶️", "🐟", "🍗", "🥚"].map((e, i) => (
              <div
                key={i}
                className={`flex aspect-square items-center justify-center rounded-2xl text-4xl sm:text-5xl ${
                  i % 2 === 0 ? "bg-emerald-50" : "bg-amber-50"
                }`}
              >
                {e}
              </div>
            ))}
          </div>
          <div className="absolute -bottom-4 -left-2 rounded-xl bg-green-600 px-3 py-2 text-sm font-bold text-white shadow-lg">
            ▲ দাম বেড়েছে
          </div>
          <div className="absolute -right-2 -top-4 rounded-xl bg-red-500 px-3 py-2 text-sm font-bold text-white shadow-lg">
            ▼ দাম কমেছে
          </div>
        </div>
      </div>
    </section>
  );
}
