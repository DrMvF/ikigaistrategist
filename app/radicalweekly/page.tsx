export const metadata = {
  title: 'Radical Weekly – Radical Sensitive Leadership',
  description:
    'Build in Public as a Psychologist. One letter per week. Strategically grounded, scientifically informed, deeply felt.',
  openGraph: {
    title: 'Radical Weekly',
    description:
      'Build in Public as a Psychologist. One letter per week. Strategically grounded, scientifically informed, deeply felt.',
    url: 'https://www.radicalsensitiveleadership.com/radicalweekly',
    siteName: 'Radical Sensitive Leadership',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Radical Weekly',
    description:
      'Behind the scenes of a new platform. Follow the launch of Ikigai Strategist in real time.',
  },
};

export default function RadicalWeeklyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-32 font-cm">
      <h1 className="text-3xl sm:text-4xl mb-8">Radical Weekly</h1>

      <p className="text-lg leading-relaxed mb-6">
        This is not a newsletter. It’s a build-in-public log.
        One letter per week – on leadership, transformation, and everything I learn while creating a new tech platform rooted in psychology and purpose.
      </p>

      <p className="text-lg leading-relaxed mb-6">
        I document the process. From idea to launch. Including all questions, doubts, breakthroughs, and behind-the-scenes decisions.
      </p>

      <p className="text-lg leading-relaxed mb-6">
        This is Radical Weekly.
        If you want to follow how Ikigai Strategist comes alive – from code to concept – this is for you.
      </p>

      <hr className="my-12 border-gray-300" />

      <h2 className="text-2xl font-semibold mb-4">What you get</h2>
      <ul className="list-disc ml-6 text-base mb-8">
        <li>Weekly essays (published every Sunday)</li>
        <li>Full access to the Radical Weekly archive</li>
        <li>Optional monthly reflection prompts (PDF & audio)</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">Pricing</h2>
      <p className="text-lg mb-6">
        €55/month • 14 days free
      </p>

      <a
        href="https://ghost.radicalsensitiveleadership.com/#/portal/signup/6842cc1ad90e240001c066f1/monthly"
        className="inline-block rounded-full bg-[#e5e5e5] text-black px-6 py-3 text-base text-center hover:bg-[#ccc] transition-colors"
      >
        → Subscribe to Radical Weekly
      </a>

      <div className="mt-16">
        <a href="/" className="text-sm underline hover:opacity-60">
          ← Back to Home
        </a>
      </div>
    </main>
  );
}

