#!/usr/bin/env python3
"""Prague-Cechy post-step, 5 Oct 2026 — Arnaud: "too much, limit to 3 per subcategory, 4 when you
really can't decide" + "make the cards more interesting and complete … add labels even in walks".

Usage: python3 trim_2026_10_05.py <repo> [picks.json]
Applies to the BUILT page (like fixes_2026_10_04.py): terroir/Prague-Cechy/{index.html,data.js,data.csv},
terroir/data/Prague-Cechy.js, terroir/csv/Prague-Cechy.csv, the check config. Idempotent on a fresh
build; refuses to run twice (marker). The locked kit is never touched.

1. Venues cut from data.js (VENUES, TABLES ids) and from both CSVs (byte-identical).
2. Cards cut per .fsub group to the kept list (first match by name).
3. Links to a cut venue are unlinked (text kept); pointer refs to a cut venue are removed.
4. Printed counts recomputed (fold counters, band sub, closed #tables, the sources ledger).
5. Every kept card is enriched from facts ALREADY on it (its practical line) or in the venue data:
   the first paragraph is labelled «The story», and the practical line becomes a labelled
   <dl class="fcard__facts">. No hour, price or distance is invented: unclassifiable text is kept
   under «Tip». Pointer cards get Order · When · Book · Price from the venue's own record."""
import json, re, sys, html, csv, io, pathlib

REPO = pathlib.Path(sys.argv[1])
PICKS = json.load(open(sys.argv[2] if len(sys.argv) > 2 else pathlib.Path(__file__).with_name("picks_2026_10_05.json")))
G = REPO / "terroir" / "Prague-Cechy"
IDX, DJS, CSV1 = G / "index.html", G / "data.js", G / "data.csv"
DJS2, CSV2 = REPO / "terroir" / "data" / "Prague-Cechy.js", REPO / "terroir" / "csv" / "Prague-Cechy.csv"
CHK = REPO / "terroir" / "_rollout" / "lib" / "guides" / "Prague-Cechy.check.json"
MARK = "<!-- trim 2026-10-05 -->"

doc = IDX.read_text(); js = DJS.read_text()
if MARK in doc: sys.exit("already trimmed — run on a fresh build")
log = []

# ── 1 · venues ─────────────────────────────────────────────────────────────
CUT = {vid for lane in PICKS["lanes"].values() for vid in lane.get("cut", {})}
vblock = js[js.index("const VENUES = ["):js.index("const NEIGHBORHOODS")]
vlines = re.findall(r'^    (\{"id":"([^"]+)".*?\}),?$', vblock, re.M)
V = {vid: json.loads(raw) for raw, vid in vlines}
assert CUT <= set(V), CUT - set(V)
before_v = len(V)
v0 = js.index("const VENUES = ["); v1 = js.index("const NEIGHBORHOODS")
js = js[:v0] + re.sub(r'^    \{"id":"(%s)".*\n' % "|".join(map(re.escape, CUT)), "", js[v0:v1], flags=re.M) + js[v1:]
js = re.sub(r'\},\n  \];\n  const NEIGHBORHOODS', '}\n  ];\n  const NEIGHBORHOODS', js)       # trailing comma
t0 = js.index("const TABLES = ") + len("const TABLES = "); t1 = js.index(";\n  const CATEGORIES")
TABLES = json.loads(js[t0:t1])
for g in TABLES.values():
    for sec in g["sections"]:
        sec["ids"] = [i for i in sec["ids"] if i not in CUT]
for g in TABLES.values():
    for sec in g["sections"]:
        if sec["label"] == "La crème":
            sec["desc"] = ("Three rooms from the first MICHELIN Guide Czechia (December 2025): the two one-stars that cook most Czech, "
                           "and the country's only two-star, twenty minutes out of town. Tasting menus run from 2,200 CZK to about 7,500 CZK before wine.")
