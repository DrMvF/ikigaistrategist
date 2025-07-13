'use client';

export const dynamic = "force-dynamic"; // <-- HINZUFÜGEN

import { SignUp } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

export default function SignUpPage() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect_url") || "/start";

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
      <SignUp
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in"
        redirectUrl={redirectUrl}
      />
    </div>
  );
}
