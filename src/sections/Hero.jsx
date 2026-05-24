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
  { label: 'AWARD',  value: meta.award },
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
        minHeight: '100svh',
        background: color.bg,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
      }}
    >
      {/* 상단: 텍스트 + 목업 */}
      <div
        style={{
          flex: 1,
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
          padding: 'clamp(80px,10vw,140px) clamp(20px,5vw,80px) 0',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: 'clamp(32px,4vw,80px)',
          alignItems: 'center',
        }}
      >
        {/* LEFT: 텍스트 */}
        <div
          ref={textRef}
          style={{
            opacity: textVisible ? 1 : 0,
            transform: textVisible ? 'none' : 'translateY(28px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
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
            margin: '0 0 24px',
            fontFamily: font.familyKo,
            fontSize: 'clamp(36px,5vw,72px)',
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
            margin: '0 0 40px',
            fontFamily: font.familyKo,
            fontSize: 'clamp(16px,1.4vw,18px)',
            lineHeight: 1.75,
            color: color.inkSub,
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

        {/* RIGHT: 목업 placeholder + 패럴랙스 */}
        <div
          ref={mockRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'clamp(40px,4vw,60px) 0',
          }}
          aria-hidden="true"
        >
          <MockPhone />
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

// TODO: 실제 N9 AI 진단 서비스 스크린샷/목업으로 교체
function MockPhone() {
  return (
    <div style={{
      width: 'clamp(260px,22vw,360px)',
      height: 'clamp(520px,44vw,720px)',
      borderRadius: '32px',
      border: `4px solid ${color.ink}`,
      background: color.primaryLight,
      boxShadow: '0 32px 80px rgba(0,0,0,0.14), 0 4px 16px rgba(0,0,0,0.06)',
      overflow: 'hidden',
      position: 'relative',
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px',
    }}>
      {/* 다이나믹 아일랜드 */}
      <div style={{
        position: 'absolute',
        top: '12px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80px',
        height: '22px',
        borderRadius: '12px',
        background: color.ink,
      }} />
      {/* N9 로고 placeholder */}
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: '16px',
        background: color.primary,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <span style={{
          fontFamily: font.familyNum,
          fontSize: '22px',
          fontWeight: 800,
          color: '#FFFFFF',
          letterSpacing: '-0.04em',
        }}>N9</span>
      </div>
      <p style={{
        margin: 0,
        fontFamily: font.familyKo,
        fontSize: '13px',
        fontWeight: 600,
        color: color.inkSub,
        textAlign: 'center',
      }}>
        AI 진단 목업 교체 예정
      </p>
    </div>
  );
}
