// app/api/empower/team/route.ts
export const runtime = 'nodejs';

export async function GET() {
  const data = {
    heatmap: Array(4).fill(Array(7).fill(70)), // Dummy-Werte für Team-Heatmap
    radar: [
      { dimension: 'Goals', value: 7 },
      { dimension: 'Energy', value: 6 },
      { dimension: 'Communication', value: 6 },
      { dimension: 'Trust', value: 7 },
    ],
  };

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
