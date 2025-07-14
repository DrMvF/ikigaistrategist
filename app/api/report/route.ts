// file: app/api/report/route.ts

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { reflections } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { getISOWeek } from "date-fns";

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

  // Fetch all reflections for this user
  const all = await db.select().from(reflections).where(eq(reflections.userId, userId));

  // Group reflections by ISO calendar week
  const grouped: Record<number, typeof all> = {};
  for (const entry of all) {
    if (!entry.createdAt) continue;
    const week = getISOWeek(new Date(entry.createdAt));
    if (!grouped[week]) grouped[week] = [];
    grouped[week].push(entry);
  }

  function averageScore(entries: typeof all) {
    const count = entries.length || 1;
    const sum = (key: keyof typeof entries[0]) =>
      entries.reduce((acc, e) => {
        const value = e[key];
        return acc + (typeof value === "number" ? value : 0);
      }, 0);

    return {
      love: Number((sum("loveScore") / count).toFixed(2)),
      skill: Number((sum("skillScore") / count).toFixed(2)),
      finance: Number((sum("financeScore") / count).toFixed(2)),
      world: Number((sum("worldScore") / count).toFixed(2)),
    };
  }

  const currentAvg = averageScore(grouped[currentWeek] || []);
  const benchmarkAvg = averageScore(grouped[benchmarkWeek] || []);

  const response = ["love", "skill", "finance", "world"].map((dimension) => ({
    dimension: dimension.charAt(0).toUpperCase() + dimension.slice(1),
    current: currentAvg[dimension as keyof typeof currentAvg],
    benchmark: benchmarkAvg[dimension as keyof typeof benchmarkAvg],
  }));

  return NextResponse.json(response);
}
