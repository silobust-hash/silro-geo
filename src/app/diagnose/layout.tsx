import type { Metadata } from 'next';

const PAGE_URL = 'https://xn--hc0b21et01ao2a.com/diagnose';

export const metadata: Metadata = {
  alternates: { canonical: PAGE_URL },
};

export default function DiagnoseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
