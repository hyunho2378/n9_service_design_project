import { useState } from 'react';
import { color, font } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import SectionHeader from '../components/SectionHeader.jsx';
import n9 from '../data/n9.json';
import { useIsMobile } from '../lib/useIsMobile.js';

const { impact } = n9;

const rev = (vis, delay = 0) => ({
  opacity: vis ? 1 : 0,
  transform: vis ? 'none' : 'translateY(24px)',
  transition: `opacity 0.7s ease-out ${delay}s, transform 0.7s ease-out ${delay}s`,
});

export default function Impact() {
  const isMobile = useIsMobile();
  const [headerRef,   headerVis]   = useReveal({ threshold: 0.1 });
  const [stagesRef,   stagesVis]   = useReveal({ threshold: 0.05 });
  const [reasonsRef,  reasonsVis]  = useReveal({ threshold: 0.05 });
  const [expansionRef, expansionVis] = useReveal({ threshold: 0.08 });
  const [proofRef,     proofVis]     = useReveal({ threshold: 0.05 });

  return (
    <section
      id="impact"
      style={{ background: color.bgCard, fontFamily: font.familyKo }}
    >
      <div>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(56px,6vw,88px) clamp(32px,7vw,120px) 0' }}>

          <div ref={headerRef} style={rev(headerVis)}>
            <SectionHeader label={impact.label} headline={impact.headline} />
          </div>

          {/* 3 stage cards */}
          <div
            ref={stagesRef}
            style={{
              ...rev(stagesVis),
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: '20px',
              marginBottom: 'clamp(24px,3vw,40px)',
            }}
          >
            {impact.stages.map((stage, i) => (
              <StageCard key={stage.stage} stage={stage} index={i} />
            ))}
          </div>

          {/* Scale label + reasons */}
          <div ref={reasonsRef} style={{ ...rev(reasonsVis), marginBottom: 'clamp(32px,4vw,56px)' }}>
            <p style={{
              margin: '0 0 24px',
              fontFamily: font.familyNum,
              fontSize: '14px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: color.primary,
            }}>
              {impact.scaleLabel}
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: '20px',
            }}>
              {impact.scaleReasons.map((reason) => (
                <ReasonCard key={reason.no} reason={reason} />
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* 확산 & 사회적 가치 — 통합 블록 */}
      <div
        ref={expansionRef}
        style={{
          ...rev(expansionVis),
          background: '#0A0A0A',
        }}
      >
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: 'clamp(56px,6vw,88px) clamp(32px,7vw,120px)',
        }}>

          {/* 헤더 */}
          <p style={{
            margin: '0 0 16px',
            fontFamily: font.familyNum,
            fontSize: '14px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: color.primary,
          }}>
            {impact.expansionLabel}
          </p>
          <h2 style={{
            margin: '0 0 clamp(32px,4vw,48px)',
            fontFamily: font.familyKo,
            fontSize: 'clamp(26px,3.4vw,40px)',
            fontWeight: 800,
            lineHeight: 1.25,
            letterSpacing: '-0.02em',
            color: '#FFFFFF',
            wordBreak: 'keep-all',
          }}>
            {impact.expansionHeadline}
          </h2>

          {/* marketDemand — 그린 카드 */}
          <div style={{
            background: color.primary,
            borderRadius: '12px',
            padding: 'clamp(28px,3vw,40px) clamp(24px,3vw,36px)',
            marginBottom: 'clamp(28px,3vw,40px)',
          }}>
            <p style={{
              margin: 0,
              fontFamily: font.familyKo,
              fontSize: 'clamp(16px,1.6vw,22px)',
              fontWeight: 500,
              lineHeight: 1.8,
              color: '#FFFFFF',
              wordBreak: 'keep-all',
              whiteSpace: isMobile ? 'pre-line' : undefined,
            }}>
              {isMobile ? impact.marketDemand : renderMarketDemand(impact.marketDemand)}
            </p>
          </div>

          {/* socialValue — 마무리 문장 */}
          <p style={{
            margin: '0 0 12px',
            fontFamily: font.familyNum,
            fontSize: '14px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: color.primary,
          }}>
            사회적 가치
          </p>
          <p style={{
            margin: 0,
            fontFamily: font.familyKo,
            fontSize: 'clamp(18px,2vw,28px)',
            fontWeight: 700,
            lineHeight: 1.8,
            color: '#FFFFFF',
            wordBreak: 'keep-all',
            whiteSpace: 'pre-line',
          }}>
            {'넘버나인의 솔루션은 미용실 한 곳에 그치지 않고,\n'}
            <span style={{ color: color.primary }}>{'후평동 상권 전체의 업종 무관 시니어 자영업자에게 확장 가능한 사회적 가치'}</span>
            {'를 보여줍니다.'}
          </p>

        </div>
      </div>

      {/* 확산 실증 — Expansion in Action */}
      <div ref={proofRef} style={{ ...rev(proofVis), background: color.bg }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: 'clamp(56px,6vw,88px) clamp(32px,7vw,120px)',
        }}>

          {/* 헤더 */}
          <p style={{
            margin: '0 0 10px',
            fontFamily: font.familyNum,
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: color.primary,
          }}>
            {impact.expansionProof.label}
          </p>
          <h2 style={{
            margin: '0 0 clamp(32px,4vw,48px)',
            fontFamily: font.familyKo,
            fontSize: 'clamp(20px,2.5vw,31px)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: color.ink,
            wordBreak: 'keep-all',
          }}>
            {impact.expansionProof.headline}
          </h2>

          {/* 카드 2개 + 화살표 */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 52px 1fr',
            alignItems: 'stretch',
            gap: isMobile ? '16px' : '0',
            marginBottom: 'clamp(40px,5vw,56px)',
          }}>
            <ProofCard card={impact.expansionProof.cards[0]} imgSrc="/store-n9.jpg" imgLabel="store-n9.jpg 교체 예정" />
            {!isMobile && (
              <div style={{ display: 'flex', justifyContent: 'center', alignSelf: 'center' }}>
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 13h18M15 6l7 7-7 7" stroke={color.primary} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}
            <ProofCard card={impact.expansionProof.cards[1]} imgSrc="/store-hogam.jpg" imgLabel="store-hogam.jpg 교체 예정" />
          </div>

          {/* note */}
          <div style={{
            borderTop: `1px solid ${color.line}`,
            paddingTop: 'clamp(24px,3vw,32px)',
            textAlign: 'center',
          }}>
            <p style={{
              margin: 0,
              fontFamily: font.familyKo,
              fontSize: 'clamp(15px,1.4vw,18px)',
              fontWeight: 700,
              lineHeight: 1.85,
              color: color.inkSub,
              wordBreak: 'keep-all',
            }}>
              {impact.expansionProof.note}
            </p>
          </div>

        </div>
      </div>

    </section>
  );
}

