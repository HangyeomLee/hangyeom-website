import type { MetadataRoute } from "next";
import { products } from "@/components/portfolioData";
import { getPublishedPosts } from "@/lib/posts";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hangyeom-website.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = [
    { url: BASE, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/resume`, changeFrequency: "monthly", priority: 0.7 },
  ];

  const projectEntries: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE}/projects/${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  // Never fail the build on a Supabase hiccup — ship without post URLs instead.
  let postEntries: MetadataRoute.Sitemap = [];
  try {
    const posts = await getPublishedPosts();
    postEntries = posts.map((post) => ({
      url: `${BASE}/blog/${post.slug}`,
      lastModified: post.updatedAt ?? post.createdAt,
      changeFrequency: "yearly",
      priority: 0.6,
    }));
  } catch {
    postEntries = [];
  }

  return [...staticEntries, ...projectEntries, ...postEntries];
}
