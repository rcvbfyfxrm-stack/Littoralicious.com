#!/usr/bin/env python3
"""Reusable terroir splicer: GOLD2 (Girona) chrome + a guide's content lines.

Usage: splice.py <BUILD_DIR> <OUT_DIR>
  BUILD_DIR holds: lines/<slot>.html, final-data.json, guide-meta.json, [flaner.css]
  guide-meta.json = {slug, city, title, region?, center:[lat,lng], zoom, cityRadiusKm,
                     sister?:{slug,label}}
Emits <OUT_DIR>/index.html.

Restructure (2026-07-25): the "Tables — by tier" section (#tables-extended, GOLD2
line 216) is DELETED — its "what each room is for" intelligence now lives in the
La Grande / La Petite subsection descs. The flâner sections use fsub/fcard markup
(CSS injected here from shared/flaner.css)."""
import re, sys, json, pathlib

SHARED = pathlib.Path(__file__).parent
BUILD = pathlib.Path(sys.argv[1])
OUT = pathlib.Path(sys.argv[2])
# GOLD2 chrome source: env TERROIR_GOLD2 or the repo copy at terroir/_rollout/lib/GOLD2.html
import os
GOLD2 = pathlib.Path(os.environ.get("TERROIR_GOLD2") or (SHARED / "GOLD2.html"))
FLANER_CSS = (SHARED / "flaner.css").read_text()

META = json.load(open(BUILD / "guide-meta.json"))
SLUG, CITY = META["slug"], META["city"]
TITLE = META.get("title", f"{CITY} — Terroir Guide")
CENTER = META.get("center", [37.98, 23.73])
ZOOM = META.get("zoom", 13)
RADKM = META.get("cityRadiusKm", 10)

# GOLD2 line -> slot (replaced by lines/<slot>.html). tables-extended is DELETED, not a slot.
SLOTS = {
    201: "hero", 202: "etymon", 203: "quicknav",
    205: "lead", 206: "funfact", 207: "instructions", 208: "alert",
    209: "soul", 210: "history", 211: "why-now", 212: "eat", 213: "drink",
    214: "tables-shell", 217: "dish", 218: "bougie",
    219: "walks", 220: "coffee-gardens", 221: "work", 222: "culture",
    223: "crafts", 224: "quartiers", 225: "gastronomy", 226: "bars",
    227: "music", 228: "avoid", 229: "appendix",
}
DELETE = {216}                    # #tables-extended — removed entirely
INSERT_BEFORE = {219: ["calas"]}  # #calas (Riviera) inserted before #walks


