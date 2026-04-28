# Littoralicious Content Guide

How to write for a publication that respects its readers.

---

## The Core Principle

> **Every word must earn its place.**

We write for professionals with limited time and high standards. Fluff is disrespect. Vagueness is a waste. If you can't be specific, don't publish.

---

## Content Types

### Dispatches (100-300 words)

Short news items. One insight per dispatch.

**Structure:**
1. Lead with the news (1-2 sentences)
2. Context/implications (2-3 sentences)
3. What this means for the working chef (1-2 sentences)
4. Source citation

**Example lead:**
> ✗ "Exciting news from Japan about fish aging..."
> ✓ "The JIF has revised its recommended bleeding time for Pacific bluefin from 45 to 62 minutes."

### Science Desk (1,500-4,000 words)

Deep dives into food science. The goal: understanding that enables improvisation.

**Structure:**
1. **Hook** — Why should I care? (1 paragraph)
2. **The Science** — What's actually happening at molecular/physical level
3. **The Data** — Numbers, studies, tested results
4. **Practical Application** — What to do differently
5. **Caveats** — When this doesn't apply
6. **Key Numbers** — Summary box
7. **Sources** — Full citations

### Technique Files (800-2,000 words)

Step-by-step protocols. No stories. Just method.

**Structure:**
1. **What this is** — One sentence
2. **When to use** — Conditions where this technique applies
3. **Requirements** — Equipment, ingredients, conditions
4. **Protocol** — Numbered steps with temperatures/times
5. **Troubleshooting** — What goes wrong and fixes
6. **Variations** — Adjustments for different contexts

### Galley Notes (1,000-2,500 words)

Yacht-specific intelligence. Practical knowledge from experience.

**Structure:**
- Varies by topic
- Must include specific, verifiable information
- Personal experience acceptable if clearly labeled

---

## Voice Guidelines

### Be Direct

> ✗ "It's important to consider that you might want to think about..."
> ✓ "Do this."

### Be Specific

> ✗ "Cook until done."
> ✓ "Cook until internal temperature reaches 63°C, approximately 12 minutes for a 3cm fillet."

### Be Honest About Uncertainty

> ✗ "This always works."
> ✓ "This worked in 14 of 16 trials. The failures occurred when ambient humidity exceeded 80%."

### Respect the Reader

Assume competence. Don't explain basics unless the article is specifically about basics. A piece on emulsion stability can assume the reader knows what an emulsion is.

---

## Formatting Standards

### Numbers

- Spell out one through nine, use numerals for 10+
- Always use numerals for:
  - Temperatures: `63°C`, not `sixty-three degrees`
  - Times: `12 minutes`, not `twelve minutes`
  - Measurements: `150g`, not `one hundred fifty grams`
  - Percentages: `23%`, not `twenty-three percent`

### Units

- Metric only (Celsius, grams, liters, centimeters)
- Exception: Fahrenheit in parentheses for US readers: `63°C (145°F)`

### Temperature Notation

Use the `.temperature` class in HTML for automatic formatting:
```html
<span class="temperature">63</span>
```
Renders as: 63°C

### Data Formatting

Use the `.data` class for any numerical data that benefits from monospace:
```html
<span class="data">165°C for 47 minutes</span>
```

### Tables

Use for comparative data. Keep columns under 6. Align numerical data right.

### The Knowledge Retention System (Mandatory — No Exceptions)

A chef reads this at 11 PM, wrecked, between courses. The knowledge has to jump off the screen, burn into memory, and survive until morning. Plain paragraphs don't do that. Color does. Contrast does. Structure does. Research shows color-coded annotations improve recall by 11.5%. We are going to use every visual weapon in the arsenal.

**This is not optional.** Every single article on Littoralicious must be visually loaded for retention. If an article reads like a grey wall of text, it is not done.

---

#### Tool 1: Callout Boxes — The Backbone

Five color-coded box types. Every article uses a mix. No article ships without them.

| Type | Class | Label | Color | Purpose |
|------|-------|-------|-------|---------|
| Key Point | `note note--key` | KEY POINT | Gold/Yellow | The fact that must survive in the reader's head tomorrow |
| Science | `note note--science` | THE SCIENCE | Blue | Research data, statistics, peer-reviewed claims |
| Action | `note note--action` | TAKEAWAY | Green | Practical instruction — what to DO with this knowledge |
| Warning | `note note--warning` | WARNING | Red | Mistakes, dangers, things that ruin the dish or the career |
| Quote | `note note--quote` | REFERENCE | Purple | Citations, quotes, attributed wisdom |

