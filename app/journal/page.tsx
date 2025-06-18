import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import JournalClient from './JournalClient';

export default function JournalPage() {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  return <JournalClient />;
}
