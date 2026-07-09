import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategories, getPostBySlug, getPublishedPosts, readingTimeMinutes } from "@/lib/posts";
import styles from "@/components/blog/blog.module.css";

export const revalidate = 60;

// Prerender all published posts at build time; unknown slugs render on demand.
// Never fail the build on a Supabase hiccup.
export async function generateStaticParams() {
  try {
    const posts = await getPublishedPosts();
    return posts.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

type Props = { params: Promise<{ slug: string }> };

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  // 404 here (before streaming starts) so missing/draft slugs get a real 404
  // status instead of a streamed 200 with not-found UI.
  if (!post) notFound();
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.createdAt,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const categories = await getCategories().catch(() => []);
  const category = post.categoryId
    ? categories.find((c) => c.id === post.categoryId)
    : null;

  return (
    <article className={styles.wrap}>
      <Link href="/blog" className={styles.backLink}>
        ← All posts
      </Link>

      <header className={styles.postHeader}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.postMeta}>
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
          <span>· {readingTimeMinutes(post.content)} min read</span>
          {post.tags?.length > 0 && (
            <span className={styles.tags}>
              {post.tags.map((tag) => (
                <span key={tag} className={styles.tagChip}>
                  #{tag}
                </span>
              ))}
            </span>
          )}
        </div>
      </header>

      {/* Content is TipTap HTML authored only by the authenticated admin. */}
      <div className={styles.postContent} dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}
