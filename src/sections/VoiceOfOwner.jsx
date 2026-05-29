import { color, font } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import { useIsMobile } from '../lib/useIsMobile.js';
import SectionHeader from '../components/SectionHeader.jsx';
import n9 from '../data/n9.json';

const { voice } = n9;

const rev = (vis, delay = 0) => ({
  opacity: vis ? 1 : 0,
  transform: vis ? 'none' : 'translateY(24px)',
  transition: `opacity 0.7s ease-out ${delay}s, transform 0.7s ease-out ${delay}s`,
});

export default function VoiceOfOwner() {
  const isMobile = useIsMobile();
  const [headerRef, headerVis] = useReveal({ threshold: 0.1 });
  const [bodyRef,   bodyVis]   = useReveal({ threshold: 0.05 });

  return (
    <section
      id="voice-of-owner"
      style={{
        background: color.bg,
        fontFamily: font.familyKo,
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: 'clamp(56px,6vw,88px) clamp(32px,7vw,120px)',
      }}>

        {/* 헤더 */}
        <div ref={headerRef} style={{ ...rev(headerVis), marginBottom: 'clamp(32px,4vw,48px)' }}>
          <SectionHeader label={voice.label} headline={voice.headline} />
        </div>

        {/* 2-column: 사진+오디오 / 발화 카드 3개 */}
        <div
          ref={bodyRef}
          style={{
            ...rev(bodyVis, 0.1),
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: 'clamp(32px,4vw,56px)',
            alignItems: 'start',
          }}
        >

          {/* 좌측: 사진 placeholder + 오디오 + 날짜 */}
          <div>
            <div style={{
              background: color.bgCard,
              borderRadius: '12px',
              border: `1px solid ${color.line}`,
              aspectRatio: '4 / 3',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px',
            }}>
              <span style={{
                fontFamily: font.familyKo,
                fontSize: '12px',
                color: color.inkMute,
              }}>
                사장님 사진 교체 예정
              </span>
            </div>

            <audio
              controls
              src={voice.audioFile}
              style={{
                width: '100%',
                display: 'block',
                accentColor: color.primary,
                marginBottom: '10px',
              }}
            />

            <p style={{
              margin: 0,
              fontFamily: font.familyNum,
              fontSize: '13px',
              fontWeight: 500,
              color: color.inkMute,
              letterSpacing: '0.02em',
            }}>
              {voice.audioNote}
            </p>
          </div>

          {/* 우측: 발화 카드 3개 + 화자 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {voice.quotes.map((q, i) => (
              <div
                key={i}
                style={{
                  background: color.bgCard,
                  borderRadius: '12px',
                  border: `1px solid ${color.line}`,
                  padding: '20px 24px',
                }}
              >
                <p style={{
                  margin: 0,
                  fontFamily: font.familyKo,
                  fontSize: 'clamp(15px,1.3vw,17px)',
                  fontWeight: 500,
                  lineHeight: 1.75,
                  color: color.ink,
                  wordBreak: 'keep-all',
                }}>
                  {q}
                </p>
              </div>
            ))}

            <p style={{
              margin: '4px 0 0',
              fontFamily: font.familyNum,
              fontSize: '14px',
              fontWeight: 700,
              letterSpacing: '0.04em',
              color: color.primary,
            }}>
              {voice.speaker}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
