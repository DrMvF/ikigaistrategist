
import Image from "next/image";

export default function Home() {
  return (
   <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-cm">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
       <div className="text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold font-cm mb-2">
          Radical Sensitive Leadership{" "}
          </h1>
        <p className="text-lg sm:text-xl font-cm tracking-tight">
        Intuition. Intelligence. Integrity.
      </p>
      </div>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
        <a
          className="rounded-full border border-transparent transition-colors flex items-center justify-center bg-black text-white hover:bg-[#383838] dark:bg-white dark:text-black dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 min-w-[200px] text-center"
          href="https://ghost.radicalsensitiveleadership.com/"
        >
        Deep Flow
        </a>
        <a
          className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 min-w-[200px] text-center"
          href="/offer"
        >
         White Space
      </a>
</div>
</main>
  <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center text-base mt-16">
    <a
      className="flex items-center gap-2 hover:underline hover:underline-offset-4"
      href="/legal"
    >
      <span className="font-bold text-xl mr-2">●</span>
      Legal Notice
    </a>
    <a
      className="flex items-center gap-2 hover:underline hover:underline-offset-4"
      href="/privacy"
    >
      <span className="font-bold text-xl mr-2">●</span>
      Privacy Policy
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
