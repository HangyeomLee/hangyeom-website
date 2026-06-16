export const profile = {
  name: "Hangyeom Lee",
  role: "Full-Stack Engineer",
  tagline: ["SHIPPING", "LIVE", "PRODUCTS."],
  subtitle:
    "Full-stack engineer who builds and operates fifa2026.ca — Stripe, Shippo, Supabase Realtime — plus applied-AI and backend systems.",
  location: "Waterloo, ON",
  email: "h38lee@uwaterloo.ca",
  github: "https://github.com/HangyeomLee",
  linkedin: "https://www.linkedin.com/in/hangyeomlee",
  about:
    "I build and operate fifa2026.ca, a live e-commerce platform (Stripe, Shippo, Supabase Realtime) serving customers across Canada, and turn ML-heavy ideas into shippable products. Currently studying Systems Design Engineering at the University of Waterloo. Open to co-op internships in full-stack, product, and AI engineering.",
  availability: "Open to co-op internships in full-stack, product & AI engineering",
  school: "University of Waterloo · Systems Design Engineering",
};

export const buildStatus = {
  lastDeploy: "2h ago",
  activeRepos: 6,
  currentStack: "Next.js / FastAPI",
  lastCommit: "optimize websocket pipeline",
  status: "LIVE",
};

export const experience = [
  {
    role: "Full-Stack Developer",
    company: "Buil Planning",
    period: "Jan 2024 – Jun 2024",
    description:
      "Led development of an AI monitoring platform spanning CCTV streaming, backend inference APIs, and operator dashboards.",
    bullets: [
      "Designed the end-to-end flow from stream ingestion to async inference, risk classification, and frontend visualization.",
      "Built REST APIs consumed by React dashboards for real-time alerts and operational analytics.",
      "Reduced inference latency by 30% through async refactoring, caching, and service modularization.",
      "Supported stable multi-camera processing at 10–15 FPS per stream in production-like deployment.",
    ],
  },
  {
    role: "AI / ML Intern",
    company: "MoodMe",
    period: "May 2023 – Aug 2023",
    description:
      "Trained and productionized real-time facial analysis CNN models for edge and cloud deployment.",
    bullets: [
      "Converted models to ONNX Runtime and deployed containerized inference services on AWS with sub-200 ms latency.",
      "Implemented CI/CD workflows for model validation, container builds, and deployment pipelines.",
    ],
  },
];

