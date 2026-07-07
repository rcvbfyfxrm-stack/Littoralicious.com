#!/usr/bin/env node
// tools/new.mjs — scaffold a new article. The ONLY command you run to start writing.
// Example:
//   node tools/new.mjs --slug pizza-napoletana --title "Pizza Napoletana" \
//        --category the-method --subtag "Recipe Blueprint" --template recipe-blueprint
import fs from "node:fs";
import { ROOT, p, read, exists, loadArticlesRaw, articleHead, esc } from "./lib.mjs";

const args = parseArgs(process.argv.slice(2));
const slug = (args.slug || "").trim();
const title = (args.title || "").trim();
if (!slug || !title) die("usage: node tools/new.mjs --slug <slug> --title \"<title>\" [--category <cat>] [--subtag \"<subtag>\"] [--template <name>] [--read <min>] [--lede \"<one line>\"]");
if (!/^[a-z0-9][a-z0-9-]*$/.test(slug)) die(`bad slug "${slug}" — use lowercase-with-dashes`);

// PRISTINE data only — this file is serialised back to data/articles.json, so it
// must never carry the derived fields loadArticles() attaches to its clones.
const data = loadArticlesRaw();
const cats = data.categories || {};
if ((data.articles || []).some((a) => a.slug === slug)) die(`slug "${slug}" already exists in data/articles.json`);
const articleFile = p("articles", `${slug}.html`);
if (exists(articleFile)) die(`articles/${slug}.html already exists`);

// Per-template defaults (category + header subtag) so you rarely pass --category/--subtag.
const TEMPLATE_DEFAULTS = {
  "shore-larder": { category: "shore-larder", subtag: "Ingredient Deep-Dive" },
  "shore-larder-deep-dive": { category: "shore-larder", subtag: "Ingredient Deep-Dive" },
  "the-method-technique": { category: "the-method", subtag: "Technique" },
  "the-evidence": { category: "the-evidence", subtag: "Food Science" },
  "littoral-heritage-article": { category: "littoral-heritage", subtag: "Heritage" },
  "signal-fire": { category: "signal-fire", subtag: "Sourcing" },
  "the-horizon": { category: "the-bridge", subtag: "Forecast" },
  "trade-winds": { category: "trade-winds", subtag: "Career & Industry" },
  "tight-ship": { category: "the-method", subtag: "Galley Operations" },
  "port-call": { category: "port-call", subtag: "Provisioning" },
  "the-locker": { category: "the-locker", subtag: "Equipment" },
  "weekly-brief": { category: "the-bridge", subtag: "Digest" },
  "the-lab": { category: "the-method", subtag: "Lab Notes" },
  "recipe-blueprint": { category: "the-method", subtag: "Recipe Blueprint" },
};
const tmplName = args.template || inferTemplate(title, args.subtag || "");
if (!args.template) console.log(`  auto-selected template: ${tmplName}  (override with --template <name>)`);
const tmplFile = p("templates", `${tmplName}.html`);
if (!exists(tmplFile)) die(`unknown template "${tmplName}" — see templates/  (run: ls templates)`);
const DEF = TEMPLATE_DEFAULTS[tmplName] || {};
const category = args.category || DEF.category || "the-method";
if (!cats[category]) console.warn(`  note: category "${category}" not in articles.json categories block (allowed, but check spelling)`);

const today = new Date().toISOString().slice(0, 10);
const entry = {
  slug, title,
  date: today,
  category,
  subtag: args.subtag || DEF.subtag || "",
  tags: [],
  read_time: args.read ? parseInt(args.read, 10) : 0,
  featured: false,
  draft: true,
};
const meta = {
  ...entry,
  category_label: (cats[category] && cats[category].name) || category,
  url: `https://www.littoralicious.com/articles/${slug}.html`,
  lede: args.lede || "",
};

// Render the article from the chosen template.
const body = read(tmplFile)
  .replaceAll("{{HEAD}}", articleHead(meta))
  .replaceAll("{{TITLE}}", esc(title))
  .replaceAll("{{CATEGORY_LABEL}}", esc(meta.category_label))
  .replaceAll("{{SUBTAG}}", esc(meta.subtag))
  .replaceAll("{{DATE}}", today)
  .replaceAll("{{READ}}", String(meta.read_time || ""))
  .replaceAll("{{LEDE}}", esc(meta.lede))
  .replaceAll("{{SLUG}}", slug);
fs.writeFileSync(articleFile, body);

// Insert the stub at the top of articles.json (newest first) and rewrite.
data.articles.unshift(entry);
fs.writeFileSync(p("data", "articles.json"), JSON.stringify(data, null, 2) + "\n");

console.log(`\n✓ created articles/${slug}.html  (from template "${tmplName}")`);
console.log(`✓ added draft entry to data/articles.json`);
console.log(`\nNext:`);
console.log(`  1. Write the body in articles/${slug}.html (between the BODY markers).`);
console.log(`  2. Fill date/subtag/tags/read_time + a one-line lede in data/articles.json.`);
console.log(`  3. Preview:  npm run serve     →  http://localhost:8080/articles/${slug}.html`);
console.log(`  4. When ready, remove "draft": true, then:  npm run publish\n`);

function parseArgs(a) {
  const o = {};
  for (let i = 0; i < a.length; i++) if (a[i].startsWith("--")) { const k = a[i].slice(2); o[k] = a[i + 1] && !a[i + 1].startsWith("--") ? a[++i] : true; }
  return o;
}
function die(m) { console.error("✗ " + m); process.exit(1); }

// Infer the best-fit template from the title + subtag when --template is omitted.
function inferTemplate(title, subtag) {
  const s = `${title} ${subtag}`.toLowerCase();
  const has = (...w) => w.some((x) => s.includes(x));
  if (has("recipe", "blueprint", "cake", "bread", "dough", "pizza", "sauce", "braise", "roast", "crumble", "pudding", "soup", "bake")) return "recipe-blueprint";
  if (has("port call", "port-call", "provisioning", "provision", "market", "supplier")) return "port-call";
  if (has("technique", "beurre", "emulsif", "temper", "confit", "cure", "ferment", "method", "how to ")) return "the-method-technique";
  if (has("deep dive", "deep-dive")) return "shore-larder-deep-dive";
  if (has("ingredient", "immortal", "the bulb", "the leaf")) return "shore-larder";
  if (has("study", "evidence", "compound", "flavordb", "the fat index", "the salt index", "umami", "maillard", "science of")) return "the-evidence";
  if (has("heritage", "history", "tradition", "origin of", "the first", "born")) return "littoral-heritage-article";
  if (has("equipment", "review", "pacojet", "thermomix", "vitamix", "the locker", "gear")) return "the-locker";
  if (has("tax", "career", "crew", "industry", "become a", "trade winds", "residency")) return "trade-winds";
  if (has("galley", "efficiency", "mise", "station", "operations", "rotation", "tight ship")) return "tight-ship";
  if (has("sourcing", "supply", "quota", "seasonal", "signal fire", "shortage", "window is closing")) return "signal-fire";
  if (has("forecast", "horizon", "future", "trend", "macro", "outlook", "is coming")) return "the-horizon";
  if (has("weekly brief", "monthly brief", "digest", "roundup", "six things")) return "weekly-brief";
  if (has("the lab", "experiment", "trial", "measured", "tested against")) return "the-lab";
  console.warn("\n  ⚠ No template matched — narrow the scope or split the piece (DNA: never invent a format).");
  console.warn("    Scaffolding on 'standard' as a fallback.\n");
  return "standard";
}
