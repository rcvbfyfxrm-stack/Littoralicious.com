#!/usr/bin/env python3
"""Build ONE East Sicily city guide (siracusa | catania | taormina) — Arnaud, 5 Oct 2026:
three guides, each a hub + its surroundings; ≤3 places per subcategory (4 only when torn); every card
captivating and labelled. Inputs: layouts.py (the editorial picks), enrich/<city>-out.json (the rewritten
cards), hand_<city>.py (the hand-written prose), the research packs. Chrome = the live Prague page."""
import sys, json, re, pathlib, html as H, importlib, shutil, subprocess, urllib.parse
from htmlkit import t, a, maps, site_link, sfold, unesc
from layouts import CITIES
from resolve import resolve, find, P, V, GEMS

CITY = sys.argv[1]
B = pathlib.Path(__file__).parent
C, KEPT, CARDS = resolve(CITY)
D = B / "cities" / CITY; (D / "lines").mkdir(parents=True, exist_ok=True); (D / "out").mkdir(exist_ok=True)
REPO = pathlib.Path("/private/tmp/litto-split")
HAND = importlib.import_module(f"hand_{CITY}")
EP = B / "enrich" / f"{CITY}-out.json"
E = json.load(open(EP)) if EP.exists() else {"cards": {}, "pointers": {}, "venues": {}}
EC, EPT, EV = E.get("cards", {}), E.get("pointers", {}), E.get("venues", {})
SLUG = C["slug"]
NEW_SOURCES = []

def w(name, html): (D / "lines" / f"{name}.html").write_text(html + "\n")

def mq(q):
    q = (q or "").strip()
    if not q: return ""
    return q if re.search(r"Sicilia|Siracusa|Catania|Taormina|Noto|Messina", q) else q + " Sicilia"

def facts_html(facts):
    cap = lambda v: v[0].upper() + v[1:] if v[:1].islower() else v   # 5 Oct: a value always starts with a capital
    rows = [f"<div><dt>{t(k)}</dt><dd>{t(cap(v))}</dd></div>" for k, v in (facts or []) if k and v]
    return f'<dl class="fcard__facts">{"".join(rows)}</dl>' if rows else ""

def fcard(name, tag, teaser, body, facts=(), site="", maps_q="", ref="", status=""):
    out = ['<details class="fcard">',
           f'<summary><span class="fcard__name">{t(name)}</span><span class="fcard__tag">{t(tag)}</span>'
           f'<span class="fcard__teaser">{t(teaser)}</span></summary>', '<div class="fcard__body">']
    for p in [x for x in body if x]:
        p = t(p)
        if p.startswith("★ "): p = '<span class="tsig">★</span> ' + p[2:]
        out.append(f"<p>{p}</p>")
    out.append(facts_html(facts))
    if ref: out.append(f'<p class="fcard__ref"><a href="#venue-{a(ref)}">Full card — the story, hours, address, Maps →</a></p>')
    if status == "unverified" and maps_q:
        out.append('<p><em>Unverified — we could not confirm this is trading now. Call ahead.</em></p>')
    sl = site_link(site)
    if sl: out.append(sl)
    if maps_q and (tag or "").lower() not in ("the warning", "honestly"):
        out.append(f'<a class="fcard__map" href="{maps(maps_q)}" target="_blank" rel="noopener">Open in Google Maps →</a>')
    out += ["</div>", "</details>"]
    return "\n".join(x for x in out if x)

CRAFT_MISS = {"Marionettistica Fratelli Napoli, Catania": None, "Papyrus making in Siracusa": "the museum's 2026 hours and address could not be confirmed",
              "Painted carts of Aci Sant'Antonio": "museum hours are undated; the master painter died in 2016",
              "Caltagirone: the ceramics town": "inland — a full day from the coast, not an hour",
              "Glazed lava stone": "no single workshop verified for visitors"}

