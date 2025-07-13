'use client'

export const dynamic = "force-dynamic";

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { track } from "@vercel/analytics"
import { getISOWeek } from "date-fns"

interface ChartData {
  dimension: string
  current: number
  benchmark: number
}

export default function ReportPage() {
  const chartRef = useRef<HTMLDivElement>(null)
  const [data, setData] = useState<ChartData[]>([])
  const [currentWeek, setCurrentWeek] = useState<number>(getISOWeek(new Date()))
  const [benchmarkWeek, setBenchmarkWeek] = useState<number>(getISOWeek(new Date()) - 1)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/report?current=${currentWeek}&benchmark=${benchmarkWeek}`)
      const json = await res.json()
      setData(json)

      // track comparison event
      track("compare_report_weeks", {
        currentWeek,
        benchmarkWeek,
      })
    }
    fetchData()
  }, [currentWeek, benchmarkWeek])

  const handlePrint = () => {
    track("click_print_report")
    window.print()
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 space-y-10 text-center print:bg-white print:text-black">
      <div>
        <h1 className="text-4xl font-bold mb-4">Your Ikigai Pattern</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          This radar chart shows your current balance across the four dimensions of Ikigai.
          Select the time periods you want to compare below.
        </p>
      </div>

      <div className="flex gap-6 flex-wrap justify-center">
        <div className="flex flex-col items-start">
          <label className="text-sm font-medium mb-1">Current</label>
          <select
            className="border rounded px-2 py-1 font-cm text-base"
            value={currentWeek}
            onChange={(e) => {
              const val = Number(e.target.value)
              setCurrentWeek(val)
              track("change_report_week", { type: "current", week: val })
            }}
          >
            {[...Array(52)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                Week {i + 1}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col items-start">
          <label className="text-sm font-medium mb-1">Benchmark</label>
          <select
            className="border rounded px-2 py-1 font-cm text-base"
            value={benchmarkWeek}
            onChange={(e) => {
              const val = Number(e.target.value)
              setBenchmarkWeek(val)
              track("change_report_week", { type: "benchmark", week: val })
            }}
          >
            {[...Array(52)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                Week {i + 1}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div ref={chartRef} className="w-full max-w-xl print:shadow-none print:border-none">
        <Card className="w-full">
          <CardContent className="flex flex-col items-center px-4 py-8 sm:px-8 sm:py-12">
            <div className="w-full max-w-[460px] aspect-square">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart
                  data={data}
                  outerRadius="85%"
                  cx="50%"
                  cy="50%"
                  startAngle={90}
                  endAngle={-270}
                >
                  <PolarGrid />
                  <PolarAngleAxis
                    dataKey="dimension"
                    tick={{
                      fontSize: 14,
                      fill: "currentColor",
                    }}
                  />
                  <Radar
                  name="Benchmark"
                  dataKey="benchmark"
                  stroke="#A0A0A0"
                  fill="rgba(160,160,160,0.3)"
                  fillOpacity={1}
                  />
                  <Radar
                  name="Current"
                  dataKey="current"
                  stroke="#404040"
                  fill="rgba(64,64,64,0.2)"
                  fillOpacity={1}
                  />
                  <Legend verticalAlign="bottom" align="right" layout="vertical" />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="print:hidden">
        <Button onClick={handlePrint}>Export as PDF</Button>
      </div>
    </div>
  )
}
