'use client';

import { useSearchParams } from "next/navigation";
import { SignUp } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function SignUpWithParams() {
  const searchParams = useSearchParams();
  const [redirectUrl, setRedirectUrl] = useState("/start");

  useEffect(() => {
    const url = searchParams.get("redirect_url");
    if (url) {
      setRedirectUrl(url);
    }
  }, [searchParams]);

  return (
    <SignUp
      path="/sign-up"
      routing="path"
      signInUrl="/sign-in"
      redirectUrl={redirectUrl}
    />
  );
}
