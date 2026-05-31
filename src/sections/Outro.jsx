import { color, font } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import { useIsMobile } from '../lib/useIsMobile.js';
import n9 from '../data/n9.json';

const { outro, meta } = n9;

const rev = (vis, delay = 0) => ({
  opacity: vis ? 1 : 0,
  transform: vis ? 'none' : 'translateY(24px)',
  transition: `opacity 0.8s ease-out ${delay}s, transform 0.8s ease-out ${delay}s`,
});

export default function Outro() {
  const isMobile = useIsMobile();
  const [headRef,    headVis]    = useReveal({ threshold: 0.05 });
  const [creditsRef, creditsVis] = useReveal({ threshold: 0.05 });

  return (
    <section
      id="outro"
      style={{
        background: '#0A0A0A',
        fontFamily: font.familyKo,
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', padding: 'clamp(56px,6vw,88px) clamp(32px,7vw,120px)' }}>

        {/* Label */}
        <div ref={headRef} style={rev(headVis)}>
          <span style={{
            fontFamily: font.familyNum,
            fontSize: '14px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: color.primary,
            display: 'block',
            marginBottom: '24px',
          }}>
            {outro.label}
          </span>

          {/* Headline */}
          <h2 style={{
            margin: '0 0 clamp(48px,7vw,96px)',
            fontFamily: font.familyKo,
            fontSize: 'clamp(26px,3.4vw,40px)',
            fontWeight: 800,
            lineHeight: 1.3,
            letterSpacing: '-0.02em',
            color: '#FFFFFF',
            maxWidth: '20ch',
            wordBreak: 'keep-all',
          }}>
            {outro.headline}
          </h2>
        </div>

        {/* Credits block */}
        <div ref={creditsRef} style={rev(creditsVis, 0.1)}>

          {/* Team */}
          <div style={{
            borderTop: '1px solid #FFFFFF',
            paddingTop: '36px',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px',
          }}>
            <div>
              <p style={{
                margin: '0 0 8px',
                fontFamily: font.familyNum,
                fontSize: '14px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#FFFFFF',
              }}>
                Team
              </p>
              <p style={{
                margin: 0,
                fontFamily: font.familyKo,
                fontSize: 'clamp(16px,1.6vw,20px)',
                fontWeight: 700,
                color: '#FFFFFF',
                letterSpacing: '-0.01em',
              }}>
                {meta.team}
              </p>
            </div>

            <div style={{ textAlign: isMobile ? 'left' : 'right' }}>
              <p style={{
                margin: '0 0 6px',
                fontFamily: font.familyKo,
                fontSize: '14px',
                fontWeight: 500,
                color: '#FFFFFF',
              }}>
                {meta.course}
              </p>
              <p style={{
                margin: 0,
                fontFamily: font.familyNum,
                fontSize: '14px',
                fontWeight: 500,
                color: '#FFFFFF',
              }}>
                {meta.period}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
