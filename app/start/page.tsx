// app/start/page.tsx

export default function StartPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white dark:bg-black px-4 py-24">
      <div className="text-center max-w-xl">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-black dark:text-white">
          Ikigai Strategist
        </h1>
        <p className="mt-2 text-lg sm:text-xl text-black dark:text-white">
          A radically simple, deeply powerful habit tracker
        </p>
        <p className="mt-6 text-xl sm:text-2xl text-gray-800 dark:text-gray-100">
          Speak your truth. Track your rhythm. <br />
          Align with what truly matters – and make it a way of life.
        </p>
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 italic">
          Registration and payment required to enter.
        </p>
        <a
          href="/check-in"
          className="inline-block mt-8 rounded-xl bg-black px-6 py-3 text-white text-sm font-semibold shadow hover:bg-gray-800 transition dark:bg-white dark:text-black dark:hover:bg-gray-200"
        >
          Start now – 2,99 €/week
        </a>
      </div>
    </main>
  );
}
