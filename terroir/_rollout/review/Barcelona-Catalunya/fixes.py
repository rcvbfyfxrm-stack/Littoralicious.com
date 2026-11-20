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

# ── 20 Nov 2026 (Arnaud): more rooms to linger & work (hotel lobbies, Volta, a free work café) + 303 in the listening rooms ──
S_ = lambda l, u: {"label": l, "url": u}
NEW_CARDS = {
 "coffee-gardens:Work Café Santander": {"name": "Work Café Santander", "tag": "the free desk",
  "teaser": "A bank's ground floor turned into a free work room: fast wifi, a coffee bar, no customer card needed",
  "story": "Santander opened its Work Café on Passeig de Gràcia in 2021, one of a chain of branches the bank rebuilt as open workrooms. Anyone can walk in, client or not: long tables, free high-speed internet, a coffee bar with pastries, and talks in the evening. It is the one place on the boulevard where an afternoon at a laptop is the point, not a favour.",
  "why": "For a real working afternoon in the centre, come here and leave the specialty bars for the cup.",
  "facts": [["Where", "Passeig de Gràcia 54, Eixample"], ["Open", "Weekdays; a directory gives Mon–Thu 08:30–19:00, Fri to 14:30 (check, Nov 2026)"], ["Order", "A coffee at the bar, then the table is yours"], ["Work?", "Yes: open to all, free wifi; no eating at the work tables"]],
  "maps_query": "Work Café Santander Passeig de Gràcia 54 Barcelona", "site": "https://www.workcafe.es/es/inicio", "ref": "",
  "sources": [S_("Banco Santander: Work Café, open to clients and non-clients", "https://www.bancosantander.es/particulares/banca-online/work-cafe"), S_("Work Café Santander (official)", "https://www.workcafe.es/es/inicio")]},
 "coffee-gardens:Volta, MIIRO Borneta": {"name": "Volta, Borneta", "tag": "coffee under a skylight",
  "teaser": "The Born hotel bar that pours coffee by day under a skylight and turns to aperitivo at night",
  "story": "Volta is the restaurant and bar on the ground floor of MIIRO Borneta, the hotel that was the Hotel Borneta, on Passeig de Picasso facing the Ciutadella park. By day light falls through a big skylight onto the bar and coffee is served to stay or take away; by night it is aperitivo, cocktails and wine, and the hotel's 180º roof bar is five floors up. The lounge and library are bookable work desks through a paid membership, not free.",
  "why": "A calm coffee after the Born's market and the park, in a room that is not a chain café.",
  "facts": [["Where", "Passeig de Picasso 26, El Born"], ["Open", "Coffee by day, bar at night; hours on the hotel site (Nov 2026)"], ["Order", "A coffee by day; an aperitivo after six"], ["Work?", "For an hour with a coffee; the hotel's desks are paid (Croissant membership)"]],
  "maps_query": "Volta MIIRO Borneta Passeig de Picasso 26 Barcelona", "site": "https://www.miirohotels.com/hotelborneta/eat-and-drink", "ref": "",
  "sources": [S_("MIIRO Borneta: eat and drink (Volta)", "https://www.miirohotels.com/hotelborneta/eat-and-drink"), S_("Croissant: work desks at Borneta, El Born", "https://www.getcroissant.com/coworking-spaces/barcelona/el-born/borneta"), S_("Difford's Guide: Bar Volta", "https://www.diffordsguide.com/bars/9NM067/bar-volta")]},
 "coffee-gardens:Cotton House Hotel — Batuar": {"name": "Cotton House", "tag": "the cotton guild's house",
  "teaser": "Coffee in the old headquarters of the cotton trade, with a green terrace open to visitors",
  "story": "Cotton House on the Gran Via was built as the headquarters of the cotton textile foundation, the guild of the trade that made nineteenth-century Barcelona rich. Its Batuar restaurant and bar, named after the machine that pressed cotton, is open to visitors as well as guests and keeps a large terrace thick with plants. The library, once a meeting room of the cotton producers, is the hotel's best room.",
  "why": "One quiet coffee on the terrace, and a look at a nineteenth-century trade house from the inside.",
  "facts": [["Where", "Gran Via de les Corts Catalanes 670, Eixample"], ["Open", "Bar from 12:00 to midnight by the hotel's page (Nov 2026; it also gives service from 07:00)"], ["Order", "A coffee on the terrace"], ["Work?", "Not stated: a short session at most, and ask"]],
  "maps_query": "Cotton House Hotel Gran Via 670 Barcelona", "site": "https://www.hotelcottonhouse.com/en/batuar-restaurant-and-bar", "ref": "",
  "sources": [S_("Cotton House Hotel: Batuar restaurant and bar", "https://www.hotelcottonhouse.com/en/batuar-restaurant-and-bar"), S_("MICHELIN Guide: Cotton House Hotel", "https://guide.michelin.com/en/hotels-stays/barcelona/cotton-house-hotel-autograph-collection-10890")]},
 "coffee-gardens:Hotel Pulitzer — the lobby": {"name": "Pulitzer lobby", "tag": "a lobby that is a meeting place",
  "teaser": "A hotel lobby a minute from Plaça Catalunya that locals use as a meeting room",
  "story": "The Pulitzer sits on Carrer de Bergara, a few steps off Plaça Catalunya, and its lobby works as a meeting point for guests and for people from the city alike, Directo al Paladar wrote in 2025. The hotel says its lobby bar is open to locals and visitors. Lázaro Rosa-Violán designed the rooms, and from May to October the evenings bring DJs and live sets.",
  "why": "The easy coffee meeting in the centre, away from the Plaça's crowds.",
  "facts": [["Where", "Carrer de Bergara 8, by Plaça Catalunya"], ["Open", "Hotel lobby; check the bar's hours (Nov 2026)"], ["Order", "A coffee for a meeting"], ["Work?", "Public areas have free wifi; ask before a long session"]],
  "maps_query": "Hotel Pulitzer Carrer de Bergara 8 Barcelona", "site": "https://www.hotelpulitzer.es", "ref": "",
  "sources": [S_("Directo al Paladar: the Pulitzer, a hotel to live the city (31 Oct 2025)", "https://www.directoalpaladar.com/viajes/cosmopolita-como-propia-barcelona-hotel-para-vivir-esencia-ciudad-360-grados-terraza-restaurante"), S_("MICHELIN Guide: Hotel Pulitzer", "https://guide.michelin.com/en/hotels-stays/barcelona/hotel-pulitzer-barcelona-188"), S_("Time Out Barcelona: Hotel Pulitzer", "https://www.timeout.com/barcelona/hotels/hotel-pulitzer")]},
 "coffee-gardens:El Palace — Grand Hall tea": {"name": "El Palace tea", "tag": "the 1919 hall",
  "teaser": "Afternoon tea with live music in the grand hall of the 1919 hotel, sold to non-guests",
  "story": "El Palace, the hotel the Ritz opened in Barcelona in 1919, sells its afternoon tea to anyone: tea or coffee with sweet and savoury bites in the Grand Hall, with live music at the late-afternoon sitting. The rooftop Winter Garden is a different thing, a tasting-menu restaurant open only in the evenings in winter.",
  "why": "One afternoon of grand-hotel ceremony; book it, and leave the laptop on board.",
  "facts": [["Where", "Gran Via de les Corts Catalanes 668, Eixample"], ["Open", "Afternoon tea from about 16:00–17:00 to 18:30–19:00 (listings differ; check, Nov 2026)"], ["Order", "The afternoon tea, from about EUR 48 by a ticket listing"], ["Work?", "No: book it as an occasion"]],
  "maps_query": "El Palace Barcelona Gran Via 668", "site": "", "ref": "",
  "sources": [S_("Fever: Afternoon Tea at the Grand Hall, El Palace", "https://feverup.com/m/254480/en"), S_("Time Out Barcelona: Winter Garden, El Palace", "https://www.timeout.com/barcelona/restaurants/winter-garden")]},
 "listening:303 Audiophile Bar": {"name": "303 Audiophile Bar", "tag": "the club-grade system",
  "teaser": "The basement of a brewery on Casp: house and electro on vinyl through one of the city's best systems",
  "story": "Under La Textil Collective, a brewery and kitchen in a former textile warehouse on Carrer de Casp opposite Gaudí's Casa Calvet, the 303 is a small dark room built for sound: the venue calls it one of Barcelona's best systems, and DJs play house, minimal and electro, on vinyl from Thursday to Saturday by Time Out's account. Entry is free before 23:00; event nights can charge after.",
  "why": "Arrive before eleven, take a beer from upstairs, and stay for the second set.",
  "facts": [["Where", "Carrer de Casp 33B, Eixample (basement of La Textil)"], ["Pour", "The house beers from the brewery upstairs"], ["Price", "Free before 23:00; some nights about EUR 12 after (Resident Advisor)"], ["Best hour", "Thu–Sat late; La Textil open to 02:00–02:30 Thu–Sat, closed Mon (own site, Nov 2026)"]],
  "maps_query": "La Textil Collective Carrer de Casp 33 Barcelona", "site": "https://latextil.beer/ecosystem", "ref": "",
  "sources": [S_("La Textil Collective: the ecosystem (303)", "https://latextil.beer/ecosystem"), S_("Time Out Barcelona: La Textil (23 Oct 2024)", "https://www.timeout.es/barcelona/es/bares-y-pubs/la-textil"), S_("Resident Advisor: an event at 303 (24 Jul 2026)", "https://ra.co/events/2466556")]},
}
_cards_orig = cards
def cards(C):
    _cards_orig(C)
    for k, v in NEW_CARDS.items(): C[k] = v
