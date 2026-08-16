export const profile = {
  name: "Hangyeom Christian Lee",
  role: "Full-Stack Engineer",
  headline: "I build and operate production systems.",
  subtitle:
    "Systems Design Engineering student at the University of Waterloo. I build production e-commerce systems end to end — access control, payments, fulfillment, and the operational tooling non-technical staff actually use — and I've shipped applied-AI systems from on-prem model serving to deployed inference APIs.",
  location: "Waterloo / Toronto, ON, Canada",
  email: "h38lee@uwaterloo.ca",
  github: "https://github.com/HangyeomLee",
  linkedin: "https://www.linkedin.com/in/hangyeomlee",
  about:
    "I'm a Systems Design Engineering student at the University of Waterloo (expected 2029). My work has spanned full-stack web development, computer vision deployment, and B2B operations. Most recently I built and launched an e-commerce platform for a wholesale distributor as the only developer — the data model and access control, the payment pipeline, the shipping automation — then handed off a system that non-technical staff now run without me. Before that I deployed a government-commissioned crowd-counting system on-prem in Busan and productionized a facial emotion recognition CNN on AWS. Bilingual in Korean and English.",
  // TODO(user): confirm exact co-op term (e.g. "Winter 2027") and add it here.
  availability: "Seeking co-op internships — full-stack / backend / AI",
  school: "University of Waterloo · Systems Design Engineering",
};

export const metrics = [
  { value: "66", label: "new B2B accounts on the platform I shipped" },
  { value: "13", label: "Postgres tables behind row-level security" },
  { value: "76→83%", label: "crowd-model accuracy after transfer learning" },
  { value: "30%", label: "inference latency cut on the CV pipeline" },
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
    period: "May 2026 – present · Toronto",
    description:
      "Sole developer for a wholesale distribution business operating since 1996. Built and launched the company's e-commerce platform on Next.js 15, TypeScript, Supabase, Stripe, Shippo, and Vercel, then moved to a part-time remote role covering site maintenance and digital marketing.",
    bullets: [
      "Shipped a B2B/B2C e-commerce platform as the only developer — launched mid-June 2026, still in production and run day to day by non-technical staff.",
      "Implemented a three-tier role model (admin / B2B wholesale / guest) with row-level security policies across 13 database tables, so wholesale pricing and customer data are enforced at the database layer rather than in application code.",
      "Built the Stripe payment pipeline with webhook signature verification and idempotency handling, and integrated QuickBooks to sync transaction records.",
      "Automated Canada Post and UPS label generation through Shippo, so staff process orders from confirmation to printed label without developer involvement.",
      "Wrapped category fetching in React's cache() to stop duplicate Supabase queries firing from both layout and page under the App Router.",
      "Diagnosed and resolved a double-billing bug introduced by the migration from a static site to a backend order flow: a checkout button with no double-click guard, combined with a re-firing useEffect, sent duplicate API calls. Caught it independently through Stripe, disabled checkout while patching, shipped the fix in about two days, and refunded affected orders.",
      "Identified a tax defect where the platform applied Ontario's 13% HST regardless of destination province — surfaced by orders shipping to Manitoba and Newfoundland & Labrador — and flagged it for correction and accountant review.",
      "Built an emergency kill switch before handoff and transferred all platform accounts and billing (Vercel, Supabase, Stripe, Shippo, domain) to company ownership.",
      "On the growth side: the platform brought in 66 new B2B customers beyond existing accounts, and 11 Meta campaigns produced 1,022 messaging conversations on ~$314 of spend ($0.31 blended per conversation, $0.19 on the best-performing campaign).",
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
    role: "Software Engineer",
    company: "Buil Planning",
    period: "Jan 2024 – Jun 2024 · Busan, South Korea",
    description:
      "Built a real-time crowd-density monitoring platform for Busan Station Plaza CCTV feeds — a government-commissioned public-safety project launched after the 2022 Itaewon crowd crush — covering on-prem model serving, the inference pipeline, and the operator dashboard API.",
    bullets: [
      "Built a Docker-based on-prem inference server to serve a 50GB+ crowd-counting (IIM) model with no cloud dependency, since security requirements barred public CCTV footage from leaving the premises.",
      "Fine-tuned the pretrained IIM model via transfer learning on real Busan Station Plaza conditions (camera angle, lighting, crowd patterns), improving detection accuracy from 76% to 83%.",
      "Refactored a procedural model codebase into an object-oriented architecture, then introduced multithreading and async processing so long-running streams no longer blocked others — cutting inference latency 30%.",
      "Worked around real-time detector accuracy limits by designing a near-real-time pipeline that aggregates asynchronous per-stream inference into 1-minute windows and flags density spikes, sustaining a stable 10–15 FPS per stream across multiple cameras.",
      "Built the REST API consumed by a React operations dashboard, delivering density alerts and operational analytics.",
    ],
  },
  {
    role: "Teaching Assistant",
    company: "University of Waterloo",
    period: "Sep 2023 – Dec 2023",
    description:
      "Teaching assistant for Calculus and Linear Algebra, supporting 100+ undergraduate students: graded assignments, held office hours, and worked through problem sets one-on-one.",
    bullets: [],
  },
  {
    role: "Machine Learning Engineer (Intern)",
    company: "MoodMe",
    period: "May 2023 – Aug 2023 · Remote",
    description:
      "Owned the path to production for a CNN-based facial emotion recognition model at a real-time facial-analysis SDK company — from model training, through ONNX conversion, to cloud inference deployment and a real-time demo web app.",
    bullets: [
      "Trained a facial emotion recognition CNN and converted it to ONNX Runtime, removing framework lock-in and making it deployable to both edge and cloud targets.",
      "Deployed the containerized inference service to AWS and built an end-to-end demo streaming inference results to a web app in real time over a REST API — a complete, customer-demoable pipeline, not just model inference.",
      "Implemented a CI/CD workflow (validate model → build container → deploy), removing manual deployment steps on every model update.",
    ],
  },
];

