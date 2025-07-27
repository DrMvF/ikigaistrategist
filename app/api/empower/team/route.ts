// app/api/empower/team/route.ts

import { db } from '@/lib/db';
import { reflections } from '@/drizzle/schema';
import { auth } from '@clerk/nextjs/server';
import { eq, isNull } from 'drizzle-orm';
import { format, getDay, getWeekOfMonth } from 'date-fns';

export const runtime = 'nodejs';

export async function GET(req: Request) {
  const { userId } = await auth();
  const { searchParams } = new URL(req.url);
  const month = searchParams.get('month'); // z. B. "2025-07"
  const teamId = searchParams.get('teamId'); // z. B. "team-abc123" oder "null" (für keine Zuordnung)

  if (!userId || !month || teamId === null) {
    return new Response(JSON.stringify({ error: 'Missing user, team or month' }), { status: 400 });
  }

  try {
    const entries = await db
      .select()
      .from(reflections)
      .where(
        teamId === 'null'
          ? isNull(reflections.teamId)
          : eq(reflections.teamId, teamId)
      );

    const heatmap = Array.from({ length: 4 }, () => Array(7).fill(0));
    const counts = Array.from({ length: 4 }, () => Array(7).fill(0));

    for (const entry of entries) {
      if (!entry.createdAt) continue;

      const date = new Date(entry.createdAt);
      const entryMonth = format(date, 'yyyy-MM');
      if (entryMonth !== month) continue;

      const week = getWeekOfMonth(date, { weekStartsOn: 1 }) - 1;
      const day = getDay(date);
      const weekday = day === 0 ? 6 : day - 1;

      const values = [
        entry.goalsScore ?? 0,
        entry.energyScore ?? 0,
        entry.communicationScore ?? 0,
        entry.trustScore ?? 0,
      ];

      const avg = values.reduce((sum, v) => sum + v, 0) / values.length;
      heatmap[week][weekday] += avg;
      counts[week][weekday] += 1;
    }

    const finalHeatmap = heatmap.map((week, i) =>
      week.map((sum, j) =>
        counts[i][j] > 0 ? Math.round((sum / counts[i][j]) * 10) : 0
      )
    );

    const dimensions = ['goalsScore', 'energyScore', 'communicationScore', 'trustScore'] as const;
    const radar: { dimension: string; value: number }[] = [];

    for (const dim of dimensions) {
      const values = entries
        .filter((e) => e.createdAt && format(new Date(e.createdAt), 'yyyy-MM') === month)
        .map((e) => e[dim] ?? 0);

      const avg =
        values.length > 0
          ? Math.round((values.reduce((sum, v) => sum + v, 0) / values.length) * 10) / 10
          : 0;

      radar.push({ dimension: dim.replace('Score', ''), value: avg });
    }

    return new Response(JSON.stringify({ heatmap: finalHeatmap, radar }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('❌ Error in /api/empower/team:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
