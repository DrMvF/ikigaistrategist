// components/analytics/Heatmap.tsx
'use client';

import React from 'react';

export default function Heatmap({
  data,
  title,
}: {
  data: number[][];
  title: string;
}) {
  return (
    <div className="space-y-2">
      <h3 className="text-xl font-semibold text-center">{title}</h3>
      <div className="grid grid-cols-7 gap-1">
        {data.flat().map((value, index) => (
          <div
            key={index}
            className={`w-6 h-6 rounded ${getColor(value)}`}
            title={`Value: ${value}`}
          />
        ))}
      </div>
    </div>
  );
}

function getColor(value: number): string {
  if (value > 75) return 'bg-red-600';
  if (value > 50) return 'bg-orange-500';
  if (value > 25) return 'bg-yellow-400';
  return 'bg-gray-200';
}
