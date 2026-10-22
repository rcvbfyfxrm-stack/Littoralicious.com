# Dubrovnik-Dalmatie → GOLD6 (the Prague standard) · nightly run 22 Oct 2026 · status NEEDS-NETWORK (everything else done)

Route B, the Cavalaire/Var pipeline: the reading layer is assembled on the LIVE Siracusa-Sicilia chrome (itself cloned from live Prague),
from the old Dubrovnik guide's own data and research. The old page was a **GOLD1-era tier inventory** (publish-terroir.py): 18 venue
records in three flat tiers, no lanes, no dishes, no `terroir/data/` copy, 74 tcards in 14 folds (the walls, St Blaise Day, the Summer
Festival and the oysters each told two to four times) and **empty** follow and seasonal folds (12 month rows, no cells). This pass brings
the GOLD3/4/5 floor too: 7 table lanes in three groups, each opening on a food story; `dishes[]` on every table; the guest list with
charters; the `#eat` jump line and **La liste** (14 items, The Dish inside it, one-tap `.ics`) at the foot; the dated hot board with its
`#why-now` pointer; the calendar; the filled month table; craft; the listening room; the swims; Autour; the food-history fold (#bougie,
the salt of Ston); three gem popups; the `terroir/data/` copy and the 24-column CSV. The hub card already had `csv:true`; the hub builder
was not run and the hub is untouched. The locked kit `terroir/_assets/guide/*` is untouched. Rebuild, repeatably:

    python3 terroir/_rollout/review/Dubrovnik-Dalmatie/extract_old.py           # research/cards_old.json + guide_text_old.txt
    python3 terroir/_rollout/review/Dubrovnik-Dalmatie/make_plan.py             # picks.json + card_plan.json (the cut, as data; berths/guest list from picks_lists.json)
    python3 terroir/_rollout/review/Dubrovnik-Dalmatie/make_research_inputs.py  # the agents' inputs (research/*_input.json)
    python3 terroir/_rollout/review/Dubrovnik-Dalmatie/make_inputs.py           # research/ + fixes.py -> cards.json, venues.json, lane_stories.json, hot_events.json
    python3 terroir/_rollout/review/Dubrovnik-Dalmatie/build_gold6.py           # reads the old guide + chrome from origin/rebuild/publishing-system
    python3 terroir/_rollout/lib/gold6/facts_tidy.py terroir/Dubrovnik-Dalmatie/index.html
    python3 terroir/_rollout/review/Dubrovnik-Dalmatie/repetition_audit.py
    python3 terroir/_rollout/review/Dubrovnik-Dalmatie/gate_config.py
    python3 terroir/_rollout/lib/gold6/readings/apply_readings.py terroir/Dubrovnik-Dalmatie terroir/_rollout/review/Dubrovnik-Dalmatie/Dubrovnik-Dalmatie.readings.json --check-config terroir/_rollout/lib/guides/Dubrovnik-Dalmatie.check.json

Hand prose: `prose.py` (hero, etymon, lead, essay, fold heads, lane leads, doors, guest-list lines, The Dish, gems, glossary) and
`liste.py` (La liste); the editor's reconciliations on the research packs, each stated, are in `fixes.py`. Render and probes use the
test-only `pw-shim.cjs` (`NODE_OPTIONS=--require …/pw-shim.cjs`, leaflet@1.9.4 from the npm registry in `lf/`, git-ignored, via
`npm pack leaflet@1.9.4`), because unpkg.com is blocked in the sandbox; the gate's render needs `/usr/bin/chromium` → the Playwright
Chromium. `card_shots.cjs` takes the two card screenshots.

## Numbers
**Places 18 → 18**, all in lanes: 7 lanes (grande: the grand tables 3 · petite: the old houses 3, under the bell 2, Mali Ston 2, where the
city eats 2, the glass 3 · street: market, sandwich, octopus 3), none over 3, **no 4s**. Cut 2 (reasons in `picks.json`): **Glam Café
(Beer Therapy)** (a late craft-beer bar, nothing particular to this coast) and **Konoba Atlantic Kitchen** (cut on the re-check: one
listing marks it closed, another updated June 2026 gives daily hours; its old dishes and award could not be found). Added 2, built only
from the old guide's own cards, no coordinates invented: **Taj Mahal** (the Bosnian grill; it turned out to hold a MICHELIN Bib Gourmand)
and **Barba** (the octopus burger).
**Fold cards: 74 old tcards → 65 written** in 13 folds + 11 hot-board + 9 calendar = **85 `.fcard`, 85 with labelled facts**; 35 groups,
none over 3. Merged as told once: the walls (culture + walk), St Blaise and the Summer Festival (culture + events → calendar), the three
'where the money sits' cards (= the three grand tables), the oysters (dish/market/producer/avoid → the lane, the quay card, The Dish).
Cut for the cap: Maraschino and Maraska (Zadar), Doris Dragović, Mlinar, the Rixos lobby, Mirakul Burger. Dropped on the re-check:
**Mara's Bar** and the **Asia Shop** (no trace in any listing), **Dežo Art / 'Lela'** (not found). New: 5 quarter cards, 2 curiosities,
5 swim cards, the cruise-day warning, 4 craft cards (AR Atelier in Gruda — Konavle silk and embroidery — the one to do), the honest
'no hi-fi bar' card, the live klapa card, Trsteno and Mljet, 5 follow cards.
**Guest list, rebuilt from venues kept (22 Oct):** last minute Proto (open all year) · Taj Mahal (no seasonal break listed); this week
Stara Loža (most of the year) · Bota Šare (listed all year); grand night Restaurant 360 · Nautika (both seasonal, at or past the end of
the 2026 season — said on the list). **Berths:** Stara Loža · Proto · Buffet Škola (one per group, each confirmed for 2026 and year-round).
§8: One Night in 6 quarters (Old Town east · Prijeko and Ploče Gate · Pile · Ploče, Banje and Hvarska · Bosanka by taxi · Mali Ston by car),
The Getaway Weekend in 11 stops (Friday the Old Town at dusk and Stara Loža's roof; Saturday the walls at opening, Buffet Škola, the
Rector's Palace, Proto, the peka at Konoba Dubrava; Sunday Gruž market, the walls of Ston, Bota Šare's oysters, Grgić Vina).

