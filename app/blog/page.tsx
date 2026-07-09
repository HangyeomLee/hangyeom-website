import type { Metadata } from "next";
import { getCategories, getPublishedPosts } from "@/lib/posts";
import { BlogList } from "@/components/blog/BlogList";
import styles from "@/components/blog/blog.module.css";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writing about running live products: payment bugs, analytics debugging, infrastructure incidents, and what operating real software teaches you.",
};

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([getPublishedPosts(), getCategories()]);

  return (
    <div className={styles.wrap}>
      <div className={styles.eyebrow}>Writing</div>
      <h1 className={styles.title}>Blog</h1>
      <p className={styles.lead}>
        Notes from operating live products — real incidents, real debugging, and what they
        taught me.
      </p>
      <BlogList posts={posts} categories={categories} />
    </div>
  );
}
