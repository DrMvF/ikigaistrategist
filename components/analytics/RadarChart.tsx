// 2. components/analytics/RadarChart.tsx
import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';

export default function RadarChart({ data, title }: { data: any[]; title: string }) {
  return (
    <div className="space-y-2">
      <h3 className="text-xl font-semibold text-center">{title}</h3>
      <div className="w-full h-72">
        <ResponsiveContainer>
          <RechartsRadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="dimension" />
            <PolarRadiusAxis angle={30} domain={[0, 10]} />
            <Radar name="Avg" dataKey="value" stroke="#000" fill="#000" fillOpacity={0.4} />
          </RechartsRadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}