# Hangyeom Lee — Portfolio Website

> **Status: Build passing ✓ — All features implemented**
> Last updated: 2026-05-12

---

## 1. 포지셔닝 & 컨셉

**포지셔닝:** AI-Native Product Engineer
**컨셉:** "OS-Mode Portfolio" — 스크롤 기반이 아닌 앱처럼 작동하는 포트폴리오

포트폴리오 자체가 내가 만드는 제품의 퀄리티를 보여줌.
Sidebar + Panel 구조로 Raycast / Linear 느낌의 인터페이스.

---

## 2. 기술 스택

| 레이어 | 기술 |
|--------|------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Animation | Framer Motion (AnimatePresence, useSpring, useMotionValue) |
| Styling | CSS Modules (`app.module.css`) + `globals.css` |
| AI Chat | Vercel AI SDK v6 (`ai`, `@ai-sdk/react`, `@ai-sdk/anthropic`) |
| Fonts | Inter (body) + Space Grotesk (display) |
| Images | Next.js `<Image>` with fill + sizes |

### 설치된 패키지

```
cmdk         — command palette
ai           — AI SDK v6 core
@ai-sdk/react — useChat hook (v6에서 분리됨)
@ai-sdk/anthropic — Anthropic provider
framer-motion
next
react / react-dom
```

---

## 3. 디자인 시스템

### 색상 토큰 (`app/globals.css`)

```css
--bg: #080808                          /* 순수 검정 */
--bg-2: #0d0d0e
--surface: rgba(255,255,255,0.05)      /* 카드 배경 */
--surface-hover: rgba(255,255,255,0.08)
--surface-strong: rgba(255,255,255,0.09)
--border: rgba(255,255,255,0.10)
--border-strong: rgba(255,255,255,0.18)
--text: #e2e2e6                        /* 본문 */
--text-strong: #fafafa                 /* 제목 */
--muted: #8e8e9a
--muted-strong: #b8b8c4
--accent: #8b5cf6                      /* 바이올렛 */
--accent-bright: #c4b5fd
--accent-dim: rgba(139,92,246,0.18)
--accent-2: #22d3ee                    /* 시안 (telemetry) */
--green: #4ade80                       /* live 상태 */
--amber: #fbbf24
```

### 폰트 위계

```
제목 (panelTitle)  : clamp(2rem, 4vw, 3.5rem), Space Grotesk, weight 700, letter-spacing -0.04em
소제목            : clamp(1.1rem, 2vw, 1.4rem), weight 600
본문 (text)       : 0.88–0.95rem, line-height 1.65–1.75
라벨 (eyebrow)    : 0.7rem, monospace, letter-spacing 0.12em, uppercase
```

---

## 4. 파일 구조

```
app/
  globals.css            ← 전역 CSS 변수 + reset
  layout.tsx             ← Inter + Space Grotesk 폰트, title 메타
  page.tsx               ← PortfolioApp 렌더링
  api/
    chat/
      route.ts           ← POST /api/chat — streamText → toUIMessageStreamResponse

components/
  PortfolioApp.tsx       ← ★ 메인 레이아웃. View 타입 export. hash 라우팅.
  app.module.css         ← ★ 모든 컴포넌트의 CSS Modules 스타일

  Layout/
    Sidebar.tsx          ← 좌측 고정 사이드바 (232px)

  Panels/
    HomePanel.tsx        ← 첫 화면 (2col: tagline + TelemetryVisual)
    WorkPanel.tsx        ← 프로젝트 그리드
    ProjectPanel.tsx     ← 프로젝트 상세 + Lightbox
    ExperiencePanel.tsx  ← 경력 타임라인
    AboutPanel.tsx       ← About + Contact 카드

  Features/
    CommandPalette.tsx   ← Cmd+K 팔레트 + 터미널 모드
    AskAI.tsx            ← AI 채팅 (useChat, @ai-sdk/react)
    Quiz.tsx             ← 5문항 엔지니어 성향 퀴즈

  Shared/
    Cursor.tsx           ← 커스텀 커서 + CursorProvider + useCursor hook
    TelemetryVisual.tsx  ← 홈 hero 시각화 (노드/엣지 애니메이션)
    Lightbox.tsx         ← 이미지 fullscreen viewer (키보드 ←→ESC)

  portfolioData.ts       ← ★ 모든 콘텐츠 데이터 (profile, products, experience...)

public/
  resume.pdf
  project-shots/
    cctv-home.png
    cctv-area.png
    cctv-detail.png
    argumint-home.png    (있으면)
    argumint-rules.png
    argumint-login.png
    argumint-register.png
    flue-learn.png
    flue-topics.png
    flue-home.png
```

