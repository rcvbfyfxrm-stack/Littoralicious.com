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

**[INGREDIENT NAME]**
*[Season] · [Region where it's peaking now] · [Latin name]*

[Follow 01-shore-larder.md template structure — condensed to 200-300 words. Opening fact, what it actually is, the compound that matters, one pairing worth trying, sourcing notes for current season.]

**Badges:**

```
season:[current] region:[origin] type:[category] thesaurus:[ingredient-name]
```

---

## THE METHOD — Technique of the Week

**[TECHNIQUE NAME]: [Connection to this week's ingredient if natural]**

[Follow 02-the-method.md template structure — condensed. The move, do this (3-5 steps), why it works (science), the variables table. Connect to the Shore Larder ingredient where it makes sense — don't force it.]

**Badges:**

```
technique:[category] applies-to:[ingredient-types] thesaurus:[technique-name]
```

---

## THE EVIDENCE — Research Brief

**[HEADLINE: What the research showed]**

[Follow 04-the-evidence.md template structure — condensed. The study, key finding, numbers table, what it means in the galley, what it does NOT mean. Link to the week's ingredient or technique if recent research supports it. If no direct link, run independently with a contemporary topic.]

**Badges:**

```
science:[domain] source:[journal] year:[publication-year] thesaurus:[topic]
```

---

## LITTORAL HERITAGE — From the Coast *(optional — include when it fits the thread)*

**[DISH NAME]**
*[Coast/Village] · [Region]*

[Follow 03-littoral-heritage.md template structure — condensed to 250-400 words. The origin, why it mattered, the tradition, the science, how to make it a yacht showstopper. Include only when a genuine coastal dish connects to the week's ingredient or technique. Don't force it — skip this section if nothing earns its place.]

**Badges:**

```
region:[coast] heritage:[cuisine] dish:[name] thesaurus:[dish-name]
```

---

## THE HORIZON — Chef World News

**[HEADLINE]**

[Follow 06-the-horizon.md template structure — condensed. What happened, who, why it matters, the detail worth knowing. One story, told properly. Prioritize: competitions, awards with technical substance, policy changes, emerging regions.]

**Badges:**

```
news:[category] region:[where] thesaurus:[topic]
```

---

## TRADE WINDS — Industry Intel

**[HEADLINE]**

[Follow 07-trade-winds.md template structure — condensed. The development, who's affected, what it means, key details table, your move. Regulation changes, certification updates, salary data, event announcements — whatever is most relevant this week.]

**Badges:**

```
industry:[category] scope:[region-or-global] thesaurus:[topic]
```

---

## THE CLOSE

> [One sentence. The single thought worth carrying into the week. Not motivational — practical, specific, earned by the content above. If the thread held, close the loop. If it didn't, close with the strongest standalone insight.]

---

## Quality Gates

- [ ] The thread connecting sections is genuine, not forced? (If forced, run sections independently.)
- [ ] Seasonal ingredient is actually in season this week, in a region where yachts operate?
- [ ] Technique is executable — a chef could try it this week?
- [ ] Science is from a peer-reviewed, indexed source?
- [ ] Heritage section included only if it genuinely connects (not filler)?
- [ ] News is verified and current (within 7 days)?
- [ ] Industry intel is actionable or explicitly flagged as "monitor only"?
- [ ] Every section has badges assigned?
- [ ] Total read time stays under 12 minutes?
- [ ] A sleep-deprived chef at 4 AM would find every section worth reading?

## Output

Each section is ALSO saved as a standalone article in `/content/review/` with full frontmatter and badges, following its respective template. The weekly brief is the digest; the standalone pieces are the archive.

### File Naming Convention

```
content/review/YYYY-MM-DD-shore-larder-[ingredient].md
content/review/YYYY-MM-DD-the-method-[technique].md
content/review/YYYY-MM-DD-the-evidence-[topic].md
content/review/YYYY-MM-DD-littoral-heritage-[dish].md    (if included)
content/review/YYYY-MM-DD-the-horizon-[topic].md
content/review/YYYY-MM-DD-trade-winds-[topic].md
content/review/YYYY-MM-DD-weekly-brief.md                (the digest)
```