## What the 22 Oct re-check corrected
- **Venues:** Restaurant 360 one MICHELIN star 2026, G&M 18/20; Stara Loža in the 2026 selection (no star; hotel shut 2 Jan–28 Feb 2026);
  Nautika G&M 16.5/20; Proto G&M 14.5/20, open all year; Kopun Falstaff 86 — the old 'Michelin Plate' is not in the 2026 results; Konavoski
  Dvori's MICHELIN claim unconfirmed; D'vino's 'ten Michelin editions' unfound and dropped; Lady Pi-Pi seasonal April–mid-October, closed now,
  its address a dispute; Taj Mahal Bib Gourmand, Nikole Gučetića 2; Barba's dishes corrected (no fish taco / cod croquettes found; opened
  2023 per Petit Futé, a dispute); Miloš is Vinarija Miloš (Stagnum its wine); Grgić and Miloš postcodes; Konoba Dubrava's phone a dispute;
  **ACI Marina is at Komolac, not in Gruž** (the old '8 minutes from ACI' is gone). 6 of 18 venues stay `unverified` (Konoba Dubrava,
  Konavoski Dvori, Vila Koruna, Pizzeria Tabasco, Gruž Market, Barba): each card says call.
- **Cards:** Plavac Mali × Zinfandel — Crljenak = Zinfandel shown in 2001, parentage published 2004 (not 'proven 1998'), Grgich's cuttings
  dropped; the Dingač tunnel opened 1975 (not 1973); Prošek — no final EU decision found (not 'partially lost 2022'); Grk's hectares a
  dispute; the Gundulić statue is by Ivan Rendić (1893), not Frangeš-Mihanović; Gundulić stalls fold about midday; walls one ticket with
  Lovrijenac, price differs by listing; the Franciscan pharmacy at Placa 2, 'oldest in Europe' a dispute; Konzum is inside the walls;
  the Ston walls' length and dates a dispute; 'Non bene pro toto…' is over Lovrijenac, not in the Sponza; the jugo 'law' is folklore
  (a dispute); Lazareti's date a dispute (1377 law, 1627 completion, c.1590–1642); Linđo 2026 Tue/Fri 21:30 (not Mon/Tue/Sat) and not on the
  UNESCO list; no weekly church klapa found — the free summer street programme instead; Oliver Dragojević born in Split, raised in Vela Luka;
  Gibonni 37 Porins (2021), not 43; Klapa Cambi from Kaštel Kambelovac; Cogito is in the Old Town (Stajeva 5), not Gruž; the cruise cap is
  two ships a day (the old '3+ ships / 8–10,000' is gone); the Good Food Festival 2026 was 5–18 Oct; the Omiš festival is late June–July;
  the 'Drniš caves' pršut line and the '4,000 years' of Ston salt dropped; the salt's share of the Republic's income kept as a dispute;
  the Hamlet count dropped (2026 programme not confirmed).

## Why NEEDS-NETWORK (exactly what remains — every one needs a normal network)
1. `python3 terroir/_rollout/lib/checklinks.py . Dubrovnik-Dalmatie` — the proxy refuses every external host here.
2. Own-site / MICHELIN pages for the guest list and berths: 360dubrovnik.com (2026 closing, 2027 reopening), nautikarestaurants.com (season
   end), prijekopalace.com (winter 2026–27 closure), esculaprestaurants.com (Proto winter hours: daily 11–22 vs Mon–Sat 16–23),
   guide.michelin.com Croatia 2026 pages (Proto, Kopun, Konavoski Dvori, Bota Šare, Vila Koruna, Taj Mahal's Bib).
3. The 6 unverified places: Konoba Dubrava (phone, winter), Konavoski Dvori, Vila Koruna, Pizzeria Tabasco, Gruž Market hours, Barba —
   confirm or cut. Also D'vino's season end, Grgić's November–December hours, Lady Pi-Pi's address.
4. The rest of `research/verify_1.json` + `verify_2.json` `_needs_network` (21 lines) and `research/hot_events.json` (11 lines: the walls'
   official winter hours and price, Lokrum's last boat, Jadrolinija's winter times, the November ship calls, the Winter Festival dates).
Commit the results as `research/verify_*_network_*.json`; the next run applies them through `fixes.py`, rebuilds, re-applies §8
(apply_readings refuses to run twice: rebuild first), flips to review.
