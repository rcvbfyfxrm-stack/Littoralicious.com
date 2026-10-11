# Diani-Kwale → GOLD6 (the Prague standard) · nightly run 11 Oct 2026 · status NEEDS-NETWORK (everything else done)

Route B: the reading layer is assembled on the LIVE Siracusa-Sicilia chrome (itself cloned from live Prague), from the
GOLD5 Diani guide's own data and research. The locked kit `terroir/_assets/guide/*` is untouched. Rebuild, repeatably:

    python3 terroir/_rollout/review/Diani-Kwale/make_plan.py      # picks.json + card_plan.json (the cut, as data)
    python3 terroir/_rollout/review/Diani-Kwale/make_inputs.py    # research/ + fixes.py -> cards.json, venues.json, hot_events.json
    python3 terroir/_rollout/review/Diani-Kwale/build_gold6.py    # reads the old guide + chrome from origin/rebuild/publishing-system
    python3 terroir/_rollout/lib/gold6/facts_tidy.py terroir/Diani-Kwale/index.html
    python3 terroir/_rollout/review/Diani-Kwale/repetition_audit.py
    python3 terroir/_rollout/lib/gold6/readings/apply_readings.py terroir/Diani-Kwale terroir/_rollout/review/Diani-Kwale/Diani-Kwale.readings.json --check-config terroir/_rollout/lib/guides/Diani-Kwale.check.json

(`extract_old.py` dumps the old fold cards to `research/cards_old.json`. Render and probes here use the test-only
`pw-shim.cjs`: the identical leaflet@1.9.4 from the npm registry, because unpkg.com is blocked in the sandbox; put the
package in `lf/` with `npm pack leaflet@1.9.4`. The page itself is unchanged.)

## Files
- `make_plan.py` → `picks.json` (12 lanes, every one ≤3, no 4s; 16 places cut, each with its reason; berths; the guest list) and
  `card_plan.json` (every fold card and the old cards it is built from: merges = told once).
- `research/` — the old cards, the rewrite packs (`rewrite_1..3.json`), the re-verification packs (`verify_1..2.json`, with
  `_needs_network`), the hot board/calendar/listening pack and the glossary, all 11 Oct 2026. Briefs: `BRIEF.md`, `VENUE_BRIEF.md`.
- `fixes.py` — the editor's reconciliations between packs (Kaya Kinondo fee, Coral Spirit price, the clubs, told-once rewrites).
- `prose.py` — lead, essay fold, fold heads, lane stories, doors, guest-list lines, exact edits to the reused prose blocks.
- `glossary.json` — the hover glossary (80 Swahili / coast words, each confirmed to occur in the guide).
- `Diani-Kwale.readings.json` — §8, applied last.
- `diani-card-desktop.png`, `diani-card-phone.png` — one opened card (Kaya Kinondo); `desk-*.png`, `phone-*.png` — the two lenses.

## Checks (11 Oct 2026, local http.server on an ephemeral port)
gate WITH render ALL CHECKS GREEN (189 OK) · probe-guide 29/29 PASS · probe-links desk 112/0, phone 112/0 · probe-readings ALL PASS
(73/73 placed cards, 31/31 venues with Maps closed; One Night 19 links, Getaway 21) · repetition 0/0 over 247 units · checklinks.py not runnable here.

## Numbers
Places 74 → 58 (lane venues 41 → 31 in 14 → 12 lanes; map-only places 33 → 27). Fold cards 135 → 111, every one labelled
(91 fold cards + 11 on the dated hot board + 8 calendar dates + the listening finding).
Lanes dropped: fast-food (Pallet Cafe → breakfast, Funky Monkey → where the residents eat). Cut: Waterlovers, Non Solo Gelato,
Msambweni Beach House, Ibiza Market, Coast Dishes, Java House, Soul Breeze, Shan-e-Punjab, Tandoori, Full Moon, Go Jump,
Gazi boardwalk, Chale boardwalk, camel rides, **Shakatak (closed)**, **Tiki Bar (Tripadvisor: closed)**.

## What the 11 Oct re-check corrected
Shakatak closed (Tripadvisor; May 2026 reviews: shut for years) — cut · Tiki Bar listed CLOSED, nothing newer than 2024 — cut,
its last-minute guest slot rebuilt with Havana · Aniello's re-confirmed (Mar 2026 review) · Shashin-Ka's Monday closing disputed
(week table and guest list now say call) · Kokkos and The 41 hours conflict between own sites and listings (printed as "call") ·
Manyatta now trades as Manyatta Resort & Disco Lounge (still unverified) · Kisite: the "KES 1,000 dhow levy" is read differently
by the two re-checks — not printed · the 785 lb marlin was not a "Kenya record" (1,197 lb off Malindi) — now a dispute · the
"Mathews hunted the slaver to Wete" claim has no source (the 1881 accounts say the dhow escaped) — a dispute · Crab wreck depth
~30 m · Kentaste: founding year and "30,000 nuts a day" unsourced, dropped; "Fair for Life", not Fairtrade · Mikoko Pamoja
carbon sales launched 2013 (not 2010) · Ukunda runway extended (~1.2 km + ~200 m) · Two Fishes: one of the ten majors until
the 1990s · Kaya Kinondo fee KES 2,000 non-resident incl. guide (2026 listing) · Coral Spirit USD 35 own page, "sold out"
store claim removed · Shimba Hills USD 50 (KWS) · Shimoni port KSh 2.7bn (The Star, Feb 2026), still awaiting an operator ·
the hot board replaced (it was stale since 1 Oct): whale sharks early, no kite wind till mid-December, full moons 26 Oct /
24 Nov, short rains above average, Mashujaa Day 20 Oct, DanSafari 11–18 Nov (two third-party listings only).

## Why NEEDS-NETWORK (exactly what remains — every one needs a normal network)
1. `python3 terroir/_rollout/lib/checklinks.py . Diani-Kwale` — the proxy refuses every external host here. Unlink/archive anything dead.
2. Own-site hours, read and dated, for the three last-minute venues: Nomad (own site 22:00 vs Instagram 22:30, last orders 21:00),
   Leonardo's (own site 23:00, kitchen to 22:30; Tripadvisor 23:30), Havana (own site stale © 2023; until 01:00 per Glovo/Aug).
3. Own-site liveness for the 29 places still carrying their August date (list in `research/verify_1.json` / `verify_2.json`
   `_needs_network`), and Tiki Bar's real status (+254 746 589 500) if Arnaud wants it back.
4. DanSafari (11–18 Nov) on an official page; the 2026 Sea Turtle Festival and Colobus golf editions.
Commit the results as `research/verify_*_network_*.json`; the next run applies them through `fixes.py` and flips to review.
