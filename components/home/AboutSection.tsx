import { featuredRepos, profile } from "../portfolioData";
import styles from "./home.module.css";

export function AboutSection() {
  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionEyebrow}>About & Contact</div>
        <h2 className={styles.sectionTitle}>Get in touch</h2>

        <div className={styles.aboutGrid}>
          <div>
            <p className={styles.aboutText}>{profile.about}</p>
            <div className={styles.repoStrip}>
              {featuredRepos.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.repoChip}
                >
                  {repo.name}
                  <span className={styles.repoChipMeta}>{repo.label}</span>
                </a>
              ))}
            </div>
          </div>

          <div className={styles.contactCard}>
            <div className={styles.contactRow}>
              <span className={styles.contactLabel}>Email</span>
              <a className={styles.contactValue} href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
            </div>
            <div className={styles.contactRow}>
              <span className={styles.contactLabel}>LinkedIn</span>
              <a className={styles.contactValue} href={profile.linkedin} target="_blank" rel="noreferrer">
                linkedin.com/in/hangyeomlee
              </a>
            </div>
            <div className={styles.contactRow}>
              <span className={styles.contactLabel}>GitHub</span>
              <a className={styles.contactValue} href={profile.github} target="_blank" rel="noreferrer">
                github.com/HangyeomLee
              </a>
            </div>
            <div className={styles.contactRow}>
              <span className={styles.contactLabel}>School</span>
              <span className={styles.contactValue}>{profile.school}</span>
            </div>
            <div className={styles.contactRow}>
              <span className={styles.contactLabel}>Location</span>
              <span className={styles.contactValue}>{profile.location}</span>
            </div>
            <div className={styles.contactRow}>
              <span className={styles.contactLabel}>Status</span>
              <span className={styles.contactValue}>{profile.availability}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
