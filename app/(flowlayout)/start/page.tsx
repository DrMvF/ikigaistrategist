'use client';

import { useEffect } from 'react';
import { track } from '@vercel/analytics';

export default function StartPage() {
  // Track page view on mount
  useEffect(() => {
    track('page_view_start');
  }, []);

  // Track button click
  const handleClick = () => {
    track('click_learn_how_it_works');
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-start px-8 sm:px-20 pt-40 sm:pt-56 font-cm text-black dark:text-white bg-white dark:bg-black">
      <main className="flex flex-col items-center text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
          Ikigai Strategist
        </h1>

        <p className="text-xl sm:text-2xl max-w-xl">
          A clarity system for high-performing professionals <br /> and resilient teams.
        </p>

        <div className="h-12 sm:h-16" />

        <p className="text-lg sm:text-xl">
          Built for those who want to lead with depth, <br />
          think with intention, <br />
          and act from a place of inner stability.
        </p>

        <p className="text-lg sm:text-xl mt-6">
          Your purpose isn’t broken. <br />
          But your rhythm may be disrupted.
        </p>

        <p className="text-lg sm:text-xl mt-6">
          Whether you’re leading a team, <br />
          navigating complexity, <br />
          or recalibrating your own way of working — <br />
          this is where strategy meets self-awareness.
        </p>

        <p className="text-lg sm:text-xl mt-6 mb-12">
          Daily reflection. Minimal effort. <br />
          Visible patterns. Lasting clarity.
        </p>

        <a
          href="/invitation"
          onClick={handleClick}
          className="cursor-pointer rounded-full bg-black text-white px-6 py-3 text-lg sm:text-xl text-center hover:bg-[#383838] transition-colors dark:bg-white dark:text-black dark:hover:bg-[#e5e5e5]"
        >
          Learn how it works
        </a>
      </main>
    </div>
  );
}
