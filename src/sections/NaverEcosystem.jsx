import { useState } from 'react';
import { color, font } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import { useIsMobile } from '../lib/useIsMobile.js';
import SectionHeader from '../components/SectionHeader.jsx';
import n9 from '../data/n9.json';

const { naver } = n9;

const rev = (vis, delay = 0) => ({
  opacity: vis ? 1 : 0,
  transform: vis ? 'none' : 'translateY(24px)',
  transition: `opacity 0.7s ease-out ${delay}s, transform 0.7s ease-out ${delay}s`,
});

export default function NaverEcosystem() {
  const isMobile = useIsMobile();
  const [headerRef, headerVis] = useReveal({ threshold: 0.1 });
  const [imagesRef, imagesVis] = useReveal({ threshold: 0.05 });

  return (
    <section
      id="naver-ecosystem"
      style={{ background: color.bgCard, fontFamily: font.familyKo }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(56px,6vw,88px) clamp(32px,7vw,120px)' }}>

        <div ref={headerRef} style={rev(headerVis)}>
          <SectionHeader label={naver.label} headline={naver.headline} />
        </div>

        <div
          ref={imagesRef}
          style={{
            ...rev(imagesVis),
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: 'clamp(32px,4vw,60px)',
          }}
        >
          <NaverImg src="/naver-place.png" label="naver-place.png" />
          <NaverImg src="/naver-price.png" label="naver-price.png" />
        </div>

      </div>
    </section>
  );
}

function NaverImg({ src, label }) {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <div style={{
      width: '100%',
      aspectRatio: '3 / 2',
      background: '#F2F2F0',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <span style={{
        fontFamily: font.familyKo,
        fontSize: '11px',
        color: '#AAAAAA',
      }}>
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
      }}
    />
  );
}
