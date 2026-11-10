import Image from "next/image";
import Link from "next/link";
import { projectLinks, type Project, type Publication } from "@/lib/content";
import { ArrowLink, TagList } from "./ui";

// Headings must wrap even when a name is one long word.
const titleWrap = "min-w-0 text-balance break-words";

// With a case study the whole card links to it (a stretched title link);
// the other links sit above it. Without one the card is static, no hover.
function CardTitle({
  project,
  className,
}: {
  project: Project;
  className: string;
}) {
  return (
    <h3 className={`${titleWrap} ${className}`}>
      {project.caseStudy ? (
        <Link
          href={`/projects/${project.slug}`}
          className="after:absolute after:inset-0 after:rounded-md focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-3 focus-visible:after:outline-mint"
        >
          {project.name}
        </Link>
      ) : (
        project.name
      )}
    </h3>
  );
}

const cardClass = (project: Project) =>
  `relative rounded-md border border-line bg-card p-5 ${
    project.caseStudy ? "transition-colors hover:bg-card-hover" : ""
  }`;

// A featured project: numbers first, then a cropped screenshot and the story.
// Only the first tile's image is near the fold, so only it is preloaded.
export function ProjectTile({
  project,
  preload = false,
}: {
  project: Project;
  preload?: boolean;
}) {
  return (
    <article>
      <div className={cardClass(project)}>
        <div className="flex items-baseline justify-between gap-4">
          <CardTitle
            project={project}
            className="font-serif text-3xl text-ink"
          />
          <span className="shrink-0 font-mono text-xs">{project.year}</span>
        </div>
        <p className="mt-1 text-sm text-mint">{project.tagline}</p>

        {project.proof && project.proof.length > 0 && (
          <div className="mt-4">
            <dl className="grid grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] gap-3">
              {project.proof.map((p) => (
                <div
                  key={p.label}
                  className="flex flex-col rounded-sm border border-line bg-page/40 px-4 py-3"
                >
                  {/* Label is the term; the number shows first visually. */}
                  <dt className="order-2 mt-1.5 text-sm leading-snug">
                    {p.label}
                  </dt>
                  <dd className="order-1 font-serif text-3xl leading-none text-mint">
                    {p.value}
                  </dd>
                </div>
              ))}
            </dl>
            {project.proofAsOf && (
              <p className="mt-2 font-mono text-xs">
                as of {project.proofAsOf.toLowerCase()}
              </p>
            )}
          </div>
        )}

        <Image
          src={project.image.src}
          alt={project.image.alt}
          width={project.image.width}
          height={project.image.height}
          className="mt-4 aspect-[16/7] w-full rounded-sm border border-line object-cover object-top"
          sizes="(min-width: 1024px) 560px, 100vw"
          preload={preload}
        />
        <p className="mt-4 text-sm leading-relaxed">{project.summary}</p>
        <div className="mt-4">
          <TagList tags={project.tags} />
        </div>
        <div className="relative z-10 mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {projectLinks(project).map((l) => (
            <ArrowLink key={l.href} href={l.href}>
              {l.label}
            </ArrowLink>
          ))}
        </div>
      </div>
    </article>
  );
}

// A smaller project: one compact card in a two-column grid.
export function ProjectCard({ project }: { project: Project }) {
  const shown = project.tags.slice(0, 4);
  const hidden = project.tags.length - shown.length;
  return (
    <article className={`flex flex-col ${cardClass(project)}`}>
      <div className="flex items-baseline justify-between gap-4">
        <CardTitle project={project} className="font-serif text-2xl text-ink" />
        <span className="shrink-0 font-mono text-xs">{project.year}</span>
      </div>
      <p className="mt-1 flex-1 text-sm">{project.tagline}</p>
      <div className="mt-4">
        <TagList tags={hidden > 0 ? [...shown, `+${hidden}`] : shown} />
      </div>
      <div className="relative z-10 mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
        {projectLinks(project).map((l) => (
          <ArrowLink key={l.href} href={l.href}>
            {l.label}
          </ArrowLink>
        ))}
      </div>
    </article>
  );
}

// Published writing; the whole card links out.
export function PublicationTile({ pub }: { pub: Publication }) {
  return (
    <a
      href={pub.href}
      target="_blank"
      rel="noreferrer"
      className="group block rounded-md border border-line bg-card p-5 transition-colors hover:bg-card-hover"
    >
      <p className="font-mono text-xs text-mint lowercase">
        published · {pub.venue} · {pub.date}
      </p>
      <h3
        className={`${titleWrap} mt-2 font-serif text-2xl leading-tight text-ink group-hover:text-mint`}
      >
        {pub.title}{" "}
        <span
          aria-hidden="true"
          className="inline-block font-sans text-base transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        >
          ↗
        </span>
        <span className="sr-only"> (opens in a new tab)</span>
      </h3>
      <p className="mt-2 text-sm text-ink">{pub.credit}</p>
      <p className="mt-3 text-sm leading-relaxed">{pub.summary}</p>
      <div className="mt-4">
        <TagList tags={pub.tags} />
      </div>
    </a>
  );
}
