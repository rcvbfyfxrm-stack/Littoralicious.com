# GOLD6 toolkit — bring a guide to the Prague level (6 Oct 2026)

Target and rules: `../../PLAYBOOK.md` §GOLD6. Live references: `terroir/Prague-Cechy/`, `terroir/Siracusa-Sicilia/`.

- `SPEC.md` — the card rewrite spec (hook, story, why, labelled facts by card type, the honesty rules).
- `facts_tidy.py <index.html>` — post-step on the built page: labelled values capitalised, never repeating their label.
- `probes/probe-guide.cjs <url>` — interaction probe for any GOLD6 page (chapters, sub-tags, readout, pointer
  landing, back button, labels on every card, guest list at the foot, phone 390px). Needs playwright
  (`npm i -g playwright && npx playwright install chromium`, then `NODE_PATH=$(npm root -g)`).
- `probes/probe-links.cjs desk|phone <url>` — clicks every visible link under every filter; must be 0 failures.
- `reference/prague/` — ROUTE A, a post-step on a page that already has the reading layer: `picks_*.json`
  (the editorial cut, with a reason per kept item) → `trim_*.py` (removes cut venues/cards everywhere, rebuilds
  the guest list and counts) → `rewrite_*.py` (applies rewritten cards/venues kept as JSON). Paths inside are
  the author's scratch paths: repoint them.
- `reference/sicily/` — ROUTE B, building the layer from research on the LIVE Prague chrome: `layouts.py`
  (picks as data, ≤3 per group, every 4 commented) → `resolve.py` (asserts the caps, exports enrichment
  inputs) → enrichment JSON per SPEC → `hand_<city>.py` (the hand-written prose) → `city_build.py <city>`
  (renders folds with labelled facts, emits data.js/CSVs/.ics, assembles chapters/tags/glossary on the Prague
  chrome) → `gate_config.py <city>`. `REPO` and paths inside point at the author's clone: repoint them.
- Which route: a guide already on the reading layer → A. Anything else (Kendwa, Diani, Istanbul, Athens and
  older) → B, reusing the guide's own data.js/research as the venue and card source.
