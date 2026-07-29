import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Suspense, lazy } from "react";

import { BackToTop } from "@/components/back-to-top";
import { Footer } from "@/components/footer";
import { SectionFallback } from "@/components/loading-screen";
import { Navbar } from "@/components/navbar";
import { ScrollProgress } from "@/components/scroll-progress";
import { Hero } from "@/components/sections/hero";
import { PRICING, SITE, TESTIMONIALS } from "@/lib/site-data";

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

const PERSON_ID = "/#prashant-nadar";
const ORG_ID = "/#pn-creation";

const PROJECT_ENTITIES = [
  {
    "@type": "SoftwareApplication",
    "@id": "/#universal-tools",
    name: "Universal Tools",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    description:
      "A modular multi-utility web platform bundling developer, SEO, productivity and design tools behind one fast, lazy-loaded interface.",
    author: { "@id": PERSON_ID },
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  },
  {
    "@type": "WebSite",
    "@id": "https://asklegalvision.in/#website",
    name: "Ask Legal Vision",
    url: "https://asklegalvision.in/",
    description:
      "Production website for a Bombay High Court Advocate, covering services, consultation and testimonials with mobile-first performance tuning.",
    creator: { "@id": PERSON_ID },
  },
  {
    "@type": "SoftwareApplication",
    "@id": "/#task-manager",
    name: "Task Manager",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "A full CRUD task management application built with React, Context API state and client-side routing.",
    author: { "@id": PERSON_ID },
  },
];

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: SITE.name,
      jobTitle: SITE.role,
      email: `mailto:${SITE.email}`,
      telephone: SITE.phone,
      url: SITE.portfolio,
      image: "/pn-logo.png",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Mumbai",
        addressRegion: "Maharashtra",
        addressCountry: "IN",
      },
      worksFor: { "@type": "Organization", name: "Secure Access Tech Private Limited" },
      alumniOf: { "@type": "CollegeOrUniversity", name: "University of Mumbai" },
      sameAs: [SITE.github, SITE.linkedin, SITE.instagram],
      knowsAbout: [
        "React",
        "TypeScript",
        "JavaScript",
        "Tailwind CSS",
        "Redux",
        "Frontend Development",
        "Web Performance",
        "Web Accessibility",
        "SEO",
      ],
      owns: { "@id": ORG_ID },
    },
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: "PN Creation",
      alternateName: "PN Creation by Prashant Nadar",
      description:
        "Freelance studio offering website development, landing pages, website redesigns, ATS resume creation and brand design for businesses.",
      logo: "/pn-logo.png",
      image: "/pn-logo.png",
      founder: { "@id": PERSON_ID },
      areaServed: "IN",
      email: `mailto:${SITE.email}`,
      telephone: SITE.phone,
      priceRange: "₹₹",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Mumbai",
        addressRegion: "Maharashtra",
        addressCountry: "IN",
      },
      sameAs: [SITE.instagram, SITE.linkedin],
      makesOffer: PRICING.map((plan) => ({
        "@type": "Offer",
        name: `${plan.tier} website package`,
        description: plan.tagline,
        priceCurrency: "INR",
        priceSpecification: {
          "@type": "PriceSpecification",
          price: plan.price,
          priceCurrency: "INR",
        },
        itemOffered: {
          "@type": "Service",
          name: `${plan.tier} website package`,
          serviceType: "Website development",
          provider: { "@id": ORG_ID },
        },
      })),
      review: TESTIMONIALS.map((t) => ({
        "@type": "Review",
        reviewBody: t.quote,
        author: { "@type": "Person", name: t.name },
        reviewRating: { "@type": "Rating", ratingValue: t.rating, bestRating: 5 },
      })),
    },
    {
      "@type": "WebSite",
      "@id": "/#website",
      name: TITLE,
      description: DESCRIPTION,
      inLanguage: "en",
      publisher: { "@id": PERSON_ID },
    },
    {
      "@type": "ProfilePage",
      "@id": "/#profilepage",
      name: TITLE,
      description: DESCRIPTION,
      about: { "@id": PERSON_ID },
      isPartOf: { "@id": "/#website" },
    },
    {
      "@type": "ItemList",
      "@id": "/#projects",
      name: "Selected projects by Prashant Nadar",
      itemListElement: PROJECT_ENTITIES.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item,
      })),
    },
  ],
};

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
      <ScrollProgress />
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
