#!/usr/bin/env bash
# =============================================================================
# Littoralicious — Weekly Newsletter Generator
#
# Reads articles.json, picks articles from the last N days, generates a
# Markdown email body, and creates a DRAFT in Buttondown via their API.
#
# Usage:
#   ./scripts/newsletter.sh              # Articles from last 7 days
#   ./scripts/newsletter.sh 30           # Articles from last 30 days
#   ./scripts/newsletter.sh all          # All articles (for first-ever send)
#   ./scripts/newsletter.sh --send       # Create and SEND immediately (careful!)
#
# Requirements:
#   - BUTTONDOWN_API_KEY env var (get it from https://buttondown.com/keys)
#   - jq installed (brew install jq)
#   - curl
#
# The script creates a DRAFT by default. Review at https://buttondown.com/emails
# then click Send when ready.
# =============================================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
ARTICLES_JSON="$PROJECT_DIR/data/articles.json"
SITE_URL="https://www.littoralicious.com"

# --- Config ---
DAYS="${1:-7}"
SEND_MODE="draft"
if [[ "${1:-}" == "--send" || "${2:-}" == "--send" ]]; then
    SEND_MODE="about_to_send"
fi

# --- Check dependencies ---
if ! command -v jq &>/dev/null; then
    echo "Error: jq is required. Install with: brew install jq"
    exit 1
fi

if [[ -z "${BUTTONDOWN_API_KEY:-}" ]]; then
    echo "Error: BUTTONDOWN_API_KEY environment variable not set."
    echo "Get your API key from: https://buttondown.com/keys"
    echo ""
    echo "Set it with:"
    echo "  export BUTTONDOWN_API_KEY='your-key-here'"
    echo ""
    echo "Or add to your shell profile:"
    echo "  echo 'export BUTTONDOWN_API_KEY=\"your-key-here\"' >> ~/.zshrc"
    exit 1
fi

# --- Calculate date cutoff ---
if [[ "$DAYS" == "all" ]]; then
    CUTOFF="2000-01-01"
    PERIOD_LABEL="all published articles"
else
    if [[ "$OSTYPE" == "darwin"* ]]; then
        CUTOFF=$(date -v-"${DAYS}"d +%Y-%m-%d)
    else
        CUTOFF=$(date -d "-${DAYS} days" +%Y-%m-%d)
    fi
    PERIOD_LABEL="last $DAYS days"
fi

echo "Generating newsletter for: $PERIOD_LABEL (since $CUTOFF)"
echo "Mode: $SEND_MODE"
echo ""

# --- Extract articles since cutoff ---
ARTICLES=$(jq -r --arg cutoff "$CUTOFF" '
    .articles
    | sort_by(.date)
    | reverse
    | map(select(.date >= $cutoff))
' "$ARTICLES_JSON")

COUNT=$(echo "$ARTICLES" | jq 'length')

if [[ "$COUNT" -eq 0 ]]; then
    echo "No new articles since $CUTOFF. Nothing to send."
    exit 0
fi

echo "Found $COUNT article(s) to include."
echo ""

# --- Build the email body using jq (avoids bash associative array issues) ---
TODAY=$(date +"%B %d, %Y")
WEEK_NUM=$(date +"%V")

SUBJECT="The Monthly Brief — Week $WEEK_NUM"

BODY=$(echo "$ARTICLES" | jq -r --arg today "$TODAY" --arg period "$PERIOD_LABEL" --arg site "$SITE_URL" '
  def cat_name:
    if . == "shore-larder" then "Shore Larder"
    elif . == "the-method" then "The Method"
    elif . == "littoral-heritage" then "Littoral Heritage"
    elif . == "the-evidence" then "The Evidence"
    elif . == "the-bridge" then "The Bridge"
    elif . == "trade-winds" then "Trade Winds"
    else . end;

  "# The Monthly Brief\n\n*\($today)*\n\n---\n\nHere'"'"'s what'"'"'s new on Littoralicious — \($period).\n\n" +
  (group_by(.category) | sort_by(.[0].category) | map(
    "## \(.[0].category | cat_name)\n\n" +
    (map("**[\(.title)](\($site)/articles/\(.slug).html)** — \(.read_time) min read\n") | join("\n"))
  ) | join("\n")) +
  "\n---\n\nRead what matters. Skip what doesn'"'"'t.\n\nOne purpose: **Nurture.**\n\n— Littoralicious\n\n*[Read on the web](\($site)) · [Meet the Crew](\($site)/community.html)*"
')

# --- Preview ---
echo "============================================"
echo "SUBJECT: $SUBJECT"
echo "============================================"
echo "$BODY"
echo "============================================"
echo ""

# --- Send to Buttondown API ---
echo "Creating $SEND_MODE in Buttondown..."

# Escape the body for JSON
BODY_ESCAPED=$(echo "$BODY" | python3 -c 'import sys,json; print(json.dumps(sys.stdin.read()))')

PAYLOAD=$(cat <<ENDJSON
{
    "subject": $(echo "$SUBJECT" | python3 -c 'import sys,json; print(json.dumps(sys.stdin.read().strip()))'),
    "body": $BODY_ESCAPED,
    "status": "$SEND_MODE"
}
ENDJSON
)

RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "https://api.buttondown.com/v1/emails" \
    -H "Authorization: Token $BUTTONDOWN_API_KEY" \
    -H "Content-Type: application/json" \
    -d "$PAYLOAD")

HTTP_CODE=$(echo "$RESPONSE" | tail -1)
RESPONSE_BODY=$(echo "$RESPONSE" | sed '$d')

if [[ "$HTTP_CODE" -ge 200 && "$HTTP_CODE" -lt 300 ]]; then
    EMAIL_ID=$(echo "$RESPONSE_BODY" | jq -r '.id // empty')
    echo ""
    echo "Newsletter $SEND_MODE created."
    if [[ "$SEND_MODE" == "draft" ]]; then
        echo ""
        echo "  Review and send it here:"
        echo "  https://buttondown.com/emails"
        echo ""
        if [[ -n "$EMAIL_ID" ]]; then
            echo "  Or send via API:"
            echo "  curl -X POST https://api.buttondown.com/v1/emails/$EMAIL_ID/send-draft \\"
            echo "    -H 'Authorization: Token \$BUTTONDOWN_API_KEY'"
        fi
    else
        echo "Newsletter SENT to all subscribers."
    fi
else
    echo ""
    echo "Error ($HTTP_CODE):"
    echo "$RESPONSE_BODY"
    exit 1
fi
