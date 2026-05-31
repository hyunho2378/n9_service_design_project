import { color, font } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import { useIsMobile } from '../lib/useIsMobile.js';
import SectionHeader from '../components/SectionHeader.jsx';
import n9 from '../data/n9.json';

const { persona } = n9;

const TONES = {
  gray: { accent: color.primary,  accentBg: color.bg, accentSoft: color.line },
  blue: { accent: color.inkSub,   accentBg: color.bg, accentSoft: color.line },
};

const rev = (vis, delay = 0) => ({
  opacity: vis ? 1 : 0,
  transform: vis ? 'none' : 'translateY(24px)',
  transition: `opacity 0.7s ease-out ${delay}s, transform 0.7s ease-out ${delay}s`,
});

export default function Persona() {
  const isMobile = useIsMobile();
  const [headerRef,  headerVis]  = useReveal({ threshold: 0.1 });
  const [cardsRef,   cardsVis]   = useReveal({ threshold: 0.05 });

  return (
    <section id="persona" style={{ background: color.bg, fontFamily: font.familyKo }}>

      {/* 헤더 */}
      <div>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(56px,6vw,88px) clamp(32px,7vw,120px) 0' }}>
          <div ref={headerRef} style={rev(headerVis)}>
            <SectionHeader label={persona.label} headline={persona.headline} />
          </div>
        </div>
      </div>

      {/* 페르소나 카드 2개 좌우 */}
      <div>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(32px,7vw,120px) clamp(56px,6vw,88px)' }}>
          <div
            ref={cardsRef}
            style={{
              ...rev(cardsVis),
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: '24px',
            }}
          >
            {persona.personas.map((p) => (
              <PersonaCard key={p.name} p={p} tone={TONES[p.color] ?? TONES.gray} />
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}

function PersonaCard({ p, tone }) {
  return (
    <div style={{
      background: color.bgCard,
      borderRadius: '12px',
      border: '1px solid #0A0A0A',
      overflow: 'hidden',
    }}>
      {/* 카드 헤더 */}
      <div style={{ background: color.bgCard, padding: '28px 28px 20px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '16px',
        }}>
          <div>
            <span style={{
              fontFamily: font.familyNum,
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: tone.accent,
              display: 'block',
              marginBottom: '6px',
            }}>
              {p.role}
            </span>
            <h3 style={{
              margin: 0,
              fontFamily: font.familyKo,
              fontSize: 'clamp(22px,2vw,28px)',
              fontWeight: 700,
              color: color.ink,
              letterSpacing: '-0.02em',
            }}>
              {p.name}
            </h3>
          </div>
          <span style={{
            fontFamily: font.familyNum,
            fontSize: '14px',
            fontWeight: 700,
            color: tone.accent,
            background: color.bgCard,
            borderRadius: '8px',
            padding: '5px 12px',
            flexShrink: 0,
          }}>
            {p.age}세
          </span>
        </div>

        {/* 유저 스토리 */}
        <div style={{
          background: color.bgCard,
          borderRadius: '8px',
          padding: '14px 16px',
        }}>
          <p style={{
            margin: 0,
            fontFamily: font.familyKo,
            fontSize: '15px',
            fontWeight: 500,
            lineHeight: 1.75,
            color: color.inkSub,
            wordBreak: 'keep-all',
          }}>
            "{p.story}"
          </p>
        </div>
      </div>

      {/* 카드 본문 */}
      <div style={{ padding: '24px 28px 28px' }}>
        {/* Pain Points */}
        <p style={{
          margin: '0 0 12px',
          fontFamily: font.familyNum,
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: color.inkMute,
        }}>
          Pain Points
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
          {p.pains.map((pain, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <span style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: tone.accentBg,
                border: `1.5px solid ${tone.accent}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: '1px',
              }}>
                <span style={{
                  fontFamily: font.familyNum,
                  fontSize: '10px',
                  fontWeight: 700,
                  color: tone.accent,
                }}>{i + 1}</span>
              </span>
              <span style={{
                fontFamily: font.familyKo,
                fontSize: '15px',
                fontWeight: 500,
                lineHeight: 1.6,
                color: color.inkSub,
                wordBreak: 'keep-all',
              }}>
                {pain}
              </span>
            </div>
          ))}
        </div>

        {/* Needs */}
        <div style={{
          background: tone.accentBg,
          borderRadius: '8px',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}>
          <span style={{
            fontFamily: font.familyNum,
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: tone.accent,
            flexShrink: 0,
          }}>
            Needs
          </span>
          <span style={{
            fontFamily: font.familyKo,
            fontSize: '15px',
            fontWeight: 700,
            color: color.ink,
            wordBreak: 'keep-all',
          }}>
            {p.needs}
          </span>
        </div>
      </div>
    </div>
  );
}
