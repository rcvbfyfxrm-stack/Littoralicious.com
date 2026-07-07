#!/usr/bin/env node
// tools/rewrite.mjs — the rewrite half of the read → annotate → REWRITE → re-review gate.
//
// You annotate a draft in the Studio (studio-review.html) and click "Request
// rewrite". That bundles your notes into the PUBLIC doc articles/<slug>/_rewrite/request
// (public so this CLI can read it with the web API key — the private draft-notes
// store needs a reviewer token this tool doesn't have). Then:
//
//   node tools/rewrite.mjs --list          show every draft queued for rewrite
//   node tools/rewrite.mjs <slug>          build the rewrite BRIEF (body + your notes + DNA)
//                                          → an agent reads it and writes the new body
//   node tools/rewrite.mjs <slug> --apply <bodyfile>
//                                          back up the article, splice the new body between
//                                          BODY:BEGIN/END, re-lint, mark the request "rewritten"
//
// Offline / poller use: --notes-file <json> supplies notes instead of Firestore
// ({ overall, notes:[{order,anchor,text}] }), so the loop is testable with no network.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import { p, read, exists, loadArticles, firebaseWebConfig } from "./lib.mjs";

const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith("--")));
const opt = (name) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : null; };
const slug = args.find((a) => !a.startsWith("--") && a !== opt("--apply") && a !== opt("--notes-file"));

// ---- Firestore REST (shared config scraper in lib.mjs) -----------------------
const { projectId: PROJECT, apiKey: APIKEY } = firebaseWebConfig();
const BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT}/databases/(default)/documents`;
const REQ_PATH = (s) => `articles/${s}/_rewrite/request`;

const sv = (f) => f == null ? "" : (f.stringValue ?? f.integerValue ?? f.doubleValue ?? f.booleanValue ?? f.timestampValue ?? "");
const decodeReq = (fields) => {
  const f = fields || {};
  const notes = ((f.notes && f.notes.arrayValue && f.notes.arrayValue.values) || []).map((v) => {
    const nf = (v.mapValue && v.mapValue.fields) || {};
    return { order: Number(sv(nf.order)) || 0, anchor: sv(nf.anchor) || "", text: sv(nf.text) || "" };
  }).sort((a, b) => a.order - b.order);
  return { status: sv(f.status) || "", requestedBy: sv(f.requestedBy) || "", overall: sv(f.overall) || "", notes };
};

async function getRequest(s) {
  const r = await fetch(`${BASE}/${REQ_PATH(s)}?key=${APIKEY}`);
  if (r.status === 404) return null;
  if (!r.ok) throw new Error(`Firestore GET ${r.status}: ${(await r.text()).slice(0, 200)}`);
  return decodeReq((await r.json()).fields);
}
async function patchStatus(s, status) {
  // Increment a persistent rewrite counter so the drafts board can rank by
  // "amount of rewriting" (most-rewritten first). Read-then-write is fine here:
  // rewrites are serial, one CLI at a time.
  let rewrites = 1;
  try {
    const g = await fetch(`${BASE}/${REQ_PATH(s)}?key=${APIKEY}`);
    if (g.ok) { const f = (await g.json()).fields || {}; rewrites = (Number(f.rewrites && f.rewrites.integerValue) || 0) + 1; }
  } catch { /* first rewrite, or offline — default to 1 */ }
  const url = `${BASE}/${REQ_PATH(s)}?key=${APIKEY}&updateMask.fieldPaths=status&updateMask.fieldPaths=rewrittenAt&updateMask.fieldPaths=rewrites`;
  const r = await fetch(url, {
    method: "PATCH", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fields: { status: { stringValue: status }, rewrittenAt: { integerValue: String(Date.now()) }, rewrites: { integerValue: String(rewrites) } } }),
  });
  if (!r.ok) console.warn(`  (couldn't update request status: ${r.status} — re-review still works)`);
}
// The Studio appends each requested slug to articles/_rewrite-queue (a single
// public doc) — collectionGroup queries are denied by the security rules, so we
// fan out one cheap doc-GET per queued slug instead.
async function listQueued() {
  const r = await fetch(`${BASE}/articles/_rewrite-queue?key=${APIKEY}`);
  if (r.status === 404) return [];
  if (!r.ok) throw new Error(`Firestore GET queue ${r.status}: ${(await r.text()).slice(0, 200)}`);
  const f = (await r.json()).fields || {};
  const slugs = ((f.slugs && f.slugs.arrayValue && f.slugs.arrayValue.values) || []).map((v) => v.stringValue).filter(Boolean);
  const out = [];
  for (const s of slugs) { const req = await getRequest(s).catch(() => null); if (req) out.push({ slug: s, ...req }); }
  return out;
}

