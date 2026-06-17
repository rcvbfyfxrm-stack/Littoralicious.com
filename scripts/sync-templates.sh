#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# sync-templates.sh — push template edits live so the Studio "Templates" section
# (which reads templates/ from the deployed site) stays in sync with whatever was
# changed from the terminal.
#
# Flow: commit templates/ -> push to origin -> GitHub Action deploys -> Studio
# shows the new template in ~1-2 min.
#
#   ./scripts/sync-templates.sh                 # commit + push any templates/ changes
#   ./scripts/sync-templates.sh "msg"           # ...with a custom commit subject
#   ./scripts/sync-templates.sh --install-hook  # auto-sync on every template commit
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"

HOOK=".git/hooks/post-commit"
if [ "${1:-}" = "--install-hook" ]; then
  cat > "$HOOK" <<'HK'
#!/usr/bin/env bash
# Auto-sync templates to the Studio whenever a commit touches templates/.
gd="$(git rev-parse --git-dir)"
# No-op during rebase/merge/cherry-pick (HEAD is detached → the push would be bogus).
if [ -d "$gd/rebase-merge" ] || [ -d "$gd/rebase-apply" ] || [ -f "$gd/MERGE_HEAD" ] || [ -f "$gd/CHERRY_PICK_HEAD" ]; then exit 0; fi
if git diff-tree --no-commit-id --name-only -r HEAD | grep -q '^templates/'; then
  branch="$(git rev-parse --abbrev-ref HEAD)"
  echo "[post-commit] templates changed -> pushing origin/$branch (Studio will update)…"
  git push origin "$branch" || echo "[post-commit] push failed — run: git push origin $branch"
fi
HK
  chmod +x "$HOOK"
  echo "Installed $HOOK — template commits now auto-push to the Studio."
  exit 0
fi

# Drop the recurring phantom studio.html diff so it never blocks the commit.
git checkout -- studio.html 2>/dev/null || true

if git diff --quiet -- templates/ && git diff --cached --quiet -- templates/; then
  echo "No template changes to sync."
  exit 0
fi

git add templates/
msg="${1:-templates: sync edits to Studio}"
git commit -m "$msg

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"

branch="$(git rev-parse --abbrev-ref HEAD)"
git push origin "$branch"
echo "Pushed templates -> origin/$branch. CI deploys -> Studio Templates updates in ~1-2 min."
