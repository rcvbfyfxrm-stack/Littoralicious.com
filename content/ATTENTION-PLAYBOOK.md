# Littoralicious — The Attention Playbook

> A deep, cited analysis of how to keep a reader's attention on an article — neuroscience, marketing,
> UX/design, aesthetics, narrative — translated into the publication's first law (*never lose focus*).
> Built 2026-06-25 from five web-grounded research passes. **Held to our own honesty bar: each claim flags
> solid science vs. craft-lore vs. folklore.** Pairs with `DNA.md` and `DESIGN-LOCK.md`.

## The one-sentence synthesis
**Attention is held by lowering the cost of the *next* line and raising the reward for taking it** — cut
extraneous load, win the eye with a few sparing salient beats, open a small closeable curiosity gap, carry the
reader in story so they stop auditing, and make the whole thing so easy to process that ease itself reads as
truth. Everything below serves that sentence.

---

## I. NEUROSCIENCE — why attention holds or breaks

- **Two attention systems** (Corbetta & Shulman 2002). Reading is *top-down* (dorsal network holding a goal);
  every notification, popup, flashing element is a *bottom-up* hijack (ventral network) that breaks the lock.
  → **Win the bottom-up system once with a salient hook, then hand off to a clear goal. Don't litter the page
  with competing salient elements — each is an interruption.**
- **Cognitive Load Theory** (Sweller). Working memory is the bottleneck; the lever we control is *extraneous*
  load — clutter, jargon, dense blocks. → **Cut extraneous load ruthlessly; spend the freed capacity on the idea.**
