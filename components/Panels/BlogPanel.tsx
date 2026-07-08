"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { motion } from "framer-motion";
import { type Category } from "../Features/CategoryManager";
import styles from "../app.module.css";
import type { View } from "../PortfolioApp";

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  published: boolean;
  createdAt: string;
  readingTimeMinutes: number;
  categoryId: string | null;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" });
}

type Props = { setView: (v: View) => void };

export function BlogPanel({ setView }: Props) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/posts")
      .then((r) => r.json())
      .then((data) => { setPosts(data); setLoading(false); })
      .catch(() => setLoading(false));
    fetch("/api/categories")
      .then((r) => r.json())
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  const categoryMap = new Map(categories.map((c) => [c.id, c]));
  const usedCategoryIds = new Set(posts.filter((p) => p.published && p.categoryId).map((p) => p.categoryId as string));
  const visibleCategories = categories.filter((c) => usedCategoryIds.has(c.id));

  const allPublished = posts.filter((p) => p.published);
  const published = activeCategory ? allPublished.filter((p) => p.categoryId === activeCategory) : allPublished;
  const drafts = posts.filter((p) => !p.published);

  const CategoryBadge = ({ id }: { id: string | null }) => {
    if (!id) return null;
    const cat = categoryMap.get(id);
    if (!cat) return null;
    return (
      <span
        className={styles.categoryBadge}
        style={{ "--cat-bg": `${cat.color}1a`, "--cat-color": cat.color } as CSSProperties}
      >
        <span className={styles.categoryDot} style={{ background: cat.color }} />
        {cat.name}
      </span>
    );
  };

  return (
    <motion.div
      className={styles.panelMotion}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.15 }}
    >
      <div className={styles.panelInner}>
        <div className={styles.panelHeader}>
          <p className={styles.panelEyebrow}>04 — Blog</p>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "1rem" }}>
            <h1 className={styles.panelTitle}>Writing</h1>
            <button
              className={styles.btnPrimary}
              onClick={() => setView({ type: "new-post" })}
              style={{ flexShrink: 0, marginBottom: "0.5rem" }}
            >
              + New Post
            </button>
          </div>
          <p className={styles.panelDesc}>
            Notes on engineering, product thinking, and AI systems.
          </p>
        </div>

        {loading && (
          <p style={{ color: "var(--muted)", fontSize: "0.88rem" }}>Loading…</p>
        )}

        {visibleCategories.length > 0 && (
          <div className={styles.categoryFilterRow}>
            <button
              className={`${styles.categoryFilterBtn} ${activeCategory === null ? styles.categoryFilterBtnActive : ""}`}
              onClick={() => setActiveCategory(null)}
            >
              전체
            </button>
            {visibleCategories.map((c) => (
              <button
                key={c.id}
                className={`${styles.categoryFilterBtn} ${activeCategory === c.id ? styles.categoryFilterBtnActive : ""}`}
                style={activeCategory === c.id ? ({ "--cat-bg": `${c.color}1a`, "--cat-color": c.color } as CSSProperties) : undefined}
                onClick={() => setActiveCategory(c.id)}
              >
                <span className={styles.categoryDot} style={{ background: c.color }} />
                {c.name}
              </button>
            ))}
          </div>
        )}

        {!loading && posts.length === 0 && (
          <div className={styles.blogEmpty}>
            <p>No posts yet.</p>
            <button
              className={styles.btnPrimary}
              onClick={() => setView({ type: "new-post" })}
            >
              Write your first post
            </button>
          </div>
        )}

        {published.length > 0 && (
          <div className={styles.blogGrid}>
            {published.map((post, i) => (
              <motion.button
                key={post.id}
                className={styles.blogCard}
                onClick={() => setView({ type: "post", slug: post.slug })}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
              >
                <div className={styles.blogCardMeta}>
                  <span className={styles.blogCardDate}>{formatDate(post.createdAt)}</span>
                  <span className={styles.blogCardTime}>{post.readingTimeMinutes}분 읽기</span>
                  <CategoryBadge id={post.categoryId} />
                </div>
                <h3 className={styles.blogCardTitle}>{post.title}</h3>
                {post.excerpt && <p className={styles.blogCardExcerpt}>{post.excerpt}</p>}
                {post.tags.length > 0 && (
                  <div className={styles.blogCardTags}>
                    {post.tags.map((t) => (
                      <span key={t} className={styles.blogTag}>{t}</span>
                    ))}
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        )}

        {drafts.length > 0 && (
          <>
            <div className={styles.blogDraftLabel}>초안 ({drafts.length})</div>
            <div className={styles.blogGrid}>
              {drafts.map((post, i) => (
                <motion.button
                  key={post.id}
                  className={`${styles.blogCard} ${styles.blogCardDraft}`}
                  onClick={() => setView({ type: "edit-post", slug: post.slug })}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                >
                  <div className={styles.blogCardMeta}>
                    <span className={styles.blogDraftBadge}>Draft</span>
                    <span className={styles.blogCardDate}>{formatDate(post.createdAt)}</span>
                  </div>
                  <h3 className={styles.blogCardTitle}>{post.title || "(제목 없음)"}</h3>
                  {post.excerpt && <p className={styles.blogCardExcerpt}>{post.excerpt}</p>}
                </motion.button>
              ))}
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
