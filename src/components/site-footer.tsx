import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 px-4 pt-10 pb-24 text-center text-sm text-gray-600 sm:pb-10">
      <p className="mb-1">한동노무법인 | 대표 공인노무사 박실로</p>
      <p className="mb-3 flex flex-wrap items-center justify-center gap-x-2">
        <a href="https://silronomu.com" className="inline-flex min-h-11 items-center hover:text-blue-700">박실로 노무사 개인 홈페이지</a>{' · '}
        <a href="https://xn--2q1bm94d.com" className="inline-flex min-h-11 items-center hover:text-blue-700">한동.com 공식 홈페이지</a>{' · '}
        <a href="https://xn--2q1bm94d.com/members" className="inline-flex min-h-11 items-center hover:text-blue-700">박실로 구성원 소개</a>{' · '}
        <a href="https://www.threads.net/@silrobag" className="inline-flex min-h-11 items-center hover:text-blue-700">@silrobag</a>{' · '}
        <a href="https://silropanda.com/" className="inline-flex min-h-11 items-center hover:text-blue-700">실로판다 전문서비스몰</a>
      </p>
      <p className="mb-3 flex flex-wrap items-center justify-center gap-x-2">
        <Link href="/privacy" className="inline-flex min-h-11 items-center hover:text-blue-700">개인정보처리방침</Link>{' · '}
        <Link href="/terms" className="inline-flex min-h-11 items-center hover:text-blue-700">이용약관</Link>
      </p>
      <p>© 2026 SilroGEO. All rights reserved.</p>
    </footer>
  );
}
