import { color, font } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import { useIsMobile } from '../lib/useIsMobile.js';
import SectionHeader from '../components/SectionHeader.jsx';
import DonutChart from '../components/DonutChart.jsx';
import n9 from '../data/n9.json';


const { deskResearch } = n9;

export default function DeskResearch() {
  const isMobile = useIsMobile();
  const [headerRef, headerVisible] = useReveal({ threshold: 0.1 });
  const [chartsRef, chartsVisible] = useReveal({ threshold: 0.1 });
  const [insightRef, insightVisible] = useReveal({ threshold: 0.08 });

  return (
    <section
      id="desk-research"
      style={{
        background: color.bg,
        fontFamily: font.familyKo,
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(56px,6vw,88px) clamp(32px,7vw,120px)' }}>

        {/* 섹션 헤더 */}
        <div
          ref={headerRef}
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'none' : 'translateY(24px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
          }}
        >
          <SectionHeader
            label={deskResearch.label}
            headline={deskResearch.headline}
          />
        </div>

        {/* 차트 3개 */}
        <div
          ref={chartsRef}
          style={{
            opacity: chartsVisible ? 1 : 0,
            transform: chartsVisible ? 'none' : 'translateY(24px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '24px',
            marginBottom: 'clamp(32px,4vw,48px)',
          }}
        >
          {deskResearch.charts.map((chart, i) => (
            <div
              key={i}
              style={{
                background: color.bgCard,
                borderRadius: '12px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                padding: '32px 24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: chart.type === 'compare_bar' ? 'stretch' : 'center',
                textAlign: chart.type === 'compare_bar' ? 'left' : 'center',
              }}
            >
              {chart.type === 'donut' ? (
                <DonutChart
                  value={chart.value}
                  unit={chart.unit}
                  caption={chart.caption}
                  source={chart.source}
                />
              ) : chart.type === 'compare_bar' ? (
                <CompareBar chart={chart} />
              ) : (
                <ArrowStat chart={chart} />
              )}
            </div>
          ))}
        </div>

        {/* 인사이트 3개 */}
        <div
          ref={insightRef}
          style={{
            opacity: insightVisible ? 1 : 0,
            transform: insightVisible ? 'none' : 'translateY(24px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '24px',
          }}
        >
          {deskResearch.insights.map((item, i) => (
            <div
              key={i}
              style={{
                background: color.bgCard,
                borderRadius: '12px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                padding: '28px 24px',
              }}
            >
              <p style={{
                margin: '0 0 12px',
                fontFamily: font.familyKo,
                fontSize: '15px',
                fontWeight: 700,
                lineHeight: 1.45,
                color: color.ink,
                wordBreak: 'keep-all',
              }}>
                {item.title}
              </p>
              <p style={{
                margin: 0,
                fontFamily: font.familyKo,
                fontSize: '14px',
                lineHeight: 1.75,
                color: color.inkSub,
                wordBreak: 'keep-all',
              }}>
                {item.body}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

function CompareBar({ chart }) {
  const [ref, visible] = useReveal({ threshold: 0.1 });
  const maxVal = Math.max(...chart.bars.map(b => b.value));
  return (
    <div ref={ref} style={{ width: '100%' }}>
      <p style={{
        margin: '0 0 24px',
        fontFamily: font.familyKo,
        fontSize: '14px',
        fontWeight: 600,
        color: color.inkSub,
      }}>
        {chart.caption}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {chart.bars.map((bar, i) => (
          <div key={i}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: '8px',
            }}>
              <span style={{
                fontFamily: font.familyKo,
                fontSize: '13px',
                color: color.inkSub,
              }}>
                {bar.label}
              </span>
              <span style={{
                fontFamily: font.familyNum,
                fontSize: '18px',
                fontWeight: 800,
                color: i === 0 ? color.inkSub : color.primary,
                letterSpacing: '-0.02em',
              }}>
                {bar.value}%
              </span>
            </div>
            <div style={{
              height: '10px',
              borderRadius: '999px',
              background: color.bgSoft,
              overflow: 'hidden',
            }}>
              <div style={{
                height: '100%',
                borderRadius: '999px',
                background: i === 0 ? color.inkMute : color.primary,
                width: visible ? `${(bar.value / maxVal) * 100}%` : '0%',
                transition: `width 0.8s ease-out ${i * 0.15}s`,
              }} />
            </div>
          </div>
        ))}
      </div>
      {chart.source && (
        <p style={{
          margin: '20px 0 0',
          fontFamily: font.familyKo,
          fontSize: '12px',
          color: color.inkMute,
        }}>
          {chart.source}
        </p>
      )}
    </div>
  );
}

// DESIGN_WEBN9.md: arrow 타입 — 큰 수치 + prefix + 캡션/출처
function ArrowStat({ chart }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'center',
        gap: '2px',
        marginBottom: '12px',
      }}>
        {chart.prefix && (
          <span style={{
            fontFamily: font.familyNum,
            fontSize: '28px',
            fontWeight: 700,
            color: color.primary,
            lineHeight: 1,
          }}>{chart.prefix}</span>
        )}
        <span style={{
          fontFamily: font.familyNum,
          fontSize: '52px',
          fontWeight: 800,
          color: color.ink,
          lineHeight: 1,
          letterSpacing: '-0.03em',
        }}>{chart.value}</span>
        <span style={{
          fontFamily: font.familyNum,
          fontSize: '22px',
          fontWeight: 700,
          color: color.inkSub,
          lineHeight: 1,
        }}>{chart.unit}</span>
      </div>
      {chart.caption && (
        <p style={{
          margin: '0 0 4px',
          fontFamily: font.familyKo,
          fontSize: '14px',
          fontWeight: 600,
          color: color.inkSub,
        }}>{chart.caption}</p>
      )}
      {chart.source && (
        <p style={{
          margin: 0,
          fontFamily: font.familyKo,
          fontSize: '12px',
          color: color.inkMute,
        }}>{chart.source}</p>
      )}
    </div>
  );
}
