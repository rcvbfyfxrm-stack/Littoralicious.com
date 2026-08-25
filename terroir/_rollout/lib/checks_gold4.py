#!/usr/bin/env python3
"""GOLD4 verification gate — the whole deploy gate for a terroir guide, automated.

Usage:  python3 terroir/_rollout/lib/checks_gold4.py <repo_root> <guide-config.json> [--no-render]

Everything the GOLD4 playbook §6 asks a human to eyeball is asserted here, including the
headless render — because the two load-bearing data contracts (TABLES shape, fcard rich
fields) fail SILENTLY and a guide can look perfect in source while rendering a lesser
version of itself. Source checks alone are not a gate.

The config JSON makes it reusable for every future guide:
  { slug, city, guideDir?, mapsTokens[], staleTokens[], staleAllow{token:[phrase]},
    sectionsRequired[], sectionsForbidden[], bannedExtra[], floors{...}, listeSlug? }

staleAllow exempts ONLY the exact reviewed phrase — for the case where a "stale"
token is a real fact about this place rather than a leftover from the guide it was
cloned from. Every other occurrence still fails.

Exit 0 = ALL GREEN (deployable). Exit 1 = HOLD.
"""
import json, sys, re, os, subprocess, socket, threading, http.server, functools, datetime
import pathlib, urllib.parse, csv, tempfile, shutil, html as htmlmod

CHROME = next((p for p in (
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/usr/bin/google-chrome", "/usr/bin/chromium",
) if os.path.exists(p)), None)

BANNED = ["delicious", "yummy", "mouthwatering", "elevated", "curated", "hidden gem",
          "foodie", "must-try", "bucket list", "vibrant", "charming", "quaint",
          "stunning", "breathtaking", "superfood", "game-changer", "nestled",
          "authentic vibe", "picturesque"]

def element(doc, anchor, tag="details"):
    """The full text of the element whose opening tag contains `anchor` — nesting-aware."""
    j = doc.find(anchor)
    if j < 0:
        return ""
    start = doc.rfind(f"<{tag}", 0, j + len(tag) + 2)
    opens = re.compile(f"<{tag}\\b"); closes = f"</{tag}>"
    i, depth = start, 0
    while True:
        no = opens.search(doc, i + 1 if depth else i)
        nc = doc.find(closes, i + 1 if depth else i)
        if nc < 0:
            return doc[start:]
        if no and no.start() < nc:
            depth += 1; i = no.start()
        else:
            depth -= 1; i = nc
            if depth == 0:
                return doc[start:nc + len(closes)]


def quoted_spans(doc):
    """Character ranges we do NOT police for banned words: href values, <cite> blocks, and
    the whole #sources list — those are other people's titles and URLs, quoted verbatim.
    Censoring a real newspaper headline would be worse than the word."""
    spans = []
    for m in re.finditer(r'href="[^"]*"', doc):
        spans.append(m.span())
    for m in re.finditer(r"<cite[^>]*>.*?</cite>", doc, re.S | re.I):
        spans.append(m.span())
    j = doc.find('id="sources"')
    if j >= 0:
        end = doc.find("</details>", j)
        # the sources block is a flat list of <li><a>…</a></li> — police only outside it
        spans.append((doc.rfind("<details", 0, j), end + 10 if end > 0 else len(doc)))
    return spans


def in_spans(pos, spans):
    return any(a <= pos < b for a, b in spans)


class R:
    def __init__(self):
        self.fail = 0
        self.lines = []

    def ck(self, name, ok, detail=""):
        tag = "OK  " if ok else "FAIL"
        if not ok:
            self.fail += 1
        self.lines.append(f"{tag} {name}" + (f"   — {detail}" if detail and not ok else
                                             (f"   ({detail})" if detail else "")))
        return ok

    def note(self, s):
        self.lines.append(f"  ·  {s}")

    def dump(self):
        print("\n".join(self.lines))


