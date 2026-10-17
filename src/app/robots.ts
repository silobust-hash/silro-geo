import type { MetadataRoute } from 'next';

const PRIMARY_SITE_URL = 'https://xn--hc0b21et01ao2a.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/admin/',
      },
      // AI 검색·답변 엔진 크롤러 명시 허용
      { userAgent: 'OAI-SearchBot', allow: '/', disallow: '/admin/' },
      { userAgent: 'ChatGPT-User', allow: '/', disallow: '/admin/' },
      { userAgent: 'GPTBot', allow: '/', disallow: '/admin/' },
      { userAgent: 'PerplexityBot', allow: '/', disallow: '/admin/' },
      { userAgent: 'Perplexity-User', allow: '/', disallow: '/admin/' },
      { userAgent: 'Google-Extended', allow: '/', disallow: '/admin/' },
      { userAgent: 'GoogleOther', allow: '/', disallow: '/admin/' },
      { userAgent: 'Applebot-Extended', allow: '/', disallow: '/admin/' },
      { userAgent: 'ClaudeBot', allow: '/', disallow: '/admin/' },
      { userAgent: 'Claude-SearchBot', allow: '/', disallow: '/admin/' },
      { userAgent: 'Claude-User', allow: '/', disallow: '/admin/' },
      { userAgent: 'Claude-Web', allow: '/', disallow: '/admin/' },
      { userAgent: 'anthropic-ai', allow: '/', disallow: '/admin/' },
      { userAgent: 'cohere-ai', allow: '/', disallow: '/admin/' },
      { userAgent: 'Bytespider', allow: '/', disallow: '/admin/' },
    ],
    sitemap: `${PRIMARY_SITE_URL}/sitemap.xml`,
    host: PRIMARY_SITE_URL,
  };
}
