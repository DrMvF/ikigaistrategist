'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import Heatmap from '@/components/analytics/Heatmap';
import RadarChart from '@/components/analytics/RadarChart';
import TextHighlights from '@/components/analytics/TextHighlights';
import { Button } from '@/components/ui/button';

interface HeatmapDataPoint {
  date: string;
  value: number;
}

const monthOptions = Array.from({ length: 12 }, (_, i) => {
  const date = new Date(2025, i, 1);
  return {
    label: format(date, 'MMMM yyyy'),
    value: format(date, 'yyyy-MM'),
  };
});

function transformHeatmap(raw: number[][], month: string): HeatmapDataPoint[] {
  const [yearStr, monthStr] = month.split('-');
  const year = parseInt(yearStr);
  const monthIndex = parseInt(monthStr) - 1;

  const result: HeatmapDataPoint[] = [];

  raw.forEach((week, weekIndex) => {
    week.forEach((value, dayIndex) => {
      const day = weekIndex * 7 + dayIndex + 1;
      if (day <= 31) {
        const date = new Date(year, monthIndex, day);
        result.push({
          date: date.toISOString().split('T')[0],
          value: value / 10, // ✅ zurückskalieren auf 0–10
        });
      }
    });
  });

  return result;
}

export default function TripleFourReportPage() {
  const [selectedMonth, setSelectedMonth] = useState(format(new Date(), 'yyyy-MM'));
  const [soloData, setSoloData] = useState<{ heatmap: number[][]; radar: any[]; reflections: string[] } | null>(null);
  const [teamData, setTeamData] = useState<{ heatmap: number[][]; radar: any[]; reflections: string[] } | null>(null);
  const [reflections, setReflections] = useState<string[]>([]);

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [soloRes, teamRes] = await Promise.all([
          fetch(`/api/empower/solo?month=${selectedMonth}`),
          fetch(`/api/empower/team?month=${selectedMonth}`),
        ]);

        const [soloJson, teamJson] = await Promise.all([
          soloRes.json(),
          teamRes.json(),
        ]);

        setSoloData(soloJson);
        setTeamData(teamJson);

        const combinedReflections: string[] = [
          ...(soloJson.reflections || []),
        ];
        setReflections(combinedReflections);
      } catch (error) {
        console.error('Error loading report data', error);
      }
    };

    fetchData();
  }, [selectedMonth]);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white px-6 py-20 font-cm print:bg-white print:text-black">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-left">
          Triple 4 Empowerment Report
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          This monthly report summarizes your personal journey (solo) and provides a comparison with team-level patterns – either based on your assigned team or, if no team is defined, based on all unaffiliated individuals in the system.
          It reflects data from your Ikigai Resilience check-ins across four core dimensions: Goals, Energy, Communication & Trust.
        </p>

        <div className="mb-10">
          <label htmlFor="month" className="block mb-2 text-lg font-semibold">
            Select Month:
          </label>
          <select
            id="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-4 py-2 rounded border border-black dark:border-white bg-white dark:bg-black text-lg"
          >
            {monthOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {soloData?.heatmap && (
            <Heatmap data={transformHeatmap(soloData.heatmap, selectedMonth)} title="Solo Heatmap" />
          )}
          {teamData?.heatmap && (
            <Heatmap data={transformHeatmap(teamData.heatmap, selectedMonth)} title="Team Heatmap" />
          )}
          {soloData?.radar && <RadarChart data={soloData.radar} title="Solo Radar" />}
          {teamData?.radar && <RadarChart data={teamData.radar} title="Team Radar" />}
        </div>

        <div className="mt-12">
          {reflections.length > 0 ? (
            <TextHighlights reflections={reflections} />
          ) : (
            <p className="text-gray-500 italic">No reflections available for this month.</p>
          )}
        </div>

        <div className="mt-10 print:hidden text-right">
          <Button onClick={handlePrint}>Export as PDF</Button>
        </div>
      </div>
    </div>
  );
}
