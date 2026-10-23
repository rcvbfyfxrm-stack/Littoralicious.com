# Split-Dalmatie → GOLD6 (the Prague standard) · nightly run 23 Oct 2026 · status NEEDS-NETWORK (everything else done)

Route B, the Dubrovnik/Cavalaire pipeline: the reading layer is assembled on the LIVE Siracusa-Sicilia chrome (itself cloned from live
Prague), from the old Split guide's own data and research. The old page was a **GOLD1-era tier inventory** (publish-terroir.py): 19 venue
records in flat tiers, half the text in French, no lanes, no dishes, no `terroir/data/` copy, 66 tcards in 12 folds (Marjan told four times,
Salona, Trogir, the Summer Festival, the film festival, Bačvice and Prošek twice each). This pass brings the GOLD3/4/5 floor too: 6 table
lanes in three groups, each opening on a food story; `dishes[]` on every table; the guest list with charters; the `#eat` jump line and
**La liste** (14 items, The Dish inside it, one-tap `.ics`) at the foot; the dated hot board with its `#why-now` pointer; the calendar; the
month table rewritten in English; craft; the listening room; the swims; Autour; the food-history fold (2001 — Zinfandel found in Kaštela);
three gem popups; the `terroir/data/` copy and the 24-column CSV. The hub was not touched and the hub builder was not run. The locked kit
`terroir/_assets/guide/*` is untouched. Rebuild, repeatably:

    python3 terroir/_rollout/review/Split-Dalmatie/extract_old.py           # research/cards_old.json + guide_text_old.txt
    python3 terroir/_rollout/review/Split-Dalmatie/make_plan.py             # picks.json + card_plan.json (the cut, as data; berths/guest list from picks_lists.json)
    python3 terroir/_rollout/review/Split-Dalmatie/make_research_inputs.py  # the agents' inputs (research/*_input.json) — only to re-run research
    python3 terroir/_rollout/review/Split-Dalmatie/make_inputs.py           # research/ + fixes.py -> cards.json, venues.json, lane_stories.json, hot_events.json
    python3 terroir/_rollout/review/Split-Dalmatie/build_gold6.py           # reads the old guide + chrome from origin/rebuild/publishing-system
    python3 terroir/_rollout/lib/gold6/facts_tidy.py terroir/Split-Dalmatie/index.html
    python3 terroir/_rollout/review/Split-Dalmatie/repetition_audit.py
    python3 terroir/_rollout/review/Split-Dalmatie/gate_config.py
    python3 terroir/_rollout/lib/gold6/readings/apply_readings.py terroir/Split-Dalmatie terroir/_rollout/review/Split-Dalmatie/Split-Dalmatie.readings.json --check-config terroir/_rollout/lib/guides/Split-Dalmatie.check.json

Hand prose: `prose.py` (hero, etymon, lead, essay, fold heads, lane leads, doors, guest-list lines, glossary) and `liste.py` (La liste,
The Dish, the gems); the editor's reconciliations on the research packs, each stated, are in `fixes.py`; Krug's record is the editor's own
(`research/verify_3_editor.json`). Render and probes use the test-only `pw-shim.cjs` (`NODE_OPTIONS=--require …/pw-shim.cjs`, leaflet@1.9.4
from the npm registry in `lf/`, git-ignored, via `npm pack leaflet@1.9.4`), because unpkg.com is blocked in the sandbox. `card_shots.cjs`
takes the two card screenshots (the Marjan walk, opened).

