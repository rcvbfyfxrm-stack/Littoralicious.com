# THE WEEKLY BRIEF — Template

**Voice:** A trusted colleague handing you a single sheet at the start of the week. Everything you need, nothing you don't. The brief connects the dots — a seasonal ingredient leads to a technique, the technique connects to science, the science frames the news. One thread, pulled through seven days.

**Rhythm:** Open with the thread → Ingredient → Technique → Science → Heritage (if it fits) → The Horizon → Trade Winds → Close with one line worth remembering.

**Word Count:** 1,500-2,500 total across all sections · **Read Time:** 8-12 min

---

```yaml
---
title: "Weekly Brief — [Week of DATE]"
date: YYYY-MM-DD
category: brief
tags: [weekly, [season], [primary-ingredient], [primary-technique]]
read_time: [estimate]
issue: [number]
thread: "[The single theme connecting this week's content]"
---
```

---

## THE THREAD

[2-3 sentences. The single idea that connects this week's content. Not forced — found. A seasonal ingredient that reveals a technique, a technique that connects to recent science, science that frames something happening in the industry. If the connection is genuine, state it. If it's a stretch, run the sections independently and say so.]

---

## SHORE LARDER — Seasonal Pick
*[Follow editorial-01-shore-larder.md — condensed to 200-300 words]*

**Badges:**
```
season:[current] region:[origin] type:[category] thesaurus:[ingredient-name]
```

---

## THE METHOD — Technique of the Week
*[Follow editorial-02-the-method.md — condensed]*

**Badges:**
```
technique:[category] applies-to:[ingredient-types] thesaurus:[technique-name]
```

---

## THE EVIDENCE — Research Brief
*[Follow editorial-04-the-evidence.md — condensed]*

**Badges:**
```
science:[domain] source:[journal] year:[publication-year] thesaurus:[topic]
```

---

## LITTORAL HERITAGE — From the Coast *(optional — include when it fits the thread)*
*[Follow editorial-03-littoral-heritage.md — condensed to 250-400 words]*

**Badges:**
```
region:[coast] heritage:[cuisine] dish:[name] thesaurus:[dish-name]
```

---

## THE HORIZON — Chef World News
*[Follow intelligence-07-the-horizon.md — condensed]*

**Badges:**
```
news:[category] region:[where] thesaurus:[topic]
```

---

## TRADE WINDS — Industry Intel
*[Follow intelligence-08-trade-winds.md — condensed]*

**Badges:**
```
industry:[category] scope:[region-or-global] thesaurus:[topic]
```

---

## THE CLOSE

> [One sentence. The single thought worth carrying into the week.]

---

## Quality Gates

- [ ] The thread connecting sections is genuine, not forced?
- [ ] Seasonal ingredient is actually in season this week, in a region where yachts operate?
- [ ] Technique is executable — a chef could try it this week?
- [ ] Science is from a peer-reviewed, indexed source?
- [ ] Heritage section included only if it genuinely connects?
- [ ] News is verified and current (within 7 days)?
- [ ] Industry intel is actionable?
- [ ] Every section has badges assigned?
- [ ] Total read time stays under 12 minutes?

## Output

Each section is ALSO saved as a standalone article in `/content/review/` with full frontmatter and badges. The weekly brief is the digest; the standalone pieces are the archive.

### File Naming Convention

```
content/review/YYYY-MM-DD-shore-larder-[ingredient].md
content/review/YYYY-MM-DD-the-method-[technique].md
content/review/YYYY-MM-DD-the-evidence-[topic].md
content/review/YYYY-MM-DD-littoral-heritage-[dish].md
content/review/YYYY-MM-DD-the-horizon-[topic].md
content/review/YYYY-MM-DD-trade-winds-[topic].md
content/review/YYYY-MM-DD-weekly-brief.md
```
