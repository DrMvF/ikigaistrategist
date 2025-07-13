'use client';

export const dynamic = "force-dynamic";

import { SignIn } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function SignInPage() {
  const searchParams = useSearchParams();
  const [redirectUrl, setRedirectUrl] = useState("/start");

  useEffect(() => {
    const url = searchParams.get("redirect_url");
    if (url) setRedirectUrl(url);
  }, [searchParams]);

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