def main():
    lines = GOLD2.read_text().split("\n")
    missing, out = [], []
    for i, ln in enumerate(lines, 1):
        for slot in INSERT_BEFORE.get(i, []):
            f = BUILD / "lines" / f"{slot}.html"
            if f.exists(): out.append(f.read_text().rstrip("\n"))
            else: missing.append(slot)
        if i in DELETE:
            continue
        if i in SLOTS:
            f = BUILD / "lines" / f"{SLOTS[i]}.html"
            if f.exists(): out.append(f.read_text().rstrip("\n"))
            else: missing.append(SLOTS[i]); out.append(ln)
        else:
            out.append(ln)
    if missing:
        sys.exit(f"FATAL missing slot files: {', '.join(missing)}")
    doc = "\n".join(out)

    # ── head + config ──
    doc = doc.replace("<title>Girona, Catalonia — Terroir Guide</title>",
                      f"<title>{TITLE}</title>")
    doc = re.sub(r'window\.TERROIR_CONFIG = \{[^}]*\};',
                 f"window.TERROIR_CONFIG = {{ articleId:'terroir-{SLUG}', portName:'{CITY}', "
                 f"center:[{CENTER[0]}, {CENTER[1]}], zoom:{ZOOM}, cityRadiusKm:{RADKM} }};", doc)
    doc = doc.replace("/terroir/data/Girona-Catalunya.js", f"/terroir/data/{SLUG}.js")
    md = BUILD / "lines" / "meta-desc.txt"
    if md.exists():
        doc = re.sub(r'(<meta name="description" content=")[^"]*(")',
                     lambda m: m.group(1) + md.read_text().strip().replace('"', "&quot;") + m.group(2), doc)
    doc = doc.replace("Girona-Catalunya", SLUG)
    doc = doc.replace('id="girona-blue-berths"', 'id="terroir-blue-berths"')
    for a, b in [("Girona reference implementation", "Girona-canon implementation"),
                 ("(Girona reference, v2 2026-07-18)", "(Girona canon v2)"),
                 ("/* Girona — scoped:", f"/* {CITY} — scoped:"),
                 ("/* Girona: the top-3 signature tables", f"/* {CITY}: the top-3 signature tables")]:
        doc = doc.replace(a, b)

    # ── flâner card CSS (inject before the readability style) ──
    doc = doc.replace('<style id="cadaques-readability">', FLANER_CSS + '\n<style id="cadaques-readability">', 1)

    # ── ★ + colon per order item ──
    doc = doc.replace(
        "return '<li><b>'+esc(x.name)+'</b> — <em>'+esc(x.note)+'</em></li>';",
        "return '<li><span class=\"ord-star\">★</span> <b>'+esc(x.name)+'</b>: <em>'+esc(x.note)+'</em></li>';")
    doc = doc.replace(
        ".gx-card__order li em{color:var(--ink-2,#555)}",
        ".gx-card__order li em{color:var(--ink-2,#555)}\n.gx-card__order li .ord-star{color:#c4a35a;font-size:0.92em;margin-right:3px}")

    # ── berth cards get the ★ "To order" panel (kit renders dishes only on organiser cards) ──
    berth_js = ('<script>\n/* ' + CITY + ' — scoped: add the star "To order" panel to the berth cards */\n'
        '(function(){\n'
        '  function esc(s){return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");}\n'
        '  function panel(v){ if(!v.dishes||!v.dishes.length)return null;\n'
        '    var d=document.createElement("div"); d.className="gx-card__order";\n'
        '    d.innerHTML=\'<div class="gx-card__order-title">To order — the icons</div><ul>\'+\n'
        '      v.dishes.map(function(x){return \'<li><span class="ord-star">★</span> <b>\'+esc(x.name)+\'</b>: <em>\'+esc(x.note)+\'</em></li>\';}).join("")+"</ul>"; return d; }\n'
        '  function run(){ var D=window.TERROIR_DATA; if(!D||!D.VENUES)return; var byId={}; D.VENUES.forEach(function(v){byId[v.id]=v;});\n'
        '    document.querySelectorAll("#terroir-berths .terroir-berth[data-venue-id]").forEach(function(c){\n'
        '      if(c.__orderWired)return; var v=byId[c.getAttribute("data-venue-id")]; if(!v)return; var p=panel(v); if(!p)return;\n'
        '      var a=c.querySelector(".terroir-card__signature")||c.querySelector(".terroir-card__verdict");\n'
        '      if(a&&a.parentNode){a.parentNode.insertBefore(p,a.nextSibling);} else {c.appendChild(p);} c.__orderWired=true; }); }\n'
        '  function boot(){ setTimeout(run,300); setTimeout(run,1200); setTimeout(run,2500); var t=document.getElementById("terroir-berths"); if(t)new MutationObserver(run).observe(t,{childList:true,subtree:true}); }\n'
        '  if(document.readyState!=="loading")boot(); else document.addEventListener("DOMContentLoaded",boot);\n'
        '})();\n</script>')
    doc = doc.replace("</body>", berth_js + "\n</body>", 1)

    # ── tables sfold count from real venue total ──
    fd = BUILD / "final-data.json"
    if fd.exists():
        nv = len(json.load(open(fd))["venues"])
        doc = re.sub(r'(<details class="sfold" id="tables"[^>]*>.*?<span class="sfold__count">)[^<]*(</span>)',
                     lambda m: m.group(1) + f"{nv} entries" + m.group(2), doc, count=1, flags=re.S)

    stale = [w for w in ("Girona", "girona", "Catalunya", "Onyar", "tables-extended") if w in doc]
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "index.html").write_text(doc)
    print(f"spliced -> {OUT}/index.html  ({len(doc)} bytes, {SLUG})")
    if stale:
        print(f"WARN residual tokens (comments OK, but check #tables-extended is gone): {stale}")


if __name__ == "__main__":
    main()
