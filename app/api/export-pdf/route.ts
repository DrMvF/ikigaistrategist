import { NextRequest } from 'next/server';
import chromium from 'chrome-aws-lambda';
import puppeteer from 'puppeteer-core';

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function POST(req: NextRequest) {
  try {
    const { input, reflection } = await req.json();

    if (!input || !reflection) {
      return new Response('Missing input or reflection', { status: 400 });
    }

    const html = `
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
          <div class="timestamp">${new Date().toLocaleString()}</div>
          <h2>Input</h2>
          <p>${escapeHtml(input)}</p>
          <h2>Reflection</h2>
          <p>${escapeHtml(reflection)}</p>
        </body>
      </html>
    `;

    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({ format: 'a4', printBackground: true });
    await browser.close();

    return new Response(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename=reflection.pdf',
      },
    });
  } catch (error) {
    console.error('PDF export error:', error);
    return new Response('PDF generation failed', { status: 500 });
  }
}
