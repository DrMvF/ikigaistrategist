import { db } from "@/lib/db";
import { reflections } from "@/drizzle/schema";
import { desc } from "drizzle-orm";

export const dynamic = 'force-dynamic'; // <- DAS HINZUFÜGEN!

export default async function AdminPage() {
  const entries = await db.select().from(reflections).orderBy(desc(reflections.createdAt));

  return (
    <div className="min-h-screen px-6 py-24 font-cm bg-white text-black dark:bg-black dark:text-white">
      <main className="max-w-prose mx-auto">
        <h1 className="text-3xl font-bold mb-6">Admin: Saved Reflections</h1>

        {entries.length === 0 ? (
          <p className="text-gray-500">No entries found.</p>
        ) : (
          <ul className="space-y-6">
            {entries.map((entry) => (
              <li key={entry.id} className="border border-gray-300 dark:border-gray-700 p-4 rounded">
                <p className="text-sm text-gray-500">
                  {entry.createdAt ? new Date(entry.createdAt).toLocaleString() : 'No timestamp'}
                </p>
                <p className="mt-2 whitespace-pre-wrap">
                  <strong>Input:</strong> {entry.inputText}
                  <br />
                  <strong>Reflection:</strong> {entry.reflectionText}
                </p>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
