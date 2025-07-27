'use client';

import { track } from '@vercel/analytics';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen justify-center px-6 py-24 sm:py-40 font-cm text-black bg-white dark:text-white dark:bg-black">
      <main className="max-w-3xl mx-auto text-center space-y-10">
        <h1 className="text-3xl sm:text-5xl font-bold leading-tight">
          Ikigai Strategist
        </h1>
        <p className="text-xl sm:text-2xl font-light">
          A clarity system for high-performing professionals and resilient teams.
        </p>

        <div className="text-center text-lg sm:text-xl leading-relaxed space-y-6 mt-12">
          <p>
            Built for those who want to lead with depth,<br />
            think with intention,<br />
            and act from a place of inner stability.
          </p>

          <p>
            Your purpose isn’t broken.<br />
            But your rhythm may be disrupted.
          </p>

          <p>
            Whether you're leading a team,<br />
            navigating complexity,<br />
            or recalibrating your own way of working —<br />
            this is where strategy meets self-awareness.
          </p>

          <p>
            This is not a productivity hack.<br />
            It’s a dialogue with your inner compass.
          </p>

          <p>
            Daily reflection. Minimal effort.<br />
            Visible patterns. Lasting clarity.
          </p>

          <p className="italic">
            You don’t need another tool.<br />
            You need a rhythm that listens back.
          </p>
        </div>

        <div className="mt-16">
          <Link
            href="/waitlist"
            onClick={() => track('click_intro_cta')}
            className="inline-block bg-black text-white text-xl px-8 py-4 rounded-full hover:bg-gray-900 transition-colors dark:bg-white dark:text-black dark:hover:bg-[#e5e5e5]"
          >
            Start your rhythm
          </Link>
        </div>
      </main>
    </div>
  );
}
