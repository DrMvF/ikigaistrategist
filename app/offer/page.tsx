export const metadata = {
  title: 'Offer White Space – Radical Sensitive Leadership',
  description:
    'Executive Coaching with presence, depth and strategic clarity. For leaders in Pharma, Biotech and MedTech who seek resonance instead of routine.',
  openGraph: {
    title: 'Offer White Space',
    description:
      'Not a product – a perceptive field. Executive Coaching for deep leaders in transition.',
    url: 'https://www.radicalsensitiveleadership.com/offer',
    siteName: 'Radical Sensitive Leadership',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Offer White Space',
    description:
      'Strategic coaching beyond mainstream management. This is your White Space.',
  },
};

export default function OfferPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-32 font-cm">
      <h1 className="text-3xl sm:text-4xl mb-8">Offer White Space</h1>

      <p className="text-lg leading-relaxed mb-6">
        Radical Sensitive Leadership is not a product. It’s a space.  
        A field of perception for those who don’t want to be led – but are ready to embody responsibility.
      </p>

      <p className="text-lg leading-relaxed mb-6">
        I work 1:1, in retreats, at the edges.  
        Not for everyone. Not forever. But when I do, it’s with full presence and radical softness.
      </p>

      <p className="text-lg leading-relaxed mb-6">
        This White Space is not an offer to convince – it’s an invitation to resonate.  
        If you feel it, you’ll know.
      </p>

      <hr className="my-12 border-gray-300" />

      <h2 className="text-2xl font-semibold mb-4">What I offer</h2>

      <p className="text-lg leading-relaxed mb-8">
        Executive Coaching for Pharma, Biotech and MedTech.  
        For leaders navigating transitions, product launches or personal shifts.  
        I work with people who ask: “What is all this for? And where am I going?”
      </p>

      <div className="space-y-10">
        <div>
          <h3 className="text-xl font-semibold mb-2">Executive Clarity Session – 90 Min – €590 <span className="text-base font-normal">plus VAT</span></h3>
          <ul className="list-disc ml-6 text-base mb-2">
            <li>One deep 1:1 session</li>
            <li>Ideal for acute challenges or orientation</li>
            <li>Optional written summary</li>
          </ul>
          <a
            href="https://cal.com/radicalsensitiveleadership/clarity-session"
            onClick={() => {
              if (typeof window !== 'undefined' && window.va) {
                window.va.track('Book_Clarity_Session');
              }
            }}
            className="underline text-base hover:opacity-70"
          >
            → Book now
          </a>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Strategic Reset Package – 3×60 Min – €1,200 <span className="text-base font-normal">plus VAT</span></h3>
          <ul className="list-disc ml-6 text-base mb-2">
            <li>Three coaching sessions</li>
            <li>Written reflection & leadership feedback</li>
            <li>For transitions, team challenges or strategy shifts</li>
          </ul>
          <a
            href="https://cal.com/radicalsensitiveleadership/reset-package"
            onClick={() => {
              if (typeof window !== 'undefined' && window.va) {
                window.va.track('Book_Reset_Package');
              }
            }}
            className="underline text-base hover:opacity-70"
          >
            → Book package
          </a>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Corporate Coaching Framework – from €6,000 <span className="text-base font-normal">excl. VAT</span></h3>
          <ul className="list-disc ml-6 text-base mb-2">
            <li>5–15 sessions per Key Leader</li>
            <li>HR briefings, optional anonymized reporting</li>
            <li>For sustainable leadership presence</li>
          </ul>
          <a
            href="mailto:hello@radicalsensitiveleadership.com"
            onClick={() => {
              if (typeof window !== 'undefined' && window.va) {
                window.va.track('Contact_for_Corporate_Coaching');
              }
            }}
            className="underline text-base hover:opacity-70"
          >
            → Contact me directly
          </a>
        </div>
      </div>

      <hr className="my-12 border-gray-300" />

      <h2 className="text-2xl font-semibold mb-4">Why it matters</h2>
      <ul className="list-disc ml-6 text-base mb-8">
        <li>Clarity in complex roles</li>
        <li>Relief in emotional overload</li>
        <li>Strategic calm in decision-making</li>
        <li>Retention of high performers through resonance</li>
        <li>Authentic presence in uncertain times</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">Why me</h2>
      <ul className="list-disc ml-6 text-base mb-12">
        <li>16 years leadership in Pharma/MedTech</li>
        <li>Executive Coach with depth & business logic</li>
        <li>Scientific background in Positive Psychology & Coaching</li>
        <li>Fluent in market mechanics and human complexity</li>
        <li>Sessions in German or English, remote or in person</li>
      </ul>

      <div className="mt-10">
        <h3 className="text-xl mb-2">Free initial call</h3>
        <p className="mb-2">Let’s speak first, feel the resonance, then decide:</p>
        <a
          href="https://cal.com/radicalsensitiveleadership/intro-call"
          onClick={() => {
            if (typeof window !== 'undefined' && window.va) {
              window.va.track('Book_Intro_Call');
            }
          }}
          className="underline text-base hover:opacity-70"
        >
          → Book a 15-min conversation
        </a>
      </div>

      <div className="mt-12">
        <a
          href="mailto:hello@radicalsensitiveleadership.com"
          onClick={() => {
            if (typeof window !== 'undefined' && window.va) {
              window.va.track('Write_Email_Contact');
            }
          }}
          className="underline text-base hover:opacity-70"
        >
          Or write me directly → hello@radicalsensitiveleadership.com
        </a>
      </div>

      <div className="mt-16">
        <a href="/" className="text-sm underline hover:opacity-60">
          ← Back to Home
        </a>
      </div>
    </main>
  );
}
