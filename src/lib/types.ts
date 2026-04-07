export interface MetaAnalysis {
  title: string | null;
  titleLength: number;
  description: string | null;
  descriptionLength: number;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImage: string | null;
  canonical: string | null;
  hasViewport: boolean;
  hasCharset: boolean;
  score: number;
  maxScore: number;
  issues: string[];
  passes: string[];
}

export interface SchemaItem {
  type: string;
  properties: string[];
}

export interface SchemaAnalysis {
  schemas: SchemaItem[];
  totalCount: number;
  hasOrganization: boolean;
  hasLocalBusiness: boolean;
  hasFAQPage: boolean;
  hasArticle: boolean;
  hasBreadcrumb: boolean;
  hasPerson: boolean;
  score: number;
  maxScore: number;
  issues: string[];
  passes: string[];
}

export interface SemanticAnalysis {
  h1Count: number;
  h1Text: string[];
  h2Count: number;
  h3Count: number;
  hasNav: boolean;
  hasMain: boolean;
  hasFooter: boolean;
  hasArticleTag: boolean;
  imgCount: number;
  imgWithAlt: number;
  score: number;
  maxScore: number;
  issues: string[];
  passes: string[];
}

export interface SecurityAnalysis {
  isHttps: boolean;
  score: number;
  maxScore: number;
  issues: string[];
  passes: string[];
}

export interface ContentAnalysis {
  wordCount: number;
  hasStructuredContent: boolean;
  hasFAQSection: boolean;
  hasTables: boolean;
  hasLists: boolean;
  internalLinks: number;
  externalLinks: number;
  score: number;
  maxScore: number;
  issues: string[];
  passes: string[];
}

export interface IndexingAnalysis {
  estimatedPages: number;
  score: number;
  maxScore: number;
  issues: string[];
  passes: string[];
}

export interface ScoreBreakdown {
  meta: number;
  schema: number;
  semantic: number;
  security: number;
  content: number;
  indexing: number;
}

export type Grade = 'A' | 'B' | 'C' | 'D' | 'F';

export interface DiagnosisResult {
  url: string;
  domain: string;
  analyzedAt: string;
  totalScore: number;
  grade: Grade;
  scoreBreakdown: ScoreBreakdown;
  meta: MetaAnalysis;
  schema: SchemaAnalysis;
  semantic: SemanticAnalysis;
  security: SecurityAnalysis;
  content: ContentAnalysis;
  indexing: IndexingAnalysis;
  topIssues: string[];
  topRecommendations: string[];
}
