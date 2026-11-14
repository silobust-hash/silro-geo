// 모든 채널의 상담 진입점은 한동노무법인 카카오톡 채널 하나로 모은다.
const KAKAO_CHAT_URL = 'https://pf.kakao.com/_VNJxlb/chat';

export function KakaoConsultButton() {
  return (
    <a
      href={KAKAO_CHAT_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="한동노무법인 카카오톡 채널로 상담 문의하기"
      className="fixed bottom-4 right-4 z-40 inline-flex size-13 items-center justify-center gap-2 rounded-full bg-[#FEE500] text-sm font-semibold text-[#191600] shadow-md transition hover:bg-[#F2DA00] print:hidden sm:bottom-6 sm:right-6 sm:size-auto sm:min-h-11 sm:px-5"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" className="shrink-0">
        <path d="M12 3C6.99 3 3 6.2 3 10.13c0 2.5 1.67 4.7 4.19 5.96-.18.63-.67 2.3-.77 2.66-.12.45.17.44.35.32.15-.1 2.3-1.56 3.24-2.2.64.09 1.3.14 1.99.14 5.01 0 9-3.2 9-7.13S17.01 3 12 3z" />
      </svg>
      <span className="hidden sm:inline">카카오톡 상담</span>
    </a>
  );
}