---

## 5. 핵심 타입 — View

`components/PortfolioApp.tsx`에서 export. 모든 패널이 import.

```typescript
export type View =
  | { type: "home" }
  | { type: "work" }
  | { type: "project"; id: string }  // id = product.title
  | { type: "experience" }
  | { type: "about" }
  | { type: "ask" }
  | { type: "quiz" };
```

### Hash 라우팅 매핑

```
/           → home
/#home      → home
/#work      → work (프로젝트 그리드)
/#project/FIFA2026.ca → 해당 프로젝트 상세
/#experience → experience
/#about     → about
/#ask       → AI 채팅
/#quiz      → 퀴즈
```

---

## 6. 레이아웃 구조

```
┌──────────────────────────────────────────────────┐
│  SIDEBAR (232px, fixed)  │  MAIN PANEL (flex 1)  │
│                          │                        │
│  Hangyeom Lee            │  [AnimatePresence]     │
│  ● LIVE                  │  패널 전환 fade+slide  │
│                          │  150ms                 │
│  — HOME                  │                        │
│  — WORK                  │                        │
│    › FIFA2026.ca         │                        │
│    › AI Monitoring       │                        │
│    › Argumint            │                        │
│    › FLUE                │                        │
│  — EXPERIENCE            │                        │
│    Buil · MoodMe         │                        │
│                          │                        │
│  ─────────────────       │                        │
│  [⌘] Command palette     │                        │
│  [✦] Ask AI              │                        │
│  [⟳] Quiz                │                        │
│  ─────────────────       │                        │
│  ACTIVITY FEED           │                        │
│  ● 2h ago  Deployed...   │                        │
└──────────────────────────────────────────────────┘
```

**모바일 (≤860px):** 사이드바 `display: none`. 패널만 표시.

---

## 7. 콘텐츠 데이터 (`portfolioData.ts`)

### profile

```typescript
{
  name: "Hangyeom Lee",
  role: "AI-Native Product Engineer",
  tagline: ["BUILDING", "AI-NATIVE", "PRODUCTS."],
  subtitle: "Full-stack engineer focused on real-time infrastructure, AI interfaces, and internet-native experiences.",
  location: "Waterloo, ON",
  email: "h38lee@uwaterloo.ca",
  github: "https://github.com/HangyeomLee",
  linkedin: "https://www.linkedin.com/in/hangyeomlee",
  school: "University of Waterloo · Systems Design Engineering",
  availability: "Open to internships & product engineering roles",
}
```

### products (4개, 표시 순서)

| # | 제목 | 연도 | 태그 | 이미지 | 라이브 |
|---|------|------|------|--------|--------|
| 1 | FIFA2026.ca | 2025 | Commerce experiment | 없음 (gradient) | ✓ fifa2026.ca |
| 2 | AI Monitoring Platform | 2024 | Applied AI system | cctv-plaza-feed.png | — |
| 3 | Argumint | 2026 | Live product | argumint-home.png | ✓ gumint-theta.vercel.app |
| 4 | FLUE | 2026 | AI for good | flue-learn.png | — |

FIFA2026.ca는 이미지 없어서 `gradient` CSS로 플레이스홀더 표시됨.
이미지 없는 프로젝트는 `product.gradient`로 배경 → 제목 텍스트 표시.

### experience (2개)

| 회사 | 역할 | 기간 |
|------|------|------|
| Buil Planning | Full-Stack Developer | Jan 2024 – Jun 2024 |
| MoodMe | AI / ML Intern | May 2023 – Aug 2023 |

---

## 8. 커스텀 커서 (`components/Shared/Cursor.tsx`)

