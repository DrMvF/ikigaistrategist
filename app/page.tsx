'use client';

import { track } from '@vercel/analytics';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen justify-center px-6 py-24 sm:py-40 font-cm text-black bg-white dark:text-white dark:bg-black">
      <main className="max-w-3xl mx-auto text-center">
        <h1 className="text-2xl sm:text-4xl font-bold leading-snug mb-10">
          Imagine your day begins with a whisper.
        </h1>
        <p className="text-xl sm:text-2xl leading-relaxed">
          Not with urgency. Not with a checklist.<br />
          But with a soft, spoken intention:<br /><br />
          What you want to love.<br />
          What you want to deepen.<br />
          Who you want to serve.<br />
          And what you need to feel held.<br /><br />
          You speak it.<br />
          Just for yourself.<br /><br />
          Each morning, you return to that inner compass.<br />
          Each evening, you whisper your truth back into the tool.<br /><br />
          After seven days, it listens back.<br />
          You don’t get a grade. You get insight.<br /><br />
          Slowly, steadily, a rhythm emerges.<br />
          A dialogue.<br /><br />
          You’re not optimizing your life —<br />
          you’re relating to it.<br /><br />
          And through that relationship,<br />
          your well-being grows.<br /><br />
          Ikigai Strategist isn’t a tracker.<br />
          It’s a mirror.
        </p>

        <div className="mt-16">
          <Link
            href="/waitlist"
            onClick={() => track('click_intro_cta')}
            className="inline-block bg-black text-white text-xl px-8 py-4 rounded-full hover:bg-gray-900 transition-colors dark:bg-white dark:text-black dark:hover:bg-[#e5e5e5]"
          >
            Yes. I want this.
          </Link>
        </div>
      </main>
    </div>
  );
}
