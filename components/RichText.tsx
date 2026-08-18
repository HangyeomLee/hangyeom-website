import Link from "next/link";
import { Fragment } from "react";

const LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

// Bullets in portfolioData may carry one or more [label](/blog/slug) links so a
// claim can point at the post that tells the whole story. Everything else is
// rendered as plain text.
export function RichText({ children, className }: { children: string; className?: string }) {
  const parts: React.ReactNode[] = [];
  let last = 0;

  for (const match of children.matchAll(LINK)) {
    const [full, label, href] = match;
    const start = match.index ?? 0;
    if (start > last) parts.push(children.slice(last, start));
    parts.push(
      <Link key={`${href}-${start}`} href={href} className={className}>
        {label}
      </Link>
    );
    last = start + full.length;
  }
  if (last < children.length) parts.push(children.slice(last));

  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>{part}</Fragment>
      ))}
    </>
  );
}
