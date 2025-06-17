'use client';

import { track } from '@vercel/analytics';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-between p-8 sm:p-20 font-cm">
      <main className="flex flex-col items-center text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
          Ikigai Strategist
        </h1>

        <p className="text-lg sm:text-xl">
          A radically simple, deeply powerful habit tracker
        </p>

        <div className="h-12 sm:h-16" />

        <p className="text-base sm:text-lg text-gray-600">
          Built in public. Designed for alignment.
        </p>
        <p className="text-base sm:text-lg text-gray-600 mb-12">
          Thank you for being early.
        </p>

        <div className="flex flex-col gap-4 w-full max-w-xs">
          {/* Join Waitlist Button – Black */}
          <a
            href="https://radicalsensitiveleadership.mailcoach.app/subscribe/ed7af73e-6251-434c-816f-28012afe6452"
            onClick={() => track('click_waitlist')}
            className="rounded-full bg-black text-white px-6 py-3 text-base sm:text-lg text-center hover:bg-[#383838] transition-colors"
          >
            Join the Waitlist
          </a>
        </div>
      </main>

      <footer className="flex flex-wrap justify-center gap-4 mt-20 text-sm text-center">
        <a href="/legal" className="hover:underline">● Legal Notice</a>
        <a href="/privacy" className="hover:underline">● Privacy Policy</a>
        <a href="/terms" className="hover:underline">● Terms & Conditions</a>
      </footer>
    </div>
  );
}

