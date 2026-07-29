import legalAvif from "@/assets/project-legal.png?w=640;960;1440&format=avif&as=srcset";
import legalImg from "@/assets/project-legal.png?w=1024&format=jpg";
import legalWebp from "@/assets/project-legal.png?w=640;960;1440&format=webp&as=srcset";
import pcsAvif from "@/assets/project-pcs.png?w=640;960;1440&format=avif&as=srcset";
import pcsImg from "@/assets/project-pcs.png?w=1024&format=jpg";
import pcsWebp from "@/assets/project-pcs.png?w=640;960;1440&format=webp&as=srcset";
import toolsAvif from "@/assets/project-tools.png?w=640;960;1440&format=avif&as=srcset";
import toolsImg from "@/assets/project-tools.png?w=1024&format=jpg";
import toolsWebp from "@/assets/project-tools.png?w=640;960;1440&format=webp&as=srcset";

export interface CaseStudy {
  /** One-line framing shown under the case study hero. */
  summary: string;
  problem: string[];
  approach: string[];
  results: { label: string; value: string; detail: string }[];
  outcome: string[];
  role: string;
  timeline: string;
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  overview: string;
  image: string;
  avif: string;
  webp: string;
  alt: string;
  stack: string[];
  features: string[];
  live?: string;
  github?: string;
  featured?: boolean;
  note?: string;
  caseStudy: CaseStudy;
}

