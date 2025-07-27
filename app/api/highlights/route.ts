// app/api/highlights/route.ts
import { OpenAI } from 'openai';

export const runtime = 'nodejs';

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error('❌ Missing OpenAI API key. Please check your environment variables.');
}

const openai = new OpenAI({ apiKey });

export async function POST(req: Request) {
  try {
    const { reflections } = await req.json();

    if (!Array.isArray(reflections) || reflections.length === 0) {
      return new Response(JSON.stringify({ error: 'No reflections provided.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const prompt = `
From the following list of reflection texts, extract the 3 most powerful and emotionally resonant quotes. 
Return them as bullet points, using the exact original wording from the reflections:

${reflections.map((text, i) => `Reflection ${i + 1}: ${text}`).join('\n\n')}
`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are a thoughtful summarizer. You extract poetic, moving quotes from user reflections.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const highlights = completion.choices[0]?.message?.content;

    if (!highlights) {
      return new Response(JSON.stringify({ error: 'No highlights generated.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ highlights }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Highlight error:', error?.message ?? error);
    return new Response(
      JSON.stringify({ error: `Highlight extraction failed: ${error?.message ?? error}` }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
