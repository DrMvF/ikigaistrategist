'use client';

import React from 'react';
import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';

interface RadarDataPoint {
  dimension: string;
  value: number;
}

export default function RadarChart({
  data,
  title,
}: {
  data: RadarDataPoint[];
  title: string;
}) {
  return (
    <div className="space-y-2">
      <h3 className="text-xl font-semibold text-center">{title}</h3>
      <div className="w-full h-72">
        <ResponsiveContainer>
          <RechartsRadarChart
            cx="50%"
            cy="50%"
            outerRadius="65%"
            data={data}
          >
            <PolarGrid stroke="#ccc" strokeDasharray="3 3" />
            <PolarAngleAxis
              dataKey="dimension"
              tick={{
                fontSize: 14,
                fontWeight: 500,
              }}
              tickLine={false}
            />
            <PolarRadiusAxis
              domain={[0, 10]}
              tick={false} // 👈 entfernt Zahlen
              axisLine={false} // optional: entfernt Kreislinie
              tickCount={0}
            />
            <Radar
              name="Average"
              dataKey="value"
              stroke="#000"
              fill="#000"
              fillOpacity={0.3}
            />
          </RechartsRadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
