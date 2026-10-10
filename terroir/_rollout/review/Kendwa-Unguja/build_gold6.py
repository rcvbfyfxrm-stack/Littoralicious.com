#!/usr/bin/env python3
"""Kendwa-Unguja -> GOLD6 (the Prague standard), 7 Oct 2026. Route B: the reading layer is assembled
on the LIVE chrome of Siracusa-Sicilia (itself cloned from the live Prague page); the locked kit
terroir/_assets/guide/* is untouched. Inputs, all in this folder:
  picks.json      the editorial cut (lanes <=3, berths, the guest list, cut venues with reasons)
  card_plan.json  which fold cards exist, built from which old cards (merges = told once)
  cards.json      the rewritten cards (hook, story, why, labelled facts) per card key
  venues.json     the re-verified venue records (status, date, corrections, new hook + why)
  hot_events.json the dated hot board, the events calendar, the listening-bar finding
  prose.py        the hand-edited prose blocks (lead, essay fold, week, traps, follow, seasonal, liste edits)
  glossary.json   the hover glossary (the place's own words)
The old guide and the chrome are read from origin/rebuild/publishing-system, so the build is repeatable.
Run from the repo root:  python3 terroir/_rollout/review/Kendwa-Unguja/build_gold6.py"""
import json, re, subprocess, pathlib, html as H, urllib.parse, csv, io, sys
REPO = pathlib.Path(__file__).resolve().parents[4]
RV = pathlib.Path(__file__).resolve().parent
sys.path.insert(0, str(RV))
import prose as P

SLUG, CITY = "Kendwa-Unguja", "Kendwa"
BASE = "origin/rebuild/publishing-system"
def show(p): return subprocess.run(["git", "show", f"{BASE}:{p}"], cwd=REPO, capture_output=True, text=True, check=True).stdout
OLD = show(f"terroir/{SLUG}/index.html")
CHROME = show("terroir/Siracusa-Sicilia/index.html")
OLDJS = show(f"terroir/data/{SLUG}.js")
OLDCSV = show(f"terroir/csv/{SLUG}.csv")
OLDICS = show(f"terroir/{SLUG}/kendwa-eat-drink-checklist.ics")
D = json.loads(subprocess.run(["node", "-e", "global.window={};eval(require('fs').readFileSync(0,'utf8'));"
                               "process.stdout.write(JSON.stringify(window.TERROIR_DATA))"],
                              input=OLDJS, capture_output=True, text=True, check=True).stdout)
J = lambda n: json.load(open(RV / n))
PICKS, PLAN, CARDS, VUP, HOT, GLOSS = J("picks.json"), J("card_plan.json"), J("cards.json"), J("venues.json"), J("hot_events.json"), J("glossary.json")

# ── the venue set ───────────────────────────────────────────────────────────
LANE_IDS = [i for l in PICKS["lanes"].values() for i in l["ids"]]
assert len(LANE_IDS) == len(set(LANE_IDS)), "a venue belongs to exactly one lane"
for k, l in PICKS["lanes"].items(): assert len(l["ids"]) <= 3, k
KEEP = LANE_IDS + PICKS["keep_pins"]
OLDV = {v["id"]: v for v in D["VENUES"]}
CUT = set(OLDV) - set(KEEP)
assert CUT == set(PICKS["cut"]), (CUT ^ set(PICKS["cut"]))
LANE_OF = {i: k for k, l in PICKS["lanes"].items() for i in l["ids"]}

def t(s): return H.escape(s or "", quote=False)
def a(s): return H.escape(s or "", quote=True)
def maps(q): return "https://www.google.com/maps/search/?api=1&query=" + urllib.parse.quote_plus(q)

def fix_links(s):
    """#venue- links survive only for venues that render a table card; a kept map-only place
    becomes a pin-hover span; a cut venue becomes plain text. data-pins to cut venues go."""
    def ven(m):
        vid, txt = m.group(1), m.group(2)
        if vid in LANE_OF: return m.group(0)
        if vid in KEEP: return f'<span data-pin="{vid}">{txt}</span>'
        return txt
    s = re.sub(r'<a href="#venue-([a-z0-9-]+)">(.*?)</a>', ven, s, flags=re.S)
    s = re.sub(r'<span data-pin="([a-z0-9-]+)">(.*?)</span>', lambda m: m.group(0) if m.group(1) in KEEP else m.group(2), s, flags=re.S)
    return s

