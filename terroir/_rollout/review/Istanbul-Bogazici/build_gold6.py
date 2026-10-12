#!/usr/bin/env python3
"""Istanbul-Bogazici -> GOLD6 (the Prague standard), 12 Oct 2026. Route B: the reading layer is assembled on the LIVE chrome
of Siracusa-Sicilia (itself cloned from the live Prague page); the locked kit terroir/_assets/guide/* is untouched.
The old guide was GOLD4 (the Istanbul standard), so this build also brings the GOLD5 floor: the #eat jump line, The Dish
inside La liste at the foot, the dated hot board with its pointer, the calendar, the craft section and a third table group.
Inputs, all in this folder:
  picks.json      the editorial cut (lanes <=3, one 4 with its reason, berths, the guest list, cut venues with reasons)
  card_plan.json  which fold cards exist, built from which old cards (merges = told once)
  cards.json      the rewritten cards (hook, story, why, labelled facts) per card key
  venues.json     the re-verified venue records (status, date, corrections, new hook + why)
  hot_events.json the dated hot board and the events calendar
  prose.py        the hand-written prose (lead, essay fold, fold heads, lane stories, doors, exact edits to reused blocks)
  glossary.json   the hover glossary (the place's own words)
The old guide and the chrome are read from origin/rebuild/publishing-system, so the build is repeatable.
Run from the repo root:  python3 terroir/_rollout/review/Istanbul-Bogazici/build_gold6.py"""
import json, re, subprocess, pathlib, html as H, urllib.parse, csv, io, sys
REPO = pathlib.Path(__file__).resolve().parents[4]
RV = pathlib.Path(__file__).resolve().parent
sys.path.insert(0, str(RV))
import prose as P

SLUG, CITY, LSLUG = "Istanbul-Bogazici", "Istanbul", "istanbul"
BASE = "origin/rebuild/publishing-system"
def show(p): return subprocess.run(["git", "show", f"{BASE}:{p}"], cwd=REPO, capture_output=True, text=True, check=True).stdout
OLD = show(f"terroir/{SLUG}/index.html")
CHROME = show("terroir/Siracusa-Sicilia/index.html")
OLDJS = show(f"terroir/data/{SLUG}.js")
OLDCSV = show(f"terroir/csv/{SLUG}.csv")
D = json.loads(subprocess.run(["node", "-e", "global.window={};eval(require('fs').readFileSync(0,'utf8'));"
                               "process.stdout.write(JSON.stringify(window.TERROIR_DATA))"],
                              input=OLDJS, capture_output=True, text=True, check=True).stdout)
J = lambda n: json.load(open(RV / n))
PICKS, PLAN, CARDS, VUP, HOT = J("picks.json"), J("card_plan.json"), J("cards.json"), J("venues.json"), J("hot_events.json")
import glossary_src; GLOSS = glossary_src.G

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
    """#venue- links survive only for venues that render a table card; a kept map-only place
    becomes a pin-hover span; a cut venue becomes plain text. data-pins to cut venues go."""
    def ven(m):
        vid, txt = m.group(1), m.group(2)
        if vid in LANE_OF: return m.group(0)
        if vid in KEEP: return f'<span data-pin="{vid}">{txt}</span>'
        return txt
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
    if c.get("why"):
        out.append(f'<p class="fcard__why"><b>Why go.</b> {t(c["why"])}</p>')
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

FOLDS = {}
def build_fold(fid):
    meta = P.FOLDS[fid]; p = PLAN[fid]; inner = []
    if meta.get("lede"): inner.append(f'<p class="gx-lede">{t(meta["lede"])}</p>')
    n = 0
    def grp(g):
        nonlocal n
        gg = {"title": g["title"], "desc": g.get("desc") or P.GDESC.get((fid, g["title"]), ""), "cards": [c["key"] for c in g["cards"] if c["key"] not in DROP_CARDS]}
        if gg["cards"]: inner.append(group_html(gg)); n += len(gg["cards"])
    if "merges" in p:
        for m in p["merges"]:
            inner.append(f'<h3 class="gx-merge">{t(m["title"])}</h3>' + (f'\n<p class="gx-merge-desc">{t(m["desc"])}</p>' if m.get("desc") else ""))
            for g in m["groups"]: grp(g)
    else:
        for g in p["groups"]: grp(g)
    FOLDS[fid] = sfold(fid, meta["title"], meta["desc"], meta.get("count") or f"{n} to know", "\n\n".join(inner))

