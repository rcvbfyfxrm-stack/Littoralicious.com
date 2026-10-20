#!/usr/bin/env python3
"""Girona-Catalunya -> GOLD6 (the Prague standard), 20 Oct 2026. Route B: the reading layer is assembled on the LIVE chrome of
Siracusa-Sicilia (itself cloned from the live Prague page); the locked kit terroir/_assets/guide/* is untouched. Same pipeline as Costa Brava (19 Oct).
The old guide was GOLD3-era (31 venue records in 13 table sections, tcard folds, the #tables-extended tier fold, no lane stories, no guest list), so this build also brings the GOLD4/5 floor it never had:
table lanes with food stories and three groups, dishes on every table, the guest list (BRIDGE) with charters, the #eat jump line and La liste (with The Dish inside it) at the foot,
the dated hot board with its #why-now pointer, the calendar, the craft section, the listening room, rooms to linger, Autour.
Inputs, all in this folder:
  picks.json      the editorial cut (lanes <=3, berths, the guest list, cut venues with reasons)   <- make_plan.py
  card_plan.json  every fold, its groups and cards, and the old card each is built from              <- make_plan.py
  cards.json      the rewritten cards (hook, story, why, labelled facts) per card key                <- make_inputs.py
  venues.json     the re-verified venue records (status, date, corrections, new hook + why)          <- make_inputs.py
  hot_events.json the dated hot board and the events calendar                                        <- make_inputs.py
  prose.py        the hand-written prose (lead, essay, fold heads, lane stories, doors, La liste, glossary, exact edits)
The old guide and the chrome are read from origin/rebuild/publishing-system, so the build is repeatable.
Run from the repo root:  python3 terroir/_rollout/review/Girona-Catalunya/build_gold6.py"""
import json, re, subprocess, pathlib, html as H, urllib.parse, csv, io, sys
REPO = pathlib.Path(__file__).resolve().parents[4]
RV = pathlib.Path(__file__).resolve().parent
sys.path.insert(0, str(RV))
import prose as P

SLUG, CITY, LSLUG = "Girona-Catalunya", "Girona", "girona"
NOW = "2026-10-20"
LOCAL = r"(?i)\b(Spain|Girona|Catalunya|Catalonia|Costa Brava)\b"
LOCAL_ADD = "+Girona+Spain"
BASE = "origin/rebuild/publishing-system"
def show(p): return subprocess.run(["git", "show", f"{BASE}:{p}"], cwd=REPO, capture_output=True, text=True, check=True).stdout
OLD = show(f"terroir/{SLUG}/index.html")
CHROME = show("terroir/Siracusa-Sicilia/index.html")
OLDJS = show(f"terroir/data/{SLUG}.js")
D = json.loads(subprocess.run(["node", "-e", "global.window={};eval(require('fs').readFileSync(0,'utf8'));"
                               "process.stdout.write(JSON.stringify(window.TERROIR_DATA))"],
                              input=OLDJS, capture_output=True, text=True, check=True).stdout)
J = lambda n: json.load(open(RV / n))
PICKS, PLAN, CARDS, VUP, HOT = J("picks.json"), J("card_plan.json"), J("cards.json"), J("venues.json"), J("hot_events.json")
LS = J("lane_stories.json")   # the lane food stories, drafted by the venue packs, edited in fixes.py / prose.py

# ── the venue set ───────────────────────────────────────────────────────────
LANE_IDS = [i for l in PICKS["lanes"].values() for i in l["ids"]]
assert len(LANE_IDS) == len(set(LANE_IDS)), "a venue belongs to exactly one lane"
for k, l in PICKS["lanes"].items(): assert len(l["ids"]) <= 3 or k in PICKS["fours"], k
KEEP = LANE_IDS + PICKS["keep_pins"]
OLDV = {v["id"]: v for v in D["VENUES"]}
CUT = set(OLDV) - set(KEEP)
assert CUT == set(PICKS["cut"]), (CUT ^ set(PICKS["cut"]))
LANE_OF = {i: k for k, l in PICKS["lanes"].items() for i in l["ids"]}

def t(s): return H.escape(s or "", quote=False)
def a(s): return H.escape(s or "", quote=True)
def maps(q): return "https://www.google.com/maps/search/?api=1&query=" + urllib.parse.quote_plus(q)

