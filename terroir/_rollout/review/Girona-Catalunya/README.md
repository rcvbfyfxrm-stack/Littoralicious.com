# Girona (Girona-Catalunya) → GOLD6 (the Prague standard) · nightly run 20 Oct 2026 · status NEEDS-NETWORK (everything else done)

Route B, the Costa Brava/Cadaqués pipeline: the reading layer is assembled on the LIVE Siracusa-Sicilia chrome (itself cloned from live
Prague), from the old Girona guide's own data and research. The old page was **GOLD3-era**: 31 venue records in 13 table sections (one a
one-venue rice lane), tcard folds, the `#tables-extended` tier fold GOLD3 deleted elsewhere, three tier lists, no lane stories, no guest
list, no hot board, no La liste, `#tables-extended` and `#history`/`#drink`/`#crafts`/`#gastronomy`/`#music`/`#work` folds. This pass
brings the GOLD4/5 floor too: 9 table lanes in three groups, each opening on a food story; `dishes[]` on every table; the guest list with
charters; the `#eat` jump line and **La liste** (18 items, The Dish inside it, one-tap `.ics`) at the foot; the dated hot board with its
`#why-now` pointer; the calendar; craft as "Do this one"; the listening room; rooms to linger; Autour; five gem popups; the 24-column CSV.
The locked kit `terroir/_assets/guide/*` is untouched; the hub was not touched. Rebuild, repeatably:

    python3 terroir/_rollout/review/Girona-Catalunya/extract_old.py           # research/cards_old.json + guide_text_old.txt
    python3 terroir/_rollout/review/Girona-Catalunya/make_plan.py             # picks.json + card_plan.json (the cut, as data)
    python3 terroir/_rollout/review/Girona-Catalunya/make_research_inputs.py  # the agents' inputs (research/*_input.json)
    python3 terroir/_rollout/review/Girona-Catalunya/make_inputs.py           # research/ + fixes.py -> cards.json, venues.json, lane_stories.json, hot_events.json
    python3 terroir/_rollout/review/Girona-Catalunya/build_gold6.py           # reads the old guide + chrome from origin/rebuild/publishing-system
    python3 terroir/_rollout/lib/gold6/facts_tidy.py terroir/Girona-Catalunya/index.html
    python3 terroir/_rollout/review/Girona-Catalunya/repetition_audit.py
    python3 terroir/_rollout/review/Girona-Catalunya/gate_config.py
    python3 terroir/_rollout/lib/gold6/readings/apply_readings.py terroir/Girona-Catalunya terroir/_rollout/review/Girona-Catalunya/Girona-Catalunya.readings.json --check-config terroir/_rollout/lib/guides/Girona-Catalunya.check.json

Hand prose: `prose.py` (hero, etymon, lead, essay, the Universo Roca fold, fold heads, lane leads, doors, guest-list lines, gems, glossary,
The Dish, photos) and `liste.py` (La liste); the editor's reconciliations on the research packs, each stated, are in `fixes.py`.
Render and probes use the test-only `pw-shim.cjs` (`NODE_OPTIONS=--require …/pw-shim.cjs`, leaflet@1.9.4 from the npm registry in `lf/`
via `npm pack leaflet@1.9.4`), because unpkg.com is blocked in the sandbox; the gate's render needs `/usr/bin/chromium` (a symlink to the
sandbox's Playwright Chromium). `card_shots.cjs` takes the two card screenshots.

