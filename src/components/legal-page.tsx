import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Reveal, fadeUp } from "@/components/motion/reveal";

interface LegalPageProps {
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  children: ReactNode;
}

/** Shared shell for the privacy and terms pages. */
export function LegalPage({ eyebrow, title, updated, intro, children }: LegalPageProps) {
  return (
    <div className="min-h-dvh overflow-x-hidden">
      <Navbar hideSectionLinks />
      <main id="main" className="pt-28 pb-20 sm:pt-36">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal variants={fadeUp}>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to portfolio
            </Link>
            <span className="mt-6 inline-flex items-center rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold tracking-[0.16em] text-primary uppercase">
              {eyebrow}
            </span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              {title}
            </h1>
            <p className="mt-2 text-xs font-medium text-muted-foreground">{updated}</p>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground text-pretty">
              {intro}
            </p>
          </Reveal>

          <Reveal
            variants={fadeUp}
            delay={0.1}
            className="mt-10 space-y-5 text-sm leading-relaxed text-muted-foreground [&_a]:font-medium [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mt-10 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground [&_li]:pl-1 [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5"
          >
            {children}
          </Reveal>
        </div>
      </main>
      <Footer />
    </div>
  );
}
