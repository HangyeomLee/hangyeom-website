import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

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

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data, error } = await supabase.from("posts").select("*").eq("slug", slug).single();
  if (error) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json(normalize(data));
}

export async function PUT(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const body = await req.json();
  const { title, content, tags, published, categoryId } = body;

  const excerpt = extractExcerpt(content ?? "");

  const { data, error } = await supabase
    .from("posts")
    .update({ title, content, tags, published, excerpt, category_id: categoryId ?? null, updated_at: new Date().toISOString() })
    .eq("slug", slug)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(normalize(data));
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { error } = await supabase.from("posts").delete().eq("slug", slug);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