## Numbers
**Places 31 → 26**, all in lanes: 9 lanes (grande: the stars 3, the Roca ladder 3 · petite: the old houses 3, the new rooms 3, the menú 2,
the morning 3 · street: xuixo/chocolate/cone 3, market/cheese/cellar 3, late 3), none over 3, **no 4s**. Cut 5 (reasons in `picks.json`):
**Arròs 9** (a one-venue rice lane), **König on the Plaça de la Independència** (the same house as König Calderers, kept), **Federal Café**
(a Barcelona brunch group's outpost, three conflicting sets of hours; the morning lane keeps three local), **Nexe, ex-Nu** (no 2026
evidence, one listing "temporarily closed", its MICHELIN/Repsol/chef claims unconfirmed), **El Cul de la Lleona** (its Nepali "x Catmandu"
rebrand found nowhere outside the old record, review sites still describe tapas, nothing 2026). The "other kitchens" lane would have held
one venue: Nomo joins "the new rooms".
**Fold cards: 71 old cards (+8 dish articles) → 72 written** in 12 folds + 11 hot-board + 9 calendar = **92 `.fcard`, 92 with labelled
facts**; 38 groups, none over 3. New: 4 curiosities, 4 Autour cards, 3 craft cards, 4 warnings, the honest "no hi-fi bar" card, 4 pointer
cards. Dropped as told once (reasons in `picks.json`): the venue duplicates in the old producers/linger/work folds, the Passeig de la Muralla
culture card (it is the walk), Cases de l'Onyar (merged into the bridges walk), the coast's anchovy/gamba product cards (they are La liste
dishes), the Rambla cafés, Santa Eugènia and Sant Feliu quarters.
**Guest list, rebuilt from venues kept, every one confirmed trading in 2026 (20 Oct):** last minute Zanpanzar · Casa Marieta · Nomo; this
week Dit i Fet · Fonda Cal Ros · Massana; grand night El Celler de Can Roca · Esperit Roca · Divinum. **Berths:** El Celler de Can Roca ·
Can Marquès · Tornés (the 2026 world xuixo champion).
§8: One Night in 5 quarters (Cort Reial · the Call and Sant Feliu · Plaça del Vi and Plaça de l'Oli · the Mercadal · beyond the walls by
taxi, said so), The Getaway Weekend in 14 stops (Friday the bridges, Divinum, the jazz cellar; Saturday the market, the cathedral, the Call
museum, Can Marquès, the walls, a panet, El Celler; Sunday a xuixo, Sant Pere, the Sant Daniel valley, lunch at Esperit Roca).

## What the 20 Oct re-check corrected
- **Massana** is not a fourth-generation house: Pere Massana and Ana Roger opened it in 1986; their son Pere now runs the kitchen (Ara,
  May 2026). **Casa Cacao** is Joan Roca's wife Anna Payet's hotel with Jordi Roca's chocolate, opened 15 Feb 2020 (not "Jordi Roca and
  Anna Payet's"). **Fonda Cal Ros** opened in April 2025 under the Gascons family of Els Tinars; its closing days are unconfirmed.
  **Xocolateria l'Antiga**: the Comas family for about 36 years (not "two generations since 1916"). **Cal Formatger** stocks over 1,000
  cheeses (Repsol), not "200+". **8de7** holds no Repsol Solete (that is Probocador next door): chip replaced. The "Solete 2026" chips of
  Casa Cacao and Rocambolesc and La Fàbrica's "Time Out top 14" found no source: replaced. **Tornés**: world xuixo 2026, Fava d'Or 2026.
  **Can Marquès** dinner nights disputed (Mon/Thu/Fri vs Wed–Fri). **Can Roca (Taialà)** menú €15–18, no 2026 source. **Rocambolesc**
  address disputed (Santa Clara 50 vs Hortes). Seven unsourced phone numbers dropped.