# ── cards ───────────────────────────────────────────────────────────────────
def facts_html(facts):
    cap = lambda v: v[0].upper() + v[1:] if v[:1].islower() else v
    rows = [f"<div><dt>{t(k)}</dt><dd>{t(cap(v))}</dd></div>" for k, v in (facts or []) if k and v]
    return f'<dl class="fcard__facts">{"".join(rows)}</dl>' if rows else ""

def site_link(u):
    if not u or not u.startswith("https://"): return ""
    host = urllib.parse.urlparse(u).netloc.lower().removeprefix("www.")
    return f'<a class="fcard__site" href="{a(u)}" target="_blank" rel="noopener">{t(host)} →</a>'

NOT_A_PLACE = ("the warning", "honestly")
USED_CARDS = []
def fcard(key, c=None):
    c = c or CARDS[key]; USED_CARDS.append(key)
    tag = (c.get("tag") or "").strip()
    out = ['<details class="fcard">',
           f'<summary><span class="fcard__name">{t(c["name"])}</span><span class="fcard__tag">{t(tag)}</span>'
           f'<span class="fcard__teaser">{t(c["teaser"])}</span></summary>', '<div class="fcard__body">']
    if c.get("story"): out.append(f'<p class="fcard__story">{fix_links(c["story_html"]) if c.get("story_html") else t(c["story"])}</p>')
    if c.get("why"):
        w = c["why"]
        if w.startswith("★"): out.append(f'<p class="fcard__why"><span class="tsig">★</span> {t(w.lstrip("★ ").strip())}</p>')
        else: out.append(f'<p class="fcard__why"><b>Why go.</b> {t(w)}</p>')
    out.append(facts_html(c.get("facts")))
    ref = c.get("ref") or ""
    if ref and ref in LANE_OF:
        out.append(f'<p class="fcard__ref"><a href="#venue-{a(ref)}">Full card — the story, hours, address, Maps →</a></p>')
    out.append(site_link(c.get("site", "")))
    if c.get("maps_query") and tag.lower() not in NOT_A_PLACE and not (ref and ref in LANE_OF):
        out.append(f'<a class="fcard__map" href="{maps(c["maps_query"])}" target="_blank" rel="noopener">Open in Google Maps →</a>')
    out += ["</div>", "</details>"]
    return "\n".join(x for x in out if x)

def group_html(g):
    assert len(g["cards"]) <= 3, g["title"]
    return "\n".join(['<div class="fsub">', f'<h4 class="fsub__title">{t(g["title"])}</h4>']
                     + ([f'<p class="fsub__desc">{t(g["desc"])}</p>'] if g.get("desc") else [])
                     + ['<div class="fsub__cards">'] + [fcard(k) for k in g["cards"]] + ["</div>", "</div>"])

def sfold(fid, title, desc, count, body, extra=""):
    return "\n".join([f'<details class="sfold" id="{fid}"{extra}>', "<summary>", "<div>", f'<div class="sfold__title">{t(title)}</div>',
                      f'<div class="sfold__desc">{t(desc)}</div>', "</div>", f'<span class="sfold__count">{t(count)}</span>',
                      '<span class="sfold__chev"></span>', "</summary>", '<div class="sfold__body">', body, "</div>", "</details>"])

def plan_groups(fid):
    p = PLAN[fid]
    if "merges" in p:
        return [g for m in p["merges"] for g in m["groups"]]
    return p["groups"]

FOLDS = {}
def build_fold(fid):
    meta = P.FOLDS[fid]; p = PLAN[fid]; inner = []
    if meta.get("lede"): inner.append(f'<p class="gx-lede">{meta["lede"]}</p>')
    n = 0
    if "merges" in p:
        for m in p["merges"]:
            inner.append(f'<h3 class="gx-merge">{t(m["title"])}</h3>' + (f'\n<p class="gx-merge-desc">{t(m["desc"])}</p>' if m.get("desc") else ""))
            for g in m["groups"]:
                gg = {"title": g["title"], "desc": g.get("desc") or P.GDESC.get((fid, g["title"]), ""), "cards": [c["key"] for c in g["cards"]]}
                inner.append(group_html(gg)); n += len(gg["cards"])
    else:
        for g in p["groups"]:
            gg = {"title": g["title"], "desc": g.get("desc") or P.GDESC.get((fid, g["title"]), ""), "cards": [c["key"] for c in g["cards"]]}
            inner.append(group_html(gg)); n += len(gg["cards"])
    FOLDS[fid] = sfold(fid, meta["title"], meta["desc"], meta.get("count") or f"{n} to know", "\n\n".join(inner))

