import type { Grade } from '@/lib/types';

const gradeColors: Record<Grade, { bg: string; text: string; ring: string }> = {
  A: { bg: 'bg-green-50', text: 'text-green-600', ring: 'stroke-green-500' },
  B: { bg: 'bg-blue-50', text: 'text-blue-600', ring: 'stroke-blue-500' },
  C: { bg: 'bg-yellow-50', text: 'text-yellow-600', ring: 'stroke-yellow-500' },
  D: { bg: 'bg-orange-50', text: 'text-orange-600', ring: 'stroke-orange-500' },
  F: { bg: 'bg-red-50', text: 'text-red-600', ring: 'stroke-red-500' },
};

export function ScoreCard({ score, grade }: { score: number; grade: Grade }) {
  const colors = gradeColors[grade];
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className={`flex flex-col items-center justify-center p-8 rounded-2xl ${colors.bg}`}>
      <div className="relative w-36 h-36">
        <svg className="w-36 h-36 -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" fill="none" stroke="#e5e7eb" strokeWidth="8" />
          <circle
            cx="60" cy="60" r="54" fill="none"
            className={colors.ring} strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-4xl font-bold ${colors.text}`}>{score}</span>
          <span className="text-sm text-gray-500">/ 100</span>
        </div>
      </div>
      <div className={`mt-4 px-4 py-1.5 rounded-full text-sm font-bold ${colors.bg} ${colors.text} border`}>
        등급 {grade}
      </div>
    </div>
  );
}
