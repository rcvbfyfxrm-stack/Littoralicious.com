#!/usr/bin/env python3
"""Inputs for the research/rewrite agents (27 Oct 2026): research/rewrite_<n>_input.json (cards per batch, old text +
brief for new cards) and research/venues_input_<n>.json (old venue records with their lane; Bakkal, cut from the tables, rides
along so its bar card can be written from a verified record; Çamlıbağ is checked for its cellar card)."""
import json, pathlib, subprocess
REPO = pathlib.Path(__file__).resolve().parents[4]; RV = pathlib.Path(__file__).resolve().parent
SLUG = "Bozcaada-NorthAegean"
OLD = json.load(open(RV / "research/cards_old.json")); PLAN = json.load(open(RV / "card_plan.json")); PICKS = json.load(open(RV / "picks.json"))
js = subprocess.run(["git", "show", f"origin/rebuild/publishing-system:terroir/{SLUG}/data.js"], cwd=REPO, capture_output=True, text=True, check=True).stdout
D = json.loads(subprocess.run(["node", "-e", "global.window={};eval(require('fs').readFileSync(0,'utf8'));process.stdout.write(JSON.stringify(window.TERROIR_DATA))"], input=js, capture_output=True, text=True, check=True).stdout)
V = {v["id"]: v for v in D["VENUES"]}; V.update(PICKS["new_venues"])
MQ = "maps_query = the place + ', Bozcaada, Çanakkale, Türkiye'."
QW = ("Quarter card. Build it from the old guide text (research/guide_text_old.txt: [quartiers], [culture], [history]) and the kept venue records, "
      "verified now where perishable. Labels: Go for · Best hour · Don't miss · Eat (Eat names only kept table venues of this guide). " + MQ +
      " Do not retell another card's story: name it and move on.")
CU = ("Curiosity card: one verified fact most guides get wrong or never tell. Verify it now (one or two WebSearch) "
      "and keep any dispute as a dispute. Labels: Touch it today · Where the sources argue (only if they do). tag 'curiosity'. "
      "maps_query ONLY if there is one place to go and see it, else empty.")
PT = ("POINTER card: this place is a kept TABLE venue of the guide (its record is in research/venues_input_*.json, id {vid}). Set \"ref\": \"{vid}\". Write it in THIS section's "
      "angle ({angle}), story 40-70 words that does NOT retell the venue's own why/verdict; facts Order · When · Book · Price (only what the record "
      "or a source supports); maps_query empty (the table card carries the Maps link).")
