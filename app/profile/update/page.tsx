"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  // Pre-fill the field once the session is available
  useEffect(() => {
    if (session?.user?.name) setName(session.user.name);
  }, [session?.user?.name]);

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
    <div className="mx-auto max-w-md px-4 py-12">
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-center text-2xl font-extrabold text-gray-900">তথ্য আপডেট করুন</h1>

        {isPending ? (
          <div className="mt-6 space-y-4">
            <div className="skeleton h-12 w-full" />
            <div className="skeleton h-12 w-full" />
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
            <label className="form-control w-full">
              <span className="label-text mb-1 font-semibold">নাম</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="আপনার নাম"
                className="input input-bordered w-full bg-white"
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="btn w-full border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-700"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                "Update Information"
              )}
            </button>

            <Link href="/profile" className="btn btn-ghost w-full">
              বাতিল করুন
            </Link>
          </form>
        )}
      </div>
    </div>
  );
}
