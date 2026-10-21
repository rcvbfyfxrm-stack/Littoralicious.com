# Cavalaire-sur-Mer → GOLD6 (the Prague standard) · nightly run 21 Oct 2026 · status NEEDS-NETWORK (everything else done)

Route B, the Var/Girona pipeline: the reading layer is assembled on the LIVE Siracusa-Sicilia chrome (itself cloned from live Prague),
from the old Cavalaire guide's own data and research. The old page was a **GOLD2-era tier inventory**: 20 venue records in four flat
categories (one duplicate, two records of the same beach club), no lanes, no dishes, `portName:'Barcelona'` in its config, 68 tcards in
13 folds with the Domaine du Rayol told four times and the three-capes walk three times; its `#history`, `#why-now` and `#money-sits`
folds held gem boxes about other things. This pass brings the GOLD3/4/5 floor too: 7 table lanes in three groups, each opening on a
food story; `dishes[]` on every table; the guest list with charters; the `#eat` jump line and **La liste** (14 items, The Dish inside it,
one-tap `.ics`) at the foot; the dated hot board with its `#why-now` pointer; the calendar; craft; the listening room; the coves; Autour;
the food-history fold (#bougie); three gem popups; the `terroir/data/` copy and the 24-column CSV; the hub card's `csv` flag set to true
(a one-word data edit in `terroir/index.html`, the hub builder not run). The locked kit `terroir/_assets/guide/*` is untouched.
Rebuild, repeatably:

    python3 terroir/_rollout/review/Cavalaire-sur-Mer/extract_old.py           # research/cards_old.json + guide_text_old.txt
    python3 terroir/_rollout/review/Cavalaire-sur-Mer/make_plan.py             # picks.json + card_plan.json (the cut, as data)
    python3 terroir/_rollout/review/Cavalaire-sur-Mer/make_research_inputs.py  # the agents' inputs (research/*_input.json)
    python3 terroir/_rollout/review/Cavalaire-sur-Mer/make_inputs.py           # research/ + fixes.py -> cards.json, venues.json, lane_stories.json, hot_events.json
    python3 terroir/_rollout/review/Cavalaire-sur-Mer/build_gold6.py           # reads the old guide + chrome from origin/rebuild/publishing-system
    python3 terroir/_rollout/lib/gold6/facts_tidy.py terroir/Cavalaire-sur-Mer/index.html
    python3 terroir/_rollout/review/Cavalaire-sur-Mer/repetition_audit.py
    python3 terroir/_rollout/review/Cavalaire-sur-Mer/gate_config.py
    python3 terroir/_rollout/lib/gold6/readings/apply_readings.py terroir/Cavalaire-sur-Mer terroir/_rollout/review/Cavalaire-sur-Mer/Cavalaire-sur-Mer.readings.json --check-config terroir/_rollout/lib/guides/Cavalaire-sur-Mer.check.json

Hand prose: `prose.py` (hero, etymon, lead, essay, fold heads, lane leads, doors, guest-list lines, gems, glossary, The Dish, the
venue-text word fixes) and `liste.py` (La liste); the editor's reconciliations on the research packs, each stated, are in `fixes.py`.
Render and probes use the test-only `pw-shim.cjs` (`NODE_OPTIONS=--require …/pw-shim.cjs`, leaflet@1.9.4 from the npm registry in `lf/`
via `npm pack leaflet@1.9.4`), because unpkg.com is blocked in the sandbox; the gate's render needs `/usr/bin/chromium` → the Playwright
Chromium. `card_shots.cjs` takes the two card screenshots.

## Numbers
**Places 20 → 19**, all in lanes: 7 lanes (grande: the stars 3, out of the palace kitchens 2 · petite: on the sand 3, fish by the water 3,
the corniche 2, the hill villages 3 · street: off the boat / the market / the port glass 3), none over 3, **no 4s**. Cut 3 (reasons in
`picks.json`): **La Brigantine** twice (a duplicate record, then the cap: the Lily of the Valley's 600–800-cover beach club, the house
already in through Vista) and **L'Auberge de l'Oumède** (its own record: "good rather than transcendent", TripAdvisor its only signal).
Added 2, built only from the old guide's own text (its #eat and #money-sits gems and its provisioning list), no coordinates invented:
**the fishermen's stand on the Quai Marc Pajot** and **the Wednesday market on the Place Jean Moulin**.
**Fold cards: 68 old tcards → 71 written** in 13 folds + 11 hot-board + 7 calendar = **89 `.fcard`, 89 with labelled facts**; 37 groups,
none over 3. Merged as told once: the four Domaine du Rayol cards into one, the three Trois Caps cards into one walk, the two monument
cards and the old 1944 story fold into "Alpha, the landing beach", Gassin ×2, Face à la Mer ×2. Cut for the cap: Le Jardin du Café
(Hyères), Le Clos des B, Bière du Golfe, the Vista and Brigantine bar cards. Dropped on the re-check: **La Cave de Mon Village** (no 2026
trace, and 329 avenue des Alliés is now listed for a furniture shop). New: 5 quarter cards, 6 curiosities, 3 larder estates + 2 pointer
cards + the Sunday market, the douaniers' coves, 4 craft cards, 4 warnings, the honest "no hi-fi bar" card, 5 follow cards.
**Guest list, rebuilt from venues kept, every one confirmed trading in 2026 (21 Oct):** last minute Le Refuge (to 31 Oct) · La Forge
(to 1 Nov) · Le Grand Bleu (hotel to 6 Nov); this week Les Saisonniers · Maurin des Maures (both year-round); grand night La Voile ·
La Palmeraie · Vista (all summer houses, closed now — said on the list). **Berths:** Les Saisonniers · Maurin des Maures · the Wednesday
market (one per group, each year-round).
§8: One Night in 6 quarters (the port and the Nouveau Port · the harbour mouth and the Cron cove, said thin · La Croix-Valmer village ·
Gigaro · Le Rayol by car · Ramatuelle by car), The Getaway Weekend in 12 stops (Friday Ô Petit Bar and Le Grand Bleu; Saturday Cap
Lardier's crest, the douaniers' coves, Les Saisonniers, Domaine de la Croix, La Grange à Vins, Maurin des Maures' bouillabaisse; Sunday the
La Croix-Valmer market, the Domaine du Rayol, the Café des Jardiniers, Bonporteau) — built for late October and early November.

## What the 21 Oct re-check corrected
- **Season:** the old text was written in July. Every seasonal house carries its 2026 season: La Voile closed 11 Oct, La Palmeraie 4 Oct,
  Le Parc 3 Oct (not year-round), La Pinède 10 Oct (one listing 4 Oct), Marius 30 Sep, Bello Visto 11 Oct, La Verdoyante 4 Oct; Le Refuge
  runs to 31 Oct, La Forge to 1 Nov, the Hôtel de la Calanque to 6 Nov, Tamaris to 30 Oct or 5 Nov (disputed). Year-round: Les
  Saisonniers, Maurin des Maures, the Café des Jardiniers, the market.
- **La Palmeraie:** the chef is a dispute — Relais & Châteaux 2026 names Thomas Pezeril, regional listings Alexandre Fabris; the verdict
  names neither. **Vista:** no MICHELIN selection entry confirmed for the restaurant (the hotel holds two Keys); G&M 13/20 (2026); its chef
  disputed (Maillard per G&M, Bouhier per Pudlowski). **Bello Visto:** in the MICHELIN selection at €€€, **no Bib Gourmand**; G&M 13/20,
  not two toques. **La Verdoyante:** no MICHELIN listing confirmed. **Maurin des Maures:** 29 avenue Étienne Gola; bouillabaisse about
  €85.50 a person, two minimum; one listing has no dinners 11 Nov–20 Dec. **Le Grand Bleu:** the bouillabaisse and lobster risotto are not
  on the 2026 menus seen; verdict and signature rewritten. **Le Parc:** two addresses in circulation (said so). **Le Comptoir des
  Saveurs:** season March–October, not February. **La Voile:** accents restored in its name.
- **The quay:** "a right that dates to Colbert's 1652 ordinance" is wrong — the Ordonnance de la Marine is of 1681 and no article on direct
  sale was found; the food-history fold now tells the prud'homies (Marseille 1431, King René 1477, the 1859 decree; the bay inside the
  Saint-Tropez prud'homie per a Port-Cros park study; a separate Cavalaire prud'homie kept as a dispute).
