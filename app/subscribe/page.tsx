'use client';

import { useState } from 'react';

export default function SubscribePage() {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !consent) return;

    setStatus('sending');
    try {
      const res = await fetch('https://ghost.radicalsensitiveleadership.com/members/api/send-magic-link/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Version': 'v5.0',
        },
        body: JSON.stringify({
          email,
          emailType: 'subscribe',
        }),
      });

      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 sm:p-20 font-cm text-center">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4">Subscribe</h1>
      <p className="mb-8 text-lg sm:text-xl max-w-xl">
        Receive deep impulses, quotes, essays, and offerings from Radical Sensitive Leadership.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="border border-gray-300 rounded px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-black"
        />

        <label className="flex items-start gap-2 text-left text-sm sm:text-base">
            <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1"
        />
        <span>
            I want to receive curated updates from <strong>Radical Sensitive Leadership</strong>.
        </span>
        </label>
        <button
          type="submit"
          disabled={!consent || status === 'sending'}
          className="rounded-full bg-black text-white px-6 py-3 font-medium hover:bg-gray-800 transition disabled:opacity-50"
        >
          {status === 'sending' ? 'Sending...' : 'Subscribe now'}
        </button>

        {status === 'success' && (
          <p className="text-green-600 text-sm mt-2">
            Please check your inbox for the confirmation link ✉️
          </p>
        )}
        {status === 'error' && (
          <p className="text-red-600 text-sm mt-2">
            Something went wrong. Please try again.
          </p>
        )}
      </form>
    </main>
  );
}
