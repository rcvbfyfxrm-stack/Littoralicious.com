#!/usr/bin/env node
// tools/newsletter.mjs — turn an article into a Buttondown newsletter.
//   node tools/newsletter.mjs <slug>            print the email teaser HTML (preview)
//   node tools/newsletter.mjs <slug> --draft    create a DRAFT in Buttondown (safe — does NOT send)
//   node tools/newsletter.mjs <slug> --send      create + send to subscribers (guarded; explicit only)
// Needs BUTTONDOWN_API_KEY in the environment. Sending is the only outward-facing action.
import { p, read, exists, loadArticles, ORIGIN, esc } from "./lib.mjs";

const slug = process.argv[2];
const mode = process.argv.includes("--send") ? "send" : process.argv.includes("--draft") ? "draft" : "preview";
if (!slug || slug.startsWith("--")) die("usage: node tools/newsletter.mjs <slug> [--draft | --send]");

const { articles } = loadArticles();
const a = articles.find((x) => x.slug === slug);
if (!a) die(`no articles.json entry for "${slug}"`);
if (!exists(p("articles", `${slug}.html`))) die(`articles/${slug}.html does not exist`);

// Pull the teaser pieces out of the article.
const html = read(p("articles", `${slug}.html`));
const sbMatch = html.match(/class="summary-box"[\s\S]*?<ul>([\s\S]*?)<\/ul>/i);
const bullets = sbMatch ? [...sbMatch[1].matchAll(/<li>([\s\S]*?)<\/li>/gi)].map((x) => strip(x[1])) : [];
const firstPara = strip((html.match(/<div class="article__content"[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/i) || [])[1] || "");
const url = `${ORIGIN}/articles/${slug}.html`;
const subject = a.title;

const emailHtml =
  `<p style="font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:#64748b;margin:0 0 4px;">${esc(a.category_label)}${a.subtag ? " · " + esc(a.subtag) : ""}</p>` +
  `<h1 style="font-family:Georgia,serif;font-size:28px;line-height:1.2;margin:0 0 12px;">${esc(a.title)}</h1>` +
  (a.lede ? `<p style="font-size:17px;line-height:1.6;color:#333;margin:0 0 18px;">${esc(a.lede)}</p>` : "") +
  (bullets.length
    ? `<p style="font-weight:600;margin:0 0 6px;">In this piece</p><ul style="font-size:15px;line-height:1.6;color:#333;margin:0 0 18px;">` +
      bullets.map((b) => `<li>${esc(b)}</li>`).join("") + `</ul>`
    : firstPara ? `<p style="font-size:15px;line-height:1.6;color:#333;margin:0 0 18px;">${esc(firstPara.slice(0, 280))}…</p>` : "") +
  `<p style="margin:24px 0;"><a href="${url}" style="background:#2d4a5e;color:#fff;text-decoration:none;padding:12px 22px;font-family:system-ui,sans-serif;font-size:14px;font-weight:600;letter-spacing:.05em;">Read the full piece →</a></p>` +
  `<hr style="border:none;border-top:1px solid #e5e5e5;margin:24px 0;">` +
  `<p style="font-size:13px;color:#94a3b8;">LITTORALICIOUS · Modern Science · Regional Recipes · From the Sea</p>`;

if (mode === "preview") {
  console.log(`Subject: ${subject}\n`);
  console.log(emailHtml);
  console.log(`\n(${bullets.length} bullets · links to ${url})`);
  console.log(`\nTo create a Buttondown draft:  node tools/newsletter.mjs ${slug} --draft`);
  process.exit(0);
}

const KEY = process.env.BUTTONDOWN_API_KEY;
if (!KEY) die("BUTTONDOWN_API_KEY is not set in the environment.");
const body = { subject, body: emailHtml, status: mode === "send" ? "about_to_send" : "draft" };
const res = await fetch("https://api.buttondown.email/v1/emails", {
  method: "POST",
  headers: { Authorization: `Token ${KEY}`, "Content-Type": "application/json" },
  body: JSON.stringify(body),
});
const data = await res.json().catch(() => ({}));
if (!res.ok) die(`Buttondown ${res.status}: ${JSON.stringify(data).slice(0, 400)}`);
const id = data.id || "";
console.log(mode === "send" ? `✓ SENT to subscribers.` : `✓ Draft created in Buttondown (not sent).`);
if (id) console.log(`  Review/edit/send: https://buttondown.com/emails/${id}`);
console.log(`  Subject: ${subject}`);

function strip(s) { return String(s || "").replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&mdash;/g, "—").replace(/&[a-z#0-9]+;/g, " ").replace(/\s+/g, " ").trim(); }
function die(m) { console.error("✗ " + m); process.exit(1); }
