#!/usr/bin/env node
// tools/validate.mjs — fail loudly BEFORE you deploy. Catches the exact drift
// that made the old site advertise articles whose HTML wasn't there.
import fs from "node:fs";
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

// 4) Core assets the templates reference must exist. Strip any ?v= cache-bust
//    query before the existence check — it's part of the URL, not the filename.
for (const asset of ["assets/css/style.css", "assets/js/main.js", "assets/logo/favicon.svg", "assets/logo/logo.svg"])
  if (!exists(p(asset.split("?")[0]))) E(`referenced asset missing: ${asset}`);

// 5) TEMPLATE self-check: every full-page template (contains {{HEAD}}) must carry
//    EXACTLY one BODY:BEGIN and one BODY:END marker — doubled markers make the
//    scaffolder and the rewrite splicer target the wrong block.
if (exists(p("templates"))) {
  for (const t of fs.readdirSync(p("templates")).filter((f) => f.endsWith(".html")).sort()) {
    const tmpl = read(p("templates", t));
    if (!tmpl.includes("{{HEAD}}")) continue;
    const begins = (tmpl.match(/<!--\s*BODY:BEGIN/gi) || []).length;
    const ends = (tmpl.match(/<!--\s*BODY:END/gi) || []).length;
    if (begins !== 1 || ends !== 1)
      E(`templates/${t}: must have exactly one BODY:BEGIN and one BODY:END marker (found ${begins} BEGIN / ${ends} END)`);
  }
}

// 6) robots.txt sanity: don't disallow pages that don't exist; sitemap must exist.
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
