import Image from "next/image";
import Link from "next/link";
import type { Product } from "../portfolioData";
import styles from "./projects.module.css";

export function ProjectCard({ product }: { product: Product }) {
  return (
    <Link href={`/projects/${product.slug}`} className={styles.card}>
      <div className={styles.cardImageWrap}>
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(max-width: 760px) 100vw, 520px"
          className={styles.cardImage}
        />
      </div>
      <div className={styles.cardBody}>
        <div className={styles.cardMeta}>
          <span className={styles.cardTag}>{product.tag}</span>
          <span>{product.year}</span>
        </div>
        <h3 className={styles.cardTitle}>{product.title}</h3>
        <p className={styles.cardOneLiner}>{product.oneLiner}</p>
        <div className={styles.cardStack}>
          {product.stack.slice(0, 5).map((tech) => (
            <span key={tech} className={styles.stackChip}>
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
