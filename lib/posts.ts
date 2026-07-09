import "server-only";
import { cache } from "react";
import { supabase } from "./supabase";

export type PostRow = {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  tags: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string | null;
  categoryId: string | null;
};

export type PostListItem = Omit<PostRow, "content"> & { readingTimeMinutes: number };

export type Category = {
  id: string;
  name: string;
  slug: string;
  color: string | null;
};

export function readingTimeMinutes(content: string) {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function extractExcerpt(content: string) {
  const text = content.trim().startsWith("<")
    ? content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
    : content.replace(/#{1,6}\s+/g, "").replace(/\*\*|__|~~|`/g, "").replace(/\n+/g, " ").trim();
  return text.slice(0, 180);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function normalize(row: any) {
  return {
    ...row,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    categoryId: row.category_id,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function normalizeForList(row: any): PostListItem {
  const { content, ...rest } = normalize(row);
  return { ...rest, readingTimeMinutes: readingTimeMinutes(content ?? "") };
}

export async function getPublishedPosts(): Promise<PostListItem[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []).map(normalizeForList);
}

// cache() dedupes the generateMetadata + page render calls within one request.
export const getPostBySlug = cache(async (slug: string): Promise<PostRow | null> => {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error || !data) return null;
  return normalize(data);
});

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);
  return data ?? [];
}
