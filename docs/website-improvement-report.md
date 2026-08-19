# 포트폴리오 사이트 개선 보고서 & 제안서

**대상 사이트:** hangyeom-website (Next.js 15 / React 19 / Framer Motion)
**작성일:** 2026-06-16
**목적:** 리크루터가 10초 안에 "이 사람은 실제 제품을 출시한다"를 확신하게 만들기
**참고 자료:** Resume-30.pdf, 멘토 피드백 17항목, GitHub, 배포된 사이트 분석

> 작성 기준: 산문 설명은 한국어, 사이트에 실제 들어갈 copy/code는 영어로 작성했다.
> 영어 카피는 그대로 복사해서 `portfolioData.ts` 등에 붙이면 된다.

---

## 0. 한 장 요약 (Executive Summary)

이 사이트의 비주얼·애니메이션·구조는 학부생 포트폴리오 평균을 크게 상회한다.
**문제는 디자인이 아니라 "무엇을 보여주는가"의 선택이다.**

가장 큰 발견 한 가지:

> **이 레포 코드에는 fifa2026(라이브 e-commerce, 실매출)이 아예 없다.**
> 프로젝트는 Argumint / CCTV / FLUE / KB Bank Chatbot 4개뿐이다.
> ([`components/portfolioData.ts:67`](../components/portfolioData.ts))

즉 너의 가장 강한 자산이 **이력서에도, 이 사이트 코드에도 빠져 있다.**
멘토가 17항목에 걸쳐 지적한 "vague하다 / tool을 써라 / 숫자를 보여줘라"는
fifa2026 하나면 거의 전부 자동으로 해결된다. Stripe webhook, Shippo, Supabase
Realtime, Playwright, 실제 매출, 718명 주간 방문자, +89% 성장 — 구체적 tool,
실제 유저, 실제 돈, 측정 가능한 metric이 전부 이미 존재한다.

또 하나 — 배포된 사이트와 이 레포가 **다른 버전**으로 보인다. 분석에 나온
"SYSTEM LIVE / Recent Activity / 98ms / 99.9% uptime" 요소가 이 코드엔 없다.
이 정합성부터 잡아야 한다(§1.0).

**우선순위 한 줄 정리:**

| # | 작업 | 효과 | 비용 |
|---|------|------|------|
| **P0** | fifa2026을 Projects 최상단에 추가 + 레포/배포본 동기화 | 압도적 | 1~2시간 |
| **P0** | positioning 한 줄을 3개 surface에서 통일 | 높음 | 15분 |
| **P1** | quickStats의 장식용 숫자에 출처/맥락 부여 | 높음(신뢰) | 30분 |
| **P1** | 모든 프로젝트 카드에 사용 tool 명시 + 라이브/repo 링크 정리 | 높음 | 1시간 |
| **P2** | Buil 직함 통일, experience bullet에 tool 박기 | 중간 | 30분 |
| **P2** | SEO metadata / OG 이미지 / resume.pdf 동기화 | 중간 | 30분 |
| **P3** | fifa2026 1건 short case study 페이지 | 중간~높음 | 2~3시간 |

---

## 1. 현재 상태 진단

### 1.0 [P0] 레포 ↔ 배포본 정합성 문제 (선결 과제)

분석에서 본 사이트(SYSTEM LIVE, Recent Activity, 98ms latency, 24 FPS,
99.9% uptime, fifa2026 프로젝트 카드)는 이 레포의 코드와 **일치하지 않는다.**
이 레포의 현재 상태:

- 프로젝트: Argumint, CCTV, FLUE, KB Bank Chatbot (fifa2026 없음)
- quickStats: `4 featured builds / 2 industry roles / <200ms / 10-15 FPS`
  ([`portfolioData.ts:21`](../components/portfolioData.ts))
- subtitle: `"AI Engineer shaping serious systems into usable products"`

**할 일:** 어떤 코드가 진짜 배포본인지 먼저 확정한다.
- 배포본이 더 최신이면 → 그 코드를 이 레포로 가져와 단일 소스로 만든다.
- 이 레포가 진짜면 → 배포된 구버전을 이 코드로 재배포한다.

> 두 버전이 떠 있으면 어떤 개선도 "어디에 적용했는지" 추적이 안 된다.
> 이 보고서의 모든 파일 경로는 **이 레포 기준**이다.

### 1.1 [P0] 최고 작업물(fifa2026)의 부재

| 자산 | 이력서 | 이 사이트 코드 | GitHub README |
|------|:---:|:---:|:---:|
| fifa2026.ca (라이브 e-commerce) | ❌ | ❌ | ✅ |
| Butterfly Fashion Trading (Full-Stack, 2025~현재) | ❌ | ❌ | ✅ |
| Waterloo TA | ❌ | ❌ | ✅ |
| Argumint / FLUE / CCTV / Bank | ✅ | ✅ | ✅ |

