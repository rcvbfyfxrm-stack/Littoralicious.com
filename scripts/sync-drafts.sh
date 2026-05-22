#!/usr/bin/env bash
# sync-drafts.sh — the one command that puts a draft into review.
#
# THE RULE: every draft article lives on the shared `drafts` branch and shows
# up at https://www.littoralicious.com/draft.html. This script does the whole
# round-trip: rebuild the index, commit, push to GitHub. One open PR
# (drafts -> main) is the rolling review queue.
#
# Usage, from anywhere inside the repo:
#   scripts/sync-drafts.sh ["optional commit message"]
#
# Workflow to add a new draft:
#   1. git checkout drafts
#   2. write articles/draft-<slug>.html   (the draft- prefix is mandatory)
#   3. scripts/sync-drafts.sh "Draft — <title>"
set -euo pipefail

REPO="$(git rev-parse --show-toplevel)"
cd "$REPO"

BRANCH="$(git rev-parse --abbrev-ref HEAD)"
if [ "$BRANCH" != "drafts" ]; then
  echo "✗ Not on the 'drafts' branch (currently: $BRANCH)."
  echo "  Run:  git checkout drafts   then re-run this script."
  exit 1
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "LITTORALICIOUS — Sync drafts to review"
echo "$(date '+%Y-%m-%d %H:%M:%S')"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

python3 scripts/build-draft-index.py

git add articles/draft-*.html articles/preview-*.html data/draft-articles.json scripts/ 2>/dev/null || true

if git diff --cached --quiet; then
  echo "Nothing to sync — drafts already up to date."
  exit 0
fi

MSG="${1:-Drafts — sync review queue ($(date +%Y-%m-%d))}"
git commit -m "$MSG"
git push -u origin drafts

echo ""
echo "✓ Synced. Review queue: https://www.littoralicious.com/draft.html"
echo "  Open PR (drafts -> main) is the rolling review surface."
