# N9_PROJECT.md — N9 포트폴리오 웹사이트 작업 지침

> 모든 작업 프롬프트는 이 파일(N9_PROJECT.md)과 `CLAUDE.md`(코딩 가이드), `DESIGN_WEBN9.md`(디자인)를 먼저 참고할 것.

## 0. 프로젝트 정체성
- **무엇**: N9(넘버나인) 헤어살롱 무간섭 서비스 디자인 케이스 스터디 웹사이트
- **목적**: UX/서비스 디자인 포트폴리오. 기획→리서치→설계→구현→실측까지 "논리가 화면이 되는 과정"을 보여줌
- **차별점**: 일반 UX 포폴은 "기획했습니다"에서 끝나지만, N9는 **실측 성과(+217%, 신규 10명, 상인회 확산 제안)**까지 있음
- **베이스**: 강릉페이 UX 프로젝트 웹 구조를 토대로 재구성 (색·내용·일부 섹션 교체)

## 1. 기술 스택 (고정)
- React 18 + Vite + Tailwind CSS
- 애니메이션 hooks: `useCountUp`, `useParallax`, `useReveal` (강릉페이에서 재사용)
- 절대 localStorage/sessionStorage 사용 금지 (React state만)
- 배포: Vercel

## 2. 데이터 원칙 ⭐ 가장 중요
- **모든 텍스트·수치는 `src/data/`의 JSON에서만 꺼내쓴다.** 컴포넌트에 하드코딩 금지.
- `n9.json`: 메인 콘텐츠 (Hero ~ Outro 16개 섹션)
- `userResearch.json`: 설문 30명 + 인터뷰 6명 + 교차분석
- 컴포넌트는 JSON을 import해서 `.map()`으로 렌더 → 내용 수정은 JSON만 고치면 됨

## 3. 섹션 구조 (스크롤 순서)
1. Hero (COVER)
2. ProjectOverview (Stats바 + Project Detail)
3. DeskResearch (차트 3개 + 인사이트 3개)
4. UserResearch (설문 정량 + 인터뷰 정성 + 교차분석) ⭐ 신규/핵심
5. Persona (김선희 + 이도현)
6. SolutionDirection (3격차)
7. Architecture (3레이어)
8. OfflineTouchpoints (LAYER 01)
9. NaverEcosystem (LAYER 02 As-Is/To-Be)
10. AutoResponse (톡톡 자동응답)
11. AiIntegration (양방향 매칭)
12. LiveDemo (기술스택 + 서비스 링크)
13. KeyScreens (AI 5화면 프로토타입)
14. Dashboard (NeonDB + 대시보드)
15. Deliverables (5가지 산출물)
16. Validation (실측 성과 5지표)
17. Impact (확산 3단계 + 상인회)
18. Collaboration (6주 타임라인 + 사장님 발화 전후)
19. Outro (KEY TAKEAWAY)

## 4. User Research 섹션 처리 (핵심)
- **지나치게 압축하지 말 것. 일단 다 넣고 나중에 줄인다.**
- 정량(설문): 응답자 구성 카운터 + keyMetrics 바 + charts 3개 막대그래프
- 정성(인터뷰): 인터뷰이 6명 프로필 + 테마 빈도 + verbatim 인용 카드
- 교차분석: 수렴(converged) / 분기(diverged) / 놀라운점(surprising)
- 데이터 시각화 필수: 카운터 애니메이션, 막대바 reveal 애니메이션

