import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, products } from "@/components/portfolioData";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import styles from "@/components/projects/projects.module.css";
import homeStyles from "@/components/home/home.module.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.title,
    description: product.positioning,
    openGraph: {
      title: `${product.title} — Hangyeom Lee`,
      description: product.positioning,
      images: [{ url: product.image }],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const galleryImages = [
    { src: product.image, alt: product.imageAlt, label: "Main" },
    ...product.gallery.map((g) => ({ src: g.image, alt: g.alt, label: g.label })),
  ];

  return (
    <article className={styles.detail}>
      <Link href="/#projects" className={styles.backLink}>
        ← All projects
      </Link>

      <div className={styles.detailMeta}>
        <span className={styles.detailTag}>{product.tag}</span>
        <span>{product.year}</span>
      </div>
      <h1 className={styles.detailTitle}>{product.title}</h1>
      <p className={styles.detailPositioning}>{product.positioning}</p>

      <div className={styles.detailActions}>
        {product.liveUrl && (
          <a href={product.liveUrl} target="_blank" rel="noreferrer" className={homeStyles.btnPrimary}>
            Open Live Site ↗
          </a>
        )}
        {product.repoUrl && (
          <a href={product.repoUrl} target="_blank" rel="noreferrer" className={homeStyles.btnSecondary}>
            View Source ↗
          </a>
        )}
      </div>

      <div className={styles.heroImageWrap}>
        <Image
          src={product.image}
          alt={product.imageAlt}
          width={1600}
          height={900}
          priority
          sizes="(max-width: 900px) 100vw, 860px"
          className={styles.heroImage}
        />
      </div>
      <div className={styles.captureLabel}>{product.captureLabel}</div>

      <section className={styles.detailSection}>
        <h2 className={styles.detailSectionTitle}>What it is</h2>
        <p className={styles.detailSummary}>{product.summary}</p>
      </section>

      <section className={styles.detailSection}>
        <h2 className={styles.detailSectionTitle}>Stack</h2>
        <div className={styles.stackRow}>
          {product.stack.map((tech) => (
            <span key={tech} className={styles.stackChip}>
              {tech}
            </span>
          ))}
        </div>
      </section>

      <section className={styles.detailSection}>
        <h2 className={styles.detailSectionTitle}>Key decisions & impact</h2>
        <ul className={styles.impactList}>
          {product.impact.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className={styles.resultBox}>{product.result}</div>
      </section>

      <section className={styles.detailSection}>
        <h2 className={styles.detailSectionTitle}>Gallery</h2>
        <ProjectGallery images={galleryImages} />
      </section>
    </article>
  );
}
