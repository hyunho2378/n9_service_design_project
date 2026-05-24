import { color, font } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import SectionHeader from '../components/SectionHeader.jsx';
import n9 from '../data/n9.json';
import { useIsMobile } from '../lib/useIsMobile.js';

const { validation } = n9;

const rev = (vis, delay = 0) => ({
  opacity: vis ? 1 : 0,
  transform: vis ? 'none' : 'translateY(24px)',
  transition: `opacity 0.7s ease-out ${delay}s, transform 0.7s ease-out ${delay}s`,
});

export default function Validation() {
  const isMobile = useIsMobile();
  const [headerRef,   headerVis]   = useReveal({ threshold: 0.1 });
  const [metricsRef,  metricsVis]  = useReveal({ threshold: 0.05 });
  const [quotesRef,   quotesVis]   = useReveal({ threshold: 0.1 });

  return (
    <section
      id="validation"
      style={{
        background: color.bg,
        fontFamily: font.familyKo,
        padding: 'clamp(64px,8vw,120px) clamp(20px,5vw,80px)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <div ref={headerRef} style={rev(headerVis)}>
          <SectionHeader label={validation.label} headline={validation.headline} />
          <p style={{
            margin: '-16px 0 40px',
            fontFamily: font.familyNum,
            fontSize: '12px',
            color: color.inkMute,
            letterSpacing: '0.04em',
          }}>
            {validation.activationDates}
          </p>
        </div>

        {/* Metrics grid */}
        <div
          ref={metricsRef}
          style={{
            ...rev(metricsVis),
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '16px',
            marginBottom: 'clamp(40px,5vw,64px)',
          }}
        >
          {validation.metrics.map((metric) => (
            <MetricCard key={metric.label} metric={metric} />
          ))}
        </div>

        {/* Quotes */}
        <div
          ref={quotesRef}
          style={{
            ...rev(quotesVis),
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: '20px',
          }}
        >
          <QuoteBlock
            text={validation.quote}
            label="김선희 사장님"
          />
          <QuoteBlock
            text={validation.newCustomerQuote}
            label="신규 방문 손님"
            isCustomer
          />
        </div>

      </div>
    </section>
  );
}

function MetricCard({ metric }) {
  const { highlight } = metric;
  return (
    <div style={{
      background: highlight ? color.primaryLight : color.bgCard,
      borderRadius: '12px',
      border: `1px solid ${highlight ? color.primarySoft : color.line}`,
      padding: '20px 20px 18px',
      boxShadow: highlight
        ? '0 4px 20px rgba(2,199,90,0.12)'
        : '0 2px 12px rgba(0,0,0,0.05)',
    }}>
      <p style={{
        margin: '0 0 14px',
        fontFamily: font.familyKo,
        fontSize: '13px',
        fontWeight: 600,
        color: highlight ? color.primary : color.inkSub,
      }}>
        {metric.label}
      </p>

      {/* Before → After */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '10px',
      }}>
        <span style={{
          fontFamily: font.familyNum,
          fontSize: '13px',
          color: color.inkMute,
          textDecoration: 'line-through',
          textDecorationColor: color.line,
        }}>
          {metric.before}
        </span>
        <span style={{
          fontFamily: font.familyNum,
          fontSize: '12px',
          color: highlight ? color.primary : color.inkMute,
        }}>
          →
        </span>
        <span style={{
          fontFamily: font.familyNum,
          fontSize: highlight ? '16px' : '14px',
          fontWeight: 700,
          color: highlight ? color.primary : color.ink,
        }}>
          {metric.after}
        </span>
      </div>

      {/* Tag */}
      <span style={{
        display: 'inline-block',
        fontFamily: font.familyNum,
        fontSize: '11px',
        fontWeight: 700,
        color: highlight ? color.primary : color.inkMute,
        background: highlight ? 'rgba(2,199,90,0.12)' : color.bgSoft,
        borderRadius: '4px',
        padding: '3px 8px',
        letterSpacing: '0.03em',
      }}>
        {metric.tag}
      </span>
    </div>
  );
}

function QuoteBlock({ text, label, isCustomer }) {
  return (
    <div style={{
      background: isCustomer ? color.bgCard : color.primaryLight,
      borderRadius: '12px',
      border: `1px solid ${isCustomer ? color.line : color.primarySoft}`,
      padding: '24px 28px',
    }}>
      <span style={{
        fontFamily: font.familyNum,
        fontSize: '32px',
        color: isCustomer ? color.line : color.primarySoft,
        lineHeight: 1,
        display: 'block',
        marginBottom: '10px',
      }}>
        "
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
        {text}
      </p>
      <span style={{
        fontFamily: font.familyKo,
        fontSize: '12px',
        color: color.inkMute,
      }}>
        — {label}
      </span>
    </div>
  );
}
