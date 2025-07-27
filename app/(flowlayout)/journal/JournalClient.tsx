'use client';

import { useEffect, useRef, useState } from 'react';
import { track } from '@vercel/analytics';

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

export default function JournalClient() {
  const [entry, setEntry] = useState('');
  const [listening, setListening] = useState(false);
  const [reflection, setReflection] = useState('');
  const [isReflecting, setIsReflecting] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setEntry((prev) => (prev ? prev + ' ' : '') + transcript);
      };

      recognition.onend = () => {
        setListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const handleStartListening = () => {
    if (recognitionRef.current && !listening) {
      track('start_voice_input');
      setListening(true);
      recognitionRef.current.start();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    track('click_journal_submit');

    const teamId = localStorage.getItem('team_id') || null;

    try {
      const response = await fetch('/api/save-reflection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          entry,
          reflection,
          teamId,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Save failed:', errorText);
        alert('Something went wrong while saving your entry.');
        return;
      }

      console.log('Entry saved successfully.');
      alert('Your entry was saved successfully.');
    } catch (error) {
      console.error('Save error:', error);
      alert('Something went wrong while saving.');
    }
  };

  const handleReflect = async () => {
    setIsReflecting(true);
    setReflection('');
    track('click_reflect_button');

    try {
      const response = await fetch('/api/reflect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entry }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Reflect failed:', errorText);
        setReflection('Something went wrong while reflecting.');
        return;
      }

      const data = await response.json();

      if (data.reflection) {
        setReflection(data.reflection);
      } else {
        setReflection('No reflection received.');
      }
    } catch (error) {
      console.error('Reflect error:', error);
      setReflection('Something went wrong while reflecting.');
    } finally {
      setIsReflecting(false);
    }
  };

  const handleExportPdf = () => {
    track('click_print_journal');
    window.print();
  };

  return (
    <div className="min-h-screen px-6 py-24 font-cm text-black bg-white dark:text-white dark:bg-black">
      <main className="max-w-prose mx-auto text-left">
        <h1 className="text-3xl font-bold mb-6">Your Daily Whisper</h1>

        <form onSubmit={handleSubmit}>
          <textarea
            name="entry"
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="Speak or write your intention..."
            rows={10}
            className="w-full rounded-lg border border-black dark:border-white bg-white dark:bg-black text-black dark:text-white px-4 py-3 text-lg leading-relaxed"
          />

          <div className="flex flex-wrap gap-4 mt-4 items-center print:hidden">
            <button
              type="button"
              onClick={handleStartListening}
              disabled={listening}
              className="px-6 py-3 bg-white text-black border border-black rounded-full text-base hover:opacity-80 transition-colors"
            >
              {listening ? 'Listening…' : 'Speak Instead'}
            </button>

            <button
              type="submit"
              className="px-6 py-3 bg-black text-white border border-black rounded-full text-base hover:opacity-80 transition-colors"
            >
              Save Entry
            </button>

            <button
              type="button"
              onClick={handleReflect}
              disabled={isReflecting}
              className="px-6 py-3 bg-gray-500 text-white border border-black rounded-full text-base hover:opacity-80 transition-colors"
            >
              {isReflecting ? 'Reflecting…' : 'Reflect'}
            </button>

            {reflection && (
              <button
                type="button"
                onClick={handleExportPdf}
                className="px-6 py-3 bg-gray-200 text-black border border-black rounded-full text-base hover:opacity-80 transition-colors"
              >
                PDF
              </button>
            )}
          </div>
        </form>

        {reflection && (
          <div className="mt-8 p-4 border border-dashed border-gray-400 dark:border-gray-600 rounded-lg text-base leading-relaxed bg-gray-50 dark:bg-gray-900">
            <h2 className="text-xl font-semibold mb-2">Reflection</h2>
            <p>{reflection}</p>
          </div>
        )}
      </main>
    </div>
  );
}