export const products = [
  {
    title: "FIFA2026.ca",
    year: "2025–present",
    tag: "Live e-commerce platform",
    stack: [
      "Next.js 15 (App Router)",
      "Stripe Checkout",
      "Shippo API",
      "Supabase Realtime",
      "TypeScript",
      "WebSockets",
      "Playwright",
    ],
    positioning:
      "A live, revenue-generating e-commerce platform I built and operate end to end — storefront, payments, shipping automation, and a real-time admin dashboard serving customers across Canada.",
    summary:
      "Custom Next.js storefront (not a template) with Stripe Checkout, automated Canada Post / UPS shipping labels via Shippo, a Supabase-backed real-time admin dashboard, and a separate B2B wholesale portal — all built and operated by me.",
    impact: [
      "Built Stripe Checkout with server-side webhook verification for reliable payment and order state, handling real customer transactions.",
      "Integrated the Shippo API to auto-generate Canada Post / UPS shipping labels, removing manual fulfillment for every order.",
      "Designed an admin dashboard with live order updates over WebSockets backed by Supabase Realtime (Postgres).",
      "Shipped a separate B2B wholesale portal with role-based auth, tiered pricing, and a Playwright E2E test suite.",
      "Grew to 175+ live products and ~1,200 weekly visitors.",
    ],
    result: "Live storefront + B2B wholesale portal serving customers across Canada",
    image: "/project-shots/fifa2026-shop.png",
    imageAlt: "FIFA2026.ca live product catalog",
    repoUrl: null,
    liveUrl: "https://fifa2026.ca",
    captureLabel: "Captured from the live site",
    gradient: "linear-gradient(135deg, #0d0d1a 0%, #1a1032 40%, #0f2040 100%)",
    accentColor: "#c4b5fd",
    gallery: [
      { image: "/project-shots/fifa2026-hero.png", alt: "FIFA2026.ca storefront hero", label: "Storefront" },
      { image: "/project-shots/fifa2026-product.png", alt: "FIFA2026.ca product detail page", label: "Product" },
      { image: "/project-shots/fifa2026-location.png", alt: "FIFA2026.ca Toronto pickup information", label: "Pickup" },
    ],
  },
  {
    title: "AI Monitoring Platform",
    year: "2024",
    tag: "Applied AI system",
    stack: ["Python", "Flask", "Django", "Computer Vision", "WebSockets", "Redis"],
    positioning:
      "Real-time crowd density monitoring pipeline with streaming analysis, operator alerts, and dashboard monitoring.",
    summary:
      "End-to-end system spanning RTSP stream ingestion, async inference, crowd density analysis, and an operator-facing Django dashboard with live alerts.",
    impact: [
      "Designed the complete pipeline: stream ingestion → inference → density analysis → operator dashboard.",
      "Focused the detection strategy on head counting for dense environments where full-body detection fails.",
      "Achieved stable multi-camera processing at 10–15 FPS per stream with 30% lower latency after async refactor.",
    ],
    result: "Safety-oriented multi-service architecture for dense crowd scenarios",
    image: "/project-shots/cctv-plaza-feed.png",
    imageAlt: "CCTV crowd monitoring feed",
    repoUrl: "https://github.com/HangyeomLee/cctv",
    liveUrl: null,
    captureLabel: "Captured from local Django build",
    gallery: [
      { image: "/project-shots/cctv-home.png", alt: "CCTV monitoring overview", label: "Overview" },
      { image: "/project-shots/cctv-area.png", alt: "CCTV area view", label: "Area View" },
      { image: "/project-shots/cctv-detail.png", alt: "CCTV detail monitor", label: "Detail" },
    ],
  },
  {
    title: "Argumint",
    year: "2026",
    tag: "Live product",
    stack: ["Next.js", "FastAPI", "PostgreSQL", "WebSockets", "Docker"],
    positioning:
      "Real-time daily debate arena with live ranking, topic generation, reputation tiers, and analytics-rich interaction loops.",
    summary:
      "Polished debate platform connecting Next.js frontend to FastAPI services, real-time WebSocket ranking, and a branded product identity that feels competitive.",
    impact: [
      "Connected a polished Next.js frontend to FastAPI services, auth, ranking logic, and real-time updates.",
      "Designed a product identity that feels playful and competitive without losing information density.",
      "Deployed live at gumint-theta.vercel.app with real onboarding and debate flows.",
    ],
    result: "Debate platform with branded landing, rules, and onboarding flows",
    image: "/project-shots/argumint-home.png",
    imageAlt: "Argumint landing page",
    repoUrl: "https://github.com/HangyeomLee/argumint",
    liveUrl: "https://gumint-theta.vercel.app",
    captureLabel: "Captured from local build",
    gallery: [
      { image: "/project-shots/argumint-rules.png", alt: "Argumint rules page", label: "Rules" },
      { image: "/project-shots/argumint-login.png", alt: "Argumint login", label: "Login" },
      { image: "/project-shots/argumint-register.png", alt: "Argumint register", label: "Register" },
    ],
  },
  {
    title: "FLUE",
    year: "2026",
    tag: "AI for good",
    stack: ["Next.js", "TypeScript", "Framer Motion", "Canvas API", "OpenRouter"],
    positioning:
      "Visual and oral-first English learning app for Rohingya learners — pictures, listening, speaking, real-world scenarios.",
    summary:
      "Six-step learning flow combining drawing, speech, phrase building, and video-based situation practice — designed for low-literacy learners on mobile.",
    impact: [
      "Built a six-step learning flow combining drawing, speech, phrase building, and video-based situation practice.",
      "Designed for low-literacy learners by prioritizing icons, audio feedback, and mobile-first interaction patterns.",
      "Multimodal interaction powered by OpenRouter with Canvas-based drawing exercises.",
    ],
    result: "Inclusive mobile-first language learning product with multimodal interaction",
    image: "/project-shots/flue-learn.png",
    imageAlt: "FLUE lesson screen",
    repoUrl: "https://github.com/HangyeomLee/flue",
    liveUrl: null,
    captureLabel: "Captured from local Next.js build",
    gallery: [
      { image: "/project-shots/flue-topics.png", alt: "FLUE topic selection", label: "Topics" },
      { image: "/project-shots/flue-home.png", alt: "FLUE onboarding", label: "Onboarding" },
    ],
  },
];

export const labExperiments = [
  {
    title: "Orange Cat Universe",
    tag: "Character AI",
    description:
      "AI-native character storytelling experiment. Generative narrative systems, persistent character identity, and multi-modal scene construction.",
    status: "ongoing",
    accentColor: "#fb923c",
  },
  {
    title: "AI Film Experiments",
    tag: "Generative visuals",
    description:
      "Cinematic motion experiments using AI-generated visuals, generative scene direction, and motion systems that feel authored rather than generated.",
    status: "ongoing",
    accentColor: "#c4b5fd",
  },
  {
    title: "Interface Concepts",
    tag: "Motion prototypes",
    description:
      "Interaction systems and motion prototypes exploring the space between product design and engineering — things that should exist but don't yet.",
    status: "ongoing",
    accentColor: "#22d3ee",
  },
];

export const featuredRepos = [
  { name: "argumint", label: "Live demo + source", url: "https://github.com/HangyeomLee/argumint" },
  { name: "hangyeom-website", label: "This portfolio", url: "https://github.com/HangyeomLee/hangyeom-website" },
  { name: "cctv", label: "AI monitoring system", url: "https://github.com/HangyeomLee/cctv" },
  { name: "flue", label: "AI for good app", url: "https://github.com/HangyeomLee/flue" },
  { name: "Bank_Chatbot", label: "RAG chatbot", url: "https://github.com/HangyeomLee/Bank_Chatbot" },
];

export const navLinks = [
  { label: "Work", href: "#products" },
  { label: "Experience", href: "#experience" },
  { label: "Lab", href: "#lab" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];