def render_ref(fid, ref, x, group_title):
    key = f"{fid}|{ref}"
    e = EC.get(key, {}); NEW_SOURCES.extend(e.get("sources", []))
    if x["kind"] == "venue-pointer":
        v = V[x["id"]]; ep = EPT.get(key, {}); d = v["dishes"]
        teaser = ep.get("teaser") or d[0]["name"] + (f' — {d[0]["note"]}' if d[0].get("note") else "")
        facts = ep.get("facts") or [["Order", d[0]["name"]], ["Book", v.get("reservation", "")], ["Price", v.get("price_range", "")]]
        return fcard(v["short"], (C.get("pointer_tag") or {}).get(fid, v["town"]), teaser, [ep.get("line", "")], facts, ref=x["id"])
    if x["kind"] == "story":
        name, _, sub = x["title"].partition(":")
        facts = e.get("facts") or [["Touch it today", x.get("touch_it_today", "")], ["Where the sources argue", x.get("dispute", "")]]
        return fcard(name, e.get("tag") or "true story", e.get("teaser") or sub.strip(),
                     [e.get("story") or x["narrative"], "★ The old hand's point: " + (e.get("why") or x["sailor_insight"])],
                     facts, maps_q=mq(x.get("maps_query")))
    if x["kind"] == "gem":
        return fcard(x["name"], e.get("tag") or x["tag"], e.get("teaser") or x["story"].split(". ")[0] + ".",
                     [e.get("story") or x["story"], e.get("why", "")], e.get("facts") or [["Where", x.get("where", "")]])
    # place / drink / street card
    name = x["title"]; tag = e.get("tag") or x.get("tag", "")
    body = [e.get("story") or x["body"], e.get("why", "")]
    facts = e.get("facts") or ([["Practical", x["practical"]]] if x.get("practical") else [])
    if fid == "craft":
        if group_title.startswith("Do this one"):
            name = "★ " + name; tag = "do this one"
        elif name in CRAFT_MISS and CRAFT_MISS[name]:
            tag = "missing: " + CRAFT_MISS[name][:40]; body.append(f"<b>Missing:</b> {CRAFT_MISS[name]}.")
    if (x.get("section_suggest") == "avoid"): tag = "the warning"
    q = "" if x.get("section_suggest") in ("avoid", "follow", "seasonal") else mq(x.get("maps_query"))
    return fcard(name, tag, e.get("teaser") or x.get("teaser", ""), body, facts, site=x.get("website", ""), maps_q=q)

# ── the editorial folds ────────────────────────────────────────────────────
FOLD_TAGS = {}
for ch, fid, title, desc, lede, groups in C["folds"]:
    inner = [f'<p class="gx-lede">{t(lede)}</p>'] if lede else []
    n = 0
    for gt, gd, refs in groups:
        cards = [render_ref(fid, r, CARDS[f"{fid}|{r}"], gt) for r in refs]; n += len(cards)
        inner.append("\n".join(['<div class="fsub">', f'<h4 class="fsub__title">{t(gt)}</h4>'] + ([f'<p class="fsub__desc">{t(gd)}</p>'] if gd else [])
                               + ['<div class="fsub__cards">'] + cards + ["</div>", "</div>"]))
    count = "the signature" if fid in ("teatro", "etna", "granita", "vino") else (f"{n} true stories" if fid == "sea-stories" else f"{n} to know")
    w(fid, sfold(fid, title, desc, count, "\n\n".join(inner)))
    FOLD_TAGS[fid] = ch

# ── hand-written blocks ────────────────────────────────────────────────────
HAND.write(w, fcard, facts_html, V, KEPT, C)

# ── data ───────────────────────────────────────────────────────────────────
COMB = json.load(open(B / "_combined.json"))
LANE_ORDER = [k for k, _ in COMB["LANES"]]
GROUP_OF = dict(COMB["LANES"]); LABEL = COMB["LABEL"]
venues = []
for lane in LANE_ORDER:
    for vid in C["lanes"].get(lane, []):
        v = json.loads(json.dumps(V[vid])); v["category"] = lane   # the layout decides the lane
        ev = EV.get(vid, {})
        for k in ("hook", "why", "hours", "phone"):
            if ev.get(k): v[k] = ev[k]
        venues.append(v)
for nv in E.get("new_venues", []) if CITY in getattr(HAND, "ACCEPT_NEW", ()) else []:
    pass
