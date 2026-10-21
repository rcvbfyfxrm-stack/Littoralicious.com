"""The editor's reconciliations on the research packs (21 Oct 2026): applied by make_inputs.py, each one stated."""
import re
TOK = re.compile(r"\b(Var|France|Provence|Cavalaire)\b")
EDITS = [          # (old, new) exact replacements in card text fields
]
CARD_SET = {       # key -> {field: value} overrides
 # told once: the Bateaux Verts follow card owns the shuttle's ports; the warning only says it does not call here
 "avoid:Saint-Tropez by car in August": {"story": "Saint-Tropez looks close from Cavalaire, about 17 km, and in August that is the trap: the peninsula's roads clog at beach time and the day goes in traffic rather than in the village. The old advice to take the gulf shuttle from Cavalaire's quay no longer holds, because the 2026 timetable has no Cavalaire stop (its follow card says where it does call). From Cavalaire's port, the Vedettes Îles d'Or ran seasonal coastal trips towards Saint-Tropez from May to late September 2026, an excursion rather than a ferry line."},
 # told once: the hot board owns the 2026 chestnut Sundays, the calendar the yearly pattern
 "around:Collobrières and La Verne": {"story": "The road climbs into the Massif des Maures, cork oak and chestnut, until it drops into Collobrières, the chestnut village, where marrons glacés and chestnut cream are the local trade, and October brings its chestnut Sundays (the calendar has them). Further into the forest stands the Chartreuse de la Verne, a Carthusian monastery founded in 1170, its doorways cut from the Maures' green serpentine stone. Since 1983 a community of nuns of the Bethlehem family has lived there; visitors share only the church with them, in silence.",
                                     "why": "Come in October for the chestnuts, and give the afternoon to La Verne while it keeps its autumn hours."},
}
VENUE_SET = {      # id -> {field: value} overrides, each one a correction from the 21 Oct re-check
 # the chef is disputed (Relais & Châteaux 2026 names Thomas Pezeril, regional listings Alexandre Fabris): the verdict names neither
 "v-la-palmeraie-chateau-de-valmer": {"verdict": "A one-star Relais & Châteaux dining room under a grove of century-old palms above Gigaro, cooking three Provençal set menus — one entirely vegetarian — around the vegetables, herbs and flowers of the estate's organic kitchen garden. One star in 2026, and open only for the summer season; who signs the menus is disputed between the sources (see the chef line)."},
 # the venue pack found no MICHELIN selection entry for the restaurant, only the hotel's two Keys; the founding chef's position is disputed
 "v-vista-lily-of-the-valley": {"signature": "Sisteron lamb shoulder braised with savory (sarriette), served to share (€98, seen Jul 2026) — the dish Gault&Millau singles out.",
   "caveat": "A five-star hotel dining room, not a hidden bistro: à la carte ran roughly €25–150 a plate (seen Jul 2026), and the room holds about 120 covers between the hall and its sea-facing terrace, so the draw is the cooking and the view, not intimacy. No MICHELIN star; a MICHELIN selection entry for the restaurant could not be confirmed (the hotel holds two MICHELIN Keys). Seasonal: its 2026 dates were not published — call before you plan on it.",
   "person": "Disputed: Gault&Millau 2026 credits Vincent Maillard, head chef since the hotel opened in 2019 (trained under Guy Savoy and Alain Ducasse); Pudlowski (2023) reports the Lily of the Valley kitchens now led by Charley Bouhier."},
 # the 2026 menus seen do not show the bouillabaisse or the lobster risotto; reviews point to the cuttlefish linguine
 "v-le-grand-bleu-hotel-de-la-cala": {"verdict": "A view-first fish house on a terrace pinned to the cliff above the Cron cove, east of Cavalaire's port: come for the drop to the sea and the day's fish. What it is not: a critics' address. No MICHELIN listing; Gault&Millau carries a directory entry without a toque or a score (seen Jul 2026). It is a member of the chef-founded Collège Culinaire de France (since 2024) — peer recognition, not a critic's ranking.",
   "signature": "The bouillabaisse de la calanque with its aïoli and a lobster risotto were the house plates in July 2026; neither shows on the 2026 menus seen in October, where reviews point to the cuttlefish linguine — ask what is on."},
 # the 1652 Colbert right is unsourced (research/hot_events.json bougie): the why keeps what the town's own page says
 "v-pecheurs-du-port": {"why": "Cavalaire's small boats still sell part of their catch themselves, on the quay where they tie up, rather than sending all of it to auction. The town's own page says the meeting time follows the boats and the weather, from about ten, and that the fishermen hand out recipes with the fish: bream, red mullet, girelles, rockfish for the soup, a langouste on a good day. The coast's fishermen have judged their own sea since the Middle Ages; the fold at the top tells it."},
 "v-maurin-des-maures": {"caveat": "Order the bouillabaisse the day before — Pudlowski's exact phrase is \"à commander la veille\", not the \"48h\" sometimes quoted. Treat €76.50 for a pot serving two as Pudlowski's 2022 figure: the current menu lists the bouillabaisse du pêcheur at around €85.50 a person, two people minimum (seen Jul 2026). A splurge plate, not a cheap eat. No current Guide du Routard listing was found: the signal rests on Pudlowski and Gault&Millau (11/20). One listing says no dinner from 11 November to 20 December: call."},
}
LANE_STORY_SET = {  # lane -> {field: value}
 # the 1652 Colbert right is unsourced (the 1681 ordinance has no such article: research/hot_events.json bougie); the chef of La Palmeraie is disputed
 "street": {"story": "Cavalaire's cheapest good food is bought standing up. On Quai Marc Pajot the fishermen sell their catch from about ten in the morning, whenever the boats are in and the weather allows; they take rockfish for soup, bream, red mullet and now and then a langouste; the royal right of 1652 that older guides credit for this was not found in any ordinance (the quay's real story is the fold at the top). Every Wednesday of the year the Provençal market fills Place Jean Moulin from 08:30 to 13:00 with tapenade, pissaladière and Maures honey. In the evening Ô Petit Bar, on Rue du Port, pours mojitos looking out over the marina; its tourist listing says it opens every day."},
 "summit": {"story": "The decorated tables around Cavalaire all sit inside hotels, and all three keep summer hours. La Voile, at La Réserve Ramatuelle, has held two stars since 2020 for Éric Canino, a Michel Guérard pupil, and in 2026 opened from 1 May to 11 October. La Palmeraie, on the Château de Valmer wine estate above Gigaro, keeps one star in 2026 and cooks from its own organic garden; it served from 8 May to 4 October, and who signs its menus in 2026 is disputed between the sources. Vista, at Lily of the Valley on the same hillside, has no star but a Gault&Millau 13/20 in 2026, and Sisteron lamb to share."},
}
HOT_SET = {        # hot/event card name -> {field: value}
 # told once: the hot-board card owns this year's three themed Sundays; the calendar card keeps the yearly pattern
 "Fêtes de la Châtaigne, Collobrières": {"story": "Collobrières is the chestnut village of the Massif des Maures, and every October it gives three Sundays to the harvest, each with its own theme, the streets smelling of roasting nuts from the morning. Entry is free and the parking is paid, on the edge of the village. The 2027 Sundays had not been published when this was checked; on the usual pattern, expect three from mid-October. This year's last one is on the hot board at the foot."},
}

