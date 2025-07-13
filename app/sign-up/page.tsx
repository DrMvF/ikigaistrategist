// app/sign-up/page.tsx

'use client';

import { useEffect, useState } from "react";
import { SignUp } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

export const dynamic = "force-dynamic";

export default function SignUpPage() {
  const searchParams = useSearchParams();
  const [redirectUrl, setRedirectUrl] = useState("/start");

  useEffect(() => {
    const url = searchParams.get("redirect_url");
    if (url) {
      setRedirectUrl(url);
    }
  }, [searchParams]);

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
