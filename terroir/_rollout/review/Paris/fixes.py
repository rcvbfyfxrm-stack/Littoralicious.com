"""The editor's reconciliations on the research packs (16 Oct 2026): applied by make_inputs.py, each one stated."""
import re
TOK = re.compile(r"\b(Paris|France)\b")
EDITS = [          # (old, new) exact replacements in card text fields
 ("the first elevated railway in the world turned into a park walk", "the first railway viaduct in the world turned into a park walk"),   # gate-banned word
]
CARD_SET = {}       # key -> {field: value} overrides
VENUE_SET = {      # id -> {field: value} overrides, each one a correction from the 16 Oct re-check (research/verify_*.json corrections)
 # prices: 2026 sources disagree (EUR 260-420, 185-520, dinner from 490): no single figure printed
 "v-l-arpege": {"caveat": "Not a value eat, and the prices quoted in 2026 sources disagree widely, so ask when you book. Since July 2025 the animal cooking that made Passard's name, the lobster and the pigeon, is gone, and so is the famous egg: the kitchen is all-vegetable but for the honey from its own hives. Portions can feel small for the money, and a table is hard-won."},
 "v-kei": {"caveat": "Ceremony and expense, not a spontaneous dinner: 2026 sources give menus from about EUR 185 up to EUR 580 and disagree on which runs at lunch, so confirm when you book. The room is small and books out."},
 "v-datil": {"caveat": "Tasting menu only, and the prices have climbed: 2026 sources range from about EUR 90 at lunch to EUR 160 at dinner (seen Oct 2026), so confirm when you book."},
 # the old verdict claimed a star 'still standing in the 2026 guide'; Pudlowski's March 2023 list of removals names Le Rigmarole
 "v-le-rigmarole": {"verdict": "A walnut counter where Robert Compagnon grills yakitori over Japanese binchotan while Jessica Yang's kitchen rolls the pasta by hand. It held a MICHELIN star from 2020 until the 2023 guide; the spaghetti with bottarga is still the plate regulars come back for, and the counter seats are few."},
 # the old verdict and caveat called the reopened room unrated; Gault&Millau 2026 gives it 14/20
 "v-le-grand-vefour": {"verdict": "A listed eighteenth-century room under the Palais-Royal arcades, where the banquettes still carry brass plaques for Napoléon, Victor Hugo and Colette. Paris Society reopened it on 12 May 2026 with Bruno Doucet's pleasure-first French menu and a garden terrace; Gault&Millau 2026 rates it 14/20. Go for the room and the ghosts first."},
 # the old verdict printed a EUR 490 menu; 2026 sources give EUR 740 (Yonder, Jan 2026) or ranges to 760
 "v-guy-savoy": {"verdict": "Two MICHELIN stars (down from three in 2023), yet joint No. 1 on La Liste 2026: a grand classical restaurant inside the Monnaie de Paris, the old royal mint, where the tasting menu still opens with the artichoke and black-truffle soup that has anchored his cooking for decades. The menu now runs to about EUR 740 (seen Jan 2026)."},
 # head chef disputed between sources: no name printed
 "v-le-train-bleu": {"person": "Michel Rostang has curated the menu since 2018 (the year is disputed between sources); the head chef's name differs between sources, so none is printed."},
 # Bertrand Grébaut died in early July 2026 (AFP, 4 Jul 2026); no source yet names who leads the kitchen
 "v-septime": {"person": "Co-founded in 2011 by Bertrand Grébaut (ex-Arpège under Alain Passard) and Théophile Pourriat. Grébaut died in early July 2026, aged 44 (AFP, 4 July 2026); Pourriat runs the house, and no source yet names who now leads the kitchen.",
               "verdict": "One MICHELIN star and No. 40 on The World's 50 Best 2025, and lunch is a carte blanche you do not choose: the kitchen sends what the week's harvest decides. The neo-bistro that set the template for a generation of Paris kitchens, in its first season without its founding chef, and still one of the hardest of them to book."},
 "v-clamato": {"person": "Opened in November 2013 by Bertrand Grébaut and Théophile Pourriat as Septime's no-bookings seafood sibling; Grébaut died in July 2026 and Pourriat runs the house."},
 "v-le-servan": {"caveat": "No new find: a twelve-year-old (opened spring 2014), hard-to-book institution whose Le Fooding best-bistro crown dates to 2015. The room seats under 40, and the 2026 listings disagree on its days (one gives closed Sunday and Monday, Saturday dinner only): call before you go."},
 "v-le-baratin": {"caveat": "The welcome is the running joke: reviewers warn the front of house can be brusque, The Infatuation (2024) describing an almost comically ornery maître d', and Time Out admitting it has not always found the service the friendliest. The room is small and the blackboard changes daily."},
 "v-vantre": {"verdict": "The cooking is precise and reliably good, but the reason Vantre matters is the cellar: a list that first won a Wine Spectator Grand Award in 2019, in a room this small, and the rare place to drink at that depth without a fine-dining bill."},
 # no dated 2026 price for the oeuf mayo; Gault&Millau 2026 gives the bourguignon at EUR 12.20 and about EUR 20 a head
 "v-bouillon-pigalle": {"verdict": "Order the oeuf mayo, a beef bourguignon (EUR 12.20 by Gault&Millau 2026) and profiteroles, add a pichet, and you are around EUR 20 to 25 a head in a 300-seat room on the boulevard de Clichy."},
 # AFP (Apr 2026): EUR 6.50, not 6
 "v-le-petit-vendome": {"verdict": "The genuine benchmark, not a tourist trap dressed as one: order it plain to judge it. The classic jambon-beurre runs about EUR 6.50 (AFP, Apr 2026), and it is closed on Sundays.",
                        "signature": "The jambon-beurre, plain, to read the bread, butter and ham balance; or the Spécial, with dry-cured country ham, fresh goat cheese and olive oil."},
 "v-la-creperie-de-josselin": {"verdict": "The most honest galette in the Breton quarter by Montparnasse: skip the flourishes and order the complète. No reservations, and the cider arrives in a ceramic bowl, not a glass; the listings disagree on its closing days, so check before you go."},
 "v-le-relais-de-l-entrecote": {"verdict": "Not actually quick: a queue, then a full sit-down, a second helping of steak and frites included. No reservations, roughly EUR 30, and three Paris rooms (Saint-Benoît, Marbeuf, Montparnasse); the Marbeuf room was closed for works in 2026 and its reopening is unconfirmed, so this guide sends you to rue Saint-Benoît."},
}
LANE_STORY_SET = {} # lane -> {field: value}

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
        if q and not TOK.search(q): c["maps_query"] = q + " Paris"

