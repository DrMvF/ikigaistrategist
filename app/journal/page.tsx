import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import JournalClient from './JournalClient';

export default async function JournalPage() {
  const session = await auth(); // ⬅️ await notwendig
  const userId = session?.userId;

  if (!userId) {
    redirect('/sign-in');
  }

  return <JournalClient />;
}
