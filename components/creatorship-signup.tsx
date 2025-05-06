'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function CreatorshipSignup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    motivation: ''
  });

  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('creatorship_signups').insert([{ ...formData }]);

    if (error) {
      setError(error.message);
    } else {
      router.push('/creatorship/thank-you');
    }
  };

  return (
    <div className="w-full max-w-2xl">
      <h1 className="text-4xl font-serif mb-10 leading-snug tracking-tight">
        Radical Sensitive Creatorship<br />
        <span className="text-base font-sans block mt-2">
          A space for depth-driven creators seeking resonance, not reach.
        </span>
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-base"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-base"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Why do you want to join?</label>
          <textarea
            name="motivation"
            value={formData.motivation}
            onChange={handleChange}
            required
            rows={4}
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-base"
          />
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button
          type="submit"
          className="bg-black text-white text-base px-6 py-2 rounded-md w-full"
        >
          Join the List
        </button>
      </form>
    </div>
  );
}
