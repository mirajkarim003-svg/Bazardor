"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  if (isPending) {
    return (
      <div className="mx-auto max-w-xl px-4 py-12">
        <div className="space-y-4 rounded-3xl border border-gray-200 bg-white p-8">
          <div className="skeleton mx-auto h-24 w-24 rounded-full" />
          <div className="skeleton mx-auto h-6 w-40" />
          <div className="skeleton mx-auto h-4 w-56" />
          <div className="skeleton mx-auto h-10 w-48" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <p className="text-gray-600">প্রোফাইল দেখতে সাইন ইন করুন।</p>
        <Link href="/signin" className="btn mt-4 border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-700">
          সাইন ইন
        </Link>
      </div>
    );
  }

  const initial = (user.name || user.email).trim().charAt(0).toUpperCase();

  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <div className="rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.image}
            alt={user.name}
            referrerPolicy="no-referrer"
            className="mx-auto h-24 w-24 rounded-full object-cover ring-4 ring-emerald-100"
          />
        ) : (
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-600 text-4xl font-bold text-white ring-4 ring-emerald-100">
            {initial}
          </div>
        )}

        <h1 className="mt-4 text-2xl font-extrabold text-gray-900">{user.name}</h1>
        <p className="text-gray-600">{user.email}</p>

        <dl className="mt-6 grid grid-cols-1 gap-3 text-left sm:grid-cols-2">
          <div className="rounded-xl bg-gray-50 p-4">
            <dt className="text-xs text-gray-500">নাম</dt>
            <dd className="font-semibold">{user.name}</dd>
          </div>
          <div className="rounded-xl bg-gray-50 p-4">
            <dt className="text-xs text-gray-500">ইমেইল</dt>
            <dd className="break-all font-semibold">{user.email}</dd>
          </div>
        </dl>

        <Link
          href="/profile/update"
          className="btn mt-6 border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-700"
        >
          তথ্য আপডেট করুন
        </Link>
      </div>
    </div>
  );
}
