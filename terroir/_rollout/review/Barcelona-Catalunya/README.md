# Barcelona-Catalunya → GOLD6 (the Prague standard) · nightly run 15 Oct 2026 · status NEEDS-NETWORK (everything else done)

Route B, the Athens/Piraeus pipeline: the reading layer is assembled on the LIVE Siracusa-Sicilia chrome (itself cloned from live
Prague), from the old Barcelona guide's own data and research. The old page was a **pre-GOLD3 tier inventory** (60 venues in three
flat tiers, no lanes, no dishes, no gem data, no `terroir/data/` copy, a 9-column CSV of 18 rows), so this pass brings the whole
GOLD3/4/5 floor too: 12 table lanes in three groups, each opening on a food story; `dishes[]` on every table; the guest list with
charters; the `#eat` jump line and **La liste** (20 items, The Dish inside it, one-tap `.ics`) at the foot; the dated hot board with
its `#why-now` pointer; the calendar; a craft section; the listening room; Autour; the gem popups. The locked kit
`terroir/_assets/guide/*` is untouched. Rebuild, repeatably:

    python3 terroir/_rollout/review/Barcelona-Catalunya/extract_old.py           # research/cards_old.json + guide_text_old.txt
    python3 terroir/_rollout/review/Barcelona-Catalunya/make_plan.py             # picks.json + card_plan.json (the cut, as data)
    python3 terroir/_rollout/review/Barcelona-Catalunya/make_research_inputs.py  # the agents' inputs (research/*_input.json)
    python3 terroir/_rollout/review/Barcelona-Catalunya/make_inputs.py           # research/ + fixes.py -> cards.json, venues.json, lane_stories.json, hot_events.json
    python3 terroir/_rollout/review/Barcelona-Catalunya/build_gold6.py           # reads the old guide + chrome from origin/rebuild/publishing-system
    python3 terroir/_rollout/lib/gold6/facts_tidy.py terroir/Barcelona-Catalunya/index.html
    python3 terroir/_rollout/review/Barcelona-Catalunya/repetition_audit.py
    python3 terroir/_rollout/review/Barcelona-Catalunya/gate_config.py
    python3 terroir/_rollout/lib/gold6/readings/apply_readings.py terroir/Barcelona-Catalunya terroir/_rollout/review/Barcelona-Catalunya/Barcelona-Catalunya.readings.json --check-config terroir/_rollout/lib/guides/Barcelona-Catalunya.check.json

Hand prose: `prose.py` (lead, essay edits, food-history fold, fold heads, lane leads, doors, gems, glossary, The Dish rebuild) and
`liste.py` (La liste). Render and probes use the test-only `pw-shim.cjs` (`NODE_OPTIONS=--require …/pw-shim.cjs`,
leaflet@1.9.4 from the npm registry in `lf/`), because unpkg.com is blocked in the sandbox; the gate's render needs
`/usr/bin/chromium` → the Playwright chromium. The page itself is unchanged by either.

## Numbers
**Places 60 → 35**, all in lanes: 12 lanes, none over 3, **no 4s**. Cut 25 (reasons in `picks.json`): ABaC, Moments, Via Veneto
(caps), Berbena, Cruix, Direkte, Besta, La Mundana, 11 Nudos (rising cap / not this year's news), Sartoria Panatieri (a one-venue
lane), Bar Canyí, La Real, La Royale (burgers), Musta Shawarma (single 2018 mention), Cervecería Catalana, La Bombeta (told once: the
bomba is La Cova Fumada's), La Confiteria, Bodega La Palma, Can Recasens (caps); Bar Marsella and London Bar (no kitchen → bar
cards), Casa Gispert, the Boqueria and Sant Antoni (→ larder cards), Codorníu (→ the Penedès card).
**Fold cards 123 old articles → 101** (plus 10 hot-board and 9 calendar cards = 120 `.fcard`), every one rewritten and labelled;
39 card groups in the folds (46 with the hot board and calendar), none over 3. The 11 dish articles stay, rebuilt clean inside La liste (the old ones carried misplaced gem boxes).
**Guest list, rebuilt from venues kept:** last minute 7 Portes · Cal Pep · Els Pescadors; this week Bar Cañete · Suculent · Oníric;
grand night Disfrutar · Cocina Hermanos Torres · Lasarte. **Berths:** Disfrutar · Bar Cañete · Flash Flash (each confirmed trading
15 Oct; Bar La Plata, the first street pick, found only undated listings, so it stays in its lane).
New: craft (Mosaiccos — a named master-craftsman, open booking; La Manual Alpargatera and Cereria Subirà, each "missing: a class";
the honest warning), curiosities (9 corrected records), a listening room with an honest hi-fi pair (Oblicuo, Jaç), Autour by train,
the hot board and calendar, 7 gem popups, a 58-term glossary.

