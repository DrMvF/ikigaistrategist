import { OpenAI } from 'openai';

export const runtime = 'edge';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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
      model: 'gpt-4',
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
  } catch (error) {
    console.error('Reflection error:', error);
    return new Response(JSON.stringify({ error: 'Reflection failed.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
