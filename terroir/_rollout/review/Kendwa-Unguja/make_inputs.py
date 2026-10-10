#!/usr/bin/env python3
"""Assemble cards.json, venues.json and hot_events.json for build_gold6.py from the research and
rewrite packs (research/), plus the editor's hand fixes below. 7 Oct 2026.
STATUS RULE (honest): the 7 Oct re-check could not load any venue's own site (the sandbox egress proxy
refused them), only search indexes. So: 2026-dated evidence -> confirmed, checked 2026-10-07; old
'confirmed' with nothing contradicting it -> stays confirmed with its 22 Aug 2026 date; else unverified."""
import json, pathlib, re
RV = pathlib.Path(__file__).resolve().parent; R = RV / "research"
J = lambda p: json.load(open(p))
VER = {}
for n in (1, 2, 3, 4): VER.update(J(R / f"verify_{n}.json"))
CARDS = {}
for n in (1, 2, 3): CARDS.update(J(R / f"rewrite_{n}.json")["cards"])
HOT = J(R / "hot_events.json")
PICKS = J(RV / "picks.json")

# ── card fixes after the re-checks ─────────────────────────────────────────
c = CARDS["r-leven"]
c["teaser"] = "A drowned reef in open channel off the north tip, dived only on the right tide"
c["story"] = ("Out in the Pemba Channel north of the island lies a submerged bank, coral and sand patches on its top, open water all round. "
              "Big water and big fish, and the current that brings them is the reason it can only be dived on certain tides: the attraction and the hazard in the same breath. "
              "Every centre here says the same thing: experienced divers only, and not as your first dive of a trip. "
              "How big and how deep it is depends on whom you read, and we print the argument rather than a number. "
              "The name very likely honours HMS Leven, which charted this coast in the 1820s, though we could not confirm it from a primary source.")
c["facts"] = [["Where", "Pemba Channel, north of the island"],
              ["Where the sources argue", "The old guide gave walls past 160 m and a bank about two nautical miles long; dive sources checked in Oct 2026 give a top at about 14 m, dived to about 50 m"],
              ["Level", "Experienced divers only, never your first dive of a trip"], ["Tides", "Divable only on certain tides"],
              ["Book", "On a tide, not a date, with a centre in Kendwa or Nungwi"], ["Ask", "The dive desk to show you why, on the tide table"]]
c = CARDS["r-mnemba"]
c["tag"] = "conservation fee"
c["facts"] = [f for f in c["facts"] if f[0] != "Cost"]
c["facts"].insert(1, ["Cost", "Two fee zones since 1 Sep 2025: US$10 a day per adult from outside East Africa for the conservation area, US$25 for the Marine Special Area round the island (press reports, Oct 2026)"])
c["sources"] = c.get("sources", []) + [{"label": "The Citizen (Tanzania): Zanzibar revises marine conservation fees (Sep 2025)", "url": "https://www.thecitizen.co.tz/"}] if False else c.get("sources", [])
c = CARDS["w-kendwa-nungwi"]
c["facts"] = [["Best hour", "Low water, with margin for the return; never after dark"] if f[0] == "Best hour" else f for f in c["facts"]]
for k_, tx in (("why:tumbatu", None),): pass

c = CARDS["l-tumbatu"]
c["story"] = c["story"].replace(" Between roughly 1100 and 1300 Jongowe was among the largest settlements on the whole Zanzibar coast, and ruins from that time stand at Makutani.", " Its medieval town is a ruin now, with the largest mosque standing on the shore facing Mkokotoni.")
c["story"] = c["story"].replace(" It is the most historically important thing you can see from Kendwa sand and the one you are least entitled to walk into.", "")
c["facts"] = [f for f in c["facts"] if f[0] != "Don't miss"] + [["Don't miss", "The ruined mosque on the shore facing Mkokotoni, on a permitted visit"],
              ["Where the sources argue", "The town's dates: the August guide's sources gave roughly 1100 to 1300; sources read in October 2026 give the 12th to the 15th century"]]
