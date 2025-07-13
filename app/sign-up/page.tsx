// app/sign-up/page.tsx

'use client';

export const dynamic = "force-dynamic";

import { SignUp } from "@clerk/nextjs";
import { Suspense } from "react";
import SignUpWithParams from "./SignUpWithParams";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
      <Suspense fallback={<div>Loading...</div>}>
        <SignUpWithParams />
      </Suspense>
    </div>
  );
}
