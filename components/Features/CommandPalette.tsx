"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { products, profile } from "../portfolioData";
import { useCursor } from "../Shared/Cursor";
import styles from "../app.module.css";
import type { View } from "../PortfolioApp";

const NAV_ITEMS = [
  { icon: "⌂", label: "Home", meta: "", view: { type: "home" } as View, external: false },
  { icon: "◫", label: "All Projects", meta: "Work", view: { type: "work" } as View, external: false },
  ...products.map((p) => ({
    icon: "›",
    label: p.title,
    meta: p.tag,
    view: { type: "project", id: p.title } as View,
    external: false,
  })),
  { icon: "◈", label: "Experience", meta: "", view: { type: "experience" } as View, external: false },
  { icon: "○", label: "About & Contact", meta: "", view: { type: "about" } as View, external: false },
  { icon: "✦", label: "Ask AI", meta: "Chat", view: { type: "ask" } as View, external: false },
  { icon: "↗", label: "GitHub", meta: "External", view: null as unknown as View, external: true, href: profile.github },
  { icon: "↗", label: "Resume PDF", meta: "External", view: null as unknown as View, external: true, href: "/resume.pdf" },
];

type Props = {
  open: boolean;
  onClose: () => void;
  setView: (v: View) => void;
};

export function CommandPalette({ open, onClose, setView }: Props) {
  const { setCursor } = useCursor();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const filtered = NAV_ITEMS.filter(
    (item) =>
      item.label.toLowerCase().includes(query.toLowerCase()) ||
      item.meta.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") { onClose(); return; }
    if (e.key === "ArrowDown") { setSelected((s) => Math.min(s + 1, filtered.length - 1)); return; }
    if (e.key === "ArrowUp") { setSelected((s) => Math.max(s - 1, 0)); return; }
    if (e.key === "Enter" && filtered[selected]) navigate(filtered[selected]);
  };

  const navigate = (item: typeof NAV_ITEMS[0]) => {
    if (item.external && (item as any).href) {
      window.open((item as any).href, "_blank");
      onClose();
      return;
    }
    if (item.view) {
      setView(item.view);
      onClose();
    }
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        className={styles.paletteOverlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.1 }}
        onClick={onClose}
      >
        <motion.div
          className={styles.paletteBox}
          initial={{ scale: 0.97, opacity: 0, y: -6 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.97, opacity: 0, y: -6 }}
          transition={{ duration: 0.13 }}
          onClick={(e) => e.stopPropagation()}
        >
          <input
            ref={inputRef}
            className={styles.paletteInput}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelected(0); }}
            onKeyDown={handleKeyDown}
            placeholder="Search pages, projects…"
          />

          <div className={styles.paletteItems}>
            {filtered.length === 0 && (
              <div style={{ padding: "1rem 1.1rem", fontSize: "0.82rem", color: "var(--muted)" }}>
                No results for &ldquo;{query}&rdquo;
              </div>
            )}
            {filtered.map((item, i) => (
              <button
                key={item.label}
                className={`${styles.paletteItem} ${i === selected ? styles.paletteItemSelected : ""}`}
                onClick={() => navigate(item)}
                onMouseEnter={() => { setSelected(i); setCursor("hover"); }}
                onMouseLeave={() => setCursor("default")}
              >
                <span className={styles.paletteItemIcon}>{item.icon}</span>
                <span className={styles.paletteItemLabel}>{item.label}</span>
                {item.meta && <span className={styles.paletteItemMeta}>{item.meta}</span>}
              </button>
            ))}
          </div>

          <div className={styles.paletteFooter}>
            <span className={styles.paletteHint}>
              <kbd className={styles.paletteKbd}>↑↓</kbd> navigate
            </span>
            <span className={styles.paletteHint}>
              <kbd className={styles.paletteKbd}>↵</kbd> open
            </span>
            <span className={styles.paletteHint}>
              <kbd className={styles.paletteKbd}>esc</kbd> close
            </span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
