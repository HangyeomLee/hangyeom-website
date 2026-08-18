import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, products, profile } from "@/components/portfolioData";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { RichText } from "@/components/RichText";
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
      title: `${product.title} — ${profile.name}`,
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
        Back to all projects
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
            Visit the site
          </a>
        )}
        {product.repoUrl && (
          <a href={product.repoUrl} target="_blank" rel="noreferrer" className={homeStyles.btnSecondary}>
            Source on GitHub
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

      {product.caseStudy && (
        <section className={styles.detailSection}>
          <h2 className={styles.detailSectionTitle}>Why it works this way</h2>
          <dl className={styles.caseStudy}>
            <dt className={styles.caseStudyTerm}>The problem</dt>
            <dd className={styles.caseStudyDesc}>
              <RichText className={styles.inlineLink}>{product.caseStudy.problem}</RichText>
            </dd>
            <dt className={styles.caseStudyTerm}>The approach</dt>
            <dd className={styles.caseStudyDesc}>
              <RichText className={styles.inlineLink}>{product.caseStudy.approach}</RichText>
            </dd>
            <dt className={styles.caseStudyTerm}>The tradeoff</dt>
            <dd className={styles.caseStudyDesc}>
              <RichText className={styles.inlineLink}>{product.caseStudy.tradeoff}</RichText>
            </dd>
          </dl>
        </section>
      )}

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
        <h2 className={styles.detailSectionTitle}>What I did</h2>
        <ul className={styles.impactList}>
          {product.impact.map((item) => (
            <li key={item}>
              <RichText className={styles.inlineLink}>{item}</RichText>
            </li>
          ))}
        </ul>
        <div className={styles.resultBox}>{product.result}</div>
      </section>

      <section className={styles.detailSection}>
        <h2 className={styles.detailSectionTitle}>Screenshots</h2>
        <ProjectGallery images={galleryImages} />
      </section>
    </article>
  );
}
