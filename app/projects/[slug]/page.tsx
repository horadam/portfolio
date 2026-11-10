import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ArrowLink, TagList } from "@/components/ui";
import { profile, projects } from "@/lib/content";

type Params = { params: Promise<{ slug: string }> };

// One static page per project that has a case study; other slugs 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.filter((p) => p.caseStudy).map((p) => ({ slug: p.slug }));
}

function find(slug: string) {
  const project = projects.find((p) => p.slug === slug);
  if (!project?.caseStudy) notFound();
  return { project, study: project.caseStudy };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const { project } = find(slug);
  return {
    title: `${project.name} case study`,
    description: project.tagline,
    alternates: { canonical: `/projects/${slug}` },
  };
}

export default async function CaseStudyPage({ params }: Params) {
  const { project, study } = find((await params).slug);
  // Avoid "..": only add a full stop when the tagline has no end punctuation.
  const tagline = /[.!?]$/.test(project.tagline)
    ? project.tagline
    : `${project.tagline}.`;
  const glance = [
    ...(project.role ? [{ term: "Role", value: project.role }] : []),
    { term: "Year", value: project.year },
    ...(study.evidence.glance ??
      study.evidence.rows.map((r) => ({
        term: r.name,
        value: `${r.passed} / ${r.cases} evals`,
      }))),
  ];
  let n = 0;
  const num = () => String(++n).padStart(2, "0");

  return (
    <main id="content" className="mx-auto max-w-3xl px-6 py-12 md:py-20">
      <Link
        href="/#work"
        className="group inline-flex items-center gap-2 font-mono text-xs text-mint"
      >
        <span
          aria-hidden="true"
          className="transition-transform group-hover:-translate-x-1"
        >
          ←
        </span>
        back
      </Link>

      <header className="mt-10">
        <p className="rise font-mono text-xs text-mint">
          case study · {project.year}
        </p>
        <h1
          className="rise mt-3 min-w-0 font-serif text-5xl leading-none text-balance break-words text-ink sm:text-6xl"
          style={{ "--i": 1 } as React.CSSProperties}
        >
          {project.name}
        </h1>
        <p
          className="rise mt-5 text-lg text-ink"
          style={{ "--i": 2 } as React.CSSProperties}
        >
          {tagline}
        </p>
        <div className="rise" style={{ "--i": 3 } as React.CSSProperties}>
          <dl className="mt-6 flex flex-wrap gap-px overflow-hidden rounded-md border border-line bg-line">
            {glance.map((g) => (
              <div
                key={g.term}
                className="flex flex-1 basis-36 flex-col bg-card px-4 py-3"
              >
                <dt className="font-mono text-xs lowercase">{g.term}</dt>
                <dd className="mt-1 text-sm text-ink">{g.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 leading-relaxed">{project.summary}</p>
          <div className="mt-5">
            <TagList tags={project.tags} />
          </div>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {project.links.map((l) => (
              <ArrowLink key={l.href} href={l.href}>
                {l.label}
              </ArrowLink>
            ))}
          </div>
        </div>
      </header>

      <Image
        src={project.image.src}
        alt={project.image.alt}
        width={project.image.width}
        height={project.image.height}
        className="rise mt-10 rounded-md border border-line"
        style={{ "--i": 4 } as React.CSSProperties}
        priority
      />

      <Section n={num()} title="The problem">
        <p>{study.problem}</p>
      </Section>

      <Section n={num()} title="How it works">
        <ol className="space-y-3">
          {study.steps.map((s, i) => (
            <li key={s.title} className="grid grid-cols-[2rem_1fr] gap-2">
              <span className="pt-0.5 font-mono text-xs text-mint">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>
                <span className="text-ink">{s.title}.</span> {s.body}
              </span>
            </li>
          ))}
        </ol>
        <p className="mt-4">{study.architecture}</p>
      </Section>

      <Section n={num()} title="Hard problems">
        <div className="space-y-3">
          {study.hardProblems.map((h) => (
            <div
              key={h.title}
              className="rounded-md border border-line bg-card p-5"
            >
              <h3 className="font-serif text-2xl text-ink">{h.title}</h3>
              <p className="mt-2 text-sm leading-relaxed">{h.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section n={num()} title="Measured, not assumed">
        <p>{study.evidence.intro}</p>
        <div className="mt-5 overflow-x-auto rounded-md border border-line">
          <table className="w-full text-left text-sm">
            <thead className="bg-card font-mono text-xs text-ink lowercase">
              <tr>
                <th className="px-4 py-3 font-normal">Eval</th>
                <th className="px-4 py-3 font-normal">Passed</th>
                <th className="px-4 py-3 font-normal">Median latency</th>
              </tr>
            </thead>
            <tbody>
              {study.evidence.rows.map((e) => (
                <tr key={e.name} className="border-t border-line">
                  <td className="px-4 py-3 text-ink">{e.name}</td>
                  <td className="px-4 py-3">
                    <span className="font-serif text-xl text-mint">
                      {e.passed}
                    </span>{" "}
                    of {e.cases}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">{e.latency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {project.proofAsOf && (
          <p className="mt-2 font-mono text-xs">
            as of {project.proofAsOf.toLowerCase()}
          </p>
        )}
        <p className="mt-4">{study.evidence.findings}</p>
      </Section>

      <Section n={num()} title="What's next">
        <ul className="space-y-2">
          {study.next.map((item) => (
            <li key={item} className="flex gap-3">
              <span aria-hidden="true" className="font-mono text-mint">
                +
              </span>
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <section className="reveal mt-20 border-t border-line pt-10">
        <p className="font-serif text-3xl text-ink">
          Want to talk through how it&rsquo;s built?
        </p>
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <ArrowLink
            href={profile.email ? `mailto:${profile.email}` : profile.linkedin}
          >
            {profile.email ? "Email me" : "Message me on LinkedIn"}
          </ArrowLink>
          <ArrowLink href="/resume.pdf">Résumé (PDF)</ArrowLink>
          <ArrowLink href="/#work">Back to all work</ArrowLink>
        </div>
      </section>
    </main>
  );
}

function Section({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="reveal mt-16">
      <h2 className="mb-4 font-mono text-xs text-mint lowercase">
        {n} / {title}
      </h2>
      <div className="leading-relaxed">{children}</div>
    </section>
  );
}
