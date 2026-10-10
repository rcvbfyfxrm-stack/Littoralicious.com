# HOT WEEKLY — refresh one guide's "What's hot this month" board, every week

Arnaud, 9 Oct 2026: *"every week check the update of what's hot in one of the guides (one every week) automatically and
update it."* He chose **review first** (the refreshed board waits on a branch; he says "push") and **cloud** (the
environment gets network access). Reference board: live `terroir/Prague-Cechy/` (`#why-now` pointer + `#hot-foot`).

## 1 · Which guide this week
1. List every guide with a board: `grep -l 'data-hot-asof=' terroir/*/index.html`.
2. Skip a guide that has an open branch touching it: `git ls-remote --heads origin 'terroir-uplift/<slug>*' 'terroir-hot/<slug>*'`
   (an uplift branch refreshes its own board; an open hot branch is waiting for Arnaud).
3. Pick the **oldest `data-hot-asof`**. Ties: the earliest `data-hot-review`. One guide per week, never more.
4. If the chosen guide has no board yet, stop: boards are built by the GOLD6 pass, not here.

## 2 · Network first — never fake a board
Before any research, prove the web is reachable: `curl -s -o /dev/null -w '%{http_code}' https://www.wikipedia.org/`
must be 200 (or 301/302). If it is not, write `hot_weekly` log entry `{"slug", "date", "status": "needs-network"}` in
`terroir/_rollout/state.json` on a branch `terroir-hot/<slug>-<YYYY-MM-DD>`, push it, and stop. A board written from
memory is worse than a stale one: a stale one at least shows its date.

## 3 · What the board covers (the next ~5 weeks from today)
Rebuild the board for the period from today to about five weeks out, named by month ("OCT–NOV 2026" when it straddles).
Keep the guide's existing group structure where it still fits (Prague: *On the water / outside · In the sky · On the
plate · In the calendar*); adapt groups to the place, never pad.
- **Calendar:** festivals, concerts, fairs, religious and civic days, openings, closures, strikes, ferry/timetable
  changes — each with exact dates, verified on the organiser's / venue's own site (dated), a city tourism office, or
  quality press. Ticket price only if published (dated).
- **On the plate:** what is in season NOW in this place (the market, the fish, the harvest, the dish that appears on
  boards this month), and any food event. Verified, sourced.
- **Outside / on the water:** what changes with the season (sea temperature, swims ending, boats stopping, gardens
  closing for winter, markets' last dates).
- **In the sky:** sunset/sunrise shifts, clock changes, full moons (US Naval Observatory or timeanddate), meteor showers.
- Carry forward what is still true from the old board; drop what has passed; never repeat a fact told elsewhere in the
  guide — point to its card instead (the "told once" rule).
- Each item is a `.fcard` with the GOLD6 labels (`When · Where · Cost · Tip`), a `<=110`-char teaser, a 40–90-word TRUE
  story, one "why/tip" line; Maps link only for a place you go (a sky event gets none). Sources go into `#sources`.

## 4 · Everything that carries the date — all of them, same commit
1. `#hot-foot`: `data-hot-asof` = today, `data-hot-review` = about 6 weeks out (never past the end of the month after
   next); the summary `sfold__desc` "Checked <date> — …" line; the `sfold__count` month label; the lede's month.
2. The `#why-now` pointer: its "Checked <date> — <four headline items>" line and "review by <date>" line. The gate fails
   if the pointer's date drifts from `data-hot-asof`.
3. `hot_this_month` on the venues that genuinely have something on (at least the gate's `hot.minVenues`), in BOTH
   `terroir/<slug>/data.js` and `terroir/data/<slug>.js` (byte-identical), and column `hot_this_month` in BOTH CSVs
   (`terroir/<slug>/data.csv`, `terroir/csv/<slug>.csv`). Clear stale ones.
4. If the guide has the §8 Getaway Weekend: its dated "This <Month>" block (`.gx-weekend__more` / `.gx-romance__more`
   item with the dated line) — rewrite its items and date to match the new board, in place.
5. The guide's check config `hot` stays as it is; never loosen it to pass.

## 5 · Prove it
`python3 terroir/_rollout/lib/checks_gold4.py . terroir/_rollout/lib/guides/<slug>.check.json` WITH render = ALL GREEN
(it asserts the board's age, review date, pointer date and venue count) · `checklinks.py . <slug>` = 0 dead among the
links you added · `node terroir/_rollout/lib/gold6/probes/probe-guide.cjs <url>` and, if the guide has §8,
`probe-readings.cjs <url>` · a desktop and a phone screenshot of the opened board under `terroir/_rollout/review/hot/<slug>-<date>/`.

## 6 · Hand over (review first)
Branch `terroir-hot/<slug>-<YYYY-MM-DD>` cut from `origin/rebuild/publishing-system`; commit the guide files, both CSVs,
the screenshots, a `review/hot/<slug>-<date>/board.json` (every item with its source and the date it was verified) and
`state.json` with a `hot_weekly` entry `{"slug", "date", "branch", "status": "review", "asof", "review", "checks": [...],
"notes"}`. Push THAT branch. **Never push to `rebuild/publishing-system`** — that push is the live deploy, Arnaud's call.

To publish when Arnaud says push: fetch the branch, rebase onto `origin/rebuild/publishing-system`, re-run the gate with
render, push `HEAD:rebuild/publishing-system`, watch the deploy, md5 the live page, glass the live URL, set the entry `done`.
