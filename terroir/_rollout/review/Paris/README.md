# Paris → GOLD6 (the Prague standard) · nightly run 16 Oct 2026 · status NEEDS-NETWORK (everything else done)

Route B, the Barcelona/Athens/Piraeus pipeline: the reading layer is assembled on the LIVE Siracusa-Sicilia chrome (itself cloned
from live Prague), from the old Paris guide's own data and research. The old page was a **pre-GOLD3 tier inventory** (39 venue
records in five flat categories, two of them duplicates, four without coordinates; no lanes, no dishes; prose blocks whose
"story", "why now" and "where the money sits" had filled up with misplaced origin boxes; `portName:'Barcelona'` in its config).
This pass brings the whole GOLD3/4/5 floor too: 11 table lanes in three groups, each opening on a food story; `dishes[]` on every
table; the guest list with charters; the `#eat` jump line and **La liste** (18 items, The Dish inside it, one-tap `.ics`) at the
foot; the dated hot board with its `#why-now` pointer; the calendar; a craft section; the listening room; Autour; the gem popups;
the `terroir/data/` copy and the 24-column CSV. The locked kit `terroir/_assets/guide/*` is untouched. Rebuild, repeatably:

    python3 terroir/_rollout/review/Paris/extract_old.py           # research/cards_old.json + guide_text_old.txt
    python3 terroir/_rollout/review/Paris/make_plan.py             # picks.json + card_plan.json (the cut, as data)
    python3 terroir/_rollout/review/Paris/make_research_inputs.py  # the agents' inputs (research/*_input.json)
    python3 terroir/_rollout/review/Paris/make_inputs.py           # research/ + fixes.py -> cards.json, venues.json, lane_stories.json, hot_events.json
    python3 terroir/_rollout/review/Paris/build_gold6.py           # reads the old guide + chrome from origin/rebuild/publishing-system
    python3 terroir/_rollout/lib/gold6/facts_tidy.py terroir/Paris/index.html
    python3 terroir/_rollout/review/Paris/repetition_audit.py
    python3 terroir/_rollout/review/Paris/gate_config.py
    python3 terroir/_rollout/lib/gold6/readings/apply_readings.py terroir/Paris terroir/_rollout/review/Paris/Paris.readings.json --check-config terroir/_rollout/lib/guides/Paris.check.json

Hand prose: `prose.py` (lead, essay edits, the 1782 food-history fold, fold heads, lane leads, doors, gems, glossary, The Dish
rebuild) and `liste.py` (La liste); the editor's reconciliations on the research packs, each stated, are in `fixes.py`.
Render and probes use the test-only `pw-shim.cjs` (`NODE_OPTIONS=--require …/pw-shim.cjs`, leaflet@1.9.4 from the npm registry in
`lf/` via `npm pack leaflet@1.9.4`), because unpkg.com is blocked in the sandbox; the gate needs a Chrome path to exist
(`/usr/bin/chromium` → the Playwright chromium). The page itself is unchanged by either.

## Numbers
**Places 39 records → 32**, all in lanes: 11 lanes (grande 3 · petite 6 · street 2), none over 3, **no 4s**. Cut 7 (reasons in
`picks.json`): the two duplicate records (v-arpege, v-le-cinq-four-seasons-george-v), Le Cinq, Épicure and Pierre Gagnaire (the
three-star cap), Le Chateaubriand (its own record said "winding down"), Allard (the bistro cap).
**Fold cards: 111 old place/drink articles → 102**, every one rewritten and labelled (plus 11 hot-board and 9 calendar cards = 122
`.fcard`, 122 with facts); 47 card groups, none over 3. The 11 old dish articles are rebuilt clean inside La liste (the old ones
carried misplaced gem boxes). Two cards were written and then cut because the places are shut: the Musée Nissim de Camondo (closed
for works since 4 Aug 2024, reopening announced for early 2027) and La Station – Gare des Mines (closes after 31 Oct 2026 for about
three years).
**Guest list, rebuilt from venues kept, every one confirmed trading 16 Oct:** last minute Bouillon Chartier · Bouillon Pigalle ·
Clamato; this week Chez L'Ami Jean · Chez Georges · Parcelles; grand night L'Arpège · Plénitude · Kei. **Berths:** L'Arpège ·
Chez L'Ami Jean · L'As du Fallafel (Bistrot Paul Bert, the first petite pick, found no 2026-dated evidence: it stays in its lane).
New: craft (École Lesage, the couture embroiderer's evening class; the Paris-Ateliers gilding course and La Cuisine Paris, each
"missing: …"; the honest warning on the tower trinkets), the curiosities as 9 corrected cards, a listening room with an honest hi-fi
pair (Bambino, Notre Dame Music Bar) and three jazz rooms, Versailles and a merged Fontainebleau & Barbizon in Autour, the hot board
and calendar, 6 gem popups, a 53-term glossary. §8: One Night in 8 quarters, The Getaway Weekend in 15 stops.

## What the 16 Oct re-check corrected
- **The Marché des Enfants Rouges burned on the night of 11–12 October 2026** (Time Out Paris, AFP/Sud Radio, Paris Match: about
  1,000 m², 17 businesses lost, no reopening date). Its larder card is now a dated closure notice; no card sends anyone there to eat;
  Chez Alain Miam Miam's record now gives only the rue Charlot shop, unverified since the fire.
