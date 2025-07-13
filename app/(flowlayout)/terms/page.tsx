export default function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto py-24 px-6 text-justify leading-relaxed font-cm">
      <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>

      <p className="mb-6">
        These Terms and Conditions apply to all services, digital products, and self-coaching tools provided under the label
        “Ikigai Strategist” by Dr. Miriam von Felbert.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">1. Use of the Application</h2>
      <p>
        Ikigai Strategist is a self-guided digital system for journaling, cycle-based habit tracking, and inner reflection.
        It is designed for personal development and does not replace medical, psychological, or financial advice.
        Access is granted through authentication and optional payment tiers.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">2. Booking and Payment</h2>
      <p>
        Paid services (such as personalized reports or coaching sessions) must be booked in advance and are processed via Stripe.
        All bookings are binding. Confirmation is only valid upon receipt of full payment.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">3. No Cancellation Policy</h2>
      <p>
        Due to the nature of digital delivery and individual preparation, sessions and purchases are non-cancellable and non-refundable.
        Please review your decision carefully before committing.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">4. Intellectual Property</h2>
      <p>
        All content, code, diagrams, prompts, and written reflections are protected by copyright and may not be reproduced,
        distributed, or publicly shared without prior written consent by the author.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">5. Confidentiality & Data</h2>
      <p>
        Reflections and ratings submitted through the app are stored securely and treated confidentially.
        Any use of your data for research or development purposes will be anonymized. See our Privacy Policy for further details.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">6. Disclaimer</h2>
      <p>
        Ikigai Strategist is not a therapeutic or diagnostic tool. It supports mental clarity, but does not substitute professional treatment.
        By using this product, you acknowledge that you remain responsible for your own emotional and psychological well-being.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">7. Governing Law</h2>
      <p>
        The applicable law is that of the Federal Republic of Germany.
        Unless otherwise required by law, the place of jurisdiction is deemed to be the registered business location of the provider.
      </p>

      <p className="mt-12 text-sm text-gray-500">
        Last updated: {new Date().toLocaleDateString("en-GB")}
      </p>
    </main>
  );
}
