import { NextRequest } from 'next/server';
import puppeteer from 'puppeteer';
import { getEntryById } from '@/lib/get-entry';

// GET: Mit ID aus der Datenbank exportieren (optional beibehalten)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) return new Response('Missing ID', { status: 400 });

  const entry = await getEntryById(id);
  if (!entry) return new Response('Entry not found', { status: 404 });

  const html = renderHtml(entry.inputText, entry.reflectionText, entry.createdAt);
  return await generatePdfResponse(html);
}

// POST: Direkt PDF aus Payload erzeugen
export async function POST(req: NextRequest) {
  try {
    const { input, reflection } = await req.json();
    const createdAt = new Date().toISOString();

    if (!input || !reflection) {
      return new Response('Missing input or reflection', { status: 400 });
    }

    const html = renderHtml(input, reflection, createdAt);
    return await generatePdfResponse(html);
  } catch (error) {
    console.error('PDF generation error:', error);
    return new Response('Failed to generate PDF', { status: 500 });
  }
}

// Hilfsfunktion: HTML generieren
function renderHtml(input: string, reflection: string, createdAt: string | Date | null) {
  const timestamp = createdAt ? new Date(createdAt).toLocaleString() : '';
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>My Daily Whisper</title>
        <style>
          @font-face {
            font-family: 'Computer Modern';
            src: url('https://ikigaistrategist.de/fonts/cmunrm.ttf') format('truetype');
            font-weight: 400;
            font-style: normal;
          }
          @font-face {
            font-family: 'Computer Modern';
            src: url('https://ikigaistrategist.de/fonts/cmunbx.ttf') format('truetype');
            font-weight: 700;
            font-style: normal;
          }
          @font-face {
            font-family: 'Computer Modern';
            src: url('https://ikigaistrategist.de/fonts/cmunti.ttf') format('truetype');
            font-weight: 400;
            font-style: italic;
          }
          body {
            font-family: 'Computer Modern', serif;
            padding: 3rem;
            line-height: 1.7;
            font-size: 14pt;
            color: #000;
          }
          h1 {
            font-size: 24pt;
            margin-bottom: 0.25rem;
          }
          .timestamp {
            font-size: 12pt;
            color: #666;
            margin-bottom: 2.5rem;
          }
          h2 {
            font-size: 16pt;
            margin-top: 2rem;
            margin-bottom: 1rem;
          }
          p {
            white-space: pre-wrap;
            margin-bottom: 1.25rem;
          }
        </style>
      </head>
      <body>
        <h1>My Daily Whisper</h1>
        <div class="timestamp">${timestamp}</div>
        <h2>Input</h2>
        <p>${input}</p>
        <h2>Reflection</h2>
        <p>${reflection}</p>
      </body>
    </html>
  `;
}

// Hilfsfunktion: PDF generieren
async function generatePdfResponse(html: string) {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });

  const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
  await browser.close();

  return new Response(pdfBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename=reflection.pdf',
    },
  });
}
