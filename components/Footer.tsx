export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-gray-600 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="flex items-center gap-2 text-lg font-extrabold text-emerald-700">
            <span aria-hidden>🛒</span> বাজার দর
          </p>
          <p>প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
        </div>
        <p className="md:max-w-sm md:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}
