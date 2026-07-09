import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { PostEditor } from "@/components/admin/PostEditor";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "New Post",
  robots: { index: false, follow: false },
};

export default async function NewPostPage() {
  if (!(await isAdmin())) redirect("/admin");
  return <PostEditor />;
}
