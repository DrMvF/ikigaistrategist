// app/api/empower/solo/route.ts
export const runtime = 'nodejs';

export async function GET() {
  const data = {
    heatmap: Array(4).fill(Array(7).fill(50)), // Dummy-Werte für Heatmap
    radar: [
      { dimension: 'Goals', value: 6 },
      { dimension: 'Energy', value: 7 },
      { dimension: 'Communication', value: 5 },
      { dimension: 'Trust', value: 8 },
    ],
  };

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
