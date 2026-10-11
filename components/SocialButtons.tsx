"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

type Provider = "google" | "github";

export default function SocialButtons({ callbackURL = "/" }: { callbackURL?: string }) {
  const [loading, setLoading] = useState<Provider | null>(null);

  const handle = async (provider: Provider) => {
    setLoading(provider);
    try {
      const { error } = await authClient.signIn.social({ provider, callbackURL });
      if (error) {
        toast.error(error.message || "সোশ্যাল লগইন করা যায়নি");
        setLoading(null);
      }
      // On success the browser is redirected to the provider, then back to callbackURL.
    } catch {
      toast.error("সোশ্যাল লগইন করা যায়নি, আবার চেষ্টা করুন");
      setLoading(null);
    }
  };

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <button
        type="button"
        onClick={() => handle("google")}
        disabled={loading !== null}
        className="btn btn-outline gap-2"
      >
        {loading === "google" ? (
          <span className="loading loading-spinner loading-sm" />
        ) : (
          <svg className="h-5 w-5" viewBox="0 0 48 48" aria-hidden>
            <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.6-.4-3.9z" />
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
            <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
            <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z" />
          </svg>
        )}
        Google
      </button>

      <button
        type="button"
        onClick={() => handle("github")}
        disabled={loading !== null}
        className="btn btn-outline gap-2"
      >
        {loading === "github" ? (
          <span className="loading loading-spinner loading-sm" />
        ) : (
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 015.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.8 1.19 1.83 1.19 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0023.5 12C23.5 5.65 18.35.5 12 .5z" />
          </svg>
        )}
        GitHub
      </button>
    </div>
  );
}
