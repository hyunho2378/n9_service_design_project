import { useReveal } from '../lib/useReveal.js';
import { color, font } from '../tokens/web.js';

// DESIGN_WEBN9.md: SVG stroke-dasharray, 그린 진행 + 회색 트랙
// value: 숫자 (maxValue 대비 비율로 표시)
// maxValue: 기본 100 (점수형은 100, % 그대로 쓸 때도 100)
// unit: "%" | "/100" 등 value 뒤에 붙는 단위
export default function DonutChart({ value, unit = '%', maxValue = 100, caption, source }) {
  const [ref, visible] = useReveal();

  const R = 48;
  const C = 2 * Math.PI * R;          // ≈ 301.6
  const ratio = Math.min(value / maxValue, 1);
  const offset = C * (1 - ratio);

  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <svg width="120" height="120" viewBox="0 0 120 120" style={{ display: 'block', margin: '0 auto' }}>
        {/* 트랙 (회색) */}
        <circle
          cx="60" cy="60" r={R}
          fill="none"
          stroke={color.line}
          strokeWidth="10"
        />
        {/* 진행 (그린) */}
        <circle
          cx="60" cy="60" r={R}
          fill="none"
          stroke={color.primary}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={visible ? offset : C}
          style={{ transition: 'stroke-dashoffset 1s ease-out', transformOrigin: '60px 60px', transform: 'rotate(-90deg)' }}
        />
        {/* 중앙 수치 */}
        <text
          x="60" y="55"
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily={font.familyNum}
          fontSize="20"
          fontWeight="700"
          fill={color.ink}
        >
          {value}
        </text>
        <text
          x="60" y="72"
          textAnchor="middle"
          fontFamily={font.familyNum}
          fontSize="11"
          fontWeight="500"
          fill={color.inkMute}
        >
          {unit}
        </text>
      </svg>
      {caption && (
        <p style={{
          margin: '12px 0 4px',
          fontFamily: font.familyKo,
          fontSize: '14px',
          fontWeight: 600,
          color: color.inkSub,
        }}>
          {caption}
        </p>
      )}
      {source && (
        <p style={{
          margin: 0,
          fontFamily: font.familyKo,
          fontSize: '12px',
          color: color.inkMute,
        }}>
          {source}
        </p>
      )}
    </div>
  );
}
