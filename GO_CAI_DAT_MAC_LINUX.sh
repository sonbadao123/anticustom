#!/usr/bin/env bash
set -euo pipefail

export PATH="/opt/homebrew/bin:/usr/local/bin:$HOME/.volta/bin:$HOME/.fnm/current/bin:$HOME/.local/bin:$PATH"
if [ -d "$HOME/.nvm/versions/node" ]; then
    LATEST_NVM_BIN="$(ls -d "$HOME/.nvm/versions/node"/v*/bin 2>/dev/null | sort -V | tail -n 1 || true)"
    if [ -n "$LATEST_NVM_BIN" ]; then
        export PATH="$LATEST_NVM_BIN:$PATH"
    fi
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
INSTALLED_SCRIPT="$HOME/.gemini/config/skills/antigravity-custom-theme/scripts/uninstall.js"

if ! command -v node >/dev/null 2>&1; then
    echo "[LOI] Khong tim thay Node.js trong PATH." >&2
    exit 1
fi

if [ -f "$INSTALLED_SCRIPT" ]; then
    node "$INSTALLED_SCRIPT"
else
    node "$SCRIPT_DIR/antigravity-custom-theme/scripts/uninstall.js"
fi

echo ""
echo "[INFO] Muon xoa hoan toan thu muc skill, ban co the chay:"
echo "       rm -rf \"$HOME/.gemini/config/skills/antigravity-custom-theme\""
