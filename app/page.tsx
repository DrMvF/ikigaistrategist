import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-between p-8 sm:p-20 font-cm">
      <main className="flex flex-col items-center text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
          Radical Sensitive Leadership
        </h1>
        <p className="text-lg sm:text-xl">Intuition. Intelligence. Integrity.</p>

        <div className="h-12 sm:h-16" /> {/* Extra white space */}

        <p className="text-base sm:text-lg text-gray-600 mb-12">
          Dr. Miriam von Felbert • Deepfluencer | Positive Psychologist | Ikigai Strategist
        </p>

        <div className="flex flex-col gap-4 w-full max-w-xs">
          <a
            href="https://ghost.radicalsensitiveleadership.com/"
            className="rounded-full border border-black dark:border-white px-6 py-3 text-base sm:text-lg text-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
          >
            Deep Flow
          </a>
          <a
            href="/offer"
            className="rounded-full border border-black dark:border-white px-6 py-3 text-base sm:text-lg text-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
          >
            White Space
          </a>
        </div>
      </main>

      <footer className="flex flex-wrap justify-center gap-4 mt-20 text-sm text-center">
        <a href="/legal" className="hover:underline">● Legal Notice</a>
        <a href="/privacy" className="hover:underline">● Privacy Policy</a>
        <a href="/terms" className="hover:underline">● Terms & Conditions</a>
        <a
          href="https://www.linkedin.com/in/miriamvonfelbert/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          ● LinkedIn
        </a>
      </footer>
    </div>
  );
}