export const PROJECTS: Project[] = [
  {
    slug: "universal-tools",
    title: "Universal Tools",
    subtitle: "universaltools.in — 110+ browser-based utilities in one platform",
    overview:
      "My own live product: a fast, ad-light multi-utility platform bundling 110+ text, PDF, image, code, color, password and productivity tools behind a single modular interface. Accounts, search and usage data are backed by PostgreSQL, while the heavy processing runs client-side so nothing leaves the user's device.",
    image: toolsImg,
    avif: toolsAvif,
    webp: toolsWebp,
    alt: "Universal Tools homepage with the one toolkit hero, tool category navigation and search bar",
    stack: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL",
      "Node.js API",
      "Lazy Loading",
      "Modular Architecture",
      "SEO",
      "Responsive UI",
    ],
    features: [
      "110+ tools across text, PDF, image, code, color, password and productivity categories",
      "Global Ctrl/⌘K command search across every tool with instant filtering",
      "PostgreSQL-backed accounts, auth (log in / sign up) and usage persistence",
      "Privacy-first: file and text processing runs in the browser — no uploads",
      "Lazy-loaded modular routing keeps the initial bundle lean and first paint fast",
      "Built-in dark mode with remembered preference",
      "Fully responsive across mobile, tablet, laptop and large monitors",
      "SEO-optimised tool pages with semantic markup and per-tool metadata",
    ],
    live: "https://universaltools.in",
    featured: true,
    note: "Live in production, actively maintained — new tools ship regularly.",
    caseStudy: {
      summary:
        "Building and shipping a 110+ tool platform that stays fast, private and easy to extend as a solo developer.",
      role: "Product owner, frontend architect and developer",
      timeline: "Ongoing — continuously shipped since launch",
      problem: [
        "Everyday utilities — PDF merging, text cleanup, image conversion, colour and password tools — are scattered across dozens of ad-heavy sites with inconsistent UX.",
        "Most of those sites upload user files to a server, which is a genuine privacy problem for documents and credentials.",
        "A single app holding 110+ tools would normally ship a huge JavaScript bundle and collapse under its own weight.",
      ],
      approach: [
        "Designed a modular tool registry so each tool is a self-contained module with its own metadata, route and lazy-loaded chunk.",
        "Moved processing into the browser using native Web APIs, so files and text never leave the user's device.",
        "Added a global Ctrl/⌘K command palette so users reach any tool in two keystrokes instead of navigating category menus.",
        "Backed accounts, saved preferences and usage data with PostgreSQL behind a Node.js API, keeping the frontend stateless.",
        "Made every tool page SEO-complete: unique title, description, semantic headings and structured markup.",
      ],
      results: [
        { label: "Tools shipped", value: "110+", detail: "across 8 categories" },
        { label: "Uploads required", value: "0", detail: "processing runs client-side" },
        { label: "Initial bundle", value: "Lean", detail: "route-level code splitting" },
        { label: "Devices supported", value: "All", detail: "320px phone to ultrawide" },
      ],
      outcome: [
        "Adding a new tool is now a single module drop-in — no changes to routing, search or navigation.",
        "The lazy-loaded architecture keeps first paint fast even as the catalogue keeps growing.",
        "Per-tool metadata means each utility can rank on its own search intent instead of competing with the homepage.",
      ],
    },
  },
  {
    slug: "power-consilium-system",
    title: "Power Consilium System",
    subtitle: "power-consilium.com — Pan India UPS AMC & power infrastructure",
    overview:
      "A corporate website for Power Consilium System (PCS), a Mumbai-based UPS and power infrastructure company established in 2013. Founded by senior executives with card-level expertise across APC-MGE, Emerson and Numeric, the site presents pan-India AMC services, products and enquiry channels through a bold hero slider and conversion-focused layout.",
    image: pcsImg,
    avif: pcsAvif,
    webp: pcsWebp,
    alt: "Power Consilium System website hero showing Pan India UPS AMC and services",
    stack: ["React", "TypeScript", "PHP", "Tailwind CSS", "Responsive UI", "Dark Mode", "SEO"],
    features: [
      "Admin-controlled dynamic hero banner — images, headings and positions editable after login, no redeploy needed",
      "Multi-screen routing with React Router for services, products and company pages",
      "Code splitting, lazy loading and error boundaries keep the app fast and crash-safe",
      "Scroll-reveal animations that stay smooth on low-end devices",
      "Responsive images with next-gen formats for fast first paint on any connection",
      "Clients & partners showcase built as a reusable, data-driven component",
      "Google Maps directions plus one-tap WhatsApp, call and email redirection",
      "Fully responsive across mobile to large monitors, with built-in dark mode",
    ],
    live: "https://power-consilium.com",
    note: "Live corporate site — serving corporate and IT clients pan India since 2013.",
    caseStudy: {
      summary:
        "Turning a service-heavy UPS business into a credible, self-manageable web presence that converts enquiries.",
      role: "Frontend developer",
      timeline: "Delivered as a full build, maintained since",
      problem: [
        "A B2B power infrastructure company with pan-India operations had no web presence that reflected its scale or technical depth.",
        "Marketing needed to change hero campaigns and banner copy frequently, but had no way to do it without a developer.",
        "Prospects arrive from search and referrals on mobile, and needed to call, message or find the office in one tap.",
      ],
      approach: [
        "Built an admin-authenticated hero banner manager so images, headings and text positions can be updated live — no redeploy.",
        "Structured the site into routed sections (services, products, company) with React Router instead of one long scroll.",
        "Applied code splitting, lazy loading and error boundaries so a single failing widget never blanks the page.",
        "Served responsive images in next-gen formats and tuned scroll-reveal animations to stay smooth on low-end Android devices.",
        "Wired Google Maps directions plus one-tap WhatsApp, call and email redirection into every contact touchpoint.",
      ],
      results: [
        { label: "Banner updates", value: "Self-serve", detail: "admin login, zero dev time" },
        { label: "Contact paths", value: "4", detail: "call, WhatsApp, email, maps" },
        { label: "Crash safety", value: "Guarded", detail: "error boundaries per route" },
        { label: "Theme", value: "Light + dark", detail: "preference remembered" },
      ],
      outcome: [
        "The marketing team runs campaign changes independently, which removed the developer bottleneck entirely.",
        "Mobile visitors reach a human in one tap, which is where most of the AMC enquiries now originate.",
        "Routed pages give each service line its own indexable URL instead of a hidden anchor.",
      ],
    },
  },
  {
    slug: "ask-legal-vision",
    title: "Ask Legal Vision",
    subtitle: "Live website for Adv. Aditya Shankar Kharche — Bombay High Court",
    overview:
      'A production legal-services website for a Bombay High Court advocate with 20+ years in employment law, civil litigation and compliance. Built around a strong "Precision Legal Strategy for a Fast-Moving World" hero, clear consultation CTAs, service breakdown, testimonials and direct contact — backed by a MySQL (phpMyAdmin) driven enquiry flow.',
    image: legalImg,
    avif: legalAvif,
    webp: legalWebp,
    alt: "Ask Legal Vision website homepage with hero section and practice areas",
    stack: [
      "React",
      "JavaScript",
      "Tailwind CSS",
      "PHP",
      "MySQL / phpMyAdmin",
      "Responsive UI",
      "SEO",
    ],
    features: [
      "Hero with Book a Consultation and Call Now conversion CTAs",
      "About section for Adv. Aditya Shankar Kharche — 20+ years, Bar Council of Maharashtra & Goa",
      "Five service areas: property litigation, employment & labour law, corporate & HR legal advisory, legal drafting & compliance, and legal trainings",
      "Client testimonials plus phone and email contact for direct enquiries",
      "MySQL-backed enquiry storage managed through phpMyAdmin",
      "Fully responsive across mobile, tablet and desktop with fast first paint",
    ],
    live: "https://asklegalvision.in/",
    note: "Live in production and actively used by the practice for client enquiries.",
    caseStudy: {
      summary:
        "Giving a 20-year legal practice a digital front door that earns trust in the first five seconds.",
      role: "Frontend developer, with PHP/MySQL enquiry backend",
      timeline: "Full build, delivered and live",
      problem: [
        "An established Bombay High Court advocate relied entirely on referrals and had nothing online for prospects who searched first.",
        "Legal enquiries are high-trust decisions — the site had to communicate credentials and specialisation immediately, not after scrolling.",
        "Enquiries arriving by phone alone were being lost with no record of who called about what.",
      ],
      approach: [
        "Led with a decisive hero — practice positioning, credentials and two CTAs (Book a Consultation, Call Now) above the fold.",
        "Broke the practice into five clearly named service areas so visitors self-identify their matter type instantly.",
        "Placed testimonials and Bar Council credentials near the decision points to reinforce trust where it matters.",
        "Built a PHP + MySQL enquiry pipeline so every submission is stored and reviewable through phpMyAdmin.",
        "Kept the build lean — Tailwind utility styling and optimised assets for fast first paint on mobile networks.",
      ],
      results: [
        { label: "Practice areas", value: "5", detail: "each individually presented" },
        { label: "Enquiry capture", value: "Stored", detail: "MySQL-backed, never lost" },
        { label: "CTAs above fold", value: "2", detail: "consult booking + direct call" },
        { label: "Experience shown", value: "20+ yrs", detail: "credentials front and centre" },
      ],
      outcome: [
        "The practice now has a shareable, professional link for referrals instead of relying on word of mouth alone.",
        "Every enquiry is recorded, so follow-ups no longer depend on remembering a phone call.",
        "Clear service segmentation means enquiries arrive pre-qualified by matter type.",
      ],
    },
  },
];

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);
