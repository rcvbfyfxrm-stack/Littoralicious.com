#!/usr/bin/env python3
"""Inputs for the research/rewrite agents (22 Oct 2026): research/rewrite_<n>_input.json (cards per batch, old text +
brief for new cards) and research/venues_input_<n>.json (old venue records with their lane)."""
import json, pathlib, subprocess
REPO = pathlib.Path(__file__).resolve().parents[4]; RV = pathlib.Path(__file__).resolve().parent
OLD = json.load(open(RV / "research/cards_old.json")); PLAN = json.load(open(RV / "card_plan.json")); PICKS = json.load(open(RV / "picks.json"))
js = subprocess.run(["git", "show", "origin/rebuild/publishing-system:terroir/Dubrovnik-Dalmatie/data.js"], cwd=REPO, capture_output=True, text=True, check=True).stdout
D = json.loads(subprocess.run(["node", "-e", "global.window={};eval(require('fs').readFileSync(0,'utf8'));process.stdout.write(JSON.stringify(window.TERROIR_DATA))"], input=js, capture_output=True, text=True, check=True).stdout)
V = {v["id"]: v for v in D["VENUES"]}; V.update(PICKS["new_venues"])
QW = ("NEW quarter card. Build it from the old guide text (research/guide_text_old.txt: [quartiers], [avoid], [history]) and the kept venue records, "
      "verified now where perishable. Labels: Go for · Best hour · Don't miss · Eat (Eat names only kept table venues of this guide, never a cut one). "
      "maps_query = the place + ', Dubrovnik, Croatia'. Do not retell another card's story: name it and move on.")
CU = ("Curiosity card from the old card text / [history] prose: one verified fact most guides get wrong or never tell. Verify it now (one or two WebSearch) "
      "and keep any dispute as a dispute. Labels: Touch it today · Where the sources argue (only if they do). tag 'curiosity'. "
      "maps_query ONLY if there is one place to go and see it (ending ', Dubrovnik, Croatia'), else empty.")
PT = ("POINTER card: this place is a kept TABLE venue of the guide (its record is in research/venues_input_*.json, id {vid}). Set \"ref\": \"{vid}\". Write it in THIS section's "
      "angle ({angle}), story 40-70 words that does NOT retell the venue's own why/verdict; facts Order · When · Book · Price (only what the record "
      "or a source supports); maps_query empty (the table card carries the Maps link).")
AV = ("Warning card, tag 'the warning', NO Maps (maps_query empty). Labels: Touch it today (what you will see) · Instead (what to do). "
      "Keep to the claims the old text makes ([avoid] in research/guide_text_old.txt), verified where dated; no invented numbers.")
