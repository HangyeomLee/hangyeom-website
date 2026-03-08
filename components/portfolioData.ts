export const profile = {
  name: "Hangyeom Lee",
  subtitle: "AI & Full-Stack Engineer",
  location: "Waterloo, ON",
  email: "h38lee@uwaterloo.ca",
  github: "https://github.com/HangyeomLee",
  linkedin: "https://www.linkedin.com/in/hangyeom-lee-a01083250/",
  intro:
    "Systems Design Engineering student at the University of Waterloo building production-minded AI products, scalable backend systems, and polished user-facing web applications.",
  heroBlurb:
    "I like building software that actually ships — from real-time inference pipelines and RAG systems to full-stack product experiences with clean architecture.",
};

export const highlights = [
  { label: "Focus", value: "Applied AI, backend systems, product engineering" },
  { label: "School", value: "University of Waterloo · Systems Design Engineering" },
  { label: "Strength", value: "Bridging ML systems with user-facing products" },
];

export const skills = [
  { title: "Languages", items: ["Python", "TypeScript / JavaScript", "SQL", "C++"] },
  { title: "Frontend", items: ["Next.js", "React", "CSS", "State management", "REST API integration"] },
  { title: "Backend", items: ["FastAPI", "Django", "Flask", "Node.js", "Redis", "Docker", "Async processing"] },
  { title: "AI / ML", items: ["PyTorch", "TensorFlow", "ONNX Runtime", "RAG pipelines", "Embeddings", "Computer Vision"] },
  { title: "Infra", items: ["AWS", "Linux", "GitHub Actions", "CI/CD", "Logging & monitoring"] },
];

export const experience = [
  {
    role: "Full-Stack Developer",
    company: "Buil Planning",
    period: "Jan 2024 – Jun 2024",
    bullets: [
      "Led development of a full-stack AI monitoring platform with live CCTV streaming, backend inference APIs, and operator dashboards.",
      "Designed end-to-end data flow from stream ingestion to async inference, risk classification, and frontend visualization.",
      "Built REST APIs consumed by React-based dashboards for real-time alerts and operational analytics.",
      "Reduced inference latency by 30% through async refactoring, caching layers, and service modularization.",
      "Supported stable multi-camera processing at 10–15 FPS per stream under production-like deployment."
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
    title: "AI-Powered Semantic Search Platform",
    year: "2025",
    tag: "Flagship project",
    stack: ["Next.js", "FastAPI", "RAG", "Embeddings", "Docker"],
    summary:
      "Production-style full-stack application enabling document upload, semantic retrieval, and contextual Q&A with streaming responses.",
    impact: [
      "Built document ingestion, embedding generation, vector search, and LLM orchestration.",
      "Designed scalable APIs connecting frontend interactions to backend retrieval pipelines.",
      "Achieved a fast product feel with 1–2 second end-to-end response latency."
    ]
  },
  {
    title: "ML Inference Gateway",
    year: "2026",
    tag: "Systems project",
    stack: ["Python", "Redis", "API design", "Caching"],
    summary:
      "Unified API gateway routing requests across multiple AI models with support for caching, request batching, and version-aware backend logic.",
    impact: [
      "Reduced redundant inference calls through Redis caching and batching strategies.",
      "Structured the codebase for extensible model integration and experimentation workflows."
    ]
  },
  {
    title: "CCTV Crowd Monitoring Platform",
    year: "2024",
    tag: "Public GitHub project",
    stack: ["Django", "Computer Vision", "Analytics", "Full-stack"],
    summary:
      "Django-based platform integrating AI-powered crowd density analysis with operator dashboards and event tracking.",
    impact: [
      "Built backend models for event logging, risk tracking, and historical analytics.",
      "Delivered real-time risk classification from inference services to a web dashboard UI."
    ]
  },
  {
    title: "Toyota Machine Vision",
    year: "GitHub",
    tag: "Prototype",
    stack: ["Python", "Computer Vision"],
    summary:
      "Computer vision prototype focused on practical applied ML workflows and hands-on experimentation.",
    impact: [
      "Showcases applied CV problem solving with clean implementation and project presentation."
    ]
  }
];

export const featuredRepos = [
  "Toyota_Machine_Vision",
  "cctv",
  "Cyclica_Hackathon_Challenge",
  "Web_Resume"
];

export const improvements = [
  "Add live demos or short GIFs for the top 2 projects. Recruiters understand shipped work faster when they can see it.",
  "Replace general project summaries with one metric each, such as latency, users, throughput, or deployment scale.",
  "Add a dedicated resume download button and keep the PDF in /public for one-click access.",
  "Write one short engineering note about a technical tradeoff you solved. This helps show depth beyond project screenshots.",
  "Deploy on Vercel with a custom domain so the portfolio feels production-ready immediately."
];