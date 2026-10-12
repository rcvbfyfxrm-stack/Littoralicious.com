# Istanbul-Bogazici → GOLD6 (the Prague standard) · nightly run 12 Oct 2026 · status NEEDS-NETWORK (everything else done)

Route B: the reading layer is assembled on the LIVE Siracusa-Sicilia chrome (itself cloned from live Prague), from the
GOLD4 Istanbul guide's own data and research. The old page was the GOLD4 reference, so this pass also brings the GOLD5
floor it lacked: the `#eat` jump line, The Dish inside La liste at the foot, the dated hot board with its `#why-now` pointer,
the calendar, a craft section ("Do this one" / what each is missing), a third table group (La Rue) and an `.ics` with
`X-WR-CALNAME` (the `.txt` download is gone). The locked kit `terroir/_assets/guide/*` is untouched. Rebuild, repeatably:

    python3 terroir/_rollout/review/Istanbul-Bogazici/make_plan.py             # picks.json + card_plan.json (the cut, as data)
    python3 terroir/_rollout/review/Istanbul-Bogazici/make_research_inputs.py  # the agents' inputs (research/*_input.json)
    python3 terroir/_rollout/review/Istanbul-Bogazici/make_inputs.py           # research/ + fixes.py -> cards.json, venues.json, hot_events.json
    python3 terroir/_rollout/review/Istanbul-Bogazici/build_gold6.py           # reads the old guide + chrome from origin/rebuild/publishing-system
    python3 terroir/_rollout/lib/gold6/facts_tidy.py terroir/Istanbul-Bogazici/index.html
    python3 terroir/_rollout/review/Istanbul-Bogazici/repetition_audit.py
    python3 terroir/_rollout/lib/gold6/readings/apply_readings.py terroir/Istanbul-Bogazici terroir/_rollout/review/Istanbul-Bogazici/Istanbul-Bogazici.readings.json --check-config terroir/_rollout/lib/guides/Istanbul-Bogazici.check.json

(`extract_old.py` dumps the old fold cards to `research/cards_old.json`. Render and probes here use the test-only
`pw-shim.cjs`: the identical leaflet@1.9.4 from the npm registry, because unpkg.com is blocked in the sandbox; put the
package in `lf/` with `npm pack leaflet@1.9.4`. The page itself is unchanged.)

## Files
- `make_plan.py` → `picks.json` (10 lanes, every one ≤3 except one 4 with its reason; 26 places cut, each with its reason; berths;
  the guest list) and `card_plan.json` (every fold card and the old cards it is built from: merges = told once).
- `research/` — the old cards, the five rewrite packs (`rewrite_1..5.json`), the two re-verification packs (`verify_1..2.json`, with
  `_needs_network`), the hot board / calendar / seasonal checks (`hot_events.json`), all 12 Oct 2026. Briefs: `BRIEF.md`, `VENUE_BRIEF.md`, `HOT_BRIEF.md`.
- `fixes.py` — the editor's reconciliations (Tutak spelling, the two-star wording, statuses carried, dishes for two lanes, Vefa's season).
- `prose.py` — lead, essay fold, fold heads, group lines, lane stories, doors, the guest-list charters, exact edits to the reused blocks.
- `glossary_src.py` → `glossary.json` — the hover glossary (Turkish words, kept only where they occur in the page).
- `Istanbul-Bogazici.readings.json` — §8, applied last.
- `istanbul-card-desktop.png`, `istanbul-card-phone.png` — one opened card (Kılıç Ali Paşa Hamamı); `desk-*.png`, `phone-*.png` — the two lenses.

## Numbers
Places 71 → 45 (lane venues 44 → 31 in 10 lanes; map-only places 27 → 14). Fold cards 233 → 164, every one labelled
(143 fold cards + 12 on the dated hot board + 9 calendar dates). 62 groups, none over 3. La liste 23 → 22 (Çiğ köfte out: its only
address, Bezirgan, is unverified and cut).
**The one 4:** the other kitchens — Siirt, Crete, the Laz Black Sea and Damascus are four different migrations and none stands in for another.
Lanes keep their keys; groups are now Grandes (crème, the wave) · Petites (chefs, fire, esnaf, kahvaltı, the other kitchens, the old houses) · La Rue (the honest fast plate, late night).
Guest list: last minute Asmalı Cavit · Agora · Çiya; this week Mikla · Neolokal · Giritli; grand night TURK · Araf · Nazende Cadde. Berths Mikla · Çiya · Agora.

