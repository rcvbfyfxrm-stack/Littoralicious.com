"""The editor's reconciliations between the research packs (12 Oct 2026). Every change is explicit."""
import json, pathlib, re
RV = pathlib.Path(__file__).resolve().parent
OLDV = json.load(open(RV / "research" / "venues_old_kept.json"))

# The chef and the restaurant are 'Tutak' in MICHELIN's own text and on the house's; the old guide wrote 'Tütak'.
# Since the 2026 selection Vino Locale (İzmir) also holds two stars: TURK is Istanbul's only two-star, no longer Turkey's.
TEXT = [("Tütak", "Tutak"), ("Turkey's only two-star chef", "Istanbul's only two-star chef"), ("Türkiye's only two-star", "Istanbul's only two-star"),
        ("Turkey's only two-star", "Istanbul's only two-star"), ("⚠ ", ""), ("⚠", "")]
def _t(x):
    if isinstance(x, str):
        for a, b in TEXT: x = x.replace(a, b)
        return x
    if isinstance(x, list): return [_t(i) for i in x]
    if isinstance(x, dict): return {k: _t(v) for k, v in x.items()}
    return x

def cards(C):
    for k in list(C): C[k] = _t(C[k])

def hot(H):
    # the hot pack read one source as 'closed June to September'; the venue re-check found it pours şıra in summer
    # (not winter-only). Keep only what both agree on.
    H["venue_hot"]["vefa-bozacisi"] = ("Boza is the cold-season drink and October is when it is back at the counter; in summer the shop pours şıra "
                                       "instead, and its hours are unconfirmed, so check before you cross the city for it (checked 12 Oct 2026).")
    s = json.dumps(H, ensure_ascii=False).replace("17 theatre, performance and dance pieces", "17 theatre, performance and dance pieces")
    s = re.sub(r"\bcurated\b", "chosen", s)
    H.clear(); H.update(_t(json.loads(s)))

DISHES = {
 # two plates MICHELIN's own page names (checked 12 Oct 2026), beside the Gault&Millau plate already on the record
 "basta-neo-bistro": [{"name": "Sweet brioche with tomato jam, onion and stracciatella", "note": "named by MICHELIN; the menu changes with the seasons"},
                      {"name": "Pan con tomate with salted anchovies", "note": "named by MICHELIN"}],
 # from the guide's own La liste and The Dish: the olive-oil trays and the rotating regional mantı
 "ciya-sofrasi": [{"name": "Zeytinyağlı trays", "note": "the vegetables cooked in olive oil and served cold, yaprak sarma among them"},
                  {"name": "Mantı", "note": "the regional versions rotate through the counter"}],
}
DISH_SRC = {"basta-neo-bistro": {"label": "MICHELIN Guide — Basta Neo Bistro, Istanbul", "url": "https://guide.michelin.com/lv/en/istanbul-province/istanbul/restaurant/basta-neo-bistro"}}

def venues(V):
    for vid, u in V.items():
        s = u["set"]
        if not s.get("status"):            # the pack kept the old status unchanged: carry it explicitly
            s["status"], s["statusChecked"] = OLDV[vid]["status"], OLDV[vid]["statusChecked"]
        for f in ("verdict", "caveat", "hook", "why", "hours", "reservation", "price_range", "person", "signature", "cosign"):
            if f not in s and isinstance(OLDV[vid].get(f), str):
                nv = _t(OLDV[vid][f])
                if nv != OLDV[vid][f]: s[f] = nv
        if "signal_chip" in OLDV[vid] and "signal_chip" not in s:
            nv = _t(OLDV[vid]["signal_chip"])
            if nv != OLDV[vid]["signal_chip"]: s["signal_chip"] = nv
        if "guest" in OLDV[vid] and "guest" not in s:
            nv = _t(OLDV[vid]["guest"])
            if nv != OLDV[vid]["guest"]: s["guest"] = nv
        u["set"] = _t(s); u["evidence"] = _t(u.get("evidence", ""))
    for vid, d in DISHES.items():
        old = OLDV[vid].get("dishes", [])
        V[vid]["set"]["dishes"] = (old if vid == "basta-neo-bistro" else []) + d
        if vid in DISH_SRC: V[vid]["sources"].append(DISH_SRC[vid])
