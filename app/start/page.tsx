// app/start/page.tsx
'use client';

export default function StartPage() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-start px-8 sm:px-20 pt-40 sm:pt-56 font-cm text-black dark:text-white bg-white dark:bg-black">
      <main className="flex flex-col items-center text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
          Ikigai Strategist
        </h1>

        <p className="text-xl sm:text-2xl">
          A radically simple, deeply powerful habit tracker
        </p>

        <div className="h-12 sm:h-16" />

        <p className="text-lg sm:text-xl">
          Speak your truth. Track your rhythm.
        </p>
        <p className="text-lg sm:text-xl mb-12">
          Align with what truly matters – and make it a way of life.
        </p>

        <a
          href="https://buy.stripe.com/aFacN5dFg7hMdxn1dJ7N603"
          className="cursor-pointer rounded-full bg-black text-white px-6 py-3 text-lg sm:text-xl text-center hover:bg-[#383838] transition-colors dark:bg-white dark:text-black dark:hover:bg-[#e5e5e5]"
        >
          Start your 7-day free trial
        </a>
      </main>
    </div>
  );
}
