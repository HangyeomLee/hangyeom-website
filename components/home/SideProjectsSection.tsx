import { sideProjects } from "../portfolioData";
import styles from "./home.module.css";

export function SideProjectsSection() {
  return (
    <section id="side-projects" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Smaller things</h2>
        <p className={styles.sectionLead}>
          Weekend builds, coursework, and one real site for a hotel. Nothing here has users, so
          it&rsquo;s a list rather than a set of case studies.
        </p>

        <ul className={styles.sideList}>
          {sideProjects.map((p) => (
            <li key={p.name} className={styles.sideItem}>
              <div className={styles.sideHead}>
                <span className={styles.sideName}>{p.name}</span>
                <span className={styles.sideYear}>{p.year}</span>
              </div>
              <p className={styles.sideBlurb}>{p.blurb}</p>
              <div className={styles.sideFoot}>
                <span className={styles.sideStack}>{p.stack}</span>
                <span className={styles.sideLinks}>
                  {p.liveUrl && (
                    <a href={p.liveUrl} target="_blank" rel="noreferrer">
                      Visit
                    </a>
                  )}
                  {p.repoUrl && (
                    <a href={p.repoUrl} target="_blank" rel="noreferrer">
                      Source
                    </a>
                  )}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
