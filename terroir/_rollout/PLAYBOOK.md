# TERROIR GOLD3 NIGHTLY UPLIFT — routine playbook

You are the nightly terroir-uplift agent. Each run you upgrade **ONE** existing guide to the
**GOLD3** standard (the Athens/Piraeus structure), verify it hard, and deploy it only if it passes.
Keep it to one guide so token use stays bounded. Be honest: if you can't reach quality, HOLD the
guide (don't deploy a regression) and say so.

## What GOLD3 is (the target — match live Athens-Attiki / Piraeus-Saronic)
Read `terroir/_rollout/lib/` (machinery) and the design lock context below. Three changes over GOLD2:
1. **`#tables-extended` ("Tables — by tier") is DELETED.** Fold its "what each room is for"
   intelligence into the **La Grande / La Petite subsection `desc`s** — each section desc PAINTS THE
   SCENE (14–26 words: what the room is for + how it feels, so a reader picks the right table from the
   desc alone). Group descs keep the money/price ladder.
2. **Every Flâner section = described subcategories + compact→expand cards.** The section stays a
   `<details class="sfold" id="…" open>`; its body holds 2–4 `.fsub` groups (`<h4 class="fsub__title">`
   + an italic `.fsub__desc` scene line that guides to the best from reading alone), each holding
   `.fcard` native-`<details>` cards (compact face = `.fcard__name` + gold-mono `.fcard__tag` + italic
   `.fcard__teaser`; body opens to detail + `.fcard__meta` + a Google-Maps `.fcard__map`). No JS.
   `data-pin` only where a real map id exists. Sections: walks · coffee-gardens ("Beautiful rooms to
   linger") · work · culture · crafts · quartiers · calas (coastal only) · gastronomy. CSS is
   `lib/flaner.css`, injected by `lib/splice.py`.
3. **★+colon eat-rec render, more dishes/venue (avg ~8, honest-thin venues stay small), and the 3
   berth cards get the "To order" panel** (all baked by `lib/splice.py`).
Plus the standing GOLD/GOLD2 rules: born-here **food-gem popups** (`TERROIR_DATA.GEMS`, gold ◆ triggers
on real prose phrases), the `#bougie` food-history callout, born-here dish flags, the masthead topnav,
3 B&W CC plates, the floating map, sea `#2d4a5e` + Playfair/Georgia/Inter/JetBrains, NO banned words,
absolute `/terroir/…` paths, NEVER fabricate, honesty gates. "Even the things you missed" (Arnaud):
make sure EVERY guide carries the born-here food-origin stories + gem popups + a scene-first read.


## ⭐ GOLD4 — THE ISTANBUL STANDARD (2026-08-17, supersedes GOLD3 as the target)

**Reference guide: live `Istanbul-Bogazici`.** Arnaud's instruction: every next briefing must be
AS DEVELOPED as Istanbul. GOLD3 (Athens/Piraeus) remains the acceptable floor for nightly uplifts;
any NEW guide, and any guide you can take further, builds to GOLD4. The delta over GOLD3:

1. **La Passerelle (the bridge).** Three doors after the lead routing the three readers —
   La Table des Invités → the «Ce Soir» charter shortlist (rows carry a hand-written `charter:{}`
   block: price band · booking reality · dress · view · private · the deal-breaker warning, plus
   tap-to-call, Maps, copy-for-itinerary, the ♡) · a chef door · a day-off door. Opt-in per guide:
   `TERROIR_DATA.BRIDGE` + the two `guide-bridge.*` includes. The SINGLE-EDITOR rule travels with
   charter{}: edit a shortlist venue's booking prose ⇒ update its charter block in the same commit.
2. **One opening essay.** soul + history + why-now merged into a single captivating read (facts
   verbatim, transitions only), the born-here food gem embedded. No separate history/why-now folds.
3. **Table LANES, 3–5 entries each** (never two 15-deep groups): the stars · the wave (trimmed to
   its strongest) · WHERE THE CHEFS EAT (sourced day-off addresses — name who says so) · the fire/
   local-form lanes · KAHVALTI-equivalent breakfast lane · THE OTHER KITCHENS (regional/minority
   tables) · LATE NIGHT after service · SUR LE POUCE (named counters) · THE OLD HOUSES (dated).
   Every lane opens with a **food story** (`CATEGORIES[].story` → gembox, kit-gated). Every venue
   carries `dishes[]` — the iconic plates — rendered by `gemDishes()`. Cards three-up, closed,
   click to unfold (guide-bridge.css).
4. **The signature-experience sections** — what the place is uniquely FOR gets its OWN section(s)
   (Istanbul: #hammam with gendered-hours honesty + #rituals incl. the berber). Buried = absent.
5. **Squares, gardens & the little beauties** + a "rooms to linger & work" group with the honest
   work-truth line ("Beautiful. Close the laptop.") — the flâner layer a crew actually uses.
6. **La liste.** A closing what-to-eat-&-drink checklist: per item SAY-IT pronunciation · what it
   is · why unique (one verified fact) · BEST PLACE + Maps. Two downloads: .ics of VTODOs
   (LOCATION + URL fields — lands in Apple Reminders) and a plain .txt.
7. **Closed-by-default + hierarchy.** Everything folded on landing; bands are the chapters
   (large serif + sea rule), closed sections read as index rows; NO word-counts or read-time
   chrome; the liveness "checked <dates>" line lives INSIDE #sources, not as a top alert.
8. **Autour band** (real day-trips out), provisioning/larder with Buy/Galley chef blocks, and the
   hub map's clickable sea region for the guide's water.
9. **Maps-link audit before deploy:** every link canonical `maps/search/?api=1&query=` + city
   token, zero `amp;` residue, name-vs-query sanity — plus the standing liveness/no-fabrication/
   no-emoji/orthography gates. Verify by headless render, never by reading source.

## ⭐ THE GATE IS AUTOMATED (2026-08-22)

Everything §6 used to ask you to eyeball is now one command. **Run it; do not hand-verify.**

```bash
python3 terroir/_rollout/lib/checks_gold4.py . terroir/_rollout/lib/guides/<Slug>.check.json
#   --no-render   skip only the browser stage (never skip it before a deploy)
```

Per-guide config lives in `lib/guides/<Slug>.check.json` — copy the Kendwa one and edit
`slug/city/mapsTokens/staleTokens/sectionsRequired/sectionsForbidden/floors/renderFloors`.
Exit 0 = deployable, exit 1 = HOLD. What it asserts, in one pass:

1. **Files** — guide `index.html`/`data.js`/`data.csv`, plus the `terroir/data/` and `terroir/csv/`
   copies, and that the two copies are byte-identical (a stale second copy is a classic silent bug).
2. **Structure** — every required section id present, every forbidden one absent, topnav, floating
   map, absolute kit paths, bridge includes, no read-time chrome.
3. **La liste** — `.ics` linked and present, VTODO count ≥ floor, `X-WR-CALNAME` set, **no `.txt`**,
   and no `download` attribute on the link (it must open in Reminders, not save).
4. **Language** — banned words (with `<cite>`/href exemption), per-guide stale-city tokens matched on
   **word boundaries** (so "Kenyatta Road" no longer trips "Kenya"), zero `amp;amp;`, zero emoji.
5. **Maps audit** — every link canonical `?api=1`, carries a local token, no `amp;` residue, and the
   query actually shares a word with the venue's name.
6. **Data floors** — venues, gems, neighbourhoods, walks, lanes, lane stories, 2 groups, 3 doors,
   3 shortlist groups, exactly 3 photos, exactly 3 berths, `TABLES.grande/petite` shape, and
   `dishes[]` on every venue in a rendered lane.
7. **Honesty** — every venue carries a legal `status`; every confirmed one carries a check date;
   the checked-dates line sits inside `#sources`; pin coverage reported.
8. **Integrity** — gem `pattern`s actually occur in the prose, no dead `#anchor`, no dead `data-pin`
   (runtime-built `"#venue-'+v.id+'"` hrefs are ignored), CSV is 24 columns with a row per venue.
9. **The hub** — carries the slug, the card parses, has coords/route/essence, csv flag matches, and
   at most one `isNew:true`.
10. **THE RENDER GATE** — serves the repo on a **fresh ephemeral port** (never reuse a stale server)
    and drives Chrome to read the real DOM, asserting organiser groups/lanes/cards, 3 berth cards,
    fcards, one map pin per pinned venue, gemboxes, gem popups, bridge doors, shortlist groups, liste
    items, no flat-tier fallback, no leaked `undefined`/`NaN`.

⚠ **Two traps baked in the hard way, 2026-08-22.** (a) Chrome 151 removed `--headless=old` and
`--dump-dom` never returns for these guides — verified against the live Diani build, so it is the
browser, not the page. `lib/cdp.py` is a stdlib-only DevTools-Protocol driver written to replace it;
no pip, no puppeteer. (b) The `.gx-torg-*` classes in every guide's `<head>` are **legacy Girona-era
CSS that nothing emits any more** — checking for them reports a false failure. The current kit
renders `terroir-group` / `terroir-cat` / `terroir-card` (guide-render.js) and `gx-bridge__door` /
`gx-cs-group` (guide-bridge.js). Count those.

## Steps each run
1. **Setup.** You are in a fresh clone of `rebuild/publishing-system`. Read `terroir/_rollout/state.json`.
   Pick the FIRST queue item with `status:"pending"`. If none pending, go to **NEW PLACES**. Set env
   `TERROIR_GOLD2=terroir/_rollout/lib/GOLD2.html` for the splicer.
2. **Assess the guide.** Read its live `terroir/<slug>/index.html` + `terroir/data/<slug>.js`. Is it
   already tables-era (has the `gx-torg` organiser + GEMS) or pre-GOLD2 (flat tier inventory)?
3. **Research (bounded, verified).** Run a workflow to gather what's missing for THIS place, adversarially
   verified, open-in-current-year, trusted sources only, Greek/local sources too:
   - the **born-here food-origin stories** (5–7 gem popups with real prose-anchor patterns) + the
     `#bougie` food-history theme + born-here dish flags;
   - scene material for the **table subsection descs** (what each room is for);
   - **flâner subcategories** (2–4 per section) with their scene descs, reusing the guide's existing
     venues/walks/culture/quartiers where possible (don't lose good content — transform it);
   - fill any GOLD2 gap for pre-GOLD2 guides (organised La Grande/Petite tables + ★ dishes).
   Reuse the guide's existing verified content; only research the NEW layers. Never fabricate.
4. **Rewrite** the section lines into the GOLD3 markup (fsub/fcards + scene descs; drop tables-extended;
   ★ dishes; gem popups) and the data layer (`final-data.json` shape per `lib/emit_data.py` docstring:
   venues with dishes[], tables with scene descs, gems[], photos[], geo arrays). Keep a
   `guide-meta.json` {slug,city,title,center,zoom,cityRadiusKm,sister?}.
5. **Build.** `python3 lib/emit_data.py <LIVE_DIR> terroir/csv` then
   `TERROIR_GOLD2=lib/GOLD2.html python3 lib/splice.py <BUILD_DIR> <LIVE_DIR>`; copy data.js to BOTH
   `terroir/<slug>/data.js` and `terroir/data/<slug>.js`; write both CSVs (folder + `terroir/csv/`).
   Photos: reuse the guide's existing `img/` plates if present; only fetch new CC plates
   (`lib/extract_photos.py` + `lib/fetch_photos.py`) if missing. Honour CC BY-SA share-alike in credits.
6. **VERIFY HARD (the deploy gate).** `bash lib/checks.sh <LIVE_DIR>` must be ALL GREEN. Headless-render
   the guide (serve the repo, load the page) and confirm: 3 berths populate, the organiser builds cards,
   fsub/fcards render, every GEM pattern appears in prose, 0 banned words, no stale tokens from another
   city, no dead `#anchor`/`data-pin`. If ANYTHING fails → **HOLD**: set the item `status:"held"` with a
   `reason`, commit state.json only, and report — do NOT deploy a broken guide.
7. **Deploy (only if green).** `git add` the guide files + `state.json` (mark item `status:"done"`, append
   a `log` entry {slug, date, commit}). Commit, `git fetch`+rebase `origin/rebuild/publishing-system`,
   push. The deploy Action goes live in ~40s. Verify the live URL returns 200 and shows GOLD3 structure.
8. **Report** one tight paragraph: which guide, done|held, what changed, live URL or the hold reason.

## Hard rules
- ONE guide per run. Stop after it. Never batch (token budget).
- NEVER fabricate a venue, dish, award, date, or origin. Verify or drop. Honesty gates over padding.
- NEVER run the destructive hub builder. The hub is hand-edited; this uplift does NOT change the hub
  card (the guide already has one) unless its essence is stale.
- The deploy gate is absolute: checks-green + clean render, or HOLD. A held guide waits for Arnaud.
- Preserve each guide's good existing content — transform it into the new structure, don't discard it.
- Pre-GOLD2 guides are a big lift; if one run can't finish to quality, HOLD it and note what remains so
  the next run (or Arnaud) resumes it.

## NEW PLACES (after the queue is drained)
Once every queue item is done|held: stop uplifting and build a NEW guide for the **main Turkey
superyacht hub** (Arnaud is cruising there). Candidates: **Bodrum**, **Göcek**, **Yalıkavak** — confirm
the exact town in the run's report before committing to research (do not guess the wrong one). Build it
GOLD3-native from scratch (research → verify → assemble → write → build → verify → deploy → hub card),
exactly like Athens/Piraeus. Then continue with other yacht-relevant Turkish/Aegean spots.

## Design lock reference
The authoritative spec is `NEXUS/OUTPUT/Terroir/_TEMPLATE/TERROIR-GUIDE-LOCK.md` (not in this repo — it's
in Arnaud's ProtonDrive). Its GOLD3 section is mirrored above. If in doubt, match the live Athens-Attiki
and Piraeus-Saronic guides byte-for-structure.
