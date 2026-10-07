#!/usr/bin/env python3
"""GOLD6 §8 — THE FOUR READINGS (Arnaud, 7 Oct 2026; first built on Prague-Cechy).

    python3 apply_readings.py <repo>/terroir/<Slug> <readings.json> [--check-config <path>]

Turns a GOLD6 guide's doors into four readings and adds the two card rules that go with them:
  · ONE NIGHT      → a lens (#t=onenight): one evening per quarter, in walking order
  · DIG-IN, GUESTS → unchanged
  · THE GETAWAY WEEKEND (4th door) → a lens (#t=getaway): Friday night to Sunday afternoon
  · the four doors repeated at the FOOT of the article; no lens chip in the chapter bar
  · every card with a place shows its Google Maps link on the CLOSED card (tiles + table cards);
    a card with no place gets none (the house pin rule)

A lens is a hidden chapter (`data-lens`) that the guide's own filter shows alone; it never appears in the
whole-guide view. Content comes from readings.json (schema: README.md here) and every link in it is a
ref — `[[venue:<id>|text]]` or `[[card:<exact card name>|text]]` — resolved against the guide, so a dead
link fails the build instead of shipping. Every fact must come from the guide's own cards (verified).

Works on any guide whose reading layer was cloned from Prague's chrome (`*-tags-js`); refuses otherwise.
Idempotent: refuses to run twice. Writes index.html, data.js and terroir/data/<Slug>.js (kept identical).
"""
import html, json, re, subprocess, sys
from pathlib import Path

args = sys.argv[1:]
if len(args) < 2:
    sys.exit(__doc__)
G, RJ = Path(args[0]), Path(args[1])
CHECK = Path(args[args.index("--check-config") + 1]) if "--check-config" in args else None
slug = G.name
IDX, DJS = G / "index.html", G / "data.js"
CENTRAL = G.parent / "data" / f"{slug}.js"
s, js = IDX.read_text(), DJS.read_text()
R = json.loads(RJ.read_text())

if 'data-chapter="onenight"' in s or 'data-chapter="getaway"' in s:
    sys.exit("already applied (a reading lens is already in the page)")
tags_js = re.search(r'<script id="([a-z]+)-tags-js">', s)
if not tags_js:
    sys.exit("no *-tags-js reading layer: build GOLD6 §2 first")
PFX = tags_js.group(1)

def fail(msg):
    sys.exit("READINGS FAIL: " + msg)

def esc(t):
    return html.escape(t, quote=True)

# ---------- venues, from data.js itself (node evaluates it exactly as the browser does)
out = subprocess.run(["node", "-e", """
global.window={};eval(require('fs').readFileSync(process.argv[1],'utf8'));
const D=window.TERROIR_DATA;process.stdout.write(JSON.stringify({V:D.VENUES.map(v=>({id:v.id,name:v.name,maps:v.maps||''})),B:D.BRIDGE||null}));
""", str(DJS)], capture_output=True, text=True)
if out.returncode:
    fail("node could not evaluate data.js: " + out.stderr[:300])
DATA = json.loads(out.stdout)
VEN = {v["id"]: v for v in DATA["V"]}
if not DATA["B"] or len(DATA["B"].get("doors", [])) != 3:
    fail("expected a BRIDGE with exactly 3 doors (One Night · Dig-In · For Guests)")

# ---------- cards: find by exact visible name, give an id, read its Maps link
CARD_IDS = {m.group(1) for m in re.finditer(r'<details class="fcard" id="card-([a-z0-9-]+)"', s)}
CARD_OF = {}

def card(name):
    global s
    if name in CARD_OF:
        return CARD_OF[name]
    hits = []
    for m in re.finditer(r'<details class="fcard"( id="card-[a-z0-9-]+")?>\s*<summary><span class="fcard__name">(.*?)</span>', s, re.S):
        if html.unescape(re.sub(r"<[^>]+>", "", m.group(2))).strip() == name:
            hits.append(m)
    if not hits:
        fail(f"card not found by exact name: {name!r}")
    m = hits[0]
    if m.group(1):
        key = m.group(1)[9:-1]
    else:
        base = re.sub(r"[^a-z0-9]+", "-", html.unescape(name).lower().encode("ascii", "ignore").decode()).strip("-")[:40] or "card"
        key, n = base, 2
        while key in CARD_IDS:
            key, n = f"{base}-{n}", n + 1
        CARD_IDS.add(key)
        s = s[:m.start()] + f'<details class="fcard" id="card-{key}">' + s[m.start() + len('<details class="fcard">'):]
    start = s.index(f'id="card-{key}"')
    body = s[start:s.index("</details>", start)]
    mm = re.search(r'href="(https://www\.google\.com/maps/search/\?api=1&(?:amp;)?query=[^"]+)"', body)
    if not mm:
        r = re.search(r'class="fcard__ref"><a href="#venue-([a-z0-9-]+)"', body)
        mm_url = VEN.get(r.group(1), {}).get("maps", "") if r else ""
    else:
        mm_url = mm.group(1)
    CARD_OF[name] = (f"#card-{key}", mm_url)
    return CARD_OF[name]

