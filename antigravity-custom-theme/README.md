# Antigravity Custom Theme Skill

Turn any wallpaper, aesthetic mood, or color palette into a live, 60fps custom theme inside **Antigravity** — packaged as both a standalone cross-platform CDP theme engine and a drop-in **AI Agent Skill** (`SKILL.md`).

> Give your AI agent an image + vibe ("cosmic violin gold on deep midnight", "cozy Kyoto matcha", "cyberpunk neon cyan"), and let it extract the palette, stage assets, compile the payload, and hot-reload your Antigravity UI cleanly without touching Electron app binaries.

## Features

- **Zero Live Blur Architecture (60fps Scroll):** Uses pre-baked offscreen canvas glass (`syncPrebakedGlass`) and gradient scrims instead of CSS `backdrop-filter: blur()`, preventing Electron/GPU scroll lag.
- **Unified L-Glass + Split-Browser Safe:** Automatically detects Antigravity's split embedded Chromium view (`data-has-browser-hole`) and cuts an `evenodd` `clip-path` window so embedded pages never get tinted or blurred.
- **Live Settings Modal:** Switch presets, upload custom wallpapers or **User / AI Agent circular avatars** (auto-compressed WebP), adjust scrim darkness, and persist choices to `theme_config.json`.
- **Light & Dark Glass Modes:** Supports both deep dark themes and daytime bright palettes (`isLight: true`) with adaptive ink, frosted pills, and titlebar controls.
- **Two Lightweight Sample Presets Included:**
  - `WLOP Cosmic` — 2K starlight wallpaper + custom SVG flourishes (`themes/assets/wlop_cosmic_2k.webp`)
  - `Midnight Obsidian` — Ultra-light zero-image pure-CSS gradient preset
- **Data/Engine Separation:** Add your own themes solely inside `themes/themes.json` + `themes/assets/` and compile via `scripts/build_payload.py`.
- **Cross-Platform Daemon (`daemon/theme_daemon.js`):** Windows, macOS, and Linux support using Node >= 22 built-in `WebSocket`.

## Prerequisites

- **Antigravity** running with CDP debugging port active (`DevToolsActivePort`)
- **Node.js >= 22** (uses native `globalThis.WebSocket`, zero `npm install` needed)
- **Python 3.9+** (optional `Pillow` package recommended for auto-compressing large >2K wallpapers into WebP)

## Quick Start

### 1. Build the Runtime Payload

```bash
python scripts/build_payload.py
```

This resolves `themes/themes.json` + `themes/assets/*` and compiles them with `engine/core.js` into gitignored `dist/theme_payload.js`.

### 2. Install & Run the Daemon

**Windows (PowerShell):**

```powershell
powershell -ExecutionPolicy Bypass -File scripts/install-win.ps1
```

Creates a hidden launcher in your Windows Startup folder (`AntigravityCustomTheme.lnk`) without hardcoding paths and attaches silently. Pass `-NoStartup` if you only want to run it for the current session.

**macOS / Linux (Bash):**

```bash
bash scripts/install-unix.sh
```

- On **macOS**, installs a `~/Library/LaunchAgents/io.antigravity.custom-theme.plist` LaunchAgent.
- On **Linux**, installs a `systemd --user` service (or falls back to `nohup`).
- Use `bash scripts/install-unix.sh --foreground` to run interactively in your terminal, or `stop` / `status`.

> **Platform Testing Note:** Windows (`install-win.ps1`, CDP hot-reload, uninstall) has been verified live against Antigravity on Windows 11. macOS (`launchd`) and Linux (`systemd --user`) scripts are implemented and shell-syntax verified, and welcome community runtime feedback across macOS/Linux setups (you can override `DevToolsActivePort` location anytime via `AGY_PORT_FILE=/path/to/DevToolsActivePort`).

### 3. Verify Live via CDP

```bash
node scripts/verify_cdp.js
```

### 4. Uninstall Cleanly

```bash
node scripts/uninstall.js
```

Removes auto-start shortcuts/services, stops the background daemon, and immediately restores Antigravity's default styling on open windows.

## Use as an Antigravity Skill (`SKILL.md`)

Copy or clone this repository into either:

- **Global skill directory:** `~/.gemini/config/skills/antigravity-custom-theme/`
- **Workspace skill directory:** `.agents/skills/antigravity-custom-theme/`

Once installed, simply prompt your Antigravity agent with an image and aesthetic preference (e.g., *"Use `antigravity-custom-theme` to build me a dark emerald studio Ghibli theme from this image"*). The agent reads `SKILL.md` + `references/theme-schema.md`, creates your preset in `themes/`, builds `dist/theme_payload.js`, and verifies it via `verify_cdp.js`.

## Repository Structure

```text
antigravity-custom-theme-skill/
├── SKILL.md                    # Agent skill definition & workflow
├── README.md
├── LICENSE                     # MIT
├── references/
│   └── theme-schema.md         # themes.json schema & DOM notes
├── themes/
│   ├── themes.json             # Sample theme presets
│   └── assets/                 # Wallpapers & SVG stickers/corners
├── engine/
│   └── core.js                 # Core injection engine (Zero Live Blur + UI)
├── daemon/
│   └── theme_daemon.js         # Cross-platform CDP injector & config persistence
├── scripts/
│   ├── build_payload.py        # Compiles themes.json + core.js -> dist/theme_payload.js
│   ├── install-win.ps1         # Windows Startup launcher setup
│   ├── install-unix.sh         # macOS LaunchAgent / Linux systemd user setup
│   ├── uninstall.js            # Clean cross-platform removal
│   └── verify_cdp.js           # Live CDP diagnostic & assertion check
└── dist/                       # Gitignored compiled runtime output
```

## License

MIT
