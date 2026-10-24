#!/usr/bin/env python3
"""Inputs for the research/rewrite agents (24 Oct 2026): research/rewrite_<n>_input.json (cards per batch, old text +
brief for new cards) and research/venues_input_<n>.json (old venue records with their lane)."""
import json, pathlib, subprocess
REPO = pathlib.Path(__file__).resolve().parents[4]; RV = pathlib.Path(__file__).resolve().parent
OLD = json.load(open(RV / "research/cards_old.json")); PLAN = json.load(open(RV / "card_plan.json")); PICKS = json.load(open(RV / "picks.json"))
js = subprocess.run(["git", "show", "origin/rebuild/publishing-system:terroir/Faro-Algarve/data.js"], cwd=REPO, capture_output=True, text=True, check=True).stdout
D = json.loads(subprocess.run(["node", "-e", "global.window={};eval(require('fs').readFileSync(0,'utf8'));process.stdout.write(JSON.stringify(window.TERROIR_DATA))"], input=js, capture_output=True, text=True, check=True).stdout)
V = {v["id"]: v for v in D["VENUES"]}; V.update(PICKS["new_venues"])
QW = ("NEW quarter card. Build it from the old guide text (research/guide_text_old.txt: [quartiers], [walk], [history]) and the kept venue records, "
      "verified now where perishable. Labels: Go for · Best hour · Don't miss · Eat (Eat names only kept table venues of this guide, never a cut one). "
      "maps_query = the place + ', Faro, Portugal'. Do not retell another card's story: name it and move on.")
CU = ("Curiosity card: one verified fact most guides get wrong or never tell. Verify it now (one or two WebSearch) "
      "and keep any dispute as a dispute. Labels: Touch it today · Where the sources argue (only if they do). tag 'curiosity'. "
      "maps_query ONLY if there is one place to go and see it (ending ', Faro, Portugal'), else empty.")
PT = ("POINTER card: this place is a kept TABLE venue of the guide (its record is in research/venues_input_*.json, id {vid}). Set \"ref\": \"{vid}\". Write it in THIS section's "
      "angle ({angle}), story 40-70 words that does NOT retell the venue's own why/verdict; facts Order · When · Book · Price (only what the record "
      "or a source supports); maps_query empty (the table card carries the Maps link).")
AV = ("Warning card, tag 'the warning', NO Maps (maps_query empty). Labels: Touch it today (what you will see) · Instead (what to do). "
      "Keep to the claims the old text makes ([avoid] in research/guide_text_old.txt), verified where dated; no invented numbers. Instead names only kept venues/cards.")
FO = "NEW follow card. Labels What it is · Language · Read. site = the official domain only if confident (verify with one WebSearch). No Maps. Do not print follower counts."
SW = ("Swim card. Beach labels Getting there · Best hour · Bring · Don't miss. Late October: say honestly how warm the sea is now (Atlantic, verify a typical "
      "late-October figure from a source or say 'cool'), and what boats and beach restaurants run in the winter (verify the 2026 winter timetable or say check). maps_query = the beach + ', Portugal'.")
BAR = ("Bar card (this place was a venue record in the old guide; its record is given as old_record). Verify it trades in 2026, its address and hours. "
       "Labels Where · Pour · Price · Best hour (+ Season when seasonal). maps_query = the bar + ', Faro, Portugal'. If it has closed, say so in _verified and write the card as tag 'closed' with a one-line story (the editor will drop it).")
