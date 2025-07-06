// app/api/evaluate/route.ts

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { reflections } from "@/drizzle/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  const { id, field, value } = await req.json();

  if (!userId || !id || !field || value == null) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }

  // Nur erlaubte Felder zulassen
  const allowedFields = ["loveScore", "skillScore", "worldScore", "financeScore"] as const;

  if (!allowedFields.includes(field)) {
    return NextResponse.json({ error: "Invalid field" }, { status: 400 });
  }

  try {
    await db
      .update(reflections)
      .set({ [field]: value })
      .where(eq(reflections.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Failed to update reflection rating:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
