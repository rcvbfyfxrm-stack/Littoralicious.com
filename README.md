# LITTORALICIOUS

**Sailing Around the Plate. Literally Delicious.**

A digital publication for professional yacht chefs and culinary obsessives who value substance over spectacle.

---

## What This Is

Littoralicious combines:
- Maritime gastronomy expertise from the Chef vault
- Rigorous food science (Maillard, fermentation, emulsification)
- Zero bullshit editorial voice
- Interface designed for working professionals

The name fuses "littoral" (relating to the shore/sea) with "literally delicious."

---

## Project Structure

```
littoralicious/
├── index.html              # Homepage
├── about.html              # Manifesto
├── articles/               # Article HTML pages
│   └── maillard-at-sea-level.html
├── assets/
│   ├── css/
│   │   └── style.css       # Complete design system
│   ├── js/
│   │   └── main.js         # Minimal interactions
│   ├── images/
│   └── fonts/
├── content/                # Markdown source files
│   ├── articles/
│   ├── dispatches/
│   ├── science/
│   └── techniques/
├── data/
│   └── articles.json       # Content index
├── CLAUDE.md               # AI context file
├── CONTENT-GUIDE.md        # Editorial standards
└── README.md               # This file
```

---

## Design Philosophy

**"Old journal refined through Apple glass."**

- Black and white with maritime grey-blue accent
- Serif headlines for authority
- System sans-serif for readability
- Generous spacing
- Data in monospace
- No gradients, no rounded corners on content

---

## Content Sections

### Dispatches
Short, brutal news items. 100-300 words. One insight per dispatch.

### Science Desk
Deep dives into food chemistry. The why behind the how.

### Technique Files
Step-by-step protocols. No stories. Just method.

### Galley Notes
Yacht-specific intelligence. Provisioning, equipment, operations.

---

## Running Locally

Open `index.html` in a browser. No build step required.

For development with live reload:
```bash
npx live-server
```

---

## Content Management

Content is stored as Markdown in `/content/` and indexed in `/data/articles.json`.

To add new content:
1. Create markdown file in appropriate `/content/` subdirectory
2. Add entry to `articles.json`
3. Generate HTML page (or use static site generator)

---

## Design Tokens

### Colors
```css
--color-ink: #0a0a0a;       /* Primary text */
--color-paper: #fafafa;     /* Background */
--color-sea: #2d4a5e;       /* Accent */
--color-salt: #94a3b8;      /* Secondary */
--color-muted: #6b7280;     /* De-emphasized */
```

### Typography
```css
--font-serif: Georgia, 'Times New Roman', serif;
--font-sans: system-ui, -apple-system, sans-serif;
--font-mono: 'SF Mono', Consolas, monospace;
```

### Scale (Perfect Fourth — 1.333)
```css
--text-xs:    0.75rem
--text-sm:    0.875rem
--text-base:  1rem
--text-lg:    1.333rem
--text-xl:    1.777rem
--text-2xl:   2.369rem
--text-3xl:   3.157rem
```

---

## Source Material

Built from:
- **Chef Vault** — 1,700+ files of culinary knowledge
- **IdeaForge** — Business and psychology principles
  - Psychology & Persuasion (Cialdini, Kahneman)
  - Branding & Identity (positioning, storytelling)
  - Copywriting & Storytelling (Ogilvy, Hopkins)
  - Food Science & Gastronomy (McGee, López-Alt)
  - UX Design (Norman, Krug)

---

## Editorial Standards

See `CONTENT-GUIDE.md` for:
- Voice and tone guidelines
- Formatting standards
- Source requirements
- Quality checklist

---

## What We Don't Do

- Sponsored content
- Listicles
- Chef personality profiles
- "The 10 Best [Anything]"
- Words like "elevated," "curated," or "mouthwatering"
- Unsourced claims

---

## Future Development

Potential additions:
- [ ] Static site generator integration (11ty, Astro)
- [ ] Newsletter system
- [ ] Search functionality
- [ ] RSS feed
- [ ] Equipment database (from Chef vault)
- [ ] Recipe calculator tools

---

*The sea doesn't care about your Michelin stars.*
