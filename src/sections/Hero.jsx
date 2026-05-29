import { color, font } from '../tokens/web.js';
import { useParallax } from '../lib/useParallax.js';
import { useReveal } from '../lib/useReveal.js';
import { useIsMobile } from '../lib/useIsMobile.js';
import n9 from '../data/n9.json';

const { hero, meta } = n9;

const META_ITEMS = [
  { label: 'TEAM',   value: meta.team },
  { label: 'PERIOD', value: meta.period },
  { label: 'TOOLS',  value: meta.tools },
];

export default function Hero() {
  const isMobile = useIsMobile();
  const mockRef  = useParallax(0.07);
  const [textRef, textVisible] = useReveal({ threshold: 0.05 });
  const [barRef,  barVisible]  = useReveal({ threshold: 0.1 });

  return (
    <section
      id="hero"
      style={{
        minHeight: 'calc(100svh - 56px)',
        background: color.bg,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 이미지 + 텍스트 래퍼: flex:1로 그린 바 위 영역만 차지 */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>

        {/* 배경 이미지: 래퍼 안에 absolute로 가둬 그린 바 침범 방지 */}
        {!isMobile && (
          <div
            ref={mockRef}
            aria-hidden="true"
            style={{
              position: 'absolute',
              right: 'clamp(0px,8vw,120px)',
              top: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'flex-start',
              paddingTop: 'clamp(20px,4vw,56px)',
              overflow: 'hidden',
              zIndex: 0,
              pointerEvents: 'none',
            }}
          >
            <img
              src="/hero.png"
              alt=""
              style={{
                width: 'clamp(456px,62vw,888px)',
                maxWidth: 'none',
                maxHeight: '100%',
                objectFit: 'contain',
                objectPosition: 'top right',
                display: 'block',
              }}
            />
          </div>
        )}

        {/* 텍스트 */}
        <div
          style={{
            maxWidth: '1200px',
            width: '100%',
            margin: '0 auto',
            padding: 'clamp(56px,6vw,88px) clamp(32px,7vw,120px)',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div
            ref={textRef}
            style={{
              opacity: textVisible ? 1 : 0,
              transform: textVisible ? 'none' : 'translateY(28px)',
              transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
              maxWidth: '560px',
            }}
          >
            <p style={{
              margin: '0 0 20px',
              fontFamily: font.familyNum,
              fontSize: '14px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: color.primary,
            }}>
              {hero.label}
            </p>

            <h1 style={{
              margin: '0 0 16px',
              fontFamily: font.familyKo,
              fontSize: 'clamp(28px,4vw,56px)',
              fontWeight: 800,
              lineHeight: 1.2,
              letterSpacing: '-0.03em',
              color: color.ink,
              wordBreak: 'keep-all',
            }}>
              {hero.mainTitle}
            </h1>

            <p style={{
              margin: '0 0 40px',
              fontFamily: font.familyKo,
              fontSize: 'clamp(16px,1.3vw,17px)',
              fontWeight: 500,
              lineHeight: 1.75,
              color: color.inkMute,
              maxWidth: '420px',
              wordBreak: 'keep-all',
            }}>
              {hero.descFull}
            </p>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <HeroCTA href={meta.serviceUrl} label={hero.ctaPrimary} primary />
              <HeroCTA href={meta.naverUrl}   label={hero.ctaSecondary} />
            </div>
          </div>
        </div>

      </div>

      {/* 하단: 그린 메타 바 */}
      <div
        ref={barRef}
        style={{
          background: color.primary,
          width: '100%',
          opacity: barVisible ? 1 : 0,
          transform: barVisible ? 'none' : 'translateY(20px)',
          transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
        }}
      >
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: 'clamp(20px,2.5vw,32px) clamp(32px,7vw,120px)',
          display: 'flex',
          gap: 'clamp(24px,4vw,56px)',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
        }}>
          <p style={{
            margin: 0,
            fontFamily: font.familyNum,
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#FFFFFF',
            flexShrink: 0,
            alignSelf: 'center',
          }}>
            Project Detail
          </p>
          {META_ITEMS.map(({ label, value }) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{
                fontFamily: font.familyNum,
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: '#FFFFFF',
              }}>
                {label}
              </span>
              <span style={{
                fontFamily: font.familyKo,
                fontSize: '13px',
                fontWeight: 600,
                color: '#FFFFFF',
                letterSpacing: '-0.01em',
              }}>
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HeroCTA({ href, label, primary = false }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: 'clamp(12px,1.2vw,16px) clamp(20px,2vw,28px)',
        borderRadius: '100px',
        fontSize: '14px',
        fontWeight: 700,
        letterSpacing: '-0.01em',
        textDecoration: 'none',
        transition: 'opacity 0.18s, transform 0.18s',
        background: primary ? color.primary : 'transparent',
        color: primary ? '#FFFFFF' : color.ink,
        border: `2px solid ${primary ? color.primary : color.line}`,
        fontFamily: font.familyKo,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.opacity = '0.82';
        e.currentTarget.style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = '1';
        e.currentTarget.style.transform = 'none';
      }}
    >
      {label}
    </a>
  );
}

