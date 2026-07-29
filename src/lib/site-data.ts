export const SITE = {
  name: "Prashant Nadar",
  role: "Frontend Developer",
  email: "prashantnadar18@gmail.com",
  phone: "+91 7738735890",
  phoneHref: "tel:+917738735890",
  whatsapp: "https://wa.me/917738735890",
  instagram: "https://instagram.com/prashant_dev_22",
  linkedin: "https://www.linkedin.com/in/parshya2210",
  github: "https://github.com/prashantnadar",
  portfolio: "https://prashant-nadar.vercel.app/",
  location: "Mumbai, India",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Why Me", href: "#why-hire-me" },
  { label: "Contact", href: "#contact" },
] as const;



export const SKILL_GROUPS: {
  category: string;
  description: string;
  items: string[];
}[] = [
  {
    category: "Frontend",
    description: "The core craft — interfaces that stay fast and maintainable.",
    items: [
      "HTML5",
      "CSS3",
      "JavaScript (ES6+)",
      "TypeScript",
      "React",
      "Redux",
      "Context API",
      "React Hooks",
      "Tailwind CSS",
      "REST API",
      "Responsive UI Development",
    ],
  },
  {
    category: "Tools",
    description: "Day-to-day workflow, versioning and build tooling.",
    items: ["Git", "GitHub", "Jira", "npm", "Vite", "Webpack"],
  },
  {
    category: "Database",
    description: "Querying and shaping data behind the interface.",
    items: ["PostgreSQL", "MS SQL", "SQL Querying", "Data Manipulation"],
  },
  {
    category: "Other",
    description: "Engineering practices that make products production-ready.",
    items: [
      "API Integration",
      "Component Architecture",
      "Performance Optimization",
      "Accessibility",
      "SEO Friendly Development",
    ],
  },
];

export const EXPERIENCE = [
  {
    company: "Secure Access Tech Private Limited",
    role: "Jr. Frontend Developer",
    period: "July 2024 – Present",
    location: "Mumbai, India",
    points: [
      "Developed a scalable React + TypeScript component architecture with reusable design patterns, improving maintainability across 5+ modules and cutting UI duplication by ~30%.",
      "Implemented state management with Redux and Context API for predictable, optimized data flow.",
      "Integrated REST APIs for dynamic data rendering, removing manual content updates.",
      "Designed responsive layouts that measurably improved mobile usability across devices.",
      "Applied semantic HTML and accessibility practices, improving SEO and overall user experience.",
      "Collaborated in an Agile team, contributing to sprint deliveries and feature releases.",
      "Managed code and workflows with Git and Jira for smooth team collaboration.",
    ],
  },
];

export const EDUCATION = {
  degree: "Bachelor of Management Studies (BMS)",
  school: "University of Mumbai",
  period: "2016 – 2021",
};

export const SERVICES = [
  {
    title: "Website Development",
    description:
      "Custom, hand-built websites in React and Tailwind CSS — fast, responsive and easy to grow.",
  },
  {
    title: "Landing Pages",
    description:
      "High-converting single-page campaigns built for speed, clarity and lead capture.",
  },
  {
    title: "Business Websites",
    description:
      "Complete business presence with services, enquiry flows and Google-ready structure.",
  },
  {
    title: "Portfolio Websites",
    description:
      "Personal and creative portfolios that present your work with polish and personality.",
  },
  {
    title: "Website Redesign",
    description:
      "Modernise an ageing site with a new UI, better performance and mobile-first layouts.",
  },
  {
    title: "Website Maintenance",
    description:
      "Ongoing updates, fixes, content changes and performance checks so nothing goes stale.",
  },
  {
    title: "Google Business Profile Setup",
    description:
      "Get discovered locally with a fully optimised and verified business profile.",
  },
  {
    title: "ATS Resume Creation",
    description:
      "Clean, keyword-aware resumes that pass applicant tracking systems and read well.",
  },
  {
    title: "Resume Updates",
    description:
      "Refresh an existing resume with new roles, achievements and sharper formatting.",
  },
  {
    title: "Invitation Designs",
    description:
      "Elegant digital invitations for weddings, functions and corporate events.",
  },
  {
    title: "Festival Banners",
    description:
      "Seasonal and festival creatives that keep your brand visible all year round.",
  },
  {
    title: "Social Media Designs",
    description:
      "Consistent post and story templates that make your feed look intentional.",
  },
];

