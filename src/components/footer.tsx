import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa6";

import { BrandLogo } from "@/components/brand-logo";
import { handleAnchorClick } from "@/lib/scroll-to";
import { SITE } from "@/lib/site-data";

const QUICK_LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "Playground", href: "#playground" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Why Me", href: "#why-hire-me" },
  { label: "Contact", href: "#contact" },
];

const SOCIALS = [
  { label: "GitHub", href: SITE.github, Icon: FaGithub },
  { label: "LinkedIn", href: SITE.linkedin, Icon: FaLinkedinIn },
  { label: "Instagram", href: SITE.instagram, Icon: FaInstagram },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="min-w-0 sm:col-span-2 lg:col-span-1">
          <a
            href="#home"
            onClick={(e) => handleAnchorClick(e, "#home")}
            className="flex items-center gap-2.5"
          >
            <BrandLogo size={44} className="shadow-soft" />
            <span className="font-display text-base font-semibold">Prashant Nadar</span>
          </a>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Frontend Developer building fast, accessible React interfaces — and websites for
            businesses that need a real online presence, under the PN Creation brand.
          </p>
        </div>

        <nav aria-label="Quick links" className="min-w-0">
          <h2 className="text-sm font-semibold tracking-wide uppercase">Quick Links</h2>
          <ul className="mt-4 space-y-2.5">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="min-w-0">
          <h2 className="text-sm font-semibold tracking-wide uppercase">Elsewhere</h2>
          <ul className="mt-4 space-y-2.5">
            {SOCIALS.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <h2 className="mt-7 text-sm font-semibold tracking-wide uppercase">Legal</h2>
          <ul className="mt-4 space-y-2.5">
            <li>
              <Link
                to="/privacy"
                className="text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/terms"
                className="text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                Terms &amp; Conditions
              </Link>
            </li>
          </ul>
        </div>

        <div className="min-w-0">
          <h2 className="text-sm font-semibold tracking-wide uppercase">Get in touch</h2>
          <ul className="mt-4 space-y-2.5">
            <li>
              <a
                href={SITE.phoneHref}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {SITE.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex items-center gap-2 text-sm break-all text-muted-foreground transition-colors hover:text-primary"
              >
                <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                {SITE.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-6 text-center text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:text-left lg:px-8"
        >
          <p>© {new Date().getFullYear()} Prashant Nadar. All rights reserved.</p>
          <p className="inline-flex items-center justify-center gap-2 sm:justify-end">
            <BrandLogo size={22} className="rounded-md" />
            Freelance Services powered by{" "}
            <span className="font-semibold text-primary">PN Creation</span>.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
