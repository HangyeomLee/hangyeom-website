export const profile = {
  name: "Hangyeom Lee",
  subtitle: "AI Engineer shaping serious systems into usable products",
  location: "Waterloo, ON",
  email: "h38lee@uwaterloo.ca",
  github: "https://github.com/HangyeomLee",
  linkedin: "https://www.linkedin.com/in/hangyeomlee",
  intro:
    "Systems Design Engineering student at the University of Waterloo building production-minded AI software, backend systems, and frontends that feel deliberate instead of generic.",
  heroBlurb:
    "I care about the handoff between technical depth and product clarity: inference pipelines that stay fast, dashboards that explain what's happening, and applications people can actually trust under real usage.",
  availability: "Open to AI product, backend, and full-stack roles",
};

export const highlights = [
  { label: "Focus", value: "Applied AI, backend systems, product engineering" },
  { label: "School", value: "University of Waterloo · Systems Design Engineering" },
  { label: "Strength", value: "Turning ML-heavy ideas into shippable product surfaces" },
];

export const quickStats = [
  { value: "4", label: "featured builds" },
  { value: "2", label: "industry roles" },
  { value: "<200ms", label: "edge inference target" },
  { value: "10-15 FPS", label: "multi-camera throughput" },
];

export const principles = [
  "Build interfaces that explain complex systems at a glance.",
  "Treat latency, deployment, and maintainability as product features.",
  "Ship work that looks thoughtful before anyone reads the bullet points.",
];

export const skills = [
  { title: "Languages", items: ["Python", "TypeScript / JavaScript", "SQL", "C++"] },
  { title: "Frontend", items: ["Next.js", "React", "Framer Motion", "CSS systems", "REST API integration"] },
  { title: "Backend", items: ["FastAPI", "Django", "Flask", "Node.js", "Redis", "Docker", "Async processing"] },
  { title: "AI / ML", items: ["PyTorch", "TensorFlow", "ONNX Runtime", "RAG pipelines", "Embeddings", "Computer Vision"] },
  { title: "Infra", items: ["AWS", "Linux", "GitHub Actions", "CI/CD", "Observability"] },
];

export const experience = [
  {
    role: "Full-Stack Developer",
    company: "Buil Planning",
    period: "Jan 2024 – Jun 2024",
    bullets: [
      "Led development of an AI monitoring platform spanning CCTV streaming, backend inference APIs, and operator dashboards.",
      "Designed the end-to-end flow from stream ingestion to async inference, risk classification, and frontend visualization.",
      "Built REST APIs consumed by React dashboards for real-time alerts and operational analytics.",
      "Reduced inference latency by 30% through async refactoring, caching, and service modularization.",
      "Supported stable multi-camera processing at 10–15 FPS per stream in production-like deployment."
    ]
  },
  {
    role: "AI / ML Intern",
    company: "MoodMe",
    period: "May 2023 – Aug 2023",
    bullets: [
      "Trained and productionized real-time facial analysis CNN models for edge and cloud deployment.",
      "Converted models to ONNX Runtime and deployed containerized inference services on AWS with sub-200 ms latency.",
      "Implemented CI/CD workflows for model validation, container builds, and deployment pipelines."
    ]
  }
];

