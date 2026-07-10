import type { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const PAGE_URL = 'https://xn--hc0b21et01ao2a.com/aeo-geo';
const PAGE_TITLE = 'AEO·GEO 최적화';
const PAGE_DESCRIPTION =
  'ChatGPT·Gemini·Perplexity 등 AI 검색에서 기업이 더 정확히 이해되고 인용되도록 콘텐츠와 구조화 데이터를 진단·개선합니다.';

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

export default function AeoGeoPage() {
  return (
    <div className="bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4 text-blue-600 bg-blue-50">AEO/GEO Optimization</Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">AEO·GEO 최적화</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
            ChatGPT, Gemini, Perplexity에게 물었을 때<br />AI가 귀사를 더 자주 추천하도록 콘텐츠와 구조를 다듬습니다.
          </p>
          <Link href="/diagnose" className="bg-blue-500 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-blue-600 transition shadow-lg shadow-blue-200">
            무료 진단 시작 →
          </Link>
        </div>
      </section>

      {/* Why AEO/GEO */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-md bg-gradient-to-r from-blue-50 to-purple-50">
            <CardContent className="p-8">
              <h2 className="text-xl font-bold mb-4">왜 AEO/GEO가 필요한가요?</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                &ldquo;광주 노무사 추천해줘&rdquo;라고 ChatGPT에 물으면, AI가 추천하는 곳이 고객을 가져갑니다.
                이제 사람이 검색하는 시대가 아니라, <strong>AI가 답을 골라주는 시대</strong>입니다.
              </p>
              <p className="text-gray-700 leading-relaxed">
                AEO(Answer Engine Optimization)는 AI의 답변에 선택되는 전략이고,
                GEO(Generative Engine Optimization)는 AI가 콘텐츠를 인용하도록 최적화하는 전략입니다.
                AI와 코딩을 활용하여 병원 노무관리와 산업안전 시스템을 자동화하는 <strong>코딩하는 노무사 박실로</strong>가 직접 설계하고 실행합니다.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Real Experience */}
      <section className="px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-8">
              <Badge variant="secondary" className="mb-4 text-blue-600 bg-blue-50">2026년 4월 1일부터의 기록</Badge>
              <h2 className="text-xl font-bold mb-4">저도 처음부터 잘한 것은 아닙니다</h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p>2026년 4월 1일부터 직접 부딪히며 배우고, 고치고, 다시 실험했습니다.</p>
                <p>박실로 노무사는 인공지능을 공부하고, 실무에 적용하고, 답변형 검색과 생성형 검색 최적화에 진심인 사람입니다.</p>
                <p>그 경험을 바탕으로 귀사의 홈페이지와 콘텐츠가 인공지능 검색에서 어떻게 보일 수 있는지 함께 살펴드리겠습니다.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 5 AI Platforms */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">5대 AI 검색 플랫폼</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {[
              { name: 'ChatGPT', icon: '🟢', desc: 'OpenAI' },
              { name: 'Gemini', icon: '🔵', desc: 'Google' },
              { name: 'Perplexity', icon: '🟣', desc: '인용 기반' },
              { name: 'Claude', icon: '🟠', desc: 'Anthropic' },
              { name: 'AI Overview', icon: '🔍', desc: 'Google 검색' },
            ].map(({ name, icon, desc }) => (
              <Card key={name} className="border-0 shadow-sm text-center hover:shadow-md transition">
                <CardContent className="p-5">
                  <span className="text-3xl block mb-2">{icon}</span>
                  <span className="font-bold text-sm">{name}</span>
                  <p className="text-xs text-gray-400">{desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Cycle */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">서비스 사이클</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { step: '①', title: '진단', desc: 'URL 분석, AI 노출 현황, 경쟁사 비교', icon: '🔍' },
              { step: '②', title: '전략', desc: '키워드 전략, 90일 로드맵, Schema 설계', icon: '📋' },
              { step: '③', title: '실행', desc: 'Schema 구현, 콘텐츠 제작, 기술 최적화', icon: '⚡' },
              { step: '④', title: '측정', desc: 'AI 답변 점유율(SoV) 추적, 리포트', icon: '📊' },
              { step: '⑤', title: '개선', desc: '데이터 기반 조정, 비교 실험', icon: '🔧' },
              { step: '⑥', title: '재측정', desc: '개선 효과 확인 → 다시 ④로 (무한 반복)', icon: '🔄' },
            ].map(({ step, title, desc, icon }) => (
              <Card key={step} className="border-0 shadow-sm">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{icon}</span>
                    <Badge variant="secondary" className="text-blue-600">{step}</Badge>
                    <span className="font-bold">{title}</span>
                  </div>
                  <p className="text-sm text-gray-500">{desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-center text-sm text-blue-500 font-semibold mt-6">④ 측정 → ⑤ 개선 → ⑥ 재측정 — 무한 반복으로 지속 상승</p>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-4">패키지 안내</h2>
          <p className="text-center text-gray-500 mb-10">AI가 당신을 추천하게 만드는 서비스</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: '무료 진단', price: '0원', period: '1회', features: ['키워드 3개 분석', '종합 점수 리포트', 'AI 노출 현황 확인', '개선 권고사항'], cta: '무료 진단 시작', href: '/diagnose' },
              { name: 'Basic', price: '월 50만원', period: '3개월~', features: ['키워드 10개', '월 1회 측정', '월간 리포트', 'Schema 기본 구현', '콘텐츠 가이드'] },
              { name: 'Pro', price: '월 150만원', period: '6개월~', features: ['키워드 30개', '격주 측정', '콘텐츠 월 4건', '경쟁사 분석', 'Schema 고급', '카테고리 독점 옵션(+50만)'], popular: true },
              { name: 'Enterprise', price: '월 300만원', period: '12개월~', features: ['키워드 100개+', '주간 측정', '콘텐츠 월 12건+', '실시간 대시보드', '카테고리 독점 포함', '전담 매니저', '위기 대응'] },
            ].map((pkg) => (
              <Card key={pkg.name} className={`relative ${pkg.popular ? 'border-blue-400 shadow-lg' : ''}`}>
                {pkg.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2"><Badge className="bg-blue-500">인기</Badge></div>}
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-1">{pkg.name}</h3>
                  <p className="text-xs text-gray-400 mb-1">{pkg.period}</p>
                  <p className="text-2xl font-bold text-blue-600 mb-4">{pkg.price}</p>
                  <ul className="space-y-2 mb-4">
                    {pkg.features.map(f => <li key={f} className="text-sm text-gray-600 flex gap-2"><span className="text-blue-400">→</span>{f}</li>)}
                  </ul>
                  {pkg.href && (
                    <Link href={pkg.href} className="block text-center bg-blue-500 text-white py-3 rounded-full font-semibold hover:bg-blue-600 transition text-sm">
                      {pkg.cta}
                    </Link>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Category Exclusive */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <Card className="bg-gradient-to-r from-blue-500 to-purple-600 border-0">
            <CardContent className="p-8 text-white text-center">
              <Badge className="bg-white/20 text-white mb-4">독점 모델</Badge>
              <h2 className="text-2xl font-bold mb-4">카테고리 독점</h2>
              <p className="text-blue-100 leading-relaxed mb-4">
                &ldquo;광주 정형외과 AEO/GEO&rdquo;는 귀사만의 독점입니다.<br />
                같은 카테고리의 경쟁사는 동시에 수임하지 않습니다.
              </p>
              <p className="text-sm text-blue-200">Pro+독점: 월 200만원 / Enterprise: 독점 기본 포함</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">AI가 당신의 회사를 알고 있을까요?</h2>
          <p className="text-gray-500 mb-8">무료 진단으로 지금 바로 확인해보세요.</p>
          <div className="flex flex-col gap-3">
            <Link href="/diagnose" className="bg-blue-500 text-white py-4 rounded-full font-semibold hover:bg-blue-600 transition text-lg shadow-lg shadow-blue-200">무료 진단 시작 →</Link>
            <a href="https://open.kakao.com/o/gjLDUN4h" target="_blank" className="bg-yellow-400 text-gray-900 py-4 rounded-full font-semibold hover:bg-yellow-300 transition">💬 카카오톡 상담</a>
            <a href="tel:010-9883-7268" className="border border-gray-200 py-4 rounded-full font-semibold text-gray-700 hover:bg-gray-50 transition">📞 010-9883-7268</a>
          </div>
          <p className="text-sm text-gray-400 mt-6">한동노무법인 | 대표 공인노무사 박실로</p>
        </div>
      </section>
    </div>
  );
}