### 구조

- `CursorProvider` — context 제공, 앱 최상단 wrapping
- `Cursor` — 실제 렌더링 (dot + ring)
- `useCursor()` — `setCursor(type)` hook

### 커서 타입

```typescript
type CursorType = "default" | "hover" | "image" | "link";
```

| 타입 | 외형 | 텍스트 |
|------|------|--------|
| default | 4px dot | — |
| hover | 28px ring | "OPEN" |
| image | 36px ring | "VIEW" |
| link | 28px ring | "↗" |

### 물리

```typescript
dot:  mouseX/mouseY 그대로 (즉시)
ring: useSpring(mouseX, { stiffness: 500, damping: 30 }) — 약간 느리게 따라옴
```

터치 디바이스 (`matchMedia("(hover: none)")`)에서는 `null` 반환 → 커서 비활성화.
`pointer-events: none`, `z-index: 9999`.

### 사용법

```tsx
const { setCursor } = useCursor();

<button
  onMouseEnter={() => setCursor("hover")}
  onMouseLeave={() => setCursor("default")}
>
```

---

## 9. Command Palette (`components/Features/CommandPalette.tsx`)

**진입점:** `Cmd+K` / `Ctrl+K`, 사이드바 버튼

### 두 가지 모드

**Search 모드 (기본)**
- 입력하면 NAV_ITEMS 필터링 (label + meta 기준)
- 화살표로 이동, Enter로 navigate
- 결과 없으면 "No results" 메시지

**Terminal 모드**
- 검색창에 `>` 입력 → 자동으로 터미널 전환
- 상단 "← back to search" 버튼으로 복귀

### 터미널 명령어

```bash
help              # 명령어 목록
ls                # 디렉토리 구조
whoami            # 프로필 정보
cat resume        # /resume.pdf 새 탭 열기
git log           # fake 커밋 히스토리
ping              # 연락처 정보
sudo hire         # 1.2초 후 About 패널 이동
sudo hire hangyeom  # 위와 동일
clear             # 터미널 초기화
exit              # 팔레트 닫기
```

---

## 10. AI 채팅 (`components/Features/AskAI.tsx`)

### 아키텍처

```
브라우저                  서버
AskAI.tsx         →     app/api/chat/route.ts
useChat (v6)            streamText (claude-haiku-4-5-20251001)
DefaultChatTransport     toUIMessageStreamResponse()
```

### AI SDK v6 주의사항 (구버전과 다름)

```typescript
// 올바른 import (v6)
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

// transport로 URL 지정 (v6에서 api: "/api/chat" 직접 전달 불가)
const { messages, sendMessage, status } = useChat({
  transport: new DefaultChatTransport({ api: "/api/chat" }),
});

// 메시지 전송 (append 대신 sendMessage)
sendMessage({ text: "질문 내용" });

// 로딩 상태 (isLoading 없음)
const isLoading = status === "streaming" || status === "submitted";

// 메시지 내용 (content 대신 parts 배열)
m.parts.filter(p => p.type === "text").map(p => p.text).join("")

// API route에서 (toDataStreamResponse 없음)
result.toUIMessageStreamResponse()
// maxTokens → maxOutputTokens
```

### 환경변수 설정 필요

```
.env.local:
ANTHROPIC_API_KEY=sk-ant-...
```

이 키 없으면 채팅 기능 502 오류. 나머지 기능은 정상 작동.

### System prompt 구조 (`app/api/chat/route.ts`)

```
You are Hangyeom Lee's portfolio AI.
Answer in the same language as the user.
Be concise (2-4 sentences), technical, and honest.

[profile 정보]
[4개 프로젝트 상세]
[2개 경력 상세]
[스킬 목록]
```

---

## 11. 퀴즈 (`components/Features/Quiz.tsx`)

5문항, 각 문항 4개 선택지, 선택할 때마다 결과 타입에 점수 누적.

### 4가지 결과 타입

| ID | 제목 | 설명 |
|----|------|------|
| system | Systems Thinker | 아키텍처 우선, 전체를 먼저 봄 |
| shipper | Rapid Shipper | 배포 우선, v2에서 고침 |
| product | Product Engineer | 유저 여정 우선, UX를 코드처럼 생각 |
| ai | AI-Native Builder | LLM을 라이브러리처럼 씀 |