def fix_links(s):
    """#venue- links survive only for venues that render a table card; a kept map-only place becomes a pin-hover span;
    a cut venue becomes plain text. The old page linked '#<id>' with a data-pin: those become '#venue-<id>'."""
    def ven(m):
        vid, txt = m.group(1), m.group(2)
        if vid in LANE_OF: return m.group(0)
        if vid in KEEP: return f'<span data-pin="{vid}">{txt}</span>'
        return txt
    s = re.sub(r'<a href="#venue-([a-z0-9-]+)" data-pin="p?-?\1">', r'<a href="#venue-\1">', s)
    s = re.sub(r' data-pin="p-(v[a-z0-9-]+)"', lambda m: "", s)
    s = re.sub(r' data-pin="([a-z0-9-]+)"', lambda m: "" if m.group(1) in CUT else m.group(0), s)
    s = re.sub(r'<a href="#([a-z0-9-]+)" data-pin="\1">', lambda m: f'<a href="#venue-{m.group(1)}">' if m.group(1) in OLDV else m.group(0), s)
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
    if c.get("story"): out.append(f'<p class="fcard__story">{t(c["story"])}</p>')
    if c.get("story_html"): out.append(f'<p class="fcard__story">{c["story_html"]}</p>')
    if c.get("why"): out.append(f'<p class="fcard__why"><b>Why go.</b> {t(c["why"])}</p>')
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

COUNT_WORD = {"quartiers": "quarters", "provisioning": "addresses", "walks": "routes", "culture": "stops", "craft": "to know",
              "coffee-gardens": "corners", "bars": "to know", "listening": "to know", "around": "to know", "follow": "sources"}
FOLDS = {}
DROP_CARDS = set(getattr(P, "DROP_CARDS", []))
for fid, p in PLAN.items():
    if fid.startswith("_"): continue
    meta = P.FOLDS[fid]; inner = []; n = 0
    if meta.get("lede"): inner.append(f'<p class="gx-lede">{t(meta["lede"])}</p>')
    for g in p["groups"]:
        gg = {"title": g["title"], "desc": g.get("desc") or P.GDESC.get((fid, g["title"]), ""), "cards": [c["key"] for c in g["cards"] if c["key"] not in DROP_CARDS]}
        if gg["cards"]: inner.append(group_html(gg)); n += len(gg["cards"])
    FOLDS[fid] = sfold(fid, meta["title"], meta["desc"], meta.get("count") or f"{n} {COUNT_WORD.get(fid, 'to know')}", "\n\n".join(inner))

# hot board (foot) + the jump line, events, from hot_events.json
def hot_card(it):
    k = "hot:" + it["name"]; CARDS[k] = {**it, "ref": it.get("venue_ref", "") if it.get("venue_ref") in LANE_OF else ""}
    return k
hot_groups = [{"title": g["title"], "desc": g.get("desc", ""), "cards": [hot_card(i) for i in g["items"]]} for g in HOT["hot"]["groups"]]
review = HOT["hot"]["review"]; asof = HOT["hot"]["asof"]
MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']
def human(iso):
    y, m, d = iso.split("-"); return f"{int(d)} {MONTHS[int(m)-1]} {y}"
FOLDS["hot-foot"] = sfold("hot-foot", "What's hot this month",
    f"Checked {human(asof)}. This is the one section that goes stale: review by {human(review)}", HOT["hot"].get("count", "Oct–Nov 2026"),
    '<p class="gx-hot-jump">This is the board the line at the top points to — <a href="#why-now">back up to where you saw it</a></p>\n'
    f'<p class="gx-lede">The rest of this guide is written to last. This part is not — it is a dated snapshot of what is on from mid-October into November 2026, the city’s fair week and the turn of the year, checked on {human(asof)}.</p>\n'
    + "\n".join(group_html(g) for g in hot_groups), f' data-hot-asof="{asof}" data-hot-review="{review}"')
WHY_NOW = ('<section class="gx-jump" id="why-now"><span id="hot"></span>\n'
           f'<p><span class="gx-jump__t">What&#x27;s hot this month.</span> Checked {human(asof)} — {t(HOT["hot"]["pointer_line"])} The dated board is at the foot. '
           '<a class="gx-jump__go" href="#hot-foot">What&#x27;s on right now →</a></p>\n'
           f'<p class="gx-jump__meta">The one part of this guide written to go out of date: review by {human(review)}.</p>\n</section>')