for fid in PLAN:
    if fid.startswith("_"): continue
    build_fold(fid)

# hot board (foot) + the jump line, events, from hot_events.json
def hot_card(it):
    k = "hot:" + it["name"]; CARDS[k] = {**it, "ref": it.get("venue_ref", "")}
    return k
hot_groups = [{"title": g["title"], "cards": [hot_card(i) for i in g["items"]]} for g in HOT["hot"]["groups"]]
review = HOT["hot"]["review"]; asof = HOT["hot"]["asof"]
def human(iso):
    y, m, d = iso.split("-"); return f"{int(d)} {['January','February','March','April','May','June','July','August','September','October','November','December'][int(m)-1]} {y}"
FOLDS["hot-foot"] = sfold("hot-foot", "What's hot this month",
    f"Checked {human(asof)}. This is the one section that goes stale: review by {human(review)}", "Oct–Nov 2026",
    '<p class="gx-hot-jump">This is the board the line at the top points to — <a href="#why-now">back up to where you saw it</a></p>\n'
    f'<p class="gx-lede">The rest of this guide is written to last. This part is not — it is a dated snapshot of what is on from October into November 2026, checked on {human(asof)}.</p>\n'
    + "\n".join(group_html(g) for g in hot_groups), f' data-hot-asof="{asof}" data-hot-review="{review}"')
WHY_NOW = ('<section class="gx-jump" id="why-now"><span id="hot"></span>\n'
           f'<p><span class="gx-jump__t">What&#x27;s hot this month.</span> Checked {human(asof)} — {t(HOT["hot"]["pointer_line"])} The dated board is at the foot. '
           '<a class="gx-jump__go" href="#hot-foot">What&#x27;s on right now →</a></p>\n'
           f'<p class="gx-jump__meta">The one part of this guide written to go out of date: review by {human(review)}.</p>\n</section>')
ev_groups = [{"title": g["title"], "cards": [hot_card(i) for i in g["items"]]} for g in HOT["events"]["groups"]]
FOLDS["events"] = sfold("events", "The calendar — what is on, and when", "The fixed dates of the year on the north tip and in Stone Town: the music, the film, the holidays, the fast, and the sea's own calendar",
                        f"{sum(len(g['cards']) for g in ev_groups)} dates", "\n".join(group_html(g) for g in ev_groups))

# bars: insert the listening finding as its own group (the hi-fi sub-tag)
lk = hot_card(HOT["listening"])
FOLDS["bars"] = FOLDS["bars"].replace('<div class="fsub">\n<h4 class="fsub__title">Where it stops',
    group_html({"title": "Hi-fi & listening", "desc": "Checked again on " + human(asof) + ": what exists, and what does not.", "cards": [lk]}) + '\n<div class="fsub">\n<h4 class="fsub__title">Where it stops', 1)
assert lk in USED_CARDS

# ── prose blocks reused from the old guide (hand edits live in prose.py) ────
def element(doc, anchor):
    j = doc.find(anchor); assert j >= 0, anchor
    st = doc.rfind("<", 0, j); tag = re.match(r"<(\w+)", doc[st:]).group(1)
    depth, k = 0, st
    for m in re.finditer(rf"<(/?){tag}\b", doc[st:]):
        depth += -1 if m.group(1) else 1
        if depth == 0:
            e = st + m.end(); return doc[st:doc.find(">", e) + 1]
    raise ValueError(anchor)
OLDB = {i: element(OLD, f'id="{i}"') for i in ("bougie", "money-sits", "avoid", "follow", "seasonal", "la-liste", "sources", "tables", "eat", "soul")}
OLDB["etymon"] = element(OLD, 'class="etymon"')
OLDB["hero"] = element(OLD, 'class="hero"')
for k in list(OLDB):
    s = OLDB[k]
    for old, new in P.EDITS.get(k, []):
        assert old in s, (k, old[:80]); s = s.replace(old, new)
    OLDB[k] = fix_links(s)
