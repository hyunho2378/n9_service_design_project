import { color, font } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import { useIsMobile } from '../lib/useIsMobile.js';
import SectionHeader from '../components/SectionHeader.jsx';
import n9 from '../data/n9.json';

const { naver } = n9;

const rev = (vis, delay = 0) => ({
  opacity: vis ? 1 : 0,
  transform: vis ? 'none' : 'translateY(24px)',
  transition: `opacity 0.7s ease-out ${delay}s, transform 0.7s ease-out ${delay}s`,
});

// As-Is: 비활성 상태 항목들 (naver.tobe 적용 전)
const AS_IS_ITEMS = [
  '사진 없음',
  '네이버 예약 비활성',
  '톡톡 미운영',
  '스마트콜 미등록',
  '가격표 미기재',
  '공지 없음',
];

export default function NaverEcosystem() {
  const isMobile = useIsMobile();
  const [headerRef, headerVis] = useReveal({ threshold: 0.1 });
  const [compareRef, compareVis] = useReveal({ threshold: 0.05 });
  const [mockRef, mockVis] = useReveal({ threshold: 0.05 });

  return (
    <section
      id="naver-ecosystem"
      style={{
        background: color.bgCard,
        fontFamily: font.familyKo,
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(56px,6vw,88px) clamp(32px,7vw,120px)' }}>

        <div ref={headerRef} style={rev(headerVis)}>
          <SectionHeader label={naver.label} headline={naver.headline} />
        </div>

        {/* As-Is / To-Be 대비 + 플레이스 목업 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr',
            gap: '24px',
            alignItems: 'start',
          }}
        >
          {/* As-Is */}
          <div ref={compareRef} style={rev(compareVis)}>
            <div style={{
              background: color.bg,
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
            }}>
              <div style={{
                padding: '14px 20px',
                borderBottom: `1px solid ${color.line}`,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <span style={{
                  width: '8px', height: '8px', borderRadius: '50%',
                  background: '#E5484D', flexShrink: 0,
                }} />
                <span style={{
                  fontFamily: font.familyNum,
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  color: color.inkMute,
                }}>
                  AS-IS
                </span>
              </div>
              <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {AS_IS_ITEMS.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      width: '16px', height: '16px', borderRadius: '50%',
                      border: `1.5px solid ${color.line}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <span style={{ fontSize: '8px', color: color.inkMute }}>✕</span>
                    </span>
                    <span style={{
                      fontFamily: font.familyKo,
                      fontSize: '13px',
                      color: color.inkMute,
                      textDecoration: 'line-through',
                      textDecorationColor: color.line,
                    }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 네이버 플레이스 목업 placeholder */}
          <div ref={mockRef} style={rev(mockVis, 0.1)}>
            <div style={{
              background: color.bg,
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
              border: `1px solid ${color.line}`,
            }}>
              {/* 브라우저 주소바 */}
              <div style={{
                background: color.bgSoft,
                padding: '8px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                borderBottom: `1px solid ${color.line}`,
              }}>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {['#FF5F57','#FEBC2E','#28C840'].map((c, i) => (
                    <span key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: c }} />
                  ))}
                </div>
                <div style={{
                  flex: 1,
                  background: color.bgCard,
                  borderRadius: '4px',
                  padding: '3px 10px',
                  fontFamily: font.familyNum,
                  fontSize: '10px',
                  color: color.inkMute,
                }}>
                  map.naver.com  N°9 넘버나인
                </div>
              </div>
              {/* 플레이스 콘텐츠 */}
              <div style={{ padding: '16px' }}>
                {/* 대표 사진 placeholder */}
                <div style={{
                  height: '100px',
                  background: color.bgSoft,
                  borderRadius: '8px',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {/* TODO: 실제 매장 대표 사진으로 교체 */}
                  <span style={{ fontFamily: font.familyKo, fontSize: '11px', color: color.inkMute }}>
                    매장 사진 교체 예정
                  </span>
                </div>
                <p style={{
                  margin: '0 0 6px',
                  fontFamily: font.familyKo,
                  fontSize: '14px',
                  fontWeight: 700,
                  color: color.ink,
                }}>
                  N°9 넘버나인
                </p>
                <p style={{
                  margin: '0 0 10px',
                  fontFamily: font.familyKo,
                  fontSize: '12px',
                  color: color.inkMute,
                }}>
                  헤어살롱, 춘천시 후평동
                </p>
                {/* 버튼 */}
                <div style={{ display: 'flex', gap: '6px' }}>
                  {['예약', '톡톡', '전화'].map((btn) => (
                    <div key={btn} style={{
                      flex: 1,
                      padding: '6px 0',
                      background: color.bgSoft,
                      borderRadius: '6px',
                      textAlign: 'center',
                      fontFamily: font.familyKo,
                      fontSize: '11px',
                      fontWeight: 600,
                      color: color.primary,
                    }}>
                      {btn}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* To-Be */}
          <div style={rev(compareVis, 0.15)}>
            <div style={{
              background: color.bg,
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
            }}>
              <div style={{
                padding: '14px 20px',
                background: color.bgSoft,
                borderBottom: `1px solid ${color.line}`,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <span style={{
                  width: '8px', height: '8px', borderRadius: '50%',
                  background: color.primary, flexShrink: 0,
                }} />
                <span style={{
                  fontFamily: font.familyNum,
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  color: color.primary,
                }}>
                  TO-BE
                </span>
              </div>
              <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {naver.tobe.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <span style={{
                      width: '16px', height: '16px', borderRadius: '50%',
                      background: color.bgSoft,
                      border: `1.5px solid ${color.primary}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, marginTop: '1px',
                    }}>
                      <span style={{ fontSize: '8px', color: color.primary, fontWeight: 700 }}>✓</span>
                    </span>
                    <span style={{
                      fontFamily: font.familyKo,
                      fontSize: '13px',
                      lineHeight: 1.55,
                      color: color.ink,
                    }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
