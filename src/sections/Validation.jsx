import { color, font } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import { useIsMobile } from '../lib/useIsMobile.js';
import n9 from '../data/n9.json';

const { validation } = n9;

const rev = (vis, delay = 0) => ({
  opacity: vis ? 1 : 0,
  transform: vis ? 'none' : 'translateY(24px)',
  transition: `opacity 0.7s ease-out ${delay}s, transform 0.7s ease-out ${delay}s`,
});

export default function Validation() {
  const isMobile = useIsMobile();
  const [headerRef, headerVis] = useReveal({ threshold: 0.1 });
  const [metricsRef, metricsVis] = useReveal({ threshold: 0.05 });
  const [quoteRef, quoteVis] = useReveal({ threshold: 0.1 });

  return (
    <section
      id="validation"
      style={{
        background: '#0A0A0A',
        fontFamily: font.familyKo,
        padding: 'clamp(40px,5vw,72px) clamp(20px,5vw,80px)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* 헤더 */}
        <div ref={headerRef} style={rev(headerVis)}>
          <p style={{
            margin: '0 0 16px',
            fontFamily: font.familyNum,
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: color.primary,
          }}>
            {validation.label}
          </p>
          <h2 style={{
            margin: '0 0 14px',
            fontFamily: font.familyKo,
            fontSize: 'clamp(24px,3vw,40px)',
            fontWeight: 800,
            lineHeight: 1.25,
            letterSpacing: '-0.02em',
            color: '#FFFFFF',
            wordBreak: 'keep-all',
          }}>
            {validation.headline}
          </h2>
          <p style={{
            margin: '0 0 clamp(32px,4vw,48px)',
            fontFamily: font.familyNum,
            fontSize: '12px',
            fontWeight: 600,
            color: 'rgba(255,255,255,0.5)',
            letterSpacing: '0.04em',
          }}>
            활성화 날짜 / {validation.activationDates}
          </p>
        </div>

        {/* 5개 지표 — 세로 스택 */}
        <div
          ref={metricsRef}
          style={{
            ...rev(metricsVis),
            display: 'flex',
            flexDirection: 'column',
            marginBottom: 'clamp(32px,4vw,48px)',
          }}
        >
          {validation.metrics.map((metric, i) => (
            <MetricRow
              key={metric.label}
              metric={metric}
              isFirst={i === 0}
              isMobile={isMobile}
            />
          ))}
        </div>

        {/* 사장님 발화 */}
        <div ref={quoteRef} style={rev(quoteVis)}>
          <QuoteBlock text={validation.quote} label="김선희 사장님" />
        </div>

      </div>
    </section>
  );
}

function MetricRow({ metric, isFirst, isMobile }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: isMobile ? 'flex-start' : 'center',
      flexDirection: isMobile ? 'column' : 'row',
      gap: isMobile ? '10px' : 'clamp(16px,2.5vw,40px)',
      padding: 'clamp(20px,2.5vw,28px) 0',
      borderTop: isFirst ? '1px solid rgba(255,255,255,0.12)' : 'none',
      borderBottom: '1px solid rgba(255,255,255,0.12)',
    }}>

      {/* 라벨 */}
      <span style={{
        fontFamily: font.familyKo,
        fontSize: 'clamp(13px,1.2vw,15px)',
        fontWeight: 700,
        color: metric.highlight ? '#FFFFFF' : 'rgba(255,255,255,0.7)',
        flexShrink: 0,
        width: isMobile ? 'auto' : 'clamp(120px,14vw,200px)',
      }}>
        {metric.label}
      </span>

      {/* Before → After */}
      <div style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: '10px',
        flex: 1,
      }}>
        <span style={{
          fontFamily: font.familyNum,
          fontSize: 'clamp(13px,1.1vw,15px)',
          fontWeight: 600,
          color: 'rgba(255,255,255,0.3)',
          textDecoration: 'line-through',
          textDecorationColor: 'rgba(255,255,255,0.2)',
        }}>
          {metric.before}
        </span>
        <span style={{
          fontFamily: font.familyNum,
          fontSize: '14px',
          color: 'rgba(255,255,255,0.25)',
        }}>
          →
        </span>
        <span style={{
          fontFamily: font.familyNum,
          fontSize: metric.highlight ? 'clamp(22px,2.5vw,36px)' : 'clamp(17px,2vw,26px)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          color: color.primary,
        }}>
          {metric.after}
        </span>
      </div>

      {/* 그린 태그 — SVG의 rx=12 둥근 라벨 */}
      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        fontFamily: font.familyKo,
        fontSize: '13px',
        fontWeight: 700,
        color: '#FFFFFF',
        background: color.primary,
        borderRadius: '12px',
        padding: '6px 14px',
        flexShrink: 0,
        letterSpacing: '-0.01em',
        whiteSpace: 'nowrap',
      }}>
        {metric.tag}
      </span>
    </div>
  );
}

function QuoteBlock({ text, label }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.04)',
      borderRadius: '16px',
      border: '1px solid rgba(255,255,255,0.1)',
      padding: 'clamp(28px,4vw,48px)',
    }}>
      <span style={{
        fontFamily: font.familyNum,
        fontSize: '56px',
        lineHeight: 1,
        color: color.primary,
        fontWeight: 700,
        display: 'block',
        marginBottom: '12px',
        userSelect: 'none',
      }}>
        "
      </span>
      <p style={{
        margin: '0 0 20px',
        fontFamily: font.familyKo,
        fontSize: 'clamp(15px,1.5vw,20px)',
        fontWeight: 700,
        lineHeight: 1.8,
        color: '#FFFFFF',
        wordBreak: 'keep-all',
      }}>
        {text}
      </p>
      <span style={{
        fontFamily: font.familyKo,
        fontSize: '13px',
        fontWeight: 600,
        color: 'rgba(255,255,255,0.6)',
      }}>
        {label}
      </span>
    </div>
  );
}