SOUL = P.soul_fold(OLDB["soul"])

# sources: the method rewritten for this pass, cut venues' own sites out, the 7 Oct checks in
def sources_block(s):
    NOW = ("2026-10-07", "2026-10-08")
    n_conf_8 = sum(1 for i in KEEP if VUP[i]["set"].get("status") == "confirmed" and VUP[i]["set"].get("statusChecked") == "2026-10-08")
    n_conf_now = sum(1 for i in KEEP if VUP[i]["set"].get("status") == "confirmed" and VUP[i]["set"].get("statusChecked") in NOW)
    n_conf_old = sum(1 for i in KEEP if VUP[i]["set"].get("status") == "confirmed" and VUP[i]["set"].get("statusChecked") not in NOW)
    n_unv = sum(1 for i in KEEP if VUP[i]["set"].get("status") == "unverified")
    n_closed = sum(1 for i in KEEP if VUP[i]["set"].get("status") == "closed")
    Pp = lambda x: f'<p style="font-family:Inter,system-ui,sans-serif;font-size:0.85em;color:var(--ink-2)">{x}</p>'
    method = (Pp(f"<strong>Every place in this guide was checked on 22 August 2026 and re-checked on 7 and 8 October 2026.</strong> Of {len(KEEP)} places, "
                 f"<strong>{n_conf_now} were re-confirmed in October</strong> against a 2026-dated source — {n_conf_8} of them on 8 October from their own sites, listings and the venue calendars, "
                 "which is also when every link on this page was tested; "
                 f"<strong>{n_conf_old} stay confirmed from 22 August</strong> — nothing found contradicts them, so they carry the August date; "
                 f"<strong>{n_unv} are marked unverified</strong> on their cards, and <strong>{n_closed} is closed</strong> (the House of Wonders, under restoration). "
                 "Unverified means we did not confirm it, not that it is closed: treat those as leads to call, not bookings to rely on. Prices carry the date they were seen. "
                 "Where sources disagree — the lighthouse's first date, the origin of the name \"Kendwa\", the size of Leven Bank, how long the 1896 war lasted, a few opening hours — "
                 "the disagreement is printed rather than resolved by guesswork.")
              + Pp("<strong>Fewer places, on purpose.</strong> This guide keeps at most three places in each kind of table, picked for what you should not miss on the north tip and what is most particular to it. "
                   f"{NUMW[len(CUT)]} places researched for the August edition are left out, not forgotten; two of them, Cholo's and Bistro' del M@r, because they have closed."))
    s = re.sub(r'<p style="[^"]*"><strong>Every venue in this guide was checked on 22 August 2026\.</strong>.*?</p>', lambda m: method, s, count=1, flags=re.S)
    s = re.sub(r"<strong>Coordinates:</strong> \d+ of \d+ venues carry a map pin", lambda m: f"<strong>Coordinates:</strong> {sum(1 for v in OLDV.values() if v['id'] in KEEP and v.get('lat') is not None)} of {len(KEEP)} places carry a map pin", s, count=1)
    s = s.replace("by <strong>February 2027</strong> at the latest — sooner for the two unresolved addresses.", "by <strong>February 2027</strong> at the latest.")
    for vid in CUT:
        u = OLDV[vid].get("web")
        if u: s = re.sub(r"<li><a href=\"" + re.escape(u) + r"\"[^>]*>.*?</a></li>\n?", "", s)
    seen = set(re.findall(r'href="([^"]+)"', s)); items = []
    def add(src):
        for x in src or []:
            u = (x.get("url") or "").strip()
            u = FIXURL.get(u, u)
            if u.startswith("https://") and u not in seen: seen.add(u); items.append((x.get("label") or u, u))
    for k in USED_CARDS: add(CARDS[k].get("sources"))
    for i in KEEP: add(VUP[i].get("sources"))
    grp = ('<h4 class="fsub__title">Checked again for this guide, 7–8 October 2026</h4><ul class=\'gx-list\'>'
           + "".join((f'<li>{t(l)} (page gone, no archive — Oct 2026)</li>' if u in GONE else f'<li><a href="{a(u)}" target="_blank" rel="noopener">{t(l)}</a></li>') for l, u in items) + "</ul>")
    i = s.rindex("</div>\n</details>"); s = s[:i] + grp + "\n" + s[i:]
    s = re.sub(r'<span class="sfold__count">\d+ sources</span>', lambda m: f'<span class="sfold__count">{len(re.findall("<li><a ", s))} sources</span>', s, count=1)
    return s
