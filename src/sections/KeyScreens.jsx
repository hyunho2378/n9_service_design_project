import { color, font } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import { useIsMobile } from '../lib/useIsMobile.js';
import SectionHeader from '../components/SectionHeader.jsx';
import n9 from '../data/n9.json';

const { liveDemo } = n9;

const ITEM_WIDTH = 160; // px — 5개 × 160 + 4 × 16gap = 864px, 여유있게 수용
const PHONE_RATIO = '9 / 19'; // 폰 스크린 비율 고정

const rev = (vis, delay = 0) => ({
  opacity: vis ? 1 : 0,
  transform: vis ? 'none' : 'translateY(24px)',
  transition: `opacity 0.7s ease-out ${delay}s, transform 0.7s ease-out ${delay}s`,
});

export default function KeyScreens() {
  const isMobile = useIsMobile();
  const [headerRef, headerVis] = useReveal({ threshold: 0.1 });
  const [bodyRef,   bodyVis]   = useReveal({ threshold: 0.03 });

  return (
    <section
      id="key-screens"
      style={{ background: color.bgCard, fontFamily: font.familyKo }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(56px,6vw,88px) clamp(32px,7vw,120px)' }}>

        <div ref={headerRef} style={rev(headerVis)}>
          <SectionHeader label="LAYER 03 / PROTOTYPE" headline={liveDemo.headline} />
        </div>

        {/* 스크롤 래퍼: 모바일만 overflow-x */}
        <div
          ref={bodyRef}
          style={{
            ...rev(bodyVis),
            overflowX: isMobile ? 'auto' : 'visible',
            paddingBottom: isMobile ? '8px' : 0,
          }}
        >
          <div style={{
            display: 'flex',
            gap: '16px',
            width: isMobile ? 'max-content' : '100%',
            justifyContent: isMobile ? 'flex-start' : 'space-between',
          }}>
            {liveDemo.screens.map((screen) => (
              <ScreenItem key={screen.no} screen={screen} isMobile={isMobile} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

function ScreenItem({ screen, isMobile }) {
  return (
    <div style={{
      width: isMobile ? `${ITEM_WIDTH}px` : 0,
      flex: isMobile ? 'none' : 1,
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      {/* 이미지 — 고정 비율 박스로 크기 통일 */}
      <div style={{
        width: '100%',
        aspectRatio: PHONE_RATIO,
        borderRadius: '14px',
        overflow: 'hidden',
        background: '#F2F2F0',
      }}>
        <img
          src={`/ai-screen-${screen.no}.png`}
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'top center',
            display: 'block',
          }}
        />
      </div>

      {/* 코치마크 라벨 */}
      <div style={{
        marginTop: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '5px',
        width: '100%',
      }}>
        <div style={{
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          background: color.primary,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <span style={{
            fontFamily: font.familyNum,
            fontSize: '10px',
            fontWeight: 700,
            color: '#FFFFFF',
          }}>
            {screen.no}
          </span>
        </div>
        <span style={{
          fontFamily: font.familyKo,
          fontSize: '11px',
          fontWeight: 600,
          color: color.ink,
          textAlign: 'center',
          lineHeight: 1.4,
          wordBreak: 'keep-all',
        }}>
          {screen.label}
        </span>
      </div>
    </div>
  );
}