DROP_CARDS = set(getattr(P, "DROP_CARDS", []))
for fid in PLAN:
    if fid.startswith("_"): continue
    build_fold(fid)

# hot board (foot) + the jump line, events, from hot_events.json
def hot_card(it):
    k = "hot:" + it["name"]; CARDS[k] = {**it, "ref": it.get("venue_ref", "") if it.get("venue_ref") in LANE_OF else ""}
    return k
hot_groups = [{"title": g["title"], "cards": [hot_card(i) for i in g["items"]]} for g in HOT["hot"]["groups"]]
review = HOT["hot"]["review"]; asof = HOT["hot"]["asof"]
def human(iso):
    y, m, d = iso.split("-"); return f"{int(d)} {['January','February','March','April','May','June','July','August','September','October','November','December'][int(m)-1]} {y}"
FOLDS["hot-foot"] = sfold("hot-foot", "What's hot this month",
    f"Checked {human(asof)}. This is the one section that goes stale: review by {human(review)}", HOT["hot"].get("count", "Oct–Nov 2026"),
    '<p class="gx-hot-jump">This is the board the line at the top points to — <a href="#why-now">back up to where you saw it</a></p>\n'
    f'<p class="gx-lede">The rest of this guide is written to last. This part is not — it is a dated snapshot of what is on from October into November 2026, checked on {human(asof)}.</p>\n'
    + "\n".join(group_html(g) for g in hot_groups), f' data-hot-asof="{asof}" data-hot-review="{review}"')
WHY_NOW = ('<section class="gx-jump" id="why-now"><span id="hot"></span>\n'
           f'<p><span class="gx-jump__t">What&#x27;s hot this month.</span> Checked {human(asof)} — {t(HOT["hot"]["pointer_line"])} The dated board is at the foot. '
           '<a class="gx-jump__go" href="#hot-foot">What&#x27;s on right now →</a></p>\n'
           f'<p class="gx-jump__meta">The one part of this guide written to go out of date: review by {human(review)}.</p>\n</section>')
