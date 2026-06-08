"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { products } from "../portfolioData";
import { Lightbox, type LightboxImage } from "../Shared/Lightbox";
import styles from "../app.module.css";
import type { View } from "../PortfolioApp";

type Props = { id: string; setView: (v: View) => void };

export function ProjectPanel({ id, setView }: Props) {
  const [lightboxImages, setLightboxImages] = useState<LightboxImage[] | null>(null);
  const [lightboxStart, setLightboxStart] = useState(0);

  const product = products.find((p) => p.title === id);
  if (!product) return null;

  const allImages: LightboxImage[] = [
    ...(product.image ? [{ src: product.image, alt: product.imageAlt, label: "Hero" }] : []),
    ...(product.gallery ?? []).map((g) => ({ src: g.image, alt: g.alt, label: g.label })),
  ];

  const openLightbox = (startIdx: number) => {
    setLightboxImages(allImages);
    setLightboxStart(startIdx);
  };

  return (
    <>
      <AnimatePresence>
        {lightboxImages && (
          <Lightbox
            images={lightboxImages}
            startIndex={lightboxStart}
            onClose={() => setLightboxImages(null)}
          />
        )}
      </AnimatePresence>

      <motion.div
        className={styles.panelMotion}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        transition={{ duration: 0.15 }}
      >
        <div className={styles.panelInner}>
          <button
            className={styles.backBtn}
            onClick={() => setView({ type: "work" })}
          >
            ← Back to Work
          </button>

          {/* Hero image */}
          {product.image ? (
            <div
              className={styles.projectDetailHero}
              onClick={() => openLightbox(0)}
            >
              <Image
                src={product.image}
                alt={product.imageAlt}
                fill
                sizes="(max-width: 860px) 100vw, 860px"
                className={styles.projectDetailHeroImg}
              />
              <div className={styles.projectDetailHeroOverlay} />
              <span className={styles.projectDetailHeroHint}>Click to expand</span>
            </div>
          ) : (
            <div
              className={styles.projectDetailHero}
              style={{ cursor: "default" }}
            >
              <div
                className={styles.projectDetailHeroGradient}
                style={{ background: product.gradient ?? "linear-gradient(135deg,#0d0d1a,#1a1032)", position: "absolute", inset: 0 }}
              >
                <span style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, color: "rgba(255,255,255,0.7)" }}>
                  {product.title}
                </span>
              </div>
            </div>
          )}

          {/* Meta */}
          <div className={styles.projectDetailMeta}>
            <span className={styles.projectCardTag}>{product.tag}</span>
            <span className={styles.projectCardYear}>{product.year}</span>
            {product.liveUrl && <span className={styles.projectCardLivePill}>● LIVE</span>}
          </div>

          <h1 className={styles.projectDetailTitle}>{product.title}</h1>
          <p className={styles.projectDetailPositioning}>{product.positioning}</p>

          {/* Stack */}
          <div className={styles.detailSection}>
            <div className={styles.detailSectionLabel}>Stack</div>
            <div className={styles.stackRow}>
              {product.stack.map((s) => (
                <span key={s} className={styles.stackChip}>{s}</span>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className={styles.detailSection}>
            <div className={styles.detailSectionLabel}>What it is</div>
            <p style={{ fontSize: "0.92rem", lineHeight: 1.72, color: "var(--text)", margin: 0 }}>
              {product.summary}
            </p>
          </div>

          {/* Gallery */}
          {allImages.length > 1 && (
            <div className={styles.detailSection}>
              <div className={styles.detailSectionLabel}>Gallery — click to expand</div>
              <div className={styles.gallery}>
                {allImages.map((img, i) => (
                  <div
                    key={img.src}
                    className={styles.galleryItem}
                    onClick={() => openLightbox(i)}
                  >
                    <div className={styles.galleryThumb}>
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="140px"
                        className={styles.galleryThumbImg}
                      />
                    </div>
                    {img.label && (
                      <span className={styles.galleryThumbLabel}>{img.label}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Impact */}
          <div className={styles.detailSection}>
            <div className={styles.detailSectionLabel}>Key decisions</div>
            <ul className={styles.impactList}>
              {product.impact.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div className={styles.projectDetailLinks}>
            {product.liveUrl && (
              <a
                href={product.liveUrl}
                target="_blank"
                rel="noreferrer"
                className={styles.btnPrimary}
              >
                Open Live Site ↗
              </a>
            )}
            {product.repoUrl && (
              <a
                href={product.repoUrl}
                target="_blank"
                rel="noreferrer"
                className={styles.btnSecondary}
              >
                Repository
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}
