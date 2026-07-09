"use client";

import { useState } from "react";
import Link from "next/link";
import type { Category, PostListItem } from "@/lib/posts";
import styles from "./blog.module.css";

type Props = {
  posts: PostListItem[];
  categories: Category[];
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function BlogList({ posts, categories }: Props) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const usedCategories = categories.filter((c) => posts.some((p) => p.categoryId === c.id));
  const filtered = activeCategory ? posts.filter((p) => p.categoryId === activeCategory) : posts;
  const categoryById = new Map(categories.map((c) => [c.id, c]));

  return (
    <>
      {usedCategories.length > 0 && (
        <div className={styles.filters}>
          <button
            className={`${styles.filterChip} ${activeCategory === null ? styles.filterChipActive : ""}`}
            onClick={() => setActiveCategory(null)}
          >
            All
          </button>
          {usedCategories.map((c) => (
            <button
              key={c.id}
              className={`${styles.filterChip} ${activeCategory === c.id ? styles.filterChipActive : ""}`}
              onClick={() => setActiveCategory(c.id)}
            >
              {c.name}
            </button>
          ))}
        </div>
      )}

      <div className={styles.list}>
        {filtered.length === 0 && <div className={styles.empty}>No posts yet.</div>}
        {filtered.map((post) => {
          const category = post.categoryId ? categoryById.get(post.categoryId) : null;
          return (
            <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.postCard}>
              <div className={styles.postCardMeta}>
                {category && (
                  <span
                    className={styles.categoryBadge}
                    style={{
                      background: `${category.color ?? "#7C3AED"}18`,
                      color: category.color ?? "#7C3AED",
                    }}
                  >
                    {category.name}
                  </span>
                )}
                <span>{formatDate(post.createdAt)}</span>
                <span>· {post.readingTimeMinutes} min read</span>
              </div>
              <h2 className={styles.postCardTitle}>{post.title}</h2>
              {post.excerpt && <p className={styles.postCardExcerpt}>{post.excerpt}…</p>}
              {post.tags?.length > 0 && (
                <div className={styles.tags}>
                  {post.tags.map((tag) => (
                    <span key={tag} className={styles.tagChip}>
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </>
  );
}
