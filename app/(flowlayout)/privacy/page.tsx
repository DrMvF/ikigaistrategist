export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-32 font-cm leading-relaxed text-base text-justify">
      <h1 className="text-3xl sm:text-4xl mb-8 font-semibold text-left">
        Privacy Policy
      </h1>

      <p className="mb-4">
        We take your privacy seriously. This Privacy Policy explains how
        “Ikigai Strategist” (“we”, “us”, “our”) processes personal data
        when you use this web application.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4 text-left">1. Data Controller</h2>
      <p className="mb-4">
        Dr. Miriam von Felbert<br />
        Schwanenweg 19, 24558 Henstedt‑Ulzburg, Germany<br />
        Email: mail@ikigaistrategist.de
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4 text-left">2. Data Collected</h2>
      <p className="mb-4">
        • Name and email address via Clerk authentication.<br />
        • Journal entries, ratings, and cycle information stored securely in a managed database (PlanetScale, Frankfurt, Germany).<br />
        • Technical metadata (e.g., browser, device, IP address) via Vercel Analytics.<br />
        • Optional interaction with OpenAI API for reflection generation (processed anonymously).
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4 text-left">3. Purpose & Legal Basis</h2>
      <p className="mb-4">
        Your data is processed to provide journaling functionality, habit tracking, visualization tools,
        and personalized feedback. Legal bases include consent (Art. 6(1)(a) GDPR) and performance of contract (Art. 6(1)(b) GDPR).
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4 text-left">4. Analytics & Cookies</h2>
      <p className="mb-4">
        We use Vercel Analytics to understand general usage patterns. This data is anonymized and does not contain any personal identifiers.
        We do not use intrusive cookies. Local storage may be used for client-side UI preferences.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4 text-left">5. Data Sharing</h2>
      <p className="mb-4">
        • Clerk – for secure authentication (see <a href="https://clerk.com/privacy" target="_blank" rel="noopener noreferrer" className="underline">Clerk Privacy Policy</a>).<br />
        • PlanetScale – for encrypted database storage (see <a href="https://planetscale.com/legal/privacy" target="_blank" rel="noopener noreferrer" className="underline">PlanetScale Privacy Policy</a>).<br />
        • OpenAI – for generating reflections (no personal data is sent; see <a href="https://openai.com/policies/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline">OpenAI Privacy Policy</a>).<br />
        • Vercel – for hosting and analytics (see <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline">Vercel Privacy Policy</a>).
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4 text-left">6. International Transfers</h2>
      <p className="mb-4">
        Some service providers may process data outside the EU. All providers mentioned adhere to GDPR-compliant safeguards such as
        Standard Contractual Clauses or operate within EU data centers.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4 text-left">7. Your Rights</h2>
      <p className="mb-4">
        You may request access to your data, correction, deletion, or restriction of processing. You may also object to processing
        or request data export. Please email hello@radicalsensitiveleadership.com with any request.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4 text-left">8. Data Retention</h2>
      <p className="mb-4">
        We store your data as long as your account is active. You may request deletion at any time.
        Backups may exist for up to 30 days as part of platform operations.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4 text-left">9. Contact & Complaints</h2>
      <p className="mb-4">
        For questions or complaints, contact us at mail@ikigaistrategist.de.<br />
        You may also file a complaint with your local data protection authority in accordance with Art. 77 GDPR.
      </p>
    </main>
  );
}