export const PRICING = [
  {
    tier: "Basic",
    price: "₹10,000 – ₹15,000",
    period: "one-time project",
    tagline: "A sharp one-page presence that makes you look established from day one.",
    bestFor: "Best for new businesses, freelancers and single-service brands",
    timeline: "Delivered in 5–7 days",
    revisions: "2 rounds of revisions",
    support: "15 days of post-launch support",
    features: [
      "Single-page responsive website, hand-built in React + Tailwind",
      "Up to 5 conversion-focused sections (hero, services, about, gallery, contact)",
      "Enquiry form with email delivery plus a one-tap WhatsApp button",
      "On-page SEO basics: titles, meta descriptions, Open Graph and favicon",
      "Mobile-first layout tested from 320px phones to large desktops",
      "Free deployment, domain connection and SSL setup",
    ],
    highlighted: false,
  },
  {
    tier: "Pro",
    price: "₹20,000 – ₹30,000",
    period: "one-time project",
    tagline: "A complete multi-page website built to win enquiries, not just look good.",
    bestFor: "Best for growing businesses, clinics, studios and service companies",
    timeline: "Delivered in 10–14 days",
    revisions: "4 rounds of revisions",
    support: "1 month of free support & content edits",
    features: [
      "Everything in Basic, expanded across a multi-page site",
      "Up to 6 pages — home, services, about, gallery, testimonials, contact",
      "Custom UI design with Framer Motion scroll and hover animations",
      "Google Business Profile setup plus Google Maps and Analytics integration",
      "Full technical SEO: sitemap, robots.txt, structured data and image optimisation",
      "Blog or gallery structure you can keep adding to",
      "Lighthouse tuning targeting 90+ across the board",
    ],
    highlighted: false,
  },
  {
    tier: "Pro Max",
    price: "From ₹35,000",
    period: "custom scope",
    tagline: "A fully custom product experience engineered to scale with your business.",
    bestFor: "Best for funded startups, marketplaces and dashboard-style products",
    timeline: "Timeline planned per scope",
    revisions: "Unlimited revisions within scope",
    support: "3 months of priority support",
    features: [
      "Everything in Pro, with no page or section limits",
      "Fully custom React + TypeScript application architecture",
      "Advanced interactions: page transitions, parallax, micro-animations",
      "Admin-friendly content structure so your team can update copy safely",
      "Authentication, dashboards, payments or API integrations as required",
      "Accessibility (WCAG-minded) and Core Web Vitals performance tuning",
      "Analytics, event tracking and a conversion review after launch",
      "Priority WhatsApp channel with same-day responses on weekdays",
    ],
    highlighted: true,
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "Prashant rebuilt our practice website from scratch and it finally loads instantly on mobile. Consultation enquiries went up noticeably within the first month.",
    name: "Adv. R. Sharma",
    role: "Advocate, Ask Legal Vision",
    initials: "RS",
    rating: 5,
  },
  {
    quote:
      "He understood the brand in one call. The design felt premium, the handover was clean, and every small change I asked for was done the same day.",
    name: "Nikhil P.",
    role: "Founder, Retail Studio",
    initials: "NP",
    rating: 5,
  },
  {
    quote:
      "My ATS resume was reworked completely — clearer structure, sharper wording. I started getting interview calls in two weeks.",
    name: "Sneha K.",
    role: "Business Analyst",
    initials: "SK",
    rating: 5,
  },
  {
    quote:
      "Our Google Business Profile plus the new landing page put us on the map locally. Communication was honest about timelines throughout.",
    name: "Imran S.",
    role: "Owner, Local Services Firm",
    initials: "IS",
    rating: 5,
  },
  {
    quote:
      "The invitation and festival creatives were delivered ahead of schedule and looked far better than the templates we were using before.",
    name: "Priya M.",
    role: "Event Coordinator",
    initials: "PM",
    rating: 5,
  },
];

export const CLIENT_LOGOS = [
  "Ask Legal Vision",
  "Universal Tools",
  "Secure Access Tech",
  "Retail Studio",
  "Local Services Firm",
  "Event Co.",
];


export const WHY_HIRE_ME = [
  { title: "Clean Code", text: "Readable, typed and reviewed — built for the next developer too." },
  { title: "Modern UI", text: "Current design language with intentional spacing, motion and hierarchy." },
  { title: "Responsive Design", text: "Pixel-consistent from a 320px phone to an ultrawide monitor." },
  { title: "Performance Focused", text: "Lazy loading, code splitting and lean bundles by default." },
  { title: "SEO Friendly", text: "Semantic markup, meta tags and structured data from day one." },
  { title: "Scalable Architecture", text: "Reusable components and hooks that survive feature growth." },
  { title: "Attention to Detail", text: "Focus states, empty states and edge cases — not just the happy path." },
  { title: "Reliable Communication", text: "Clear updates, realistic timelines and no disappearing acts." },
];
