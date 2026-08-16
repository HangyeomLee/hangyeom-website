import type { Metadata } from "next";
import { experience, profile, skills } from "@/components/portfolioData";
import { PrintButton } from "@/components/resume/PrintButton";
import styles from "./resume.module.css";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume of Hangyeom Christian Lee — Full-Stack Engineer, University of Waterloo Systems Design Engineering.",
};

const RESUME_PROJECTS = [
  {
    name: "mask12.com — Wholesale E-Commerce Platform",
    stack: "Next.js 15, TypeScript, Supabase (Postgres + RLS), Stripe, Shippo, QuickBooks API",
    bullets: [
      "Implemented a three-tier role model with row-level security across 13 tables so wholesale pricing stays invisible to retail customers at the database layer, and built the Stripe pipeline with webhook verification and idempotency handling.",
      "Automated Canada Post / UPS shipping labels via the Shippo API and synced transactions via the QuickBooks API, removing manual fulfillment and bookkeeping.",
    ],
  },
  {
    name: "AI Crowd Monitoring Platform — Busan Station Plaza",
    stack: "Python, Docker, Flask, Django, Computer Vision, Multithreading, Redis",
    bullets: [
      "Built an on-prem Docker inference server for a 50GB+ crowd-counting model and fine-tuned it via transfer learning, improving detection accuracy 76% → 83%.",
      "Refactored a procedural codebase into an async, object-oriented pipeline, cutting inference latency 30% and sustaining 10–15 FPS per stream across multiple cameras.",
    ],
  },
  {
    name: "FLUE — Multimodal English Learning App",
    stack: "Next.js, TypeScript, Tailwind CSS, Canvas API, Web Speech API, OpenRouter",
    bullets: [
      "Built a six-step learning flow for low-literacy Rohingya learners combining drawing, speech, and multimodal LLM evaluation, with no step that requires reading.",
    ],
  },
];

export default function ResumePage() {
  return (
    <div className={styles.wrap}>
      <div className={styles.toolbar}>
        <PrintButton />
      </div>

      <div className={styles.sheet}>
        <h1 className={styles.name}>{profile.name}</h1>
        <p className={styles.contactLine}>
          {profile.location} · <a href={`mailto:${profile.email}`}>{profile.email}</a> ·{" "}
          <a href={profile.linkedin}>linkedin.com/in/hangyeomlee</a> ·{" "}
          <a href={profile.github}>github.com/HangyeomLee</a>
        </p>

        <h2 className={styles.sectionTitle}>Summary</h2>
        <p className={styles.summary}>
          Systems Design Engineering student at the University of Waterloo who builds production
          systems end to end. Built and launched mask12.com — a wholesale e-commerce platform
          serving B2B accounts and retail customers — as the only developer, covering the access
          control model, Stripe payment pipeline, Shippo fulfillment automation, and the admin
          tooling non-technical staff now run it with. Also shipped applied-AI systems from
          on-prem model serving to deployed inference APIs. Seeking co-op internships in
          full-stack, backend, and AI/ML engineering.
        </p>

        <h2 className={styles.sectionTitle}>Experience</h2>
        {experience.map((e) => (
          <div key={`${e.company}-${e.period}`} className={styles.entry}>
            <div className={styles.entryHeader}>
              <span className={styles.entryRole}>{e.role}</span>
              <span className={styles.entryOrg}>— {e.company}</span>
              <span className={styles.entryPeriod}>{e.period}</span>
            </div>
            <p className={styles.entryDesc}>{e.description}</p>
            {e.bullets.length > 0 && (
              <ul className={styles.bullets}>
                {e.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            )}
          </div>
        ))}

        <h2 className={styles.sectionTitle}>Projects</h2>
        {RESUME_PROJECTS.map((p) => (
          <div key={p.name} className={styles.entry}>
            <div className={styles.entryHeader}>
              <span className={styles.entryRole}>{p.name}</span>
            </div>
            <p className={styles.entryDesc}>{p.stack}</p>
            <ul className={styles.bullets}>
              {p.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        ))}

        <h2 className={styles.sectionTitle}>Education</h2>
        <div className={styles.entry}>
          <div className={styles.entryHeader}>
            <span className={styles.entryRole}>University of Waterloo</span>
            <span className={styles.entryPeriod}>Waterloo, ON</span>
          </div>
          <p className={styles.entryDesc}>
            Bachelor of Applied Science, Systems Design Engineering — expected 2029
          </p>
        </div>

        <h2 className={styles.sectionTitle}>Skills</h2>
        {skills.map((s) => (
          <p key={s.label} className={styles.skillRow}>
            <span className={styles.skillLabel}>{s.label}: </span>
            {s.items.join(", ")}
          </p>
        ))}
      </div>
    </div>
  );
}
