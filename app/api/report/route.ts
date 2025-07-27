// file: app/api/report/route.ts

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { reflections } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { getISOWeek } from "date-fns";
import { toZonedTime } from "date-fns-tz";

export async function GET(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const searchParams = req.nextUrl.searchParams;
  const currentWeek = Number(searchParams.get("current"));
  const benchmarkWeek = Number(searchParams.get("benchmark"));

  if (!currentWeek || !benchmarkWeek) {
    return NextResponse.json({ error: "Missing ?current= or ?benchmark=" }, { status: 400 });
  }

  const entries = await db.select().from(reflections).where(eq(reflections.userId, userId));

  // Gruppieren nach ISO-Kalenderwoche basierend auf Europe/Berlin
  const grouped: Record<number, typeof entries> = {};
  for (const entry of entries) {
    if (!entry.createdAt) continue;
    const local = toZonedTime(entry.createdAt, "Europe/Berlin");
    const week = getISOWeek(local);
    if (!grouped[week]) grouped[week] = [];
    grouped[week].push(entry);
  }

  function averageScore(entries: typeof reflections.$inferSelect[]) {
    const count = entries.length || 1;
    const sum = (key: keyof typeof entries[0]) =>
      entries.reduce((acc, e) => {
        const value = e[key];
        return acc + (typeof value === "number" ? value : 0);
      }, 0);

    return {
      goals: Number((sum("goalsScore") / count).toFixed(2)),
      energy: Number((sum("energyScore") / count).toFixed(2)),
      communication: Number((sum("communicationScore") / count).toFixed(2)),
      trust: Number((sum("trustScore") / count).toFixed(2)),
    };
  }

  const currentAvg = averageScore(grouped[currentWeek] || []);
  const benchmarkAvg = averageScore(grouped[benchmarkWeek] || []);

  const response = ["goals", "energy", "communication", "trust"].map((dimension) => ({
    dimension: dimension.charAt(0).toUpperCase() + dimension.slice(1),
    current: currentAvg[dimension as keyof typeof currentAvg],
    benchmark: benchmarkAvg[dimension as keyof typeof benchmarkAvg],
  }));

  return NextResponse.json(response);
}
