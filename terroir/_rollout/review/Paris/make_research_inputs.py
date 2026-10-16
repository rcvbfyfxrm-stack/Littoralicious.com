#!/usr/bin/env python3
"""Inputs for the research/rewrite agents (16 Oct 2026): research/rewrite_<n>_input.json (cards per batch, old text +
brief for new cards) and research/venues_input_<n>.json (old venue records with their lane)."""
import json, pathlib, subprocess
REPO = pathlib.Path(__file__).resolve().parents[4]; RV = pathlib.Path(__file__).resolve().parent
OLD = json.load(open(RV / "research/cards_old.json")); PLAN = json.load(open(RV / "card_plan.json")); PICKS = json.load(open(RV / "picks.json"))
js = subprocess.run(["git", "show", "origin/rebuild/publishing-system:terroir/Paris/data.js"], cwd=REPO, capture_output=True, text=True, check=True).stdout
D = json.loads(subprocess.run(["node", "-e", "global.window={};eval(require('fs').readFileSync(0,'utf8'));process.stdout.write(JSON.stringify(window.TERROIR_DATA))"], input=js, capture_output=True, text=True, check=True).stdout)
V = {v["id"]: v for v in D["VENUES"]}
CU = ("Curiosity card from the old [curiosities] and [history] prose (research/guide_text_old.txt): one verified fact most guides get wrong or never tell. "
      "Verify it now (one WebSearch) and keep any dispute as a dispute. Labels: Touch it today · Where the sources argue (only if they do). tag 'curiosity'. "
      "maps_query ONLY if there is a place to go and see it, else empty. Rename the card if a better short title fits.")
PV = ("NEW larder card from the old [provisioning] prose in research/guide_text_old.txt (the paragraph naming this place). Verify it trades in 2026 and its days/hours "
      "(one or two WebSearch). Market labels Days · Hours · Go at · Look for; shop labels Where · Open · Buy · Price. site = its own domain only if confident.")
AV = ("NEW warning card from the old [avoid] prose (research/guide_text_old.txt), tag 'the warning', NO Maps (maps_query empty). Labels: Touch it today (what you will see) · Instead (what to do). "
      "Keep it to the claims the old text makes; no invented numbers.")
