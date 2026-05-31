import { color, font } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import { useIsMobile } from '../lib/useIsMobile.js';
import SectionHeader from '../components/SectionHeader.jsx';
import n9 from '../data/n9.json';

const { solutionDirection } = n9;

export default function SolutionDirection() {
  const isMobile = useIsMobile();
  const [headerRef, headerVis] = useReveal({ threshold: 0.1 });
  const [gapsRef,   gapsVis]   = useReveal({ threshold: 0.05 });

  return (
    <section
      id="solution-direction"
      style={{
        background: color.bgCard,
        fontFamily: font.familyKo,
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(56px,6vw,88px) clamp(32px,7vw,120px)' }}>

        <div ref={headerRef} style={rev(headerVis)}>
          <SectionHeader
            label={solutionDirection.label}
            headline={solutionDirection.headline}
          />
        </div>

        {/* 3격차 세로 흐름 */}
        <div
          ref={gapsRef}
          style={{
            ...rev(gapsVis),
            display: 'flex',
            flexDirection: 'column',
            gap: '0',
          }}
        >
          {solutionDirection.gaps.map((gap, i) => (
            <GapRow key={gap.no} gap={gap} index={i} total={solutionDirection.gaps.length} isMobile={isMobile} />
          ))}
        </div>

      </div>
    </section>
  );
}

function GapRow({ gap, index, total, isMobile }) {
  const isAi = !!gap.isAi;
  const isLast = index === total - 1;

  return (
    <div style={{ display: 'flex', alignItems: 'stretch', gap: '0' }}>
      {/* 좌측: 번호 + 세로선 */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '56px',
        flexShrink: 0,
        paddingTop: '4px',
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: isAi ? color.primary : color.bgCard,
          border: isAi ? `2px solid ${color.primary}` : 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          zIndex: 1,
        }}>
          <span style={{
            fontFamily: font.familyNum,
            fontSize: '13px',
            fontWeight: 700,
            color: isAi ? '#FFFFFF' : color.inkMute,
          }}>
            {gap.no}
          </span>
        </div>
        {!isLast && (
          <div style={{
            width: '2px',
            flex: 1,
            background: color.line,
            margin: '8px 0',
          }} />
        )}
      </div>

      {/* 우측: 콘텐츠 */}
      <div style={{
        flex: 1,
        paddingBottom: isLast ? 0 : 'clamp(32px,4vw,48px)',
        paddingLeft: '20px',
        paddingTop: '4px',
        display: isMobile ? 'flex' : 'grid',
        flexDirection: isMobile ? 'column' : undefined,
        gridTemplateColumns: isMobile ? undefined : '1fr auto',
        gap: isMobile ? '12px' : '24px',
        alignItems: 'start',
      }}>
        {/* 좌: 격차 설명 */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <span style={{
              fontFamily: font.familyNum,
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: isAi ? color.primary : color.inkMute,
            }}>
              {gap.en}
            </span>
            {isAi && (
              <span style={{
                fontFamily: font.familyNum,
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.06em',
                color: '#FFFFFF',
                background: color.primary,
                borderRadius: '4px',
                padding: '2px 7px',
              }}>
                AI
              </span>
            )}
          </div>
          <h3 style={{
            margin: '0 0 10px',
            fontFamily: font.familyKo,
            fontSize: 'clamp(18px,1.8vw,24px)',
            fontWeight: 700,
            color: isAi ? color.primary : color.ink,
            letterSpacing: '-0.02em',
          }}>
            {gap.title}
          </h3>
          <p style={{
            margin: 0,
            fontFamily: font.familyKo,
            fontSize: '16px',
            fontWeight: 500,
            lineHeight: 1.8,
            color: color.inkSub,
            wordBreak: 'keep-all',
            maxWidth: '540px',
          }}>
            {gap.desc}
          </p>
        </div>

        {/* 우: strategy 카드 */}
        <div style={{
          background: isAi ? color.primary : color.bg,
          borderRadius: '10px',
          padding: '14px 18px',
          minWidth: isMobile ? undefined : '180px',
          maxWidth: isMobile ? undefined : '220px',
          alignSelf: 'flex-start',
          flexShrink: 0,
        }}>
          <span style={{
            fontFamily: font.familyNum,
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: isAi ? '#FFFFFF' : color.inkMute,
            display: 'block',
            marginBottom: '6px',
          }}>
            Strategy
          </span>
          <span style={{
            fontFamily: font.familyKo,
            fontSize: '13px',
            fontWeight: 700,
            color: isAi ? '#FFFFFF' : color.ink,
            lineHeight: 1.5,
            wordBreak: 'keep-all',
          }}>
            {gap.strategy}
          </span>
        </div>
      </div>
    </div>
  );
}

const rev = (vis) => ({
  opacity: vis ? 1 : 0,
  transform: vis ? 'none' : 'translateY(24px)',
  transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
});
