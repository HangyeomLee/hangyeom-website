"use client";

import { motion } from "framer-motion";
import styles from "./portfolio.module.css";
import {
  experience,
  featuredRepos,
  highlights,
  improvements,
  profile,
  projects,
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
      <div className={styles.bgGlowOne} />
      <div className={styles.bgGlowTwo} />

      <section className={styles.hero}>
        <motion.div
          className={styles.heroCopy}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
        >
          <p className={styles.kicker}>Portfolio · 2026</p>
          <h1>{profile.name}</h1>
          <p className={styles.heroSubtitle}>{profile.subtitle}</p>
          <p className={styles.heroIntro}>{profile.intro}</p>
          <p className={styles.heroBlurb}>{profile.heroBlurb}</p>

          <div className={styles.ctaRow}>
            <a href="#projects" className={styles.primaryButton}>
              View Projects
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className={styles.secondaryButton}>
              View GitHub
            </a>
            <a href={`mailto:${profile.email}`} className={styles.secondaryButton}>
              Email Me
            </a>
          </div>
        </motion.div>

        <motion.aside
          className={styles.heroCard}
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        >
          <div className={styles.cardTop}>
            <span className={styles.dot} />
            <span className={styles.dot} />
            <span className={styles.dot} />
          </div>
          <div className={styles.profileMini}>
            <div className={styles.avatar}>HL</div>
            <div>
              <p className={styles.profileName}>{profile.name}</p>
              <p className={styles.profileMeta}>{profile.location}</p>
            </div>
          </div>
          <div className={styles.metricGrid}>
            {highlights.map((item) => (
              <div key={item.label} className={styles.metricCard}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </motion.aside>
      </section>

      <section className={styles.section}>
        <SectionHeading
          eyebrow="About"
          title="A recruiter-friendly snapshot"
          description="This portfolio is intentionally structured to answer the questions most hiring managers care about: what you build, how you think, and whether your work can ship."
        />
        <div className={styles.aboutPanel}>
          <p>
            I’m a Systems Design Engineering student at the University of Waterloo focused on practical AI products,
            full-stack applications, and backend architecture. My strongest projects sit at the intersection of machine
            learning systems and product execution.
          </p>
          <p>
            I’m especially interested in roles where I can own meaningful parts of the stack — from model-serving and
            system design to building polished experiences that real users interact with.
          </p>
        </div>
      </section>

      <section className={styles.section} id="projects">
        <SectionHeading
          eyebrow="Featured Projects"
          title="Proof of work"
          description="The strongest portfolio projects are the ones that show ownership, technical depth, and clear product thinking."
        />
        <div className={styles.projectGrid}>
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              className={styles.projectCard}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: index * 0.06 }}
            >
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
              <ul className={styles.impactList}>
                {project.impact.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <SectionHeading
          eyebrow="Experience"
          title="Professional experience"
          description="This section is meant to read like evidence of engineering maturity, not just a copy of a resume."
        />
        <div className={styles.timeline}>
          {experience.map((item, index) => (
            <motion.article
              key={item.company}
              className={styles.timelineCard}
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
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
          eyebrow="Skills"
          title="Technical stack"
          description="Grouped for quick scanning so recruiters can map your profile to open roles in a few seconds."
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
          title="Public work worth surfacing"
          description="These repositories are called out because they reinforce the full-stack plus applied AI narrative."
        />
        <div className={styles.repoRow}>
          {featuredRepos.map((repo) => (
            <a
              key={repo}
              href={`${profile.github}/${repo}`}
              target="_blank"
              rel="noreferrer"
              className={styles.repoCard}
            >
              <span>Repository</span>
              <strong>{repo}</strong>
            </a>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <SectionHeading
          eyebrow="What to improve next"
          title="High-leverage upgrades"
          description="These are the upgrades most likely to make the portfolio feel even more senior and interview-ready."
        />
        <div className={styles.improvementList}>
          {improvements.map((item, index) => (
            <div key={item} className={styles.improvementCard}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.contactSection}>
        <motion.div
          className={styles.contactCard}
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55 }}
        >
          <p className={styles.eyebrow}>Contact</p>
          <h2>Let’s build something useful.</h2>
          <p className={styles.contactText}>
            I’m most excited by AI product engineering, backend-heavy software roles, and opportunities where I can
            contribute across the stack.
          </p>

          <div className={styles.ctaRow}>
            <a href={`mailto:${profile.email}`} className={styles.primaryButton}>
              {profile.email}
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