ev_groups = [{"title": g["title"], "desc": g.get("desc", ""), "cards": [hot_card(i) for i in g["items"]]} for g in HOT["events"]["groups"]]
FOLDS["events"] = sfold("events", "The calendar — what is on, and when", P.EVENTS_DESC,
                        f"{sum(len(g['cards']) for g in ev_groups)} dates", "\n".join(group_html(g) for g in ev_groups))

# ── prose blocks reused from the old guide (hand edits live in prose.py) ────
def element(doc, anchor):
    j = doc.find(anchor); assert j >= 0, anchor
    st = doc.rfind("<", 0, j); tag = re.match(r"<(\w+)", doc[st:]).group(1)
    depth = 0
    for m in re.finditer(rf"<(/?){tag}\b", doc[st:]):
        depth += -1 if m.group(1) else 1
        if depth == 0:
            e = st + m.end(); return doc[st:doc.find(">", e) + 1]
    raise ValueError(anchor)
OLDB = {i: element(OLD, f'id="{i}"') for i in ("seasonal", "sources")}
OLDB["tables"] = element(CHROME, 'id="tables"')   # the kit's empty table container, from the chrome (the old page had the tier lists)
for k in list(OLDB):
    s = OLDB[k]
    for old, new in P.EDITS.get(k, []):
        assert old in s, (k, old[:80]); s = s.replace(old, new)
    OLDB[k] = fix_links(s)
SOUL = P.soul_fold()
BOUGIE = fix_links(P.bougie())
SEASONAL = OLDB["seasonal"]
# the five-column month table scrolls inside its own box on a phone, never the page
SEASONAL = re.sub(r'(<table\b[^>]*>)', r'<div style="overflow-x:auto;max-width:100%">\1', SEASONAL, count=1).replace("</table>", "</table></div>", 1)
assert SEASONAL.count('overflow-x:auto;max-width:100%') == 1
for old, new in HOT.get("seasonal_edits", []):
    assert old in SEASONAL, old; SEASONAL = SEASONAL.replace(old, new)

# La liste at the foot: authored list, The Dish inside it, the .ics, a back link
def liste_li(it):
    name, say, fav, what, why, where, q = it
    return (f'<li><b>{t(name)}</b> <span class="gx-say">say: {t(say)}</span>' + ('<span class="gx-fav-chef">le préféré du chef</span>' if fav else "")
            + f'<div class="gx-liste__what">{t(what)}</div><div class="gx-liste__why">{t(why)}</div>'
            + f'<div class="gx-liste__where"><b>Best place</b> — {t(where)} · <a href="{maps(q)}" target="_blank" rel="noopener">Maps →</a></div></li>')
N_LISTE = len(P.LISTE); nfav = sum(1 for x in P.LISTE if x[2])
NUMW = "zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen twenty twenty-one twenty-two twenty-three twenty-four twenty-five".split()
arts = fix_links(P.dish_articles(OLD))
dish_block = ('<div class="gx-liste-dish"><h4 class="fsub__title">The Dish — where the list comes from</h4>'
              f'<p class="fsub__desc">{t(P.DISH_DESC)}</p>'
              f'<div id="dish" data-grid><div class="sfold__body">{arts}</div></div></div>')
LL_BODY = ('<p class="gx-hot-jump"><a href="#eat">Back up to where the list was announced</a></p>'
           f'<p><a class="terroir-btn terroir-btn--primary" href="/terroir/{SLUG}/{LSLUG}-eat-drink-checklist.ics">Add the checklist to Reminders →</a>'
           '<span style="font-family:Inter,system-ui,sans-serif;font-size:0.78em;color:var(--ink-3);display:block;margin-top:6px">One tap on an iPhone and it opens in the '
           f'<strong>Reminders</strong> app as its own list — «{CITY} — eat &amp; drink checklist» — each item with its best place and map link.</span></p>'
           '<ol class="gx-liste">' + "".join(liste_li(x) for x in P.LISTE) + "</ol>" + dish_block)
LL = sfold("la-liste", P.LISTE_TITLE, "", f"{N_LISTE} to try", "@@LLBODY@@")
LL = LL.replace("@@LLBODY@@", LL_BODY).replace('<div class="sfold__desc"></div>',
     f'<div class="sfold__desc">{NUMW[N_LISTE].capitalize()} things to have eaten and drunk before you leave — {NUMW[nfav]} of them the chef’s own favourites — and the stories behind them. Tap the button and the list lands in your Reminders app.</div>')
EAT = P.EAT_JUMP.format(n=N_LISTE)

