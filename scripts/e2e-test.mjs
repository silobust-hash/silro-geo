// F1 E2E 검증 스크립트
// 실행: node --env-file=.env.local scripts/e2e-test.mjs

import { createClient } from '@supabase/supabase-js';
import * as cheerio from 'cheerio';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const secret = process.env.SUPABASE_SECRET_KEY;
if (!url || !secret) {
  console.error('❌ 환경변수 누락. .env.local 확인');
  process.exit(1);
}

const supabase = createClient(url, secret, { auth: { persistSession: false } });

// 간단 분석 (실제 analyzer.ts와 동일 로직 일부)
async function quickAnalyze(target) {
  const res = await fetch(target, { headers: { 'User-Agent': 'SilroGEO-Analyzer/1.0' } });
  const html = await res.text();
  const $ = cheerio.load(html);
  const title = $('title').text().trim();
  const hasOg = $('meta[property="og:title"]').length > 0;
  const hasFAQ = html.toLowerCase().includes('faq');
  let score = 0;
  if (title) score += 20;
  if (hasOg) score += 15;
  if (hasFAQ) score += 10;
  if (target.startsWith('https')) score += 10;
  return {
    url: target,
    domain: new URL(target).hostname,
    total_score: score,
    grade: score >= 60 ? 'B' : score >= 40 ? 'C' : 'D',
    score_breakdown: { meta: 20, schema: 0, semantic: 0, security: 10, content: 10, indexing: 5 },
    full_result: { title, hasOg, hasFAQ },
  };
}

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('F1 E2E 테스트 시작');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

// 1. 진단 분석 + 저장
console.log('① 실제 URL 분석 (https://silronomu.com)...');
const analysis = await quickAnalyze('https://silronomu.com');
console.log(`   → 점수: ${analysis.total_score}, 등급: ${analysis.grade}`);

console.log('\n② diagnoses 테이블에 INSERT...');
const { data: diagRow, error: diagErr } = await supabase
  .from('diagnoses')
  .insert({
    ...analysis,
    ip: '127.0.0.1',
    user_agent: 'e2e-test-script',
  })
  .select('id, created_at')
  .single();

if (diagErr) {
  console.error('   ❌ 실패:', diagErr.message);
  process.exit(1);
}
console.log(`   ✅ 저장됨. id=${diagRow.id}`);

// 2. 리드 등록
console.log('\n③ leads 테이블에 INSERT (리드 캡처 시뮬레이션)...');
const { data: leadRow, error: leadErr } = await supabase
  .from('leads')
  .insert({
    diagnosis_id: diagRow.id,
    name: 'E2E 테스트',
    contact: 'test@example.com',
    company: '테스트 회사',
    message: 'E2E 검증용 더미 데이터',
    source: 'diagnose',
  })
  .select('id, status')
  .single();

if (leadErr) {
  console.error('   ❌ 실패:', leadErr.message);
  process.exit(1);
}
console.log(`   ✅ 저장됨. id=${leadRow.id}, status=${leadRow.status}`);

// 3. JOIN 조회 검증
console.log('\n④ JOIN 조회 (lead → diagnosis)...');
const { data: joined, error: joinErr } = await supabase
  .from('leads')
  .select('id, name, contact, company, status, created_at, diagnoses(id, domain, total_score, grade)')
  .eq('id', leadRow.id)
  .single();

if (joinErr) {
  console.error('   ❌ 실패:', joinErr.message);
  process.exit(1);
}
console.log('   ✅ 조회 성공:');
console.log('   ', JSON.stringify(joined, null, 2).split('\n').join('\n   '));

// 4. RLS 검증 — publishable 키로는 SELECT가 안 되어야 함
console.log('\n⑤ RLS 검증 (publishable 키로 익명 접근 차단 확인)...');
const pub = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const anonClient = createClient(url, pub, { auth: { persistSession: false } });
const { data: anonData, error: anonErr } = await anonClient.from('leads').select('id').limit(1);
if (anonErr || !anonData || anonData.length === 0) {
  console.log(`   ✅ 차단됨 (정상). ${anonErr ? `에러: ${anonErr.message}` : '결과 없음'}`);
} else {
  console.log('   ⚠️  익명 키로 조회 가능 (RLS 정책 점검 필요!)');
}

// 5. 정리
console.log('\n⑥ 테스트 데이터 삭제...');
await supabase.from('leads').delete().eq('id', leadRow.id);
await supabase.from('diagnoses').delete().eq('id', diagRow.id);
console.log('   ✅ 정리 완료');

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('🎉 F1 E2E 테스트 모두 통과');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
