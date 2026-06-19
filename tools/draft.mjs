#!/usr/bin/env node
// tools/draft.mjs — the FRONT of the pipeline. Turn a source into a DNA-compliant
// draft that lands in the gate (draft:true, lint-checked), ready for you to read →
// annotate → rewrite → publish. Symmetric with tools/rewrite.mjs.
//
//   node tools/draft.mjs --slug X --title "T" [--template N] [--category C] [--subtag S] [--source FILE]
//        scaffold the article (via new.mjs) + write a drafting brief to .drafts/X.brief.md
//        (the template's structure + the full DNA + the source material) for an agent to write the BODY.
//
//   node tools/draft.mjs X --apply <bodyfile>
//        splice the written body between BODY:BEGIN/END, then run the editorial lint.
//
// The drafting itself (brief → BODY) is done by Claude — the `litt-draft` workflow
// (research → draft-to-DNA → editorial critique → revise) or an in-session agent.
import fs from "node:fs";
import { execFileSync } from "node:child_process";
import { p, read, exists, articleInner, spliceBody, hasBodyMarkers } from "./lib.mjs";

const argv = process.argv.slice(2);
const opt = (n) => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : null; };
const has = (n) => argv.includes(n);
const DRAFTS = p(".drafts");
const die = (m) => { console.error("✗ " + m); process.exit(1); };

// ---- apply mode -------------------------------------------------------------
if (has("--apply")) {
  const slug = argv.find((a) => !a.startsWith("--") && a !== opt("--apply"));
  const bodyFile = opt("--apply");
  if (!slug || !/^[a-z0-9][a-z0-9-]*$/.test(slug)) die("usage: node tools/draft.mjs <slug> --apply <bodyfile>");
  const file = p("articles", `${slug}.html`);
  if (!exists(file)) die(`articles/${slug}.html does not exist — scaffold it first`);
  if (!bodyFile || !exists(bodyFile)) die(`--apply needs a file with the body HTML (got: ${bodyFile || "nothing"})`);
  const html = read(file);
  if (!hasBodyMarkers(html)) die(`articles/${slug}.html has no BODY:BEGIN/END markers — can't splice safely`);
  fs.mkdirSync(DRAFTS, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  fs.writeFileSync(`${DRAFTS}/${slug}.${stamp}.bak.html`, html);
  fs.writeFileSync(file, spliceBody(html, read(bodyFile)));
  console.log(`✓ body spliced into articles/${slug}.html  (backup: .drafts/${slug}.${stamp}.bak.html)`);
  console.log("\nLinting…");
  let out = "", ok = true;
  try { out = execFileSync("node", [p("tools/lint.mjs"), slug], { encoding: "utf8" }); }
  catch (e) { out = (e.stdout || "") + (e.stderr || ""); ok = false; }
  console.log(out.trim());
  console.log(`\n${ok ? "✓" : "⚠"} Draft landed (draft:true). Review it in the Studio; it can't go live until it passes the gate (npm run undraft …).`);
  process.exit(ok ? 0 : 1);
}

// ---- scaffold + brief mode --------------------------------------------------
const slug = (opt("--slug") || "").trim();
const title = (opt("--title") || "").trim();
if (!slug || !title) die('usage: node tools/draft.mjs --slug <slug> --title "<title>" [--template N] [--category C] [--subtag S] [--source FILE]');

// Scaffold via the existing new.mjs (template inference + draft:true entry + BODY markers).
const newArgs = ["--slug", slug, "--title", title];
for (const k of ["template", "category", "subtag", "lede", "read"]) if (opt(`--${k}`)) newArgs.push(`--${k}`, opt(`--${k}`));
let newOut = "";
try { newOut = execFileSync("node", [p("tools/new.mjs"), ...newArgs], { encoding: "utf8" }); }
catch (e) { die(`new.mjs failed:\n${(e.stdout || "") + (e.stderr || "")}`); }
console.log(newOut.trim());

const tmpl = opt("--template") || (newOut.match(/auto-selected template:\s*(\S+)/) || [])[1] || "standard";
const tmplBody = articleInner(read(p("templates", `${tmpl}.html`))) || "(template has no BODY markers — open templates/" + tmpl + ".html)";
const dna = exists(p("content", "DNA.md")) ? read(p("content", "DNA.md")) : "(content/DNA.md missing)";
const srcFile = opt("--source");
const source = srcFile && exists(srcFile) ? read(srcFile) : (srcFile || "(no source supplied — research the topic and cite real, named sources)");

const brief = `# Drafting brief — ${slug}

Write the BODY of this Littoralicious article. Template: **${tmpl}**. Title: "${title}".

## Rules
Obey every rule in the DNA below. The first law is **never lose focus** — open with a .summary-box payoff, one idea per <h2>, re-hook every ~150 words, close on one takeaway. Hold all three pillars (grandmother warmth · scientist precision, sourced · yacht-chef directness). NO emoji. NO banned words. Name every source — no "studies show" without the study. British cooking spelling. Use only the locked CSS components (.summary-box, .note--key/science/action/warning/quote, <mark>, .term, data-label boxes). Output ONLY the inner body HTML (between BODY:BEGIN and BODY:END).

## Source material / topic
${source}

## The "${tmpl}" template structure (fill this shape — placeholders show the intended beats)
\`\`\`html
${tmplBody}
\`\`\`

## The DNA (obey every rule)
${dna}

---
When the body is written to a file, land it:
  node tools/draft.mjs ${slug} --apply <thatfile>
It splices the body in and runs the editorial lint. The piece stays draft:true and
cannot publish until it passes the gate.
`;
fs.mkdirSync(DRAFTS, { recursive: true });
const briefPath = `${DRAFTS}/${slug}.brief.md`;
fs.writeFileSync(briefPath, brief);
console.log(`\n✓ drafting brief → .drafts/${slug}.brief.md  (template: ${tmpl})`);
console.log(`  Write the body, then:  node tools/draft.mjs ${slug} --apply <file>`);
