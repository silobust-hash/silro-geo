'use client';

import { useState } from 'react';
import { submitLeadAction } from '@/app/diagnose/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type ConsultationFormProps = {
  source?: string;
  title?: string;
  description?: string;
  submitLabel?: string;
};

export function ConsultationForm({
  source = 'homepage',
  title = '상담글을 남겨주세요',
  description = '남겨주신 내용을 바탕으로 현재 상태와 개선 방향을 정리해 보내드립니다.',
  submitLabel = '상담글 보내기',
}: ConsultationFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [message, setMessage] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('성함, 이메일, 상담글을 입력해주세요.');
      return;
    }

    if (!agreed) {
      setError('개인정보 수집·이용에 동의해주세요.');
      return;
    }

    setSubmitting(true);
    setError(null);

    const fullMessage = [
      websiteUrl.trim() ? `홈페이지 주소: ${websiteUrl.trim()}` : '',
      message.trim(),
    ].filter(Boolean).join('\n\n');

    const result = await submitLeadAction({
      name,
      contact: email,
      company,
      message: fullMessage,
      source,
    });

    setSubmitting(false);

    if (result.success) {
      setDone(true);
      setName('');
      setEmail('');
      setCompany('');
      setWebsiteUrl('');
      setMessage('');
      setAgreed(false);
    } else {
      setError(result.error || '전송 중 오류가 발생했습니다.');
    }
  };

  if (done) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center">
        <p className="mb-2 text-lg font-semibold text-green-700">상담글이 접수되었습니다.</p>
        <p className="text-sm text-green-700">내용을 살펴본 뒤 간단 진단 의견과 개선 방향을 보내드리겠습니다.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-500">{description}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="lead-name">성함</Label>
          <Input
            id="lead-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="성함을 입력해주세요"
            disabled={submitting}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lead-email">답변 받을 이메일</Label>
          <Input
            id="lead-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="email@example.com"
            disabled={submitting}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="lead-company">회사명</Label>
          <Input
            id="lead-company"
            value={company}
            onChange={(event) => setCompany(event.target.value)}
            placeholder="회사명 또는 브랜드명"
            disabled={submitting}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lead-url">홈페이지 주소</Label>
          <Input
            id="lead-url"
            value={websiteUrl}
            onChange={(event) => setWebsiteUrl(event.target.value)}
            placeholder="https://example.com"
            disabled={submitting}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="lead-message">상담글</Label>
        <Textarea
          id="lead-message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="현재 고민, 확인받고 싶은 검색어, 홈페이지나 블로그 상황을 편하게 적어주세요."
          rows={6}
          disabled={submitting}
        />
      </div>

      <label className="flex items-start gap-2 text-left text-xs leading-relaxed text-gray-500">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(event) => setAgreed(event.target.checked)}
          className="mt-1"
          disabled={submitting}
        />
        <span>
          상담 회신을 위한 개인정보 수집·이용에 동의합니다. 자세한 내용은{' '}
          <a href="/privacy" target="_blank" className="text-blue-600 underline underline-offset-2">
            개인정보처리방침
          </a>
          에서 확인하실 수 있습니다.
        </span>
      </label>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button type="submit" className="h-12 w-full text-base" disabled={submitting}>
        {submitting ? '전송 중...' : submitLabel}
      </Button>
    </form>
  );
}
