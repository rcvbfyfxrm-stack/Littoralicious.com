# Bozcaada-NorthAegean → GOLD6 (the Prague standard) · nightly run 27 Oct 2026 · status NEEDS-NETWORK (everything else done)

Route B, the Lons/Beaune pipeline: the reading layer is assembled on the LIVE Siracusa-Sicilia chrome (itself cloned from live Prague),
from the old Bozcaada guide's own data and research. The old page was a **GOLD1/2-era tier inventory on the Cadaqués template**: 12 venue
records in flat tiers (tables, three wineries, a cocktail bar, a roaster and the market in one list), no lanes, no dishes, no GEMS and no
PHOTOS in data.js, no CSV; 24 tcards in 5 folds, several told two or three times (the castle a culture card and a ramparts walk; the Polente
lighthouse a culture card and a sunset walk; the Ayazma chapel a beach card, a culture card and a plane-tree walk); its footer carried
Cadaqués's coordinates and one card id a leading space. This pass brings the GOLD3/4/5 floor too: 4 table lanes in three groups, each opening
on a food story; `dishes[]` on every venue; the guest list with charters; the `#eat` jump line and **La liste** (17 items, The Dish inside it,
one-tap `.ics`) at the foot; the dated hot board with its `#why-now` pointer; the calendar; a month table (new); craft; the listening room;
Autour; the food-history fold ("1925 — A Greek cellar becomes the first Turkish winery"); three gem popups; the `terroir/data/` copy and the
24-column CSV. The hub card was hand-edited only to set `csv:true` (the gate's csv-flag rule) and to drop "pre-phylloxera" from its essence
(see corrections); the hub builder was not run. The locked kit `terroir/_assets/guide/*` is untouched. Rebuild, repeatably:

    python3 terroir/_rollout/review/Bozcaada-NorthAegean/extract_old.py           # research/cards_old.json + guide_text_old.txt
    python3 terroir/_rollout/review/Bozcaada-NorthAegean/make_plan.py             # picks.json + card_plan.json (berths/guest list from picks_lists.json)
    python3 terroir/_rollout/review/Bozcaada-NorthAegean/make_research_inputs.py  # the agents' inputs — only to re-run research
    python3 terroir/_rollout/review/Bozcaada-NorthAegean/make_inputs.py           # research/ + fixes.py -> cards.json, venues.json, lane_stories.json, hot_events.json
    python3 terroir/_rollout/review/Bozcaada-NorthAegean/build_gold6.py           # reads the old guide + chrome from origin/rebuild/publishing-system
    python3 terroir/_rollout/lib/gold6/facts_tidy.py terroir/Bozcaada-NorthAegean/index.html
    python3 terroir/_rollout/review/Bozcaada-NorthAegean/repetition_audit.py
    python3 terroir/_rollout/review/Bozcaada-NorthAegean/gate_config.py
    python3 terroir/_rollout/lib/gold6/readings/apply_readings.py terroir/Bozcaada-NorthAegean terroir/_rollout/review/Bozcaada-NorthAegean/Bozcaada-NorthAegean.readings.json --check-config terroir/_rollout/lib/guides/Bozcaada-NorthAegean.check.json

Hand prose: `prose.py` (hero, etymon, lead, essay, fold heads, doors, glossary, month-table head) and `liste.py` (La liste, The Dish, the
gems, the photos, lane leads, guest-list lines); the editor's reconciliations on the research packs, each stated, are in `fixes.py`.
Render and probes use the test-only `pw-shim.cjs` (`NODE_OPTIONS=--require …/pw-shim.cjs`, leaflet@1.9.4 from the npm registry in `lf/`,
git-ignored, via `npm pack leaflet@1.9.4`), because unpkg.com is blocked in the sandbox; the render gate also needs a Chrome at
/usr/bin/chromium (symlinked to the pre-installed Playwright Chromium). `card_shots.cjs` takes the two card screenshots (the Polente walk, opened).

## Numbers
**Places 12 → 10**, all in lanes, none over 3, **no 4s**: the meyhane tables (Asmalı Meyhane · Sandal · Nevreste) · ev yemeği (Dört
Hanımeli · Ada'm) · at the cellar door (Talay · Corvus · Amadeus MMX) · La Rue (the weekly market · Çiçek Pastanesi). Cut 2 (reasons in
`picks.json`): Bakkal (moved: a bar, it keeps a card in Boire & sortir) and Kahverengi Roastery (no Bozcaada branch found in any 2026 source;
its shops are in Çanakkale and Nişantaşı). **Fold cards: 24 old tcards → 48 written** in 13 folds + 9 hot-board + 6 calendar = **63 `.fcard`,
every one labelled**; 30 groups, none over 3. Map pins: 5 of 10 venues (five old pins dropped where the address moved); the old hand-placed
LANDMARKS (coordinates that disagreed with each other) are not carried.
**Guest list (27 Oct):** last minute Sandal · Ada'm; this week Dört Hanımeli · Talay; grand night Asmalı Meyhane · Nevreste — every line says
call first from November to April. **Berths:** Asmalı Meyhane · Talay · the weekly market (one per group).
Statuses: **all 10 unverified** (checked 27 Oct): every one still listed and reviewed, nothing says closed, but no 2026-dated source was
readable through search, and none publishes winter days.
§8: One Night in 4 places (the Rum quarter · the harbour under the castle · the wine shops · the western cape), The Getaway Weekend in
15 stops (Fri 3 / Sat 8 / Sun 4), the town as the base, on foot plus one taxi.

## What the 27 Oct re-check corrected
- **"A pre-phylloxera island" is unsupported**: no source for the louse reaching Bozcaada in the 1940s; the Ottoman record has it in Thrace
  from 1881 and Anatolia from 1885. The old funfact is gone, the essay says so, the curiosity card prints the dispute, the hub essence no longer claims it.
- **The harvest festival** (Bağbozumu) ran 14–23 August in 2026 (26th edition), not "the first week of September"; "since 1999" and "since the
  mid-1990s" both disagree with a 26th edition in 2026: kept as a dispute. The jazz festival (10th, 4–6 Sept 2026) is the September date.
- **Venues:** Nevreste's "TripAdvisor #1 of 89" removed (perishable rank); unsourced people removed (Aynur at Nevreste, Ahmet Bölük at Sandal,
  the teacher's family roles at Dört Hanımeli, "Tahir Usta's children" — Hürriyet names Şermin Günday); Sandal's "noon–2am" removed; Ada'm's
  "balık tantuni" in no source → enginarlı ahtapot; Asmalı Meyhane is on Çınar Çarşı Caddesi (not "Rum quarter"); Nevreste, Sandal, Ada'm on
  Alsancak Sokak 22/31/42; Talay's shop is Lale Sokak 5 (not Çınar Çeşme Sok.); Corvus is at Tuzburnu (not Alaybey) and its cellar visits have
  been summer-only; Amadeus: the family has been in Türkiye since the 1960s (not "late 1990s") and no "Mozart Wine Bar" was found → Amadeus MMX;
  Çiçek's "since 1959" not found and the island shop is described as the family's summer branch; the market is Wednesday in most sources,
  Friday in one, and has moved from the castle square (new site not confirmed); the Jancis Robinson 17/20 for Corpus 2004 could not be read.
- **Cards:** Tuzburnu is on the east side (not under the Polente light); Habbele is about 7 km from town (not "the closest cove"); tomato jam
  has no GI (the island's only one is the Çavuş grape, TÜRKPATENT no. 497, registered 2 June 2020); the castle's "Phoenician foundations"
  dropped (a 2023 dig found Late Bronze Age, Roman, Byzantine layers), ticket ₺50/₺30, Müzekart not accepted; Alaybey Camii and the
  Köprülü Mehmet Paşa mosque (c. 1657) are two buildings; the museum house is the 1876 Tulmidis house, collection installed 2006 (not "opened
  2005"); two windmills rebuilt plus one under way (not three); Polente lighthouse about 30 m (range claim dropped); Çayır hosted the IKA
  Formula Kite Europeans 23–28 June 2015; Troy Museum opened 10 Oct 2018; no ferry Bozcaada–Gökçeada (via Kabatepe); the ferry is hourly only
  in summer, winter timetable 5 sailings/day from 5 Oct 2026; GESTAŞ's site is gdu.com.tr; Vasilaki "grows nowhere else" softened; Kuntra =
  Karasakız; "ada mantısı fried before it is sauced" and mafiş found in no source: not printed.
- **Disputes kept:** the Greek community's numbers (curiosity card); Çamlıbağ's 1925 (its own history and a Bilkent study vs no third source);
  the 800,000-barrel export figure (local account only); the market's day.
- **Craft, honestly:** no Bozcaada workshop found names a maker on a class anyone can join; the lede says so. The closest is picking at the
  harvest; the women's cooperative (missing: a class) and the island's hand-woven cottons (missing: a weaver) follow.

## Why NEEDS-NETWORK (exactly what remains — every one needs a normal network)
1. `python3 terroir/_rollout/lib/checklinks.py . Bozcaada-NorthAegean` — the proxy refuses every external host here.
2. Liveness to move statuses from unverified to confirmed, and the winter question for every venue: Google Maps / Instagram / phone for
   Asmalı Meyhane, Sandal, Nevreste, Dört Hanımeli (also its address and pin), Ada'm, Çiçek Pastanesi (winter branch), Talay (Lale Sok. 5 winter
   hours, tasting price), Corvus (corvus.com.tr: visiting days, Wine & Bite), Amadeus MMX (visits), the weekly market (bozcaada.bel.tr: day, new
   site, winter running); the last-minute guest list needs hours read on the venues' own pages.
3. Pins to re-geocode from the addresses found: Nevreste (Alsancak Sk. 22), Ada'm (42), Sandal (31), Asmalı Meyhane (Çınar Çarşı Cd. 20,
   pin kept but unchecked), Talay (Lale Sk. 5), Corvus (Tuzburnu), Çiçek (Rum quarter); Akvaryum and Tuzburnu positions.
4. The rest of `research/*.json` `_needs_network`: gdu.com.tr winter timetable after 30 Nov and fares; the castle's and the museum's winter
   hours and 2026 prices; Troy and Assos 2026 prices and winter hours (muze.gov.tr); jancisrobinson.com/tastings/142218; Çamlıbağ's site and
   hours; Bakkal's address and season; the cooperative's address; bozcaadacazfestivali.com 2027; bozcaada.bel.tr 2027 Bağbozumu; Kimisis
   Theotokou service times (15 Aug, Easter 2027); Göztepe height; the wind farm's date; MICHELIN 2026 Türkiye (no Bozcaada entry expected).
Commit the results as `research/verify_*_network_*.json`; the next run applies them through `fixes.py` / the packs, rebuilds, re-applies §8
(apply_readings refuses to run twice: rebuild first), re-runs the gate and probes, and flips the guide to review.
