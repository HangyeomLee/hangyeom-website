import type { Metadata } from "next";
import { experience, profile } from "@/components/portfolioData";
import { PrintButton } from "@/components/resume/PrintButton";
import styles from "./resume.module.css";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume of Hangyeom Lee — Full-Stack Engineer, University of Waterloo Systems Design Engineering.",
};

const RESUME_PROJECTS = [
  {
    name: "Mask12.com — B2B Wholesale Platform",
    stack: "Next.js 15, TypeScript, Supabase (Postgres + RLS), Stripe, Shippo, QuickBooks API",
    bullets: [
      "Designed a three-tier RBAC model with database-level Row Level Security across 13 tables, and built a Stripe Checkout pipeline with webhook verification and idempotency handling.",
      "Automated Canada Post / UPS shipping labels via the Shippo API and synced accounting via the QuickBooks API, removing manual fulfillment and bookkeeping.",
    ],
  },
  {
    name: "AI Monitoring Platform — Real-Time Crowd Analysis",
    stack: "Python, Flask, Django, Computer Vision, Docker, WebSockets, Redis",
    bullets: [
      "Built an on-prem Docker inference server for a 50GB+ crowd-counting model and fine-tuned it via transfer learning, improving detection accuracy 76% → 83%.",
      "Refactored a procedural codebase into an async, object-oriented pipeline, cutting inference latency 30% and sustaining 10–15 FPS per stream across multiple cameras.",
    ],
  },
  {
    name: "Argumint — Real-Time Debate Platform",
    stack: "Next.js, FastAPI, PostgreSQL, WebSockets, Docker",
    bullets: [
      "Deployed a live debate arena with auth, ranking logic, and real-time WebSocket updates connecting a Next.js frontend to FastAPI services.",
    ],
  },
];

const SKILLS = [
  { label: "Languages", items: "TypeScript, JavaScript, Python, SQL" },
  {
    label: "Frameworks",
    items: "Next.js (App Router), React, FastAPI, Django, Flask, Node.js",
  },
  {
    label: "Infra & Tools",
    items:
      "PostgreSQL, Supabase, Redis, Docker, AWS, Stripe, Shippo, Playwright, ONNX Runtime, Git, CI/CD",
  },
];

export default function ResumePage() {
  return (
    <div className={styles.wrap}>
      <div className={styles.toolbar}>
        <PrintButton />
      </div>

      <div className={styles.sheet}>
        <h1 className={styles.name}>Hangyeom Lee</h1>
        <p className={styles.contactLine}>
          {profile.location} · <a href={`mailto:${profile.email}`}>{profile.email}</a> ·{" "}
          <a href={profile.linkedin}>linkedin.com/in/hangyeomlee</a> ·{" "}
          <a href={profile.github}>github.com/HangyeomLee</a>
        </p>

        <h2 className={styles.sectionTitle}>Summary</h2>
        <p className={styles.summary}>
          Systems Design Engineering student at the University of Waterloo who designs and
          operates production systems end to end. Built the RBAC/RLS security model, payments
          pipeline, and admin tooling behind mask12.com, a live B2B wholesale platform. Shipped
          applied-AI systems from on-prem model serving to deployed inference APIs. Seeking
          co-op internships in full-stack, backend, and AI/ML engineering.
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
            Bachelor of Applied Science, Systems Design Engineering
          </p>
        </div>

        <h2 className={styles.sectionTitle}>Skills</h2>
        {SKILLS.map((s) => (
          <p key={s.label} className={styles.skillRow}>
            <span className={styles.skillLabel}>{s.label}: </span>
            {s.items}
          </p>
        ))}
      </div>
    </div>
  );
}
