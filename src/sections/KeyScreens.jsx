import { color, font } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import { useIsMobile } from '../lib/useIsMobile.js';
import SectionHeader from '../components/SectionHeader.jsx';
import n9 from '../data/n9.json';

const { liveDemo } = n9;

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
          <SectionHeader label={liveDemo.label} headline={liveDemo.headline} />
        </div>

        <div
          ref={bodyRef}
          style={{
            ...rev(bodyVis),
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(5, 1fr)',
            gap: '12px',
          }}
        >
          {liveDemo.screens.map((screen) => (
            <img
              key={screen.no}
              src={`/ai-screen-${screen.no}.png`}
              alt=""
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                borderRadius: '16px',
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
