"use client";

import Link from "next/link";

const stages = [
  { name: "Home / Intro", path: "/", note: "Landing page (public)" },
  { name: "Waitlist", path: "/waitlist", note: "Mailcoach opt-in" },
  { name: "Start", path: "/start", note: "Welcome screen" },
  { name: "Invitation", path: "/invitation", note: "Explains Triple 4 system" },
  { name: "Onboarding", path: "/onboarding", note: "Cycle input + DB save" },
];

const navigatorStages = [
  { name: "Journal", path: "/journal", note: "Whisper input + reflection + DB" },
  { name: "Evaluate", path: "/evaluate", note: "Ratings: Goals, Energy, Trust, Communication" },
  { name: "Report", path: "/report", note: "Radar chart (week comparison, team-aware)" },
  { name: "Trajectory", path: "/trajectory", note: "Line chart across Ikigai dimensions over time" },
  { name: "Triple Four", path: "/triplefour", note: "Four-week Empowerment Report (Solo or Team)" },
];

export default function FlowPage() {
  return (
    <div className="flex flex-col min-h-screen items-center px-8 sm:px-20 py-20 font-cm text-black dark:text-white bg-white dark:bg-black">
      <main className="max-w-4xl w-full space-y-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Ikigai Strategist – System Flow</h1>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Pre-Flow</h2>
          <ul className="space-y-2">
            {stages.map((stage) => (
              <li key={stage.name} className="flex items-start gap-4">
                <Link href={stage.path} className="underline font-medium hover:text-gray-600 dark:hover:text-gray-300">
                  {stage.name}
                </Link>
                <span className="text-sm text-gray-500">– {stage.note}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Core Navigator</h2>
          <ul className="space-y-2">
            {navigatorStages.map((stage) => (
              <li key={stage.name} className="flex items-start gap-4">
                <Link href={stage.path} className="underline font-medium hover:text-gray-600 dark:hover:text-gray-300">
                  {stage.name}
                </Link>
                <span className="text-sm text-gray-500">– {stage.note}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
