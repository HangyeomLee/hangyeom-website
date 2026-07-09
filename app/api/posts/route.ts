import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";
import { isAdmin } from "@/lib/auth";
import { extractExcerpt, normalize, normalizeForList } from "@/lib/posts";

function slugify(title: string) {
  const base = title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  const suffix = Date.now().toString(36);
  return base.length >= 3 ? `${base}-${suffix}` : `post-${suffix}`;
}

export async function GET() {
  const admin = await isAdmin();

  let query = supabase.from("posts").select("*").order("created_at", { ascending: false });
  if (!admin) query = query.eq("published", true);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json((data ?? []).map(normalizeForList));
}

export async function POST(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

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
  revalidatePath("/blog", "layout");
  return NextResponse.json(normalize(data), { status: 201 });
}