export type SkillGroup = {
  label: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  { label: "Languages", items: ["TypeScript", "JavaScript", "Python", "SQL"] },
  { label: "Frontend", items: ["React", "Next.js (App Router)", "Tailwind CSS", "Framer Motion"] },
  {
    label: "Backend & Data",
    items: ["Node.js", "PostgreSQL", "Supabase", "Row Level Security", "Django", "Flask", "FastAPI", "REST APIs"],
  },
  { label: "Infrastructure", items: ["Vercel", "Docker", "AWS (EC2 / S3)", "Linux", "GitHub Actions", "ONNX Runtime"] },
  {
    label: "Integrations",
    items: ["Stripe (payments + webhooks)", "Shippo (Canada Post / UPS)", "QuickBooks API", "Meta Ads"],
  },
  { label: "Testing", items: ["Playwright (E2E)"] },
  {
    label: "ML & Computer Vision",
    items: ["PyTorch", "TensorFlow", "OpenCV", "Transfer learning", "CNN deployment", "Model optimization"],
  },
  { label: "Other", items: ["Git", "Figma", "Bilingual — Korean / English"] },
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
  caseStudy?: { problem: string; approach: string; tradeoff: string };
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
    title: "mask12.com",
    year: "2026 – present",
    tag: "Production e-commerce",
    oneLiner:
      "Wholesale storefront I built and launched as the only developer — one system serving B2B accounts and retail buyers, with price separation enforced in the database.",
    stack: [
      "Next.js 15 (App Router)",
      "TypeScript",
      "Supabase (Postgres + RLS)",
      "Stripe",
      "Shippo API",
      "QuickBooks API",
      "Vercel",
    ],
    positioning:
      "Production storefront for a wholesale distributor operating since 1996, serving both B2B accounts and retail customers from a single system. Built solo — data model, access control, payments, fulfillment, and admin tooling — and handed off to staff who run it without me.",
    summary:
      "A custom Next.js platform, not a template. Three roles (admin, B2B wholesale, guest) resolve to different prices off the same catalog; Stripe handles checkout with webhook verification and idempotency; Shippo turns a confirmed order into a Canada Post or UPS label; QuickBooks receives the transaction record. Launched mid-June 2026 and still in production.",
    caseStudy: {
      problem:
        "Wholesale pricing has to stay invisible to retail customers. If it leaks, retail buyers have no reason to pay retail and the channel breaks down. The platform had to run both price tiers in one system with strict separation — and the separation had to hold even when I shipped a mistake.",
      approach:
        "Rather than checking permissions in every API route, access control lives in the database via row-level security. Once RLS is enabled, a table denies everything by default. A mistake in application code leaks data; a mistake in a policy just makes data fail to show up. Working solo with no code review, that was the safer failure mode.",
      tradeoff:
        "Blocked queries come back as empty results rather than errors, which makes debugging harder — an empty list doesn't tell you whether the row is missing or a policy is filtering it. I traded debuggability for a failure mode that fails closed.",
    },
    impact: [
      "Implemented a three-tier role model (admin, B2B wholesale, guest) with row-level security policies across 13 database tables, enforcing wholesale pricing and customer data access at the database layer instead of in application code.",
      "Built the Stripe payment pipeline with server-side webhook signature verification and idempotency handling to prevent duplicate charges and lost orders.",
      "Automated Canada Post / UPS label generation and rate comparison through the Shippo API, with an admin workflow non-technical operators use end to end.",
      "Integrated QuickBooks to sync transaction records, removing manual bookkeeping.",
      "Caught a double-billing bug after the migration to a backend order flow — an unguarded checkout button plus a re-firing useEffect sent duplicate requests. Found it in Stripe myself, disabled checkout, patched in about two days, refunded affected orders.",
      "Cut duplicate Supabase queries by wrapping category fetching in React's cache(), so layout and page share one request under the App Router.",
      "Built an emergency kill switch and transferred all platform accounts and billing to company ownership at handoff.",
    ],
    result: "Launched June 2026 · 66 new B2B accounts · still in production, operated by non-technical staff",
    image: "/project-shots/mask12-home.webp",
    imageAlt: "mask12.com wholesale storefront homepage",
    repoUrl: null,
    liveUrl: "https://mask12.com",
    captureLabel: "Captured from the live site, August 2026 · source is private (company-owned)",
    gradient: "linear-gradient(135deg, #0d1a12 0%, #123120 45%, #0f2018 100%)",
    accentColor: "#a7f3d0",
    gallery: [
      {
        image: "/project-shots/mask12-catalog.webp",
        alt: "mask12.com catalog with wholesale pricing hidden from guests",
        label: "Price gate (guest view)",
      },
      {
        image: "/project-shots/mask12-product.webp",
        alt: "mask12.com product detail page with locked wholesale pricing",
        label: "Product detail",
      },
      {
        image: "/project-shots/mask12-collection.webp",
        alt: "mask12.com wholesale collection page",
        label: "Collection",
      },
      {
        image: "/project-shots/mask12-wholesale.webp",
        alt: "mask12.com wholesale catalog request form",
        label: "B2B lead capture",
      },
    ],
  },
  {
    slug: "ai-monitoring",
    title: "AI Crowd Monitoring Platform",
    year: "2024",
    tag: "Applied AI system",
    oneLiner:
      "Real-time crowd monitoring for Busan Station Plaza — on-prem serving of a 50GB+ model, async inference, 10–15 FPS per stream, 30% lower latency.",
    stack: ["Python", "Docker", "Flask", "Django", "Computer Vision", "Multithreading", "Redis"],
    positioning:
      "A government-commissioned public-safety system: RTSP CCTV ingestion, crowd-density inference, risk classification, and an operator dashboard — all served on-premise because the footage was not allowed to leave the building.",
    summary:
      "End-to-end pipeline spanning stream ingestion, asynchronous inference on a fine-tuned IIM crowd-counting model, per-area density analysis over operator-defined polygons, and a REST API feeding a live operations dashboard.",
    caseStudy: {
      problem:
        "Public CCTV footage could not leave the premises, which ruled out every managed inference service. A 50GB+ crowd-counting model had to run on the operator's own hardware, across multiple camera streams, fast enough to be useful during a crowd surge.",
      approach:
        "Containerized the model into an on-prem Docker inference server and restructured a procedural codebase into object-oriented services, so streams could be processed concurrently instead of serially. Density is computed inside operator-drawn target polygons rather than over the whole frame.",
      tradeoff:
        "Real-time per-frame accuracy was not achievable at that model size on that hardware, so the pipeline aggregates asynchronous per-stream inference into 1-minute windows. It reports trends and spikes, not instantaneous counts.",
    },
    impact: [
      "Built a Docker-based on-prem inference server for a 50GB+ crowd-counting (IIM) model with no cloud dependency.",
      "Fine-tuned the model via transfer learning on real plaza conditions, improving detection accuracy from 76% to 83%.",
      "Refactored the pipeline to object-oriented services with multithreading and async processing, cutting inference latency 30% and sustaining 10–15 FPS per stream across multiple cameras.",
      "Modelled locations, cameras, and target-area polygons in the Django backend so operators could monitor specific zones rather than whole frames.",
      "Built the REST API consumed by the React operations dashboard for density alerts and analytics.",
    ],
    result: "Deployed for a public-safety deployment at Busan Station Plaza",
    image: "/project-shots/cctv-plaza-feed.webp",
    imageAlt: "CCTV crowd monitoring feed",
    repoUrl: "https://github.com/HangyeomLee/cctv",
    liveUrl: null,
    captureLabel: "Captured from the local Django build",
    gallery: [
      { image: "/project-shots/cctv-home.webp", alt: "CCTV monitoring overview", label: "Overview" },
      { image: "/project-shots/cctv-area.webp", alt: "CCTV area view", label: "Target areas" },
      { image: "/project-shots/cctv-detail.webp", alt: "CCTV detail monitor", label: "Detail" },
    ],
  },
  {
    slug: "flue",
    title: "FLUE",
    year: "2026",
    tag: "Multimodal learning app",
    oneLiner:
      "English learning for low-literacy Rohingya learners — a six-step flow built on drawing, speech, and AI evaluation instead of text.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Canvas API", "Web Speech API", "OpenRouter"],
    positioning:
      "A visual and oral-first English learning app for Rohingya learners, designed for people who cannot rely on reading to learn — pictures, listening, speaking, and real-world scenarios.",
    summary:
      "Six-step learning flow combining a drawing canvas, speech input and playback through the Web Speech API, phrase building, and multimodal LLM evaluation of what the learner drew and said — all mobile-first.",
    impact: [
      "Built a six-step learning flow that moves from picture recognition through speech to full scenario practice, with no step that requires reading.",
      "Implemented a Canvas-based drawing exercise and speech interaction via the Web Speech API, then routed both to a multimodal LLM for evaluation.",
      "Designed for low-literacy learners on mobile: icon-first navigation, audio feedback, and large touch targets over dense text.",
    ],
    result: "Inclusive mobile-first language learning app with text, speech, drawing, and AI evaluation",
    image: "/project-shots/flue-learn.webp",
    imageAlt: "FLUE lesson screen",
    repoUrl: "https://github.com/HangyeomLee/flue",
    liveUrl: null,
    captureLabel: "Captured from the local Next.js build",
    gallery: [
      { image: "/project-shots/flue-topics.webp", alt: "FLUE topic selection", label: "Topics" },
      { image: "/project-shots/flue-home.webp", alt: "FLUE onboarding", label: "Onboarding" },
    ],
  },
  {
    slug: "argumint",
    title: "Argumint",
    year: "2026",
    tag: "Personal project",
    oneLiner:
      "Real-time debate arena — live WebSocket voting and a ranking that decays with time, with arguments rendered as a graph rather than a thread.",
    stack: ["Next.js", "FastAPI", "PostgreSQL", "WebSockets", "React Flow", "Docker"],
    positioning:
      "A daily debate arena where arguments are a graph, not a comment thread — live voting, reputation tiers, and a ranking that lets new arguments overtake old ones.",
    summary:
      "Next.js frontend against FastAPI services with auth, live vote updates over WebSockets, and a React Flow canvas that renders how arguments relate to each other instead of stacking them chronologically.",
    impact: [
      "Ranked arguments by vote score combined with temporal decay, so an early argument can't sit at the top purely on age.",
      "Pushed vote counts and notifications to connected clients over WebSockets for live state without polling.",
      "Rendered argument and rebuttal relationships as a graph with React Flow, making the shape of a debate visible at a glance.",
    ],
    result: "Working debate platform with auth, live ranking, and graph-based argument view",
    image: "/project-shots/argumint-home.webp",
    imageAlt: "Argumint landing page",
    repoUrl: "https://github.com/HangyeomLee/argumint",
    liveUrl: null,
    captureLabel: "Captured from the local build · not currently deployed",
    gallery: [
      { image: "/project-shots/argumint-rules.webp", alt: "Argumint rules page", label: "Rules" },
      { image: "/project-shots/argumint-login.webp", alt: "Argumint login", label: "Login" },
      { image: "/project-shots/argumint-register.webp", alt: "Argumint register", label: "Register" },
    ],
  },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export const featuredRepos = [
  { name: "argumint", label: "Real-time debate arena", url: "https://github.com/HangyeomLee/argumint" },
  { name: "cctv", label: "AI crowd monitoring", url: "https://github.com/HangyeomLee/cctv" },
  { name: "flue", label: "Multimodal learning app", url: "https://github.com/HangyeomLee/flue" },
  { name: "Bank_Chatbot", label: "FastAPI + FAISS RAG chatbot", url: "https://github.com/HangyeomLee/Bank_Chatbot" },
  { name: "hangyeom-website", label: "This portfolio", url: "https://github.com/HangyeomLee/hangyeom-website" },
];
