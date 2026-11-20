"""The editor's reconciliations on the research packs (15 Oct 2026): applied by make_inputs.py, each one stated."""
import re
TOK = re.compile(r"\b(Barcelona|Catalonia|Catalunya)\b")
EDITS = []          # (old, new) exact replacements in card text fields
CARD_SET = {       # key -> {field: value} overrides
 # the source label named a blog with a banned word; same URL, neutral label
 "gastronomy:Formatgeria La Seu": {"sources": [{"label": "La Seu cheese shop, Barri Gòtic (a Barcelona food blog)", "url": "https://foodieinbarcelona.com/la-seu-cheese-shop-barri-gotic/"}]},
}
VENUE_SET = {      # id -> {field: value} overrides
 # the old verdict had the order wrong: the third star came at the November 2023 gala (2024 guide), before the June 2024 No. 1
 "v01-disfrutar": {"verdict": "The rare kitchen that holds both titles at once: three MICHELIN stars from the November 2023 gala, then the World's 50 Best No. 1 in June 2024."},
 # Time Out marks Little Bacoa closed; the kiosk is the address that stands
 "vq-bacoa-kiosko-little-bacoa": {"name": "Bacoa Kiosko", "short": "Bacoa Kiosko"},
}
LANE_STORY_SET = {} # lane -> {field: value}
# ── 20 Nov 2026, with network: own-site checks (the 15 Oct needs-network list) ──
VENUE_SET.update({
 "v01-disfrutar": {**VENUE_SET.get("v01-disfrutar", {}), "statusChecked": "2026-11-20",
   "price_range": "Classic and Festival menus EUR 325 each, wine pairing EUR 180 (own site, valid to Aug 2027; checked 20 Nov 2026)",
   "hours": "Call ahead: closed at weekends by every listing; MICHELIN gives Mon-Fri, Mes Prestiges (June 2026) Tue-Fri 13:00-15:00 and 19:30-22:00; the own site gives no days (checked 20 Nov 2026)"},
 "v04-cocina-hermanos-torres": {"statusChecked": "2026-11-20",
   "price_range": "Revolución menu EUR 330, wine pairing EUR 210 (own site, checked 20 Nov 2026)",
   "hours": "Tue-Sat, closed Sun-Mon (MICHELIN, checked 20 Nov 2026)"},
 "v02-lasarte": {"statusChecked": "2026-11-20",
   "price_range": "Tasting menu EUR 345, Krug menu EUR 450 (own site, checked 20 Nov 2026)",
   "hours": "Wed-Sat 13:00-14:30 and 20:00-21:30; closed Sun-Tue (own site, checked 20 Nov 2026)"},
 "v10-7-portes-set-portes": {"statusChecked": "2026-11-20", "hours": "Daily 13:00-24:00 (own site, checked 20 Nov 2026)"},
 "vn-cal-pep": {"statusChecked": "2026-11-20", "hours": "Mon 19:30-23:30; Tue-Fri 13:00-15:45 and 19:30-23:30; Sat 13:15-15:45 and 19:30-23:30; closed Sun (own site, checked 20 Nov 2026)"},
 "v14-els-pescadors": {"statusChecked": "2026-11-20", "hours": "Daily, kitchen 13:00-15:30 and 20:00-22:15; closed 24 Dec-14 Jan (own site, checked 20 Nov 2026)",
   "price_range": "Seasonal menu EUR 39 without wine (own site, checked 20 Nov 2026)"},
 "v07-bar-ca-ete": {"statusChecked": "2026-11-20", "hours": "Mon-Sat 13:00-24:00, closed Sun (MICHELIN, checked 20 Nov 2026)"},
 "v15-suculent": {"statusChecked": "2026-11-20", "hours": "Mon-Fri 13:00-15:30 and 20:00-22:30; closed Sat-Sun (own site, checked 20 Nov 2026)",
   "address": "Rambla del Raval 45, 08001 Barcelona (own site)"},
 "vr-oniric": {"statusChecked": "2026-11-20", "hours": "Tue-Sat 13:00-15:15 and 20:00-22:30; closed Sun-Mon (own site, checked 20 Nov 2026)",
   "price_range": "Menus EUR 26 (Herrén), EUR 48 (Oníric), EUR 80 (Somni) (own site, checked 20 Nov 2026)"},
 "vc-can-cisa-bar-brutal": {"status": "confirmed", "statusChecked": "2026-11-20", "hours": "Open 7 days: Mon-Thu 19:00-01:00, Fri-Sun 13:00-01:00 (own site, checked 20 Nov 2026)"},
 "vc-bar-la-plata": {"status": "confirmed", "statusChecked": "2026-11-20", "hours": "11:00-15:00 and 18:00-23:00, closed Sun (own site, checked 20 Nov 2026)"},
 "vc-bar-bodega-quimet": {"status": "confirmed", "statusChecked": "2026-11-20"},
})
EDITS.append(("Carrer de la Dagueria 20, Barri Gòtic, next to Formatgeria La Seu", "Carrer de la Dagueria 20, Barri Gòtic"))


def cards(C):
    for k, c in C.items():
        for f in ("teaser", "story", "why", "name"):
            for a, b in EDITS:
                if c.get(f) and a in c[f]: c[f] = c[f].replace(a, b)
        for fa in c.get("facts") or []:
            for a, b in EDITS:
                if a in fa[1]: fa[1] = fa[1].replace(a, b)
        c.update(CARD_SET.get(k, {}))
    # every Maps query carries a local token (the gate's wrong-continent check)
    for k, c in C.items():
        q = c.get("maps_query") or ""
        if q and not TOK.search(q): c["maps_query"] = q + " Catalonia"

def hot(H):
    for g in H["hot"]["groups"] + H["events"]["groups"]:
        for it in g["items"]:
            q = it.get("maps_query") or ""
            if q and not TOK.search(q): it["maps_query"] = q + " Barcelona"

def venues(V):
    for i, d in VENUE_SET.items(): V[i]["set"].update(d)

def lane_stories(L):
    for k, d in LANE_STORY_SET.items(): L.setdefault(k, {}).update(d)
