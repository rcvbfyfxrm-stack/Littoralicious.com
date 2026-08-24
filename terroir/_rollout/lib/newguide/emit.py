#!/usr/bin/env python3
"""Emit data.js (GOLD5 shape) + both CSV copies + the .ics checklist for ANY guide.
Driven entirely by meta.json + <slug>-data.json. Never invents a coordinate: lat/lng pass
through as authored (null -> "" in CSV, and the venue simply gets no map pin)."""
import json, csv, pathlib, urllib.parse

B = pathlib.Path(__file__).parent
META0 = json.load(open(B / "meta.json"))
D = json.load(open(B / f'{META0["slug"]}-data.json'))
META = META0
SLUG, CITY = META["slug"], META["city"]
REPO = pathlib.Path(META["repo"])
OUT = B / "out"; OUT.mkdir(exist_ok=True)
PHOTO = json.load(open(B / "photo-meta.json"))
LISTE_SLUG = META.get("listeSlug", CITY.lower())
COUNTRY = META.get("country", "")

def mapslink(v):
    q = v.get("maps_query") or f'{v["name"]} {CITY} {COUNTRY}'.strip()
    return "https://www.google.com/maps/search/?api=1&query=" + urllib.parse.quote_plus(q)

# hot_this_month is authored in <slug>-data.json as D["HOT"] = {venue_id: "one dated line"}
for _vid, _line in (D.get("HOT") or {}).items():
    for v in D["venues"]:
        if v["id"] == _vid: v["hot_this_month"] = _line

venues, prio = [], {b: n + 1 for n, b in enumerate(D["berths"])}
nxt = 4
for v in D["venues"]:
    vid = v["id"]
    tier = "berth_top" if vid in prio else ("several" if v.get("group") == "grande" else "plenty")
    if vid not in prio: prio[vid] = nxt; nxt += 1
    e = {"id": vid, "cat": v.get("cat", "shop"), "tier": tier, "priority": prio[vid],
         "name": v["name"], "short": v.get("short", v["name"]),
         "neighborhood": v.get("neighborhood", ""), "maps": mapslink(v),
         "badge": (v.get("badge", "") or "")[:9].upper(), "tags": v.get("tags", []),
         "productTags": v.get("productTags", [])[:3], "hours": v.get("hours", ""),
         "why": v.get("why", ""), "address": v.get("address", ""), "phone": v.get("phone", ""),
         "status": v.get("status", "unverified"), "statusChecked": v.get("statusChecked", "")}
    if v.get("lat") is not None:
        e["lat"] = v["lat"]; e["lng"] = v["lng"]
    for k in ("category", "subcat", "hook", "person", "signature", "verdict", "caveat",
              "price_range", "reservation", "best_time", "dishes", "signal_chip",
              "charter", "web", "buy", "galley", "hot_this_month"):
        if v.get(k): e[k] = v[k]
    venues.append(e)

D["PHOTOS"] = [{"src": f'/terroir/{SLUG}/img/{f}',
                "caption": c["caption"],
                "credit": f'{PHOTO[f]["artist"]} · {PHOTO[f]["licence"]} · Wikimedia Commons'}
               for f, c in D["photos"].items()]
assert len(D["PHOTOS"]) == 3, "GOLD5 wants exactly 3 plates"

def js(o): return json.dumps(o, ensure_ascii=False, separators=(",", ":"))
body = "window.TERROIR_DATA = (function () {\n"
for k in ("COLORS", "CAT_LABELS", "PRODUCT_COLORS"):
    body += f"  const {k} = {js(D[k])};\n"
body += "  const VENUES = [\n" + ",\n".join("    " + js(v) for v in venues) + "\n  ];\n"
for k in ("NEIGHBORHOODS", "WALKS", "WORK_SPOTS", "LANDMARKS", "PHOTOS", "GEMS"):
    body += f"  const {k} = [\n" + ",\n".join("    " + js(x) for x in D[k]) + "\n  ];\n"
