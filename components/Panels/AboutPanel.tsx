"use client";

import { motion } from "framer-motion";
import { profile } from "../portfolioData";
import styles from "../app.module.css";

export function AboutPanel() {

  return (
    <motion.div
      className={styles.panelMotion}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.15 }}
    >
      <div className={styles.panelInner}>
        <div className={styles.panelHeader}>
          <p className={styles.panelEyebrow}>06 — About</p>
          <h1 className={styles.panelTitle}>Hangyeom Lee</h1>
        </div>

        <p className={styles.aboutText}>{profile.about}</p>

        <div className={styles.aboutMeta}>
          {[
            ["School", profile.school],
            ["Location", profile.location],
            ["Status", profile.availability],
          ].map(([k, v]) => (
            <div key={k} className={styles.aboutMetaRow}>
              <span className={styles.aboutMetaKey}>{k}</span>
              <span className={styles.aboutMetaVal}>{v}</span>
            </div>
          ))}
        </div>

        <div className={styles.contactCard}>
          <h3 className={styles.contactTitle}>Get in touch</h3>
          <p className={styles.contactDesc}>
            Currently open to internships and product engineering opportunities.
            Let&apos;s build something sharp in both architecture and UI.
          </p>
          <div className={styles.contactLinks}>
            <a
              href={`mailto:${profile.email}`}
              className={styles.btnPrimary}
            >
              {profile.email}
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className={styles.btnSecondary}
            >
              LinkedIn ↗
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className={styles.btnSecondary}
            >
              GitHub ↗
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className={styles.btnSecondary}
            >
              Resume PDF
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
