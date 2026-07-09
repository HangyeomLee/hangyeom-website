"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./lightbox.module.css";

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
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose} aria-label="Close">
          ×
        </button>

        <div className={styles.imageWrap}>
          <Image
            key={idx}
            src={current.src}
            alt={current.alt}
            width={1200}
            height={800}
            className={styles.image}
          />
        </div>

        <div className={styles.footer}>
          {images.length > 1 && (
            <div className={styles.nav}>
              <button
                className={styles.navBtn}
                aria-label="Previous image"
                onClick={() => setIdx((i) => (i - 1 + images.length) % images.length)}
              >
                ←
              </button>
              <button
                className={styles.navBtn}
                aria-label="Next image"
                onClick={() => setIdx((i) => (i + 1) % images.length)}
              >
                →
              </button>
            </div>
          )}
          {current.label && <span>{current.label}</span>}
          {images.length > 1 && (
            <span className={styles.counter}>
              {idx + 1} / {images.length}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
