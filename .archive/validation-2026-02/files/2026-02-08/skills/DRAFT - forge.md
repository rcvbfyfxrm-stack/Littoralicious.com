---
name: forge
description: Deep reading and knowledge extraction with images, vocabulary, and citations
arguments:
  - name: source
    description: URL, book title, paper title, or topic to extract knowledge from
    required: true
---

# Forge — IdeaForge v3 Extraction

Extract ideas, images, vocabulary, and citations from: **{{source}}**

## Instructions

1. **Fetch Source** — Use WebFetch (if URL) or WebSearch (if title/topic) to get content.

2. **Context** (5-6 lines)
   - Qui parle? (auteur — sa blessure et sa quête)
   - Type: livre | paper | podcast | article | conférence
   - Intention réelle: convaincre | séduire | libérer | vendre | provoquer
   - L'air du temps: quel monde a produit ce texte?

3. **Ideas** — For EVERY major idea:
   - **Image:** UNE image concrète qui encode l'idée (seulement si elle éclaire mieux que l'explication)
   - **Essentiel:** 3-8 lignes, chaque phrase enseigne
   - **Citations:** 3-7 en langue originale (frappent, révèlent, ou libèrent)
   - **Épreuve:** Ce que l'idée DONNE / PREND / Qui a intérêt / Confrontation / Test cynique / Pérennité ◇◆★ / Verdict

4. **Vocabulary** — For each important term:
   | Mot | Définition auteur | Mon appropriation | Image (5 mots) |
   Un mot non redéfini dans mes termes est un mot non possédé.

5. **Citations à Conserver** — Celles qui méritent la collection permanente:
   Quote + Force/Thème + Résonance personnelle + Grade (★★★/★★/★)

6. **Synthesis**
   - Fil Rouge (pattern caché)
   - Tensions Internes (contradictions de l'auteur)
   - L'Éléphant (vérité inconfortable)
   - Question Provocante
   - Hiérarchie: Idée | Image | Donne | Coûte | Pérennité

7. **Connections** — Résonne / Contredit / Complète (existing knowledge) + Action concrète

8. **Tags** (8-30): #auteur/X #source/type #domaine/Y #concept/A #image/[3 mots] #liberté/[en quoi]

## Output

Write to: `/Users/callierapca/Documents/NEXUS/knowledge-library/IdeaForge/`
Filename: `IdeaForge - [Author or Domain] — [Title].md`

Include YAML frontmatter:
```yaml
---
tags: [generated tags]
type: ideaforge-extraction
auteur: [name]
titre: [title]
année: [year]
domaine: [domain]
date_extraction: [today YYYY-MM-DD]
---
```

## Style

Direct, dense, intelligent. La beauté vient de la précision. Image quand elle éclaire, pas quand elle décore. Chaque phrase enseigne ou questionne — le reste est coupé. Liberté comme critère ultime.
