'use client';

import { useEffect, useState } from 'react';

export default function TextHighlights({ reflections }: { reflections: string[] }) {
  const [highlights, setHighlights] = useState<string[]>([]);

  useEffect(() => {
    const fetchHighlights = async () => {
      const response = await fetch('/api/highlights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reflections }),
      });

      const data = await response.json();
      if (data.highlights) {
        const lines = data.highlights
        .split('\n')
        .map((line: string) => line.replace(/^[-•]\s*/, '').trim())
        .filter((line: string) => line.length > 0);
        setHighlights(lines);
      }
    };

    if (reflections.length > 0) {
      fetchHighlights();
    }
  }, [reflections]);

  return (
    <div className="space-y-2">
      <h3 className="text-xl font-semibold">Highlighted Reflections</h3>
      <ul className="list-disc pl-5 space-y-1 text-base leading-relaxed">
        {highlights.map((text, index) => (
          <li key={index}>{text}</li>
        ))}
      </ul>
    </div>
  );
}
