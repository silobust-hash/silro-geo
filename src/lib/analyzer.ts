import * as cheerio from 'cheerio';
import type {
  DiagnosisResult, MetaAnalysis, SchemaAnalysis, SchemaItem,
  SemanticAnalysis, SecurityAnalysis, ContentAnalysis, IndexingAnalysis,
  ScoreBreakdown, Grade
} from './types';

async function fetchWithTimeout(url: string, timeout = 10000): Promise<string> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'SilroGEO-Analyzer/1.0' },
      redirect: 'follow',
    });
    clearTimeout(id);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } catch (e) {
    clearTimeout(id);
    throw e;
  }
}

function analyzeMeta(html: string, url: string): MetaAnalysis {
  const $ = cheerio.load(html);
  const title = $('title').text().trim() || null;
  const description = $('meta[name="description"]').attr('content')?.trim() || null;
  const ogTitle = $('meta[property="og:title"]').attr('content')?.trim() || null;
  const ogDescription = $('meta[property="og:description"]').attr('content')?.trim() || null;
  const ogImage = $('meta[property="og:image"]').attr('content')?.trim() || null;
  const canonical = $('link[rel="canonical"]').attr('href')?.trim() || null;
  const hasViewport = $('meta[name="viewport"]').length > 0;
  const hasCharset = $('meta[charset]').length > 0 || html.includes('charset=');

  const issues: string[] = [];
  const passes: string[] = [];
  let score = 0;

  if (title) { score += 3; passes.push(`title 태그 있음: "${title.slice(0, 40)}..."`); }
  else issues.push('title 태그가 없습니다');

  if (title && title.length <= 60) { score += 1; passes.push('title 길이 적절 (60자 이내)'); }
  else if (title) issues.push(`title이 ${title.length}자로 너무 깁니다 (60자 권장)`);

  if (description) { score += 3; passes.push('meta description 있음'); }
  else issues.push('meta description이 없습니다');

  if (description && description.length <= 160) { score += 1; passes.push('description 길이 적절'); }
  else if (description) issues.push(`description이 ${description.length}자로 너무 깁니다`);

  if (ogTitle) { score += 2; passes.push('OG title 있음'); }
  else issues.push('Open Graph title이 없습니다');

  if (ogDescription) { score += 2; passes.push('OG description 있음'); }
  else issues.push('Open Graph description이 없습니다');

  if (ogImage) { score += 2; passes.push('OG image 있음'); }
  else issues.push('Open Graph image가 없습니다');

  if (canonical) { score += 2; passes.push('canonical URL 설정됨'); }
  else issues.push('canonical URL이 없습니다');

  if (hasViewport) { score += 2; passes.push('viewport 메타태그 있음'); }
  else issues.push('viewport 메타태그가 없습니다');

  if (hasCharset) { score += 2; passes.push('charset 설정됨'); }
  else issues.push('charset이 설정되지 않았습니다');

  return {
    title, titleLength: title?.length || 0,
    description, descriptionLength: description?.length || 0,
    ogTitle, ogDescription, ogImage, canonical,
    hasViewport, hasCharset,
    score: Math.min(score, 20), maxScore: 20, issues, passes,
  };
}

function analyzeSchema(html: string): SchemaAnalysis {
  const $ = cheerio.load(html);
  const schemas: SchemaItem[] = [];
  const issues: string[] = [];
  const passes: string[] = [];

  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const json = JSON.parse($(el).html() || '{}');
      const items = json['@graph'] || [json];
      for (const item of items) {
        if (item['@type']) {
          const type = Array.isArray(item['@type']) ? item['@type'].join(', ') : item['@type'];
          schemas.push({ type, properties: Object.keys(item) });
        }
      }
    } catch {}
  });

  let score = 0;
  const types = schemas.map(s => s.type);
  const has = (t: string) => types.some(x => x.includes(t));

  const hasOrganization = has('Organization') || has('LegalService') || has('LocalBusiness');
  const hasLocalBusiness = has('LocalBusiness') || has('LegalService') || has('MedicalBusiness');
  const hasFAQPage = has('FAQPage');
  const hasArticle = has('Article');
  const hasBreadcrumb = has('BreadcrumbList');
  const hasPerson = has('Person');

  if (schemas.length > 0) { score += 5; passes.push(`Schema.org 마크업 ${schemas.length}개 발견`); }
  else { issues.push('Schema.org 구조화 데이터가 없습니다'); }

  if (hasOrganization) { score += 4; passes.push('Organization/LegalService 스키마 있음'); }
  else issues.push('Organization 스키마가 없습니다');

  if (hasLocalBusiness) { score += 3; passes.push('LocalBusiness 스키마 있음'); }
  else issues.push('LocalBusiness 스키마 추가를 권장합니다');

  if (hasFAQPage) { score += 5; passes.push('FAQPage 스키마 있음 (AEO 핵심)'); }
  else issues.push('FAQPage 스키마가 없습니다 (AEO에 매우 중요)');

  if (hasPerson) { score += 4; passes.push('Person 스키마 있음 (E-E-A-T)'); }
  else issues.push('Person 스키마가 없습니다');

  if (hasBreadcrumb) { score += 2; passes.push('BreadcrumbList 있음'); }
  else issues.push('BreadcrumbList 스키마 추가를 권장합니다');

  if (hasArticle) { score += 2; passes.push('Article 스키마 있음'); }

  return {
    schemas, totalCount: schemas.length,
    hasOrganization, hasLocalBusiness, hasFAQPage, hasArticle, hasBreadcrumb, hasPerson,
    score: Math.min(score, 25), maxScore: 25, issues, passes,
  };
}

