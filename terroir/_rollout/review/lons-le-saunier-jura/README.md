# lons-le-saunier-jura → GOLD6 (the Prague standard) · nightly run 26 Oct 2026 · status NEEDS-NETWORK (everything else done)

Route B, the Beaune/Faro pipeline: the reading layer is assembled on the LIVE Siracusa-Sicilia chrome (itself cloned from live Prague),
from the old Lons guide's own data and research. The old page was a **GOLD1-era tier inventory** (publish-terroir.py): 17 venue records in
flat tiers (tables, two wine estates, a museum, a UNESCO saltworks and the Comté centre in one list), no lanes, no dishes, no `terroir/data/`
copy, 68 tcards in 12 folds (the arcades told three times; the Source Salée three; Baume and the Hérisson falls twice each; the Percée twice;
the Thursday market three times; the Pasteur thesis myth twice). This pass brings the GOLD3/4/5 floor too: 4 table lanes in three groups,
each opening on a food story; `dishes[]` on every table; the guest list with charters; the `#eat` jump line and **La liste** (14 items, The
Dish inside it, one-tap `.ics`) at the foot; the dated hot board with its `#why-now` pointer; the calendar; the month table rewritten; craft;
the listening room; Autour; the food-history fold ("1264 — Salt, shared milk and a cheese built to keep"); three gem popups; the
`terroir/data/` copy and the 24-column CSV. The hub was not touched and the hub builder was not run. The locked kit `terroir/_assets/guide/*`
is untouched. Rebuild, repeatably:

    python3 terroir/_rollout/review/lons-le-saunier-jura/extract_old.py           # research/cards_old.json + guide_text_old.txt
    python3 terroir/_rollout/review/lons-le-saunier-jura/make_plan.py             # picks.json + card_plan.json (berths/guest list from picks_lists.json)
    python3 terroir/_rollout/review/lons-le-saunier-jura/make_research_inputs.py  # the agents' inputs — only to re-run research
    python3 terroir/_rollout/review/lons-le-saunier-jura/make_inputs.py           # research/ + fix_1.json + fixes.py -> cards.json, venues.json, lane_stories.json, hot_events.json
    python3 terroir/_rollout/review/lons-le-saunier-jura/build_gold6.py           # reads the old guide + chrome from origin/rebuild/publishing-system
    python3 terroir/_rollout/lib/gold6/facts_tidy.py terroir/lons-le-saunier-jura/index.html
    python3 terroir/_rollout/review/lons-le-saunier-jura/repetition_audit.py
    python3 terroir/_rollout/review/lons-le-saunier-jura/gate_config.py
    python3 terroir/_rollout/lib/gold6/readings/apply_readings.py terroir/lons-le-saunier-jura terroir/_rollout/review/lons-le-saunier-jura/lons-le-saunier-jura.readings.json --check-config terroir/_rollout/lib/guides/lons-le-saunier-jura.check.json

Hand prose: `prose.py` (hero, etymon, lead, essay, fold heads, doors, glossary) and `liste.py` (La liste, The Dish, the gems, lane leads,
guest-list lines); the editor's reconciliations on the research packs, each stated, are in `fixes.py`; `research/fix_1.json` is the swap pack
written after the re-check overturned three records. Render and probes use the test-only `pw-shim.cjs` (`NODE_OPTIONS=--require …/pw-shim.cjs`,
leaflet@1.9.4 from the npm registry in `lf/`, git-ignored, via `npm pack leaflet@1.9.4`), because unpkg.com is blocked in the sandbox.
`card_shots.cjs` takes the two card screenshots (the Baume-les-Messieurs walk, opened).

