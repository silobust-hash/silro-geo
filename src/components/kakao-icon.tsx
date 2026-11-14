export function KakaoIcon({ size = 20, className = 'shrink-0' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" className={className}>
      <path d="M12 3C6.99 3 3 6.2 3 10.13c0 2.5 1.67 4.7 4.19 5.96-.18.63-.67 2.3-.77 2.66-.12.45.17.44.35.32.15-.1 2.3-1.56 3.24-2.2.64.09 1.3.14 1.99.14 5.01 0 9-3.2 9-7.13S17.01 3 12 3z" />
    </svg>
  );
}
