'use client';

export const dynamic = "force-dynamic";

import { SignIn } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

// 👇 SignIn Wrapper
function SignInWrapper() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect_url") || "/start";

  return (
    <SignIn
      path="/sign-in"
      routing="path"
      signUpUrl="/sign-up"
      redirectUrl={redirectUrl}
    />
  );
}

// 👇 Haupt-Komponente mit Suspense
export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
      <Suspense fallback={<div>Loading sign-in...</div>}>
        <SignInWrapper />
      </Suspense>
    </div>
  );
}
