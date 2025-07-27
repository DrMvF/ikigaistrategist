'use client';

import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { track } from '@vercel/analytics';

interface TrajectoryPoint {
  date: string;
  goals: number;
  trust: number;
  energy: number;
  communication: number;
}

export default function TrajectoryPage() {
  const [data, setData] = useState<TrajectoryPoint[]>([]);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      track('view_trajectory_page');

      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const res = await fetch(`/api/trajectory?tz=${encodeURIComponent(tz)}`);
      const json = await res.json();
      const sorted = json.sort((a: TrajectoryPoint, b: TrajectoryPoint) =>
        a.date.localeCompare(b.date)
      );
      setData(sorted);
    };
    fetchData();
  }, []);

  const handlePrint = () => {
    track('click_print_trajectory');
    window.print();
  };

  return (
    <div className="min-h-screen px-6 py-16 space-y-8 text-center font-cm print:bg-white print:text-black">
      <div>
        <h1 className="text-4xl font-bold mb-2">Your Personal Ikigai Resilience Trajectory</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          This line chart shows the evolution of your resilience pattern across the four Ikigai dimensions over time.
        </p>
      </div>

      <div ref={chartRef} className="w-full max-w-4xl mx-auto print:shadow-none print:border-none">
        <Card className="w-full">
          <CardContent className="px-4 py-8 sm:px-8 sm:py-12">
            <div className="w-full aspect-[2/1]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis
                    domain={[0, 10]}
                    label={{
                      value: 'Score (1–10)',
                      angle: -90,
                      position: 'insideLeft',
                      style: {
                        textAnchor: 'middle',
                        fill: 'currentColor',
                        fontSize: 12,
                      },
                    }}
                  />
                  <Tooltip
                    formatter={(value: number, name: string) => [`${value}`, name]}
                    contentStyle={{
                      fontFamily: 'Computer Modern, serif',
                      fontSize: '14px',
                      backgroundColor: '#f8f8f8',
                      borderColor: '#d1d5db',
                      color: '#111',
                    }}
                    labelStyle={{
                      fontWeight: 'bold',
                      fontSize: '12px',
                      color: '#333',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="goals"
                    stroke="#404040"
                    strokeWidth={1.5}
                    strokeDasharray="0"
                    dot={{ r: 2 }}
                    name="Goals"
                  />
                  <Line
                    type="monotone"
                    dataKey="trust"
                    stroke="#404040"
                    strokeWidth={1.5}
                    strokeDasharray="5 5"
                    dot={{ r: 2 }}
                    name="Trust"
                  />
                  <Line
                    type="monotone"
                    dataKey="energy"
                    stroke="#404040"
                    strokeWidth={1.5}
                    strokeDasharray="2 4"
                    dot={{ r: 2 }}
                    name="Energy"
                  />
                  <Line
                    type="monotone"
                    dataKey="communication"
                    stroke="#404040"
                    strokeWidth={1.5}
                    strokeDasharray="10 4 2 4"
                    dot={{ r: 2 }}
                    name="Communication"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Legende mit passenden Linienstilen */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-gray-700 dark:text-gray-300 font-cm">
              <div className="flex items-center gap-2">
                <svg width="40" height="6">
                  <line x1="0" y1="3" x2="40" y2="3" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                Goals
              </div>
              <div className="flex items-center gap-2">
                <svg width="40" height="6">
                  <line x1="0" y1="3" x2="40" y2="3" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 5" />
                </svg>
                Trust
              </div>
              <div className="flex items-center gap-2">
                <svg width="40" height="6">
                  <line x1="0" y1="3" x2="40" y2="3" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 4" />
                </svg>
                Energy
              </div>
              <div className="flex items-center gap-2">
                <svg width="40" height="6">
                  <line x1="0" y1="3" x2="40" y2="3" stroke="currentColor" strokeWidth="1.5" strokeDasharray="10 4 2 4" />
                </svg>
                Communication
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="print:hidden">
        <Button onClick={handlePrint}>Export as PDF</Button>
      </div>
    </div>
  );
}