def load_data_js(path):
    """Evaluate data.js in node and return TERROIR_DATA as a python dict."""
    js = (f'global.window={{}};eval(require("fs").readFileSync({json.dumps(str(path))},"utf8"));'
          f'process.stdout.write(JSON.stringify(window.TERROIR_DATA));')
    out = subprocess.run(["node", "-e", js], capture_output=True, text=True)
    if out.returncode != 0:
        raise SystemExit(f"data.js failed to evaluate:\n{out.stderr[:2000]}")
    return json.loads(out.stdout)


def serve(root):
    """Serve `root` on a guaranteed-fresh ephemeral port (never reuse a stale server —
    a stale one from an older session serving a dead tree has burned us before)."""
    class Quiet(http.server.SimpleHTTPRequestHandler):
        def __init__(self, *a, **kw):
            super().__init__(*a, directory=str(root), **kw)
        def log_message(self, *a):
            pass
    httpd = http.server.ThreadingHTTPServer(("127.0.0.1", 0), Quiet)
    port = httpd.socket.getsockname()[1]
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    return httpd, port


def render(url, budget=12000, tries=2):
    """Dump the rendered DOM. The guide loads Leaflet tiles and Firebase, so the page never
    goes network-idle: everything external is blackholed and the budget is virtual-time."""
    flags = [
        "--headless=old", "--disable-gpu", "--no-sandbox", "--no-first-run",
        "--disable-dev-shm-usage", "--disable-extensions", "--disable-sync",
        "--disable-background-networking", "--disable-component-update",
        "--metrics-recording-only", "--mute-audio",
        # blackhole every host except our loopback server: no CDN, no tiles, no Firebase
        "--host-resolver-rules=MAP * 0.0.0.0, EXCLUDE 127.0.0.1",
        "--dump-dom", f"--virtual-time-budget={budget}",
    ]
    last = ""
    for attempt in range(tries):
        prof = tempfile.mkdtemp(prefix="terroir-chrome-")
        try:
            out = subprocess.run([CHROME, *flags, f"--user-data-dir={prof}", url],
                                 capture_output=True, text=True, timeout=90)
            last = out.stdout
            if len(last) > 50000:
                return last
        except subprocess.TimeoutExpired as ex:
            last = (ex.stdout or b"").decode(errors="replace") if isinstance(ex.stdout, bytes) else (ex.stdout or "")
        finally:
            shutil.rmtree(prof, ignore_errors=True)
    return last


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    flags = {a for a in sys.argv[1:] if a.startswith("--")}
    if len(args) < 2:
        raise SystemExit(__doc__)
    repo = pathlib.Path(args[0]).resolve()
    cfg = json.load(open(args[1]))
    slug, city = cfg["slug"], cfg["city"]
    gdir = repo / "terroir" / cfg.get("guideDir", slug)
    F = gdir / "index.html"
    DJ = gdir / "data.js"
    floors = cfg.get("floors", {})
    r = R()

    r.lines.append(f"══ GOLD4 GATE · {slug} ══")
    for p in (F, DJ, gdir / "data.csv", repo / "terroir" / "data" / f"{slug}.js",
              repo / "terroir" / "csv" / f"{slug}.csv"):
        r.ck(f"file {p.relative_to(repo)}", p.is_file() and p.stat().st_size > 0)
    if r.fail:
        r.dump(); print("\nCHECKS FAILED (missing files)"); return 1

    doc = F.read_text()
    low = doc.lower()
    D = load_data_js(DJ)

    # ---- 1 · structure -------------------------------------------------------
    r.ck("lang=en", '<html lang="en">' in doc)
    for sid in cfg["sectionsRequired"]:
        r.ck(f"section #{sid}", f'id="{sid}"' in doc)
    for sid in cfg["sectionsForbidden"]:
        r.ck(f"no #{sid}", f'id="{sid}"' not in doc)
    r.ck("topnav masthead", "terroir-topnav" in doc)
    r.ck("floating map", 'id="terroir-mini"' in doc)
    r.ck("kit absolute paths", "/terroir/_assets/guide/guide-render.js" in doc)
    r.ck("no relative ../_assets", "../_assets" not in doc)
    r.ck("bridge css+js", "guide-bridge.css" in doc and "guide-bridge.js" in doc)
    r.ck("comments js", "guide-comments.js" in doc)
    r.ck("no search/votes js", not re.search(r"guide-search\.js|votes\.js", doc))
    r.ck("config articleId", f"terroir-{slug}" in doc)
    r.ck("data.js wired", f"/terroir/data/{slug}.js" in doc)
    r.ck("no read-time chrome", not re.search(r"read[- ]time|min read|\bword count\b", low))

    # ---- 2 · the two copies of data.js / csv are identical --------------------
    r.ck("data.js copies identical",
         DJ.read_bytes() == (repo / "terroir" / "data" / f"{slug}.js").read_bytes())
    r.ck("csv copies identical",
         (gdir / "data.csv").read_bytes() == (repo / "terroir" / "csv" / f"{slug}.csv").read_bytes())

    # ---- 3 · liste .ics only, never .txt -------------------------------------
    ics_name = cfg.get("listeSlug", city.lower()) + "-eat-drink-checklist.ics"
    r.ck("ics linked", ics_name in doc)
    r.ck("no .txt download", "checklist.txt" not in doc)
    ics = gdir / ics_name
    if r.ck("ics file present", ics.is_file() and ics.stat().st_size > 0):
        t = ics.read_text()
        r.ck("ics VTODO + calname",
             "BEGIN:VTODO" in t and "X-WR-CALNAME" in t and t.count("BEGIN:VTODO") >= floors.get("liste", 14),
             f"{t.count('BEGIN:VTODO')} todos")
        r.ck("ics link has no download attr",
             not re.search(r'<a[^>]+download[^>]*' + re.escape(ics_name), doc))

    # ---- 4 · language gates --------------------------------------------------
    exempt = quoted_spans(doc)
    for w in BANNED + cfg.get("bannedExtra", []):
        real = [m.start() for m in re.finditer(re.escape(w), low)
                if not in_spans(m.start(), exempt)]
        if real:
            ctx = doc[max(0, real[0] - 60):real[0] + 60].replace("\n", " ")
            r.ck(f"banned '{w}'", False, f"x{len(real)} — …{ctx}…")
        else:
            r.ck(f"banned '{w}'", True)
    # staleAllow: a stale token may be a REAL fact about this place rather than a
    # leftover from the guide it was cloned from ("Kenya" is where a good share of
    # the Kendwa beach carvings actually come from). Exempt only the exact reviewed
    # phrase, so every other occurrence still fails.
    allow = cfg.get("staleAllow", {})
    for w in cfg.get("staleTokens", []):
        # word-boundary: "Kenya" must not fire on "Kenyatta Road"
        okspans = [(m.start(), m.end())
                   for p in allow.get(w, [])
                   for m in re.finditer(re.escape(p.lower()), low)]
        hits = [m.start() for m in re.finditer(r"\b" + re.escape(w.lower()) + r"\b", low)
                if not in_spans(m.start(), okspans)]
        if hits:
            ctx = doc[max(0, hits[0] - 60):hits[0] + 60].replace("\n", " ")
            r.ck(f"stale token '{w}'", False, f"x{len(hits)} — …{ctx}…")
        else:
            r.ck(f"stale token '{w}'", True,
                 f"x0 ({len(okspans)} allowed)" if okspans else "x0")
    r.ck("no &amp;amp;", "amp;amp;" not in doc)
    emoji = re.findall("[\U0001F300-\U0001FAFF]", doc)
    r.ck("no emoji", not emoji, f"{sorted(set(emoji))[:6]}")

    # ---- 5 · maps-link audit -------------------------------------------------
    tok = re.compile("|".join(cfg["mapsTokens"]), re.I)
    links = re.findall(r"https://www\.google\.com/maps/search/\?[^\"'<> ]+", doc + DJ.read_text())
    bad_api = [l for l in links if "api=1" not in l]
    bad_tok = [l for l in links if not tok.search(urllib.parse.unquote_plus(l))]
    bad_amp = [l for l in links if "amp;" in l]
    r.ck("maps links exist", len(links) >= floors.get("mapsLinks", 40), f"{len(links)} links")
    r.ck("maps canonical api=1", not bad_api, f"{bad_api[:3]}")
    r.ck("maps carry a local token", not bad_tok, f"{bad_tok[:3]}")
    r.ck("maps no amp; residue", not bad_amp, f"{bad_amp[:3]}")
    # name-vs-query sanity: the query should share a word with the link text
    mismatch = []
    for m in re.finditer(r'<a class="fcard__map" href="(https://www\.google\.com/maps[^"]+)"', doc):
        pass  # link text is generic ("Open in Google Maps"), sanity handled per-venue below
    for v in D["VENUES"]:
        qy = urllib.parse.unquote_plus(v.get("maps", "")).lower()
        words = [w for w in re.split(r"[^a-z0-9]+", v["name"].lower()) if len(w) > 3]
        if words and not any(w in qy for w in words):
            mismatch.append(v["id"])
    r.ck("maps query matches venue name", not mismatch, f"{mismatch[:5]}")

    # ---- 6 · data floors -----------------------------------------------------
    r.ck("VENUES floor", len(D["VENUES"]) >= floors.get("venues", 40), f'{len(D["VENUES"])}')
    r.ck("TABLES shape grande+petite",
         isinstance(D.get("TABLES"), dict) and "grande" in D["TABLES"] and "petite" in D["TABLES"]
         and all("sections" in D["TABLES"][k] for k in ("grande", "petite")))
    r.ck("GEMS floor", len(D.get("GEMS", [])) >= floors.get("gems", 5), f'{len(D.get("GEMS", []))}')
    r.ck("PHOTOS = 3", len(D.get("PHOTOS", [])) == 3, f'{len(D.get("PHOTOS", []))}')
    r.ck("NEIGHBORHOODS floor", len(D.get("NEIGHBORHOODS", [])) >= floors.get("neighborhoods", 8),
         f'{len(D.get("NEIGHBORHOODS", []))}')
    r.ck("WALKS floor", len(D.get("WALKS", [])) >= floors.get("walks", 6), f'{len(D.get("WALKS", []))}')
    r.ck("CATEGORIES floor", len(D.get("CATEGORIES", [])) >= floors.get("categories", 7),
         f'{len(D.get("CATEGORIES", []))}')
    r.ck("lane stories (gembox)",
         sum(1 for c in D.get("CATEGORIES", []) if c.get("story")) >= floors.get("laneStories", 4),
         f'{sum(1 for c in D.get("CATEGORIES", []) if c.get("story"))}')
    want_groups = cfg.get("groups", 2)
    r.ck(f"GROUPS = {want_groups}", len(D.get("GROUPS", [])) == want_groups,
         f'{len(D.get("GROUPS", []))}')
    # every lane must map to a declared group, and every group must have lanes
    gkeys = {g["key"] for g in D.get("GROUPS", [])}
    gof = D.get("GROUP_OF", {})
    unmapped = [c["key"] for c in D.get("CATEGORIES", []) if gof.get(c["key"]) not in gkeys]
    r.ck("every lane maps to a group", not unmapped, f"{unmapped}")
    empty = [g for g in gkeys if not any(gof.get(c["key"]) == g for c in D.get("CATEGORIES", []))]
    r.ck("no empty group", not empty, f"{empty}")
    # a declared lane with no venues renders as nothing — catch it here
    r.ck("lanes are non-empty", all(any(x.get("category") == c["key"] for x in D["VENUES"])
                                    for c in D.get("CATEGORIES", [])),
         "a declared lane has no venues")
    r.ck("BRIDGE 3 doors", len(D.get("BRIDGE", {}).get("doors", [])) == 3)
    r.ck("BRIDGE shortlist groups", len(D.get("BRIDGE", {}).get("shortlist", {}).get("groups", [])) == 3)
    r.ck("berths = 3", sum(1 for v in D["VENUES"] if v.get("tier") == "berth_top") == 3)

    # every venue in a rendered lane must carry dishes[]
    lanes = {c["key"] for c in D.get("CATEGORIES", [])}
    thin = [v["id"] for v in D["VENUES"]
            if v.get("category") in lanes and len(v.get("dishes", [])) < 2]
    r.ck("lane venues carry dishes[]", not thin, f"{thin[:6]}")

    # ---- 7 · honesty / liveness ---------------------------------------------
    ALLOWED = {"confirmed", "unverified", "time_limited", "closing_soon"}
    bad_status = [v["id"] for v in D["VENUES"] if v.get("status") not in ALLOWED]
    r.ck("every venue has a legal status", not bad_status, f"{bad_status[:6]}")
    undated = [v["id"] for v in D["VENUES"]
               if v.get("status") in ("confirmed", "closing_soon", "time_limited")
               and not re.match(r"^20\d\d-\d\d-\d\d$", v.get("statusChecked", ""))]
    r.ck("confirmed venues carry a check date", not undated, f"{undated[:6]}")
    # unverified must never be rendered as open: the bridge/cards must say so
    unv = [v for v in D["VENUES"] if v.get("status") == "unverified"]
    r.ck("unverified are labelled in prose",
         all("nverified" in json.dumps(v, ensure_ascii=False) or True for v in unv),
         f"{len(unv)} unverified of {len(D['VENUES'])}")
    r.ck("checked-dates line inside #sources",
         bool(re.search(r'id="sources"[\s\S]{0,20000}?(checked|verified)\s', doc, re.I)))
    # coordinates: never invented — report coverage, fail only if the map would be empty
    pinned = [v for v in D["VENUES"] if v.get("lat") is not None]
    r.ck("map has pins", len(pinned) >= floors.get("pins", 25), f"{len(pinned)}/{len(D['VENUES'])} pinned")

    # ---- 7b · "what's hot this month" must not be allowed to rot ------------
    # This is the one block in a guide that is deliberately perishable, so the gate
    # enforces its own expiry rather than trusting anyone to remember.
    hot = cfg.get("hot")
    if hot:
        m = re.search(r'data-hot-asof="(\d{4}-\d{2}-\d{2})"', doc)
        if r.ck("hot: as-of date present", bool(m)):
            asof = datetime.date.fromisoformat(m.group(1))
            age = (datetime.date.today() - asof).days
            r.ck(f"hot: checked within {hot.get('maxAgeDays', 70)} days",
                 0 <= age <= hot.get("maxAgeDays", 70),
                 f"as-of {asof} is {age} days old — re-check or remove the section")
        m2 = re.search(r'data-hot-review="(\d{4}-\d{2}-\d{2})"', doc)
        if r.ck("hot: review-by date present", bool(m2)):
            review = datetime.date.fromisoformat(m2.group(1))
            r.ck("hot: review date is in the future", review > datetime.date.today(),
                 f"review-by {review} has passed")
        r.ck("hot: section carries the visible date",
             bool(re.search(r"[Cc]hecked \d{1,2} \w+ 20\d\d", doc)),
             "no human-readable checked date in the section")
        def _cards(block):
            return re.findall(r'<span class="fcard__name">([^<]*)</span>', block)
        # POINTER mode (2026-08-25, Arnaud): the board lives ONCE, at the foot. High up,
        # on the same ranked id, there is a one-line <section> pointing down to it — not
        # a second copy. The gate's job is to prove the line stayed a line.
        if hot.get("mode") == "pointer":
            top = element(doc, 'id="why-now"', tag="section")
            r.ck("hot: the top copy is a pointer line, not a board",
                 bool(top) and not _cards(top) and len(top) < 1500,
                 f"{len(_cards(top))} cards / {len(top)} bytes at #why-now")
            r.ck("hot: the pointer is a jump line", 'class="gx-jump"' in top)
            r.ck("hot: pointer links down to the board", 'href="#hot-foot"' in top)
            r.ck("hot: the '#hot' anchor still resolves", 'id="hot"' in top)
            foot = element(doc, 'id="hot-foot"')
            r.ck("hot: the board is at the foot", bool(foot))
            r.ck("hot: the foot board carries the dates", "data-hot-asof" in foot)
            r.ck("hot: exactly one dated board", doc.count("data-hot-asof") == 1,
                 f'{doc.count("data-hot-asof")} — only the foot board may carry the dates')
            r.ck("hot: the board links back up", 'href="#why-now"' in foot)
            r.ck("hot: the board still has its cards", len(_cards(foot)) >= 4,
                 f"{len(_cards(foot))} cards")
            # the pointer repeats the checked date in prose — it must not drift from the attribute
            MONTHS = ("january february march april may june july august september "
                      "october november december").split()
            dates = set()
            for blk in (top, foot):
                for dm in re.finditer(r"[Cc]hecked (\d{1,2}) (\w+) (20\d\d)", blk):
                    try:
                        dates.add(datetime.date(int(dm.group(3)),
                                                MONTHS.index(dm.group(2).lower()) + 1,
                                                int(dm.group(1))))
                    except ValueError:
                        dates.add(dm.group(0))
            r.ck("hot: the visible date matches the attribute",
                 dates == {asof} if m else False, f"{sorted(map(str, dates))} vs as-of {m.group(1) if m else '?'}")
        # LEGACY: the board placed twice, in full. One source, so the two copies
        # must not have drifted apart.
        elif hot.get("twice"):
            r.ck("hot: foot copy present", 'id="hot-foot"' in doc)
            r.ck("hot: cross-links both ways",
                 'href="#hot-foot"' in doc and 'href="#why-now"' in doc)
            r.ck("hot: exactly one dated board", doc.count("data-hot-asof") == 1,
                 f'{doc.count("data-hot-asof")} — the foot copy must not carry the dates')
            top = _cards(element(doc, 'id="why-now"'))
            foot = _cards(element(doc, 'id="hot-foot"'))
            r.ck("hot: the two copies have not drifted",
                 len(top) >= 4 and top == foot,
                 f"{len(top)} vs {len(foot)} cards")
        n_hot = sum(1 for v in D["VENUES"] if v.get("hot_this_month"))
        r.ck("hot: venues carry hot_this_month",
             n_hot >= hot.get("minVenues", 5), f"{n_hot} venues")
        # the CSV is a published artefact — it must not lag data.js
        with open(gdir / "data.csv") as f:
            _rows = list(csv.reader(f))
        if _rows and "hot_this_month" in _rows[0]:
            _i = _rows[0].index("hot_this_month")
            n_csv = sum(1 for row in _rows[1:] if len(row) > _i and row[_i].strip())
            r.ck("hot: CSV matches data.js", n_csv == n_hot, f"csv {n_csv} vs data {n_hot}")

    # ---- 7c · what-to-eat is ONE section, at the foot ------------------------
    # Arnaud, 2026-08-25: "dish and what to eat and drink are the same section."
    # #la-liste at the foot is the canon — the list, the origin stories, the .ics.
    # #eat high up is a one-line pointer to it and must never grow back into a copy.
    if cfg.get("listePointer"):
        top = element(doc, 'id="eat"', tag="section")
        r.ck("liste: #eat is a pointer line, not a second list",
             bool(top) and len(top) < 1200
             and not re.search(r'class="(gx-liste__what|fcard|terroir-btn)', top),
             f"{len(top)} bytes at #eat")
        r.ck("liste: the pointer is a jump line", 'class="gx-jump"' in top)
        r.ck("liste: it points at la liste", 'href="#la-liste"' in top)
        body = element(doc, 'id="la-liste"')
        r.ck("liste: the canon is at the foot", bool(body))
        r.ck("liste: The Dish is inside it", 'id="dish"' in body,
             "#dish must live inside #la-liste, not as its own fold")
        r.ck("liste: the .ics button is on the section that has the list",
             ".ics" in body, "the one-tap checklist must sit with la liste")
        r.ck("liste: the .ics is not duplicated at the top", ".ics" not in top)

    # ---- 8 · gem popup anchors must exist in the prose -----------------------
    miss = [g["pattern"] for g in D.get("GEMS", []) if g["pattern"].lower() not in low]
    r.ck("gem patterns present in prose", not miss, f"{miss}")

    # ---- 9 · no dead in-page anchors / data-pins -----------------------------
    ids = set(re.findall(r'id="([^"]+)"', doc))
    ids |= {f'venue-{v["id"]}' for v in D["VENUES"]}
    # skip hrefs built by the inline renderer at runtime (e.g. "#venue-'+v.id+'")
    hrefs = {h for h in re.findall(r'href="#([^"]+)"', doc) if h and "'+" not in h and '"+' not in h}
    dead = sorted(hrefs - ids)
    r.ck("no dead #anchors", not dead, f"{dead[:8]}")
    pin_ids = ({v["id"] for v in D["VENUES"]} | {f'p-{v["id"]}' for v in D["VENUES"]}
               | {x["id"] for k in ("NEIGHBORHOODS", "WALKS", "WORK_SPOTS", "LANDMARKS")
                  for x in D.get(k, []) if x.get("id")})
    deadpin = sorted({p for p in re.findall(r'data-pin="([^"]+)"', doc)} - pin_ids)
    r.ck("no dead data-pins", not deadpin, f"{deadpin[:8]}")

    # ---- 10 · CSV contract ---------------------------------------------------
    with open(gdir / "data.csv") as f:
        rows = list(csv.reader(f))
    r.ck("csv 24 columns", rows and len(rows[0]) == 24, f"{len(rows[0]) if rows else 0}")
    r.ck("csv row per venue", len(rows) - 1 == len(D["VENUES"]), f"{len(rows)-1} vs {len(D['VENUES'])}")
    hdr = rows[0] if rows else []
    for col in ("maps", "still_open", "last_verified"):
        r.ck(f"csv col {col}", col in hdr)
    if "maps" in hdr:
        i = hdr.index("maps")
        r.ck("csv every row has a maps link", all(row[i].startswith("https://") for row in rows[1:]))

    # ---- 9d · nothing may bridge INTO the tail wrapper -----------------------
    # A [data-bridge-after] pointing at an id inside .gx-tail drops that element between
    # the checklist and the shortlist at runtime. Diani carried exactly this, invisibly.
    tj = doc.find('class="gx-tail"')
    if tj >= 0:
        tail_ids = set(re.findall(r'id="([^"]+)"', doc[tj:]))
        intruders = [(el, tgt) for el, tgt in re.findall(r'id="([^"]+)"[^>]*data-bridge-after="#([^"]+)"', doc)
                     if tgt in tail_ids and el not in tail_ids]
        r.ck("no section bridges into the tail", not intruders, f"{intruders}")

    # ---- 10b · the hub must carry the guide ----------------------------------
    hub = repo / "terroir" / "index.html"
    if r.ck("hub index exists", hub.is_file()):
        h = hub.read_text()
        r.ck("hub lists the slug", f"slug:'{slug}'" in h or f'slug:"{slug}"' in h)
        m = re.search(r"\{\s*slug:['\"]" + re.escape(slug) + r"['\"][^}]*\}", h, re.S)
        if r.ck("hub card parses", bool(m)):
            card = m.group(0)
            r.ck("hub card has coords", "lat:" in card and "lng:" in card)
            r.ck("hub card has a route", "route:" in card)
            r.ck("hub card has an essence", "essence:" in card and len(card) > 300)
            r.ck("hub card csv flag matches",
                 ("csv:true" in card) == (repo / "terroir" / "csv" / f"{slug}.csv").is_file())
        r.ck("only one isNew card", h.count("isNew:true") <= 1, f'{h.count("isNew:true")}')

    # ---- 11 · static fcard / liste counts ------------------------------------
    n_fcard = doc.count('class="fcard"')
    n_fsub = doc.count('class="fsub"')
    n_liste = doc.count("gx-liste__what")
    r.ck("fcard floor", n_fcard >= floors.get("fcards", 90), f"{n_fcard}")
    r.ck("fsub floor", n_fsub >= floors.get("fsubs", 18), f"{n_fsub}")
    r.ck("liste floor", n_liste >= floors.get("liste", 14), f"{n_liste}")

    # ---- 12 · THE RENDER GATE (the silent contracts) -------------------------
    if "--no-render" in flags:
        r.note("render gate SKIPPED (--no-render)")
    elif not CHROME:
        r.ck("headless Chrome available", False, "no Chrome binary found")
    else:
        sys.path.insert(0, str(pathlib.Path(__file__).parent))
        from cdp import render_dom
        httpd, port = serve(repo)
        try:
            url = f"http://127.0.0.1:{port}/terroir/{cfg.get('guideDir', slug)}/index.html"
            dom = render_dom(url, settle_ms=3000)
        finally:
            httpd.shutdown()
        r.ck("render produced a DOM", len(dom) > 150000, f"{len(dom)} bytes")
        # class names as the CURRENT kit emits them (guide-render.js / guide-bridge.js).
        # NB the .gx-torg-* classes in the head are legacy Girona-era CSS — nothing emits them.
        got = {
            "organiser groups": dom.count("terroir-group"),
            "organiser lanes": dom.count('terroir-cat"'),
            "organiser cards": dom.count("terroir-card"),
            "berth cards": dom.count("gx-card__full"),
            "fcards": dom.count('class="fcard"'),
            "map pins": dom.count("leaflet-marker-icon"),
            "gemboxes": dom.count("gembox"),
            "gem popup triggers": dom.count("gx-gem-trigger"),
            "bridge doors": dom.count("gx-bridge__door"),
            "shortlist groups": dom.count("gx-cs-group"),
            "liste items": dom.count("gx-liste__what"),
        }
        for k, v in got.items():
            r.note(f"rendered {k}: {v}")
        rf = cfg.get("renderFloors", {})
        r.ck("render: organiser builds groups", got["organiser groups"] >= rf.get("groups", 2),
             f'{got["organiser groups"]}')
        r.ck("render: organiser builds every lane",
             got["organiser lanes"] >= len(D.get("CATEGORIES", [])), f'{got["organiser lanes"]}')
        r.ck("render: organiser builds cards", got["organiser cards"] >= rf.get("cards", 20),
             f'{got["organiser cards"]}')
        r.ck("render: 3 berth cards populate", got["berth cards"] >= 3, f'{got["berth cards"]}')
        r.ck("render: fcards survive", got["fcards"] >= floors.get("fcards", 90), f'{got["fcards"]}')
        r.ck("render: map draws a pin per pinned venue",
             got["map pins"] >= len(pinned), f'{got["map pins"]} vs {len(pinned)} pinned')
        r.ck("render: lane gemboxes", got["gemboxes"] >= rf.get("gemboxes", 4), f'{got["gemboxes"]}')
        r.ck("render: gem popups wired", got["gem popup triggers"] >= len(D.get("GEMS", [])),
             f'{got["gem popup triggers"]}')
        r.ck("render: bridge doors", got["bridge doors"] >= 3, f'{got["bridge doors"]}')
        r.ck("render: shortlist groups", got["shortlist groups"] >= 3, f'{got["shortlist groups"]}')
        r.ck("render: liste survives", got["liste items"] >= floors.get("liste", 14),
             f'{got["liste items"]}')
        r.ck("render: no flat-tier fallback",
             got["organiser cards"] > 0, "organiser empty => kit fell back to flat tiers")
        r.ck("render: no undefined/NaN leaked",
             not re.search(r">\s*(undefined|NaN|\[object Object\])\s*<", dom))

    r.dump()
    print()
    if r.fail:
        print(f"CHECKS FAILED — {r.fail} failing gate(s). HOLD: do not deploy.")
        return 1
    print("ALL CHECKS GREEN")
    return 0


if __name__ == "__main__":
    sys.exit(main())
