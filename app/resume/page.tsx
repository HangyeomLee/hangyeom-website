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
    name: "FIFA2026.ca — Live E-Commerce Platform",
    stack: "Next.js 15, TypeScript, Stripe, Shippo, Supabase, Playwright",
    bullets: [
      "Built and operate a custom storefront end to end: Stripe Checkout with webhook verification, automated Canada Post / UPS shipping labels, and a real-time admin dashboard.",
      "Grew to 175+ live products and 718 weekly visitors (+89%); pivoted from B2C checkout to B2B wholesale after demand analysis.",
    ],
  },
  {
    name: "AI Monitoring Platform — Real-Time Crowd Analysis",
    stack: "Python, Flask, Django, Computer Vision, WebSockets, Redis",
    bullets: [
      "Designed the full pipeline from RTSP stream ingestion to async inference, density analysis, and an operator dashboard with live alerts.",
      "Achieved stable multi-camera processing at 10–15 FPS per stream and 30% lower latency after async refactoring.",
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
          Systems Design Engineering student at the University of Waterloo who builds and
          operates live products. Owner-operator of fifa2026.ca, a production e-commerce
          platform (Stripe payments, automated shipping, real-time admin tooling). Experience
          shipping applied-AI systems from model training to deployed inference services.
          Seeking co-op internships in full-stack, product, and AI engineering.
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