c = CARDS["s-watumbatu"]
c["story"] = c["story"].replace(" Between roughly 1100 and 1300 Tumbatu was no backwater but a state centre trading across the Indian Ocean, and from about 1150 its town of Jongowe was among the largest settlements on the Zanzibar coast.", "")
c["facts"] = [["Touch it today", "Look west from Kendwa sand at sunset: that is Tumbatu; its ruins are for permitted visits only"]] + [f for f in c["facts"] if f[0] != "Touch it today"]
c = CARDS["o-mangapwani"]
c["teaser"] = "A coral cave with a freshwater spring, and down the coast a cell cut in stone and used until about 1905"
c["story"] = c["story"].replace("Two sites a kilometre apart on the west-coast road", "Two sites close together on the west-coast road")
c["facts"] = [["Cost", "About US$5 a foreign adult (Oct 2026, guides)"] if f[0] == "Cost" else f for f in c["facts"]] + [["Where the sources argue", "How far apart the two are: a kilometre in older guides, a few kilometres in Showcaves' account"]]

c = CARDS["t-water-stays"]
c["story"] = c["story"].replace("so there is water deep enough to swim at any state of the tide.", "so there is usually water deep enough to swim whatever the tide is doing.")
for k in ("m-rest",):  # refs the plan did not ask for are kept only when they point to a table card
    pass

