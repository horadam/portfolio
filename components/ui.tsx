import Link from "next/link";
import type { ReactNode } from "react";

export function Tag({ children }: { children: ReactNode }) {
  return (
    <li className="rounded-sm border border-edge px-2 py-0.5 font-mono text-xs leading-5 text-mint lowercase">
      {children}
    </li>
  );
}

export function TagList({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
      {tags.map((t) => (
        <Tag key={t}>{t}</Tag>
      ))}
    </ul>
  );
}

// "01 / selected work": a mono label, sticky on phones.
export function SectionHeading({
  n,
  children,
}: {
  n?: string;
  children: ReactNode;
}) {
  return (
    <h2 className="sticky top-0 z-10 -mx-6 mb-6 bg-page/80 px-6 py-5 font-mono text-xs text-mint lowercase backdrop-blur lg:static lg:mx-0 lg:bg-transparent lg:px-0 lg:py-0 lg:backdrop-blur-none">
      {n && <span>{n} / </span>}
      {children}
    </h2>
  );
}

// Site pages use client navigation; other sites and files open in a new tab;
// mailto: links stay a plain link. A note (a short caveat such as "needs your
// OpenAI key") sits inside the link, so screen readers hear it with the name.
export function ArrowLink({
  href,
  children,
  mono = false,
  note,
}: {
  href: string;
  children: ReactNode;
  mono?: boolean;
  note?: string;
}) {
  const external = href.startsWith("http") || href.endsWith(".pdf");
  // With a note the link is inline text, so a long note wraps like a sentence.
  const className = `group text-ink hover:text-mint focus-visible:text-mint ${
    note ? "inline leading-6" : "inline-flex min-h-6 items-center gap-1"
  } ${mono ? "font-mono text-xs lowercase" : "font-medium"}`;
  // ↗ leaves the site (new tab); → stays on it.
  const arrow = external ? (
    <>
      <span
        aria-hidden="true"
        className="inline-block transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      >
        ↗
      </span>
      <span className="sr-only">(opens in a new tab)</span>
    </>
  ) : (
    <span
      aria-hidden="true"
      className="inline-block transition-transform group-hover:translate-x-0.5"
    >
      →
    </span>
  );
  const noteText = note && (
    <span className="ml-1.5 font-mono text-xs font-normal text-muted lowercase">
      <span className="sr-only">, </span>
      {note}
    </span>
  );
  if (href.startsWith("mailto:"))
    return (
      <a href={href} className={className}>
        {children} {arrow}
        {noteText}
      </a>
    );
  return external ? (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {children} {arrow}
      {noteText}
    </a>
  ) : (
    <Link href={href} className={className}>
      {children} {arrow}
      {noteText}
    </Link>
  );
}
