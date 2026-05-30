import { color, font } from '../tokens/web.js';

// 모든 섹션 상단 공통. label=그린 대문자, headline=Pretendard bold.
export default function SectionHeader({ label, headline, center = false }) {
  return (
    <div style={{ textAlign: center ? 'center' : 'left', marginBottom: '72px' }}>
      {label && (
        <p style={{
          margin: '0 0 12px',
          fontFamily: font.familyNum,
          fontSize: '14px',
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: color.primary,
        }}>
          {label}
        </p>
      )}
      {headline && (
        <h2 style={{
          margin: 0,
          fontFamily: font.familyKo,
          fontSize: 'clamp(26px,3.4vw,40px)',
          fontWeight: 800,
          lineHeight: 1.25,
          letterSpacing: '-0.02em',
          color: color.ink,
          wordBreak: 'keep-all',
        }}>
          {headline}
        </h2>
      )}
    </div>
  );
}
