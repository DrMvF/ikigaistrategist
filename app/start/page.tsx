'use client';

export default function StartPage() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-start px-8 sm:px-20 pt-40 sm:pt-56 font-cm text-black dark:text-white bg-white dark:bg-black">
      <main className="flex flex-col items-center text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
          Ikigai Strategist
        </h1>

        <p className="text-xl sm:text-2xl max-w-xl">
          A cycle-aware clarity system – built for women <br /> who feel deeply, think relentlessly, <br /> and want to trust their rhythm again.
        </p>

        <div className="h-12 sm:h-16" />

        <p className="text-lg sm:text-2xl">
          Your purpose isn’t broken.  <br />
          Your rhythm is just ignored. <br />
        </p>
        <p className="text-lg sm:text-2xl mb-12">
          Begin your journey from where you are – <br /> hormonally, emotionally, meaningfully.
        </p>

        <a
          href="/onboarding"
          className="cursor-pointer rounded-full bg-black text-white px-6 py-3 text-lg sm:text-xl text-center hover:bg-[#383838] transition-colors dark:bg-white dark:text-black dark:hover:bg-[#e5e5e5]"
        >
          Begin with your cycle
        </a>
      </main>
    </div>
  );
}
