export const metadata = {
  title: 'Deep Flow – Radical Sensitive Leadership',
  description:
    'The daily stream of presence. Intuitive, poetic, reflective – a writing ritual for inner clarity.',
  openGraph: {
    title: 'Deep Flow',
    description:
      'The daily stream of presence. Intuitive, poetic, reflective – a writing ritual for inner clarity.',
    url: 'https://www.radicalsensitiveleadership.com/deepflow',
    siteName: 'Radical Sensitive Leadership',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Deep Flow',
    description:
      'The daily edition. Words like water. For those who feel before they filter.',
  },
};

export default function DeepFlowPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-32 font-cm">
      <h1 className="text-3xl sm:text-4xl mb-8">Deep Flow</h1>

      <p className="text-lg leading-relaxed mb-6">
        This is the daily stream of presence.
        Not a productivity hack – a ritual.
        Not content – coherence.
      </p>

      <p className="text-lg leading-relaxed mb-6">
        Deep Flow is a writing practice. A poetic lens. A space to reconnect with what moves beneath the surface.
        It’s where I write every evening – what I notice, feel, observe.
      </p>

      <p className="text-lg leading-relaxed mb-6">
        Words like water. For those who feel before they filter.
        It’s not for everyone. But if it resonates – join the stream.
      </p>

      <hr className="my-12 border-gray-300" />

      <h2 className="text-2xl font-semibold mb-4">What you get</h2>
      <ul className="list-disc ml-6 text-base mb-8">
        <li>Daily reflections (Monday to Sunday)</li>
        <li>Full access to the Deep Flow archive</li>
        <li>Delivered via private Ghost stream</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">Pricing</h2>
      <p className="text-lg mb-6">
        €33/month • 7 days free
      </p>

      <a
        href="https://ghost.radicalsensitiveleadership.com/#/portal/signup/68138eefb12a490008c707a3/monthly"
        className="inline-block rounded-full bg-black text-white px-6 py-3 text-base hover:bg-[#383838] transition-colors"
        onClick={() => {
          if (typeof window !== 'undefined' && window.va) {
            window.va.track('Subscribe_Deep_Flow');
          }
        }}
      >
        → Subscribe to Deep Flow
      </a>

      <div className="mt-16">
        <a href="/" className="text-sm underline hover:opacity-60">
          ← Back to Home
        </a>
      </div>
    </main>
  );
}
