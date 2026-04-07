import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SilroGEO | AI경영진단 · AEO/GEO 최적화 — 한동노무법인",
  description: "AI가 일하게 만들고, AI가 추천하게 만듭니다. 한동노무법인 박실로 노무사의 AI경영진단 컨설팅과 AEO/GEO 최적화 서비스.",
  openGraph: {
    title: "SilroGEO | AI경영진단 · AEO/GEO 최적화",
    description: "AI가 일하게 만들고, AI가 추천하게 만듭니다.",
    url: "https://silrogeo.com",
    siteName: "SilroGEO",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Nav />
        <main className="flex-1 pt-16">{children}</main>
      </body>
    </html>
  );
}
