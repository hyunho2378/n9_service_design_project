import { color, font } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import SectionHeader from '../components/SectionHeader.jsx';
import n9 from '../data/n9.json';
import { useIsMobile } from '../lib/useIsMobile.js';

const { aiIntegration } = n9;

const rev = (vis, delay = 0) => ({
  opacity: vis ? 1 : 0,
  transform: vis ? 'none' : 'translateY(24px)',
  transition: `opacity 0.7s ease-out ${delay}s, transform 0.7s ease-out ${delay}s`,
});

export default function AiIntegration() {
  const isMobile = useIsMobile();
  const [headerRef, headerVis] = useReveal({ threshold: 0.1 });
  const [bodyRef,   bodyVis]   = useReveal({ threshold: 0.05 });

  return (
    <section
      id="ai-integration"
      style={{
        background: color.bgCard,
        fontFamily: font.familyKo,
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(56px,6vw,88px) clamp(32px,7vw,120px)' }}>

        <div ref={headerRef} style={rev(headerVis)}>
          <SectionHeader label={aiIntegration.label} headline={aiIntegration.headline} />
        </div>

        <div
          ref={bodyRef}
          style={{
            ...rev(bodyVis),
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr clamp(140px,14vw,180px) 1fr',
            gap: 'clamp(20px,3vw,48px)',
            alignItems: 'center',
          }}
        >
          <PersonaColumn data={aiIntegration.customer} side="left" />
          <AiCenter data={aiIntegration.center} />
          <PersonaColumn data={aiIntegration.owner} side="right" />
        </div>

      </div>
    </section>
  );
}

function PersonaColumn({ data, side }) {
  const isLeft = side === 'left';
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '14px',
    }}>
      {/* Role label */}
      <div style={{ textAlign: isLeft ? 'right' : 'left' }}>
        <span style={{
          fontFamily: font.familyNum,
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: color.primary,
          display: 'block',
          marginBottom: '4px',
        }}>
          {data.role}
        </span>
        <span style={{
          fontFamily: font.familyKo,
          fontSize: '15px',
          fontWeight: 700,
          color: color.ink,
        }}>
          {data.label}
        </span>
      </div>

      <QACard label="Q" text={data.q} align={isLeft ? 'right' : 'left'} />
      <QACard label="A" text={data.a} align={isLeft ? 'right' : 'left'} isAnswer />
    </div>
  );
}

function QACard({ label, text, align, isAnswer }) {
  return (
    <div style={{
      background: isAnswer ? color.bgCard : color.bg,
      border: `1px solid ${color.line}`,
      borderRadius: '10px',
      padding: '14px 16px',
      display: 'flex',
      flexDirection: align === 'right' ? 'row-reverse' : 'row',
      gap: '10px',
      alignItems: 'flex-start',
    }}>
      <span style={{
        fontFamily: font.familyNum,
        fontSize: '11px',
        fontWeight: 700,
        color: isAnswer ? color.primary : color.inkMute,
        flexShrink: 0,
        marginTop: '1px',
      }}>
        {label}
      </span>
      <p style={{
        margin: 0,
        fontFamily: font.familyKo,
        fontSize: '13px',
        lineHeight: 1.65,
        color: isAnswer ? color.ink : color.inkSub,
        wordBreak: 'keep-all',
        textAlign: align,
      }}>
        {text}
      </p>
    </div>
  );
}

function AiCenter({ data }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '16px',
    }}>
      <div style={{
        width: 'clamp(120px,12vw,160px)',
        height: 'clamp(120px,12vw,160px)',
        borderRadius: '50%',
        background: color.primary,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        boxShadow: '0 0 0 8px rgba(2,199,90,0.12), 0 0 0 16px rgba(2,199,90,0.06)',
        flexShrink: 0,
      }}>
        <span style={{
          fontFamily: font.familyNum,
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.08em',
          color: '#FFFFFF',
        }}>
          N9 AI
        </span>
        <p style={{
          margin: 0,
          fontFamily: font.familyKo,
          fontSize: 'clamp(10px,1vw,12px)',
          fontWeight: 700,
          color: '#FFFFFF',
          textAlign: 'center',
          padding: '0 12px',
          lineHeight: 1.45,
          wordBreak: 'keep-all',
        }}>
          {data.title}
        </p>
      </div>
      <p style={{
        margin: 0,
        fontFamily: font.familyKo,
        fontSize: '12px',
        color: color.inkMute,
        textAlign: 'center',
        lineHeight: 1.5,
        wordBreak: 'keep-all',
      }}>
        {data.sub}
      </p>
    </div>
  );
}
