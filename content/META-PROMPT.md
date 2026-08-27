# Littoralicious — THE MASTER META-PROMPT

> **Fires on every article** — new draft, rewrite, or final edit; written by a human session or a
> routine. This file is the PROTOCOL: it sequences the canon into one gated pipeline and adds two
> laws of its own (the Learning Contract, the Template Identity Grid). It does not replace the canon:
> voice/truth live in `DNA.md`, attention mechanics in `ATTENTION-PLAYBOOK.md`, markup in
> `DESIGN-LOCK.md`, the evidence bar in `articles/the-source-standard.html`. On conflict:
> HOUSE-STANDARD > DNA > DESIGN-LOCK > this file > the template file. Structure detail (the exact
> beats) lives in each `templates/*.html`; identity (what makes the template unmistakable) lives here —
> if a template contradicts its grid row, fix the template.

## The contract — six promises every article makes

1. **TRUE.** Every claim survives the eight tests; the grade decides the verb; below B is cut, not
   softened. Omit before you fabricate. History gets the same bar as science: named records, dated
   events, documented-vs-legend said plainly.
2. **NEW — even to a professional.** The Learning Contract below. A piece that only tells a
   10-year chef what they already know does not ship.
3. **CAPTIVATING, intro to end.** The first law (never lose focus) + the intention test: nobody
   reads out of duty. The template's opening register (grid below) earns the first 40 seconds;
   every seam re-opens a small gap.
4. **DISTINCT.** Unmistakably its template (signature object present, forbidden moves absent) and
   unlike our own last pieces (sameness audit, gates 0a–0c).
5. **SIGNAL ONLY.** Every block earns attention or dies. The final edit removes roughly a third.
6. **WARM.** The Grandmother pillar visible — mandatory in food-facing templates, recommended
   everywhere. Rigour is the method; nurture is the reason.

## THE OPENING (law) — the sum-up, not a promise

Founder rule, 2026-08-26: **no template promises what you get before you buy it.** The opening device
is the **sum-up** — the `article-toc` with a one-line description under every section, so the reader
sees the whole piece in one glance and clicks straight to what they came for. It sits after the intro
(the name, the scene, the vital signs, the folded origin on an ingredient piece; the lede paragraph
elsewhere) and before the first section. The promise box (`summary-box "What you'll get"`) is retired
from every template; the CSS stays for older pages.

The sum-up is skipped only where it makes no sense: a piece too short to need a map, or a template
whose own signature device pays off sooner and better — **01b** (The Name, then the two-minute
version), **04** (the claim, settled by the Citation Card), **06** (the dated number, then the Signal
Board), **12** (Since last week). Never copy another template's opener. `tools/lint.mjs` checks the
law, not the box: any locked payoff device counts, as long as it lands inside ~150 words.

**Three reader devices go with it (same rule, 2026-08-26):**
- **Click-to-define.** Every rare word carries a definition on click — `<span class="term"
  data-def="…">` — written to capture exactly the sense of the word, beautifully, in one or two
  lines. Names with a story (Daphne, the wreath) carry the tale the same way: `data-kind="story"`.
- **No Stories section.** Tales live where they bite — a small `note--quote` box beside the passage,
  or behind the word — never gathered at the end.
- **Pairings are cards.** `pair-cards`: the pairing on the card, the reason on click; the wild card
  starred. Where the pairings were found by shared compounds, one line after the grid points at the
  **Pairing Wheel** in the Spoon Lab (`<a href="#pairings" data-open-lab>`) and says plainly that it is
  simmering, not ready — never a date. Galley intel opens on concrete ideas — ways to use it, compound logic and all.

**The ingredient standard (locked 2026-08-26).** `templates/shore-larder.html` + `shore-larder-deep-dive.html`
carry one spine — `articles/bay-leaf.html` and `articles/saffron.html` are the reference builds: encounter → sketch set into the column →
the name → the taste (closing on what it does in the hand — the snap, the crack, the smell) → the origin folded,
as a card directly under the taste → the old habit teased → sum-up, outside the fold → Science (numbers, Blind Spot, chemistry,
**Is it a remedy?** with the dose gap, the folk use that holds, and **how to use it that way**) → Pairings
(register chips, 2–5 ingredients, one COMPOUND card naming the shared molecule and its share of both oils) →
Galley Intel (carreaux tiles) → How to Buy (the varieties as CARDS — flavour profile, best for, a little story
told nowhere else) → the one thing. Retired for good: the promise box, the Cook's
Reason box, the Stories section, the Quick Reference card, and the Galley Batch box unless it teaches
something a pro does not know.

**Concision is a law, not a style.** Say it once. Clear, direct, efficient, without losing substance;
a repeated fact is a cut, not an emphasis.

## THE LEARNING CONTRACT (law)

Every article carries **at least three load-bearing facts a working professional chef — ten years
in — likely does not know.** Each one verified (Grade A/B for science; named record for history;
first-hand counted trial for at-sea claims). One of the three must land **in the first two
screens**; the template's pro-hook device (grid below) carries the loudest of them, wherever it sits.

