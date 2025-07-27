import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { reflections } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { format, toZonedTime } from "date-fns-tz";

export async function GET(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json([], { status: 401 });
  }

  const url = new URL(req.url);
  const tz = url.searchParams.get("tz") || "UTC";

  const entries = await db.query.reflections.findMany({
    where: eq(reflections.userId, userId),
  });

  const grouped: { [date: string]: typeof entries } = {};

  for (const entry of entries) {
    if (!entry.createdAt) continue;
    const local = toZonedTime(entry.createdAt, tz);
    const date = format(local, "yyyy-MM-dd", { timeZone: tz });
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(entry);
  }

  const result = Object.entries(grouped).map(([date, group]) => {
    const goals = average(group.map((e) => e.goalsScore));
    const energy = average(group.map((e) => e.energyScore));
    const communication = average(group.map((e) => e.communicationScore));
    const trust = average(group.map((e) => e.trustScore));
    return { date, goals, energy, communication, trust };
  });

  result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return NextResponse.json(result);
}

function average(values: (number | null)[]) {
  const valid = values.filter((v): v is number => typeof v === "number");
  if (valid.length === 0) return 0;
  return parseFloat((valid.reduce((a, b) => a + b, 0) / valid.length).toFixed(2));
}
