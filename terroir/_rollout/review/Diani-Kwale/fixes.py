"""Editor's hand fixes applied by make_inputs.py after the research/rewrite packs (11 Oct 2026).
Each one reconciles two packs that disagree, or carries a re-check into a card written before it."""

# venues carrying the dated hot board (hot_this_month): what is on now, from research/hot_events.json
HOTV = {
 "whale-shark-adventures": "Whale sharks possible from October, best odds January to March; the humpback trips ended 30 Sep (checked 11 Oct 2026).",
 "h2o-extreme": "No kite wind until mid-December: the school says itself there is nothing to teach in October and November (checked 11 Oct 2026).",
 "kite254": "The kusi has dropped: lessons wait for the kaskazi, from about mid-December (checked 11 Oct 2026).",
 "mwaepe-landing": "Spring tides around the full moons of Mon 26 Oct and Tue 24 Nov: the biggest octopus landings of each month.",
 "shimoni-landing": "Spring tides around 26 Oct and 24 Nov; the KPA fish port is still waiting for an operator (Feb 2026 report).",
 "diani-modern-market": "The first mangoes of the season arrive in November; the main crop runs December to March.",
 "kisite-mpunguti": "Calmer seas return with the kaskazi from November; the dolphins are year-round.",
}


def _fact(c, label, value=None, after=None):
    """set (or drop, value=None) one labelled fact, keeping order"""
    fs = [f for f in c["facts"] if f[0] != label]
    if value is not None:
        i = next((n + 1 for n, f in enumerate(fs) if f[0] == after), len(fs)) if after else len(fs)
        old = next((n for n, f in enumerate(c["facts"]) if f[0] == label), None)
        if old is not None and not after: i = min(old, len(fs))
        fs.insert(i, [label, value])
    c["facts"] = fs


def cards(C):
    C["b-funky"]["story"] = ("Come once the sun has gone and the beach bars wind down: this roadside courtyard has no sea view and needs none. "
                             "The ranking that put it on the map is told on its full card; here, order from the house list of Kenyan-ingredient classics.")
    _fact(C["b-41"], "When", "Late afternoon into sunset; from 11:00 daily to 22:00, to 23:00 on weekend nights (own site, Oct 2026; listings disagree: call)")
    C.pop("b-shakatak", None)  # Shakatak closed (11 Oct): its card goes
    # Kaya Kinondo: the fee as re-read on 11 Oct (verify_2), one figure set, still to agree before starting
    c = C["k-kinondo"]
    _fact(c, "Cost", "Non-resident KES 2,000 including the guide, citizen 500, resident 800 (2026 listing; older reports KES 1,000–2,000) — agree it before you start, M-Pesa preferred")
    _fact(c, "Open", "Daytime; departures around 10:00 and 15:00, last entry about 16:00. Reserve via WhatsApp +254 745 797 653")
    # Coral Spirit: the 'sold out' web store is gone; price as a range (own page vs resellers)
    c = C["d-kongo-dugout"]
    c["story"] = c["story"].replace(" The web store shows every trip as sold out; in practice you book by phone or WhatsApp a day ahead.", " Book by phone or WhatsApp a day ahead.")
    assert "sold out" not in c["story"]
    _fact(c, "Cost", "About USD 35 on its own page, USD 45–50 through resellers (Oct 2026): confirm direct")
    c["why"] = "Book it direct, a day ahead, and go in the last two hours of light on a rising tide."
    # the clubs: Shakatak closed (11 Oct); Manyatta trades under a new name and fills early by one dated account
    c = C["f-midnight"]
    c["name"] = "Nothing moves before eleven"
    c["teaser"] = "The beach kitchens stop by ten and the clubs fill late: eat first, then the sand, then out"
    c["story"] = ("Most of the beach kitchens here have stopped by ten, and the strip's late life starts after eleven, so the order of the night is the reverse "
                  "of what visitors try: eat properly by nine, drink on the sand until eleven, then go out. Do it the other way round and you end up hungry "
                  "after the kitchens have shut. The clubs themselves have thinned: Shakatak, the old disco, has closed, and the one we can still name, "
                  "Manyatta, is unverified this year, though one reviewer found it full by half past eight on a weekend.")
    c["why"] = "Confirm any club the same day through your driver: a thin paper trail is the warning, not a footnote."
    c["facts"] = [["Do", "Eat by 21:00, the sand until 23:00, then out"], ["Confirm", "Any club, the same day, through your driver"], ["Pay", "Cash; walk-in at most doors"]]
    c = C["b-manyatta"]
    c["name"] = "Manyatta"
    c["teaser"] = "Where Ukunda itself drinks and dances: a makuti bar and disco on the beach road, at Kenyan prices"
    c["story"] = ("The counterweight to the beach-bar circuit: an open-plan makuti bar and disco with DJs, nyama choma and a mostly Kenyan crowd, named in the "
                  "May 2024 press on the strip's nightlife revival, when new streetlights brought people back onto the beach road after dark. It now sells "
                  "itself as Manyatta Resort & Disco Lounge, with rooms upstairs. For a chef at ease in Kenyan bars it is the real thing; guests may be "
                  "happier on the sand. Shakatak, its old rival, has closed; Full Moon and Tandoori were also listed in 2024, with nothing verifiable since.")
    c["why"] = "Go with a local driver who knows the door, and buy by the bottle if you are a group."
    c["facts"] = [["Where", "Diani Beach Road, near Msitu Kwetu Cottages"], ["When", "Weekend nights; one reviewer found it busy by 20:30"],
                  ["Status", "Unverified in 2026: active social pages, but no dated 2026 post or review found"], ["Pay", "Cash, walk-in"]]
    c["maps_query"] = "Manyatta Resort Diani Beach Road"
    for k, v in C.items():
        blob = " ".join(str(x) for x in (v.get("story"), v.get("teaser"), v.get("why")))
        assert "Shakatak and" not in blob and "Tiki" not in blob, k