byid = {v["id"]: v for v in venues}
GEO = json.load(open(B / "geo-results.json")); ADDR = json.load(open(B / "geo-addr.json"))
for v in venues:
    g = GEO.get(v["id"]); ga = ADDR.get(v["id"])
    if g: v["lat"], v["lng"], v["geo_precision"] = g["lat"], g["lng"], ("street-match" if g.get("street_only") else "nominatim-name-validated")
    elif ga: v["lat"], v["lng"], v["geo_precision"] = ga["lat"], ga["lng"], ga["precision"]
    else: v["lat"], v["geo_precision"] = None, "none"
    v["cat"] = "berth" if v["id"] in C["berths"] else "shop"
    v.pop("charter", None)
for vid, h in HAND.HOURS.items():
    if vid in byid and not byid[vid].get("hours"): byid[vid]["hours"] = h
GEMS_ALL = GEMS
LANES = [(l, GROUP_OF[l]) for l in LANE_ORDER if C["lanes"].get(l)]
GROUP_LBL = {"grande": "Les Grandes Tables", "petite": "Les Petites Tables", "street": "La Rue — The Street"}
CATEGORIES, TABLES = [], {}
for lane, grp in LANES:
    g = HAND.LANE_STORY[lane] if isinstance(HAND.LANE_STORY[lane], dict) else GEMS_ALL[HAND.LANE_STORY[lane]]
    ids = [v["id"] for v in venues if v["category"] == lane]
    CATEGORIES.append({"key": lane, "label": LABEL[lane], "lead": HAND.LANE_LEAD[lane],
                       "story": {"title": g["name"], "story": g["story"], "where": g.get("where", "")}})
    TABLES.setdefault(grp, {"title": GROUP_LBL[grp], "desc": HAND.GROUP_LEAD[grp], "sections": []})["sections"].append(
        {"label": LABEL[lane], "desc": HAND.LANE_LEAD[lane], "ids": ids})
GROUPS = [{"key": g, "label": GROUP_LBL[g], "lead": HAND.GROUP_LEAD[g]} for g in ("grande", "petite", "street") if g in TABLES]
for gk in ("grande", "petite"):
    TABLES.setdefault(gk, {"title": GROUP_LBL[gk], "desc": HAND.GROUP_LEAD.get(gk, ""), "sections": []})

def charter(vid):
    v = byid[vid]
    return {"price": v.get("price_range", ""), "book": v.get("reservation", "") or "Book ahead", "dress": "",
            "warn": v.get("caveat", ""), "fit": v.get("hook", "")}
for ids in C["short"].values():
    for i in ids: byid[i]["charter"] = HAND.CHARTER.get(i) or charter(i)
BRIDGE = {"_rule": "SINGLE-EDITOR RULE: charter{} on a venue deliberately duplicates booking truth held in its reservation/price_range/caveat prose. Any commit editing those fields on a shortlist venue MUST update its charter block in the same commit.",
          "doors": HAND.DOORS,
          "shortlist": {"title": "For guests — plan ahead, or save the night",
                        "desc": "Book ahead for guests, or rescue the evening when the booking falls through. Every name links to its full entry above.",
                        "groups": [{"label": k, "sub": HAND.SHORT_SUB[k], "ids": v} for k, v in C["short"].items()]}}

prose = " ".join(re.sub(r"<[^>]+>", " ", H.unescape(p.read_text())) for p in (D / "lines").glob("*.html"))
GEMLIST = []
for name, pat in HAND.POPUPS.items():
    g = GEMS_ALL[name]
    if pat.lower() not in prose.lower(): print("  popup pattern absent, skipped:", name); continue
    GEMLIST.append({"id": "gem-" + re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")[:30], "name": g["name"], "tag": g["tag"], "title": "",
                    "pattern": pat, "story": H.escape(g["story"], quote=False), "body": "", "where": H.escape(g.get("where", "") or g.get("town", ""), quote=False)})

def lst(refs):
    out = []
    for r in refs:
        x = find(r)
        if x.get("maps_query"): out.append({"name": x["title"], "desc": x.get("teaser", ""), "maps": maps(mq(x["maps_query"]))})
    return out