- **El Celler** is in Taialà, not Pedret (the old Pedret quarter card). **The flies of Sant Narcís** are dated 1285 (Philip III), not 1286.
  **1809**: end date (10 vs 12 December) and troop numbers kept as a dispute. **The cathedral** ticket is €7.50/€5 with Sant Feliu (not
  ~€7); Sant Pere de Galligants opens Sunday mornings. **The Call**: "excavations reached the yeshiva" unsourced, dropped; "first centre of
  Kabbalah" softened to "one of the first". **Banys Àrabs** about 1194 (some say 1198). **Castell de Sant Miquel** 385 m, 9.6 km return,
  330 m climb. **The Devesa**: about 2,600 plane trees mostly planted c.1850 on ~40 ha; "largest park / tallest trees in Catalonia"
  unsupported, dropped. **Formatge Garrotxa**: the IGP zone is all Catalonia, one of twelve makers is in the comarca; the 21-day figure is a
  dispute. **Poma de Girona**: Fuji is not an IGP variety. **Banyoles lake** loop about 7–8 km, not 6.5. **Garnatxa de l'Empordà**
  technique rewritten (roja + blanca, fortified, 14–20%); the DO's "1,768 ha" unconfirmed, dropped. **El meu avi** dropped from the Cantada
  finale in 2025, restored for 2026, the night cancelled (wildfire). **Nits de Clàssica**: last edition found 2019 — said so. **Es Niu**
  runs October–December (16 Oct–13 Dec 2026), not January: seasonal table fixed, with 5 more calendar fixes (Fires 23 Oct–1 Nov 2026, etc.).
  Gerisena's "Obreboques" vermouth not found: the name leaves the card.
- The Barri Vell's camera-controlled access and the weekday low-emission zone (since 15 Sep 2025) are a new warning card. Map opens at
  zoom 14 (was 15, only the Barri Vell). The glossary's "Call" became "El Call" (case-insensitive marking caught "Call ahead").
- Statuses: **18 confirmed 20 Oct, 8 unverified** (La Fàbrica, Can Castelló, Casa Cacao, Rocambolesc, Mercat del Lleó, Cal Formatger,
  König Calderers, Can Roca Taialà: nothing 2026-dated found, nothing against; each card says so; none is on the guest list or a berth).

## Why NEEDS-NETWORK (exactly what remains — every one needs a normal network)
1. `python3 terroir/_rollout/lib/checklinks.py . Girona-Catalunya` — the proxy refuses every external host here.
2. guide.michelin.com: Massana, Divinum, Esperit Roca one star each in the 2026 list by name (seen only via press), and the MICHELIN Spain
   2027 gala on 24 Nov 2026: every starred table.
3. Own-site hours and 2026 prices, dated, for the guest list and berths: cellercanroca.com (Festival and anniversary menu prices, closing
   weeks), restaurantmassana.com, Divinum, esperitroca.com (hours, the 3–11 Nov closure, €139 vs €140), Fonda Cal Ros (days, phone),
   casamarieta.com, ditifetrestaurant.com, Nomo (days, Menú Naoyuki 2026), Zanpanzar (hours; the 2025 handover), Can Marquès (dinner
   nights), tornes.cat (menú, dessert, phone).
4. The 8 unverified places: a dated 2026 sign of trading (and hours) for La Fàbrica (15:00 vs 17:00), Can Castelló, Casa Cacao, Rocambolesc
   (address and hours), Mercat del Lleó (hours), Cal Formatger, König Calderers, Can Roca Taialà (menú price) — confirm or cut.
5. Card gaps: the cathedral's mid-Sept–Oct hours, Banys Àrabs and Sant Pere de Galligants 2026 prices and hours, the Bisbal school's 2026
   courses, La Sobirana's dates, Museu del Suro costs, the organic producers' market (day unconfirmed), Le Bistrot (same address as a
   "Cafe le Bistro"), the Es Niu, Llagostera bolet fair and Besalú ratafia fair 2026 dates, the new-oil presentation date, the Fires'
   official programme.
6. The rest of `research/verify_1.json` + `verify_2.json` `_needs_network` (30 lines), `research/hot_events.json` (7 lines), and the card
   packs' `_notes`.
Commit the results as `research/verify_*_network_*.json`; the next run applies them through `fixes.py`, rebuilds, re-applies §8
(apply_readings refuses to run twice: rebuild first), flips to review.
