'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScoreCard } from '@/components/score-card';
import { ScoreBreakdown } from '@/components/score-breakdown';
import { diagnoseAction } from './actions';
import type { DiagnosisResult } from '@/lib/types';

export default function DiagnosePage() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    const res = await diagnoseAction(url);
    if (res.success && res.data) {
      setResult(res.data);
    } else {
      setError(res.error || '분석 중 오류가 발생했습니다.');
    }
    setLoading(false);
  };

  const categories = result ? [
    { name: '메타태그', icon: '🏷️', score: result.meta.score, maxScore: result.meta.maxScore, issueCount: result.meta.issues.length },
    { name: 'Schema.org', icon: '📐', score: result.schema.score, maxScore: result.schema.maxScore, issueCount: result.schema.issues.length },
    { name: '시맨틱 HTML', icon: '🧱', score: result.semantic.score, maxScore: result.semantic.maxScore, issueCount: result.semantic.issues.length },
    { name: '보안(HTTPS)', icon: '🔒', score: result.security.score, maxScore: result.security.maxScore, issueCount: result.security.issues.length },
    { name: '콘텐츠', icon: '📝', score: result.content.score, maxScore: result.content.maxScore, issueCount: result.content.issues.length },
    { name: '색인', icon: '📑', score: result.indexing.score, maxScore: result.indexing.maxScore, issueCount: result.indexing.issues.length },
  ] : [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4 text-blue-600 bg-blue-50">무료 AEO/GEO 진단</Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            AI가 당신의 회사를 알고 있을까요?
          </h1>
          <p className="text-gray-600 mb-8">URL을 입력하면 30초 만에 AI 검색 노출 현황을 분석합니다.</p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <input
              type="text"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 px-6 py-4 rounded-full border border-gray-200 text-lg focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !url.trim()}
              className="px-8 py-4 bg-blue-500 text-white rounded-full text-lg font-semibold hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-200"
            >
              {loading ? '분석 중...' : '진단 시작'}
            </button>
          </form>
        </div>
      </section>

      {/* Loading */}
      {loading && (
        <div className="py-20 text-center">
          <div className="inline-block w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mb-4" />
          <p className="text-gray-600 text-lg">사이트를 분석하고 있습니다...</p>
          <p className="text-gray-400 text-sm mt-2">메타태그, Schema, 시맨틱 구조, 보안, 콘텐츠를 확인 중</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="max-w-2xl mx-auto px-4 py-8">
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-6 text-center">
              <p className="text-red-600 font-semibold mb-2">분석 실패</p>
              <p className="text-red-500 text-sm">{error}</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
          {/* Score */}
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <ScoreCard score={result.totalScore} grade={result.grade} />
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">{result.domain}</h2>
              <p className="text-gray-500 text-sm mb-4">{result.analyzedAt}</p>
              <p className="text-gray-600 leading-relaxed">
                {result.totalScore >= 70 ? 'AI 검색 최적화 상태가 양호합니다. 세부 개선으로 더 높은 점수를 달성할 수 있습니다.' :
                 result.totalScore >= 40 ? 'AI 검색 최적화가 부분적으로 되어 있습니다. 핵심 개선 사항을 적용하면 큰 효과를 볼 수 있습니다.' :
                 'AI 검색 최적화가 많이 부족합니다. 기본적인 구조부터 개선이 필요합니다.'}
              </p>
            </div>
          </div>

          {/* Breakdown */}
          <div>
            <h3 className="text-xl font-bold mb-4">항목별 점수</h3>
            <ScoreBreakdown categories={categories} />
          </div>

          {/* Issues */}
          {result.topIssues.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4 text-red-600">개선 필요 사항</h3>
                <ul className="space-y-2">
                  {result.topIssues.map((issue, i) => (
                    <li key={i} className="flex gap-3 text-sm text-gray-700">
                      <span className="text-red-400 flex-shrink-0">✕</span>
                      {issue}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Recommendations */}
          {result.topRecommendations.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4 text-blue-600">개선 권고사항</h3>
                <ul className="space-y-2">
                  {result.topRecommendations.map((rec, i) => (
                    <li key={i} className="flex gap-3 text-sm text-gray-700">
                      <span className="text-blue-400 flex-shrink-0">→</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* CTA */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-bold mb-2">더 자세한 분석이 필요하신가요?</h3>
              <p className="text-gray-600 mb-6">AI 검색 노출을 본격적으로 개선하고 싶다면, 전문 컨설팅을 받아보세요.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="https://open.kakao.com/o/gjLDUN4h" target="_blank" className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-yellow-300 transition">
                  💬 카카오톡 상담
                </a>
                <a href="tel:010-9883-7268" className="bg-blue-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-600 transition">
                  📞 전화 상담
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
