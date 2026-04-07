'use server';

import { analyzeUrl } from '@/lib/analyzer';
import type { DiagnosisResult } from '@/lib/types';

export async function diagnoseAction(url: string): Promise<{ success: boolean; data?: DiagnosisResult; error?: string }> {
  try {
    if (!url || url.trim().length === 0) {
      return { success: false, error: 'URL을 입력해주세요.' };
    }

    let cleanUrl = url.trim();
    if (!cleanUrl.startsWith('http')) {
      cleanUrl = 'https://' + cleanUrl;
    }

    try {
      new URL(cleanUrl);
    } catch {
      return { success: false, error: '유효하지 않은 URL 형식입니다.' };
    }

    const result = await analyzeUrl(cleanUrl);
    return { success: true, data: result };
  } catch (e) {
    const message = e instanceof Error ? e.message : '알 수 없는 오류';
    if (message.includes('abort')) {
      return { success: false, error: '사이트 접속 시간이 초과되었습니다. URL을 확인해주세요.' };
    }
    return { success: false, error: `분석 중 오류가 발생했습니다: ${message}` };
  }
}
