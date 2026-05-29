import { NavLink } from 'react-router-dom';
import { color, font } from '../tokens/web.js';
import { useIsMobile } from '../lib/useIsMobile.js';

const LINKS = [
  { label: 'INTRO',    to: '/' },
  { label: 'RESEARCH', to: '/research' },
  { label: 'STRATEGY', to: '/strategy' },
  { label: 'SOLUTION', to: '/solution' },
  { label: 'RESULT',   to: '/result' },
];

const linkStyle = (isActive) => ({
  textDecoration: 'none',
  fontSize: 12,
  fontWeight: isActive ? 700 : 600,
  color: isActive ? color.primary : color.inkSub,
  letterSpacing: '0.06em',
  fontFamily: font.familyNum,
  whiteSpace: 'nowrap',
});

export default function Nav() {
  const isMobile = useIsMobile();

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(250,250,249,0.95)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${color.line}`,
        fontFamily: font.familyNum,
      }}
    >
      <style>{`#nav-mobile-links::-webkit-scrollbar{display:none}`}</style>

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: isMobile ? '0 16px' : '0 clamp(32px,7vw,120px)',
          height: 56,
          display: 'flex',
          alignItems: 'center',
          gap: isMobile ? 12 : 20,
        }}
      >
        {/* 로고 */}
        <NavLink
          to="/"
          style={{ textDecoration: 'none', flexShrink: 0 }}
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
        </NavLink>

        {/* 데스크탑 */}
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
            {LINKS.map(({ label, to }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  style={({ isActive }) => linkStyle(isActive)}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        )}

        {/* 모바일 가로 스크롤 */}
        {isMobile && (
          <div
            id="nav-mobile-links"
            style={{
              flex: 1,
              overflowX: 'auto',
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
            }}
          >
            <ul
              style={{
                display: 'flex',
                gap: '18px',
                listStyle: 'none',
                margin: 0,
                padding: '0 2px',
                width: 'max-content',
              }}
            >
              {LINKS.map(({ label, to }) => (
                <li key={to} style={{ flexShrink: 0 }}>
                  <NavLink
                    to={to}
                    end={to === '/'}
                    style={({ isActive }) => linkStyle(isActive)}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>
    </nav>
  );
}