def hot(H):
    # the Diani Beach Festival has no edition dated since 2019: a calendar date it cannot keep is not printed
    for g in H["events"]["groups"]:
        g["items"] = [i for i in g["items"] if i["name"] != "The Diani Beach Festival"]


def venues(V):
    # told once: the fold card is the home of these places' story; the venue record keeps a different angle
    W = {
     "shimoni-caves": ("The caves sit a few steps from the Shimoni jetty, so most visitors see them in the last hour of the dhow day, tired and sunburnt; "
                       "come instead in the morning, before the boats return, and the guide has time. The site is run by a village committee with help from "
                       "the national museums, and the entry money pays for teachers and medicine in Shimoni. Bring small notes: the fee is not published, "
                       "and it is asked in cash at the gate."),
     "akamba-handicraft": ("This is a workplace, not a shop with a workshop attached: the sheds are open, the noise is real, and nobody stops working because you "
                           "walked in. The co-operative sits in industrial Changamwe, off the Port Reitz road toward the airport, which is why the sensible way "
                           "to see it is on the way to a flight. The store prices are fixed and fair, and a piece carries the carver's name if you ask."),
     "skippers-coliving": ("A plot off Airstrip Road with six en-suite rooms around a pool, built for people who must be online all day: the founders' rule is that "
                           "a video call should survive a Kwale power cut. Residents come for weeks, not days. For anyone else it is worth knowing for one "
                           "evening a week, Thursday, when the music night is where the strip's remote workers meet."),
     "pilli-pipa": ("The office is in Diani but the day starts in Shimoni, ninety minutes south by road, so the pickup is early and the return is late "
                    "afternoon. What you pay for is the logistics done properly: the boat, the park fees, the lunch on Wasini and the guides, folded into "
                    "one price. Book it days ahead in season, and on a day when the kusi chop is down."),
    }
    for k, w in W.items(): V[k]["set"]["why"] = w
    V["coral-spirit"]["set"]["caveat"] = "Book by phone or WhatsApp a day ahead and confirm the price direct (own page USD 35, resellers more, Oct 2026); after rains the river runs murky."
    V["mahamri-stalls"]["set"]["why"] = V["mahamri-stalls"]["set"]["why"].replace(" For the seated version of this breakfast, go to Coast Dishes.", " There is no seated version worth naming: go early and point.")
    V["kaaribu-tour"]["set"]["hook"] = "A ninety-minute walk through Ukunda's market lanes and street kitchens, ending with palm wine."
    V["kaaribu-tour"]["set"]["why"] = V["kaaribu-tour"]["set"]["why"].replace("goes into the Ibiza market cluster", "goes into Ukunda's trading lanes")
    V["kisite-mpunguti"]["set"]["tags"] = ["Non-resident USD 25 adult / 15 child (KWS schedule of Oct 2025, still current)",
                                           "Via operator (fees folded in) or KWSPay — cashless", "Oct–Mar seas"]
    V["kisite-mpunguti"]["corrections"].append("editor 11 Oct: the 'KES 1,000 dhow levy' is read differently by the two re-checks (dhow excursion vs parking); not printed")
