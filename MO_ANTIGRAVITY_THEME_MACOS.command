#!/usr/bin/env bash
set -euo pipefail

export PATH="/opt/homebrew/bin:/usr/local/bin:$HOME/.volta/bin:$HOME/.fnm/current/bin:$HOME/.local/bin:$PATH"
if [ -d "$HOME/.nvm/versions/node" ]; then
    for d in "$HOME/.nvm/versions/node"/v*/bin; do
        [ -d "$d" ] && export PATH="$d:$PATH"
    done
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TARGET_DIR="$HOME/.gemini/config/skills/antigravity-custom-theme"

echo "============================================================"
echo "  MO ANTIGRAVITY KEM CUSTOM THEME (macOS - CDP PORT 9000)   "
echo "============================================================"
echo ""

if [ ! -f "$TARGET_DIR/daemon/theme_daemon.js" ]; then
    echo "[INFO] Chua cai dat Custom Theme. Dang tu dong cai dat..."
    bash "$SCRIPT_DIR/CAI_DAT_MAC_LINUX.sh"
fi

if ! command -v node >/dev/null 2>&1; then
    echo "[LOI] Khong tim thay Node.js >= 22 trong PATH." >&2
    read -r -p "Nhan Enter de dong cua so..." _
    exit 1
fi
NODE_BIN="$(command -v node)"

# Ensure daemon is alive
DAEMON_OK=0
if [ -f "$TARGET_DIR/daemon.pid" ]; then
    OLD_PID="$(tr -d '[:space:]' < "$TARGET_DIR/daemon.pid" || true)"
    if [ -n "$OLD_PID" ] && kill -0 "$OLD_PID" 2>/dev/null; then
        DAEMON_OK=1
        echo "[OK] Theme daemon dang chay (PID $OLD_PID)."
    fi
fi
if [ "$DAEMON_OK" -eq 0 ]; then
    echo "[INFO] Dang khoi dong theme daemon..."
    bash "$TARGET_DIR/scripts/install-unix.sh"
fi

APP_SUPPORT="$HOME/Library/Application Support"
PORT_FILE=""
for cand in "$APP_SUPPORT/Antigravity/DevToolsActivePort" "$APP_SUPPORT/antigravity/DevToolsActivePort"; do
    if [ -f "$cand" ]; then
        PORT_FILE="$cand"
        break
    fi
done

if pgrep -f "Antigravity.app/Contents/MacOS" >/dev/null 2>&1 && [ -z "$PORT_FILE" ]; then
    echo "[CANH BAO] Antigravity dang chay o che do thuong (thieu --remote-debugging-port=9000)."
    read -r -p "Thoat Antigravity hien tai de mo lai kem Custom Theme? [y/N]: " ANS
    case "$ANS" in
        y|Y|yes|YES)
            osascript -e 'tell application "Antigravity" to quit' >/dev/null 2>&1 || true
            for _ in $(seq 1 14); do
                if ! pgrep -f "Antigravity.app/Contents/MacOS" >/dev/null 2>&1; then
                    break
                fi
                sleep 0.5
            done
            if pgrep -f "Antigravity.app/Contents/MacOS" >/dev/null 2>&1; then
                echo "[LOI] Antigravity van dang chay. Hay bam Cmd+Q de thoat han roi chay lai file nay."
                read -r -p "Nhan Enter de dong cua so..." _
                exit 1
            fi
            ;;
        *)
            echo "[INFO] Da huy. Hay Cmd+Q Antigravity truoc roi chay lai."
            read -r -p "Nhan Enter de dong cua so..." _
            exit 0
            ;;
    esac
fi

APP_TARGET=""
for cand in "/Applications/Antigravity.app" "$HOME/Applications/Antigravity.app"; do
    if [ -d "$cand" ]; then
        APP_TARGET="$cand"
        break
    fi
done
if [ -z "$APP_TARGET" ] && command -v mdfind >/dev/null 2>&1; then
    APP_TARGET="$(mdfind "kMDItemFSName == 'Antigravity.app'" 2>/dev/null | head -n 1 || true)"
fi

echo "[INFO] Dang mo Antigravity kem --remote-debugging-port=9000..."
if [ -n "$APP_TARGET" ]; then
    open -a "$APP_TARGET" --args --remote-debugging-port=9000
else
    open -a "Antigravity" --args --remote-debugging-port=9000
fi

for _ in $(seq 1 10); do
    if [ -f "$APP_SUPPORT/Antigravity/DevToolsActivePort" ] || [ -f "$APP_SUPPORT/antigravity/DevToolsActivePort" ]; then
        break
    fi
    sleep 0.8
done
sleep 1.5

echo ""
echo "[INFO] Kiem tra ket noi CDP..."
"$NODE_BIN" "$TARGET_DIR/scripts/verify_cdp.js" || true
echo ""
read -r -p "Nhan Enter de dong cua so..." _
