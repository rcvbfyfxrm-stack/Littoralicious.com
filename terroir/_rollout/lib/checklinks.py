#!/usr/bin/env python3
"""Cross-check every link a guide ships — and tell dead apart from merely bot-walled.

    python3 terroir/_rollout/lib/checklinks.py . Diani-Kwale [--json out.json]

Arnaud, 2026-08-26: "always cross check the links make sure they work properly."

Why this is a separate command and not part of checks_gold4.py: it is the only check
that depends on the whole internet being up, so it must never be able to fail a deploy
for someone else's outage. Run it before a deploy and read it; the gate stays offline
and deterministic.

Three findings it separates, because treating them alike is what produces bad fixes:

  DEAD        connection refused, 404, or a persistent 5xx across THREE tries.
              These are real: fix or remove them.
  BOT-WALLED  403/401/406/400/429/503 — publishers and Cloudflare block curl, and the
              page is fine in a browser. NEVER "fix" one of these. Confirm with
              cdp.render_dom(url, quiet_hosts=False) if you need to see it.
  MOVED       2xx but the final host differs from the one written. Usually correct
              (doi.org -> the publisher, hdl.handle.net -> the repository). Sometimes
              a SQUAT: kayakinondo.com now 301s to an unrelated domain. READ EVERY ONE.

⚠ A single failure is not proof of death — kuzacave.com and kentaste.com both failed a
pass and were back minutes later. That is why it retries, and why a link that fails here
should be re-checked before you tear it out.

For anything genuinely dead, prefer an archive.org snapshot over deleting the citation:
--archive prints the closest snapshot for each dead URL, ready to paste. Say so in the
link text ("dead link, archived copy June 2026") — never let a reader think it is live.
"""
import sys, re, json, pathlib, subprocess, urllib.parse, urllib.request
from concurrent.futures import ThreadPoolExecutor

UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/140.0 Safari/537.36")
WALL = {"400", "401", "402", "403", "406", "429", "503"}
SKIP = ("fonts.googleapis.com", "fonts.gstatic.com")   # preconnect hosts, never navigated
URL = re.compile(r'https?://[^\s"\'<>\\)\]]+')


def collect(root, slug):
    """Every URL the guide ships, with where it came from. Parens are part of a
    Wikipedia title — take the href whole and do not trim on ')'."""
    found = {}
    def add(u, where):
        u = u.rstrip(".,;:»”")
        if not any(s in u for s in SKIP) and "google.com/maps" not in u:
            found.setdefault(u, set()).add(where)
    for rel in (f"terroir/{slug}/index.html", f"terroir/{slug}/data.js"):
        p = root / rel
        if not p.is_file():
            continue
        doc = p.read_text()
        for m in re.finditer(r'href="([^"]+)"', doc):
            if m.group(1).startswith(("http://", "https://")):
                add(m.group(1), p.name)
        for m in re.finditer(r'"(?:web|source_url)"\s*:\s*"(https?://[^"]+)"', doc):
            add(m.group(1), p.name)
    for p in (root / f"terroir/{slug}").glob("*.ics"):
        for u in URL.findall(p.read_text().replace("\\", "")):
            add(u, p.name)
    return {u: sorted(w) for u, w in found.items()}


def check(url, tries=3):
    worst = ("000", "")
    for _ in range(tries):
        try:
            r = subprocess.run(
                ["curl", "-sL", "-o", "/dev/null", "--max-time", "30", "-A", UA,
                 "-w", "%{http_code} %{url_effective}", url],
                capture_output=True, text=True, timeout=45)
            code, _, final = r.stdout.partition(" ")
            worst = (code, final.strip())
            if code.startswith(("2", "3")):
                return url, code, final.strip()
            if code in WALL:
                return url, code, final.strip()
        except Exception as e:
            worst = ("ERR", str(e)[:60])
    return url, worst[0], worst[1]


def snapshot(url):
    try:
        q = urllib.parse.quote(url, safe="")
        with urllib.request.urlopen(
                f"https://archive.org/wayback/available?url={q}", timeout=30) as fh:
            s = (json.load(fh).get("archived_snapshots") or {}).get("closest")
        return s["url"].replace("http://web.archive.org", "https://web.archive.org") if s else None
    except Exception:
        return None


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    root, slug = pathlib.Path(args[0]).resolve(), args[1]
    want_archive = "--archive" in sys.argv
    links = collect(root, slug)
    print(f"{slug}: checking {len(links)} distinct links (3 tries each)…\n")
    with ThreadPoolExecutor(max_workers=6) as ex:
        res = list(ex.map(check, sorted(links)))

    host = lambda u: urllib.parse.urlparse(u).netloc.lower().removeprefix("www.")
    dead = [r for r in res if not r[1].startswith(("2", "3")) and r[1] not in WALL]
    wall = [r for r in res if r[1] in WALL]
    moved = [r for r in res if r[1].startswith("2") and host(r[0]) != host(r[2])]

    if dead:
        print(f"DEAD — {len(dead)} (fix or remove; re-check before tearing one out):")
        for u, c, _ in sorted(dead):
            print(f"   {c}  {u}")
            for w in links[u]:
                print(f"        in {w}")
            if want_archive:
                s = snapshot(u)
                print(f"        archive: {s}" if s else "        archive: none")
        print()
    if moved:
        print(f"MOVED — {len(moved)} (usually fine; look for a squat):")
        for u, c, f in sorted(moved):
            print(f"   {host(u)} -> {host(f)}")
            print(f"      {u}")
        print()
    print(f"bot-walled (NOT broken, do not touch): {len(wall)} on "
          f"{len(sorted({host(r[0]) for r in wall}))} hosts")
    print(f"OK: {len(res) - len(dead) - len(wall)} of {len(res)}")

    if "--json" in sys.argv:
        out = sys.argv[sys.argv.index("--json") + 1]
        pathlib.Path(out).write_text(json.dumps(
            [{"url": u, "code": c, "final": f, "where": links[u]} for u, c, f in res], indent=1))
    return 1 if dead else 0


if __name__ == "__main__":
    sys.exit(main())