ev_groups = [{"title": g["title"], "cards": [hot_card(i) for i in g["items"]]} for g in HOT["events"]["groups"]]
FOLDS["events"] = sfold("events", "The calendar — what is on, and when", "The fixed dates of the Istanbul year: the fast and the feasts, the festivals, and the sea's own calendar",
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
OLDB = {i: element(OLD, f'id="{i}"') for i in ("bougie", "money-sits", "avoid", "seasonal", "la-liste", "sources", "tables", "soul", "dish")}
OLDB["etymon"] = element(OLD, 'class="etymon"')
OLDB["hero"] = element(OLD, 'class="hero"')
for k in list(OLDB):
    s = OLDB[k]
    for old, new in P.EDITS.get(k, []):
        assert old in s, (k, old[:80]); s = s.replace(old, new)
    OLDB[k] = fix_links(s)
for k in ("money-sits", "la-liste", "tables"):
    OLDB[k] = re.sub(r' data-bridge-after="[^"]*"', "", OLDB[k])
if getattr(P, "SOUL_DROP_GEMBOX", False):
    n0 = OLDB["soul"].count('<div class="gembox">')
    OLDB["soul"] = re.sub(r'<div class="gembox">.*?<div class="gembox__where">.*?</div></div>', "", OLDB["soul"], count=1, flags=re.S)
    assert OLDB["soul"].count('<div class="gembox">') == n0 - 1
SOUL = P.soul_fold(OLDB["soul"])

# La liste at the foot: the list (cut-venue items out, corrections in), The Dish inside it, the .ics only, a back link
LL = OLDB["la-liste"]
for nm in P.LISTE_DROP:
    n0 = LL.count("<li>"); LL = re.sub(r"<li><b>" + re.escape(nm) + r"</b>.*?</li>", "", LL, count=1, flags=re.S); assert LL.count("<li>") == n0 - 1, nm
for old, new in P.LISTE_EDITS:
    assert old in LL, old; LL = LL.replace(old, new)
LL = re.sub(r'\s*<a class="terroir-btn" href="[^"]+\.txt"[^>]*>.*?</a>', "", LL, count=1, flags=re.S)
LL = re.sub(r' download="[^"]+\.ics"', "", LL)
LL = LL.replace("The first opens straight into the Reminders app as a tickable checklist; the second is plain text for anywhere.",
                "One tap on an iPhone and it opens in the <strong>Reminders</strong> app as its own list — «Istanbul — eat &amp; drink checklist» — each item with its best place and map link.")
LL = LL.replace("Add to Reminders →", "Add the checklist to Reminders →")
assert ".txt" not in LL
N_LISTE = LL.count("<li>")
DISH = OLDB["dish"]
for old, new in P.DISH_EDITS:
    assert old in DISH, old; DISH = DISH.replace(old, new)
arts = DISH[DISH.index('<div class="sfold__body">') + len('<div class="sfold__body">'): DISH.rindex("</div></details>")]
dish_block = ('<div class="gx-liste-dish"><h4 class="fsub__title">The Dish — where the list comes from</h4>'
              '<p class="fsub__desc">The stories behind the canon, and the one detail that separates each real version from the tourist copy.</p>'
              f'<div id="dish" data-grid><div class="sfold__body">{arts}</div></div></div>')
i = LL.rindex("</ol>") + 5; LL = LL[:i] + dish_block + LL[i:]
LL = LL.replace('<div class="sfold__body">', '<div class="sfold__body"><p class="gx-hot-jump"><a href="#eat">Back up to where the list was announced</a></p>', 1)
LL = re.sub(r'(<div class="sfold__title">)[^<]*(</div>)', lambda m: m.group(1) + "La liste — what to eat, what to drink, and where it comes from" + m.group(2), LL, count=1)
nfav = LL.count("gx-fav-chef")
NUMW = "zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen twenty twenty-one twenty-two twenty-three twenty-four twenty-five twenty-six twenty-seven twenty-eight twenty-nine thirty".split()
LL = re.sub(r'(<div class="sfold__desc">).*?(</div>)', lambda m: m.group(1) + f"{NUMW[N_LISTE].capitalize()} things to have eaten and drunk before you leave — {NUMW[nfav]} of them the chef’s own favourites — and the stories behind them. Tap the button and the list lands in your Reminders app." + m.group(2), LL, count=1, flags=re.S)
LL = re.sub(r'<span class="sfold__count">[^<]*</span>', f'<span class="sfold__count">{N_LISTE} to try</span>', LL, count=1)
OLDB["la-liste"] = LL
EAT = P.EAT_JUMP.format(n=N_LISTE)

# the .ics, regenerated from the final list (one VTODO per item, same best place and Maps link)
def ics_esc(s): return s.replace("\\", "\\\\").replace(";", "\\;").replace(",", "\\,").replace("\n", " ")
def txt(s): return re.sub(r"\s+", " ", H.unescape(re.sub(r"<[^>]+>", " ", s))).strip()
todos = []
for n_, m in enumerate(re.finditer(r"<li><b>(.*?)</b>(.*?)</li>", LL, re.S), 1):
    name, body = txt(m.group(1)), m.group(2)
    g = lambda c: txt((re.search(rf'class="{c}">(.*?)</(?:div|span)>', body, re.S) or [None, ""])[1])
    where = g("gx-liste__where").replace("Best place — ", "").replace(" · Maps →", "").strip()
    url = H.unescape((re.search(r'href="([^"]+)"', body) or [None, ""])[1])
    todos.append("\n".join(["BEGIN:VTODO", f"UID:{LSLUG}-liste-{n_}@littoralicious.com", f"SUMMARY:{ics_esc(name + ' — ' + g('gx-liste__what'))}",
                            f"DESCRIPTION:{ics_esc(g('gx-say').replace('say:', 'Say:') + ' ' + g('gx-liste__why') + ' Best: ' + where)}",
                            f"LOCATION:{ics_esc(where)}", f"URL:{url}", "END:VTODO"]))
ICS = "\n".join(["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Littoralicious//Terroir Istanbul//EN", "X-WR-CALNAME:Istanbul — eat & drink checklist"] + todos + ["END:VCALENDAR", ""])

# sources: the method rewritten for this pass, cut venues' own sites out, the 12 Oct checks in
NOW = ("2026-10-12",)
CUT_NAMES = sorted({OLDV[v]["name"] for v in PICKS["cut"]} | {OLDV[v]["name"].split(" (")[0] for v in PICKS["cut"]})
def sources_block(s):
    n_conf_now = sum(1 for i in KEEP if VUP[i]["set"].get("status") == "confirmed" and VUP[i]["set"].get("statusChecked") in NOW)
    n_conf_old = sum(1 for i in KEEP if VUP[i]["set"].get("status") == "confirmed" and VUP[i]["set"].get("statusChecked") not in NOW)
    n_unv = sum(1 for i in KEEP if VUP[i]["set"].get("status") not in ("confirmed",))
    Pp = lambda x: f'<p style="font-family:Inter,system-ui,sans-serif;font-size:0.85em;color:var(--ink-2)">{x}</p>'
    method = (Pp(f"<strong>Every place in this guide was checked between 11 and 17 August 2026 and re-checked on 12 October 2026.</strong> Of {len(KEEP)} places, "
                 f"<strong>{n_conf_now} were re-confirmed on 12 October</strong> against a 2026-dated source (the MICHELIN Guide Türkiye 2026, reviews, posts, listings and the press, read through search: "
                 "own sites could not be loaded from where this pass was made, so those and every link on this page wait for a check from a normal network); "
                 f"<strong>{n_conf_old} stay confirmed from their August check</strong> — nothing found contradicts them, so they carry that date; "
                 f"<strong>{n_unv} carry another status</strong> (unverified, seasonal or closing) on their cards. "
                 "Unverified means we did not confirm it, not that it is closed: treat those as leads to call, not bookings to rely on. "
                 "Prices carry the date they were seen. Where sources disagree — the origin of a dish, a founding date, a few opening hours — "
                 "the disagreement is printed rather than resolved by guesswork.")
              + Pp("<strong>Fewer places, on purpose.</strong> This guide keeps at most three places in each kind of table — one lane keeps four, and says why — picked for what you should not miss in this city and what is most particular to it. "
                   f"{NUMW[len(CUT)].capitalize()} places researched for the August edition are left out, not forgotten."))
    s = re.sub(r'<p style="[^"]*">Every venue in this guide was last cross-checked.*?</p>', lambda m: method, s, count=1, flags=re.S)
    assert method in s
    s = re.sub(r"<p><strong>Liveness\.</strong>.*?</p>", "", s, count=1, flags=re.S)
    s = re.sub(r"<p><strong>Map pins\.</strong>.*?</p>", lambda m: f"<p><strong>Map pins.</strong> Only places geocoded to street level carry a pin — {sum(1 for v in OLDV.values() if v['id'] in KEEP and v.get('lat') is not None)} of {len(KEEP)}. The rest carry a Google Maps link rather than a neighbourhood centroid, because a centroid sends a reader to the wrong street.</p>", s, count=1, flags=re.S)
    for vid in CUT:
        u = OLDV[vid].get("web")
        if u: s = re.sub(r"<li><a href=\"" + re.escape(u) + r"\"[^>]*>.*?</a></li>", "", s)
    s = re.sub(r'<li><a href="[^"]*ph-4[^"]*"[^>]*>.*?</a></li>|<li><a href="https://commons\.wikimedia\.org/wiki/File:Puente_del_B[^"]*"[^>]*>.*?</a></li>', "", s)
    for nm in CUT_NAMES + ["Lips Wine Bar", "Nayah", "june — official site", "Viktor Levi"]:
        s = re.sub(r"<li><a [^>]*>[^<]*" + re.escape(H.escape(nm, quote=False)) + r"[^<]*</a></li>", "", s)
        s = re.sub(r"<li><a [^>]*>[^<]*" + re.escape(nm) + r"[^<]*</a></li>", "", s)
    seen = set(re.findall(r'href="([^"]+)"', s)); items = []
    def add(src):
        for x in src or []:
            u = (x.get("url") or "").strip()
            if u.startswith("https://") and u not in seen: seen.add(u); items.append((x.get("label") or u, u))
    for k in USED_CARDS: add(CARDS[k].get("sources"))
    for i in KEEP: add(VUP[i].get("sources"))
    grp = ('<h4 class="fsub__title">Checked again for this guide, 12 October 2026</h4><ul class=\'gx-list\'>'
           + "".join(f'<li><a href="{a(u)}" target="_blank" rel="noopener">{t(l)}</a></li>' for l, u in items) + "</ul>")
    i = s.rindex("</div></details>"); s = s[:i] + grp + "\n" + s[i:]
    s = re.sub(r'<span class="sfold__count">\d+ sources</span>', lambda m: f'<span class="sfold__count">{len(re.findall("<li><a ", s))} sources</span>', s, count=1)
    return s
TABLES = re.sub(r'<span class="sfold__count">[^<]*</span>', f'<span class="sfold__count">{len(LANE_IDS)} tables</span>', OLDB["tables"], 1)
TABLES = re.sub(r'(<div class="sfold__desc">)[^<]*(</div>)', lambda m: m.group(1) + t(P.TABLES_DESC) + m.group(2), TABLES, 1)

# ── chapters on the chrome ──────────────────────────────────────────────────
def tag(html, tags):
    return re.sub(r'(<(?:details|section) class="(?:sfold|gx-jump)" id="[^"]+")', r'\1 data-tags="%s"' % tags, html, count=1)
TG = ('<nav class="gx-tgroups" data-tags="tables restaurants" aria-label="The kinds of table"><span class="gx-tgroups__lbl">Inside:</span>'
      + "".join(f'<a href="#tables" data-tgroup="{i}">{P.GROUP_LBL[g]}</a>' for i, g in enumerate(["grande", "petite", "street"])) + "</nav>")
CH = [("place", "band-place", "L’Âme du lieu"), ("tables", "band-tables", "Les Tables"), ("flaner", "band-do", "Flâner"),
      ("sortir", "band-drink", "Boire &amp; sortir"), ("around", "band-around", "Autour"), ("fast", "band-fast", "Sur le pouce"),
      ("practical", "band-close", "Pratique")]
blocks = {
 "place": [tag(SOUL, "place essay"), tag(OLDB["bougie"], "place history"), tag(FOLDS["quartiers"], "place towns"), tag(WHY_NOW, "place when"), tag(OLDB["money-sits"], "place when")],
 "tables": [tag(EAT, "tables restaurants"), TG, tag(TABLES, "tables restaurants"), tag(FOLDS["provisioning"], "tables markets")],
 "flaner": [tag(FOLDS[f], f"flaner {PLAN[f]['sub']}") for f in ("walks", "culture", "landmarks", "hammam", "rituals", "craft", "art", "coffee-gardens")],
 "sortir": [tag(FOLDS["bars"], "sortir bars"), tag(FOLDS["listening"], "sortir listening")],
 "around": [tag(FOLDS["around"], "around trips")],
 "fast": [tag(FOLDS["street-food"], "fast late")],
 "practical": [tag(OLDB["avoid"], "practical"), tag(FOLDS["follow"], "practical follow"), tag(FOLDS["events"], "practical when"), tag(OLDB["seasonal"], "practical when")],
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
mid = (OLDB["hero"] + "\n" + OLDB["etymon"] + "\n" + '<div class="container gx-istanbul">\n' + nav + "\n" + P.LEAD + "\n"
       + "\n".join(chapters) + "\n" + '<div class="gx-tail">\n' + "\n".join(TAIL) + "\n</div>\n")
S = CHROME
h0 = S.find('<div class="hero">'); k0 = S.find('<div class="gx-appendix" hidden></div>'); assert 0 < h0 < k0
doc = S[:h0] + mid + S[k0:]
_seen = (re.sub(r"<[^>]+>", " ", H.unescape(mid)) + " " + OLDJS + " " + json.dumps(VUP, ensure_ascii=False)).lower()
GLOSS = [g for g in GLOSS if re.search(r"(?<![\w])" + re.escape(g[0].lower()) + r"(?![\w])", _seen)]
json.dump(GLOSS, open(RV / "glossary.json", "w"), ensure_ascii=False, indent=0)
g0 = doc.index("  var G = [", doc.index('<script id="sicily-glossary">')); g1 = doc.index("  ];\n", g0) + len("  ];\n")
doc = doc[:g0] + "  var G = [\n" + ",\n".join("    " + json.dumps(x, ensure_ascii=False) for x in GLOSS) + "\n  ];\n" + doc[g1:]
for x_, y_ in [("gx-sicily", "gx-istanbul"), ('id="sicily-', 'id="istanbul-'), ("Sicilian and Italian words", "Turkish words"),
               ("/* Siracusa: the top-3", "/* Istanbul: the top-3"), ("/* Siracusa — scoped:", "/* Istanbul — scoped:")]:
    doc = doc.replace(x_, y_)
# map popups (page-local chrome script): "Read full entry" only for places that have a table card,
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
doc = doc.replace("  37.0597, 15.2933 · Ortigia\n</footer>", "  41.0082, 28.9784 · Istanbul\n</footer>")
assert "41.0082, 28.9784 · Istanbul" in doc
left = sorted(set(re.findall(r"(?i)sicil\w*|siracusa|ortigia|\bnoto\b|prague|czech|diani|kendwa", doc)))
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
GROUP_OF = {k: g for g, ks in PICKS["groups"].items() for k in ks}
for k, l in PICKS["lanes"].items():
    c = json.loads(json.dumps(OLDCAT[k])); c["label"] = l["label"]
    if k in P.LANE_LEAD: c["lead"] = P.LANE_LEAD[k]
    src = P.LANE_STORY_FROM.get(k)
    if src: c["story"] = json.loads(json.dumps(OLDCAT[src]["story"]))
    if P.LANE_STORY.get(k): c["story"] = P.LANE_STORY[k]
    for old, new in P.LANE_STORY_EDITS.get(k, []):
        assert old in c["story"]["story"], (k, old); c["story"]["story"] = c["story"]["story"].replace(old, new)
    assert c.get("story") and c["story"].get("story"), k
    CATS.append(c); GOF[k] = GROUP_OF[k]
TABS = {}
for g in ("grande", "petite", "street"):
    old = D["TABLES"].get(g, {})
    TABS[g] = {"title": old.get("title", P.GROUP_LBL[g]), "desc": P.GROUP_DESC.get(g, old.get("desc", "")),
               "sections": [{"label": PICKS["lanes"][k]["label"], "desc": (P.LANE_LEAD.get(k) or OLDCAT[k].get("lead", "")), "ids": PICKS["lanes"][k]["ids"]}
                            for k in PICKS["lanes"] if GOF[k] == g]}
GROUPS = [dict(g) for g in D["GROUPS"]] + [{"key": "street", "label": P.GROUP_LBL["street"], "lead": ""}]
for g in GROUPS:
    if g["key"] in P.GROUP_DESC: g["lead"] = P.GROUP_DESC[g["key"]]
for gid, ids in PICKS["shortlist"].items():
    for i in ids:
        BY[i]["charter"] = P.CHARTER.get(i) or {"price": BY[i].get("price_range", ""), "book": BY[i].get("reservation", ""), "warn": BY[i].get("caveat", ""), "fit": BY[i].get("hook", "")}
BRIDGE = {"_rule": D["BRIDGE"]["_rule"], "doors": P.DOORS,
          "shortlist": {"title": "For guests — plan ahead, or save the night",
                        "desc": "Book ahead for guests, or rescue the evening when the booking falls through. Every name links to its full entry above.",
                        "groups": [{"label": k, "sub": P.SHORT_SUB[k], "ids": v} for k, v in PICKS["shortlist"].items()]}}
def plan_cards(f): return [c for g in (PLAN[f]["groups"] if "groups" in PLAN[f] else [g for m in PLAN[f]["merges"] for g in m["groups"]]) for c in g["cards"]]
NEIGH = [{"name": CARDS[c["key"]]["name"], "desc": CARDS[c["key"]]["teaser"], "maps": maps(CARDS[c["key"]]["maps_query"])}
         for c in plan_cards("quartiers") if CARDS[c["key"]].get("maps_query")]
WALKS = [{"name": CARDS[c["key"]]["name"], "desc": CARDS[c["key"]]["teaser"], "maps": maps(CARDS[c["key"]]["maps_query"])}
         for c in plan_cards("walks") if CARDS[c["key"]].get("maps_query")]
WORK = [{"name": CARDS[c["key"]]["name"], "desc": CARDS[c["key"]]["teaser"], "maps": maps(CARDS[c["key"]]["maps_query"])}
        for c in plan_cards("coffee-gardens") if CARDS[c["key"]].get("maps_query")]
prose_all = re.sub(r"<[^>]+>", " ", H.unescape(doc)).lower()
for g in D["GEMS"]: g["pattern"] = g["pattern"].replace("\\ ", " ")
GEMS = [dict(g, story=H.escape(P.GEM_STORY[g["id"]], quote=False)) if g["id"] in P.GEM_STORY else g for g in D["GEMS"]
        if g["pattern"].lower() in prose_all]
DATA = dict(VENUES=V, COLORS=D["COLORS"], CAT_LABELS=D["CAT_LABELS"], PRODUCT_COLORS=D["PRODUCT_COLORS"], NEIGHBORHOODS=NEIGH or D["NEIGHBORHOODS"],
            WALKS=WALKS, WORK_SPOTS=WORK, LANDMARKS=D["LANDMARKS"],
            PHOTOS=D["PHOTOS"][:3], GEMS=GEMS, TABLES=TABS, CATEGORIES=CATS, GROUPS=GROUPS, GROUP_OF=GOF, BRIDGE=BRIDGE)
js = "window.TERROIR_DATA = (function () {\n"
for k_, val in DATA.items():
    if k_ == "VENUES":
        js += "  const VENUES = [\n" + ",\n".join("    " + json.dumps(v, ensure_ascii=False) for v in val) + "\n  ];\n"
    else:
        js += f"  const {k_} = " + json.dumps(val, ensure_ascii=False, indent=1 if k_ in ("BRIDGE",) else None) + ";\n"
js += "  return { " + ", ".join(DATA) + " };\n})();\n"

# ── CSV: the old 24 columns, a row per kept venue, refreshed status/dates/hot ─
rows = list(csv.reader(io.StringIO(OLDCSV))); HDR, body = rows[0], rows[1:]
# the old CSV carried a row per venue, then a row per fold card; GOLD6 keeps the venue rows (the cards live in the page)
body = body[:len(D["VENUES"])]
assert all(H.unescape(r[0]) == H.unescape(v["name"]) for r, v in zip(body, D["VENUES"]))
RO = {v["id"]: r for r, v in zip(body, D["VENUES"])}
ix = {h: i for i, h in enumerate(HDR)}
LANE_LBL = {i: PICKS["lanes"][k]["label"].upper() for i, k in LANE_OF.items()}
out = []
for v in V:
    r = list(RO[v["id"]])
    r[ix["name"]] = v["name"]; r[ix["still_open"]] = v.get("status", ""); r[ix["last_verified"]] = v.get("statusChecked", "")
    r[ix["hot_this_month"]] = v.get("hot_this_month", "")
    for col, fld in (("verdict", "verdict"), ("caveat", "caveat"), ("price_range", "price_range"), ("reservation", "reservation"), ("phone", "phone"), ("address", "address"), ("neighborhood", "neighborhood"), ("best_time", "best_time")):
        if col in ix and fld in v: r[ix[col]] = v[fld] or ("—" if col == "phone" else "")
    if (v.get("signal_chip") or {}).get("full") and "recognition" in ix: r[ix["recognition"]] = v["signal_chip"]["full"]
    if v["id"] in LANE_LBL: r[ix["tier"]] = LANE_LBL[v["id"]]
    if v["id"] in PICKS["berths"]: r[ix["tier"]] = "THE BERTHS · " + r[ix["tier"]]
    out.append(r)
buf = io.StringIO(); w = csv.writer(buf, lineterminator="\n"); w.writerow(HDR); w.writerows(out)
CSVTXT = buf.getvalue()

import fixes
for a_, b_ in fixes.TEXT[:4]:   # the spelling and the two-star wording, across the reused old blocks too
    doc = doc.replace(a_, b_); js = js.replace(a_, b_); CSVTXT = CSVTXT.replace(a_, b_)
# ── write ───────────────────────────────────────────────────────────────────
G = REPO / "terroir" / SLUG
(G / "index.html").write_text(doc)
for p in (G / "data.js", REPO / "terroir/data" / f"{SLUG}.js"): p.write_text(js)
for p in (G / "data.csv", REPO / "terroir/csv" / f"{SLUG}.csv"): p.write_text(CSVTXT)
(G / f"{LSLUG}-eat-drink-checklist.ics").write_text(ICS)
(G / f"{LSLUG}-eat-drink-checklist.txt").unlink(missing_ok=True)
FC, SF = '<details class="fcard"', '<details class="sfold"'
unused = [k for k in CARDS if k not in USED_CARDS and not k.startswith("hot:") and k not in DROP_CARDS]
print(f"{SLUG}: venues {len(V)} ({len(LANE_IDS)} in {len(CATS)} lanes, {len(V)-len(LANE_IDS)} map-only) · cut {len(CUT)} · "
      f"fcards {doc.count(FC)} · facts {doc.count('fcard__facts')} · folds {doc.count(SF)} · gems {len(GEMS)} · liste {N_LISTE} · ics {len(todos)}")
if unused: print("  cards written but not placed:", unused)
dead = sorted({m for m in re.findall(r'href="#venue-([a-z0-9-]+)"', doc) if m not in LANE_OF})
print("  #venue- links to non-card venues:", dead or "none")
