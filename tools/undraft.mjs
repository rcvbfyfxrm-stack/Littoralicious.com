// undraft.mjs — promote drafts to live, GATED. The "validate before public" gate, wired shut.
//
// A draft will not go live until it (1) passes the editorial lint and (2) has no
// rewrite still queued (annotate → rewrite must finish first). The gate is atomic:
// if any requested draft is blocked, NOTHING is promoted, so the Studio's chained
// `undraft <slugs> && npm run publish` never deploys a draft that failed the gate.
//
//   node tools/undraft.mjs <slug> [<slug> ...]   gate + promote (lint errors + queued rewrite block)
//   node tools/undraft.mjs <slug> --strict       also block on lint WARNINGS (zero-warning publish)
//   node tools/undraft.mjs <slug> --force        override the gate (logged loudly)
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { firebaseWebConfig } from "./lib.mjs";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const FILE = path.join(ROOT, "data", "articles.json");
const LINT = path.join(ROOT, "tools", "lint.mjs");

const argv = process.argv.slice(2);
const FORCE = argv.includes("--force");
const STRICT = argv.includes("--strict");
const slugs = argv.filter((a) => !a.startsWith("--"));
if (!slugs.length) { console.error("usage: node tools/undraft.mjs <slug> [<slug> ...] [--strict] [--force]"); process.exit(1); }

const data = JSON.parse(fs.readFileSync(FILE, "utf8"));
const list = Array.isArray(data) ? data : data.articles || [];
const bySlug = new Map(list.map((a) => [a.slug, a]));

// ── gate 1: editorial lint (spawn tools/lint.mjs; it exits non-zero on errors,
//    or on warnings too under --strict) ──────────────────────────────────────
function lintPasses(slug) {
  try { execFileSync("node", [LINT, slug, ...(STRICT ? ["--strict"] : [])], { encoding: "utf8" }); return { ok: true }; }
  catch (e) { return { ok: false, out: ((e.stdout || "") + (e.stderr || "")).trim() }; }
}

// ── gate 2: is a rewrite still queued? (reads the PUBLIC request doc the Studio
//    writes — no auth needed; fails OPEN on a network error so you're never
//    locked out offline) ──────────────────────────────────────────────────────
const { projectId: PROJECT, apiKey: APIKEY } = firebaseWebConfig();
async function rewriteStatus(slug) {
  try {
    const url = `https://firestore.googleapis.com/v1/projects/${PROJECT}/databases/(default)/documents/articles/${slug}/_rewrite/request?key=${APIKEY}`;
    const r = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (r.status === 404) return { status: "none" };
    if (!r.ok) return { status: "unknown", err: `HTTP ${r.status}` };
    const f = (await r.json()).fields || {};
    return { status: (f.status && f.status.stringValue) || "none" };
  } catch (e) { return { status: "unknown", err: e.message }; }
}

// ── run the gate on every requested draft before writing anything ────────────
const missing = [], alreadyLive = [], toPromote = [], blocked = [];
for (const slug of slugs) {
  const a = bySlug.get(slug);
  if (!a) { missing.push(slug); continue; }
  if (!a.draft) { alreadyLive.push(slug); continue; }

  const reasons = [];
  const lint = lintPasses(slug);
  if (!lint.ok) reasons.push("lint:\n      " + (lint.out.split("\n").filter((l) => /[✗⚠]/.test(l)).join("\n      ") || ("failed — run: npm run lint -- " + slug)));
  const rw = await rewriteStatus(slug);
  if (rw.status === "queued") reasons.push("a rewrite is queued but not applied — run: npm run rewrite -- " + slug);
  else if (rw.status === "unknown") console.warn(`  ⚠ ${slug}: couldn't verify rewrite status (${rw.err}) — gating on lint only`);

  if (reasons.length) blocked.push({ slug, reasons }); else toPromote.push(a);
}

if (missing.length) console.error(`\n  ✗ not found in articles.json: ${missing.join(", ")}`);
for (const s of alreadyLive) console.log(`  · ${s} — already live, no change`);

if (blocked.length && !FORCE) {
  console.error(`\n✗ GATE — ${blocked.length} draft(s) held back, nothing promoted:\n`);
  for (const b of blocked) { console.error(`  ✗ ${b.slug}`); for (const r of b.reasons) console.error("      " + r); }
  console.error(`\nFix the above, or re-run with --force to override (not recommended).`);
  process.exit(1);
}
if (blocked.length && FORCE) {
  console.warn(`\n⚠ --force: overriding the gate on ${blocked.length} draft(s): ${blocked.map((b) => b.slug).join(", ")}`);
  for (const b of blocked) toPromote.push(bySlug.get(b.slug));
}

let changed = 0;
for (const a of toPromote) if (a.draft) { delete a.draft; changed++; console.log(`  ✓ ${a.slug} — draft flag removed (now live)`); }
if (changed) { fs.writeFileSync(FILE, JSON.stringify(data, null, 2) + "\n"); console.log(`\n${changed} article(s) promoted. Next: npm run publish`); }
else console.log("\nNo changes written.");
process.exit(missing.length ? 1 : 0);