```html
<div class="note note--key"><p>Your key point here.</p></div>
<div class="note note--science"><p>Research data here.</p></div>
<div class="note note--action"><p>Practical instruction here.</p></div>
<div class="note note--warning"><p>Warning or caution here.</p></div>
<div class="note note--quote"><p>"Quote text" — Author</p></div>
```

Override the default label with `data-label`:
```html
<div class="note note--action" data-label="The Galley Move"><p>Custom-labeled box.</p></div>
```

**Box Rules:**
- Place boxes AFTER the paragraph that introduces the concept
- Keep box text punchy: 1–3 sentences. If it needs more, it's a section, not a box
- Never stack two boxes of the same type back-to-back
- Minimum counts by category:

| Category | Minimum Boxes | Required Types |
|----------|--------------|----------------|
| The Method (recipes) | 5 | 2 science, 1 action, 1 warning, 1 key |
| Shore Larder | 5 | 2 science, 1 key, 1 action, 1 warning |
| The Evidence | 6 | 3 science, 1 key, 1 action, 1 quote |
| Port Call | 5 | 2 key, 2 action, 1 warning |
| Trade Winds | 5 | 2 key, 1 warning, 1 action, 1 quote |
| Littoral Heritage | 4 | 1 key, 1 quote, 1 science, 1 action |
| The Bridge | 4 | 1 key, 1 science, 1 action, 1 warning |
| Signal Fire | 4 | 1 key, 1 quote, 1 action, 1 science |

For articles over 12 min read time, double the minimums.

---

#### Tool 2: Inline Highlights — Make Numbers and Facts Pop

Use `<mark>` tags to highlight critical numbers, percentages, temperatures, and short facts INSIDE paragraphs. The yellow flash catches the scanning eye.

```html
<p>A 2024 survey found crew mood dropped to <mark>6.5 out of 10</mark>, with <mark>82% reporting anxiety</mark>.</p>
```

**When to use `<mark>`:**
- Any statistic or percentage worth remembering
- Critical temperatures or times in recipes
- A surprising number that challenges assumptions
- The single most important phrase in a dense paragraph

**Minimum:** At least 3 `<mark>` highlights per article. More for data-heavy pieces.

---

#### Tool 3: Term Definitions — Teach Vocabulary In-Line

Use `.term` for technical terms the reader might not know or where precision matters. The dotted underline signals "this word is exact, not casual."

```html
<span class="term">Allicin</span> is the compound responsible for garlic's pungent bite.
```

**When to use `.term`:**
- First appearance of a scientific compound name
- Industry-specific jargon (STCW, MLC, PME, SED)
- Foreign culinary terms on first use
- Any word where the precise definition matters to the argument

---

#### Tool 4: Science Boxes — Deep Technical Data

For structured technical information that needs its own container with a label, title, and detailed content. Bigger than a callout box, more structured.

```html
<div class="science-box">
    <div class="science-box__label">Compound Analysis</div>
    <div class="science-box__title">Why Brown Butter Tastes Different</div>
    <div class="science-box__content">
        At 150°C, milk solids undergo Maillard reactions producing...
    </div>
</div>
```

**When to use:** Compound tables, chemical breakdowns, structured data that doesn't fit a simple table. At least 1 per Shore Larder and Evidence article.

---

#### Tool 5: Summary Boxes — Lock It In at the End

Every article over 8 min read time MUST end with a summary box. This is the "if you remember nothing else" checklist.

```html
<div class="summary-box">
    <div class="summary-box__title">What to Remember</div>
    <ul>
        <li>First key takeaway</li>
        <li>Second key takeaway</li>
        <li>Third key takeaway</li>
    </ul>
</div>
```

**Rules:** 3–5 bullet points maximum. Each bullet is one sentence. Written as actionable statements, not summaries.

---

#### Tool 6: Quick Reference Cards — The Dark Cheat Sheet

Inverted dark cards for at-a-glance reference data. Identity cards for ingredients, spec sheets for equipment, quick stats.

```html
<div class="quick-ref">
    <div class="quick-ref__title">Quick Reference</div>
    <div class="quick-ref__grid">
        <div class="quick-ref__item">
            <div class="quick-ref__label">Season</div>
            <div class="quick-ref__value">Oct–Mar</div>
        </div>
    </div>
</div>
```

