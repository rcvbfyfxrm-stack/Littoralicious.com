# CLAUDE.md — Littoralicious

## Project Purpose

**Littoralicious** — A digital publication for professional yacht chefs and culinary obsessives. The name fuses "littoral" (relating to the shore/sea) with "literally delicious."

---

## Brand Identity

### The Core Idea

> "The sea doesn't care about your Michelin stars."

We are the unfiltered signal in a noise-saturated culinary world. No influencer fluff. No sponsored content dressed as insight. Just brutal, science-backed cooking intelligence for chefs who take their craft seriously.

### Positioning (Onliness Statement)

**Littoralicious** is the only culinary publication that combines:
- Maritime gastronomy expertise
- Rigorous food science
- Zero bullshit editorial voice
- Interface designed for working professionals

### Target Audience

**Primary:** Professional yacht chefs navigating the intersection of luxury service and hostile maritime environments.

**Secondary:** Advanced home cooks, food nerds, and culinary professionals who value substance over spectacle.

### Voice & Tone

- **Direct.** No hedging. If it's wrong, say it's wrong.
- **Technical.** Precision in language reflects precision in craft.
- **Irreverent.** Respect the science, question the dogma.
- **Economical.** Every word earns its place.

---

## Design Philosophy

### The Aesthetic

**"Old journal refined through Apple glass."**

The design draws from two sources:
1. The authority of classic broadsheet newspapers
2. The clarity of modern minimal interfaces

### Visual Principles

| Element | Approach |
|---------|----------|
| Color | Black, white, one accent (maritime grey-blue) |
| Typography | Serif for headlines (authority), system sans for body (legibility) |
| Spacing | Generous. Let content breathe. |
| Images | Monochrome or muted. Never stock-photo-polished. |
| Layout | Grid-based, asymmetric tension |

### Design Rules

1. **No gradients.** Flat is honest.
2. **No rounded corners on content blocks.** Sharp edges signal precision.
3. **Mono-spaced for data.** Temperatures, times, ratios.
4. **Pull quotes are rare.** When used, they must be genuinely remarkable.
5. **White space is content.** It signals confidence.

---

## Content Categories

### 1. Dispatches
Short, brutal news items. 100-300 words. One insight per dispatch. Published frequently.

### 2. Deep Dives
Long-form investigations. 2,000-5,000 words. Thoroughly researched. Published monthly.

### 3. The Science Desk
Food science explained without condescension. Maillard, fermentation, emulsification — the chemistry that separates craft from guesswork.

### 4. Technique Files
Step-by-step protocols. No fluff. No "Grandma's secret." Just the method, the science, the variables.

### 5. Galley Notes
Yacht-specific content. Provisioning in remote ports. Equipment that survives salt air. Managing owner expectations.

---

## Content Standards

### Principles (from IdeaForge)

1. **The Headline Does 80% of the Work** (Ogilvy)
   - Every headline must promise specific value
   - If you can't summarize it, don't publish it

2. **Spécificité Bat Généralité** (Hopkins)
   - "140°C for 47 minutes" > "until golden brown"
   - Numbers, names, citations — concrete beats abstract

3. **Le Client Est le Héros** (Miller)
   - The reader is the professional solving a problem
   - We are the guide, not the protagonist

4. **La Récompense Variable** (Eyal)
   - Mix content types and lengths
   - Surprise in the familiar

5. **Peak-End Rule** (Kahneman)
   - Every article ends with something memorable
   - The last line is as important as the first

### Quality Gates

Before publishing, every piece must answer:
- [ ] What does the reader gain they couldn't get elsewhere?
- [ ] Is every claim sourced or tested?
- [ ] Could this be shorter without losing value?
- [ ] Does the headline promise what the article delivers?

---

## Technical Structure

```
littoralicious/
├── index.html              # Homepage
├── article.html            # Article template
├── about.html              # About/manifesto
├── assets/
│   ├── css/
│   │   ├── style.css       # Main stylesheet
│   │   └── typography.css  # Type system
│   ├── js/
│   │   └── main.js         # Minimal interactions
│   ├── images/
│   └── fonts/
├── content/
│   ├── articles/           # Long-form markdown
│   ├── dispatches/         # Short news markdown
│   ├── science/            # Science desk pieces
│   └── techniques/         # Technique files
└── data/
    └── articles.json       # Content index
```

---

## Typography System

### Scale (1.333 — Perfect Fourth)

```
--text-xs:    0.75rem   (12px)
--text-sm:    0.875rem  (14px)
--text-base:  1rem      (16px)
--text-lg:    1.333rem  (21px)
--text-xl:    1.777rem  (28px)
--text-2xl:   2.369rem  (38px)
--text-3xl:   3.157rem  (50px)
```

### Font Stack

**Headlines:** Georgia, 'Times New Roman', serif
**Body:** system-ui, -apple-system, sans-serif
**Data/Code:** 'SF Mono', Consolas, monospace

---

## Color Tokens

```css
:root {
    /* Core */
    --color-ink: #0a0a0a;
    --color-paper: #fafafa;

    /* Accents */
    --color-sea: #2d4a5e;      /* Maritime blue-grey */
    --color-salt: #94a3b8;     /* Muted secondary */

    /* Functional */
    --color-border: #e2e2e2;
    --color-muted: #6b7280;

    /* Dark mode inverse */
    --dm-ink: #fafafa;
    --dm-paper: #0a0a0a;
}
```

---

## Naming Conventions

| Type | Format | Example |
|------|--------|---------|
| Articles | slug-with-hyphens.md | maillard-at-altitude.md |
| Dispatches | YYYY-MM-DD-slug.md | 2026-01-25-squid-ink-recall.md |
| Images | category-slug-01.jpg | technique-reverse-sear-01.jpg |

---

## Do Not

- Add stock photography
- Use exclamation marks in headlines
- Publish without sources
- Add "Subscribe to our newsletter!" popups
- Use "delicious," "yummy," or "mouthwatering"
- Refer to food as "elevated" or "curated"

---

## Content Sourcing

Draw from Chef vault knowledge:
- **02-Flavors/** for ingredient science
- **03-Techniques/** for method deep-dives
- **05-Yacht-Operations/** for galley-specific content
- **_References/** for equipment reviews

Apply IdeaForge principles:
- Psychology of the reader (Kahneman, Cialdini)
- Narrative structure (Miller, McKee)
- Precision and testing (Hopkins, Ogilvy)

---

*Littoralicious — Literally the Sea. Literally Serious.*
