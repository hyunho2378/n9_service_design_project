import { color, font } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import { useCountUp } from '../lib/useCountUp.js';
import SectionHeader from '../components/SectionHeader.jsx';
import n9 from '../data/n9.json';

const { meta, stats, overview } = n9;

const META_ITEMS = [
  { label: 'PROJECT', value: meta.title },
  { label: 'TEAM',    value: meta.team },
  { label: 'PERIOD',  value: meta.period },
  { label: 'TOOLS',   value: meta.tools },
];

export default function ProjectOverview() {
  const [headerRef, headerVisible] = useReveal({ threshold: 0.1 });
  const [statsRef,  statsVisible]  = useReveal({ threshold: 0.1 });
  const [metaRef,   metaVisible]   = useReveal({ threshold: 0.1 });

  return (
    <section
      id="overview"
      style={{
        background: color.bgCard,
        fontFamily: font.familyKo,
      }}
    >
      {/* 상단: 그린 Stats 바 */}
      <div
        ref={statsRef}
        style={{
          background: color.primary,
          opacity: statsVisible ? 1 : 0,
          transform: statsVisible ? 'none' : 'translateY(20px)',
          transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
        }}
      >
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: 'clamp(32px,4vw,56px) clamp(20px,5vw,80px)',
          display: 'flex',
          gap: 'clamp(40px,6vw,96px)',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
        }}>
          {stats.map((s) => (
            <StatItem key={s.label} stat={s} />
          ))}
        </div>
      </div>

      {/* 하단: 섹션 헤더 + 배경 설명 + 메타 */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: 'clamp(64px,8vw,120px) clamp(20px,5vw,80px)',
      }}>
        <div
          ref={headerRef}
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'none' : 'translateY(24px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
          }}
        >
          <SectionHeader label="PROJECT OVERVIEW" headline={meta.subtitle} />

          <p style={{
            fontFamily: font.familyKo,
            fontSize: 'clamp(15px,1.3vw,17px)',
            lineHeight: 1.85,
            color: color.inkSub,
            maxWidth: '680px',
            wordBreak: 'keep-all',
            margin: '0 0 56px',
          }}>
            {overview.background}
          </p>
        </div>

        {/* 메타 항목 그리드 */}
        <div
          ref={metaRef}
          style={{
            opacity: metaVisible ? 1 : 0,
            transform: metaVisible ? 'none' : 'translateY(20px)',
            transition: 'opacity 0.7s ease-out 0.1s, transform 0.7s ease-out 0.1s',
            display: 'flex',
            gap: 'clamp(32px,5vw,64px)',
            flexWrap: 'wrap',
            paddingTop: '40px',
            borderTop: `1px solid ${color.line}`,
          }}
        >
          {META_ITEMS.map(({ label, value }) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{
                fontFamily: font.familyNum,
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: color.inkMute,
              }}>
                {label}
              </span>
              <span style={{
                fontFamily: font.familyKo,
                fontSize: '14px',
                fontWeight: 600,
                color: color.inkSub,
                letterSpacing: '-0.01em',
              }}>
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({ stat }) {
  const [ref, value] = useCountUp(stat.value, 1500);
  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
        {stat.prefix && (
          <span style={{
            fontFamily: font.familyNum,
            fontSize: 'clamp(24px,2.2vw,36px)',
            fontWeight: 800,
            lineHeight: 1,
            color: '#FFFFFF',
          }}>{stat.prefix}</span>
        )}
        <span style={{
          fontFamily: font.familyNum,
          fontSize: 'clamp(32px,3vw,48px)',
          fontWeight: 800,
          lineHeight: 1,
          letterSpacing: '-0.03em',
          color: '#FFFFFF',
        }}>
          {value.toLocaleString()}
        </span>
        {stat.suffix && (
          <span style={{
            fontFamily: font.familyKo,
            fontSize: 'clamp(18px,1.8vw,26px)',
            fontWeight: 800,
            lineHeight: 1,
            color: '#FFFFFF',
          }}>{stat.suffix}</span>
        )}
      </div>
      <span style={{
        fontFamily: font.familyKo,
        fontSize: '13px',
        fontWeight: 500,
        color: 'rgba(255,255,255,0.65)',
        letterSpacing: '-0.01em',
      }}>
        {stat.label}
      </span>
    </div>
  );
}
