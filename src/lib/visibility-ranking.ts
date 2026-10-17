export type MeasurementStatus = "verified" | "collecting" | "queued";

export type ConfidenceLevel = "높음" | "보통" | "낮음" | "미공개";

export interface VisibilityScoreBreakdown {
  directAi: number;
  searchDiscovery: number;
  answerQuality: number;
  technicalFoundation: number;
  entityAuthority: number;
  evidenceQuality: number;
}

export interface VisibilityEvidence {
  label: string;
  url: string;
  measuredAt: string;
  questionSetVersion: string;
}

export interface VisibilitySubject {
  id: string;
  rank: number;
  name: string;
  organization: string;
  officialUrl: string;
  score: number;
  grade: "S" | "A" | "B" | "C" | "D" | "F";
  confidence: ConfidenceLevel;
  directAiRate: number;
  ownedDomainRate: number;
  scoreBreakdown: VisibilityScoreBreakdown;
  sampleSize: { completed: number; planned: number };
  enginesMeasured: number;
  evidence: VisibilityEvidence[];
  eligibility: "eligible" | "hold";
  verifiedAt: string;
  reviewedBy: string;
  tiePolicy: "direct-ai" | "shared-rank";
  note?: string;
}

export interface VisibilityBenchmark {
  id: string;
  name: string;
  organization: string;
  officialUrl: string;
  score: number;
  directAiRate: number;
  ownedDomainRate: number;
  measuredAt: string;
  note: string;
}

export interface RegionVisibility {
  slug: string;
  name: string;
  shortName: string;
  status: MeasurementStatus;
  candidateCount: number;
  verifiedCount: number;
  topTen: VisibilitySubject[];
  benchmark?: VisibilityBenchmark;
}

export const MEASUREMENT_VERSION = "v0.1 공개 준비판";
export const MEASUREMENT_DATE = "2026-07-20";

const parkSilloBenchmark: VisibilityBenchmark = {
  id: "park-sillo",
  name: "박실로 공인노무사",
  organization: "한동노무법인",
  officialUrl: "https://silronomu.com",
  score: 72,
  directAiRate: 68.1,
  ownedDomainRate: 78.7,
  measuredAt: "2026-07-10",
  note: "전국 동일 표본 비교 전 내부 기준선이며 지역 순위에는 반영하지 않습니다.",
};

const regionBase: Array<Pick<RegionVisibility, "slug" | "name" | "shortName">> = [
  { slug: "seoul", name: "서울특별시", shortName: "서울" },
  { slug: "busan", name: "부산광역시", shortName: "부산" },
  { slug: "daegu", name: "대구광역시", shortName: "대구" },
  { slug: "incheon", name: "인천광역시", shortName: "인천" },
  { slug: "gwangju", name: "광주광역시", shortName: "광주" },
  { slug: "daejeon", name: "대전광역시", shortName: "대전" },
  { slug: "ulsan", name: "울산광역시", shortName: "울산" },
  { slug: "sejong", name: "세종특별자치시", shortName: "세종" },
  { slug: "gyeonggi", name: "경기도", shortName: "경기" },
  { slug: "gangwon", name: "강원특별자치도", shortName: "강원" },
  { slug: "chungbuk", name: "충청북도", shortName: "충북" },
  { slug: "chungnam", name: "충청남도", shortName: "충남" },
  { slug: "jeonbuk", name: "전북특별자치도", shortName: "전북" },
  { slug: "jeonnam", name: "전라남도", shortName: "전남" },
  { slug: "gyeongbuk", name: "경상북도", shortName: "경북" },
  { slug: "gyeongnam", name: "경상남도", shortName: "경남" },
  { slug: "jeju", name: "제주특별자치도", shortName: "제주" },
];

export const regionVisibility: RegionVisibility[] = regionBase.map((region) => ({
  ...region,
  status: region.slug === "gwangju" ? "collecting" : "queued",
  candidateCount: region.slug === "gwangju" ? 1 : 0,
  verifiedCount: 0,
  topTen: [],
  benchmark: region.slug === "gwangju" ? parkSilloBenchmark : undefined,
}));

export const scoringCategories = [
  { label: "직접 AI 인용 가시성", score: 35, detail: "6개 AI 엔진의 이름·소속·공식 URL 인용" },
  { label: "검색 발견성·색인", score: 15, detail: "Google·Naver·Bing의 지역·업무 검색 발견성" },
  { label: "콘텐츠 답변성", score: 15, detail: "질문형 답변, 절차·기간·비용·준비자료·FAQ" },
  { label: "구조화 데이터·기술 기반", score: 10, detail: "Schema, canonical, sitemap, 모바일·성능" },
  { label: "엔티티 신뢰·권위", score: 15, detail: "공식 프로필 일관성, 기관·언론·외부 인용" },
  { label: "측정 품질·증거성", score: 10, detail: "반복 측정, 원문 근거, 오류와 미측정 분리" },
];

export function getStatusLabel(status: MeasurementStatus) {
  if (status === "verified") return "검증 완료";
  if (status === "collecting") return "표본 수집 중";
  return "측정 대기";
}

export function isSafePublicUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export function getPublishedRankings(region: RegionVisibility) {
  if (region.status !== "verified") return [];

  const eligible = region.topTen
    .filter((subject) => {
      const breakdownTotal = Object.values(subject.scoreBreakdown).reduce((sum, score) => sum + score, 0);
      return (
        subject.eligibility === "eligible" &&
        subject.rank >= 1 &&
        subject.rank <= 10 &&
        subject.score >= 0 &&
        subject.score <= 100 &&
        breakdownTotal === subject.score &&
        subject.sampleSize.completed >= 90 &&
        subject.sampleSize.completed <= subject.sampleSize.planned &&
        subject.enginesMeasured >= 4 &&
        subject.evidence.length > 0 &&
        subject.evidence.every((item) => isSafePublicUrl(item.url)) &&
        isSafePublicUrl(subject.officialUrl)
      );
    })
    .sort((a, b) => a.rank - b.rank || b.score - a.score)
    .slice(0, 10);

  if (region.verifiedCount < eligible.length) return [];
  return eligible;
}