def ics_esc(s): return s.replace("\\", "\\\\").replace(";", "\\;").replace(",", "\\,").replace("\n", " ")
todos = []
for n_, (name, say, fav, what, why, where, q) in enumerate(P.LISTE, 1):
    todos.append("\n".join(["BEGIN:VTODO", f"UID:{LSLUG}-liste-{n_}@littoralicious.com", f"SUMMARY:{ics_esc(name + ' — ' + what)}",
                            f"DESCRIPTION:{ics_esc('Say: ' + say + '. ' + why + ' Best: ' + where)}", f"LOCATION:{ics_esc(where)}", f"URL:{maps(q)}", "END:VTODO"]))
ICS = "\n".join(["BEGIN:VCALENDAR", "VERSION:2.0", f"PRODID:-//Littoralicious//Terroir {CITY}//EN", f"X-WR-CALNAME:{CITY} — eat & drink checklist"] + todos + ["END:VCALENDAR", ""])

# sources: the old list, the method rewritten, the 20 Oct checks in
CUT_NAMES = sorted({OLDV[v]["name"] for v in PICKS["cut"]})
def sources_block(s):
    st = lambda i: VUP.get(i, {}).get("set", {})
    n_conf = sum(1 for i in KEEP if st(i).get("status") == "confirmed")
    n_other = len(KEEP) - n_conf
    Pp = lambda x: f'<p style="font-family:Inter,system-ui,sans-serif;font-size:0.85em;color:var(--ink-2)">{x}</p>'
    method = (Pp(f"<strong>Every place in this guide was researched in June and July 2026 and re-checked on 20 October 2026.</strong> Of {len(KEEP)} tables, "
                 f"<strong>{n_conf} were confirmed trading in 2026</strong> against a 2026-dated source (the MICHELIN Guide, the Repsol guide, Ara, Diari de Girona, El Punt Avui, the Ajuntament, "
                 "reviews, posts, listings and the press, read through search: own sites could not be loaded from where this pass was made, so those and every link on this page "
                 f"wait for a check from a normal network); <strong>{n_other} carry another status</strong> on their cards. Unverified means we did not confirm it, not that it is closed: "
                 "treat those as leads to call, not bookings to rely on. Prices carry the date they were seen. Where sources disagree — the origin of a dish, a founding date, "
                 "a few opening hours — the disagreement is printed rather than resolved by guesswork.")
              + Pp("<strong>Fewer places, on purpose.</strong> This guide keeps at most three places in each kind of table and in each group of cards, "
                   f"picked for what you should not miss in Girona and what is most particular to it. {NUMW[len(CUT)].capitalize()} places from the earlier edition are left out, not forgotten.")
              + Pp(f"<strong>Map pins.</strong> Only places geocoded to street level carry a pin — {sum(1 for i in KEEP if OLDV[i].get('lat') is not None)} of {len(KEEP)}. "
                   "No coordinate was invented."))
    s = s.replace('<div class="sfold__body">', '<div class="sfold__body">' + method, 1)
    s = P.sources_edit(s)
    seen = set(re.findall(r'href="([^"]+)"', s)); items = []
    def add(src):
        for x in src or []:
            u = (x.get("url") or "").strip()
            if u.startswith("https://") and u not in seen: seen.add(u); items.append((x.get("label") or u, u))
    for k in USED_CARDS: add(CARDS[k].get("sources"))
    for i in KEEP: add(VUP.get(i, {}).get("sources"))
    grp = ('<h4 class="fsub__title">Checked again for this guide, 20 October 2026</h4><ul class=\'gx-list\'>'
           + "".join(f'<li><a href="{a(u)}" target="_blank" rel="noopener">{t(l)}</a></li>' for l, u in items) + "</ul>")
    i = s.rindex("</div></details>"); s = s[:i] + grp + "\n" + s[i:]
    s = re.sub(r'<span class="sfold__count">[^<]*</span>', lambda m: f'<span class="sfold__count">{len(re.findall("<li><a ", s))} sources</span>', s, count=1)
    return s
TABLES = OLDB["tables"].replace('<details class="sfold" id="tables" open>', '<details class="sfold" id="tables">')
TABLES = re.sub(r'<span class="sfold__count">[^<]*</span>', f'<span class="sfold__count">{len(LANE_IDS)} tables</span>', TABLES, 1)
TABLES = re.sub(r'(<div class="sfold__desc">)[^<]*(</div>)', lambda m: m.group(1) + t(P.TABLES_DESC) + m.group(2), TABLES, 1)