FO = "NEW follow card. Labels What it is · Language · Read. site = the official domain only if confident (verify with one WebSearch). No Maps. Do not print follower counts."
SW = "NEW swim card. Beach labels Getting there · Best hour · Bring · Don't miss. Late October: say honestly how warm the sea is now and what is shut for the winter (verify). maps_query = the beach + ', Dubrovnik, Croatia'."
NEW_BRIEF = {
 "quartiers:The Old Town": QW + " The walled town: Stradun from Pile to Ploče, the squares (Luža, Gundulić, Poljana Boškovića, Bunić), the side lanes where the honest konobas are (Antuninska, Boškovićeva, Palmotićeva), the walls (their own walk card), timing against the cruise ships. maps_query 'Stradun, Dubrovnik, Croatia'.",
 "quartiers:Pile": QW + " The western gate: Pile Gate, the drawbridge, Onofrio's fountain (the five-squares walk owns it: name only), Nautika in the old Nautical School, the path to Lovrijenac, the Konzum (its larder card), the bus stop for Gruž.",
 "quartiers:Ploče": QW + " East outside Ploče Gate: Lazareti (its culture card: name only), Banje beach (its swim card: name), the cable car base, Pizzeria Tabasco up Hvarska, the hotels looking back at the walls.",
 "quartiers:Gruž": QW + " The working harbour: ACI Marina (in Komolac, up the Rijeka Dubrovačka — verify where ACI Marina Dubrovnik actually is; the old text puts it 'in the bay' of Gruž), the cruise and ferry terminal, the Gruž market (a table card), Cogito Coffee (a linger card). The bus into the Old Town.",
 "quartiers:Lapad": QW + " The western peninsula: the Uvala Lapad bay and the pedestrian strip (Šetalište kralja Zvonimira), Konoba Atlantic Kitchen (a table card), the Asia Shop (a larder card), the hotels and the evening walk to Petka hill or Babin Kuk.",
 "curiosities:The wind that excused a crime": CU + " From the old culture gem: during the Republic no Senate session sat when the jugo blew hard, and crimes committed under a strong jugo were judged more leniently. VERIFY (this is a much-repeated claim; if it is only folklore with no documented source, say so in 'Where the sources argue').",
 "calas:Banje": SW + " The city beach just outside Ploče Gate, under the walls (part is a beach club; the public part is free).",
 "calas:The rocks under the south wall": SW + " Swimming off the flat rocks below the south sea wall, reached through the openings by the Buža bars (the bars have their own card under Boire: name only); ladders into deep water; no sand.",
 "calas:Sveti Jakov": SW + " The pebble beach below the church of Sveti Jakov, east of Ploče, down a long flight of steps; the view back to the walls.",
 "calas:Lopud and Šunj": SW + " The Elaphiti island of Lopud by ferry from Gruž (Jadrolinija / G&V Line: verify the winter timetable 2026), no cars, the sand bay of Šunj across the island. maps_query 'Šunj beach, Lopud, Croatia'.",
 "provisioning:Gruž Market": PT.format(vid="v16-gru-market-tr-nica-gru", angle="the larder: what a cook buys here and how to shop it"),
 "provisioning:Grgić Vina": PT.format(vid="v17-grgi-vina-cellar-door", angle="the larder: what to buy at the cellar for the boat and how to book the visit"),
 "bars:D'vino": PT.format(vid="v14-d-vino-wine-bar", angle="the glass: what to pour there and when"),
 "craft:Do this one": "NEW #craft card (the old guide had no craft section). Research NOW (WebSearch, ~5 calls): the best craft of Dubrovnik and Konavle a visitor can actually learn hands-on, with a named still-practising master and OPEN enrolment. Candidates: Konavle silk embroidery (the Čilipi/Konavle costume embroidery; workshops at the Konavle museum in Čilipi, or a named embroiderer who teaches; the old guide's 'Dežo Art' shop in Dropčev prolaz with 'Lela' — verify it exists in 2026), Dubrovnik filigree gold earrings (rečine / the 'dubrovačke rečine' jewellers), Konavle silk-worm silk, a cooking class (only if the master is named), the lijerica maker. Pick the ONE that best meets: an unbroken local craft + named master + you can enrol. Rename the card (name = the place/person). Labels What you do · Time · Cost · Book. If nothing qualifies, make this card the honest best option and say what it lacks.",
 "craft:Other one": "NEW #craft card: the second candidate from your research, with a plain 'Missing:' sentence at the end of the story (what it lacks: no named master / no class / sale only). Rename to the place. tag must be 'missing: <the one thing>'.",
 "craft:Other two": "NEW #craft card: the third candidate, same shape as 'Other one' (tag 'missing: <thing>').",
 "craft:What is sold as Croatian craft": "NEW tag 'the warning', NO Maps. What is sold on Stradun and Prijeko as Dubrovnik-made and is not (imported lace and 'Konavle' embroidery printed by machine, Game of Thrones souvenirs, lavender that is not from Hvar, etc.): only claims you can source. Labels: Touch it today · Instead.",
 "listening:No hi-fi bar inside the walls": "NEW honest card, tag 'honestly', NO Maps: the old guide says Dubrovnik keeps no hi-fi listening bar (search once: 'listening bar' / 'hi-fi bar' / 'vinyl bar' Dubrovnik 2026); if you DO find a real one with a dated 2026 source, make the card about it instead. Labels: Touch it today · Instead (the live music of the city: name the cards below).",
 "listening:Klapa in the churches": "NEW card from the old [music] lede: klapa (UNESCO 2012) heard live in church acoustics — the old text says weekly evening klapa concerts in summer (Sv. Sebastian / cathedral programme, 21:00, EUR 10-15): verify who sings, where, when and whether anything runs in late October / winter. Festival/live labels When · Where · Cost · Tip.",
 "around:Trsteno Arboretum": "NEW day-trip card: the Renaissance garden of the Gučetić (Gozze) family at Trsteno, about 15 km north-west, founded around 1494 (verify), the two giant plane trees, the 1991 shelling and 2000 fire (verify); winter hours and price 2026. Day-trip labels Getting there · Time needed · Don't miss · Eat (only kept venues or none). maps_query 'Trsteno Arboretum, Croatia'.",
 "around:Mljet": "NEW day-trip card: Mljet National Park (1960), the two salt lakes and the island of St Mary with its Benedictine monastery; the catamaran from Dubrovnik (Gruž) to Polače/Sobra — verify the 2026 winter timetable honestly (it may not run as a day trip in late October/winter). Day-trip labels. maps_query 'Mljet National Park, Croatia'.",
 "avoid:The cruise-day crush": AV + " From the old [avoid] text: when several ships dock at Gruž the Old Town absorbs thousands of day visitors in a few hours; the city's cap on ships and passengers (verify the 2026 rule: two ships / 4,000 passengers a day?), check the port's schedule, go before 09:00 or after 18:30.",
 "follow:Dubrovnik Tourist Board": FO + " tzdubrovnik.hr (verify).",
 "follow:Dubrovnik Summer Festival": FO + " dubrovnik-festival.hr (verify); its 2027 dates if announced, else 'usually 10 July – 25 August'.",
 "follow:The Dubrovnik Times": FO + " thedubrovniktimes.com (verify) — the English-language local paper.",
 "follow:Jadrolinija": FO + " jadrolinija.hr, the state ferry line (Elaphiti, Mljet, Korčula) — the winter timetable matters.",
 "follow:Dubrovnik Port Authority": FO + " the port's ship schedule (portdubrovnik.hr — verify the domain and that it publishes the cruise calendar).",
}
EXTRA_OLD = {
 "walks:The city walls": "culture:City Walls — Minčeta, Bokar, Lovrijenac",
 "culture:Sponza and the Memorial Room": "culture:1667 earthquake · the Gradić rebuild",
}
EXTRA_BRIEF = {
 "walks:The city walls": "Merge the walk card and the old culture card of the walls into ONE walk card (Start · Length · Time · Terrain · Best hour · Don't miss · Bring); VERIFY the 2026 ticket price (the old EUR 35 combined with Lovrijenac) and the winter opening hours (Nov-Mar). Lovrijenac and Hamlet: name only (Hamlet is the calendar's).",
 "walks:Mount Srđ and Fort Imperial": "Verify the cable car 2026 fare and winter hours, and the museum in Fort Imperial (Homeland War museum). The siege story belongs to 'Sponza and the Memorial Room': name only.",
 "walks:The walls of Ston": "Verify the Ston walls length (5.5 km? '7 km' in some sources: keep a dispute if they disagree) and 2026 ticket / winter hours; the salt pans (Solana Ston) — the food-history fold owns the salt story: name only. The oyster lunch is the Mali Ston lane: name it.",
 "walks:The Ljuta and its mills": "Konoba Konavoski Dvori is a table card (name it, do not retell).",
 "calas:Lokrum": "Rebuild the old Lokrum walk as an island card (beach labels): the ferry from the Old Port (2026 season: the boat usually stops in November — verify), the Dead Sea lake, the botanical garden, the peacocks, no overnight stays; price 2026.",
 "curiosities:A ruler for one month": "The constitution only (the one-month Rector, Senate of 45, Major and Minor Councils, 1358-1808). The building itself is the culture card 'The Rector's Palace': point to it.",
 "culture:The Rector's Palace": "The BUILDING and its museum (Gothic-Renaissance, the explosions of 1435 and 1463, the atrium, the Cultural History Museum), 2026 ticket and winter hours (verify; a combined museum pass?). The constitution is the curiosity 'A ruler for one month': point to it.",
 "curiosities:Why every façade matches": "The 1667 earthquake and the Baroque rebuild (Stjepan Gradić). The Sponza survived: its card tells the building.",
 "culture:Sponza and the Memorial Room": "The Sponza Palace (1516-22, customs house, mint, the State Archives, the LIBERTAS-era inscription) and the Memorial Room of the Defenders in it; the 1991-92 siege numbers: verify each one you keep. 2026 opening hours.",
 "culture:Lazareti": "VERIFY the date (the old texts say 1627 here and '16th-c.' elsewhere; the quarantine itself dates to 1377): keep the dispute honest. What is there now (Linđo in summer, a club/cultural centre).",
 "provisioning:The oyster quay at Mali Ston": "The oysters themselves (PDO 2020) are the Mali Ston lane's story and The Dish's: here only how to buy them to take away. Is there still direct sale on the quay in late October? (verify)",
 "provisioning:The Franciscan pharmacy": "Founded 1317 inside the Franciscan monastery at Pile; verify 'oldest still-operating in Europe' (keep a dispute if others claim it); what it sells; hours.",
 "provisioning:Uje": "Verify Uje trades in 2026 at Placa (Stradun); the old card says 'Placa 5'.",
 "provisioning:Asia Shop": "Verify it still trades in 2026, else write the card honestly as a lead to call.",
 "provisioning:Konzum by Pile Gate": "Verify the address (the old text says Gundulićeva Poljana and 'just outside Pile Gate' — these are different places).",
 "bars:Buža": "Verify the two Buža bars' 2026 season (they close in winter?) and whether cash-only still holds.",
 "linger:Mara's Bar": "Verify it exists in 2026 (the old record names an owner 'Marija' — drop any person you cannot source).",
 "linger:The ACI Marina lounge": "ACI Marina Dubrovnik is at Komolac, not in Gruž: correct it if so.",
 "listening:Linđo at Lazareti": "Verify the Linđo ensemble's 2026 summer programme days and venue (Lazareti), and say it is a summer show (late May-October).",
 "listening:Klapa Cambi": "The old text says 'five-time Omiš gold': verify or soften.",
 "listening:Gibonni": "The old text says '43 Porin awards': verify the number or say 'the most Porin awards of any artist'.",
 "around:Cavtat": "The Račić mausoleum is by Ivan Meštrović (1920-22); Vlaho Bukovac's house; the boat from the Old Port (season); the old text names 'Konoba Galija' for dinner — it is NOT a kept venue: do not recommend it.",
 "around:Sokol Grad": "Verify the 2026 winter hours and price.",
 "drink:Prošek": "The EU decision on Prošek vs Prosecco: verify where it stands in 2026 (the old text says 'partially lost 2022' — check).",
 "drink:Grk": "Verify 'female-only flowers / must be co-planted' and the hectare figure; keep any dispute.",
}
batches = {1: ["quartiers", "curiosities", "culture"], 2: ["provisioning", "walks"], 3: ["calas", "avoid", "follow"], 4: ["craft", "coffee-gardens", "bars"], 5: ["listening", "around"]}
for n, folds in batches.items():
    cards = {}
    for f in folds:
        for gr in PLAN[f]["groups"]:
            for c in gr["cards"]:
                e = {"fold": f, "group": gr["title"]}
                if c["from"]: e["old"] = OLD[c["from"]]
                if c["key"] in EXTRA_OLD: e["old_also"] = OLD[EXTRA_OLD[c["key"]]]
                b = " ".join(x for x in (NEW_BRIEF.get(c["key"]), EXTRA_BRIEF.get(c["key"])) if x)
                if b: e["brief"] = b
                cards[c["key"]] = e
    json.dump(cards, open(RV / f"research/rewrite_{n}_input.json", "w"), ensure_ascii=False, indent=1)
    print(n, len(cards))
LANE = {i: (k, l["label"]) for k, l in PICKS["lanes"].items() for i in l["ids"]}
keep = list(LANE)
A = ("summit", "houses", "konoba", "oysters")
splits = {1: [i for i in keep if LANE[i][0] in A], 2: [i for i in keep if LANE[i][0] not in A]}
for n, ids in splits.items():
    json.dump({i: {**V[i], "_lane": LANE[i][1], "_lane_key": LANE[i][0]} for i in ids}, open(RV / f"research/venues_input_{n}.json", "w"), ensure_ascii=False, indent=1)
    print("venues", n, len(ids))
json.dump({i: V[i] for i in PICKS["cut"]}, open(RV / "research/venues_cut.json", "w"), ensure_ascii=False, indent=1)
