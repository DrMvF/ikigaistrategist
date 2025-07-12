'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { track } from '@vercel/analytics';

export default function OnboardingPage() {
  const [cycleDay, setCycleDay] = useState<number | ''>('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { user } = useUser();

  const determinePhase = (day: number) => {
    if (day >= 1 && day <= 5) return 'menstruation';
    if (day >= 6 && day <= 13) return 'follicular';
    if (day >= 14 && day <= 18) return 'ovulation';
    if (day >= 19 && day <= 35) return 'luteal';
    return 'unknown';
  };

  const handleStart = async () => {
    if (typeof cycleDay === 'number' && cycleDay >= 1 && cycleDay <= 35) {
      const phase = determinePhase(cycleDay);

      try {
        const res = await fetch('/api/cycle', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cycleDay, userId: user?.id }),
        });

        if (!res.ok) {
          const data = await res.json();
          setError(data.error || 'Something went wrong.');
          return;
        }

        track('cycle_phase_saved', { day: cycleDay });
      } catch (err) {
        console.error('❌ API error:', err);
        setError('Failed to save cycle info.');
        return;
      }

      localStorage.setItem('cycle_day', cycleDay.toString());
      localStorage.setItem('cycle_phase', phase);
      router.push('/navigator');
    } else {
      setError('Please enter a valid day between 1 and 35.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-start px-8 sm:px-20 pt-24 font-cm text-black dark:text-white bg-white dark:bg-black">
      <main className="max-w-xl w-full text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          Welcome, powerful woman.
        </h1>
        <p className="text-xl sm:text-2xl mb-6">
          Your purpose isn’t broken. <br /> Your rhythm is just ignored.
        </p>
        <p className="text-base sm:text-2xl mb-4">
          Let’s begin by honoring your body. <br />
          Tell us where you are in your cycle – <br />
          and we’ll align your prompts to your current phase.
        </p>

        <label className="block text-xl sm:text-2xl mb-3 mt-10" htmlFor="cycleDay">
          On which day of your menstrual cycle are you today?
        </label>

        <input
          type="number"
          id="cycleDay"
          min={1}
          max={35}
          value={cycleDay}
          onChange={(e) => setCycleDay(Number(e.target.value))}
          className="w-24 text-center px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-black text-black dark:text-white text-lg"
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
