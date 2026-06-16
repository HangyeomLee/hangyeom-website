"use client";

import { motion } from "framer-motion";
import { profile } from "../portfolioData";
import { TelemetryVisual } from "../Shared/TelemetryVisual";
import styles from "../app.module.css";
import type { View } from "../PortfolioApp";

type Props = { setView: (v: View) => void };

const ease = { duration: 0.45, ease: "easeOut" };

export function HomePanel({ setView }: Props) {

  return (
    <motion.div
      className={styles.panelMotion}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      style={{ flex: 1 }}
    >
      <div className={styles.homeInner}>
        <motion.div
          className={styles.homeLeft}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...ease, delay: 0.05 }}
        >
          <div className={styles.homeEyebrow}>
            <span>FULL-STACK ENGINEER · SHIPS LIVE PRODUCTS</span>
            <span className={styles.availBadge}>● OPEN</span>
          </div>

          <h1 className={styles.heroDisplay}>
            Shipping<br />
            <span className={styles.heroDisplayAccent}>live</span><br />
            products.
          </h1>

          <p className={styles.heroSubtitle}>{profile.subtitle}</p>

          <div className={styles.heroCta}>
            <button
              className={styles.btnPrimary}
              onClick={() => setView({ type: "work" })}
            >
              View Projects
            </button>
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
              Resume
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...ease, delay: 0.1 }}
        >
          <TelemetryVisual />
        </motion.div>
      </div>
    </motion.div>
  );
}
