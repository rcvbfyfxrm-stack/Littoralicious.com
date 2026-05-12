---
title: "Three Prompts, Three Levels: Generating Menus With AI"
date: 2026-05-12
category: galley
tags: [ai, prompts, menus, claude, chatgpt, workflow, terminal, automation]
read_time: 10
status: draft
---

A guest list of eight lands at 11 PM for a charter starting at noon. Two of them are pescatarian, one is coeliac, the owner hates fennel. You need a four-day rotation by breakfast. You can spend the next ninety minutes writing menus by hand, or you can spend ninety seconds briefing an AI that already knows how a yacht menu should read.

This guide is about the second option. Not the marketing version — the working version. Three prompts you can copy, three escalating ways to run them, and the honest line where the machine stops helping and the chef takes over.

---

## The Premise

A prompt is a recipe for behavior. Hand the same model a vague request and it returns a vague menu. Hand it a 600-line operating manual that defines tone, structure, language, sourcing, layout, and design — and it returns a card that looks like it came from Pujol.

The three prompts compared here come from the same kitchen but solve different problems. Pick the one that matches what you actually need.

---

## The Three Prompts at a Glance

| | **Menu (sous-chef)** | **Menu-Complete v3.0** | **Chef Agent v5.0** |
|---|---|---|---|
| **What it produces** | A single-dish or multi-course brief — ingredients, mise, timing, plating, allergens, cost per cover | A printable menu card — Cultural Touchstone name, typography matched to cuisine, LaTeX/PDF output | Same as v3.0 plus: guest preferences, wine pairing, tasting/plated/family-style formats, kids menus |
| **Reads like** | A galley brief at the pass | A menu you'd see at a Michelin restaurant | A complete menu service department |
| **Output format** | Markdown | Markdown → `.tex` → `.pdf` | Markdown → `.tex` → `.pdf` (+ wine card, kids card) |
| **Time to first result** | 30 seconds | 2 minutes | 3–5 minutes (reads preferences first) |
| **Audience** | The chef cooking | The guest reading | Both |
| **Best for** | Daily crew service, recipe scaling, mise planning | Photogenic crew or charter menus, single events | Full charter operation, multi-day rotation, dietary management |

The mistake is using the wrong one. A 4-page tasting-menu prompt is overkill for crew lunch on a Tuesday. A galley brief is too sparse to print and slide under a guest's wine glass.

---

## Level 1 — Browser, Five Minutes

