"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "./SocialButtons";

export default function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const toasted = useRef(false);

  // Only allow same-site relative redirects.
  const rawCallback = params.get("callbackUrl");
  const callbackUrl =
    rawCallback && rawCallback.startsWith("/") && !rawCallback.startsWith("//") ? rawCallback : "/";

  // Toast when middleware bounced the user from a protected route.
  useEffect(() => {
    if (params.get("error") === "login-required" && !toasted.current) {
      toasted.current = true;
      toast.error("এই পেজ দেখতে আগে সাইন ইন করুন");
    }
  }, [params]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError("");

    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");

    if (!email || !password) {
      const msg = "ইমেইল ও পাসওয়ার্ড দুটোই দিন";
      setFormError(msg);
      toast.error(msg);
      return;
    }

    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (error) {
      const msg = "ইমেইল বা পাসওয়ার্ড ভুল হয়েছে";
      setFormError(msg);
      toast.error(msg);
      return;
    }

    toast.success("সফলভাবে সাইন ইন হয়েছে");
    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="mb-5 text-center">
        <h1 className="text-2xl font-extrabold text-gray-900">সাইন ইন</h1>
        <p className="mt-1 text-sm text-gray-500">
          ইমেইল ও পাসওয়ার্ড দিয়ে আপনার অ্যাকাউন্টে প্রবেশ করুন
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <form onSubmit={onSubmit} className="space-y-4" noValidate>
          <label className="form-control w-full">
            <span className="mb-1 text-sm font-medium text-gray-700">ইমেইল</span>
            <input
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className="input input-bordered w-full bg-gray-50"
            />
          </label>

          <label className="form-control w-full">
            <span className="mb-1 text-sm font-medium text-gray-700">পাসওয়ার্ড</span>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              className="input input-bordered w-full bg-gray-50"
            />
          </label>

          {formError && (
            <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
              {formError}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn w-full border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-700"
          >
            {loading ? <span className="loading loading-spinner loading-sm" /> : "সাইন ইন"}
          </button>
        </form>

        <div className="divider my-4 text-xs text-gray-400">অথবা</div>
        <SocialButtons callbackURL={callbackUrl} verb="সাইন ইন" />

        <p className="mt-5 text-center text-sm text-gray-600">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/signup" className="font-semibold text-emerald-700 hover:underline">
            সাইন আপ করুন
          </Link>
        </p>
      </div>

      <p className="mt-5 text-center text-sm">
        <Link href="/" className="text-gray-500 hover:text-emerald-700">
          ← হোমে ফিরে যান
        </Link>
      </p>
    </div>
  );
}
