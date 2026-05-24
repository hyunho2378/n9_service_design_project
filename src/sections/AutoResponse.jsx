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
      <div style={{ padding: 'clamp(64px,8vw,120px) clamp(20px,5vw,80px) 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div ref={headerRef} style={rev(headerVis)}>
            <SectionHeader label={autoResponse.label} headline={autoResponse.headline} />
          </div>
        </div>
      </div>

      {/* 좌: 톡톡 목업 / 우: steps */}
      <div style={{ padding: '0 clamp(20px,5vw,80px) 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div
            ref={bodyRef}
            style={{
              ...rev(bodyVis),
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1.4fr',
              gap: 'clamp(32px,4vw,64px)',
              alignItems: 'center',
              marginBottom: '0',
            }}
          >
            {/* 좌: 톡톡 화면 placeholder */}
            <TalktalkMock />

            {/* 우: 3단계 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {autoResponse.steps.map((step, i) => (
                <StepRow
                  key={step.no}
                  step={step}
                  index={i}
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
          }}>→</span>
          <p style={{
            margin: 0,
            fontFamily: font.familyKo,
            fontSize: 'clamp(14px,1.4vw,17px)',
            fontWeight: 600,
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

// 네이버 톡톡 채팅 화면 placeholder
function TalktalkMock() {
  return (
    <div style={{
      background: color.bgCard,
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
      border: `1px solid ${color.line}`,
    }}>
      {/* 톡톡 상단 바 */}
      <div style={{
        background: '#03C75A',
        padding: '14px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}>
        <div style={{
          width: '32px', height: '32px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <span style={{ fontFamily: font.familyNum, fontSize: '11px', fontWeight: 700, color: '#fff' }}>N9</span>
        </div>
        <div>
          <p style={{ margin: 0, fontFamily: font.familyKo, fontSize: '13px', fontWeight: 700, color: '#fff' }}>
            N°9 넘버나인
          </p>
          <p style={{ margin: 0, fontFamily: font.familyKo, fontSize: '11px', color: 'rgba(255,255,255,0.75)' }}>
            응답시간 0분
          </p>
        </div>
      </div>

      {/* 채팅 영역 */}
      <div style={{
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        background: '#F0F0F0',
        minHeight: '260px',
      }}>
        {/* 손님 메시지 */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{
            background: '#FEE500',
            borderRadius: '12px 12px 2px 12px',
            padding: '8px 12px',
            maxWidth: '70%',
          }}>
            <p style={{ margin: 0, fontFamily: font.familyKo, fontSize: '13px', color: '#333' }}>
              안녕하세요, 예약 문의드려요
            </p>
          </div>
        </div>

        {/* 자동 응답 메시지 */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
          <div style={{
            width: '28px', height: '28px', borderRadius: '50%',
            background: '#03C75A',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <span style={{ fontFamily: font.familyNum, fontSize: '9px', fontWeight: 700, color: '#fff' }}>N9</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxWidth: '78%' }}>
            <div style={{
              background: '#fff',
              borderRadius: '2px 12px 12px 12px',
              padding: '10px 12px',
            }}>
              <p style={{ margin: 0, fontFamily: font.familyKo, fontSize: '12px', color: '#333', lineHeight: 1.6 }}>
                안녕하세요! N°9 넘버나인입니다 😊<br />
                AI 맞춤 진단으로 내게 딱 맞는 스타일을 먼저 확인해 보세요!
              </p>
            </div>
            {/* AI 링크 버튼 */}
            <div style={{
              background: '#fff',
              borderRadius: '2px 12px 12px 12px',
              padding: '10px 12px',
              border: `1.5px solid ${color.primary}`,
            }}>
              <p style={{
                margin: 0,
                fontFamily: font.familyKo,
                fontSize: '12px',
                fontWeight: 700,
                color: color.primary,
              }}>
                👉 AI 진단 바로가기 →
              </p>
            </div>
            <p style={{
              margin: 0,
              fontFamily: font.familyKo,
              fontSize: '10px',
              color: '#999',
              paddingLeft: '4px',
            }}>
              자동응답 · 방금
            </p>
          </div>
        </div>
      </div>

      {/* 입력창 */}
      <div style={{
        padding: '10px 12px',
        borderTop: `1px solid ${color.line}`,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: color.bgCard,
      }}>
        <div style={{
          flex: 1,
          background: color.bg,
          borderRadius: '20px',
          padding: '8px 14px',
          fontFamily: font.familyKo,
          fontSize: '12px',
          color: color.inkMute,
        }}>
          메시지를 입력하세요
        </div>
        <div style={{
          width: '32px', height: '32px', borderRadius: '50%',
          background: color.primary,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ color: '#fff', fontSize: '14px' }}>↑</span>
        </div>
      </div>
    </div>
  );
}

function StepRow({ step, index, isLast }) {
  return (
    <div style={{ display: 'flex', alignItems: 'stretch', gap: '0' }}>
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
          zIndex: 1,
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
            background: color.primarySoft,
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
          fontSize: 'clamp(14px,1.3vw,16px)',
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
          fontSize: '13px',
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