export const projects = [
  {
    title: "Argumint",
    year: "2026",
    tag: "Live product",
    stack: ["Next.js", "FastAPI", "PostgreSQL", "WebSockets", "Docker"],
    summary:
      "A real-time daily debate arena with live ranking, topic generation, reputation tiers, and analytics-rich interaction loops.",
    impact: [
      "Connected a polished Next.js frontend to FastAPI services, auth, ranking logic, and real-time updates.",
      "Designed a product identity that feels playful and competitive without losing information density.",
      "Ran the local frontend build and captured multiple real screens for this portfolio instead of using placeholders."
    ],
    result: "Debate platform with branded landing, rules, and onboarding flows",
    image: "/project-shots/argumint-home.png",
    imageAlt: "Argumint local landing page screenshot",
    repoUrl: "https://github.com/HangyeomLee/argumint",
    liveUrl: "https://gumint-theta.vercel.app",
    captureLabel: "Captured from local project build",
    gallery: [
      {
        image: "/project-shots/argumint-rules.png",
        alt: "Argumint rules page screenshot",
        label: "Rules"
      },
      {
        image: "/project-shots/argumint-login.png",
        alt: "Argumint login page screenshot",
        label: "Login"
      },
      {
        image: "/project-shots/argumint-register.png",
        alt: "Argumint register page screenshot",
        label: "Register"
      }
    ]
  },
  {
    title: "CCTV Crowd Monitoring Platform",
    year: "2025",
    tag: "Applied AI system",
    stack: ["Python", "Flask", "Django", "Computer Vision", "Monitoring UI"],
    summary:
      "A real-time crowd density monitoring pipeline designed to surface risk early through streaming analysis, operator alerts, and dashboard monitoring.",
    impact: [
      "Structured the system across streaming, inference, density analysis, and operator-facing monitoring surfaces.",
      "Focused the detection strategy on head counting for dense environments where full-body detection is less reliable.",
      "Ran the local Django monitoring dashboard with seeded data and captured the real operator-facing views for this portfolio."
    ],
    result: "Safety-oriented multi-service architecture for dense crowd scenarios",
    image: "/project-shots/cctv-plaza-feed.png",
    imageAlt: "Generated outdoor CCTV crowd monitoring feed",
    repoUrl: "https://github.com/HangyeomLee/cctv",
    captureLabel: "Generated CCTV feed for portfolio hero",
    gallery: [
      {
        image: "/project-shots/cctv-home.png",
        alt: "CCTV monitoring home page screenshot",
        label: "Overview"
      },
      {
        image: "/project-shots/cctv-area.png",
        alt: "CCTV area page screenshot",
        label: "Area View"
      },
      {
        image: "/project-shots/cctv-detail.png",
        alt: "CCTV detailed monitor screenshot",
        label: "CCTV Detail"
      }
    ]
  },
  {
    title: "FLUE",
    year: "2026",
    tag: "AI for good",
    stack: ["Next.js", "TypeScript", "Framer Motion", "Canvas", "OpenRouter"],
    summary:
      "A visual and oral-first English learning app for Rohingya learners, designed around pictures, listening, speaking, and real-world scenario practice instead of text-heavy lessons.",
    impact: [
      "Built a six-step learning flow combining drawing, speech, phrase building, and video-based situation practice.",
      "Designed the experience for low-literacy learners by prioritizing icons, audio feedback, and mobile-first interaction patterns.",
      "Ran the local app and captured the real product surfaces used here instead of relying only on README stills."
    ],
    result: "Inclusive mobile-first language learning product with multimodal interaction",
    image: "/project-shots/flue-learn.png",
    imageAlt: "FLUE lesson screen screenshot",
    repoUrl: "https://github.com/HangyeomLee/flue",
    captureLabel: "Captured from local Next.js build",
    gallery: [
      {
        image: "/project-shots/flue-topics.png",
        alt: "FLUE topic selection screenshot",
        label: "Topics"
      },
      {
        image: "/project-shots/flue-home.png",
        alt: "FLUE onboarding screenshot",
        label: "Onboarding"
      }
    ]
  },
  {
    title: "KB Kookmin Bank Q&A Chatbot",
    year: "2025",
    tag: "RAG product prototype",
    stack: ["FastAPI", "Gemini API", "FAISS", "Python", "HTML/CSS/JS"],
    summary:
      "A banking-focused Q&A chatbot that combines Gemini-based retrieval-augmented generation with a lightweight customer-facing chat interface for FAQ-style support.",
    impact: [
      "Built a domain-specific RAG workflow over KB Kookmin Bank FAQ data using embeddings and FAISS retrieval.",
      "Kept the frontend simple and familiar so it reads like a real banking help interface instead of a demo console.",
      "Ran the local app and captured the working chat surface for portfolio presentation."
    ],
    result: "Focused financial-support chatbot with practical RAG architecture",
    image: "/project-shots/bank-chatbot.png",
    imageAlt: "KB Kookmin Bank chatbot screenshot",
    repoUrl: "https://github.com/HangyeomLee/Bank_Chatbot",
    captureLabel: "Captured from local FastAPI app"
  }
];

export const featuredRepos = [
  {
    name: "argumint",
    label: "Live demo + source",
    url: "https://github.com/HangyeomLee/argumint"
  },
  {
    name: "hangyeom-website",
    label: "This portfolio",
    url: "https://github.com/HangyeomLee/hangyeom-website"
  },
  {
    name: "cctv",
    label: "Monitoring system",
    url: "https://github.com/HangyeomLee/cctv"
  },
  {
    name: "flue",
    label: "AI for good app",
    url: "https://github.com/HangyeomLee/flue"
  },
  {
    name: "Bank_Chatbot",
    label: "RAG chatbot",
    url: "https://github.com/HangyeomLee/Bank_Chatbot"
  }
];
