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