function analyzeSemantic(html: string): SemanticAnalysis {
  const $ = cheerio.load(html);
  const issues: string[] = [];
  const passes: string[] = [];

  const h1s = $('h1');
  const h1Text = h1s.map((_, el) => $(el).text().trim()).get();
  const h2Count = $('h2').length;
  const h3Count = $('h3').length;
  const hasNav = $('nav').length > 0;
  const hasMain = $('main').length > 0;
  const hasFooter = $('footer').length > 0;
  const hasArticleTag = $('article').length > 0;
  const imgs = $('img');
  const imgCount = imgs.length;
  const imgWithAlt = imgs.filter((_, el) => !!$(el).attr('alt')?.trim()).length;

  let score = 0;

  if (h1s.length === 1) { score += 4; passes.push(`H1 태그 1개 (적절): "${h1Text[0]?.slice(0, 30)}..."`); }
  else if (h1s.length === 0) issues.push('H1 태그가 없습니다');
  else { score += 1; issues.push(`H1 태그가 ${h1s.length}개입니다 (1개 권장)`); }

  if (h2Count >= 3) { score += 4; passes.push(`H2 소제목 ${h2Count}개 (구조적)`); }
  else if (h2Count > 0) { score += 2; issues.push(`H2가 ${h2Count}개입니다 (3개 이상 권장)`); }
  else issues.push('H2 소제목이 없습니다');

  if (hasNav) { score += 2; passes.push('nav 시맨틱 태그 사용'); }
  if (hasMain) { score += 2; passes.push('main 시맨틱 태그 사용'); }
  if (hasFooter) { score += 2; passes.push('footer 시맨틱 태그 사용'); }
  if (!hasNav && !hasMain && !hasFooter) issues.push('시맨틱 HTML 태그(nav, main, footer)가 없습니다');

  if (imgCount > 0 && imgWithAlt === imgCount) { score += 4; passes.push('모든 이미지에 alt 태그 있음'); }
  else if (imgCount > 0 && imgWithAlt > 0) { score += 2; issues.push(`이미지 ${imgCount}개 중 ${imgCount - imgWithAlt}개에 alt 태그 누락`); }
  else if (imgCount > 0) issues.push('이미지에 alt 태그가 없습니다');

  if (h3Count > 0) { score += 2; passes.push(`H3 태그 ${h3Count}개 사용`); }

  return {
    h1Count: h1s.length, h1Text, h2Count, h3Count,
    hasNav, hasMain, hasFooter, hasArticleTag,
    imgCount, imgWithAlt,
    score: Math.min(score, 20), maxScore: 20, issues, passes,
  };
}

function analyzeSecurity(url: string): SecurityAnalysis {
  const isHttps = url.startsWith('https://');
  return {
    isHttps,
    score: isHttps ? 10 : 0,
    maxScore: 10,
    issues: isHttps ? [] : ['HTTPS가 적용되지 않았습니다'],
    passes: isHttps ? ['HTTPS 적용됨'] : [],
  };
}

