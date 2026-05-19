"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCursor } from "../Shared/Cursor";
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
  content: string;
};

function readingTime(content: string) {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" });
}

type Props = { setView: (v: View) => void };

export function BlogPanel({ setView }: Props) {
  const { setCursor } = useCursor();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/posts")
      .then((r) => r.json())
      .then((data) => { setPosts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const published = posts.filter((p) => p.published);
  const drafts = posts.filter((p) => !p.published);

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
              onMouseEnter={() => setCursor("hover")}
              onMouseLeave={() => setCursor("default")}
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

        {!loading && posts.length === 0 && (
          <div className={styles.blogEmpty}>
            <p>No posts yet.</p>
            <button
              className={styles.btnPrimary}
              onClick={() => setView({ type: "new-post" })}
              onMouseEnter={() => setCursor("hover")}
              onMouseLeave={() => setCursor("default")}
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
                onMouseEnter={() => setCursor("hover")}
                onMouseLeave={() => setCursor("default")}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
              >
                <div className={styles.blogCardMeta}>
                  <span className={styles.blogCardDate}>{formatDate(post.createdAt)}</span>
                  <span className={styles.blogCardTime}>{readingTime(post.content)}분 읽기</span>
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
                  onMouseEnter={() => setCursor("hover")}
                  onMouseLeave={() => setCursor("default")}
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
