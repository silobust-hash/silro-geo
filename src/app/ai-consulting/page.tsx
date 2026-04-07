import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function AIConsultingPage() {
  return (
    <div className="bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-b from-purple-50 to-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4 text-purple-600 bg-purple-50">AI Management Consulting</Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">AI경영진단 컨설팅</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            회사 전체 업무를 해부하여 AI로 맡길 수 있는 일과 사람이 해야 할 일을 구분하고,<br />개선방향과 구축전략까지 제안합니다.
          </p>
        </div>
      </section>

      {/* 10 Areas */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">10개 진단 영역</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {[
              { icon: '🏢', name: '조직구조' }, { icon: '👥', name: '인사·노무' },
              { icon: '💰', name: '재무·회계' }, { icon: '📣', name: '마케팅·영업' },
              { icon: '📁', name: '총무·문서' }, { icon: '⚙️', name: '생산·운영' },
              { icon: '🦺', name: '안전·보건' }, { icon: '💾', name: '데이터관리' },
              { icon: '🔍', name: 'AEO·GEO' }, { icon: '🤖', name: 'AI판정' },
            ].map(({ icon, name }) => (
              <Card key={name} className="border-0 shadow-sm hover:shadow-md transition text-center">
                <CardContent className="p-5">
                  <span className="text-3xl block mb-2">{icon}</span>
                  <span className="text-sm font-semibold text-gray-700">{name}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AI 판정 4등급 */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-4">AI 판정 4등급</h2>
          <p className="text-center text-gray-500 mb-10">모든 업무를 4단계로 분류하여 AI 활용 전략을 수립합니다</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🤖', grade: '전적 AI 가능', desc: 'AI가 대부분 수행 가능, 사람은 최종 검토만', color: 'bg-green-50 border-green-200', text: 'text-green-700' },
              { icon: '🤝', grade: '부분 AI 가능', desc: 'AI가 초안·분석 수행, 사람이 판단·보완', color: 'bg-blue-50 border-blue-200', text: 'text-blue-700' },
              { icon: '💡', grade: 'AI 보조 가능', desc: 'AI는 보조 수단, 핵심 업무는 사람 수행', color: 'bg-yellow-50 border-yellow-200', text: 'text-yellow-700' },
              { icon: '👤', grade: '사람 중심', desc: '대면·현장·법적 판단 등 사람 수행 필수', color: 'bg-gray-50 border-gray-200', text: 'text-gray-700' },
            ].map(({ icon, grade, desc, color, text }) => (
              <Card key={grade} className={`${color} border`}>
                <CardContent className="p-6 text-center">
                  <span className="text-4xl block mb-3">{icon}</span>
                  <h3 className={`font-bold mb-2 ${text}`}>{grade}</h3>
                  <p className="text-sm text-gray-600">{desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">진행 절차</h2>
          <div className="space-y-4">
            {[
              { step: 1, title: '사전 인터뷰 및 자료수집', period: '1주', desc: '조직도, 업무분장, 주요 문서·시스템 현황 파악' },
              { step: 2, title: '부서·직무·업무 구조 분석', period: '1주', desc: '부서별 주요 업무 흐름, 직무별 세부업무 분해' },
              { step: 3, title: '업무별 AI 가능성 판정', period: '1주', desc: '전적/부분/보조/사람 4단계 판정 및 분석표 작성' },
              { step: 4, title: 'AEO·GEO 진단', period: '3일', desc: 'AI 검색 노출, 콘텐츠 친화성, 경쟁사 비교 분석' },
              { step: 5, title: '종합 진단보고서 작성', period: '1주', desc: '전체 진단, 병목·낭비 도출, 핵심 개선과제 보고' },
              { step: 6, title: '개선안 및 구축 제안', period: '-', desc: '우선순위 로드맵, 단계별 실행계획, 견적 제안' },
            ].map(({ step, title, period, desc }) => (
              <div key={step} className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-purple-500 text-white rounded-xl flex items-center justify-center font-bold flex-shrink-0">{step}</div>
                <div className="flex-1 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold">{title}</h3>
                    {period !== '-' && <Badge variant="outline" className="text-purple-600">{period}</Badge>}
                  </div>
                  <p className="text-sm text-gray-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">패키지 안내</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: '진단형', period: '2~4주', price: '100~200만원', desc: '업무구조 분석 + AI 활용 가능성 진단', features: ['사전 인터뷰 및 자료수집', '부서·직무·업무 구조 분석', '업무별 AI 가능성 판정', 'AEO·GEO 진단', '종합 진단보고서 작성·제출'] },
              { name: '설계형', period: '4~8주', price: '300~700만원', desc: '진단 + 업무 표준화 + AI 도입 설계', features: ['진단형 컨설팅 전 과정 포함', '업무 표준화 구조 설계', 'AI 도입 구조 설계', '우선순위 로드맵 수립', '실행계획서 제출'], popular: true },
              { name: '구축형', period: '1~3개월', price: '500~1,500만원', desc: '설계 + 자동화 구축 + 교육 + 안정화', features: ['설계형 컨설팅 전 과정 포함', '문서 자동화 템플릿 구축', 'AI 워크플로우 설계·구현', '직원 교육 (실무 사용법)', '초기 운영 지원 및 안정화'] },
            ].map((pkg) => (
              <Card key={pkg.name} className={`relative ${pkg.popular ? 'border-purple-400 shadow-lg scale-105' : ''}`}>
                {pkg.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2"><Badge className="bg-purple-500">추천</Badge></div>}
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-1">{pkg.name}</h3>
                  <p className="text-sm text-gray-500 mb-1">{pkg.period}</p>
                  <p className="text-2xl font-bold text-purple-600 mb-2">{pkg.price}</p>
                  <p className="text-sm text-gray-500 mb-4">{pkg.desc}</p>
                  <ul className="space-y-2">
                    {pkg.features.map(f => <li key={f} className="text-sm text-gray-600 flex gap-2"><span className="text-purple-400">→</span>{f}</li>)}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-center text-sm text-gray-400 mt-8">* 월 유지관리: 50~200만원/월 (AI 시스템 점검, 업무 개선, 노출 관리, 리스크 점검)</p>
        </div>
      </section>

      {/* Before/After */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">기대효과 (Before → After)</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-sm overflow-hidden">
              <thead><tr className="bg-purple-50">
                <th className="p-4 text-left text-sm font-semibold">항목</th>
                <th className="p-4 text-left text-sm font-semibold">Before</th>
                <th className="p-4 text-left text-sm font-semibold">After</th>
                <th className="p-4 text-left text-sm font-semibold">효과</th>
              </tr></thead>
              <tbody>
                {[
                  ['반복 문서작성', '평균 3시간/건', '30분 이내', '약 80% 절감'],
                  ['급여자료 정리', '2일 소요', '3시간 이내', '약 80% 절감'],
                  ['대표 보고자료', '수기 작성', '자동 요약', '약 70% 단축'],
                  ['리스크 점검', '월 1회 수동', '상시 자동', '3배 이상 향상'],
                  ['제안서·견적서', '반나절 소요', '1시간 이내', '약 75% 절감'],
                ].map(([item, before, after, effect]) => (
                  <tr key={item} className="border-b border-gray-50">
                    <td className="p-4 font-medium text-sm">{item}</td>
                    <td className="p-4 text-sm text-red-500">{before}</td>
                    <td className="p-4 text-sm text-green-600 font-semibold">{after}</td>
                    <td className="p-4"><Badge variant="outline" className="text-purple-600">{effect}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Target */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">이런 회사에 적합합니다</h2>
          <div className="space-y-4">
            {[
              '대표 중심으로 운영되어 체계가 부족한 곳',
              '인력은 늘었는데 업무 효율이 오르지 않는 곳',
              '반복업무와 수기업무가 여전히 많은 곳',
              'AI 도입은 하고 싶지만 어디부터 해야 할지 모르는 곳',
              '노무·안전·운영 리스크를 함께 줄이고 싶은 곳',
            ].map((text) => (
              <div key={text} className="flex gap-3 items-center p-4 bg-purple-50 rounded-xl">
                <span className="text-purple-500 text-lg">✓</span>
                <span className="text-gray-700">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-xl mx-auto text-center">
          <Card className="border-0 shadow-xl">
            <CardContent className="p-10">
              <h2 className="text-2xl font-bold mb-2">무료 사전 상담</h2>
              <p className="text-gray-500 mb-6">회사 현황을 간단히 듣고, 적합한 패키지를 안내드립니다.</p>
              <div className="flex flex-col gap-3">
                <a href="https://open.kakao.com/o/gjLDUN4h" target="_blank" className="bg-yellow-400 text-gray-900 py-4 rounded-full font-semibold hover:bg-yellow-300 transition">💬 카카오톡 상담</a>
                <a href="tel:010-9883-7268" className="bg-purple-500 text-white py-4 rounded-full font-semibold hover:bg-purple-600 transition">📞 010-9883-7268</a>
              </div>
              <p className="text-sm text-gray-400 mt-4">한동노무법인 | 대표 공인노무사 박실로</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
