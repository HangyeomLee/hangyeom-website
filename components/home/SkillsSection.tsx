import { skills } from "../portfolioData";
import styles from "./home.module.css";

export function SkillsSection() {
  return (
    <section id="skills" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionEyebrow}>Stack</div>
        <h2 className={styles.sectionTitle}>What I work with</h2>
        <p className={styles.sectionLead}>
          Everything here I&rsquo;ve used to build or operate something that shipped — not a list
          of tutorials I&rsquo;ve watched.
        </p>
        <div className={styles.skillGrid}>
          {skills.map((group) => (
            <div key={group.label} className={styles.skillGroup}>
              <div className={styles.skillGroupLabel}>{group.label}</div>
              <div className={styles.skillItems}>
                {group.items.map((item) => (
                  <span key={item} className={styles.skillChip}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
