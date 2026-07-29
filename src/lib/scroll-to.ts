const HEADER_OFFSET = 88;

/**
 * Scrolls an in-page section into view under the fixed header.
 * Sections below the fold are lazy loaded, so the target's position can shift
 * after the first scroll — we re-correct twice as content settles.
 */
export function scrollToId(id: string) {
  if (typeof window === "undefined") return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const go = (behavior: ScrollBehavior) => {
    const el = document.getElementById(id);
    if (!el) return false;
    const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top: Math.max(top, 0), behavior });
    return true;
  };

  if (!go(reduce ? "auto" : "smooth")) return;
  window.setTimeout(() => go("auto"), 420);
  window.setTimeout(() => go("auto"), 900);
}

/** Click handler for anchor links pointing at "#section". */
export function handleAnchorClick(
  event: React.MouseEvent<HTMLAnchorElement>,
  href: string,
  after?: () => void,
) {
  if (!href.startsWith("#")) return;
  event.preventDefault();
  const id = href.slice(1);
  after?.();
  scrollToId(id);
  if (typeof window !== "undefined") {
    window.history.replaceState(null, "", href);
  }
}
