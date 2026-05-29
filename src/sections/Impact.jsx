import { color, font } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import SectionHeader from '../components/SectionHeader.jsx';
import n9 from '../data/n9.json';
import { useIsMobile } from '../lib/useIsMobile.js';

const { impact } = n9;

const rev = (vis, delay = 0) => ({
  opacity: vis ? 1 : 0,
  transform: vis ? 'none' : 'translateY(24px)',
  transition: `opacity 0.7s ease-out ${delay}s, transform 0.7s ease-out ${delay}s`,
});

export default function Impact() {
  const isMobile = useIsMobile();
  const [headerRef,   headerVis]   = useReveal({ threshold: 0.1 });
  const [stagesRef,   stagesVis]   = useReveal({ threshold: 0.05 });
  const [reasonsRef,  reasonsVis]  = useReveal({ threshold: 0.05 });
  const [demandRef,   demandVis]   = useReveal({ threshold: 0.1 });
  const [socialRef,   socialVis]   = useReveal({ threshold: 0.1 });

  return (
    <section
      id="impact"
      style={{ background: color.bgCard, fontFamily: font.familyKo }}
    >
      <div>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(56px,6vw,88px) clamp(32px,7vw,120px) 0' }}>

          <div ref={headerRef} style={rev(headerVis)}>
            <SectionHeader label={impact.label} headline={impact.headline} />
          </div>

          {/* 3 stage cards */}
          <div
            ref={stagesRef}
            style={{
              ...rev(stagesVis),
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: '20px',
              marginBottom: 'clamp(24px,3vw,40px)',
            }}
          >
            {impact.stages.map((stage, i) => (
              <StageCard key={stage.stage} stage={stage} index={i} />
            ))}
          </div>

          {/* Scale reasons */}
          <div
            ref={reasonsRef}
            style={{
              ...rev(reasonsVis),
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: '20px',
              marginBottom: 'clamp(24px,3vw,40px)',
            }}
          >
            {impact.scaleReasons.map((reason) => (
              <ReasonCard key={reason.no} reason={reason} />
            ))}
          </div>

        </div>
      </div>

      {/* marketDemand — 그린 강조 박스 (외부 검증) */}
      <div
        ref={demandRef}
        style={{
          ...rev(demandVis),
          background: color.primary,
        }}
      >
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: 'clamp(40px,4vw,56px) clamp(32px,7vw,120px)',
        }}>
          <span style={{
            display: 'inline-block',
            fontFamily: font.familyNum,
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.7)',
            marginBottom: '12px',
          }}>
            외부 제안
          </span>
          <p style={{
            margin: 0,
            fontFamily: font.familyKo,
            fontSize: 'clamp(14px,1.4vw,17px)',
            fontWeight: 600,
            lineHeight: 1.8,
            color: '#FFFFFF',
            wordBreak: 'keep-all',
          }}>
            {impact.marketDemand}
          </p>
        </div>
      </div>

      {/* socialValue — 마무리 문장 */}
      <div
        ref={socialRef}
        style={rev(socialVis)}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(40px,5vw,64px) clamp(32px,7vw,120px) clamp(56px,6vw,88px)' }}>
          <div style={{
            borderLeft: `3px solid ${color.primary}`,
            paddingLeft: 'clamp(16px,2vw,24px)',
          }}>
            <p style={{
              margin: 0,
              fontFamily: font.familyKo,
              fontSize: 'clamp(14px,1.3vw,17px)',
              fontWeight: 600,
              lineHeight: 1.85,
              color: color.ink,
              wordBreak: 'keep-all',
            }}>
              {impact.socialValue}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function StageCard({ stage, index }) {
  const { highlight } = stage;
  const isFirst = index === 0;
  return (
    <div style={{
      background: highlight ? color.primary : color.bg,
      borderRadius: '12px',
      border: `1px solid ${highlight ? 'transparent' : color.line}`,
      boxShadow: highlight
        ? '0 8px 32px rgba(2,199,90,0.2)'
        : '0 4px 24px rgba(0,0,0,0.06)',
      padding: '24px 24px 28px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    }}>
      <span style={{
        fontFamily: font.familyNum,
        fontSize: '11px',
        fontWeight: 700,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: isFirst
          ? color.primary
          : highlight ? 'rgba(255,255,255,0.85)' : color.inkMute,
        display: 'inline-block',
      }}>
        {stage.stage}
      </span>
      <h3 style={{
        margin: 0,
        fontFamily: font.familyKo,
        fontSize: 'clamp(16px,1.5vw,20px)',
        fontWeight: 700,
        color: highlight ? '#FFFFFF' : color.ink,
        lineHeight: 1.3,
      }}>
        {stage.title}
      </h3>
      <span style={{
        fontFamily: font.familyKo,
        fontSize: '12px',
        color: highlight ? '#FFFFFF' : color.inkMute,
        display: 'inline-block',
      }}>
        {stage.tag}
      </span>
      <p style={{
        margin: '4px 0 0',
        fontFamily: font.familyKo,
        fontSize: '13px',
        lineHeight: 1.7,
        color: highlight ? '#FFFFFF' : color.inkSub,
        wordBreak: 'keep-all',
      }}>
        {stage.desc}
      </p>
    </div>
  );
}

function ReasonCard({ reason }) {
  return (
    <div style={{
      background: color.bg,
      borderRadius: '12px',
      border: `1px solid ${color.line}`,
      padding: '22px 22px 24px',
    }}>
      <span style={{
        fontFamily: font.familyNum,
        fontSize: '13px',
        fontWeight: 700,
        color: color.primary,
        display: 'block',
        marginBottom: '8px',
      }}>
        {reason.no}
      </span>
      <h4 style={{
        margin: '0 0 10px',
        fontFamily: font.familyKo,
        fontSize: '15px',
        fontWeight: 700,
        color: color.ink,
      }}>
        {reason.title}
      </h4>
      <p style={{
        margin: 0,
        fontFamily: font.familyKo,
        fontSize: '13px',
        lineHeight: 1.7,
        color: color.inkSub,
        wordBreak: 'keep-all',
      }}>
        {reason.desc}
      </p>
    </div>
  );
}
