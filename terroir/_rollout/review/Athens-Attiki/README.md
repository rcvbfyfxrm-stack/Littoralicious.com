# Athens-Attiki → GOLD6 (the Prague standard) · nightly run 13 Oct 2026 · status NEEDS-NETWORK (everything else done)

Route B: the reading layer is assembled on the LIVE Siracusa-Sicilia chrome (itself cloned from live Prague), from the GOLD3
Athens guide's own data and research. The old page was GOLD3, so this pass also brings the GOLD4/GOLD5 floor it never had:
11 table lanes in three groups (Grandes · Petites · La Rue), each opening on a food story; the guest list (BRIDGE) with
charters; the `#eat` jump line and **La liste** (21 items, The Dish inside it, one-tap `.ics`) at the foot; the dated hot
board with its `#why-now` pointer; the calendar; a craft section ("Do this one" / what each is missing); the listening room;
Autour. The locked kit `terroir/_assets/guide/*` is untouched. Rebuild, repeatably:

    python3 terroir/_rollout/review/Athens-Attiki/make_plan.py             # picks.json + card_plan.json (the cut, as data)
    python3 terroir/_rollout/review/Athens-Attiki/make_research_inputs.py  # the agents' inputs (research/*_input.json)
    python3 terroir/_rollout/review/Athens-Attiki/make_inputs.py           # research/ + fixes.py -> cards.json, venues.json, hot_events.json
    python3 terroir/_rollout/review/Athens-Attiki/build_gold6.py           # reads the old guide + chrome from origin/rebuild/publishing-system
    python3 terroir/_rollout/lib/gold6/facts_tidy.py terroir/Athens-Attiki/index.html
    python3 terroir/_rollout/review/Athens-Attiki/repetition_audit.py
    python3 terroir/_rollout/review/Athens-Attiki/gate_config.py           # the check config, from what the page contains
    python3 terroir/_rollout/lib/gold6/readings/apply_readings.py terroir/Athens-Attiki terroir/_rollout/review/Athens-Attiki/Athens-Attiki.readings.json --check-config terroir/_rollout/lib/guides/Athens-Attiki.check.json

(`extract_old.py` dumps the old cards to `research/cards_old.json`. Render and probes here use the test-only `pw-shim.cjs`
(`NODE_OPTIONS=--require …/pw-shim.cjs`): the identical leaflet@1.9.4 from the npm registry, because unpkg.com is blocked in
the sandbox; put the package in `lf/` with `npm pack leaflet@1.9.4`. The page itself is unchanged.)

## Files
- `make_plan.py` → `picks.json` (11 lanes, every one ≤3, no 4s; 3 tables cut, each with its reason; berths; the guest list) and
  `card_plan.json` (every fold card and the old card it is built from).
- `research/` — the old cards, the four rewrite packs (`rewrite_1..4.json`), the two venue re-verification packs (`verify_1..2.json`, with
  `_needs_network`), the hot board / calendar / seasonal checks (`hot_events.json`), all 13 Oct 2026. Briefs: `BRIEF.md`, `VENUE_BRIEF.md`.
- `fixes.py` — the editor's reconciliations (local Maps token on every query).
- `prose.py` — hero, etymon, lead, essay fold, fold heads, group lines, the 11 lane stories, doors, guest-list subs, La liste, gem popups, the glossary, exact edits to reused blocks.
- `Athens-Attiki.readings.json` — §8, applied last.
- `athens-card-desktop.png`, `athens-card-phone.png` — one opened card; `desk-*.png`, `phone-*.png` — the two lenses.

