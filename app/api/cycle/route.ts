import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { cycleEntries } from "@/drizzle/schema";

export async function POST(req: NextRequest) {
  console.log("📥 API hit: /api/cycle");

  const { userId } = await auth();
  console.log("👤 userId:", userId);

  const { cycleDay } = await req.json();
  console.log("📆 cycleDay:", cycleDay);

  if (!userId) {
    console.warn("🚫 Unauthorized access attempt");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!cycleDay || typeof cycleDay !== "number" || cycleDay < 1 || cycleDay > 35) {
    console.warn("⚠️ Invalid cycle day input:", cycleDay);
    return NextResponse.json({ error: "Invalid cycle day" }, { status: 400 });
  }

  // Phase berechnen
  let cyclePhase = "unknown";
  if (cycleDay >= 1 && cycleDay <= 5) cyclePhase = "menstruation";
  else if (cycleDay >= 6 && cycleDay <= 13) cyclePhase = "follicular";
  else if (cycleDay >= 14 && cycleDay <= 18) cyclePhase = "ovulation";
  else if (cycleDay >= 19 && cycleDay <= 35) cyclePhase = "luteal";

  console.log("💾 Inserting cycle entry:", {
    userId,
    cycleDay,
    cyclePhase,
  });

  try {
    await db.insert(cycleEntries).values({
      userId,
      cycleDay,
      cyclePhase,
    });

    console.log("✅ Insert successful");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Failed to insert cycle entry:", error);
    return NextResponse.json({ error: "Insert failed" }, { status: 500 });
  }
}
