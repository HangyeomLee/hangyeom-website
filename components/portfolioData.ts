export const profile = {
  name: "Hangyeom Lee",
  role: "Full-Stack Engineer",
  headline: "I build and operate live products.",
  subtitle:
    "Systems Design Engineering student at the University of Waterloo. I built and run fifa2026.ca — a live e-commerce platform with Stripe payments, Shippo shipping automation, and a real-time admin dashboard — alongside applied-AI and backend systems.",
  location: "Waterloo / Toronto, ON, Canada",
  email: "h38lee@uwaterloo.ca",
  github: "https://github.com/HangyeomLee",
  linkedin: "https://www.linkedin.com/in/hangyeomlee",
  about:
    "I build and operate fifa2026.ca, a live e-commerce platform I own end to end — architecture, Stripe payments, Shippo shipping automation, SEO, analytics, and admin tooling. I launched it as a B2C storefront processing real transactions, then pivoted to B2B wholesale after analyzing demand. I'm currently studying Systems Design Engineering at the University of Waterloo and looking for co-op internships in full-stack, product, and AI engineering.",
  // TODO(user): confirm exact co-op term (e.g. "Winter 2027") and add it here.
  availability: "Seeking co-op internships — full-stack / product / AI",
  school: "University of Waterloo · Systems Design Engineering",
};

export const metrics = [
  { value: "718", label: "weekly visitors on fifa2026.ca" },
  { value: "+89%", label: "traffic growth" },
  { value: "175+", label: "live products in catalog" },
  { value: "4", label: "shipped products" },
];

export type ExperienceEntry = {
  role: string;
  company: string;
  period: string;
  description: string;
  bullets: string[];
};

export const experience: ExperienceEntry[] = [
  {
    role: "Full-Stack Developer",
    company: "Butterfly Fashion Trading",
    period: "2025 – present",
    description:
      "Built and operate fifa2026.ca, a live e-commerce platform, end to end: architecture, payments, shipping, SEO, analytics, and admin tooling.",
    bullets: [
      "Launched a B2C storefront with Stripe Checkout and server-side webhook verification, processing real customer transactions.",
      "Integrated the Shippo API to auto-generate Canada Post / UPS shipping labels, removing manual fulfillment work.",
      "Pivoted the platform to B2B wholesale after analyzing demand, rebuilding the funnel around inquiry-driven sales.",
      "Grew the catalog to 175+ live products and traffic to 718 weekly visitors (+89%).",
    ],
  },
  {
    role: "AI/ML Intern",
    company: "Buil Planning",
    period: "Jan 2024 – Jun 2024",
    description:
      "Worked on an AI monitoring platform spanning CCTV streaming, backend inference APIs, and operator dashboards.",
    bullets: [
      "Designed the end-to-end flow from stream ingestion to async inference, risk classification, and frontend visualization.",
      "Built REST APIs consumed by React dashboards for real-time alerts and operational analytics.",
      "Reduced inference latency by 30% through async refactoring, caching, and service modularization.",
      "Supported stable multi-camera processing at 10–15 FPS per stream in production-like deployment.",
    ],
  },
  {
    role: "Teaching Assistant",
    company: "University of Waterloo",
    period: "Sep 2023 – Dec 2023",
    description:
      "Supported undergraduate instruction: graded assignments, held office hours, and helped students work through course material.",
    bullets: [],
  },
  {
    role: "AI/ML Intern",
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

export type Product = {
  slug: string;
  title: string;
  year: string;
  tag: string;
  oneLiner: string;
  stack: string[];
  positioning: string;
  summary: string;
  impact: string[];
  result: string;
  image: string;
  imageAlt: string;
  repoUrl: string | null;
  liveUrl: string | null;
  captureLabel: string;
  gradient?: string;
  accentColor?: string;
  gallery: { image: string; alt: string; label: string }[];
};

export const products: Product[] = [
  {
    slug: "fifa2026",
    title: "FIFA2026.ca",
    year: "2025–present",
    tag: "Live e-commerce platform",
    oneLiner:
      "Live e-commerce platform I built and operate end to end — Stripe, Shippo, 175+ products, 718 weekly visitors.",
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
      "A live e-commerce platform I built and operate end to end — storefront, payments, shipping automation, and a real-time admin dashboard. Launched B2C with Stripe payments, then pivoted to B2B wholesale after demand analysis.",
    summary:
      "Custom Next.js storefront (not a template) with Stripe Checkout, automated Canada Post / UPS shipping labels via Shippo, a Supabase-backed real-time admin dashboard, and a separate B2B wholesale portal — all built and operated by me.",
    impact: [
      "Built Stripe Checkout with server-side webhook verification for reliable payment and order state, handling real customer transactions during the B2C phase.",
      "Integrated the Shippo API to auto-generate Canada Post / UPS shipping labels, removing manual fulfillment for every order.",
      "Designed an admin dashboard with live order updates over WebSockets backed by Supabase Realtime (Postgres).",
      "Shipped a separate B2B wholesale portal with role-based auth, tiered pricing, and a Playwright E2E test suite.",
      "Pivoted from B2C checkout to B2B wholesale inquiries after analyzing demand — the live site now routes buyers to wholesale channels.",
      "Grew to 175+ live products and 718 weekly visitors (+89%).",
    ],
    result: "Live platform serving retail-turned-wholesale customers across Canada",
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
    slug: "ai-monitoring",
    title: "AI Monitoring Platform",
    year: "2024",
    tag: "Applied AI system",
    oneLiner:
      "Real-time crowd monitoring pipeline — RTSP ingestion, async inference, 10–15 FPS per stream, 30% lower latency.",
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
    slug: "argumint",
    title: "Argumint",
    year: "2026",
    tag: "Live product",
    oneLiner:
      "Real-time debate arena — Next.js + FastAPI, live WebSocket ranking, deployed and open for signups.",
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
    slug: "flue",
    title: "FLUE",
    year: "2026",
    tag: "AI for good",
    oneLiner:
      "Visual-first English learning app for low-literacy Rohingya learners — drawing, speech, and scenario practice on mobile.",
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

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export const featuredRepos = [
  { name: "argumint", label: "Live demo + source", url: "https://github.com/HangyeomLee/argumint" },
  { name: "hangyeom-website", label: "This portfolio", url: "https://github.com/HangyeomLee/hangyeom-website" },
  { name: "cctv", label: "AI monitoring system", url: "https://github.com/HangyeomLee/cctv" },
  { name: "flue", label: "AI for good app", url: "https://github.com/HangyeomLee/flue" },
  { name: "Bank_Chatbot", label: "RAG chatbot", url: "https://github.com/HangyeomLee/Bank_Chatbot" },
];