# ── chapters on the chrome ──────────────────────────────────────────────────
def tag(html, tags):
    n0 = html.count("data-tags=")
    out = re.sub(r'(<(?:details|section) class="(?:sfold|gx-jump)" id="[^"]+")', r'\1 data-tags="%s"' % tags, html, count=1)
    assert out.count("data-tags=") == n0 + 1, html[:120]
    return out
TG = ('<nav class="gx-tgroups" data-tags="tables restaurants" aria-label="The kinds of table"><span class="gx-tgroups__lbl">Inside:</span>'
      + "".join(f'<a href="#tables" data-tgroup="{i}">{P.GROUP_LBL[g]}</a>' for i, g in enumerate(["grande", "petite", "street"])) + "</nav>")
CH = [("place", "band-place", "L’Âme du lieu"), ("tables", "band-tables", "Les Tables"), ("flaner", "band-do", "Flâner"),
      ("sortir", "band-drink", "Boire &amp; sortir"), ("around", "band-around", "Autour"), ("practical", "band-close", "Pratique")]
SUB = lambda f: PLAN[f]["sub"]
blocks = {
 "place": [tag(SOUL, "place essay"), tag(BOUGIE, "place history"), tag(FOLDS["quartiers"], "place quarters"), tag(FOLDS["curiosities"], "place curious"), tag(WHY_NOW, "place when")],
 "tables": [tag(EAT, "tables restaurants"), TG, tag(TABLES, "tables restaurants"), tag(FOLDS["provisioning"], "tables markets")],
 "flaner": [tag(FOLDS[f], f"flaner {SUB(f)}") for f in ("walks", "culture", "craft", "coffee-gardens")],
 "sortir": [tag(FOLDS["bars"], "sortir bars"), tag(FOLDS["listening"], "sortir listening")],
 "around": [tag(FOLDS["around"], "around trips")],
 "practical": [tag(FOLDS["avoid"], "practical skip"), tag(FOLDS["follow"], "practical follow"), tag(FOLDS["events"], "practical when"), tag(SEASONAL, "practical when")],
}
chapters = []
for k, bid, title in CH:
    subs = []
    for b_ in blocks[k]:
        m = re.search(r'data-tags="([^"]+)"', b_[:600])
        for tg in m.group(1).split()[1:]:
            if tg not in subs: subs.append(tg)
    sn = ('<nav class="gx-subtags" aria-label="Inside this chapter">' + "".join(
        f'<a class="gx-subtag" href="#{bid}" data-tag="{s}">{H.escape(P.SUB_LABELS[s], quote=False)}</a>' for s in subs) + "</nav>") if len(subs) > 1 else ""
    chapters.append(f'<div class="gx-chapter" data-chapter="{k}">\n<div class="gx-band" id="{bid}"><span class="gx-band__title">{title}</span>'
                    f'<span class="gx-band__sub">{t(P.CHAPTER_SUB[k])}</span></div>\n' + (sn + "\n" if sn else "") + "\n".join(blocks[k]) + "\n</div>")
nav = ('<nav class="band-nav gx-tags" aria-label="Chapters"><a class="band-nav__chip is-on" href="#" data-tag="">All</a>'
       + "".join(f'<a class="band-nav__chip" href="#{bid}" data-tag="{k}">{tt}</a>' for k, bid, tt in CH) + "</nav>")
TAIL = [tag(FOLDS["hot-foot"], "practical when"), tag(LL, "practical restaurants"), tag(sources_block(OLDB["sources"]), "practical")]
mid = (P.HERO + "\n" + P.ETYMON + "\n" + '<div class="container gx-girona">\n' + nav + "\n" + P.LEAD + "\n"
       + "\n".join(chapters) + "\n" + '<div class="gx-tail">\n' + "\n".join(TAIL) + "\n</div>\n")
