"use client";

import { useEffect, useState } from "react";
import { format, parse, getMonth } from "date-fns";
import Heatmap from "@/components/Heatmap";
import RadarChart from "@/components/RadarChart";
import TextHighlights from "@/components/TextHighlights";

const monthOptions = Array.from({ length: 12 }, (_, i) => {
  const date = new Date(2025, i, 1);
  return {
    label: format(date, "MMMM yyyy"),
    value: format(date, "yyyy-MM"),
  };
});

export default function TripleFourReportPage() {
  const [selectedMonth, setSelectedMonth] = useState(
    format(new Date(), "yyyy-MM")
  );

  // You'd fetch aggregated solo + team data based on selectedMonth
  const [soloData, setSoloData] = useState(null);
  const [teamData, setTeamData] = useState(null);
  const [highlights, setHighlights] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const soloRes = await fetch(`/api/report/solo?month=${selectedMonth}`);
        const teamRes = await fetch(`/api/report/team?month=${selectedMonth}`);
        const highlightRes = await fetch(
          `/api/report/highlights?month=${selectedMonth}`
        );

        const soloJson = await soloRes.json();
        const teamJson = await teamRes.json();
        const highlightJson = await highlightRes.json();

        setSoloData(soloJson);
        setTeamData(teamJson);
        setHighlights(highlightJson);
      } catch (error) {
        console.error("Error loading report data", error);
      }
    };

    fetchData();
  }, [selectedMonth]);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white px-6 py-20 font-cm">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-left">
          Triple 4 Empowerment Report
        </h1>

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
          <div>
            <h2 className="text-xl font-semibold mb-2">🔥 Solo Heatmap</h2>
            <Heatmap data={soloData?.heatmap} />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">🔥 Team Heatmap</h2>
            <Heatmap data={teamData?.heatmap} />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">🌀 Solo Radar</h2>
            <RadarChart data={soloData?.radar} />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">🌀 Team Radar</h2>
            <RadarChart data={teamData?.radar} />
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">📝 Textual Highlights</h2>
          <TextHighlights data={highlights} />
        </div>
      </div>
    </div>
  );
}
