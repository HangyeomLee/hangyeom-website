import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { isAdmin } from "@/lib/auth";

function slugify(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9가-힣-]/g, "");
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const { name, color } = body;

  if (!name?.trim()) return NextResponse.json({ error: "name required" }, { status: 400 });

  const slug = slugify(name);
  if (!slug) return NextResponse.json({ error: "invalid name" }, { status: 400 });

  const { data, error } = await supabase
    .from("categories")
    .update({ name: name.trim(), slug, color: color || "#7C3AED" })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    const status = error.code === "23505" ? 409 : 500;
    const message = error.code === "23505" ? "이미 존재하는 카테고리입니다." : error.message;
    return NextResponse.json({ error: message }, { status });
  }
  return NextResponse.json(data);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { id } = await params;
  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
