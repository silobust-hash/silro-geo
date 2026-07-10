import { ImageResponse } from 'next/og';

export const alt = 'SilroGEO — AI경영진단 · AEO/GEO 최적화';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #dbeafe 0%, #ffffff 50%, #ede9fe 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              background: '#3b82f6',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '36px',
              fontWeight: 700,
            }}
          >
            S
          </div>
          <span style={{ fontSize: '40px', fontWeight: 700, color: '#0f172a' }}>
            SilroGEO
          </span>
        </div>
        <div
          style={{
            fontSize: '72px',
            fontWeight: 800,
            color: '#0f172a',
            lineHeight: 1.15,
            marginBottom: '24px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <span>AI에게 일을 맡기고,</span>
          <span>AI에게 더 자주 추천받게.</span>
        </div>
        <div
          style={{
            fontSize: '28px',
            color: '#475569',
            display: 'flex',
            gap: '20px',
          }}
        >
          <span>AI경영진단 컨설팅</span>
          <span style={{ color: '#cbd5e1' }}>·</span>
          <span>AEO/GEO 최적화</span>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            left: '80px',
            fontSize: '24px',
            color: '#64748b',
          }}
        >
          한동노무법인 · 대표 공인노무사 박실로
        </div>
      </div>
    ),
    { ...size }
  );
}