function StageCard({ stage, index }) {
  const { highlight } = stage;
  const isFirst = index === 0;
  return (
    <div style={{
      background: highlight ? color.primary : color.bg,
      borderRadius: '12px',
      border: highlight ? 'none' : '1px solid #0A0A0A',
      boxShadow: highlight
        ? '0 8px 32px rgba(2,199,90,0.2)'
        : '0 4px 24px rgba(0,0,0,0.06)',
      padding: '24px 24px 28px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    }}>
      <span style={{
        fontFamily: font.familyNum,
        fontSize: '11px',
        fontWeight: 700,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: isFirst
          ? color.primary
          : highlight ? '#FFFFFF' : color.inkMute,
        display: 'inline-block',
      }}>
        {stage.stage}
      </span>
      <h3 style={{
        margin: 0,
        fontFamily: font.familyKo,
        fontSize: 'clamp(16px,1.5vw,20px)',
        fontWeight: 700,
        color: highlight ? '#FFFFFF' : color.ink,
        lineHeight: 1.3,
      }}>
        {stage.title}
      </h3>
      <span style={{
        fontFamily: font.familyKo,
        fontSize: '12px',
        color: highlight ? '#FFFFFF' : color.inkMute,
        display: 'inline-block',
      }}>
        {stage.tag}
      </span>
      <p style={{
        margin: '4px 0 0',
        fontFamily: font.familyKo,
        fontSize: '15px',
        fontWeight: 500,
        lineHeight: 1.7,
        color: highlight ? '#FFFFFF' : color.inkSub,
        wordBreak: 'keep-all',
      }}>
        {stage.desc}
      </p>
    </div>
  );
}

function StoreImage({ src, label }) {
  const [failed, setFailed] = useState(false);
  return (
    <div style={{
      width: '100%',
      aspectRatio: '16 / 9',
      background: '#F2F2F0',
      position: 'relative',
      overflow: 'hidden',
      flexShrink: 0,
    }}>
      {!failed ? (
        <img
          src={src}
          alt=""
          onError={() => setFailed(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      ) : (
        <span style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: font.familyKo,
          fontSize: '11px',
          color: '#AAAAAA',
          whiteSpace: 'nowrap',
        }}>
          {label}
        </span>
      )}
    </div>
  );
}

function ProofCard({ card, imgSrc, imgLabel }) {
  const { no, store, tag, desc, highlight, naverUrl } = card;
  const parts = store.split(' / ');
  const storeName = parts.length > 1 ? parts[0] : null;
  const storeLocation = parts.length > 1 ? parts[1] : store;

  return (
    <div style={{
      background: highlight ? color.primary : color.bgCard,
      border: highlight ? 'none' : `1px solid ${color.line}`,
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: highlight
        ? '0 8px 32px rgba(2,199,90,0.28)'
        : '0 4px 24px rgba(0,0,0,0.06)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    }}>
      <StoreImage src={imgSrc} label={imgLabel} />
      <div style={{
        padding: 'clamp(28px,3vw,44px) clamp(28px,3vw,40px) clamp(32px,3.5vw,48px)',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
      }}>
        <span style={{
          display: 'block',
          fontFamily: font.familyNum,
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.1em',
          color: highlight ? 'rgba(255,255,255,0.65)' : color.inkMute,
          marginBottom: '10px',
        }}>
          {no}
        </span>
        {storeName && (
          <span style={{
            display: 'block',
            fontFamily: font.familyKo,
            fontSize: '13px',
            fontWeight: 600,
            color: highlight ? 'rgba(255,255,255,0.65)' : color.inkMute,
            marginBottom: '8px',
            letterSpacing: '-0.01em',
          }}>
            {storeName}
          </span>
        )}
        <h3 style={{
          margin: '0 0 16px',
          fontFamily: font.familyKo,
          fontSize: 'clamp(22px,2.2vw,32px)',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          color: highlight ? '#FFFFFF' : color.ink,
          lineHeight: 1.2,
          wordBreak: 'keep-all',
        }}>
          {storeLocation}
        </h3>
        <span style={{
          display: 'inline-block',
          alignSelf: 'flex-start',
          fontFamily: font.familyKo,
          fontSize: '11px',
          fontWeight: 700,
          color: highlight ? '#FFFFFF' : color.inkSub,
          background: highlight ? 'rgba(255,255,255,0.20)' : color.bg,
          borderRadius: '6px',
          padding: '4px 10px',
          marginBottom: '20px',
          letterSpacing: '0.01em',
        }}>
          {tag}
        </span>
        <p style={{
          margin: 0,
          fontFamily: font.familyKo,
          fontSize: '15px',
          fontWeight: 500,
          lineHeight: 1.8,
          color: highlight ? 'rgba(255,255,255,0.88)' : color.inkSub,
          wordBreak: 'keep-all',
        }}>
          {desc}
        </p>
        {naverUrl && (
          <div style={{ marginTop: 'auto', paddingTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
            <PlaceButton href={naverUrl} highlight={highlight} />
          </div>
        )}
      </div>
    </div>
  );
}

function PlaceButton({ href, highlight }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        fontFamily: font.familyKo,
        fontSize: '13px',
        fontWeight: 700,
        textDecoration: 'none',
        padding: '9px 16px',
        borderRadius: '8px',
        border: highlight
          ? '1px solid rgba(255,255,255,0.7)'
          : `1px solid ${color.primary}`,
        color: highlight
          ? '#FFFFFF'
          : (hovered ? '#FFFFFF' : color.primary),
        background: highlight
          ? (hovered ? 'rgba(255,255,255,0.18)' : 'transparent')
          : (hovered ? color.primary : 'transparent'),
        transform: hovered ? 'translateY(-1px)' : 'translateY(0)',
        boxShadow: hovered
          ? (highlight
            ? '0 4px 12px rgba(255,255,255,0.15)'
            : '0 4px 12px rgba(2,199,90,0.3)')
          : 'none',
        transition: 'background 0.15s ease-out, color 0.15s ease-out, transform 0.15s ease-out, box-shadow 0.15s ease-out',
      }}
    >
      네이버 플레이스
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <path d="M2 6.5h9M8 3l3.5 3.5L8 10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </a>
  );
}

function renderMarketDemand(text) {
  const [p1, p2] = text.split('\n\n');
  const brk1 = '미용실 한 곳을 넘어 ';
  const brk2 = '교육자로 직접 참여해 달라는 요청을 받아, ';
  const [a1, b1] = p1.split(brk1);
  const [a2, b2] = p2.split(brk2);
  return (
    <>
      {a1}{brk1}<br />{b1}
      <br /><br />
      {a2}{brk2}<br />{b2}
    </>
  );
}

function ReasonCard({ reason }) {
  return (
    <div style={{ padding: '0 0 8px' }}>
      <span style={{
        fontFamily: font.familyNum,
        fontSize: '13px',
        fontWeight: 700,
        color: color.primary,
        display: 'block',
        marginBottom: '8px',
      }}>
        {reason.no}
      </span>
      <h4 style={{
        margin: '0 0 10px',
        fontFamily: font.familyKo,
        fontSize: '18px',
        fontWeight: 700,
        color: color.ink,
      }}>
        {reason.title}
      </h4>
      <p style={{
        margin: 0,
        fontFamily: font.familyKo,
        fontSize: '15px',
        fontWeight: 500,
        lineHeight: 1.7,
        color: color.inkSub,
        wordBreak: 'keep-all',
      }}>
        {reason.desc}
      </p>
    </div>
  );
}
