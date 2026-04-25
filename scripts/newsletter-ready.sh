#!/usr/bin/env bash
# Newsletter-ready digest: build the Weekly Brief source list from the
# "ready to publish" / "quick wins" bucket rather than last-N-days.
#
# Pipeline:
#   1. Run audit-stale-drafts.py  -> logs/audit-drafts-<date>.md
#   2. Run dna-lint.py            -> list of WARN-free or ≤1-warning files
#   3. Intersect PUBLISH bucket ∩ lint-clean set = "ready" list
#   4. Emit a plain manifest at logs/newsletter-ready-manifest.txt
#   5. Invoke newsletter.sh --manifest <file>  (if the base script supports it)
#
# If newsletter.sh doesn't support --manifest yet, this script still
# produces the manifest — the human can paste slugs in manually, or we
# can patch newsletter.sh in a follow-up.

set -euo pipefail
cd "$(dirname "$0")/.."
ROOT="$(pwd)"
TODAY="$(date +%F)"
LOGS="$ROOT/logs"
MANIFEST="$LOGS/newsletter-ready-manifest.txt"
MAX="${MAX:-5}"    # cap the brief at 5 articles by default

mkdir -p "$LOGS"

# 1) fresh audit
python3 scripts/audit-stale-drafts.py >/dev/null
AUDIT="$LOGS/audit-drafts-$TODAY.md"
[ -f "$AUDIT" ] || { echo "audit not produced: $AUDIT"; exit 1; }

# 2) lint — capture per-file WARN counts
LINT_OUT="$(mktemp)"
python3 scripts/dna-lint.py > "$LINT_OUT" 2>&1 || true

# 3) extract PUBLISH bucket filenames from audit report
#    (lines under '## PUBLISH' formatted as '- `name.md` — ...')
PUBLISH_LIST="$(awk '
  /^## PUBLISH/     { in_b=1; next }
  /^## (REFRESH|ARCHIVE)/ { in_b=0 }
  in_b && /^- `/ { match($0,/`[^`]+`/); print substr($0,RSTART+1,RLENGTH-2) }
' "$AUDIT")"

# 4) keep only files with ≤1 lint warning.  Match by basename.
READY=()
while IFS= read -r name; do
  [ -z "$name" ] && continue
  base="$(basename "$name")"
  warn_count=$(grep -c "$base" "$LINT_OUT" 2>/dev/null || true)
  if [ "$warn_count" -le 1 ]; then
    READY+=("$name")
  fi
done <<< "$PUBLISH_LIST"

# 5) cap and write manifest
COUNT="${#READY[@]}"
if [ "$COUNT" -eq 0 ]; then
  echo "no ready articles found — nothing to build" >&2
  rm -f "$LINT_OUT"
  exit 2
fi

: > "$MANIFEST"
printed=0
for f in "${READY[@]}"; do
  [ "$printed" -ge "$MAX" ] && break
  echo "$f" >> "$MANIFEST"
  printed=$((printed+1))
done

echo "ready articles: $COUNT  (using top $printed)"
echo "manifest: $MANIFEST"

# 6) delegate to newsletter.sh if it accepts a manifest
if grep -q -- "--manifest" scripts/newsletter.sh 2>/dev/null; then
  exec bash scripts/newsletter.sh --manifest "$MANIFEST" "$@"
else
  echo
  echo "Manifest ready. Paste into newsletter.sh, or patch it to accept --manifest."
  echo "Contents:"
  sed 's/^/  /' "$MANIFEST"
fi

rm -f "$LINT_OUT"