The fastest way in. Works on any chat AI: [Claude](https://claude.ai), ChatGPT, Gemini, Le Chat, Copilot.

**Setup:**
1. Open a new chat
2. Paste the full prompt as your first message — yes, the whole thing, 300 to 800 lines depending on which one
3. End with: *"Acknowledge you've read this. Then ask me what menu I need."*
4. Send

The AI now has the operating manual in context. Your next message can be one line: *"Crew dinner tonight, Thai, chicken fajitas — no wait, fajitas tomorrow, tonight is Thai beef with eggs in the pad thai."* It will produce a menu in the right structure, in the right language, with the right dish order, with a Cultural Touchstone name that fits the time of day.

**What you give up at this level:**
- Context resets when the tab closes. Tomorrow you paste the prompt again.
- No file output. You copy the markdown out by hand.
- No PDF. You'd have to paste the LaTeX into [Overleaf](https://overleaf.com) to compile, or screenshot the markdown.
- No memory of last week's menus. The AI will happily suggest the same dish three nights running.

**Best for:** trying a prompt for the first time. Drafting one menu. Comparing how different AI models interpret the same brief. (Claude tends to follow the typography rules more strictly than ChatGPT, in my experience.)

---

## Level 2 — Persistent Assistant, Same-Day Setup

The middle path. Twenty minutes of setup, then you stop pasting prompts forever.

Every major AI now offers a *workspace* — a place where you load a system prompt once and chat with it across sessions:

- **Claude:** [Projects](https://claude.ai/projects) — paste the prompt in *System instructions*, drop reference files in *Project knowledge*
- **ChatGPT:** [Custom GPT](https://chatgpt.com/gpts) — same idea, called "Instructions"
- **Mistral Le Chat:** Agents
- **Gemini:** Gems
- **Perplexity:** Spaces

Paste **Chef Agent v5.0** as the system instruction. Optionally upload your guest preference files, your sourcing notes, your previous charter menus. Save it. From now on, every conversation in that workspace starts with the AI already briefed.

You now have a menu agent you can text-message. *"Lunch tomorrow, eight crew, leftover lamb, what do you suggest?"* It will answer in your voice, in your structure, with sourcing footnotes, asking about wine pairing if it's a charter.

**What's better than Level 1:**
- The prompt is loaded once, forever
- The AI can read attached files (preference sheets, supplier lists)
- You can branch — one workspace for crew, one for charter, one for kids menus
- Better-quality output, because the AI doesn't have to spend its first 2000 tokens rereading the manual

**What you still give up:**
- The AI cannot write `.tex` files to your laptop. It can output them, but you copy-paste.
- No automatic PDF compile.
- No automatic file naming with today's date and theme.
- No saving the menu to a "Production" folder where the deck crew can find it.

**Best for:** a chef who plans menus weekly, runs the same boat repeatedly, doesn't want to live in a terminal but wants more than a fresh chat every time.

---

## Level 3 — Terminal, Full Automation

The point where the AI stops being a chat partner and becomes an assistant chef. It writes files. It compiles PDFs. It opens them in your viewer. It saves them to a dated folder ready for handover. You can run an entire week of menus from one prompt at a galley bench.

This is what the **Chef Agent v5.0** prompt was designed for — note the lines about reading preference files from disk, compiling LaTeX with `xelatex`, saving to `galleythesaurus/05-Yacht-Operations/03-Menus/Production/`. None of that runs in a browser. It runs in a terminal.

The tools that make this possible, free or near-free as of 2026:

| Tool | What it is | Setup |
|------|-----------|-------|
| [Claude Code](https://claude.com/claude-code) | Anthropic's terminal agent. Can read/write files, run commands, install dependencies. | `npm install -g @anthropic-ai/claude-code`, then `claude` in any folder |
| [Codex CLI](https://github.com/openai/codex) | OpenAI's equivalent. Same idea, different model. | Install via npm or Homebrew |
| [Gemini CLI](https://github.com/google-gemini/gemini-cli) | Google's terminal agent. | npm install |
| [aider](https://aider.chat) | Open-source. Brings any model (Claude, GPT, local Llama) into the terminal. | `pip install aider-chat` |

**One-time setup, in plain English:**

1. Install [Homebrew](https://brew.sh) and a terminal AI tool of your choice (twenty minutes)
2. Install LaTeX so the AI can compile PDFs: `brew install --cask mactex-no-gui` (the AI will tell you to do this on first run — install once, never think about it again)
3. Save the **Chef Agent v5.0** prompt as a file named `menu.md` inside `~/.claude/agents/` (for Claude Code) or the equivalent for your tool
4. Open Terminal, navigate to a working folder, type `claude` (or `codex`, etc.)

**From here on, your workflow is:**

```
You:    Crew dinner tonight, Thai, beef and pad thai with eggs
AI:     [drafts the menu in markdown, shows it to you]
        Does this look good?
You:    No toasted rice in the dipping sauce, no bean sprouts in the pad thai
AI:     [updates the draft]
        Confirmed?
You:    Yes
AI:     [writes 2026-05-12_Crew-Dinner_Bangkok-Night-Market.tex]
        [compiles to PDF]
        [opens the PDF]
        Done. Want a wine pairing card?
```

That whole exchange takes under three minutes. The output is a printable card with cuisine-matched typography, sourcing footer, dietary footnotes where needed, saved to a dated folder ready for the deckie to print.

**What you give up:**
- Setup is one afternoon if you've never used a terminal. Half a day at most.
- The AI costs a few cents per menu via API. Subscription tiers exist for heavy use.
- You need a working laptop. (You should have one anyway.)

**Best for:** a charter chef running multiple boats, a private chef who writes 50+ menus a season, anyone who values being able to text *"redo tonight's menu, the guest changed their mind"* and have a new PDF in their inbox sixty seconds later.

---

## Which Prompt for Which Job

| If you need… | Use this prompt | At this level |
|---|---|---|
| A single recipe brief with mise and timing | Menu (sous-chef) | Level 1 — browser |
| A pretty crew menu for the WhatsApp group | Menu-Complete v3.0 | Level 2 — workspace |
| A guest charter menu with sourcing footer | Menu-Complete v3.0 | Level 2 or 3 |
| Multi-day rotation with guest allergies, wine pairings, kids cards, all auto-filed | Chef Agent v5.0 | Level 3 — terminal |
| To dictate from the deck and get a printable PDF in a minute | Chef Agent v5.0 | Level 3 — terminal |

The shorthand: **Menu** is for the kitchen, **Menu-Complete** is for the dining room, **Chef Agent v5.0** is for the whole department.

---

## The Honest Limits

The AI does not know:

- That the local butcher in Bonifacio only delivers on Tuesdays
- That the second engineer is gluten-intolerant but never wrote it down because he's embarrassed
- That last week's lamb was bought from a supplier that ghosted you
- That the owner's wife said she'd kill for proper carbonara but the prompt doesn't know who the owner's wife is
- What the food actually tastes like after you make it

It does know:

- The structural rules of a good menu
- The typographic language of every major cuisine
- How to write a dipping sauce in plain English without saying "delicious"
- How to assemble a four-course tasting menu that flows
- How to save it as a file, named properly, in the right folder, compiled and ready to print

That's a lot. It's also not the chef. You are still the chef. The AI saves you the typing, the formatting, the file-naming, the LaTeX. It does not save you the tasting, the sourcing, the seven hands the deckie needs at service.

Use it for the work that doesn't deserve your hands. Keep your hands for the food.

---

*The three prompts referenced in this article are available in the [Littoralicious tools repository](#). Pick one, paste it, and try the first level today. The terminal version is a Sunday-afternoon project. The menu it produces tonight is a five-minute project.*
