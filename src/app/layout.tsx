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

const SITE_URL = "https://xn--hc0b21et01ao2a.com";
const SITE_TITLE = "AEO·GEO 전문 광주전남노무사 박실로 | 코딩하는 노무사";
const SITE_DESCRIPTION =
  "광주·전남 노무사 박실로(한동노무법인)가 직접 코딩하여 운영하는 AEO·GEO·AI경영진단 전문 사이트. 광주광역시·전라남도·전라북도 기업의 AI 검색 노출(ChatGPT·Perplexity·Gemini)과 업무 자동화를 진단·설계·구축합니다.";
const PERSON_ID = "https://silronomu.com/#person";
const ORG_ID = "https://silronomu.com/#organization";
const OG_IMAGE = `${SITE_URL}/opengraph-image`;

// owned 채널 11종 마스터 (양방향 엔티티 그래프용) — Naver는 반드시 5215678
const SAME_AS = [
  "https://silronomu.com",
  "https://blog.silronomu.com",
  "https://sanjae.silronomu.com",
  "https://xn--hc0bn7fv7j9tf6rl.net",
  "https://xn--hc0b21e4rq52a9zgfzlxub.com",
  "https://xn--hc0b21et01ao2a.com",
  "https://blog.naver.com/5215678",
  "https://silronomusa.blogspot.com",
  "https://www.facebook.com/people/박실로/100063776575717/",
  "https://www.threads.net/@silrobag",
  "https://www.instagram.com/silrobag",
  "https://www.youtube.com/@코딩하는노무사",
  "https://edu.silronomu.com",
  "https://ai-school.silronomu.com",
  "https://x.com/silrobag",
  "https://www.linkedin.com/in/실로-박-385a1a104/",
];

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | SilroGEO",
  },
  description: SITE_DESCRIPTION,
  keywords: ["AEO", "GEO", "AI 검색 최적화", "AI경영진단", "AI 컨설팅", "노무사", "광주전남노무사", "광주 노무사", "전남 노무사", "한동노무법인", "박실로", "코딩하는 노무사"],
  authors: [{ name: "박실로", url: "https://silronomu.com" }],
  creator: "박실로",
  publisher: "한동노무법인",
  verification: {
    google: "Qwpq-Pk2PwUsfRT1kCYw1YjxOJzi4_E25Ib8G0cd8Tw",
    other: {
      "naver-site-verification": "a1c71b53782eb2001b5e94d982c013f01a294ebe",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: "SilroGEO",
    locale: "ko_KR",
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "AEO·GEO 전문 광주전남노무사 박실로 (SilroGEO)" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@silrobag",
    creator: "@silrobag",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: "박실로",
      alternateName: [
        "박실로 노무사",
        "박실로 공인노무사",
        "코딩하는 노무사",
        "방법을 찾아주는 노무사",
        "Park Sillo",
      ],
      jobTitle: "공인노무사",
      url: "https://silronomu.com",
      worksFor: { "@id": ORG_ID },
      sameAs: SAME_AS,
      knowsAbout: [
        "광주 노무사", "전남 노무사", "병원 노무관리", "산업재해보상",
        "산업안전보건법", "중대재해처벌법", "건설현장 노무관리",
        "부당해고", "임금체불", "근로감독 대응",
        "AEO", "GEO", "AI 경영진단",
      ],
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "공인노무사",
        recognizedBy: {
          "@type": "Organization",
          name: "고용노동부",
        },
        identifier: {
          "@type": "PropertyValue",
          name: "공인노무사 직무개시등록번호",
          value: "제1243호",
        },
      },
    },
    {
      "@type": ["Organization", "LegalService"],
      "@id": ORG_ID,
      legalName: "한동노무법인",
      name: "한동노무법인",
      url: "https://silronomu.com",
      telephone: "+82-62-521-5678",
      founder: { "@id": PERSON_ID },
      sameAs: SAME_AS,
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#service`,
      name: "AEO·GEO 전문 광주전남노무사 박실로 (SilroGEO)",
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      image: OG_IMAGE,
      telephone: "+82-62-521-5678",
      parentOrganization: { "@id": ORG_ID },
      founder: { "@id": PERSON_ID },
      employee: { "@id": PERSON_ID },
      priceRange: "₩₩",
      address: {
        "@type": "PostalAddress",
        streetAddress: "금재로 27, 3층",
        addressLocality: "북구",
        addressRegion: "광주광역시",
        postalCode: "61239",
        addressCountry: "KR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 35.1741,
        longitude: 126.9123,
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+82-62-521-5678",
          contactType: "customer service",
          areaServed: "KR",
          availableLanguage: "Korean",
        },
        {
          "@type": "ContactPoint",
          telephone: "+82-10-9883-7268",
          contactType: "sales",
          areaServed: "KR",
          availableLanguage: "Korean",
        },
      ],
      areaServed: ["광주광역시", "전라남도", "전라북도"],
      sameAs: SAME_AS,
    },
    {
      "@type": "Service",
      "@id": `${SITE_URL}/ai-consulting#service`,
      name: "AI경영진단 컨설팅",
      provider: { "@id": `${SITE_URL}/#service` },
      serviceType: "AI Management Consulting",
      areaServed: ["광주광역시", "전라남도", "전라북도"],
      description: "회사 전체 업무를 분석하여 AI로 자동화 가능한 영역을 진단하고, 표준화·도입설계·구축까지 지원하는 컨설팅 서비스.",
      url: `${SITE_URL}/ai-consulting`,
    },
    {
      "@type": "Service",
      "@id": `${SITE_URL}/aeo-geo#service`,
      name: "AEO/GEO 최적화",
      provider: { "@id": `${SITE_URL}/#service` },
      serviceType: "Answer Engine Optimization",
      areaServed: ["광주광역시", "전라남도", "전라북도"],
      description: "ChatGPT, Gemini, Perplexity, Claude 등 생성형 AI 검색에서 더 자주 추천되도록 콘텐츠와 구조화 데이터를 최적화하는 서비스.",
      url: `${SITE_URL}/aeo-geo`,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "SilroGEO",
      inLanguage: "ko-KR",
      publisher: { "@id": PERSON_ID },
      about: { "@id": `${SITE_URL}/#service` },
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Nav />
        <main className="flex-1 pt-16">{children}</main>
      </body>
    </html>
  );
}
