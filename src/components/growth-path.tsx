'use client';

const STORAGE_KEY = 'silro-geo-next-action-v1';

export const growthPath = {
  id: 'silro-geo-learning-to-visibility',
  name: 'SilroGEO 학습·구현·진단 경로',
  read_url: 'https://ai-school.silronomu.com/curriculum',
  prepare_url: 'https://edu.silronomu.com/curriculum',
  request_url: 'https://silropanda.com/products/aeo-geo-lecture-request',
  follow_url: 'https://xn--hc0b21et01ao2a.com/aeo-geo',
} as const;

const steps = [
  { number: '01', title: 'AI 업무 기초 정리', description: '프롬프트와 업무 설계를 먼저 정리해, 도입할 일을 선별합니다.', href: growthPath.read_url, label: 'AI업무학교 보기' },
  { number: '02', title: '작은 기능 직접 구현', description: 'Claude Code 실무 과정에서 실행·검증·배포 흐름을 익힙니다.', href: growthPath.prepare_url, label: '실무 과정 보기' },
  { number: '03', title: 'AEO·GEO 강의 의뢰', description: '교육이 필요한 조직은 기존 AEO·GEO 강의 의뢰 상세에서 범위를 확인합니다.', href: growthPath.request_url, label: '강의 의뢰 상세 보기' },
  { number: '04', title: 'AEO·GEO 안내 계속 보기', description: '진단 뒤에는 개선 주제와 서비스 사이클을 다시 확인하며 다음 작업을 정합니다.', href: growthPath.follow_url, label: 'AEO·GEO 안내 보기' },
] as const;

function isExternal(href: string) {
  return href.startsWith('https://');
}

export default function GrowthPath({ compact = false }: { compact?: boolean }) {
  function remember(label: string) {
    try {
      window.localStorage.setItem(STORAGE_KEY, label);
    } catch {
      // 서버 전송이나 신규 추적 없이 동선만 안내한다.
    }
  }

  return (
    <section aria-labelledby="growth-path-title" className={`rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8 ${compact ? 'mt-6' : ''}`}>
      <div className="max-w-3xl">
        <p className="text-xs font-bold tracking-[0.16em] text-blue-600">NEXT ACTION PATH</p>
        <h2 id="growth-path-title" className="mt-2 text-2xl font-bold text-gray-900 md:text-3xl">학습한 AI를 조직 업무와 검색 노출까지 연결하세요</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-600 md:text-base">선택한 다음 행동은 로그인이나 서버 전송 없이 이 브라우저에만 선택적으로 기억됩니다.</p>
      </div>

      <ol className="mt-6 grid gap-3 md:grid-cols-4">
        {steps.map((step) => (
          <li key={step.number}>
            <a href={step.href} {...(isExternal(step.href) ? { target: '_blank', rel: 'noopener noreferrer' } : {})} onClick={() => remember(step.title)} className="group flex h-full min-h-44 flex-col rounded-xl border border-gray-200 bg-gray-50 p-4 transition hover:-translate-y-0.5 hover:border-blue-300 hover:bg-white hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
              <span className="text-xs font-bold text-blue-600">{step.number}</span>
              <h3 className="mt-3 text-sm font-bold leading-snug text-gray-900">{step.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-gray-600">{step.description}</p>
              <span className="mt-auto pt-4 text-xs font-bold text-blue-700">{step.label} <span aria-hidden>→</span></span>
            </a>
          </li>
        ))}
      </ol>

      <p className="mt-4 text-xs leading-relaxed text-gray-500">공개 URL의 AI 검색 노출을 별도로 확인하고 싶다면 <a href="https://xn--hc0b21et01ao2a.com/diagnose" className="font-bold text-blue-700 underline underline-offset-2">무료 AEO·GEO 진단</a>을 선택할 수 있습니다.</p>
    </section>
  );
}
