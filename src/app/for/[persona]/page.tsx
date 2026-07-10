import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PERSONAS, PERSONA_LIST, type PersonaKey } from '@/lib/personas';

const SITE_URL = 'https://xn--hc0b21et01ao2a.com';

const COLOR_MAP = {
  rose: {
    accent: 'bg-rose-500',
    accentHover: 'hover:bg-rose-600',
    text: 'text-rose-600',
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    gradient: 'from-rose-50 to-white',
    soft: 'bg-rose-50/40',
  },
  amber: {
    accent: 'bg-amber-500',
    accentHover: 'hover:bg-amber-600',
    text: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    gradient: 'from-amber-50 to-white',
    soft: 'bg-amber-50/40',
  },
  emerald: {
    accent: 'bg-emerald-500',
    accentHover: 'hover:bg-emerald-600',
    text: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    gradient: 'from-emerald-50 to-white',
    soft: 'bg-emerald-50/40',
  },
} as const;

export function generateStaticParams() {
  return PERSONA_LIST.map((p) => ({ persona: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ persona: string }>;
}): Promise<Metadata> {
  const { persona } = await params;
  const p = PERSONAS[persona as PersonaKey];
  if (!p) return {};
  return {
    title: p.metaTitle,
    description: p.metaDescription,
    keywords: p.hero.keywords,
    alternates: { canonical: `${SITE_URL}/for/${p.slug}` },
    openGraph: {
      title: p.metaTitle,
      description: p.metaDescription,
      url: `${SITE_URL}/for/${p.slug}`,
      type: 'website',
    },
  };
}

export default async function PersonaPage({
  params,
}: {
  params: Promise<{ persona: string }>;
}) {
  const { persona } = await params;
  const p = PERSONAS[persona as PersonaKey];
  if (!p) notFound();

  const c = COLOR_MAP[p.color];

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: p.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <div className="bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className={`bg-gradient-to-b ${c.gradient} py-20 px-4`}>
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className={`mb-4 ${c.text} ${c.bg}`}>
            <span className="mr-1">{p.emoji}</span>
            {p.badge}
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight whitespace-pre-line">
            {p.hero.headline}
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            {p.hero.subhead}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/diagnose"
              className={`${c.accent} ${c.accentHover} text-white px-8 py-4 rounded-full text-lg font-semibold transition shadow-lg`}
            >
              무료 AI 진단 시작
            </Link>
            <a
              href="tel:010-9883-7268"
              className="border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-full text-lg font-semibold hover:border-gray-300 transition"
            >
              상담 문의
            </a>
          </div>
        </div>
      </section>

      {/* Pains */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            이런 고민, 익숙하시죠?
          </h2>
          <div className="space-y-3">
            {p.pains.map((pain) => (
              <div
                key={pain}
                className={`flex gap-3 items-start p-4 ${c.bg} rounded-xl`}
              >
                <span className={`${c.text} text-lg flex-shrink-0`}>!</span>
                <span className="text-gray-700">{pain}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Cases */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
            AI가 가져갈 수 있는 일
          </h2>
          <p className="text-center text-xs text-gray-400 mb-10">
            * 일부 도입 사례 기준이며, 회사 상황에 따라 달라질 수 있습니다.
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            {p.aiCases.map((cs) => (
              <Card key={cs.title} className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4">{cs.title}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex gap-2">
                      <span className="text-red-400 font-semibold w-16 flex-shrink-0">Before</span>
                      <span className="text-gray-600">{cs.before}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-green-500 font-semibold w-16 flex-shrink-0">After</span>
                      <span className="text-gray-700 font-medium">{cs.after}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            자주 묻는 질문
          </h2>
          <div className="space-y-4">
            {p.faqs.map((f) => (
              <Card key={f.q} className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-bold mb-3 flex gap-2">
                    <span className={c.text}>Q.</span>
                    <span>{f.q}</span>
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed pl-6">
                    {f.a}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Links */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            함께 보면 좋은 서비스
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/ai-consulting">
              <Card className="h-full hover:shadow-xl transition cursor-pointer border-0 shadow-md">
                <CardContent className="p-8">
                  <div className="text-2xl mb-3">🏢</div>
                  <h3 className="text-xl font-bold mb-2">AI경영진단 컨설팅</h3>
                  <p className="text-gray-600 text-sm">
                    전체 업무를 분석하여 AI로 맡길 일과 사람이 할 일을 구분합니다.
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/aeo-geo">
              <Card className="h-full hover:shadow-xl transition cursor-pointer border-0 shadow-md">
                <CardContent className="p-8">
                  <div className="text-2xl mb-3">🔍</div>
                  <h3 className="text-xl font-bold mb-2">AEO/GEO 최적화</h3>
                  <p className="text-gray-600 text-sm">
                    AI 검색에서 더 자주 추천되도록 콘텐츠와 구조를 다듬습니다.
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`py-16 px-4 ${c.soft}`}>
        <div className="max-w-xl mx-auto">
          <Card className="border-0 shadow-xl">
            <CardContent className="p-10 text-center">
              <h2 className="text-2xl font-bold mb-2">{p.cta.title}</h2>
              <p className="text-gray-500 mb-8">{p.cta.sub}</p>
              <div className="flex flex-col gap-3">
                <a
                  href="https://open.kakao.com/o/gjLDUN4h"
                  target="_blank"
                  className="bg-yellow-400 text-gray-900 py-4 rounded-full font-semibold hover:bg-yellow-300 transition"
                >
                  💬 카카오톡 상담
                </a>
                <a
                  href="tel:010-9883-7268"
                  className={`${c.accent} ${c.accentHover} text-white py-4 rounded-full font-semibold transition`}
                >
                  📞 010-9883-7268
                </a>
                <Link
                  href="/diagnose"
                  className="border border-gray-200 py-4 rounded-full font-semibold text-gray-700 hover:bg-gray-50 transition"
                >
                  무료 AI 진단 시작
                </Link>
              </div>
              <p className="text-sm text-gray-400 mt-6">
                한동노무법인 | 대표 공인노무사 박실로
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
