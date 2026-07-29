import { useEffect, useId, useRef } from "react";

/**
 * Dev-only remount audit for motion wrappers.
 *
 * Each call site gets a stable per-instance id (React `useId`, which is derived
 * from tree position and therefore survives a remount at the same spot). If the
 * same instance mounts more than once — especially while scrolling — something
 * above it is changing component identity between renders, which is the classic
 * cause of "blinking" sections.
 *
 * Every call site is guarded by `import.meta.env.DEV`, so this is stripped in prod.
 */
const mounts = new Map<string, number>();
const renders = new Map<string, number>();

export function useRemountAudit(name: string, meta?: Record<string, unknown>) {
  const instanceId = useId();
  const key = `${name}${instanceId}`;
  const reported = useRef(false);

  renders.set(key, (renders.get(key) ?? 0) + 1);

  useEffect(() => {
    if (!import.meta.env.DEV) return;
    const count = (mounts.get(key) ?? 0) + 1;
    mounts.set(key, count);

    if (count > 1 && !reported.current) {
      reported.current = true;
      console.warn(
        `[motion-audit] ${name} remounted (mount #${count}${
          typeof window !== "undefined" && window.scrollY > 0 ? ", during scroll" : ""
        }) — its component identity is unstable.`,
        meta ?? {},
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
}

/** Console helpers: `__motionAudit()` and `__motionRenders()`. */
if (import.meta.env.DEV && typeof window !== "undefined") {
  const w = window as unknown as Record<string, unknown>;
  w.__motionAudit = () => {
    const remounted = [...mounts.entries()].filter(([, n]) => n > 1);
    return {
      instances: mounts.size,
      remounted: Object.fromEntries(remounted),
      healthy: remounted.length === 0,
    };
  };
  w.__motionRenders = () =>
    Object.fromEntries([...renders.entries()].sort((a, b) => b[1] - a[1]).slice(0, 15));
}