AV = "Warning card, tag 'the warning', NO Maps (maps_query empty). Labels: Touch it today (what you will see) · Instead (what to do). Instead names only kept venues/cards."
FO = "Follow card. Labels What it is · Language · Read. site = the official domain only if confident (verify with one WebSearch). No Maps. Do not print follower counts."
WINE = "Wine/drink how-to card. Labels In the glass · On the label · Ask for. No Maps. Verify the facts you keep (WebSearch). tag 'the grape' or 'the glass'."
DT = "Day-trip card. Labels Getting there · Time needed · Don't miss · Eat (Eat: only if a source names a place; else omit). maps_query = the site + ', Çanakkale, Türkiye'."
NEW_BRIEF = {
 "quartiers:The Rum quarter": QW + " Merge the old culture card on the Rum quarter. The grid rebuilt after the 1874 fire (verify the fire's date), the bell tower of St Mary (its own culture card: name only), the guesthouses and wine bars; Asmalı Meyhane, Sandal and Ada'm are table cards (name only). The community figures belong to 'Left out of the exchange' (name only). maps_query 'Rum Mahallesi, Bozcaada, Çanakkale, Türkiye'.",
 "quartiers:The Turkish mahalle": QW + " NEW. The Turkish quarter south of the dividing street that escaped the fire: older street plan, the Alaybey (Köprülü Mehmet Paşa?) mosque — verify its name and date, the Çınar Çeşme fountain and plane tree (verify), Çiçek Pastanesi and Talay's shop are table cards (name only). maps_query 'Alaybey Camii, Bozcaada, Çanakkale, Türkiye' (or the verified mosque name).",
 "quartiers:The harbour and the castle square": QW + " NEW. The harbour (ferry quay, fishing boats, the evening volta along the quay), the Kale Meydanı square under the castle where the Wednesday market stands (the market is a table card: name only); the castle has its own card (name only). maps_query 'Bozcaada Limanı, Bozcaada, Çanakkale, Türkiye'.",
 "curiosities:Tenedos and the wooden horse": CU + " From the old [history] text: Tenedos in Virgil's Aeneid (Book 2: the Greek fleet hid behind Tenedos), the Iliad mentions; the ancient coins with a grape bunch and a double-headed axe (the labrys, and its legend — Tenes; verify). Keep it as literature, not archaeology. maps_query empty.",
 "curiosities:The louse that came late": CU + " The old guide claims phylloxera did not reach Bozcaada until the 1940s and calls it 'a pre-phylloxera wine island'. VERIFY HARD: when did phylloxera reach Bozcaada / Çanakkale (sources may say 1880s-1900s for Anatolia; some say the island was hit later)? Are the vines on their own roots or grafted today? If the claim is unsupported, the card says so plainly ('Where the sources argue') and the essay will be corrected. maps_query empty.",
 "curiosities:Left out of the exchange": CU + " The 1923 Treaty of Lausanne: Imbros (Gökçeada) and Tenedos (Bozcaada) left to Turkey, the Greek inhabitants exempted from the population exchange (Article 14 — local autonomy, verify); the Greek community figures (old guide: ~5,420 in 1912 to ~22 by 2000; elsewhere 'close to 2,000' — reconcile; keep the dispute). Çamlıbağ 1925 'first Muslim winery' belongs to its cellar card (name only). maps_query empty.",
 "provisioning:The Wednesday market": PT.format(vid="v07-wednesday-market", angle="the larder: what a cook buys here and how to shop it — merge the old gastronomy card; is it Wednesday? in the castle square? does it run in November? verify"),
 "provisioning:Domates reçeli": "Product card: domates reçeli, Bozcaada's tomato jam. What it is · Season · Where to buy · Taste it. Verify (who makes it — Bozcaada tomatoes, the 'Bozcaada Domates Reçeli' GI registration? verify if there is a geographical indication, date), how it is eaten (with cheese, at breakfast). tag 'the jar'. maps_query empty.",
 "provisioning:Çavuş grapes": "Product card: the Bozcaada Çavuş table grape (Bozcaada Çavuşu GI, 2020 — verify the registration year and body, TÜRKPATENT). What it is · Season (picked late August-September) · Where to buy · Taste it. tag 'the grape'. Do not retell the Çavuş WINE (drink card: name only). maps_query empty.",
 "craft:Do this one": "NEW #craft card. Research NOW (WebSearch, ~5 calls): the best craft proper to Bozcaada a visitor can actually learn hands-on, with a named still-practising maker and OPEN enrolment. Candidates: helping at the harvest / a winemaking day at a cellar (Bağ Bozumu), tomato-jam making with a family, a ceramics or weaving workshop on the island, a boatbuilder (tersane) in the harbour, mastic or almond biscuit baking at Çiçek Pastanesi, a cooking class. Pick the ONE that best meets: a craft proper to the island + named maker + you can enrol. Rename the card (name = the place/person). Labels What you do · Time · Cost · Book. maps_query the workshop + ', Bozcaada, Çanakkale, Türkiye'. If nothing clears the bar, say so in the story and still write the closest.",
 "craft:Other one": "NEW #craft card: the second candidate from your research, with a plain 'Missing:' sentence at the end of the story (what it lacks: no named master / no class / summer only). Rename to the place. tag must be 'missing: <the one thing>'.",
 "craft:Other two": "NEW #craft card: the third candidate, same shape as 'Other one' (tag 'missing: <thing>').",
 "craft:What is sold as island-made": "NEW tag 'the warning', NO Maps. What is sold in the harbour and Rum-quarter shops as Bozcaada-made and is not (only claims you can source: e.g. jams and 'island wine' bottled on the mainland, Ezine cheese sold as island cheese, imported souvenirs). Labels: Touch it today · Instead.",
 "drink:Çavuş": WINE + " The white Çavuş: a table grape that also makes a dry white; Corvus, Talay make it (name only).",
 "drink:Vasilaki": WINE + " Vasilaki, the high-acid white the old guide says grows nowhere else (verify).",
 "drink:Karalahna and Kuntra": WINE + " The reds: Karalahna (dark, tannic) and Kuntra (lighter; Kuntra = Karasakız? verify the synonym). Corvus's Corpus and the old Jancis Robinson 17/20 claim belong to the Corvus table card (name only).",
 "drink:Rakı": WINE + " Rakı with the meze: anise spirit, not an island product; how it is poured (water, ice after), the meyhane ritual. Labels In the glass · Ask for · How to drink it.",
 "bars:Bakkal": "Bar card built from the old venue record v10-bakkal-bar (given as old_record) — verify it trades in 2026, its season (Apr–Oct? closed in winter?), address (Lale Sok.?). Labels Where · When · Order · Best hour. maps_query 'Bakkal, Bozcaada, Çanakkale, Türkiye'. site own domain only.",
 "bars:The wine route": "Merge the old wine route card. Which wineries have cellar doors/shops in town and which are out among the vines (Corvus, Talay, Amadeus are table cards: name only; Çamlıbağ has its own cellar card), how to do it (bike, scooter, taxi), the November reality (which shops are open in winter — verify). Labels Start · Length · Time · Don't miss · Bring. maps_query 'Bozcaada merkez, Bozcaada, Çanakkale, Türkiye'.",
 "bars:Çamlıbağ": "Cellar card: Çamlıbağ Şarapları (founded 1925 in a former Greek shop by Yunatçılar? verify the founder and the claim 'first Muslim-owned winery'), its town shop, 2026 trading, hours in October/November. Labels Where · Open · Pour · Price · Book. maps_query 'Çamlıbağ Şarapçılık, Bozcaada, Çanakkale, Türkiye'. site own domain only.",
 "listening:No hi-fi listening bar": "Honest card, tag 'honestly', NO Maps. VERIFY with 2 WebSearch ('Bozcaada plak bar', 'listening bar Çanakkale vinyl'): if you find a real hi-fi/vinyl listening bar on the island or in Çanakkale, write it instead (rename, tag 'listening bar', labels Where · Pour · Price · Best hour, maps). Otherwise labels Touch it today · Instead.",
 "listening:Live music on the island": "NEW: live music on Bozcaada — the Bozcaada Caz Festivali (jazz festival, verify dates/edition 2026), fasıl or live nights at the meyhanes in season, any winter music. Labels Where · When · Cost · Best hour. maps_query only if one venue.",
 "around:Troy": DT + " Troy (Truva, UNESCO 1998) and the Troy Museum (Troya Müzesi, opened 2018 — verify) at Tevfikiye: distance from Geyikli/Yükyeri (~35-40 km), 2026 price and winter hours (verify).",
 "around:Gökçeada": DT + " Gökçeada (Imbros), the other island left out of the exchange: ferry from Kabatepe/Gelibolu (verify; not from Bozcaada directly?), the Greek villages (Zeytinli/Agios Theodoros, Tepeköy), olive oil, a winter check. Do not retell Lausanne (curiosity card: name only).",
 "around:Assos": DT + " Assos (Behramkale): the Temple of Athena on the acropolis, the harbour; distance from Geyikli (~70 km?), 2026 price/winter hours (verify).",
 "avoid:Coming in winter for the food": AV + " Many kitchens close from October/November to April: verify which kept tables are open in winter (from the venue packs if possible: say 'call ahead'). Instead: come late May–June or September; in winter, eat at the places that stay open (only kept venues confirmed open in winter).",
 "avoid:The car ferry on a summer Friday": AV + " Verify the Geyikli (Yükyeri) – Bozcaada ferry (GESTAŞ): crossing time, car queues in summer weekends, the passenger fast ferry from Çanakkale in summer. Instead: go on foot, a weekday.",
 "avoid:The harbour-front set menu": AV + " The old [money-sits] text: harbour-front group-tour tables built for volume. Keep to what the old text claims; no invented prices. Instead: the kept meyhane tables.",
 "follow:Bozcaada municipality": FO + " bozcaada.bel.tr (verify).",
 "follow:The ferry operator": FO + " GESTAŞ (gestasdenizulasim.com.tr? verify) — timetables change seasonally.",
 "follow:The island's wine": FO + " A trusted English-language source on Turkish wine that covers Bozcaada (e.g. Wines of Turkey, winesofturkey.org? or a named writer's site) — verify; else the Corvus or Talay own site.",
}
EXTRA_BRIEF = {
 "calas:Ayazma": "Beach card. Verify the Aya Paraskevi monastery date (1734?) and the 26 July pilgrimage (it is the chapel's card in Culture: name only), the November reality (no loungers, cafés shut, a dolmuş in winter? verify). Beach labels Getting there · Best hour · Bring · Don't miss. Keep the poyraz rule.",
 "calas:Sulubahçe": "Beach card. Beach labels.",
 "calas:Habbele": "Beach card. Verify the name (Habbele / Poyraz Limanı) and distance from town. Beach labels.",
 "calas:Akvaryum": "Beach card. Beach labels; keep the lodos rule.",
 "calas:Çayır": "Beach card: verify the 2015 European kitesurf championship claim and the kite school (2026). Beach labels.",
 "calas:Tuzburnu": "Beach card. Verify its location (the old text says west tip below the lighthouse; the old coordinates put it SE — check where Tuzburnu is). Beach labels.",
 "walks:Göztepe": "Walk labels. Verify the height (192 m?) and whether you can drive up.",
 "walks:Polente at sunset": "Merge the old culture card 'Polente Lighthouse' (in cards_old.json): verify 1861, 32 m(?), the range; the wind farm (when built). Walk labels. The sunset is the point; no exact sunset time.",
 "walks:The vineyard country": "Walk labels. The respected producers are table/cellar cards: name only.",
 "culture:The castle": "Merge the old walk card 'The castle ramparts'. Verify 1455 Mehmet II, the 2026 ticket price and winter hours (Müzekart?), restoration closures (the castle was closed for restoration for years — verify 2026 status!). Sight labels Where · Open · Cost · Best hour · Time needed · Don't miss.",
 "culture:The church of St Mary": "Verify 1869, the 1895 bell tower, whether it is open to visitors and when the liturgy is held (the Dormition feast 15 August). Sight labels.",
 "culture:The island museum": "Verify the Bozcaada Yerel Tarih Müzesi (Hakan Gürüney, 2005), 2026 status, season (closed in winter?), price. Sight labels.",
 "culture:The windmills": "Verify the 2019 rebuilding claim, location. Sight labels.",
 "culture:Ayazma chapel and spring": "Merge the old walk card 'The Ayazma plane-tree walk'. Verify the 26 July Aya Paraskevi feast and the chapel's date. Sight labels. The beach is its own card (name only).",
 "linger:Çınaraltı": "Café card from the old card: verify 'since 1969' and 2026 trading, winter opening. Café labels Where · Open · Order · Work?.",
 "linger:Coffee Shelter": "Café card: verify 2026 trading and season. Café labels.",
 "linger:Vasil": "Café card: verify 2026 trading and season (Vasil Coffee & Bakery? the name). Café labels.",
}
batches = {1: ["quartiers", "curiosities", "culture", "walks"], 2: ["calas", "provisioning", "around", "coffee-gardens"], 3: ["avoid", "follow", "listening", "craft", "bars"]}
OLDREC = {"bars:Bakkal": "v10-bakkal-bar"}
for n, folds in batches.items():
    cards = {}
    for f in folds:
        for gr in PLAN[f]["groups"]:
            for c in gr["cards"]:
                e = {"fold": f, "group": gr["title"]}
                if c["from"]: e["old"] = OLD[c["from"]]
                if c["key"] in OLDREC: e["old_record"] = V[OLDREC[c["key"]]]
                b = " ".join(x for x in (NEW_BRIEF.get(c["key"]), EXTRA_BRIEF.get(c["key"])) if x)
                if b: e["brief"] = b
                cards[c["key"]] = e
    json.dump(cards, open(RV / f"research/rewrite_{n}_input.json", "w"), ensure_ascii=False, indent=1)
    print(n, len(cards))
LANE = {i: (k, l["label"]) for k, l in PICKS["lanes"].items() for i in l["ids"]}
splits = {1: [i for i in LANE if LANE[i][0] in ("meyhane", "home")], 2: [i for i in LANE if LANE[i][0] not in ("meyhane", "home")]}
for n, ids in splits.items():
    json.dump({i: {**V[i], "_lane": LANE[i][1], "_lane_key": LANE[i][0]} for i in ids}, open(RV / f"research/venues_input_{n}.json", "w"), ensure_ascii=False, indent=1)
    print("venues", n, len(ids))
json.dump({i: V[i] for i in PICKS["cut"]}, open(RV / "research/venues_cut.json", "w"), ensure_ascii=False, indent=1)
