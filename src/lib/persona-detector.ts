import type { PersonaKey } from './personas';

interface DetectorInput {
  url: string;
  domain: string;
  title: string | null;
  h1Texts: string[];
  bodySnippet: string; // 본문 앞부분 텍스트 (소문자 권장)
}

interface PersonaSignal {
  keywords: string[];
  weights?: Record<string, number>; // 가중치 (기본 1)
}

const SIGNALS: Record<PersonaKey, PersonaSignal> = {
  hospital: {
    keywords: [
      '병원', '의원', '의료', '클리닉', '진료', '한의원', '한방', '치과',
      '요양병원', '요양원', '내과', '외과', '정형외과', '산부인과', '소아과',
      '피부과', '신경과', '정신과', '재활', '간호', '의사', '원장', '약국',
      'hospital', 'clinic', 'medical', 'clinic', 'dental', 'medic',
    ],
    weights: {
      병원: 3, 의원: 3, 한의원: 3, 요양병원: 4, 클리닉: 2, 진료: 2,
      hospital: 3, clinic: 3,
    },
  },
  construction: {
    keywords: [
      '건설', '시공', '건축', '토목', '종합건설', '전문건설', '플랜트',
      '인테리어', '리모델링', '철거', '도장', '방수', '미장', '조경',
      '하도급', '현장', '안전관리', '중대재해', '산업안전',
      'construction', 'builder', 'contractor', 'engineering',
    ],
    weights: {
      건설: 3, 시공: 2, 건축: 2, 종합건설: 4, 전문건설: 4, 토목: 3,
      construction: 3, contractor: 2,
    },
  },
  sme: {
    // SME는 fallback이라 키워드 매칭이 약함
    keywords: [
      '회사', '주식회사', '유한회사', '기업', '스타트업', '컴퍼니',
      '솔루션', '플랫폼', '서비스', 'inc', 'corp', 'ltd', 'company',
    ],
    weights: {},
  },
};

/**
 * 입력으로부터 가장 가능성 높은 페르소나를 추론합니다.
 * 점수가 임계값 미만이거나 동률이면 null 반환.
 */
export function detectPersona(input: DetectorInput): { persona: PersonaKey; score: number } | null {
  const haystack = [
    input.url,
    input.domain,
    input.title || '',
    ...input.h1Texts,
    input.bodySnippet,
  ]
    .join(' ')
    .toLowerCase();

  const scores: Record<PersonaKey, number> = { hospital: 0, construction: 0, sme: 0 };

  for (const [key, signal] of Object.entries(SIGNALS) as [PersonaKey, PersonaSignal][]) {
    for (const kw of signal.keywords) {
      const lower = kw.toLowerCase();
      if (haystack.includes(lower)) {
        const weight = signal.weights?.[kw] ?? 1;
        scores[key] += weight;
      }
    }
  }

  // 도메인 자체 가중치 (domain에 직접 들어 있으면 +5)
  for (const [key, signal] of Object.entries(SIGNALS) as [PersonaKey, PersonaSignal][]) {
    for (const kw of signal.keywords.slice(0, 8)) {
      if (input.domain.toLowerCase().includes(kw.toLowerCase())) {
        scores[key] += 5;
        break;
      }
    }
  }

  // 가장 높은 점수
  const sorted = (Object.entries(scores) as [PersonaKey, number][]).sort((a, b) => b[1] - a[1]);
  const [topKey, topScore] = sorted[0];
  const [, secondScore] = sorted[1];

  // 임계값 미만이면 추천 없음
  if (topScore < 3) return null;
  // 1·2위 점수 차가 너무 작으면(애매하면) 추천 없음 — 단 명확한 도메인 매칭은 예외
  if (topScore - secondScore < 2 && topScore < 8) return null;

  return { persona: topKey, score: topScore };
}