HOT_SET = {   # told once: the calendar card 'The Seine swims and Paris Plages' owns the sites, hours and the 2026 numbers
 "The Seine swims: closed until next summer": {
  "teaser": "The river season is over: the three swimming sites closed on 28 August 2026, a day early",
  "story": "If you came hoping to swim in the Seine, you are a season late. The supervised sites shut at the end of August, and storms closed them a day before the planned last day; the city will announce the 2027 dates in spring. What October offers on the river instead is the light: the quays at Bras Marie, below the Pont Louis-Philippe, are where the summer bathers lay out their towels, and in autumn they are a quiet stretch of stone with the Île Saint-Louis across the water. The calendar card further down has the summer details.",
  "facts": [["When", "Closed for the season; next season summer 2027, dates not yet out (Oct 2026)"], ["Where", "Bras Marie, below the Pont Louis-Philippe (4th)"], ["Cost", "Free when open"], ["Tip", "Walk the quay instead and save the swim for July"]]},
}
def hot(H):
    for g in H["hot"]["groups"] + H["events"]["groups"]:
        for it in g["items"]:
            it.update(HOT_SET.get(it["name"], {}))
            q = it.get("maps_query") or ""
            if q and not TOK.search(q): it["maps_query"] = q + " Paris"

def venues(V):
    for i, d in VENUE_SET.items(): V[i]["set"].update(d)

def lane_stories(L):
    for k, d in LANE_STORY_SET.items(): L.setdefault(k, {}).update(d)
