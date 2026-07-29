import { FAQS, PRICING, SITE, TESTIMONIALS } from "@/lib/site-data";

/** Stable @id anchors so every node can cross-reference the others. */
export const PERSON_ID = "/#prashant-nadar";
export const ORG_ID = "/#pn-creation";

const ratings = TESTIMONIALS.map((t) => t.rating);
const aggregateRating = {
  "@type": "AggregateRating",
  ratingValue: (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1),
  reviewCount: ratings.length,
  bestRating: 5,
  worstRating: 1,
};

const PROJECTS = [
  {
    "@type": "SoftwareApplication",
    "@id": "/#universal-tools",
    name: "Universal Tools",
    url: "https://universaltools.in",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    description:
      "A modular multi-utility web platform bundling 110+ text, PDF, image, code, color, password and productivity tools, with PostgreSQL-backed accounts and privacy-first in-browser processing.",
    author: { "@id": PERSON_ID },
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  },
  {
    "@type": "WebSite",
    "@id": "https://asklegalvision.in/#website",
    name: "Ask Legal Vision",
    url: "https://asklegalvision.in/",
    description:
      "Production legal-services website for Adv. Aditya Shankar Kharche, Bombay High Court — employment law, civil litigation and compliance — built with React, Tailwind CSS, PHP and MySQL.",
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

/** Offers derived from the pricing table, each provided by PN Creation. */
const offers = PRICING.map((plan) => ({
  "@type": "Offer",
  name: `${plan.tier} website package`,
  description: plan.tagline,
  priceCurrency: "INR",
  priceSpecification: { "@type": "PriceSpecification", price: plan.price, priceCurrency: "INR" },
  itemOffered: {
    "@type": "Service",
    name: `${plan.tier} website package`,
    serviceType: "Website development",
    provider: { "@id": ORG_ID },
    aggregateRating,
  },
}));

/** Client Love testimonials, attached to the PN Creation organization. */
const reviews = TESTIMONIALS.map((t) => ({
  "@type": "Review",
  reviewBody: t.quote,
  author: { "@type": "Person", name: t.name },
  itemReviewed: { "@id": ORG_ID },
  reviewRating: { "@type": "Rating", ratingValue: t.rating, bestRating: 5, worstRating: 1 },
}));

const faqPage = {
  "@type": "FAQPage",
  "@id": "/#faq",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export function buildHomeSchema(title: string, description: string) {
  return {
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
        image: "/pn-monogram.svg",
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
        makesOffer: offers,
        aggregateRating,
        review: reviews,
      },
      {
        "@type": "WebSite",
        "@id": "/#website",
        name: title,
        description,
        inLanguage: "en",
        publisher: { "@id": PERSON_ID },
      },
      {
        "@type": "ProfilePage",
        "@id": "/#profilepage",
        name: title,
        description,
        about: { "@id": PERSON_ID },
        isPartOf: { "@id": "/#website" },
      },
      {
        "@type": "ItemList",
        "@id": "/#projects",
        name: "Selected projects by Prashant Nadar",
        itemListElement: PROJECTS.map((item, i) => ({ "@type": "ListItem", position: i + 1, item })),
      },
      faqPage,
    ],
  };
}
