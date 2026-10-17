# The Var (Var-Provence) → GOLD6 (the Prague standard) · nightly run 17 Oct 2026 · status NEEDS-NETWORK (everything else done)

Route B, the Paris/Barcelona pipeline: the reading layer is assembled on the LIVE Siracusa-Sicilia chrome (itself cloned from live
Prague), from the old Var guide's own data and research. The old page was a **pre-GOLD2 tier inventory** written without accents
(34 venue records in five flat categories: one duplicate, two markets and a confectioner filed as tables, one table in the
Bouches-du-Rhône; no lanes, no dishes; `portName:'Barcelona'` and `zoom:13` in its config; every source link's href held its label
text, so all 35 were dead). This pass brings the whole GOLD3/4/5 floor too: 9 table lanes in three groups, each opening on a food
story; `dishes[]` on every table; the guest list with charters; the `#eat` jump line and **La liste** (17 items, The Dish inside it,
one-tap `.ics`) at the foot; the dated hot board with its `#why-now` pointer; the calendar; craft; the listening room; the coves;
Autour; the gem popups; the `terroir/data/` copy and the 24-column CSV. The locked kit `terroir/_assets/guide/*` is untouched.
Rebuild, repeatably:

    python3 terroir/_rollout/review/Var-Provence/extract_old.py           # research/cards_old.json + guide_text_old.txt
    python3 terroir/_rollout/review/Var-Provence/make_plan.py             # picks.json + card_plan.json (the cut, as data)
    python3 terroir/_rollout/review/Var-Provence/make_research_inputs.py  # the agents' inputs (research/*_input.json)
    python3 terroir/_rollout/review/Var-Provence/make_inputs.py           # research/ + fixes.py -> cards.json, venues.json, lane_stories.json, hot_events.json
    python3 terroir/_rollout/review/Var-Provence/build_gold6.py           # reads the old guide + chrome from origin/rebuild/publishing-system
    python3 terroir/_rollout/lib/gold6/facts_tidy.py terroir/Var-Provence/index.html
    python3 terroir/_rollout/review/Var-Provence/repetition_audit.py
    python3 terroir/_rollout/review/Var-Provence/gate_config.py
    python3 terroir/_rollout/lib/gold6/readings/apply_readings.py terroir/Var-Provence terroir/_rollout/review/Var-Provence/Var-Provence.readings.json --check-config terroir/_rollout/lib/guides/Var-Provence.check.json

Hand prose: `prose.py` (lead, essay, the 1941 food-history fold, fold heads, lane leads, doors, gems, glossary, The Dish) and
`liste.py` (La liste); the editor's reconciliations on the research packs, each stated, are in `fixes.py`. Render and probes use
the test-only `pw-shim.cjs` (`NODE_OPTIONS=--require …/pw-shim.cjs`, leaflet@1.9.4 from the npm registry in `lf/` via
`npm pack leaflet@1.9.4`), because unpkg.com is blocked in the sandbox; the gate needs `/usr/bin/chromium` → the Playwright chromium.

## Numbers
**Places 34 records → 27**, all in lanes: 9 lanes (grande 3 · petite 5 · street 1), none over 3, **no 4s**. Cut 7 (reasons in
`picks.json`): the duplicate La Voile record (merged), Beauvallon (cap; opened Apr 2026, no star), Le Belrose (cap; no star, its
terrace stays as a bar card), Hostellerie Bérard (its own record: the starred René'Sens ended Nov 2023), La Table de Nans (in
La Ciotat, Bouches-du-Rhône), La Table du Marché (the Leroy company was struck off in 2019), the Sanary market (not a table: it is a
larder card now).
**Fold cards: 79 old cards (incl. 10 dish articles) → 87 written** in 13 folds, 35 groups, none over 3, every one labelled, plus 11
hot-board and 8 calendar cards = **106 `.fcard`, 106 with facts**. New: 8 town cards, 8 curiosities, a larder of 9, craft (4),
the coves (4), what to skip (4), follow (6), the Annonciade. The 10 old dish articles are rewritten clean inside La liste (origins
of the cade, the chichi frégi and the tropézienne moved to their gem popups, so each is told once).
**Guest list, rebuilt from venues kept, every one confirmed trading in 2026 (17 Oct):** last minute Shanael · La Colombe · La Ponche
(all open in October); this week the Abbaye de la Celle · the Commanderie de Peyrassol (Chez Jeannette) · Le Pont d'Or; grand night
La Vague d'Or · La Table du Castellet · La Voile (two of them summer houses, closed now — said on the list). **Berths:** La Table du
Castellet · La Colombe · the Cours Lafayette market (La Cade à Dédé found no 2026-dated source: it stays in its lane).
§8: One Night in 6 ports (Saint-Tropez, Toulon, Hyères, Ramatuelle, the Bandol hills, Collobrières — the thin ones said thin), The
Getaway Weekend in 11 stops (Toulon Friday, the market, Faron, Terrebrune, the Maison des Vins and La Table du Castellet Saturday,
the Maures Sunday) — built to work from spring to the end of November, when the coast has shut.

