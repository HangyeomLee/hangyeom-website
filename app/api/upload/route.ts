import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const BUCKET = "blog-images";
const ALLOWED = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml"];
const MAX_SIZE = 10 * 1024 * 1024;

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "no file" }, { status: 400 });

  if (!ALLOWED.includes(file.type))
    return NextResponse.json({ error: "이미지 파일만 업로드 가능합니다." }, { status: 400 });

  if (file.size > MAX_SIZE)
    return NextResponse.json({ error: "파일 크기는 10MB 이하여야 합니다." }, { status: 400 });

  const ext = file.name.split(".").pop() ?? "png";
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(filename, buffer, { contentType: file.type, upsert: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(filename);
  return NextResponse.json({ url: data.publicUrl });
}