S = CHROME
h0 = S.find('<div class="hero">'); k0 = S.find('<div class="gx-appendix" hidden></div>'); assert 0 < h0 < k0
doc = S[:h0] + mid + S[k0:]
# guide-extras.js (locked kit) inserts a 'Neighbouring ports' row before appendix.firstChild.nextSibling when a guide has neighbours;
# a comment node gives the empty appendix a first child, so it never throws; nothing visible changes.
doc = doc.replace('<div class="gx-appendix" hidden></div>', '<div class="gx-appendix" hidden><!-- neighbouring ports --></div>', 1)
_seen = (re.sub(r"<[^>]+>", " ", H.unescape(mid)) + " " + json.dumps(VUP, ensure_ascii=False)).lower()
GLOSS = [g for g in P.GLOSS if re.search(r"(?<![\w])" + re.escape(g[0].lower()) + r"(?![\w])", _seen)]
json.dump(GLOSS, open(RV / "glossary.json", "w"), ensure_ascii=False, indent=0)
g0 = doc.index("  var G = [", doc.index('<script id="sicily-glossary">')); g1 = doc.index("  ];\n", g0) + len("  ];\n")
doc = doc[:g0] + "  var G = [\n" + ",\n".join("    " + json.dumps(x, ensure_ascii=False) for x in GLOSS) + "\n  ];\n" + doc[g1:]
for x_, y_ in [("gx-sicily", "gx-girona"), ('id="sicily-', 'id="girona-'), ("Sicilian and Italian words", "Catalan and Spanish words"),
               ("/* Siracusa: the top-3", "/* Girona: the top-3"), ("/* Siracusa — scoped:", "/* Girona — scoped:")]:
    doc = doc.replace(x_, y_)
_pop = "'<a href=\"#venue-'+v.id+'\" onclick="
if doc.count(_pop) == 1:
    doc = doc.replace(_pop, "(document.getElementById('venue-'+v.id) ? " + _pop, 1)
    doc = doc.replace("Read full entry →</a>'+(v.maps?", "Read full entry →</a>' : '')+(v.maps?", 1)
if "x.setAttribute('href', '#')" not in doc:
    doc = doc.replace("  window.__terroirMarkers = markers;", "  map.on('popupopen', function (e) { var x = e.popup && e.popup._closeButton; if (x) x.setAttribute('href', '#'); });\n  window.__terroirMarkers = markers;", 1)
doc = re.sub(r"<title>[^<]*</title>", f"<title>{t(P.TITLE)}</title>", doc, count=1)
doc = re.sub(r'(<meta name="description" content=")[^"]*(")', lambda m: m.group(1) + a(P.DESC) + m.group(2), doc, count=1)
doc = doc.replace("/terroir/data/Siracusa-Sicilia.js", f"/terroir/data/{SLUG}.js")
cfg = re.search(r"window\.TERROIR_CONFIG = \{[^}]*\};", OLD).group(0)
# the old config: portName 'Girona', radius 12 km (the fort, Taialà and the Banyoles road inside; the Empordà estate pinned outside the frame);
# zoom 15 framed only the Barri Vell, so the map opens at zoom 14 on the same centre
assert "portName:'Girona'" in cfg
cfg = cfg.replace("zoom:15", "zoom:14"); assert "zoom:14" in cfg
doc = re.sub(r"window\.TERROIR_CONFIG = \{[^}]*\};", lambda m: cfg, doc, count=1)
doc = doc.replace("  37.0597, 15.2933 · Ortigia\n</footer>", "  41.9862, 2.8247 · Girona · the Onyar\n</footer>")
assert "41.9862, 2.8247 · Girona" in doc
# the page-local CSS styles a 'fast' chapter this guide does not have; the gate reads its selector as an anchor
doc = doc.replace('.gx-girona .band-nav__chip[href="#band-fast"],', '')
# chrome leftovers that name the other city (og tags, canonical, comments)
doc = doc.replace("Siracusa-Sicilia", SLUG).replace("gem boxes (Barcelona device)", "gem boxes (the kit's device)")
left = sorted(set(re.findall(r"(?i)sicil\w*|siracusa|ortigia|\bnoto\b|czech|diani|kendwa|istanbul|\bparis\b|toulon|tropez", doc)))
if left: print("  !! other-city tokens left in the page:", left)

