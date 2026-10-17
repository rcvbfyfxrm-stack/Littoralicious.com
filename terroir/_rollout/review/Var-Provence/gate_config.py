#!/usr/bin/env python3
"""Write terroir/_rollout/lib/guides/Paris.check.json from what the build actually contains (16 Oct 2026).
Floors are the curated counts (<=3 per subcategory), never padded."""
import json, re, subprocess, pathlib
REPO = pathlib.Path(__file__).resolve().parents[4]; SLUG = "Paris"
doc = (REPO / f"terroir/{SLUG}/index.html").read_text()
D = json.loads(subprocess.run(["node", "-e", f"global.window={{}};require('./terroir/data/{SLUG}.js');process.stdout.write(JSON.stringify(window.TERROIR_DATA))"],
                              cwd=REPO, capture_output=True, text=True, check=True).stdout)
ids = re.findall(r'<(?:details|section) class="(?:sfold|gx-jump)" id="([^"]+)"', doc)
lane_ids = {i for c in D["TABLES"].values() for s in c["sections"] for i in s["ids"]}
cfg = {"slug": SLUG, "city": "Paris", "listeSlug": "paris", "groups": len(D["GROUPS"]),
       "mapsTokens": ["Paris", "France"],
       "staleTokens": ["Prague", "Praha", "Vltava", "Czech", "Kendwa", "Zanzibar", "Diani", "Kwale", "Siracusa", "Ortigia", "Piraeus", "Sicily", "Barcelona", "Catalunya", "Istanbul"],
       "staleAllow": {"Prague": ["runs on any page cloned from Prague's chrome", "rue de prague"]},
       "bannedExtra": ["paradise", "unspoilt", "off the beaten"],
       "sectionsRequired": [i for i in ids if i != "ce-soir"] + ["dish", "hot"],
       "sectionsForbidden": ["verify", "markets", "producers", "hifi-bars", "map-section", "three-tables", "tables-extended", "history", "band-eat",
                             "work", "crafts", "gastronomy", "music", "drink-place", "rooftops", "linger", "money-sits", "underground", "art", "coffee-scene", "natural-wine", "avoid-traps", "twentyfour", "walk"],
       "floors": {"venues": len(D["VENUES"]), "gems": len(D["GEMS"]), "neighborhoods": len(D["NEIGHBORHOODS"]), "walks": len(D["WALKS"]),
                  "categories": len(D["CATEGORIES"]), "laneStories": len(D["CATEGORIES"]), "fcards": doc.count('<details class="fcard"'),
                  "fsubs": doc.count('<div class="fsub">'), "liste": doc.count("gx-liste__what"),
                  "mapsLinks": len(re.findall(r'href="https://www\.google\.com/maps/search/\?api=1', doc)),
                  "pins": sum(1 for v in D["VENUES"] if v.get("lat") is not None)},
       "renderFloors": {"groups": len(D["GROUPS"]), "cards": len(lane_ids), "gemboxes": len(D["CATEGORIES"])},
       "listePointer": True,
       "hot": {"maxAgeDays": 70, "minVenues": sum(1 for v in D["VENUES"] if v.get("hot_this_month")), "mode": "pointer"},
       "doors": len(D["BRIDGE"]["doors"])}
p = REPO / "terroir/_rollout/lib/guides" / f"{SLUG}.check.json"
json.dump(cfg, open(p, "w"), ensure_ascii=False, indent=2); print("wrote", p.name, cfg["floors"], cfg["renderFloors"], cfg["hot"])