allrefs = [r for f in C["folds"] for g in f[5] for r in g[2]]
WALKS = lst([r for r in allrefs if r.startswith("PL:") and find(r).get("section_suggest") == "walks"])
LANDM = lst([r for r in allrefs if r.startswith("PL:") and find(r).get("section_suggest") in ("landmarks", "signature-theatre", "squares")])

# sources: every source behind a kept venue or card, + the enrichment's new ones
# checklinks 5 Oct 2026: museionline.info unreachable (whole host), no archive -> cite by name, unlinked.
# The Santa Lucia alla Badia page backed the WRONG home of the Caravaggio (it is at Santa Lucia al Sepolcro) -> dropped.
UNLINK = {"https://museionline.info/siracusa-musei-e-monumenti/museo-del-papiro",
          "https://www.museionline.info/siracusa-musei-e-monumenti/parco-archeologico-della-neapolis"}
DROP_SRC = {"https://www.museionline.info/siracusa-musei-e-monumenti/chiesa-di-santa-lucia-alla-badia-siracusa"}
seen, SOURCES = set(), []
def addgroup(title, srcs):
    items = []
    for s in srcs:
        u = (s.get("url") or "").strip()
        if u.startswith("http") and u not in seen: seen.add(u); items.append([unesc(s.get("label") or u), u])
    if items: SOURCES.append([title, items])
addgroup("The tables", [s for v in venues for s in (v.get("sources") or [])] + [s for k in KEPT for s in EV.get(k, {}).get("sources", [])])
addgroup("The places, the sea and the calendar", [s for k, x in CARDS.items() if x["kind"] != "venue-pointer" for s in x.get("sources", [])])
addgroup("Checked again for this guide, October 2026", NEW_SOURCES)
addgroup("Photographs (Wikimedia Commons)", [{"label": c["credit_label"], "url": c["url"]} for c in HAND.PHOTOS.values()])

HOT = HAND.HOT_LINES
DATA = {"venues": venues, "berths": C["berths"], "HOT": HOT,
        "photos": {f: {"caption": p["caption"]} for f, p in HAND.PHOTOS.items()},
        "COLORS": json.load(open(B / "kendwa-consts.json"))["COLORS"], "CAT_LABELS": json.load(open(B / "kendwa-consts.json"))["CAT_LABELS"],
        "PRODUCT_COLORS": {"Siracusa": "#2d4a5e", "Val di Noto": "#a16207", "Catania": "#1f2937", "Etna": "#7f1d1d", "Taormina": "#059669"},
        "NEIGHBORHOODS": HAND.NEIGH, "WALKS": WALKS, "WORK_SPOTS": [], "LANDMARKS": LANDM, "GEMS": GEMLIST,
        "TABLES": TABLES, "CATEGORIES": CATEGORIES, "GROUPS": GROUPS, "GROUP_OF": {l: g for l, g in LANES}, "BRIDGE": BRIDGE, "SOURCES": SOURCES}
for v in venues: v["group"] = GROUP_OF[v["category"]]
META = {k: C[k] for k in ("slug", "city", "country", "listeSlug", "title", "desc", "center", "zoom", "radiusKm")}
META.update({"checkedOn": "5 October 2026", "recheckBy": "April 2027", "repo": str(REPO)})
json.dump(META, open(D / "meta.json", "w"), ensure_ascii=False, indent=1)
json.dump(DATA, open(D / f"{SLUG}-data.json", "w"), ensure_ascii=False, indent=1)
json.dump({f: {"artist": p["artist"], "licence": p["licence"]} for f, p in HAND.PHOTOS.items()}, open(D / "photo-meta.json", "w"), ensure_ascii=False)
json.dump(HAND.LISTE_JSON, open(D / "liste.json", "w"), ensure_ascii=False, indent=1)

