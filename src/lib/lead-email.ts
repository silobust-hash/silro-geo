import { randomUUID } from 'node:crypto';

type LeadEmailInput = {
  name: string;
  contact: string;
  company?: string;
  message?: string;
  source?: string;
  diagnosisId?: string;
};

const DEFAULT_TO_EMAIL = 'silobust@gmail.com';
const DEFAULT_FROM_EMAIL = 'SilroGEO <onboarding@resend.dev>';

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function formatValue(value?: string) {
  return value?.trim() || '-';
}

function buildLeadText(input: LeadEmailInput) {
  return [
    'SilroGEO 상담글이 접수되었습니다.',
    '',
    `성함: ${formatValue(input.name)}`,
    `연락처/이메일: ${formatValue(input.contact)}`,
    `회사명: ${formatValue(input.company)}`,
    `접수 경로: ${formatValue(input.source)}`,
    `진단 ID: ${formatValue(input.diagnosisId)}`,
    '',
    '상담글',
    formatValue(input.message),
  ].join('\n');
}

function buildLeadHtml(input: LeadEmailInput) {
  const rows: Array<[string, string | undefined]> = [
    ['성함', input.name],
    ['연락처/이메일', input.contact],
    ['회사명', input.company],
    ['접수 경로', input.source],
    ['진단 ID', input.diagnosisId],
  ];

  return `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;line-height:1.6;color:#111827;">
      <h2 style="margin:0 0 16px;">SilroGEO 상담글 접수</h2>
      <p style="margin:0 0 20px;color:#4b5563;">홈페이지 상담 폼을 통해 새 상담글이 접수되었습니다.</p>
      <table style="border-collapse:collapse;width:100%;max-width:640px;">
        <tbody>
          ${rows
            .map(([label, value]) => `
              <tr>
                <th style="width:140px;text-align:left;background:#f9fafb;border:1px solid #e5e7eb;padding:10px;">${escapeHtml(label)}</th>
                <td style="border:1px solid #e5e7eb;padding:10px;">${escapeHtml(formatValue(value))}</td>
              </tr>
            `)
            .join('')}
        </tbody>
      </table>
      <h3 style="margin:24px 0 8px;">상담글</h3>
      <div style="white-space:pre-wrap;background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;padding:16px;max-width:640px;">${escapeHtml(formatValue(input.message))}</div>
    </div>
  `;
}

export async function sendLeadEmail(input: LeadEmailInput) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn('[lead-email] RESEND_API_KEY is not configured.');
    return;
  }

  const to = process.env.LEAD_TO_EMAIL || DEFAULT_TO_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL || DEFAULT_FROM_EMAIL;
  const subjectCompany = input.company?.trim() || input.name.trim();

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Idempotency-Key': randomUUID(),
    },
    body: JSON.stringify({
      from,
      to,
      subject: `[SilroGEO 상담] ${subjectCompany}`,
      html: buildLeadHtml(input),
      text: buildLeadText(input),
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Resend send failed: ${response.status} ${body}`);
  }
}
