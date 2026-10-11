import Link from "next/link";

export default function NotFoundView({
  title = "পেজটি খুঁজে পাওয়া যায়নি",
  message = "আপনি যে ঠিকানাটি খুঁজছেন সেটি হয়তো সরিয়ে ফেলা হয়েছে বা কখনো ছিলই না।",
}: {
  title?: string;
  message?: string;
}) {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-20 text-center">
      <p className="text-7xl font-extrabold text-emerald-600">৪০৪</p>
      <p className="mt-2 text-5xl" aria-hidden>
        🛒
      </p>
      <h1 className="mt-4 text-2xl font-bold text-gray-900">{title}</h1>
      <p className="mt-2 text-gray-600">{message}</p>
      <Link
        href="/"
        className="btn mt-6 border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-700"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
