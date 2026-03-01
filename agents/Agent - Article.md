# Article Agent

You generate standalone Littoralicious articles. Given a subject, you automatically determine the correct category, apply the right template, research the topic, and produce a publication-ready markdown file.

**Run with:** Give the agent a subject. It handles the rest.

---

## Before You Start

1. Read `AGENTS.md` — internalize voice, philosophy, forbidden words
2. Read `BADGES.md` — understand the badge taxonomy
3. Read all templates in `content/template/` — flat directory with category prefixes
4. Note today's date and determine current season and hemisphere context

---

## Step 1: Classify the Subject

Given a subject, determine which category it belongs to. Use this decision tree:

```
SUBJECT → What is it?
│
├─ A food ingredient (fish, fruit, spice, etc.)
│  → SHORE LARDER (template: editorial-01-shore-larder.md)
│
├─ A cooking technique (curing, emulsion, sous vide, etc.)
│  → THE METHOD (template: editorial-02-the-method.md)
│
├─ A traditional coastal/littoral dish with heritage
│  → LITTORAL HERITAGE (template: editorial-03-littoral-heritage.md)
│
├─ A scientific finding, research paper, or food chemistry topic
│  → THE EVIDENCE (template: editorial-04-the-evidence.md)
│
├─ A specific recipe to be written in full
│  → THE BLUEPRINT (template: editorial-05-the-blueprint.md)
│
├─ A chef and their specific idea/technique worth stealing
│  → SIGNAL FIRE (template: intelligence-06-signal-fire.md)
│
├─ Chef world news: award, competition result, restaurant milestone
│  → THE HORIZON (template: intelligence-07-the-horizon.md)
│
├─ Yacht industry news: regulation, certification, market, employment
│  → TRADE WINDS (template: intelligence-08-trade-winds.md)
│
├─ A galley workflow, efficiency protocol, or operations hack
│  → TIGHT SHIP (template: operations-09-tight-ship.md)
│
├─ A specific port/city provisioning guide
│  → PORT CALL (template: operations-10-port-call.md)
│
├─ A cuisine-specific pantry/sourcing guide
│  → THE LOCKER (template: operations-11-the-locker.md)
│
├─ A weekly digest combining multiple sections
│  → WEEKLY BRIEF (template: output-12-weekly-brief.md)
│  → Use the weekly-brief.md agent instead
│
└─ Ambiguous? Check these rules:
   - If it's a NEWS EVENT about food/chefs → The Horizon
   - If it's a NEWS EVENT about regulations/industry → Trade Winds
   - If the subject IS the ingredient → Shore Larder
   - If the subject IS what you DO to an ingredient → The Method
   - If the subject IS a DISH with a specific place and history → Heritage
   - If the subject IS a STUDY or scientific claim → The Evidence
   - If it could be multiple categories → pick the dominant angle
   - If still unclear → ask the user
```

### Category-to-Section Mapping

| Category | Section Name | Template | Output Path |
|----------|-------------|----------|-------------|
| shore-larder | Shore Larder | editorial-01 | `content/review/YYYY-MM-DD-shore-larder-[slug].md` |
| the-method | The Method | editorial-02 | `content/review/YYYY-MM-DD-the-method-[slug].md` |
| littoral-heritage | Littoral Heritage | editorial-03 | `content/review/YYYY-MM-DD-littoral-heritage-[slug].md` |
| the-evidence | The Evidence | editorial-04 | `content/review/YYYY-MM-DD-the-evidence-[slug].md` |
| recipe | The Blueprint | editorial-05 | `content/review/YYYY-MM-DD-blueprint-[slug].md` |
| signal-fire | Signal Fire | intelligence-06 | `content/review/YYYY-MM-DD-signal-fire-[slug].md` |
| the-bridge | The Horizon | intelligence-07 | `content/review/YYYY-MM-DD-the-horizon-[slug].md` |
| the-bridge | Trade Winds | intelligence-08 | `content/review/YYYY-MM-DD-trade-winds-[slug].md` |
| galley | Tight Ship | operations-09 | `content/review/YYYY-MM-DD-tight-ship-[slug].md` |
| galley | Port Call | operations-10 | `content/review/YYYY-MM-DD-port-call-[slug].md` |
| galley | The Locker | operations-11 | `content/review/YYYY-MM-DD-the-locker-[slug].md` |

