#!/usr/bin/env python3
"""Emit data.js (GOLD2 shape) + both CSVs for Athens-Attiki from the final content pack.

Input:  build/final-data.json — written by the writing workflow:
{
  "venues": [ { id, section ("berth"|grande/petite section label), cat?, badge, name, short?,
                lat, lng, neighborhood, address, phone?, hours, tags:[price,resa,best_time],
                productTags:[<=3], why (voice blob), maps_query?, verdict, signature, caveat?,
                person?, signal_chip?{label,full,cosign}, dishes:[{name,note,kind}] } ],
  "tables": { grande:{title,desc,sections:[{label,desc,ids[]}]}, petite:{...} },
  "berths": [3 ids in priority order],
  "neighborhoods": [{id,name,center,radius,maps_url}],
  "walks_geo": [{id,name,start,maps_url}],
  "work_spots": [{id,name,start}],
  "landmarks": [{id,name,coords,maps_url}],
  "photos": [{src,caption,credit} x3],
  "gems": [{id,pattern,tag,name,story,where}],
  "product_colors": {label:hex,...}
}
Output: <out>/data.js, <out>/data.csv, <csvout>/Athens-Attiki.csv
"""
import json, csv, sys, pathlib, urllib.parse

HERE = pathlib.Path(__file__).parent
PACK = json.load(open(HERE / "final-data.json"))
OUT = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else HERE / "out"
CSV_DIR = pathlib.Path(sys.argv[2]) if len(sys.argv) > 2 else OUT
SLUG = json.load(open(HERE / "guide-meta.json"))["slug"]

COLORS = {"berth": "#2d4a5e", "market": "#d97706", "shop": "#059669",
          "mainland": "#7c3aed", "logistics": "#2d4a5e"}
CAT_LABELS = {"berth": "Signature", "market": "Market / Direct", "shop": "Restaurant / Bar",
              "mainland": "Out of town", "logistics": "Logistics"}

berth_ids = PACK["berths"]
grande_ids = [i for s in PACK["tables"]["grande"]["sections"] for i in s["ids"]]

venues = []
prio = {b: n + 1 for n, b in enumerate(berth_ids)}
next_prio = 4
for v in PACK["venues"]:
    vid = v["id"]
    if vid in prio:
        tier = "berth_top"
    elif vid in grande_ids:
        tier = "several"
    else:
        tier = "plenty"
    if vid not in prio:
        prio[vid] = next_prio; next_prio += 1
    q = v.get("maps_query") or f'{v["name"]} {"Piraeus" if "Piraeus" in v.get("neighborhood","") or "Mikrolimano" in v.get("neighborhood","") or "Kastella" in v.get("neighborhood","") else "Athens"}'
    entry = {
        "id": vid, "cat": v.get("cat", "shop"), "tier": tier, "priority": prio[vid],
        "badge": v["badge"][:9], "name": v["name"], "short": v.get("short", v["name"]),
        "lat": v["lat"], "lng": v["lng"], "neighborhood": v["neighborhood"],
        "tags": v.get("tags", []), "productTags": v.get("productTags", [])[:3],
        "why": v["why"], "address": v.get("address", ""), "phone": v.get("phone", ""),
        "hours": v.get("hours", ""),
        "maps": "https://www.google.com/maps/search/?api=1&query=" + urllib.parse.quote_plus(q),
    }
    for k in ("verdict", "signature", "caveat", "person", "signal_chip", "dishes"):
        if v.get(k):
            entry[k] = v[k]
    venues.append(entry)

data = {
    "VENUES": venues, "COLORS": COLORS, "CAT_LABELS": CAT_LABELS,
    "PRODUCT_COLORS": PACK.get("product_colors", {}),
    "NEIGHBORHOODS": PACK["neighborhoods"], "WALKS": PACK["walks_geo"],
    "WORK_SPOTS": PACK["work_spots"], "LANDMARKS": PACK["landmarks"],
    "PHOTOS": PACK["photos"], "GEMS": PACK["gems"],
    "TABLES": PACK["tables"],
}

def js(obj, ind=1):
    return json.dumps(obj, ensure_ascii=False, separators=(",", ":"))

body = "window.TERROIR_DATA = (function () {\n"
for key in ("COLORS", "CAT_LABELS", "PRODUCT_COLORS"):
    body += f"  const {key} = {js(data[key])};\n"
body += "  const VENUES = [\n" + ",\n".join("    " + js(v) for v in venues) + "\n  ];\n"
for key in ("NEIGHBORHOODS", "WALKS", "WORK_SPOTS", "LANDMARKS", "PHOTOS", "GEMS"):
    body += f"  const {key} = [\n" + ",\n".join("    " + js(x) for x in data[key]) + "\n  ];\n"
body += f"  const TABLES = {json.dumps(data['TABLES'], ensure_ascii=False, indent=1)};\n"
body += ("  return { VENUES, COLORS, CAT_LABELS, PRODUCT_COLORS, NEIGHBORHOODS, WALKS, "
         "WORK_SPOTS, LANDMARKS, PHOTOS, GEMS, TABLES };\n})();\n")

OUT.mkdir(parents=True, exist_ok=True)
(OUT / "data.js").write_text(body)

# CSVs — Girona header + verdict/caveat/iconic_orders (csv rule)
HDR = ["name", "category", "neighborhood", "address", "phone", "lat", "lng", "tier",
       "product_tags", "recognition", "what_to_order", "price_range", "reservation",
       "best_time", "notes", "verdict", "caveat", "iconic_orders"]
sec_of = {}
for g in ("grande", "petite"):
    for s in PACK["tables"][g]["sections"]:
        for i in s["ids"]:
            sec_of[i] = s["label"]
rows = []
for v, e in zip(PACK["venues"], venues):
    tags = v.get("tags", ["", "", ""]) + ["", "", ""]
    chip = v.get("signal_chip") or {}
    rows.append([
        v["name"], v["badge"], v["neighborhood"], v.get("address", ""), v.get("phone", ""),
        e["lat"], e["lng"], sec_of.get(v["id"], e["tier"]),
        " · ".join(e["productTags"]), chip.get("full", ""),
        v.get("signature", ""), tags[0], tags[1], tags[2],
        v.get("notes", ""), v.get("verdict", ""), v.get("caveat", ""),
        " · ".join(d["name"] for d in v.get("dishes", [])),
    ])
for path in (OUT / "data.csv", CSV_DIR / f"{SLUG}.csv"):
    path.parent.mkdir(parents=True, exist_ok=True)
    with open(path, "w", newline="") as f:
        w = csv.writer(f); w.writerow(HDR); w.writerows(rows)

print(f"data.js: {len(body)} bytes, {len(venues)} venues "
      f"(berth_top={sum(1 for v in venues if v['tier']=='berth_top')}, "
      f"several={sum(1 for v in venues if v['tier']=='several')}, "
      f"plenty={sum(1 for v in venues if v['tier']=='plenty')}); csv rows={len(rows)}")
