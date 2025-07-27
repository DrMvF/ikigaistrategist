// app/api/me/route.ts

import { db } from '@/lib/db';
import { reflections } from '@/drizzle/schema';
import { auth } from '@clerk/nextjs/server';
import { desc, eq } from 'drizzle-orm';

export const runtime = 'nodejs';

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return new Response(JSON.stringify({ error: 'Not authenticated' }), { status: 401 });
  }

  const lastReflection = await db
    .select({ teamId: reflections.teamId })
    .from(reflections)
    .where(eq(reflections.userId, userId))
    .orderBy(desc(reflections.createdAt))
    .limit(1);

  const teamId = lastReflection[0]?.teamId ?? null;

  return new Response(JSON.stringify({ userId, teamId }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