- **The brigade test:** would a ten-year head chef stop mid-scan and reread? Run it on each of the
  three. If none passes, the piece is not ready — research deeper or kill the topic.
- **Vary the kind:** a number, a mechanism, a history — not three trivia of the same flavour.
- Mark the jolt: the surprising clause takes the `<mark>`, the source sits in the same beat.
- Fail honestly: if the subject genuinely holds fewer than three, narrow the subject (a sharper
  slice always holds more), don't pad the count.

## THE PIPELINE (phases and gates — run in order)

**0 · FIT.** State the rules summary; auto-select the template (never ask, never invent). No fit →
narrow, split, or refuse. Write the unique-angle sentence (gate 0a) and pick the one ownable move
(gate 0b) before drafting.

**1 · HUNT (research before a word is drafted).** Gather, in this order: the primary papers —
**resolve every DOI now, not at the end**; the tradition beat (named place, dated record, real
hands); the at-sea reality (holding °C, swell, provisioning); the money trail (who grows/lands/
funds/margins); and **six candidate Learning-Contract facts — keep the best three.** A draft
started before the hunt is finished will smuggle in filler.

**2 · BUILD.** Scaffold with `npm run new -- --template <name>`. Fill every mandatory beat of the
template; open in the template's opening register; locked components only, a prose bridge between
any two boxes; rotate devices vs the last 3–5 pieces (gate 0c). Write the headnote/lede last.

**3 · FINAL EDIT — a separate, adversarial pass. Never merged with drafting.**
The editor's job is to attack the draft, not admire it:
- **E1 Claims audit.** Extract every checkable claim → resolve → grade → verb matches grade →
  cut what can't reach B. (This is where fabricated citations die.)
- **E2 The cut.** Remove ~⅓. Every sentence pulls or dies. Canned template bridge lines shipped
  verbatim ("Before the numbers…") are filler — rewrite them piece-specific or cut.
- **E3 Spine test.** Boxes + `<mark>`s + bold lead-ins + h2s alone must tell the whole argument.
- **E4 Stack scan.** No two boxes adjacent; ≤~150 words of unbroken prose; kickers under h2s.
- **E5 Placeholder scan.** No `000`, no `[bracket]`, no `placeholder`, no `{{`, no empty box.
- **E6 Learning Contract.** The three facts present, marked, sourced; one in the first two screens.
- **E7 Identity check.** Signature object present; opening register honoured; forbidden moves
  absent; sameness audit vs the last 3–5 pieces passed.
- **E8 The 11 PM read.** The DNA test, as a tired chef, on a phone. The eye drifts once → not done.

**4 · PROVE.** `npm run build` → `npm run validate` → `npm run lint` (0 errors). Then **render the
article headless and read the rendered page** — render contracts fail silently; the file being
right proves nothing. Blueprint: both galley-card PDFs exist and fit one A4.

**5 · SHIP.** `draft: true` always — every article passes the Studio gate; Arnaud is the only
publish authority. Push (push is the save). Corrections are printed, never quietly swapped.

## THE TEMPLATE IDENTITY GRID (the distinctiveness law)

Every template answers four questions differently: how it **opens**, what object **owns** it, where
the **pro learns**, and what it must **never** do. Two templates that answer alike are one template.

