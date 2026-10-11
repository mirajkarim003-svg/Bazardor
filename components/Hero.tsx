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
        {/* Anchor link: scrolls on the same page, no route change */}
        <a
          href="#সব-পণ্য"
          className="btn mt-5 border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-700"
        >
          সব পণ্যের দাম দেখুন
        </a>
      </div>

      <div className="flex justify-center md:justify-end" aria-hidden>
        <svg viewBox="0 0 320 260" className="h-auto w-full max-w-xs">
          {/* vegetables */}
          <ellipse cx="108" cy="104" rx="40" ry="36" fill="#e53935" />
          <path d="M108 68c-8-10-18-12-26-8 9 1 14 5 17 11 3-6 7-8 9-3z" fill="#2e7d32" />
          <ellipse cx="170" cy="86" rx="22" ry="42" fill="#6a1b9a" transform="rotate(-12 170 86)" />
          <path d="M160 46c4-8 12-10 18-6-6 1-9 4-10 9z" fill="#2e7d32" />
          <path
            d="M215 80c-22 0-34 18-30 44 3 16 14 24 30 24s27-8 30-24c4-26-8-44-30-44z"
            fill="#43a047"
          />
          <path d="M215 80c0-9 3-15 9-18" stroke="#1b5e20" strokeWidth="5" fill="none" strokeLinecap="round" />
          <ellipse cx="150" cy="130" rx="34" ry="30" fill="#ef5350" />
          <ellipse cx="228" cy="140" rx="24" ry="30" fill="#fb8c00" transform="rotate(14 228 140)" />
          <ellipse cx="82" cy="140" rx="22" ry="12" fill="#66bb6a" transform="rotate(-25 82 140)" />
          <ellipse cx="256" cy="118" rx="22" ry="11" fill="#81c784" transform="rotate(30 256 118)" />

          {/* basket */}
          <path d="M44 146H276L252 232Q249 244 236 244H84Q71 244 68 232Z" fill="#c68642" />
          <g stroke="#a8691f" strokeWidth="3" strokeLinecap="round" opacity="0.85">
            <path d="M52 170H268" />
            <path d="M58 192H262" />
            <path d="M64 214H256" />
            <path d="M100 148L90 242M140 148L135 242M180 148L185 242M220 148L230 242" />
          </g>
          <rect x="34" y="134" width="252" height="20" rx="10" fill="#b0702a" />
        </svg>
      </div>
    </section>
  );
}
