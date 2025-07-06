'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { track } from '@vercel/analytics';

export default function NavigatorPage() {
  const blocks = [
    {
      title: 'Journal',
      description: 'Whisper your thoughts and track your inner voice.',
      href: '/journal',
    },
    {
      title: 'Evaluate',
      description: 'Reflect systematically across the four Ikigai dimensions.',
      href: '/evaluate',
    },
    {
      title: 'Report',
      description: 'Visualize your weekly Ikigai pattern with radar charts.',
      href: '/report',
    },
    {
      title: 'Trajectory',
      description: 'See your day-by-day progression line chart.',
      href: '/trajectory',
    },
  ];

  return (
    <div className="min-h-screen px-6 py-24 font-cm bg-white text-black dark:bg-black dark:text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-12 text-center">Your Ikigai Journey</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl">
        {blocks.map((block) => (
          <Link
            key={block.title}
            href={block.href}
            onClick={() => track(`navigate_${block.title.toLowerCase()}`)}
            className="border border-black dark:border-white rounded-2xl p-6 flex flex-col items-start hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2">{block.title}</h2>
            <p className="text-sm mb-4">{block.description}</p>
            <ArrowRight className="w-4 h-4" />
          </Link>
        ))}
      </div>

      <blockquote className="mt-16 text-center text-xl italic font-bold text-black dark:text-white">
       "Where focus goes, energy flows." <br />
      <span className="text-sm font-normal not-italic">– Tony Robbins</span>
      </blockquote>
    </div>
  );
}
