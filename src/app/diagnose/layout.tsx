import type { Metadata } from 'next';

const PAGE_URL = 'https://xn--hc0b21et01ao2a.com/diagnose';
const PAGE_TITLE = '무료 AEO·GEO 진단';
const PAGE_DESCRIPTION =
  'URL을 입력하면 메타태그, Schema.org, 시맨틱 구조, 보안, 콘텐츠, 색인 상태를 분석하고 AI 검색 최적화 개선 방향을 안내합니다.';

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: `${PAGE_TITLE} | SilroGEO`,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    type: 'website',
  },
};

export default function DiagnoseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
