'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useClerk } from '@clerk/nextjs';
import { track } from '@vercel/analytics';

export default function OnboardingPage() {
  const [teamId, setTeamId] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { user } = useUser();
  const { openSignIn } = useClerk();

  // Track initial page view
  useEffect(() => {
    track('page_view_onboarding');
  }, []);

  const handleStart = () => {
    if (!user) {
      openSignIn();
      return;
    }

    try {
      if (teamId.trim()) {
        localStorage.setItem('team_id', teamId.trim());
        track('onboarding_team_selected', { teamId: teamId.trim() });
      } else {
        track('onboarding_solo_selected');
      }

      router.push('/journal');
    } catch (err) {
      console.error('❌ Onboarding error:', err);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-start px-8 sm:px-20 pt-20 font-cm text-black dark:text-white bg-white dark:bg-black">
      <main className="max-w-xl w-full text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6">
          Welcome. Let’s make your clarity operational.
        </h1>

        <p className="text-lg sm:text-xl mb-4">
          You’re here because performance alone isn’t enough anymore.
          You want to lead with clarity. <br />
          Think with structure. <br />
          And act from emotional integrity — not exhaustion.
        </p>

        <p className="text-base sm:text-lg mt-6 mb-4">
          Whether you’re a team of one or a team of many: <br />
          Ikigai Strategist starts with a simple question of context.
        </p>

        <div className="text-center mt-8 text-base sm:text-lg space-y-2">
          <p><strong>Are you using this system:</strong></p>
          <p>– <em>as part of a team</em> → enter your Team ID below</p>
          <p>– <em>on your own</em> → just leave the field blank</p>
        </div>

        <p className="mt-6 text-base sm:text-lg">
          This helps us align your reflections — <br />
          either into a shared team report <br />
          or as part of your personal clarity journey.
        </p>

        <p className="mt-6 mb-4 text-sm sm:text-base italic text-gray-600 dark:text-gray-400">
          One field. One choice. Maximum relevance.
        </p>

        <input
          type="text"
          id="teamId"
          placeholder="Team ID (optional)"
          value={teamId}
          onChange={(e) => setTeamId(e.target.value)}
          className="w-64 text-center px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-black text-black dark:text-white text-lg"
        />

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <div className="h-8" />

        <button
          onClick={handleStart}
          className="mt-4 bg-black text-white dark:bg-white dark:text-black px-6 py-3 rounded-full text-lg hover:bg-[#383838] dark:hover:bg-[#e5e5e5] transition-colors"
        >
          Let’s begin
        </button>
      </main>
    </div>
  );
}