# sources fold (the method + the ledger + every source), as gen_sources.py
conf = sum(1 for v in venues if v.get("status") == "confirmed"); unv = sum(1 for v in venues if v.get("status") == "unverified")
pinned = sum(1 for v in venues if v.get("lat") is not None); total = sum(len(g[1]) for g in SOURCES)
Pp = lambda s: f'<p style="font-family:Inter,system-ui,sans-serif;font-size:0.85em;color:var(--ink-2)">{s}</p>'
src = [Pp(f"<strong>Every place in this guide was checked between 4 and 5 October 2026.</strong> Of {len(venues)} tables, bars and cellars, <strong>{conf} were confirmed</strong> trading against a current source — the MICHELIN Guide Italia 2026 page, Gambero Rosso or Slow Food 2026, or the venue's own live site — and <strong>{unv} are marked unverified</strong> on their cards: treat those as leads to call, not bookings to rely on. Prices carry the date they were seen."),
       Pp(f"<strong>Fewer places, on purpose.</strong> This guide keeps at most three places in each kind — four only where we could not choose — picked for what you should not miss and what is most particular to {C['city']} and its surroundings. The others that were researched are left out, not forgotten."),
       Pp(f"<strong>Coordinates:</strong> {pinned} of {len(venues)} places carry a map pin, each matched on OpenStreetMap by name or by the exact house number; the rest have a Google Maps search link instead. No coordinate was invented."),
       Pp("<strong>Where the sources argue, the argument is printed</strong> rather than settled by guesswork. Re-check due by <strong>April 2027</strong>.")]
for title, items in SOURCES:
    src.append(f'<h4 class="fsub__title">{t(title)}</h4><ul class=\'gx-list\'>' + "".join(
        (f'<li>{t(l)} <em>(site unreachable on 5 Oct 2026, no archived copy — cited by name)</em></li>' if u in UNLINK else
         f'<li><a href="{a(u)}" target="_blank" rel="noopener">{t(l)}</a></li>') for l, u in items if u not in DROP_SRC) + "</ul>")
w("sources", sfold("sources", "Sources &amp; how we checked".replace("&amp;", "&"), "Every claim in this guide traces to one of these — and this is the method.", f"{total} sources", "\n".join(src)))

# ── emit (data.js, both CSVs, .ics) ────────────────────────────────────────
shutil.copy(B / "emit.py", D / "emit.py")
subprocess.run([sys.executable, str(D / "emit.py")], check=True)

# ── assemble on the live Prague chrome ─────────────────────────────────────
S = (B / "chrome-redesign.html").read_text()
L = lambda n: (D / "lines" / f"{n}.html").read_text().rstrip("\n")
def tag(sid, tags):
    s = L(sid)
    return re.sub(r'(<(?:details|section) class="(?:sfold|gx-jump)" id="%s")' % re.escape(sid), r'\1 data-tags="%s"' % tags, s, count=1)
FOLD_SUB = HAND.FOLD_SUB   # fold id -> sub-tag
CH = [("place", "band-place", "L’Âme du lieu"), ("tables", "band-tables", "Les Tables"), ("flaner", "band-do", "Flâner"),
      ("sortir", "band-drink", "Boire &amp; sortir"), ("around", "band-around", "Autour"), ("fast", "band-fast", "Sur le pouce"),
      ("practical", "band-close", "Pratique")]
blocks = {k: [] for k, _, _ in CH}
blocks["place"] += [tag("soul", "place essay")] + ([tag("bougie", "place history")] if (D / "lines/bougie.html").exists() else []) \
                 + ([L("funfact").replace('<div class="funfact">', '<div class="funfact" data-tags="place essay">', 1)] if (D / "lines/funfact.html").exists() else []) \
                 + [tag("quartiers", "place towns"), tag("why-now", "place when")]
present = [g["key"] for g in GROUPS]
TGROUPS = ('<nav class="gx-tgroups" data-tags="tables restaurants" aria-label="The kinds of table"><span class="gx-tgroups__lbl">Inside:</span>'
           + "".join(f'<a href="#tables" data-tgroup="{i}">{GROUP_LBL[g]}</a>' for i, g in enumerate(present)) + "</nav>")
blocks["tables"] += [tag("eat", "tables restaurants"), TGROUPS, tag("tables", "tables restaurants")]
ORDER = [f[1] for f in C["folds"]]
for fid in ORDER:
    ch = FOLD_TAGS[fid]
    if fid == "events": continue
    blocks[ch].append(tag(fid, f"{ch} {FOLD_SUB.get(fid, fid)}".strip()))