def ref(r):
    """'venue:<id>' or 'card:<name>' → (href, maps)"""
    kind, _, val = r.partition(":")
    if kind == "venue":
        if val not in VEN:
            fail(f"unknown venue id: {val!r}")
        return (f"#venue-{val}", VEN[val]["maps"])
    if kind == "card":
        return card(val)
    fail(f"bad ref {r!r} (use venue:<id> or card:<exact name>)")

def inline(t):
    """[[venue:id|text]] / [[card:Name|text]] → links; everything else is authored HTML (strong/em only)."""
    def sub(m):
        href, _ = ref(m.group(1))
        return f'<a href="{href}">{m.group(2)}</a>'
    t = re.sub(r"\[\[([a-z]+:[^|\]]+)\|([^\]]+)\]\]", sub, t)
    if re.search(r"<(?!/?(?:strong|em|a)\b)[a-z]", t):
        fail("only <strong>, <em> and [[refs]] are allowed in text: " + t[:80])
    return t

def pinlink(maps, cls="gx-rd__pin"):
    return f' <a class="{cls}" href="{maps}" target="_blank" rel="noopener">Maps →</a>' if maps else ""

# ---------- ONE NIGHT: one evening per quarter
N = R["onenight"]
qs = []
for q in N["quarters"]:
    if not 2 <= len(q["steps"]) <= 5:
        fail(f"quarter {q['name']!r}: 2–5 steps")
    li = []
    for st in q["steps"]:
        href, maps = ref(st["ref"])
        li.append(f'<li><time>{esc(st["time"])}</time><div><b><a href="{href}">{esc(st["name"])}</a></b> '
                  f'{inline(st["text"])}{pinlink(maps)}</div></li>')
    after = f'<p class="gx-night__after">{inline(q["after"])}</p>' if q.get("after") else ""
    qs.append(f'<article class="gx-night" id="night-{q["id"]}"><h3>{esc(q["name"])}</h3>'
              f'<p class="gx-night__line">{inline(q["line"])}</p><ol>{"".join(li)}</ol>{after}</article>')
if not 3 <= len(qs) <= 10:
    fail("ONE NIGHT needs 3–10 quarters")
idx = "".join(f'<a href="#night-{q["id"]}">{esc(q["name"].split(" · ")[0])}</a>' for q in N["quarters"])
nights = f'''<div class="gx-chapter gx-lens" data-chapter="onenight" data-lens data-readout="One evening · {len(qs)} quarters" hidden>
<div class="gx-band" id="band-onenight"><span class="gx-band__title">{esc(N.get("title", "Une nuit"))}</span></div>
<section class="gx-nights" id="onenight" data-tags="onenight">
<p class="gx-rd__kicker">{esc(N["kicker"])}</p>
<p class="gx-nights__lede">{inline(N["lede"])}</p>
<nav class="gx-nights__index">{idx}</nav>
{"".join(qs)}
<p class="gx-rd__foot"><a href="#" data-tag="">× Show the whole guide</a></p>
</section>
</div>
'''

# ---------- THE GETAWAY WEEKEND: Friday night to Sunday afternoon
W = R["getaway"]
days, nstops = [], 0
for d in W["days"]:
    li = []
    for st in d["stops"]:
        href, maps = ref(st["ref"])
        go = f'<a href="{href}">Full card →</a>' + (f'<a href="{maps}" target="_blank" rel="noopener">Maps →</a>' if maps else "")
        li.append(f'<li><time>{esc(st["time"])}</time><div><b>{esc(st["name"])}</b><p>{inline(st["text"])}</p>'
                  f'<p class="gx-weekend__meta">{inline(st["meta"])}</p><p class="gx-weekend__go">{go}</p></div></li>')
        nstops += 1
    days.append(f'<h3 class="gx-weekend__day"><span>{esc(d["label"])}</span>{esc(d["title"])}</h3>'
                f'<ol class="gx-weekend__line">{"".join(li)}</ol>')
book = "".join(f'<li>{inline(b)}</li>' for b in W.get("book", []))
more = ""
for m in W.get("more", []):
    dated = f'<p class="gx-weekend__dated">{esc(m["dated"])}</p>' if m.get("dated") else ""
    body = ("<ul>" + "".join(f"<li>{inline(x)}</li>" for x in m["items"]) + "</ul>") if m.get("items") else f'<p>{inline(m["text"])}</p>'
    more += f'<div><h4>{esc(m["title"])}</h4>{dated}{body}</div>'
