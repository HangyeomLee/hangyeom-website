import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { PostEditor } from "@/components/admin/PostEditor";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Edit Post",
  robots: { index: false, follow: false },
};

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  if (!(await isAdmin())) redirect("/admin");
  const { slug } = await params;
  return <PostEditor slug={slug} />;
}