function analyzeContent(html: string): ContentAnalysis {
  const $ = cheerio.load(html);
  const bodyText = $('body').text().replace(/\s+/g, ' ').trim();
  const wordCount = bodyText.length;
  const hasTables = $('table').length > 0;
  const hasLists = $('ul, ol').length > 0;
  const hasFAQ = html.toLowerCase().includes('faq') || html.includes('자주 묻는') || html.includes('질문');
  const hasStructured = hasTables || hasLists;
  const internalLinks = $('a[href^="/"], a[href^="./"]').length;
  const externalLinks = $('a[href^="http"]').length;

  const issues: string[] = [];
  const passes: string[] = [];
  let score = 0;

  if (wordCount > 1000) { score += 3; passes.push(`콘텐츠 분량 충분 (${wordCount}자)`); }
  else if (wordCount > 300) { score += 1; issues.push('콘텐츠가 다소 짧습니다 (1,000자 이상 권장)'); }
  else issues.push('콘텐츠가 매우 짧습니다');

  if (hasStructured) { score += 3; passes.push('구조화된 콘텐츠(표/목록) 포함'); }
  else issues.push('표나 목록 등 구조화된 콘텐츠가 없습니다');

  if (hasFAQ) { score += 4; passes.push('FAQ 섹션 감지됨 (AEO 핵심)'); }
  else issues.push('FAQ 섹션이 없습니다 (AEO에 매우 중요)');

  if (hasTables) { score += 2; passes.push('테이블 사용됨'); }
  if (hasLists) { score += 1; passes.push('목록(리스트) 사용됨'); }
  if (externalLinks > 0) { score += 2; passes.push(`외부 링크 ${externalLinks}개`); }

  return {
    wordCount, hasStructuredContent: hasStructured, hasFAQSection: hasFAQ,
    hasTables, hasLists, internalLinks, externalLinks,
    score: Math.min(score, 15), maxScore: 15, issues, passes,
  };
}

function analyzeIndexing(domain: string): IndexingAnalysis {
  // 실제 구현에서는 Google API를 사용하지만, MVP에서는 간단히 처리
  return {
    estimatedPages: -1, // 알 수 없음
    score: 5, // 중간값
    maxScore: 10,
    issues: ['구글 색인 수를 확인하려면 Google Search Console을 연동하세요'],
    passes: [],
  };
}

function calculateGrade(score: number): Grade {
  if (score >= 80) return 'A';
  if (score >= 60) return 'B';
  if (score >= 40) return 'C';
  if (score >= 20) return 'D';
  return 'F';
}

export async function analyzeUrl(inputUrl: string): Promise<DiagnosisResult> {
  let url = inputUrl.trim();
  if (!url.startsWith('http')) url = 'https://' + url;

  const domain = new URL(url).hostname;
  const html = await fetchWithTimeout(url);

  const meta = analyzeMeta(html, url);
  const schema = analyzeSchema(html);
  const semantic = analyzeSemantic(html);
  const security = analyzeSecurity(url);
  const content = analyzeContent(html);
  const indexing = analyzeIndexing(domain);

  const scoreBreakdown: ScoreBreakdown = {
    meta: meta.score,
    schema: schema.score,
    semantic: semantic.score,
    security: security.score,
    content: content.score,
    indexing: indexing.score,
  };

  const totalScore = Object.values(scoreBreakdown).reduce((a, b) => a + b, 0);
  const grade = calculateGrade(totalScore);

  const allIssues = [
    ...meta.issues, ...schema.issues, ...semantic.issues,
    ...security.issues, ...content.issues, ...indexing.issues,
  ];

  const recommendations: string[] = [];
  if (!schema.hasFAQPage) recommendations.push('FAQPage 스키마를 추가하세요 — AI 검색 노출의 핵심입니다');
  if (!meta.ogTitle) recommendations.push('Open Graph 태그를 추가하세요 — SNS 공유와 AI 인식에 중요합니다');
  if (!schema.hasOrganization) recommendations.push('Organization 스키마를 추가하여 사업체 정보를 구조화하세요');
  if (!security.isHttps) recommendations.push('HTTPS를 적용하세요 — 보안과 검색 순위에 필수입니다');
  if (!content.hasFAQSection) recommendations.push('FAQ 섹션을 추가하세요 — AI가 질문-답변 형태를 선호합니다');
  if (semantic.h1Count !== 1) recommendations.push('H1 태그를 정확히 1개만 사용하세요');
  if (meta.titleLength > 60) recommendations.push('title 태그를 60자 이내로 줄이세요');

  return {
    url, domain, analyzedAt: new Date().toISOString(),
    totalScore, grade, scoreBreakdown,
    meta, schema, semantic, security, content, indexing,
    topIssues: allIssues.slice(0, 10),
    topRecommendations: recommendations.slice(0, 7),
  };
}
