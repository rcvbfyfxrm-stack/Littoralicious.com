// tools/lib.mjs — shared helpers for the Littoralicious build.
// Pure Node (no dependencies). Single source of truth = data/articles.json + article HTML bodies.
import fs from "node:fs";
import path from "node:path";

export const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
export const ORIGIN = "https://www.littoralicious.com";
export const HOMEPAGE_LIMIT = 15;
export const FEED_LIMIT = 28;

export const p = (...x) => path.join(ROOT, ...x);
export const read = (f) => fs.readFileSync(f, "utf8");
export const exists = (f) => fs.existsSync(f);

// ---- data/articles.json -----------------------------------------------------
export function loadArticles() {
  const data = JSON.parse(read(p("data", "articles.json")));
  const cats = data.categories || {};
  const catName = (key) =>
    (cats[key] && cats[key].name) || String(key || "").replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
  const articles = (data.articles || []).filter((a) => a && a.slug);
  for (const a of articles) {
    a.category_label = catName(a.category);
    a.file = `articles/${a.slug}.html`;
    a.url = `${ORIGIN}/articles/${a.slug}.html`;
    a.lede = a.description || extractLede(a.slug) || "";
    a.read_time = a.read_time || declaredReadTime(a.slug) || estimateReadTime(a.slug) || null;
  }
  return { data, cats, catName, articles };
}

export const live = (articles) =>
  articles.filter((a) => !a.draft).sort((x, y) => String(y.date || "").localeCompare(String(x.date || "")));
export const drafts = (articles) => articles.filter((a) => a.draft);

