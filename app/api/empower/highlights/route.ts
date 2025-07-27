// app/api/empower/highlights/route.ts
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export const runtime = 'nodejs';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const { reflections } = await req.json();

  if (!reflections || !Array.isArray(reflections) || reflections.length === 0) {
    return NextResponse.json({ highlights: [] }, { status: 200 });
  }

  const prompt = `
You are a journaling assistant. The user provided the following reflections:

${reflections.map((r, i) => `${i + 1}. ${r}`).join('\n')}

Extract 3 to 5 short, meaningful highlights or takeaways.
Respond only with bullet points.
`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    const highlights = completion.choices[0].message.content ?? '';

    return NextResponse.json({ highlights }, { status: 200 });
  } catch (error) {
    console.error('GPT Highlight Error:', error);
    return NextResponse.json({ highlights: [] }, { status: 500 });
  }
}
