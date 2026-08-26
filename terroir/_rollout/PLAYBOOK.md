# TERROIR UPLIFT — routine playbook

**The target is ⭐⭐ GOLD5 (§ below). Reference guide = live `Kendwa-Unguja`.**

You are the nightly terroir-uplift agent. Each run you take **ONE** guide as far up the ladder as
it will honestly go, verify it hard, and deploy only if the gate is green. Keep it to one guide so
token use stays bounded. Be honest: if you can't reach quality, HOLD the guide (don't deploy a
regression) and say so.

**Read in this order:** §GOLD5 (the target) → §THE GATE IS AUTOMATED (how you prove it) →
§12 section order (the two traps that will otherwise waste your run) → `lib/newguide/README.md`
(the build scaffold — do not re-derive the pipeline). GOLD3 and GOLD4 below are kept as the
history of the ladder and as the acceptable floors; everything in them still holds.

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

## ⭐⭐ GOLD5 — THE KENDWA STANDARD (2026-08-23, supersedes GOLD4 as the target)

**Reference guide: live `Kendwa-Unguja`.** GOLD4 (Istanbul) stays the acceptable floor for a
nightly uplift; **any NEW guide, and any guide you can take further, builds to GOLD5.** Everything
in GOLD4 §1–9 still holds. The delta, all of it shipped and render-verified on Kendwa:

1. **Full table taxonomy — up to ~14 lanes in 3 groups.** `GROUPS` is not fixed at 2;
   `guide-render.js` iterates it generically. The canonical set, covering every lane used across
   the earlier guides:
   - **Les Grandes Tables** — `creme` · `rising` (the new wave) · `houses` · `landings`
   - **Les Petites Tables** — `swahili`/local · `italian`/second-cuisine · `ethnic` (the other
     kitchens) · `breakfast` · `grills` (the fire) · `fast-food` · `chefs-eat` · `beach-rooms` ·
     `story` (the old houses)
   - **La Rue** — `street`, placed immediately after the petites
   Adapt the *names* to the place; do not drop a lane because it is easier. Every lane opens on a
   `CATEGORIES[].story` gembox. ⚠ **A venue belongs to exactly ONE lane** — listed twice it
   silently vanishes from all but the last. Assert it in the build.
2. **Street food is a table GROUP, and `#street-food` at the foot is something else.** The group
   is where to eat street food; the closing section is renamed **"Sur le pouce — the late plate"**
   and answers only *what is still open after the bar shuts*. They must not overlap.
