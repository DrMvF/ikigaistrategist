export default function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto py-24 px-6 text-justify leading-relaxed">
      <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>

      <p>
        These terms and conditions apply to all coaching sessions, services, and digital products offered under the label “Radical Sensitive Leadership” by Dr. Miriam von Felbert.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">1. Booking and Payment</h2>
      <p>
        All bookings are binding. Payments are processed via Stripe and must be completed prior to the session. Coaching appointments are confirmed upon receipt of full payment.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">2. No Cancellation Policy</h2>
      <p>
        Coaching sessions are non-cancellable and non-refundable. Please consider your schedule carefully before confirming your booking.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">3. Intellectual Property</h2>
      <p>
        All content, materials, and reflections provided during sessions or as follow-up are protected by copyright and may not be reproduced or distributed without prior written consent.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">4. Confidentiality</h2>
      <p>
        All information shared in the context of a coaching session is treated with strict confidentiality. Exceptions apply only in cases of legal obligation.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">5. Disclaimer</h2>
      <p>
        Coaching is a process of personal and professional development and does not constitute psychological therapy or medical treatment.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">6. Governing Law</h2>
      <p>
        These terms are governed by the laws of the Federal Republic of Germany. The place of jurisdiction is Hamburg, Germany.
      </p>

      <p className="mt-12 text-sm text-gray-500">
        Last updated: {new Date().toLocaleDateString("en-GB")}
      </p>
       <div className="mt-16">
        <a href="/" className="text-sm underline hover:opacity-60">
          ← Back to Home
        </a>
      </div>
    </main>
  );
}
