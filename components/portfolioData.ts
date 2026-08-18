export const profile = {
  name: "Hangyeom Christian Lee",
  subtitle:
    "I build web systems that other people rely on to do their jobs. Last summer I was the only developer on a wholesale distributor's e-commerce platform, which meant the login, the checkout, the shipping labels, and the admin screens the staff use every day were all mine to get right. Before that I worked on computer vision, first on a crowd-counting system for a train station plaza in Busan, then on a facial emotion model I helped move from a notebook into a real service.",
  location: "Waterloo / Toronto, ON, Canada",
  email: "h38lee@uwaterloo.ca",
  github: "https://github.com/HangyeomLee",
  linkedin: "https://www.linkedin.com/in/hangyeomlee",
  about:
    "I'm in Systems Design Engineering at the University of Waterloo, graduating in 2029. The work I care about sits where software meets someone's actual job: an order that has to reach the warehouse, a price a customer shouldn't see, a camera feed a safety officer is watching. My last co-op was the clearest version of that. I built the company's store by myself, launched it, then spent the rest of the term making it something the staff could run after I left. I'm bilingual in Korean and English, and I've done most of my engineering work in both.",
  // TODO(user): confirm exact co-op term (e.g. "Winter 2027") and add it here.
  availability: "Open to co-op internships in full-stack, backend, or ML engineering.",
  school: "University of Waterloo · Systems Design Engineering",
};

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
      "A wholesale distribution business that has been running since 1996. I was their only developer. I built the e-commerce platform on Next.js, TypeScript, Supabase, Stripe and Shippo, launched it in June, and now maintain it part-time alongside the company's marketing.",
    bullets: [
      "Built the whole platform on my own and put it live in mid-June 2026. It still runs, and the people using it day to day are not engineers.",
      "Set up three kinds of account (admin, wholesale, guest) with row-level security policies on 13 tables, so a wholesale price is hidden by the database itself and not by a check I might forget to write.",
      "Wired up Stripe with webhook signature verification and idempotency keys, and pushed the resulting transactions into QuickBooks.",
      "Connected Shippo so staff can go from a confirmed order to a printed Canada Post or UPS label without asking me for anything.",
      "Found the same Supabase category query running twice on every page, once in the layout and once in the page, and shared it with React's cache().",
      "Caught a double-billing bug two days after moving checkout to a real backend. The button had no double-click guard and a useEffect was re-firing, so some customers were charged twice. I noticed it in Stripe before anyone reported it, turned checkout off while I fixed it, and refunded everyone affected.",
      "Noticed we were charging Ontario's 13% HST on orders going to Manitoba and Newfoundland regardless of where they shipped. Flagged it for the accountant rather than guessing at tax law myself.",
      "Left the company able to run without me: a kill switch for emergencies, and every account and bill (Vercel, Supabase, Stripe, Shippo, the domain) transferred to them.",
      "Ran the marketing side too. 66 wholesale customers signed up who weren't customers before, and 11 Meta campaigns brought in 1,022 conversations for about $314 total.",
    ],
  },
  {
    role: "Communications Specialist",
    company: "Republic of Korea Army (Mandatory Service)",
    period: "Jun 2024 – Dec 2025",
    description:
      "Mandatory service. I ran the unit's communications systems and set up the network for command posts during field exercises.",
    bullets: [
      "Built out command-post networks from the cable up: crimping straight-through and crossover runs, segmenting the network, configuring VPN, and setting up multi-microphone audio.",
      "Kept the unit's radios and computers working day to day, usually with whatever equipment was on hand and not much time.",
    ],
  },
  {
    role: "Software Engineer",
    company: "Buil Planning",
    period: "Jan 2024 – Jun 2024 · Busan, South Korea",
    description:
      "A government-commissioned crowd monitoring system for the CCTV feeds at Busan Station Plaza, one of the projects that came out of the 2022 Itaewon crowd crush. I worked on serving the model, the inference pipeline, and the API behind the operator dashboard.",
    bullets: [
      "The footage was not allowed to leave the building, so there was no cloud option. I packaged the 50GB+ crowd-counting model into a Docker inference server that ran on their own hardware.",
      "Retrained the model on footage from the actual plaza, since the camera angle and lighting there looked nothing like the training set. Accuracy went from 76% to 83%.",
      "Reorganized the model code from one long procedural script into objects, then added threading so a slow stream stopped holding up the others. Latency dropped about 30%.",
      "The detector was never going to be accurate frame by frame at that size, so I aggregated results into one-minute windows and reported spikes instead. That held 10-15 FPS per stream across several cameras.",
      "Wrote the REST API the React dashboard called for alerts and history.",
    ],
  },
  {
    role: "Teaching Assistant",
    company: "University of Waterloo",
    period: "Sep 2023 – Dec 2023",
    description:
      "TA for Calculus and Linear Algebra. Marked assignments, ran office hours, and sat with students through problem sets. Somewhere over 100 students across the term.",
    bullets: [],
  },
  {
    role: "Machine Learning Engineer (Intern)",
    company: "MoodMe",
    period: "May 2023 – Aug 2023 · Remote",
    description:
      "MoodMe sells a real-time facial analysis SDK. My job was getting a facial emotion model out of training and into something a customer could actually run.",
    bullets: [
      "Trained the emotion recognition CNN and converted it to ONNX so it wasn't tied to one framework, and could run on a laptop or a server.",
      "Containerized the inference service, put it on AWS, and built a demo web app that showed predictions from a webcam while you used it.",
      "Set up a pipeline that validated the model, built the container, and deployed it, because we were updating the model often enough that doing it by hand was getting old.",
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
    label: "Backend",
    items: ["Node.js", "PostgreSQL", "Supabase", "Row Level Security", "Django", "Flask", "FastAPI", "REST APIs"],
  },
  { label: "Infrastructure", items: ["Vercel", "Docker", "AWS (EC2, S3)", "Linux", "GitHub Actions", "ONNX Runtime"] },
  {
    label: "Third-party APIs",
    items: ["Stripe", "Shippo (Canada Post, UPS)", "QuickBooks", "Meta Ads"],
  },
  { label: "Testing", items: ["Playwright"] },
  {
    label: "ML and vision",
    items: ["PyTorch", "TensorFlow", "OpenCV", "Transfer learning", "CNN deployment", "Model optimization"],
  },
  { label: "Everything else", items: ["Git", "Figma", "Korean and English, both fluent"] },
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
    tag: "Live storefront",
    oneLiner:
      "A wholesale store I built alone and still maintain. Retail buyers and wholesale accounts share one catalog but never see each other's prices.",
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
      "The online store for a wholesale distributor in Toronto that's been in business since 1996. I was the only person working on it, from the database up through the screens their staff use to fill orders.",
    summary:
      "Three kinds of account see three different versions of the same catalog. Stripe handles checkout, Shippo turns a confirmed order into a Canada Post or UPS label, and QuickBooks gets the transaction. It went live in June 2026 and has been running since.",
    caseStudy: {
      problem:
        "Retail customers can't be allowed to see wholesale prices. If they do, there's no reason for anyone to pay retail and the whole pricing structure falls apart. So both price tiers had to live in one system, and the wall between them had to hold on a day when I shipped something careless.",
      approach:
        "I put the access rules in the database with row-level security instead of checking permissions in each API route. With RLS on, a table shows nothing until a policy says otherwise. If I get application code wrong, prices leak. If I get a policy wrong, the page just comes up empty. Nobody was reviewing my code, so I wanted the mistake that fails quietly rather than the one that fails publicly.",
        tradeoff:
        "The cost is that debugging gets annoying. A blocked query returns an empty list, exactly like a query for something that doesn't exist, so \"where did my data go\" became a question I asked a lot.",
    },
    impact: [
      "Three account types (admin, wholesale, guest) with row-level security policies on 13 tables, so pricing and customer data are protected by the database rather than by application code.",
      "Stripe checkout with webhook signature verification and idempotency keys, so a retried webhook doesn't turn into a second charge.",
      "Shipping labels through Shippo, including rate comparison between Canada Post and UPS, in a flow the office staff run themselves.",
      "QuickBooks integration so transactions land in the books without anyone retyping them.",
      "A double-billing bug I found in Stripe before a customer did. Checkout was off within the hour, fixed in two days, everyone refunded.",
      "One shared Supabase query for categories instead of two, after noticing the layout and the page were each fetching it.",
      "A kill switch, and every account and bill moved over to the company when my term ended.",
    ],
    result: "Live since June 2026. 66 wholesale accounts signed up. Runs without me.",
    image: "/project-shots/mask12-home.webp",
    imageAlt: "mask12.com wholesale storefront homepage",
    repoUrl: null,
    liveUrl: "https://mask12.com",
    captureLabel: "Screenshots from the live site, August 2026. Source is the company's, so it's private.",
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
    tag: "Computer vision",
    oneLiner:
      "Crowd monitoring for a train station plaza in Busan. A 50GB model running on the client's own hardware because the footage wasn't allowed to leave the building.",
    stack: ["Python", "Docker", "Flask", "Django", "Computer Vision", "Multithreading", "Redis"],
    positioning:
      "A public safety system commissioned by the government after the Itaewon crowd crush. It reads the plaza's CCTV feeds, estimates how many people are in a given area, and tells the operator when a spot is getting dangerous.",
    summary:
      "Video comes in over RTSP, gets counted by a crowd-counting model, and the counts are checked against zones an operator drew on the camera view. A REST API feeds the dashboard they watch.",
    caseStudy: {
      problem:
        "Public CCTV footage legally could not leave the premises, which ruled out every hosted inference service. A 50GB model had to run on the client's own machine, across several cameras at once, and still be fast enough to matter while a crowd was actually building.",
      approach:
        "I put the model in a Docker container that ran on their hardware, and rewrote the pipeline so each stream was its own object on its own thread instead of one script working through cameras in order. Counting happens inside zones the operator draws, not across the whole frame, which is both cheaper and closer to what they actually want to know.",
      tradeoff:
        "A model that size on that hardware was never going to be accurate frame by frame, so I stopped pretending it could be. The system reports a one-minute rolling number and flags spikes. If you want to know exactly how many people are in the square right now, this won't tell you.",
    },
    impact: [
      "A Docker inference server running a 50GB crowd-counting model on the client's own hardware, no cloud involved.",
      "Retraining on real footage from the plaza, which took accuracy from 76% to 83%.",
      "Threading and a rewrite from procedural code to services, which cut latency about 30% and held 10-15 FPS per stream.",
      "Locations, cameras, and zone polygons modelled in the Django backend so operators could watch a doorway instead of a whole square.",
      "The REST API behind the React dashboard.",
    ],
    result: "Deployed at Busan Station Plaza",
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
];

