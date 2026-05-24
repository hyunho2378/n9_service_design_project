import { color, font } from '../tokens/web.js';
import { useIsMobile } from '../lib/useIsMobile.js';
import n9 from '../data/n9.json';

const { serviceUrl } = n9.meta;

const LINKS = [
  { label: 'Research',   href: '#desk-research' },
  { label: 'Persona',    href: '#persona' },
  { label: 'Solution',   href: '#solution-direction' },
  { label: 'AI',         href: '#ai-integration' },
  { label: 'Validation', href: '#validation' },
  { label: 'Build',      href: '#live-demo' },
];

export default function Nav() {
  const isMobile = useIsMobile();

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(250,250,249,0.88)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${color.line}`,
        fontFamily: font.familyNum,
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 clamp(20px,5vw,80px)',
          height: 56,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 20,
        }}
      >
        {/* 로고 */}
        <a
          href="#hero"
          style={{
            textDecoration: 'none',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'baseline',
            gap: '1px',
          }}
        >
          <span style={{
            fontFamily: font.familyNum,
            fontSize: '18px',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            color: color.ink,
          }}>
            N°9
          </span>
        </a>

        {/* 네비 링크 (데스크탑만) */}
        {!isMobile && (
          <ul
            style={{
              display: 'flex',
              gap: 'clamp(16px,2.5vw,32px)',
              listStyle: 'none',
              margin: 0,
              padding: 0,
              flex: 1,
              justifyContent: 'center',
            }}
          >
            {LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  style={{
                    textDecoration: 'none',
                    fontSize: 13,
                    fontWeight: 500,
                    color: color.inkMute,
                    letterSpacing: '-0.01em',
                    transition: 'color 0.18s',
                    fontFamily: font.familyNum,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = color.ink)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = color.inkMute)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        )}

        {/* 서비스 링크 CTA */}
        <a
          href={serviceUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '7px 16px',
            borderRadius: 100,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.01em',
            textDecoration: 'none',
            background: color.primary,
            color: '#FFFFFF',
            flexShrink: 0,
            transition: 'opacity 0.18s',
            fontFamily: font.familyNum,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.82')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          서비스 →
        </a>
      </div>
    </nav>
  );
}
