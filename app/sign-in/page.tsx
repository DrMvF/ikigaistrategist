'use client';

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
      <SignIn
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up" // 👈 WICHTIG!
      />
    </div>
  );
}
