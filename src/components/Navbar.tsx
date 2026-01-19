'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div
        className="
          pointer-events-auto
          mt-6
          w-full max-w-7xl
          mx-6
          bg-white
          rounded-xl
          shadow-xl
          px-8
          py-4
          flex items-center justify-between
          border border-blue-50
        "
      >
        {/* Brand */}
        <Link href="/" className="flex-shrink-0 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center text-white font-black text-xs">
            BDB
          </div>
          <span className="text-xl font-black text-blue-900 tracking-tight">
            Bhaag Dilli Bhaag
          </span>
        </Link>

        {/* Nav Links */}
        <div className="hidden lg:flex items-center gap-8">
          <Link href="/" className="text-sm font-bold text-blue-900 hover:text-blue-700 transition-colors">
            Home
          </Link>

          <Link href="/#about" className="text-sm font-bold text-blue-900 hover:text-blue-700 transition-colors">
            About
          </Link>

          <Link href="/#route" className="text-sm font-bold text-blue-900 hover:text-blue-700 transition-colors">
            Route
          </Link>

          <span className="h-5 w-px bg-blue-100" />

          <Link
            href="/#contact"
            className="text-sm font-bold text-blue-900 hover:text-blue-700 transition-colors"
          >
            Contact
          </Link>
        </div>

        {/* CTA */}
        <Link href="/register">
          <button
            className="
              bg-yellow-500
              hover:bg-yellow-400
              text-blue-900
              text-sm
              font-bold
              px-8
              py-3
              rounded-full
              shadow-md
              hover:shadow-lg
              transition-all
              transform
              hover:-translate-y-0.5
            "
          >
            Register Now
          </button>
        </Link>
      </div>
    </nav>
  );
}
