"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { products, profile } from "../portfolioData";
import styles from "./palette.module.css";

type Item = {
  icon: string;
  label: string;
  meta: string;
  href: string;
  external?: boolean;
};

const ITEMS: Item[] = [
  { icon: "⌂", label: "Home", meta: "", href: "/" },
  { icon: "◫", label: "Projects", meta: "Section", href: "/#projects" },
  ...products.map((p) => ({
    icon: "›",
    label: p.title,
    meta: p.tag,
    href: `/projects/${p.slug}`,
  })),
  { icon: "◈", label: "Experience", meta: "Section", href: "/#experience" },
  { icon: "✎", label: "Blog", meta: "", href: "/blog" },
  { icon: "≡", label: "Resume", meta: "", href: "/resume" },
  { icon: "○", label: "About & Contact", meta: "Section", href: "/#contact" },
  { icon: "↗", label: "GitHub", meta: "External", href: profile.github, external: true },
  { icon: "↗", label: "LinkedIn", meta: "External", href: profile.linkedin, external: true },
];

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const openPalette = useCallback(() => {
    setQuery("");
    setSelected(0);
    setOpen(true);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => {
          if (!o) {
            setQuery("");
            setSelected(0);
          }
          return !o;
        });
      }
    };
    const onOpenEvent = () => openPalette();

    window.addEventListener("keydown", onKey);
    window.addEventListener("open-cmdk", onOpenEvent);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-cmdk", onOpenEvent);
    };
  }, [openPalette]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 30);
  }, [open]);

  const filtered = ITEMS.filter(
    (item) =>
      item.label.toLowerCase().includes(query.toLowerCase()) ||
      item.meta.toLowerCase().includes(query.toLowerCase())
  );

  const navigate = (item: Item) => {
    setOpen(false);
    if (item.external) {
      window.open(item.href, "_blank", "noreferrer");
      return;
    }
    router.push(item.href);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") return setOpen(false);
    if (e.key === "ArrowDown") return setSelected((s) => Math.min(s + 1, filtered.length - 1));
    if (e.key === "ArrowUp") return setSelected((s) => Math.max(s - 1, 0));
    if (e.key === "Enter" && filtered[selected]) navigate(filtered[selected]);
  };

  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={() => setOpen(false)}>
      <div className={styles.box} onClick={(e) => e.stopPropagation()}>
        <input
          ref={inputRef}
          className={styles.input}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelected(0);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Search pages, projects…"
        />

        <div className={styles.items}>
          {filtered.length === 0 && (
            <div className={styles.empty}>No results for &ldquo;{query}&rdquo;</div>
          )}
          {filtered.map((item, i) => (
            <button
              key={item.label}
              className={`${styles.item} ${i === selected ? styles.itemSelected : ""}`}
              onClick={() => navigate(item)}
              onMouseEnter={() => setSelected(i)}
            >
              <span className={styles.itemIcon}>{item.icon}</span>
              <span>{item.label}</span>
              {item.meta && <span className={styles.itemMeta}>{item.meta}</span>}
            </button>
          ))}
        </div>

        <div className={styles.footer}>
          <span>
            <kbd className={styles.kbd}>↑↓</kbd> navigate
          </span>
          <span>
            <kbd className={styles.kbd}>↵</kbd> open
          </span>
          <span>
            <kbd className={styles.kbd}>esc</kbd> close
          </span>
        </div>
      </div>
    </div>
  );
}