## Numbers
**Places 17 → 11**, all in lanes, none over 3, **no 4s**: the stars (La Table du Grapiot · Le Bistronôme · La Chaumière) · Lons at table
(Ô Tablier · La Petite Auberge · Le Bistrot des Marronniers) · Arbois at table (La Finette · Le Bistrot des Claquets) · La Rue (the Lons
markets · Chez l'Artisan Fromager · Pelen). Cut 8 (reasons in `picks.json`): La Comédie and La Table de Perraud (cap); the Caveau des
Jacobins (wrong town, see below); Domaine Macle and Domaine Stéphane Tissot (cellar cards); the Maison de Louis Pasteur and the Saline Royale
(culture cards); the Maison du Comté (inside the Poligny Autour card). Added 2, no coordinates invented: La Chaumière (from the old bougie card)
and Chez l'Artisan Fromager (found by the venue pack). **Fold cards: 68 old tcards → 53 written** in 12 folds + 10 hot-board + 9 calendar =
**72 `.fcard`, every one labelled**; 32 groups, none over 3.
**Guest list (26 Oct):** last minute La Finette · Le Bistrot des Marronniers; this week Le Bistronôme · Ô Tablier; grand night La Table du
Grapiot · La Chaumière. **Berths:** La Table du Grapiot · Ô Tablier · the Lons markets (one per group, each confirmed 2026).
Statuses: 9 confirmed 26 Oct, 2 unverified (Chez l'Artisan Fromager, Pelen — neither a berth nor on the guest list).
§8: One Night in 5 places (the arcades · the Parc des Bains and rue de Vallière · Arbois on the Cuisance · Pupillin · Dole), The Getaway
Weekend in 13 stops (Fri 2 / Sat 8 / Sun 3), Lons as the base, a driver on Saturday.

## What the 26 Oct re-check corrected
- **Venues overturned:** **Maison Jeunet par Steven Naessens no longer exists** — Naessens left the Château de Germigney in July 2023, the room
  became Maison Rosella, and since 21 Sept 2026 La Table du Château (unrated); Jura Tourisme's March 2026 release counts three starred Jura
  tables (Grapiot, La Chaumière, Mont Joly), none at Port-Lesney. The old guide's top table and grand night is now a warning card ("The Jeunet
  name"). **Fromagerie Vagne has no Lons shop** (the Vagne fromageries are in Poligny and Château-Chalon): replaced by Chez l'Artisan Fromager,
  39 rue du Commerce. **The Caveau des Jacobins is not in Lons**: it is the Fruitière Vinicole d'Arbois shop in Poligny, reported closed for works.
- **Venues corrected:** Le Bistronôme's pastry chef is Lisa (not Léa) Vuillemin, no Thursday dinner Nov–Mar; La Finette is open daily for lunch
  and dinner (not "weekday lunch"); Les Claquets' only meal is one lunch dish, autumn break posted 23 Oct–1 Nov; the market is Place de Verdun /
  Place du 11 Novembre on Thursday and the Cours Sully on Saturday (not Place de la Comédie), with a trial move to Place de la Liberté in June
  2026; Pelen's shop is 1 rue Saint-Désiré; Arbois and Pupillin are about 40 km from Lons by road (not 15).
- **Cards:** rue du Commerce has 146 arcades (not 146 m) and "the only arcaded street in Franche-Comté" is unsupported; Bartholdi's statue is at
  the Place de la Chevalerie; the theatre was rebuilt in 1901 (not "1840 neoclassical"); the 1936 first gazette included Cognac, not
  Vosne-Romanée; the Savagnin "UC Davis/INRA 1999" credit is unsupported and Grüner Veltliner is Traminer × St. Georgen; the Saint-Désiré
  sarcophagus is empty; the Cordeliers hold the Chalon family crypt, not "dukes"; the Saline Royale is in the Doubs, not 25 km east; Pasteur's
  vineyard is at Montigny-lès-Arsures; the Parc des Bains is 7 ha; the archaeology museum has been closed since 2010; the Hérisson has 31 falls
  (about 7 km out and back); Baume's 869 is a first mention, not a founding; cancoillotte IGP 2022; Vin de Paille dries at least 6 weeks; Marc
  du Jura AOC 2015; the vineyard about 2,100 ha (CIVJ 2023); Tissot's caveau is on Arbois's Place de la Liberté; Ganevat's estate was sold in
  2021 and again in 2023 (the press report of an inquiry into that purchase printed as a report, attributed); the Lons saltworks' 1966 close
  and the 300 g/l brine could not be confirmed (printed as a dispute); the old "Foire de Comté, Poligny" in autumn was not found (the Comté
  days are in August); Percée du Vin Jaune 2027 confirmed at Arlay, 6–7 February.
- **Disputes kept:** Pasteur's house closes for the winter after 1 or 30 November (Jura Tourisme's listings disagree); the first fruitière
  (1253, 1264, 1267 Déservillers or 1284 Poligny); Comté's PDO 1996 or 1992; ~140 or ~150 fruitières.
- **Craft, honestly:** no Jura workshop found names a still-working master on a class anyone can join; the lede says so. The closest is the
  Atelier des Savoir-Faire at Ravilloles; Atelier Genod (missing: a class) and the Fruitière de Plasne (missing: a winter visit) follow.

## Why NEEDS-NETWORK (exactly what remains — every one needs a normal network)
1. `python3 terroir/_rollout/lib/checklinks.py . lons-le-saunier-jura` — the proxy refuses every external host here.
2. guide.michelin.com (France 2026): La Table du Grapiot's star, Le Bistronôme's Bib, La Chaumière's star and whether La Bagatelle carries a Bib.
3. Own sites / phones: La Table du Grapiot (Sunday dinner, Christmas/January), Le Bistronôme (holiday dates, phone, rue vs place de Faramand),
   Ô Tablier (Fri/Sat hours), La Petite Auberge (Saturday dinner), Le Bistrot des Marronniers (Monday/Saturday), La Finette (hours, Christmas),
   Les Claquets (the 2026 autumn break), La Chaumière (phone, site, bistrot hours/prices, Saturday lunch, closures), Chez l'Artisan Fromager
   (hours, phone, 2026 trading, Comté/Mont d'Or), Pelen (hours at 1 rue Saint-Désiré, the Galet de Chalain still made), lons-jura.fr (the
   market's location, the Wednesday market, Christmas 2026), the Tissot caveau's Nov–Dec hours.
4. The rest of `research/*.json` `_needs_network` (terredelouispasteur.fr winter dates, salineroyale.com and grande-saline.com November and
   holiday hours, leboeufsurletoit.fr dates and 47ter availability, the Théâtre de Lons programme, maison-du-comte.com 12 Nov, the UNESCO
   committee dates for the Biou, percee-du-vin-jaune.com 2027 programme, the 2027 festival dates).
Commit the results as `research/verify_*_network_*.json`; the next run applies them through `fixes.py`, rebuilds, re-applies §8
(apply_readings refuses to run twice: rebuild first), flips to review.
