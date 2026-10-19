# Costa Brava · Empordà (Costa-Brava-Catalunya) → GOLD6 (the Prague standard) · nightly run 19 Oct 2026 · status NEEDS-NETWORK (everything else done)

Route B, the Cadaqués/Var pipeline: the reading layer is assembled on the LIVE Siracusa-Sicilia chrome (itself cloned from live Prague),
from the old Costa Brava guide's own data and research. The old page was a **GOLD2 tier inventory**: 16 venue records in flat tiers, a
"Three Tables" block, a 24-hours plan and a five-tier prose fold naming the same houses again and again, venue `why` fields pasted together
with their "To order" lines, no lanes, no dishes, no CSV. This pass brings the GOLD3/4/5 floor too: 5 table lanes in three groups, each
opening on a food story; `dishes[]` on every table; the guest list with charters; the `#eat` jump line and **La liste** (15 items, The Dish
inside it, one-tap `.ics`) at the foot; the dated hot board with its `#why-now` pointer; the calendar; craft; the listening room; rooms to
linger; Autour; three gem popups; a new food-history fold (elBulli and the Rocas); the 24-column CSV. The locked kit
`terroir/_assets/guide/*` is untouched. Rebuild, repeatably:

    python3 terroir/_rollout/review/Costa-Brava-Catalunya/extract_old.py           # research/cards_old.json
    python3 terroir/_rollout/review/Costa-Brava-Catalunya/make_plan.py             # picks.json + card_plan.json (the cut, as data)
    python3 terroir/_rollout/review/Costa-Brava-Catalunya/make_research_inputs.py  # the agents' inputs (research/*_input.json)
    python3 terroir/_rollout/review/Costa-Brava-Catalunya/make_inputs.py           # research/ + fixes.py -> cards.json, venues.json, lane_stories.json, hot_events.json
    python3 terroir/_rollout/review/Costa-Brava-Catalunya/build_gold6.py           # reads the old guide + chrome from origin/rebuild/publishing-system
    python3 terroir/_rollout/lib/gold6/facts_tidy.py terroir/Costa-Brava-Catalunya/index.html
    python3 terroir/_rollout/review/Costa-Brava-Catalunya/repetition_audit.py
    python3 terroir/_rollout/review/Costa-Brava-Catalunya/gate_config.py
    python3 terroir/_rollout/lib/gold6/readings/apply_readings.py terroir/Costa-Brava-Catalunya terroir/_rollout/review/Costa-Brava-Catalunya/Costa-Brava-Catalunya.readings.json --check-config terroir/_rollout/lib/guides/Costa-Brava-Catalunya.check.json

Hand prose: `prose.py` (hero, the Empordà etymon, lead, essay, the food-history fold, fold heads, lane leads, doors, guest-list lines, gems,
glossary, The Dish, photos) and `liste.py` (La liste); the editor's reconciliations on the research packs, each stated, are in `fixes.py`.
Render and probes use the test-only `pw-shim.cjs` (`NODE_OPTIONS=--require …/pw-shim.cjs`, leaflet@1.9.4 from the npm registry in `lf/`
via `npm pack leaflet@1.9.4`), because unpkg.com is blocked in the sandbox; the gate's render needs `/usr/bin/chromium` (a symlink to
`/opt/pw-browsers/chromium` in the sandbox).

