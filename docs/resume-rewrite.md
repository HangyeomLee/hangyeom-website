# Resume — rewrite (co-op: big tech + technical startups)

> 변경 원칙: fifa2026 / Butterfly를 Experience 최상단으로 · 모든 bullet에 tool 명시 ·
> 검증된 수치만(175+ 상품, ~1,200 주간 방문자) · "(optional)" 제거 · 직함 통일
> (Buil = Full-Stack Developer) · Education은 WaterlooWorks 관례대로 하단.
> 영어는 그대로 이력서에 붙여 쓰면 된다.

---

## Hangyeom (Christian) Lee

h38lee@uwaterloo.ca · 548-390-6986 · github.com/HangyeomLee ·
linkedin.com/in/hangyeomlee · [portfolio URL]

**Full-stack engineer who builds and operates live products — including a
revenue-generating e-commerce platform serving customers across Canada.**

---

### EXPERIENCE

**Full-Stack Developer — Butterfly Fashion Trading**  ·  2025 – Present
- Build and operate **fifa2026.ca**, a live, revenue-generating e-commerce platform
  (**Next.js 15, TypeScript**) serving customers across Canada — **175+ products**,
  **~1,200 weekly visitors**.
- Implemented **Stripe Checkout** with server-side **webhook verification** for
  reliable payment and order state across real customer transactions.
- Automated fulfillment via the **Shippo API**, generating **Canada Post / UPS**
  shipping labels and removing manual steps on every order.
- Built a real-time admin dashboard with live order updates over **WebSockets**,
  backed by **Supabase Realtime (PostgreSQL)**.
- Shipped a separate **B2B wholesale portal** with role-based auth and tiered
  pricing, covered by a **Playwright** end-to-end test suite.

**Full-Stack Developer — Buil Planning**  ·  Jan 2024 – Jun 2024
- Led development of a full-stack AI monitoring platform integrating CCTV
  streaming, backend inference APIs (**FastAPI**), and web-based operator
  dashboards (**React**).
- Designed the end-to-end flow: stream ingestion → async inference → risk
  classification → frontend visualization.
- Built **RESTful APIs** consumed by React dashboards for real-time alert
  rendering and operational analytics.
- Cut inference latency **30%** via async refactoring, **Redis** caching layers,
  and service modularization.
- Supported stable multi-camera processing at **10–15 FPS per stream** under
  production-like deployment.

**AI / ML Intern — MoodMe**  ·  May 2023 – Aug 2023
- Built real-time facial emotion recognition pipelines (**PyTorch**) powering
  interactive browser experiences.
- Converted models to **ONNX Runtime** and ran browser-based inference in a
  **React** app for real-time webcam emotion analysis.
- Deployed containerized inference services on **AWS**, achieving **sub-200 ms**
  end-to-end latency.
- Built **CI/CD** pipelines (**GitHub Actions**) for model validation, container
  builds, and production deployment.

---

### PROJECTS

**Argumint — Real-Time Debate Arena**  ·  2026 · GitHub · Live
- Architected a **WebSocket**-driven real-time system (**FastAPI, PostgreSQL**)
  for live argument, voting, and notification updates.
- Implemented a Reddit-inspired ranking algorithm using vote score with
  **temporal decay**.
- Built an interactive debate-graph visualization with **React Flow**
  (**Next.js, TypeScript**).

**FLUE — Multimodal AI Language Learning Platform**  ·  2026 · GitHub
- Built a mobile-first learning app (**Next.js, TypeScript, TailwindCSS**) for
  Rohingya learners with a 6-step interactive flow (word, draw, phrase, pattern,
  sentence, situation).
- Implemented a **Canvas**-based drawing system with memoized handlers
  (**useCallback**) to avoid re-renders during frequent state updates.
- Added speech input and audio playback via the **Web Speech API** for
  pronunciation practice and real-time feedback.

**Bank FAQ Chatbot — RAG System**  ·  2025 · GitHub
- Built a FAQ chatbot (**FastAPI**) using **retrieval-augmented generation**
  over embedded banking documents.
- Implemented a retrieval pipeline with **Gemini embeddings** and **FAISS**
  vector search for semantic FAQ matching.
- Developed backend APIs and a lightweight web interface for real-time Q&A on
  accounts, loans, and foreign exchange.

---

### TECHNICAL SKILLS

- **Languages:** Python, TypeScript, JavaScript, SQL, C++, C#
- **Frontend:** React, Next.js, TailwindCSS, REST API integration
- **Backend:** Node.js, FastAPI, Django, Flask, REST API design, async processing,
  Redis, WebSockets
- **Databases:** PostgreSQL, Supabase, MongoDB, SQLite
- **Cloud & DevOps:** AWS (EC2, S3), Docker, Linux, CI/CD (GitHub Actions), Playwright
- **Payments & Commerce:** Stripe, Shippo
- **AI / ML:** PyTorch, TensorFlow, ONNX Runtime, RAG pipelines, embeddings,
  computer vision

---

### EDUCATION

**University of Waterloo** — BASc in Systems Design Engineering · Expected May 2029

---

## 무엇이 바뀌었나 (요약)

1. **fifa2026 + Butterfly → Experience 최상단.** 멘토가 17항목에서 요구한
   "tool / 숫자 / 실제 임팩트"를 이 한 항목이 거의 다 충족.
2. **모든 bullet에 tool 박음** (Stripe, Shippo, Supabase, Playwright, FastAPI,
   ONNX, Redis, GitHub Actions …).
3. **"AI (optional)" 제거** — 이력서에서 optional은 약하게 보임. AI는 그냥 한 줄로.
4. **검증된 수치만** — 175+ 상품, ~1,200 주간 방문자. +89%는 출처 불명이라 제외.
5. **직함 통일** — Buil = Full-Stack Developer (GitHub bio도 이걸로 맞출 것).
6. **Skills 정리** — HTML/CSS, "Client-State Management", 중복 Tools 줄 제거.
   대신 Stripe/Shippo/Supabase/Playwright/WebSockets 추가(ATS 키워드 + 실제 사용).
7. **Education 하단 유지** (WaterlooWorks 관례).

## 확인 필요 / 선택

- **Portfolio URL**: 상단 연락처 줄에 배포된 사이트 주소를 넣을 것 (스타트업에 큰 가점).
- **Waterloo TA 경력**: 분석에서 언급됐는데 이력서엔 없음. 실제로 했다면 Experience에
  한 항목 추가 권장(조교 = 커뮤니케이션/리더십 신호).
- **fifa2026 매출 수치**: "revenue-generating"까지만 적고 구체 금액은 비공개. 만약
  공개 가능한 매출/주문 수가 있으면 한 줄 더 강해짐.