## What the 17 Oct re-check corrected
- **Season:** the old text was written for high summer. Every seasonal house now carries its 2026 season: La Vague d'Or closed
  10 Oct (not 11), Colette 3 Oct, Récif 10 Oct, the Porquerolles tables late Sept/1 Oct, La Môle 11 Oct (one listing 21 Oct), Lou
  Portaou 31 Aug; Club 55 runs to 1 Nov; La Table du Castellet to 1 Dec; Le Faventia to 26 Oct. All the Pampelonne clubs and the
  palace terraces have closed for 2026 (each card says so).
- **Chez Bruno:** Clément Bruno died in late January 2025 (not 2026). **La Table du Castellet** took its third star in March 2024,
  not 2022. **La Vague d'Or** menus from EUR 480, not 445. **La Colombe:** no 2026 source shows the Bib Gourmand — the chip says
  "Bib unconfirmed". **Chez Jeannette (Peyrassol)** kept its star in 2026 (estate site; not seen on guide.michelin.com).
- **Operation Dragoon:** about 350,000 troops, not "half a million". **Le Brusc** is a port of Six-Fours, not Sanary. The **Solliès
  fig** share is a dispute (60–80% by source), not "three-quarters". The **Sanary exiles' plaque** is in the tourist-office patio.
  **Maison des Vins de Bandol** is at Le Castellet, not in Bandol. The **Blanc-Martel shuttle** does not link the two trailheads.
  **Verdon:** the lake was filled in 1973; it was the church that was dynamited in 1974. **Oméga Live** is the Zénith Oméga's small
  hall (200–750). **La Cellule Records** is listed at 5 rue Félix Pyat now. The **Hyères fashion festival** is in October (15–18 Oct
  2026, on now). The **Citadelle** was listed temporarily closed in April 2026. **Pampelonne**'s rebuild dated (decree Dec 2015,
  works 2019, dune 2020). **Aups**'s 2026 truffle fête was 25 Jan only.
- **TERROIR_CONFIG `portName:'Barcelona'`** → `'Var'` (the kit appends it to every Maps link it makes), `zoom:13` → `9` (a
  department, not a town). The 35 source links had their label inside the href (dead live): rebuilt clean. The hub card's
  `csv:false` → `csv:true` (a one-flag hand edit of `terroir/index.html`; the hub builder was not run).
- Statuses: **19 confirmed 17 Oct, 8 unverified** (Récif, Chez Bruno, Braconniers, Picotte, La Petite Fontaine, Pibarnon, La Cade à
  Dédé, Confiserie Azuréenne: nothing 2026-dated found, nothing against them; each card says so).

## Why NEEDS-NETWORK (exactly what remains — every one needs a normal network)
1. `python3 terroir/_rollout/lib/checklinks.py . Var-Provence` — the proxy refuses every external host here.
2. Own-site hours, read and dated, for the guest list and berths: Shanael (two conflicting weekly patterns), La Colombe, La Ponche
   (restaurant winter dates), the Abbaye de la Celle (annual closure), Chez Jeannette, Le Pont d'Or (Friday aïoli still served),
   La Table du Castellet (service days, winter dates), La Vague d'Or, La Voile (2026 closing day), the Cours Lafayette market.
3. The 8 unverified tables — a 2026 sign of trading, or cut: Récif, Chez Bruno, L'Auberge des Braconniers, Picotte, La Petite
   Fontaine, Château de Pibarnon, La Cade à Dédé, Confiserie Azuréenne.
4. guide.michelin.com: Colette, Récif, Chez Bruno, Le Faventia (one star 2026), La Colombe (Bib?), Chez Jeannette (star, Green
   Star?), La Ponche, Soléa, La Pinède.
5. The rest of `research/verify_1.json` / `verify_2.json` / `hot_events.json` `_needs_network` (36 lines) and the card packs'
   `_notes` (Cafés Magali / Jardin du Café / Cafés Maurice / Village des Tortues hours; the Annonciade's autumn hours and works;
   Faron cable-car and Blanc-Martel shuttle fares; the TLV-TVM winter timetable; the Fête des Vins de Bandol organiser page).
Commit the results as `research/verify_*_network_*.json`; the next run applies them through `fixes.py`, rebuilds, re-applies §8
(apply_readings refuses to run twice: rebuild first), flips to review.
