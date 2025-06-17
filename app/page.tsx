'use client';

import { track } from '@vercel/analytics';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-start px-8 sm:px-20 pt-40 sm:pt-56 font-cm text-black">
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

        <div className="flex flex-col gap-4 w-full max-w-xs">
          <a
            href="https://radicalsensitiveleadership.mailcoach.app/subscribe/ed7af73e-6251-434c-816f-28012afe6452"
            onClick={() => track('click_waitlist')}
            className="rounded-full bg-black text-white px-6 py-3 text-lg sm:text-xl text-center hover:bg-[#383838] transition-colors"
          >
            Join the Waitlist
          </a>
        </div>
      </main>
    </div>
  );
}