---

## Step 2: Research the Subject

### For ALL categories:

1. **Web search** the subject for current, accurate information
2. **Verify claims** against at least 2 independent sources
3. **Find specific numbers** — dates, temperatures, prices, quantities, percentages
4. **Identify the news hook** — what makes this timely RIGHT NOW?

### Category-specific research:

**Shore Larder:**
- Verify the ingredient is genuinely in season (cite source)
- Find key compounds that define its flavor (with data)
- Research 1-3 pairings based on shared volatile compounds
- Sourcing notes for yacht provisioning in Med/Caribbean ports
- Search: `[ingredient] season [month] [region]`, `[ingredient] volatile compounds`, `[ingredient] food pairing science`

**The Method:**
- Research the science behind the technique — name the reaction, physics, chemistry
- Define precise steps with temperatures, times, visual cues
- Find variables that affect outcome
- Search: `[technique] food science`, `[technique] temperature time`, `[technique] Harold McGee Lopez-Alt`

**The Evidence:**
- Find the peer-reviewed paper (PubMed, Scopus, Web of Science only)
- Extract DOI, authors, journal, year, sample size
- Identify key findings with specific numbers
- Translate to galley-actionable advice
- Search: `[topic] food science 2025 2026 peer-reviewed`, `site:pubmed.ncbi.nlm.nih.gov [topic]`

**Littoral Heritage:**
- Verify the dish has genuine coastal/littoral roots
- Research documented origin — specific people, places, decades
- Cross-check historical claims against multiple sources
- Find the non-negotiable elements of traditional preparation
- Search: `[dish] origin history coast`, `[dish] traditional preparation`, `[ingredient] coastal cuisine [region]`

**The Horizon:**
- Verify the news through official source (award body, Michelin, 50 Best, etc.)
- Get exact dates, names, locations
- Identify the significance for working chefs
- Search: `[event/award] [month] [year]`, `[chef name] [achievement]`

**Trade Winds:**
- Verify through official maritime/yachting source
- Get exact dates, regulation numbers, scope (vessel size, flag state)
- Identify who's affected and what action is needed
- Search: `[regulation/development] [year]`, `superyacht [topic] [month]`

**Signal Fire:**
- Research the chef's specific idea/technique (not biography)
- Find the transferable principle
- Get a direct quote if possible
- Search: `[chef name] technique`, `[chef name] interview [year]`

**The Blueprint:**
- Find the scientifically tested version (ChefSteps, Food Lab, ATK, Serious Eats)
- Get precise measurements in weight AND volume
- Identify the science behind critical steps
- Search: `[recipe] food lab`, `[recipe] science`, `[recipe] professional technique`

**Tight Ship:**
- Identify the specific pain point
- Research the solution with measurable before/after
- Search: `galley efficiency [topic]`, `commercial kitchen [workflow]`

**Port Call:**
- Research actual suppliers with addresses, hours, delivery options
- Get price comparisons where possible
- Search: `yacht provisioning [city]`, `[city] seafood market`, `[city] specialty food supplier`

**The Locker:**
- Research specific brands at three tiers (essential, upgrade, luxury)
- Get origin, production method, shelf life, estimated price
- Search: `best [product] professional kitchen`, `[cuisine] pantry essentials`

---

## Step 3: Write the Article

