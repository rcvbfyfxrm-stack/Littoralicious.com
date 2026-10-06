# Prague — three per subcategory, guest list rebuilt, every card rewritten (5 Oct 2026)

## SECOND PASS (supersedes the numbers below) — commit 02c7708 on terroir/prague-trim, NOT pushed
- The cap wins over the guest list: La crème 6 → 3 (La Degustation, Papilio, Field), Grand cafés 5 → 3
  (Orient, Louvre, Slavia). Venues 64 → 48, every lane 3. Guest list rebuilt from kept venues:
  Last minute — Lokál Dlouhááá, U Pinkasů, Kantýna · This week — Terasa U Zlaté studně, Mlýnec, V Zátiší ·
  Grand night — La Degustation, Papilio, Field. Berths unchanged (La Degustation, U Zlatého tygra, Orient).
  The week table no longer sends readers to cut rooms.
- Fold cards 314 → 223 (cross-section duplicates cut: Becherovka in the larder, burčák in wine, Signal in events).
- Every kept card rewritten (223): teaser hook ≤110, story 60–110 words (river stories ≤160), why-go /
  ★ old-hand line, labelled facts kept; pointer cards get one line in the section's angle.
  48 venues get a new hook + why (50–90 words). Data: rewrite/*.json, applied by rewrite_2026_10_05.py
  (run AFTER trim_2026_10_05.py on a fresh build). Facts only from the card, the venue record or Prague's
  research packs; no new web facts. Two in-card cross-links restored (Black Madonna → #kavarna, Plzeň → #pivo).
- Verified: gate ALL GREEN with render (16 lanes, 223 fcards, 47 pins) · glass PASS · probe-redesign 15/15
  (one expectation fixed: Boire & sortir has 5 folds since #listening was added on 4 Oct) · probe-review 20/20 ·
  probe-1004 26/26 · probe-links 161 links / 0 failures desk + phone · checklinks 0 dead.


Arnaud: "the guides are a bit overcharged — limit to 3 the places by subcategory … select the more authentic
and interesting, always what they shouldn't miss. Put 4 when you really can't decide." Then: "make all the cards
more interesting and complete … add labels even in things like walks so it's easy to read."

Built on the live page (commit e7cbd64, the 4 Oct fixes). Local commit `571d7bd` on branch `terroir/prague-trim`
of /private/tmp/litto-prague-trim — NOT pushed (push = deploy, needs Arnaud's yes). Patch: `0001-…patch` (git am).

## Apply
`python3 trim_2026_10_05.py <repo> picks_2026_10_05.json` on a fresh build (refuses to run twice). Touches only
terroir/Prague-Cechy/{index.html,data.js,data.csv}, terroir/data/Prague-Cechy.js, terroir/csv/Prague-Cechy.csv,
the check config. Kit untouched.

## Numbers
- Venues 64 → 51 (13 cut, reasons in picks). Lanes 16 → 16: every lane 3, except La crème 5 (all five forced by
  the guest list / berths) and Grand cafés 4 (Orient + Imperial forced; Louvre and Slavia, torn).
- Fold cards 314 → 227. Groups kept at 4 (torn): 1922 towns, Old Town landmarks, Things Prague did first,
  Order like a regular, the afternoon of «24 hours» (a day needs its dinner), the warnings, autumn events.
- Enriched: 216 cards gain a labelled `<dl class="fcard__facts">` (Start/Length/Time/Open for walks;
  Where/Open/Cost for sights; Order/When/Book/Price for venue pointers; Days/Hours for markets;
  Getting there/Time needed for trips; Touch it today for river stories) built ONLY from the card's own
  practical line or the venue record — nothing invented; the rest stays under «Tip»; build notes
  ("no venue", "advice card") dropped. First paragraph labelled «The story» via CSS.
- Printed counts recomputed (band sub, closed #tables, fold counters, the sources ledger: 51 tables,
  51 confirmed / 0 unverified, 50 of 51 pinned). La crème desc now says "Four of the five one-star rooms".
- Floors: venues 60 → 49, fcards 250 → 217.

## Verified (local, Pages-style server)
Gate ALL GREEN with render (16 lanes, 917 organiser cards, 227 fcards, 50 pins) · glass PASS ·
probe-1004 26/26 · probe-review 20/20 · probe-redesign 14/15 — the FAIL ("Boire & sortir = 4 folds") predates
this change: #listening was added on 4 Oct, the probe was never updated · probe-links 179 links / 0 failures,
desk and phone · checklinks 0 dead (1 moved: radio.cz → english.radio.cz, same publisher).

## Not done / honest limits
The stories were not rewritten: the existing (verified) paragraphs are kept and labelled. Writing new
60–110-word stories for 216 cards would need fresh verification per fact.
