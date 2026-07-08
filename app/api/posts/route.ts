import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// List rarely changes and content bodies can be large (bilingual posts with
// code blocks) — cache the list response instead of hitting Supabase and
// shipping full content on every blog visit.
export const revalidate = 60;

function readingTimeMinutes(content: string) {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function slugify(title: string) {
  const base = title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  const suffix = Date.now().toString(36);
  return base.length >= 3 ? `${base}-${suffix}` : `post-${suffix}`;
}

function extractExcerpt(content: string) {
  const text = content.trim().startsWith("<")
    ? content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
    : content.replace(/#{1,6}\s+/g, "").replace(/\*\*|__|~~|`/g, "").replace(/\n+/g, " ").trim();
  return text.slice(0, 180);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalize(row: any) {
  return {
    ...row,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    categoryId: row.category_id,
  };
}

// List view only needs enough to render a card — drop the (potentially large)
// content body and send a precomputed reading time instead.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeForList(row: any) {
  const { content, ...rest } = normalize(row);
  return { ...rest, readingTimeMinutes: readingTimeMinutes(content ?? "") };
}

export async function GET() {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json((data ?? []).map(normalizeForList));
}

export async function POST(req: Request) {
  const body = await req.json();
  const { title, content, tags, published, categoryId } = body;

  if (!title?.trim()) return NextResponse.json({ error: "title required" }, { status: 400 });

  const slug = slugify(title);
  const excerpt = extractExcerpt(content ?? "");

  const { data, error } = await supabase
    .from("posts")
    .insert({ slug, title, content: content ?? "", excerpt, tags: tags ?? [], published: published ?? false, category_id: categoryId ?? null })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(normalize(data), { status: 201 });
}
