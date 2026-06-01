import { useState } from 'react';
import { color, font } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import { useIsMobile } from '../lib/useIsMobile.js';
import SectionHeader from '../components/SectionHeader.jsx';

const rev = (vis) => ({
  opacity: vis ? 1 : 0,
  transform: vis ? 'none' : 'translateY(24px)',
  transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
});

export default function Retention() {
  const isMobile = useIsMobile();
  const [headerRef, headerVis] = useReveal({ threshold: 0.1 });
  const [bodyRef,   bodyVis]   = useReveal({ threshold: 0.03 });
  const [lightbox,  setLightbox] = useState(false);

  return (
    <section
      id="retention"
      style={{ background: color.bg, fontFamily: font.familyKo }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(56px,6vw,88px) clamp(32px,7vw,120px)' }}>

        <div ref={headerRef} style={rev(headerVis)}>
          <SectionHeader label="RETENTION PROVEN" headline="첫 손님이 다시 예약했습니다." />
        </div>

        <div
          ref={bodyRef}
          style={{
            ...rev(bodyVis),
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: 'clamp(24px,4vw,48px)',
            alignItems: 'center',
          }}
        >
          {/* 이미지 — 전체 컨테이너의 절반 크기 */}
          <img
            src="/rebooking.png"
            alt="첫 손님 재예약 증거"
            onClick={isMobile ? () => setLightbox(true) : undefined}
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              borderRadius: '10px',
              cursor: isMobile ? 'zoom-in' : 'default',
            }}
          />

          {/* 설명 텍스트 */}
          <p style={{
            margin: 0,
            fontFamily: font.familyKo,
            fontSize: 'clamp(15px,1.5vw,18px)',
            fontWeight: 500,
            lineHeight: 1.9,
            color: color.ink,
            wordBreak: 'keep-all',
          }}>
            지난달 네이버 예약 오픈 이후, 5월 13일 예약으로 방문하신 손님께서{' '}
            6월 3일 방문으로{' '}
            <span style={{ color: color.primary, fontWeight: 700 }}>재예약</span>
            하셨습니다.
          </p>
        </div>

      </div>

      {lightbox && (
        <div
          onClick={() => setLightbox(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.92)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
        >
          <img
            src="/rebooking.png"
            alt=""
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              display: 'block',
              objectFit: 'contain',
            }}
          />
        </div>
      )}

    </section>
  );
}
