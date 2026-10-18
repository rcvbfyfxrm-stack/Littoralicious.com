# Cadaqués · Cap de Creus (Cadaques-CapdeCreus) → GOLD6 (the Prague standard) · nightly run 18 Oct 2026 · status NEEDS-NETWORK (everything else done)

Route B, the Var/Paris pipeline: the reading layer is assembled on the LIVE Siracusa-Sicilia chrome (itself cloned from live Prague),
from the old Cadaqués guide's own data and research. The old page was a **GOLD2 tier inventory**: 16 venue records in three flat tiers
(elBulli, a museum since 2023, filed as a table), a "Three Tables" block and a five-tier prose fold naming the same houses again and
again, no lanes, no dishes, venue `why` fields pasted together with their "To order" and caveat lines. This pass brings the GOLD3/4/5
floor too: 5 table lanes in three groups, each opening on a food story; `dishes[]` on every table; the guest list with charters; the
`#eat` jump line and **La liste** (15 items, The Dish inside it, one-tap `.ics`) at the foot; the dated hot board with its `#why-now`
pointer; the calendar; craft; the listening room; the coves; Autour; three gem popups; the 24-column CSV. The locked kit
`terroir/_assets/guide/*` is untouched. Rebuild, repeatably:

    python3 terroir/_rollout/review/Cadaques-CapdeCreus/extract_old.py           # research/cards_old.json
    python3 terroir/_rollout/review/Cadaques-CapdeCreus/make_plan.py             # picks.json + card_plan.json (the cut, as data)
    python3 terroir/_rollout/review/Cadaques-CapdeCreus/make_research_inputs.py  # the agents' inputs (research/*_input.json)
    python3 terroir/_rollout/review/Cadaques-CapdeCreus/make_inputs.py           # research/ + fixes.py -> cards.json, venues.json, lane_stories.json, hot_events.json
    python3 terroir/_rollout/review/Cadaques-CapdeCreus/build_gold6.py           # reads the old guide + chrome from origin/rebuild/publishing-system
    python3 terroir/_rollout/lib/gold6/facts_tidy.py terroir/Cadaques-CapdeCreus/index.html
    python3 terroir/_rollout/review/Cadaques-CapdeCreus/repetition_audit.py
    python3 terroir/_rollout/review/Cadaques-CapdeCreus/gate_config.py
    python3 terroir/_rollout/lib/gold6/readings/apply_readings.py terroir/Cadaques-CapdeCreus terroir/_rollout/review/Cadaques-CapdeCreus/Cadaques-CapdeCreus.readings.json --check-config terroir/_rollout/lib/guides/Cadaques-CapdeCreus.check.json

Hand prose: `prose.py` (lead, essay, the elBulli fold, fold heads, lane leads, doors, the guest-list lines, gems, glossary, The Dish,
the three photos) and `liste.py` (La liste); the editor's reconciliations on the research packs, each stated, are in `fixes.py`.
Render and probes use the test-only `pw-shim.cjs` (`NODE_OPTIONS=--require …/pw-shim.cjs`, leaflet@1.9.4 from the npm registry in
`lf/` via `npm pack leaflet@1.9.4`), because unpkg.com is blocked in the sandbox.

## Numbers
**Places 16 records → 13**, all in lanes: 5 lanes (grande 1 · petite 3 · bar 1), none over 3, **no 4s**. Cut 3 (reasons in
`picks.json`): elBulli (not a table: the elBulli1846 museum, now a day-trip card under Autour; its story is the food-history fold),
Es Trull and Cafe Tropical (nothing dated 2026 found for either; their registers told by the venues kept).
**Fold cards: 61 old cards and list items (+7 dish articles) → 66 written** in 13 folds, every group ≤3, every one labelled, plus 11
hot-board and 9 calendar cards = **86 `.fcard`, 86 with facts**. New: 6 curiosities, the Monday market, craft (4), Autour (5), the honest
"no hi-fi bar" card. The 7 old dish articles are rewritten inside La liste (The Dish), the Compartir article folded into its venue.
**Guest list, rebuilt from venues kept, every one confirmed trading in 2026 (18 Oct):** last minute Marítim · L'Hostal · Can Rafa; this week
Casa Anita · Casa Nun · Es Baluard; grand night Compartir · Talla · Restaurant Cap de Creus. None published autumn hours: every line
says call. **Berths:** Compartir · Casa Anita · Marítim.
§8: One Night in 4 quarters (the front · the old town · the Riera and Riba Pitxot · the cape by car, the thin one said thin), The
Getaway Weekend in 10 stops (Friday on the front; Saturday the camí de ronda, Casa Anita, Dalí's house, Portlligat, Compartir; Sunday the
lighthouse and Cala Culip, lunch at the lighthouse, the slate vineyard at Martín Faixó).

