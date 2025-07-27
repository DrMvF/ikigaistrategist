'use client';

import React from 'react';

export interface HeatmapDataPoint {
  date: string; // e.g., '2025-07-14'
  value: number; // average score from 0 to 10
}

export default function Heatmap({
  data,
  title,
}: {
  data: HeatmapDataPoint[];
  title: string;
}) {
  return (
    <div className="space-y-2">
      <h3 className="text-xl font-semibold text-center">{title}</h3>
      <div className="grid grid-cols-7 gap-1">
        {data.map((point, index) => (
          <div
            key={index}
            className={`w-6 h-6 rounded ${getColor(point.value)}`}
            title={`${point.date}: ${point.value.toFixed(1)}`}
          />
        ))}
      </div>
      <p className="text-sm text-gray-600 italic text-center">
        Based on daily average scores for Goals, Energy, Communication & Trust.
      </p>
    </div>
  );
}

function getColor(value: number): string {
  if (value === 0) return 'bg-gray-200';       // no data
  if (value < 3) return 'bg-blue-200';         // low
  if (value < 6) return 'bg-yellow-300';       // medium
  if (value < 8) return 'bg-orange-400';       // high
  return 'bg-red-500';                         // very high
}