## Numbers
**Places 16 records → 14**, all in lanes: 5 lanes (grande: the starred line 3 · petite: the port 3, the cove/village/cape 3 · street: the
market/auction/salt 3, Le Bar 2), none over 3, **no 4s**. Cut 2 (reasons in `picks.json`): **Restaurant Massana** (the starred lane holds
three; a Girona city table, the sister Girona guide's ground) and **La Tabarra** (the old record called it a DO Empordà wine bar with a
terrace; every listing found describes a rock-and-roll tapas and cocktail bar, nothing dated 2026, no source for the list or the terrace).
**Fold cards: 78 old cards and list items (+7 dish articles) → 64 written** in 12 folds + 11 hot-board + 9 calendar = **84 `.fcard`, 84 with
labelled facts**; 35 groups, none over 3. New: 6 curiosities, 4 craft cards, the honest "no hi-fi bar" card, 2 after-dinner drinks, Púbol,
Olot and the Garrotxa, the urchin warning, 4 pointer cards. Dropped as told once (reasons in `picks.json`): the market/auction/anchovy
duplicates of the venues, the Can Roca cellar card, the Mas Estela/Martín Faixó drink cards, the Cadaqués walk and seafront (its own guide),
the unnamed ethnic grocers, the empty burger note, the follow card for a blog that could not be found.
**Guest list, rebuilt from venues kept, every one confirmed trading in 2026 (19 Oct):** last minute Cal Tet · La Gamba · Rafa's; this week
Casamar · Compartir Cadaqués; grand night El Celler de Can Roca · Bo.TiC · Els Tinars. **Berths:** El Celler de Can Roca · La Gamba · Anxoves Solés.
§8: One Night in 5 towns (Palamós · Calella and Llafranc · Roses · Girona · L'Escala and Sant Martí, the last said thin), The Getaway Weekend
in 11 stops (Friday the cliff path and Casamar; Saturday the Teatre-Museu, Rafa's, Empúries, Sant Martí, Can Roca; Sunday Girona's café,
bridges and gelato, then lunch at Els Tinars).

## What the 19 Oct re-check corrected
- **Bo.TiC's second star** came in the 2021 guide (announced December 2020), not 2018. **Casamar** held a star from the 2012 guide to about
  2021 (or the 2022 edition — kept as a dispute); its kitchen reopened on 27 March 2026 after the hotel was rebuilt; 70 years in 2026.
  **Els Tinars** opened as a roadside masia in 1978; star since 2008 (3Cat; another source says the 1980s — a dispute); Marc and Elena
  Gascons; Premi Nacional de Gastronomia 2025. **El Celler de Can Roca**: three stars in the 2026 guide, forty years in October 2026; booking
  is online only, up to eleven months ahead, released at midnight CET on the 1st; the old "EUR 250-365" price is unsupported and gone.
- **Anxoves Solés** is at Carrer Closa d'en Llop 40 (factory, museum, shop, tasting terrace), not the Plaça de la Sardana. **La Gamba**'s
  "Cuadrat family since 1967, a former fish depot" is unsourced (only "the 1960s"): not printed. **Rafa's** cook is Rafa Cantero; opening
  days disputed. **Cal Tet** serves dinner too. **The Palamós auction visits** are run by the Museu de la Pesca on set dates (16:30/17:00,
  EUR 3.50 in 2025), not "Mon–Fri 4–8pm"; "sells out" unsourced. **Mercat del Lleó** opened 3 November 1944; "~60 stalls" unsourced.
- **Camí de ronda Calella–Llafranc** is about 1.5 km and 20–30 minutes, not 5.5 km and two hours. **Rice at Pals**: "since 1452" is a mill's
  date; cultivation from the 15th century, banned in the 19th, revived in the early 20th. **The tramuntana's** recorded peak is 218 km/h at
  Portbou (29 Jan 2001). **Cap de Creus rock**: dated layers give about 560–540 Ma (the old 580–540 Ma has no source; kept as a dispute).
  **The vine at Empúries** is tradition against Phoenician-first evidence (a dispute). **The smugglers' 1940–1958 and penicillin**: no Costa
  Brava source (a dispute). **"Costa Brava" 1908**: confirmed (Agulló, "Pol", La Veu de Catalunya, 12 Sep 1908), Pla's Fornells claim and the
  1905 date kept as disputes. **Lledoner roig** is one pale grape listed as white by the DO; the 1890s Roig-family Carinyena story dropped.
- Museums dated now: Teatre-Museu EUR 18.50 online; Casa-Museu Dalí EUR 15.50, closed 7 Jan–10 Feb; Púbol EUR 10; Empúries EUR 7;
  elBulli1846 EUR 27.50, closed since 12 Oct until 2027; Besalú mikveh visit EUR 2.25. The 2026 Cantada d'Havaneres (4 July) was cancelled
  for a wildfire. Seasonal calendar: 9 corrections (e.g. "Pals rice season" in October was wrong; "elBulli1846 opens (15th)" was 2023's date).
- Hub card `csv:false` → `csv:true` (a one-flag hand edit of `terroir/index.html`; the hub builder was not run). Map opens at zoom 9 (was 13,
  one cove of a 100-km coast).
- Statuses: **10 confirmed 19 Oct, 4 unverified** (Can Bonay, Mercat del Lleó, La Fábrica, Rocambolesc: nothing 2026-dated found, nothing
  against; each card says so and none is on the guest list or a berth).

## Why NEEDS-NETWORK (exactly what remains — every one needs a normal network)
1. `python3 terroir/_rollout/lib/checklinks.py . Costa-Brava-Catalunya` — the proxy refuses every external host here.
2. Own-site hours, dated, for the guest list and berths: cellercanroca.com (2026 menu price, closing weeks), bo-tic.com (days, prices,
   deposit terms), elstinars.com (days: MICHELIN daily vs Time Out closed Monday), Casamar (2026 closing date), compartircadaques.com (closing
   date, service days), La Gamba (November closure?), Rafa's (service days; is "Rambutan" in Roses a rename?), Cal Tet (winter days),
   Anxoves Solés (shop/museum hours).
3. The four unverified places: a dated 2026 sign of trading for Can Bonay, Mercat del Lleó (and its hours), La Fábrica, Rocambolesc
   (Santa Clara 50 vs Hortes 6; hours).
4. guide.michelin.com (Bo.TiC 2 stars and Els Tinars 1 star by name in the 2026 list) and guiarepsol.com (2026 Soles) — and the MICHELIN
   Spain 2027 gala on 24 Nov 2026 (Huesca): every starred table.
5. Card gaps that need own sites: Museu de la Pesca and the auction's autumn dates and 2026 price; Museu de l'Anxova i de la Sal hours;
   Ciutadella de Roses price; Teatre-Museu and Púbol 2026 timetables; Sant Pere de Rodes adult price; Santa Maria de Castelló hours; Cap Roig
   2026 hours and price; Espelt (EUR 27 vs 22), La Vinyeta 2026 season, Perelada visit price; Annick Galimont's 2026 prices (2019 sheet);
   the urchin legal window (Ordre ARP/105/2020, the 1 Oct–31 Mar window is from press); the 2026-27 trawl stop.
6. The rest of `research/verify_1.json` + `verify_2.json` `_needs_network` (17 lines), `research/hot_events.json` (7 lines), and the card
   packs' `_notes`.
Commit the results as `research/verify_*_network_*.json`; the next run applies them through `fixes.py`, rebuilds, re-applies §8
(apply_readings refuses to run twice: rebuild first), flips to review.