# pointer cards written by the editor (bars, rooms to linger) — facts from the venue records + the 7 Oct checks
EXTRA = {
 "b-kendwa-rocks": {"name": "Kendwa Rocks", "tag": "since 1996", "ref": "kendwa-rocks",
   "teaser": "Where the Full Moon Party began; the other nights, a cold Kilimanjaro on the best-placed sand",
   "story": "On an ordinary evening it is a beach bar with a kitchen, on the stretch of Kendwa sand everyone else measures from. Once a month it is the party the beach is known for, and that night is a different place.",
   "why": "", "facts": [["Order", "A cold Kilimanjaro at sunset"], ["When", "Sunset; the club opens Tue, Thu and Sat from 22:00 (Aug 2026)"], ["Book", "Not for the bar"], ["Price", "Low to mid (Aug 2026)"]]},
 "b-sunset-kendwa": {"name": "Sunset Kendwa", "tag": "the quiet half", "ref": "sunset-kendwa",
   "teaser": "The same sun as the famous bar next door, at a tenth of the volume",
   "story": "A lodge bar a short walk up the sand from Kendwa Rocks, and the sane answer on a night the neighbours are at full tilt. Order simply.",
   "why": "", "facts": [["Order", "Grilled fish and a sundowner"], ["When", "Day into evening; listings say the lodge closes 24 Dec to 10 Jan"], ["Book", "No"], ["Price", "Low to mid (Aug 2026)"]]},
 "b-bahari": {"name": "Bahari Grill & Bar at Zuri", "tag": "the serious drink", "ref": "zuri-zanzibar",
   "teaser": "Zuri's beach bar: grills, small plates and cocktails with the light coming in low across the water",
   "story": "The most considered drink on Kendwa sand, at resort prices. Non-residents are welcome but should book, and the walk in from the village road is longer than it looks.",
   "why": "", "facts": [["Order", "A cocktail and small plates from the grill"], ["When", "Late afternoon into sunset"], ["Book", "Yes, if you are not staying"], ["Price", "Resort, upper band"]]},
 "b-maisha": {"name": "Maisha Beach", "tag": "the beach that cooks", "ref": "maisha-beach",
   "teaser": "A beach restaurant that takes the kitchen seriously, on the sand in front of Maisha Nungwi",
   "story": "The bar to eat at on Nungwi sand. Its music nights change with the season and Ramadan: ask before you plan an evening around one.",
   "why": "", "facts": [["Order", "Grilled seafood and a cocktail"], ["When", "Sunset into dinner"], ["Book", "Call or WhatsApp for a table on a weekend"], ["Price", "Mid"]]},
 "b-cholos": {"name": "Cholo's", "tag": "halved dhows", "ref": "cholos",
   "teaser": "Hammocks over the bar and benches cut from halved dhow hulls: the boats are real boats",
   "story": "The long-running driftwood bar of Nungwi village, with live music some nights. Go for the room, not the kitchen.",
   "why": "", "facts": [["Order", "Konyagi and tonic"], ["When", "Afternoon into late"], ["Book", "No"], ["Price", "Low"]]},
 "b-z-rooftop": {"name": "The Z rooftop", "tag": "sunset seat", "ref": "z-rooftop",
   "teaser": "The best sunset seat on the cape, with the minimum spend stated up front",
   "story": "A small roof on top of The Z Hotel, facing west over the channel. It fills before the sun goes: arrive early or stand.",
   "why": "", "facts": [["Order", "A happy-hour cocktail"], ["When", "Happy hour 17:00 to 20:00"], ["Book", "Not taken: arrive early"], ["Price", "US$15 minimum spend per non-resident; 2% on cards (reviews, 2026)"]]},
 "b-village-line": {"name": "The village line", "tag": "the warning",
   "teaser": "Drink belongs on the sand and in the hotels. Not past that, and not with an open bottle",
   "story": "Drink is served on the sand and inside hotel compounds and is all but absent from the lanes behind them. Carrying an open bottle inland, or walking the village lanes in beachwear, is not a cultural misunderstanding: it is rude, and people will tell you so, politely, once. The same village runs the fish market, the boatyards and the kitchens you came for.",
   "why": "Finish the drink where you bought it, and cover shoulders and knees before you walk inland.",
   "facts": [["Where", "Everything inland of the beach bars, in Nungwi and Kendwa"], ["Do", "Finish drinks on the sand; cover shoulders and knees inland"], ["Don't", "Carry an open bottle into the village"]]},
 "g-mama-mia": {"name": "Mama Mia", "tag": "the gelato cabinet", "ref": "mama-mia-nungwi",
   "teaser": "Shade, an espresso and an Italian gelato cabinet, on the beach in Nungwi",
   "story": "The most functional daytime seat on the strip: proper coffee in the heat of the day, then a cone to walk down the sand at sunset. Reviewers call it expensive for Zanzibar.",
   "why": "", "facts": [["Order", "An espresso, then a gelato"], ["When", "Late morning to mid-afternoon, the hours too hot for the sand"], ["Book", "No"], ["Price", "Mid to upper (reviews, Oct 2026)"]]},
 "g-langi": {"name": "Langi Langi, Marhaba terrace", "tag": "empty till five", "ref": "langi-langi",
   "teaser": "A covered terrace at the water's edge, empty for six hours in the middle of the day",
   "story": "The terrace of Langi Langi's Marhaba restaurant sits right by the water and nobody uses it between breakfast and sunset, which is exactly when you should. There is a café for coffee. From about half past five it fills for the sun.",
   "why": "", "facts": [["Order", "Coffee at Marhaba Café"], ["When", "After breakfast until about 17:30"], ["Book", "Only for a sunset table"], ["Price", "Mid"]]},
 "g-flame-tree": {"name": "Flame Tree Cottages garden", "tag": "real shade",
   "teaser": "A garden of cottages at the quiet north-west end of Nungwi beach, shaded and facing west",
   "story": "A small hotel of cottages in a private garden at the quiet north-west end of Nungwi beach, with garden restaurants and tables set out on the sand. The trees are the point between noon and four, when the sand is too hot to cross barefoot and the strip is at its loudest: sit in the shade with something cold, read, and you are still facing west when the sun goes down over the channel.",
   "why": "", "facts": [["Where", "The quiet north-west end of Nungwi beach"], ["When", "Early afternoon, the hottest hours"], ["Order", "Something cold from the garden restaurant"]],
   "maps_query": "Flame Tree Cottages Nungwi Zanzibar"},
}
EXTRA["o-the-roof"] = {"name": "…or stay the night for the roof", "tag": "the better plan", "ref": "emerson-hurumzi",
   "teaser": "One seating at seven on a Stone Town roof, on rugs, with the call to prayer rising from four directions",
   "story": "The argument for a night in Stone Town is a roof. Dinner at Emerson on Hurumzi is one seating, and you cannot have it and drive back to Kendwa the same night: book the bed with the table.",
   "why": "", "facts": [["Order", "The three-course Swahili dinner, US$45, drinks extra (own site via search index, Oct 2026)"], ["When", "Guests from 18:00, one seating at 19:00"],
                       ["Book", "Required, with a deposit"], ["Price", "US$45 a head before drinks"]]}