js = js[:t0] + json.dumps(TABLES, ensure_ascii=False, indent=1) + js[t1:]
# guest list + berths: REBUILT from the kept venues (the cap wins)
SL = PICKS["shortlist"]
b0 = js.index("const BRIDGE = ") + len("const BRIDGE = "); b1 = js.index(";\n  return {")
BR = json.loads(js[b0:b1])
for g in BR["shortlist"]["groups"]:
    g["ids"] = SL["groups"][g["label"]]
    for i in g["ids"]:
        assert i in V and i not in CUT and V[i].get("charter"), f"shortlist {i} must be kept and carry a charter"
g0 = BR["shortlist"]["groups"][0]
g0["sub"] = "The booking fell through at seven. Call these in this order; only Kantýna is a true walk-in."
js = js[:b0] + json.dumps(BR, ensure_ascii=False, indent=1) + js[b1:]
for vid in SL["berths"]: assert vid in V and vid not in CUT and V[vid]["tier"] == "berth_top", vid
assert not any(f'"{c}"' in js for c in CUT), [c for c in CUT if f'"{c}"' in js]
KEPT = {k: v for k, v in V.items() if k not in CUT}
log.append(f"venues {before_v} -> {len(KEPT)} (cut {len(CUT)})")

# CSVs: drop the cut venues' rows (by name), keep both copies byte-identical
cut_names = {V[c]["name"] for c in CUT}
raw = CSV1.read_text()
rows = list(csv.reader(io.StringIO(raw)))
keep_rows = [rows[0]] + [r for r in rows[1:] if r[0] not in cut_names]
assert len(rows) - len(keep_rows) == len(CUT), (len(rows), len(keep_rows))
buf = io.StringIO(); csv.writer(buf).writerows(keep_rows)
out_csv = buf.getvalue()

# ── 2 · cards per group ────────────────────────────────────────────────────
def name_of(card):
    m = re.search(r'<span class="fcard__name">(.*?)</span>', card, re.S)
    return html.unescape(re.sub(r"<[^>]+>", "", m.group(1))).strip() if m else ""

def fold_span(d, fid):
    i = d.index(f'<details class="sfold" id="{fid}"'); depth, j = 0, i
    for m in re.finditer(r"<details\b|</details>", d[i:]):
        depth += 1 if m.group(0) == "<details" else -1
        if depth == 0: return i, i + m.end()
    raise SystemExit(fid)

cards_before = doc.count('class="fcard"')
for fid, groups in PICKS["groups"].items():
    a, b = fold_span(doc, fid); f = doc[a:b]
    for gtitle, spec in groups.items():
        keep = list(spec["keep"])
        h = f.find(f'<h4 class="fsub__title">{html.escape(gtitle, quote=False)}</h4>')
        assert h >= 0, (fid, gtitle)
        c0 = f.index('<div class="fsub__cards">', h)
        nxt = f.find('<div class="fsub">', c0); nxt = len(f) if nxt < 0 else nxt
        seg = f[c0:nxt]
        def repl(m):
            n = name_of(m.group(0))
            if n in keep: keep.remove(n); return m.group(0)
            return ""
        seg2 = re.sub(r'\n?<details class="fcard">.*?</details>', repl, seg, flags=re.S)
        assert not keep, (fid, gtitle, "not found:", keep)
        f = f[:c0] + seg2 + f[nxt:]
    doc = doc[:a] + f + doc[b:]
log.append(f"fcards {cards_before} -> {doc.count('class=\"fcard\"')}")

# ── 3 · links to cut venues ────────────────────────────────────────────────
for c in CUT:
    doc = re.sub(r'<p class="fcard__ref"><a href="#venue-%s">.*?</a></p>' % re.escape(c), "", doc)
    doc = re.sub(r'<a href="#venue-%s"[^>]*>(.*?)</a>' % re.escape(c), r"\1", doc, flags=re.S)
assert not re.search(r'#venue-(%s)\b' % "|".join(map(re.escape, CUT)), doc)

