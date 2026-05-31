import { useState } from 'react';
import { color, font } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import { useIsMobile } from '../lib/useIsMobile.js';
import SectionHeader from '../components/SectionHeader.jsx';
import n9 from '../data/n9.json';

const { liveDemo } = n9;

const rev = (vis, delay = 0) => ({
  opacity: vis ? 1 : 0,
  transform: vis ? 'none' : 'translateY(24px)',
  transition: `opacity 0.7s ease-out ${delay}s, transform 0.7s ease-out ${delay}s`,
});

export default function KeyScreens() {
  const isMobile = useIsMobile();
  const [headerRef, headerVis] = useReveal({ threshold: 0.1 });
  const [bodyRef,   bodyVis]   = useReveal({ threshold: 0.03 });
  const [lightbox,  setLightbox] = useState(false);

  return (
    <section
      id="key-screens"
      style={{ background: color.bgCard, fontFamily: font.familyKo }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(56px,6vw,88px) clamp(32px,7vw,120px)' }}>

        <div ref={headerRef} style={rev(headerVis)}>
          <SectionHeader label={liveDemo.prototypeLabel} headline={liveDemo.prototypeHeadline} />
        </div>

        <div ref={bodyRef} style={rev(bodyVis)}>
          <img
            src="/prototype-all.png"
            alt="AI 맞춤 진단 서비스 화면 5종"
            onClick={isMobile ? () => setLightbox(true) : undefined}
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              cursor: isMobile ? 'zoom-in' : 'default',
            }}
          />
        </div>

      </div>

      {/* 모바일 라이트박스 */}
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
            src="/prototype-all.png"
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
