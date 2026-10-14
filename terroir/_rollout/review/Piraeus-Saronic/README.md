# Piraeus-Saronic → GOLD6 (the Prague standard) · nightly run 14 Oct 2026 · status NEEDS-NETWORK (everything else done)

Route B, the same pipeline as Athens-Attiki (13 Oct): the reading layer is assembled on the LIVE Siracusa-Sicilia chrome (itself cloned
from live Prague), from the GOLD3 Piraeus guide's own data and research. The old page was GOLD3, so this pass also brings the GOLD4/GOLD5
floor it never had: 10 table lanes in three groups (Grandes · Petites · La Rue), each opening on a food story; the guest list with charters;
the `#eat` jump line and **La liste** (19 items, The Dish inside it, one-tap `.ics`) at the foot; the dated hot board with its `#why-now`
pointer; the calendar; a craft section; the listening room; Autour (the Saronic). The locked kit `terroir/_assets/guide/*` is untouched.
Rebuild, repeatably:

    python3 terroir/_rollout/review/Piraeus-Saronic/make_plan.py             # picks.json + card_plan.json (the cut, as data)
    python3 terroir/_rollout/review/Piraeus-Saronic/make_research_inputs.py  # the agents' inputs (research/*_input.json)
    python3 terroir/_rollout/review/Piraeus-Saronic/make_inputs.py           # research/ + fixes.py -> cards.json, venues.json, hot_events.json
    python3 terroir/_rollout/review/Piraeus-Saronic/build_gold6.py           # reads the old guide + chrome from origin/rebuild/publishing-system
    python3 terroir/_rollout/lib/gold6/facts_tidy.py terroir/Piraeus-Saronic/index.html
    python3 terroir/_rollout/review/Piraeus-Saronic/repetition_audit.py
    python3 terroir/_rollout/review/Piraeus-Saronic/gate_config.py
    python3 terroir/_rollout/lib/gold6/readings/apply_readings.py terroir/Piraeus-Saronic terroir/_rollout/review/Piraeus-Saronic/Piraeus-Saronic.readings.json --check-config terroir/_rollout/lib/guides/Piraeus-Saronic.check.json

Render and probes use the test-only `pw-shim.cjs` (`NODE_OPTIONS=--require …/pw-shim.cjs`, leaflet@1.9.4 from the npm registry in `lf/`,
`npm pack leaflet@1.9.4`), because unpkg.com is blocked in the sandbox. The page itself is unchanged.

## Numbers
Places 30 → 25 (all in lanes; 10 lanes, none over 3, **no 4s**). Fold cards 47 → 85 (70 written for this pass + 7 hot board + 8 calendar),
every card labelled; 37 card groups, none over 3. The 8 dish stories stay, inside La liste. The 8 bar and 7 music articles became fold cards.
**Cut:** Piscis and Jimmy's Fish (Mikrolimano holds three), Avraam (told once: the Drapetsona kebab row), Pancho (the other kitchens hold
three), **Polyvios** (Greek press, 26 Jan 2026, reported the owner's arrest on drug-trafficking charges with the shop allegedly a front;
allegations, no outcome found, nothing since shows it trading — it leaves the guide rather than send anyone there).
**Guest list, rebuilt from venues kept:** last minute Vosporos · Taverna tou Katsogiannou · Alargino (hours from own sites/listings, dated);
this week To Yperokeaneion · Dyosmos · To Koutouki tou Antoni; grand night Varoulko Seaside · Dourabeis · Papaioannou.
**Berths:** Dourabeis · To Yperokeaneion · O Giorgos (all confirmed 14 Oct; the old Varoulko/Margaro/Vasilis berths: Varoulko holds no
star now, Margaro and Vasilis were not confirmed for 2026, so they stay in their lanes).
New: Autour (Aegina, Salamina, Hydra), four Follow cards, two "Ask for it by name" drink cards, the honest craft and hi-fi cards.

## What the 14 Oct re-check corrected
- **Varoulko Seaside has no MICHELIN star** (lost with the 2024 selection, not 2023 as the old text said; 2026 listings claiming one are wrong).
  Athinorama's Greek Cuisine Awards (11 May 2026) put it top with 16/20. The Greece selection is due 20 Oct 2026.
- **The guide's three photographs were broken live**: data.js pointed them at `/terroir/Athens-Attiki/img/`; repointed to this guide's `img/`.
- **Tram:** Batis is a line 7 stop (not "Trocadero"); Edem is on line 6 (change at Pikrodafni). Piraiki Riviera: EUR 25m (not 23.5m).
- **Freattyda's court** tried exiles accused of a second killing, not anyone accused of involuntary homicide.
- **Rebetiko:** UNESCO's 2017 listing names no Piraeus quarter (now a dispute); the Metaxas censorship is from 1936; Bayanteras is "a son
  of the port", not "the one rebetis born in Piraeus"; "Ta Paidia tou Pirea" was the first non-English winning song (1961).
- **Propolemikon:** the claim that the Famous Quartet played there was not found in any source; dropped.
- **Katsogiannou** is not lunch-only (own site: Tue–Sat to 22:30/23:00, Sunday 13:00–17:00). **Vosporos:** daily 13:00–01:00 (own site).
  **Euxeinon** founded 1976 (own site), not 1977. **Dourabeis** about EUR 75–100 a head (FNL 2026). **Avakian** trades as "O Giorgos".
- **Vourloglou** (phyllo or chandlery?) is printed as a dispute. Aegina pistachio PDO: 1990s (one source gives 1997).
- Statuses: **9 confirmed 14 Oct, 16 unverified** (nothing 2026-dated found, nothing against them).
- Hub card: `csv:false` → `csv:true` (the guide has always shipped a CSV; the gate's flag check).

## Why NEEDS-NETWORK (exactly what remains — every one needs a normal network)
1. `python3 terroir/_rollout/lib/checklinks.py . Piraeus-Saronic` — the proxy refuses every external host here.
2. MICHELIN Greece on/after 20 Oct 2026: Varoulko Seaside, Dourabeis, Papaioannou and every kept venue.
3. The 16 unverified tables — a 2026 sign of trading, or cut: Margaro, Panorama, Oinomageireio o Vasilis, To Limanaki tou Giorgou, Dyosmos,
   Ikariotiko Kafeneio, To Eidikon, Propolemikon, To Koutouki tou Antoni, Taverna tou Katsogiannou, Vosporos, Toukta, Sushi Rolls,
   Mastronikolas, Euxeinon, Kantina o Plastiras.
4. Own-site hours, read and dated, for the guest list (Vosporos, Katsogiannou, Alargino; Yperokeaneion, Dyosmos, Koutouki; Varoulko — daily
   vs Tue–Sun, no. 52 vs 54; Dourabeis; Papaioannou) and the addresses in dispute (Panorama 8 vs 18–20, Ikariotiko, Karabelas 51 vs 53).
5. Polyvios: whether it trades after the January 2026 arrest (stays cut unless a court outcome clears it).
6. The rest of `research/verify_1.json` / `verify_2.json` `_needs_network` and the rewrite packs' `_notes` (Maritime Museum 2026 price and
   hours, Archaeological Museum winter hours from 1 Nov, Cine Melina 2026, the cafés and the craft benches, Aegina/Hydra boat times on olp.gr).
Commit the results as `research/verify_*_network_*.json`; the next run applies them through `fixes.py`, rebuilds, re-applies §8, flips to review.
