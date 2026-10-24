# Faro-Algarve → GOLD6 (the Prague standard) · nightly run 24 Oct 2026 · status NEEDS-NETWORK (everything else done)

Route B, the Split/Dubrovnik pipeline: the reading layer is assembled on the LIVE Siracusa-Sicilia chrome (itself cloned from live
Prague), from the old Faro guide's own data and research. The old page was a **GOLD1-era tier inventory** (publish-terroir.py): 18 venue
records in flat tiers, no lanes, no dishes, no `terroir/data/` copy, 72 tcards in 12 folds (Festival F, MED, Afro Nation and the Festa da
Ria Formosa told twice each; Gardy, the flor de sal and five secret-gem spots twice each). This pass brings the GOLD3/4/5 floor too: 4 table
lanes in three groups, each opening on a food story; `dishes[]` on every table; the guest list with charters; the `#eat` jump line and
**La liste** (14 items, The Dish inside it, one-tap `.ics`) at the foot; the dated hot board with its `#why-now` pointer; the calendar; the
month table rewritten; craft; the listening room; the swims; Autour; the food-history fold (1966 — the Barril tuna trap); three gem popups;
the `terroir/data/` copy and the 24-column CSV. The hub was not touched and the hub builder was not run. The locked kit
`terroir/_assets/guide/*` is untouched. Rebuild, repeatably:

    python3 terroir/_rollout/review/Faro-Algarve/extract_old.py           # research/cards_old.json + guide_text_old.txt
    python3 terroir/_rollout/review/Faro-Algarve/make_plan.py             # picks.json + card_plan.json (the cut, as data; berths/guest list from picks_lists.json)
    python3 terroir/_rollout/review/Faro-Algarve/make_research_inputs.py  # the agents' inputs (research/*_input.json) — only to re-run research
    python3 terroir/_rollout/review/Faro-Algarve/make_inputs.py           # research/ + fixes.py -> cards.json, venues.json, lane_stories.json, hot_events.json
    python3 terroir/_rollout/review/Faro-Algarve/build_gold6.py           # reads the old guide + chrome from origin/rebuild/publishing-system
    python3 terroir/_rollout/lib/gold6/facts_tidy.py terroir/Faro-Algarve/index.html
    python3 terroir/_rollout/review/Faro-Algarve/repetition_audit.py
    python3 terroir/_rollout/review/Faro-Algarve/gate_config.py
    python3 terroir/_rollout/lib/gold6/readings/apply_readings.py terroir/Faro-Algarve terroir/_rollout/review/Faro-Algarve/Faro-Algarve.readings.json --check-config terroir/_rollout/lib/guides/Faro-Algarve.check.json

Hand prose: `prose.py` (hero, etymon, lead, essay, fold heads, lane leads, doors, guest-list lines, glossary) and `liste.py` (La liste,
The Dish, the gems); the editor's reconciliations on the research packs, each stated, are in `fixes.py`. Render and probes use the test-only
`pw-shim.cjs` (`NODE_OPTIONS=--require …/pw-shim.cjs`, leaflet@1.9.4 from the npm registry in `lf/`, git-ignored, via `npm pack leaflet@1.9.4`),
because unpkg.com is blocked in the sandbox. `card_shots.cjs` takes the two card screenshots (the walk round the walls, opened).

