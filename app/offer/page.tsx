export const metadata = {
    title: 'Offer White Space – Radical Sensitive Leadership',
    description:
      'Radical Sensitive Leadership is not a product. It’s a space. A perceptive invitation for those ready to embody responsibility.',
    openGraph: {
      title: 'Offer White Space',
      description:
        'This is not an offer to convince. It’s a space to resonate. If you feel it, you’ll know.',
      url: 'https://www.radicalsensitiveleadership.com/offer',
      siteName: 'Radical Sensitive Leadership',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: 'Offer White Space',
      description:
        'This is not an offer to convince. It’s a space to resonate.',
    },
  };
  
  export default function OfferPage() {
    return (
      <main className="max-w-3xl mx-auto px-4 py-32 font-cm">
        <h1 className="text-3xl sm:text-4xl mb-8">
          Offer White Space
        </h1>
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
          If you feel it, you’ll know. And if you want to speak, I’ll be here.
        </p>
        <div className="mt-12">
          <a
            href="mailto:hello@radicalsensitiveleadership.com"
            className="underline text-base hover:opacity-70"
          >
            hello@radicalsensitiveleadership.com
          </a>
        </div>
      </main>
    );
  }
  
  