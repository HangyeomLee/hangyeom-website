import { products } from "../portfolioData";
import { ProjectCard } from "../projects/ProjectCard";
import styles from "./home.module.css";

export function ProjectsSection() {
  return (
    <section id="projects" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Things I&rsquo;ve built</h2>
        <p className={styles.sectionLead}>
          Two systems other people depend on. One sells things every day, the other watched a
          train station plaza for crowd surges. Every screenshot is from the running app.
        </p>
        <div className={styles.projectGrid}>
          {products.map((p) => (
            <ProjectCard key={p.slug} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
