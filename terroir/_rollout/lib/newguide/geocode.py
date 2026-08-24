#!/usr/bin/env python3
"""Geocode the Kendwa venue candidates against Nominatim. Never invents a coordinate:
anything that does not resolve inside the sanity box comes back null and stays unpinned."""
import json, time, urllib.parse, urllib.request, pathlib, sys

BUILD = pathlib.Path(__file__).parent
UA = "littoralicious-terroir/1.0 (arnaudcallier@pm.me)"

# sanity box: northern Unguja + Stone Town + Tumbatu. Anything outside = rejected.
BOX = (-6.30, -5.60, 39.10, 39.60)   # latmin, latmax, lngmin, lngmax

QUERIES = json.load(open(BUILD / "geo-queries.json"))

def q(term):
    url = "https://nominatim.openstreetmap.org/search?format=json&limit=3&q=" + urllib.parse.quote_plus(term)
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    try:
        return json.load(urllib.request.urlopen(req, timeout=25))
    except Exception as e:
        print(f"  ! {term}: {e}", file=sys.stderr); return []

out = {}
for vid, terms in QUERIES.items():
    hit = None
    for term in terms:
        for r in q(term):
            lat, lng = float(r["lat"]), float(r["lon"])
            if BOX[0] <= lat <= BOX[1] and BOX[2] <= lng <= BOX[3]:
                hit = {"lat": round(lat, 6), "lng": round(lng, 6),
                       "matched": r["display_name"][:110], "query": term,
                       "osm": f'{r["osm_type"]}/{r["osm_id"]}'}
                break
        time.sleep(1.05)
        if hit: break
    out[vid] = hit
    print(f'{"OK  " if hit else "MISS"} {vid:34s} {hit["matched"][:70] if hit else ""}')

json.dump(out, open(BUILD / "geo-results.json", "w"), indent=1, ensure_ascii=False)
print(f"\nresolved {sum(1 for v in out.values() if v)}/{len(out)}")
