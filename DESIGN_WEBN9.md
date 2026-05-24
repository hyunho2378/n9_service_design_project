# DESIGN_WEBN9.md — N9 포트폴리오 디자인 시스템

> 강릉페이 웹의 레이아웃·인터랙션 문법을 유지하되, 색은 네이버 그린으로 전면 교체.

## 1. 컬러 토큰
```js
// src/tokens/colors.js
export const colors = {
  // Primary (네이버 그린)
  primary:      '#02C75A',   // 메인 그린 (강조, CTA, 하이라이트 카드)
  primaryDark:  '#03B152',   // hover
  primaryLight: '#E8F8EE',   // 그린 배경 톤
  primarySoft:  '#C0DD97',   // 연그린 (보조)

  // Base
  bg:           '#FAFAF9',   // 오프화이트 배경
  bgCard:       '#FFFFFF',   // 카드
  bgSoft:       '#F2F2F0',   // 섹션 구분 배경
  ink:          '#0A0A0A',   // 본문 텍스트
  inkSub:       '#565656',   // 보조 텍스트
  inkMute:      '#888780',   // 캡션/출처
  line:         '#E5E5E3',   // 구분선

  // Persona 구분 (소비자만 블루 유지 - 공급자와 시각 구분용)
  consumer:     '#378ADD',   // 이도현 (소비자)
  consumerBg:   '#E6F1FB',
}
```
- **강릉페이 블루(#1A56DB 등)는 전부 #02C75A로 교체.**
- 단 예외: Persona의 소비자(이도현)는 블루 유지 — 공급자(김선희, 그린)와 시각적으로 대비시키기 위함.

## 2. 타이포그래피
```
국문: Pretendard (Variable)
영문/숫자: Inter
```
- 섹션 라벨: Inter, 그린(#02C75A), 14px, bold, letter-spacing, 대문자
- 헤드라인: Pretendard, 40px(데스크탑)/28px(모바일), bold, ink
- 본문: Pretendard, 16-18px, inkSub
- 캡션/출처: 13-14px, inkMute
- 대형 수치(카운터): Inter, 60-80px, bold

## 3. 레이아웃
- 최대 폭: 1200px 컨테이너 중앙 정렬
- 섹션 상하 패딩: 120px (데스크탑) / 64px (모바일)
- 카드 radius: 12px
- 카드 그림자: `0 4px 24px rgba(0,0,0,0.06)`
- 그리드 gap: 24px

## 4. 인터랙션 (강릉페이 hooks 재사용)
- `useReveal`: 스크롤 진입 시 fade-up (opacity 0→1, translateY 24px→0)
- `useCountUp`: 숫자 카운터 애니메이션 (Stats, Validation, Survey)
- `useParallax`: Hero 목업 패럴랙스
- 트랜지션: 0.6s ease-out 기본

## 5. 컴포넌트 패턴
- **섹션 헤더**: `<라벨(그린)>` + `<헤드라인>` 세트로 모든 섹션 상단 통일
- **카드**: 흰 배경 + radius 12 + 그림자. 강조 카드는 그린 배경(#02C75A) + 흰 텍스트
- **막대 차트**: 가로 막대, 그린 fill, 라벨 좌측 + 수치 우측, reveal 시 width 0→%
- **도넛 차트**: SVG stroke-dasharray, 그린 진행 + 회색 트랙
- **인용 카드**: 좌측 그린 따옴표 + 본문 + 하단 출처(inkMute)
- **타임라인**: 좌측 세로선 + 노드, 마지막 노드(Now) 그린 강조

## 6. User Research 시각화 전용
- 응답자 구성: 4개 대형 카운터 (Inter 60px) 가로 나열
- keyMetrics: 가로 막대바, highlight=true는 그린 진하게/나머지 연그린
- charts: 막대 그래프, 값(%) + n수 함께 표기
- 인터뷰 verbatim: 카드 그리드, 좌측 ID 뱃지(P1~P6) + 인용 + 테마 태그
- 교차분석: 3열 (수렴/분기/놀라운점) 또는 탭 전환

## 7. 반응형
- 데스크탑 우선, 768px 이하 모바일
- 그리드: 3열 → 1열, 2열 → 1열
- 헤드라인 폰트 축소, 패딩 축소
- 목업/차트 세로 스택

## 8. 금지
- 강릉페이 잔재 (블루, iOS/Android 토글, 강릉페이 텍스트) 전부 제거
- 인라인 하드코딩 텍스트 (JSON에서만)
- localStorage / 외부 폰트 CDN 남발