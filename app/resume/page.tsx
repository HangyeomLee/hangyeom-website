import type { Metadata } from "next";
import { experience, profile, skills } from "@/components/portfolioData";
import { PrintButton } from "@/components/resume/PrintButton";
import styles from "./resume.module.css";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume of Hangyeom Christian Lee, a Systems Design Engineering student at the University of Waterloo.",
};

const RESUME_PROJECTS = [
  {
    name: "mask12.com, a wholesale store",
    stack: "Next.js 15, TypeScript, Supabase (Postgres + RLS), Stripe, Shippo, QuickBooks API",
    bullets: [
      "Three account types with row-level security on 13 tables, so wholesale prices are hidden by the database rather than by application code. Stripe checkout with webhook verification and idempotency keys.",
      "Shipping labels through Shippo and transactions synced into QuickBooks, so nobody in the office types an order twice.",
    ],
  },
  {
    name: "Crowd monitoring at Busan Station Plaza",
    stack: "Python, Docker, Flask, Django, Computer Vision, Multithreading, Redis",
    bullets: [
      "A 50GB crowd-counting model served from a Docker container on the client's own hardware, since the CCTV footage could not leave the building. Retraining on real plaza footage took accuracy from 76% to 83%.",
      "Rewrote the pipeline from one procedural script into threaded services, which cut latency about 30% and held 10-15 FPS per stream across several cameras.",
    ],
  },
  {
    name: "FLUE, English lessons without reading",
    stack: "Next.js, TypeScript, Tailwind CSS, Canvas API, Web Speech API, OpenRouter",
    bullets: [
      "A six-step lesson flow for Rohingya speakers who can't read yet. Learners draw and speak, and a multimodal model checks both.",
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
          Systems Design Engineering student at the University of Waterloo. I was the only
          developer on mask12.com, a wholesale store in Toronto, where I built the account and
          pricing rules, the Stripe checkout, the shipping automation, and the admin screens the
          staff still use. Before that I worked on computer vision, on a crowd monitoring system
          in Busan and on a facial analysis SDK. Looking for a co-op internship in full-stack,
          backend, or ML engineering.
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
            Bachelor of Applied Science, Systems Design Engineering. Expected 2029.
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
