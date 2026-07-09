import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";
import { isAdmin } from "@/lib/auth";
import { extractExcerpt, normalize } from "@/lib/posts";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data, error } = await supabase.from("posts").select("*").eq("slug", slug).single();
  if (error || !data) return NextResponse.json({ error: "not found" }, { status: 404 });
  if (!data.published && !(await isAdmin())) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
  return NextResponse.json(normalize(data));
}

export async function PUT(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

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
  revalidatePath("/blog", "layout");
  return NextResponse.json(normalize(data));
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { slug } = await params;
  const { error } = await supabase.from("posts").delete().eq("slug", slug);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  revalidatePath("/blog", "layout");
  return NextResponse.json({ ok: true });
}