# ── 4 · printed counts ─────────────────────────────────────────────────────
n_v = len(KEPT)
conf = sum(1 for v in KEPT.values() if v.get("status") == "confirmed")
unv = sum(1 for v in KEPT.values() if v.get("status") == "unverified")
pinned = sum(1 for v in KEPT.values() if v.get("lat") is not None)
for a_, b_ in [(f"{before_v} tables in 16 lanes", f"{n_v} tables in 16 lanes"),
               (f'<span class="sfold__count">{before_v} TABLES</span>', f'<span class="sfold__count">{n_v} TABLES</span>'),
               ("Of the 64 tables listed, <strong>62 were confirmed</strong>", f"Of the {n_v} tables listed, <strong>{conf} were confirmed</strong>"),
               ("and <strong>2 are marked unverified</strong> and say so on their cards.",
                f"and <strong>{unv} {'is' if unv == 1 else 'are'} marked unverified</strong>{' and say so on their cards' if unv else ''}."),
               ("63 of 64 tables carry a map pin", f"{pinned} of {n_v} tables carry a map pin")]:
    assert a_ in doc, a_; doc = doc.replace(a_, b_, 1)

def recount(d, fid, old_cards):
    a, b = fold_span(d, fid); f = d[a:b]
    m = re.search(r'<span class="sfold__count">(\d+) ([^<]*)</span>', f)
    if not m: return d
    n_now = f.count('class="fcard"')
    if int(m.group(1)) == old_cards.get(fid):
        f = f.replace(m.group(0), f'<span class="sfold__count">{n_now} {m.group(2)}</span>', 1)
    return d[:a] + f + d[b:]

# ── 5 · enrichment ─────────────────────────────────────────────────────────
TYPE = {**{k: "walk" for k in ("walks", "twentyfour")},
        **{k: "sight" for k in ("quartiers", "landmarks", "small-wonders", "sit", "art", "culture", "vltava", "pasaze", "provisioning")},
        **{k: "venue" for k in ("kavarna", "coffee-scene", "pivo", "bars", "natural-wine", "listening", "underground", "street-food", "money-sits")},
        "around": "trip", "events": "event", "hot-foot": "event", "sea-stories": "story", "craft": "craft"}
LBL = {"product": {"where": "Where to buy", "transport": "Where to buy", "hours": "Open", "cost": "Price"},
       "walk":  {"where": "Start", "transport": "Start", "length": "Length", "time": "Time", "hours": "Open", "cost": "Cost", "book": "Book", "touch": "Don't miss"},
       "sight": {"where": "Where", "transport": "Where", "hours": "Open", "cost": "Cost", "time": "Time needed", "length": "Time needed", "book": "Book", "touch": "Don't miss"},
       "venue": {"where": "Where", "transport": "Where", "hours": "When", "cost": "Price", "book": "Book", "time": "When", "length": "Where", "touch": "Don't miss"},
       "market": {"where": "Where", "transport": "Where", "hours": "Hours", "days": "Days", "cost": "Price", "book": "Book", "time": "Go at"},
       "trip":  {"where": "Getting there", "transport": "Getting there", "time": "Time needed", "length": "Getting there", "hours": "Open", "cost": "Cost", "book": "Book", "touch": "Don't miss"},
       "event": {"where": "Where", "transport": "Where", "hours": "When", "dates": "When", "cost": "Cost", "book": "Book", "time": "When"},
       "story": {"touch": "Touch it today", "where": "Where", "transport": "Where", "hours": "Open", "cost": "Cost", "time": "Open"},
       "craft": {"where": "Where", "transport": "Where", "hours": "Time", "time": "Time", "cost": "Cost", "book": "Book"}}
ORDER = ["Start", "Where", "Where to buy", "Getting there", "Days", "Hours", "Open", "When", "Length", "Time", "Time needed", "Go at",
         "Best hour", "Order", "Price", "Cost", "Book", "Don't miss", "Touch it today", "Tip", "Checked"]
MONTHS = r"(January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sept?|Oct|Nov|Dec)\b"

