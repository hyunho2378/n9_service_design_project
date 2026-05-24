import { color, font } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import { useIsMobile } from '../lib/useIsMobile.js';
import SectionHeader from '../components/SectionHeader.jsx';
import n9 from '../data/n9.json';

const { architecture } = n9;

export default function Architecture() {
  const isMobile = useIsMobile();
  const [headerRef, headerVis] = useReveal({ threshold: 0.1 });
  const [layersRef, layersVis] = useReveal({ threshold: 0.05 });
  const [flowRef,   flowVis]   = useReveal({ threshold: 0.1 });

  return (
    <section
      id="architecture"
      style={{
        background: color.bg,
        fontFamily: font.familyKo,
        padding: 'clamp(64px,8vw,120px) clamp(20px,5vw,80px)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <div ref={headerRef} style={rev(headerVis)}>
          <SectionHeader label={architecture.label} headline={architecture.headline} />
        </div>

        {/* 레이어 카드 3개 가로 */}
        <div
          ref={layersRef}
          style={{
            ...rev(layersVis),
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '24px',
            marginBottom: 'clamp(40px,5vw,64px)',
          }}
        >
          {architecture.layers.map((layer, i) => (
            <LayerCard key={i} layer={layer} index={i} />
          ))}
        </div>

        {/* 하단 flow 텍스트 */}
        <div
          ref={flowRef}
          style={{
            ...rev(flowVis),
            background: color.bgCard,
            borderRadius: '12px',
            padding: 'clamp(20px,2.5vw,28px) clamp(24px,3vw,40px)',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
          }}
        >
          <span style={{
            fontFamily: font.familyNum,
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: color.inkMute,
            flexShrink: 0,
          }}>
            Flow
          </span>
          <div style={{ width: '1px', height: '20px', background: color.line, flexShrink: 0 }} />
          <p style={{
            margin: 0,
            fontFamily: font.familyKo,
            fontSize: 'clamp(14px,1.3vw,16px)',
            fontWeight: 600,
            color: color.inkSub,
            wordBreak: 'keep-all',
          }}>
            {architecture.flow}
          </p>
        </div>

      </div>
    </section>
  );
}

function LayerCard({ layer, index }) {
  const isHighlight = !!layer.highlight;

  return (
    <div style={{
      background: isHighlight ? color.primary : color.bgCard,
      borderRadius: '12px',
      boxShadow: isHighlight
        ? '0 8px 32px rgba(2,199,90,0.20)'
        : '0 4px 24px rgba(0,0,0,0.06)',
      padding: '28px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '0',
    }}>
      {/* 레이어 번호 */}
      <span style={{
        fontFamily: font.familyNum,
        fontSize: '11px',
        fontWeight: 700,
        letterSpacing: '0.08em',
        color: isHighlight ? 'rgba(255,255,255,0.55)' : color.inkMute,
        display: 'block',
        marginBottom: '12px',
      }}>
        LAYER {String(index + 1).padStart(2, '0')}
      </span>

      {/* 영문명 */}
      <h3 style={{
        margin: '0 0 4px',
        fontFamily: font.familyNum,
        fontSize: 'clamp(14px,1.3vw,16px)',
        fontWeight: 700,
        color: isHighlight ? '#FFFFFF' : color.ink,
        letterSpacing: '-0.01em',
      }}>
        {layer.en}
      </h3>

      {/* 국문명 */}
      <p style={{
        margin: '0 0 20px',
        fontFamily: font.familyKo,
        fontSize: '13px',
        color: isHighlight ? 'rgba(255,255,255,0.7)' : color.inkMute,
      }}>
        {layer.ko}
      </p>

      {/* 구분선 */}
      <div style={{
        height: '1px',
        background: isHighlight ? 'rgba(255,255,255,0.2)' : color.line,
        marginBottom: '20px',
      }} />

      {/* 항목 리스트 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
        {layer.items.map((item, j) => (
          <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
            <span style={{
              fontFamily: font.familyNum,
              fontSize: '12px',
              color: isHighlight ? 'rgba(255,255,255,0.5)' : color.primary,
              flexShrink: 0,
              lineHeight: 1.6,
            }}>
              ·
            </span>
            <span style={{
              fontFamily: font.familyKo,
              fontSize: '13px',
              lineHeight: 1.6,
              color: isHighlight ? 'rgba(255,255,255,0.85)' : color.inkSub,
              wordBreak: 'keep-all',
            }}>
              {item}
            </span>
          </div>
        ))}
      </div>

      {/* 태그 */}
      <div style={{ marginTop: '20px' }}>
        <span style={{
          fontFamily: font.familyKo,
          fontSize: '11px',
          fontWeight: 600,
          color: isHighlight ? 'rgba(255,255,255,0.65)' : color.inkMute,
          background: isHighlight ? 'rgba(255,255,255,0.15)' : color.bgSoft,
          borderRadius: '6px',
          padding: '4px 10px',
        }}>
          {layer.tag}
        </span>
      </div>
    </div>
  );
}

const rev = (vis) => ({
  opacity: vis ? 1 : 0,
  transform: vis ? 'none' : 'translateY(24px)',
  transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
});
