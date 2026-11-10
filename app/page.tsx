import {
  ProjectCard,
  ProjectTile,
  PublicationTile,
} from "@/components/project-tile";
import { SectionNav } from "@/components/section-nav";
import { ArrowLink, SectionHeading, TagList } from "@/components/ui";
import {
  alsoNotable,
  experience,
  featuredProjects,
  otherProjects,
  profile,
  publications,
} from "@/lib/content";

// --i sets each element's place in the entrance sequence.
const order = (i: number) => ({ "--i": i }) as React.CSSProperties;

export default function Home() {
  return (
    <div className="mx-auto min-h-screen max-w-6xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
      <div className="lg:flex lg:justify-between lg:gap-12">
        <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[42%] lg:flex-col lg:justify-between lg:py-24">
          <div>
            <h1
              className="rise font-serif text-5xl leading-none text-ink sm:text-6xl"
              style={order(0)}
            >
              {profile.name}
            </h1>
            <p
              className="rise mt-4 font-mono text-sm text-mint lowercase"
              style={order(1)}
            >
              {profile.title}
            </p>
            <p className="rise mt-4 max-w-xs leading-normal" style={order(2)}>
              {profile.pitch}
            </p>
            <div className="rise" style={order(3)}>
              <SectionNav />
            </div>
          </div>
          <div className="rise mt-10" style={order(4)}>
            <div className="max-w-xs rounded-md border border-edge bg-page/70 px-4 py-3">
              <p className="flex items-center gap-2 font-mono text-xs text-mint">
                <span
                  aria-hidden="true"
                  className="pulse-dot inline-block size-1.5 rounded-full bg-mint"
                />
                now
              </p>
              <p className="mt-1 text-sm leading-snug text-ink/85">
                {profile.now}
              </p>
            </div>
            <ul className="mt-4 flex flex-wrap gap-5" aria-label="Links">
              {profile.links.map((l) => (
                <li key={l.label}>
                  <ArrowLink href={l.href} mono>
                    {l.label}
                  </ArrowLink>
                </li>
              ))}
            </ul>
          </div>
        </header>

        <main id="content" className="pt-16 lg:w-[58%] lg:py-24">
          <section
            id="work"
            aria-label="Selected work"
            className="rise scroll-mt-16 lg:scroll-mt-24"
            style={order(2)}
          >
            <SectionHeading n="01">Selected work</SectionHeading>
            <div className="space-y-3">
              {featuredProjects.map((p, i) => (
                <ProjectTile key={p.slug} project={p} preload={i === 0} />
              ))}
              {otherProjects.length > 0 && (
                <div className="grid gap-3 sm:grid-cols-2">
                  {otherProjects.map((p) => (
                    <ProjectCard key={p.slug} project={p} />
                  ))}
                </div>
              )}
              {publications.map((p) => (
                <PublicationTile key={p.href} pub={p} />
              ))}
            </div>
          </section>

          <section
            id="about"
            aria-label="About"
            className="reveal mt-24 scroll-mt-16 lg:scroll-mt-24"
          >
            <SectionHeading n="02">About</SectionHeading>
            <div className="space-y-4 leading-relaxed">
              {profile.about.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </section>

          <section
            id="experience"
            aria-label="Experience"
            className="reveal mt-24 scroll-mt-16 lg:scroll-mt-24"
          >
            <SectionHeading n="03">Experience</SectionHeading>
            <ol>
              {experience.map((r) => (
                <li
                  key={r.years + r.company}
                  className="grid gap-1 border-t border-line py-6 sm:grid-cols-[8rem_1fr] sm:gap-6"
                >
                  <p className="pt-1 font-mono text-xs">{r.years}</p>
                  <div>
                    <h3 className="text-ink">
                      {r.role} <span className="text-muted">·</span>{" "}
                      <span className="font-serif text-xl">{r.company}</span>
                    </h3>
                    <p className="mt-2 text-sm leading-normal">{r.summary}</p>
                    <div className="mt-3">
                      <TagList tags={r.tags} />
                    </div>
                  </div>
                </li>
              ))}
            </ol>
            <ul className="space-y-2 border-t border-line pt-6 text-sm">
              {alsoNotable.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden="true" className="font-mono text-mint">
                    +
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6 text-sm">
              <ArrowLink href="/resume.pdf">Full résumé (PDF)</ArrowLink>
            </div>
          </section>

          <section
            id="contact"
            aria-label="Contact"
            className="reveal mt-24 scroll-mt-16 lg:scroll-mt-24"
          >
            <SectionHeading n="04">Contact</SectionHeading>
            <p className="font-serif text-3xl text-ink">
              Let&rsquo;s talk about what you&rsquo;re building.
            </p>
            <p className="mt-3">
              <a
                href={
                  profile.email ? `mailto:${profile.email}` : profile.linkedin
                }
                className="text-mint underline decoration-mint/40 underline-offset-4 hover:decoration-mint"
              >
                {profile.email || "Message me on LinkedIn"}
              </a>
            </p>
            <p className="mt-24 font-mono text-xs">
              built with next.js and tailwind css
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
