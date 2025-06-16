import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-cm">
      <main className="flex flex-col gap-10 row-start-2 items-center sm:items-start max-w-2xl text-center sm:text-left">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold font-cm mb-2">
            Radical Sensitive Leadership
          </h1>
          <p className="text-lg sm:text-xl font-cm tracking-tight mb-1">
            Intuition. Intelligence. Integrity.
          </p>
          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 font-cm">
            Dr. Miriam von Felbert • Deepfluencer | Positive Psychologist | Ikigai Strategist
          </p>
        </div>

        <div className="flex flex-col gap-6 w-full">
          <div>
            <a
              className="block rounded-full border border-transparent transition-colors bg-black text-white hover:bg-[#383838] dark:bg-white dark:text-black dark:hover:bg-[#ccc] font-medium text-base h-12 px-5 text-center"
              href="/deepflow"
            >
              Deep Flow
            </a>
            <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
              Daily reflections on presence, intuition, and radical sensitivity.
            </p>
          </div>

          <div>
            <a
              className="block rounded-full border border-black/[.08] dark:border-white/[.145] transition-colors hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] font-medium text-base h-12 px-5 text-center"
              href="/weekly"
            >
              Radical Weekly
            </a>
            <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
              Build in public as a psychologist. Weekly essays on strategy, transformation, and clarity.
            </p>
          </div>

          <div>
            <a
              className="block rounded-full border border-black/[.08] dark:border-white/[.145] transition-colors hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] font-medium text-base h-12 px-5 text-center"
              href="/offer"
            >
              White Space
            </a>
            <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
              Executive coaching for leaders in Pharma, Biotech, and MedTech.
            </p>
          </div>
        </div>
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center text-base mt-16">
        <a className="flex items-center gap-2 hover:underline hover:underline-offset-4" href="/legal">
          <span className="font-bold text-xl mr-2">●</span>
          Legal Notice
        </a>
        <a className="flex items-center gap-2 hover:underline hover:underline-offset-4" href="/privacy">
          <span className="font-bold text-xl mr-2">●</span>
          Privacy Policy
        </a>
        <a className="flex items-center gap-2 hover:underline hover:underline-offset-4" href="/terms">
          <span className="font-bold text-xl mr-2">●</span>
          Terms & Conditions
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.linkedin.com/in/miriamvonfelbert/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="font-bold text-xl mr-2">●</span>
          LinkedIn
        </a>
      </footer>
    </div>
  );
}