for k, v in EXTRA.items():
    v.setdefault("maps_query", ""); v.setdefault("site", ""); v.setdefault("sources", []); CARDS[k] = v
json.dump(CARDS, open(RV / "cards.json", "w"), ensure_ascii=False, indent=1)

# bars + coffee-gardens groups in the plan
PLAN = J(RV / "card_plan.json")
PLAN["bars"] = {"chapter": "sortir", "sub": "bars", "groups": [
  {"title": "Kendwa", "cards": [{"key": "b-kendwa-rocks"}, {"key": "b-sunset-kendwa"}, {"key": "b-bahari"}]},
  {"title": "Nungwi", "cards": [{"key": "b-maisha"}, {"key": "b-cholos"}, {"key": "b-z-rooftop"}]},
  {"title": "Where it stops, and why", "cards": [{"key": "b-village-line"}]}]}
PLAN["coffee-gardens"]["groups"][0]["cards"] = [{"key": "g-mama-mia"}, {"key": "g-langi"}, {"key": "g-flame-tree"}]
json.dump(PLAN, open(RV / "card_plan.json", "w"), ensure_ascii=False, indent=1)

# ── hot board + events: told once (the party, the whales and Sauti live in one place each)
def drop(groups, names):
    for g in groups: g["items"] = [i for i in g["items"] if i["name"] not in names]
    return [g for g in groups if g["items"]]
HOT["hot"]["groups"] = drop(HOT["hot"]["groups"], {"Durian, if you can find it", "Sauti za Busara 2027 has new dates"})
HOT["events"]["groups"] = drop(HOT["events"]["groups"], {"Full Moon Party, every month", "Whale season"})
for sec in ("hot", "events"):
    for g in HOT[sec]["groups"]:
        for i in g["items"]:
            i["tag"] = i["tag"].lower(); i.setdefault("maps_query", ""); i.setdefault("site", "")
            for f in i["facts"]: f[1] = f[1].replace("-", "–") if re.search(r"\d-\d", f[1]) else f[1]
HOT["listening"]["name"] = "No listening bar — hear taarab instead"; HOT["listening"]["tag"] = "honestly"
HOT["listening"].setdefault("maps_query", ""); HOT["listening"].setdefault("site", "")
json.dump(HOT, open(RV / "hot_events.json", "w"), ensure_ascii=False, indent=1)

