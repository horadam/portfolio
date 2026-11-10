"use client";

import { useEffect, useState } from "react";

export const sections = [
  { id: "work", n: "01", label: "Work" },
  { id: "about", n: "02", label: "About" },
  { id: "experience", n: "03", label: "Experience" },
  { id: "contact", n: "04", label: "Contact" },
];

// Highlights the last section whose top has passed the middle of the
// viewport. The last section is too short to reach the middle, so it
// becomes active once the page is scrolled to the bottom.
export function SectionNav() {
  const [active, setActive] = useState("work");

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      let current = sections[0].id;
      if (atBottom) current = sections[sections.length - 1].id;
      else
        for (const { id } of sections) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= window.innerHeight / 2)
            current = id;
        }
      setActive(current);
    };
    // At most one check per frame.
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    // After a nav click, the target stays active while the page scrolls to
    // it, so the sections passed on the way don't light up in turn.
    let pinned = false;
    let idle: ReturnType<typeof setTimeout> | undefined;
    const releaseWhenIdle = () => {
      clearTimeout(idle);
      idle = setTimeout(() => {
        pinned = false;
        schedule();
      }, 150);
    };
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element).closest?.("a[href^='#']");
      const id = link?.getAttribute("href")?.slice(1);
      if (!id || !sections.some((s) => s.id === id)) return;
      pinned = true;
      setActive(id);
      releaseWhenIdle();
    };
    const onScroll = () => (pinned ? releaseWhenIdle() : schedule());

    schedule();
    document.addEventListener("click", onClick);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
      clearTimeout(idle);
    };
  }, []);

  return (
    <>
      {/* Phones and tablets: a plain row of jump links. */}
      <nav aria-label="Sections" className="mt-8 lg:hidden">
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {sections.map(({ id, n, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className="inline-flex min-h-6 items-baseline gap-1.5 text-sm text-ink hover:text-mint"
              >
                <span className="font-mono text-xs text-mint">{n}</span>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <DesktopNav active={active} />
    </>
  );
}

function DesktopNav({ active }: { active: string }) {
  return (
    <nav aria-label="Sections" className="mt-12 hidden lg:block">
      <ul>
        {sections.map(({ id, n, label }) => {
          const on = active === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={on ? "true" : undefined}
                className="group flex items-baseline gap-3 py-1.5 text-sm"
              >
                <span
                  className={`font-mono text-xs transition-colors ${
                    on ? "text-mint" : "group-hover:text-mint"
                  }`}
                >
                  {n}
                </span>
                {/* Grows into a mint line beside the active section. */}
                <span
                  aria-hidden="true"
                  className={`h-px w-6 shrink-0 origin-left self-center transition-[scale,background-color] duration-200 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
                    on ? "scale-x-100 bg-mint" : "scale-x-[0.34] bg-edge"
                  }`}
                />
                <span
                  className={`transition-[translate,color] duration-200 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
                    on
                      ? "translate-x-1 text-ink"
                      : "group-hover:translate-x-1 group-hover:text-ink"
                  }`}
                >
                  {label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