## 5. 절대 규칙
- 수치 일관성: AI 사용 "33건"으로 통일 (32 아님)
- 사장님 발화는 실제 발화만. 날짜·출처 유지
- "30년 경력" 표기 허용 (실제 앱 카피)
- 네이버 그린(#02C75A) 사용, 강릉페이 블루는 전부 제거
- 이미지/목업은 placeholder div로 두고, 실제 에셋은 나중에 교체 (주석으로 표시)

## 6. 작업 순서 (프롬프트 단위)
1. tokens (색·폰트) → 2. data JSON 배치 → 3. 공통 hooks/mini → 4. 섹션별 컴포넌트 → 5. App.jsx 조립 → 6. 반응형 점검

## 7. 데이터 매핑 (src/data/ → 섹션 컴포넌트)

> 모든 텍스트·수치는 JSON에서만. 컴포넌트 하드코딩 금지.
> 기존 강릉페이 파일(research.json, survey.json, cjm-svg.js)은 건드리지 말 것.

### n9.json 매핑

| JSON key | 섹션 컴포넌트 | 주요 field |
|---|---|---|
| `meta` | Hero | title, subtitle, team, period, tools, award, serviceUrl, naverUrl |
| `hero` | Hero | label, titleLines[2], desc, ctaPrimary, ctaSecondary |
| `stats[3]` | ProjectOverview | value, suffix, prefix, label |
| `overview.background` | ProjectOverview | 배경 설명 텍스트 |
| `deskResearch` | DeskResearch | label, headline, charts[3]{type,value,unit,caption,source}, insights[3] |
| `fieldResearch` | FieldResearch (또는 DeskResearch 하단) | label, headline, quotes[3]{quote,finding} |
| `persona` | Persona | label, headline, keyInsight, personas[2]{name,age,role,color,story,pains,needs} |
| `solutionDirection` | SolutionDirection | label, headline, gaps[3]{no,en,title,desc,strategy,isAi?} |
| `architecture` | Architecture | label, headline, flow, layers[3]{en,ko,items[],tag,highlight} |
| `offline` | OfflineTouchpoints | label, headline, items[3]{title,desc} |
| `naver` | NaverEcosystem | label, headline, tobe[6] |
| `autoResponse` | AutoResponse | label, headline, steps[3]{no,main,sub}, result |
| `aiIntegration` | AiIntegration | label, headline, center{title,sub}, customer{role,label,q,a}, owner{role,label,q,a} |
| `liveDemo` | LiveDemo | label, headline, stack{프론트엔드[],백엔드/DB[],API[],배포/제작[]}, screens[5]{no,label,owner?} |
| `dashboard` | Dashboard | label, headline, items[2]{no,title,desc}, voc |
| `deliverables` | Deliverables | label, headline, items[5]{no,title,desc,highlight} |
| `validation` | Validation | label, headline, activationDates, metrics[5]{label,before,after,tag,highlight?}, quote, newCustomerQuote |
| `impact` | Impact | label, headline, stages[3]{stage,title,tag,desc,highlight?}, scaleReasons[3]{no,title,desc}, marketDemand |
| `collaboration` | Collaboration | label, headline, timeline[5]{week,title,desc,highlight?}, quoteBefore{text,date}, quoteAfter{text,date} |
| `outro` | Outro | label, headline |

### userResearch.json 매핑

| JSON key | UserResearch 내 sub-section | 주요 field |
|---|---|---|
| `meta` | 섹션 헤더 | label, headline, period, method, targetDef |
| `survey.respondents[4]` | 대형 카운터 4개 (Inter 60px) | n, label, percent? |
| `survey.keyMetrics[8]` | 가로 막대바 | metric, value(%), highlight — true 3개 강조 |
| `survey.charts[3]` | 막대 그래프 3개 | title, type:"bar", data[]{label,value,n} |
| `interview.interviewees[6]` | 인터뷰이 프로필 카드 | id, gender, age, type, note |
| `interview.themes[5]` | 테마 빈도 막대 | theme, count, percent |
| `interview.quotes[6]` | verbatim 인용 카드 그리드 | id, profile, theme, text |
| `crossAnalysis.converged[4]` | 교차분석 — 수렴 | title, quant, qual, conclusion |
| `crossAnalysis.diverged[3]` | 교차분석 — 분기 | title, desc |
| `crossAnalysis.surprising[4]` | 교차분석 — 놀라운점 | title, desc |
| `researchToSolution.mappings[5]` | 리서치→솔루션 연결 행 | insight, value, solution |

### 컬러 규칙
- `persona.personas[0].color = "gray"` → 공급자(김선희): `color.ink` 계열
- `persona.personas[1].color = "blue"` → 소비자(이도현): `color.consumer` (#378ADD)
- `deliverables.items[].highlight = true` → `color.primary` 강조 카드
- `validation.metrics[].highlight = true` → 수치 굵게 + 그린

### 임시 파일
- `src/DataTest.jsx` — import 확인 후 삭제 예정 (App.jsx `<DataTest />` 라인도 함께 제거)