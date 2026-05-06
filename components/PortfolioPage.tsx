"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./portfolio.module.css";
import {
  experience,
  featuredRepos,
  highlights,
  principles,
  profile,
  projects,
  quickStats,
  skills,
} from "./portfolioData";

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className={styles.sectionHeading}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2>{title}</h2>
      {description ? <p className={styles.sectionDescription}>{description}</p> : null}
    </div>
  );
}

export default function PortfolioPage() {
  return (
    <main className={styles.page}>
      <div className={styles.noise} />
      <div className={styles.orbOne} />
      <div className={styles.orbTwo} />
      <div className={styles.gridLines} />

      <section className={styles.hero}>
        <motion.div
          className={styles.heroCopy}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className={styles.kicker}>Hangyeom Lee · Portfolio 2026</p>
          <span className={styles.availability}>{profile.availability}</span>
          <h1>{profile.name}</h1>
          <p className={styles.heroSubtitle}>{profile.subtitle}</p>
          <p className={styles.heroIntro}>{profile.intro}</p>
          <p className={styles.heroBlurb}>{profile.heroBlurb}</p>

          <div className={styles.ctaRow}>
            <a href="#projects" className={styles.primaryButton}>
              Explore Selected Work
            </a>
            <a href="/resume.pdf" target="_blank" rel="noreferrer" className={styles.secondaryButton}>
              Resume PDF
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className={styles.secondaryButton}>
              GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className={styles.secondaryButton}>
              LinkedIn
            </a>
          </div>

          <div className={styles.signalStrip}>
            {quickStats.map((item) => (
              <div key={item.label} className={styles.signalCard}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className={styles.heroPanel}
          initial={{ opacity: 0, scale: 0.98, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        >
          <div className={styles.panelIntro}>
            <span className={styles.panelTag}>Current profile</span>
            <p>
              Full-stack AI builder who likes moving between model-serving internals and the product layers that make
              those systems understandable.
            </p>
          </div>

          <div className={styles.metricGrid}>
            {highlights.map((item) => (
              <div key={item.label} className={styles.metricCard}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>

          <div className={styles.principlesCard}>
            <p className={styles.principlesTitle}>What I optimize for</p>
            <div className={styles.principlesList}>
              {principles.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <section className={styles.section}>
        <div className={styles.marquee}>
          <span>Applied AI</span>
          <span>Realtime Systems</span>
          <span>Product Thinking</span>
          <span>Backend Architecture</span>
          <span>Human-Centered UI</span>
          <span>Production Mindset</span>
        </div>
      </section>

      <section className={styles.section} id="projects">
        <SectionHeading
          eyebrow="Selected Work"
          title="Projects with actual surface area"
          description="I replaced generic project cards with captured screens from the live demo and public repositories so the work feels tangible before anyone starts reading."
        />

        <div className={styles.projectGrid}>
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              className={styles.projectCard}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: index * 0.06 }}
            >
              <div className={styles.projectVisualWrap}>
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  className={styles.projectImage}
                />
                <div className={styles.projectImageOverlay} />
                <span className={styles.captureBadge}>{project.captureLabel}</span>
              </div>

              <div className={styles.projectBody}>
                <div className={styles.projectTopRow}>
                  <span className={styles.projectTag}>{project.tag}</span>
                  <span className={styles.projectYear}>{project.year}</span>
                </div>

                <h3>{project.title}</h3>
                <p className={styles.projectSummary}>{project.summary}</p>

                <div className={styles.stackRow}>
                  {project.stack.map((item) => (
                    <span key={item} className={styles.stackChip}>
                      {item}
                    </span>
                  ))}
                </div>

                <p className={styles.resultLine}>{project.result}</p>

                {project.gallery?.length ? (
                  <div className={styles.projectGallery}>
                    {project.gallery.map((shot) => (
                      <div key={shot.image} className={styles.galleryCard}>
                        <div className={styles.galleryImageWrap}>
                          <Image
                            src={shot.image}
                            alt={shot.alt}
                            fill
                            sizes="(max-width: 900px) 33vw, 16vw"
                            className={styles.galleryImage}
                          />
                        </div>
                        <span>{shot.label}</span>
                      </div>
                    ))}
                  </div>
                ) : null}

                <ul className={styles.impactList}>
                  {project.impact.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>

                <div className={styles.projectLinks}>
                  {project.liveUrl ? (
                    <a href={project.liveUrl} target="_blank" rel="noreferrer" className={styles.primaryButton}>
                      Open Live Site
                    </a>
                  ) : null}
                  <a href={project.repoUrl} target="_blank" rel="noreferrer" className={styles.secondaryButton}>
                    View Repository
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <SectionHeading
          eyebrow="Experience"
          title="Engineering experience with systems context"
          description="The strongest through-line in my work is taking technically messy problems and giving them a stable interface, a measurable pipeline, and a product shape people can act on."
        />
        <div className={styles.timeline}>
          {experience.map((item, index) => (
            <motion.article
              key={item.company}
              className={styles.timelineCard}
              initial={{ opacity: 0, x: index % 2 === 0 ? -18 : 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5 }}
            >
              <div className={styles.timelineHeader}>
                <div>
                  <h3>{item.role}</h3>
                  <p>{item.company}</p>
                </div>
                <span>{item.period}</span>
              </div>
              <ul className={styles.impactList}>
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <SectionHeading
          eyebrow="Stack"
          title="Tools I reach for"
          description="Grouped for quick scanning, but still arranged to feel more like a designed system board than a resume dump."
        />
        <div className={styles.skillGrid}>
          {skills.map((group) => (
            <div key={group.title} className={styles.skillCard}>
              <h3>{group.title}</h3>
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
      </section>

      <section className={styles.section}>
        <SectionHeading
          eyebrow="GitHub"
          title="Public repos worth opening"
          description="A few entry points that reinforce the AI-plus-product story and make it easy to continue from the portfolio into the code."
        />
        <div className={styles.repoRow}>
          {featuredRepos.map((repo) => (
            <a key={repo.name} href={repo.url} target="_blank" rel="noreferrer" className={styles.repoCard}>
              <span>{repo.label}</span>
              <strong>{repo.name}</strong>
            </a>
          ))}
        </div>
      </section>

      <section className={styles.contactSection}>
        <motion.div
          className={styles.contactCard}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55 }}
        >
          <p className={styles.eyebrow}>Contact</p>
          <h2>Let&apos;s build something that feels sharp in both the architecture and the UI.</h2>
          <p className={styles.contactText}>
            I&apos;m especially interested in AI product engineering, backend-heavy systems, and internships or roles
            where I can contribute across implementation, system design, and product polish.
          </p>

          <div className={styles.ctaRow}>
            <a href={`mailto:${profile.email}`} className={styles.primaryButton}>
              {profile.email}
            </a>
            <a href="/resume.pdf" target="_blank" rel="noreferrer" className={styles.secondaryButton}>
              Resume
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className={styles.secondaryButton}>
              LinkedIn
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className={styles.secondaryButton}>
              GitHub
            </a>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
