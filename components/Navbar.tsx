"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import type { Category } from "@/lib/types";
import { banglaDate } from "@/lib/bn";
import { authClient } from "@/lib/auth-client";

export default function Navbar({ categories }: { categories: Category[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [date, setDate] = useState("");

  // Computed on the client only, so server/client timezones never mismatch.
  useEffect(() => {
    setDate(banglaDate());
  }, []);

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সফলভাবে সাইন আউট হয়েছে");
          router.push("/");
          router.refresh();
        },
        onError: () => toast.error("সাইন আউট করা যায়নি, আবার চেষ্টা করুন"),
      },
    });
  };

  const user = session?.user;
  const initial = (user?.name || user?.email || "?").trim().charAt(0).toUpperCase();

  const linkClass = (active: boolean) =>
    `whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-semibold transition ${
      active
        ? "bg-emerald-600 text-white shadow"
        : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4">
        {/* Row 1: logo + date | auth */}
        <div className="flex items-center justify-between gap-3 py-3">
          <Link href="/" className="leading-tight">
            <span className="flex items-center gap-2 text-xl font-extrabold text-emerald-700 sm:text-2xl">
              <span aria-hidden>🛒</span> বাজার দর
            </span>
            <span className="block min-h-4 text-xs text-gray-500">{date}</span>
          </Link>

          <div className="flex items-center gap-2">
            {isPending ? (
              <div className="skeleton h-9 w-24 rounded-full" />
            ) : user ? (
              <div className="dropdown dropdown-end">
                <button
                  tabIndex={0}
                  className="flex items-center gap-2 rounded-full border border-gray-200 py-1 pl-1 pr-3 hover:bg-gray-50"
                  aria-label="প্রোফাইল মেনু"
                >
                  {user.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={user.image}
                      alt=""
                      className="h-8 w-8 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
                      {initial}
                    </span>
                  )}
                  <span className="hidden max-w-28 truncate text-sm font-semibold sm:block">
                    {user.name}
                  </span>
                </button>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content z-50 mt-2 w-48 rounded-box border border-gray-100 bg-white p-2 shadow-lg"
                >
                  <li>
                    <Link href="/profile">আমার প্রোফাইল</Link>
                  </li>
                  <li>
                    <button onClick={handleSignOut}>সাইন আউট</button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="btn btn-sm sm:btn-md btn-outline border-emerald-600 text-emerald-700 hover:border-emerald-600 hover:bg-emerald-600 hover:text-white"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  className="btn btn-sm sm:btn-md border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-700"
                >
                  সাইন আপ
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Row 2: category links */}
        <nav
          className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-3 sm:justify-center"
          aria-label="পণ্যের ধরন"
        >
          <Link href="/" className={linkClass(pathname === "/")}>
            🏠 সব পণ্য
          </Link>
          {categories.map((c) => {
            const href = `/category/${c.slug}`;
            return (
              <Link
                key={c.id}
                href={href}
                className={linkClass(pathname === href)}
                aria-current={pathname === href ? "page" : undefined}
              >
                <span aria-hidden>{c.icon}</span> {c.nameBn}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
