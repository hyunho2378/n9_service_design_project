export const color = {
  // === N9 Primary (네이버 그린) ===
  primary:      '#02C75A',
  primaryDark:  '#03B152',
  primaryLight: '#E8F8EE',
  primarySoft:  '#C0DD97',

  // === Base ===
  bg:           '#FAFAF9',
  bgCard:       '#FFFFFF',
  bgSoft:       '#F2F2F0',
  ink:          '#0A0A0A',
  inkSub:       '#565656',
  inkMute:      '#888780',
  line:         '#E5E5E3',

  // === Persona 구분 (소비자 블루 유지) ===
  consumer:     '#378ADD',
  consumerBg:   '#E6F1FB',

  // === 기존 컴포넌트 호환 aliases (점진 교체 예정) ===
  white:        '#FFFFFF',
  brand:        '#02C75A',
  brandStrong:  '#03B152',
  brandPale:    '#E8F8EE',
  brandSky:     '#F2F2F0',
  brandAlt:     '#C0DD97',
  inkMuted:     '#565656',
  inkFaint:     '#888780',
  warn:         '#E5484D',
  ok:           '#02C75A',
  bgAlpha:      'rgba(250,250,249,0.88)',
  whiteA60:     'rgba(255,255,255,0.60)',
  whiteA50:     'rgba(255,255,255,0.50)',
  photoOverlay: 'rgba(0,0,0,0.42)',
};

export const font = {
  family:       "Inter, 'Pretendard Variable', Pretendard, -apple-system, 'Apple SD Gothic Neo', system-ui, sans-serif",
  familyKo:     "'Pretendard Variable', Pretendard, -apple-system, 'Apple SD Gothic Neo', system-ui, sans-serif",
  familyNum:    "Inter, system-ui, sans-serif",
};

export const type = {
  display: { size: 'clamp(44px,6.5vw,96px)', lh: 1.22, weight: 800, ls: '-0.04em' },
  h1:      { size: 'clamp(32px,4.5vw,64px)', lh: 1.22, weight: 800, ls: '-0.03em' },
  h2:      { size: 'clamp(26px,3.2vw,48px)', lh: 1.25, weight: 700, ls: '-0.02em' },
  h3:      { size: 'clamp(20px,1.9vw,28px)', lh: 1.35, weight: 700, ls: '-0.01em' },
  lead:    { size: 'clamp(16px,1.4vw,20px)', lh: 1.75, weight: 400 },
  body:    { size: '16px',                   lh: 1.78, weight: 400 },
  caption: { size: '13px',                   lh: 1.55, weight: 500 },
  eyebrow: { size: '19px', weight: 800, ls: '0em', transform: 'uppercase' },
};

export const layout = {
  container: '1440px',
  gut:       'clamp(80px, 10vw, 160px)',
  sectionY:  'clamp(100px, 14vh, 200px)',
  rLg: '24px', rMd: '16px', rSm: '8px',
};
