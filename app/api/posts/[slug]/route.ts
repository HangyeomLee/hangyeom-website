import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "posts.json");

type Post = {
  id: string;
  slug: string;
  title: string;
  content: string;
  tags: string[];
  excerpt: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

function readPosts(): Post[] {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  } catch {
    return [];
  }
}

function writePosts(posts: Post[]) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2));
}

function extractExcerpt(markdown: string): string {
  return markdown
    .replace(/#{1,6}\s+/g, "")
    .replace(/\*\*|__|~~|`/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\n+/g, " ")
    .trim()
    .slice(0, 180);
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = readPosts().find((p) => p.slug === slug);
  if (!post) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const body = await req.json();
  const posts = readPosts();
  const idx = posts.findIndex((p) => p.slug === slug);
  if (idx === -1) return NextResponse.json({ error: "not found" }, { status: 404 });

  posts[idx] = {
    ...posts[idx],
    ...body,
    excerpt: extractExcerpt(body.content ?? posts[idx].content),
    updatedAt: new Date().toISOString(),
  };
  writePosts(posts);
  return NextResponse.json(posts[idx]);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const posts = readPosts();
  const filtered = posts.filter((p) => p.slug !== slug);
  if (filtered.length === posts.length) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
  writePosts(filtered);
  return NextResponse.json({ ok: true });
}
