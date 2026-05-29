import { color, font } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import SectionHeader from '../components/SectionHeader.jsx';
import n9 from '../data/n9.json';
import { useIsMobile } from '../lib/useIsMobile.js';

const { deliverables } = n9;

const rev = (vis, delay = 0) => ({
  opacity: vis ? 1 : 0,
  transform: vis ? 'none' : 'translateY(24px)',
  transition: `opacity 0.7s ease-out ${delay}s, transform 0.7s ease-out ${delay}s`,
});

export default function Deliverables() {
  const isMobile = useIsMobile();
  const [headerRef, headerVis] = useReveal({ threshold: 0.1 });
  const [bodyRef,   bodyVis]   = useReveal({ threshold: 0.05 });

  const row1 = deliverables.items.slice(0, 3);
  const row2 = deliverables.items.slice(3);

  return (
    <section
      id="deliverables"
      style={{
        background: color.bgCard,
        fontFamily: font.familyKo,
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(56px,6vw,88px) clamp(32px,7vw,120px)' }}>

        <div ref={headerRef} style={rev(headerVis)}>
          <SectionHeader label={deliverables.label} headline={deliverables.headline} />
        </div>

        <div ref={bodyRef} style={rev(bodyVis)}>
          {/* Row 1: 3 cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '20px',
            marginBottom: '20px',
          }}>
            {row1.map((item) => (
              <DeliverableCard key={item.no} item={item} />
            ))}
          </div>

          {/* Row 2: 2 cards centered */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: '20px',
            maxWidth: isMobile ? '100%' : 'calc(66.66% - 6.67px)',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            {row2.map((item) => (
              <DeliverableCard key={item.no} item={item} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

function DeliverableCard({ item }) {
  const { highlight } = item;
  return (
    <div style={{
      background: highlight ? color.primary : color.bg,
      borderRadius: '12px',
      boxShadow: highlight
        ? '0 8px 32px rgba(2,199,90,0.2)'
        : '0 4px 24px rgba(0,0,0,0.06)',
      border: 'none',
      padding: '28px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    }}>
      <span style={{
        fontFamily: font.familyNum,
        fontSize: '13px',
        fontWeight: 700,
        letterSpacing: '0.06em',
        color: highlight ? '#FFFFFF' : color.inkMute,
      }}>
        {item.no}
      </span>
      <h3 style={{
        margin: 0,
        fontFamily: font.familyKo,
        fontSize: 'clamp(18px,1.6vw,20px)',
        fontWeight: 700,
        color: highlight ? '#FFFFFF' : color.ink,
        lineHeight: 1.4,
        wordBreak: 'keep-all',
      }}>
        {item.title}
      </h3>
      <p style={{
        margin: 0,
        fontFamily: font.familyKo,
        fontSize: '15px',
        fontWeight: 500,
        lineHeight: 1.65,
        color: highlight ? '#FFFFFF' : color.inkSub,
        wordBreak: 'keep-all',
      }}>
        {item.desc}
      </p>
    </div>
  );
}