세 surface 중 GitHub만 너의 진짜 무기를 보여준다. 포트폴리오 사이트는
"제품을 출시하는 엔지니어"를 자칭하면서 정작 **유일하게 돈을 버는 라이브 제품을
빼놓았다.** 이게 1순위로 바뀌어야 한다.

### 1.2 [P0] Positioning 불일치 (3개 surface가 서로 다른 사람 소개)

| Surface | 현재 문구 |
|---------|-----------|
| 이력서 | "Full-stack engineer building user-focused web applications…" |
| 사이트 subtitle | "AI Engineer shaping serious systems into usable products" |
| 사이트 metadata title | "Hangyeom Lee \| AI & Full-Stack Engineer" |
| GitHub | "ships real products, not just demos / running a live e-commerce platform" |

GitHub 한 줄이 가장 강력하다. "데모가 아니라 실제 제품을 출시한다 +
캐나다 전역 라이브 e-commerce 운영"은 학부생 이력서에서 거의 안 보이는
차별점이다. 세 surface를 GitHub 톤으로 통일해야 한다(§3.2에 카피 제공).

### 1.3 [P1] 신뢰를 깎는 "장식용 숫자"

[`portfolioData.ts:21-26`](../components/portfolioData.ts)의 quickStats:

```
4   featured builds
2   industry roles
<200ms   edge inference target   ← "target"은 실측이 아니라 목표치
10-15 FPS  multi-camera throughput
```

문제: `<200ms`에 "target"이 붙어 있어 **실측이 아님을 스스로 인정**하고 있고,
나머지 숫자도 어느 프로젝트의 실제 값인지 맥락이 없다. 리크루터는 맥락 없는
숫자를 "장식"으로 읽고 신뢰 점수를 깎는다. (배포본의 98ms/99.9% uptime도 동일
문제 — 어느 시스템의 실제 수치인지 연결되어야 한다.)

### 1.4 [P2] 직함 불일치

- 이력서: `Full-Stack Developer — Buil Planning`
- GitHub: `AI/ML Intern — Buil Planning`

둘 다 보는 리크루터에게 빨간불. 진짜 직함 하나로 통일한다(둘 중 실제와 맞는 쪽).

### 1.5 [P2] tool이 안 박힌 bullet (멘토 핵심 지적)

experience/일부 project bullet이 "무엇을 했다"는 있는데 "무엇으로 했다"가 없다.

```
현재: "Built REST APIs consumed by React dashboards for real-time alerts…"
개선: "Built FastAPI REST endpoints consumed by React/SWR dashboards,
       pushing real-time alerts over WebSockets…"
```

fifa2026을 넣으면 이 항목은 대부분 자동 해결된다(이미 tool이 풍부함).

---

## 2. 리크루터 관점 진단 (왜 이게 중요한가)

리크루터/엔지니어가 포트폴리오를 보는 방식 3단계:

1. **10초 스캔** — 히어로 한 줄 + 첫 프로젝트 1개. 여기서 "라이브 e-commerce,
   실매출"이 안 보이면 나머지는 안 읽힌다. → §1.1, §1.2가 여기에 직결.
2. **신뢰 검증** — 숫자와 링크를 의심한다. 맥락 없는 숫자, 죽은 링크, "target"
   같은 단어는 감점. 살아있는 라이브 URL + Stripe/Shippo 같은 구체적 통합은 가점.
   → §1.3.
3. **깊이 확인** — repo를 연다. GitHub은 이미 강하다(13 repos, README, pinned).

즉 사이트의 역할은 **10초 스캔에서 "이 사람은 진짜다"를 만들고 GitHub로
넘기는 것.** 지금은 그 10초가 상대적으로 약한 Argumint로 채워져 있다.

> ATS 관련: 사이트는 ATS를 안 타지만 이력서는 탄다. 사이트의 skill 키워드는
> 사람 대상이므로 "깔끔하게 정리"가 정답(중복/뻔한 항목 제거). 이력서 쪽
> 키워드 전략은 별도(동기들 합격 resume 참고 권장).

---

## 3. 개선 제안 (구체 카피 포함)

### 3.1 [P0] fifa2026을 Projects 최상단에 추가

[`portfolioData.ts`](../components/portfolioData.ts)의 `projects` 배열 **맨 앞**에
아래 객체를 추가한다(실제 수치는 너의 진짜 값으로 검증 후 확정):

