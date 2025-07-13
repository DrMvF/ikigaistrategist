"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { track } from "@vercel/analytics";

const navItems = [
  { name: "Start", href: "/start", protected: false },
  { name: "Invitation", href: "/invitation", protected: false },
  { name: "Onboarding", href: "/onboarding", protected: true },
  { name: "Journal", href: "/journal", protected: true },
  { name: "Evaluate", href: "/evaluate", protected: true },
  { name: "Report", href: "/report", protected: true },
  { name: "Trajectory", href: "/trajectory", protected: true },
  { name: "TripleFour", href: "/triplefour", protected: true },
  { name: "Flow Overview", href: "/flow", protected: false },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const handleTrack = (label: string) => {
    track("sidebar_click", { label });
  };

  return (
    <div className="flex min-h-screen font-cm">
      {/* Sidebar */}
      <aside
        className={`
          fixed z-40 top-0 left-0 h-full w-64 bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800
          transform ${open ? "translate-x-0" : "-translate-x-full"}
          transition-transform duration-200 ease-in-out
          md:translate-x-0 md:static md:block
        `}
      >
        <div className="p-6 flex flex-col justify-between h-full">
          <div>
            <h2 className="text-xl font-bold mb-4">Navigation</h2>
            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => handleTrack(item.name)}
                  className={`block px-2 py-1 rounded hover:underline ${
                    pathname === item.href ? "font-semibold underline" : ""
                  }`}
                >
                  {item.name} {item.protected && <span className="text-gray-400">🔒</span>}
                </Link>
              ))}
            </nav>
          </div>

          {/* Footer Links */}
          <div className="mt-10">
            <hr className="my-4 border-gray-300 dark:border-gray-700" />
            <div className="space-y-2 text-sm text-gray-500">
              <Link
                href="/legal"
                onClick={() => handleTrack("Legal Notice")}
                className="block hover:underline"
              >
                Legal Notice
              </Link>
              <Link
                href="/privacy"
                onClick={() => handleTrack("Privacy Policy")}
                className="block hover:underline"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                onClick={() => handleTrack("Terms & Conditions")}
                className="block hover:underline"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 px-3 py-1 rounded"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {/* Main Content */}
      <main className="flex-1 ml-0 md:ml-64 px-6 sm:px-12 py-10 bg-white dark:bg-black text-black dark:text-white">
        {children}
      </main>
    </div>
  );
}
