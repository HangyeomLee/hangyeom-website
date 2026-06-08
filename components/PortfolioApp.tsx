"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { Sidebar } from "./Layout/Sidebar";
import { CommandPalette } from "./Features/CommandPalette";
import { HomePanel } from "./Panels/HomePanel";
import { WorkPanel } from "./Panels/WorkPanel";
import { ProjectPanel } from "./Panels/ProjectPanel";
import { ExperiencePanel } from "./Panels/ExperiencePanel";
import { AboutPanel } from "./Panels/AboutPanel";
import { BlogPanel } from "./Panels/BlogPanel";
import { BlogPostPanel } from "./Panels/BlogPostPanel";
import { PostEditor } from "./Features/PostEditor";
import styles from "./app.module.css";

export type View =
  | { type: "home" }
  | { type: "work" }
  | { type: "project"; id: string }
  | { type: "experience" }
  | { type: "about" }
  | { type: "blog" }
  | { type: "post"; slug: string }
  | { type: "new-post" }
  | { type: "edit-post"; slug: string };

const viewKey = (v: View) => {
  if (v.type === "project") return `project-${v.id}`;
  if (v.type === "post") return `post-${v.slug}`;
  if (v.type === "edit-post") return `edit-post-${v.slug}`;
  return v.type;
};

const HASH_MAP: Record<string, View> = {
  "": { type: "home" },
  home: { type: "home" },
  work: { type: "work" },
  experience: { type: "experience" },
  about: { type: "about" },
  blog: { type: "blog" },
  "new-post": { type: "new-post" },
};

function parseHash(): View {
  if (typeof window === "undefined") return { type: "home" };
  const raw = window.location.hash.replace("#", "").toLowerCase();
  if (raw.startsWith("project/")) {
    const id = decodeURIComponent(raw.replace("project/", ""));
    return { type: "project", id };
  }
  if (raw.startsWith("post/")) {
    const slug = decodeURIComponent(raw.replace("post/", ""));
    return { type: "post", slug };
  }
  if (raw.startsWith("edit-post/")) {
    const slug = decodeURIComponent(raw.replace("edit-post/", ""));
    return { type: "edit-post", slug };
  }
  return HASH_MAP[raw] ?? { type: "home" };
}

function toHash(v: View): string {
  if (v.type === "project") return `#project/${encodeURIComponent(v.id)}`;
  if (v.type === "post") return `#post/${encodeURIComponent(v.slug)}`;
  if (v.type === "edit-post") return `#edit-post/${encodeURIComponent(v.slug)}`;
  if (v.type === "home") return "#home";
  return `#${v.type}`;
}

export function PortfolioApp() {
  const [view, setViewRaw] = useState<View>({ type: "home" });
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    setViewRaw(parseHash());
    const onHash = () => setViewRaw(parseHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const setView = useCallback((v: View) => {
    setViewRaw(v);
    window.history.pushState(null, "", toHash(v));
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      const el = document.activeElement as HTMLElement | null;
      if (tag === "INPUT" || tag === "TEXTAREA" || el?.contentEditable === "true") return;

      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
        return;
      }
      if (e.key === "Escape") {
        if (paletteOpen) { setPaletteOpen(false); return; }
        if (view.type === "project") { setView({ type: "work" }); return; }
        return;
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paletteOpen, view, setView]);

  return (
    <>
      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        setView={setView}
      />
      <div className={styles.app}>
        <Sidebar view={view} setView={setView} onOpenCmd={() => setPaletteOpen(true)} />
        <main className={styles.main}>
          <AnimatePresence mode="wait">
            {view.type === "home" && <HomePanel key="home" setView={setView} />}
            {view.type === "work" && <WorkPanel key="work" setView={setView} />}
            {view.type === "project" && <ProjectPanel key={viewKey(view)} id={(view as Extract<View, { type: "project" }>).id} setView={setView} />}
            {view.type === "experience" && <ExperiencePanel key="experience" />}
            {view.type === "about" && <AboutPanel key="about" />}
            {view.type === "blog" && <BlogPanel key="blog" setView={setView} />}
            {view.type === "post" && <BlogPostPanel key={viewKey(view)} slug={(view as Extract<View, { type: "post" }>).slug} setView={setView} />}
            {view.type === "new-post" && <PostEditor key="new-post" setView={setView} />}
            {view.type === "edit-post" && <PostEditor key={viewKey(view)} slug={(view as Extract<View, { type: "edit-post" }>).slug} setView={setView} />}
          </AnimatePresence>
        </main>
      </div>
    </>
  );
}
