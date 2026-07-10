'use server';

import { headers } from 'next/headers';
import { analyzeUrl } from '@/lib/analyzer';
import { sendLeadEmail } from '@/lib/lead-email';
import { supabaseAdmin } from '@/lib/supabase';
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

    // 결과 저장 (실패해도 사용자에게는 결과 반환)
    try {
      const h = await headers();
      const ip =
        h.get('x-forwarded-for')?.split(',')[0]?.trim() ||
        h.get('x-real-ip') ||
        null;
      const userAgent = h.get('user-agent') || null;

      const { data: row, error } = await supabaseAdmin
        .from('diagnoses')
        .insert({
          url: result.url,
          domain: result.domain,
          total_score: result.totalScore,
          grade: result.grade,
          score_breakdown: result.scoreBreakdown,
          full_result: result,
          ip,
          user_agent: userAgent,
        })
        .select('id')
        .single();

      if (!error && row) {
        result.id = row.id;
      } else if (error) {
        console.error('[diagnose] insert failed:', error.message);
      }
    } catch (e) {
      console.error('[diagnose] save error:', e);
    }

    return { success: true, data: result };
  } catch (e) {
    const message = e instanceof Error ? e.message : '알 수 없는 오류';
    if (message.includes('abort')) {
      return { success: false, error: '사이트 접속 시간이 초과되었습니다. URL을 확인해주세요.' };
    }
    return { success: false, error: `분석 중 오류가 발생했습니다: ${message}` };
  }
}

export async function submitLeadAction(input: {
  diagnosisId?: string;
  name: string;
  contact: string;
  company?: string;
  message?: string;
  source?: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    if (!input.name?.trim() || !input.contact?.trim()) {
      return { success: false, error: '성함과 연락처를 입력해주세요.' };
    }

    const lead = {
      diagnosisId: input.diagnosisId || undefined,
      name: input.name.trim(),
      contact: input.contact.trim(),
      company: input.company?.trim() || undefined,
      message: input.message?.trim() || undefined,
      source: input.source?.trim() || 'diagnose',
    };

    const { error: saveError } = await supabaseAdmin.from('leads').insert({
      diagnosis_id: lead.diagnosisId || null,
      name: lead.name,
      contact: lead.contact,
      company: lead.company || null,
      message: lead.message || null,
      source: lead.source,
    });

    if (saveError) {
      console.error('[lead] insert failed:', saveError.message, saveError);
    }

    try {
      await sendLeadEmail(lead);
    } catch (error) {
      console.error('[lead] email failed:', error);
      return { success: false, error: '이메일 발송에 실패했습니다. 잠시 후 다시 시도해주세요.' };
    }

    return { success: true };
  } catch (e) {
    const message = e instanceof Error ? e.message : '알 수 없는 오류';
    return { success: false, error: message };
  }
}