# the 8 Oct network pack's link check: 7 dead pages unlinked (name kept), 1 URL encoded
_LK = json.load(open(RV / "research" / "verify_5_network_2026-10-08.json"))["checklinks_2026_10_08"]
GONE = set(_LK["unlink_keep_name"]); FIXURL = {k: v.split(" ")[0] for k, v in _LK["fix_url"].items()}
NUMW = {n: w for n, w in enumerate("zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen twenty".split())}
NUMW.update({20 + n: "Twenty-" + w for n, w in enumerate("x one two three four five six seven eight nine".split()) if n}); NUMW[20] = "Twenty"
NUMW = {k: v[:1].upper() + v[1:] for k, v in NUMW.items()}
OLDB["money-sits"] = re.sub(r' data-bridge-after="[^"]*"', "", OLDB["money-sits"])
TABLES = re.sub(r'<span class="sfold__count">[^<]*</span>', f'<span class="sfold__count">{len(LANE_IDS)} tables</span>', OLDB["tables"], 1)
TABLES = re.sub(r'(<div class="sfold__desc">)[^<]*(</div>)', lambda m: m.group(1) + t(P.TABLES_DESC) + m.group(2), TABLES, 1)

# ── chapters on the chrome ──────────────────────────────────────────────────
def tag(html, tags):
    return re.sub(r'(<(?:details|section) class="(?:sfold|gx-jump)" id="[^"]+")', r'\1 data-tags="%s"' % tags, html, count=1)
GROUP_LBL = {"grande": "Les Grandes Tables", "petite": "Les Petites Tables", "street": "La Rue — The Street"}
TG = ('<nav class="gx-tgroups" data-tags="tables restaurants" aria-label="The kinds of table"><span class="gx-tgroups__lbl">Inside:</span>'
      + "".join(f'<a href="#tables" data-tgroup="{i}">{GROUP_LBL[g]}</a>' for i, g in enumerate(["grande", "petite", "street"])) + "</nav>")
CH = [("place", "band-place", "L’Âme du lieu"), ("tables", "band-tables", "Les Tables"), ("flaner", "band-do", "Flâner"),
      ("sortir", "band-drink", "Boire &amp; sortir"), ("around", "band-around", "Autour"), ("fast", "band-fast", "Sur le pouce"),
      ("practical", "band-close", "Pratique")]
blocks = {
 "place": [tag(SOUL, "place essay"), tag(OLDB["bougie"], "place history"), tag(FOLDS["quartiers"], "place towns"), tag(WHY_NOW, "place when"), tag(OLDB["money-sits"], "place when")],
 "tables": [tag(OLDB["eat"], "tables restaurants"), TG, tag(TABLES, "tables restaurants"), tag(FOLDS["provisioning"], "tables markets")],
 "flaner": [tag(FOLDS[f], f"flaner {PLAN[f]['sub']}") for f in ("tide", "walks", "reef", "sea-stories", "landmarks", "culture", "craft", "coffee-gardens")],
 "sortir": [tag(FOLDS["bars"], "sortir bars listening"), tag(FOLDS["fullmoon"], "sortir moon")],
 "around": [tag(FOLDS["around"], "around trips")],
 "fast": [tag(FOLDS["street-food"], "fast late")],
 "practical": [tag(OLDB["avoid"], "practical"), tag(OLDB["follow"], "practical"), tag(FOLDS["events"], "practical when"), tag(OLDB["seasonal"], "practical when")],
}
chapters = []
for k, bid, title in CH:
    subs = []
    for b_ in blocks[k]:
        m = re.search(r'data-tags="([^"]+)"', b_[:500])
        for tg in m.group(1).split()[1:]:
            if tg not in subs: subs.append(tg)
    sn = ('<nav class="gx-subtags" aria-label="Inside this chapter">' + "".join(
        f'<a class="gx-subtag" href="#{bid}" data-tag="{s}">{H.escape(P.SUB_LABELS[s], quote=False)}</a>' for s in subs) + "</nav>") if len(subs) > 1 else ""
    chapters.append(f'<div class="gx-chapter" data-chapter="{k}">\n<div class="gx-band" id="{bid}"><span class="gx-band__title">{title}</span>'
                    f'<span class="gx-band__sub">{t(P.CHAPTER_SUB[k])}</span></div>\n' + (sn + "\n" if sn else "") + "\n".join(blocks[k]) + "\n</div>")
