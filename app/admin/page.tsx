import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { reflections } from "@/drizzle/schema";
import { desc } from "drizzle-orm";
import { notFound } from "next/navigation";

export default async function AdminPage() {
  const { userId } = await auth();

  if (userId !== process.env.ADMIN_USER_ID) {
    notFound(); // oder redirect('/')
  }

  const entries = await db
    .select()
    .from(reflections)
    .orderBy(desc(reflections.createdAt));

  return (
    <div className="p-8 max-w-3xl mx-auto font-cm">
      <h1 className="text-3xl font-bold mb-6">Saved Reflections</h1>
      <ul className="space-y-4">
        {entries.map((entry) => (
          <li key={entry.id} className="border border-gray-300 p-4 rounded">
            <p className="text-sm text-gray-500">{entry.createdAt.toString()}</p>
            <p className="mt-2 whitespace-pre-wrap">
              <strong>Input:</strong> {entry.inputText}
              <br />
              <strong>Reflection:</strong> {entry.reflectionText}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
