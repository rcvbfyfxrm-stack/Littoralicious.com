---
tags: [source/video, domaine/automation, domaine/ai-agents, concept/agentic-workflows, concept/orchestration, auteur/samin-yasar, impact/élevé, critique/modéré, pérennité/durable]
type: ideaforge
auteur: "Samin Yasar"
titre: "DON'T Build n8n workflows, build Agentic Workflows! (Claude Code)"
année: 2026
domaine: AI Automation
date_extraction: "2026-02-08"
source_url: "https://www.youtube.com/watch?v=JkrH3ftxPYc"
---

# Samin Yasar — DON'T Build n8n workflows, build Agentic Workflows!

## Contexte

- **Qui parle ?** Samin Yasar (@SaminYasar_), entrepreneur AI automation, fondateur de BookedIn.ai, animateur de la communauté AI Automation Society sur Skool.
- **Type :** Vidéo YouTube — tutoriel avec démonstration
- **Intention :** Convaincre les automatiseurs n8n de migrer leur mental model vers l'agentic — vendre l'idée que Claude Code est le nouveau cerveau d'orchestration.
- **Public :** Développeurs et no-coders utilisant n8n, Make, ou Zapier pour l'automatisation.
- **En une phrase :** "Ce texte essaie de démontrer que les workflows rigides sont un paradigme dépassé, remplacé par des agents autonomes qui décident quoi faire."

---

## Idée 1 : Les workflows rigides sont un cul-de-sac

**Explication :** Un workflow n8n traditionnel est une séquence fixe : trigger → étape 1 → condition → étape 2 → output. Chaque branche, chaque API call, chaque fallback doit être câblé manuellement. Quand l'étape 3 échoue ou quand le contexte change, le workflow entier casse. C'est de l'automatisation fragile déguisée en intelligence.

**Citations reconstituées :**
- "You're not building intelligence, you're building a very complicated if-else statement"
- "Every edge case is another node. Every new API is another connection. It doesn't scale."
- "n8n is a tool, not a brain"

### Analyse critique

- **Pouvoir positif :** Libère les automatiseurs de la pensée "tout doit être prévu à l'avance". Encourage la conception adaptative.
- **Pouvoir négatif :** Simplifie excessivement n8n. Les workflows déterministes ont des vertus : prévisibilité, auditabilité, reproductibilité. Les régulateurs et les entreprises veulent savoir exactement ce qui va se passer.
- **Pérennité :** Durable — la tendance vers l'autonomie des agents est structurelle, pas conjoncturelle.
- **Confrontation :** Les workflows déterministes restent supérieurs pour les processus critiques (paiements, compliance, sécurité). L'argument "rigide = mauvais" ignore que la rigidité est parfois une feature, pas un bug.
- **Test cynique :** "Si les workflows rigides étaient vraiment un cul-de-sac, pourquoi n8n a levé $16M en 2024 et continue de croître ?" Parce que la majorité des automatisations ne nécessitent pas de raisonnement — elles nécessitent de la fiabilité.
- **Verdict :** Vrai pour les cas complexes et adaptatifs. Faux pour 80% des automatisations simples qui marchent très bien en séquentiel.

---

## Idée 2 : Claude Code comme cerveau d'orchestration

**Explication :** Au lieu que n8n soit le chef d'orchestre, Claude Code devient le cerveau qui décide quels workflows appeler, dans quel ordre, et comment réagir aux résultats intermédiaires. Via n8n-MCP (Model Context Protocol), les workflows n8n deviennent des "outils" que l'agent peut invoquer. L'humain décrit l'intention en langage naturel ; l'agent raisonne, planifie, exécute, adapte.

Le pattern :
```
Traditionnel :  Trigger → Étapes fixes → Output (fragile)
Agentic :       Intention → Raisonnement agent → Sélection d'outils → Exécution adaptative (résilient)
```

**Citations reconstituées :**
- "Your n8n workflows become tools, not the orchestrator"
- "Describe what you want, not how to get there"
- "The agent figures out which workflow to call and in what order"

### Analyse critique

- **Pouvoir positif :** Réduit drastiquement le coût d'entrée. Un non-développeur peut orchestrer des systèmes complexes en décrivant son intention. Démocratisation réelle.
- **Pouvoir négatif :** Crée une dépendance totale à un provider (Anthropic). Quand Claude est down ou change son pricing, tout s'arrête. L'opacité du raisonnement agent rend le debugging cauchemardesque.
- **Pérennité :** Durable dans le concept (agents comme orchestrateurs). Fragile dans l'implémentation spécifique (Claude Code + n8n-MCP = stack très jeune).
- **Confrontation :** OpenAI, Google, et les open-source (Aider, OpenCode) offrent des alternatives. Le lock-in Anthropic n'est pas un détail.
- **Test cynique :** "Si l'orchestration par agent était vraiment supérieure, pourquoi les entreprises n'ont-elles pas déjà migré ?" Parce que la confiance se construit lentement, et un agent qui "raisonne" de travers coûte plus cher qu'un workflow qui plante de manière prévisible.
- **Verdict :** Architecture d'avenir, mais la transition sera graduelle — pas un remplacement brutal.

