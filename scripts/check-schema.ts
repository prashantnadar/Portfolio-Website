/**
 * Build-time JSON-LD validity check.
 * Run: `bun run check:schema` (also wired into `prebuild`).
 * Exits non-zero on schema errors so broken structured data never ships.
 */
import { buildHomeSchema } from "../src/lib/structured-data";

/** Value objects that legitimately carry no name/@id. */
const VALUE_TYPES = new Set([
  "PostalAddress",
  "PriceSpecification",
  "AggregateRating",
  "Rating",
  "ListItem",
  "Offer",
  "Answer",
]);

const errors: string[] = [];
const warnings: string[] = [];
const ids: string[] = [];
const refs: string[] = [];
let nodeCount = 0;

function walk(value: unknown, path: string) {
  if (Array.isArray(value)) return value.forEach((v, i) => walk(v, `${path}[${i}]`));
  if (!value || typeof value !== "object") return;
  const obj = value as Record<string, unknown>;
  const id = typeof obj["@id"] === "string" ? obj["@id"] : undefined;
  if (id) ids.push(id);
  if (id && Object.keys(obj).length === 1) refs.push(id);

  const type = obj["@type"];
  if (type !== undefined) {
    if (typeof type !== "string" && !Array.isArray(type)) {
      errors.push(`${path}: @type must be a string or array`);
    } else if (typeof type === "string") {
      nodeCount++;
      if (!VALUE_TYPES.has(type) && !obj.name && !id && !obj.text && !obj.reviewBody)
        warnings.push(`${path}: ${type} node has no name/@id`);
    }
  }
  Object.entries(obj).forEach(([k, v]) => walk(v, `${path}.${k}`));
}

const schema = buildHomeSchema(
  "Prashant Nadar — Frontend Developer",
  "Portfolio of Prashant Nadar, Frontend Developer.",
);

// The graph must be serializable and self-describing.
let serialized = "";
try {
  serialized = JSON.stringify(schema);
} catch {
  errors.push("root: schema is not JSON-serializable (circular reference?)");
}
if (!schema["@context"]) errors.push("root: missing @context");
if (!Array.isArray(schema["@graph"]) || schema["@graph"].length === 0)
  errors.push("root: @graph missing or empty");
if (serialized.includes("undefined")) warnings.push("root: schema contains literal 'undefined'");

walk(schema, "root");

// Every {"@id": x} reference must resolve to a declared node (external URLs excluded).
refs
  .filter((r) => !ids.includes(r) && !r.startsWith("http"))
  .forEach((r) => errors.push(`Unresolved @id reference: ${r}`));

// Duplicate @id values break entity merging in search engines.
const declared = ids.filter((id) => !refs.includes(id));
new Set(declared.filter((id, i) => declared.indexOf(id) !== i)).forEach((id) =>
  errors.push(`Duplicate @id declared: ${id}`),
);

warnings.forEach((w) => console.warn(`⚠︎  ${w}`));
if (errors.length) {
  errors.forEach((e) => console.error(`✖  ${e}`));
  console.error(`\nJSON-LD check failed: ${errors.length} error(s).`);
  process.exit(1);
}
console.log(`✓ JSON-LD valid — ${nodeCount} nodes, ${warnings.length} warning(s).`);
