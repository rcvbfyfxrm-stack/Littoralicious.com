#!/usr/bin/env python3
"""Inputs for the research/rewrite agents (23 Oct 2026): research/rewrite_<n>_input.json (cards per batch, old text +
brief for new cards) and research/venues_input_<n>.json (old venue records with their lane)."""
import json, pathlib, subprocess
REPO = pathlib.Path(__file__).resolve().parents[4]; RV = pathlib.Path(__file__).resolve().parent
OLD = json.load(open(RV / "research/cards_old.json")); PLAN = json.load(open(RV / "card_plan.json")); PICKS = json.load(open(RV / "picks.json"))
js = subprocess.run(["git", "show", "origin/rebuild/publishing-system:terroir/Split-Dalmatie/data.js"], cwd=REPO, capture_output=True, text=True, check=True).stdout
D = json.loads(subprocess.run(["node", "-e", "global.window={};eval(require('fs').readFileSync(0,'utf8'));process.stdout.write(JSON.stringify(window.TERROIR_DATA))"], input=js, capture_output=True, text=True, check=True).stdout)
V = {v["id"]: v for v in D["VENUES"]}; V.update(PICKS["new_venues"])
QW = ("NEW quarter card. Build it from the old guide text (research/guide_text_old.txt: [quartiers], [avoid], [history], [walk]) and the kept venue records, "
      "verified now where perishable. Labels: Go for · Best hour · Don't miss · Eat (Eat names only kept table venues of this guide, never a cut one). "
      "maps_query = the place + ', Split, Croatia'. Do not retell another card's story: name it and move on.")
CU = ("Curiosity card: one verified fact most guides get wrong or never tell. Verify it now (one or two WebSearch) "
      "and keep any dispute as a dispute. Labels: Touch it today · Where the sources argue (only if they do). tag 'curiosity'. "
      "maps_query ONLY if there is one place to go and see it (ending ', Split, Croatia'), else empty.")
PT = ("POINTER card: this place is a kept TABLE venue of the guide (its record is in research/venues_input_*.json, id {vid}). Set \"ref\": \"{vid}\". Write it in THIS section's "
      "angle ({angle}), story 40-70 words that does NOT retell the venue's own why/verdict; facts Order · When · Book · Price (only what the record "
      "or a source supports); maps_query empty (the table card carries the Maps link).")
AV = ("Warning card, tag 'the warning', NO Maps (maps_query empty). Labels: Touch it today (what you will see) · Instead (what to do). "
      "Keep to the claims the old text makes ([avoid] in research/guide_text_old.txt), verified where dated; no invented numbers. Instead names only kept venues/cards.")
