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

// 아이템별 목업 아이콘 (placeholder SVG)
const ICONS = [
  // 명함
  <svg key="card" width="48" height="48" viewBox="0 0 48 48" fill="none">
    <rect x="4" y="12" width="40" height="24" rx="4" stroke={color.primary} strokeWidth="2"/>
    <rect x="10" y="18" width="10" height="8" rx="2" fill={color.bg}/>
    <line x1="24" y1="20" x2="38" y2="20" stroke={color.line} strokeWidth="2" strokeLinecap="round"/>
    <line x1="24" y1="25" x2="34" y2="25" stroke={color.line} strokeWidth="2" strokeLinecap="round"/>
    <circle cx="38" cy="32" r="5" fill={color.bg} stroke={color.primary} strokeWidth="1.5"/>
    <path d="M36 32l1.5 1.5L40 30" stroke={color.primary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>,
  // 가격표
  <svg key="price" width="48" height="48" viewBox="0 0 48 48" fill="none">
    <rect x="6" y="6" width="36" height="36" rx="4" stroke={color.primary} strokeWidth="2"/>
    <line x1="12" y1="16" x2="36" y2="16" stroke={color.line} strokeWidth="2" strokeLinecap="round"/>
    <line x1="12" y1="22" x2="28" y2="22" stroke={color.bg} strokeWidth="2" strokeLinecap="round"/>
    <line x1="12" y1="27" x2="30" y2="27" stroke={color.bg} strokeWidth="2" strokeLinecap="round"/>
    <line x1="12" y1="32" x2="26" y2="32" stroke={color.bg} strokeWidth="2" strokeLinecap="round"/>
    <rect x="30" y="20" width="8" height="14" rx="2" fill={color.bg}/>
  </svg>,
  // QR 카드
  <svg key="qr" width="48" height="48" viewBox="0 0 48 48" fill="none">
    <rect x="6" y="6" width="16" height="16" rx="2" stroke={color.primary} strokeWidth="2"/>
    <rect x="10" y="10" width="8" height="8" rx="1" fill={color.bg}/>
    <rect x="26" y="6" width="16" height="16" rx="2" stroke={color.primary} strokeWidth="2"/>
    <rect x="30" y="10" width="8" height="8" rx="1" fill={color.bg}/>
    <rect x="6" y="26" width="16" height="16" rx="2" stroke={color.primary} strokeWidth="2"/>
    <rect x="10" y="30" width="8" height="8" rx="1" fill={color.bg}/>
    <rect x="26" y="26" width="6" height="6" rx="1" fill={color.line}/>
    <rect x="34" y="26" width="6" height="6" rx="1" fill={color.line}/>
    <rect x="26" y="34" width="6" height="6" rx="1" fill={color.line}/>
    <rect x="34" y="34" width="6" height="6" rx="1" fill={color.primary}/>
  </svg>,
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
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '24px',
          }}
        >
          {offline.items.map((item, i) => (
            <TouchpointCard key={i} item={item} icon={ICONS[i]} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}

function TouchpointCard({ item, icon, index }) {
  return (
    <div style={{
      background: color.bgCard,
      borderRadius: '12px',
      boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* 목업 placeholder */}
      <div style={{
        background: color.bg,
        height: '180px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        position: 'relative',
      }}>
        <span style={{
          position: 'absolute',
          top: '12px',
          left: '14px',
          fontFamily: font.familyNum,
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.06em',
          color: color.primary,
        }}>
          {String(index + 1).padStart(2, '0')}
        </span>
        {icon}
        {/* TODO: 실제 명함/가격표/QR카드 촬영 이미지로 교체 */}
        <span style={{
          fontFamily: font.familyKo,
          fontSize: '11px',
          color: color.inkMute,
        }}>
          실물 이미지 교체 예정
        </span>
      </div>

      {/* 텍스트 */}
      <div style={{ padding: '20px 22px 24px', flex: 1 }}>
        <h3 style={{
          margin: '0 0 10px',
          fontFamily: font.familyKo,
          fontSize: '16px',
          fontWeight: 700,
          color: color.ink,
          letterSpacing: '-0.01em',
        }}>
          {item.title}
        </h3>
        <p style={{
          margin: 0,
          fontFamily: font.familyKo,
          fontSize: '14px',
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