| # | Template | The promise | Opening register | Signature object | Pro-hook (Learning Contract lead) | Forbidden moves |
|---|---|---|---|---|---|---|
| 01 | Ingredient Profile | The fast, warm field profile of one ingredient | **The Name** — the word and where it comes from, the other names and WHY they exist, the family and what the kinship tells a cook; then in scene at the encounter (dock, crate, market, pan), then The Cook's Reason | The Name + The Cook's Reason + vital-signs `glance` + The Pairings table with the littoral wild card + The Varieties | **The Blind Spot** — what most pros have wrong about this everyday ingredient, opening The Science | The deep-dive dossier (id-card, register ladder, compound table); a second stat grid; an unsourced folk etymology |
| 01b | Ingredient Deep-Dive | The laboratory dossier: one ingredient, four registers | **The Name** — the word and its origin, the other names and WHY, the family — then **the paradox**, the ingredient's central contradiction in two lines | The Name + The Paradox + the two-minute version + 8-cell Identity Card + Four Ways + register ladder + compound table + The Fraud Test | The Frontier register + shared-molecule bridges | Shipping without Four Ways; filler examples ("several only where notable") |
| 02 | Technique | One technique — provoked, instructed, proved | **The failure everyone has had** — the standard approach and the break it produces | Provoke→Instruct→Prove arc + The Numbers table + the When-It-Breaks ladder + lineage note + the explainer slot | The threshold number on a primary paper; an interactive explainer where the technique earns one (self-explanatory, reader-driven) | Recipe content (Recipe Blueprint's, 05); steps without mechanism |
| 03 | Heritage | A dish's documented life, told warm | **A dated scene** — a real recorded moment (year, place, hands), watched | Heritage Timeline (the only template where time passes) + Origin Card + Legend vs Record + Tradition Ledger + the spoken line | **Documented-vs-legend** — the origin story pros repeat, corrected against the record | Undated round-number history; ingredient-profile machinery |
| 04 | Study Decoded | One paper, decoded to one galley move | **The finding as a usable sentence** — actable tonight | Citation Card with grade chip; The Best Evidence Against; the 1–2 min discipline | "What Cooks Already Knew" + honest limitations (calibration, not just facts) | Multi-study essays; running past 2 min; any stacked box |
| 05 | Recipe Blueprint | A recipe engineered: ratio, science, two services | **The sensory payoff** — headnote sentence one, what the dish does when it works | The `rcp` engine + two galley cards + "Did you know" | The ratio (memorise once, rescale anything) + one measured number with DOI | Re-ordering ings/steps post-publish; baker's % outside the ratio box; touching the locked card design |
| 06 | Supply Alert | The flare — act this week | **The number that moved, dated** — the lede is the signal | Signal Board (3 cells) + The Move, early | **Where It Really Comes From** — real provenance vs label, who clips the margin | Future-tense calls (the Forecast's, 07); an essay without the board |
| 07 | Forecast | The forecast that argues with itself | **The bet, stated** — thesis, no hedging | Forecast Scorecard + "Falsifies if" + case-for/case-against | The falsifier + watch-list thresholds (teaches reading the indicators) | Unfalsifiable calls (don't ship); "certain"; act-now framing (Supply Alert's, 06) |
| 08 | Career & Industry | The rulebook moving under your feet, by region | **The dockside myth** — what everyone repeats, and the shift making it dangerous | The comparison rack (case-grid / hub-grid / band-ladder) | The named statute + exact threshold pros half-know + The Trap | Hand-rolled grids; advice without the named rule; one-rule-fits-all |
| 09 | Galley Operations | A protocol that survives swell — printable | **The constraint in hard numbers** — m², covers, minutes; a design parameter | The Station Map (`galley-plan`) + print actions | Proof-it-scales counts ("held 14 of 16") + the daily non-negotiable, timed | An essay without the map; vibes instead of counts |
| 10 | Port Call | The port, decoded from the berth | **The port's single hard fact** — the constraint that shapes every decision | Quick Map text table + Three Berths + the Dwell-Time Ladder (hours / days / week: Agent Brief, Quick Radius, source suppliers) + Cook This Port | The one number repeated at the pass (cold-chain figure, named agency) + price-vs-import | Graphic maps (Terroir's); tourism prose; unverified suppliers |
| 11 | Equipment Review | Gear judged against the job, counted | **The job it has to do** — the galley problem, precisely defined | the Verdict chip (BUY / SKIP / BUY IF) + `glance` spec grid + counted test + when-not-to | The claim-vs-physics check + the trial data, conditions named | Brochure rewrites; softened verdicts; specs without price/footprint/draw |
| 12 | Weekly Brief | The continuing conversation | **Since last week** — the carried thread, first | The serial frame (Since last week settles closed calls / Watching next) + note rotation | One named source + one figure per item; the flip thresholds in Watching next | More than 5 items; two consecutive same-type notes; a one-shot list |
| 13 | The Lab | We ran the test so you don't have to | **The question, as a bet** — hypothesis + falsifiable prediction, pinned | Hypothesis→Method→Data→Verdict; Where It Disobeyed; failures reported | The deviation — where the data disobeyed the prediction; n and conditions stated | Post-hoc certainty; hiding failed trials; universal claims from n=3 |

**The call-back loop (founder law, 2026-08-24).** Every Supply Alert and Forecast ends with one
line — *We report back: [date]* — and the Weekly Brief's "Since last week" beat must settle every
call whose window or horizon has closed: held, missed, or falsified, printed plainly with the
number. A publication that keeps its own score is the one a professional trusts.

**The smart explainer (founder rule, 2026-08-24).** Techniques AND science mechanisms get an
interactive, animated explainer — *not always, but when it speaks*: when the mechanism has a visible
process (a set point, a phase change, an emulsion forming, a diffusion front). Bar = the egg
explainer (`_pencil-art/interactive/egg-explainer.html`): lit real-time 3D, self-explanatory from a
paused frame with the text hidden, reader-driven with a Play button, never autoplay, motion lock.
Where nothing moves, no animation — never decorate.

## Automation wiring

- `tools/draft.mjs` and `tools/rewrite.mjs` embed this file in every brief, after the DNA — the
  writing agent runs phases 1–3 itself; `--apply` then enforces phase 4's lint.
- The cloud routines (auto-draft, rewrite-queue, publish-and-post) obey phases 3–4 before any
  apply, and phase 5 always: `draft:true`, Arnaud gates live.
- `npm run lint` currently enforces: headline rules, emoji, banned words, unsourced phrasing,
  British spelling, the opening payoff device, `<mark>` presence, 150-word runs. The rest of the final edit
  (E1–E3, E5–E8) is judgment — run it as its own pass, never assume the linter caught it.
