"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { products } from "../portfolioData";
import { useCursor } from "../Shared/Cursor";
import styles from "../app.module.css";
import type { View } from "../PortfolioApp";

type Props = { setView: (v: View) => void };

export function WorkPanel({ setView }: Props) {
  const { setCursor } = useCursor();

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
          <p className={styles.panelEyebrow}>02 — Featured Work</p>
          <h1 className={styles.panelTitle}>Products and systems,<br />not school projects.</h1>
          <p className={styles.panelDesc}>
            Real deployments, real architecture decisions, real product thinking.
            Click any card to explore.
          </p>
        </div>

        <div className={styles.projectGrid}>
          {products.map((p, i) => (
            <motion.button
              key={p.title}
              className={styles.projectCard}
              onClick={() => setView({ type: "project", id: p.title })}
              onMouseEnter={() => setCursor("hover")}
              onMouseLeave={() => setCursor("default")}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              style={{ textAlign: "left" }}
            >
              <div className={styles.projectCardVisual}>
                {p.image ? (
                  <>
                    <Image
                      src={p.image}
                      alt={p.imageAlt}
                      fill
                      sizes="(max-width: 860px) 100vw, 40vw"
                      className={styles.projectCardImage}
                    />
                    <div className={styles.projectCardImageOverlay} />
                  </>
                ) : (
                  <div
                    className={styles.projectCardGradient}
                    style={{ background: p.gradient ?? "linear-gradient(135deg,#0d0d1a,#1a1032)" }}
                  >
                    <span className={styles.projectCardGradientTitle}>{p.title}</span>
                    {p.liveUrl && <span className={styles.projectCardLivePill}>● LIVE</span>}
                  </div>
                )}
                <div className={styles.projectCardBadges}>
                  <span className={styles.projectCardTag}>{p.tag}</span>
                  <span className={styles.projectCardYear}>{p.year}</span>
                </div>
              </div>

              <div className={styles.projectCardBody}>
                <h3 className={styles.projectCardTitle}>{p.title}</h3>
                <p className={styles.projectCardDesc}>{p.positioning}</p>
                <div className={styles.stackRow}>
                  {p.stack.slice(0, 4).map((s) => (
                    <span key={s} className={styles.stackChip}>{s}</span>
                  ))}
                  {p.stack.length > 4 && (
                    <span className={styles.stackChip}>+{p.stack.length - 4}</span>
                  )}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
