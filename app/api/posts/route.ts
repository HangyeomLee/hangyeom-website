import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";

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
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writePosts(posts: Post[]) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2));
}

function slugify(title: string): string {
  const base = title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  const suffix = Date.now().toString(36);
  return base.length >= 3 ? `${base}-${suffix}` : `post-${suffix}`;
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

export async function GET() {
  const posts = readPosts().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { title, content, tags, published } = body;

  if (!title || !content) {
    return NextResponse.json({ error: "title and content required" }, { status: 400 });
  }

  const posts = readPosts();
  const slug = slugify(title);

  const newPost: Post = {
    id: randomUUID(),
    slug,
    title,
    content,
    tags: tags ?? [],
    excerpt: extractExcerpt(content),
    published: published ?? false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  writePosts([...posts, newPost]);
  return NextResponse.json(newPost, { status: 201 });
}
