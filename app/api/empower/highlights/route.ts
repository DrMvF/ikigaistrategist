// app/api/empower/highlights/route.ts
export const runtime = 'nodejs';

export async function GET() {
  const highlights = [
    "I finally spoke up in the meeting – and it changed everything.",
    "I noticed my energy dips around Thursdays. Will plan rest better.",
    "Our team feels more connected after the journaling week.",
    "I learned that saying no is actually self-care, not weakness.",
  ];

  return new Response(JSON.stringify({ highlights }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
