'use client';

import Link from 'next/link';
import { useState } from 'react';

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">S</div>
          <span className="font-bold text-lg text-gray-900">SilroGEO</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/ai-consulting" className="text-sm text-gray-600 hover:text-blue-600 transition">AI경영진단</Link>
          <Link href="/aeo-geo" className="text-sm text-gray-600 hover:text-blue-600 transition">AEO/GEO</Link>
          <Link href="/diagnose" className="text-sm text-gray-600 hover:text-blue-600 transition">무료 진단</Link>
          <a href="tel:010-9883-7268" className="text-sm bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition">상담 문의</a>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t px-4 pb-4">
          <Link href="/ai-consulting" className="block py-3 text-gray-700" onClick={() => setOpen(false)}>AI경영진단</Link>
          <Link href="/aeo-geo" className="block py-3 text-gray-700" onClick={() => setOpen(false)}>AEO/GEO</Link>
          <Link href="/diagnose" className="block py-3 text-gray-700" onClick={() => setOpen(false)}>무료 진단</Link>
          <a href="tel:010-9883-7268" className="block py-3 text-blue-600 font-semibold">상담 문의</a>
        </div>
      )}
    </nav>
  );
}
