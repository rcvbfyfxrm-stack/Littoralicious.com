"""The editor's reconciliations on the research packs (18 Oct 2026): applied by make_inputs.py, each one stated."""
import re
TOK = re.compile(r"(?i)cadaqu|\b(Spain|Girona|Catalunya|Catalonia)\b")
EDITS = [          # (old, new) exact replacements in card text fields
 ("closed 7 January to 11 February (Oct 2026)", "closed 7 January to 10 February, reopening on the 11th (the foundation's calendar; 2027 dates not yet published)"),
]
CARD_SET = {       # key -> {field: value} overrides
 # told once / unique names: the listening card owns the festival's story and its 2026 dates; the follow card only says where to read it
 "follow:Festival de Música de Cadaqués": {"name": "The festival's programme", "teaser": "Where the next summer's concerts in Santa Maria are announced, with the ticket links",
   "story": "The village's music festival announces each edition late in the spring, and its season moves from year to year: in 2025 it ran from April to December, in 2026 only through the summer. The concerts themselves, and the church they fill, are on the festival's own card under Hi-fi & listening. Follow the programme rather than trusting last year's dates, and book a church concert as soon as one falls in your window: the nave holds few seats.",
   "why": "Check the programme in May for the summer's dates.",
   "facts": [["What it is", "The programme and tickets of the Festival Internacional de Música de Cadaqués, founded 1970"], ["Language", "Catalan"], ["Read", "The next edition's programme and ticket links; the Surtdecasa Empordà agenda lists each edition"]]},
 # told once: La Riera (the quarter card) owns the dry riverbed; the market card keeps the stalls
 "provisioning:The Monday market on the Riera": {"story": "Once a week the car park becomes a village market again. On Monday mornings part of the Riera fills with about forty stalls by one count, local produce beside the clothes and household goods of any Catalan market day. It is a working market, not a food hall: come for the season's fruit and vegetables, a wedge of cheese and a few embotits for the galley, and leave the anchovy and the wine to the salters and the estates on the next cards. Whether it runs every Monday through the winter is not confirmed."},
 # the day trips: opening hours and prices were folded into 'Don't miss' — split into their own labels
 "around:Figueres — the Teatre-Museu": {"facts": [["Getting there", "About 45 minutes by road from Cadaqués over the Pení via Roses; Figueres also has a station on the Barcelona–Portbou line"], ["Time needed", "Two to three hours for the museum and Dalí·Joies"], ["Open", "Tuesday to Sunday 10:30–18:00 in autumn and winter, daily in July and August (2025 official timetable; 2026 not published, check)"], ["Cost", "€18.50 online, €20.50 at the desk, reduced €15 (Oct 2026, ticket listings); book the timed slot at salvador-dali.org"], ["Don't miss", "The crypt; Dalí·Joies, the jewels, on the same ticket"]]},
 "around:Púbol — Gala's castle": {"facts": [["Getting there", "About 1 hour 15 by road from Cadaqués via Figueres and the AP-7, then towards La Bisbal d'Empordà; Púbol is in the municipality of La Pera"], ["Time needed", "About 1 hour 30, with the garden"], ["Open", "Seasonal: in 2025, 10:30–17:15 Tuesday to Sunday from 9 September to 2 November, shorter hours after, closed 7 January to 28 February (2026 not confirmed, check)"], ["Cost", "€10 online, €12 in July and August, plus €2 at the desk (2025 official prices)"], ["Don't miss", "Gala's crypt and the elephants in the garden; the Dalí–Horst photography show runs to 6 January 2027 (Oct 2026)"]]},
 "around:elBulli1846, Cala Montjoi": {"facts": [["Getting there", "About 30 minutes from Cadaqués by road, via Roses and the narrow, winding road out to Cala Montjoi; car access to the cove is restricted from 15 July to 31 August (one listing), so check in high summer; parking €8.50"], ["Time needed", "About 2 hours 30"], ["Open", "Season 1 May to 12 October 2026, Tuesday to Saturday with exceptions, 10:00–15:00, last entry 12:00; closed now until the 2027 season"], ["Cost", "€27.50, reduced €20.50, guided visit €47.50, plus €2.50 at the desk; book at tickets.elbulli1846.com (Oct 2026)"], ["Don't miss", "The old kitchen, and the cove below it"]]},
 "around:Sant Pere de Rodes": {"facts": [["Getting there", "About 35 minutes by road from Cadaqués via El Port de la Selva and the climb to the car park; or on foot by the GR-92 stage (its own card)"], ["Time needed", "About 2 hours; add an hour for the climb to Sant Salvador de Verdera"], ["Open", "Tuesday to Sunday 10:00–17:00 from 1 October to 31 May (one listing says 17:30), longer in summer; closed non-holiday Mondays; free on the last Tuesday of the month from October to June"], ["Cost", "Adult price not found (Oct 2026): call 972 387 559"], ["Don't miss", "The church and its carved capitals"]]},
 "around:Empúries and L'Escala": {"facts": [["Getting there", "About 1 hour by road from Cadaqués via Roses and Castelló d'Empúries; the ruins are just north of L'Escala"], ["Time needed", "Half a day with L'Escala"], ["Open", "MAC-Empúries daily 10:00–18:00 from 1 October to mid-November (listings say 14 or 15 November); check after that"], ["Cost", "€7, reduced €5 (Oct 2026)"], ["Don't miss", "The Greek town and the Roman forum"], ["Eat", "Anchovies in L'Escala: the salters are on their own card in the larder"]]},
 # one closure date for the house at Portlligat (the foundation's calendar: 7 January to 10 February); prices live on the culture card only
 "avoid:Portlligat without a slot": {"facts": [["Touch it today", "Open now, and booking is still required; the prices are on the Casa-Museu card under Culture"], ["Instead", "Book a dated, timed ticket on salvador-dali.org days or weeks ahead and collect it 30 minutes before the hour; for a winter trip, check the 2027 closure dates first"]]},
}
VENUE_SET = {      # id -> {field: value} overrides, each one a correction from the 18 Oct re-check
}
LANE_STORY_SET = {  # lane -> {field: value}: the two venues cut after the re-check (Es Trull, Cafe Tropical) leave their lane stories
 "back": {"story": "Step one street back from the harbour and the prices drop and the view goes, but the fish is the same catch. La Sirena, on Carrer des Call, cooks scorpionfish with sauce and potatoes, suquet and zarzuela, and serves garoines, the local sea urchins, from January to March. Es Balconet, a small room on Carrer de Sant Antoni, is known for its paella, the black one with squid ink among them, and makes suquet when the boats allow. Neither has a sea view to charge for, and neither needs one.", "where": "La Sirena, Cadaqués; Es Balconet, Cadaqués"},
 "bars": {"story": "Cadaqués drank with painters long before it fed yachts. The Marítim has stood on the beach since 1935, turned ninety in 2025 and is listed as protected local heritage; its cremat, rum and coffee set alight at the table, is the fishermen's drink of the bay. L'Hostal, on the Passeig, was founded by Marci Pogany and is the bar Dalí favoured; listings date the logo he drew for it to 1975, and its walls still carry his memorabilia, though the nightclub years are over and it cooks full meals now.", "where": "Marítim Bar, Cadaqués; L'Hostal, Cadaqués"},
}
HOT_SET = {       # hot/event card name -> {field: value}
 # told once: the hot card on the anchovy feast only says it is over; the calendar card owns the 2026 programme
 "Festa de l'Anxova, L'Escala: over for 2026": {"teaser": "The anchovy town had its feast on 4 October; the salting houses stay open all year",
   "story": "Too late by two weeks: L'Escala held its 36th anchovy feast on Sunday 4 October, and the tapa route in its bars ended on the 11th. The calendar card has the programme, and the date to aim for next year. What has not closed is the reason for the feast. The two family salting houses of the town keep their shops open through the autumn, and a tin of hand-filleted anchovy, bought at the source, is the one souvenir of this coast worth carrying home.",
   "facts": [["When", "Over: Sun 4 Oct 2026"], ["Where", "L'Escala"], ["Cost", "Free when on"], ["Tip", "The salting houses sell all year: their card is in the larder"]]},
 # told once: the listening card owns the festival and its 2026 programme; the hot card only says there is nothing this autumn
 "No music festival this autumn": {"story": "In 2025 the village's music festival stretched from April to the end of December, and the old calendar promised autumn concerts in the church. Not this year: the 53rd edition kept to the summer, from 28 June to 21 August, and no autumn concerts were found in the published listings. Its card under Hi-fi & listening tells the festival. For this October and November there is no concert night to plan for; the next date in the village is the winter festa in mid-December."},
 "Festival Internacional de Música de Cadaqués": {"story": "The festival founded in Santa Maria in 1970 is the fixed point of the village's musical year, though its calendar moves: in 2025 it ran from April to late December, in 2026 from 28 June to 21 August. Its card under Hi-fi & listening has the church and the programme. For planning, assume the summer, look for the announcement in spring, and treat any shoulder-season concert as a bonus."},
}
HOT_DROP = ["Dalí's house on autumn hours"]   # told once: the Casa-Museu culture card and the Portlligat warning carry the hours and the booking

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
        if q and not TOK.search(q): c["maps_query"] = q + ", Girona, Spain"

def hot(H):
    for g in H["hot"]["groups"]: g["items"] = [it for it in g["items"] if it["name"] not in HOT_DROP]
    for g in H["hot"]["groups"] + H["events"]["groups"]:
        for it in g["items"]:
            it.update(HOT_SET.get(it["name"], {}))
            q = it.get("maps_query") or ""
            if q and not TOK.search(q): it["maps_query"] = q + ", Girona, Spain"

VENUE_DROP = {     # id -> fields removed
 # the old Compartir pin sat exactly on the guide's map centre (42.2887, 3.2766): a fallback, not a geocode. Unpinned; its Maps link stays.
 "v01-compartir-cadaques": ["lat", "lng"],
}

def venues(V):
    for i, d in VENUE_SET.items(): V[i]["set"].update(d)
    for i, d in VENUE_DROP.items(): V[i]["drop"] = sorted(set(V[i].get("drop", []) + d))

def lane_stories(L):
    for k, d in LANE_STORY_SET.items(): L.setdefault(k, {}).update(d)
