'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

// 모든 채널의 상담 진입점은 한동노무법인 카카오톡 채널 하나로 모은다.
const KAKAO_CHAT_URL = 'https://pf.kakao.com/_VNJxlb/chat';

export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const desktopLink = (href: string) =>
    `inline-flex min-h-10 items-center text-sm transition-colors hover:text-blue-700 ${isCurrent(href) ? 'font-semibold text-blue-700' : 'font-medium text-gray-700'}`;
  const mobileLink = (href: string) =>
    `block py-3 text-base ${isCurrent(href) ? 'font-semibold text-blue-700' : 'font-medium text-gray-800'}`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex min-h-11 items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">S</div>
          <span className="font-bold text-lg text-gray-900">SilroGEO</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/ai-consulting" className={desktopLink('/ai-consulting')} aria-current={isCurrent('/ai-consulting') ? 'page' : undefined}>AI경영진단</Link>
          <Link href="/aeo-geo" className={desktopLink('/aeo-geo')} aria-current={isCurrent('/aeo-geo') ? 'page' : undefined}>AEO/GEO</Link>
          <Link href="/diagnose" className={desktopLink('/diagnose')} aria-current={isCurrent('/diagnose') ? 'page' : undefined}>무료 진단</Link>
          <a href="tel:010-9883-7268" className="inline-flex min-h-10 items-center text-sm font-medium text-gray-700 transition-colors hover:text-blue-700">전화 상담</a>
          <a
            href={KAKAO_CHAT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-kakao min-h-10"
          >
            카카오톡 상담
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden -mr-2.5 inline-flex size-11 items-center justify-center rounded-lg text-gray-900 hover:bg-gray-100"
          aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
          aria-expanded={open}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t px-4 pb-4">
          <Link href="/ai-consulting" className={mobileLink('/ai-consulting')} aria-current={isCurrent('/ai-consulting') ? 'page' : undefined} onClick={() => setOpen(false)}>AI경영진단</Link>
          <Link href="/aeo-geo" className={mobileLink('/aeo-geo')} aria-current={isCurrent('/aeo-geo') ? 'page' : undefined} onClick={() => setOpen(false)}>AEO/GEO</Link>
          <Link href="/diagnose" className={mobileLink('/diagnose')} aria-current={isCurrent('/diagnose') ? 'page' : undefined} onClick={() => setOpen(false)}>무료 진단</Link>
          <a href="tel:010-9883-7268" className="block py-3 text-base font-medium text-gray-800 border-t border-gray-50">전화 상담</a>
          <a
            href={KAKAO_CHAT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 btn btn-kakao w-full"
            onClick={() => setOpen(false)}
          >
            카카오톡 상담
          </a>
        </div>
      )}
    </nav>
  );
}
