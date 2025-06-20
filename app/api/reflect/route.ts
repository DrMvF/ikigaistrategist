import { OpenAI } from "openai";

export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = body.input;

    if (!input || input.trim() === "") {
      return new Response(JSON.stringify({ error: "No input provided" }), { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a gentle, insightful guide. Reflect what the user wrote as if you were mirroring their inner world, using soft and poetic language.",
        },
        {
          role: "user",
          content: input,
        },
      ],
    });

    const response = completion.choices[0]?.message?.content || "";

    return new Response(JSON.stringify({ reflection: response }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Reflection failed." }), { status: 500 });
  }
}
