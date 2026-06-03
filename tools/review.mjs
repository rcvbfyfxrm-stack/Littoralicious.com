#!/usr/bin/env node
// tools/review.mjs — the draft review loop.
//   node tools/review.mjs <slug>          build + deploy the draft to the preview channel, print its URL
//   node tools/review.mjs <slug> --notes  read your review notes (comments left on the preview article)
//   node tools/review.mjs <slug> --clear  delete the review notes once you've applied them (needs firebase auth)
// You leave notes by typing them into the comment box at the bottom of the preview article.
import { execSync } from "node:child_process";
import { p, read, exists } from "./lib.mjs";

const CHANNEL = "review";
const slug = process.argv[2];
const mode = process.argv.includes("--notes") ? "notes"
          : process.argv.includes("--clear") ? "clear" : "deploy";
if (!slug || slug.startsWith("--")) die("usage: node tools/review.mjs <slug> [--notes | --clear]");

// project + web api key from the committed firebase config
const cfg = read(p("assets/js/firebase-config.js"));
const grab = (k) => (cfg.match(new RegExp(`${k}:\\s*['"]([^'"]+)['"]`)) || [])[1];
const PROJECT = grab("projectId") || "littoralicious-web-eceed";
const APIKEY = grab("apiKey");
const base = `https://firestore.googleapis.com/v1/projects/${PROJECT}/databases/(default)/documents`;

const sv = (f) => f && (f.stringValue ?? f.integerValue ?? f.booleanValue ?? f.timestampValue ?? "");

if (mode === "notes") {
  const url = `${base}/articles/${slug}/comments?key=${APIKEY}&pageSize=300`;
  const data = await (await fetch(url)).json();
  const docs = (data.documents || []).map((d) => {
    const f = d.fields || {};
    return { name: sv(f.name) || "anon", text: sv(f.text) || sv(f.comment) || sv(f.body) || "", ts: sv(f.timestamp) || sv(f.createdAt) || "" };
  }).filter((c) => c.text).sort((a, b) => String(a.ts).localeCompare(String(b.ts)));
  if (!docs.length) { console.log(`No review notes yet on "${slug}". Leave them in the comment box on the preview article.`); process.exit(0); }
  console.log(`\n📝 ${docs.length} review note(s) on "${slug}":\n`);
  docs.forEach((c, i) => console.log(`  ${i + 1}. [${c.name}${c.ts ? " · " + String(c.ts).slice(0, 16).replace("T", " ") : ""}]\n     ${c.text}\n`));
  process.exit(0);
}

if (mode === "clear") {
  run(`firebase firestore:delete "articles/${slug}/comments" --recursive --force --project ${PROJECT}`);
  console.log(`✓ cleared review notes on "${slug}".`);
  process.exit(0);
}

// deploy mode
if (!exists(p("articles", `${slug}.html`))) die(`articles/${slug}.html does not exist`);
console.log("Building…");
run(`node ${p("tools/build.mjs")} --quiet || node ${p("tools/build.mjs")}`);
console.log(`Deploying "${slug}" to the "${CHANNEL}" preview channel…`);
const out = run(`firebase hosting:channel:deploy ${CHANNEL} --expires 7d --project ${PROJECT}`, true);
const m = out.match(/Channel URL[^:]*:\s*(https:\/\/\S+)/);
const channelUrl = m ? m[1] : null;
if (!channelUrl) { console.error(out); die("could not parse channel URL"); }
const articleUrl = `${channelUrl.replace(/\s.*$/, "")}/articles/${slug}.html`;
console.log(`\n✓ Live for review:\n   ${articleUrl}\n`);
console.log(`Leave notes in the comment box at the bottom of that page.`);
console.log(`When you're done, I run:  node tools/review.mjs ${slug} --notes   to read them.`);

function run(cmd, capture) {
  try { const o = execSync(cmd, { encoding: "utf8", stdio: capture ? ["ignore", "pipe", "pipe"] : "inherit" }); return o || ""; }
  catch (e) { if (capture) return (e.stdout || "") + (e.stderr || ""); throw e; }
}
function die(m) { console.error("✗ " + m); process.exit(1); }