FO = "Follow card. Labels What it is · Language · Read. site = the official domain only if confident (verify with one WebSearch). No Maps."
NEW_BRIEF = {
 "curiosities:The empire of the dead": CU + " The Catacombs: the carved warning, bones moved by night from 1786, the descent (20 m, 130 steps). Visiting needs a timed ticket: verify 2026 price on catacombes.paris.fr.",
 "curiosities:Guimard's metro, 1900": CU + " Line 1 opened 19 July 1900 Porte Maillot–Porte de Vincennes; Guimard's entrances; Porte Dauphine and Abbesses keep glass-roofed pavilions (check which).",
 "curiosities:The Wallace fountains": CU + " Sir Richard Wallace, first set out 1872 after the siege; four caryatids; dark green; about 2.7 m, ~600 kg; how many still work (verify the number, eaudeparis).",
 "curiosities:Why the bar is called le zinc": CU + " The counter named for its zinc sheathing; the two-tier price (comptoir vs salle) posted by law. Keep the zinc rooftops line only if you can source it.",
 "curiosities:Voltaire's forty cups": CU + " Le Procope (1686, Procopio Cutò): Voltaire's forty cups (legend), Napoleon's bicorne (house tale), the café shut 1872, restaurant since 1957. Le Procope is NOT a table in this guide: tell it as a place to look in, not to eat.",
 "curiosities:Bistro is not Russian": CU + " The Cossack 'bystro' 1814 tale vs the word recorded only from the 1880s (Wiktionary, World Wide Words in the old history prose). No Maps.",
 "curiosities:Les Halles left in one night": CU + " Les Halles, 'the belly of Paris' (Zola), moved to Rungis in March 1969 (verify the date/night); what stands there now; Rungis is the second-largest wholesale food market after Mexico City's (old money-sits prose: keep as 'often said' if unverified). maps_query the Forum des Halles / Saint-Eustache.",
 "curiosities:The Paris vineyard": CU + " Clos Montmartre: replanted 1933, ~1,000-1,500 bottles (the old text says both 'about a thousand' and '1,000 to 1,500': settle or give the range), pressed in the mairie of the 18th, Fête des Vendanges each October since 1934 — verify the 2026 dates (early-mid October) and put them in the past tense if over. maps_query 'Clos Montmartre Paris'.",
 "curiosities:150 arcades, about 25 left": CU + " The covered passages: ~150 in the mid-1800s, ~25 left (verify). The culture card 'Galerie Vivienne & Passage des Panoramas' owns those two passages' own stories (1799, gas 1817): do NOT retell them; name Passage Jouffroy/Verdeau/Choiseul etc. only if verified. maps_query 'Passage Jouffroy Paris'.",
 "provisioning:Marché d'Aligre": PV, "provisioning:Marché Raspail": PV + " (the Sunday organic market; Tue & Fri traditional)",
 "provisioning:E. Dehillerin": PV + " (the cookware shop of 1820, Julia Child)", "provisioning:Fromagerie Barthélémy": PV + " (raw-milk affineur, 51 rue de Grenelle; the old text also names Marie-Anne Cantin — mention as the alternative only if verified trading)",
 "provisioning:La Grande Épicerie de Paris": PV + " (38 rue de Sèvres, Le Bon Marché's food hall)",
 "provisioning:Marché des Enfants Rouges": "Rebuild the old landmark card as a MARKET card (labels Days · Hours · Go at · Look for): Paris's oldest covered market (1615), now as much lunch counters as produce; verify 2026 days/hours.",
 "craft:Do this one": "NEW #craft card (the old guide had no craft section). Research NOW (WebSearch, ~5 calls): the best Paris craft a visitor can actually learn hands-on, with a named still-practising master and OPEN enrolment — candidates to check: a bread or croissant class in a working bakery (e.g. a named baker's own school), a perfume-making workshop with a named perfumer, a hat-making (modiste) class, bookbinding/reliure, a cheese-affinage session, a gilding (dorure) workshop, the Ateliers de Paris. Pick the ONE that best meets: an unbroken Paris craft + named master + you can enrol. Rename the card (name = the place). Labels What you do · Time · Cost · Book. If nothing qualifies, make this card the honest best option and say what it lacks.",
 "craft:Other one": "NEW #craft card: the second candidate from your research, with a plain 'Missing:' sentence at the end of the story (what it lacks: no named master / no class / sale only). Rename to the place. tag must be 'missing: <the one thing>'.",
 "craft:Other two": "NEW #craft card: the third candidate, same shape as 'Other one' (tag 'missing: <thing>'). E. Dehillerin is a larder card already: do not use it.",
 "craft:What is sold as Paris craft": "NEW tag 'the warning', NO Maps. What is sold round the Eiffel Tower, Montmartre's Place du Tertre and the rue de Rivoli as Paris-made and is not (imported Eiffel trinkets sold by street vendors, 'Paris' berets, mass-made macarons in souvenir boxes, painters at the Tertre copying postcards): only claims you can source. Labels: Touch it today · Instead.",
 "listening:Caveau de la Huchette": "NEW live-music card: the jazz cellar on rue de la Huchette (since 1946? verify), a medieval vault, swing dancing. Verify 2026 trading, nights and the entry price. Labels Where · Pour (what is on: the music) · Price · Best hour. maps_query 'Caveau de la Huchette Paris'.",
 "listening:Duc des Lombards": "NEW live-music card: the jazz club on rue des Lombards (Châtelet) — verify 2026 trading, sets, prices. Same labels.",
 "listening:New Morning": "NEW live-music card: New Morning, rue des Petites-Écuries (10th), the jazz/world room since 1981 — verify 2026 trading. Same labels.",
 "listening:Chanson, the caves and the French touch": "Story card for the city's own sound, built from the old [soul] 'The sound' paragraph (research/guide_text_old.txt): chanson (Piaf, Brel, Brassens, Ferré, Gainsbourg), the Saint-Germain jazz caves of the late 1940s (Le Tabou, Boris Vian, Miles Davis), the French touch (Daft Punk) and Ed Banger (Pedro Winter, 2003). Labels Touch it today (only verified places: e.g. Gainsbourg's house rue de Verneuil, Maison Gainsbourg opened 2023 — verify) · Where the sources argue. maps_query only if one place to go.",
 "around:Versailles": "NEW day-trip card: the Château de Versailles — the trip (RER C to Versailles Château Rive Gauche, or train from Saint-Lazare/Montparnasse), closed Mondays, timed tickets, 2026 passport price (verify on chateauversailles.fr), the gardens, Trianon, the Potager du Roi (the king's kitchen garden, still worked by the École nationale supérieure de paysage — a cook's angle). Labels Getting there · Time needed · Don't miss · Eat (no restaurant names unless verified). maps_query 'Château de Versailles'.",
 "around:Fontainebleau & Barbizon": "Merge the old 'Foret de Fontainebleau & Trois Pignons' card and the old 'Barbizon' card into one day out (the forest's bouldering and the painters' village). Day-trip labels.",
 "avoid:Champs-Élysées terraces": AV, "avoid:A table with the Eiffel Tower view": AV, "avoid:The hawker and the photo menu": AV, "avoid:Things you never ordered": AV + " (bottled water, bread, olives on the bill; 'une carafe d'eau'; the English menu with other prices).",
 "follow:Le Fooding": FO + " lefooding.com (old [follow] text).", "follow:Paris by Mouth": FO + " parisbymouth.com, Meg Zimbeck, 2010; the 'open in August' list.",
 "follow:David Lebovitz": FO + " davidlebovitz.com.", "follow:Paris je t'aime": FO + " parisjetaime.com — the official Paris tourist office (verify).",
 "follow:MICHELIN Guide France": FO + " guide.michelin.com — the France selection; the 2026 France ceremony date and whether the 2027 date is announced (verify; France usually unveils in March).",
}
batches = {1: ["quartiers", "curiosities", "walks"], 2: ["culture", "craft"], 3: ["provisioning", "avoid", "follow"], 4: ["bars", "listening"], 5: ["coffee-gardens", "around"]}
OLDV = {}
EXTRA_OLD = {"around:Fontainebleau & Barbizon": "around:Barbizon", "culture:Musée Nissim de Camondo": "art:Musee Nissim de Camondo", "art:Musee de la Vie Romantique": "culture:Musée de la Vie Romantique",
             "coffee-scene:La Cafeotheque": "linger:La Caféothèque", "linger:Ten Belles": "coffee-scene:Ten Belles", "natural-wine:Le Verre Vole": "bars:Le Verre Vole",
             "natural-wine:La Buvette": "bars:La Buvette", "natural-wine:Septime La Cave": "bars:Septime La Cave", "culture:Galerie Vivienne & Passage des Panoramas": "landmarks:Passage des Panoramas",
             "quartiers:Place des Vosges": "landmarks:Place des Vosges", "quartiers:Canal Saint-Martin": "walks:Canal Saint-Martin"}
