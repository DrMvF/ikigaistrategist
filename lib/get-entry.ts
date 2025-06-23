import { db } from '@/lib/db';
import { reflections } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';

export async function getEntryById(id: string) {
  const result = await db.select().from(reflections).where(eq(reflections.id, id));
  return result[0];
}
