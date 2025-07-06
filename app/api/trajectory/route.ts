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
    if (!entry.createdAt) continue; // sicherstellen, dass createdAt nicht null ist
    const local = toZonedTime(entry.createdAt, tz);
    const date = format(local, "yyyy-MM-dd", { timeZone: tz });
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(entry);
  }

  const result = Object.entries(grouped).map(([date, group]) => {
    const love = average(group.map((e) => e.loveScore));
    const skill = average(group.map((e) => e.skillScore));
    const world = average(group.map((e) => e.worldScore));
    const finance = average(group.map((e) => e.financeScore));
    return { date, love, skill, world, finance };
  });

  // ⬇️ NEU: Sortiere Ergebnis chronologisch aufsteigend (von links nach rechts im Chart)
  result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return NextResponse.json(result);
}

function average(values: (number | null)[]) {
  const valid = values.filter((v): v is number => typeof v === "number");
  if (valid.length === 0) return 0;
  return parseFloat((valid.reduce((a, b) => a + b, 0) / valid.length).toFixed(2));
}
