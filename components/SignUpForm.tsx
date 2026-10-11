"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "./SocialButtons";

export default function SignUpForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError("");

    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");

    let msg = "";
    if (!name) msg = "আপনার নাম দিন";
    else if (!/^\S+@\S+\.\S+$/.test(email)) msg = "সঠিক ইমেইল দিন";
    else if (password.length < 6) msg = "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে";

    if (msg) {
      setFormError(msg);
      toast.error(msg);
      return;
    }

    setLoading(true);
    const { error } = await authClient.signUp.email({ name, email, password });
    setLoading(false);

    if (error) {
      const text = error.message || "রেজিস্ট্রেশন করা যায়নি, আবার চেষ্টা করুন";
      setFormError(text);
      toast.error(text);
      return;
    }

    toast.success("রেজিস্ট্রেশন সফল! এখন সাইন ইন করুন");
    router.push("/signin");
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      <h1 className="text-center text-2xl font-extrabold text-gray-900">অ্যাকাউন্ট খুলুন</h1>
      <p className="mt-1 text-center text-sm text-gray-600">বিনামূল্যে রেজিস্ট্রেশন করুন</p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
        <label className="form-control w-full">
          <span className="label-text mb-1 font-semibold">নাম</span>
          <input
            name="name"
            type="text"
            autoComplete="name"
            placeholder="আপনার নাম"
            className="input input-bordered w-full bg-white"
          />
        </label>

        <label className="form-control w-full">
          <span className="label-text mb-1 font-semibold">ইমেইল</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className="input input-bordered w-full bg-white"
          />
        </label>

        <label className="form-control w-full">
          <span className="label-text mb-1 font-semibold">পাসওয়ার্ড</span>
          <input
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="কমপক্ষে ৬ অক্ষর"
            className="input input-bordered w-full bg-white"
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
          {loading ? <span className="loading loading-spinner loading-sm" /> : "রেজিস্টার করুন"}
        </button>
      </form>

      <div className="divider my-6 text-xs text-gray-500">অথবা</div>
      <SocialButtons callbackURL="/" />

      <p className="mt-6 text-center text-sm text-gray-600">
        আগে থেকেই অ্যাকাউন্ট আছে?{" "}
        <Link href="/signin" className="font-bold text-emerald-700 hover:underline">
          সাইন ইন করুন
        </Link>
      </p>
    </div>
  );
}
