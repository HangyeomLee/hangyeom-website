"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./site.module.css";

const NAV = [
  { label: "Projects", href: "/#projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Blog", href: "/blog" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/#contact" },
];

function isActive(pathname: string, href: string) {
  if (href.startsWith("/#")) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform));
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const openPalette = () => {
    window.dispatchEvent(new CustomEvent("open-cmdk"));
    setMenuOpen(false);
  };

  const links = NAV.map((item) => (
    <Link
      key={item.href}
      href={item.href}
      className={`${styles.navLink} ${isActive(pathname, item.href) ? styles.navLinkActive : ""}`}
      onClick={() => setMenuOpen(false)}
    >
      {item.label}
    </Link>
  ));

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoMark}>H</span>
          Hangyeom Lee
        </Link>

        <nav className={styles.nav} aria-label="Main">
          {links}
          <button type="button" className={styles.cmdBtn} onClick={openPalette}>
            Search
            <span className={styles.cmdKey}>{isMac ? "⌘K" : "Ctrl K"}</span>
          </button>
        </nav>

        <button
          type="button"
          className={styles.menuBtn}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          ☰
        </button>
      </div>

      {menuOpen && (
        <nav className={styles.mobileNav} aria-label="Mobile">
          {links}
        </nav>
      )}
    </header>
  );
}
