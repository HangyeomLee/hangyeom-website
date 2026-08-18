import Link from "next/link";
import { getPublishedPosts } from "@/lib/posts";
import styles from "./home.module.css";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" });
}

export async function WritingSection() {
  // A Supabase hiccup shouldn't take the home page down with it.
  let posts;
  try {
    posts = (await getPublishedPosts()).slice(0, 3);
  } catch {
    return null;
  }
  if (posts.length === 0) return null;

  return (
    <section id="writing" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Things that went wrong</h2>
        <p className={styles.sectionLead}>
          I write up the incidents. Mostly from running the store: the morning our ads were pulled
          for selling tobacco we don&rsquo;t sell, the traffic that never turned into orders, the
          door I kept leaving open.
        </p>

        <div className={styles.postGrid}>
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.postCard}>
              <span className={styles.postMeta}>
                {formatDate(post.createdAt)} · {post.readingTimeMinutes} min
              </span>
              <h3 className={styles.postTitle}>{post.title}</h3>
              {post.excerpt && <p className={styles.postExcerpt}>{post.excerpt}…</p>}
            </Link>
          ))}
        </div>

        <Link href="/blog" className={styles.postsMore}>
          All posts
        </Link>
      </div>
    </section>
  );
}