nav = ('<nav class="band-nav gx-tags" aria-label="Chapters"><a class="band-nav__chip is-on" href="#" data-tag="">All</a>'
       + "".join(f'<a class="band-nav__chip" href="#{bid}" data-tag="{k}">{tt}</a>' for k, bid, tt in CH) + "</nav>")
TAIL = [tag(FOLDS["hot-foot"], "practical when"), tag(OLDB["la-liste"], "practical restaurants"), tag(sources_block(OLDB["sources"]), "practical")]
mid = (OLDB["hero"] + "\n" + OLDB["etymon"] + "\n" + '<div class="container gx-kendwa">\n' + nav + "\n" + P.LEAD + "\n"
       + "\n".join(chapters) + "\n" + '<div class="gx-tail">\n' + "\n".join(TAIL) + "\n</div>\n")
S = CHROME
h0 = S.find('<div class="hero">'); k0 = S.find('<div class="gx-appendix" hidden></div>'); assert 0 < h0 < k0
doc = S[:h0] + mid + S[k0:]
g0 = doc.index("  var G = [", doc.index('<script id="sicily-glossary">')); g1 = doc.index("  ];\n", g0) + len("  ];\n")
doc = doc[:g0] + "  var G = [\n" + ",\n".join("    " + json.dumps(x, ensure_ascii=False) for x in GLOSS) + "\n  ];\n" + doc[g1:]
for x_, y_ in [("gx-sicily", "gx-kendwa"), ('id="sicily-', 'id="kendwa-'), ("Sicilian and Italian words", "Swahili words"),
               ("/* Siracusa: the top-3", "/* Kendwa: the top-3"), ("/* Siracusa — scoped:", "/* Kendwa — scoped:")]:
    doc = doc.replace(x_, y_)
# map popups (page-local chrome script): "Read full entry" only for places that have a table card (18 are map-only),
# and Leaflet's close button carries href="#close", an anchor with no target — make it a plain "#" (Leaflet prevents default).
_pop = "'<a href=\"#venue-'+v.id+'\" onclick="
assert doc.count(_pop) == 1
doc = doc.replace(_pop, "(document.getElementById('venue-'+v.id) ? " + _pop, 1)
doc = doc.replace("Read full entry →</a>'+(v.maps?", "Read full entry →</a>' : '')+(v.maps?", 1)
doc = doc.replace("  window.__terroirMarkers = markers;", "  map.on('popupopen', function (e) { var x = e.popup && e.popup._closeButton; if (x) x.setAttribute('href', '#'); });\n  window.__terroirMarkers = markers;", 1)
assert "x.setAttribute('href', '#')" in doc
doc = re.sub(r"<title>[^<]*</title>", f"<title>{t(P.TITLE)}</title>", doc, count=1)
doc = re.sub(r'(<meta name="description" content=")[^"]*(")', lambda m: m.group(1) + a(P.DESC) + m.group(2), doc, count=1)
doc = doc.replace("/terroir/data/Siracusa-Sicilia.js", f"/terroir/data/{SLUG}.js")
cfg = re.search(r"window\.TERROIR_CONFIG = \{[^}]*\};", OLD).group(0)
doc = re.sub(r"window\.TERROIR_CONFIG = \{[^}]*\};", lambda m: cfg, doc, count=1)
doc = doc.replace("  37.0597, 15.2933 · Ortigia\n</footer>", "  -5.7405, 39.2925 · Kendwa\n</footer>")
assert "-5.7405, 39.2925 · Kendwa" in doc
left = sorted(set(re.findall(r"(?i)sicil\w*|siracusa|ortigia|noto\b|prague|czech", doc)))
assert not left, left