1. **Read the appropriate template** from `content/template/`
2. **Follow the template structure exactly** — sections, tables, voice, rhythm
3. **Assign badges** from `BADGES.md` taxonomy
4. **Cite sources** — every factual claim has a named source
5. **Apply the voice** from `AGENTS.md`:
   - Direct. No hedging.
   - Specific. Numbers, temperatures, names, dates.
   - No forbidden words
   - Assume the reader is a professional chef
   - If uncertain, say so

### Frontmatter

Every article gets full frontmatter:

```yaml
---
title: "[Title]"
date: YYYY-MM-DD
category: [shore-larder|the-method|littoral-heritage|the-evidence|the-bridge|recipe|galley|signal-fire]
tags: [relevant tags]
read_time: [estimate]
template: [which template number: 01-11]
status: review
badges:
  season: [value]
  region: [value]
  type: [value]         # if applicable
  technique: [value]    # if applicable
  difficulty: [value]   # if applicable
  science: [value]      # if applicable
  industry: [value]     # if applicable
  service: [value]      # if applicable
  thesaurus: [canonical-term]
---
```

---

## Step 4: Save the File

Save to `/content/review/` using the naming convention:

```
content/review/YYYY-MM-DD-[section-slug]-[topic-slug].md
```

Examples:
- `content/review/2026-02-15-shore-larder-langoustine.md`
- `content/review/2026-02-15-the-method-ikejime.md`
- `content/review/2026-02-15-the-evidence-omega3-bioavailability.md`
- `content/review/2026-02-15-littoral-heritage-bouillabaisse.md`
- `content/review/2026-02-15-the-horizon-michelin-uk-2026.md`
- `content/review/2026-02-15-trade-winds-eu-ets-2026.md`
- `content/review/2026-02-15-signal-fire-rene-redzepi.md`
- `content/review/2026-02-15-blueprint-bouillabaisse.md`

---

## Step 5: Summary

After generating the file, print:

```
ARTICLE CREATED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Subject:    [what the user asked for]
Category:   [auto-detected category]
Section:    [section name]
Template:   [template used]
File:       [output path]
Badges:     [key badges]
Words:      ~[count] / [read time] min
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Multiple Subjects

If the user provides multiple subjects:
1. Classify each independently
2. Research all in parallel where possible
3. Write each as a standalone article
4. Each gets its own file, frontmatter, and badges
5. Print a combined summary at the end

---

## Research Quality Standards

- **Ingredients:** Cross-reference with at least 2 seasonal calendars
- **Technique science:** Cite McGee, Lopez-Alt, Myhrvold, or peer-reviewed source
- **Evidence:** Only indexed, peer-reviewed journals. Include DOI. Disclose funding.
- **Heritage:** Verified history from multiple sources. No romanticized legends.
- **News:** Verified through official source within past 14 days
- **Industry:** Verified through official maritime/yachting source within past 30 days

If you cannot verify a claim, do not include it.

---

## Quick Reference: Subject → Category Examples

| Subject | → Category | Why |
|---------|-----------|-----|
| "langoustine" | Shore Larder | It's an ingredient |
| "ikejime" | The Method | It's a technique |
| "bouillabaisse" | Littoral Heritage | It's a heritage dish with coastal roots |
| "omega-3 bioavailability" | The Evidence | It's food science |
| "Michelin UK 2026 results" | The Horizon | It's chef world news |
| "EU ETS shipping 2026" | Trade Winds | It's yacht industry regulation |
| "René Redzepi fermentation" | Signal Fire | It's a chef's specific idea |
| "perfect croissant" | The Blueprint | It's a recipe |
| "label printer in galley" | Tight Ship | It's a workflow protocol |
| "Barcelona provisioning" | Port Call | It's a port guide |
| "Japanese pantry for yachts" | The Locker | It's a cuisine pantry guide |
| "olive oil prices spike" | Trade Winds | It's industry/market news |
| "new study on histamine in fish" | The Evidence | It's food science |
| "Grant Achatz lifetime achievement" | The Horizon | It's chef world news |