결과 화면: 타입명 + 설명 + 도메인 태그 + "Hangyeom은 AI-Native Builder" 비교.
Retake 버튼으로 초기화.

---

## 12. 키보드 단축키

| 키 | 동작 |
|----|------|
| `Cmd+K` / `Ctrl+K` | Command Palette 열기/닫기 |
| `Escape` | Palette 닫기 → 프로젝트 상세에서 Work로 돌아가기 |
| `g` | Home으로 |
| `w` | Work로 |
| `e` | Experience로 |
| `a` | About으로 |
| `↑↓` | Palette 내 항목 이동 |
| `↵` | Palette 선택 항목 이동 |
| `← →` | Lightbox 이미지 탐색 |
| `ESC` | Lightbox 닫기 |

단축키는 `<input>`, `<textarea>` focus 중에는 비활성.

---

## 13. Lightbox (`components/Shared/Lightbox.tsx`)

프로젝트 상세 페이지에서 hero 이미지 또는 gallery 썸네일 클릭 시 활성화.

```typescript
type LightboxImage = { src: string; alt: string; label?: string };

<Lightbox
  images={allImages}
  startIndex={0}
  onClose={() => setLightboxImages(null)}
/>
```

- 배경: `rgba(0,0,0,0.92)` overlay 클릭으로 닫기
- 키보드: `←` `→` 이미지 탐색, `ESC` 닫기
- 상단: `N / TOTAL` 카운터
- 하단: `label` 표시
- AnimatePresence로 열릴 때 scale 0.95 → 1

---

## 14. TelemetryVisual (`components/Shared/TelemetryVisual.tsx`)

홈 패널 오른쪽 열에 위치하는 인터랙티브 시각화.

5개 노드: `INFER`, `STREAM`, `PIPELINE`, `MONITOR`, `DEPLOY`
6개 엣지: SVG stroke-dasharray 애니메이션 (dashFlow)
Framer Motion pulse ring: 각 노드 주변 깜빡임

---

## 15. 빌드 & 배포

### 빌드 확인

```bash
npm run build    # Next.js 15 빌드
# ✓ Compiled successfully
# Route /: 112kB, First Load 214kB
# Route /api/chat: 123B (dynamic)
```

### 개발 서버

```bash
npm run dev
# http://localhost:3000
```

### 배포 체크리스트

- [ ] `.env.local`에 `ANTHROPIC_API_KEY` 설정
- [ ] `public/project-shots/` — argumint, flue 이미지 확인
- [ ] `public/resume.pdf` 최신 버전인지 확인
- [ ] 모바일(≤860px) 레이아웃 확인
- [ ] Lighthouse 성능 체크

---

## 16. 개선 여지 (나중에)

| 항목 | 우선도 | 비고 |
|------|--------|------|
| 프로젝트 스크린샷 업데이트 | ★★★ | CCTV/Bank chatbot 실제 데이터 상태로 재캡처 |
| FIFA2026.ca 스크린샷 추가 | ★★★ | 현재 gradient 플레이스홀더 |
| 모바일 Sidebar 대체 UI | ★★ | 860px 이하에서 탭 네비게이션 |
| 퀴즈 결과 공유 버튼 | ★ | Twitter/X OG 카드 |
| Live ML Demo | ★ | ONNX 감정분석 브라우저 실행 |
| Lab 패널 구현 | ★ | labExperiments 데이터는 있음 |
| 다크/라이트 테마 토글 | — | 현재 다크 only |

---

## 17. 데이터 수정하는 법

모든 텍스트 콘텐츠는 `components/portfolioData.ts` 한 파일에 집중됨.

- 프로필/연락처 수정 → `profile` 객체
- 프로젝트 추가/수정 → `products` 배열
- 경력 수정 → `experience` 배열
- 이미지 추가 → `public/project-shots/` 폴더 + `products[n].image` 경로

CSS 스타일 수정 → `components/app.module.css` (클래스명 기준)
전역 색상/폰트 → `app/globals.css`
