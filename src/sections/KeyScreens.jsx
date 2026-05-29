import { color, font } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import SectionHeader from '../components/SectionHeader.jsx';
import PhoneFrame from '../mini/PhoneFrame.jsx';
import HomeCoachMini from '../mini/HomeCoachMini.jsx';
import ChargeMini from '../mini/ChargeMini.jsx';
import RefundMini from '../mini/RefundMini.jsx';
import n9 from '../data/n9.json';

const { liveDemo } = n9;

const rev = (vis, delay = 0) => ({
  opacity: vis ? 1 : 0,
  transform: vis ? 'none' : 'translateY(24px)',
  transition: `opacity 0.7s ease-out ${delay}s, transform 0.7s ease-out ${delay}s`,
});

// Inline mini screens for screens without a dedicated component
function ScreenPlaceholder({ screenNo, label, isOwner }) {
  const bg = color.bg;
  const accent = isOwner ? color.primary : color.inkMute;
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: bg,
      gap: '10px',
    }}>
      <div style={{
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        background: isOwner ? color.primary : color.bgCard,
        border: `2px solid ${isOwner ? '#FFFFFF' : color.line}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <span style={{
          fontFamily: font.familyNum,
          fontSize: '16px',
          fontWeight: 700,
          color: isOwner ? '#fff' : color.inkMute,
        }}>
          {screenNo}
        </span>
      </div>
      <p style={{
        margin: 0,
        fontSize: '14px',
        fontWeight: 500,
        color: accent,
        fontFamily: font.familyKo,
        textAlign: 'center',
        padding: '0 20px',
        lineHeight: 1.5,
        wordBreak: 'keep-all',
      }}>
        {label}
      </p>
      <p style={{
        margin: 0,
        fontSize: '10px',
        color: color.inkMute,
        fontFamily: font.familyKo,
      }}>
        목업 교체 예정
      </p>
    </div>
  );
}

function getScreenContent(screen) {
  if (screen.no === '1') return <HomeCoachMini />;
  if (screen.no === '2') return <ChargeMini step={1} amount={0} balance={0} />;
  if (screen.no === '3') return <RefundMini step="list" />;
  return <ScreenPlaceholder screenNo={screen.no} label={screen.label} isOwner={!!screen.owner} />;
}

export default function KeyScreens() {
  const [headerRef, headerVis] = useReveal({ threshold: 0.1 });
  const [bodyRef,   bodyVis]   = useReveal({ threshold: 0.03 });

  return (
    <section
      id="key-screens"
      style={{
        background: color.bgCard,
        fontFamily: font.familyKo,
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(56px,6vw,88px) clamp(32px,7vw,120px)' }}>

        <div ref={headerRef} style={rev(headerVis)}>
          <SectionHeader label={liveDemo.label} headline={liveDemo.headline} />
        </div>

        {/* Horizontal scroll container */}
        <div
          ref={bodyRef}
          style={{
            ...rev(bodyVis),
            overflowX: 'auto',
            paddingBottom: '12px',
            scrollSnapType: 'x mandatory',
          }}
        >
          <div style={{
            display: 'flex',
            gap: '24px',
            width: 'max-content',
          }}>
            {liveDemo.screens.map((screen) => (
              <ScreenCard key={screen.no} screen={screen} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

function ScreenCard({ screen }) {
  const isOwner = !!screen.owner;
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '16px',
      scrollSnapAlign: 'start',
      flexShrink: 0,
    }}>
      {/* Coach mark number + label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          background: isOwner ? color.inkSub : color.primary,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <span style={{
            fontFamily: font.familyNum,
            fontSize: '12px',
            fontWeight: 700,
            color: '#FFFFFF',
          }}>
            {screen.no}
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <span style={{
            fontFamily: font.familyKo,
            fontSize: '13px',
            fontWeight: 700,
            color: color.ink,
            wordBreak: 'keep-all',
            maxWidth: '160px',
          }}>
            {screen.label}
          </span>
          {isOwner && (
            <span style={{
              fontFamily: font.familyNum,
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.06em',
              color: color.inkMute,
              textTransform: 'uppercase',
            }}>
              OWNER VIEW
            </span>
          )}
        </div>
      </div>

      {/* Phone frame */}
      <div style={{
        borderRadius: '36px',
        outline: `3px solid ${color.line}`,
        outlineOffset: '3px',
      }}>
        <PhoneFrame scale={0.5} screenHeight={620}>
          {getScreenContent(screen)}
        </PhoneFrame>
      </div>
    </div>
  );
}
