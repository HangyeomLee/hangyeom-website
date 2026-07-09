import Link from "next/link";
import { metrics, profile } from "../portfolioData";
import styles from "./home.module.css";

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.eyebrow}>
          <span>Full-Stack Engineer · Ships Live Products</span>
          <span className={styles.availBadge}>
            <span className={styles.availDot} />
            {profile.availability}
          </span>
        </div>

        <h1 className={styles.heroTitle}>
          Hangyeom Lee<br />
          <span className={styles.heroTitleAccent}>builds and operates</span>
          <br />
          live products.
        </h1>

        <div className={styles.heroFacts}>
          <span>
            <span className={styles.heroFactIcon}>◆</span>
            {profile.school}
          </span>
          <span>
            <span className={styles.heroFactIcon}>◆</span>
            {profile.location}
          </span>
        </div>

        <p className={styles.heroSubtitle}>{profile.subtitle}</p>

        <div className={styles.heroCta}>
          <Link href="/#projects" className={styles.btnPrimary}>
            View Projects
          </Link>
          <a href={profile.github} target="_blank" rel="noreferrer" className={styles.btnSecondary}>
            GitHub ↗
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className={styles.btnSecondary}>
            LinkedIn ↗
          </a>
          <Link href="/resume" className={styles.btnSecondary}>
            Resume
          </Link>
        </div>

        <div className={styles.metrics}>
          {metrics.map((m) => (
            <div key={m.label} className={styles.metricCell}>
              <div className={styles.metricValue}>{m.value}</div>
              <div className={styles.metricLabel}>{m.label}</div>
            </div>
          ))}
        </div>

        <div className={styles.scrollHint}>
          <span className={styles.scrollHintArrow}>↓</span>
          Scroll to explore
        </div>
      </div>
    </section>
  );
}
