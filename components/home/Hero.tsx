import Link from "next/link";
import { profile } from "../portfolioData";
import styles from "./home.module.css";

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <h1 className={styles.heroTitle}>{profile.name}</h1>
        <p className={styles.heroFacts}>
          Full-stack developer. Systems Design Engineering at Waterloo.
        </p>

        <p className={styles.heroSubtitle}>{profile.subtitle}</p>
        <p className={styles.heroSubtitle}>{profile.availability}</p>

        <div className={styles.heroCta}>
          <Link href="/#projects" className={styles.btnPrimary}>
            See what I&rsquo;ve built
          </Link>
          <Link href="/resume" className={styles.btnSecondary}>
            Resume
          </Link>
          <a href={profile.github} target="_blank" rel="noreferrer" className={styles.btnSecondary}>
            GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className={styles.btnSecondary}>
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