```ts
{
  title: "FIFA2026.ca",
  year: "2025–present",
  tag: "Live e-commerce · real revenue",
  stack: [
    "Next.js 15 (App Router)", "TypeScript", "TailwindCSS",
    "Stripe Checkout", "Shippo API", "Supabase (Postgres + Realtime)",
    "WebSockets", "Playwright"
  ],
  summary:
    "A live, revenue-generating e-commerce platform I built and operate end to " +
    "end — storefront, payments, shipping automation, and a real-time admin " +
    "dashboard — serving customers across Canada.",
  impact: [
    "Built Stripe Checkout with server-side webhook verification for reliable " +
      "payment + order state, handling real customer transactions.",
    "Integrated the Shippo API to auto-generate Canada Post / UPS shipping " +
      "labels, removing manual fulfillment steps for every order.",
    "Designed an admin dashboard with live order updates over WebSockets " +
      "backed by Supabase Realtime (Postgres).",
    "Shipped a separate B2B wholesale portal with role-based auth, tiered " +
      "pricing, and a Playwright E2E test suite.",
    "Grew to 175+ products and 718 weekly visitors (+89% growth)."
  ],
  result: "Live storefront + B2B portal serving customers across Canada",
  image: "/project-shots/fifa2026-home.png",      // 실제 스크린샷 캡처 필요
  imageAlt: "FIFA2026.ca storefront screenshot",
  repoUrl: "https://github.com/HangyeomLee/<fifa-repo>",  // 실제 repo로
  liveUrl: "https://fifa2026.ca",
  captureLabel: "Captured from the live site",
  gallery: [
    { image: "/project-shots/fifa2026-checkout.png", alt: "Stripe checkout", label: "Checkout" },
    { image: "/project-shots/fifa2026-admin.png",    alt: "Realtime admin dashboard", label: "Admin (realtime)" },
    { image: "/project-shots/fifa2026-b2b.png",       alt: "B2B wholesale portal", label: "B2B portal" }
  ]
}
```

**체크리스트:**
- [ ] 라이브 사이트에서 실제 스크린샷 3~4장 캡처 → `public/project-shots/`
- [ ] 수치(175+, 718, +89%) 진짜 값으로 검증 (분석/Vercel Analytics 출처 확인)
- [ ] repo가 private면 `repoUrl` 제거하고 liveUrl만, 또는 "Private repo — available on request" 배지
- [ ] quickStats의 `featured builds`를 4 → 5로 갱신

### 3.2 [P0] Positioning 통일 (GitHub 톤)

`portfolioData.ts`의 `profile`을 아래로 교체:

```ts
export const profile = {
  name: "Hangyeom Lee",
  subtitle: "I ship real products, not just demos.",
  // ...
  intro:
    "Systems Design Engineering student at the University of Waterloo. I build " +
    "and operate a live e-commerce platform serving customers across Canada, " +
    "and turn ML-heavy ideas into shippable product surfaces.",
  heroBlurb:
    "From Stripe payments and shipping automation to real-time dashboards and " +
    "inference pipelines — I care about systems that stay fast and that real " +
    "users can actually trust under load.",
  availability: "Open to AI product, backend, and full-stack roles",
};
```

[`app/layout.tsx:17`](../app/layout.tsx) metadata title도 동일 메시지로:

```ts
export const metadata = {
  title: "Hangyeom Lee — Full-Stack Engineer who ships live products",
  description:
    "Waterloo Systems Design Engineering student. I build and run a live " +
    "e-commerce platform (Stripe, Shippo, Supabase) serving customers across " +
    "Canada, plus applied-AI and backend systems.",
};
```

GitHub bio도 같은 한 줄로 맞춘다 → 3개 surface 일치.

### 3.3 [P1] quickStats에 맥락/출처 부여

장식용 숫자를 **실제 제품 수치**로 교체:

```ts
export const quickStats = [
  { value: "5",     label: "shipped products" },
  { value: "718",   label: "weekly visitors · fifa2026.ca" },
  { value: "+89%",  label: "visitor growth" },
  { value: "175+",  label: "products live in store" },
];
```

`<200ms`처럼 "target"이 붙은 추정치는 히어로 최상단에서 빼고, 해당 프로젝트
(MoodMe) 카드 안에서 "achieved sub-200ms latency in production"으로 맥락과 함께
서술한다. **숫자는 항상 '어디서 나온 값'과 함께.**

### 3.4 [P1] 모든 프로젝트 카드: tool 명시 + 링크 정리

- 각 카드 `stack`에 핵심 tool이 들어있는지 확인(대체로 OK).
- `liveUrl`이 살아있는지 확인. 죽은 링크는 신뢰 직격탄 → 제거하거나 고친다.
- repo가 있으면 항상 "View Repository" 노출(이미 구현됨, [`PortfolioPage.tsx:206`](../components/PortfolioPage.tsx)).
- Argumint의 `liveUrl: https://gumint-theta.vercel.app`가 실제로 뜨는지 확인.

### 3.5 [P2] 직함 통일 + experience bullet에 tool

- Buil 직함을 GitHub/이력서/사이트에서 하나로(실제와 일치하는 쪽).
- bullet 패턴: **동사 + (무엇으로: tool) + 측정 가능한 결과.**

