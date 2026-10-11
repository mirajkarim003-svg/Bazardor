"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="mb-5">
        <h1 className="text-2xl font-extrabold text-gray-900">আমার প্রোফাইল</h1>
        <p className="mt-1 text-sm text-gray-500">আপনার অ্যাকাউন্টের তথ্য এখান থেকে দেখুন</p>
      </div>

      {isPending ? (
        <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4">
          <div className="skeleton h-14 w-14 rounded-lg" />
          <div className="flex-1 space-y-2">
            <div className="skeleton h-4 w-40" />
            <div className="skeleton h-3 w-56" />
          </div>
        </div>
      ) : !user ? (
        <div className="rounded-xl border border-gray-200 bg-white p-6 text-center">
          <p className="text-gray-600">প্রোফাইল দেখতে সাইন ইন করুন।</p>
          <Link href="/signin" className="btn mt-4 border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-700">
            সাইন ইন
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
          {user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.image}
              alt={user.name}
              referrerPolicy="no-referrer"
              className="h-14 w-14 rounded-lg object-cover"
            />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-emerald-600 text-2xl font-bold text-white">
              {(user.name || user.email).trim().charAt(0).toUpperCase()}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate font-bold text-gray-900">{user.name}</p>
            <p className="truncate text-sm text-gray-500">{user.email}</p>
          </div>
          <Link
            href="/profile/update"
            className="btn btn-sm border-red-300 bg-white text-red-500 hover:border-red-400 hover:bg-red-50"
          >
            ✎ তথ্য আপডেট করুন
          </Link>
        </div>
      )}
    </div>
  );
}
