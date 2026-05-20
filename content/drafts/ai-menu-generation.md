---
title: "Chef Agent v5.0: One Prompt That Runs Your Whole Menu Department"
date: 2026-05-16
category: the-method
tags: [ai, prompts, menus, claude, chef-agent, workflow, terminal, latex, automation]
read_time: 9
status: draft
---

A guest list of eight lands at 11 PM for a charter starting at noon. Two of them are pescatarian, one is coeliac, the owner hates fennel. You need a four-day rotation by breakfast. There is exactly one prompt for this.

It is 919 lines. You paste it once into any decent AI — Claude, ChatGPT, Gemini — and from that moment on the AI knows how a yacht menu reads, what a Cultural Touchstone is, why a French menu must look different from a Japanese one, where to save the LaTeX, and when to ask for the wine pairing card.

The prompt is called **Chef Agent v5.0**. It is the only menu prompt worth keeping on the boat. This article is what's inside it and how to use it.

---

## What the Prompt Is

A single 919-line spec covering every menu service a yacht chef will ever ship: eight formats, ten cuisines, four output files (menu .tex, menu .pdf, wine .tex, wine .pdf), plus a mandatory pre-check on guest preferences. It does not generate menus on its own — it generates them *with* you, and won't touch a `.tex` file until you say *yes* on the markdown draft.

