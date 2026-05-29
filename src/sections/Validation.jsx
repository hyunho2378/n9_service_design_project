import { color, font } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import { useIsMobile } from '../lib/useIsMobile.js';
import n9 from '../data/n9.json';

const { validation } = n9;

const METRICS = [
  { label: '플레이스 유입',   before: '75회',  tag: '+570%',                   after: '503회' },
  { label: '스마트콜 호출',   before: '0회',   tag: '신규 채널 작동',            after: '20회' },
  { label: '네이버 예약',     before: '0회',   tag: '오픈 12시간 만에 첫 예약',   after: '5회 (남4/여1)' },
  { label: 'AI 맞춤 서비스',  before: '0회',   tag: '데이터 통계 수집',           after: '누적 50건' },
  { label: '신규 남성 손님',  before: '0명',   tag: '사장님 현장 실측',           after: '14명' },
];

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
            fontSize: '14px',
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
            fontSize: 'clamp(30px,4vw,46px)',
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

        {/* 5개 지표 SVG */}
        <div
          ref={metricsRef}
          style={{
            ...rev(metricsVis),
            marginBottom: 'clamp(40px,5vw,64px)',
          }}
        >
          {isMobile ? (
            <MobileMetrics />
          ) : (
            <img
              src="/va.svg"
              alt="검증 성과 지표"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          )}
        </div>

        {/* 사장님 발화 */}
        <div ref={quoteRef} style={rev(quoteVis)}>
          <QuoteBlock text={validation.quote} />
        </div>

      </div>
    </section>
  );
}

function MobileMetrics() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {METRICS.map((m, i) => (
        <div
          key={i}
          style={{
            borderTop: '1px solid #FFFFFF',
            ...(i === METRICS.length - 1 ? { borderBottom: '1px solid #FFFFFF' } : {}),
            padding: '20px 0',
          }}
        >
          <p style={{
            margin: '0 0 10px',
            fontFamily: font.familyNum,
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#FFFFFF',
          }}>
            {m.label}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              fontFamily: font.familyNum,
              fontSize: '18px',
              fontWeight: 700,
              color: '#FFFFFF',
              flexShrink: 0,
            }}>
              {m.before}
            </span>
            <div style={{ flex: 1, height: '1px', background: '#FFFFFF' }} />
            <span style={{
              background: color.primary,
              color: '#0A0A0A',
              fontFamily: font.familyNum,
              fontSize: '10px',
              fontWeight: 700,
              padding: '3px 8px',
              borderRadius: '99px',
              flexShrink: 0,
              whiteSpace: 'nowrap',
            }}>
              {m.tag}
            </span>
            <div style={{ flex: 1, height: '1px', background: '#FFFFFF' }} />
            <span style={{ color: '#FFFFFF', fontSize: '12px', flexShrink: 0 }}>▶</span>
            <span style={{
              fontFamily: font.familyNum,
              fontSize: '22px',
              fontWeight: 800,
              color: color.primary,
              flexShrink: 0,
            }}>
              {m.after}
            </span>
          </div>
        </div>
      ))}
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