# ── venues: status + date + fresh hook/why + the corrections the re-check found ──
OLD = json.loads(open(RV / "research" / "old_venues.json").read())
OV = {v["id"]: v for v in OLD}
KEEP = [i for l in PICKS["lanes"].values() for i in l["ids"]] + PICKS["keep_pins"]
FIX = {
 "kilindi": {"hours": "Resort dining for residents: terrace and beach service; no à la carte street trade", "productTags": ["ABBA domes"],
             "dishes": [{"name": "Whatever the boat landed"}, {"name": "Swahili coconut curry"}]},
 "zuri-zanzibar": {"productTags": ["EarthCheck Gold"], "hours": "Three restaurants: Upendo, Maisha and Bahari Grill & Bar; non-residents book",
                   "signature": "The last of the light from Bahari Grill, after the spice-garden tour",
                   "reservation": "Book ahead if you are not staying",
                   "dishes": [{"name": "Grills and small plates at Bahari"}, {"name": "Spice-garden plates"}, {"name": "Sugar-cane cocktails at Bahari"}]},
 "sexy-fish": {"signature": "Tuna ceviche or lobster tempura on the west deck at the golden hour",
               "verdict": "The best cooking on the north tip outside the five-star resorts.",
               "caveat": "Book. Small deck, and the sunset tables go well ahead in high season. Some reviewers find the service slow: order early.",
               "tags": ["West-facing deck", "African-European seafood", "Book ahead"],
               "dishes": [{"name": "Tuna ceviche"}, {"name": "Lobster tempura"}, {"name": "Crab curry"}, {"name": "Cocktails on the deck"}]},
 "maisha-beach": {"hours": "Day into night; music nights vary with the season — ask before you plan around one",
                  "signature": "Grilled seafood on the sand as the light goes", "reservation": "Call or WhatsApp for a weekend table",
                  "neighborhood": "Nungwi · on the sand in front of Maisha Nungwi (formerly Aluna)",
                  "tags": ["Beach restaurant", "Maisha Nungwi", "Sunset side"],
                  "dishes": [{"name": "Grilled seafood"}, {"name": "Fish coconut curry", "note": "as reviewers describe it, Oct 2026"}, {"name": "Fresh juices and smoothies"}]},
 "mama-mia-nungwi": {"price_range": "Mid to upper — reviewers call it expensive for Zanzibar (Oct 2026)", "neighborhood": "Nungwi · on the beach",
                     "tags": ["Italian gelato", "Brick-oven pizza", "On the beach"],
                     "signature": "A cone of gelato walked down the beach at sunset",
                     "verdict": "The Italian room on Nungwi sand: pizza from the brick oven and a gelato cabinet at the end of the day.",
                     "dishes": [{"name": "Italian gelato"}, {"name": "Brick-oven pizza"}, {"name": "Homemade tiramisu"}]},
 "langi-langi": {"tags": ["Marhaba restaurant", "At the water's edge", "Traditional Zanzibari dinner"],
                 "dishes": [{"name": "Traditional Zanzibari dinner"}, {"name": "Seafood"}, {"name": "Coffee at Marhaba Café"}],
                 "signature": "A seafood dinner at Marhaba as the sun goes into the channel"},
 "z-rooftop": {"caveat": "⚠ US$15 per person minimum for non-residents at sunset, and a 2% fee on cards (reviews, 2026). Arrive well before sunset or you will be standing.",
               "price_range": "US$15 minimum spend per non-resident (2026)", "tags": ["Happy hour 17:00–20:00", "US$15 minimum", "Arrive early"]},
 "makofi": {"hours": "BBQ night weekly; Pizza Gourmet by Makofi the rest of the week", "signature": "The weekly BBQ night",
            "verdict": "The best-value set-piece evening in Nungwi.", "caveat": "BBQ night is weekly and the night can move: ask which one the day you arrive, and book it.",
            "price_range": "BBQ US$25 adults, US$20 children and vegetarians (seen Oct 2026)", "reservation": "Essential for BBQ night",
            "tags": ["Weekly BBQ night", "Roman pizza", "Guest house"], "dishes": [{"name": "The BBQ night"}, {"name": "Roman scrocchiarella pizza"}]},
 "passion-thyme": {"tags": ["French bakery", "Deli", "Breakfast to dinner"], "badge": "BAKERY", "hours": "Breakfast through dinner",
                   "verdict": "The bread is the reason: a French bakery and deli on a coast with very little of either.",
                   "caveat": "Off the beach, next to Nungwi House.", "neighborhood": "Nungwi · next to Nungwi House, off the beach",
                   "dishes": [{"name": "Bread and pastries"}, {"name": "Breakfast"}, {"name": "Deli plates"}]},
 "highland": {"verdict": "Good company at a fraction of the beach price, and the last room awake.",
              "caveat": "A guest house with a pool as well as a bar; basic. Inland and unlit — walk back with someone."},
 "che-rock": {"hours": "Daily 12:00–23:00 (Aug 2026); one listing gives 16:30–00:00 — call ahead", "tags": ["Tacos and burgers", "Cocktails", "Beach entrance"],
              "signature": "A burger and a cocktail late in the evening"},
 "hanoi-house": {"productTags": [], "caveat": "A franchise of the Paje café (opened 2021): judge it on the broth, which holds up. Pork is on the menu."},
 "essque-zalu": {"caveat": "The east side loses the sunset — a lunch and moonlight address. The Jetty closes Monday to Wednesday in low season (2026 notice)."},
 "gold-zanzibar": {"caveat": "Resort pricing, and the beach in front is public. Closed for its annual break 9 May–10 June in 2026."},
 "combo-1990": {"hours": "12:00–23:00, closed Mondays (Aug 2026); one listing gives 11:00–23:00 daily — check",
                "caveat": "Cash. No alcohol — a village kitchen in a Muslim village. Dress covered walking here. Check whether it is open on a Monday."},
 "cholos": {"tags": ["Long-running", "Live music", "Halved dhows as furniture"]},
 "kendwa-rocks": {"signature": "The Full Moon Party — the Saturday after each full moon by the venue's account; check its calendar"},
 "emerson-hurumzi": {"hours": "Dinner, one seating at 19:00, guests welcomed from 18:00 (own site via search index, Oct 2026)",
                     "tags": ["US$45 three courses", "One seating, 19:00", "Taarab most evenings"],
                     "verdict": "Choose it for the music and the roof: taarab most evenings, cross-legged on rugs above the old town.",
                     "dishes": [{"name": "Three-course Swahili dinner"}, {"name": "Taarab, most evenings"}]},
 "nungwi-village": {"tags": ["Small dukas", "Cash", "No big supermarket"]},
 "flame-tree": {"caveat": "Small and quiet by design; at the north-west end, so the sunset is in front of you.",
                "neighborhood": "Nungwi · the quiet north-west end of the beach, in a garden"},
 "house-of-wonders": {"status": "closed"},
 "tumbatu": {"why": "The long low island on Kendwa's western horizon is the home of the Watumbatu, reputed the best sailors on this coast, with their own dialect and their own boats. It is the shape the sun goes down beside, seen from every bar on Kendwa sand, and the one place on this horizon that is not for visiting on a whim: the card in Sights explains how it is done."},
 "mangapwani-cave": {"why": "On the west-coast road between Kendwa and Stone Town, a natural cave with fresh water at the bottom and, nearby, a cell cut into the coral to hold captives after the trade was banned. An hour here is the part of the spice story the plantations leave out; stop on the drive south and take a guide."},
 "dhow-course": {"why": "The one place on the island where an outsider can learn a living craft from the people who practise it: placements in a working Nungwi boatyard, arranged through World Unite!, with instruction in English every day and the rest of the day spent on hulls that will go to sea."},
}
HOTV = {"kendwa-rocks": "Full moons Mon 26 Oct and Tue 24 Nov: by the venue's rule the parties are Sat 31 Oct and Sat 28 Nov (derived; confirm on its calendar).",
        "nungwi-fish-market": "Spring tides around the full moons of 26 Oct and 24 Nov: the biggest landings and the most octopus.",
        "mkokotoni": "Spring tides around 26 Oct and 24 Nov — the biggest landings of each month.",
        "kizimbani": "The last weeks of the mwaka clove harvest (July to November): picking and drying still to see.",
        "leven-bank": "The kusi drops through October: calm water and good visibility, still tide-gated.",
        "spanish-dancer": "The humpbacks are leaving: sightings tail off through October and are luck by November.",
        "forodhani": "Nyerere Day, Wed 14 Oct, is a public holiday; the night market runs as usual after sunset."}
