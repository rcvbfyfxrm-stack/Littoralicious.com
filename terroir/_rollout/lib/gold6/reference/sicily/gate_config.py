#!/usr/bin/env python3
"""Write terroir/_rollout/lib/guides/<Slug>.check.json for a city guide, from what the build actually
contains. Floors are set to the curated counts (Arnaud 5 Oct 2026: ≤3 per subcategory), never padded."""
import json, sys, pathlib, re
from layouts import CITIES
B = pathlib.Path(__file__).parent; CITY = sys.argv[1]; C = CITIES[CITY]
D = B / "cities" / CITY; REPO = pathlib.Path("/private/tmp/litto-split")
doc = (D / "out" / "index.html").read_text(); data = json.load(open(D / f"{C['slug']}-data.json"))
ids = re.findall(r'<(?:details|section) class="(?:sfold|gx-jump)" id="([^"]+)"', doc)
TOK = {"siracusa": ["Siracusa", "Ortigia", "Noto", "Modica", "Ragusa", "Marzamemi", "Avola", "Sortino", "Scicli", "Vittoria", "Palazzolo", "Pachino", "Vendicari", "Portopalo"],
       "catania": ["Catania", "Acireale", "Aci Trezza", "Aci Sant'Antonio", "Milo", "Viagrande", "Zafferana", "Nicolosi", "Bronte", "Gravina", "Caltagirone", "Augusta", "Etna"],
       "taormina": ["Taormina", "Castelmola", "Giardini Naxos", "Linguaglossa", "Castiglione", "Randazzo", "Riposto", "Giarre", "Motta Camastra", "Savoca", "Messina", "Ganzirri", "Etna"]}[CITY] + ["Sicilia"]
other = {"siracusa": ["Taormina", "Catania"], "catania": ["Taormina"], "taormina": ["Ortigia"]}[CITY]
cfg = {"slug": C["slug"], "city": C["city"], "listeSlug": C["listeSlug"], "groups": len(data["GROUPS"]),
       "mapsTokens": TOK, "staleTokens": ["Prague", "Praha", "Vltava", "Czech", "Kendwa", "Zanzibar", "Istanbul"],
       "staleAllow": {}, "bannedExtra": ["paradise", "unspoilt", "off the beaten"],
       "sectionsRequired": [i for i in ids if i not in ("ce-soir",)] + ["dish"],
       "sectionsForbidden": ["verify", "markets", "producers", "hifi-bars", "map-section", "three-tables", "tables-extended", "history", "band-eat", "coffee-gardens", "linger", "rooftops"],
       "floors": {"venues": len(data["venues"]), "gems": len(data["GEMS"]), "neighborhoods": len(data["NEIGHBORHOODS"]), "walks": len(data["WALKS"]),
                  "categories": len(data["CATEGORIES"]), "laneStories": len(data["CATEGORIES"]), "fcards": doc.count('<details class="fcard"'),
                  "fsubs": doc.count('<div class="fsub">'), "liste": len(json.load(open(D / "liste.json"))), "mapsLinks": 60,
                  "pins": sum(1 for v in data["venues"] if v.get("lat") is not None)},
       "renderFloors": {"groups": len(data["GROUPS"]), "cards": len(data["venues"]), "gemboxes": len(data["CATEGORIES"])},
       "listePointer": True, "hot": {"maxAgeDays": 70, "minVenues": len(data["HOT"]), "mode": "pointer"}}
p = REPO / "terroir/_rollout/lib/guides" / f"{C['slug']}.check.json"
json.dump(cfg, open(p, "w"), ensure_ascii=False, indent=1); json.dump(cfg, open(D / f"{C['slug']}.check.json", "w"), ensure_ascii=False, indent=1)
print("wrote", p.name, cfg["floors"])
