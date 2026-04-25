---
name: polish-drafts
description: Walk through DNA-lint WARN drafts one at a time, surface the specific warnings, and guide fixes until the draft passes.
---

# Polish Drafts — quick-wins assistant

Goal: turn WARN drafts into publishable articles, one at a time, in a single session.

## Usage

The user invokes `/polish-drafts` and may optionally pass a draft path. If no path, pick the first WARN draft from the lint report.

## Procedure

1. **Run the linter** to get the fresh warning list:
   ```bash
   python3 scripts/dna-lint.py --json > /tmp/dna-lint.json 2>/dev/null \
     || python3 scripts/dna-lint.py 2>&1 | tee /tmp/dna-lint.txt
   ```
   If `--json` is unsupported, parse the plain output.

2. **Select one draft** (argument wins, else first WARN from report). Confirm choice in one line:
   > Polishing: `content/review/<file>.md` — 4 warnings.

3. **Surface warnings for that draft only**, numbered, with the exact line ref:
   ```
   1. L42: voice check — grandmother pillar missing in intro
   2. L87: anonymisation — real name "Marco" appears
   3. L134: source tag missing on claim
   4. L201: CTA block absent
   ```

4. **Walk through fixes one at a time.** For each warning:
   - Read the relevant lines (Read tool, narrow range).
   - Propose a specific edit (diff style or before/after).
   - Apply with Edit tool after user confirms, or auto-apply if the fix is mechanical (e.g., name anonymisation → "one chef").
   - Move to next warning.

5. **Mechanical fixes to auto-apply** (no confirm needed):
   - Replace first names from WhatsApp with "one chef" / "a crew member" (per editorial rule in CLAUDE.md memory).
   - Remove date/time/allergen lines from menu-style content.
   - Fix obvious typos flagged by the linter.

6. **Judgement fixes to confirm first:**
   - Voice-pillar gaps (needs rewriting, not replacement).
   - Missing CTA — ask which template block to use.
   - Source tags — ask user for the source if unknown.

7. **Re-lint after each fix** to confirm the warning clears. Don't batch.

8. **When the draft is WARN-free**, move it: `mv content/review/<file>.md content/drafts/<file>.md` (or whatever the "ready to publish" path is — confirm with user once). Then offer the next WARN draft.

## Stop conditions

- User types "stop" / "next session" — leave the draft as-is, report progress.
- Fix would require substantial rewrite (> 3 paragraphs) — flag as "needs dedicated session," skip to next draft.
- Linter crashes — report and halt.

## Output shape (per warning)

```
── Warning 2/4: anonymisation ──
L87: "Marco from M/Y Serenity said the ice cream machine..."

Fix: replace "Marco" → "one chef", drop boat name.

Proposed:
  - Marco from M/Y Serenity said the ice cream machine
  + One chef said the ice cream machine

[applied]
```

Keep the cadence tight. One warning, one fix, one confirmation of clear. No long explanations unless asked.
