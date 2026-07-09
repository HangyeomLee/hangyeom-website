"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { products } from "../portfolioData";

// Maps legacy hash-router deep links (#project/FIFA2026.ca, #post/slug, …)
// to the real routes so old shared links keep working.
export function HashRedirect() {
  const router = useRouter();

  useEffect(() => {
    const raw = decodeURIComponent(window.location.hash.replace("#", ""));
    if (!raw) return;
    const lower = raw.toLowerCase();

    if (lower.startsWith("project/")) {
      const id = raw.slice("project/".length).toLowerCase();
      const match = products.find(
        (p) => p.title.toLowerCase() === id || p.slug === id
      );
      router.replace(match ? `/projects/${match.slug}` : "/#projects");
      return;
    }
    if (lower.startsWith("post/")) {
      router.replace(`/blog/${raw.slice("post/".length)}`);
      return;
    }
    if (lower === "blog") return router.replace("/blog");
    if (lower === "work") return router.replace("/#projects");
    if (lower === "experience") return router.replace("/#experience");
    if (lower === "about" || lower === "contact") return router.replace("/#contact");
    if (lower === "new-post" || lower.startsWith("edit-post/")) return router.replace("/admin");
    // #home, #projects, #experience, #contact and unknown hashes: leave as-is.
  }, [router]);

  return null;
}
