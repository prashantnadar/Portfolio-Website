import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { PNMark } from "@/components/pn-mark";
import { ThemeToggle } from "@/components/theme-toggle";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { handleAnchorClick } from "@/lib/scroll-to";
import { NAV_LINKS } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const SECTION_IDS = NAV_LINKS.map((l) => l.href.slice(1));

interface NavbarProps {
  /** On standalone pages (privacy/terms) the in-page anchors don't exist. */
  hideSectionLinks?: boolean;
}

export function Navbar({ hideSectionLinks = false }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeId = useScrollSpy(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:h-18 sm:px-6 lg:px-8"
      >
        {hideSectionLinks ? (
          <Link
            to="/"
            aria-label="Prashant Nadar — home"
            className="flex min-w-0 items-center rounded-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <PNMark size={36} />
          </Link>
        ) : (
          <a
            href="#home"
            aria-label="Prashant Nadar — home"
            onClick={(e) => handleAnchorClick(e, "#home")}
            className="flex min-w-0 items-center rounded-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <PNMark size={36} />
          </a>
        )}

        {hideSectionLinks ? null : (
          <ul className="hidden items-center gap-0.5 xl:flex">
            {NAV_LINKS.map((link) => {
              const isActive = activeId === link.href.slice(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative rounded-full px-3 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                      isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-primary/10"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    ) : null}
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        )}

        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />
          {hideSectionLinks ? (
            <Link
              to="/"
              className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow sm:inline-flex"
            >
              Back to site
            </Link>
          ) : (
            <motion.a
              href="#contact"
              onClick={(e) => handleAnchorClick(e, "#contact")}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition-shadow focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none sm:inline-flex"
            >
              Hire Me
            </motion.a>
          )}
          {hideSectionLinks ? null : (
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="grid h-11 w-11 min-h-11 min-w-11 place-items-center rounded-full border border-border bg-card xl:hidden"
            >
              {open ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          )}
        </div>
      </nav>

      <AnimatePresence>
        {open && !hideSectionLinks ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border bg-background/95 backdrop-blur-xl xl:hidden"
          >
            <ul className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.035 * i }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleAnchorClick(e, link.href, () => setOpen(false))}
                    className="block rounded-xl px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleAnchorClick(e, "#contact", () => setOpen(false))}
                  className="mt-2 block rounded-xl bg-primary px-4 py-3 text-center text-base font-semibold text-primary-foreground"
                >
                  Hire Me
                </a>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