```
Before: "Reduced inference latency by 30% through async refactoring…"
After:  "Cut inference latency 30% by moving to async FastAPI workers
         with a Redis cache layer and modularized services."
```

---

## 4. 사이트 구조/UX 개선

### 4.1 섹션 순서

현재: Hero → Marquee → Projects → Experience → Stack → GitHub → Contact
([`PortfolioPage.tsx`](../components/PortfolioPage.tsx))

권장:
1. **Hero** — positioning 한 줄 + 실제 수치 stat + "fifa2026 라이브" CTA 버튼 1개 추가
2. **Projects** — fifa2026이 첫 카드 (변경 없음, 데이터만)
3. **Experience** — Butterfly Fashion Trading(2025~현재)을 맨 위에 추가
4. Stack / GitHub / Contact (유지)

### 4.2 Hero에 라이브 제품 직링크 CTA

[`PortfolioPage.tsx:57`](../components/PortfolioPage.tsx)의 `ctaRow`에 1개 추가:

```tsx
<a href="https://fifa2026.ca" target="_blank" rel="noreferrer"
   className={styles.primaryButton}>
  View my live store ↗
</a>
```

"라이브 제품을 운영한다"를 말이 아니라 **클릭 가능한 증거**로 만든다.

### 4.3 Experience에 Butterfly 추가

[`portfolioData.ts:42`](../components/portfolioData.ts) `experience` 배열 맨 앞:

```ts
{
  role: "Full-Stack Developer",          // GitHub과 동일 직함으로
  company: "Butterfly Fashion Trading",
  period: "2025 – Present",
  bullets: [
    "Build and operate fifa2026.ca, a live e-commerce platform with Stripe " +
      "payments, Shippo shipping automation, and a Supabase-backed realtime " +
      "admin dashboard.",
    "Shipped a B2B wholesale portal (role-based auth, tiered pricing) with a " +
      "Playwright E2E suite.",
    "Grew the storefront to 175+ products and 718 weekly visitors (+89%)."
  ]
}
```

---

## 5. 기술 디테일 / 마감 (P2)

- **OG 이미지:** [`app/layout.tsx`](../app/layout.tsx)에 `openGraph` 추가 — 링크
  공유 시 fifa2026 스토어 스크린샷이 미리보기로 뜨게. 리크루터가 Slack/이메일로
  프로필 공유할 때 첫인상이 바뀐다.
  ```ts
  openGraph: {
    title: "Hangyeom Lee — ships live products",
    description: "Live e-commerce (Stripe, Shippo, Supabase) + applied AI.",
    images: ["/og.png"],   // 1200×630, fifa2026 + 한 줄 카피
  },
  ```
- **resume.pdf 동기화:** [`public/resume.pdf`](../public/resume.pdf)가 히어로/연락처
  버튼에 연결돼 있다([`PortfolioPage.tsx:61`](../components/PortfolioPage.tsx)).
  이력서를 fifa2026 포함 버전으로 갱신하면 이 파일도 **반드시 같이 교체**.
  사이트는 라이브 제품을 말하는데 다운로드한 PDF엔 없으면 더 큰 불일치가 된다.
- **이미지 최적화:** 이미 `next/image` 사용 중(좋음). 스크린샷은 적당히 압축.
- **접근성:** alt 텍스트 이미 충실. CTA 버튼 contrast만 점검.
- **죽은 링크 점검:** 배포 전 모든 `liveUrl`/`repoUrl` 클릭 테스트.

---

## 6. 실행 로드맵

### 오늘 (≈1시간) — 효과의 80%
1. 레포/배포본 정합성 확정 (§1.0)
2. fifa2026 스크린샷 캡처 → `public/project-shots/`
3. §3.1 프로젝트 객체 추가 (Projects 최상단)
4. §3.2 positioning 3개 surface 통일

### 이번 주 (≈2시간)
5. §3.3 quickStats 실제 수치로 교체
6. §4.3 Butterfly experience 추가 + Buil 직함 통일
7. §4.2 라이브 스토어 CTA 버튼
8. §5 OG 이미지 + resume.pdf 동기화
9. 전 링크 클릭 테스트 후 재배포

### 이번 달 (선택, 차별화)
10. §3.5 모든 bullet에 tool 박기
11. fifa2026 short case study 1건 (문제 → 아키텍처 다이어그램 → Stripe/Shippo/
    Realtime 결정 근거 → 결과 수치). 학부생 중 case study 쓰는 사람은 드물다.

---

## 7. 핵심 메시지 한 줄

> 이 사이트는 "잘 만들어졌지만 약한 걸 보여주고 있다."
> **fifa2026 하나를 최상단에 올리고 3개 surface 메시지를 GitHub 톤으로
> 통일하는 것** — 그게 전체 개선의 80%다. 나머지는 마감이다.
