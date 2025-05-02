'use client';

// signup-form.tsx (Next.js React component with Supabase integration)

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Supabase configuration (replace with your keys)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    motivation: ''
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('signups').insert([{ ...formData }]);

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      setFormData({ name: '', email: '', motivation: '' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-xl p-6">
        <h2 className="text-3xl font-bold mb-6 text-center">Join the Deep Flow</h2>
        {success ? (
          <p className="text-green-600 text-center">Thank you for signing up!</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block font-medium">Why do you want to join?</label>
              <textarea
                name="motivation"
                value={formData.motivation}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
                rows={4}
              />
            </div>
            {error && <p className="text-red-600">{error}</p>}
            <button type="submit" className="bg-black text-white px-4 py-2 rounded w-full">
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

