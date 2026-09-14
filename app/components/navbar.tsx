"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Mapa", href: "/" },
  { label: "Terremotos", href: "/earthquakes" },
  { label: "Incendios", href: "/wildfires" },
  { label: "Acerca de", href: "/about" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative z-50 flex items-center justify-between border-b border-black/10 bg-white px-4 py-3 dark:border-white/10 dark:bg-black sm:px-6">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/logo/logo.png" alt="WorldQuakes logo" width={32} height={32} priority />
        <span className="text-lg font-semibold text-black dark:text-zinc-50">
          WorldQuakes
        </span>
      </Link>

      <nav className="hidden items-center gap-6 sm:flex">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm font-medium text-zinc-600 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <button
        type="button"
        onClick={() => setIsMenuOpen((open) => !open)}
        className="flex items-center justify-center rounded-md p-2 text-zinc-600 hover:bg-black/5 dark:text-zinc-400 dark:hover:bg-white/10 sm:hidden"
        aria-label="Abrir menú"
        aria-expanded={isMenuOpen}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          {isMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
          )}
        </svg>
      </button>

      {isMenuOpen && (
        <nav className="absolute inset-x-0 top-full flex flex-col border-b border-black/10 bg-white p-4 dark:border-white/10 dark:bg-black sm:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="py-2 text-sm font-medium text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