## What the 12 Oct re-check corrected
- **The guide contradicted itself on the Eminönü fish-bread boats** (the traps and The Dish said skip them, the quick-bites lane recommended them): the boats are out of the lane; the wet-burger story moves with Kızılkayalar.
- **"Turkey's only two-star"** is no longer true: Vino Locale (İzmir) went to two stars in the 2026 selection. TURK is now "Istanbul's only two-star" everywhere; the 2024 BBC quote is dated as "then".
- **Spelling:** the chef and the restaurant are *Tutak* (MICHELIN, the house), not *Tütak*.
- **Giritli's 2026 Bib Gourmand** could not be confirmed (MICHELIN shows it in the selection): now "in the selection", Bib not claimed.
- **New, from the record:** Ahmet Ustam is a MICHELIN Bib Gourmand; Balıkçı Kahraman is in the MICHELIN selection; Agora holds a Gault&Millau 2026 toque; Hayvore too.
- **Lokanta Stambouli** opened in November 2025, not August 2026, and nothing since confirms it trading — cut. **Karga**: its own closing notice and a closed listing, unresolved — cut. **Suma Han**: nothing dated 2026 — card dropped.
- **WAYANA** is in Moda, Kadıköy (La liste said Karaköy). **Midyeci Ahmet** is in the Beşiktaş çarşı (La liste said Karaköy).
- **Atatürk Kitaplığı** has been researchers-only since Sept 2022 (the old card sold it as a free reading room for all).
- **Basilica Cistern** passed to the foundations directorate in June 2026 (closed four days; a court challenge is running). The Archaeological Museums reopened in Sept 2026.
- **The month table:** Ramazan Bayramı 2027 is 9–11 March (not "mid-March"); "lüfer from 28 cm" had no source (a market size name; the legal minimum is argued, 20 cm in most reports); Republic Day "lights both bridges" became flags and fireworks announced year by year.
- **The ethnic lane story** printed a draft slip ("Akşemsettin Caddesai — wait, Akşemsettin Caddesi") on the live page: fixed.
- Halki seminary: no reopening confirmed (the old card said one was announced). Hıdiv Kasrı serves no alcohol. Moda pier reopened 2022 as a library café.
- Guest-list hours conflict across listings for all three last-minute venues: each card says "call ahead" with the numbers.

## Why NEEDS-NETWORK (exactly what remains — every one needs a normal network)
1. `python3 terroir/_rollout/lib/checklinks.py . Istanbul-Bogazici` — the proxy refuses every external host here. Unlink/archive anything dead.
2. Own-site hours, read and dated, for the last-minute three: Asmalı Cavit (+90 212 292 49 50; 16:00/18:00/12:00 opening, midnight–02:00 close, Sunday),
   Agora (agora1890.com: 12:00–01:00 vs 13:00–24:00 vs to 22:00), Çiya (ciya.com.tr: 11:00 vs 12:00, 22:00 vs 22:30).
3. MICHELIN pages: Giritli (Bib or Selected), the Istanbul Bib list (Casius, Ahmet Ustam, Yanyalı Fehmi, Nazende), TURK's live per-guest price
   (14,500 / 19,900 / 23,900 TL extracts conflict).
4. The rest of `research/verify_1.json` and `verify_2.json` `_needs_network` (Araf's day off, Kontuar's days, Ozzie's address, Emirgan Sütiş's number,
   Nardis's October programme, Vefa's hours, the October Adalar ferry timetable, Kuzguncuk/Arnavutköy 2026 evidence).
Commit the results as `research/verify_*_network_*.json`; the next run applies them through `fixes.py`, rebuilds, re-applies §8, flips to review.
