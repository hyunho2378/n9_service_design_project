import { color, font } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import SectionHeader from '../components/SectionHeader.jsx';
import n9 from '../data/n9.json';

const { meta, overview } = n9;

export default function ProjectOverview() {
  const [headerRef, headerVisible] = useReveal({ threshold: 0.1 });

  return (
    <section
      id="overview"
      style={{
        background: color.bgCard,
        fontFamily: font.familyKo,
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: 'clamp(40px,5vw,72px) clamp(20px,5vw,80px)',
      }}>
        <div
          ref={headerRef}
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'none' : 'translateY(24px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
          }}
        >
          <SectionHeader label="PROJECT OVERVIEW" headline={meta.subtitle} />

          <p style={{
            fontFamily: font.familyKo,
            fontSize: 'clamp(15px,1.3vw,17px)',
            lineHeight: 1.85,
            color: color.inkSub,
            maxWidth: '680px',
            wordBreak: 'keep-all',
            margin: 0,
          }}>
            {overview.background}
          </p>
        </div>
      </div>
    </section>
  );
}
