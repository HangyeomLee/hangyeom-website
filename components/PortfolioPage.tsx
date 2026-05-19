"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import styles from "./portfolio.module.css";
import {
  buildStatus,
  experience,
  featuredRepos,
  labExperiments,
  navLinks,
  products,
  profile,
} from "./portfolioData";

// ─── Telemetry Visual ────────────────────────────────────────────────────────

const NODES = [
  { id: "INFER", x: 200, y: 68, metric: "98ms", color: "#8b5cf6" },
  { id: "STREAM", x: 72, y: 178, metric: "24 FPS", color: "#22d3ee" },
  { id: "PIPELINE", x: 328, y: 178, metric: "4 ops", color: "#8b5cf6" },
  { id: "MONITOR", x: 108, y: 298, metric: "6 cams", color: "#22d3ee" },
  { id: "DEPLOY", x: 292, y: 298, metric: "v2.1", color: "#4ade80" },
];

const EDGES = [
  [0, 1],
  [0, 2],
  [1, 2],
  [1, 3],
  [2, 4],
  [3, 4],
];

function TelemetryVisual() {
  const [tick, setTick] = useState(0);
  const [activeEdge, setActiveEdge] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTick((n) => n + 1), 2000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActiveEdge((n) => (n + 1) % EDGES.length), 900);
    return () => clearInterval(t);
  }, []);

  return (
    <div className={styles.telemetryPanel}>
      <div className={styles.telemetryHeader}>
        <div className={styles.telemetryStatus}>
          <span className={styles.statusDot} />
          <span>SYSTEM LIVE</span>
        </div>
        <span className={styles.telemetryMeta}>{NODES.length} NODES / {EDGES.length} LINKS</span>
      </div>

      <svg viewBox="0 0 400 370" className={styles.telemetrySvg} aria-hidden="true">
        {/* Grid */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
          </pattern>
          <radialGradient id="nodeGlow0" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="nodeGlow1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="nodeGlow4" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4ade80" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#4ade80" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="400" height="370" fill="url(#grid)" />

        {/* Edges */}
        {EDGES.map(([a, b], i) => {
          const from = NODES[a];
          const to = NODES[b];
          const isActive = i === activeEdge;
          return (
            <g key={i}>
              <line
                x1={from.x} y1={from.y}
                x2={to.x} y2={to.y}
                stroke={isActive ? "rgba(139,92,246,0.5)" : "rgba(255,255,255,0.07)"}
                strokeWidth={isActive ? 1.5 : 0.8}
                strokeDasharray="4 4"
                style={{
                  transition: "stroke 0.4s ease, stroke-width 0.4s ease",
                  animation: isActive ? "dashFlow 0.5s linear infinite" : "none",
                }}
              />
            </g>
          );
        })}

        {/* Nodes */}
        {NODES.map((node, i) => (
          <g key={node.id}>
            {/* Glow halo */}
            <circle cx={node.x} cy={node.y} r={28} fill={`url(#nodeGlow${i === 4 ? 4 : i <= 2 && i % 2 === 0 ? 0 : 1})`} />
            {/* Pulse ring */}
            <motion.circle
              cx={node.x} cy={node.y} r={12}
              fill="none"
              stroke={node.color}
              strokeWidth={0.8}
              strokeOpacity={0.5}
              animate={{ r: [12, 20], strokeOpacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.4, ease: "easeOut" }}
            />
            {/* Core */}
            <circle cx={node.x} cy={node.y} r={5} fill={node.color} />
            <circle cx={node.x} cy={node.y} r={3} fill="white" fillOpacity={0.8} />

            {/* Label */}
            <text
              x={node.x}
              y={node.y + 22}
              textAnchor="middle"
              fill="rgba(255,255,255,0.6)"
              fontSize="10"
              fontFamily="monospace"
              letterSpacing="1"
            >
              {node.id}
            </text>

            {/* Metric */}
            <text
              x={node.x}
              y={node.y - 14}
              textAnchor="middle"
              fill={node.color}
              fontSize="11"
              fontFamily="monospace"
              fontWeight="600"
            >
              {node.metric}
            </text>
          </g>
        ))}
      </svg>

      <div className={styles.telemetryFooter}>
        <div className={styles.telemetryMetric}>
          <span>LATENCY</span>
          <strong>98ms</strong>
        </div>
        <div className={styles.telemetryMetric}>
          <span>THROUGHPUT</span>
          <strong>24 FPS</strong>
        </div>
        <div className={styles.telemetryMetric}>
          <span>UPTIME</span>
          <strong>99.9%</strong>
        </div>
      </div>

      <style>{`
        @keyframes dashFlow {
          to { stroke-dashoffset: -8; }
        }
      `}</style>
    </div>
  );
}

