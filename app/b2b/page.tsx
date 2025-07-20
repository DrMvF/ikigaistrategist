'use client';

import Link from 'next/link';
import { track } from '@vercel/analytics/react';
import { useEffect } from 'react';

export default function B2BPage() {
  useEffect(() => {
    track('view_b2b_page');
  }, []);

  return (
    <div className="flex flex-col min-h-screen justify-center px-6 py-24 sm:py-40 font-cm text-black bg-white dark:text-white dark:bg-black">
      <main className="max-w-3xl mx-auto text-center">
        <h1 className="text-2xl sm:text-4xl font-bold leading-snug mb-10">
          Ikigai Strategist for Teams
        </h1>

        <p className="text-xl sm:text-2xl leading-relaxed mb-8">
          Strategic clarity and emotional resilience — now designed for teams.
          <br /><br />
          Whether you lead a remote startup or a global enterprise,
          our journaling platform helps your team reflect, connect, and grow.
        </p>

        <div className="bg-gray-100 dark:bg-zinc-900 p-6 rounded-xl text-left text-lg mb-12">
          <h2 className="text-xl font-semibold mb-2">Stabilization Track – 4 Weeks (Remote)</h2>
          <ul className="list-disc pl-5 space-y-1 text-left">
            <li>Kick-off workshop (3 hours) + 2 follow-up sessions (90 min)</li>
            <li>Secure journaling platform for daily insights</li>
            <li>Team-wide pattern recognition & synthesis</li>
            <li>Final recommendations for team relief</li>
          </ul>
          <p className="mt-4 font-medium">
            Investment: €9.780 (plus VAT) · Q4/2025 rollout
          </p>
        </div>

        <p className="text-xl sm:text-2xl leading-relaxed mb-10">
          We're preparing our first pilot with a global organization.
          <br />
          Want to explore how this could serve your team?
        </p>

        <form
          action="https://radicalsensitiveleadership.mailcoach.app/subscribe/824a107f-1c54-4dc4-b33a-301731273135"
          method="post"
          onSubmit={() => track('click_waitlist_b2b')}
          className="flex flex-col gap-4 w-full max-w-xs mx-auto"
        >
          <input
            type="email"
            name="email"
            required
            placeholder="Your work email address"
            className="w-full border border-black dark:border-white rounded-full px-6 py-3 text-lg sm:text-xl text-center bg-white dark:bg-black text-black dark:text-white"
          />
          <input
            type="hidden"
            name="tags"
            value="ikigai strategist b2b"
          />
          <input
            type="submit"
            value="Join the B2B Waitlist"
            className="cursor-pointer rounded-full bg-black text-white px-6 py-3 text-lg sm:text-xl text-center hover:bg-[#383838] transition-colors dark:bg-white dark:text-black dark:hover:bg-[#e5e5e5]"
          />
        </form>
      </main>
    </div>
  );
}
