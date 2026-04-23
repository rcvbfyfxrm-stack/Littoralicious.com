---
name: logbook
description: Write a session log capturing decisions, actions, and patterns
arguments:
  - name: project
    description: Project name for the session (e.g., NEXUS, chef, educatedtraveler)
    required: false
---

# Logbook — Session Log Writer

Write a structured session log for the current work session.

## Instructions

1. **Review context** — Read the current conversation to identify:
   - What was the session goal?
   - What was actually accomplished?
   - What decisions were made (and why)?
   - What problems were encountered?
   - What ideas emerged but weren't acted on?

2. **Read recent sessions** — Check `/Users/callierapca/Documents/NEXUS/OUTPUT/Sessions/` for recent logs to identify patterns.

3. **Score honestly** — Use the Hard Truth Scale:
   - **Excellent** — Goal achieved, quality high, no loose ends
   - **Good** — Goal mostly achieved, minor gaps
   - **Mediocre** — Some progress but below standard
   - **Mixed** — Some wins, some failures
   - **Light** — Minimal real output despite time spent

4. **Update memory** — After writing the log, update `/Users/callierapca/.claude/projects/-Users-callierapca-Documents/memory/MEMORY.md` with key learnings.

## Output

Write to: `/Users/callierapca/Documents/NEXUS/OUTPUT/Sessions/`
Filename: `YYYY-MM-DD {{project}} Session.md` (use today's date, default project to "NEXUS" if not specified)

```markdown
# Session Log — [Date]

## Objectif
[What was planned]

## Réalisé
- [Action 1] — [outcome]
- [Action 2] — [outcome]

## Décisions Prises
| Décision | Raison | Réversible? |
|----------|--------|-------------|

## Non-Reviewé
[Work not yet validated — flag for next session]

## Problèmes Rencontrés
- [Problem] → [Solution or status]

## Idées Capturées
- [Idea not acted on — park for later]

## Verdict
[Excellent / Good / Mediocre / Mixed / Light]
[1-2 sentences — no sugar coating]

## Patterns
[Recurring themes across recent sessions]

## Prochain Pas
1. [Next action]
2. [Next action]
```
