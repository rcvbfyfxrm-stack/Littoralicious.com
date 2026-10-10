#!/usr/bin/env python3
"""Apply the 8 Oct 2026 network pack (research/verify_5_network_2026-10-08.json, read from a normal network
on Arnaud's Mac) to the build inputs. Called at the end of make_inputs.py, so the pipeline stays
make_inputs.py -> build_gold6.py -> facts_tidy -> repetition audit -> apply_readings.py.
Edits cards.json, card_plan.json, hot_events.json and venues.json in place. Nothing here is re-verified:
every fact is the pack's, with its date. 10 Oct 2026."""
import json, pathlib
RV = pathlib.Path(__file__).resolve().parent
J = lambda n: json.load(open(RV / n))
PACK = json.load(open(RV / "research" / "verify_5_network_2026-10-08.json"))
D8 = "2026-10-08"
S_CAL = {"label": "Kendwa Rocks: Full Moon Party calendar 2026–2027 (PDF, seen 8 Oct 2026)",
         "url": "https://www.kendwarocks.com/media/pdfs/full_moon_party_calendars_2026_2027_zanzibar_compressed.pdf"}
S_USNO = {"label": "US Naval Observatory: moon phases 2026", "url": "https://aa.usno.navy.mil/api/moon/phases/year?year=2026"}


