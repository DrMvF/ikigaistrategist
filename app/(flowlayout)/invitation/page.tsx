'use client';

import Link from "next/link";
import { track } from "@vercel/analytics";

export default function InvitationPage() {
  return (
    <div className="flex flex-col items-start justify-center min-h-screen px-6 sm:px-20 py-20 font-cm text-black dark:text-white bg-white dark:bg-black">
      <main className="max-w-3xl w-full space-y-8 text-lg sm:text-xl leading-relaxed text-left">
        <h1 className="text-3xl sm:text-4xl font-bold">
          Emotionally. Strategically. Collectively.
        </h1>

        <p>
          <strong>Ikigai Strategist</strong> is a radically simple, deeply powerful reflection system — 
          designed to bring rhythm and resilience back into high-performance work.
        </p>

        <p>
          It’s built for you if you’ve ever felt overwhelmed by rigid systems, uninspired by generic productivity tools, 
          or disconnected from your inner clarity in the middle of a fast-paced team environment.
        </p>

        <p>
          With our <strong>Triple 4 System</strong>, you build real-time awareness of what matters most:
        </p>

        <ul className="list-none space-y-2">
          <li><strong>4 JERT Steps</strong>: Journal, Evaluate, Report, Trajectory</li>
          <li><strong>4 Core Dimensions</strong>: Goals, Energy, Communication, Trust</li>
          <li><strong>4-Week Pattern</strong>: One daily check-in for four weeks</li>
        </ul>

        <p>
          Here’s how it works — your full journey:
        </p>

        <ol className="list-decimal list-inside space-y-4">
          <li>
            <strong>Start – Identify yourself</strong><br />
            Choose your mode:<br />
            <em>Team member</em> – enter your Team ID to contribute to a shared pattern<br />
            <em>Solo mode</em> – use Ikigai Strategist as your personal mental clarity tracker<br /><br />
            Either way, you begin from where you are: mentally, emotionally, professionally.
          </li>
          <li>
            <strong>Journal – Speak your truth</strong><br />
            Use voice or text to express what’s present. This space is yours — no structure, no judgment. 
            Just you and a moment of clarity.
          </li>
          <li>
            <strong>Evaluate – Add gentle structure</strong><br />
            Rate your entry across four dimensions:
            <ul className="list-disc list-inside ml-6 space-y-1">
              <li><strong>Goals</strong> – Was your intention today clear and aligned?</li>
              <li><strong>Energy</strong> – Did you feel focused, stable, or drained?</li>
              <li><strong>Communication</strong> – Was there honesty, presence, friction?</li>
              <li><strong>Trust</strong> – Did you feel secure, safe, seen — with yourself or others?</li>
            </ul>
          </li>
          <li>
            <strong>Report – Meet your patterns</strong><br />
            A radar chart shows what’s rising, what’s hiding, and what’s shifting. 
            You’ll begin to notice trends — in your mood, your rhythm, your connection to work.
          </li>
          <li>
            <strong>Trajectory – Watch your evolution</strong><br />
            A gentle line graph tracks your mental and emotional clarity over time. 
            This isn’t about optimization — it’s about awareness.
          </li>
          <li>
            <strong>Triple 4 Empowerment Report – Your psychological pulse</strong><br />
            You’ll receive a synthesized reflection: 
            your current standing across the 4×4 system — 
            as a mirror, not a score. 
            A quiet invitation to recalibrate with compassion.
          </li>
        </ol>

        <p className="italic text-gray-600 dark:text-gray-400">
          The world keeps accelerating. But clarity is not found by moving faster — it’s found by tuning in.
          Whether you lead a team or lead yourself:
          You are not here to just perform.
          You are here to evolve — consciously, rhythmically, sustainably.
        </p>

        <div className="pt-8">
          <button
            onClick={() => {
              track("invitation_start_clicked");
              window.location.href = "/onboarding";
            }}
            className="inline-block px-6 py-3 text-lg font-semibold text-white bg-black rounded-full hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition"
          >
            Start your clarity journey
          </button>
        </div>
      </main>
    </div>
  );
}