NEW_BRIEF = {
 "quartiers:Cidade Velha": QW + " The walled old town: the Arco da Vila (its card is the storks curiosity: name only), the Largo da Sé with its orange trees, the Paço Episcopal, the Arco do Repouso, the Convento (the museum card: name only). Tables inside: CHECKin, Faz Gostos (table cards). maps_query 'Largo da Sé, Faro, Portugal'.",
 "quartiers:The Baixa and Rua de Santo António": QW + " The pedestrian downtown north of the marina: the calçada of Rua de Santo António, the Mercado Municipal (a table venue: name only), Café Aliança and Gardy (linger cards: name only), Igreja do Carmo (the bones chapel card: name only). Tasca do Ricky, A Venda, Adega Nova are table cards: name only. maps_query 'Rua de Santo António, Faro, Portugal'.",
 "quartiers:The marina and the Jardim": QW + " The little marina (doca), the Jardim Manuel Bívar (a linger card: name only), the Cais das Portas do Mar where the island boats leave, the railway line along the lagoon. maps_query 'Doca de Faro, Faro, Portugal'.",
 "quartiers:Praia de Faro": QW + " Faro's ocean beach on the Ilha de Faro sandspit, reached by the single-lane bridge near the airport (bus 14/16 — verify the route numbers), planes landing overhead, beach restaurants; winter honest. maps_query 'Praia de Faro, Portugal'.",
 "curiosities:Portugal's first printed book": CU + " Samuel Gacon's Hebrew Pentateuch, printed in Faro in 1487 (verify the date 30 June 1487, the British Library copy, 'first book printed in Portugal'). The Jewish expulsion decree of 1496. Is there a plaque or a Jewish heritage centre in Faro (the Jewish cemetery / Centro Judaico — verify) — if so maps_query that place.",
 "curiosities:The bishop's library at Oxford": CU + " 1596: the Earl of Essex sacked Faro and took Bishop Fernando Martins Mascarenhas's library; in 1600 he gave books to Thomas Bodley — founding collection of the Bodleian. Verify the numbers (old says 215 volumes, 91 identified) — keep a dispute if sources differ. Maps empty or the Paço Episcopal.",
 "curiosities:Tempura went from here": CU + " The claim that tempura came to Japan with 16th-century Portuguese (peixinhos da horta; the word from tempora / Ember days). Widely told; partly disputed (other etymologies: temperar, templo). Keep the dispute honest. The dish itself is The Dish's: one line only. maps_query empty.",
 "curiosities:The storks of the Arco": CU + " Merge the old Arco da Vila card: the 1812 neoclassical arch by Francisco Xavier Fabri for Bishop Francisco Gomes do Avelar over the older Moorish gate (verify the 11th-century claim — keep a dispute), the statue of St Thomas Aquinas, and the white storks nesting on its bell tower (Faro's storks: resident all year? verify). maps_query 'Arco da Vila, Faro, Portugal'.",
 "provisioning:Mercado Municipal de Faro": PT.format(vid="v12-mercado-municipal-de-faro", angle="the larder: what a cook buys here and how to shop it"),
 "provisioning:Mercado de Olhão": PT.format(vid="v11-mercado-de-olh-o", angle="the larder: what a cook buys here and how to shop it; the Saturday farmers' market outside"),
 "bars:Bago Wine Bar": BAR,
 "bars:The Hotel Faro rooftop": BAR + " The bar is on the roof of Hotel Faro, on Praça D. Francisco Gomes by the marina (verify name: 'Hotel Faro & Beach Club' rooftop / 'Cais 1' ?).",
 "calas:Culatra and the Farol": SW + " Ilha da Culatra: the fishing village of Culatra and the Farol at its western tip, reached by ferry from Olhão (verify operator and that it runs year-round). No cars. maps_query 'Farol, Ilha da Culatra, Portugal'.",
 "craft:Do this one": "NEW #craft card. Research NOW (WebSearch, ~5 calls): the best craft of the Algarve a visitor can actually learn hands-on near Faro, with a named still-practising master and OPEN enrolment. Candidates: Loulé's coppersmiths who hammer cataplanas by hand (Rua da Barbacã; the Loulé Criativo programme runs workshops with named artisans — verify), empreita (dwarf-palm weaving, Loulé Criativo / São Brás), the azulejo painting workshops in Faro or Loulé, the salt-skimming of Tavira (Sal de Tavira tours? that's a larder card: no), a cataplana cooking class (Tertúlia Algarvia in Faro's old town ran one — verify 2026). Pick the ONE that best meets: an unbroken local craft + named master + you can enrol. Rename the card (name = the place/person). Labels What you do · Time · Cost · Book. maps_query the workshop + ', Portugal'.",
 "craft:Other one": "NEW #craft card: the second candidate from your research, with a plain 'Missing:' sentence at the end of the story (what it lacks: no named master / no class / sale only). Rename to the place. tag must be 'missing: <the one thing>'.",
 "craft:Other two": "NEW #craft card: the third candidate, same shape as 'Other one' (tag 'missing: <thing>').",
 "craft:What is sold as Algarve craft": "NEW tag 'the warning', NO Maps. What is sold on the marina and Rua de Santo António as Algarve-made and is not (factory or imported cataplanas, cork goods not from Portugal, painted 'azulejos' printed abroad, etc.): only claims you can source; else keep it general and honest. Labels: Touch it today · Instead.",
 "listening:No hi-fi listening bar": "Honest card, tag 'honestly', NO Maps. The old guide says no kissa-style audiophile listening bar exists in the Algarve (nearest in Lisbon, 3 h). VERIFY with 2 WebSearch ('listening bar Faro', 'hi-fi bar Algarve vinyl'): if you find a real one near Faro, write it instead (rename, tag 'listening bar', labels Where · Pour · Price · Best hour, maps). Otherwise labels Touch it today · Instead (Instead: Bago Wine Bar or the fado card — cards in this guide). Do not name Lisbon venues' hardware lists.",
 "listening:Fado": "NEW live card: where to hear fado (or Algarve live music) in Faro now — verify a dated 2025-26 source (e.g. a fado house or a regular fado night in Faro's old town, or the Teatro das Figuras / Teatro Lethes programme). If nothing regular is verifiable, write the honest version: fado is Lisbon's and Coimbra's song, Faro hears it in occasional concerts (say where to check). Labels When · Where · Cost · Tip. Rename the card to the place if you find one.",
 "listening:Art Haus": "Verify Art Haus (Faro) trades in 2026 (address, what nights). If closed, say so and tag 'closed'. Labels Where · Pour · Price · Best hour. maps_query the club + ', Faro, Portugal'.",
 "around:Loulé": "NEW day-trip card: Loulé, 20 min north-west (verify): the 1908 neo-Moorish market hall (verify date), the Saturday gypsy market, the castle, the coppersmiths' street (the craft section's: name only), Festival MED is the calendar's: name only. Day-trip labels Getting there · Time needed · Don't miss · Eat (only kept venues or none). maps_query 'Mercado Municipal de Loulé, Portugal'.",
 "avoid:Jet-skis in the lagoon": AV + " Ria Formosa Natural Park since 1987 (verify area ~18,000 ha). Instead: an eco-licensed boat (Animaris to Ilha Deserta) or the ferry from Olhão.",
 "follow:Visit Algarve": FO + " visitalgarve.pt (verify).",
 "follow:Município de Faro": FO + " cm-faro.pt, the city council: museum hours, the Lethes and the events agenda (verify).",
 "follow:MICHELIN Guide Portugal": FO + " guide.michelin.com Portugal selection (2026 published March 2026).",
 "follow:Vinhos do Algarve": FO + " vinhosdoalgarve.pt, the Comissão Vitivinícola do Algarve (verify).",
 "follow:Ria Formosa Natural Park": FO + " ICNF page for the Parque Natural da Ria Formosa (verify URL on icnf.pt).",
}
EXTRA_BRIEF = {
 "walks:Round the walls, gate to gate": "Merge the old walls card with the old [walk] prose (research/guide_text_old.txt): Arco da Vila -> Largo da Sé -> the Convento -> out by the Arco do Repouso -> the ramparts over the lagoon -> the marina -> the Jardim. Walk labels. The Arco's storks, the Sé, the museum have their own cards: name only. Verify the Arco do Repouso legend (Afonso III rested there, 1249).",
 "walks:The Ludo trail and the salt pans": "Merge the old Ludo trail card and the 06:30 salt-pan secret gem. Verify length/time (old: ~7 km, 3.5 h), the start (São Lourenço / Quinta do Lago?), flamingos present in autumn/winter (verify), the Ria Formosa park. Walk labels.",
 "calas:Ilha Deserta": "Merge the old Ilha Deserta walk card. Ilha da Barreta: Animaris boats from the Cais das Portas do Mar (verify 2026 winter sailing, ~30 min?), the boardwalk, Cabo de Santa Maria (the southernmost point of mainland Portugal — verify), Estaminé is a table card: name only, and whether it is open in winter (verify, say if it closes).",
 "calas:Ilha de Tavira": "Merge the old Quatro Águas sunset gem: the ferry from Quatro Águas to Ilha de Tavira (verify winter service), the beach, and the anchor cemetery at Praia do Barril (the food-history fold tells the tuna story: name only).",
 "culture:The Sé and its tower": "Merge the old Sé card and the bell-tower-at-opening gem. Verify: 2026 ticket and winter hours (old says EUR 4-5), the bell tower climb, the Baroque organ (verify), the bone chapel at the Sé (there is a small one too — verify), the 1596 burning (the Oxford library is a curiosity card: name only).",
 "culture:Museu Municipal": "Merge the old museum card and the cloister gem. Verify: the Roman mosaic of Oceanus (from Faro, 3rd c.), the Renaissance cloister of the Convento de Nossa Senhora da Assunção (founded 1519? verify), 2026 hours/price.",
 "culture:Capela dos Ossos": "Verify the bone chapel behind the Igreja do Carmo: date (old says 1816), number of skulls (old: 1,245 — keep 'about' or a dispute), the inscription, 2026 ticket/hours.",
 "culture:Teatro Lethes": "Verify: the 1605 Jesuit college, the Italianate theatre (1874? by Lázaro Doglioni?), the motto, whether it has a 2026 autumn programme (who runs it now: the Município / Teatro das Figuras?). Festival/sight labels.",
 "culture:Milreu": "Verify: Milreu Roman villa at Estói, the fish mosaics, the temple (water sanctuary), 2026 hours and ticket, how to get there (bus to Estói). The Estói palace (Pousada) can be named in one line (hotels are not judged).",
 "provisioning:Flor de sal de Tavira": "Merge the old salt producer card and the old drink 'Flor de Sal de Tavira' card. Verify DOP (2013?), the magnesium figure claim (keep only if sourced), who sells it in Faro, Sal de Tavira's tours (verify). Shop/product labels.",
 "provisioning:Krater": "Verify Krater wine shop in Faro trades in 2026 and its address. Shop labels Where · Open · Buy · Price.",
 "provisioning:Morgado do Quintão": "Verify the estate in Lagoa, family since the 19th century (old says 1810 — verify), Joana Maçanita, the 2,000-year-old olive tree claim (verify/dispute), tastings booking 2026, Crato Branco. Producer labels Where · Open · Buy · Price. Note: it is not in Faro (about 1 h west).",
 "provisioning:Cabrita Wines": "Verify Cabrita (Silves) 2026: Negra Mole range, visits. Producer labels.",
 "provisioning:Casa do Medronho": "Verify the Casa do Medronho in Marmelete (Monchique) exists and visits in 2026; else find the right medronho distillery visit (e.g. one named producer in the Serra de Monchique). Producer labels.",
 "linger:Café Aliança": "Verify: founded 1908, 'third-oldest café in Portugal' (soften if disputed), reopened after renovation? (verify 2026 status and hours), Fernando Pessoa/Simone de Beauvoir visitor claims ONLY if sourced. Café labels Where · Open · Order · Work?.",
 "linger:Pastelaria Gardy": "Merge the work and producer cards. Verify: since 1953 (or 1956?), Rua de Santo António, what to order (Dom Rodrigo: the Dish's — name only; the doce fino / morgado algarvio?). Café labels.",
 "linger:Jardim Manuel Bívar": "Merge the old garden card and the 18:30 bench gem. The bandstand, the palms, the view over the lagoon. Sight labels.",
 "drink:Negra Mole": "Merge the old sparkling Negra Mole card in. Verify the claims: 'second-oldest named variety in Portugal' (dispute?), the 1980s 75% share (keep only if sourced, else soften), producers. Wine labels In the glass · On the label · Ask for.",
 "drink:Arinto": "Short; wine labels.",
 "drink:Crato Branco": "Crato Branco = Síria/Roupeiro; verify. Wine labels.",
 "drink:Medronho": "Verify IGP 'Medronho do Algarve' (or Aguardente de Medronho do Algarve IG), ~48% ABV claim (keep 'about' or the legal range), copper alembic. Do not retell the still (Casa do Medronho card): name it.",
 "drink:Bagaceira": "Short; how to drink it; wine/drink labels.",
 "around:Olhão": "From the old Olhão walk card: the twin 1916 market halls (the market is a table venue: name only), the cubic houses of the Bairro dos Pescadores (verify), ferries to Armona and Culatra (Culatra is a swim card: name only), the train 10 min. Day-trip labels.",
 "around:Tavira": "From the old Tavira card: the Roman (actually medieval) bridge over the Gilão (keep the dispute), the churches (old says 37 — verify or soften), the castle, Ilha de Tavira is a swim card: name only. Train ~35 min (verify). Day-trip labels.",
 "around:Sagres and Cabo de São Vicente": "From the old card: Cabo de São Vicente, the Fortaleza de Sagres (Henry the Navigator — keep the 'school' legend a dispute), 'the last sausage before America' stall (verify it exists in 2026, or omit), about 1h40 by car. Day-trip labels.",
 "avoid:The fifteen-minute cataplana": "From the old €18 cataplana card: Instead: Tasca do Ricky or A Venda (table cards) — only if their records support cataplana.",
 "avoid:Local fish, every species, all year": "Instead: the markets (pointer cards) and the tascas.",
 "avoid:Cataplana at noon in August": "Keep it short; Instead: the island lunch (Estaminé — table card) and cataplana for dinner.",
}
batches = {1: ["quartiers", "curiosities", "culture"], 2: ["provisioning", "walks", "calas", "around"], 3: ["avoid", "follow", "listening", "craft"], 4: ["coffee-gardens", "bars"]}
for n, folds in batches.items():
    cards = {}
    for f in folds:
        for gr in PLAN[f]["groups"]:
            for c in gr["cards"]:
                e = {"fold": f, "group": gr["title"]}
                if c["from"]: e["old"] = OLD[c["from"]]
                if c["key"] == "bars:Bago Wine Bar": e["old_record"] = V["v13-bago-wine-bar"]
                if c["key"] == "bars:The Hotel Faro rooftop": e["old_record"] = V["v14-hotel-faro-rooftop"]
                if c["key"] == "provisioning:Morgado do Quintão": e["old_record"] = V["v15-morgado-do-quint-o"]
                b = " ".join(x for x in (NEW_BRIEF.get(c["key"]), EXTRA_BRIEF.get(c["key"])) if x)
                if b: e["brief"] = b
                cards[c["key"]] = e
    json.dump(cards, open(RV / f"research/rewrite_{n}_input.json", "w"), ensure_ascii=False, indent=1)
    print(n, len(cards))
LANE = {i: (k, l["label"]) for k, l in PICKS["lanes"].items() for i in l["ids"]}
keep = list(LANE)
A = ("summit", "stories")
splits = {1: [i for i in keep if LANE[i][0] in A], 2: [i for i in keep if LANE[i][0] not in A]}
for n, ids in splits.items():
    json.dump({i: {**V[i], "_lane": LANE[i][1], "_lane_key": LANE[i][0]} for i in ids}, open(RV / f"research/venues_input_{n}.json", "w"), ensure_ascii=False, indent=1)
    print("venues", n, len(ids))
json.dump({i: V[i] for i in PICKS["cut"]}, open(RV / "research/venues_cut.json", "w"), ensure_ascii=False, indent=1)
