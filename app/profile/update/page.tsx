"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  // Pre-fill the field once the session is available
  useEffect(() => {
    if (user?.name) setName(user.name);
  }, [user?.name]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      toast.error("নাম খালি রাখা যাবে না");
      return;
    }

    setLoading(true);
    // https://better-auth.com/docs/concepts/users-accounts#update-user
    const { error } = await authClient.updateUser({ name: trimmed });
    setLoading(false);

    if (error) {
      toast.error(error.message || "তথ্য আপডেট করা যায়নি");
      return;
    }

    toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="mb-5">
        <h1 className="text-2xl font-extrabold text-gray-900">আমার প্রোফাইল</h1>
        <p className="mt-1 text-sm text-gray-500">আপনার নাম পরিবর্তন করে আপডেট করুন</p>
      </div>

      {isPending ? (
        <div className="space-y-4">
          <div className="skeleton h-20 w-full rounded-xl" />
          <div className="skeleton h-44 w-full rounded-xl" />
        </div>
      ) : (
        <div className="space-y-4">
          {user && (
            <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
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
              <div className="min-w-0">
                <p className="truncate font-bold text-gray-900">{user.name}</p>
                <p className="truncate text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
          )}

          <form
            onSubmit={onSubmit}
            noValidate
            className="space-y-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <h2 className="font-bold text-gray-900">তথ্য আপডেট করুন</h2>

            <label className="form-control w-full">
              <span className="mb-1 text-sm font-medium text-gray-700">নাম</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="আপনার নাম"
                className="input input-bordered w-full bg-gray-50"
              />
            </label>

            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="submit"
                disabled={loading}
                className="btn flex-1 border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-700"
              >
                {loading ? <span className="loading loading-spinner loading-sm" /> : "Update Information"}
              </button>
              <Link href="/profile" className="btn btn-ghost">
                বাতিল করুন
              </Link>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