getaway = f'''<div class="gx-chapter gx-lens" data-chapter="getaway" data-lens data-readout="Friday night to Sunday · {nstops} stops" hidden>
<div class="gx-band" id="band-getaway"><span class="gx-band__title">{esc(W.get("title", "Le week-end"))}</span></div>
<section class="gx-weekend" id="getaway" data-tags="getaway">
<p class="gx-rd__kicker gx-rd__kicker--brick">{esc(W["kicker"])}</p>
<p class="gx-weekend__lede">{inline(W["lede"])}</p>
{f'<div class="gx-weekend__book"><h4>Book before you fly</h4><ul>{book}</ul></div>' if book else ''}
{"".join(days)}
{f'<div class="gx-weekend__more">{more}</div>' if more else ''}
<p class="gx-rd__foot"><a href="#" data-tag="">× Show the whole guide</a></p>
</section>
</div>
'''
if not 8 <= nstops <= 18:
    fail(f"GETAWAY needs 8–18 stops (has {nstops})")

anchor = '<div class="gx-chapter" data-chapter="place">'
if s.count(anchor) != 1:
    fail("no unique place chapter to anchor the lenses before")
s = s.replace(anchor, nights + getaway + anchor)

# ---------- the guide's own filter: lenses stay out of the whole-guide view; the readout names a lens
PATCH = [
    ("    all('.gx-chapter', box).forEach(function (c) { c.hidden = false; });\n    box.classList.remove('is-filtered', 'is-sub'); active = '';",
     "    all('.gx-chapter', box).forEach(function (c) { c.hidden = c.hasAttribute('data-lens'); });\n    box.classList.remove('is-filtered', 'is-sub', 'is-lens'); active = '';"),
    ("    box.classList.add('is-filtered'); box.classList.toggle('is-sub', !chapter); active = tag;",
     "    box.classList.add('is-filtered'); box.classList.toggle('is-sub', !chapter); box.classList.toggle('is-lens', !!$('.gx-chapter[data-lens][data-chapter=\"' + tag + '\"]')); active = tag;"),
    ("var a = e.target.closest && e.target.closest('.gx-tags .band-nav__chip, .gx-subtag, .gx-readout a');",
     "var a = e.target.closest && e.target.closest('.gx-tags .band-nav__chip, .gx-subtag, .gx-readout a, .gx-rd__foot a');"),
    ("if (!t || t.closest('.band-nav, .gx-subtags, .gx-readout')) return;",
     "if (!t || t.closest('.band-nav, .gx-subtags, .gx-readout, .gx-rd__foot')) return;"),
    ("b.textContent = (c ? c.textContent : chap) + (s && tag !== chap ? ' · ' + s.textContent : '');",
     "var bt = head(chap) && head(chap).querySelector('.gx-band__title');\n    b.textContent = (c ? c.textContent : (bt ? bt.textContent : chap)) + (s && tag !== chap ? ' · ' + s.textContent : '');"),
    ("    sp.textContent = folds + (folds === 1 ? ' section · ' : ' sections · ') + cards + (cards === 1 ? ' card' : ' cards');",
     "    var lens = $('.gx-chapter[data-lens][data-chapter=\"' + chap + '\"]');\n    sp.textContent = lens ? (lens.getAttribute('data-readout') || '') : folds + (folds === 1 ? ' section · ' : ' sections · ') + cards + (cards === 1 ? ' card' : ' cards');"),
]
for a, b in PATCH:
    if s.count(a) != 1:
        fail(f"filter script patch point not found once: {a.strip()[:70]}")
    s = s.replace(a, b)

# ---------- CSS + JS (shared files, copied next to this script)
here = Path(__file__).parent
css = (here / "readings.css").read_text()
jsx = (here / "readings.js").read_text()
marker = f'<script id="{PFX}-tags-js">'
s = s.replace(marker, f'<style id="gold6-readings">\n{css}</style>\n' + marker, 1)
s = s.replace(f'<script id="{PFX}-glossary">', f'<script id="gold6-readings-js">\n{jsx}</script>\n<script id="{PFX}-glossary">', 1) \
    if f'<script id="{PFX}-glossary">' in s else s.replace("</body>", f'<script id="gold6-readings-js">\n{jsx}</script>\n</body>', 1)
if 'id="gold6-readings-js"' not in s:
    fail("could not place the readings script")

# ---------- data.js: ONE NIGHT becomes a lens, a fourth door
m = re.search(r"const BRIDGE = ", js)
obj, end = json.JSONDecoder().raw_decode(js, m.end())
doors = obj["doors"]
if doors[0]["fr"] != "One Night":
    fail("first door is not One Night")
doors[0].update({"en": N["door_en"], "note": N.get("door_note", doors[0].get("note", "")), "href": "#t=onenight", "open": []})
doors.append({"fr": W.get("door_fr", "The Getaway Weekend"), "en": W["door_en"], "note": W["door_note"], "href": "#t=getaway", "open": []})
js = js[:m.end()] + json.dumps(obj, ensure_ascii=False, indent=1) + js[end:]

IDX.write_text(s)
DJS.write_text(js)
if CENTRAL.exists():
    CENTRAL.write_text(js)
if CHECK and CHECK.exists():
    c = json.loads(CHECK.read_text())
    c["doors"] = 4
    CHECK.write_text(json.dumps(c, ensure_ascii=False, indent=2) + "\n")
print(f"ok {slug}: One Night {len(qs)} quarters · Getaway {nstops} stops · {len(CARD_OF)} cards linked")