# ── data.js ─────────────────────────────────────────────────────────────────
V = []
for vid in KEEP:
    v = json.loads(json.dumps(OLDV[vid])); u = VUP.get(vid, {})
    tg = v.get("tags") or []
    if not v.get("price_range"):
        pr = [x for x in tg if re.search(r"EUR|€", x)]
        if pr: v["price_range"] = pr[0] + " (seen Jul 2026)"
    if not v.get("reservation"):
        rs = [x for x in tg if re.search(r"(?i)book|reserv|walk-in|queue", x)]
        if rs: v["reservation"] = rs[0]
    for k_ in ("section", "sectionRank", "subcat", "money_eats"): v.pop(k_, None)
    for k_, val in (u.get("set") or {}).items(): v[k_] = val
    # the old tag rows carried July claims the re-check overturned (a Green Star no 2026 source shows, 'Dinner Tue–Sat', a one-star tag
    # on a two-star house): the chips are rebuilt from the verified record only — the quarter and the honest status line
    v["tags"] = [x for x in (v.get("neighborhood", ""), "Confirmed trading 2026 (checked 20 Oct)" if v.get("status") == "confirmed"
                             else "Not confirmed for 2026 — call ahead") if x]
    for k_, val in (u.get("set") or {}).items(): v[k_] = val
    for k_ in u.get("drop", []): v.pop(k_, None)
    # the kit renders hours, not a season field: a seasonal house shows its 2026 season first, then its hours
    if v.get("season"):
        se = v.pop("season")
        v["hours"] = se + (" · " + v["hours"] if v.get("hours") else "")
    if vid in LANE_OF: v["category"] = LANE_OF[vid]
    if vid in PICKS["berths"]:
        v["cat"], v["tier"], v["priority"] = "berth", "berth_top", PICKS["berths"].index(vid) + 1
    elif v.get("tier") == "berth_top":
        v["tier"] = "several"
        if v.get("cat") == "berth": v["cat"] = "shop"
    v.pop("charter", None)
    if v.get("maps"): v["maps"] = v["maps"].replace("'", "%27")   # an apostrophe ends the link for every parser that reads quoted attributes
    if v.get("maps") and not re.search(LOCAL, urllib.parse.unquote_plus(v["maps"])): v["maps"] += LOCAL_ADD   # the gate's local-token rule
    V.append(v)
BY = {v["id"]: v for v in V}
for v in V:
    h = (HOT.get("venue_hot") or {}).get(v["id"])
    if h: v["hot_this_month"] = h
    else: v.pop("hot_this_month", None)
CATS, GOF = [], {}
for k, l in PICKS["lanes"].items():
    CATS.append({"key": k, "label": l["label"], "lead": P.LANE_LEAD[k], "story": P.LANE_STORY.get(k) or LS[k]}); GOF[k] = l["group"]
TABS = {}
for g in ("grande", "petite", "street"):
    TABS[g] = {"title": P.GROUP_LBL[g], "desc": P.GROUP_DESC[g],
               "sections": [{"label": l["label"], "desc": P.LANE_LEAD[k], "ids": l["ids"]} for k, l in PICKS["lanes"].items() if l["group"] == g]}
GROUPS = [{"key": g, "label": P.GROUP_LBL[g], "lead": P.GROUP_DESC[g]} for g in ("grande", "petite", "street")]
for gid, ids in PICKS["shortlist"].items():
    for i in ids:
        v = BY[i]
        BY[i]["charter"] = P.CHARTER.get(i) or {k_: x for k_, x in (("price", v.get("price_range", "")), ("book", v.get("reservation", "")),
                                                                     ("warn", v.get("caveat", "")), ("fit", v.get("hook", ""))) if x}
BRIDGE = {"_rule": "SINGLE-EDITOR RULE: charter{} on a venue deliberately duplicates booking truth held in its reservation/price_range/caveat prose. Any commit editing those fields on a shortlist venue MUST update its charter block in the same commit, and lead-time grouping below must be re-verified at write time.",
          "doors": P.DOORS,
          "shortlist": {"title": "For guests — plan ahead, or save the night",
                        "desc": "Book ahead for guests, or rescue the evening when the booking falls through. Every name links to its full entry above.",
                        "groups": [{"label": k, "sub": P.SHORT_SUB[k], "ids": v} for k, v in PICKS["shortlist"].items()]}}
def plan_cards(f): return [c for g in PLAN[f]["groups"] for c in g["cards"]]
def geo(f): return [{"name": CARDS[c["key"]]["name"], "desc": CARDS[c["key"]]["teaser"], "maps": maps(CARDS[c["key"]]["maps_query"])}
                    for c in plan_cards(f) if CARDS[c["key"]].get("maps_query")]
for l_ in D["LANDMARKS"]:   # the gate's local-token rule, on the old landmark links too
    if l_.get("maps_url"): l_["maps_url"] = l_["maps_url"].replace("'", "%27")   # an apostrophe (S'Alqueria) ends the link for quoted-attribute parsers
    if l_.get("maps_url") and not re.search(LOCAL, urllib.parse.unquote_plus(l_["maps_url"])): l_["maps_url"] += LOCAL_ADD
