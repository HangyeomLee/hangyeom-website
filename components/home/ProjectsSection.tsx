import { products } from "../portfolioData";
import { ProjectCard } from "../projects/ProjectCard";
import styles from "./home.module.css";

export function ProjectsSection() {
  return (
    <section id="projects" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionEyebrow}>Featured Work</div>
        <h2 className={styles.sectionTitle}>Projects</h2>
        <p className={styles.sectionLead}>
          Products I built and operate — not class assignments. Each one is deployed, has real
          users or real constraints, and taught me something about running software in
          production.
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
