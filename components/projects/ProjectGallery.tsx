"use client";

import { useState } from "react";
import Image from "next/image";
import { Lightbox, type LightboxImage } from "./Lightbox";
import styles from "./projects.module.css";

type Props = {
  images: LightboxImage[];
};

export function ProjectGallery({ images }: Props) {
  const [openAt, setOpenAt] = useState<number | null>(null);

  return (
    <>
      <div className={styles.gallery}>
        {images.map((img, i) => (
          <button key={img.src} className={styles.galleryItem} onClick={() => setOpenAt(i)}>
            <div className={styles.galleryImageWrap}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 760px) 50vw, 260px"
                className={styles.galleryImage}
              />
            </div>
            {img.label && <span className={styles.galleryLabel}>{img.label}</span>}
          </button>
        ))}
      </div>

      {openAt !== null && (
        <Lightbox images={images} startIndex={openAt} onClose={() => setOpenAt(null)} />
      )}
    </>
  );
}
