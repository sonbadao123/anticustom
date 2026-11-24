#!/usr/bin/env bash
set -euo pipefail

# Extend PATH for macOS Finder / GUI / Homebrew / nvm / volta / fnm shells
export PATH="/opt/homebrew/bin:/usr/local/bin:$HOME/.volta/bin:$HOME/.fnm/current/bin:$HOME/.local/bin:$PATH"
if [ -d "$HOME/.nvm/versions/node" ]; then
    LATEST_NVM_BIN="$(ls -d "$HOME/.nvm/versions/node"/v*/bin 2>/dev/null | sort -V | tail -n 1 || true)"
    if [ -n "$LATEST_NVM_BIN" ]; then
        export PATH="$LATEST_NVM_BIN:$PATH"
    fi
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SOURCE_DIR="$SCRIPT_DIR/antigravity-custom-theme"
TARGET_DIR="$HOME/.gemini/config/skills/antigravity-custom-theme"

KEEP_CONFIG=0
RUN_FOREGROUND=0
for arg in "$@"; do
    case "$arg" in
        --keep-config) KEEP_CONFIG=1 ;;
        --foreground)  RUN_FOREGROUND=1 ;;
        -h|--help)
            echo "Usage: bash CAI_DAT_MAC_LINUX.sh [--keep-config] [--foreground]"
            exit 0
            ;;
    esac
done

echo "============================================================"
echo "  ANTIGRAVITY CUSTOM THEME PRO - CAI DAT (macOS / LINUX)    "
echo "============================================================"
echo ""

if [ ! -d "$SOURCE_DIR" ]; then
    echo "[LOI] Khong tim thay thu muc nguon: $SOURCE_DIR" >&2
    exit 1
fi

# 1. Check Node.js >= 22
if ! command -v node >/dev/null 2>&1; then
    echo "[LOI] Chua cai dat Node.js!" >&2
    echo "Hay cai dat Node.js >= 22 LTS:" >&2
    if [ "$(uname -s)" = "Darwin" ]; then
        echo "  - Homebrew: brew install node@22" >&2
    fi
    echo "  - Hoac tai truc tiep tai: https://nodejs.org/" >&2
    exit 1
fi

NODE_BIN="$(command -v node)"
NODE_VER="$("$NODE_BIN" --version)"
NODE_MAJOR="$("$NODE_BIN" -p "process.versions.node.split('.')[0]")"
if [ "$NODE_MAJOR" -lt 22 ]; then
    echo "[LOI] Can Node.js >= 22 (hien tai: $NODE_VER tai $NODE_BIN)." >&2
    echo "Hay cap nhat Node.js >= 22 LTS tai: https://nodejs.org/" >&2
    exit 1
fi
echo "[OK] Node.js $NODE_VER ($NODE_BIN)"

# 2. Stop existing daemon if already installed
if [ -f "$TARGET_DIR/scripts/install-unix.sh" ]; then
    echo "[INFO] Dung daemon cu (neu dang chay)..."
    bash "$TARGET_DIR/scripts/install-unix.sh" stop >/dev/null 2>&1 || true
fi

# 3. Backup or preserve existing theme_config.json
mkdir -p "$TARGET_DIR"
TMP_KEEP_CFG=""
if [ -f "$TARGET_DIR/theme_config.json" ]; then
    if [ "$KEEP_CONFIG" -eq 1 ]; then
        TMP_KEEP_CFG="$(mktemp)"
        cp "$TARGET_DIR/theme_config.json" "$TMP_KEEP_CFG"
        echo "[INFO] Giu nguyen theme_config.json cu (--keep-config)."
    else
        STAMP="$(date +%Y%m%d_%H%M%S)"
        BACKUP_PATH="$TARGET_DIR/theme_config.backup.$STAMP.json"
        cp "$TARGET_DIR/theme_config.json" "$BACKUP_PATH"
        echo "[INFO] Da sao luu cau hinh cu tai: $BACKUP_PATH"
    fi
fi

# 4. Copy clean theme bundle to permanent Antigravity global skills directory
echo "[INFO] Dang sao chep bo Custom Theme vao: $TARGET_DIR"
for item in "$SOURCE_DIR"/* "$SOURCE_DIR"/.[!.]* "$SOURCE_DIR"/..?*; do
    [ -e "$item" ] || continue
    base="$(basename "$item")"
    case "$base" in
        daemon.log|daemon.pid|silent-start.vbs|.git) continue ;;
    esac
    rm -rf "$TARGET_DIR/$base"
    cp -R "$item" "$TARGET_DIR/$base"
done

if [ -n "$TMP_KEEP_CFG" ] && [ -f "$TMP_KEEP_CFG" ]; then
    cp "$TMP_KEEP_CFG" "$TARGET_DIR/theme_config.json"
    rm -f "$TMP_KEEP_CFG"
fi

chmod +x \
    "$TARGET_DIR/scripts/install-unix.sh" \
    "$TARGET_DIR/daemon/theme_daemon.js" \
    "$TARGET_DIR/scripts/uninstall.js" \
    "$TARGET_DIR/scripts/verify_cdp.js" \
    "$TARGET_DIR/scripts/build_payload.py" 2>/dev/null || true

echo "[OK] Da cai dat bo skill & media vao thu muc co dinh."

# 5. Install OS auto-start service & launch daemon from permanent directory
if [ "$RUN_FOREGROUND" -eq 1 ]; then
    echo "[INFO] Dang chay daemon o che do foreground (Ctrl+C de dung)..."
    exec bash "$TARGET_DIR/scripts/install-unix.sh" --foreground
fi

echo "[INFO] Dang dang ky tu dong chay nen (LaunchAgent / systemd)..."
bash "$TARGET_DIR/scripts/install-unix.sh"

# 6. Verify live if Antigravity is currently open
sleep 1.5
echo ""
echo "[INFO] Kiem tra ket noi truc tiep voi Antigravity (CDP)..."
if "$NODE_BIN" "$TARGET_DIR/scripts/verify_cdp.js"; then
    echo ""
    echo "[OK] Giao dien Custom Theme da ap dung thanh cong tren Antigravity!"
else
    echo ""
    echo "[INFO] Daemon da chay nen thanh cong!"
    echo "       Neu Antigravity chua mo, hay mo Antigravity len la giao dien tu dong doi ngay."
    echo "       Neu Antigravity dang mo ma chua doi, hay tat han va mo lai Antigravity."
fi

echo ""
echo "============================================================"
echo "  HOAN TAT! Ban co the xoa thu muc giai nen nay sau khi cai."
echo "  Mo tuy chinh trong Antigravity: nhan \"Custom theme\" o     "
echo "  thanh ben trai (ngay duoi muc Customizations).            "
echo "============================================================"
