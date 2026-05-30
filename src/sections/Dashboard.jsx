import { useState } from 'react';
import { color, font } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import SectionHeader from '../components/SectionHeader.jsx';
import n9 from '../data/n9.json';
import { useIsMobile } from '../lib/useIsMobile.js';

const { dashboard } = n9;

const rev = (vis, delay = 0) => ({
  opacity: vis ? 1 : 0,
  transform: vis ? 'none' : 'translateY(24px)',
  transition: `opacity 0.7s ease-out ${delay}s, transform 0.7s ease-out ${delay}s`,
});

function DashImg({ src, label }) {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <div style={{
      width: '100%',
      aspectRatio: '16 / 9',
      background: '#F2F2F0',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <span style={{ fontFamily: font.familyKo, fontSize: '11px', color: '#AAAAAA' }}>
        {label}
      </span>
    </div>
  ) : (
    <img
      src={src}
      alt=""
      onError={() => setFailed(true)}
      style={{
        width: '100%',
        height: 'auto',
        display: 'block',
        borderRadius: '12px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
      }}
    />
  );
}

export default function Dashboard() {
  const isMobile = useIsMobile();
  const [headerRef, headerVis] = useReveal({ threshold: 0.1 });
  const [bodyRef,   bodyVis]   = useReveal({ threshold: 0.05 });

  return (
    <section
      id="dashboard"
      style={{ background: color.bg, fontFamily: font.familyKo }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(56px,6vw,88px) clamp(32px,7vw,120px)' }}>

        <div ref={headerRef} style={rev(headerVis)}>
          <SectionHeader label={dashboard.label} headline={dashboard.headline} />
        </div>

        <div ref={bodyRef} style={rev(bodyVis)}>

          {/* 이미지 2개 + 라벨 */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: '20px',
            marginBottom: 'clamp(32px,4vw,48px)',
          }}>
            {[
              { src: '/dashboard-neondb.png', caption: '01  NeonDB · 손님 응답 자동 저장' },
              { src: '/dashboard-page.png',   caption: '02  OWNER DASHBOARD · 날짜별 손님 데이터' },
            ].map(({ src, caption }) => (
              <div key={src} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <DashImg src={src} label={src.replace('/', '')} />
                <p style={{
                  margin: 0,
                  fontFamily: font.familyNum,
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  color: color.primary,
                  textAlign: 'center',
                }}>
                  {caption}
                </p>
              </div>
            ))}
          </div>

          {/* 버튼 + 캡션 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <a
              href="https://numer9-ai-service.vercel.app/stats"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: color.primary,
                color: '#FFFFFF',
                fontFamily: font.familyKo,
                fontSize: '16px',
                fontWeight: 700,
                padding: '16px 40px',
                borderRadius: '10px',
                textDecoration: 'none',
                transition: 'opacity 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
            >
              대시보드 페이지 바로가기
            </a>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'center' }}>
              <p style={{
                margin: 0,
                fontFamily: font.familyKo,
                fontSize: '13px',
                fontWeight: 500,
                lineHeight: 1.75,
                color: color.ink,
                wordBreak: 'keep-all',
              }}>
                대시보드 페이지는 사장님과 팀만 아는 비밀번호를 통해 접속할 수 있습니다.
                현재 페이지는 비밀번호 이후의 화면이며, 실제로 날짜별 손님 데이터를 확인할 수 있습니다.
              </p>
              <p style={{
                margin: 0,
                fontFamily: font.familyKo,
                fontSize: '13px',
                fontWeight: 500,
                lineHeight: 1.75,
                color: color.ink,
                wordBreak: 'keep-all',
              }}>
                백엔드 데이터 서버가 켜지는 데 시간이 소요될 수 있습니다.
              </p>
              <p style={{
                margin: 0,
                fontFamily: font.familyKo,
                fontSize: '13px',
                fontWeight: 700,
                lineHeight: 1.75,
                color: color.primary,
                wordBreak: 'keep-all',
              }}>
                심사 기간 한정으로 공개되며, 임시 접속 비밀번호는 6424입니다.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
