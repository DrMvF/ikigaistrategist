'use client';

export const dynamic = "force-dynamic"; // ✅ VERHINDERT BUILD-FEHLER

import { SignIn } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

export default function SignInPage() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect_url") || "/start";

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
      <SignIn
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up"
        redirectUrl={redirectUrl}
      />
    </div>
  );
}