## What the 15 Oct re-check corrected
- **Disfrutar**: the third MICHELIN star came at the November 2023 gala, *before* the June 2024 50 Best No. 1 (the old verdict had it
  the other way round). The old "Michelin Green Star" claims on Disfrutar *and* Cocina Hermanos Torres ("the only one") contradicted
  each other and no 2026 source shows either: dropped. All old tag rows (July claims) rebuilt from the verified record.
- **Cinc Sentits** holds two stars (the old tag said one). Enigma, Mont Bar, Aleia: two stars (Nov 2025). Kamikaze: first star 2026
  (MICHELIN lists it as Taberna Kamikaze). Glug, Oníric: Bib 2026. Enigma's menu is EUR 260 from Sept 2025, not 280.
- **Bar Cañete** is not "lunch Thu–Sat": MICHELIN and a May 2026 listing give Mon–Sat lunch and dinner. **El Xampanyet** is run by the
  founder's granddaughters (Ara, Dec 2024); the family is Ninou. **Granja Viader** changed hands on 7 May 2026 (Ara).
- **Escribà on the Rambla** closed again on 15 Jan 2026 for the Rambla works (Ara); no reopening found — printed as such, unverified.
- **Park Güell** €18 (from 1 Jan 2026), entrance on the Carretera del Carmel. **Boqueria** Mon–Sat 8:00–20:30 (not Tue–Sat);
  Pinotxo has left it for Sant Antoni. **Gaudí's death**: the Gran Via at Bailèn, 7 June 1926 (the old text said Carrer de Bailèn in
  one place and the Gran Via in another). The Sagrada Família tower blessing of 10 June 2026 is now past tense. The beach sand
  "from Egypt" is printed as a dispute. MNAC terraces need a ticket; Picasso Museum free slots must be booked; Olympic Stadium 1929.
- The essay drops figures it could not stand behind (the 2026 tourist-tax figure, the "four three-star houses" incl. the cut ABaC,
  Mont Bar as an elBulli alumnus) and the banned words in two old dish texts.
- Statuses: **23 confirmed 15 Oct, 12 unverified** (nothing 2026-dated found, nothing against them; each card says so).
- Kit bug met, fixed page-side: `guide-extras.js` (locked) inserts the "neighbouring ports" row before
  `appendix.firstChild.nextSibling`; Barcelona is the first chrome-cloned guide with neighbours and the chrome's appendix is empty, so it
  threw on load. The build puts a comment node in the appendix; nothing visible changes. **Worth fixing in the kit** (null check).

## Why NEEDS-NETWORK (exactly what remains — every one needs a normal network)
1. `python3 terroir/_rollout/lib/checklinks.py . Barcelona-Catalunya` — the proxy refuses every external host here.
2. Own-site hours, read and dated, for the guest list and berths: Disfrutar (Tue–Fri vs Tue–Sat, EUR 315 vs 345), Cocina Hermanos Torres
   (days, price), Lasarte (Tuesday), 7 Portes (24:00 vs 01:00), Cal Pep (Saturday dinner, Monday), Els Pescadors, Bar Cañete, Suculent
   (weekdays vs Wed–Sun; no. 43 vs 45), Oníric (Sunday), Flash Flash.
3. The 12 unverified tables — a 2026 sign of trading, or cut: Quimet & Quimet, El Vaso de Oro, El Xampanyet, Bar Bodega Quimet, Bar Mut,
   Can Cisa / Bar Brutal, Els Sortidors del Parlament, Escribà (Rambla shop after the January closure), Bar La Plata, Can Paixano,
   Bar Tomás, Bacoa Kiosko.
4. MICHELIN on the Spain 2027 gala, **24 Nov 2026 (Huesca)**: every starred and Bib table; the Green Star list; Dos Palillos' star on
   the official page.
5. Cards marked "check" in their facts: Formatgeria La Seu (no 2026 trace found), Casa Gispert hours, Skye Coffee days, Mosaiccos
   times and prices, Gramona/Yzaguirre/Colònia Güell visits, museum prices from guides rather than official pages (Casa Batlló,
   La Pedrera, Miró, MNAC, Palau de la Música), the Montjuïc fountain's November dates; the hot board's single-source dates
   (Open House 24–25 Oct, Sónar 2027, the Santa Llúcia start).
6. The rest of `research/verify_1.json` / `verify_2.json` `_needs_network` (37 lines) and `research/hot_events.json` `_needs_network`.
Commit the results as `research/verify_*_network_*.json`; the next run applies them through `fixes.py`, rebuilds, re-applies §8
(apply_readings refuses to run twice: rebuild first), flips to review.
