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
      style={{ background: color.bgCard, fontFamily: font.familyKo }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(56px,6vw,88px) clamp(32px,7vw,120px)' }}>

        <div ref={headerRef} style={rev(headerVis)}>
          <SectionHeader label={aiIntegration.label} headline={aiIntegration.headline} />
        </div>

        <div ref={bodyRef} style={rev(bodyVis)}>
          {isMobile ? (
            /* Mobile: 세로 스택 */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <PersonaColumn data={aiIntegration.customer} />
              <AiCenter data={aiIntegration.center} />
              <PersonaColumn data={aiIntegration.owner} />
            </div>
          ) : (
            /* Desktop: Q행/A행 높이 맞춤 — 3열 × 3행 명시적 그리드 */
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr clamp(130px,13vw,165px) 1fr',
              columnGap: 'clamp(10px,1.2vw,20px)',
              rowGap: '14px',
            }}>
              {/* Row 1: 컬럼 헤더 */}
              <PersonaHeader data={aiIntegration.customer} extraStyle={{ gridColumn: 1, gridRow: 1 }} />
              {/* 중앙 원: rows 1-3 span */}
              <div style={{
                gridColumn: 2,
                gridRow: '1 / 4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <AiCenter data={aiIntegration.center} />
              </div>
              <PersonaHeader data={aiIntegration.owner} extraStyle={{ gridColumn: 3, gridRow: 1 }} />

              {/* Row 2: Q 카드 — 명시적 배치로 좌우 같은 행 보장 */}
              <QACard label="Q" text={aiIntegration.customer.q} align="right" extraStyle={{ gridColumn: 1, gridRow: 2 }} />
              <QACard label="Q" text={aiIntegration.owner.q} align="left" extraStyle={{ gridColumn: 3, gridRow: 2 }} />

              {/* Row 3: A 카드 */}
              <QACard label="A" text={aiIntegration.customer.a} align="right" isAnswer extraStyle={{ gridColumn: 1, gridRow: 3 }} />
              <QACard label="A" text={aiIntegration.owner.a} align="left" isAnswer extraStyle={{ gridColumn: 3, gridRow: 3 }} />
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

/* 컬럼 헤더 (데스크톱 row 1 전용) */
function PersonaHeader({ data, extraStyle }) {
  return (
    <div style={{ textAlign: 'center', ...extraStyle }}>
      <span style={{
        fontFamily: font.familyNum,
        fontSize: '13px',
        fontWeight: 700,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: color.primary,
        display: 'block',
        marginBottom: '6px',
      }}>
        {data.role}
      </span>
      <span style={{
        fontFamily: font.familyKo,
        fontSize: 'clamp(20px,2vw,26px)',
        fontWeight: 800,
        color: color.ink,
      }}>
        {data.label}
      </span>
    </div>
  );
}

/* 모바일용: 헤더 + Q + A 세로 묶음 */
function PersonaColumn({ data }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <PersonaHeader data={data} />
      <QACard label="Q" text={data.q} align="left" />
      <QACard label="A" text={data.a} align="left" isAnswer />
    </div>
  );
}

function QACard({ label, text, align, isAnswer, extraStyle }) {
  return (
    <div style={{
      background: isAnswer ? color.bgCard : color.bg,
      borderRadius: '10px',
      padding: '16px 22px',
      display: 'flex',
      flexDirection: align === 'right' ? 'row-reverse' : 'row',
      gap: '12px',
      alignItems: 'flex-start',
      ...extraStyle,
    }}>
      <span style={{
        fontFamily: font.familyNum,
        fontSize: '12px',
        fontWeight: 700,
        color: isAnswer ? color.primary : color.inkMute,
        flexShrink: 0,
        marginTop: '2px',
      }}>
        {label}
      </span>
      <p style={{
        margin: 0,
        fontFamily: font.familyKo,
        fontSize: '16px',
        lineHeight: 1.7,
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
        gap: '4px',
        boxShadow: '0 0 0 8px rgba(2,199,90,0.12), 0 0 0 16px rgba(2,199,90,0.06)',
        flexShrink: 0,
      }}>
        <span style={{
          fontFamily: font.familyNum,
          fontSize: '18px',
          fontWeight: 800,
          letterSpacing: '0.06em',
          color: '#FFFFFF',
        }}>
          N9 AI
        </span>
        <p style={{
          margin: 0,
          fontFamily: font.familyKo,
          fontSize: 'clamp(12px,1.2vw,15px)',
          fontWeight: 700,
          color: '#FFFFFF',
          textAlign: 'center',
          padding: '0 8px',
          lineHeight: 1.4,
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
