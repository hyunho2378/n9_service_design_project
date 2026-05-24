import { color, font } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import SectionHeader from '../components/SectionHeader.jsx';
import n9 from '../data/n9.json';
import { useIsMobile } from '../lib/useIsMobile.js';

const { liveDemo } = n9;
const { serviceUrl } = n9.meta;

const rev = (vis, delay = 0) => ({
  opacity: vis ? 1 : 0,
  transform: vis ? 'none' : 'translateY(24px)',
  transition: `opacity 0.7s ease-out ${delay}s, transform 0.7s ease-out ${delay}s`,
});

const CATEGORY_ORDER = ['프론트엔드', '백엔드 / 데이터베이스', 'API', '배포 / 제작 프로그램'];

export default function LiveDemo() {
  const isMobile = useIsMobile();
  const [headerRef, headerVis] = useReveal({ threshold: 0.1 });
  const [stackRef,  stackVis]  = useReveal({ threshold: 0.05 });
  const [ctaRef,    ctaVis]    = useReveal({ threshold: 0.1 });

  return (
    <section
      id="live-demo"
      style={{
        background: color.bg,
        fontFamily: font.familyKo,
        padding: 'clamp(64px,8vw,120px) clamp(20px,5vw,80px)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <div ref={headerRef} style={rev(headerVis)}>
          <SectionHeader label={liveDemo.label} headline={liveDemo.headline} />
        </div>

        {/* Tech Stack 4-grid */}
        <div
          ref={stackRef}
          style={{
            ...rev(stackVis),
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
            gap: '20px',
            marginBottom: 'clamp(40px,5vw,64px)',
          }}
        >
          {CATEGORY_ORDER.map((cat, i) => (
            <StackCard key={cat} category={cat} items={liveDemo.stack[cat] ?? []} index={i} />
          ))}
        </div>

        {/* Service link CTA */}
        <div ref={ctaRef} style={{ ...rev(ctaVis), display: 'flex', justifyContent: 'center' }}>
          <a
            href={serviceUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: color.primary,
              color: '#FFFFFF',
              fontFamily: font.familyKo,
              fontSize: '16px',
              fontWeight: 700,
              padding: '16px 36px',
              borderRadius: '12px',
              textDecoration: 'none',
              boxShadow: `0 4px 20px rgba(2,199,90,0.3)`,
              transition: 'transform 0.15s ease, box-shadow 0.15s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = `0 8px 28px rgba(2,199,90,0.4)`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = `0 4px 20px rgba(2,199,90,0.3)`;
            }}
          >
            <span style={{ fontFamily: font.familyNum, fontSize: '18px', lineHeight: 1 }}>→</span>
            서비스 바로가기
          </a>
        </div>

      </div>
    </section>
  );
}

function StackCard({ category, items, index }) {
  return (
    <div style={{
      background: color.bgCard,
      borderRadius: '12px',
      boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
      overflow: 'hidden',
    }}>
      {/* Card header */}
      <div style={{
        padding: '14px 20px',
        borderBottom: `1px solid ${color.line}`,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}>
        <span style={{
          fontFamily: font.familyNum,
          fontSize: '11px',
          fontWeight: 700,
          color: color.inkMute,
          letterSpacing: '0.06em',
        }}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <span style={{
          fontFamily: font.familyKo,
          fontSize: '12px',
          fontWeight: 700,
          color: color.inkSub,
        }}>
          {category}
        </span>
      </div>

      {/* Items */}
      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {items.map((item) => (
          <div key={item} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <span style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: color.primary,
              flexShrink: 0,
            }} />
            <span style={{
              fontFamily: font.familyNum,
              fontSize: '14px',
              fontWeight: 600,
              color: color.ink,
            }}>
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
