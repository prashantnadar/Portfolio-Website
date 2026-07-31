import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Suspense, lazy } from "react";

import { BackToTop } from "@/components/back-to-top";
import { Footer } from "@/components/footer";
import { SectionFallback } from "@/components/loading-screen";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/sections/hero";
import { buildHomeSchema } from "@/lib/structured-data";

const About = lazy(() => import("@/components/sections/about").then((m) => ({ default: m.About })));
const Projects = lazy(() =>
  import("@/components/sections/projects").then((m) => ({ default: m.Projects })),
);
const Skills = lazy(() =>
  import("@/components/sections/skills").then((m) => ({ default: m.Skills })),
);
const Playground = lazy(() =>
  import("@/components/sections/playground").then((m) => ({ default: m.Playground })),
);
const UniversalToolsPromo = lazy(() =>
  import("@/components/sections/universal-tools").then((m) => ({ default: m.UniversalToolsPromo })),
);
const Experience = lazy(() =>
  import("@/components/sections/experience").then((m) => ({ default: m.Experience })),
);
const Services = lazy(() =>
  import("@/components/sections/services").then((m) => ({ default: m.Services })),
);
const Testimonials = lazy(() =>
  import("@/components/sections/testimonials").then((m) => ({ default: m.Testimonials })),
);
const WhyHireMe = lazy(() =>
  import("@/components/sections/why-hire-me").then((m) => ({ default: m.WhyHireMe })),
);
const Contact = lazy(() =>
  import("@/components/sections/contact").then((m) => ({ default: m.Contact })),
);

const TITLE = "Prashant Nadar — Frontend & React Developer in Mumbai";
const DESCRIPTION =
  "Frontend Developer building fast, responsive React + TypeScript applications. Freelance website development, redesigns and design services through PN Creation.";

const STRUCTURED_DATA = buildHomeSchema(TITLE, DESCRIPTION);

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "Prashant Nadar, Frontend Developer, React Developer, TypeScript, Tailwind CSS, freelance web developer Mumbai, PN Creation",
      },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(STRUCTURED_DATA),
      },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-dvh overflow-x-hidden">
      <Navbar />
      <motion.main
        id="main"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <Hero />
        <Suspense fallback={<SectionFallback />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Playground />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <UniversalToolsPromo />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Experience />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Services />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Testimonials />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <WhyHireMe />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Contact />
        </Suspense>
      </motion.main>
      <Footer />
      <BackToTop />
    </div>
  );
}