**When to use:** Shore Larder articles (ingredient identity cards), Port Call articles (key contacts/hours), recipe articles (at-a-glance specs).

---

#### The Visual Density Rule

**No section of an article should go more than 3 paragraphs without a visual break.** A visual break is any of: callout box, science box, table, quick-ref card, summary box, or a styled data grid. If you hit 4 consecutive plain paragraphs, you missed an opportunity to make the knowledge stick.

**The Scan Test:** A reader scrolling fast through the article should be able to extract the 5 most important facts from boxes and highlights alone, without reading a single paragraph. If they can't, the article needs more visual anchoring.

---

### Article Tags (Mandatory)

Every article MUST have tags in its homepage card (`data-tags` attribute) AND in `data/articles.json`. Tags enable search — they are how readers find content beyond the title.

**Minimum 10 tags per article.** Include:
- Category name (e.g., `recipe`, `ingredient-deep-dive`, `provisioning`)
- Main subject(s) (e.g., `banana`, `garlic`, `miami`)
- Technique or topic (e.g., `baking`, `fermentation`, `tax`)
- Related concepts (e.g., `maillard`, `umami`, `food-science`)
- Practical context (e.g., `charter-prep`, `galley-staple`, `comfort`)
- Region if applicable (e.g., `mediterranean`, `caribbean`, `france`)
- Related ingredients (e.g., `brown-butter`, `miso`, `lemon`)
- Searchable synonyms (e.g., `dessert` and `sweet`, `healthy` and `wellness`)

### Code Blocks

For protocols with multiple steps or technical formulas:
```
Step 1: Combine ingredients
Step 2: Heat to 65°C
Step 3: Hold for 15 minutes
```

---

## Headlines

### Dispatch Headlines

State the news. No cleverness.

> ✗ "A New Chapter in Tuna Aging"
> ✓ "Japanese Ikejime Federation Updates Bleeding Protocol for Bluefin"

### Article Headlines

Promise specific value. Include the "so what."

> ✗ "The Science of Browning"
> ✓ "The Maillard Reaction at Sea Level: Why Your Yacht Kitchen Produces Better Crusts Than Alpine Restaurants"

### Avoid

- Questions as headlines
- "How to..." (unless it's a technique file)
- Numbers for the sake of numbers ("7 Ways to...")
- Superlatives without evidence

---

## Source Standards

### Tier 1: Primary Sources

Always link when available:
- Peer-reviewed journals
- Official standards bodies
- Original research data

### Tier 2: Authoritative References

Acceptable for established knowledge:
- McGee's *On Food and Cooking*
- López-Alt's *The Food Lab*
- Ruhlman's *Ratio*
- Peer-verified technical references

### Tier 3: Experience

Acceptable when clearly labeled:
> "In our testing across 18 months..."
> "Based on 47 equipment installations..."

Never present experience as universal truth. State conditions and sample sizes.

### Citation Format

**Journals:**
> Author, A.B. (Year). "Article Title." *Journal Name*, Volume(Issue), Pages.

**Books:**
> Author, A.B. (Year). *Book Title*, pp. Pages. Publisher.

**Our Testing:**
> Littoralicious research, YYYY-YYYY

---

## Images

### When to Use

- When a visual genuinely aids understanding
- Technical diagrams
- Step-by-step process photos
- Data visualizations

### When Not to Use

- Decorative stock photography
- Generic "food beauty shots"
- Images that don't add information

### Style

- Black and white preferred
- High contrast
- No filters or heavy processing
- Include alt text describing the information, not the aesthetic

---

## Quality Checklist

Before submission, verify:

- [ ] Does the headline promise what the article delivers?
- [ ] Is every claim sourced or clearly labeled as experience-based?
- [ ] Have you used specific numbers instead of vague descriptions?
- [ ] Could any section be shorter without losing information?
- [ ] Would you read this if you found it?
- [ ] Does it respect the reader's intelligence and time?

---

## What We Never Do

- "Delicious," "yummy," "mouthwatering," or any flavor adjectives
- "Elevated," "curated," "artisanal" used as marketing
- Unsourced health claims
- Clickbait framing
- Condescension
- Padding to hit word counts

---

## File Naming

**Dispatches:** `YYYY-MM-DD-slug.md`
**Articles:** `slug-describing-topic.md`

Slugs: lowercase, hyphens, no special characters

---

*The best content teaches the reader something they can use. Everything else is noise.*
