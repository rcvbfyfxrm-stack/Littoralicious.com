// undraft.mjs — remove the "draft" flag from one or more articles, by slug.
// Usage:  node tools/undraft.mjs <slug> [<slug> ...]
// Then:   npm run publish   (build → validate → deploy)
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const FILE = path.join(ROOT, "data", "articles.json");

const slugs = process.argv.slice(2).filter(Boolean);
if (!slugs.length) {
  console.error("usage: node tools/undraft.mjs <slug> [<slug> ...]");
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(FILE, "utf8"));
const list = Array.isArray(data) ? data : data.articles || [];
const bySlug = new Map(list.map((a) => [a.slug, a]));

let changed = 0;
const missing = [];
for (const slug of slugs) {
  const a = bySlug.get(slug);
  if (!a) { missing.push(slug); continue; }
  if (a.draft) { delete a.draft; changed++; console.log(`  ✓ ${slug} — draft flag removed (now live)`); }
  else { console.log(`  · ${slug} — already live, no change`); }
}

if (missing.length) {
  console.error(`\n  ✗ not found in articles.json: ${missing.join(", ")}`);
}

if (changed) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2) + "\n");
  console.log(`\n${changed} article(s) promoted. Next: npm run publish`);
} else {
  console.log("\nNo changes written.");
}
process.exit(missing.length ? 1 : 0);