DROP = re.compile(r"^(fact card; no venue|advice card|advice, not a place|no venue|no pin|no single site)$", re.I)
def kind(s, first=False):
    l = s.lower()
    if l.startswith("touch it today"): return "touch"
    if re.fullmatch(r"(?:[\w ]*\b(?:seen|observed|checked|rules observed|programme seen)\s+)?(?:Sept?|September|Oct|October) 2026", s.strip(), re.I): return "checked"
    if re.search(r"\+\d{3}\s?\d|\bbook|reserv|by appointment", s, re.I): return "book"
    if re.search(r"\d\s?km\b", s): return "length"
    if re.search(r"(CZK|Kč|€)|\bfree\b|ticket|price|pay what|\bcash\b", s, re.I): return "cost"
    if re.search(r"\b(Mon|Tue|Wed|Thu|Fri|Sat|Sun)(day)?s?\b|\bdaily\b|\bopen\b|\bclosed\b|\bhours\b|\d{1,2}[:.]\d{2}|until|from \d", s, re.I): return "hours"
    if re.search(MONTHS, s): return "dates"
    if re.search(r"\b\d+(?:[.,]\d+)?(?:[–-]\d+(?:[.,]\d+)?)?\s?(h|hours?|min(utes)?)\b", s): return "time"
    if re.search(r"\bmetro\b|\btram\b|\bbus\b|\btrain\b|walk from|by boat|ferry", s, re.I): return "transport"
    if re.search(r"Prague \d|Praha|street|ulice|náměstí|nábřeží|\bfloor\b|Malá Strana|Staré Město|Nové Město|Karlín|Vinohrady|Holešovice|Žižkov|Letná|Smíchov|Dejvice|\d+[A-Za-z]?,", s): return "where"
    if re.fullmatch(r"[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ][^\d,;]{2,40} \d+[A-Za-z]?(/\d+)?", s.strip()): return "where"
    if first: return "where"
    return "tip"

def facts_from(meta_text, typ):
    out = {}
    segs = [x.strip() for x in meta_text.split(" · ") if x.strip()]
    for i, seg in enumerate(segs):
        if DROP.match(seg): continue
        k = kind(seg, first=(i == 0 and len(segs) > 1 and typ in ("venue", "sight")))
        if typ == "market" and k in ("hours", "dates") and re.fullmatch(r"[A-Za-z–\-, ]+", seg): k = "days"
        if k == "checked": lab = "Checked"
        elif k == "dates": lab = {"market": "Days", "walk": "When", "trip": "When", "story": "Open"}.get(typ, "When")
        else: lab = LBL.get(typ, {}).get(k, "Tip")
        if lab == "Tip" and typ == "product": lab = "Where to buy"
        if k == "touch": seg = seg.split(":", 1)[1].strip() if ":" in seg else seg
        out.setdefault(lab, []).append(seg)
    return out

def dl(facts):
    items = [(k, "; ".join(facts[k])) for k in ORDER if k in facts] + [(k, "; ".join(v)) for k, v in facts.items() if k not in ORDER]
    return ('<dl class="fcard__facts">' + "".join(f"<div><dt>{html.escape(k, quote=False)}</dt><dd>{v}</dd></div>" for k, v in items if v) + "</dl>") if items else ""

def esc(s): return html.escape(s or "", quote=False)

enriched = 0
def enrich(card, typ):
    global enriched
    body0 = card.index('<div class="fcard__body">') + len('<div class="fcard__body">')
    body1 = card.rindex("</div>")
    body = card[body0:body1]
    # «The story»: the first plain paragraph
    body = re.sub(r'^(\s*)<p>(?!<span class="tsig">|<b>|<strong>|<em>Unverified)', r'\1<p class="fcard__story">', body, count=1)
    facts = {}
    m = re.search(r'<div class="fcard__meta">(.*?)</div>', body, re.S)
    if m:
        facts = facts_from(html.unescape(m.group(1)), typ)
        facts = {k: [esc(x) for x in v] for k, v in facts.items()}
    ref = re.search(r'href="#venue-([^"]+)"', body)
    if ref and ref.group(1) in KEPT:
        v = KEPT[ref.group(1)]
        d = (v.get("dishes") or [{}])[0]
        if d.get("name"): facts.setdefault("Order", [esc(d["name"])])
        if v.get("hours"): facts.setdefault("When", [esc(v["hours"])])
        if v.get("reservation"): facts.setdefault("Book", [esc(v["reservation"])])
        if v.get("price_range"): facts.setdefault("Price", [esc(v["price_range"])])
    new = dl(facts)
    if m: body = body.replace(m.group(0), new, 1) if new else body.replace(m.group(0), "", 1)
    elif new:
        k = body.find('<a class="fcard__site"'); k = body.find('<a class="fcard__map"') if k < 0 else k
        k = body.find('<p class="fcard__ref"') if k < 0 else k
        body = body[:k] + new + body[k:] if k >= 0 else body + new
    if new: enriched += 1
    return card[:body0] + body + card[body1:]