## What the 18 Oct re-check corrected
- **Disfrutar's third star** came in November 2023 (Spain 2024 guide), not 2024; the World's 50 Best No.1 of June 2024 stands.
  **Compartir** is at Riera de Sant Vicenç s/n (MICHELIN, Repsol); the old dish article's "Carrer del Sitjar 5" was found nowhere. MICHELIN
  selection, no star, no Bib; 2 Soles Repsol (year of the second not read); menu about EUR 80. Its old pin sat exactly on the guide's map
  centre (a fallback, not a geocode): unpinned, Maps link kept.
- **Casa Anita:** Ana Mota died in June 2025, three days short of ninety (Ara, 18 June 2025); her children cook. "Cash only" unverified,
  dropped; the Dalí link of the old verdict has no source and is not repeated. **Can Rafa** was opened in 1982 by her son Rafa Martín
  Mota with Carmen Faixó (the old record's "Carmen Rice" was a paste error) — the same family makes the Martín Faixó wine (said once, on
  the larder card and the lane story). **Casa Nun** since 1979. **Restaurant Cap de Creus:** "biologist" unsupported, dropped; a booking
  through its site is the car pass to the lighthouse in season. **L'Hostal** is a full restaurant now; the Dalí logo dated 1975 by listings.
  **Marítim** listed as protected local heritage (2018). **Es Bar de Dalt** faces the football ground, not the bay.
- **Music festival:** the 2026 edition (53rd) ran 28 June–21 August only, not "April to December" (that was 2025); "second-oldest" softened;
  the seasonal table, the hot board and the cards say so. **Casa-Museu Dalí:** closed 7 January–10 February (reopening on the 11th), 2026
  prices; Lídia Noguer sold Dalí the hut — she was not "the fisherman". **Santa Maria:** designed by Jacint Morató, carved by Pau Costa with
  Joan Torras; the old 1729/1788 dates clash with the heritage sheet, so only "decades" is said; the fishermen's-brotherhood funding is
  unconfirmed and gone. **Parlar salat** is not unique to Cadaqués on the mainland (Tàrbena, Vall de Gallinera): a dispute now.
  **Barbarossa's sack** dated 1543; the 1030 "fisheries" reading kept as a dispute. **Casa Blaua** (not Blava), 1913. **Es Sortell** is
  before Sa Conca, not past it; Sa Conca is a festival venue, not its home since 1970. **Culip IV** excavated 1984–88. **Es Cucurucú** is a
  rocky islet at the bay's mouth, not a headland mirador. **Ratafia:** the IGP asks three months' maceration, not 40 days. **Garnatxa roja and
  gris** are one grape. **Cap Roig** 2026 dates. **Boia** closure (4 January 2025) confirmed. The elBulli fold's "fifteen minutes from where it
  began" contradicted its own "half an hour over the headland": fixed.
- Hub card `csv:false` → `csv:true` (a one-flag hand edit of `terroir/index.html`; the hub builder was not run).
- Statuses: **12 confirmed 18 Oct, 1 unverified** (La Sirena: nothing 2026-dated found, nothing against it; its card says so).

## Why NEEDS-NETWORK (exactly what remains — every one needs a normal network)
1. `python3 terroir/_rollout/lib/checklinks.py . Cadaques-CapdeCreus` — the proxy refuses every external host here.
2. Own-site hours and autumn/winter season, read and dated, for the guest list and berths: Marítim (Instagram), L'Hostal, Can Rafa
   (martinfaixo.com), Casa Anita (phone; days and payment), Casa Nun (casanun.com; street number 6 vs 9, closing day), Es Baluard
   (esbaluard-cadaques.net), Compartir (compartircadaques.com: closing date, service days, menu price), Talla (2026 closing date),
   Restaurant Cap de Creus (restaurantcapdecreus.com: autumn hours, car-access rule in October).
3. La Sirena — a dated 2026 sign of trading and its closing day (Tuesday or Wednesday), or cut.
4. guide.michelin.com (Compartir in the Spain 2026 selection, no star/Bib) and guiarepsol.com (2 Soles in 2026).
5. Card gaps that need own sites: the Monday market's days/hours and winter run (cadaques.cat), the Teatre-Museu and Púbol 2026
   timetables and prices (salvador-dali.org), Sant Pere de Rodes adult price, the Museu de Cadaqués and Espai Cap de Creus hours,
   Annick Galimont's 2026 prices (the only sheet is from 2019), the 2026 Cap de Creus road-regulation dates and shuttle fare, the
   sea-urchin legal season (Ordre ARP/105/2020), Es Bar de Dalt's address (two given).
6. The rest of `research/verify_1.json` (16 lines) and `research/hot_events.json` (8 lines) `_needs_network`, and the card packs' `_notes`.
Commit the results as `research/verify_*_network_*.json`; the next run applies them through `fixes.py`, rebuilds, re-applies §8
(apply_readings refuses to run twice: rebuild first), flips to review.
