import { color, font } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import SectionHeader from '../components/SectionHeader.jsx';
import n9 from '../data/n9.json';
import { useIsMobile } from '../lib/useIsMobile.js';

const { liveDemo } = n9;
const { serviceUrl } = n9.meta;

const rev = (vis, delay = 0) => ({
  opacity: vis ? 1 : 0,
  transform: vis ? 'none' : 'translateY(24px)',
  transition: `opacity 0.7s ease-out ${delay}s, transform 0.7s ease-out ${delay}s`,
});

const CATEGORY_ORDER = ['프론트엔드', '백엔드 / 데이터베이스', 'API', '배포 / 제작 프로그램'];

const ICON_MAP = {
  'React':         'react.svg',
  'Vite':          'vite.svg',
  'Tailwind':      'tailwind.svg',
  'Node.js':       'nodejs.svg',
  'Neon DB':       'neondb.svg',
  'Google Gemini': 'gemini.svg',
  'Vercel':        'vercel.svg',
  'Claude Code':   'claudecode.svg',
  'Antigravity':   'antigravity.svg',
};

export default function LiveDemo() {
  const isMobile = useIsMobile();
  const [headerRef, headerVis] = useReveal({ threshold: 0.1 });
  const [bodyRef,   bodyVis]   = useReveal({ threshold: 0.05 });

  return (
    <section
      id="live-demo"
      style={{ background: color.bg, fontFamily: font.familyKo }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(56px,6vw,88px) clamp(32px,7vw,120px)' }}>

        <div ref={headerRef} style={rev(headerVis)}>
          <SectionHeader label="LAYER 03 / PROTOTYPE" headline={liveDemo.headline} />
        </div>

        <div
          ref={bodyRef}
          style={{
            ...rev(bodyVis),
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: 'clamp(32px,4vw,56px)',
            alignItems: 'start',
          }}
        >
          {/* 좌: 기술스택 4그룹 세로 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {CATEGORY_ORDER.map((cat) => (
              <StackGroup key={cat} category={cat} items={liveDemo.stack[cat] ?? []} />
            ))}
          </div>

          {/* 우: 서비스 이미지 + 버튼 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <img
              src="/servicemain.png"
              alt=""
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                borderRadius: '12px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
              }}
            />
            <a
              href={serviceUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: color.primary,
                color: '#FFFFFF',
                fontFamily: font.familyKo,
                fontSize: '16px',
                fontWeight: 700,
                padding: '16px 32px',
                borderRadius: '10px',
                textDecoration: 'none',
                transition: 'opacity 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
            >
              서비스 체험하기
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

function StackGroup({ category, items }) {
  return (
    <div style={{
      border: '1.5px solid rgba(2,199,90,0.22)',
      borderRadius: '10px',
      overflow: 'hidden',
      background: color.bgCard,
    }}>
      {/* 그룹 라벨 */}
      <div style={{
        background: color.primary,
        padding: '7px 16px',
      }}>
        <span style={{
          fontFamily: font.familyKo,
          fontSize: '11px',
          fontWeight: 700,
          color: '#FFFFFF',
          letterSpacing: '0.02em',
        }}>
          {category}
        </span>
      </div>

      {/* 아이콘 가로 나열 */}
      <div style={{
        padding: '16px 18px',
        display: 'flex',
        gap: '24px',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
      }}>
        {items.map((item) => (
          <div key={item} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
          }}>
            <img
              src={`/${ICON_MAP[item]}`}
              alt={item}
              style={{ width: '32px', height: '32px', display: 'block', objectFit: 'contain' }}
            />
            <span style={{
              fontFamily: font.familyNum,
              fontSize: '11px',
              fontWeight: 600,
              color: color.inkSub,
              whiteSpace: 'nowrap',
            }}>
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
