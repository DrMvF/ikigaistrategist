'use client';

import { track } from '@vercel/analytics/react';

export default function WaitlistPage() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-8 sm:p-20 font-cm">
      <main className="flex flex-col items-center text-center max-w-xl">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6">
          Ikigai Strategist
        </h1>
        <p className="text-base sm:text-lg text-gray-800 mb-12">
          Join the waitlist for the most radically sensitive habit tracker.
        </p>

        <form
          action="https://radicalsensitiveleadership.mailcoach.app/subscribe/ed7af73e-6251-434c-816f-28012afe6452"
          method="post"
          className="flex flex-col gap-4 w-full"
          onSubmit={() => track('submit_waitlist_form')}
        >
          <input
            type="email"
            name="email"
            placeholder="Your email address"
            required
            className="w-full border border-black px-4 py-3 text-base"
          />
          <input
            type="hidden"
            name="tags"
            value="ikigai strategist"
          />
          <input
            type="submit"
            value="Join the Waitlist"
            className="w-full rounded-full bg-black text-white px-6 py-3 text-base hover:bg-[#383838] transition-colors cursor-pointer"
          />
        </form>
      </main>
    </div>
  );
}
