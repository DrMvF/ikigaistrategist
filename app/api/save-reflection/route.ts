import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { reflections } from "@/drizzle/schema";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  const body = await req.json();
  const { entry, reflection } = body;

  if (!userId || !entry || !reflection) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }

  await db.insert(reflections).values({
    id: crypto.randomUUID(),
    userId,
    inputText: entry, // <-- hier statt "input"
    reflectionText: reflection,
    environment: process.env.VERCEL_ENV === "production" ? "prod" : "dev",
    createdAt: new Date()
  });

  return NextResponse.json({ success: true });
}
