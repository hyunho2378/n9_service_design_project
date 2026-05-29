import { color, font } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import { useCountUp } from '../lib/useCountUp.js';
import { useIsMobile } from '../lib/useIsMobile.js';
import SectionHeader from '../components/SectionHeader.jsx';
import BarChart from '../components/BarChart.jsx';
import QuoteCard from '../components/QuoteCard.jsx';
import ur from '../data/userResearch.json';

const SEC = 'clamp(56px,6vw,88px) clamp(32px,7vw,120px)';
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
  const [divergedRef,   divergedVis]   = useReveal({ threshold: 0.05 });
  const [surprisingRef, surprisingVis] = useReveal({ threshold: 0.05 });
  const [solutionRef,   solutionVis]   = useReveal({ threshold: 0.05 });

  // ── 응답자 카운터 4개 ──
  const [r0ref, r0] = useCountUp(ur.survey.respondents[0].n, 1400);
  const [r1ref, r1] = useCountUp(ur.survey.respondents[1].n, 1200);
  const [r2ref, r2] = useCountUp(ur.survey.respondents[2].n, 1100);
  const [r3ref, r3] = useCountUp(ur.survey.respondents[3].n, 1000);
  const rRefs = [[r0ref, r0], [r1ref, r1], [r2ref, r2], [r3ref, r3]];

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
              marginBottom: '32px',
            }}>
              <MetaChip icon="📅" label="기간" value={ur.meta.period} />
              <MetaChip icon="🔬" label="방법론" value={ur.meta.method} />
            </div>
            <div style={{
              background: color.bg,
              borderRadius: '8px',
              padding: '20px 24px',
              maxWidth: '720px',
            }}>
              <p style={{
                margin: 0,
                fontFamily: font.familyKo,
                fontSize: '15px',
                lineHeight: 1.8,
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
        <div style={{ maxWidth: W, margin: '0 auto', padding: SEC }}>

          {/* 서브 헤더 */}
          <p style={{
            fontFamily: font.familyNum,
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: color.primary,
            margin: '0 0 40px',
          }}>
            {ur.survey.label}
          </p>

          {/* 응답자 카운터 */}
          <div
            ref={respondRef}
            style={{
              ...rev(respondVis),
              display: 'grid',
              gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
              gap: '24px',
              marginBottom: '56px',
            }}
          >
            {ur.survey.respondents.map((r, i) => (
              <div
                key={i}
                ref={rRefs[i][0]}
                style={{
                  background: i === 0 ? color.primary : color.bgCard,
                  borderRadius: '12px',
                  padding: '28px 20px',
                  textAlign: 'center',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                }}
              >
                <span style={{
                  display: 'block',
                  fontFamily: font.familyNum,
                  fontSize: 'clamp(44px,5vw,64px)',
                  fontWeight: 800,
                  lineHeight: 1,
                  letterSpacing: '-0.04em',
                  color: i === 0 ? '#FFFFFF' : color.primary,
                  marginBottom: '8px',
                }}>
                  {rRefs[i][1]}
                </span>
                <span style={{
                  display: 'block',
                  fontFamily: font.familyKo,
                  fontSize: '14px',
                  fontWeight: 600,
                  color: i === 0 ? '#FFFFFF' : color.inkSub,
                  marginBottom: r.percent != null ? '6px' : 0,
                }}>
                  {r.label}
                </span>
                {r.percent != null && (
                  <span style={{
                    fontFamily: font.familyNum,
                    fontSize: '12px',
                    fontWeight: 700,
                    color: i === 0 ? '#FFFFFF' : color.inkMute,
                  }}>
                    {r.percent}%
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* 핵심 지표 — 2×2 그리드 */}
          <div
            ref={metricsRef}
            style={{
              ...rev(metricsVis),
              background: color.bgCard,
              borderRadius: '12px',
              padding: '28px 32px',
              marginBottom: '32px',
            }}
          >
            <p style={{
              fontFamily: font.familyKo,
              fontSize: '14px',
              fontWeight: 700,
              color: color.ink,
              margin: '0 0 20px',
            }}>
              핵심 지표 (응답자 {ur.survey.respondents[0].n}명 기준)
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: '16px 40px',
            }}>
              {ur.survey.keyMetrics.map((m, i) => (
                <div key={i}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    marginBottom: '6px',
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
                      fontSize: '14px',
                      fontWeight: 700,
                      color: m.highlight ? color.primary : color.inkSub,
                      flexShrink: 0,
                      marginLeft: '8px',
                    }}>
                      {m.value}%
                    </span>
                  </div>
                  <div style={{
                    height: '7px',
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

          {/* 차트 2개 (의존 정보, 첫 행동) */}
          <div
            ref={chartsRef}
            style={{
              ...rev(chartsVis),
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: '24px',
            }}
          >
            {ur.survey.charts.slice(1).map((chart, i) => (
              <div
                key={i}
                style={{
                  background: color.bgCard,
                  borderRadius: '12px',
                  padding: '28px 24px',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
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

      {/* ━━ 03 정성 · Interview ━━ */}
      <div style={{ background: color.bgCard }}>
        <div style={{ maxWidth: W, margin: '0 auto', padding: SEC }}>

          <p style={{
            fontFamily: font.familyNum,
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: color.primary,
            margin: '0 0 40px',
          }}>
            {ur.interview.label}
          </p>

          {/* 인터뷰이 프로필 6명 */}
          <div
            ref={profilesRef}
            style={rev(profilesVis)}
          >
            <p style={{
              fontFamily: font.familyKo,
              fontSize: '15px',
              fontWeight: 700,
              color: color.ink,
              margin: '0 0 20px',
            }}>
              {ur.interview.headline}
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: '16px',
              marginBottom: '48px',
            }}>
              {ur.interview.interviewees.map((p) => (
                <div
                  key={p.id}
                  style={{
                    background: color.bg,
                    borderRadius: '12px',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
                      fontSize: '11px',
                      color: color.bgCard,
                      background: p.type === '내향' ? color.inkSub : color.inkMute,
                      borderRadius: '4px',
                      padding: '2px 6px',
                    }}>
                      {p.type}
                    </span>
                  </div>
                  <p style={{
                    margin: 0,
                    fontFamily: font.familyKo,
                    fontSize: '13px',
                    lineHeight: 1.65,
                    color: color.inkSub,
                  }}>
                    {p.note}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 테마 빈도 바 */}
          <div
            ref={themesRef}
            style={{
              ...rev(themesVis),
              background: color.bg,
              borderRadius: '12px',
              padding: '32px',
              marginBottom: '40px',
            }}
          >
            <p style={{
              fontFamily: font.familyKo,
              fontSize: '15px',
              fontWeight: 700,
              color: color.ink,
              margin: '0 0 24px',
            }}>
              주요 테마 빈도 (인터뷰이 6명 기준)
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {ur.interview.themes.map((t, i) => (
                <div key={i}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    marginBottom: '6px',
                  }}>
                    <span style={{
                      fontFamily: font.familyKo,
                      fontSize: '14px',
                      fontWeight: 600,
                      color: color.ink,
                    }}>
                      {t.theme}
                    </span>
                    <span style={{
                      fontFamily: font.familyNum,
                      fontSize: '13px',
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

          {/* verbatim 인용 카드 6개 */}
          <div
            ref={quotesRef}
            style={rev(quotesVis)}
          >
            <p style={{
              fontFamily: font.familyKo,
              fontSize: '15px',
              fontWeight: 700,
              color: color.ink,
              margin: '0 0 20px',
            }}>
              참여자 발화
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: '16px',
            }}>
              {ur.interview.quotes.map((q, i) => (
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

      {/* ━━ 04 교차분석 ━━ */}
      <div style={{ background: color.bg }}>
        <div style={{ maxWidth: W, margin: '0 auto', padding: SEC }}>

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
            fontSize: 'clamp(22px,2.5vw,32px)',
            fontWeight: 700,
            color: color.ink,
            margin: '0 0 48px',
            letterSpacing: '-0.02em',
          }}>
            {ur.crossAnalysis.headline}
          </p>

          {/* 수렴 */}
          <div ref={convergedRef} style={{ ...rev(convergedVis), marginBottom: '48px' }}>
            <CrossLabel label="수렴 / Converged" color={color.primary} bg={color.bg} />
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: '16px',
            }}>
              {ur.crossAnalysis.converged.map((item, i) => (
                <ConvergedCard key={i} item={item} />
              ))}
            </div>
          </div>

          {/* 분기 */}
          <div ref={divergedRef} style={{ ...rev(divergedVis), marginBottom: '48px' }}>
            <CrossLabel label="분기 / Diverged" color={color.inkSub} bg={color.bg} />
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: '16px',
            }}>
              {ur.crossAnalysis.diverged.map((item, i) => (
                <div
                  key={i}
                  style={{
                    background: color.bgCard,
                    borderRadius: '12px',
                    padding: '24px',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                  }}
                >
                  <p style={{
                    margin: '0 0 10px',
                    fontFamily: font.familyKo,
                    fontSize: '14px',
                    fontWeight: 700,
                    color: color.ink,
                    wordBreak: 'keep-all',
                  }}>
                    {item.title}
                  </p>
                  <p style={{
                    margin: 0,
                    fontFamily: font.familyKo,
                    fontSize: '13px',
                    lineHeight: 1.75,
                    color: color.inkSub,
                    wordBreak: 'keep-all',
                  }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 놀라운 점 */}
          <div ref={surprisingRef} style={rev(surprisingVis)}>
            <CrossLabel label="놀라운 점 / Surprising" color={color.inkSub} bg={color.bg} />
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: '16px',
            }}>
              {ur.crossAnalysis.surprising.map((item, i) => (
                <div
                  key={i}
                  style={{
                    background: color.bgCard,
                    borderRadius: '12px',
                    padding: '24px',
                  }}
                >
                  <p style={{
                    margin: '0 0 10px',
                    fontFamily: font.familyKo,
                    fontSize: '14px',
                    fontWeight: 700,
                    color: color.ink,
                    wordBreak: 'keep-all',
                  }}>
                    {item.title}
                  </p>
                  <p style={{
                    margin: 0,
                    fontFamily: font.familyKo,
                    fontSize: '13px',
                    lineHeight: 1.75,
                    color: color.inkSub,
                    wordBreak: 'keep-all',
                  }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ━━ 05 Research → Solution ━━ */}
      <div style={{ background: color.bg }}>
        <div style={{ maxWidth: W, margin: '0 auto', padding: SEC }}>
          <div ref={solutionRef} style={rev(solutionVis)}>
            <p style={{
              fontFamily: font.familyNum,
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: color.primary,
              margin: '0 0 8px',
            }}>
              {ur.researchToSolution.label}
            </p>
            <p style={{
              fontFamily: font.familyKo,
              fontSize: 'clamp(22px,2.5vw,32px)',
              fontWeight: 700,
              color: color.ink,
              margin: '0 0 40px',
              letterSpacing: '-0.02em',
            }}>
              {ur.researchToSolution.headline}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* 헤더 행 */}
              <div style={{
                display: isMobile ? 'none' : 'grid',
                gridTemplateColumns: '2fr 1fr 2fr',
                gap: '16px',
                padding: '0 20px',
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

              {/* 데이터 행 */}
              {ur.researchToSolution.mappings.map((m, i) => (
                <div
                  key={i}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr 2fr',
                    gap: '16px',
                    background: color.bgCard,
                    borderRadius: '10px',
                    padding: '18px 20px',
                    alignItems: 'center',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                  }}
                >
                  <span style={{
                    fontFamily: font.familyKo,
                    fontSize: '14px',
                    fontWeight: 700,
                    color: color.ink,
                  }}>
                    {m.insight}
                  </span>
                  <span style={{
                    fontFamily: font.familyNum,
                    fontSize: '15px',
                    fontWeight: 800,
                    color: color.primary,
                    letterSpacing: '-0.01em',
                  }}>
                    {m.value}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      fontFamily: font.familyNum,
                      fontSize: '14px',
                      color: color.primary,
                      flexShrink: 0,
                    }}>→</span>
                    <span style={{
                      fontFamily: font.familyKo,
                      fontSize: '14px',
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
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
      }}>
        {value}
      </span>
    </div>
  );
}

function ThemeBar({ percent, full, index, visible }) {
  return (
    <div style={{
      height: '10px',
      borderRadius: '999px',
      background: color.line,
      overflow: 'hidden',
    }}>
      <div style={{
        height: '100%',
        borderRadius: '999px',
        background: full ? color.primary : color.line,
        width: visible ? `${percent}%` : '0%',
        transition: `width 0.8s ease-out ${index * 0.08}s`,
      }} />
    </div>
  );
}

function CrossLabel({ label, color: clr, bg }) {
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      background: bg,
      borderRadius: '6px',
      padding: '5px 12px',
      marginBottom: '16px',
    }}>
      <span style={{
        fontFamily: font.familyNum,
        fontSize: '12px',
        fontWeight: 700,
        letterSpacing: '0.05em',
        color: clr,
      }}>
        {label}
      </span>
    </div>
  );
}

function ConvergedCard({ item }) {
  return (
    <div style={{
      background: color.bgCard,
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    }}>
      <p style={{
        margin: 0,
        fontFamily: font.familyKo,
        fontSize: '15px',
        fontWeight: 700,
        color: color.ink,
        wordBreak: 'keep-all',
      }}>
        {item.title}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <EvidenceRow label="정량" value={item.quant} color={color.primary} />
        <EvidenceRow label="정성" value={item.qual}  color={color.inkSub}  />
      </div>
      <div style={{
        marginTop: '4px',
        paddingTop: '12px',
      }}>
        <span style={{
          fontFamily: font.familyNum,
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: color.inkMute,
          display: 'block',
          marginBottom: '4px',
        }}>
          결론
        </span>
        <p style={{
          margin: 0,
          fontFamily: font.familyKo,
          fontSize: '15px',
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

function EvidenceRow({ label, value, color: clr }) {
  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'baseline' }}>
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
        fontSize: '13px',
        color: color.inkSub,
        wordBreak: 'keep-all',
      }}>
        {value}
      </span>
    </div>
  );
}
