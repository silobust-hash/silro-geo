import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ConsultationForm } from '@/components/consultation-form';

const SITE_URL = 'https://xn--hc0b21et01ao2a.com';
const SITE_TITLE = 'AEO·GEO 전문 광주전남노무사 박실로 | 코딩하는 노무사';
const SITE_DESCRIPTION =
  '광주·전남 노무사 박실로(한동노무법인)가 직접 코딩하여 운영하는 AEO·GEO·AI경영진단 전문 사이트. 광주광역시·전라남도·전라북도 기업의 AI 검색 노출과 업무 자동화를 진단·설계·구축합니다.';

export const metadata: Metadata = {
  title: { absolute: SITE_TITLE },
  description: SITE_DESCRIPTION,
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: 'SilroGEO',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: 'AEO·GEO 전문 광주전남노무사 박실로 (SilroGEO)',
      },
    ],
  },
};

export default function HomePage() {
  return (
    <div className="bg-gray-50">
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-blue-50 to-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4 text-blue-600 bg-blue-50">한동노무법인 박실로 노무사</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            AI에게 일을 맡기고,<br />AI에게 더 자주 추천받게.
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            2026년 4월 1일부터 직접 부딪히며 배우고,<br />
            고치고, 다시 실험한 박실로 노무사의 경험을 전해드립니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#consultation" className="bg-blue-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-600 transition shadow-lg shadow-blue-200">
              상담글 남기기
            </a>
            <Link href="/diagnose" className="border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-full text-lg font-semibold hover:border-blue-300 hover:text-blue-600 transition">
              무료 AI 진단 시작
            </Link>
            <a href="https://silronomu.com" target="_blank" rel="noopener noreferrer" className="border-2 border-gray-200 bg-white text-gray-700 px-8 py-4 rounded-full text-lg font-semibold hover:border-blue-300 hover:text-blue-600 transition">
              박실로 노무사 소개
            </a>
          </div>
        </div>
      </section>

      {/* Consultation */}
      <section className="bg-white px-4 py-20" id="consultation">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <Badge variant="secondary" className="mb-4 text-blue-600 bg-blue-50">박실로 노무사의 실제 경험</Badge>
            <h2 className="mb-5 text-3xl font-bold leading-tight text-gray-900">
              처음부터 잘한 것은 아닙니다.
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-gray-600">
              <p>
                2026년 4월 1일부터 직접 부딪히며 배우고, 고치고, 다시 실험했습니다.
              </p>
              <p>
                박실로 노무사는 인공지능을 공부하고, 실무에 적용하고, 답변형 검색과 생성형 검색 최적화에 진심인 사람입니다.
              </p>
              <p>
                그 경험을 바탕으로 귀사의 홈페이지와 콘텐츠가 인공지능 검색에서 어떻게 보일 수 있는지 함께 살펴드리겠습니다.
              </p>
            </div>
            <div className="mt-8 grid gap-3 text-sm text-gray-600 sm:grid-cols-3">
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <p className="font-semibold text-gray-900">상담글 검토</p>
                <p className="mt-1">남겨주신 고민을 먼저 읽습니다.</p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <p className="font-semibold text-gray-900">간단 진단</p>
                <p className="mt-1">홈페이지와 콘텐츠 상태를 봅니다.</p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <p className="font-semibold text-gray-900">개선 방향</p>
                <p className="mt-1">실행 가능한 방향을 보내드립니다.</p>
              </div>
            </div>
            <a
              href="https://silronomu.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex rounded-full border border-blue-200 px-5 py-3 text-sm font-semibold text-blue-600 transition hover:border-blue-300 hover:bg-blue-50"
            >
              박실로 노무사 개인 홈페이지 보기
            </a>
          </div>
          <Card className="border-0 shadow-xl">
            <CardContent className="p-6 sm:p-8">
              <ConsultationForm
                source="homepage-consultation"
                title="상담글을 남기면 진단해서 보내드립니다"
                description="홈페이지, 블로그, 검색 노출, AI 추천 가능성을 함께 살펴보고 간단 진단 의견과 개선 방향을 이메일로 보내드립니다."
              />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Two Services */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-sm font-semibold text-blue-500 mb-2 tracking-widest uppercase">Services</p>
          <h2 className="text-3xl font-bold text-center mb-12">2가지 핵심 서비스</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Link href="/ai-consulting">
              <Card className="h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-0 shadow-md cursor-pointer">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center text-2xl mb-5">🏢</div>
                  <h3 className="text-xl font-bold mb-3">AI경영진단 컨설팅</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">회사 전체 업무를 해부하여 AI로 맡길 수 있는 일과 사람이 해야 할 일을 구분하고, 자동화 구축까지 지원합니다.</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">업무 분석</Badge>
                    <Badge variant="outline">AI 판정</Badge>
                    <Badge variant="outline">자동화 구축</Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/aeo-geo">
              <Card className="h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-0 shadow-md cursor-pointer">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-2xl mb-5">🔍</div>
                  <h3 className="text-xl font-bold mb-3">AEO/GEO 최적화</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">ChatGPT, Gemini, Perplexity 등 AI 검색에서 귀사가 더 자주 추천되도록 콘텐츠와 구조를 최적화합니다.</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">AI 검색 진단</Badge>
                    <Badge variant="outline">Schema 구현</Badge>
                    <Badge variant="outline">콘텐츠 최적화</Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Industry Personas */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-sm font-semibold text-gray-500 mb-2 tracking-widest uppercase">For Your Industry</p>
          <h2 className="text-3xl font-bold text-center mb-4">산업별 가이드</h2>
          <p className="text-center text-gray-500 mb-12">귀사 업종에 맞는 AI 도입 사례와 노무 포인트를 확인해보세요.</p>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/for/hospital">
              <Card className="h-full border-0 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer">
                <CardContent className="p-6">
                  <div className="text-3xl mb-3">🏥</div>
                  <h3 className="font-bold text-lg mb-2">병원·의원</h3>
                  <p className="text-sm text-gray-500 mb-3">의원·종합·요양·한의원</p>
                  <p className="text-sm text-gray-600 leading-relaxed">교대근무·당직수당·요양보호사 처우개선비까지 AI로 정리.</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/for/construction">
              <Card className="h-full border-0 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer">
                <CardContent className="p-6">
                  <div className="text-3xl mb-3">🏗️</div>
                  <h3 className="font-bold text-lg mb-2">건설현장</h3>
                  <p className="text-sm text-gray-500 mb-3">종합건설·전문건설</p>
                  <p className="text-sm text-gray-600 leading-relaxed">중처법 대응, 일용직 임금, 위험성평가를 통합 자동화.</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/for/sme">
              <Card className="h-full border-0 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer">
                <CardContent className="p-6">
                  <div className="text-3xl mb-3">🏢</div>
                  <h3 className="font-bold text-lg mb-2">중소기업·스타트업</h3>
                  <p className="text-sm text-gray-500 mb-3">일반 중소기업</p>
                  <p className="text-sm text-gray-600 leading-relaxed">대표 1인 운영을 벗어나 체계와 AI 자동화를 동시에.</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Free Diagnosis CTA */}
      <section className="py-20 px-4 bg-blue-500">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">AI가 당신의 회사를 알고 있을까요?</h2>
          <p className="text-blue-100 text-lg mb-8">URL을 입력하면 30초 만에 AI 검색 노출 현황을 분석해드립니다.</p>
          <Link href="/diagnose" className="inline-block bg-white text-blue-600 px-10 py-4 rounded-full text-lg font-bold hover:bg-blue-50 transition shadow-xl">
            무료 진단 시작 →
          </Link>
        </div>
      </section>

      {/* AI경영진단 Packages */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-sm font-semibold text-purple-500 mb-2 tracking-widest uppercase">AI Consulting</p>
          <h2 className="text-3xl font-bold text-center mb-4">AI경영진단 컨설팅</h2>
          <p className="text-center text-gray-500 mb-12">회사 규모와 니즈에 맞는 패키지를 선택하세요</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: '진단형', period: '2~4주', price: '100~200만원', features: ['사전 인터뷰', '업무 구조 분석', 'AI 활용 가능성 판정', 'AEO·GEO 진단', '종합 보고서'] },
              { name: '설계형', period: '4~8주', price: '300~700만원', features: ['진단형 전 과정 포함', '업무 표준화 설계', 'AI 도입 구조 설계', '우선순위 로드맵', '실행계획서'], popular: true },
              { name: '구축형', period: '1~3개월', price: '500~1,500만원', features: ['설계형 전 과정 포함', '문서 자동화 구축', 'AI 워크플로우 구현', '직원 교육', '초기 운영 안정화'] },
            ].map((pkg) => (
              <Card key={pkg.name} className={`relative ${pkg.popular ? 'border-purple-400 shadow-lg scale-105' : 'border-gray-200'}`}>
                {pkg.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2"><Badge className="bg-purple-500">추천</Badge></div>}
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-1">{pkg.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">{pkg.period}</p>
                  <p className="text-2xl font-bold text-purple-600 mb-5">{pkg.price}</p>
                  <ul className="space-y-2">
                    {pkg.features.map(f => <li key={f} className="text-sm text-gray-600 flex gap-2"><span className="text-purple-400">→</span>{f}</li>)}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AEO/GEO Packages */}
      <section className="py-20 px-4 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-sm font-semibold text-blue-500 mb-2 tracking-widest uppercase">AEO/GEO</p>
          <h2 className="text-3xl font-bold text-center mb-4">AEO/GEO 최적화</h2>
          <p className="text-center text-gray-500 mb-12">AI가 당신을 추천하게 만드는 서비스</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: '무료 진단', price: '0원', features: ['키워드 3개', '1회 분석', '점수 리포트', 'AI 노출 현황'] },
              { name: 'Basic', price: '월 50만원', features: ['키워드 10개', '월 1회 측정', '월간 리포트', '콘텐츠 가이드', 'Schema 기본'] },
              { name: 'Pro', price: '월 150만원', features: ['키워드 30개', '격주 측정', '콘텐츠 월 4건', '경쟁사 분석', 'Schema 고급'], popular: true },
              { name: 'Enterprise', price: '월 300만원', features: ['키워드 100개+', '주간 측정', '콘텐츠 월 12건+', '실시간 대시보드', '카테고리 독점'] },
            ].map((pkg) => (
              <Card key={pkg.name} className={`relative ${pkg.popular ? 'border-blue-400 shadow-lg' : 'border-gray-200'}`}>
                {pkg.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2"><Badge className="bg-blue-500">인기</Badge></div>}
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-1">{pkg.name}</h3>
                  <p className="text-2xl font-bold text-blue-600 mb-4">{pkg.price}</p>
                  <ul className="space-y-2">
                    {pkg.features.map(f => <li key={f} className="text-sm text-gray-600 flex gap-2"><span className="text-blue-400">→</span>{f}</li>)}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2">기대 효과</h2>
          <p className="text-center text-xs text-gray-400 mb-10">* 일부 도입 사례 기준이며, 회사 상황에 따라 달라질 수 있습니다.</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-xl shadow-sm overflow-hidden">
              <thead><tr className="bg-blue-50">
                <th className="p-4 text-left text-sm font-semibold">항목</th>
                <th className="p-4 text-left text-sm font-semibold">Before</th>
                <th className="p-4 text-left text-sm font-semibold">After</th>
                <th className="p-4 text-left text-sm font-semibold">효과</th>
              </tr></thead>
              <tbody>
                {[
                  ['반복 문서작성', '평균 3시간/건', '30분 이내', '약 80% 절감'],
                  ['급여자료 정리', '2일 소요', '3시간 이내', '약 80% 절감'],
                  ['AI 검색 노출', '거의 없음', '주요 AI 플랫폼 노출', '신규 노출 사례'],
                  ['보고자료 작성', '수기 작성', '자동 요약', '약 70% 단축'],
                  ['리스크 점검', '월 1회 수동', '상시 자동 점검', '점검 빈도 향상'],
                ].map(([item, before, after, effect]) => (
                  <tr key={item} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="p-4 font-medium text-sm">{item}</td>
                    <td className="p-4 text-sm text-red-500">{before}</td>
                    <td className="p-4 text-sm text-green-600 font-semibold">{after}</td>
                    <td className="p-4"><Badge variant="outline" className="text-blue-600">{effect}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-4 bg-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">진행 프로세스</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { step: '01', title: '사전 인터뷰', desc: '조직도, 업무분장, 시스템 현황 파악', icon: '📋' },
              { step: '02', title: '구조 분석', desc: '부서별·직무별 업무 분해 및 흐름 분석', icon: '🔍' },
              { step: '03', title: 'AI 판정', desc: '업무별 AI 활용 가능성 4단계 판정', icon: '🤖' },
              { step: '04', title: 'AEO/GEO 진단', desc: 'AI 검색 노출, 구조화 데이터, 경쟁사 비교', icon: '📊' },
              { step: '05', title: '보고서 작성', desc: '종합 진단, 개선과제, 우선순위 매트릭스', icon: '📑' },
              { step: '06', title: '구축·실행', desc: '자동화 구현, 교육, 운영 안정화', icon: '🚀' },
            ].map(({ step, title, desc, icon }) => (
              <Card key={step} className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{icon}</span>
                    <Badge variant="secondary" className="text-blue-600">{step}</Badge>
                  </div>
                  <h3 className="font-bold mb-1">{title}</h3>
                  <p className="text-sm text-gray-500">{desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 px-4" id="contact">
        <div className="max-w-xl mx-auto">
          <Card className="border-0 shadow-xl">
            <CardContent className="p-10 text-center">
              <h2 className="text-2xl font-bold mb-2">상담·자문·강의 문의</h2>
              <p className="text-gray-500 mb-8">편하게 연락 주세요.</p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <span>📞</span><span className="font-medium">062-521-5678 / 010-9883-7268</span>
                </div>
                <div className="flex items-center justify-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <span>📧</span><span className="font-medium">5215678@naver.com</span>
                </div>
                <div className="flex items-center justify-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <span>📍</span><span className="font-medium">광주·전남 중심 전국 대응</span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <a href="https://open.kakao.com/o/gjLDUN4h" target="_blank" className="bg-yellow-400 text-gray-900 py-4 rounded-full font-semibold hover:bg-yellow-300 transition">💬 카카오톡 상담</a>
                <a href="mailto:5215678@naver.com" className="border border-gray-200 py-4 rounded-full font-semibold text-gray-700 hover:bg-gray-50 transition">📧 이메일 보내기</a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 border-t text-center text-sm text-gray-400">
        <p className="mb-1">한동노무법인 | 대표 공인노무사 박실로</p>
        <p className="mb-3">
          <a href="https://silronomu.com" className="hover:text-blue-500">silronomu.com</a>{' · '}
          <a href="https://www.threads.net/@silrobag" className="hover:text-blue-500">@silrobag</a>
        </p>
        <p className="mb-3">
          <Link href="/privacy" className="hover:text-blue-500">개인정보처리방침</Link>{' · '}
          <Link href="/terms" className="hover:text-blue-500">이용약관</Link>
        </p>
        <p>© 2026 SilroGEO. All rights reserved.</p>
      </footer>
    </div>
  );
}