prose_all = re.sub(r"<[^>]+>", " ", H.unescape(doc)).lower()
GEMS = [g for g in P.GEMS if g["pattern"].lower() in prose_all]
assert len(GEMS) == len(P.GEMS), [g["pattern"] for g in P.GEMS if g["pattern"].lower() not in prose_all]
DATA = dict(VENUES=V, COLORS=D["COLORS"], CAT_LABELS=D["CAT_LABELS"], PRODUCT_COLORS=D["PRODUCT_COLORS"], NEIGHBORHOODS=geo("quartiers") or D["NEIGHBORHOODS"],
            WALKS=geo("walks"), WORK_SPOTS=geo("coffee-gardens"), LANDMARKS=D["LANDMARKS"],
            PHOTOS=P.PHOTOS, GEMS=GEMS, TABLES=TABS, CATEGORIES=CATS, GROUPS=GROUPS, GROUP_OF=GOF, BRIDGE=BRIDGE)
js = "window.TERROIR_DATA = (function () {\n"
for k_, val in DATA.items():
    if k_ == "VENUES":
        js += "  const VENUES = [\n" + ",\n".join("    " + json.dumps(v, ensure_ascii=False) for v in val) + "\n  ];\n"
    else:
        js += f"  const {k_} = " + json.dumps(val, ensure_ascii=False, indent=1 if k_ in ("BRIDGE",) else None) + ";\n"
js += "  return { " + ", ".join(DATA) + " };\n})();\n"

# ── CSV: the 24-column contract, a row per kept venue ───────────────────────
HDR = ["name", "category", "neighborhood", "address", "phone", "lat", "lng", "tier", "product_tags", "recognition", "what_to_order", "price_range",
       "reservation", "best_time", "notes", "verdict", "caveat", "best_night", "hot_this_month", "source_tier", "maps", "still_open", "last_verified", "geo_precision"]
GRP_LBL = {"grande": "Grande Table", "petite": "Petite Table", "street": "La Rue"}
out = []
for v in V:
    lane = PICKS["lanes"][LANE_OF[v["id"]]]
    tier = lane["label"].upper() if v["id"] not in PICKS["berths"] else "THE BERTHS · " + lane["label"].upper()
    out.append([v["name"], GRP_LBL[lane["group"]], v.get("neighborhood", ""), v.get("address", ""), v.get("phone", "") or "—",
                v.get("lat") if v.get("lat") is not None else "", v.get("lng") if v.get("lng") is not None else "", tier,
                "|".join(v.get("productTags") or []), (v.get("signal_chip") or {}).get("full", ""),
                "|".join(d["name"] for d in v.get("dishes") or []), v.get("price_range", ""), v.get("reservation", ""), v.get("best_time", ""),
                v.get("signature", ""), v.get("verdict", ""), v.get("caveat", ""), v.get("best_night", ""), v.get("hot_this_month", ""), "canon",
                v.get("maps", ""), v.get("status", ""), v.get("statusChecked", ""), "venue" if v.get("lat") is not None else "none"])
buf = io.StringIO(); w = csv.writer(buf, lineterminator="\n"); w.writerow(HDR); w.writerows(out)
CSVTXT = buf.getvalue()

# ── write ───────────────────────────────────────────────────────────────────
G = REPO / "terroir" / SLUG
(G / "index.html").write_text(doc)
for p in (G / "data.js", REPO / "terroir/data" / f"{SLUG}.js"): p.write_text(js)
for p in (G / "data.csv", REPO / "terroir/csv" / f"{SLUG}.csv"): p.write_text(CSVTXT)
(G / f"{LSLUG}-eat-drink-checklist.ics").write_text(ICS)
FC, SF = '<details class="fcard"', '<details class="sfold"'
unused = [k for k in CARDS if k not in USED_CARDS and not k.startswith("hot:") and k not in DROP_CARDS]
print(f"{SLUG}: venues {len(V)} ({len(LANE_IDS)} in {len(CATS)} lanes, {len(V)-len(LANE_IDS)} map-only) · cut {len(CUT)} · "
      f"fcards {doc.count(FC)} · facts {doc.count('fcard__facts')} · folds {doc.count(SF)} · gems {len(GEMS)} · liste {N_LISTE} · ics {len(todos)} · gloss {len(GLOSS)}")
if unused: print("  cards written but not placed:", unused)
dead = sorted({m for m in re.findall(r'href="#venue-([a-z0-9-]+)"', doc) if m not in LANE_OF})
print("  #venue- links to non-card venues:", dead or "none")
