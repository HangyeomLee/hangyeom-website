"use client";

import { products, experience } from "../portfolioData";
import styles from "../app.module.css";
import type { View } from "../PortfolioApp";

const FEED = [
  { text: "Updated FLUE interaction flow", time: "2d ago" },
  { text: "Refactored websocket pipeline", time: "5d ago" },
  { text: "Deployed FIFA2026.ca update", time: "1w ago" },
];

type Props = {
  view: View;
  setView: (v: View) => void;
  onOpenCmd: () => void;
};

export function Sidebar({ view, setView, onOpenCmd }: Props) {

  const navBtn = (label: string, icon: string, target: View, isActive: boolean) => (
    <button
      key={label}
      className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
      onClick={() => setView(target)}
    >
      <span className={styles.navItemIcon}>{icon}</span>
      {label}
    </button>
  );

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarScroll}>
        {/* Logo */}
        <button
          className={styles.sidebarLogo}
          onClick={() => setView({ type: "home" })}
          style={{ background: "none", border: "none", cursor: "pointer", width: "100%", textAlign: "left" }}
        >
          <span className={styles.sidebarLogoMark}>H</span>
          <span className={styles.sidebarLogoText}>Hangyeom Lee</span>
        </button>

        <div className={styles.sidebarStatus}>
          <span className={styles.statusDot} />
          <span className={styles.statusText}>Open to roles</span>
        </div>

        <div className={styles.navDivider} />

        {/* Work */}
        <div className={styles.navSection}>
          <div className={styles.navSectionLabel}>Work</div>
          {navBtn("All Projects", "◫", { type: "work" }, view.type === "work")}
          {products.map((p) => {
            const isActive = view.type === "project" && view.id === p.title;
            return (
              <button
                key={p.title}
                className={`${styles.navChild} ${isActive ? styles.navChildActive : ""}`}
                onClick={() => setView({ type: "project", id: p.title })}
              >
                <span className={styles.navChildDot} />
                {p.title}
              </button>
            );
          })}
        </div>

        <div className={styles.navDivider} />

        {/* Experience */}
        <div className={styles.navSection}>
          <div className={styles.navSectionLabel}>Experience</div>
          {navBtn("All Roles", "◈", { type: "experience" }, view.type === "experience")}
          {experience.map((e) => (
            <button
              key={e.company}
              className={styles.navChild}
              onClick={() => setView({ type: "experience" })}
            >
              <span className={styles.navChildDot} />
              {e.company}
            </button>
          ))}
        </div>

        <div className={styles.navDivider} />

        {/* About */}
        <div className={styles.navSection}>
          {navBtn("About & Contact", "○", { type: "about" }, view.type === "about")}
        </div>

        <div className={styles.navDivider} />

        {/* Blog */}
        <div className={styles.navSection}>
          {navBtn("Blog", "✎", { type: "blog" }, view.type === "blog" || view.type === "post" || view.type === "new-post" || view.type === "edit-post")}
        </div>

        <div className={styles.navDivider} />

        {/* Search */}
        <div className={styles.featureButtons}>
          <button
            className={styles.featureBtn}
            onClick={onOpenCmd}
          >
            <span className={styles.featureBtnIcon}>⌘</span>
            Search
            <span style={{ marginLeft: "auto", fontSize: "0.63rem", opacity: 0.45, fontFamily: "monospace" }}>⌘K</span>
          </button>
        </div>

        {/* Activity Feed */}
        <div className={styles.feedBlock}>
          <div className={styles.feedLabel}>Recent Activity</div>
          {FEED.map((item, i) => (
            <div key={i} className={styles.feedItem}>
              <span className={styles.feedDot} />
              <div className={styles.feedContent}>
                <span className={styles.feedText}>{item.text}</span>
                <span className={styles.feedTime}>{item.time}</span>
              </div>
            </div>
          ))}
          <div className={styles.feedItem}>
            <span className={styles.feedDot} />
            <div className={styles.feedContent}>
              <span className={styles.feedText}>
                Working on something new
                <span className={styles.feedCursor} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
