#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
bash "$SCRIPT_DIR/CAI_DAT_MAC_LINUX.sh" "$@" || true
echo ""
read -r -p "Nhan Enter de dong cua so..." _
