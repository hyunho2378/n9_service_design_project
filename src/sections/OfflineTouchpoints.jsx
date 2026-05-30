import { useState } from 'react';
import { color, font } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import { useIsMobile } from '../lib/useIsMobile.js';
import SectionHeader from '../components/SectionHeader.jsx';
import n9 from '../data/n9.json';

const { offline } = n9;

const rev = (vis, delay = 0) => ({
  opacity: vis ? 1 : 0,
  transform: vis ? 'none' : 'translateY(24px)',
  transition: `opacity 0.7s ease-out ${delay}s, transform 0.7s ease-out ${delay}s`,
});

const IMAGE_PAIRS = [
  { before: 'touchpoint-card-before.jpg',      after: 'touchpoint-card-after.jpg' },
  { before: 'touchpoint-pricelist-before.jpg', after: 'touchpoint-pricelist-after.jpg' },
  { before: 'touchpoint-qr-before.jpg',        after: 'touchpoint-qr-after.jpg' },
];

export default function OfflineTouchpoints() {
  const isMobile = useIsMobile();
  const [headerRef, headerVis] = useReveal({ threshold: 0.1 });
  const [itemsRef,  itemsVis]  = useReveal({ threshold: 0.05 });

  return (
    <section
      id="offline-touchpoints"
      style={{
        background: color.bg,
        fontFamily: font.familyKo,
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(56px,6vw,88px) clamp(32px,7vw,120px)' }}>

        <div ref={headerRef} style={rev(headerVis)}>
          <SectionHeader label={offline.label} headline={offline.headline} />
        </div>

        <div
          ref={itemsRef}
          style={{
            ...rev(itemsVis),
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          {offline.items.map((item, i) => (
            <TouchpointCard key={i} item={item} imgPair={IMAGE_PAIRS[i]} isMobile={isMobile} />
          ))}
        </div>

      </div>
    </section>
  );
}

function SlotImg({ filename }) {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <div style={{
      width: '100%',
      aspectRatio: '4 / 3',
      background: '#F2F2F0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <span style={{
        fontFamily: font.familyKo,
        fontSize: '9px',
        color: '#AAAAAA',
        textAlign: 'center',
        padding: '0 6px',
        wordBreak: 'break-all',
      }}>
        {filename}
      </span>
    </div>
  ) : (
    <img
      src={`/${filename}`}
      alt=""
      onError={() => setFailed(true)}
      style={{ width: '100%', height: 'auto', display: 'block' }}
    />
  );
}

function TouchpointCard({ item, imgPair, isMobile }) {
  return (
    <div style={{
      background: color.bgCard,
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Before | After 가로 나란히 */}
      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}>
        {/* Before (좌) */}
        <div style={{ flex: 1, position: 'relative', minWidth: 0 }}>
          <SlotImg filename={imgPair.before} />
          <span style={{
            position: 'absolute', top: '8px', left: '8px',
            fontFamily: font.familyNum, fontSize: '9px', fontWeight: 700,
            letterSpacing: '0.06em', textTransform: 'uppercase',
            color: color.inkMute,
            background: 'rgba(255,255,255,0.88)',
            padding: '2px 6px', borderRadius: '4px',
          }}>
            Before
          </span>
        </div>

        {/* After (우) — 그린 스트로크 */}
        <div style={{ flex: 1, position: 'relative', minWidth: 0, outline: `2px solid ${color.primary}` }}>
          <SlotImg filename={imgPair.after} />
          <span style={{
            position: 'absolute', top: '8px', left: '8px',
            fontFamily: font.familyNum, fontSize: '9px', fontWeight: 700,
            letterSpacing: '0.06em', textTransform: 'uppercase',
            color: '#FFFFFF',
            background: color.primary,
            padding: '2px 6px', borderRadius: '4px',
          }}>
            After
          </span>
        </div>
      </div>

      {/* 텍스트 */}
      <div style={{ padding: '20px 22px 24px' }}>
        <h3 style={{
          margin: '0 0 8px',
          fontFamily: font.familyKo,
          fontSize: '18px',
          fontWeight: 700,
          color: color.ink,
          letterSpacing: '-0.01em',
        }}>
          {item.title}
        </h3>
        <p style={{
          margin: 0,
          fontFamily: font.familyKo,
          fontSize: '15px',
          fontWeight: 500,
          lineHeight: 1.75,
          color: color.inkSub,
          wordBreak: 'keep-all',
        }}>
          {item.desc}
        </p>
      </div>
    </div>
  );
}