blocks["flaner"].insert(min(len(blocks["flaner"]), HAND.TWENTYFOUR_AT), tag("twentyfour", "flaner walks"))
if "events" in ORDER: blocks["practical"].append(tag("events", "practical when"))
blocks["practical"].append(tag("seasonal", "practical when"))
SUBLBL = HAND.SUB_LABELS
chapters = []
for k, bid, title in CH:
    if not blocks[k]: continue
    subs = []
    for b_ in blocks[k]:
        for m in re.finditer(r'data-tags="([^"]+)"', b_[:400]):
            for tg in m.group(1).split()[1:]:
                if tg not in subs: subs.append(tg)
            break
    sn = ('<nav class="gx-subtags" aria-label="Inside this chapter">' + "".join(
        f'<a class="gx-subtag" href="#{bid}" data-tag="{s}">{H.escape(SUBLBL.get(s, s.upper()), quote=False)}</a>' for s in subs) + "</nav>") if len(subs) > 1 else ""
    chapters.append(f'<div class="gx-chapter" data-chapter="{k}">\n<div class="gx-band" id="{bid}"><span class="gx-band__title">{title}</span>'
                    f'<span class="gx-band__sub">{HAND.CHAPTER_SUB.get(k, "")}</span></div>\n' + (sn + "\n" if sn else "") + "\n".join(blocks[k]) + "\n</div>")
nav = ('<nav class="band-nav gx-tags" aria-label="Chapters"><a class="band-nav__chip is-on" href="#" data-tag="">All</a>'
       + "".join(f'<a class="band-nav__chip" href="#{bid}" data-tag="{k}">{t_}</a>' for k, bid, t_ in CH if blocks[k]) + "</nav>")
TAIL = [tag("hot-foot", "practical when"), tag("la-liste", "practical restaurants"), tag("sources", "practical")]
mid = (L("hero") + "\n\n" + L("etymon") + "\n" + '<div class="container gx-prague">\n' + nav + "\n" + L("lead") + "\n"
       + "\n".join(chapters) + "\n" + '<div class="gx-tail">\n' + "\n".join(TAIL) + "\n</div>\n")
h0 = S.find('<div class="hero">'); k0 = S.find('<div class="gx-appendix" hidden></div>')
assert 0 < h0 < k0
doc = S[:h0] + mid + S[k0:]
G = json.load(open(B / "glossary.json"))
g0 = doc.index("  var G = [", doc.index('<script id="prague-glossary">')); g1 = doc.index("  ];\n", g0) + len("  ];\n")
doc = doc[:g0] + "  var G = [\n" + ",\n".join("    " + json.dumps(x, ensure_ascii=False) for x in G) + "\n  ];\n" + doc[g1:]
doc = re.sub(r"var CS = \{[^}]*\};", "var CS = {};", doc, count=1)
doc = doc.replace("/* Czech words explain themselves on hover.", "/* Sicilian and Italian words explain themselves on hover.")
doc = doc.replace("/* Czech words explain themselves on hover */", "/* Sicilian and Italian words explain themselves on hover */")
for x_, y_ in [("gx-prague", "gx-sicily"), ('id="prague-tags"', 'id="sicily-tags"'), ('id="prague-tags-js"', 'id="sicily-tags-js"'),
               ('id="prague-glossary"', 'id="sicily-glossary"'), ('id="prague-readability"', 'id="sicily-readability"'),
               ("/* Prague: the top-3", f"/* {C['city']}: the top-3"), ("/* Prague — scoped:", f"/* {C['city']} — scoped:")]:
    doc = doc.replace(x_, y_)
doc = re.sub(r"<title>[^<]*</title>", f"<title>{META['title']}</title>", doc, count=1)
doc = re.sub(r'(<meta name="description" content=")[^"]*(")', lambda m: m.group(1) + META["desc"].replace('"', "&quot;") + m.group(2), doc, count=1)
doc = doc.replace("/terroir/data/Prague-Cechy.js", f"/terroir/data/{SLUG}.js")
doc = re.sub(r"window\.TERROIR_CONFIG = \{[^}]*\};", f"window.TERROIR_CONFIG = {{ articleId:'terroir-{SLUG}', portName:'{META['city']}', "
             f"center:[{META['center'][0]}, {META['center'][1]}], zoom:{META['zoom']}, cityRadiusKm:{META['radiusKm']} }};", doc)
