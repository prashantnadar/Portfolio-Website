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
    tagline: "For a clean, single-page presence.",
    features: [
      "Single-page responsive website",
      "Up to 5 sections",
      "Contact form + WhatsApp button",
      "Basic SEO meta setup",
      "Deployment support",
    ],
    highlighted: false,
  },
  {
    tier: "Pro",
    price: "₹20,000 – ₹30,000",
    tagline: "For growing businesses that need more.",
    features: [
      "Multi-page business website",
      "Custom UI design & animations",
      "Gallery / services / testimonials",
      "SEO + Google Business Profile setup",
      "1 month of free support",
    ],
    highlighted: false,
  },
  {
    tier: "Pro Max",
    price: "Starting from ₹35,000",
    tagline: "Fully custom, built to scale.",
    features: [
      "Fully custom React application",
      "Advanced animations & interactions",
      "Admin-friendly content structure",
      "Performance & accessibility tuning",
      "3 months of priority support",
    ],
    highlighted: true,
  },
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
