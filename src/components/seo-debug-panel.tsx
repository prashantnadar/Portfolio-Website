import { useEffect, useState } from "react";

/**
 * Dev-only SEO debug panel: parses every ld+json block on the page and runs a
 * lightweight schema validity check (context, types, @id refs, required fields).
 * Toggle with Ctrl/Cmd + Shift + S, or ?seo=1.
 */

/** Value objects that legitimately carry no name/@id. */
const VALUE_TYPES = new Set([
  "PostalAddress","PriceSpecification","AggregateRating","Rating","ListItem","Offer","Answer",
]);

interface Issue {
  level: "error" | "warn";
  message: string;
}

function validate(): { nodes: string[]; issues: Issue[]; ids: string[] } {
  const issues: Issue[] = [];
  const nodes: string[] = [];
  const ids: string[] = [];
  const refs: string[] = [];

  const blocks = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
  if (!blocks.length) issues.push({ level: "error", message: "No JSON-LD found on this page" });

  const walk = (value: unknown) => {
    if (Array.isArray(value)) return value.forEach(walk);
    if (!value || typeof value !== "object") return;
    const obj = value as Record<string, unknown>;
    if (typeof obj["@id"] === "string") ids.push(obj["@id"]);
    if (Object.keys(obj).length === 1 && typeof obj["@id"] === "string") refs.push(obj["@id"]);
    if (typeof obj["@type"] === "string") {
      nodes.push(obj["@type"]);
      if (!VALUE_TYPES.has(obj["@type"]) && !obj.name && !obj["@id"] && !obj.text && !obj.reviewBody)
        issues.push({ level: "warn", message: `${obj["@type"]} node has no name/@id` });
    }
    Object.values(obj).forEach(walk);
  };

  blocks.forEach((block, i) => {
    try {
      const parsed = JSON.parse(block.textContent ?? "");
      if (!parsed["@context"]) issues.push({ level: "error", message: `Block ${i}: no @context` });
      walk(parsed);
    } catch {
      issues.push({ level: "error", message: `Block ${i}: invalid JSON` });
    }
  });

  // Every {"@id": x} reference should resolve to a declared node.
  refs
    .filter((r) => !ids.includes(r) && !r.startsWith("http"))
    .forEach((r) => issues.push({ level: "warn", message: `Unresolved @id reference: ${r}` }));

  return { nodes, issues, ids };
}

/** Fetches a text asset and lints it for common indexing mistakes. */
async function loadAsset(path: string): Promise<{ text: string; issues: Issue[] }> {
  const issues: Issue[] = [];
  let text = "";
  try {
    const res = await fetch(path, { cache: "no-store" });
    text = await res.text();
    if (!res.ok) issues.push({ level: "error", message: `${path} returned ${res.status}` });
  } catch {
    return { text: "", issues: [{ level: "error", message: `${path} could not be fetched` }] };
  }

  if (path.endsWith(".xml")) {
    if (!text.trimStart().startsWith("<?xml")) issues.push({ level: "error", message: "Missing XML declaration" });
    if (!text.includes("<urlset") && !text.includes("<sitemapindex"))
      issues.push({ level: "error", message: "No <urlset>/<sitemapindex> root" });
    const locs = [...text.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
    if (!locs.length) issues.push({ level: "error", message: "Sitemap contains no <loc> entries" });
    if (new Set(locs).size !== locs.length) issues.push({ level: "warn", message: "Duplicate <loc> entries" });
    if (locs.some((l) => !l.startsWith("http")))
      issues.push({ level: "warn", message: "Relative <loc> — set BASE_URL once a domain is live" });
  } else {
    if (/^\s*disallow:\s*\/\s*$/im.test(text))
      issues.push({ level: "error", message: "Disallow: / blocks all crawlers" });
    if (!/user-agent:/i.test(text)) issues.push({ level: "error", message: "No User-agent block" });
    if (!/sitemap:/i.test(text))
      issues.push({ level: "warn", message: "No Sitemap: directive (fine until a domain is set)" });
  }
  return { text, issues };
}

type Tab = "schema" | "sitemap" | "robots";

export function SeoDebugPanel() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("schema");
  const [assets, setAssets] = useState<Record<string, { text: string; issues: Issue[] }>>({});
  const [copied, setCopied] = useState("");
  const [report, setReport] = useState<ReturnType<typeof validate> | null>(null);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("seo") === "1") setOpen(true);
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === "s") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) setReport(validate());
  }, [open]);

  if (!open || !report) return null;
  const errors = report.issues.filter((i) => i.level === "error");

  return (
    <aside className="fixed right-4 bottom-4 z-[70] max-h-[60vh] w-80 overflow-auto rounded-2xl border border-border bg-card p-4 text-xs shadow-soft">
      <div className="flex items-center justify-between gap-2">
        <strong className="text-sm">SEO / JSON-LD debug</strong>
        <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
          close
        </button>
      </div>
      <p className={errors.length ? "mt-2 font-semibold text-destructive" : "mt-2 font-semibold text-primary"}>
        {errors.length ? `${errors.length} error(s)` : "Schema valid"} · {report.nodes.length} nodes
      </p>
      <p className="mt-2 text-muted-foreground">{Array.from(new Set(report.nodes)).join(", ")}</p>
      <ul className="mt-3 space-y-1">
        {report.issues.map((issue, i) => (
          <li key={i} className={issue.level === "error" ? "text-destructive" : "text-muted-foreground"}>
            • {issue.message}
          </li>
        ))}
      </ul>
    </aside>
  );
}
