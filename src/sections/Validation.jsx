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
  const [headerRef,  headerVis]  = useReveal({ threshold: 0.1 });
  const [metricsRef, metricsVis] = useReveal({ threshold: 0.05 });
  const [quoteRef,   quoteVis]   = useReveal({ threshold: 0.1 });

  return (
    <section
      id="validation"
      style={{ background: '#0A0A0A', fontFamily: font.familyKo }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(56px,6vw,88px) clamp(32px,7vw,120px)' }}>

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
            margin: '0 0 12px',
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
            color: '#FFFFFF',
            letterSpacing: '0.03em',
          }}>
            활성화 날짜 / {validation.activationDates}
          </p>
        </div>

        {/* 5개 지표 — 세로 */}
        <div
          ref={metricsRef}
          style={{
            ...rev(metricsVis),
            borderTop: '1px solid #FFFFFF',
            marginBottom: 'clamp(40px,5vw,64px)',
          }}
        >
          {validation.metrics.map((metric) => (
            <MetricRow key={metric.label} metric={metric} isMobile={isMobile} />
          ))}
        </div>

        {/* 사장님 발화 */}
        <div ref={quoteRef} style={rev(quoteVis)}>
          <QuoteBlock text={validation.quote} />
        </div>

      </div>
    </section>
  );
}

function MetricRow({ metric, isMobile }) {
  return (
    <div style={{
      padding: 'clamp(22px,2.8vw,36px) 0',
      borderBottom: '1px solid #FFFFFF',
    }}>

      {/* 지표명 — 위에 작게 */}
      <p style={{
        margin: '0 0 clamp(10px,1.2vw,14px)',
        fontFamily: font.familyKo,
        fontSize: '12px',
        fontWeight: 600,
        letterSpacing: '0.04em',
        color: '#FFFFFF',
      }}>
        {metric.label}
      </p>

      {isMobile ? (
        /* ── 모바일: 수치 행 + 태그 행 ── */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
            <span style={{
              fontFamily: font.familyNum,
              fontSize: '20px',
              fontWeight: 700,
              color: '#FFFFFF',
            }}>
              {metric.before}
            </span>
            <span style={{ color: '#FFFFFF', fontSize: '13px' }}>→</span>
            <span style={{
              fontFamily: font.familyNum,
              fontSize: metric.highlight ? '30px' : '24px',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: color.primary,
              lineHeight: 1,
            }}>
              {metric.after}
            </span>
          </div>
          <span style={{
            display: 'inline-flex',
            alignSelf: 'flex-start',
            fontFamily: font.familyKo,
            fontSize: '12px',
            fontWeight: 700,
            color: '#FFFFFF',
            background: color.primary,
            borderRadius: '6px',
            padding: '4px 10px',
            whiteSpace: 'nowrap',
          }}>
            {metric.tag}
          </span>
        </div>
      ) : (
        /* ── 데스크탑: [Before] ──[태그]──▶ [After] ── */
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
        }}>

          {/* Before 수치 */}
          <span style={{
            fontFamily: font.familyNum,
            fontSize: 'clamp(18px,2vw,28px)',
            fontWeight: 700,
            color: '#FFFFFF',
            flexShrink: 0,
          }}>
            {metric.before}
          </span>

          {/* 왼쪽 선 */}
          <div style={{
            flex: 1,
            height: '1px',
            background: '#FFFFFF',
            minWidth: '20px',
          }} />

          {/* 태그 (화살표 중간) */}
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            fontFamily: font.familyKo,
            fontSize: '12px',
            fontWeight: 700,
            color: '#FFFFFF',
            background: color.primary,
            borderRadius: '8px',
            padding: '5px 13px',
            flexShrink: 0,
            whiteSpace: 'nowrap',
          }}>
            {metric.tag}
          </span>

          {/* 오른쪽 선 */}
          <div style={{
            flex: 1,
            height: '1px',
            background: '#FFFFFF',
            minWidth: '20px',
          }} />

          {/* 화살촉 */}
          <span style={{
            fontFamily: font.familyNum,
            fontSize: '15px',
            color: '#FFFFFF',
            flexShrink: 0,
            lineHeight: 1,
          }}>
            ▶
          </span>

          {/* After 수치 */}
          <span style={{
            fontFamily: font.familyNum,
            fontSize: metric.highlight
              ? 'clamp(28px,3.5vw,48px)'
              : 'clamp(22px,2.8vw,36px)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: color.primary,
            lineHeight: 1,
            flexShrink: 0,
          }}>
            {metric.after}
          </span>
        </div>
      )}
    </div>
  );
}

function QuoteBlock({ text }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: 'clamp(12px,2vw,24px)',
    }}>
      <span style={{
        fontFamily: font.familyNum,
        fontSize: 'clamp(64px,8vw,92px)',
        lineHeight: 0.8,
        color: color.primary,
        fontWeight: 700,
        flexShrink: 0,
        userSelect: 'none',
        marginTop: '4px',
      }}>
        "
      </span>
      <p style={{
        margin: 0,
        fontFamily: font.familyKo,
        fontSize: 'clamp(16px,2vw,28px)',
        fontWeight: 700,
        lineHeight: 1.8,
        color: '#FFFFFF',
        wordBreak: 'keep-all',
        paddingTop: 'clamp(16px,2vw,28px)',
      }}>
        {text}
      </p>
    </div>
  );
}
