#!/usr/bin/env python3
"""Prague-Cechy post-step 2 (5 Oct 2026), run AFTER trim_2026_10_05.py on the same built page.
Arnaud: "make all the cards … more interesting and complete so people are really captivated."
Applies rewrite/*.json (fold -> card name -> {tag?, teaser, story | line, why?, facts?}) to every kept
fcard, and rewrite/venues.json (id -> {hook, why}) to data.js (both copies). Keeps on each card: the
labelled facts block, the 'Full card' pointer, the site and Maps links, any Unverified / Closing notice.
Every kept card must have a rewrite (asserted)."""
import json, re, sys, html, glob, pathlib
REPO = pathlib.Path(sys.argv[1]); HERE = pathlib.Path(__file__).parent
G = REPO / "terroir" / "Prague-Cechy"
IDX, DJS, DJS2 = G / "index.html", G / "data.js", REPO / "terroir" / "data" / "Prague-Cechy.js"
MARK = "<!-- rewrite 2026-10-05 -->"
doc = IDX.read_text()
assert "<!-- trim 2026-10-05 -->" in doc, "run trim_2026_10_05.py first"
assert MARK not in doc, "already rewritten"
R = {}
for f in sorted(glob.glob(str(HERE / "rewrite" / "*.json"))):
    if f.endswith("venues.json"): continue
    for fold, cards in json.load(open(f)).items():
        for name, v in cards.items(): R[(fold, name)] = v
VW = json.load(open(HERE / "rewrite" / "venues.json"))
ALLOWED = ("strong", "em", "b", "i")
def t(s):
    s = html.escape(s or "", quote=False)
    for tg in ALLOWED: s = s.replace(f"&lt;{tg}&gt;", f"<{tg}>").replace(f"&lt;/{tg}&gt;", f"</{tg}>")
    return s
def name_of(c):
    m = re.search(r'<span class="fcard__name">(.*?)</span>', c, re.S)
    return html.unescape(re.sub(r"<[^>]+>", "", m.group(1))).strip()
TIP = {"events", "hot-foot", "follow", "street-food"}
def why_html(fold, w):
    if w.startswith("★"):
        return f'<p><span class="tsig">★</span> {t(w.lstrip("★ ").strip())}</p>'
    if w.startswith("Missing:"):
        return f'<p><b>Missing:</b> {t(w[8:].strip())}</p>'
    lab = "Instead." if fold == "avoid" else ("Tip." if fold in TIP else "Why go.")
    return f'<p class="fcard__why"><b>{lab}</b> {t(w)}</p>'
done, used = 0, set()
fold = None
def per_card(m, fold):
    global done
    c = m.group(0); n = name_of(c); k = (fold, n)
    assert k in R, f"no rewrite for {k}"
    v = R[k]; used.add(k)
    if v.get("tag"): c = re.sub(r'(<span class="fcard__tag">).*?(</span>)', lambda x: x.group(1) + t(v["tag"]) + x.group(2), c, count=1)
    c = re.sub(r'(<span class="fcard__teaser">).*?(</span>)', lambda x: x.group(1) + t(v["teaser"]) + x.group(2), c, count=1, flags=re.S)
    b0 = c.index('<div class="fcard__body">') + len('<div class="fcard__body">'); b1 = c.rindex("</div>")
    body = c[b0:b1]
    keep = []
    for p in re.findall(r'<p><em>Unverified.*?</p>|<p><strong>Closing soon.*?</p>', body, re.S): keep.append(p)
    dl = re.search(r'<dl class="fcard__facts">.*?</dl>', body, re.S)
    ref = re.search(r'<p class="fcard__ref">.*?</p>', body, re.S)
    links = re.findall(r'<a class="fcard__(?:site|map)".*?</a>', body, re.S)
    facts = dl.group(0) if dl else ""
    if v.get("facts"):
        add = "".join(f"<div><dt>{t(a)}</dt><dd>{t(b)}</dd></div>" for a, b in v["facts"])
        facts = re.sub(r'<div><dt>(%s)</dt><dd>.*?</dd></div>' % "|".join(re.escape(a) for a, _ in v["facts"]), "", facts) if facts else ""
        facts = (facts[:-5] + add + "</dl>") if facts else f'<dl class="fcard__facts">{add}</dl>'
    out = []
    if v.get("story"): out.append(f'<p class="fcard__story">{t(v["story"])}</p>')
    if v.get("line"): out.append(f'<p class="fcard__line">{t(v["line"])}</p>')
    if v.get("why"): out.append(why_html(fold, v["why"]))
    see = [f'<p class="fcard__ref"><a href="{h}">{t(lbl)}</a></p>' for h, lbl in v.get("see", [])]
    out += keep + ([facts] if facts else []) + ([ref.group(0)] if ref else []) + see + links
    done += 1
    return c[:b0] + "\n" + "\n".join(out) + "\n" + c[b1:]
parts = re.split(r'(<details class="sfold" id="[^"]+")', doc)
for i in range(1, len(parts), 2):
    fid = re.search(r'id="([^"]+)"', parts[i]).group(1)
    parts[i + 1] = re.sub(r'<details class="fcard">.*?</details>', lambda m: per_card(m, fid), parts[i + 1], flags=re.S)
doc = "".join(parts)
unused = set(R) - used
assert not unused, f"rewrites for cards not on the page: {sorted(unused)}"
CSS = """
/* 5 Oct 2026 — the pointer line and the why-go line inside an open card */
.gx-prague .fcard__line{font-style:italic}
.gx-prague .fcard__why b{font-family:var(--p-mono);font-size:.62rem;letter-spacing:1.4px;text-transform:uppercase;color:#2d4a5e;font-weight:400;margin-right:4px}
"""
k = doc.index("</style>", doc.index('<style id="prague-tags">')); doc = doc[:k] + CSS + doc[k:]
# the week table: no night may send the reader to a room the trim cut
WEEK = [
 ('The quiet night — Levitate and Štangl are closed, but <strong>Casa De Carli</strong> cooks, and every tank pub is full.',
  'The quiet night — check before booking a star, but every tank pub is full.'),
 ('A late lunch at Casa De Carli, then <a href="#venue-u-zlateho-tygra">',
  'A late lunch at <a href="#venue-lokal-dlouhaaa">Lokál Dlouhááá</a>, then <a href="#venue-u-zlateho-tygra">'),
 ('Book Levitate (last seating 19:30) or <a href="#venue-field">Field</a>;', 'Book <a href="#venue-field">Field</a>;'),
 (', Štangl\'s Saturday breakfast if you were organised.', '.'),
]
for x, y in WEEK:
    assert x in doc, x[:60]; doc = doc.replace(x, y, 1)
doc = doc.replace("</body>", MARK + "\n</body>", 1)
IDX.write_text(doc)
# venues: hook + why
js = DJS.read_text(); nv = 0
def vline(m):
    global nv
    v = json.loads(m.group(1))
    if v["id"] in VW:
        v["hook"] = VW[v["id"]]["hook"]; v["why"] = VW[v["id"]]["why"]; nv += 1
    return "    " + json.dumps(v, ensure_ascii=False, separators=(",", ":")) + m.group(2)
v0 = js.index("const VENUES = ["); v1 = js.index("const NEIGHBORHOODS")
js = js[:v0] + re.sub(r'^    (\{"id":.*?\})(,?)$', vline, js[v0:v1], flags=re.M) + js[v1:]
assert nv == len(VW), (nv, len(VW))
DJS.write_text(js); DJS2.write_text(js)
print(f"rewrote {done} cards · {nv} venues (hook + why)")