## Numbers
**Places 18 → 11**, all in lanes: 4 lanes (grande: the starred tables 3 · petite: tables with a story 2, the tascas 3 · street: the two
markets and the bifana 3), none over 3, **no 4s**. Cut 8 (reasons in `picks.json`): **Bon Bon** (cap: the third resort star, furthest
west), **Vila Adentro** and **A Do Pinto** (cap; A Do Pinto had no fact to stand on), **Faz Gostos** (no 2026 trace; CHECKin has occupied its
rooms since July 2022; its 'Michelin Plate' no longer exists), **Tertúlia Algarvia** (kept as a craft card for its cataplana class),
**Bago**, the **Hotel Faro rooftop** and **Morgado do Quintão** (not tables: each keeps its own card). Added 1, no coordinates invented:
**Snack Bar da Xica** (from the old guide's own street-food card).
**Fold cards: 72 old tcards → 54 written** in 13 folds + 9 hot-board + 9 calendar = **72 `.fcard`, every one labelled**; 34 groups, none over 3.
**Guest list, rebuilt from venues kept (24 Oct):** last minute Tasca do Ricky · Adega Nova; this week CHECKin · Estaminé; grand night
Alameda · Ocean (Ocean takes a winter break — said on the list; Vila Joya left off, its annual close is given as Nov–Feb). **Berths:**
Alameda · Tasca do Ricky · Mercado de Olhão (one per group, each confirmed 2026). Statuses: 10 confirmed 24 Oct, 1 unverified (Snack Bar da Xica).
§8: One Night in 4 quarters (Cidade Velha · the Baixa · the marina · by the station), The Getaway Weekend in 13 stops (Fri 2 / Sat 7 / Sun 4),
built for late Oct–Nov, all on foot, by train and by boat.

## What the 24 Oct re-check corrected
- **Venues:** Alameda's days (MICHELIN: Mon and Thu–Sun, closed Tue–Wed; listings differ, so 'call'), its 'Umami' menu not found; Ocean's
  'Best Service Award 2026' was 2025 (Nelson Marreiros); Vila Joya's 'first two-star in Portugal' and '30 seats' unfound and dropped;
  CHECKin's chef did not 'give back' a star — he left São Gabriel (starred 2014) in 2020; its Bib Gourmand is confirmed for 2021 only;
  Faz Gostos cut (above); Tasca do Ricky takes no bookings June–September (the old 'booking 19:00–19:45' dropped); A Venda may close for the
  winter (kept, off the guest list); Adega Nova's postcode and the three conflicting schedules; the Mercado de Olhão voted one of the
  Novas 7 Maravilhas (12 Sep 2026), 'green domes' and '€4/kg sardines' dropped; the island pier (Porta Nova vs Portas do Mar) printed as a dispute.
- **Cards:** the Teatro Lethes opened 1845 (not 1874) and its programme was suspended after storm damage in Dec 2025, resumed Sept 2026; Milreu
  was a villa near Ossonoba, not Ossonoba; the Oxford-books count and arrival date are disputes; the Arco's '11th-century' Moorish gate is a
  dispute; the 1487 Pentateuch's printer (Gacon or Porteiro) a dispute; tempura's Portuguese origin a dispute; the flor de sal's '1.86 %
  magnesium' unfound and dropped; the Ilha Deserta boat about 45 min (not 30), and its lighthouse is at Farol on Culatra; Tavira's '37
  churches' softened; Negra Mole's '75 % of plantings in the 1980s' unfound and dropped; medronho 'often close to 50 %', not '48 %'; Café
  Aliança's 'Parlamento do Povo' and Pessoa claims unfound and dropped; Bago's hours (Tue–Sat 10–23, Sun 10–15); the rooftop is the Cosmopolitan,
  5th floor; Krater could not be found trading and is cut; Dom Rodrigo's IGP is national (17 Nov 2025, published 9 Dec 2025), EU pending — not
  'January 2026'; the clam's 'DOP' and '90 % of national output' unfound and dropped; the Festa da Ria Formosa 2026 ran 30 Jul–9 Aug (not
  25 Jul–4 Aug); Festival F had 7 stages, not 9; Afro Nation dropped (not this guide's).

## Why NEEDS-NETWORK (exactly what remains — every one needs a normal network)
1. `python3 terroir/_rollout/lib/checklinks.py . Faro-Algarve` — the proxy refuses every external host here.
2. Own-site / MICHELIN pages for the guest list and berths: guide.michelin.com Portugal 2026 (Alameda days; CHECKin's Bib; Bon Bon on the cut
   list), restaurantealamedafaro.com (days, prices, December dates), Ocean's 2026–27 winter break, Vila Joya's winter close and phone,
   Animaris (Estaminé's winter days, the boat timetable and the pier), CHECKin's phone, Tasca do Ricky's Nov–Dec days and booking policy.
3. The unverified place and the soft records: Snack Bar da Xica (a 2026-dated trace, hours, stall), A Venda's winter closure, Adega Nova's days,
   the two markets' official hours and Sunday trading, Café Aliança's current opening, Gardy's hours, the Casa do Medronho's 2026 visits.
4. The rest of `research/verify_*.json` and `research/hot_events.json` `_needs_network` (island ferry winter times, the Christmas lights
   switch-on, Teatro das Figuras prices, Monchique's medronho festival, 2027 festival dates).
Commit the results as `research/verify_*_network_*.json`; the next run applies them through `fixes.py`, rebuilds, re-applies §8
(apply_readings refuses to run twice: rebuild first), flips to review.
