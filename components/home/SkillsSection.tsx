import { skills } from "../portfolioData";
import styles from "./home.module.css";

export function SkillsSection() {
  return (
    <section id="skills" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Tools</h2>
        <p className={styles.sectionLead}>
          Things I&rsquo;ve used on something real. The ones I reach for first are Next.js,
          TypeScript, Postgres and Python.
        </p>
        <div className={styles.skillGrid}>
          {skills.map((group) => (
            <div key={group.label} className={styles.skillGroup}>
              <div className={styles.skillGroupLabel}>{group.label}</div>
              <div className={styles.skillItems}>{group.items.join(", ")}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