# ── data.js ─────────────────────────────────────────────────────────────────
V = []
for vid in KEEP:
    v = json.loads(json.dumps(OLDV[vid])); u = VUP.get(vid, {})
    for k_, val in (u.get("set") or {}).items(): v[k_] = val
    for k_ in u.get("drop", []): v.pop(k_, None)
    if vid in LANE_OF: v["category"] = LANE_OF[vid]
    else: v.pop("category", None)
    if vid in PICKS["berths"]:
        v["cat"], v["tier"], v["priority"] = "berth", "berth_top", PICKS["berths"].index(vid) + 1
    elif v.get("tier") == "berth_top":
        v["tier"] = "several"
        if v.get("cat") == "berth": v["cat"] = "shop"
    v.pop("charter", None)
    V.append(v)
BY = {v["id"]: v for v in V}
for v in V:
    if v["id"] in VUP and "hot" in VUP[v["id"]]: v["hot_this_month"] = VUP[v["id"]]["hot"]
    elif v.get("hot_this_month"): v.pop("hot_this_month")
OLDCAT = {c["key"]: c for c in D["CATEGORIES"]}
CATS, GOF = [], {}
for k, l in PICKS["lanes"].items():
    c = json.loads(json.dumps(OLDCAT[k])); c["label"] = l["label"]
    if k in P.LANE_LEAD: c["lead"] = P.LANE_LEAD[k]
    if k in P.LANE_STORY: c["story"] = P.LANE_STORY[k]
    CATS.append(c); GOF[k] = D["GROUP_OF"][k]
TABS = {}
for g in ("grande", "petite", "street"):
    old = D["TABLES"][g]
    TABS[g] = {"title": old.get("title", GROUP_LBL[g]), "desc": P.GROUP_DESC.get(g, old.get("desc", "")),
               "sections": [{"label": PICKS["lanes"][k]["label"], "desc": (P.LANE_LEAD.get(k) or OLDCAT[k].get("lead", "")), "ids": PICKS["lanes"][k]["ids"]}
                            for k in PICKS["lanes"] if GOF[k] == g]}
GROUPS = [dict(g) for g in D["GROUPS"]]
for g in GROUPS:
    if g["key"] in P.GROUP_DESC: g["lead"] = P.GROUP_DESC[g["key"]]
for gid, ids in PICKS["shortlist"].items():
    for i in ids: BY[i]["charter"] = P.CHARTER.get(i) or OLDV[i].get("charter") or {
        "price": BY[i].get("price_range", ""), "book": BY[i].get("reservation", ""), "dress": "", "warn": BY[i].get("caveat", ""), "fit": BY[i].get("hook", "")}
BRIDGE = {"_rule": D["BRIDGE"]["_rule"], "doors": P.DOORS,
          "shortlist": {"title": "For guests — plan ahead, or save the night",
                        "desc": "Book ahead for guests, or rescue the evening when the booking falls through. Every name links to its full entry above.",
                        "groups": [{"label": k, "sub": P.SHORT_SUB[k], "ids": v} for k, v in PICKS["shortlist"].items()]}}
NEIGH = [{"name": CARDS[c["key"]]["name"], "desc": CARDS[c["key"]]["teaser"], "maps": maps(CARDS[c["key"]]["maps_query"])}
         for g in PLAN["quartiers"]["groups"] for c in g["cards"] if CARDS[c["key"]].get("maps_query")]
WALKS = [{"name": CARDS[c["key"]]["name"], "desc": CARDS[c["key"]]["teaser"], "maps": maps(CARDS[c["key"]]["maps_query"])}
         for g in PLAN["walks"]["groups"] for c in g["cards"] if CARDS[c["key"]].get("maps_query")]
LANDM = [x for x in D["LANDMARKS"] if not any(w in x["name"] for w in ("House of Wonders",))] + ([] if VUP.get("house-of-wonders", {}).get("set", {}).get("status") == "closed" else [])
prose_all = re.sub(r"<[^>]+>", " ", H.unescape(doc)).lower()
GEMS = [dict(g, story=H.escape(P.GEM_STORY[g["id"]], quote=False)) if g["id"] in P.GEM_STORY else g for g in D["GEMS"] if g["pattern"].lower() in prose_all]
DATA = dict(VENUES=V, COLORS=D["COLORS"], CAT_LABELS=D["CAT_LABELS"], PRODUCT_COLORS=D["PRODUCT_COLORS"], NEIGHBORHOODS=NEIGH or D["NEIGHBORHOODS"],
            WALKS=WALKS, WORK_SPOTS=[w for w in D["WORK_SPOTS"] if not any(c in json.dumps(w) for c in ("Kivulini", "Maisha"))], LANDMARKS=LANDM,
            PHOTOS=D["PHOTOS"], GEMS=GEMS, TABLES=TABS, CATEGORIES=CATS, GROUPS=GROUPS, GROUP_OF=GOF, BRIDGE=BRIDGE)