// ─── Nav Bar ─────────────────────────────────────────────────────────────────

function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      className={`${styles.nav} ${scrolled ? styles.navScrolled : ""}`}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <a href="#" className={styles.navLogo}>
        <span className={styles.navLogoInitial}>H</span>
        <span className={styles.navLogoName}>Hangyeom Lee</span>
      </a>
      <div className={styles.navLinks}>
        {navLinks.map((link) => (
          <a key={link.label} href={link.href} className={styles.navLink}>
            {link.label}
          </a>
        ))}
        <a href="/resume.pdf" target="_blank" rel="noreferrer" className={styles.navCta}>
          Resume
        </a>
      </div>
    </motion.nav>
  );
}

// ─── Section Label ────────────────────────────────────────────────────────────

function SectionLabel({ index, title }: { index: string; title: string }) {
  return (
    <div className={styles.sectionLabel}>
      <span className={styles.sectionIndex}>{index}</span>
      <span className={styles.sectionLabelText}>{title}</span>
    </div>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({ product, index }: { product: (typeof products)[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      className={styles.productCard}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
    >
      {/* Visual */}
      <div className={styles.productVisual}>
        {product.image ? (
          <>
            <Image
              src={product.image}
              alt={product.imageAlt}
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              className={styles.productImage}
              style={{ transform: hovered ? "scale(1.04)" : "scale(1)" }}
            />
            <div className={styles.productImageOverlay} />
          </>
        ) : (
          <div
            className={styles.productGradientVisual}
            style={{ background: product.gradient ?? "linear-gradient(135deg, #0d0d1a, #1a1032)" }}
          >
            <div className={styles.productGradientContent}>
              <span className={styles.productGradientLabel}>{product.title}</span>
              {product.liveUrl && (
                <span className={styles.productLivePill}>● LIVE</span>
              )}
            </div>
          </div>
        )}
        <div className={styles.productBadgeRow}>
          <span className={styles.productTag}>{product.tag}</span>
          <span className={styles.productYear}>{product.year}</span>
        </div>
      </div>

      {/* Body */}
      <div className={styles.productBody}>
        <h3 className={styles.productTitle}>{product.title}</h3>
        <p className={styles.productPositioning}>{product.positioning}</p>

        {/* Stack chips — always visible */}
        <div className={styles.stackRow}>
          {product.stack.map((s) => (
            <span key={s} className={styles.stackChip}>{s}</span>
          ))}
        </div>

        {/* Hover-revealed detail */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              className={styles.productDetail}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <p className={styles.productSummary}>{product.summary}</p>

              {product.gallery && product.gallery.length > 0 && (
                <div className={styles.productGallery}>
                  {product.gallery.map((shot) => (
                    <div key={shot.image} className={styles.galleryItem}>
                      <div className={styles.galleryImageWrap}>
                        <Image
                          src={shot.image}
                          alt={shot.alt}
                          fill
                          sizes="120px"
                          className={styles.galleryImage}
                        />
                      </div>
                      <span className={styles.galleryLabel}>{shot.label}</span>
                    </div>
                  ))}
                </div>
              )}

              <ul className={styles.impactList}>
                {product.impact.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <div className={styles.productLinks}>
                {product.liveUrl && (
                  <a href={product.liveUrl} target="_blank" rel="noreferrer" className={styles.btnPrimary}>
                    Open Live Site ↗
                  </a>
                )}
                {product.repoUrl && (
                  <a href={product.repoUrl} target="_blank" rel="noreferrer" className={styles.btnSecondary}>
                    Repository
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

// ─── GitHub Activity ──────────────────────────────────────────────────────────

function GitHubActivity() {
  const rows = [
    { key: "LAST DEPLOY", value: buildStatus.lastDeploy, indicator: "● LIVE" },
    { key: "ACTIVE REPOS", value: String(buildStatus.activeRepos), indicator: "github.com" },
    { key: "CURRENT STACK", value: buildStatus.currentStack, indicator: null },
    { key: "LAST COMMIT", value: buildStatus.lastCommit, indicator: null },
  ];

  return (
    <motion.div
      className={styles.activityPanel}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.activityHeader}>
        <span className={styles.activityTitle}>BUILD STATUS</span>
        <span className={styles.activityLive}>
          <span className={styles.statusDot} />
          ACTIVE
        </span>
      </div>

      <div className={styles.activityRows}>
        {rows.map((row) => (
          <div key={row.key} className={styles.activityRow}>
            <span className={styles.activityKey}>{row.key}</span>
            <span className={styles.activityValue}>{row.value}</span>
            {row.indicator && (
              <span className={styles.activityIndicator}>{row.indicator}</span>
            )}
          </div>
        ))}
      </div>

      <div className={styles.repoRow}>
        {featuredRepos.map((repo) => (
          <a key={repo.name} href={repo.url} target="_blank" rel="noreferrer" className={styles.repoChip}>
            <span className={styles.repoName}>{repo.name}</span>
            <span className={styles.repoLabel}>{repo.label}</span>
          </a>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function PortfolioPage() {
  return (
    <main className={styles.page}>
      {/* Background layers */}
      <div className={styles.bgGrid} aria-hidden="true" />
      <div className={styles.bgOrb1} aria-hidden="true" />
      <div className={styles.bgOrb2} aria-hidden="true" />

      <NavBar />

      {/* ── 01 HERO ──────────────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          {/* Left: copy */}
          <motion.div
            className={styles.heroCopy}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className={styles.heroEyebrow}>
              <span className={styles.heroRole}>{profile.role}</span>
              <span className={styles.availBadge}>{profile.availability}</span>
            </div>

            <h1 className={styles.heroDisplay}>
              {profile.tagline.map((line, i) => (
                <span key={i} className={styles.heroLine}>
                  {line}
                </span>
              ))}
            </h1>

            <p className={styles.heroSubtitle}>{profile.subtitle}</p>

            <div className={styles.heroCta}>
              <a href="#products" className={styles.btnPrimary}>
                View Projects
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer" className={styles.btnSecondary}>
                GitHub
              </a>
              <a href="/resume.pdf" target="_blank" rel="noreferrer" className={styles.btnSecondary}>
                Resume
              </a>
            </div>
          </motion.div>

          {/* Right: telemetry */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          >
            <TelemetryVisual />
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          className={styles.scrollHint}
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span>↓</span>
        </motion.div>
      </section>

      {/* ── Marquee ──────────────────────────────────────────────────────── */}
      <div className={styles.marqueeWrap} aria-hidden="true">
        <div className={styles.marqueeTrack}>
          {["Applied AI", "Realtime Systems", "Product Thinking", "Backend Architecture", "Human-Centered UI", "Production Mindset", "Applied AI", "Realtime Systems", "Product Thinking", "Backend Architecture", "Human-Centered UI", "Production Mindset"].map((label, i) => (
            <span key={i} className={styles.marqueeItem}>{label}</span>
          ))}
        </div>
      </div>

      {/* ── 02 FEATURED PRODUCTS ─────────────────────────────────────────── */}
      <section className={styles.section} id="products">
        <div className={styles.sectionInner}>
          <SectionLabel index="02" title="Featured Products" />
          <div className={styles.sectionHeading}>
            <h2>Products and systems,<br />not school projects.</h2>
            <p className={styles.sectionDesc}>
              Real deployments, real architecture decisions, real product thinking applied to each build.
            </p>
          </div>
          <div className={styles.productGrid}>
            {products.map((product, i) => (
              <ProductCard key={product.title} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 03 WORK EXPERIENCE ───────────────────────────────────────────── */}
      <section className={styles.section} id="experience">
        <div className={styles.sectionInner}>
          <SectionLabel index="03" title="Work Experience" />
          <div className={styles.sectionHeading}>
            <h2>Engineering roles<br />with systems context.</h2>
            <p className={styles.sectionDesc}>
              Production environments, real codebases, and the handoff between technical depth and product clarity.
            </p>
          </div>
          <div className={styles.timeline}>
            {experience.map((item, i) => (
              <motion.article
                key={item.company}
                className={styles.timelineCard}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className={styles.timelineTop}>
                  <div>
                    <h3 className={styles.timelineRole}>{item.role}</h3>
                    <p className={styles.timelineCompany}>{item.company}</p>
                    <p className={styles.timelineDesc}>{item.description}</p>
                  </div>
                  <span className={styles.timelinePeriod}>{item.period}</span>
                </div>
                <ul className={styles.impactList}>
                  {item.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 04 GITHUB / BUILD ACTIVITY ───────────────────────────────────── */}
      <section className={styles.section} id="github">
        <div className={styles.sectionInner}>
          <SectionLabel index="04" title="GitHub / Build Activity" />
          <div className={styles.sectionHeading}>
            <h2>Consistency and<br />shipping culture.</h2>
            <p className={styles.sectionDesc}>
              Active development across real projects — not a portfolio dump, a living build record.
            </p>
          </div>
          <GitHubActivity />
        </div>
      </section>

      {/* ── 05 INTERACTIVE LAB ───────────────────────────────────────────── */}
      <section className={styles.section} id="lab">
        <div className={styles.sectionInner}>
          <SectionLabel index="05" title="Interactive Lab" />
          <div className={styles.sectionHeading}>
            <h2>Experiments and<br />creative systems.</h2>
            <p className={styles.sectionDesc}>
              The 30% that preserves personality — experimentation, internet-native thinking, and things built for curiosity.
            </p>
          </div>
          <div className={styles.labGrid}>
            {labExperiments.map((exp, i) => (
              <motion.div
                key={exp.title}
                className={styles.labCard}
                style={{ "--lab-accent": exp.accentColor } as React.CSSProperties}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className={styles.labCardAccent} />
                <span className={styles.labTag}>{exp.tag}</span>
                <h3 className={styles.labTitle}>{exp.title}</h3>
                <p className={styles.labDesc}>{exp.description}</p>
                <span className={styles.labStatus}>● {exp.status}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 06 ABOUT ─────────────────────────────────────────────────────── */}
      <section className={styles.section} id="about">
        <div className={styles.sectionInner}>
          <SectionLabel index="06" title="About" />
          <motion.div
            className={styles.aboutBlock}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <p className={styles.aboutText}>{profile.about}</p>
            <div className={styles.aboutMeta}>
              <span className={styles.aboutMetaItem}>
                <span className={styles.aboutMetaKey}>School</span>
                <span>{profile.school}</span>
              </span>
              <span className={styles.aboutMetaItem}>
                <span className={styles.aboutMetaKey}>Location</span>
                <span>{profile.location}</span>
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 07 CONTACT ───────────────────────────────────────────────────── */}
      <section className={styles.contactSection} id="contact">
        <div className={styles.sectionInner}>
          <motion.div
            className={styles.contactCard}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55 }}
          >
            <p className={styles.contactEyebrow}>07 — Contact</p>
            <h2 className={styles.contactHeading}>
              Let&apos;s build something sharp in both architecture and UI.
            </h2>
            <p className={styles.contactDesc}>
              Currently open to internships and product engineering opportunities.
            </p>
            <div className={styles.contactLinks}>
              <a href={`mailto:${profile.email}`} className={styles.btnPrimary}>
                {profile.email}
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className={styles.btnSecondary}>
                LinkedIn
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer" className={styles.btnSecondary}>
                GitHub
              </a>
              <a href="/resume.pdf" target="_blank" rel="noreferrer" className={styles.btnSecondary}>
                Resume
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
