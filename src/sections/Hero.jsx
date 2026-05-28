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
        minHeight: '50svh',
        background: color.bg,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 배경 이미지: absolute, 우측 하단 고정 */}
      {!isMobile && (
        <div
          ref={mockRef}
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: 'clamp(-160px,-12vw,-40px)',
            bottom: 0,
            top: 0,
            display: 'flex',
            alignItems: 'flex-end',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        >
          <img
            src="/hero.png"
            alt=""
            style={{
              width: 'clamp(420px,56vw,860px)',
              maxWidth: 'none',
              objectFit: 'contain',
              objectPosition: 'bottom right',
              display: 'block',
            }}
          />
        </div>
      )}

      {/* 상단: 텍스트 */}
      <div
        style={{
          flex: 1,
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
          padding: 'clamp(64px,8vw,100px) clamp(20px,5vw,80px) clamp(40px,5vw,72px)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* LEFT: 텍스트 */}
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
            fontSize: '13px',
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
            whiteSpace: 'pre-line',
            wordBreak: 'keep-all',
          }}>
            {hero.titleLines.join('\n')}
          </h1>

          <p style={{
            margin: '0 0 12px',
            fontFamily: font.familyKo,
            fontSize: 'clamp(14px,1.2vw,16px)',
            fontWeight: 600,
            color: color.inkSub,
            wordBreak: 'keep-all',
          }}>
            {hero.subTitle}
          </p>

          <p style={{
            margin: '0 0 40px',
            fontFamily: font.familyKo,
            fontSize: 'clamp(14px,1.2vw,15px)',
            lineHeight: 1.75,
            color: color.inkMute,
            maxWidth: '420px',
            wordBreak: 'keep-all',
          }}>
            {hero.desc}
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <HeroCTA href={meta.serviceUrl} label={hero.ctaPrimary} primary />
            <HeroCTA href={meta.naverUrl}   label={hero.ctaSecondary} />
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
          padding: 'clamp(20px,2.5vw,32px) clamp(20px,5vw,80px)',
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
            color: 'rgba(255,255,255,0.55)',
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
                color: 'rgba(255,255,255,0.5)',
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

