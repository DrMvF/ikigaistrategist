import { OpenAI } from 'openai';

export const runtime = 'nodejs';

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error('❌ Missing OpenAI API key. Please check your environment variables.');
}

const openai = new OpenAI({ apiKey });

export async function POST(req: Request) {
  try {
    const { entry } = await req.json();

    if (!entry || entry.trim() === '') {
      return new Response(JSON.stringify({ error: 'No input provided.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content:
            'You are a gentle, insightful guide. Reflect what the user wrote as if you were mirroring their inner world, using soft and poetic language.',
        },
        {
          role: 'user',
          content: entry,
        },
      ],
    });

    const reflection = completion.choices[0]?.message?.content;

    if (!reflection) {
      return new Response(JSON.stringify({ error: 'No reflection generated.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ reflection }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Reflection error:', error?.message ?? error);
    return new Response(
      JSON.stringify({ error: `Reflection failed: ${error?.message ?? error}` }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
