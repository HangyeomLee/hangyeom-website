"use client";

import { motion } from "framer-motion";
import { experience } from "../portfolioData";
import styles from "../app.module.css";

export function ExperiencePanel() {
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
          <p className={styles.panelEyebrow}>03 — Work Experience</p>
          <h1 className={styles.panelTitle}>Engineering roles<br />with systems context.</h1>
          <p className={styles.panelDesc}>
            Production environments, real codebases, and the handoff between technical depth and product clarity.
          </p>
        </div>

        <div className={styles.timeline}>
          {experience.map((item, i) => (
            <motion.article
              key={item.company}
              className={styles.timelineCard}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className={styles.timelineTop}>
                <div>
                  <h3 className={styles.timelineRole}>{item.role}</h3>
                  <p className={styles.timelineCompany}>{item.company}</p>
                  <p className={styles.timelineDesc}>{item.description}</p>
                </div>
                <span className={styles.timelinePeriod}>{item.period}</span>
              </div>
              <ul className={styles.impactList}>
                {item.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