OUT = {}
for vid in KEEP:
    o, v = OV[vid], VER.get(vid, {})
    s = {}
    st = v.get("status")
    if st == "confirmed": s.update(status="confirmed", statusChecked="2026-10-07")
    elif st == "closed": s.update(status="closed", statusChecked="2026-10-07")
    else: s.update(status=o.get("status", "unverified"), statusChecked=o.get("statusChecked", "")) 
    if v.get("hook"): s["hook"] = v["hook"]
    if v.get("why"): s["why"] = v["why"]
    s.update(FIX.get(vid, {}))
    OUT[vid] = {"set": s, "evidence": v.get("evidence", ""), "corrections": v.get("corrections", []), "sources": v.get("sources", [])}
    if vid in HOTV: OUT[vid]["hot"] = HOTV[vid]
    if s["status"] == "unverified" or (s["status"] == "confirmed" and s["statusChecked"] != "2026-10-07"): pass
json.dump(OUT, open(RV / "venues.json", "w"), ensure_ascii=False, indent=1)
from collections import Counter
print("cards", len(CARDS), "venues", len(OUT), Counter((x["set"]["status"], x["set"]["statusChecked"]) for x in OUT.values()))

# ── 10 Oct 2026: the 8 Oct network pack (research/verify_5_network_2026-10-08.json), applied on top ──
import sys; sys.path.insert(0, str(RV)); import network_pack; network_pack.run()
