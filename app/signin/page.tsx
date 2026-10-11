import { Suspense } from "react";
import SignInForm from "@/components/SignInForm";

export const metadata = { title: "সাইন ইন | বাজার দর" };

function FormSkeleton() {
  return (
    <div className="mx-auto w-full max-w-md space-y-4 rounded-3xl border border-gray-200 bg-white p-8">
      <div className="skeleton mx-auto h-8 w-40" />
      <div className="skeleton h-12 w-full" />
      <div className="skeleton h-12 w-full" />
      <div className="skeleton h-12 w-full" />
    </div>
  );
}

export default function SignInPage() {
  return (
    <div className="px-4 py-12">
      <Suspense fallback={<FormSkeleton />}>
        <SignInForm />
      </Suspense>
    </div>
  );
}
