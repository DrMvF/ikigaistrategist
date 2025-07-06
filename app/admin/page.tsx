// app/(protected)/admin/page.tsx

import { db } from "@/lib/db";
import { reflections } from "@/drizzle/schema";
import { desc } from "drizzle-orm";

interface GroupedReflections {
  [userId: string]: typeof reflections.$inferSelect[];
}

function scoreColor(score: number | null) {
  if (score == null) return "text-red-600";       // Rot, wenn keine Bewertung
  if (score >= 7) return "text-green-700";        // Grün ab 7
  if (score >= 4) return "text-yellow-600";       // Gelb ab 4
  return "text-red-600";                           // Rot unter 4
}

function formatDateLocal(date: Date | string | null): string {
  if (!date) return 'No timestamp';
  return new Date(date).toLocaleString('de-DE', { timeZone: 'Europe/Berlin' });
}

export default async function AdminPage() {
  const entries = await db.select().from(reflections).orderBy(desc(reflections.createdAt));

  // Reflections gruppieren nach userId
  const grouped: GroupedReflections = {};
  for (const entry of entries) {
    if (!grouped[entry.userId]) {
      grouped[entry.userId] = [];
    }
    grouped[entry.userId].push(entry);
  }

  return (
    <div className="min-h-screen px-6 py-24 font-cm bg-white text-black dark:bg-black dark:text-white">
      <main className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Admin: Reflections grouped by user</h1>

        {Object.keys(grouped).length === 0 ? (
          <p className="text-gray-500">No entries found.</p>
        ) : (
          <div className="space-y-6">
            {Object.entries(grouped).map(([userId, reflections]) => (
              <details key={userId} className="border border-gray-300 dark:border-gray-700 p-4 rounded">
                <summary className="cursor-pointer font-semibold mb-2">
                  {userId} ({reflections.length} entries)
                </summary>
                <ul className="space-y-4 mt-4">
                  {reflections.map((entry) => (
                    <li key={entry.id} className="border p-4 rounded text-sm">
                      <p className="text-gray-500">
                        {formatDateLocal(entry.createdAt)}
                      </p>
                      <p className="mt-2 whitespace-pre-wrap">
                        <strong>Input:</strong> {entry.inputText}
                        <br />
                        <strong>Reflection:</strong> {entry.reflectionText}
                      </p>
                      <p className="mt-2 text-sm space-x-2">
                        <span className={scoreColor(entry.loveScore)}><strong>Love:</strong> {entry.loveScore ?? '–'}</span>
                        <span className={scoreColor(entry.skillScore)}><strong>Skill:</strong> {entry.skillScore ?? '–'}</span>
                        <span className={scoreColor(entry.worldScore)}><strong>World:</strong> {entry.worldScore ?? '–'}</span>
                        <span className={scoreColor(entry.financeScore)}><strong>Finance:</strong> {entry.financeScore ?? '–'}</span>
                      </p>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
