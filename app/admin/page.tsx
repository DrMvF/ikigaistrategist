import { db } from "@/lib/db";
import { reflections } from "@/drizzle/schema";
import { desc } from "drizzle-orm";

interface ReflectionEntry {
  id: string;
  userId: string;
  inputText: string;
  reflectionText: string;
  createdAt: Date | null;
  goalsScore: number | null;
  energyScore: number | null;
  communicationScore: number | null;
  trustScore: number | null;
  teamId: string | null;
}

interface GroupedByTeam {
  [teamId: string]: {
    [userId: string]: ReflectionEntry[];
  };
}

function scoreColor(score: number | null) {
  if (score == null) return "text-red-600";
  if (score >= 7) return "text-green-700";
  if (score >= 4) return "text-yellow-600";
  return "text-red-600";
}

function formatDateLocal(date: Date | string | null): string {
  if (!date) return "No timestamp";
  return new Date(date).toLocaleString("de-DE", { timeZone: "Europe/Berlin" });
}

export default async function AdminPage() {
  const entries: ReflectionEntry[] = await db
    .select()
    .from(reflections)
    .orderBy(desc(reflections.createdAt));

  const groupedByTeam: GroupedByTeam = {};

  for (const entry of entries) {
    const teamKey = entry.teamId || "No Team";
    if (!groupedByTeam[teamKey]) {
      groupedByTeam[teamKey] = {};
    }

    if (!groupedByTeam[teamKey][entry.userId]) {
      groupedByTeam[teamKey][entry.userId] = [];
    }

    groupedByTeam[teamKey][entry.userId].push(entry);
  }

  return (
    <div className="min-h-screen px-6 py-24 font-cm bg-white text-black dark:bg-black dark:text-white">
      <main className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Admin: Reflections grouped by team and user</h1>

        {Object.keys(groupedByTeam).length === 0 ? (
          <p className="text-gray-500">No entries found.</p>
        ) : (
          <div className="space-y-10">
            {Object.entries(groupedByTeam).map(([teamId, users]) => (
              <div key={teamId}>
                <h2 className="text-2xl font-semibold mb-4">Team: {teamId}</h2>

                <div className="space-y-6">
                  {Object.entries(users).map(([userId, reflections]) => (
                    <details key={userId} className="border border-gray-300 dark:border-gray-700 p-4 rounded">
                      <summary className="cursor-pointer font-semibold mb-2">
                        {userId} ({reflections.length} entries)
                      </summary>
                      <ul className="space-y-4 mt-4">
                        {reflections.map((entry) => (
                          <li key={entry.id} className="border p-4 rounded text-sm">
                            <p className="text-gray-500">{formatDateLocal(entry.createdAt)}</p>
                            <p className="mt-2 whitespace-pre-wrap">
                              <strong>Input:</strong> {entry.inputText}
                              <br />
                              <strong>Reflection:</strong> {entry.reflectionText}
                            </p>
                            <p className="mt-2 text-sm space-x-2">
                              <span className={scoreColor(entry.goalsScore)}>
                                <strong>Goals:</strong> {entry.goalsScore ?? "–"}
                              </span>
                              <span className={scoreColor(entry.energyScore)}>
                                <strong>Energy:</strong> {entry.energyScore ?? "–"}
                              </span>
                              <span className={scoreColor(entry.communicationScore)}>
                                <strong>Communication:</strong> {entry.communicationScore ?? "–"}
                              </span>
                              <span className={scoreColor(entry.trustScore)}>
                                <strong>Trust:</strong> {entry.trustScore ?? "–"}
                              </span>
                            </p>
                          </li>
                        ))}
                      </ul>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