- **The cards:** the Togo wreck lies west of Pointe Dubreuil in the bay of Cavalaire at 45–61 m, not off Cap Lardier; the railway was the
  Chemins de fer du Sud de la France line (station 1890, taken up 1949) — "train des Pignes" kept as a dispute; the Pardigon villa
  softened to "among the largest on the coast of Roman Gaul"; Montjean's height a dispute (460 vs 236 m); the barquette's heritage
  listing not found, dropped; the 756th Tank Battalion and troop numbers dropped as unverified; **no Bateaux Verts shuttle calls at
  Cavalaire in 2026** (the warning and the follow card say so); Playa Mezcala is at the Pardigon end of this bay (its street is the
  avenue de Saint-Raphaël), not "near Saint-Raphaël"; HERA's Marylou Contreras is front of house, not the cook; Jazz à Ramatuelle had
  no 2026 edition; the island boats from Le Lavandou run year-round only to Port-Cros and Le Levant; Domaine du Rayol October hours and
  €14.50 fare; Château Minuty majority-owned by Moët Hennessy since 2023; La Tourraque family-run since 1805; Rayol is west of
  Cavalaire (the old card said east); map zoom 13 → 12; `portName` 'Barcelona' → 'Cavalaire-sur-Mer'.
- Statuses: **16 confirmed 21 Oct, 3 unverified** (Le Comptoir des Saveurs, the fishermen's stand, Ô Petit Bar: nothing 2026-dated
  found, nothing against; each card says so; none is on the guest list or a berth).

