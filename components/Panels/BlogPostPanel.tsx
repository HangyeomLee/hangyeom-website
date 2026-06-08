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
  content: string;
  tags: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
  categoryId: string | null;
};

function readingTime(content: string) {
  return Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200));
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" });
}

type Props = { slug: string; setView: (v: View) => void };

export function BlogPostPanel({ slug, setView }: Props) {
  const [post, setPost] = useState<Post | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetch(`/api/posts/${slug}`)
      .then((r) => r.json())
      .then((data) => { setPost(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    if (!post?.categoryId) { setCategory(null); return; }
    fetch("/api/categories")
      .then((r) => r.json())
      .then((cats: Category[]) => setCategory(cats.find((c) => c.id === post.categoryId) ?? null))
      .catch(() => {});
  }, [post?.categoryId]);

  const handleDelete = async () => {
    if (!post || !confirm("정말 삭제하시겠습니까?")) return;
    setDeleting(true);
    await fetch(`/api/posts/${slug}`, { method: "DELETE" });
    setView({ type: "blog" });
  };

  if (loading) {
    return (
      <motion.div className={styles.panelMotion} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className={styles.panelInner}>
          <p style={{ color: "var(--muted)", fontSize: "0.88rem" }}>Loading…</p>
        </div>
      </motion.div>
    );
  }

  if (!post) {
    return (
      <motion.div className={styles.panelMotion} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className={styles.panelInner}>
          <p style={{ color: "var(--muted)" }}>포스트를 찾을 수 없습니다.</p>
          <button className={styles.backBtn} onClick={() => setView({ type: "blog" })}>← Back to Blog</button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={styles.panelMotion}
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.15 }}
    >
      <div className={styles.panelInner} style={{ maxWidth: 720 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <button
            className={styles.backBtn}
            onClick={() => setView({ type: "blog" })}
          >
            ← Blog
          </button>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              className={styles.btnSecondary}
              style={{ fontSize: "0.8rem", minHeight: 32, padding: "0.3rem 0.8rem" }}
              onClick={() => setView({ type: "edit-post", slug: post.slug })}
            >
              Edit
            </button>
            <button
              className={styles.btnSecondary}
              style={{ fontSize: "0.8rem", minHeight: 32, padding: "0.3rem 0.8rem", color: "#dc2626", borderColor: "rgba(220,38,38,0.3)" }}
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? "삭제 중…" : "Delete"}
            </button>
          </div>
        </div>

        {!post.published && (
          <div className={styles.draftBanner}>📝 초안 — 아직 발행되지 않은 글입니다.</div>
        )}

        <div className={styles.postMeta}>
          <span className={styles.postDate}>{formatDate(post.createdAt)}</span>
          <span className={styles.postReadTime}>{readingTime(post.content)}분 읽기</span>
          {category && (
            <span
              className={styles.categoryBadge}
              style={{ "--cat-bg": `${category.color}1a`, "--cat-color": category.color } as CSSProperties}
            >
              <span className={styles.categoryDot} style={{ background: category.color }} />
              {category.name}
            </span>
          )}
        </div>

        <h1 className={styles.postTitle}>{post.title}</h1>

        {post.tags.length > 0 && (
          <div className={styles.postTags}>
            {post.tags.map((t) => (
              <span key={t} className={styles.blogTag}>{t}</span>
            ))}
          </div>
        )}

        <div
          className={styles.postContent}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </motion.div>
  );
}
