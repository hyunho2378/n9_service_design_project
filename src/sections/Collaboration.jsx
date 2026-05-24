import { color, font } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import SectionHeader from '../components/SectionHeader.jsx';
import n9 from '../data/n9.json';
import { useIsMobile } from '../lib/useIsMobile.js';

const { collaboration } = n9;

const rev = (vis, delay = 0) => ({
  opacity: vis ? 1 : 0,
  transform: vis ? 'none' : 'translateY(24px)',
  transition: `opacity 0.7s ease-out ${delay}s, transform 0.7s ease-out ${delay}s`,
});

export default function Collaboration() {
  const isMobile = useIsMobile();
  const [headerRef,   headerVis]   = useReveal({ threshold: 0.1 });
  const [timelineRef, timelineVis] = useReveal({ threshold: 0.05 });
  const [quotesRef,   quotesVis]   = useReveal({ threshold: 0.1 });

  return (
    <section
      id="collaboration"
      style={{
        background: color.bg,
        fontFamily: font.familyKo,
        padding: 'clamp(64px,8vw,120px) clamp(20px,5vw,80px)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <div ref={headerRef} style={rev(headerVis)}>
          <SectionHeader label={collaboration.label} headline={collaboration.headline} />
        </div>

        {/* Timeline */}
        <div
          ref={timelineRef}
          style={{
            ...rev(timelineVis),
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(3, 1fr)' : 'repeat(5, 1fr)',
            gap: '0',
            marginBottom: 'clamp(48px,6vw,80px)',
            position: 'relative',
          }}
        >
          {/* Connector line */}
          <div style={{
            position: 'absolute',
            top: '20px',
            left: '10%',
            right: '10%',
            height: '2px',
            background: color.line,
            zIndex: 0,
          }} />

          {collaboration.timeline.map((item, i) => (
            <TimelineNode key={item.week} item={item} index={i} />
          ))}
        </div>

        {/* Before / After quotes */}
        <div
          ref={quotesRef}
          style={{
            ...rev(quotesVis),
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: '20px',
          }}
        >
          <ConversationQuote data={collaboration.quoteBefore} label="Before" />
          <ConversationQuote data={collaboration.quoteAfter} label="After" isAfter />
        </div>

      </div>
    </section>
  );
}

function TimelineNode({ item, index }) {
  const { highlight } = item;
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '16px',
      position: 'relative',
      zIndex: 1,
      padding: '0 8px',
    }}>
      {/* Circle */}
      <div style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        background: highlight ? color.primary : color.bgCard,
        border: `2px solid ${highlight ? color.primary : color.line}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: highlight ? `0 0 0 6px ${color.primaryLight}` : 'none',
        flexShrink: 0,
      }}>
        {highlight ? (
          <span style={{ fontSize: '14px', color: '#fff' }}>✓</span>
        ) : (
          <span style={{
            fontFamily: font.familyNum,
            fontSize: '11px',
            fontWeight: 700,
            color: color.inkMute,
          }}>
            {String(index + 1)}
          </span>
        )}
      </div>

      {/* Content */}
      <div style={{ textAlign: 'center' }}>
        <span style={{
          fontFamily: font.familyNum,
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: highlight ? color.primary : color.inkMute,
          display: 'block',
          marginBottom: '4px',
        }}>
          {item.week}
        </span>
        <h4 style={{
          margin: '0 0 6px',
          fontFamily: font.familyKo,
          fontSize: '13px',
          fontWeight: 700,
          color: highlight ? color.primary : color.ink,
          wordBreak: 'keep-all',
        }}>
          {item.title}
        </h4>
        <p style={{
          margin: 0,
          fontFamily: font.familyKo,
          fontSize: '12px',
          lineHeight: 1.6,
          color: color.inkMute,
          wordBreak: 'keep-all',
        }}>
          {item.desc}
        </p>
      </div>
    </div>
  );
}

function ConversationQuote({ data, label, isAfter }) {
  return (
    <div style={{
      background: isAfter ? color.primaryLight : color.bgCard,
      borderRadius: '12px',
      border: `1px solid ${isAfter ? color.primarySoft : color.line}`,
      padding: '24px 28px',
    }}>
      <span style={{
        fontFamily: font.familyNum,
        fontSize: '11px',
        fontWeight: 700,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: isAfter ? color.primary : color.inkMute,
        display: 'block',
        marginBottom: '12px',
      }}>
        {label}
      </span>
      <p style={{
        margin: '0 0 16px',
        fontFamily: font.familyKo,
        fontSize: 'clamp(14px,1.4vw,17px)',
        fontWeight: 600,
        lineHeight: 1.7,
        color: color.ink,
        wordBreak: 'keep-all',
        fontStyle: 'italic',
      }}>
        "{data.text}"
      </p>
      <span style={{
        fontFamily: font.familyKo,
        fontSize: '12px',
        color: color.inkMute,
      }}>
        — {data.date}
      </span>
    </div>
  );
}
