'use client';
import { useState } from 'react';

export default function MinimalSubscribeForm() {
  const [email, setEmail] = useState('');

  const openPortal = () => {
    if (window && window.location) {
      window.location.href = `#/portal/signup?email=${encodeURIComponent(email)}`;
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        openPortal();
      }}
      className="flex flex-col sm:flex-row gap-3 justify-center items-center w-full font-cm mt-8 mb-4"
    >
      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border border-gray-300 px-4 py-2 w-full sm:w-[280px] text-base"
      />
      <button
        type="submit"
        className="bg-black text-white px-6 py-2 text-base font-medium hover:opacity-80"
      >
        Subscribe
      </button>
    </form>
  );
}
