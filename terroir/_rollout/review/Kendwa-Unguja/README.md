# Kendwa-Unguja → GOLD6 (the Prague standard) · nightly run 7 Oct 2026 · status PARTIAL

Route B: the reading layer is assembled on the LIVE Siracusa-Sicilia chrome (itself cloned from live Prague).
The locked kit `terroir/_assets/guide/*` is untouched. Rebuild from scratch, repeatably:

    python3 terroir/_rollout/review/Kendwa-Unguja/make_inputs.py   # research/ + editor fixes -> cards.json, venues.json, hot_events.json
    python3 terroir/_rollout/review/Kendwa-Unguja/build_gold6.py   # reads the old guide + chrome from origin/rebuild/publishing-system
    python3 terroir/_rollout/lib/gold6/facts_tidy.py terroir/Kendwa-Unguja/index.html
    python3 terroir/_rollout/review/Kendwa-Unguja/repetition_audit.py

## Files
- `picks.json` — the cut: 12 lanes, every one ≤3 (no 4s needed); 21 venues cut, each with its reason; berths; the guest list.
- `card_plan.json` — every fold card, the old cards it was built from (merges = told once).
- `cards.json` / `venues.json` / `hot_events.json` — the rewritten cards, re-verified venues, the dated board + calendar + listening finding.
- `prose.py` — lead, essay fold, fold heads, doors, charters, exact edits to the reused prose blocks.
- `glossary.json` — the hover glossary (73 Swahili / local terms).
- `research/` — the raw verification and rewrite packs (7 Oct 2026), with every correction and source.
- `kendwa-card-desktop.png`, `kendwa-card-phone.png` — one opened card.

## Numbers
Venues 73 → 52 (lane venues 52 → 34 in 14 → 12 lanes; map-only places 21 → 18). Fold cards 127 → 99, all labelled.
Lanes: ethnic merged into the Italian lane (Hanoi House), fast-food cut (all three unverified and miscast).

## What the 7 Oct re-check corrected
Sexy Fish: no sushi (tuna ceviche, lobster tempura) · Mnemba: two fee zones since 1 Sep 2025 (US$10 / US$25), not a flat US$10 ·
Leven Bank: "walls past 160 m" disputed (sources: top ~14 m, dived to ~50 m) — printed as a dispute · House of Wonders: a partial
collapse on 25 Dec 2020, not "lost its roof"; still closed, pin removed · Z rooftop minimum US$15 not ~US$20 · Makofi: weekly BBQ,
US$25/20; the "booking closes 13:00" claim unconfirmed and dropped · Passion & Thyme is a French bakery-deli, not a salad room ·
Zuri: "MICHELIN Guide" tag and "Maisha set menu" unconfirmed, dropped · Kilindi "waterfall bar" and "since 2018" dropped ·
Mama Mia: expensive, not "low" · Flame Tree: on the beach facing west (the "no view" caveat was wrong) · Machnoo charter carried
Combo 1990's facts (seven tables, closed Mondays) — fixed; Monday line in "The week" now names Combo 1990 ·
Hanoi House not halal (pork) · Essence's Indian premise contradicted (cut) · DoubleTree renamed (cut) ·
Tumbatu ruin dates disputed (1100–1300 vs 12th–15th c.) — printed as a dispute · Mangapwani distance disputed — printed ·
Emerson on Hurumzi: taarab "most evenings", not nightly · Full Moon Party rule: venue's "first Saturday after" kept, the
"Saturday nearest" listings printed as a caveat · Sauti za Busara 2027 moved to 19–21 March · Mnarani release date 20 Feb.

## Why PARTIAL (exactly what remains)
The sandbox egress proxy refused every external host (venue sites, MICHELIN-class guides, Wikipedia, timeanddate): research ran
on WebSearch result extracts only. So:
1. `checklinks.py . Kendwa-Unguja` could not run meaningfully (0 of 252 links reachable: 000 everywhere). Run it from a normal
   network; fix/archival-link anything DEAD.
2. Own-site liveness: 17 venues were re-confirmed 7 Oct from 2026-dated evidence; 27 keep their 22 Aug confirmation (nothing
   contradicts them, own sites unreadable); 8 stay unverified. Re-read the own sites, and read the hours of the three
   last-minute venues (Sexy Fish, Maisha Beach, Langi Langi) on their own sites, dated, for the guest list.
3. Confirm on kendwarocks.com: the party rule and the Oct/Nov dates (derived: Sat 31 Oct, Sat 28 Nov).
4. Confirm the craft sites still resolve (world-unite.de course page, kuzacave.com, mwanizanzibar.com) and Yasa/Hanoi/Makofi web.
5. Resolve the desk link-probe reproducibility issue (see Checks).
Then flip state to `review`.

## Checks (7 Oct 2026, local, Python http.server on an ephemeral port)
- checks_gold4.py WITH render: ALL CHECKS GREEN (201 OK). Render via Playwright with a test-only route shim serving the identical
  leaflet@1.9.4 dist from the npm registry (unpkg.com is blocked here) — the page itself is unchanged.
- probe-guide.cjs: 28/29 PASS. The one FAIL ("sub-tag restaurants … opened") fails identically on live Prague and Siracusa: the
  chrome deliberately never auto-opens #tables (the 4 Oct "closed #tables names its groups" fix). Probe expectation is stale.
- probe-links.cjs phone: 178 links, 0 failures. Desk: 192 links, 0 landing failures, but 9 links listed once were not
  reproducible after the probe's hash-only reload (stock probe crashes on these); live Siracusa is 109/0 — open, cause not pinned.
- Fixed: map popups no longer link 'Read full entry' to the 18 map-only places; Leaflet's '#close' anchor neutralised (page-local).
- repetition audit: 0 exact repeats, 0 shingle pairs ≥12 (232 units).
- checklinks.py: NOT RUNNABLE here (see above).