def cards(C):
    for k, c in C.items():
        for f in ("teaser", "story", "why", "name"):
            for a, b in EDITS:
                if c.get(f) and a in c[f]: c[f] = c[f].replace(a, b)
        for fa in c.get("facts") or []:
            for a, b in EDITS:
                if a in fa[1]: fa[1] = fa[1].replace(a, b)
        c.update(CARD_SET.get(k, {}))
    for k, c in C.items():   # every Maps query carries a local token (the gate's wrong-continent check)
        q = c.get("maps_query") or ""
        if q and not TOK.search(q): c["maps_query"] = q + ", Var, France"

def hot(H):
    # the venue pack could not confirm the stand runs through the winter: the board does not claim it
    H["venue_hot"]["v-pecheurs-du-port"] = ("Autumn mornings on the quay from about 10:00, weather and catch permitting: rockfish for the soupe de roche, "
                                             "the day's bream, bass and red mullet. Whether the stand works every winter morning is not confirmed: go and look.")
    for g in H["hot"]["groups"] + H["events"]["groups"]:
        for it in g["items"]:
            it.update(HOT_SET.get(it["name"], {}))
            q = it.get("maps_query") or ""
            if q and not TOK.search(q): it["maps_query"] = q + ", Var, France"

def venues(V):
    for i, d in VENUE_SET.items(): V[i]["set"].update(d)

def lane_stories(L):
    for k, d in LANE_STORY_SET.items(): L.setdefault(k, {}).update(d)
