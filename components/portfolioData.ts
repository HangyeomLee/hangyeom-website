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
      "Deployed the frontend publicly and captured the live experience directly for this portfolio."
    ],
    result: "Daily-topic debate experience with live public demo",
    image: "/project-shots/argumint.png",
    imageAlt: "Argumint live debate platform screenshot",
    repoUrl: "https://github.com/HangyeomLee/argumint",
    liveUrl: "https://argumint-rho.vercel.app",
    captureLabel: "Captured from deployed site"
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
      "Documented a deploy-ready dashboard flow even though the inference stack remains private."
    ],
    result: "Safety-oriented multi-service architecture for dense crowd scenarios",
    image: "/project-shots/cctv-repo.png",
    imageAlt: "CCTV monitoring GitHub repository screenshot",
    repoUrl: "https://github.com/HangyeomLee/cctv",
    captureLabel: "Captured from GitHub repository"
  },
  {
    title: "Toyota Machine Vision",
    year: "2025",
    tag: "Computer vision prototype",
    stack: ["Python", "OpenCV", "TensorFlow", "NumPy", "Matplotlib"],
    summary:
      "Vision-assisted inspection prototype for sticker placement and hole coverage on vehicle components, combining classical CV with ML experimentation.",
    impact: [
      "Built preprocessing, hole detection, centroid comparison, and defect-identification logic into a practical workflow.",
      "Worked on a team project tied to a real manufacturing problem with measurable inspection constraints.",
      "Used sample image pipelines to show intermediate reasoning instead of only presenting a final claim."
    ],
    result: "Practical manufacturing inspection workflow with visible intermediate outputs",
    image: "/project-shots/toyota-repo.png",
    imageAlt: "Toyota machine vision repository screenshot",
    repoUrl: "https://github.com/HangyeomLee/Toyota_Machine_Vision",
    captureLabel: "Captured from GitHub repository"
  },
  {
    title: "Cyclica Challenge Model",
    year: "2024",
    tag: "Research-style build",
    stack: ["Python", "Pandas", "NumPy", "TensorFlow"],
    summary:
      "A neural-network-based predictor for drug-binding vs non-binding residues on AlphaFold2 protein models, built for a local AI drug discovery challenge.",
    impact: [
      "Translated a biology-heavy challenge into a compact ML workflow with feature handling and model experimentation.",
      "Used the project to build intuition for noisy data, model tradeoffs, and the limits of a baseline neural approach.",
      "Framed follow-up work clearly by identifying XGBoost and feature engineering as the next leverage points."
    ],
    result: "Early-stage scientific ML project with clear iteration path",
    image: "/project-shots/cyclica-repo.png",
    imageAlt: "Cyclica challenge repository screenshot",
    repoUrl: "https://github.com/HangyeomLee/Cyclica_Hackathon_Challenge",
    captureLabel: "Captured from GitHub repository"
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
    name: "Toyota_Machine_Vision",
    label: "CV prototype",
    url: "https://github.com/HangyeomLee/Toyota_Machine_Vision"
  }
];
