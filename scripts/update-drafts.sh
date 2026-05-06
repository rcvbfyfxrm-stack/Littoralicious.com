#!/usr/bin/env bash
# Rebuild data/drafts.json from content/drafts/ and content/review/
# Called by ~/Desktop/Update Littoralicious Drafts.command
set -euo pipefail

PROJECT="/Users/callierapca/Library/CloudStorage/ProtonDrive-arnaudcallier@pm.me-folder/NEXUS/Projects/littoralicious"
cd "$PROJECT"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "LITTORALICIOUS — Updating drafts index"
echo "$(date '+%Y-%m-%d %H:%M:%S')"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

python3 scripts/build-drafts-index.py

COUNT=$(python3 -c "import json; print(json.load(open('data/drafts.json'))['count'])")

echo ""
echo "✓ Indexed ${COUNT} drafts → data/drafts.json"
echo "  Open studio.html in your browser to use the new data."
echo ""

# macOS notification
osascript -e "display notification \"${COUNT} drafts indexed. Reload studio.html.\" with title \"Littoralicious Studio\" sound name \"Glass\"" 2>/dev/null || true
