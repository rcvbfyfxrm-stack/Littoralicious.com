#!/usr/bin/env node
// tools/validate.mjs — fail loudly BEFORE you deploy. Catches the exact drift
// that made the old site advertise articles whose HTML wasn't there.
import { p, read, exists, loadArticles, live, esc } from "./lib.mjs";

const errors = [];
const warns = [];
const E = (m) => errors.push(m);
const W = (m) => warns.push(m);

const { articles } = loadArticles();

// 1) Unique slugs.
const seen = new Map();
for (const a of articles) {
  if (seen.has(a.slug)) E(`duplicate slug in articles.json: "${a.slug}"`);
  seen.set(a.slug, a);
}

// 2) Every article entry must have a source HTML file, and required fields.
for (const a of articles) {
  if (!exists(p("articles", `${a.slug}.html`))) {
    const msg = `articles.json lists "${a.slug}" but articles/${a.slug}.html does not exist`;
    if (a.draft) W(msg + " (draft — write it or remove the entry)"); else E(msg);
  }
  if (!a.title) E(`"${a.slug}": missing title`);
  if (!a.date) W(`"${a.slug}": missing date`);
  if (!a.category) W(`"${a.slug}": missing category`);
  if (!a.lede) W(`"${a.slug}": no lede (add description or <meta name=description>)`);
}

// 3) Every internal articles/*.html link in the generated index pages must resolve.
for (const page of ["index.html", "the-method.html", "shore-larder.html",
  "littoral-heritage.html", "the-evidence.html", "the-bridge.html"]) {
  if (!exists(p(page))) continue;
  // Strip <script>/<style> so JS string-concatenation isn't mistaken for a real link.
  const html = read(p(page)).replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "");
  const links = [...html.matchAll(/href="(?:\.\.\/)?articles\/([^"#?]+\.html)"/g)].map((m) => m[1]);
  for (const l of new Set(links))
    if (!exists(p("articles", l))) E(`${page} links to articles/${l} which does not exist`);
}

// 4) Core assets the templates reference must exist.
for (const asset of ["assets/css/style.css?v=4ec33c16", "assets/js/main.js", "assets/logo/favicon.svg", "assets/logo/logo.svg"])
  if (!exists(p(asset))) E(`referenced asset missing: ${asset}`);

// 5) robots.txt sanity: don't disallow pages that don't exist; sitemap must exist.
if (exists(p("robots.txt"))) {
  const robots = read(p("robots.txt"));
  if (/Sitemap:/i.test(robots) && !exists(p("sitemap.xml"))) E("robots.txt references a Sitemap but sitemap.xml is missing — run build");
}

// ---- report -----------------------------------------------------------------
const pub = live(articles).length;
console.log(`\nvalidate · ${articles.length} entries (${pub} live) · ${errors.length} error(s) · ${warns.length} warning(s)`);
for (const w of warns) console.log("  ⚠  " + w);
if (errors.length) {
  console.error("\n✗ VALIDATION FAILED:");
  for (const e of errors) console.error("  ✗ " + e);
  console.error("\nNothing was deployed. Fix the above and re-run.");
  process.exit(1);
}
console.log("✓ validation passed.");
