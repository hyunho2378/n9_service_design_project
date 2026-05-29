import { color, font } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import { useIsMobile } from '../lib/useIsMobile.js';
import SectionHeader from '../components/SectionHeader.jsx';
import n9 from '../data/n9.json';

const { background } = n9;

export default function Background() {
  const isMobile = useIsMobile();
  const [headerRef, headerVisible] = useReveal({ threshold: 0.1 });
  const [blocksRef, blocksVisible] = useReveal({ threshold: 0.08 });

  return (
    <section
      id="background"
      style={{
        background: color.bg,
        fontFamily: font.familyKo,
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: 'clamp(56px,6vw,88px) clamp(32px,7vw,120px)',
      }}>

        <div
          ref={headerRef}
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'none' : 'translateY(24px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
          }}
        >
          <SectionHeader label={background.label} headline={background.headline} />
        </div>

        <div
          ref={blocksRef}
          style={{
            opacity: blocksVisible ? 1 : 0,
            transform: blocksVisible ? 'none' : 'translateY(24px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: 'clamp(24px,3vw,40px)',
          }}
        >
          {background.blocks.map((block) => (
            <div
              key={block.no}
              style={{
                borderTop: `2px solid ${color.primary}`,
                paddingTop: 'clamp(20px,2.5vw,28px)',
              }}
            >
              <span style={{
                fontFamily: font.familyNum,
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.06em',
                color: color.primary,
                display: 'block',
                marginBottom: '10px',
              }}>
                {block.no}
              </span>
              <p style={{
                fontFamily: font.familyKo,
                fontSize: 'clamp(16px,1.4vw,18px)',
                fontWeight: 700,
                lineHeight: 1.4,
                color: color.ink,
                margin: '0 0 14px',
                wordBreak: 'keep-all',
              }}>
                {block.title}
              </p>
              <p style={{
                fontFamily: font.familyKo,
                fontSize: 'clamp(16px,1.3vw,17px)',
                fontWeight: 500,
                lineHeight: 1.85,
                color: color.inkSub,
                margin: 0,
                wordBreak: 'keep-all',
              }}>
                {block.body}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
