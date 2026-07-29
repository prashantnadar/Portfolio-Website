import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Lightbulb, Target } from "lucide-react";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Reveal, StaggerGroup, fadeUp } from "@/components/motion/reveal";
import { ResponsiveImage } from "@/components/responsive-image";
import { PROJECTS, getProject, type Project } from "@/lib/projects-data";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ params, loaderData }) => {
    const project = loaderData?.project;
    if (!project) {
      return {
        meta: [{ title: "Case study not found — Prashant Nadar" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${project.title} Case Study — Prashant Nadar`;
    const description = project.caseStudy.summary;
    const url = `/projects/${params.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Article",
                "@id": `${url}#article`,
                headline: title,
                description,
                about: project.title,
                articleSection: "Case study",
                keywords: project.stack.join(", "),
                author: { "@type": "Person", name: "Prashant Nadar", url: "/" },
                publisher: { "@type": "Organization", name: "PN Creation" },
                mainEntityOfPage: url,
              },
              {
                "@type": "BreadcrumbList",
                "@id": `${url}#breadcrumbs`,
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "/" },
                  { "@type": "ListItem", position: 2, name: "Projects", item: "/#projects" },
                  { "@type": "ListItem", position: 3, name: project.title, item: url },
                ],
              },
            ],
          }),
        },
      ],
    };
  },
  component: CaseStudyPage,
});

function CaseStudyPage() {
  const { project } = Route.useLoaderData() as { project: Project };
  const cs = project.caseStudy;
  const others = PROJECTS.filter((p) => p.slug !== project.slug);

  return (
    <div className="min-h-dvh overflow-x-hidden">
      <Navbar hideSectionLinks />
      <main id="main" className="pt-28 pb-20 sm:pt-36">
        <article className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal variants={fadeUp}>
            <Link
              to="/"
              hash="projects"
              title="Back to all projects"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to projects
            </Link>
            <span className="mt-6 inline-flex items-center rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold tracking-[0.16em] text-primary uppercase">
              Case study
            </span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              {project.title}
            </h1>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground text-pretty">
              {cs.summary}
            </p>

            <dl className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { k: "Role", v: cs.role },
                { k: "Timeline", v: cs.timeline },
                { k: "Status", v: project.note ? "Live in production" : "Delivered" },
              ].map((row) => (
                <div key={row.k} className="rounded-2xl border border-border bg-card p-4 shadow-soft">
                  <dt className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                    {row.k}
                  </dt>
                  <dd className="mt-1 text-sm font-medium">{row.v}</dd>
                </div>
              ))}
            </dl>

            {project.live ? (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer noopener"
                title={`Open the live ${project.title} website in a new tab`}
                aria-label={`Open the live ${project.title} website in a new tab`}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                Visit live website
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            ) : null}
          </Reveal>

          <Reveal variants={fadeUp} delay={0.08} className="mt-10">
            <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
              <ResponsiveImage
                src={project.image}
                avif={project.avif}
                webp={project.webp}
                alt={project.alt}
                width={1200}
                height={800}
                sizes="(min-width: 1024px) 900px, 100vw"
                className="w-full object-cover object-top"
              />
            </div>
          </Reveal>

          <CaseSection
            id="problem"
            icon={<Target className="h-5 w-5" aria-hidden="true" />}
            title="The problem"
            items={cs.problem}
          />
          <CaseSection
            id="approach"
            icon={<Lightbulb className="h-5 w-5" aria-hidden="true" />}
            title="The approach"
            items={cs.approach}
          />

          <section aria-labelledby="results" className="mt-12">
            <h2 id="results" className="flex items-center gap-3 text-2xl font-semibold">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
              </span>
              The results
            </h2>
            <StaggerGroup className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4" gap={0.07}>
              {cs.results.map((r) => (
                <Reveal key={r.label} variants={fadeUp} className="h-full">
                  <div className="h-full rounded-2xl border border-border bg-card p-5 shadow-soft">
                    <p className="font-display text-2xl font-bold text-primary">{r.value}</p>
                    <p className="mt-1 text-sm font-semibold">{r.label}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{r.detail}</p>
                  </div>
                </Reveal>
              ))}
            </StaggerGroup>
            <ul className="mt-6 space-y-3" aria-label="Outcomes">
              {cs.outcome.map((o) => (
                <li key={o} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="stack" className="mt-12">
            <h2 id="stack" className="text-2xl font-semibold">
              Tech stack
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${project.title} technologies used`}>
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-lg border border-border bg-surface px-3 py-1.5 text-sm font-medium text-muted-foreground"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </section>

          <nav aria-label="Other case studies" className="mt-14 border-t border-border pt-8">
            <h2 className="text-lg font-semibold">Other case studies</h2>
            <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {others.map((p) => (
                <li key={p.slug}>
                  <Link
                    to="/projects/$slug"
                    params={{ slug: p.slug }}
                    title={`Read the ${p.title} case study`}
                    className="block h-full rounded-2xl border border-border bg-card p-5 shadow-soft transition-colors hover:border-primary/45 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                  >
                    <span className="block text-sm font-semibold">{p.title}</span>
                    <span className="mt-1 block text-xs text-muted-foreground">{p.subtitle}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </article>
      </main>
      <Footer />
    </div>
  );
}

/** Shared problem/approach block — icon heading plus bulleted list. */
function CaseSection({
  id,
  icon,
  title,
  items,
}: {
  id: string;
  icon: React.ReactNode;
  title: string;
  items: string[];
}) {
  return (
    <section aria-labelledby={id} className="mt-12">
      <h2 id={id} className="flex items-center gap-3 text-2xl font-semibold">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
          {icon}
        </span>
        {title}
      </h2>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-3 rounded-2xl border border-border bg-card p-4 text-sm leading-relaxed text-muted-foreground shadow-soft"
          >
            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
