#!/usr/bin/env node
// tools/lint.mjs — the editorial gate that validate.mjs can't be.
//
// validate.mjs checks STRUCTURE (slugs, files, links, assets). This checks the
// mechanical DNA voice laws that were previously human-only: no emoji, banned
// words, headline rules, the opening payoff (.summary-box), the scannable spine
// (<mark>), unsourced claims, ~150-word focus runs, and British cooking spelling.
//
// What it deliberately does NOT judge: the soul of a piece — the three pillars,
// the "tired chef at 11 PM" test, "close on one thing". Those stay a human read.
// This narrows that bottleneck to real editorial judgement; it never replaces it.
//
//   node tools/lint.mjs            lint every article that has HTML
//   node tools/lint.mjs <slug>     lint one article
//   node tools/lint.mjs --drafts   lint only drafts   (--live for only live)
//   node tools/lint.mjs --strict   treat warnings as failures (publish gate)
import { p, read, exists, loadArticles, live, drafts, decode } from "./lib.mjs";

const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith("--")));
const slugArg = args.find((a) => !a.startsWith("--"));
const STRICT = flags.has("--strict");

// ---- DNA rule data (content/DNA.md) -----------------------------------------
const BANNED = ["delicious", "yummy", "mouthwatering", "elevated", "curated",
  "artisanal", "superfood", "game-changer", "game changer", "hack"];
