import { products } from "../portfolioData";
import { ProjectCard } from "../projects/ProjectCard";
import styles from "./home.module.css";

export function ProjectsSection() {
  return (
    <section id="projects" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Things I&rsquo;ve built</h2>
        <p className={styles.sectionLead}>
          The first one is a real store with real customers. The rest are projects I finished
          because I wanted to know how something worked. Every screenshot is from the actual app.
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