body += f"  const TABLES = {json.dumps(D['TABLES'], ensure_ascii=False, indent=1)};\n"
body += f"  const CATEGORIES = {json.dumps(D['CATEGORIES'], ensure_ascii=False, indent=1)};\n"
body += f"  const GROUPS = {js(D['GROUPS'])};\n  const GROUP_OF = {js(D['GROUP_OF'])};\n"
body += f"  const BRIDGE = {json.dumps(D['BRIDGE'], ensure_ascii=False, indent=1)};\n"
body += ("  return { VENUES, COLORS, CAT_LABELS, PRODUCT_COLORS, NEIGHBORHOODS, WALKS, WORK_SPOTS, "
         "LANDMARKS, PHOTOS, GEMS, TABLES, CATEGORIES, GROUPS, GROUP_OF, BRIDGE };\n})();\n")
(OUT / "data.js").write_text(body)

HDR = ["name", "category", "neighborhood", "address", "phone", "lat", "lng", "tier", "product_tags",
       "recognition", "what_to_order", "price_range", "reservation", "best_time", "notes", "verdict",
       "caveat", "best_night", "hot_this_month", "source_tier", "maps", "still_open", "last_verified",
       "geo_precision"]
rows = []
for v, e in zip(D["venues"], venues):
    chip = v.get("signal_chip") or {}
    rows.append([v["name"], v.get("badge", ""), v.get("neighborhood", ""), v.get("address", ""),
                 v.get("phone", ""),
                 v.get("lat", "") if v.get("lat") is not None else "",
                 v.get("lng", "") if v.get("lng") is not None else "",
                 v.get("subcat") or e["tier"], " · ".join(e["productTags"]),
                 chip.get("full", v.get("recognition", "")),
                 " · ".join(d["name"] for d in v.get("dishes", [])),
                 v.get("price_range", ""), v.get("reservation", ""), v.get("best_time", ""),
                 v.get("notes", ""), v.get("verdict", ""), v.get("caveat", ""),
                 v.get("best_night", ""), v.get("hot_this_month", ""),
                 v.get("source_tier", "reported"), e["maps"], v.get("status", "unverified"),
                 v.get("statusChecked", ""), v.get("geo_precision", "none")])
for path in (OUT / "data.csv", REPO / "terroir" / "csv" / f"{SLUG}.csv"):
    path.parent.mkdir(parents=True, exist_ok=True)
    with open(path, "w", newline="") as f:
        w = csv.writer(f); w.writerow(HDR); w.writerows(rows)

LISTE = json.load(open(B / "liste.json"))
def esc(s): return (s.replace("\\", "\\\\").replace(",", "\\,").replace(";", "\\;").replace("\n", "\\n"))
ics = ["BEGIN:VCALENDAR", "VERSION:2.0", f"PRODID:-//Littoralicious//Terroir {CITY}//EN",
       f"X-WR-CALNAME:{CITY} — eat & drink checklist"]
for it in LISTE:
    ics += ["BEGIN:VTODO", f"UID:{LISTE_SLUG}-liste-{it['n']}@littoralicious.com",
            f"SUMMARY:{esc(it['name'] + ' — ' + it['what'])}",
            f"DESCRIPTION:{esc((('Say: ' + it['say'] + '. ') if it.get('say') else '') + it['why'] + ' Best: ' + it['where'])}",
            f"LOCATION:{esc(it['where'])}", f"URL:{it['maps']}", "END:VTODO"]
ics.append("END:VCALENDAR")
(OUT / f"{LISTE_SLUG}-eat-drink-checklist.ics").write_text("\r\n".join(ics) + "\r\n")

print(f"data.js {len(body)}b · {len(venues)} venues (berths={sum(1 for v in venues if v['tier']=='berth_top')}, "
      f"pinned={sum(1 for v in venues if 'lat' in v)}) · csv rows={len(rows)} -> both copies · liste {len(LISTE)}")
