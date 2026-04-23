# Ingredient Deep-Dive Template

Category: Shore Larder
Reading time: 12-18 min

---

## Template Structure

Use this template for any ingredient deep-dive article. Each section has a purpose and a voice note. Not every section is mandatory — skip what doesn't serve the ingredient. But the order is intentional: origin first, science last. The reader should fall in love before they learn the chemistry.

---

### 1. IDENTITY CARD (visual block — dark navy)

At-a-glance reference. Styled as a dark card at the top of the article.

Fields:
- **Family** — botanical/zoological family
- **Origin** — where it first appeared
- **Season** — peak months (by hemisphere if relevant)
- **Key Compounds** — 3-5 dominant flavor molecules
- **Flavour Profile** — 3-4 words (e.g., "earthy, umami, meaty, mineral")
- **Yacht Galley Rating** — storage ease, versatility, cost (1-5 stars or similar)

Voice: The Scientist. Clean data, no prose.

---

### 2. ORIGIN STORY (where it was born)

Where did this ingredient first appear on Earth? Not "it comes from Asia" — the specific valley, the specific culture, the archaeological evidence. Make the reader see the first person who ate it.

Voice: The Grandmother. Warmth, narrative, "sit down and let me tell you."

---

### 3. THE JOURNEY (how it conquered the world)

How did it spread? Trade routes, colonial history, immigration, accidents. The human story of how this ingredient went from one place to everywhere.

Include: key dates, key people, surprising turns. If garlic travelled the Silk Road, say so. If mushrooms were feared as poison for centuries, say so.

Voice: The Grandmother + The Scientist. Narrative backed by historical fact.

---

### 4. THE SCIENCE (what's actually in it)

Nutritional profile: macros, key micronutrients, notable bioactive compounds. Not a nutrition label — the interesting science. What does this ingredient do in the body that other ingredients don't?

Include: health claims with evidence level (strong, moderate, emerging). Debunk myths if they exist. Cite studies where possible.

Voice: The Scientist. Precise, evidence-graded, no health-guru nonsense.

---

### 5. TRADITIONAL PAIRING (the classics)

The pairings that every culture figured out independently, or that define a cuisine. Tomato + basil. Mushroom + thyme. Garlic + everything.

Format as a visual grid or table:
- Pairing | Cuisine | Why It Works (1-sentence flavour logic)

Voice: The Grandmother. "Your grandmother knew this. Here's why she was right."

---

### 6. POETIC PAIRING (the unexpected)

The pairings that surprise — the ones a creative chef would try. Not random combinations, but inspired connections that make the reader think "I need to try that."

Format: 3-5 pairings with a one-line provocation for each.

Voice: The Yacht Chef. Bold, direct, "try this tonight."

---

### 7. MOLECULAR PAIRING (the FlavorDB connection)

Shared volatile compounds with unexpected ingredients. Reference FlavorDB. Name the molecules, name the partner ingredients, explain the bridge.

Format: table with Compound | Shared With | Flavour Description

Voice: The Scientist. Data-driven, precise, but accessible.

---

### 8. HOW TO BUY IT (sourcing intelligence)

What to look for at market. How to identify peak quality. What to avoid. Seasonality by region. Price benchmarks. Storage notes.

Include: tactile cues (feel, smell, weight, sound), visual cues (colour, texture, sheen), and red flags.

Voice: The Yacht Chef. Practical, no-nonsense, "this is what I look for."

---

### 9. YACHT GALLEY INTEL (the practical section)

Storage on board (fridge life, freezer suitability, pantry life). Prep-ahead options. What format to buy for a charter (whole, pre-cut, dried, frozen). Cost considerations for provisioning budgets.

Voice: The Yacht Chef. Tight, efficient, galley-specific.

---

### 10. THE STORIES (the human side)

Funny anecdotes, myths, cultural superstitions, literary references, famous moments. The stuff that makes you want to tell someone at dinner.

Format: 2-3 short stories or facts, each in its own small box.

Voice: The Grandmother. Entertaining, warm, memorable.

---

### 11. QUICK REFERENCE (closing card — dark or accent block)

Condensed summary for galley reference:
- Best season
- Best with (3-5 pairings)
- Avoid with
- Storage
- One-line "chef's note"

Voice: The Yacht Chef. Scannable, printable, pin-it-to-the-galley-wall.

---

## Design Notes

- Identity Card and Quick Reference: dark navy (#1a2a3a) blocks
- Science section: green-tinted (#d1e7dd) boxes
- Traditional Pairing: warm amber/wheat (#f5deb3) background
- Poetic Pairing: purple-tinted (#d4dce8) boxes
- Molecular Pairing: link to FlavorDB article
- Stories: individual cards with coloured left-borders
- All grids use `repeat(auto-fit, minmax(280px, 1fr))` for mobile
- Use the darkened palette (not pastels) established in April 2026

## HTML Template

Use the standard Littoralicious article HTML shell:
- Masthead with updated tagline
- article__header with category "Shore Larder"
- article__content at max-width: 65ch
- Engagement section (reactions, share, comments)
- Footer with newsletter
- Firebase + community.js scripts