for n, folds in batches.items():
    cards = {}
    for f in folds:
        for gr in PLAN[f]["groups"]:
            for c in gr["cards"]:
                e = {"fold": f, "group": gr["title"]}
                if c["from"]: e["old"] = OLD[c["from"]]
                if c["key"] in EXTRA_OLD: e["old_also"] = OLD[EXTRA_OLD[c["key"]]]
                if c["key"] in NEW_BRIEF: e["brief"] = NEW_BRIEF[c["key"]]
                cards[c["key"]] = e
    json.dump(cards, open(RV / f"research/rewrite_{n}_input.json", "w"), ensure_ascii=False, indent=1)
    print(n, len(cards))
LANE = {i: (k, l["label"]) for k, l in PICKS["lanes"].items() for i in l["ids"]}
keep = list(LANE)
A = ("creme", "produce", "grand", "neo", "bistro")
splits = {1: [i for i in keep if LANE[i][0] in A], 2: [i for i in keep if LANE[i][0] not in A]}
for n, ids in splits.items():
    json.dump({i: {**V[i], "_lane": LANE[i][1], "_lane_key": LANE[i][0]} for i in ids}, open(RV / f"research/venues_input_{n}.json", "w"), ensure_ascii=False, indent=1)
    print("venues", n, len(ids))
