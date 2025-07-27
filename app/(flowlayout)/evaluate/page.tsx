'use client';

export const dynamic = "force-dynamic";

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { track } from '@vercel/analytics';

interface Reflection {
  id: string;
  inputText: string;
  reflectionText: string;
  createdAt: string;
  goalsScore: number | null;
  energyScore: number | null;
  trustScore: number | null;
  communicationScore: number | null;
}

type IkigaiDimension = 'goalsScore' | 'energyScore' | 'trustScore' | 'communicationScore';

const dimensionMeta: {
  field: IkigaiDimension;
  label: string;
  question: string;
  scaleNote: string;
}[] = [
  {
    field: 'goalsScore',
    label: 'Goals (1–10)',
    question: 'How clear and aligned do your current goals feel?',
    scaleNote: '(1 = unclear or absent, 10 = deeply meaningful and focused)',
  },
  {
    field: 'energyScore',
    label: 'Energy (1–10)',
    question: 'How much energy, vitality, or momentum is present today?',
    scaleNote: '(1 = drained or scattered, 10 = vibrant and alive)',
  },
  {
    field: 'trustScore',
    label: 'Trust (1–10)',
    question: 'To what degree do you feel safe, confident, and self-connected?',
    scaleNote: '(1 = anxious or doubtful, 10 = grounded and calm)',
  },
  {
    field: 'communicationScore',
    label: 'Communication (1–10)',
    question: 'How clearly are your thoughts or emotions being expressed?',
    scaleNote: '(1 = bottled up or fuzzy, 10 = articulated and understood)',
  },
];

export default function EvaluatePage() {
  const { user } = useUser();
  const router = useRouter();
  const [reflections, setReflections] = useState<Reflection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReflections = async () => {
      const res = await fetch('/api/reflections');
      const data = await res.json();

      const sorted = data.sort(
        (a: Reflection, b: Reflection) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      setReflections(sorted);
      setLoading(false);
    };
    fetchReflections();
  }, []);

  const handleRatingChange = async (
    id: string,
    field: IkigaiDimension,
    value: number
  ) => {
    const updated = reflections.map((r) =>
      r.id === id ? { ...r, [field]: value } : r
    );
    setReflections(updated);
    await fetch('/api/evaluate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, field, value }),
    });
    track('evaluate_rating_change');
  };

  if (!user) return <div className="p-4">Please log in to evaluate your reflections.</div>;
  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Evaluate Your Reflections</h1>
      {reflections.map((r) => (
        <div key={r.id} className="border rounded-xl p-4 space-y-4">
          <div className="text-sm text-muted-foreground">
            {new Date(r.createdAt).toLocaleString(undefined, {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            })}
          </div>
          <p><strong>Input Whisper:</strong> {r.inputText}</p>
          <p><strong>Reflection:</strong> {r.reflectionText}</p>
          <p className="text-sm italic text-gray-500">
            This whispered entry is now invited into structure.  
            Track the subtle: what’s felt, what’s lived, what wants to become pattern.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {dimensionMeta.map(({ field, label, question, scaleNote }) => (
              <div key={field}>
                <label className="block text-sm font-semibold">{label}</label>
                <p className="text-xs text-muted-foreground italic">{question}</p>
                <p className="text-[11px] text-gray-400 mb-1">{scaleNote}</p>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={r[field] ?? ''}
                  onChange={(e) =>
                    handleRatingChange(r.id, field, Number(e.target.value))
                  }
                  className="w-full border rounded px-2 py-1"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