export type SideProject = {
  name: string;
  year: string;
  blurb: string;
  stack: string;
  repoUrl: string | null;
  liveUrl: string | null;
};

// Smaller builds. Kept as a list on purpose: none of these have users, and
// giving them full cards next to the two real systems oversells them.
export const sideProjects: SideProject[] = [
  {
    name: "Pinegrove Hotel",
    year: "2026",
    blurb:
      "Website for a hotel and Japanese restaurant in Jangyu, built to push people toward booking rather than just describe the place. Hand-written HTML and CSS, with the SEO and the handoffs to Naver and the booking sites planned before any of it was designed.",
    stack: "HTML, CSS, JavaScript, Vercel",
    repoUrl: null,
    liveUrl: "https://pinegrove-hotel.vercel.app",
  },
  {
    name: "FLUE",
    year: "2026",
    blurb:
      "English lessons for Rohingya speakers who can't read yet. Six steps, none of which need reading: you look at a picture, hear it, then draw or say it back, and a multimodal model checks what you produced.",
    stack: "Next.js, TypeScript, Canvas API, Web Speech API, OpenRouter",
    repoUrl: "https://github.com/HangyeomLee/flue",
    liveUrl: null,
  },
  {
    name: "Argumint",
    year: "2026",
    blurb:
      "A debate site where replies are drawn as a graph instead of a thread, votes arrive over WebSockets, and the ranking decays with time so the earliest comment can't camp at the top.",
    stack: "Next.js, FastAPI, PostgreSQL, WebSockets, React Flow",
    repoUrl: "https://github.com/HangyeomLee/argumint",
    liveUrl: null,
  },
  {
    name: "KB Bank FAQ chatbot",
    year: "2026",
    blurb:
      "Answers questions about a bank's services by searching its FAQ documents first and writing the answer from what it finds, so it can point at a source instead of inventing one.",
    stack: "FastAPI, Gemini embeddings, FAISS",
    repoUrl: "https://github.com/HangyeomLee/Bank_Chatbot",
    liveUrl: null,
  },
  {
    name: "gyeomstagram",
    year: "2024",
    blurb:
      "An Instagram clone I built while learning Django. Uploads, a feed, and the usual model-view-template loop. Not an original idea, but it's where the shape of a backend first made sense to me.",
    stack: "Django, Python, SQLite",
    repoUrl: "https://github.com/HangyeomLee/instagram_cloning_project",
    liveUrl: null,
  },
  {
    name: "Toyota machine vision",
    year: "2023",
    blurb:
      "Telling a drilled hole apart from a sticker covering one, in photos from an inspection line. Mostly a lesson in how much of computer vision is preprocessing rather than the model.",
    stack: "Python, OpenCV, TensorFlow",
    repoUrl: "https://github.com/HangyeomLee/Toyota_Machine_Vision",
    liveUrl: null,
  },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export const featuredRepos = [
  { name: "cctv", label: "The crowd monitoring system", url: "https://github.com/HangyeomLee/cctv" },
  { name: "hangyeom-website", label: "This site", url: "https://github.com/HangyeomLee/hangyeom-website" },
  { name: "neetcode-submissions", label: "Practice problems", url: "https://github.com/HangyeomLee/neetcode-submissions" },
];
