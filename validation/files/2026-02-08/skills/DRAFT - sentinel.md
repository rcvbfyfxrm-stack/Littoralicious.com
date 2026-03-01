---
name: sentinel
description: Evaluate source quality, detect bias and conflicts of interest
arguments:
  - name: source
    description: URL, source name, or claim to evaluate
    required: true
---

# Sentinel — Source Quality Evaluator

Evaluate the quality, reliability, and integrity of: **{{source}}**

## Instructions

1. **Fetch & Classify** — Use WebFetch (if URL) or WebSearch (if name/claim) to get full content.
   - What tier is this source?
     - **Tier 1 Primaire:** Peer-reviewed papers, official documents, raw data, source code
     - **Tier 2 Qualité:** Reuters, FT, Bloomberg, Nature, Science, BBC, Lancet, EFF
     - **Tier 3 Prudence:** Opinion, think tanks, press releases, expert blogs
     - **Tier 4 Signal faible:** Social media, forums, rumors — never cite alone
   - Is it primary or derivative? How many intermediaries to original data?

2. **Conflict of Interest Scan**
   - Who funded this?
   - Who benefits from this being believed?
   - Business model of the publisher?
   - Does the author have skin in the game?

3. **Methodology Check** (for studies/papers)
   - Study type, sample size, control group, effect size
   - Limitations acknowledged vs. unacknowledged

4. **Cross-Reference** — Use WebSearch to find:
   - Independent sources confirming or contradicting
   - Whether this is a single-source claim

5. **Hype Detection** — Flag automatically:
   - Press release without underlying paper
   - "Breakthrough" without data
   - Cherry-picked benchmarks
   - Relative risk without absolute numbers
   - "Revolutionary" in headline
   - Undisclosed conflicts of interest

## Output

Present the verdict directly in conversation (no file output):

```markdown
## Sentinel — Évaluation de Source

**Source:** [name/title]
**Tier:** [1-4]
**Confiance:** ELEVEE / MOYENNE / FAIBLE

### Conflict of Interest
[Findings or "Aucun identifié"]

### Corroboration
[X independent sources confirm / contradict / uncorroborated]

### Red Flags
[List or "Aucun"]

### Verdict
**Recommandation:** CITER / CITER AVEC RÉSERVES / NE PAS CITER / VÉRIFICATION NÉCESSAIRE

[2-3 sentences explaining the reasoning]
```