// ---- body extraction / splicing --------------------------------------------
const BODY_RE = /(<!--\s*BODY:BEGIN[\s\S]*?-->)([\s\S]*?)(<!--\s*BODY:END[\s\S]*?-->)/i;
function articleBody(html) {
  const m = html.match(BODY_RE);
  if (m) return { body: m[1] + m[2] + m[3], inner: m[2].trim(), hasMarkers: true };
  const c = html.match(/<div class="article__content"[^>]*>([\s\S]*?)<\/div>\s*(?:<\/article>|<footer)/i);
  return { body: c ? c[0] : "", inner: c ? c[1].trim() : "", hasMarkers: false };
}

function die(m) { console.error("✗ " + m); process.exit(1); }
const REWRITE_DIR = p(".rewrite");

// ---- list -------------------------------------------------------------------
if (flags.has("--list")) {
  const q = await listQueued().catch((e) => die(e.message));
  const pending = q.filter((r) => r.status === "queued");
  if (!q.length) { console.log("Nothing in the rewrite queue."); process.exit(0); }
  console.log(`\n${pending.length} awaiting rewrite${q.length > pending.length ? ` · ${q.length - pending.length} already rewritten` : ""}:\n`);
  for (const r of q) {
    const mark = r.status === "queued" ? "→" : "✓";
    console.log(`  ${mark} ${r.slug}  —  ${r.notes.length} note(s)${r.overall ? " + overall" : ""}  [${r.status}]`);
  }
  if (pending.length) console.log(`\nBuild a brief:  node tools/rewrite.mjs <slug>`);
  process.exit(0);
}

if (!slug || !/^[a-z0-9-]+$/i.test(slug)) die("usage: node tools/rewrite.mjs <slug> [--apply <bodyfile>] | --list");
const file = p("articles", `${slug}.html`);
if (!exists(file)) die(`articles/${slug}.html does not exist`);
fs.mkdirSync(REWRITE_DIR, { recursive: true });

// ---- apply ------------------------------------------------------------------
if (flags.has("--apply")) {
  const bodyFile = opt("--apply");
  if (!bodyFile || !exists(bodyFile)) die(`--apply needs a file with the new body HTML (got: ${bodyFile || "nothing"})`);
  const html = read(file);
  if (!BODY_RE.test(html)) die(`articles/${slug}.html has no <!-- BODY:BEGIN -->/<!-- BODY:END --> markers — can't splice safely.\n  Add the markers around the body, or rewrite the file by hand.`);
  const newInner = read(bodyFile).replace(/^\s*<!--\s*BODY:BEGIN[\s\S]*?-->/i, "").replace(/<!--\s*BODY:END[\s\S]*?-->\s*$/i, "").trim();

  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const bak = `${REWRITE_DIR}/${slug}.${stamp}.bak.html`;
  fs.writeFileSync(bak, html);
  const out = html.replace(BODY_RE, (_m, a, _mid, b) => `${a}\n${newInner}\n${b}`);
  fs.writeFileSync(file, out);
  console.log(`✓ spliced new body into articles/${slug}.html  (backup: .rewrite/${slug}.${stamp}.bak.html)`);

  // re-lint the rewritten article
  console.log("\nRe-linting…");
  let lintOut = "", lintOk = true;
  try { lintOut = execFileSync("node", [p("tools/lint.mjs"), slug], { encoding: "utf8" }); }
  catch (e) { lintOut = (e.stdout || "") + (e.stderr || ""); lintOk = false; }
  console.log(lintOut.trim());

  await patchStatus(slug, "rewritten").catch(() => {});
  console.log(`\n${lintOk ? "✓" : "⚠"} Rewrite applied. Re-review in the Studio (reload the review page), then validate + undraft to publish.`);
  if (!lintOk) console.log("  Lint still flags errors above — fix before publishing.");
  process.exit(0);
}