doc = doc.replace("  50.0875, 14.4213\n</footer>", f"  {HAND.FOOTER_COORDS}\n</footer>")
rel = re.search(r"if \(cs && tail && src\) \{.*?return; \}", doc); assert rel
doc = doc[:rel.start()] + ('if (cs && tail && src) { cs.setAttribute("data-tags","practical restaurants"); var at = src; '
                           'while (at && at.parentNode !== tail) at = at.parentNode; if (cs.parentNode !== tail) tail.insertBefore(cs, at || null); return; }') + doc[rel.end():]
CSS = """<style id="sicily-phone-fix">/* 390px: long meta values must not widen the page (kit-level; page-local fix) */
.terroir-card__meta-row{min-width:0}
.terroir-card__meta-row span{min-width:0;overflow-wrap:anywhere}
.terroir-card__meta-row span:last-child{flex:1 1 0}
</style>
<style id="sicily-facts">/* 5 Oct 2026 (Arnaud: "add labels even in things like walks"): every open card ends on a labelled
   facts block. Mono sea labels, ink values; one column on a phone. Shows only inside an OPEN card. */
.gx-sicily .fcard__facts{display:grid;grid-template-columns:1fr 1fr;gap:8px 18px;margin:14px 0 6px;padding:12px 0 2px;border-top:1px solid #e5e5e5}
.gx-sicily .fcard__facts>div{min-width:0}
.gx-sicily .fcard__facts dt{font-family:'JetBrains Mono','SF Mono',SFMono-Regular,Menlo,monospace;font-size:.6rem;letter-spacing:1.4px;text-transform:uppercase;color:#2d4a5e;margin:0 0 2px}
.gx-sicily .fcard__facts dd{margin:0;font-family:Inter,system-ui,sans-serif;font-size:.86em;line-height:1.45;color:#0a0a0a;overflow-wrap:anywhere}
@media(max-width:560px){.gx-sicily .fcard__facts{grid-template-columns:1fr}}
</style>"""
doc = doc.replace("</head>", CSS + "\n</head>", 1)
doc = re.sub(r'<style id="prague-tgroups">.*?</style>\s*<script id="prague-tgroups-js">.*?</script>\s*', "", doc, flags=re.S)
doc = doc.replace("</body>", (B / "tgroups-kit.html").read_text() + "</body>", 1)
(D / "out" / "index.html").write_text(doc)
STALE = ["Prague", "Praha", "Vltava", "Czech", "Bohemia", "pivo", "kavárna", "Cechy", "svíčková"] + HAND.STALE
stale = {x_: len(re.findall(r"\b" + re.escape(x_) + r"\b", re.sub(r'<div class="gx-tail">.*', "", doc, flags=re.S))) for x_ in STALE}
print(f"{CITY}: {len(venues)} venues · lanes {len(LANES)} · pinned {pinned} · fcards {doc.count('<details class=\"fcard\"')} · facts {doc.count('fcard__facts')} · "
      f"popups {len(GEMLIST)} · sources {total} · folds {doc.count('<details class=\"sfold\"')}")
print("  STALE (outside the sources):", {k_: v_ for k_, v_ in stale.items() if v_} or "none")

# ── install into the clone ─────────────────────────────────────────────────
G_ = REPO / "terroir" / SLUG; (G_ / "img").mkdir(parents=True, exist_ok=True)
for f in ("index.html", "data.js", "data.csv", f"{C['listeSlug']}-eat-drink-checklist.ics"):
    shutil.copy(D / "out" / f, G_ / f)
for f in HAND.PHOTOS: shutil.copy(B / "cityimg" / f, G_ / "img" / f)
shutil.copy(D / "out" / "data.js", REPO / "terroir" / "data" / f"{SLUG}.js")