def run():
    CARDS, PLAN, HOT, VEN = J("cards.json"), J("card_plan.json"), J("hot_events.json"), J("venues.json")

    def setf(key, label, value, after=None):
        """set a labelled fact on a card (replace in place, or insert after `after`, or append)"""
        f = CARDS[key]["facts"]
        for row in f:
            if row[0] == label: row[1] = value; return
        i = next((n + 1 for n, r in enumerate(f) if r[0] == after), len(f))
        f.insert(i, [label, value])

    def dropf(key, label): CARDS[key]["facts"] = [r for r in CARDS[key]["facts"] if r[0] != label]

    def sub(key, field, old, new):
        assert old in CARDS[key][field], (key, field, old[:60]); CARDS[key][field] = CARDS[key][field].replace(old, new)

    # ── the Full Moon Party: the venue's 2026 calendar (24 Oct, 21 Nov) disproves "first Saturday after" ──
    c = CARDS["m-when"]
    c["teaser"] = "Not on the full moon itself: on the Saturday nearest it, which can fall before the moon as well as after"
    c["story"] = ("The party runs on a Saturday, not on the full moon itself: the Saturday nearest it, as the venue's own published calendar shows. "
                  "In 2026 that put October's on the 24th, two days before the moon, and November's on the 21st, three days before. "
                  "That catches more visitors than anything else on this beach: people book a week around the lunar date and miss it, "
                  "or book what they think is a quiet week and land in the middle of it. It starts at sunset and the buffet opens around seven; "
                  "the music runs late. Take the date from the calendar, not from the moon; the coming months are on the hot board.")
    setf("m-when", "When", "The Saturday nearest each full moon, on the venue's published calendar (seen 8 Oct 2026); from sunset, buffet around 19:00")
    setf("m-when", "Tip", "Take the date from the venue's calendar; VIP bookings +255 733 342 312 (on the calendar)")
    c["sources"] = c.get("sources", []) + [S_CAL]
    sub("m-dont", "story", "pick a week that does not straddle the Saturday after a full moon", "pick a week clear of the party Saturday on the venue's calendar")
    setf("m-dont", "Do", "Choose dates clear of the party Saturday on the venue's calendar")
    for g in HOT["hot"]["groups"]:
        for it in g["items"]:
            if it["name"] != "Two full moons, two party Saturdays": continue
            it["teaser"] = "Parties on Sat 24 Oct and Sat 21 Nov, on the venue's own calendar; the full moons follow on the 26th and the 24th"
            it["story"] = ("Kendwa Rocks' own 2026 calendar puts the next two Full Moon Parties on Saturday 24 October and Saturday 21 November. "
                           "The moons come after them: 04:12 UTC on 26 October, 07:12 East Africa Time on the Monday, and 14:53 UTC on 24 November, "
                           "17:53 EAT on the Tuesday, a supermoon. So the party is the Saturday nearest the full moon, not the one after it. "
                           "After November the same calendar lists Friday 25 December for Christmas and 31 December for New Year's Eve. "
                           "Check it again before you book a room.")
            it["facts"] = [["When", "Parties Sat 24 Oct and Sat 21 Nov (venue calendar, seen 8 Oct 2026); full moon Mon 26 Oct 07:12 EAT, Tue 24 Nov 17:53 EAT"],
                           ["Where", "Kendwa Rocks, Kendwa beach"]] + [f for f in it["facts"] if f[0] in ("Cost", "Tip")]
            it["sources"] = [S_CAL, {"label": "Kendwa Rocks: Full Moon Party (venue page)", "url": "https://www.kendwarocks.com/full-moon-party"}, S_USNO] + \
                            [s for s in it["sources"] if "kendwarocks.com" not in s["url"] and "almanac.com/astronomy" not in s["url"]]
    HOT["hot"]["pointer_line"] = HOT["hot"]["pointer_line"].replace(
        "(party Saturdays 31 Oct and 28 Nov by the venue's rule)", "(party Saturdays 24 Oct and 21 Nov on the venue's calendar)")
    assert "24 Oct and 21 Nov" in HOT["hot"]["pointer_line"]
    HOT["hot"]["checked_moon"] = D8

    # ── cut: Cholo's (permanently closed) and Bistro' del M@r (closed, probable) ─────────────────
    PLAN["bars"]["groups"][1]["cards"] = [x for x in PLAN["bars"]["groups"][1]["cards"] if x["key"] != "b-cholos"]
    CARDS.pop("b-cholos", None)
    for k, c in CARDS.items():
        for fld in ("story", "teaser"):
            if "Cholo's and Langi Langi are two of its names" in (c.get(fld) or ""):
                c[fld] = c[fld].replace("Cholo's and Langi Langi are two of its names", "Langi Langi and Maisha Beach are two of its names")
    assert not any("Cholo" in json.dumps(c) for c in CARDS.values())

    # ── Langi Langi: the name "Marhaba" is unconfirmed — not printed ──────────────────────────
    c = CARDS["g-langi"]
    c["name"] = "Langi Langi, the water terrace"
    c["story"] = ("Langi Langi's restaurant terrace sits right by the water and nobody uses it between breakfast and sunset, "
                  "which is exactly when you should: something cold, the channel in front of you, the strip asleep. From about half past five it fills for the sun.")
    c["facts"] = [["Order", "Coffee or something cold"], ["When", "After the breakfast buffet (07:00–10:00) until about 17:30"],
                  ["Book", "Only for a sunset table: +255 773 911 000"], ["Price", "Mid"]]

    # ── bars and rooms to linger, from the pack's hours ────────────────────────────────────────
    setf("b-kendwa-rocks", "When", "Sunset; restaurant 11:00–23:00, Saturday to midnight (Oct 2026); the club Tue, Thu and Sat from 22:00 (Aug 2026)")
    c = CARDS["b-sunset-kendwa"]
    c["story"] = ("The beachfront Mnazi Bar of the Sunset Kendwa hotel, a short walk up the sand from Kendwa Rocks, "
                  "and the sane answer on a night the neighbours are at full tilt. Order simply.")
    setf("b-sunset-kendwa", "When", "Sunset; no hours published; listings say the hotel closes 24 Dec to 10 Jan")
    setf("b-maisha", "When", "Sunset into dinner; daily 08:00–23:30 (Oct 2026)")
    c = CARDS["b-z-rooftop"]
    c["name"] = "Rooftops at The Z"
    c["story"] = ("The roof bar of The Z Hotel, facing west over the channel; adults only, sixteen and over. It takes no reservations "
                  "and fills before the sun goes: arrive early or stand. On Wednesdays and Saturdays a DJ plays the sunset.")
    c["facts"] = [["Order", "A happy-hour cocktail"], ["When", "Happy hour 17:00–20:00; sunset DJ Wed and Sat 17:00–20:00; food 12:00–21:45 (Oct 2026)"],
                  ["Book", "No reservations: arrive early"], ["Price", "US$15 minimum spend per non-resident; 2% on cards (reviews, 2026)"]]
    setf("g-mama-mia", "When", "Late morning to mid-afternoon; the bar opens 10:30, the kitchen at noon (own site, Oct 2026)")

    # ── the late tables: CHE Rock and Highland are in Nungwi; hours only where a source gives them ──
    c = CARDS["f-che-rock"]
    c["name"] = "CHE Rock, to midnight"
    c["teaser"] = "Open from late afternoon to midnight, which up here counts as late, and the strip's own staff eat at the next table"
    c["story"] = ("Behind the main Nungwi beach, by Pasha Hotel on Nungwi Beach Street, CHE Rock serves tacos, burgers and pub plates "
                  "from late afternoon to midnight. That alone would make it useful on this coast. What makes it reliable is who is eating: "
                  "this is where the strip's own bar and dive staff come on their night off, so the kitchen stays honest right up to the bell. "
                  "Come off a late dive or a long sunset, sit down with a burger and a cocktail, among the people who work the strip.")
    c["why"] = "The one kitchen on the cape still cooking after the others have stopped; call before you count on the last hour."
    setf("f-che-rock", "When", "16:30–00:00 (TripAdvisor, seen 8 Oct 2026); call ahead for the last hour")
    setf("f-che-rock", "Where", "Nungwi Beach Street, behind the main beach at Pasha Hotel")
    c = CARDS["f-highland"]
    c["teaser"] = "Pool tables, the football on, chapati wraps, and a light still on inland when the beach has gone dark"
    c["story"] = ("When the beach bars have stacked their chairs, this is where Nungwi carries on. Highland is a guest house inland on Baobab Way "
                  "with a local bar: pool tables, the football on the screen, cheap drinks and a kitchen that does chapati wraps and stir-fried noodles. "
                  "It is not good food and does not pretend to be. It is good company, at about a third of the beach price, "
                  "and the room is not arranged for visitors, which is the point of it.")
    setf("f-highland", "When", "Evenings; no bar hours are published: ask at the guest house")
    setf("f-highland", "Where", "Baobab Way, inland in Nungwi", after="Price")
    setf("f-highland", "Know", "Recent guests mention building work next door (2026)", after="Where")

    # ── crafts and the sea, from the pack's own-site reads ──────────────────────────────────────
    setf("k-course", "Time", "1 to 12 weeks, all year; at least two hours of private lessons Monday to Friday; the rest bends to the yard's work")
    setf("k-course", "Cost", "From €350 the first week (€300 each for two or more), €220 each extra week; a room in Nungwi €110 a week; €100 deposit (World Unite, seen 8 Oct 2026)")
    sub("k-course", "story", "He gives two hours of instruction a day, in English,", "He gives at least two hours of private instruction each weekday, in English,")
    setf("k-kuza", "Cost", "US$30 (own site, Oct 2026)", after="Time")
    setf("k-mwani", "Time", "A 90-minute tour, plus about 1 h 30 each way")
    setf("k-mwani", "Cost", "US$15 a head, bookable on its own site (Oct 2026)", after="Time")
    setf("r-turtles", "Baraka charges", "About US$10 a head (a January 2026 review); daily 08:00–18:00 (Oct 2026)")
    setf("r-turtles", "Ratings", "3.2 of 5 on TripAdvisor over 196 reviews, 60 of them 'Terrible', with repeated welfare complaints (seen 8 Oct 2026)", after="Baraka charges")
    sub("r-turtles", "story", "Baraka Natural Aquarium is the one you will be offered most.",
        "Baraka Natural Aquarium, which now calls itself an aquarium and zoo, is the one you will be offered most.")

    json.dump(CARDS, open(RV / "cards.json", "w"), ensure_ascii=False, indent=1)
    json.dump(PLAN, open(RV / "card_plan.json", "w"), ensure_ascii=False, indent=1)
    json.dump(HOT, open(RV / "hot_events.json", "w"), ensure_ascii=False, indent=1)

    # ── venues: status and date from the pack, then the fields it corrects ─────────────────────
    for vid in ("cholos", "bistro-del-mar"): VEN.pop(vid, None)
    for vid, p in PACK["venues"].items():
        if vid not in VEN: continue
        s = VEN[vid]["set"]
        if p["status"] == "confirmed": s.update(status="confirmed", statusChecked=D8)
        else: s.update(status="unverified", statusChecked="")
    for vid in ("che-rock", "highland", "zanzibar-watersports"):
        VEN[vid]["set"].update(status="confirmed", statusChecked=D8)
    FIX = {
     "sexy-fish": {"hours": "Daily 12:00–15:00 and 18:30–22:30; last food orders 21:45 (own page, Oct 2026)",
                   "caveat": "Book: the sunset tables go well ahead in high season. Last food orders 21:45. Closed for the long rains, 1 April to 31 May in 2026. Some reviewers find the service slow: order early."},
     "maisha-beach": {"hours": "Daily 08:00–23:30 (Oct 2026); music nights vary — low season and Ramadan can alter or cancel them",
                      "caveat": "During low season and Ramadan the events can be altered or cancelled (its own site): ask before you plan a night around one."},
     "langi-langi": {"hours": "Breakfast (buffet 07:00–10:00) through dinner",
                     "tags": ["Beach bungalows", "At the water's edge", "Traditional Zanzibari dinner"],
                     "dishes": [{"name": "Traditional Zanzibari dinner"}, {"name": "Seafood"}, {"name": "The breakfast buffet, 07:00–10:00"}],
                     "signature": "A seafood dinner on the water's-edge terrace as the sun goes into the channel"},
     "essque-zalu": {"web": "https://www.essquehotels.com/", "phone": "+255 778 683 960",
                     "caveat": "The east side loses the sunset — a lunch and moonlight address. The Jetty closes Monday to Wednesday in low season (from 16 March 2026, until further notice): call ahead."},
     "passion-thyme": {"hours": "Daily 09:00–21:00 (Oct 2026)", "phone": "+255 679 739 691"},
     "mahi-mahi": {"hours": "About 07:30–23:00 daily (listings differ by half an hour, Oct 2026)", "web": "https://mahi-mahi.thebriteweb.com/"},
     "fisherman-local": {"name": "Fisherman Local Restaurant", "hours": "Not printed: listings conflict — call ahead",
                         "neighborhood": "Kendwa · on the road behind Eden Villa, off the beach",
                         "caveat": "Cash, no view, and the kitchen runs out. Listings disagree on the hours: call +255 777 871 130 before you walk over."},
     "sunset-kendwa": {"hours": "No hours published; the Sunset Restaurant and the Mnazi Bar on the beachfront", "web": "https://sunsetkendwa.com/"},
     "yasa": {"hours": "Daily 07:00–23:00 (Oct 2026)"},
     "combo-1990": {"hours": "Lunch and dinner to 23:00; Monday opening unconfirmed (Oct 2026)", "phone": "+255 769 720 873",
                    "caveat": "Cash. No alcohol — a village kitchen in a Muslim village. Dress covered walking here. Sources disagree on Mondays: call before you go."},
     "machnoo": {"hours": "Closes 22:30; listings disagree on the opening hour (Oct 2026)", "phone": "+255 776 007 954"},
     "mama-mia-nungwi": {"hours": "Daily: bar 10:30–00:00, kitchen 12:00–22:30, DJ 16:00–19:30 (own site, Oct 2026)"},
     "hanoi-house": {"hours": "Daily 11:00–23:00 (Oct 2026)",
                     "caveat": "A franchise of the Paje café (opened 2021): judge it on the broth, which holds up. Pork is on the menu. 2026 reviews mention power cuts."},
     "jf-kili": {"hours": "07:30–21:00 (its own listing; one guide says from 08:00)",
                 "caveat": "Cash only. Two locations: the café on the main road opposite Hanoi House, and the coffee truck at the big square."},
     "baraka-beach-rest": {"hours": "Daily 07:30–22:30 (Oct 2026)"},
     "makofi": {"web": "https://makofizanzibar.com/", "hours": "Pizza Gourmet by Makofi daily 12:00–22:00; a BBQ night once or twice a week (Oct 2026)",
                "caveat": "The BBQ night has no fixed weekly day: ask which night when you arrive, and book before 13:00 that day, through its Facebook or Instagram or in person.",
                "tags": ["BBQ night", "Roman pizza", "Guest house"]},
     "z-rooftop": {"name": "Rooftops at The Z Hotel", "hours": "Food 12:00–21:45 · happy hour 17:00–20:00 · sunset DJ Wed and Sat 17:00–20:00 (Oct 2026)",
                   "caveat": "⚠ Adults only (16+). US$15 per person minimum for non-residents at sunset, and a 2% fee on cards (reviews, 2026). No reservations: arrive well before sunset or you will be standing."},
     "kendwa-rocks": {"hours": "Restaurant 11:00–23:00, Sat to 00:00 (Oct 2026) · The Rocks Lounge Club Tue, Thu, Sat from 22:00",
                      "signature": "The Full Moon Party — the Saturday nearest each full moon, on the venue's published calendar"},
     "kuza-cave": {"hours": "Daily 08:30–18:30; the cooking class US$30 (own site, Oct 2026)"},
     "mwani-zanzibar": {"hours": "Tours of 90 minutes, US$15, bookable on its own site (Oct 2026)"},
     "spanish-dancer": {"hours": "Daily 08:00–18:00 (own site, Oct 2026)"},
     "baraka-aquarium": {"name": "Baraka Natural Aquarium & Zoo",
                         "caveat": "⚠ Animal-welfare complaints are substantial and repeated: TripAdvisor rates it 3.2 of 5 over 196 reviews, 60 of them 'Terrible' (seen 8 Oct 2026). Read them before you buy a ticket; see turtles wild at Mnemba."},
     "dhow-course": {"hours": "1 to 12 weeks, all year; at least two hours of private lessons Mon–Fri, then the yard's own working day"},
     "che-rock": {"hours": "16:30–00:00 (TripAdvisor, seen 8 Oct 2026); call ahead for the last hour",
                  "neighborhood": "Nungwi · Nungwi Beach Street, behind the main beach at Pasha Hotel",
                  "address": "Nungwi Beach Street, behind the main beach at Pasha Hotel, Nungwi, Kaskazini A",
                  "caveat": "Hours from one listing only: call ahead before you count on a plate at midnight."},
     "highland": {"hours": "No bar hours published (Oct 2026): ask at the guest house", "neighborhood": "Nungwi · inland on Baobab Way",
                  "address": "Baobab Way, Nungwi, Kaskazini A",
                  "caveat": "A guest house with a pool as well as a bar; basic. Recent guests mention building work next door (2026). Inland and unlit — walk back with someone."},
     "zanzibar-watersports": {"name": "Zanzibar Watersports, Kendwa",
                              "neighborhood": "Kendwa · dive centre on the Kendwa main road; beach office next to Gold Resort",
                              "address": "Kendwa Main Road, Kendwa, Kaskazini A"},
    }
    FIX["makofi"].update(hook="A Nungwi guest house with a BBQ buffet and fire show once or twice a week, and crisp Roman pizza the other nights.",
                         signature="The BBQ night, booked before 13:00 on the day",
                         why=VEN["makofi"]["set"]["why"].replace("Once a week it lays on", "Once or twice a week it lays on"))
    assert "Once or twice a week" in FIX["makofi"]["why"]
    FIX["kendwa-rocks"].update(best_time="Sunset any night · the party Saturday, nearest the full moon, for the event (venue calendar)",
                               signal_chip={"label": "Since 1996", "full": "Full Moon Party running since 1996 by the venue's own account; monthly, on the Saturday nearest the full moon (its 2026 calendar)",
                                            "cosign": "Venue's own site and 2026 calendar, checked 8 Oct 2026"})
    FIX["langi-langi"].update(hook="Langi Langi's restaurant, a covered terrace at the water's edge on Nungwi's west beach.",
                              why=("Langi Langi is a 32-unit beach hotel on Nungwi's west-facing beach, and its restaurant is a covered open-air room at the water's edge. "
                                   "Reviewers mention an owner known as Rasta who helps in the kitchen. Beyond the seafood and international dishes, the house is known for "
                                   "a Traditional Zanzibari Dinner, and breakfast is a buffet from seven to ten. Sunset tables face straight out over the channel."))
    for vid, f in FIX.items(): VEN[vid]["set"].update(f)
    VEN["kendwa-rocks"]["hot"] = "Full Moon Parties on Sat 24 Oct and Sat 21 Nov, on the venue's 2026 calendar (seen 8 Oct); the full moons follow on 26 Oct and 24 Nov."
    SRC = {"kendwa-rocks": [S_CAL], "sexy-fish": [{"label": "The Z Hotel: Sexy Fish (hours, seen 8 Oct 2026)", "url": "https://www.thezhotel.com/facilities/restaurants/sexy-fish"}],
           "essque-zalu": [{"label": "Essque Hotels (seen 8 Oct 2026)", "url": "https://www.essquehotels.com/"}],
           "makofi": [{"label": "Makofi Zanzibar (seen 8 Oct 2026)", "url": "https://makofizanzibar.com/"}],
           "mahi-mahi": [{"label": "Mahi Mahi Beach Bar & Restaurant (seen 8 Oct 2026)", "url": "https://mahi-mahi.thebriteweb.com/"}],
           "sunset-kendwa": [{"label": "Sunset Kendwa (seen 8 Oct 2026)", "url": "https://sunsetkendwa.com/"}],
           "zanzibar-watersports": [{"label": "Zanzibar Watersports: about us (seen 8 Oct 2026)", "url": "https://zanzibarwatersports.com/about-us/"}],
           "maisha-beach": [{"label": "Maisha Nungwi: restaurant (seen 8 Oct 2026)", "url": "https://www.maishanungwi.com/restaurant"}]}
    for vid, ss in SRC.items(): VEN[vid]["sources"] = VEN[vid].get("sources", []) + ss
    json.dump(VEN, open(RV / "venues.json", "w"), ensure_ascii=False, indent=1)
    from collections import Counter
    print("network pack 8 Oct applied:", len(VEN), "venues", Counter((x["set"]["status"], x["set"]["statusChecked"]) for x in VEN.values()))


if __name__ == "__main__":
    run()
