export const metadata = {
  title: 'Founding Circle – Radical Sensitive Leadership',
  description:
    'For those who don’t just subscribe – but help build what’s coming. Radical support. Real presence.',
  openGraph: {
    title: 'Founding Circle',
    description:
      'For those who don’t just subscribe – but help build what’s coming. Radical support. Real presence.',
    url: 'https://www.radicalsensitiveleadership.com/foundingcircle',
    siteName: 'Radical Sensitive Leadership',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Founding Circle',
    description:
      'Shape the future of psychological leadership. As a Founding Member, you walk alongside.',
  },
};

export default function FoundingCirclePage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-32 font-cm">
      <h1 className="text-3xl sm:text-4xl mb-8">Founding Circle</h1>

      <p className="text-lg leading-relaxed mb-6">
        This tier is for those who don’t just subscribe – but help shape what’s next.
        You stand beside the work, not just behind it. Radical presence. Real co-creation.
      </p>

      <p className="text-lg leading-relaxed mb-6">
        Founding Members gain full access to all content and become part of the deeper build.
        You’re invited early. Trusted with questions. Integrated into the unfolding.
      </p>

      <hr className="my-12 border-gray-300" />

      <h2 className="text-2xl font-semibold mb-4">What you get</h2>
      <ul className="list-disc ml-6 text-base mb-8">
        <li>Access to all content (Daily + Weekly + Archives)</li>
        <li>Early Beta access to the Ikigai Strategist platform</li>
        <li>50% discount on 1:1 White Space Coaching with Miriam (1 session/month)</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">Pricing</h2>
      <p className="text-lg mb-6">
        €222/month • 14 days free
      </p>

      <a
        href="https://ghost.radicalsensitiveleadership.com/#/portal/signup/6842cd06d90e240001c066fb/monthly"
        onClick={() => {
          if (typeof window !== 'undefined' && window.va) {
            window.va('event', { name: 'Subscribe_Founding_Circle' });
          }
        }}
        className="inline-block rounded-full bg-[#e5e5e5] text-black px-6 py-3 text-base text-center hover:bg-[#ccc] transition-colors"
      >
        → Join the Founding Circle
      </a>

      <div className="mt-16">
        <a href="/" className="text-sm underline hover:opacity-60">
          ← Back to Home
        </a>
      </div>
    </main>
  );
}
