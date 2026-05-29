import { color, font } from '../tokens/web.js';
import { useIsMobile } from '../lib/useIsMobile.js';
import { useState, useEffect } from 'react';

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
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const ids = LINKS.map(l => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-56px 0px -50% 0px', threshold: 0 }
    );
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

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
          padding: '0 clamp(24px,6vw,96px)',
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
            {LINKS.map(({ label, href }) => {
              const isActive = activeId === href.slice(1);
              return (
                <li key={href}>
                  <a
                    href={href}
                    style={{
                      textDecoration: 'none',
                      fontSize: 13,
                      fontWeight: isActive ? 700 : 600,
                      color: isActive ? color.primary : color.inkSub,
                      letterSpacing: '-0.01em',
                      transition: 'color 0.18s',
                      fontFamily: font.familyNum,
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = color.ink)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = isActive ? color.primary : color.inkSub)}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
        )}

      </div>
    </nav>
  );
}