- **Working memory ≈ 4 chunks** (Cowan, revising Miller's 7). → **Never make the reader hold more than a handful
  of new items; headers, lists and labelled boxes ARE chunking devices.**
- **Curiosity = information gap** (Loewenstein 1994): a felt, *small, closeable* gap between what you know and
  want to know. A vast gap produces resignation, not curiosity. → **Name the specific question the piece answers;
  re-open a fresh small gap at each section seam.**
- **Narrative transportation** (Green & Brock 2000, well replicated): absorption in a story *reduces
  counter-arguing* — immersed readers stop objecting. → **Open in scene, not in claim; story carries the reader
  past dry stretches.**
- **Processing fluency → perceived truth** (Reber & Schwarz; Alter & Oppenheimer 2009; the illusory-truth effect
  is among the most replicated in psychology). Easy-to-read literally feels *truer*. → **High contrast, clean
  type, familiar words, simple syntax are a free credibility multiplier — disfluency makes claims feel false.**
- **Scanning is the default** (Nielsen Norman Group eyetracking): users scan in an **F-pattern** when content
  isn't formatted, and a more efficient **layer-cake** (heading to heading) when it is. → **Front-load the key
  word in every heading, link and paragraph; bold the load-bearing phrase; never bury the point mid-paragraph.**
- **The attention-economy reality** (Gloria Mark 2023): median sustained attention on a screen ≈ **47 seconds**.
  → **The lede + first screen must deliver the payoff inside ~40 seconds, because the first pass is a scan.**

*Honesty note:* solid — load theory, chunking, fluency/illusory-truth, transportation, NN/g scanning, the two
networks. **Soft/overreached** — the Zeigarnik "open loop" (patchy replication; a heuristic, not a law), "flow"
(descriptive, hard to engineer), the "dopamine novelty hit" (folk-neuroscience; dopamine is prediction-error,
not a pleasure buzzer). Don't *neuro-decorate*: the behavioural findings drive decisions, brain-network names are
just colour.

---

## II. NARRATIVE & RHETORIC — the prose that won't put down

- **Causal spine: "but / therefore," never "and then"** (Parker/Stone rule). Between any two beats you should be
  able to say *therefore* (consequence) or *but* (reversal). "And then" is a list; "but/therefore" is a chain the
  reader must follow to the end. → **Run the "and-then test" on your section headers; rewrite any dead link.**
- **Open on the payoff, in scene.** Transportation + the inverted pyramid agree: earn the read in line one, then
  deepen. Don't withhold for a "reveal" — that's fiction's game, not nonfiction's.
- **Re-hook at every seam.** End sections on a small open loop (a question, a stakes-raise, a "but here's the
  problem"); the next section's first line answers or twists it. The white space between sections should *pull*.
- **Pace as music** (Gary Provost). Vary sentence length deliberately. After a long, clause-heavy sentence, drop a
  short one. Three words. It lands. Uniform length — even uniformly short — flatlines.
- **Concrete beats abstract** (Paivio dual-coding; Sadoski 2000): concrete text is recalled better and rated more
  interesting. → **"The bill was €380," not "it was expensive." Name the brand, the temperature, the number.**
- **Translate-then-stake for science.** Sentence 1: the mechanism in a plain metaphor. Sentence 2: "which matters
  because [the reader's stake]." Define jargon once with `.term`, then reuse.
- **Cutting is the master attention tool** (Strunk & White; "murder your darlings" — Quiller-Couch 1916, *not*
  Faulkner). Every word that doesn't pull is an exit the reader can take. Draft for completeness, edit for velocity.
- **Close on one idea** — ideally paying back the opening loop. A multi-point ending diffuses.

*Honesty note:* the *mechanisms* (gap curiosity, concreteness, transportation) are evidence-backed; the *moves*
(but/therefore, sentence-music, omit-needless-words) are durable **craft-lore** — cite them as expert consensus,
not science.

---

## III. UX & DESIGN — lower the cost of the next line

Ranked by leverage, with the numbers:
1. **Measure (line length) — the biggest typographic lever.** 50–75 chars, **~66 ideal** (Bringhurst/Baymard);
   WCAG caps at 80. Set `max-width: ~66ch`, not a pixel width — fixes the common desktop sprawl to 120+ chars.
2. **Body size ≥ 16px** (18–20px better for long-form desktop; 16–18px mobile). Below 16px is an engagement and
   accessibility penalty.
3. **Line-height ~1.5** (WCAG 1.4.12); paragraph spacing ≥2× font size. Tight leading = "wall of text" abandonment.
4. **Contrast ≥ 4.5:1** (WCAG AA). The failure mode is trendy light-grey-on-white — it measurably slows reading.
5. **Scannability for the F-pattern:** front-loaded subheads (the layer cake people actually read), bold lead-ins,
   bulleted lists, one idea per section.
6. **Speed:** LCP ≤2.5s, INP ≤200ms, CLS ≤0.1. A 2s delay ~doubles bounce; 53% of mobile users abandon >3s load.
   Reserve image dimensions so layout never shifts and loses the reader's place.
7. **Mobile-first:** ~63%+ of traffic is phones — measure and the 16px floor are doubly load-bearing.
8. **Above the fold:** scrolling is fine (NN/g: 57% of viewing time above fold, 17% second screen, 26% long tail)
   — don't cram, but put the hook/payoff up top.

**Remove:** entry popups/interstitials (Google-penalised + instant bounce), autoplay, sticky ads, layout shift,
light-grey body text, over-long lines, dark patterns (confirmshaming, fake scarcity, hidden close, illusion-of-
completeness). **The clean reading page IS the feature.**

*Honesty note:* well-measured — speed→bounce, 79%-scan/F-pattern, above-fold split. **Convention, not RCT** — the
exact "66 chars" (the *band* is solid). **Myth** — serif-vs-sans legibility (size & contrast dominate; a serif for
warmth is a free brand choice). **Weak/contradictory evidence** — the **reading-progress bar reducing abandonment**:
the literature is on surveys, not articles, and is mixed; treat it as a neutral affordance, *not* a retention tool.
(*Adjusts my earlier suggestion — the bar is decorative, not a focus lever.*)

---

## IV. AESTHETICS — beauty as a truth-and-patience lever

The judgment is fast and pre-rational; the mechanism is "well-crafted = trustworthy & easy."
- **Aesthetic-usability effect** (Kurosu & Kashimura; NN/g): a beautiful page is judged easier and more credible —
  and readers forgive small friction. **Craft buys patience.**
- **Fluency → truth** (Reber/Schwarz/Winkielman): fluent design makes the *argument itself* feel more correct.
- **Gestalt (common region):** enclose each callout/stat as one bounded, well-padded unit — not a stacked pile.
- **Von Restorff / isolation effect:** the pull-quote, the one highlight, the one-big-number work *only because
  everything around them is uniform.* **Highlight sparingly — three highlights cancel each other.**
- **Design-as-credibility** (Stanford/Fogg): ~46% of users named visual design the top basis for judging
  credibility — the single most-cited factor. Small craft defects discount even accurate, sourced content.
- **Negative space** raises the salience of what remains; **images must carry information** (a dish, a diagram) —
  decorative stock photos compete with the text and add disfluency.

*Honesty note:* robust — fluency-as-truth, aesthetic-usability, Von Restorff, design-as-credibility. **Folklore** —
"colour psychology" emotion-by-hue lookup tables (red=urgency, blue=trust); what's real about colour is *contrast/
salience* and *appropriateness/consistency*, not fixed feelings.

---

## V. MARKETING & ENGAGEMENT — start, keep, finish (honestly)

- **Headline:** specificity + value promise + a *controlled, honest* curiosity gap. Concrete headlines beat vague
  curiosity-gap teasers (Nature 2024); clickbait wins the click and **loses trust (54.5% report lower trust)**.
- **The lede is a transition, not a summary** (Sugarman's slippery slide): the headline earns the first sentence;
  the first sentence earns the second. Keep openers short and frictionless.
- **Match the opening to awareness** (Schwartz's 5 stages): cold readers need a story/problem hook; warm readers
  want the specific claim up front.
- **Metrics that tell the truth** (Chartbeat): **engaged/dwell time, scroll depth, read ratio, return rate** —
  NOT pageviews. A 2nd-page reader returns at 22% vs 8%. Social traffic is shallow (~1.4 pages, 34s); depth comes
  from direct/internal. → **Add scroll-depth + engaged-time analytics; you can't improve focus you don't measure.**

*The honesty line (non-negotiable for this brand):*
- A hook may *promise* the payoff; it may **never withhold or misrepresent** it. The headline must be literally true.
- **No** manufactured urgency, fake scarcity, "you won't believe," pre-checked boxes, buried unsubscribe,
  confirmshaming, infinite-scroll/autoplay traps.
- **The test:** would the reader feel *respected* or *tricked* if they saw the tactic named? If tricked, cut it.
  (Persuasion helps the reader decide in their own interest with true information; manipulation exploits a bias
  against it.)

---

## VI. The Littoralicious checklist (apply to every draft)
1. **Payoff in the first 40 seconds** — `summary-box` promise + a lede that transitions, not summarises.
2. **The spine test** — boxes + `<mark>`s + bold lead-ins + h2s alone tell the whole argument (the scannable spine).
3. **But/therefore** — no "and then" between sections; each seam re-opens a small gap.
4. **One idea per block; SIGNAL only** — no stacked boxes (Gestalt + load). Highlight/pull-quote/big-number used
   *sparingly* (Von Restorff).
5. **Fluency set right** — `max-width ~66ch`, ≥16–18px, line-height ~1.5, contrast ≥4.5:1. (Serif is fine.)
6. **Concrete over abstract** — a number, a temperature, a named thing in every section.
7. **Translate-then-stake** any science; define jargon once with `.term`.
8. **Cut on the second pass** — delete every word that doesn't pull; kill the darlings.
9. **No interruptions** — newsletter prompt only at the end; never a modal. The clean page is the feature.
10. **Close on one idea** that pays back the opening.
11. **Honesty** — true headline, sourced claims (`citation-card`, dual grade), no dark patterns. Respected, not tricked.
12. **Measure it** — scroll depth + engaged time per article; learn where readers drop, fix that section.

*Length honesty:* long-form loses people — most won't finish 17 minutes. Prefer a ruthless **8–12 min** with a
hard spine, or give skimmers a "two-minute version" block up top so the depth is opt-in.