---

## Idée 3 : n8n-MCP comme pont entre les mondes

**Explication :** Le setup concret repose sur trois composants :
1. **Claude Code** — le cerveau agentic
2. **n8n-MCP server** — expose les workflows n8n comme des outils appelables par l'agent
3. **n8n-skills** — enseigne à Claude Code comment construire et gérer des workflows n8n

Le MCP (Model Context Protocol) est décrit comme "l'USB-C des outils IA" — une interface universelle qui connecte l'agent à n'importe quel système externe.

**Citations reconstituées :**
- "MCP turns your workflows into callable functions"
- "The agent doesn't just generate code — it executes real systems"
- "n8n becomes an intelligent backend that understands context and intent"

### Analyse critique

- **Pouvoir positif :** Élimine la friction entre "décrire ce qu'on veut" et "le faire exécuter". L'agent comprend l'intention et choisit les outils.
- **Pouvoir négatif :** Stack complexe à maintenir. n8n + n8n-MCP + Claude Code + permissions + tokens = beaucoup de points de défaillance. La promesse de simplicité cache une complexité technique réelle.
- **Pérennité :** Le concept MCP est durable (protocol ouvert, adopté par l'industrie). L'implémentation spécifique n8n-MCP est jeune et potentiellement instable.
- **Confrontation :** Zapier a ses propres intégrations AI. Make.com travaille sur des agents. n8n lui-même développe des AI agents natifs. La couche MCP pourrait devenir redondante.
- **Test cynique :** "Si MCP était le standard universel annoncé, pourquoi Google et Microsoft n'ont-ils pas encore adopté massivement ?" Parce que chaque géant veut son propre standard — et l'histoire des "standards universels" en tech est un cimetière.
- **Verdict :** Pari technique intéressant. MCP a de l'élan, mais l'interopérabilité universelle reste un rêve plus qu'une réalité.

---

## Idée 4 : Self-healing workflows

**Explication :** Un agent peut détecter quand un workflow échoue, diagnostiquer la cause, et tenter une approche alternative — sans intervention humaine. Là où un workflow n8n classique s'arrête avec une erreur, l'agent raisonne sur l'échec et essaie un plan B.

### Analyse critique

- **Pouvoir positif :** Réduit le temps de maintenance. Les erreurs transitoires (API timeout, rate limit) sont gérées automatiquement.
- **Pouvoir négatif :** Un agent qui "corrige" une erreur qu'il ne comprend pas réellement peut aggraver le problème. L'illusion de compétence est plus dangereuse que l'échec visible.
- **Pérennité :** Visionnaire — les systèmes auto-réparants sont l'avenir. Mais pas encore fiables pour la production critique.
- **Test cynique :** "Si les agents pouvaient vraiment s'auto-réparer, pourquoi a-t-on encore besoin de SREs ?" Parce que le raisonnement probabiliste d'un LLM n'est pas le même que le diagnostic déterministe d'un ingénieur.
- **Verdict :** Prometteur pour les cas non-critiques. Dangereux si appliqué aveuglément aux systèmes de production.

---

## Synthèse

### Méta-pattern
La vidéo incarne le shift de paradigme 2026 : de l'**automatisation programmée** vers l'**orchestration intelligente**. Le développeur passe de "constructeur de pipelines" à "manager d'agents". C'est le même shift que DevOps a imposé dans les années 2010 — pas une disparition des outils existants, mais un changement de qui contrôle le flux.

### Tensions internes
- Prône la simplicité ("just describe what you want") mais le setup technique est loin d'être simple (n8n + MCP + Claude Code + permissions)
- Critique la rigidité des workflows mais ne propose pas de solution pour l'auditabilité et la reproductibilité que les workflows déterministes offrent
- Vend Claude Code comme le cerveau, mais ne mentionne pas les alternatives open-source

### Question provocante
> Si le futur de l'automatisation est un agent qui décide quoi faire, qui est responsable quand l'agent prend la mauvaise décision — l'humain qui a écrit l'intention, l'agent qui a choisi le plan, ou le provider qui a entraîné le modèle ?

### Hiérarchie des idées

| Idée | Valeur /10 | Risque /10 |
|------|-----------|-----------|
| Claude Code comme orchestrateur | 8 | 6 |
| Workflows rigides = cul-de-sac | 6 | 4 |
| n8n-MCP comme pont universel | 7 | 5 |
| Self-healing workflows | 7 | 7 |

---

## Connexions Cosmos

- Résonne avec : [[Sources - LLM Terminal]] (paradigme 2026, orchestration > linter)
- Résonne avec : [[MCP]] (Model Context Protocol comme couche d'interopérabilité)
- Contredit : La philosophie "déterministe d'abord" des systèmes critiques
- Complète : [[Agentic Workflows]] (architecture agent-first)

---

*Extraction : 2026-02-08 | Confiance : MOYENNE (reconstruction depuis titre, sources secondaires et contenu communautaire — pas de transcript direct)*
