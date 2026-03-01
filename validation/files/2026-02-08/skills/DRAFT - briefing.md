---
name: briefing
description: Daily intelligence briefing across 14 domains
arguments: []
---

# Briefing — Daily Intelligence Synthesis

Scan today's news across 14 domains and produce a curated intelligence briefing.

## Instructions

1. **Search Phase** — Use WebSearch for each domain (prioritize last 24 hours):
   - "AI artificial intelligence news today"
   - "science neuroscience breakthrough 2026"
   - "digital privacy surveillance legislation 2026"
   - "financial markets analysis today"
   - "geopolitics international relations today"
   - "cybersecurity vulnerabilities today"
   - "space energy technology 2026"
   - "health medicine clinical trials 2026"
   - "startup funding venture capital today"
   - "culture society trends 2026"
   - "gastronomy chef restaurant news"
   - "maritime sailing news"
   - "good news progress 2026"
   - "intellectual podcast notable episode this week"

2. **Triage** — For each story: URGENT / IMPORTANT / FASCINATING. Cut anything below threshold.

3. **Cross-analyze** — Find connections between domains. The best insights live at intersections.

4. **Verify** — Cross-reference key claims. Apply: "Qui a intérêt à ce que je croie ça?"

5. **Write** — Max 15 minutes reading time. Every story needs a "So what."

## Output

Write to: `/Users/callierapca/Documents/NEXUS/OUTPUT/News/`
Filename: `YYYY-MM-DD Briefing.md` (use today's date)

```markdown
## [DATE] — Briefing du Jour

## EN 60 SECONDES
> 5-7 bullets ultra-concis des histoires majeures

## URGENT — À Lire en Priorité
### [Story Title]
**En bref:** 3-4 phrases
**Chiffres clés:** table
**Ce que ça change pour toi:** 1-2 phrases
**Confiance:** ELEVEE / MOYENNE / FAIBLE

## IMPORTANT — Développements Significatifs
(1-2 per domain, "So what" for each)

## CONNEXIONS CROSS-DOMAINES
(2-3 insights linking different domains)

## FASCINANT — Pour la Culture
(3-5 fun facts, 1 deep question)

## CHIFFRES DU JOUR
(Key metrics: S&P, VIX, Brent, BTC)

## DEMAIN À SURVEILLER
(Upcoming events table)
```

Rules:
- Max 3 stories per domain
- Verification level (ELEVEE/MOYENNE/FAIBLE) on every claim
- Sources linked for each story
- Language: French structure, English technical terms, citations in original language