## Why NEEDS-NETWORK (exactly what remains — every one needs a normal network)
1. `python3 terroir/_rollout/lib/checklinks.py . Cavalaire-sur-Mer` — the proxy refuses every external host here.
2. guide.michelin.com: La Voile (2★), La Palmeraie (1★), Les Saisonniers, Vista, Bello Visto (no Bib?), La Verdoyante — the 2026 entries.
3. Own-site hours and 2026–27 dates for the guest list and berths: chateauvalmer.com / relaischateaux.com (who is chef at La Palmeraie),
   lareserve-ramatuelle.com, lily-of-the-valley.com (Vista's season), Les Saisonniers (Tuesday dinner, brunch, November closure),
   hoteldelacalanque.com (Le Grand Bleu's days, 6 Nov vs 20 Sep, menu), lerefugegigaro.fr (31 Oct, chef), ramatuelle La Forge (1 Nov),
   maurin-des-maures.com (hours, the 11 Nov–20 Dec dinner closure, price), domainedurayol.org (café hours in November, fares).
4. The 3 unverified places: Le Comptoir des Saveurs (2026 trading, closing date), the fishermen's stand (winter days, end time), Ô Petit
   Bar (winter days) — confirm or cut. Also: hotelduparc address; pinedeplage.com closing date; Tamaris 30 Oct vs 5 Nov.
5. The rest of `research/verify_1.json` + `verify_2.json` `_needs_network` (20 lines), `research/hot_events.json` (9 lines), and the
   card packs' `_notes`.
Commit the results as `research/verify_*_network_*.json`; the next run applies them through `fixes.py`, rebuilds, re-applies §8
(apply_readings refuses to run twice: rebuild first), flips to review.
