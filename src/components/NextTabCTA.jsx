import { Link } from 'react-router-dom';
import { color, font } from '../tokens/web.js';

export default function NextTabCTA({ label, to }) {
  return (
    <div style={{
      background: color.bg,
      padding: 'clamp(40px,5vw,64px) clamp(32px,7vw,120px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '10px',
    }}>
      <Link
        to={to}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          background: color.primary,
          color: '#FFFFFF',
          textDecoration: 'none',
          fontFamily: font.familyKo,
          fontSize: 'clamp(15px,1.4vw,18px)',
          fontWeight: 700,
          letterSpacing: '0.02em',
          padding: 'clamp(14px,1.6vw,18px) clamp(36px,4vw,56px)',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(2,199,90,0.28)',
          transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 8px 28px rgba(2,199,90,0.40)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'none';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(2,199,90,0.28)';
        }}
      >
        {label}
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.5 9h11M10 4.5l4.5 4.5-4.5 4.5" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Link>
    </div>
  );
}
