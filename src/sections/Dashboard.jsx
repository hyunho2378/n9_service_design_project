import { color, font } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import SectionHeader from '../components/SectionHeader.jsx';
import n9 from '../data/n9.json';
import { useIsMobile } from '../lib/useIsMobile.js';

const { dashboard } = n9;

const rev = (vis, delay = 0) => ({
  opacity: vis ? 1 : 0,
  transform: vis ? 'none' : 'translateY(24px)',
  transition: `opacity 0.7s ease-out ${delay}s, transform 0.7s ease-out ${delay}s`,
});

export default function Dashboard() {
  const isMobile = useIsMobile();
  const [headerRef, headerVis] = useReveal({ threshold: 0.1 });
  const [bodyRef,   bodyVis]   = useReveal({ threshold: 0.05 });
  const [vocRef,    vocVis]    = useReveal({ threshold: 0.1 });

  return (
    <section
      id="dashboard"
      style={{ background: color.bg, fontFamily: font.familyKo }}
    >
      <div style={{ padding: 'clamp(40px,5vw,72px) clamp(20px,5vw,80px) 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

          <div ref={headerRef} style={rev(headerVis)}>
            <SectionHeader label={dashboard.label} headline={dashboard.headline} />
          </div>

          {/* 2-col blocks */}
          <div
            ref={bodyRef}
            style={{
              ...rev(bodyVis),
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: '24px',
              marginBottom: 'clamp(24px,3vw,40px)',
            }}
          >
            {dashboard.items.map((item, i) => (
              <DashboardBlock key={item.no} item={item} index={i} />
            ))}
          </div>

        </div>
      </div>

      {/* VOC green banner */}
      <div
        ref={vocRef}
        style={{
          ...rev(vocVis),
          background: color.primary,
        }}
      >
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: 'clamp(24px,3vw,36px) clamp(20px,5vw,80px)',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '16px',
        }}>
          <span style={{
            fontFamily: font.familyNum,
            fontSize: '20px',
            color: 'rgba(255,255,255,0.5)',
            lineHeight: 1,
            flexShrink: 0,
            marginTop: '2px',
          }}>
            ↔
          </span>
          <p style={{
            margin: 0,
            fontFamily: font.familyKo,
            fontSize: 'clamp(14px,1.4vw,17px)',
            fontWeight: 600,
            lineHeight: 1.7,
            color: '#FFFFFF',
            wordBreak: 'keep-all',
          }}>
            {dashboard.voc}
          </p>
        </div>
      </div>
    </section>
  );
}

function DashboardBlock({ item, index }) {
  const isSecond = index === 1;
  return (
    <div style={{
      background: color.bgCard,
      borderRadius: '12px',
      boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
      overflow: 'hidden',
    }}>
      {/* Block header */}
      <div style={{
        padding: '14px 24px',
        borderBottom: `1px solid ${color.line}`,
        background: color.bgCard,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}>
        <span style={{
          fontFamily: font.familyNum,
          fontSize: '12px',
          fontWeight: 700,
          letterSpacing: '0.06em',
          color: isSecond ? color.primary : color.inkMute,
        }}>
          {item.no}
        </span>
        <span style={{
          fontFamily: font.familyNum,
          fontSize: '13px',
          fontWeight: 700,
          letterSpacing: '0.04em',
          color: isSecond ? color.primary : color.inkSub,
        }}>
          {item.title}
        </span>
      </div>

      {/* Mock visual area */}
      <div style={{
        background: color.bgSoft,
        height: '140px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {isSecond ? <DashboardMockOwner /> : <DashboardMockDB />}
      </div>

      {/* Description */}
      <div style={{ padding: '20px 24px 24px' }}>
        <p style={{
          margin: 0,
          fontFamily: font.familyKo,
          fontSize: '14px',
          lineHeight: 1.75,
          color: color.inkSub,
          wordBreak: 'keep-all',
        }}>
          {item.desc}
        </p>
      </div>
    </div>
  );
}

function DashboardMockDB() {
  const rows = ['id', 'gender', 'age', 'hair_type', 'style_pref', 'recommendation'];
  return (
    <div style={{
      fontFamily: font.familyNum,
      fontSize: '11px',
      color: color.inkMute,
      background: color.bgCard,
      borderRadius: '8px',
      border: `1px solid ${color.line}`,
      overflow: 'hidden',
      width: '80%',
    }}>
      <div style={{
        padding: '6px 12px',
        background: color.bgSoft,
        borderBottom: `1px solid ${color.line}`,
        fontWeight: 700,
        color: color.inkSub,
        letterSpacing: '0.04em',
      }}>
        n9_responses
      </div>
      {rows.map((row) => (
        <div key={row} style={{
          padding: '4px 12px',
          borderBottom: `1px solid ${color.line}`,
          display: 'flex',
          justifyContent: 'space-between',
        }}>
          <span style={{ color: color.primary }}>{row}</span>
          <span style={{ color: color.line }}>text</span>
        </div>
      ))}
    </div>
  );
}

function DashboardMockOwner() {
  const bars = [
    { label: '남성', pct: 72, val: '72%' },
    { label: '20대', pct: 58, val: '58%' },
    { label: '커트', pct: 85, val: '85%' },
  ];
  return (
    <div style={{
      width: '80%',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    }}>
      {bars.map((b) => (
        <div key={b.label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            fontFamily: font.familyKo,
            fontSize: '11px',
            color: color.inkSub,
            width: '32px',
            flexShrink: 0,
          }}>
            {b.label}
          </span>
          <div style={{
            flex: 1,
            height: '8px',
            background: 'rgba(255,255,255,0.6)',
            borderRadius: '4px',
            overflow: 'hidden',
          }}>
            <div style={{
              width: `${b.pct}%`,
              height: '100%',
              background: color.primary,
              borderRadius: '4px',
            }} />
          </div>
          <span style={{
            fontFamily: font.familyNum,
            fontSize: '11px',
            fontWeight: 700,
            color: color.primary,
            width: '28px',
            flexShrink: 0,
          }}>
            {b.val}
          </span>
        </div>
      ))}
    </div>
  );
}
