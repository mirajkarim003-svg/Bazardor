"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import type { Category } from "@/lib/types";
import { banglaDate } from "@/lib/bn";
import { authClient } from "@/lib/auth-client";

function closeDropdown() {
  (document.activeElement as HTMLElement | null)?.blur();
}

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
    closeDropdown();
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

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl px-4">
        {/* Row 1: logo + date | auth */}
        <div className="flex items-center justify-between gap-3 py-3">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white">
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
            </span>
            <span className="leading-tight">
              <span className="block text-base font-extrabold text-gray-900">বাজার দর</span>
              <span className="block min-h-4 text-xs text-gray-500">{date}</span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            {isPending ? (
              <div className="skeleton h-9 w-24 rounded-lg" />
            ) : user ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1 hover:bg-gray-50"
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
                  <span className="hidden max-w-28 truncate text-sm font-medium text-gray-800 sm:block">
                    {user.name}
                  </span>
                  <svg className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div
                  tabIndex={0}
                  className="dropdown-content z-50 mt-2 w-60 rounded-xl border border-gray-200 bg-white p-2 shadow-lg"
                >
                  <div className="px-3 py-2">
                    <p className="truncate text-sm font-bold text-gray-900">{user.name}</p>
                    <p className="truncate text-xs text-gray-500">{user.email}</p>
                  </div>
                  <div className="my-1 border-t border-gray-100" />
                  <Link
                    href="/profile"
                    onClick={closeDropdown}
                    className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    আমার প্রোফাইল
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                  >
                    সাইন আউট
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  className="btn btn-sm sm:btn-md border-emerald-600 bg-white text-emerald-700 hover:border-emerald-600 hover:bg-emerald-600 hover:text-white"
                >
                  সাইন আপ
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Row 2: category links */}
        <nav className="-mx-4 flex gap-1 overflow-x-auto px-4 pb-2.5" aria-label="পণ্যের ধরন">
          {categories.map((c) => {
            const href = `/category/${c.slug}`;
            const active = pathname === href;
            return (
              <Link
                key={c.id}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition ${
                  active
                    ? "bg-emerald-600 text-white"
                    : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
                }`}
              >
                <span aria-hidden>{c.icon}</span>
                {c.nameBn}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
