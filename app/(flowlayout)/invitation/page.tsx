'use client';

import Link from "next/link";
import { track } from "@vercel/analytics";

export default function InvitationPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 sm:px-20 py-20 font-cm text-black dark:text-white bg-white dark:bg-black">
      <main className="max-w-3xl w-full text-left space-y-8 text-lg sm:text-xl leading-relaxed">
        <h1 className="text-3xl sm:text-4xl font-bold">
          Hormonally. Emotionally. Meaningfully.
        </h1>

        <p>
          <strong>Ikigai Strategist for Women</strong> is a radically simple, deeply powerful habit tracker – designed for cyclical clarity. It’s built for you if you’ve ever felt overwhelmed by linear systems, uninspired by generic apps, or just... out of sync.
        </p>

        <p>
          With our <strong>Triple 4 System</strong>, you align with your inner rhythm:
        </p>

        <ul className="list-disc list-inside ml-4 space-y-2">
          <li><strong>4 JERT Steps</strong>: Journal, Evaluate, Report, Trajectory</li>
          <li><strong>4 Cycle Phases</strong>: Menstruation, Follicular, Ovulation, Luteal</li>
          <li><strong>4 Ikigai Dimensions</strong>: Love, Skill, World, Finance</li>
        </ul>

        <p>
          Here’s how it works – your full journey:
        </p>

        <ol className="list-decimal list-inside ml-4 space-y-4">
          <li>
            <strong>Start – Tell us where you are</strong><br />
            Enter your current day in your menstrual cycle. We’ll determine your hormonal phase so the rest of your experience flows with – not against – your body.
          </li>
          <li>
            <strong>Journal – Speak your truth</strong><br />
            Whisper or write what’s on your mind. This space is yours – free from judgment, structure, or rules. Just show up as you are.
          </li>
          <li>
            <strong>Evaluate – Add gentle structure</strong><br />
            You rate your entry in 4 dimensions:
            <ul className="list-disc list-inside ml-6 space-y-1">
              <li><strong>Love</strong> – Was there tenderness, connection, intimacy?</li>
              <li><strong>Skill</strong> – Did you feel confident, competent, capable?</li>
              <li><strong>World</strong> – Did you sense connection to a larger purpose or context?</li>
              <li><strong>Finance</strong> – Was there clarity or tension around money or material needs?</li>
            </ul>
          </li>
          <li>
            <strong>Report – Meet your pattern</strong><br />
            A radar chart shows you what’s unfolding across a week. You’ll see which energies dominate, and which remain quiet – all layered with your cycle phase.
          </li>
          <li>
            <strong>Trajectory – Watch your evolution</strong><br />
            This gentle line graph traces your Ikigai patterns over time. It’s not about performance. It’s about rhythm.
          </li>
          <li>
            <strong>Triple 4 Empowerment Report – Your personal pulse</strong><br />
            Every few days, you’ll receive a gentle integration: your current cycle day, JERT status, and Ikigai pulse – reflected back as a kind reminder of where you are.
          </li>
        </ol>

        <p className="italic text-gray-600 dark:text-gray-400">
          The world is becoming more masculine again – in politics, in systems, in pace. But you are not here to adapt. You are here to re-lead – from within.
        </p>

        <div className="pt-8">
          <button
            onClick={() => {
              track("invitation_start_clicked");
              window.location.href = "/onboarding";
            }}
            className="inline-block px-6 py-3 text-lg font-semibold text-white bg-black rounded-full hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition"
          >
            Start your cycle-aligned journey
          </button>
        </div>
      </main>
    </div>
  );
}
