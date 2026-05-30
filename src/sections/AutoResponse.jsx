import { color, font } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import { useIsMobile } from '../lib/useIsMobile.js';
import SectionHeader from '../components/SectionHeader.jsx';
import n9 from '../data/n9.json';

const { autoResponse } = n9;

const rev = (vis, delay = 0) => ({
  opacity: vis ? 1 : 0,
  transform: vis ? 'none' : 'translateY(24px)',
  transition: `opacity 0.7s ease-out ${delay}s, transform 0.7s ease-out ${delay}s`,
});

export default function AutoResponse() {
  const isMobile = useIsMobile();
  const [headerRef,  headerVis]  = useReveal({ threshold: 0.1 });
  const [bodyRef,    bodyVis]    = useReveal({ threshold: 0.05 });
  const [resultRef,  resultVis]  = useReveal({ threshold: 0.1 });

  return (
    <section
      id="auto-response"
      style={{ background: color.bg, fontFamily: font.familyKo }}
    >
      <div>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(56px,6vw,88px) clamp(32px,7vw,120px) 0' }}>
          <div ref={headerRef} style={rev(headerVis)}>
            <SectionHeader label={autoResponse.label} headline={autoResponse.headline} />
          </div>
        </div>
      </div>

      {/* 좌: 톡톡 스크린샷 / 우: steps */}
      <div>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(32px,7vw,120px) 0' }}>
          <div
            ref={bodyRef}
            style={{
              ...rev(bodyVis),
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '360px 1fr',
              gap: 'clamp(32px,4vw,64px)',
              alignItems: 'center',
            }}
          >
            {/* 좌: 톡톡 스크린샷 */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <img
                src="/talktalk-screenshot.png"
                alt=""
                style={{
                  width: '100%',
                  maxWidth: '360px',
                  height: 'auto',
                  display: 'block',
                  borderRadius: '16px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
                }}
              />
            </div>

            {/* 우: 3단계 */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {autoResponse.steps.map((step, i) => (
                <StepRow
                  key={step.no}
                  step={step}
                  isLast={i === autoResponse.steps.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* result 그린 배너 */}
      <div
        ref={resultRef}
        style={{
          ...rev(resultVis),
          background: color.primary,
          marginTop: 'clamp(40px,5vw,64px)',
        }}
      >
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: 'clamp(40px,4vw,56px) clamp(32px,7vw,120px)',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '16px',
        }}>
          <span style={{
            fontFamily: font.familyNum,
            fontSize: '20px',
            color: '#FFFFFF',
            lineHeight: 1,
            flexShrink: 0,
            marginTop: '2px',
          }}>→</span>
          <p style={{
            margin: 0,
            fontFamily: font.familyKo,
            fontSize: 'clamp(16px,1.4vw,17px)',
            fontWeight: 500,
            lineHeight: 1.7,
            color: '#FFFFFF',
            wordBreak: 'keep-all',
          }}>
            {autoResponse.result}
          </p>
        </div>
      </div>

    </section>
  );
}

function StepRow({ step, isLast }) {
  return (
    <div style={{ display: 'flex', alignItems: 'stretch' }}>
      {/* 번호 + 세로선 */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '48px',
        flexShrink: 0,
        paddingTop: '4px',
      }}>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          background: color.primary,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <span style={{
            fontFamily: font.familyNum,
            fontSize: '14px',
            fontWeight: 700,
            color: '#FFFFFF',
          }}>
            {step.no}
          </span>
        </div>
        {!isLast && (
          <div style={{
            width: '2px',
            flex: 1,
            background: color.line,
            margin: '6px 0',
            minHeight: '32px',
          }} />
        )}
      </div>

      {/* 콘텐츠 */}
      <div style={{
        flex: 1,
        paddingLeft: '16px',
        paddingBottom: isLast ? 0 : 'clamp(24px,3vw,36px)',
        paddingTop: '4px',
      }}>
        <p style={{
          margin: '0 0 6px',
          fontFamily: font.familyKo,
          fontSize: 'clamp(16px,1.4vw,18px)',
          fontWeight: 700,
          color: color.ink,
          lineHeight: 1.45,
          wordBreak: 'keep-all',
        }}>
          {step.main}
        </p>
        <p style={{
          margin: 0,
          fontFamily: font.familyKo,
          fontSize: '15px',
          fontWeight: 500,
          lineHeight: 1.65,
          color: color.inkMute,
          wordBreak: 'keep-all',
        }}>
          {step.sub}
        </p>
      </div>
    </div>
  );
}
