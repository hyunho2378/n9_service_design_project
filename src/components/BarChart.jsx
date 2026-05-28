import { useReveal } from '../lib/useReveal.js';
import { color, font } from '../tokens/web.js';

// DESIGN_WEBN9.md: 가로 막대, 그린 fill, 라벨 좌측 + 수치 우측, reveal 시 width 0→%
// data: [{ label, value(0-100), n?, highlight? }]

export default function BarChart({ title, data = [] }) {
  const [ref, visible] = useReveal();

  return (
    <div ref={ref}>
      {title && (
        <p style={{
          margin: '0 0 20px',
          fontFamily: font.familyKo,
          fontSize: '15px',
          fontWeight: 600,
          color: color.ink,
        }}>
          {title}
        </p>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {data.map((item, i) => (
          <div key={i}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: '5px',
            }}>
              <span style={{
                fontFamily: font.familyKo,
                fontSize: '14px',
                color: color.inkSub,
              }}>
                {item.label}
              </span>
              <span style={{
                fontFamily: font.familyNum,
                fontSize: '13px',
                fontWeight: 600,
                color: item.highlight ? color.primary : color.inkSub,
              }}>
                {item.value}%
              </span>
            </div>
            <div style={{
              height: '8px',
              borderRadius: '999px',
              backgroundColor: color.bgSoft,
              overflow: 'hidden',
            }}>
              <div style={{
                height: '100%',
                borderRadius: '999px',
                backgroundColor: item.highlight ? color.primary : color.line,
                width: visible ? `${item.value}%` : '0%',
                transition: `width 0.7s ease-out ${i * 0.06}s`,
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