## Numbers
**Places 19 → 16**, all in lanes: 6 lanes (grande: the grand tables 3 · petite: Varoš konobas 3, in and around the palace 3, the new
bistros 2, where the city eats 2 · street: the two markets and the fishermen's buffet 3), none over 3, **no 4s**. Cut 5 (reasons in
`picks.json`): **Bajamonti** (a room for the square, not for the coast's cooking), **Paradox** (listed permanently closed on the re-check),
**Parasol** (trading as a natural-wine bar; the hi-fi system the old guide described could not be found — the listening card says so),
**D16 Coffee** and **Uje** (not tables: each keeps its own card, under Rooms to linger and the larder). Added 2, no coordinates invented:
**Kantun Paulina** (from the old guide's own street-food card) and **Krug** — the old guide said "Split has no Michelin star"; Krug won the
city's first in the 2025 guide (Gault&Millau 16.5/20 in its 2026 review).
**Fold cards: 66 old tcards → 56 written** in 13 folds + 9 hot-board + 8 calendar = **73 `.fcard`, 73 with labelled facts**; 34 groups,
none over 3. Merged as told once: Marjan (culture + walk + bench + south path → one walk), Salona (culture + walk), Trogir (culture + walk →
Autour), Bačvice (beach + dawn), the cathedral and the bell-tower climb, Prošek (drink + avoid), the festivals (music + events → calendar);
Advent kept once (its hot card dropped for the calendar card). Cut for the cap or the re-check: the hotel cards, Grgić Vina (three hours
south), the Trogir market, Pag salt merged with the cheese, the Kotor procession (another country), the burger/ethnic honest-empty folds.
New: 4 quarter cards, 5 curiosities, 2 swims, 4 craft cards (Kameni otok, Postira, Brač — hands-on stone carving — the one to do), the honest
'no confirmed hi-fi bar' card, three Split voices, Omiš and the Cetina, 5 follow cards, the cruise-day and photo-menu warnings.
**Guest list, rebuilt from venues kept (23 Oct):** last minute Villa Spiza (all year on winter hours, walk-in, cash) · Konoba Fetivi
(MICHELIN-selected 2026); this week Zinfandel (MICHELIN 2026) · Bokeria (Gault&Millau 2026); grand night ZOI (G&M 17/20) · Krug (star 2025) —
neither publishes a winter schedule, said on the list. **Berths:** ZOI · Villa Spiza · Buffet Fife (one per group, each confirmed 2026).
§8: One Night in 5 quarters (the palace · Veli Varoš · the Riva and the harbour front · the centre, Marulićeva to Marmontova · Bačvice and
Firule), The Getaway Weekend in 14 stops (Friday the Riva and ZOI; Saturday the palace at dawn, the Pazar, the Ribarnica, the substructures,
the cathedral, Villa Spiza, Marjan, Krug; Sunday D16, Meštrović, Buffet Fife, Bačvice).

## What the 23 Oct re-check corrected
- **Venues:** ZOI is on the Riva (Obala HNP 23, in the palace's south wall), not in Veli Varoš — pin dropped; the "Michelin Plate" is retired
  (ZOI, Fetivi = MICHELIN-selected 2026); Split has a star (Krug, 2025); Šug is at Tolstojeva 1a (the old address was Apetit's), a small
  €€€ stone room, no longer a Bib — moved from the grand tables to the bistros; Dvor has no star and historically a winter break; Bokeria
  is beside the fish hall, outside the walls; Villa Spiza is at Kružićeva 3 (pin dropped), cash only, no bookings; the Ribarnica is at Kraj
  Sv. Marije off Marmontova (pin dropped), the '1890 hall' unconfirmed; Zinfandel trades as Zinfandel Food & Wine Bistro, in the MICHELIN
  Guide 2026; Kantun Paulina serves ćevapi in lepinja with ajvar (not somun and kajmak), by small/medium/large, cash only; Fetivi's 'three
  generations', Apetit's 'since 1981', Šperun's 'since 1995' and Matejuška's '19th-century house' and octopus peka unfound and dropped; no kept
  table re-confirmed a peka on its 2026 menu (La liste and the warning card say so). 4 of 16 stay `unverified` (Konoba Matejuška, Kantun
  Paulina, the Pazar, the Ribarnica — none a berth or on the guest list; each card says call or look in).
- **Cards:** Grgur Ninski's luck is in his big toe (not the thumb); the substructures were Daenerys's dragon vaults in season 4 (not
  'episodes 8–10'); picigin protected 2013 (not 2020); the White House is Aquia Creek sandstone — the Brač claim is a dispute; Domnius was
  executed at Salona, not in the palace; the bell tower is about 57 m, restored 1890–1908; Marjan is 178 m high and about 340 ha (the old text
  mixed the two); the Peristyle columns' 'temple of Hatshepsut' origin dropped; Stina's cellar is the 1903 co-op building on the Bol riva, not
  'carved into stone'; Uje's tastings are at the oil bar on Dominisova 3; D16 is at Dominisova 16 (not Dosud 9); Paški sir matures at least
  60 days (not six months), EU PDO 2019; soparnik EU PGI 2016; Pag salt dated to a will of 999 (not 'oldest salt works'); the Brač ferry is
  about 50 minutes; Pošip protected 1967; Maraska founded 1945 (not 1899); Plavac Mali is Zinfandel's offspring (with Dobričić), not its
  ancestor; the Kaštela discovery date (2000 or 2001) and the vine count are disputes; Daleka obala founded 1985; Oliver Dragojević's
  birthplace a dispute; the 'bulk Macedonian' house wine and the 'sous-vide' pašticada claims dropped; the Kotor procession dropped; prices
  re-dated (Archaeological Museum €8, Meštrović €12, Salona €8, Klis about €12).

## Why NEEDS-NETWORK (exactly what remains — every one needs a normal network)
1. `python3 terroir/_rollout/lib/checklinks.py . Split-Dalmatie` — the proxy refuses every external host here.
2. Own-site / MICHELIN pages for the guest list and berths: zoi.hr (winter schedule, street number 23 or 3), Krug (2026 MICHELIN star
   retained? hours, winter), guide.michelin.com Croatia 2026 (ZOI, Šug, Dvor, Fetivi, Zinfandel award line and hours), Villa Spiza's
   social pages (winter hours), Buffet Fife (winter hours), Konoba Fetivi (closing day), Bokeria (hours).
3. The 4 unverified places — Konoba Matejuška, Kantun Paulina, the Pazar and Ribarnica hours (City of Split market pages): confirm or cut;
   Paradox's closure date; Dvor's 2026–27 winter break; Konoba Marjan's winter opening.
4. The rest of `research/verify_*.json` `_needs_network` and `research/hot_events.json` (official Advent 2026 dates, HNK Split's
   November programme, Hajduk kick-off times, Jadrolinija winter timetables to Hvar/Vis, November cruise calls, Omiš/Ultra/Summer Festival
   2027 dates).
Commit the results as `research/verify_*_network_*.json`; the next run applies them through `fixes.py`, rebuilds, re-applies §8
(apply_readings refuses to run twice: rebuild first), flips to review.