js = "window.TERROIR_DATA = (function () {\n"
for k_, val in DATA.items():
    if k_ == "VENUES":
        js += "  const VENUES = [\n" + ",\n".join("    " + json.dumps(v, ensure_ascii=False) for v in val) + "\n  ];\n"
    else:
        js += f"  const {k_} = " + json.dumps(val, ensure_ascii=False, indent=1 if k_ in ("BRIDGE",) else None) + ";\n"
js += "  return { " + ", ".join(DATA) + " };\n})();\n"

# ── CSV: the old 24 columns, a row per kept venue, refreshed status/dates/hot ─
rows = list(csv.reader(io.StringIO(OLDCSV))); HDR, body = rows[0], rows[1:]
assert len(body) == len(D["VENUES"]) and all(r[0] == H.unescape(v["name"]) or r[0] == v["name"] for r, v in zip(body, D["VENUES"]))
RO = {v["id"]: r for r, v in zip(body, D["VENUES"])}
ix = {h: i for i, h in enumerate(HDR)}
LANE_LBL = {i: PICKS["lanes"][k]["label"].upper() for i, k in LANE_OF.items()}
out = []
for v in V:
    r = list(RO[v["id"]])
    r[ix["name"]] = v["name"]; r[ix["still_open"]] = v.get("status", ""); r[ix["last_verified"]] = v.get("statusChecked", "")
    r[ix["hot_this_month"]] = v.get("hot_this_month", "")
    for col, fld in (("verdict", "verdict"), ("caveat", "caveat"), ("price_range", "price_range"), ("reservation", "reservation"), ("phone", "phone"), ("address", "address"), ("neighborhood", "neighborhood"), ("best_time", "best_time")):
        if fld in v: r[ix[col]] = v[fld] or ("—" if col == "phone" else "")
    if (v.get("signal_chip") or {}).get("full"): r[ix["recognition"]] = v["signal_chip"]["full"]
    if v["id"] in LANE_LBL: r[ix["tier"]] = LANE_LBL[v["id"]]
    if v["id"] in PICKS["berths"]: r[ix["tier"]] = "THE BERTHS · " + r[ix["tier"]]
    out.append(r)
buf = io.StringIO(); w = csv.writer(buf, lineterminator="\n"); w.writerow(HDR); w.writerows(out)
CSVTXT = buf.getvalue()

# ── the .ics: same list as la liste (edited places), one VTODO per item ────
ICS = OLDICS
for old, new in P.ICS_EDITS:
    assert old in ICS, old; ICS = ICS.replace(old, new)

# ── write ───────────────────────────────────────────────────────────────────
G = REPO / "terroir" / SLUG
(G / "index.html").write_text(doc)
for p in (G / "data.js", REPO / "terroir/data" / f"{SLUG}.js"): p.write_text(js)
for p in (G / "data.csv", REPO / "terroir/csv" / f"{SLUG}.csv"): p.write_text(CSVTXT)
(G / "kendwa-eat-drink-checklist.ics").write_text(ICS)
FC, SF = '<details class="fcard"', '<details class="sfold"'
unused = [k for k in CARDS if k not in USED_CARDS and not k.startswith("hot:")]
print(f"{SLUG}: venues {len(V)} ({len(LANE_IDS)} in {len(CATS)} lanes, {len(V)-len(LANE_IDS)} map-only) · cut {len(CUT)} · "
      f"fcards {doc.count(FC)} · facts {doc.count('fcard__facts')} · folds {doc.count(SF)} · gems {len(GEMS)}")
if unused: print("  cards written but not placed:", unused)
dead = sorted({m for m in re.findall(r'href="#venue-([a-z0-9-]+)"', doc) if m not in LANE_OF})
print("  #venue- links to non-card venues:", dead or "none")
