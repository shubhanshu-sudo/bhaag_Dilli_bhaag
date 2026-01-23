'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex justify-center pointer-events-none">
      <div
        className="
          pointer-events-auto
          mt-4 sm:mt-6
          w-full max-w-7xl
          mx-4 sm:mx-6
          bg-white
          rounded-xl
          shadow-xl
          px-4 sm:px-6 lg:px-8
          py-1 sm:py-1.5
          flex items-center justify-between
          border border-blue-50
        "
      >
        {/* Brand */}
        <Link href="/" className="flex-shrink-0 flex items-center transition-all duration-300 hover:scale-105 group">
          <div className="relative w-48 h-12 sm:w-64 sm:h-20">
            <Image
              src="/Untitled-1-01.webp"
              alt="Bhaag Dilli Bhaag Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop Nav Links */}
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

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 text-blue-900 hover:bg-blue-50 rounded-lg transition-colors z-10 relative"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Desktop CTA */}
        <Link href="/register" className="hidden lg:block">
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

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-[calc(100%+0.5rem)] left-4 right-4 bg-white rounded-xl shadow-xl border border-blue-50 overflow-hidden pointer-events-auto z-[90]">
          <div className="flex flex-col">
            <Link
              href="/"
              className="px-6 py-4 text-sm font-bold text-blue-900 hover:bg-blue-50 transition-colors border-b border-blue-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/#about"
              className="px-6 py-4 text-sm font-bold text-blue-900 hover:bg-blue-50 transition-colors border-b border-blue-50"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/#route"
              className="px-6 py-4 text-sm font-bold text-blue-900 hover:bg-blue-50 transition-colors border-b border-blue-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Route
            </Link>
            <Link
              href="/#contact"
              className="px-6 py-4 text-sm font-bold text-blue-900 hover:bg-blue-50 transition-colors border-b border-blue-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/register"
              className="px-6 py-4"
              onClick={() => setIsMenuOpen(false)}
            >
              <button className="w-full bg-yellow-500 hover:bg-yellow-400 text-blue-900 text-sm font-bold px-8 py-3 rounded-full shadow-md transition-all">
                Register Now
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