// unsourced-claim tells: the DNA "source rule" — no "studies show" without naming the study.
const UNSOURCED = [/\bstudies?\s+(show|suggest|have shown|find|found)\b/i,
  /\bresearch\s+(shows|suggests|finds|has shown)\b/i, /\bscientists?\s+(say|believe)\b/i,
  /\bexperts?\s+(say|agree|believe)\b/i, /\bthey\s+say\b/i, /\bit'?s\s+well[\s-]known\b/i,
  /\bit'?s\s+been\s+proven\b/i];
// US -> UK cooking spelling (conservative: only forms that aren't valid words in another sense).
const SPELLING = { flavor: "flavour", flavors: "flavours", flavored: "flavoured",
  flavoring: "flavouring", color: "colour", colors: "colours", colored: "coloured",
  coloring: "colouring", caramelize: "caramelise", caramelized: "caramelised",
  caramelizing: "caramelising", caramelizes: "caramelises", fiber: "fibre", fibers: "fibres",
  odor: "odour", odors: "odours", favorite: "favourite", neighbor: "neighbour",
  harbor: "harbour", behavior: "behaviour", aluminum: "aluminium", "centerpiece": "centrepiece",
  liter: "litre", liters: "litres", "meager": "meagre" };
// Emoji = banned. Functional glyphs the DNA tolerates are left alone.
const EMOJI = /\p{Extended_Pictographic}/gu;
const EMOJI_OK = new Set(["⚠"]); // DNA tolerates ⚠/✓/★ as functional UI; ✓/★ aren't pictographic anyway.

// ---- body extraction --------------------------------------------------------
// Prefer the BODY:BEGIN/END markers (newer articles); else drop chrome + scripts.
function bodyOf(html) {
  const m = html.match(/<!--\s*BODY:BEGIN[\s\S]*?-->([\s\S]*?)<!--\s*BODY:END[\s\S]*?-->/i);
  // Interactive explainers ride inside the body (importmap + module script + SVG poster) — code is not prose.
  if (m) return m[1].replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<svg[\s\S]*?<\/svg>/gi, " ");
  return html
    .replace(/<head[\s\S]*?<\/head>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<nav[\s\S]*?<\/nav>/gi, "")
    .replace(/<header[\s\S]*?<\/header>/gi, "")
    .replace(/<footer[\s\S]*?<\/footer>/gi, "");
}
const text = (s) => decode(s.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
const around = (hay, idx, n = 32) =>
  ("…" + hay.slice(Math.max(0, idx - n), idx + n).replace(/\s+/g, " ").trim() + "…");

// ---- the lint ---------------------------------------------------------------
function lintArticle(a) {
  const errs = [], warns = [];
  const E = (m) => errs.push(m), W = (m) => warns.push(m);
  const html = read(p("articles", `${a.slug}.html`));
  const body = bodyOf(html);
  // Reference titles are quoted verbatim (US journals spell 'behavior'); judge voice on the prose, not the sources strip.
  const prose = text(body.replace(/<div\s+class="article-sources">[\s\S]*?<\/div>/gi, " "));

  // 1) Headline rules (on the canonical title). Hard rules — these are ERRORS.
  if (/!/.test(a.title)) E(`headline has an exclamation mark: "${a.title}"`);
  if (/\?/.test(a.title)) E(`headline is/contains a question: "${a.title}"`);
  if (/\b\d+\s+(ways|things|tips|reasons|rules|steps|secrets|mistakes)\b/i.test(a.title))
    W(`headline uses listicle framing ("N Ways to…"): "${a.title}"`);

  // 2) No emoji — anywhere in the body, incl. box labels/attributes. ERROR.
  const emoji = [...body.matchAll(EMOJI)].map((m) => m[0]).filter((c) => !EMOJI_OK.has(c));
  if (emoji.length) E(`emoji in body (banned — reads as AI): ${[...new Set(emoji)].slice(0, 8).join(" ")}`);

  // 3) Banned words. WARN with context — several are context-dependent (elevated/hack/artisanal).
  for (const w of BANNED) {
    const re = new RegExp(`(?<![\\w-])${w.replace(/[-\s]/g, "[-\\s]")}(?![\\w-])`, "gi");
    let mm; const hits = [];
    while ((mm = re.exec(prose)) && hits.length < 2) hits.push(around(prose, mm.index));
    if (hits.length) W(`banned word "${w}": ${hits.join("  ·  ")}`);
  }

  // 4) Unsourced claims — DNA source rule. WARN.
  for (const re of UNSOURCED) {
    const mm = re.exec(prose);
    if (mm) W(`unsourced claim "${mm[0]}" — name the study/source: ${around(prose, mm.index)}`);
  }

  // 5) British cooking spelling. WARN.
  const spellHits = new Set();
  for (const [us, uk] of Object.entries(SPELLING)) {
    if (new RegExp(`\\b${us}\\b`, "i").test(prose)) spellHits.add(`${us}→${uk}`);
  }
  if (spellHits.size) W(`US spelling (house style is British): ${[...spellHits].join(", ")}`);

  // 6) The opening payoff. WARN (legacy pieces predate it).
  // The law is PAYOFF UP TOP, not "a box that says What you'll get". Each template has its own way in
  // (founder rule 2026-08-25): the Study Decoded pays off with its Citation Card, the Supply Alert with
  // its Signal Board, the Weekly Brief with the Since-last-week note, the Deep-Dive with the two-minute
  // version. So: accept ANY locked payoff device, as long as it lands inside the first ~150 words.
  const PAYOFF = /<div\s+class="(summary-box|signal-board|citation-card|forecast-scorecard|glance|id-card|note)\b/i;
  const openBody = body.replace(/<!--[\s\S]*?-->/g, " ");
  const payoffAt = openBody.search(PAYOFF);
  if (payoffAt < 0) {
    W(`no opening payoff device — the focus law's payoff-up-top (a promise box, or the template's own: Signal Board, Citation Card, two-minute version, Since-last-week)`);
  } else {
    const wordsBefore = (text(openBody.slice(0, payoffAt)).match(/\S+/g) || []).length;
    if (wordsBefore > 150)
      W(`the payoff arrives ~${wordsBefore} words in — the focus law wants it up top (inside ~150)`);
  }

  // 7) The scannable spine — at least one <mark>/highlight. WARN.
  if (!/<mark\b/i.test(body) && !/class="highlight"/i.test(body))
    W(`no <mark> / highlight — build the skim-path (boxes + marks + h2s = the whole argument)`);

  // 8) Focus runs — ~150 words of unbroken prose before a visual beat. WARN.
  // Locked visual blocks (DESIGN-LOCK) count as beats too — glance/id-card/citation-card/… re-grab the eye exactly like a note.
  const BEAT = /<(h2|h3|h4|blockquote|ul|ol|li|table|thead|tbody|tr|td|th|caption|dl|dt|dd|img|figure|hr|pre)\b|<div\s+class="(note|summary-box|divider|identity|pairing|stat|at-a-glance|science|glance|id-card|citation-card|register-ladder|heritage-timeline|cook-this-port|galley-plan|signal-board|forecast-scorecard|article-toc|article-sources|tw-)/gi;
  // The closing reference strip is a list of citations, not prose — leave it out of the focus-run count.
  const proseBody = body.replace(/<div\s+class="article-sources">[\s\S]*?<\/div>/gi, " ");
  const chunks = proseBody.replace(BEAT, "\u0000$&").split("\u0000"); // NUL as the beat separator (was a raw NUL byte; escaped so the file stays text)
  let longRuns = 0;
  for (const ch of chunks) {
    const words = (text(ch).match(/\S+/g) || []).length;
    if (words > 150 && longRuns < 3) { longRuns++; W(`~${words} words of unbroken prose before a visual beat — one hook per ~150 words`); }
  }

  return { E: errs, W: warns };
}

// ---- run ---------------------------------------------------------------------
const { articles } = loadArticles();
let pool = articles;
if (flags.has("--drafts")) pool = drafts(articles);
else if (flags.has("--live")) pool = live(articles);
if (slugArg) pool = articles.filter((a) => a.slug === slugArg);
pool = pool.filter((a) => a.title && exists(p("articles", `${a.slug}.html`)));

if (!pool.length) {
  console.error(slugArg ? `no article with slug "${slugArg}" (or it has no HTML yet)` : "no articles to lint");
  process.exit(1);
}

let totalE = 0, totalW = 0, clean = 0;
const failed = [];
console.log(`\nlint · ${pool.length} article(s)${STRICT ? " · STRICT (warnings fail)" : ""}\n`);
for (const a of pool.sort((x, y) => x.slug.localeCompare(y.slug))) {
  const { E, W } = lintArticle(a);
  totalE += E.length; totalW += W.length;
  if (!E.length && !W.length) { clean++; continue; }
  const tag = E.length ? "✗" : "⚠";
  console.log(`${tag} ${a.slug}${a.draft ? " (draft)" : ""}  —  ${E.length} error(s), ${W.length} warning(s)`);
  for (const e of E) console.log("    ✗ " + e);
  for (const w of W) console.log("    ⚠ " + w);
  if (E.length || (STRICT && W.length)) failed.push(a.slug);
}

console.log(`\n${pool.length} linted · ${clean} clean · ${totalE} error(s) · ${totalW} warning(s)`);
if (failed.length) {
  console.error(`\n✗ LINT FAILED on ${failed.length}: ${failed.join(", ")}`);
  if (!STRICT) console.error("  (errors block; warnings are advisory — run with --strict to gate on them too)");
  process.exit(1);
}
console.log("✓ lint passed (no errors)." + (totalW ? ` ${totalW} advisory warning(s) above.` : ""));
