# beaune-bourgogne → GOLD6 (the Prague standard) · nightly run 25 Oct 2026 · status NEEDS-NETWORK (everything else done)

Route B, the Faro/Split pipeline: the reading layer is assembled on the LIVE Siracusa-Sicilia chrome (itself cloned from live Prague),
from the old Beaune guide's own data and research. The old page was a **GOLD1-era tier inventory** (publish-terroir.py): 16 venue records in
flat tiers, no lanes, no dishes, no `terroir/data/` copy, 68 tcards in 12 folds (the ramparts told four times; the Bouzaize park three; the
Saturday market four; Raillard's jambon persillé three; the opera festival and Rootstock twice each). This pass brings the GOLD3/4/5 floor too:
4 table lanes in three groups, each opening on a food story; `dishes[]` on every table; the guest list with charters; the `#eat` jump line and
**La liste** (14 items, The Dish inside it, one-tap `.ics`) at the foot; the dated hot board with its `#why-now` pointer; the calendar; the month
table rewritten; craft; the listening room; Autour; the food-history fold (1859 — the Hospices auction); three gem popups; the `terroir/data/`
copy and the 24-column CSV. The hub was not touched and the hub builder was not run. The locked kit `terroir/_assets/guide/*` is untouched.
Rebuild, repeatably:

    python3 terroir/_rollout/review/beaune-bourgogne/extract_old.py           # research/cards_old.json + guide_text_old.txt
    python3 terroir/_rollout/review/beaune-bourgogne/make_plan.py             # picks.json + card_plan.json (the cut, as data; berths/guest list from picks_lists.json)
    python3 terroir/_rollout/review/beaune-bourgogne/make_research_inputs.py  # the agents' inputs (research/*_input.json) — only to re-run research
    python3 terroir/_rollout/review/beaune-bourgogne/make_inputs.py           # research/ + fixes.py -> cards.json, venues.json, lane_stories.json, hot_events.json
    python3 terroir/_rollout/review/beaune-bourgogne/build_gold6.py           # reads the old guide + chrome from origin/rebuild/publishing-system
    python3 terroir/_rollout/lib/gold6/facts_tidy.py terroir/beaune-bourgogne/index.html
    python3 terroir/_rollout/review/beaune-bourgogne/repetition_audit.py
    python3 terroir/_rollout/review/beaune-bourgogne/gate_config.py
    python3 terroir/_rollout/lib/gold6/readings/apply_readings.py terroir/beaune-bourgogne terroir/_rollout/review/beaune-bourgogne/beaune-bourgogne.readings.json --check-config terroir/_rollout/lib/guides/beaune-bourgogne.check.json

Hand prose: `prose.py` (hero, etymon, lead, essay, fold heads, lane leads, doors, guest-list lines, glossary) and `liste.py` (La liste, The Dish,
the gems); the editor's reconciliations on the research packs, each stated, are in `fixes.py`. Render and probes use the test-only `pw-shim.cjs`
(`NODE_OPTIONS=--require …/pw-shim.cjs`, leaflet@1.9.4 from the npm registry in `lf/`, git-ignored, via `npm pack leaflet@1.9.4`), because unpkg.com
is blocked in the sandbox; `checks_gold4.py` only needs a file at `/usr/bin/chromium` to enter its render stage (it renders through `cdp.py` →
Playwright). `card_shots.cjs` takes the two card screenshots (the ramparts walk, opened).

## Numbers
**Places 16 → 12**, all in lanes: 4 lanes (grande: the serious dinners 3 · petite: the bouchons 3, the wine rooms 3 · street: market, charcutier,
pâtissier 3), none over 3, **no 4s**. Cut 5 (reasons in `picks.json`): **Le Bistro de l'Hôtel** and **Loiseau des Vignes** (cap), and the
**Marché aux Vins**, **Bouchard Père & Fils** and **Patriarche** (not tables: each keeps its own cellar card at the glass). Added 1, no coordinates
invented: **Charcuterie Raillard** (from the old guide's own producer, street-food and eat cards).
**Fold cards: 68 old tcards → 61 written** in 12 folds + 12 hot-board + 7 calendar = **80 `.fcard`, every one labelled**; 33 groups, none over 3.
**Guest list, rebuilt from venues kept (25 Oct):** last minute Le Bistrot Bourguignon · Caves Madeleine; this week La Table du Square · Bissoh;
grand night Le Carmin · Clos du Cèdre. **Berths:** Le Carmin · Le Bistrot Bourguignon · the Saturday market (one per group, each confirmed 2026).
Statuses: 8 confirmed 25 Oct, 4 unverified (Ma Cuisine — MICHELIN shows 'temporarily closed'; Enstase; Charcuterie Raillard; Pâtisserie Fabien
Berteau), none of them a berth or on the guest list. §8: One Night in 5 quarters (Place Carnot · the cellar streets · the Faubourg Madeleine · Place
Monge · the ramparts and the boulevard), The Getaway Weekend in 12 stops (Fri 2 / Sat 6 / Sun 4), all on foot, built round the closing days
(most tables shut Sunday and Monday) and steering clear of the 13–16 November auction weekend.

## What the 25 Oct re-check corrected
- **Venues:** Ma Cuisine's 'reopened February 2026' not found; it now cooks sharing plates (Gault&Millau 2026) and MICHELIN shows it temporarily
  closed — kept in its lane, unverified, off the guest list. Bissoh 45–63 € (not 60–110); Clos du Cèdre 95–190 €, lunch at weekends; Le Bistrot
  Bourguignon about 45 € (the 33 € menu not re-seen); La Table du Square 27–37 €, about 800 wines (not 1,000+), a 66 € late-cancellation charge
  reported. The Saturday market 08:00–12:00 by the tourist office (not 07:00–13:00), '180 stalls' not re-seen. Caves Madeleine serves lunch too
  (closed Wed and Sun), chef Martial Blanchon. Le Comptoir des Tontons may now be mainly a shop (co-founder Richard Grocat died in 2021; Pépita Del
  Rosario runs it). Enstase's chef name and 'all day' hours unsupported. Raillard's gougères not re-seen; its only hours are from 2018.
- **Cards:** the Salle des Pôvres is about 50 m, not 72 m; Monge was Navy minister of the Republic (1792–93), not Napoleon's; the 1395 ban was on
  Gamay; the DNA paper names 'Pinot' as the parent; the Last Judgment is fifteen paintings on nine panels; the Collégiale tapestries are free and
  close for the year on 31 Oct; the Musée des Beaux-Arts reopened 19 Sep 2026; the Musée du Vin is listed closed (card says check first); the
  Marey 'originals' claim dropped; Drouhin owns about 14 of the Clos des Mouches' 25 ha (not all of it); the Marché aux Vins' five-wine route is
  29 € (not 25 €); Cassis de Dijon's rules date from 2013; the Marc 'AOC 1942, oldest in France' dropped; the ramparts are not a continuous
  wall-top loop; Meursault walk returns by TER; the Dijon Halles not Eiffel's; Fallot's tonnage figures dropped; Rootstock 2026 unsupported
  (dropped from the calendar); the auction weekend is 13–16 Nov (not 14–16); the 2025 charity barrel's 'Chinese buyer' unsupported; the first
  gift of vines 1457 or 1459 (a dispute); 'Bouzaize' spelled as the tourist office does.

## Why NEEDS-NETWORK (exactly what remains — every one needs a normal network)
1. `python3 terroir/_rollout/lib/checklinks.py . beaune-bourgogne` — the proxy refuses every external host here.
2. Own-site / MICHELIN pages: guide.michelin.com Beaune 2026 (the two stars, the Bib for La Table du Square, Bissoh's listing); Ma Cuisine (trading
   in Nov 2026?); Le Carmin and cedrebeaune.com (Christmas/January closes, Clos du Cèdre's Monday/Tuesday); Bissoh, Le Bistrot Bourguignon, La
   Table du Square, Caves Madeleine (days, holiday closes, auction-weekend availability).
3. The unverified and soft records: Enstase (enstase.fr, 2026 trading, kitchen nights), Le Comptoir des Tontons (table service in 2026), Charcuterie
   Raillard (2026 hours, phone), Pâtisserie Fabien Berteau (2026 activity), the Saturday market on 14 Nov 2026 (does it move for the auction set-up?),
   Bouchard Père & Fils (2026 visit formats and prices; the domain bouchard-pereetfils.com), the Athenaeum's hours and site, Mulot & Petitjean's
   Beaune hours, the Cîteaux abbey shop.
4. The rest of `research/verify_*.json`, `research/rewrite_*.json` and `research/hot_events.json` `_needs_network` (fetedesgrandsvins.fr 2026
   prices, the Festivinales programme, official Hôtel-Dieu November hours, the Cité des Climats full price, Christmas market dates, the 2026 vintage
   report, 2027 festival dates).
Commit the results as `research/verify_*_network_*.json`; the next run applies them through `fixes.py`, rebuilds, re-applies §8
(apply_readings refuses to run twice: rebuild first), flips to review.
