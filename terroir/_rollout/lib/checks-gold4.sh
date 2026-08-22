#!/bin/bash
# GOLD4 deploy gate — thin wrapper so the playbook's `bash lib/checks-gold4.sh` idiom works.
#   bash terroir/_rollout/lib/checks-gold4.sh <repo_root> <guide-config.json> [--no-render]
# All logic lives in checks_gold4.py. Exit 0 = deployable, 1 = HOLD.
set -uo pipefail
here="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
exec python3 "$here/checks_gold4.py" "$@"
