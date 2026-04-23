#!/usr/bin/env bash
# Render a one-page A4 recipe card HTML to PDF using the cached
# Playwright headless Chrome.
#
# Usage:
#   scripts/render-recipe-card.sh print/NAME-recipe-card.html
#   # → writes print/NAME-recipe-card.pdf
#
# The source HTML must set `@page { size: A4; margin: 0; }` and body
# `width: 210mm; height: 297mm; overflow: hidden; zoom: 0.92;` so that
# the card never overflows to a second page. See the existing cards
# in print/ for the template.

set -euo pipefail

HTML="${1:-}"
if [[ -z "$HTML" ]]; then
  echo "usage: $0 <path/to/card.html>" >&2
  exit 1
fi
if [[ ! -f "$HTML" ]]; then
  echo "not a file: $HTML" >&2
  exit 1
fi

PDF="${HTML%.html}.pdf"
BIN="$HOME/Library/Caches/ms-playwright/chromium_headless_shell-1217/chrome-headless-shell-mac-arm64/chrome-headless-shell"

if [[ ! -x "$BIN" ]]; then
  echo "headless chrome not found at $BIN" >&2
  echo "install Playwright or adjust the path." >&2
  exit 1
fi

ABS_HTML="$(cd "$(dirname "$HTML")" && pwd)/$(basename "$HTML")"

"$BIN" --headless --disable-gpu --no-sandbox \
  --no-pdf-header-footer \
  --print-to-pdf="$PDF" \
  --virtual-time-budget=2000 \
  "file://$ABS_HTML"

# Spotlight may take a moment to index a freshly-written file; poll up to 4 s.
PAGES="(null)"
for _ in 1 2 3 4; do
  PAGES="$(mdls -name kMDItemNumberOfPages "$PDF" 2>/dev/null | awk '{print $3}')"
  [[ "$PAGES" != "(null)" && -n "$PAGES" ]] && break
  sleep 1
done

if [[ "$PAGES" == "(null)" || -z "$PAGES" ]]; then
  echo "ok: $PDF (page count unavailable from Spotlight &mdash; verify manually)"
elif [[ "$PAGES" != "1" ]]; then
  echo "WARNING: rendered PDF is $PAGES pages. Tighten CSS or reduce content." >&2
  exit 2
else
  echo "ok: $PDF (1 page)"
fi
