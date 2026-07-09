import { experience } from "../portfolioData";
import styles from "./home.module.css";

export function ExperienceSection() {
  return (
    <section id="experience" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionEyebrow}>Work History</div>
        <h2 className={styles.sectionTitle}>Experience</h2>
        <div className={styles.timeline}>
          {experience.map((e) => (
            <div key={`${e.company}-${e.period}`} className={styles.timelineItem}>
              <span className={styles.timelineDot} />
              <div className={styles.expHeader}>
                <span className={styles.expRole}>{e.role}</span>
                <span className={styles.expCompany}>{e.company}</span>
                <span className={styles.expPeriod}>{e.period}</span>
              </div>
              <p className={styles.expDescription}>{e.description}</p>
              {e.bullets.length > 0 && (
                <ul className={styles.expBullets}>
                  {e.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
