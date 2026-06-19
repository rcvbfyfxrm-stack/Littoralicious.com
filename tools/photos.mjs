#!/usr/bin/env node
// tools/photos.mjs — regenerate data/photo-library.json from the site's images.
// The Studio photo picker (a draft's Notes → "Add photo") reads that manifest.
// Run after adding/removing images:  node tools/photos.mjs
import fs from "node:fs";

const photos = [];
function add(dir, group) {
  let entries = [];
  try { entries = fs.readdirSync(dir); } catch (e) { return; }
  for (const f of entries) {
    if (/\.(jpe?g|png|webp|avif|gif)$/i.test(f)) {
      photos.push({ path: dir + "/" + f, name: f.replace(/\.[^.]+$/, ""), group });
    }
  }
}

add("assets/photos", "article");                 // the article photo library you fill
try {                                              // terroir guide images = available stock
  for (const g of fs.readdirSync("terroir")) {
    const d = "terroir/" + g + "/img";
    if (fs.existsSync(d)) add(d, "terroir");
  }
} catch (e) { /* no terroir dir */ }

photos.sort((a, b) => (a.group === b.group ? a.path.localeCompare(b.path) : (a.group === "article" ? -1 : 1)));
fs.writeFileSync("data/photo-library.json", JSON.stringify({ photos }, null, 1) + "\n");
console.log("photo-library.json: " + photos.length + " photos (" +
  photos.filter(p => p.group === "article").length + " article, " +
  photos.filter(p => p.group === "terroir").length + " terroir)");