3. **The foot of the guide is: La liste (The Dish inside it) → «Ce Soir» → sources.** The
   checklist, the dish canon and the charter shortlist travel together at the end, out of the
   tables. See §12 for the mechanism — it is not obvious and it fought back.
   ⚠ **What-to-eat and The Dish are ONE section, not three.** (Arnaud, 2026-08-25: *"dish and what
   to eat and drink are the same section."*) `#la-liste` at the foot is the whole thing — the list,
   the origin stories under `.gx-liste-dish`, and the one-tap `.ics` button. `#dish` stays a `<div>`
   inside it so its anchor and every `#p-dish-N` link still resolve.
   **`#eat` high up is a one-line pointer to it — never a second copy.** See §3b.
4. **`#craft` — Craftsmanship.** Mandatory. The EducatedTraveler bar still decides what goes in
   and in what order — a named still-practising master · dedicated teaching lab · **open
   enrolment** · at the source — but **the bar is the editor's tool, not the reader's: never
   print the scoring apparatus.** No "the four bars" card, no "how these are judged", no scores.
   (Arnaud, 2026-08-25: *"don't put the way you select, just put the most recommended and why,
   and the others what's missing… simpler without losing substance."*)
   The shape is: **"Do this one"** — a single entry with a «Why this one» that states the facts
   (the craft is unbroken, the master is named, you can enrol) rather than a score; then
   **"The others, and what each is missing"**, every card tagged `missing: <the one thing>` and
   carrying a plain **Missing:** line ("no instructor is named publicly — a reputable room, but
   you don't know whose hands you're in until you arrive"); then the free/unstructured hour and
   the warning about what is sold as local craft and is not. Never upgrade a place quietly.
   "Nothing here clears the bar" is a legitimate finding — say it in the lede, as Diani does.
   Kendwa's one full pass is the Nungwi dhow-building course taught in the working yard.
   ⚠ **Every card gives the website of the place** (`.fcard__site`, before the Maps link), the
   link text being the bare domain so the reader sees where they are sent (Arnaud, 2026-08-26).
   The venue's OWN site only — the gate rejects aggregators, plain `http`, and a label that does
   not name the host it links to. **Verify each one resolves**: on the Swahili pass
   `kayakinondo.com` had been taken over and redirected to an unrelated domain, and
   `akambahandicraft.com` was dead. No site (a working yard, a roaming trade) ⇒ omit the link.
5. **`#hot` — What's hot this month.** Mandatory, dated, and the only perishable block in a guide.
   Four groups: in the water · in the sky · on the plate · in the calendar. Say plainly when there
   is nothing on ("no festival now, and the weather is the trade") rather than inventing one. Fill
   the `hot_this_month` CSV column while you are there — it emitted **empty** on every guide
   before this.
   ⚠ It MUST carry `data-hot-asof` / `data-hot-review`: **the gate fails the build when it goes
   stale.** `why-now` is therefore no longer forbidden — it is a dated board, not the old GOLD4
   why-now fold.
   ⚠ **The board itself lives ONCE, at the foot** (`#hot-foot`, inside the tail wrapper), where the
   reader is when they decide what to do with the evening. High up, on the ranked `why-now` id,
   there is a **one-line pointer** down to it. See §3b. The dates live on the foot board only.

### 3b · JUMP LINES — a section that lives at the foot, announced high as one line

Two sections belong at the end and still have to be visible early: **La liste** (the checklist you
leave with) and **the hot board** (the dated one you check last). The answer is not to print them
twice. Up top, on the same ranked id the section used to carry, author a `<section class="gx-jump"
id="…">`: one bold lead, one sentence, one `.gx-jump__go` link down, one `.gx-jump__meta` line
under it. Keep it to ~60 words — Arnaud's ask was *"a small line that directs you to the bottom."*

- **It must stay a `<section>` or `<details>`, never a `<div>`.** `keyOf()` builds `TAG#id`, so
  `DIV#why-now` is not in RANK and gets `200 + i` — the line would be flung to the tail.
  `SECTION#eat` (12) and `SECTION#why-now` (11) are both scored; that is why the pointer sits
  exactly where the fold did.
- Keep `<span id="hot"></span>` inside the hot pointer so `#hot` still resolves.
- Cross-link both ways: the pointer links to `#hot-foot` / `#la-liste`, the foot block links back.
- The pointer repeats the checked date in prose. The gate asserts it **matches `data-hot-asof`**,
  because two dates that can drift eventually will.
- Style is in the kit (`guide-enhance.css` §14) — nothing per-guide.
- The gate holds the line to a line: `"hot": {"mode": "pointer"}` and `"listePointer": true` fail
  the build if a card, a `terroir-btn`, a `.ics` link or 1 200+ bytes reappear up top. Proven by
  positive control (a card, a duplicated `.ics`, and a drifted date each produced a clean HOLD).
6. **Geocoding is name-validated.** A Nominatim hit whose feature name shares no significant word
   with the venue is REJECTED, and school/ward-office matches are refused outright. Unresolved
   venues stay unpinned and keep a Maps search link. No coordinate is ever hand-written.
7. **The scaffold is checked in.** `lib/newguide/` holds the working pipeline (geocode → emit →
   assemble → generated liste/sources) plus section templates. Read its README first; do not
   re-derive it.

## ⭐ CROSS-CHECK THE LINKS (2026-08-26)

Arnaud: *"always cross check the links make sure they work properly."* One command, run it
before every deploy and read it:

```bash
python3 terroir/_rollout/lib/checklinks.py . <Slug> [--archive]
```

It is deliberately NOT part of `checks_gold4.py`: it is the only check that depends on the
whole internet being up, and someone else's outage must never be able to fail your deploy.
It separates three things, and treating them alike is what produces bad fixes:
- **DEAD** (refused / 404 / persistent 5xx over three tries) — fix or remove.
- **BOT-WALLED** (403/401/406/400/429/503) — publishers and Cloudflare block curl; the page is
  fine in a browser. **Never "fix" one of these.** Confirm with `cdp.render_dom(url,
  quiet_hosts=False)`, which is how divingthecrab.com and the World Unite! course page were
  verified.
- **MOVED** (2xx on a different host) — usually correct (`doi.org` → the publisher,
  `hdl.handle.net` → the repository). **Read every one**: `kayakinondo.com` now redirects to
  an unrelated squatted domain.

⚠ **One failure is not proof of death.** `kuzacave.com` and `kentaste.com` each failed a full
pass and were back minutes later. Re-check before tearing a link out.

For anything genuinely dead, **prefer an archive snapshot to deleting the citation** —
`--archive` prints the closest one. Repoint the href and say so in the link text ("dead link,
archived copy June 2026"); never let a reader think it is live. Where there is no snapshot,
unlink but keep the source's name: a citation is evidence even when the page is gone.

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
9b. **Groups & lanes** — group count matches config, every lane maps to a declared group, no group
   is empty, no declared lane is venue-less.
9c. **The hot board expires itself** — `data-hot-asof` older than `maxAgeDays` (70), a passed
   `data-hot-review`, a missing visible "Checked <date>" line, or fewer than `minVenues` venues
   carrying `hot_this_month` all FAIL the build. Proven by positive control.
9c-bis. **A Maps pin must point at somewhere you GO.** (Arnaud, 2026-08-26: *"don't add
    google map link when it's irrelevant, only for start place of walk or something,
    restaurants."*) Venues, a walk's **starting point**, a site you visit — yes. A card about
    a sky event, a past festival, a historical gale, "nothing is on this month", or advice to
    close the laptop — **no pin**. A pin on a whole city or region is the tell: it means there
    was no place to point at. Where a walk has a meeting point, the pin is the MEETING POINT,
    not the operator's office (Kaaribu → Tsunami Garden Cafe, not Kaaribu Experiences). The
    gate machine-checks the two card types that are never a place — tag `the warning` and tag
    `honestly` — and the rest is your judgement.
    ⚠ The checklist is the opposite case: **every la-liste item and every `.ics` VTODO keeps
    its Maps link**, because that is exactly where a pin earns its place.
9d. **The jump lines stay lines** — with `"hot": {"mode": "pointer"}` and `"listePointer": true`,
   the gate fails if `#why-now` grows a card or passes 1 500 bytes, if `#eat` grows a `.ics`,
   a `terroir-btn` or a second list, if either loses its down-link or its back-link, if more than
   one block carries `data-hot-asof`, if `#dish` leaves `#la-liste`, or if the pointer's visible
   date drifts from the attribute. See §3b.
10. **THE RENDER GATE** — serves the repo on a **fresh ephemeral port** (never reuse a stale server)
    and drives Chrome to read the real DOM, asserting organiser groups/lanes/cards, 3 berth cards,
    fcards, one map pin per pinned venue, gemboxes, gem popups, bridge doors, shortlist groups, liste
    items, no flat-tier fallback, no leaked `undefined`/`NaN`.

### ⚠ §12 · Section ORDER — the locked RANK table (2026-08-23)

`_assets/guide/guide-enhance.js` is **LOCKED** and holds a `RANK` map that re-sorts **every direct
child of the lead's container** on load. Known ids get a fixed rank (`DETAILS#dish` = 23, pinned
beside `#tables`; `#why-now` = 11, high; `#sources` = 64); anything unrecognised gets `200 + index`
and lands in the tail in source order. **`data-bridge-after` cannot beat it** — the attribute fires
and `reorder()` then undoes the move.

- **To move a ranked section to the foot:** put everything you want there inside ONE rank-neutral
  wrapper (`<div class="gx-tail">`). `keyOf()` reads the wrapper, not its children, so the block
  travels together with its internal order intact. This is how la-liste → Ce Soir → Dish → sources
  is achieved.
- **To place a section high:** give it an id the RANK table already scores. The hot **pointer**
  uses `why-now` (rank 11) for exactly this reason, with `<span id="hot">` inside for the anchor,
  and the la-liste pointer uses `eat` (rank 12). ⚠ RANK keys are `TAG#id` — a `<div>` on a ranked
  id scores `200 + i` and lands in the tail. Pointers are `<section>`s. See §3b.
- ⚠ **Never author an `id="band-eat"` anchor.** `makeBand()` generates its own divider with that
  id for the "eat" act, and `guide-bridge.js` resolves `#ce-soir`'s position with
  `getElementById('band-eat') || getElementById('tables')` — so it finds the kit's one first and
  the shortlist reappears beside the tables. Relocate `#ce-soir` after the kit builds it, with a
  small page-local rAF-polling script.

⚠ **Two more traps baked in the hard way, 2026-08-22.** (a) Chrome 151 removed `--headless=old` and
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