It assumes you have terminal AI installed (Claude Code, Codex CLI, Gemini CLI, or aider) and XeLaTeX on the laptop. The same spec also works pasted into a [Claude Project](https://claude.ai/projects) or a Custom GPT — you'll lose the auto-PDF-compile step but keep the structural intelligence.

---

## Eight Service Formats It Handles

| Format | What you get |
|---|---|
| Guests Breakfast | À la carte suggestions, each with a one-line health note |
| Guests Lunch (family style) | Proteins + vegetables + starch + salad. Generous, shared. |
| Guests Dinner — Family Style | Same structure as lunch, richer proteins, fuller composition |
| Guests Dinner — Plated | Three courses: one starter, one main, one dessert |
| Guests Dinner — Tasting Menu | 5–8 courses: canapés → amuse → starter → fish → meat → pre-dessert → dessert → mignardises |
| Guests Theme Night | One Cultural Touchstone, every dish in service of it |
| Crew Lunch / Crew Dinner | Efficient, satisfying, distinct flavor world per service |
| Kids Menu | Same touchstone as adults, playful adaptations, separate card |

Say *"crew lunch tomorrow"* and the AI snaps into the right structure. Say *"tasting menu, charter, Saturday, Italian"* and you get the eight-course flow with Palatino typography and a Cultural Touchstone instead of the words *"tasting menu."*

---

## The Five Rules That Make It Work

### 1. The Cultural Touchstone

Never "Italian Lunch." Always *Notte a Napoli*, *Tokyo Night Market*, *Pop-Up Panda Express*, *Ottolenghi-Style Salad Table*. A short phrase that triggers cultural memory — a place, a restaurant, a vibe. The prompt rejects generic theme names by default.

### 2. The Menu Card Is Sacred

No date on the card. No "Crew Dinner" label. No "Service: Buffet" stamp. The card shows title → dishes → sourcing footer, and nothing else. Operational data lives in the filename (`2026-05-12_Crew-Dinner_Bangkok-Night-Market.tex`) and LaTeX comments. The guest sees a menu, not a clipboard.

### 3. Confirm Before Building

The prompt never goes straight to PDF. It drafts the menu in markdown, shows it to you, waits for your *"yes,"* then builds the `.tex`, compiles the `.pdf`, opens it, and asks if you want the wine pairing card. Mandatory workflow. Non-overridable. You see the dishes before the file system sees them.

### 4. Guest Preferences Are Mandatory

Before writing a single dish, the prompt reads your preference files. If Mr Bravo has zero tolerance for onions, no dish anywhere in the menu contains an onion. If one guest is coeliac, the relevant dish gets a subtle `gf` superscript and a tiny footnote at the bottom of the card. Light enough that normal guests don't notice. Clear enough that the affected guest knows they're covered.

### 5. Two Contrasting Proteins

For any family-style service: one grilled + one braised. Lean + unctuous. Cool + warm. Never two of the same temperament. It forces a balanced plate without you thinking about it.

---

## The Design System (The Part Most Prompts Skip)

Cover the title. Can you tell the cuisine from the design? If a French menu and an Italian menu look the same except for the words, the prompt has failed you.

Chef Agent v5.0 specifies a complete sensory world per cuisine:

| Cuisine | Font | Color signature | Ornament |
|---|---|---|---|
| French | Didot | Noir + Rouge | ◇ ◇ ◇ |
| Italian | Palatino | Terracotta + Gold | short centered rule |
| Japanese | Optima | Obsidian + Red | · (single dot) |
| Nordic | Avenir Next | Sage + Cream | no ornament — space only |
| Spanish | Didot | Burgundy + Gold | ‖ |
| Greek | Optima | Azure + White | ∼ ∼ ∼ |
| Levantine | Palatino | Ochre + Gold | ◊ ◊ ◊ |
| Mexican | Hoefler Text | Terracotta + Obsidian | gold dot under title |
| Asian Fusion | Avenir Next Bold | Obsidian + Red | thin accent rule |
| American | Avenir Next Bold | Brick + Gold | — — — |

It also dictates *spacing*. Japanese and Nordic menus get 1.4-inch margins and `\setstretch{1.8}`. Italian gets warmer typography with italic dish names. Mexican gets a gold rule under the title. You don't open a CSS file — the prompt does it for you.

The test the prompt enforces on itself: *"Would the world's best restaurant of this cuisine print this card?"* If a French card doesn't feel like Le Bernardin would hand it to a guest, the AI redrafts before it shows you anything.

---

## What the Workflow Looks Like

```
You:    Guests dinner tasting menu Saturday, Italian, eight covers, owner hates fennel
AI:     Reading preferences... Bravo family on file.
        No onions for Mr Bravo. No melon for kids.
        Drafting "Notte a Napoli" — eight courses, fennel substituted with
        charred romanesco where needed.
        [shows full markdown]
        Does this look good?
You:    Yes
AI:     Wine pairing card?
You:    Yes — one wine, biodynamic if possible
AI:     [creates 2026-05-21_Guests-Dinner-Tasting_Notte-a-Napoli.tex]
        [compiles PDF — Palatino, terracotta, eight short-rule dividers]
        [creates 2026-05-21_Wine-Pairing_Notte-a-Napoli.tex]
        [compiles wine PDF]
        Both files saved to 03-Menus/Production/. Opening the menu now.
```

Under five minutes. Tasting menu with proper cultural typography. Wine card. No onions anywhere. Fennel swapped for romanesco. A `gf` footnote on the gluten course because the coeliac guest is on file. All done before the engineer finishes his coffee.

---

## What You Need to Run It

- A terminal AI agent: [Claude Code](https://claude.com/claude-code), [Codex CLI](https://github.com/openai/codex), [Gemini CLI](https://github.com/google-gemini/gemini-cli), or [aider](https://aider.chat)
- XeLaTeX on the laptop: `brew install --cask mactex-no-gui` (macOS), one-time
- The prompt file saved as `menu.md` inside `~/.claude/agents/` (or the equivalent folder for your tool)
- A folder for guest preferences that the prompt reads from before writing dishes — usually `Preferences/[Family]_preferences.txt` plus the active handover sheet's *Don'ts* list

If you're not on a terminal, paste the prompt into [Claude Projects](https://claude.ai/projects) or a [ChatGPT Custom GPT](https://chatgpt.com/gpts). You lose the auto-compile, but the structural rules — Cultural Touchstone, design system, dietary footnotes, dish order, wine pairing prompt — all still fire. You just copy-paste the LaTeX into [Overleaf](https://overleaf.com) for the final PDF.

---

## The Honest Limits

The prompt does not know:

- Which Italian deli in your current port still has burrata at 7 PM
- That the second engineer is gluten-intolerant but never told anyone
- That last week's lamb supplier ghosted you
- Whether the actual dish you cooked tastes the way it reads on the card

The prompt does know:

- The structural rules of every cuisine it ships with
- The typographic identity of each one
- How to make a tasting menu flow from light to dark
- How to never put an onion in front of Mr Bravo
- How to file everything where the deckie can find it at 6 AM

That's enough to save you ninety minutes a charter. It's not enough to replace you. Use it for the typing, the formatting, the LaTeX, the file-naming, the cultural-touchstone naming, the dish-order discipline. Keep your own hands on the tasting spoon.

---

*The prompt itself is a single markdown file. Drop it into your AI of choice and start with one line: "Crew lunch tomorrow." See what comes back.*
