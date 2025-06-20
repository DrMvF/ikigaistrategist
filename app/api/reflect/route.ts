import { OpenAI } from "openai";

export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  const { entry } = await req.json(); // 🛠️ hier war vorher "input"

  if (!entry || entry.trim() === "") {
    return new Response("No input provided", { status: 400 });
  }

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content:
          "You are a gentle, insightful guide. Reflect what the user wrote as if you were mirroring their inner world, using soft and poetic language.",
      },
      {
        role: "user",
        content: entry,
      },
    ],
  });

  const response = completion.choices[0]?.message?.content || "";

  return new Response(JSON.stringify({ reflection: response }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
