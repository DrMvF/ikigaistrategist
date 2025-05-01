'use client';
import { useState } from 'react';

export default function SubscribeForm() {
  const [email, setEmail] = useState('');

  const openPortal = () => {
    if (window && window.location) {
      window.location.href = `#/portal/signup?email=${encodeURIComponent(email)}`;
    }
  };

  return (
    <section className="max-w-xl mx-auto px-4 py-20 font-cm">
      <h2 className="text-2xl mb-4">Subscribe to Radical Sensitivity</h2>
      <p className="text-base mb-6 text-gray-600">
        Quiet updates. Rare thoughts. No noise.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 px-4 py-2 w-full text-base font-cm"
        />
        <button
          onClick={openPortal}
          className="bg-black text-white px-6 py-2 text-base font-medium hover:opacity-80"
        >
          Subscribe
        </button>
      </div>
    </section>
  );
}