old_cards = {}
for fid in TYPE:
    try: a, b = fold_span(doc, fid)
    except ValueError: continue
    f = doc[a:b]
    typ = TYPE[fid]
    def per_card(m):
        c = m.group(0)
        t = typ
        if fid == "provisioning":
            t = "market" if "market" in name_of(c).lower() or "SAPA" in name_of(c) else "product"
        if name_of(c).startswith(("If you have one", "Threading them")): t = "walk"
        return enrich(c, t)
    f2 = re.sub(r'<details class="fcard">.*?</details>', per_card, f, flags=re.S)
    doc = doc[:a] + f2 + doc[b:]

# fold counters: compare against the ORIGINAL page's card counts
orig = IDX.read_text()
for fid in re.findall(r'<details class="sfold" id="([^"]+)"', orig):
    a, b = fold_span(orig, fid); old_cards[fid] = orig[a:b].count('class="fcard"')
for fid in old_cards:
    doc = recount(doc, fid, old_cards)
# special counters whose number is not the card count
pv = re.search(r'<span class="sfold__count">HOW-TO \+ (\d+) PUBS</span>', doc)
if pv:
    a, b = fold_span(doc, "pivo"); n = len(set(re.findall(r'href="#venue-([^"]+)"', doc[a:b])))
    doc = doc.replace(pv.group(0), f'<span class="sfold__count">HOW-TO + {n} PUBS</span>', 1)

CSS = """
/* 5 Oct 2026 — labelled facts and «The story» inside an OPEN card (tiles stay as they were) */
.gx-prague .fcard__story::before{content:"The story";display:block;font-family:var(--p-mono);font-size:.62rem;letter-spacing:1.4px;text-transform:uppercase;color:#2d4a5e;margin:0 0 3px}
.gx-prague .fcard__facts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px 18px;margin:12px 0 6px;padding-top:10px;border-top:1px solid var(--p-subtle)}
.gx-prague .fcard__facts>div{min-width:0}
.gx-prague .fcard__facts dt{font-family:var(--p-mono);font-size:.62rem;letter-spacing:1.4px;text-transform:uppercase;color:#2d4a5e;margin:0 0 2px;font-weight:400}
.gx-prague .fcard__facts dd{margin:0;color:var(--p-ink);font-size:.88em;line-height:1.45;overflow-wrap:anywhere}
@media(max-width:560px){.gx-prague .fcard__facts{grid-template-columns:1fr}}
"""
k = doc.index("</style>", doc.index('<style id="prague-tags">'))
doc = doc[:k] + CSS + doc[k:]
doc = doc.replace("</body>", MARK + "\n</body>", 1)
log.append(f"enriched {enriched} cards with a labelled facts block")

# ── write ──────────────────────────────────────────────────────────────────
IDX.write_text(doc); DJS.write_text(js); DJS2.write_text(js)
CSV1.write_text(out_csv); CSV2.write_text(out_csv)
chk = json.loads(CHK.read_text()); fl = chk["floors"]
newf = {"venues": n_v - 2, "fcards": doc.count('class="fcard"') - 10, "pins": min(fl.get("pins", 40), pinned)}
for kf, vf in newf.items():
    if vf < fl.get(kf, 0): log.append(f"floor {kf}: {fl.get(kf)} -> {vf}"); fl[kf] = vf
CHK.write_text(json.dumps(chk, ensure_ascii=False, indent=2) + "\n")
print("\n".join(log))
