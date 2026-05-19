"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import styles from "../app.module.css";

export type LightboxImage = {
  src: string;
  alt: string;
  label?: string;
};

type Props = {
  images: LightboxImage[];
  startIndex?: number;
  onClose: () => void;
};

export function Lightbox({ images, startIndex = 0, onClose }: Props) {
  const [idx, setIdx] = useState(startIndex);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIdx((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft") setIdx((i) => (i - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [images.length, onClose]);

  const current = images[idx];

  return (
    <motion.div
      className={styles.lightboxOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={onClose}
    >
      <motion.div
        className={styles.lightboxContent}
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.94, opacity: 0 }}
        transition={{ duration: 0.18 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.lightboxClose} onClick={onClose} aria-label="Close">
          ×
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            className={styles.lightboxImageWrap}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.15 }}
          >
            <Image
              src={current.src}
              alt={current.alt}
              width={1200}
              height={800}
              className={styles.lightboxImage}
              style={{ width: "auto", height: "auto" }}
            />
          </motion.div>
        </AnimatePresence>

        <div className={styles.lightboxFooter}>
          {images.length > 1 && (
            <div className={styles.lightboxNav}>
              <button
                className={styles.lightboxNavBtn}
                onClick={() => setIdx((i) => (i - 1 + images.length) % images.length)}
              >
                ←
              </button>
              <button
                className={styles.lightboxNavBtn}
                onClick={() => setIdx((i) => (i + 1) % images.length)}
              >
                →
              </button>
            </div>
          )}
          {current.label && (
            <span className={styles.lightboxLabel}>{current.label}</span>
          )}
          {images.length > 1 && (
            <span className={styles.lightboxCounter}>
              {idx + 1} / {images.length}
            </span>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
