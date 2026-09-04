#!/usr/bin/env python3
"""CARTO basemap key: verify one, or apply one across every map in the repo.

Why this exists: CARTO now stamps "API KEY REQUIRED / carto.com/basemaps/apikey"
diagonally across every tile served without a valid key. The failure is SILENT at
the HTTP level -- verified 4 Sept 2026, a missing key, an empty key and a wrong key
all return HTTP 200 with a BYTE-IDENTICAL tile (md5 bc6ab29cba8730f8399a3b1a3c1d43ab
for 6/33/21@2x). You cannot tell a working key from a typo by status code or size.
So the check compares the returned tile against the known watermarked one.

    python3 carto_key.py --check  <key>          # does this key actually work?
    python3 carto_key.py --apply  <key> <root>   # rewrite every tile URL
    python3 carto_key.py --status <root>         # what is in the repo right now

Exit 0 = good. Exit 1 = watermarked / not applied.
"""
import hashlib
import pathlib
import re
import sys
import urllib.request

PROBE = "https://basemaps.cartocdn.com/rastertiles/voyager/6/33/21@2x.png"
WATERMARKED_MD5 = "bc6ab29cba8730f8399a3b1a3c1d43ab"

OLD = "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
NEW = "https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png?key="

# {r} is Leaflet's retina suffix (@2x) - keep it, dropping it halves map sharpness
# on every modern screen. {s} is legacy subdomain sharding, pointless over HTTP/2
# and absent from CARTO's documented format, so it goes.


def _fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=20) as r:
        return r.read()


def check(key):
    plain = hashlib.md5(_fetch(PROBE)).hexdigest()
    keyed = hashlib.md5(_fetch(f"{PROBE}?key={key}")).hexdigest()
    print(f"  keyless tile : {plain}")
    print(f"  keyed tile   : {keyed}")
    if plain != WATERMARKED_MD5:
        print("\n  NOTE: the keyless tile no longer matches the recorded watermark hash.")
        print("  CARTO may have changed the stamp. Re-record before trusting this check.")
    if keyed == plain:
        print("\n  FAIL  the key changed nothing - tiles are still watermarked.")
        print("        A wrong key looks exactly like no key. Check it for typos.")
        return 1
    print("\n  OK    the key returns a different tile. Watermark is gone.")
    return 0


def _targets(root):
    root = pathlib.Path(root)
    return [p for p in root.rglob("*")
            if p.suffix in (".html", ".js") and p.is_file() and OLD in p.read_text(
                encoding="utf-8", errors="ignore")]


def status(root):
    hits = _targets(root)
    keyed = len(re.findall(r"cartocdn\.com[^\"')]*\?key=\w", "\n".join(
        p.read_text(encoding="utf-8", errors="ignore") for p in pathlib.Path(root).rglob("*")
        if p.suffix in (".html", ".js") and p.is_file())))
    print(f"  unkeyed tile URLs : {len(hits)} file(s)")
    print(f"  keyed tile URLs   : {keyed}")
    for p in hits:
        print(f"    - {p}")
    return 1 if hits else 0


def apply(key, root):
    hits = _targets(root)
    if not hits:
        print("  nothing to do - no unkeyed CARTO URLs found.")
        return 0
    for p in hits:
        s = p.read_text(encoding="utf-8")
        p.write_text(s.replace(OLD, NEW + key), encoding="utf-8")
        print(f"  rewrote {p}")
    print(f"\n  {len(hits)} file(s) updated. Now run --check, then the render gate.")
    return 0


if __name__ == "__main__":
    a = sys.argv[1:]
    if not a:
        print(__doc__)
        sys.exit(2)
    if a[0] == "--check" and len(a) == 2:
        sys.exit(check(a[1]))
    if a[0] == "--status" and len(a) == 2:
        sys.exit(status(a[1]))
    if a[0] == "--apply" and len(a) == 3:
        sys.exit(apply(a[1], a[2]))
    print(__doc__)
    sys.exit(2)