FO = "NEW follow card. Labels What it is · Language · Read. site = the official domain only if confident (verify with one WebSearch). No Maps. Do not print follower counts."
SW = "NEW swim card. Beach labels Getting there · Best hour · Bring · Don't miss. Late October: say honestly how warm the sea is now and what is shut for the winter (verify). maps_query = the beach + ', Split, Croatia'."
PER = "Person card (a voice to queue before service). Labels Born · Trace today · Read (Read = one song or album to start with). Verify birth place/year and one dated fact. maps_query empty unless there is a real place in Split tied to them (a statue, a plaque) that you can verify."
NEW_BRIEF = {
 "quartiers:The palace": QW + " Diocletian's Palace as a lived-in quarter: the four gates (Golden, Silver, Bronze, Iron), the Peristyle, the alleys where people still live (verify the resident number honestly — the old text says 3,000; recent press says far fewer; keep a dispute), the cruise timing. The cathedral, the substructures and the museum have their own cards: name only. maps_query 'Peristyle, Split, Croatia'.",
 "quartiers:Veli Varoš": QW + " The old fishermen's and farmers' quarter west of the palace climbing to Marjan: stone houses, the church of Sv. Križ (verify), the 'fetivi' (verify the word: born-and-bred Splićani), the konobas (Fetivi, Šperun, Matejuška, Konoba Marjan are table cards: name only).",
 "quartiers:The Riva and Matejuška": QW + " The seafront promenade in front of the palace's south wall (rebuilt 2007, verify), the Prokurative / Trg Republike behind (Vicko Andrić's square, verify date), and the little fishermen's harbour of Matejuška at the west end. Zoï (on the Riva) and Fife (at Matejuška) are table cards: name only. maps_query 'Riva, Split, Croatia'.",
 "quartiers:Bačvice and Firule": QW + " East of the ferry port: the sandy city beach of Bačvice (its own swim card: name only), the bars above it, and Firule where Dvor sits (a table card: name only). maps_query 'Bačvice, Split, Croatia'.",
 "curiosities:The sphinx on the peristyle": CU + " The black-granite Egyptian sphinx on the peristyle (verify: which pharaoh — Thutmose III is often named; date), Diocletian brought a dozen or so sphinxes from Egypt (verify), most were beheaded by early Christians. The old card's 'midnight in November' mood can stay as the Touch it today.",
 "curiosities:Grgur Ninski's toe": CU + " Meštrović's colossal statue of Bishop Gregory of Nin (1929, verify; moved from the Peristyle to the Golden Gate in 1957 — verify why) — rubbing his BIG TOE brings luck (the old text says 'thumb': correct it if the toe). maps_query 'Grgur Ninski statue, Split, Croatia'.",
 "curiosities:No flies in the fish hall": CU + " The Ribarnica (fish market) legend: no flies because of the sulphur springs next door (the old spa, Split's 'Sumporne toplice'). Verify: is the claim reported, and is the sulphur spring real; it's a LEGEND unless a source says otherwise — keep it a dispute. The fish market is a kept table venue (v14): name it, no Maps (maps_query empty).",
 "curiosities:The stone of the White House": CU + " The claim that Brač stone built the White House (and the Reichstag): widely repeated, widely disputed (the White House was built of Aquia Creek sandstone; Brač stone may have been used in a later renovation, or not at all). Verify honestly and write it as a dispute. Diocletian's Palace really is Brač limestone (verify). maps_query empty.",
 "curiosities:Picigin": CU + " Picigin, the ball game of Bačvice shallows (a small ball kept in the air, never touching the water; verify its origin date ~1908 and its status as protected Croatian intangible heritage 2020?). The beach itself is a swim card: name only.",
 "calas:Kašjuni": SW + " The pebble beach on the south side of Marjan, under Mount Marjan, west of the Meštrović Gallery (verify).",
 "calas:Bene": SW + " The beach at the far western tip of Marjan, among the pines (verify access by bus 12 / on foot / bike; season facilities).",
 "provisioning:Pazar": PT.format(vid="v13-pazar-marche-vert", angle="the larder: what a cook buys here and how to shop it"),
 "provisioning:Ribarnica": PT.format(vid="v14-ribarnica-marche-aux-poiss", angle="the larder: what a cook buys here and how to shop it"),
 "bars:Zinfandel": PT.format(vid="v17-zinfandel-food-wine-bar", angle="the glass: what to pour there and when"),
 "bars:Paradox": PT.format(vid="v16-paradox-wine-cheese-bar", angle="the glass: what to pour there and when"),
 "craft:Do this one": "NEW #craft card. Research NOW (WebSearch, ~5 calls): the best craft of Split and its islands a visitor can actually learn hands-on, with a named still-practising master and OPEN enrolment. Candidates: Brač stonemasonry (the Klesarska škola stonemasons' school in Pučišća, Brač — does it take visitors / short courses?), Split/Dalmatian filigree jewellery, Sinj, olive-wood carving, a peka/cooking class with a named cook, the lace of Hvar (agave lace by the Benedictine nuns — verify), Pag lace (far). Pick the ONE that best meets: an unbroken local craft + named master + you can enrol. Rename the card (name = the place/person). Labels What you do · Time · Cost · Book. If nothing qualifies, make this card the honest best option and say what it lacks. maps_query the workshop + ', Croatia'.",
 "craft:Other one": "NEW #craft card: the second candidate from your research, with a plain 'Missing:' sentence at the end of the story (what it lacks: no named master / no class / sale only). Rename to the place. tag must be 'missing: <the one thing>'.",
 "craft:Other two": "NEW #craft card: the third candidate, same shape as 'Other one' (tag 'missing: <thing>').",
 "craft:What is sold as Dalmatian craft": "NEW tag 'the warning', NO Maps. What is sold in the palace alleys and on the Riva as Split-made and is not (imported lace, Game of Thrones souvenirs, lavender not from Hvar, 'Brač stone' trinkets of resin, etc.): only claims you can source. Labels: Touch it today · Instead.",
 "listening:Parasol": "The old card claims Parasol (Adamova 5?) is a listening bar in the jazz-kissa lineage with a bespoke New Fidelity system, vinyl, ASC label DJs. VERIFY HARD (2-3 WebSearch: 'Parasol Split bar', 'listening bar Split'): does it exist in 2026, its real address, what system. If it is real, write it (tag 'listening bar', labels Where · Pour · Price · Best hour, maps_query the bar + ', Split, Croatia'). If you cannot confirm it, REWRITE the card as an honest 'no confirmed hi-fi bar' card (rename it 'No confirmed hi-fi bar', tag 'honestly', NO Maps, labels Touch it today · Instead) — and say what you found in _verified. Never invent.",
 "listening:Oliver Dragojević": PER + " Oliver Dragojević (1947–2018): born in Split, raised in Vela Luka on Korčula (verify), the voice of Dalmatian pop.",
 "listening:Gibonni": PER + " Zlatan Stipišić Gibonni, born in Split 1968 (verify). Do not repeat a Porin count unless verified.",
 "listening:Daleka obala": PER + " The Split rock band Daleka obala (founded 1987?, verify), or if you judge it better, Hajduk's Torcida songs? NO — choose a Split music act verified as from Split (Daleka obala, or Doris Dragović — born Split 1961, verify). Rename the card to the act you choose.",
 "around:Omiš and the Cetina": "NEW day-trip card: Omiš at the mouth of the Cetina canyon, 25 km south-east (verify), the pirates of Omiš (the Kačić family, 12th-13th c., verify), the Mirabella / Fortica fortress, the Cetina canyon (rafting season), the klapa festival in summer (calendar's: name only). Day-trip labels Getting there · Time needed · Don't miss · Eat (only kept venues, or none). maps_query 'Omiš, Croatia'.",
 "avoid:The cruise-day midday": AV + " When several ships are in, the palace fills mid-morning to mid-afternoon; check the port's schedule (Lučka uprava Split — verify it publishes one); go before 09:00 or after 18:00.",
 "avoid:The laminated menu in the palace": AV + " From [avoid]: palace restaurants with laminated photo menus in five languages, the '€28 peka in fifteen minutes' (peka needs ordering ahead — a peka served at once was not cooked for you).",
 "follow:Split Tourist Board": FO + " visitsplit.com (verify).",
 "follow:Croatian National Theatre Split": FO + " HNK Split (hnk-split.hr, verify) — the theatre that runs the Split Summer Festival (Splitsko ljeto) and the opera/ballet season from autumn.",
 "follow:Slobodna Dalmacija": FO + " slobodnadalmacija.hr, the Split daily (verify).",
 "follow:Jadrolinija": FO + " jadrolinija.hr, the state ferry line (Brač, Hvar, Vis, Šolta) — the winter timetable matters.",
 "follow:Split Port Authority": FO + " Lučka uprava Split (portsplit.hr? verify the domain and that it publishes ship arrivals).",
}
EXTRA_OLD = {
 "walks:Through the palace, gate to gate": None,
 "walks:Marjan": "culture:🌲 Marjan — parc forestier",
 "walks:Salona and Klis": "culture:Salona — capitale romaine de la Dalmatie",
 "culture:The cathedral and its bell tower": "secret-gems:🏛 Toits du palais depuis le campanile de Saint-Domnius",
 "calas:Bačvice": "work:🏔 Plage Bačvice",
 "around:Trogir": "culture:Trogir — ville-musée UNESCO",
 "provisioning:Paški sir and Pag salt": "gastronomy:🥕 Sel de Pag — Solana Pag",
}
EXTRA_BRIEF = {
 "walks:Through the palace, gate to gate": "Merge the old 'Palace at dawn' walk with the old [walk] prose (research/guide_text_old.txt): Golden Gate -> Cardo -> Peristyle -> the Vestibule -> out by the Bronze Gate through the substructures' hall -> the Riva -> Matejuška. Walk labels. The statue, the sphinx, the cathedral and the substructures have their own cards: name only. VERIFY: the porphyry/granite columns' origin (do NOT claim 'from the temple of Hatshepsut' unless a source says so); the substructures' 2026 hours and ticket.",
 "walks:Marjan": "Merge: the old walk circuit + the culture card + the bench (work) + the south path from Sustipan (secret-gems). Verify: Marjan's height (Telegrin ~178 m) vs its area (the old text confuses 178 m and 178 ha: check the park area, ~340 ha?), the chapels (St Nicholas, St Jerome, Our Lady of Betlem? verify names and centuries), the Vidilica café at the first viewpoint (verify it trades). Walk labels. Kašjuni and Bene are swim cards: name only.",
 "walks:Salona and Klis": "Merge the walk and the culture card of Salona; add Klis fortress (verify Game of Thrones Meereen claim is real; 2026 ticket/winter hours for both Salona and Klis). Verify Salona's population claim (60,000 is often quoted: keep 'some sources' if disputed) and the amphitheatre size. Walk/day-trip labels. maps_query 'Salona, Solin, Croatia'.",
 "culture:The substructures": "The palace's cellars (the old 'Palais de Dioclétien' card): what they are, how intact, what is there (the Game of Thrones claim — verify which season/episode; the old card's 'episodes 8-10' is suspect: say 'season 4' only if a source does), 2026 ticket and winter hours. The palace's general plan (size, date, UNESCO 1979) can be here in one line; the four gates belong to the palace quarter card.",
 "culture:The cathedral and its bell tower": "The mausoleum turned cathedral (the irony of Diocletian's tomb consecrated to St Domnius, a bishop he had executed — verify that Domnius was executed in Salona c. 304), Buvina's wooden doors (1214, verify), the bell tower (verify height and that it was rebuilt c. 1908), the climb (2026 ticket, hours; old says €7). Verify whether the 'oldest cathedral in continuous use' claim stands (say 'often called' if disputed).",
 "culture:The Archaeological Museum": "Verify: founded 1820, the oldest museum in Croatia; where it is (Zrinsko-Frankopanska 25); 2026 hours and price; the highlight (the sarcophagus of Hippolytus and Phaedra? the 'Good Shepherd' sarcophagus — verify which are there).",
 "culture:Galerija Meštrović": "Verify 2026 price/hours; the villa built 1931-39; the Kaštilac / Crikvine chapel with the wooden Life of Christ reliefs (same ticket? verify). The Grgur Ninski statue is a curiosity card: name only.",
 "calas:Bačvice": "Merge the beach card and the 6 am secret-gem card. The picigin game is a curiosity card: name only. Verify the sand claim (sand/fine shingle), the bars above it.",
 "around:Brač": "From the old Brač walk: the Jadrolinija car ferry Split–Supetar (verify crossing time ~50 min and the winter frequency), Bol and Zlatni Rat, the stone of Pučišća (the stonemasons' school is the craft section's: name only), Stina winery is a larder card: name only. Day-trip labels.",
 "around:Hvar and Vis": "From the old islands card (drop the villas and hotels): Hvar town and Stari Grad plain (UNESCO 2008, verify), Vis (closed military island until 1989, verify), Komiža and the viška pogača (the Dish's: name only), the Vugava grape (its drink card: name only). Catamaran/ferry times in winter (verify honestly). Day-trip labels; maps_query 'Vis, Croatia' or empty.",
 "around:Trogir": "Merge the walk and the culture card: Radovan's portal (1240, verify), Kamerlengo, UNESCO 1997; getting there (bus 37 from Split; verify) and the 2026 winter hours of the cathedral. Day-trip labels.",
 "provisioning:Uje": "Verify Uje trades in 2026 at Marulićeva 1 (or wherever); 'first olive-oil bar in Croatia' verify or soften. Shop labels Where · Open · Buy · Price. maps_query 'Uje Oil Bar, Split, Croatia'.",
 "provisioning:Paški sir and Pag salt": "Merge the cheese and the salt card: Paški sir PDO (verify year of EU PDO), Gligora (verify), the Pag salt works (Solana Pag, the 'documented since 999' — verify or dispute). Pag is three hours north: say it; buy the cheese at the Pazar or in a Split shop. maps_query empty (or the Gligora dairy).",
 "provisioning:Stina, Bol": "Verify Stina trades in 2026 (tasting room in Bol, old cooperative building?), what they make (Plavac Mali, Pošip, Vugava?), winter hours. maps_query 'Stina winery, Bol, Croatia'.",
 "linger:D16 Coffee": "Verify D16 Coffee trades in 2026 and its address (Dosud 9). Café labels Where · Open · Order · Work?. maps_query 'D16 Coffee, Split, Croatia'.",
 "linger:The Riva": "The old work card + the Prokurative (Trg Republike) behind it. Verify the Riva's 2007 rebuild (Smiljan Radić? no — verify the architects 3LHD). Do not name Bajamonti (cut).",
 "linger:Matejuška with a bottle": "The old secret-gem: locals on the stone of the fishermen's harbour with a bottle. The '€5/L wine from the Pazar' is a claim: keep only if supported, else say 'a bottle from a shop'. Fife is a table card: name only.",
 "drink:Plavac Mali": "Plavac Mali = Tribidrag (Zinfandel) x Dobričić (verify: parentage published ~2008?). The DNA DISCOVERY story (Kaštela, 2001, Carole Meredith, the nine vines) is the guide's food-history fold: do NOT tell it here, name it ('its story is told above'). Dingač and Postup. Grgić Vina is cut from this guide: do not recommend it.",
 "drink:Tribidrag": "This card is HOW TO DRINK IT TODAY: who makes Tribidrag/Crljenak Kaštelanski now near Split (Putalj in Kaštel Sućurac? verify), the name on the label, what it tastes like. The 2001 discovery story is the food-history fold: name it, do not retell. Wine labels In the glass · On the label · Ask for.",
 "drink:Prošek": "Merge the old avoid card (Prošek vs Prosecco). Verify where the EU dispute stands in 2026. Wine labels.",
 "drink:Pošip": "Verify 'IGP since 1967' (it was Croatia's first protected white wine, 1967? verify), Čara/Smokvica.",
 "drink:Vugava": "Verify producers (Lipanović, Roki's?).",
 "drink:Rakija": "Verify Maraska founded 1899? (Zadar). Keep it short.",
 "listening:Klapa": "UNESCO 2012 (verify); in Split, where to hear it live now: the Peristyle's informal klapa in the Vestibule (verify a dated 2026 source), the Omiš festival is the calendar's (name only). Festival/live labels When · Where · Cost · Tip.",
 "avoid:The pitcher of house wine": "The old claim 'bulk Macedonian' is unsourced: soften to what you can source (unlabelled jug wine); Instead: Paradox, Zinfandel (pointer cards).",
 "avoid:Pašticada in August": "Instead: Apetit or Fife (table cards) — verify either actually serves pašticada (from their venue records/your search).",
}
batches = {1: ["quartiers", "curiosities", "culture"], 2: ["provisioning", "walks", "calas", "around"], 3: ["avoid", "follow", "listening"], 4: ["craft", "coffee-gardens", "bars"]}
for n, folds in batches.items():
    cards = {}
    for f in folds:
        for gr in PLAN[f]["groups"]:
            for c in gr["cards"]:
                e = {"fold": f, "group": gr["title"]}
                if c["from"]: e["old"] = OLD[c["from"]]
                if EXTRA_OLD.get(c["key"]): e["old_also"] = OLD[EXTRA_OLD[c["key"]]]
                b = " ".join(x for x in (NEW_BRIEF.get(c["key"]), EXTRA_BRIEF.get(c["key"])) if x)
                if b: e["brief"] = b
                cards[c["key"]] = e
    json.dump(cards, open(RV / f"research/rewrite_{n}_input.json", "w"), ensure_ascii=False, indent=1)
    print(n, len(cards))
LANE = {i: (k, l["label"]) for k, l in PICKS["lanes"].items() for i in l["ids"]}
keep = list(LANE)
A = ("summit", "varos", "palace")
splits = {1: [i for i in keep if LANE[i][0] in A], 2: [i for i in keep if LANE[i][0] not in A]}
for n, ids in splits.items():
    json.dump({i: {**V[i], "_lane": LANE[i][1], "_lane_key": LANE[i][0]} for i in ids}, open(RV / f"research/venues_input_{n}.json", "w"), ensure_ascii=False, indent=1)
    print("venues", n, len(ids))
json.dump({i: V[i] for i in PICKS["cut"]}, open(RV / "research/venues_cut.json", "w"), ensure_ascii=False, indent=1)
