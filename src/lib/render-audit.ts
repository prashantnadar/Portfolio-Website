import { useEffect, useRef } from "react";

/**
 * Dev-only remount / re-render audit.
 *
 * Motion wrappers should mount ONCE. If a component using this hook mounts more
 * than once in a session (especially while scrolling), something above it is
 * changing identity between renders — the classic cause of "blinking" sections.
 *
 * Compiled away in production: every call site is guarded by `import.meta.env.DEV`.
 */
const mountCounts = new Map<string, number>();

export function useRemountAudit(name: string, meta?: Record<string, unknown>) {
  const renders = useRef(0);
  renders.current += 1;

  useEffect(() => {
    if (!import.meta.env.DEV) return;
    const next = (mountCounts.get(name) ?? 0) + 1;
    mountCounts.set(name, next);
    const scrolling = typeof window !== "undefined" && window.scrollY > 0;

    if (next > 1) {
      console.warn(
        `[motion-audit] "${name}" remounted (mount #${next}${scrolling ? ", during scroll" : ""}).`,
        meta ?? {},
      );
    }

    return () => {
      if (!import.meta.env.DEV) return;
      // Unmount during an active scroll is the signal we care about.
      if (typeof window !== "undefined" && window.scrollY > 0) {
        console.debug(`[motion-audit] "${name}" unmounted while scrolled.`);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  useEffect(() => {
    if (!import.meta.env.DEV) return;
    if (renders.current > 60) {
      console.warn(`[motion-audit] "${name}" rendered ${renders.current} times — check memoization.`);
      renders.current = 0;
    }
  });
}

/** Dev helper: read the mount table from the console. */
if (import.meta.env.DEV && typeof window !== "undefined") {
  (window as unknown as Record<string, unknown>).__motionAudit = () =>
    Object.fromEntries(mountCounts);
}