// ---- brief (default) --------------------------------------------------------
let req = null;
const notesFile = opt("--notes-file");
if (notesFile) {
  if (!exists(notesFile)) die(`--notes-file ${notesFile} not found`);
  const j = JSON.parse(read(notesFile));
  req = { status: "local", requestedBy: "local", overall: j.overall || "", notes: (j.notes || []).map((n, i) => ({ order: n.order ?? i, anchor: n.anchor || "", text: n.text || "" })) };
} else {
  req = await getRequest(slug).catch((e) => die(`could not read the rewrite request from Firestore: ${e.message}\n  (use --notes-file <json> to work offline)`));
  if (!req) die(`no rewrite request for "${slug}". Open it in the Studio review page, leave notes, and click "Request rewrite".\n  (or pass --notes-file <json> to drive it manually)`);
}
if (!req.notes.length && !req.overall.trim()) die(`the rewrite request for "${slug}" has no notes — nothing to act on.`);

const html = read(file);
const { inner, hasMarkers } = articleBody(html);
const dna = exists(p("content", "DNA.md")) ? read(p("content", "DNA.md")) : "(content/DNA.md not found)";
let entry = null;
try { entry = loadArticles().articles.find((a) => a.slug === slug) || null; } catch { /* demo: no json entry */ }

const noteLines = req.notes.map((n, i) =>
  `${i + 1}. [¶ "${n.anchor.slice(0, 100)}…"]\n   → ${n.text}`).join("\n\n");

const brief = `# Rewrite brief — ${slug}

You are rewriting one Littoralicious draft. ${entry ? `Title: "${entry.title}". Section: ${entry.category_label || entry.category || "?"}. Subtag: ${entry.subtag || "—"}.` : ""}

## Your job
Rewrite the article BODY below so it (a) addresses EVERY review note, (b) obeys every rule in the DNA, and (c) keeps using the locked CSS components (.summary-box, .note--key/science/action/warning/quote, <mark>, .term, data-label boxes). Do not invent new styling or a new template. ${hasMarkers ? "Output ONLY the new inner body HTML (what goes between BODY:BEGIN and BODY:END) — no <head>, no masthead, no footer." : "NOTE: this file has no BODY:BEGIN/END markers — add them around the body when you write it back, or apply by hand."}

The first law is **never lose focus**: every line earns the next. Open with the payoff (.summary-box), one idea per <h2>, re-hook the eye every ~150 words, close on one takeaway. No emoji. No banned words (delicious, yummy, mouthwatering, elevated, curated, artisanal, superfood, game-changer, hack). Name every source — no "studies show" without the study. British cooking spelling.

## Overall note from the reviewer
${req.overall.trim() || "(none)"}

## Paragraph notes to address (${req.notes.length})
${noteLines || "(none — act on the overall note)"}

## Current body (rewrite this)
\`\`\`html
${inner || "(could not extract the body — open the file directly: articles/" + slug + ".html)"}
\`\`\`

## The DNA (obey every rule)
${dna}

---
When done, write the new body to a file and run:
  node tools/rewrite.mjs ${slug} --apply <thatfile>
It backs up the current article, splices your body in, re-lints, and marks the request rewritten so the Studio shows "re-review me".
`;

const briefPath = `${REWRITE_DIR}/${slug}.brief.md`;
fs.writeFileSync(briefPath, brief);
console.log(brief);
console.error(`\n[brief also written to .rewrite/${slug}.brief.md · ${req.notes.length} note(s)${req.overall ? " + overall" : ""}]`);
