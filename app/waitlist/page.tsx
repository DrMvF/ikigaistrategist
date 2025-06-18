'use client';

import { track } from '@vercel/analytics/react';

export default function WaitlistPage() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-start px-8 sm:px-20 pt-40 sm:pt-56 font-cm text-black dark:text-white bg-white dark:bg-black">
      <main className="flex flex-col items-center text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
          Ikigai Strategist
        </h1>

        <p className="text-xl sm:text-2xl">
          A radically simple, deeply powerful habit tracker
        </p>

        <div className="h-12 sm:h-16" />

        <p className="text-lg sm:text-xl">
          Built in public. Designed for alignment.
        </p>
        <p className="text-lg sm:text-xl mb-12">
          Thank you for being early.
        </p>

        <form
          action="https://radicalsensitiveleadership.mailcoach.app/subscribe/ed7af73e-6251-434c-816f-28012afe6452"
          method="post"
          onSubmit={() => track('click_waitlist')}
          className="flex flex-col gap-4 w-full max-w-xs"
        >
          <input
            type="email"
            name="email"
            required
            placeholder="Your email address"
            className="w-full border border-black dark:border-white rounded-full px-6 py-3 text-lg sm:text-xl text-center bg-white dark:bg-black text-black dark:text-white"
          />
          <input
            type="hidden"
            name="tags"
            value="ikigai strategist"
          />
          <input
            type="submit"
            value="Join the Waitlist"
            className="cursor-pointer rounded-full bg-black text-white px-6 py-3 text-lg sm:text-xl text-center hover:bg-[#383838] transition-colors dark:bg-white dark:text-black dark:hover:bg-[#e5e5e5]"
          />
        </form>
      </main>
    </div>
  );
}