// ---- pull metadata out of an article's own HTML -----------------------------
function articleHtml(slug) {
  const f = p("articles", `${slug}.html`);
  return exists(f) ? read(f) : "";
}
export function extractLede(slug) {
  const m = articleHtml(slug).match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']\s*\/?>/i);
  return m ? decode(m[1].trim()) : "";
}
export function declaredReadTime(slug) {
  const m = articleHtml(slug).match(/article__reading-time["'][^>]*>\s*(\d+)\s*min/i);
  return m ? parseInt(m[1], 10) : null;
}
export function estimateReadTime(slug) {
  const html = articleHtml(slug);
  if (!html) return null;
  const words = html.replace(/<[^>]+>/g, " ").match(/\w+/g);
  return words ? Math.max(1, Math.round(words.length / 220)) : null;
}

// ---- escaping / decoding ----------------------------------------------------
export const esc = (s) =>
  String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
export const escAttr = (s) => esc(s).replace(/'/g, "&#39;");
export function decode(s) {
  return String(s ?? "")
    .replace(/&amp;/g, "&").replace(/&mdash;/g, "—").replace(/&ndash;/g, "–")
    .replace(/&rsquo;|&#39;/g, "’").replace(/&lsquo;/g, "‘")
    .replace(/&ldquo;/g, "“").replace(/&rdquo;/g, "”")
    .replace(/&euro;/g, "€").replace(/&nbsp;/g, " ").replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}

// ---- HTML fragments (match the live markup EXACTLY) -------------------------
export function homepageCard(a) {
  const tags = (a.tags || []).join(" ").replace(/"/g, "");
  return (
    `<article class="article-card" data-category="${escAttr(a.category_label)}" data-tags="${escAttr(tags)}">` +
    `<div class="article-card__meta">` +
    `<span class="article-card__category">${esc(a.category_label)}</span>` +
    `<span>${a.read_time ? a.read_time + " min" : ""}</span>` +
    (a.subtag ? `<span class="article-card__subtag">${esc(a.subtag)}</span>` : "") +
    `</div>` +
    `<h3 class="article-card__title"><a href="articles/${a.slug}.html">${esc(a.title)}</a></h3>` +
    `</article>`
  );
}

export function dispatchCard(a) {
  return (
    `<article class="dispatch">\n` +
    `  <time class="dispatch__date">${esc(a.date || "")}</time>\n` +
    `  <h3 class="dispatch__title"><a href="articles/${a.slug}.html">${esc(a.title)}</a></h3>\n` +
    (a.lede ? `  <div class="dispatch__body"><p>${esc(a.lede)}</p></div>\n` : "") +
    `  <span style="font-size: var(--text-xs); color: var(--color-salt);">${a.read_time || ""} min read</span>\n` +
    `</article>`
  );
}

// Generated <head> for a NEW article (canonical + OG + Twitter + JSON-LD).
export function articleHead(a) {
  const isRecipe = /recipe|blueprint/i.test(a.subtag || "") || (a.tags || []).includes("recipe");
  const ld = {
    "@context": "https://schema.org",
    "@type": isRecipe ? "Recipe" : "Article",
    name: a.title,
    headline: a.title,
    description: a.lede,
    datePublished: a.date,
    author: { "@type": "Organization", name: "Littoralicious" },
    publisher: { "@type": "Organization", name: "Littoralicious", logo: { "@type": "ImageObject", url: `${ORIGIN}/assets/logo/logo.svg` } },
    image: `${ORIGIN}/assets/logo/og-image.png`,
    mainEntityOfPage: a.url,
  };
  return [
    `    <meta charset="UTF-8">`,
    `    <meta name="viewport" content="width=device-width, initial-scale=1.0">`,
    `    <meta name="description" content="${escAttr(a.lede)}">`,
    `    <title>${esc(a.title)} — LITTORALICIOUS</title>`,
    `    <link rel="canonical" href="${a.url}">`,
    `    <meta property="og:title" content="${escAttr(a.title)} — LITTORALICIOUS">`,
    `    <meta property="og:description" content="${escAttr(a.lede)}">`,
    `    <meta property="og:type" content="article">`,
    `    <meta property="og:url" content="${a.url}">`,
    `    <meta property="og:site_name" content="Littoralicious">`,
    `    <meta property="og:image" content="${ORIGIN}/assets/logo/og-image.png">`,
    `    <meta name="twitter:card" content="summary_large_image">`,
    `    <meta name="twitter:title" content="${escAttr(a.title)}">`,
    `    <meta name="twitter:description" content="${escAttr(a.lede)}">`,
    `    <meta name="twitter:image" content="${ORIGIN}/assets/logo/og-image.png">`,
    `    <link rel="alternate" type="application/rss+xml" title="Littoralicious" href="${ORIGIN}/feed.xml">`,
    `    <link rel="stylesheet" href="../assets/css/style.css">`,
    `    <link rel="icon" type="image/svg+xml" href="../assets/logo/favicon.svg">`,
    `    <script type="application/ld+json">\n${JSON.stringify(ld, null, 2)}\n    </script>`,
  ].join("\n");
}

// Replace the content between BEGIN/END markers; returns {html, changed, found}.
export function replaceBetween(html, name, inner) {
  const re = new RegExp(`(<!--\\s*${name}:BEGIN\\s*-->)([\\s\\S]*?)(<!--\\s*${name}:END\\s*-->)`, "i");
  if (!re.test(html)) return { html, changed: false, found: false };
  let changed = false;
  const out = html.replace(re, (_m, a, mid, b) => {
    const next = `${a}\n${inner}\n            ${b}`;
    if (next.trim() !== `${a}${mid}${b}`.trim()) changed = true;
    return next;
  });
  return { html: out, changed, found: true };
}

// ---- article body between the BODY:BEGIN/END markers (newer templates) ------
// Markers carry trailing guidance text in real templates: `<!-- BODY:BEGIN — Technique. … -->`.
export const BODY_RE = /(<!--\s*BODY:BEGIN[\s\S]*?-->)([\s\S]*?)(<!--\s*BODY:END[\s\S]*?-->)/i;
export const hasBodyMarkers = (html) => BODY_RE.test(html);
export function articleInner(html) { const m = html.match(BODY_RE); return m ? m[2].trim() : ""; }
// Replace the inner body, tolerating a new body that includes the markers itself.
export function spliceBody(html, newInner) {
  const inner = String(newInner).replace(/^\s*<!--\s*BODY:BEGIN[\s\S]*?-->/i, "").replace(/<!--\s*BODY:END[\s\S]*?-->\s*$/i, "").trim();
  return html.replace(BODY_RE, (_m, a, _mid, b) => `${a}\n${inner}\n${b}`);
}

export const log = (...m) => console.log(...m);
export const warn = (...m) => console.warn("  WARN ", ...m);
