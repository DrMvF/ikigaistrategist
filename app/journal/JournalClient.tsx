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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    track('click_journal_submit');
    alert('Saved (noch nicht persistent)');
    setEntry('');
    setReflection('');
  };

  const handleReflect = async () => {
    track('click_reflect');
    const response = await fetch('/api/reflect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: entry }),
    });

    const data = await response.json();
    setReflection(data.result);
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

          <div className="flex items-center gap-4 mt-4 flex-wrap">
            <button
              type="button"
              onClick={handleStartListening}
              disabled={listening}
              className="px-6 py-3 bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white rounded-full text-base hover:opacity-80 transition-colors"
            >
              {listening ? 'Listening…' : 'Speak Instead'}
            </button>

            <button
              type="submit"
              className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full text-base hover:opacity-80 transition-colors"
            >
              Save Entry
            </button>

            <button
              type="button"
              onClick={handleReflect}
              className="px-6 py-3 bg-purple-600 text-white rounded-full text-base hover:opacity-80 transition-colors"
            >
              Reflect
            </button>
          </div>
        </form>

        {reflection && (
          <div className="mt-8 p-4 border-l-4 border-purple-600 bg-purple-100 text-purple-900 dark:bg-purple-900 dark:text-purple-100">
            <h2 className="text-lg font-semibold mb-2">AI Reflection</h2>
            <p className="whitespace-pre-line">{reflection}</p>
          </div>
        )}
      </main>
    </div>
  );
}