## Numbers
Places 36 → 33 (all in lanes; 11 lanes, none over 3, **no 4s**). Cards 68 → 100 (old: 52 fold cards + 16 bar and music articles; the 10 dish
stories stay, inside La liste), every card labelled: 80 fold cards + 11 on the dated hot board + 9 calendar dates. 43 card groups, none over 3.
**Cut:** CTC Urban Gastronomy and Makris Athens (the stars lane holds three: Delta, Spondi, Soil), O Makis (late-night lane: Peristeri is a long taxi from every quarter).
**Guest list, rebuilt from venues confirmed on 13 Oct:** last minute Akra · Skalakia · Feyrouz; this week Vezené · Pharaoh · Nolan; grand night Delta · Spondi · GB Roof Garden.
**Berths:** Delta · Oinomageireio I Ipeiros · Akra (the old Diporto and Karamanlidika berths are unverified for 2026, so they stay in their lanes, off the berths).
Card merges (told once): Tsitsanis + Bellou into one song card; the coffee-gardens and work folds into one "Rooms to linger & work"; the drink prose into three "Ask for it by name" cards; the music prose into the listening fold; history into the essay fold.

## What the 13 Oct re-check corrected
- **MICHELIN:** there has been no Greek selection since Athens 2024; the 2026/27 Greece selection is due **20 Oct 2026**. Every "held into 2026" chip (Nolan, Akra, Pharaoh) now says 2024; the Getaway says so in words.
- **World's 50 Best Bars 2026** (Milan, 7 Oct): Line No.5, The Bar in Front of the Bar No.19, Barro Negro No.40 — added. Baba au Rum is not in the 2026 world top 50: "re-earns its world ranking every year" removed.
- **Kerameikos** reopened 15 Sept 2026 after closing in May 2025; the Acropolis combined ticket the old card relied on was abolished in April 2025.
- **Herodeon:** closed after the 2026 season for about three years (2029 reported, not official).
- **Karamanlides** printed Turkish in the Greek alphabet (the old text had it backwards). **Mokka** dates from 1923, not 1922.
- **Cycladic Art:** the Jeff Koons show ended 31 Aug 2026. **Akti Vouliagmenis:** €10/15 is the entry, not a sunbed. **Edem:** tram 6 from Syntagma, one line.
- **GB Roof Garden:** breakfast is for hotel guests; the public room opens 13:00. **Mavros Gatos** has been renovated (the "unchanged formica" line was wrong).
- **Klimataria** music nights: Tue–Sun in the old music text, Wed–Sat in the record, other days on its own site: every card now says call.
- **Epirus:** the "round the clock Fri–Sat, Oct–Easter" claim conflicts with market hours under the 2023 owner: printed as a dispute, call.
- Unverified claims dropped rather than repeated: "Europe's biggest fish hall", the FT ranking of the laiki, Yusurum, the endemic fish at the lake, Athinaikon (not confirmed trading).
- Statuses: **21 confirmed 13 Oct, 12 unverified** (nothing 2026-dated found, nothing against them): Sushimou, Seychelles, Mavros Gatos, To Steki tou Ilia, Ta Karamanlidika tou Fani, Miran, Peran, Diporto, Klimataria, Taverna tou Oikonomou, Marili, Ariston. Peran was barely findable (one directory entry); Marili's address is disputed three ways (printed).
- Hub card: `csv:false` → `csv:true` (the guide has always shipped a CSV; the gate's flag check).

## Why NEEDS-NETWORK (exactly what remains — every one needs a normal network)
1. `python3 terroir/_rollout/lib/checklinks.py . Athens-Attiki` — the proxy refuses every external host here. Unlink/archive anything dead.
2. **MICHELIN Greece on/after 20 Oct 2026**: Delta, Spondi, Soil, Akra, Pharaoh, Nolan, GB Roof Garden, Vezené, and any new entry — update chips and the Getaway line.
3. **The 12 unverified tables** (list above): a 2026 sign of trading, or cut. Peran first (existence), then Marili (address), Ariston, Diporto.
4. Own-site hours, read and dated, for the guest list: Akra, Skalakia, Feyrouz (21:30 vs 23:30, Sunday), Vezené (Sunday), Delta (18:30 vs 19:00), Nolan, Pharaoh.
5. The rest of `research/verify_1.json` and `verify_2.json` `_needs_network`, and the rewrite packs' `_notes` (Sounion 2026 fee, Kaisariani day off, Taf Coffee 2026, Benaki closing day, Byzantine Museum hours, laikesagores.gr official status).
Commit the results as `research/verify_*_network_*.json`; the next run applies them through `fixes.py`, rebuilds, re-applies §8, flips to review.
