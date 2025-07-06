// app/api/reflections/route.ts

import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { reflections } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@clerk/nextjs/server';

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const result = await db
      .select()
      .from(reflections)
      .where(eq(reflections.userId, userId));

    return NextResponse.json(result);
  } catch (error) {
    console.error('❌ Error loading reflections:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reflections.' },
      { status: 500 }
    );
  }
}
