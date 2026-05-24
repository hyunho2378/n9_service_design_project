import { color, font } from '../tokens/web.js';

// DESIGN_WEBN9.md: 좌측 그린 따옴표 + 본문 + 하단 출처(inkMute)
// id/profile/theme: 인터뷰 verbatim 카드 전용 (없으면 렌더 안 함)
export default function QuoteCard({ text, source, id, profile, theme }) {
  return (
    <div style={{
      backgroundColor: color.bgCard,
      borderRadius: '12px',
      boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    }}>
      {/* 인터뷰 ID 뱃지 (verbatim 카드용) */}
      {id && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            fontFamily: font.familyNum,
            fontSize: '12px',
            fontWeight: 700,
            color: color.bgCard,
            backgroundColor: color.primary,
            borderRadius: '6px',
            padding: '2px 8px',
            letterSpacing: '0.05em',
          }}>
            {id}
          </span>
          {profile && (
            <span style={{
              fontFamily: font.familyKo,
              fontSize: '12px',
              color: color.inkMute,
            }}>
              {profile}
            </span>
          )}
          {theme && (
            <span style={{
              fontFamily: font.familyKo,
              fontSize: '11px',
              color: color.primary,
              backgroundColor: color.primaryLight,
              borderRadius: '4px',
              padding: '2px 6px',
            }}>
              {theme}
            </span>
          )}
        </div>
      )}

      {/* 따옴표 + 본문 */}
      <div style={{ position: 'relative', paddingLeft: '20px' }}>
        {/* 좌측 그린 따옴표 */}
        <span style={{
          position: 'absolute',
          left: 0,
          top: '-4px',
          fontFamily: font.familyNum,
          fontSize: '32px',
          lineHeight: 1,
          color: color.primary,
          fontWeight: 700,
          userSelect: 'none',
        }}>
          "
        </span>
        <p style={{
          margin: 0,
          fontFamily: font.familyKo,
          fontSize: '15px',
          lineHeight: 1.75,
          color: color.inkSub,
          wordBreak: 'keep-all',
        }}>
          {text}
        </p>
      </div>

      {/* 출처 */}
      {source && (
        <p style={{
          margin: 0,
          fontFamily: font.familyKo,
          fontSize: '13px',
          color: color.inkMute,
        }}>
          {source}
        </p>
      )}
    </div>
  );
}
