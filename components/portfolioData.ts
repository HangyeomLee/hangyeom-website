export const profile = {
  name: "Hangyeom Lee",
  role: "Full-Stack Engineer",
  headline: "I build and operate production systems.",
  subtitle:
    "Systems Design Engineering student at the University of Waterloo. I design and operate production backend systems end to end — database security models, payment infrastructure, and on-prem ML serving — and ship full-stack products from architecture to deployment.",
  location: "Waterloo / Toronto, ON, Canada",
  email: "h38lee@uwaterloo.ca",
  github: "https://github.com/HangyeomLee",
  linkedin: "https://www.linkedin.com/in/hangyeomlee",
  about:
    "I design and operate production systems end to end — not just features. I built the role-based access control and Row Level Security model, payments pipeline, and admin tooling behind mask12.com, a live B2B wholesale platform I run solo. I've also built an on-prem inference server for a government crowd-safety project, serving a 50GB+ vision model with no cloud dependency. I'm currently studying Systems Design Engineering at the University of Waterloo and looking for co-op internships in full-stack, backend, and AI/ML engineering.",
  // TODO(user): confirm exact co-op term (e.g. "Winter 2027") and add it here.
  availability: "Seeking co-op internships — full-stack / backend / AI",
  school: "University of Waterloo · Systems Design Engineering",
};

export const metrics = [
  { value: "13", label: "DB tables secured with role-based RLS" },
  { value: "83%", label: "crowd-detection accuracy (+7pp)" },
  { value: "30%", label: "inference latency cut" },
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
      "Independently designed, built, and operate the e-commerce infrastructure for a wholesale apparel business — auth, payments, shipping, and admin systems — on Next.js 15, TypeScript, Supabase, and Vercel.",
    bullets: [
      "Designed a three-tier role-based access control model (admin, B2B wholesale, guest) and audited/built Row Level Security policies across all 13 database tables, enforcing wholesale pricing, order, and PII access at the database layer instead of application code.",
      "Built the Stripe Checkout payment pipeline with server-side webhook signature verification and idempotency handling to prevent duplicate charges and lost orders, and integrated QuickBooks to auto-sync transaction records.",
      "Found and fixed a production shipping-label double-billing bug by tracing the root cause to a duplicate API call, then added idempotency-key safeguards to prevent recurrence.",
      "Automated Canada Post / UPS label generation and rate comparison via the Shippo API, and designed an admin workflow letting non-technical operators handle order confirmation through label printing without engineering involvement.",
      "Identified and consolidated Supabase queries running redundantly across layout and page components in the App Router, cutting unnecessary DB calls per page load.",
    ],
  },
  {
    role: "Communications Specialist",
    company: "Republic of Korea Army (Mandatory Service)",
    period: "Jun 2024 – Dec 2025",
    description:
      "Operated unit communications systems and built command-post communications infrastructure for field exercises.",
    bullets: [
      "Built end-to-end communications infrastructure for command posts during field exercises — network cable design and termination (straight-through / crossover), network segmentation, VPN configuration, and multi-microphone audio systems, spanning the physical through network layers.",
      "Operated and maintained unit communications and computer systems, handling daily operations and troubleshooting under constrained equipment and time.",
    ],
  },
  {
    role: "Full-Stack Developer, AI/ML",
    company: "Buil Planning",
    period: "Jan 2024 – Jun 2024",
    description:
      "Built a real-time crowd-density monitoring platform for Busan Station Plaza CCTV feeds — a government-procured public-safety project launched after the 2022 Itaewon crowd crush — covering on-prem model serving, the inference pipeline, and the operator dashboard API.",
    bullets: [
      "Built a Docker-based on-prem inference server to serve a 50GB+ crowd-counting (IIM) model with no cloud dependency, since the security requirements barred public CCTV footage from leaving the premises.",
      "Fine-tuned the pretrained IIM model via transfer learning on real Busan Station Plaza conditions (camera angle, lighting, crowd patterns), improving detection accuracy from 76% to 83% (+7pp).",
      "Refactored a procedural model codebase into an object-oriented architecture, then introduced multithreading and async processing so long-running streams no longer blocked others — cutting inference latency 30%.",
      "Worked around real-time detector accuracy limits by designing a near-real-time pipeline that aggregates asynchronous per-stream inference into 1-minute windows and flags density spikes from heat-point events, sustaining a stable 10–15 FPS per stream across multiple cameras.",
      "Built the REST API consumed by a React operations dashboard, delivering real-time density alerts and operational analytics.",
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
      "Owned the path to production for a CNN-based facial emotion recognition model at a real-time facial-analysis SDK company — from model training, through ONNX conversion, to cloud inference deployment and a real-time demo web app.",
    bullets: [
      "Trained a facial emotion recognition CNN and converted it to ONNX Runtime, removing framework lock-in and making it deployable to both edge and cloud targets.",
      "Deployed the containerized inference service to AWS and built an end-to-end demo streaming inference results to a web app in real time over a REST API — a complete, customer-demoable data pipeline, not just model inference.",
      "Implemented a CI/CD workflow (validate model → build container → deploy), removing manual deployment steps on every model update.",
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
    slug: "mask12",
    title: "Mask12.com",
    year: "2025–present",
    tag: "B2B wholesale platform",
    oneLiner:
      "Wholesale e-commerce platform I designed and operate solo — RBAC + Row Level Security, Stripe payments, Shippo shipping automation.",
    stack: [
      "Next.js 15 (App Router)",
      "TypeScript",
      "Supabase (Postgres + RLS)",
      "Stripe Checkout",
      "Shippo API",
      "QuickBooks API",
      "Vercel",
    ],
    positioning:
      "The ongoing wholesale platform for an apparel trading business — designed and operated solo, from the database security model to payments, shipping, and admin tooling. This is the company's primary, continuously operated sales channel, not a short-lived storefront.",
    summary:
      "Custom Next.js platform (not a template) with a three-tier role-based access control model backed by database-level Row Level Security, a Stripe Checkout pipeline with webhook verification and idempotency handling, Shippo-automated shipping labels, and QuickBooks-synced accounting — all built and operated by me.",
    impact: [
      "Designed a three-tier RBAC model (admin, B2B wholesale, guest) and audited/built Row Level Security policies across all 13 database tables, enforcing wholesale pricing and PII access at the database layer, not in application code.",
      "Built the Stripe Checkout pipeline with server-side webhook signature verification and idempotency handling to prevent duplicate charges and lost orders.",
      "Integrated QuickBooks to auto-sync transaction records, removing manual bookkeeping.",
      "Found and fixed a production shipping-label double-billing bug by tracing it to a duplicate API call, then added idempotency-key safeguards to prevent recurrence.",
      "Automated Canada Post / UPS label generation and rate comparison via the Shippo API, with an admin workflow non-technical operators use end to end.",
      "Refactored redundant Supabase queries running in both layout and page components under the App Router, cutting DB calls per page load.",
    ],
    result: "Live wholesale platform handling real B2B orders, payments, and fulfillment",
    image: "/project-shots/mask12-placeholder.svg",
    imageAlt: "Mask12.com — screenshot pending",
    repoUrl: null,
    liveUrl: "https://mask12.com",
    captureLabel: "Screenshots pending — placeholder until captured from the live site",
    gradient: "linear-gradient(135deg, #0d1a12 0%, #123120 45%, #0f2018 100%)",
    accentColor: "#a7f3d0",
    gallery: [],
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
