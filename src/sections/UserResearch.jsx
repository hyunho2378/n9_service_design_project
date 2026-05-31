import { color, font } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import { useCountUp } from '../lib/useCountUp.js';
import { useIsMobile } from '../lib/useIsMobile.js';
import SectionHeader from '../components/SectionHeader.jsx';
import BarChart from '../components/BarChart.jsx';
import QuoteCard from '../components/QuoteCard.jsx';
import ur from '../data/userResearch.json';

const SEC = 'clamp(32px,4vw,56px) clamp(32px,7vw,120px)';
const W   = '1200px';
const rev = (vis, delay = 0) => ({
  opacity: vis ? 1 : 0,
  transform: vis ? 'none' : 'translateY(24px)',
  transition: `opacity 0.7s ease-out ${delay}s, transform 0.7s ease-out ${delay}s`,
});

export default function UserResearch() {
  const isMobile = useIsMobile();
  // ── reveal hooks (선언 순서 고정) ──
  const [introRef,      introVis]      = useReveal({ threshold: 0.05 });
  const [respondRef,    respondVis]    = useReveal({ threshold: 0.08 });
  const [metricsRef,    metricsVis]    = useReveal({ threshold: 0.05 });
  const [chartsRef,     chartsVis]     = useReveal({ threshold: 0.05 });
  const [profilesRef,   profilesVis]   = useReveal({ threshold: 0.05 });
  const [themesRef,     themesVis]     = useReveal({ threshold: 0.05 });
  const [quotesRef,     quotesVis]     = useReveal({ threshold: 0.03 });
  const [convergedRef,  convergedVis]  = useReveal({ threshold: 0.05 });
  const [divergedRef]                  = useReveal({ threshold: 0.05 }); // 훅 순서 유지
  const [surprisingRef]                = useReveal({ threshold: 0.05 }); // 훅 순서 유지
  const [solutionRef,   solutionVis]   = useReveal({ threshold: 0.05 });

  // ── 응답자 카운터 4개 ──
  const [r0ref, r0] = useCountUp(ur.survey.respondents[0].n, 1400);
  const [r1ref, r1] = useCountUp(ur.survey.respondents[1].n, 1200);
  const [r2ref, r2] = useCountUp(ur.survey.respondents[2].n, 1100);
  const [r3ref, r3] = useCountUp(ur.survey.respondents[3].n, 1000);
  const rRefs = [[r0ref, r0], [r1ref, r1], [r2ref, r2], [r3ref, r3]];

  // suppress unused ref warning
  void divergedRef; void surprisingRef;

  return (
    <section id="user-research" style={{ fontFamily: font.familyKo }}>

      {/* ━━ 01 인트로 ━━ */}
      <div style={{ background: color.bgCard }}>
        <div style={{ maxWidth: W, margin: '0 auto', padding: SEC }}>
          <div ref={introRef} style={rev(introVis)}>
            <SectionHeader label={ur.meta.label} headline={ur.meta.headline} />
            <div style={{
              display: 'flex',
              gap: 'clamp(24px,4vw,48px)',
              flexWrap: 'wrap',
              marginBottom: '16px',
            }}>
              <MetaChip label="기간" value={ur.meta.period} />
              <MetaChip label="방법론" value={ur.meta.method} />
            </div>
            <div style={{
              background: color.bg,
              borderRadius: '8px',
              padding: '14px 20px',
              maxWidth: '720px',
            }}>
              <p style={{
                margin: 0,
                fontFamily: font.familyKo,
                fontSize: '14px',
                lineHeight: 1.75,
                color: color.inkSub,
                wordBreak: 'keep-all',
              }}>
                <span style={{ fontWeight: 700, color: color.ink }}>대상 정의 </span>
                {ur.meta.targetDef}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ━━ 02 정량 · Survey ━━ */}
      <div style={{ background: color.bg }}>
        <div style={{ maxWidth: W, margin: '0 auto', padding: 'clamp(32px,2.5vw,36px) clamp(32px,7vw,120px)' }}>

          <p style={{
            fontFamily: font.familyNum,
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: color.primary,
            margin: '0 0 20px',
          }}>
            {ur.survey.label}
          </p>

          {/* 응답자 카운터 4칸 */}
          <div
            ref={respondRef}
            style={{
              ...rev(respondVis),
              display: 'grid',
              gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
              gap: '10px',
              marginBottom: '12px',
            }}
          >
            {ur.survey.respondents.map((r, i) => (
              <div
                key={i}
                ref={rRefs[i][0]}
                style={{
                  background: i === 0 ? color.primary : color.bgCard,
                  borderRadius: '10px',
                  padding: '10px 10px',
                  textAlign: 'center',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                }}
              >
                <span style={{
                  display: 'block',
                  fontFamily: font.familyNum,
                  fontSize: 'clamp(22px,2.8vw,32px)',
                  fontWeight: 800,
                  lineHeight: 1,
                  letterSpacing: '-0.04em',
                  color: i === 0 ? '#FFFFFF' : color.primary,
                  marginBottom: '4px',
                }}>
                  {rRefs[i][1]}
                </span>
                <span style={{
                  display: 'block',
                  fontFamily: font.familyKo,
                  fontSize: '12px',
                  fontWeight: 600,
                  color: i === 0 ? '#FFFFFF' : color.inkSub,
                  marginBottom: r.percent != null ? '3px' : 0,
                }}>
                  {r.label}
                </span>
                {r.percent != null && (
                  <span style={{
                    fontFamily: font.familyNum,
                    fontSize: '11px',
                    fontWeight: 700,
                    color: i === 0 ? '#FFFFFF' : color.inkMute,
                  }}>
                    {r.percent}%
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* 핵심 지표 + 차트 — 좌우 나란히 */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: '16px',
            alignItems: 'start',
          }}>
            {/* 핵심 지표 */}
            <div
              ref={metricsRef}
              style={{
                ...rev(metricsVis),
                background: color.bgCard,
                borderRadius: '12px',
                padding: '20px 24px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
              }}
            >
              <p style={{
                fontFamily: font.familyKo,
                fontSize: '13px',
                fontWeight: 700,
                color: color.ink,
                margin: '0 0 14px',
              }}>
                핵심 지표 (응답자 {ur.survey.respondents[0].n}명 기준)
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
                {ur.survey.keyMetrics.map((m, i) => (
                  <div key={i}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      marginBottom: '4px',
                    }}>
                      <span style={{
                        fontFamily: font.familyKo,
                        fontSize: '13px',
                        color: color.inkSub,
                        wordBreak: 'keep-all',
                      }}>
                        {m.metric}
                      </span>
                      <span style={{
                        fontFamily: font.familyNum,
                        fontSize: '13px',
                        fontWeight: 700,
                        color: m.highlight ? color.primary : color.inkSub,
                        flexShrink: 0,
                        marginLeft: '8px',
                      }}>
                        {m.value}%
                      </span>
                    </div>
                    <div style={{
                      height: '6px',
                      borderRadius: '999px',
                      backgroundColor: color.line,
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        height: '100%',
                        borderRadius: '999px',
                        backgroundColor: m.highlight ? color.primary : color.inkMute,
                        width: metricsVis ? `${m.value}%` : '0%',
                        transition: `width 0.7s ease-out ${i * 0.1}s`,
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 차트 2개 세로 나열 */}
            <div
              ref={chartsRef}
              style={{
                ...rev(chartsVis),
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              {ur.survey.charts.slice(1, 2).map((chart, i) => (
                <div
                  key={i}
                  style={{
                    background: color.bgCard,
                    borderRadius: '12px',
                    padding: '20px 20px',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                  }}
                >
                  <BarChart
                    title={chart.title}
                    data={chart.data.map(d => ({
                      label: d.label,
                      value: d.value,
                      n: d.n,
                    }))}
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ━━ 03 정성 · Interview ━━ */}
      <div style={{ background: color.bgCard }}>
        <div style={{ maxWidth: W, margin: '0 auto', padding: 'clamp(32px,2.5vw,36px) clamp(32px,7vw,120px)' }}>

          <p style={{
            fontFamily: font.familyNum,
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: color.primary,
            margin: '0 0 12px',
          }}>
            {ur.interview.label}
          </p>

          {/* 인터뷰이 프로필 6명 */}
          <div ref={profilesRef} style={rev(profilesVis)}>
            <p style={{
              fontFamily: font.familyKo,
              fontSize: '13px',
              fontWeight: 700,
              color: color.ink,
              margin: '0 0 12px',
            }}>
              {ur.interview.headline}
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(6, 1fr)',
              gap: '8px',
              marginBottom: '14px',
            }}>
              {ur.interview.interviewees.map((p, idx) => (
                <div
                  key={idx}
                  style={{
                    background: color.bg,
                    borderRadius: '8px',
                    padding: '8px 10px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '3px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                    <span style={{
                      fontFamily: font.familyKo,
                      fontSize: '13px',
                      fontWeight: 600,
                      color: color.ink,
                    }}>
                      {p.gender}/{p.age}
                    </span>
                    <span style={{
                      fontFamily: font.familyKo,
                      fontSize: '10px',
                      color: color.bgCard,
                      background: p.type === '내향' ? color.inkSub : color.inkMute,
                      borderRadius: '4px',
                      padding: '1px 5px',
                    }}>
                      {p.type}
                    </span>
                  </div>
                  <p style={{
                    margin: 0,
                    fontFamily: font.familyKo,
                    fontSize: '12px',
                    lineHeight: 1.6,
                    color: color.inkSub,
                  }}>
                    {p.note}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 테마 + verbatim 좌우 나란히 */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: '16px',
            alignItems: 'start',
          }}>
            {/* 테마 빈도 바 */}
            <div
              ref={themesRef}
              style={{
                ...rev(themesVis),
                background: color.bg,
                borderRadius: '12px',
                padding: '20px 24px',
              }}
            >
              <p style={{
                fontFamily: font.familyKo,
                fontSize: '13px',
                fontWeight: 700,
                color: color.ink,
                margin: '0 0 14px',
              }}>
                주요 테마 빈도 (인터뷰이 6명 기준)
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
                {ur.interview.themes.map((t, i) => (
                  <div key={i}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      marginBottom: '4px',
                    }}>
                      <span style={{
                        fontFamily: font.familyKo,
                        fontSize: '13px',
                        fontWeight: 600,
                        color: color.ink,
                      }}>
                        {t.theme}
                      </span>
                      <span style={{
                        fontFamily: font.familyNum,
                        fontSize: '12px',
                        fontWeight: 700,
                        color: t.percent === 100 ? color.primary : color.inkSub,
                      }}>
                        {t.percent}%
                      </span>
                    </div>
                    <ThemeBar percent={t.percent} full={t.percent === 100} index={i} visible={themesVis} />
                  </div>
                ))}
              </div>
            </div>

            {/* verbatim 인용 카드 */}
            <div ref={quotesRef} style={rev(quotesVis)}>
              <p style={{
                fontFamily: font.familyKo,
                fontSize: '13px',
                fontWeight: 700,
                color: color.ink,
                margin: '0 0 12px',
              }}>
                참여자 발화
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1fr',
                gap: '8px',
              }}>
                {ur.interview.quotes.slice(0, 3).map((q, i) => (
                  <QuoteCard
                    key={i}
                    text={q.text}
                    profile={q.profile}
                    theme={q.theme}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ━━ 04 교차분석 ━━ */}
      <div style={{ background: color.bg }}>
        <div style={{ maxWidth: W, margin: '0 auto', padding: 'clamp(32px,2.5vw,36px) clamp(32px,7vw,120px)' }}>

          <p style={{
            fontFamily: font.familyNum,
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: color.primary,
            margin: '0 0 8px',
          }}>
            {ur.crossAnalysis.label}
          </p>
          <p style={{
            fontFamily: font.familyKo,
            fontSize: 'clamp(20px,2.5vw,30px)',
            fontWeight: 700,
            color: color.ink,
            margin: '0 0 16px',
            letterSpacing: '-0.02em',
          }}>
            {ur.crossAnalysis.headline}
          </p>

          {/* 3열 그리드 — 수렴 / 분기 / 숨은니즈 */}
          <div
            ref={convergedRef}
            style={{
              ...rev(convergedVis),
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: '14px',
              alignItems: 'start',
            }}
          >
            {/* CONVERGENT FINDINGS */}
            <div>
              <CrossGroupHeader
                en="CONVERGENT FINDINGS"
                ko="설문과 인터뷰가 같았던 것"
                highlight
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {ur.crossAnalysis.converged.filter((_, i) => i === 0 || i === 3).map((item, i) => (
                  <ConvergedCard key={i} item={item} />
                ))}
              </div>
            </div>

            {/* DIVERGENT SIGNALS */}
            <div>
              <CrossGroupHeader
                en="DIVERGENT SIGNALS"
                ko="설문과 인터뷰가 달랐던 것"
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {ur.crossAnalysis.diverged.slice(1).map((item, i) => (
                  <SimpleCard key={i} item={item} />
                ))}
              </div>
            </div>

            {/* LATENT NEEDS */}
            <div>
              <CrossGroupHeader
                en="LATENT NEEDS"
                ko="숨어있던 진짜 니즈"
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {ur.crossAnalysis.surprising.slice(1).map((item, i) => (
                  <SimpleCard key={i} item={item} />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ━━ 05 Research → Solution ━━ */}
      <div style={{ background: color.bgCard }}>
        <div style={{ maxWidth: W, margin: '0 auto', padding: 'clamp(32px,2.5vw,36px) clamp(32px,7vw,120px)' }}>
          <div ref={solutionRef} style={rev(solutionVis)}>
            <p style={{
              fontFamily: font.familyNum,
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: color.primary,
              margin: '0 0 6px',
            }}>
              {ur.researchToSolution.label}
            </p>
            <p style={{
              fontFamily: font.familyKo,
              fontSize: 'clamp(18px,2vw,26px)',
              fontWeight: 700,
              color: color.ink,
              margin: '0 0 14px',
              letterSpacing: '-0.02em',
            }}>
              {ur.researchToSolution.headline}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {/* 헤더 행 */}
              <div style={{
                display: isMobile ? 'none' : 'grid',
                gridTemplateColumns: '2fr 1fr 2fr',
                gap: '12px',
                padding: '0 14px',
              }}>
                {['인사이트', '수치', '솔루션'].map((h) => (
                  <span key={h} style={{
                    fontFamily: font.familyNum,
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: color.inkMute,
                  }}>
                    {h}
                  </span>
                ))}
              </div>

              {/* 데이터 행 — 3개만 */}
              {ur.researchToSolution.mappings.filter((_, i) => i === 0 || i === 1 || i === 4).map((m, i) => (
                <div
                  key={i}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr 2fr',
                    gap: '12px',
                    background: color.bg,
                    borderRadius: '8px',
                    padding: '10px 14px',
                    alignItems: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  }}
                >
                  <span style={{
                    fontFamily: font.familyKo,
                    fontSize: '13px',
                    fontWeight: 700,
                    color: color.ink,
                  }}>
                    {m.insight}
                  </span>
                  <span style={{
                    fontFamily: font.familyNum,
                    fontSize: '14px',
                    fontWeight: 800,
                    color: color.primary,
                    letterSpacing: '-0.01em',
                  }}>
                    {m.value}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                      <path d="M3 8h10M9 4.5l4 3.5-4 3.5" stroke={color.primary} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span style={{
                      fontFamily: font.familyKo,
                      fontSize: '13px',
                      color: color.inkSub,
                      wordBreak: 'keep-all',
                    }}>
                      {m.solution}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

// ── 서브 컴포넌트 ──────────────────────────────────────────────

function MetaChip({ label, value }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
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
        fontSize: '13px',
        fontWeight: 600,
        color: color.inkSub,
      }}>
        {value}
      </span>
    </div>
  );
}

function ThemeBar({ percent, full, index, visible }) {
  return (
    <div style={{
      height: '8px',
      borderRadius: '999px',
      background: color.line,
      overflow: 'hidden',
    }}>
      <div style={{
        height: '100%',
        borderRadius: '999px',
        background: full ? color.primary : color.inkMute,
        width: visible ? `${percent}%` : '0%',
        transition: `width 0.8s ease-out ${index * 0.08}s`,
      }} />
    </div>
  );
}

function CrossGroupHeader({ en, ko, highlight }) {
  return (
    <div style={{ marginBottom: '12px' }}>
      <span style={{
        display: 'block',
        fontFamily: font.familyNum,
        fontSize: '11px',
        fontWeight: 700,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: highlight ? color.primary : color.inkMute,
        marginBottom: '3px',
      }}>
        {en}
      </span>
      <span style={{
        display: 'block',
        fontFamily: font.familyKo,
        fontSize: '13px',
        fontWeight: 600,
        color: color.inkSub,
      }}>
        {ko}
      </span>
    </div>
  );
}

function ConvergedCard({ item }) {
  return (
    <div style={{
      background: color.bgCard,
      borderRadius: '10px',
      padding: '14px 16px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      display: 'flex',
      flexDirection: 'column',
      gap: '7px',
    }}>
      <p style={{
        margin: 0,
        fontFamily: font.familyKo,
        fontSize: '13px',
        fontWeight: 700,
        color: color.ink,
        wordBreak: 'keep-all',
      }}>
        {item.title}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
        <EvidenceRow label="정량" value={item.quant} clr={color.primary} />
        <EvidenceRow label="정성" value={item.qual}  clr={color.inkSub}  />
      </div>
      <div style={{ paddingTop: '7px', borderTop: `1px solid ${color.line}` }}>
        <span style={{
          fontFamily: font.familyNum,
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: color.inkMute,
          display: 'block',
          marginBottom: '2px',
        }}>
          결론
        </span>
        <p style={{
          margin: 0,
          fontFamily: font.familyKo,
          fontSize: '13px',
          fontWeight: 700,
          color: color.primary,
          wordBreak: 'keep-all',
        }}>
          {item.conclusion}
        </p>
      </div>
    </div>
  );
}

function SimpleCard({ item }) {
  return (
    <div style={{
      background: color.bgCard,
      borderRadius: '10px',
      padding: '14px 16px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    }}>
      <p style={{
        margin: '0 0 5px',
        fontFamily: font.familyKo,
        fontSize: '13px',
        fontWeight: 700,
        color: color.ink,
        wordBreak: 'keep-all',
      }}>
        {item.title}
      </p>
      <p style={{
        margin: 0,
        fontFamily: font.familyKo,
        fontSize: '12px',
        lineHeight: 1.7,
        color: color.inkSub,
        wordBreak: 'keep-all',
      }}>
        {item.desc}
      </p>
    </div>
  );
}

function EvidenceRow({ label, value, clr }) {
  return (
    <div style={{ display: 'flex', gap: '6px', alignItems: 'baseline' }}>
      <span style={{
        fontFamily: font.familyNum,
        fontSize: '10px',
        fontWeight: 700,
        letterSpacing: '0.06em',
        color: clr,
        flexShrink: 0,
        textTransform: 'uppercase',
      }}>
        {label}
      </span>
      <span style={{
        fontFamily: font.familyKo,
        fontSize: '12px',
        color: color.inkSub,
        wordBreak: 'keep-all',
      }}>
        {value}
      </span>
    </div>
  );
}
