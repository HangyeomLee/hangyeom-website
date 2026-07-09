"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CategoryManager } from "./CategoryManager";
import styles from "./admin.module.css";

type PostRow = {
  slug: string;
  title: string;
  published: boolean;
  createdAt: string;
};

export function AdminDashboard() {
  const router = useRouter();
  const [posts, setPosts] = useState<PostRow[] | null>(null);
  const [showCategories, setShowCategories] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const load = useCallback(() => {
    fetch("/api/posts")
      .then((r) => r.json())
      .then((data) => setPosts(Array.isArray(data) ? data : []))
      .catch(() => setPosts([]));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const remove = async (slug: string, title: string) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeleting(slug);
    try {
      const res = await fetch(`/api/posts/${slug}`, { method: "DELETE" });
      if (res.ok) load();
    } finally {
      setDeleting(null);
    }
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.refresh();
  };

  return (
    <div className={styles.adminWrap}>
      <CategoryManager
        open={showCategories}
        onClose={() => setShowCategories(false)}
        onChange={() => {}}
      />

      <div className={styles.adminHeader}>
        <h1 className={styles.adminTitle}>Posts</h1>
        <div className={styles.adminActions}>
          <Link href="/admin/new" className={styles.btnPrimary}>
            + New Post
          </Link>
          <button className={styles.btnSecondary} onClick={() => setShowCategories(true)}>
            Categories
          </button>
          <button className={styles.btnSecondary} onClick={logout}>
            Log out
          </button>
        </div>
      </div>

      {posts === null && <p>Loading…</p>}
      {posts !== null && posts.length === 0 && <p>No posts yet.</p>}
      {posts !== null && posts.length > 0 && (
        <div className={styles.postTable}>
          {posts.map((post) => (
            <div key={post.slug} className={styles.postRow}>
              <span
                className={`${styles.statusBadge} ${post.published ? styles.statusPublished : styles.statusDraft}`}
              >
                {post.published ? "Published" : "Draft"}
              </span>
              <span className={styles.postRowTitle}>{post.title || "(untitled)"}</span>
              <span className={styles.postRowDate}>
                {new Date(post.createdAt).toLocaleDateString("en-CA")}
              </span>
              {post.published && (
                <Link href={`/blog/${post.slug}`} className={styles.rowAction}>
                  View
                </Link>
              )}
              <Link href={`/admin/edit/${post.slug}`} className={styles.rowAction}>
                Edit
              </Link>
              <button
                className={`${styles.rowAction} ${styles.rowActionDanger}`}
                onClick={() => remove(post.slug, post.title)}
                disabled={deleting === post.slug}
              >
                {deleting === post.slug ? "Deleting…" : "Delete"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