- **Bertrand Grébaut, Septime's chef and co-founder, died in early July 2026** (AFP, 4 July). Septime's and Clamato's records say so;
  no source yet names who leads the kitchen.
- **Table by Bruno Verjus closes after service on 22 December 2026** (Gault&Millau, Sortiraparis): status time_limited, said on the
  card, in the hot board and in the grand-night note.
- **Le Rigmarole lost its MICHELIN star in the 2023 guide** (Pudlowski's list of removals); the old text said "held in 2026".
- **Le Grand Véfour** reopened on 12 May 2026 and is rated 14/20 by Gault&Millau 2026 (the old text said unrated). **Guy Savoy**'s
  menu is about EUR 740 (Jan 2026), not 490. **Le Petit Vendôme**'s jambon-beurre is EUR 6.50 (AFP, Apr 2026).
- **The World's 50 Best 2026 list is not out** (4 Nov 2026, Lima): every rank printed is labelled 2025.
- **Colin Field left Bar Hemingway in 2023** (the old card had him there in 2026). The Lutetia is now run by Mandarin Oriental.
- **Buttes-Chaumont**: the island, the Temple de la Sibylle and the waterfalls are closed (unstable ground, paris.fr). **Guimard**:
  two glass-roofed pavilions survive, not one (Abbesses was moved from Hôtel de Ville in 1974). **Les Halles** did not leave "in one
  night": the 1969 move took days and the meat traders stayed to 1973. **The Catacombs** reopened 8 Apr 2026, EUR 31, timed booking.
  The Sainte-Chapelle's two-tier fare started mid-January 2026 and it is in the 1st, not the 4th. Montmartre's harvest festival
  (7–11 Oct 2026) is past tense. The Seine swimming sites are closed for the season.
- **TERROIR_CONFIG `portName:'Barcelona'`** → `'Paris'` (the kit appends it to every Maps link it makes). Venue Maps links now encode
  the apostrophe (`L'Arpège` broke the link for every parser of quoted attributes). The hub card's `csv:false` → `csv:true` (the
  guide now has its CSV; a one-flag hand edit of `terroir/index.html`, the hub builder was not run).
- Gem popups: the old "Saint-Honoré" gem fired on street names (rue du Faubourg Saint-Honoré) and is left out; the Opéra cake fires on
  "Dalloyau", not on "the Opéra" (which hit the Opéra Bastille).
- The essay drops figures it could not stand behind (the 2025 MICHELIN counts) and the Rungis "second-largest" line; the old banned
  words in two card texts are gone.
- Statuses: **23 confirmed 16 Oct, 8 unverified** (Le Rigmarole, Le Train Bleu, Le Servan, Clown Bar, Bistrot Paul Bert, La Crêperie
  de Josselin, Le Relais de l'Entrecôte, Chez Alain Miam Miam: nothing 2026-dated found, nothing against them except the market fire
  for the last; each card says so), **1 time-limited** (Table).

## Why NEEDS-NETWORK (exactly what remains — every one needs a normal network)
1. `python3 terroir/_rollout/lib/checklinks.py . Paris` — the proxy refuses every external host here.
2. Own-site hours, read and dated, for the guest list and berths: L'Arpège (Mon–Fri?), Plénitude (Tue–Sat dinner? 2026 prices), Kei
   (days, prices), Bouillon Chartier, Bouillon Pigalle (booking policy), Clamato (days), Chez L'Ami Jean (Tue–Sat?), Chez Georges
   (evening close), Parcelles (days), L'As du Fallafel (winter Friday close).
3. The 8 unverified tables — a 2026 sign of trading, or cut: Le Rigmarole, Le Train Bleu, Le Servan, Clown Bar, Bistrot Paul Bert,
   La Crêperie de Josselin, Le Relais de l'Entrecôte (Marbeuf reopening), Chez Alain Miam Miam (after the fire).
4. guide.michelin.com pages: Guy Savoy (two stars), Datil (star year, Green Star), Le Servan / Paul Bert / L'Ami Jean / Clamato /
   Mokonuts (Bib or plate); Wine Spectator 2026 for Vantre; theworlds50best.com after 4 Nov 2026.
5. Septime: who leads the kitchen since July 2026, service days and booking window.
6. Cards marked "check" in their facts: Poilâne (Sunday), Mori Yoshida, Pierre Hermé, Cédric Grolet, E. Dehillerin, Le Verre Volé,
   Septime La Cave, Bambino, Bar Hemingway, Le Bar du Bristol, Ten Belles (one directory shows it closed), the Mazarine, museum prices
   from listings (Rodin, Montmartre, Jacquemart-André, Garnier closing hour), École Lesage's price and 2026 dates, the Auvers house
   season, Provins' UNESCO year, Vaux-le-Vicomte's season end.
7. The hot board's single-source dates: the Champs-Élysées lights (22 Nov, reported), the Beaujolais cruise days, Paris Photo prices.
8. The rest of `research/verify_1.json` / `verify_2.json` / `hot_events.json` `_needs_network` (42 lines) and the card packs' `_notes`.
Commit the results as `research/verify_*_network_*.json`; the next run applies them through `fixes.py`, rebuilds, re-applies §8
(apply_readings refuses to run twice: rebuild first), flips to review.

## Not touched, flagged for Arnaud
`terroir/Paris/_prose_dump.txt` and `terroir/Paris/_venue_compare.txt` are old working files sitting in the published guide folder
(they are served live). Left as they were; worth deleting.
