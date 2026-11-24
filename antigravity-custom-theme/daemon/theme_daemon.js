#!/usr/bin/env node
'use strict';

/**
 * Antigravity Custom Theme Daemon Pro (Windows / macOS / Linux)
 * - Connects to Antigravity CDP (DevToolsActivePort), injects dist/theme_payload.js
 * - Persists theme & video preferences in theme_config.json across UI port restarts
 * - Hosts a localhost-only (127.0.0.1) HTTP 206 Range streaming media server for
 *   local MP4 / WebM / MOV / MKV video backgrounds & saved video library
 * - Hot-reloads attached pages automatically when dist/theme_payload.js changes
 */

const fs = require('fs');
const http = require('http');
const os = require('os');
const path = require('path');
const { URL } = require('url');

if (typeof globalThis.WebSocket !== 'function') {
    console.error('[theme-daemon] Node.js >= 22 with built-in WebSocket is required.');
    process.exit(1);
}

const ROOT_DIR = path.resolve(__dirname, '..');
const PID_FILE = path.join(ROOT_DIR, 'daemon.pid');
const CONFIG_FILE = process.env.AGY_CONFIG_PATH || path.join(ROOT_DIR, 'theme_config.json');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const MEDIA_DIR = path.join(ROOT_DIR, 'media');
const PAYLOAD_PATH = path.join(DIST_DIR, 'theme_payload.js');
const LOG_FILE = path.join(ROOT_DIR, 'daemon.log');
const DEFAULT_CONFIG = {};

const VIDEO_EXTS = new Set(['.mp4', '.webm', '.mov', '.mkv', '.m4v', '.ogv', '.ogg']);
const IMAGE_EXTS = new Set(['.webp', '.png', '.jpg', '.jpeg', '.gif']);
const ALLOWED_MEDIA_EXTS = new Set([...VIDEO_EXTS, ...IMAGE_EXTS]);
const MIME_MAP = {
    '.mp4': 'video/mp4',
    '.m4v': 'video/mp4',
    '.webm': 'video/webm',
    '.mov': 'video/quicktime',
    '.mkv': 'video/x-matroska',
    '.ogv': 'video/ogg',
    '.ogg': 'video/ogg',
    '.webp': 'image/webp',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
};

let mediaServer = null;
let mediaPort = 47921;

function resolvePortFile() {
    if (process.env.AGY_PORT_FILE) {
        return process.env.AGY_PORT_FILE;
    }

    const home = os.homedir();
    let candidates;
    if (process.platform === 'win32') {
        const appData = process.env.APPDATA || path.join(home, 'AppData', 'Roaming');
        candidates = [
            path.join(appData, 'antigravity', 'DevToolsActivePort'),
            path.join(appData, 'Antigravity', 'DevToolsActivePort'),
        ];
    } else if (process.platform === 'darwin') {
        const appSupport = path.join(home, 'Library', 'Application Support');
        candidates = [
            path.join(appSupport, 'antigravity', 'DevToolsActivePort'),
            path.join(appSupport, 'Antigravity', 'DevToolsActivePort'),
        ];
    } else {
        const xdgConfig = process.env.XDG_CONFIG_HOME || path.join(home, '.config');
        candidates = [
            path.join(xdgConfig, 'antigravity', 'DevToolsActivePort'),
            path.join(xdgConfig, 'Antigravity', 'DevToolsActivePort'),
        ];
    }

    return candidates.find((p) => fs.existsSync(p)) || candidates[0];
}

function log(msg) {
    const line = `[${new Date().toISOString()}] ${msg}\n`;
    try {
        if (fs.existsSync(LOG_FILE) && fs.statSync(LOG_FILE).size > 512 * 1024) {
            fs.writeFileSync(LOG_FILE, '');
        }
        fs.appendFileSync(LOG_FILE, line);
    } catch (_) {}
    if (process.stdout.isTTY || process.env.AGY_DAEMON_STDOUT === '1') {
        process.stdout.write(line);
    }
}

function isPidAlive(pid) {
    try {
        process.kill(pid, 0);
        return true;
    } catch (_) {
        return false;
    }
}

function acquirePidLock() {
    if (fs.existsSync(PID_FILE)) {
        const existingPid = parseInt(fs.readFileSync(PID_FILE, 'utf8').trim(), 10);
        if (existingPid && existingPid !== process.pid && isPidAlive(existingPid)) {
            log(`Another daemon instance is already running (PID ${existingPid}). Exiting.`);
            process.exit(0);
        }
    }
    fs.writeFileSync(PID_FILE, String(process.pid), 'utf8');
}

function removePidLock() {
    try {
        if (fs.existsSync(PID_FILE)) {
            const pid = parseInt(fs.readFileSync(PID_FILE, 'utf8').trim(), 10);
            if (pid === process.pid) {
                fs.unlinkSync(PID_FILE);
            }
        }
    } catch (_) {}
}

function ensureMediaDir() {
    if (!fs.existsSync(MEDIA_DIR)) {
        fs.mkdirSync(MEDIA_DIR, { recursive: true });
    }
}

function sanitizeFilename(rawName) {
    const base = path.basename(String(rawName || 'video.mp4')).trim();
    const ext = path.extname(base).toLowerCase();
    const validExt = ALLOWED_MEDIA_EXTS.has(ext) ? ext : '.mp4';
    const stem = path
        .basename(base, ext)
        .replace(/[^a-zA-Z0-9._\-\u00C0-\u1EF9 ]+/g, '_')
        .replace(/\s+/g, '_')
        .slice(0, 72) || 'wallpaper';
    return `${stem}${validExt}`;
}

function setCorsHeaders(res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Filename, Range');
    res.setHeader('Access-Control-Expose-Headers', 'Content-Length, Content-Range, Accept-Ranges');
    res.setHeader('Access-Control-Allow-Private-Network', 'true');
}

function sendJson(res, status, payload) {
    setCorsHeaders(res);
    res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(payload));
}

function streamMediaFile(req, res, filePath) {
    setCorsHeaders(res);
    const ext = path.extname(filePath).toLowerCase();
    if (!ALLOWED_MEDIA_EXTS.has(ext)) {
        sendJson(res, 403, { ok: false, error: 'Unsupported media extension' });
        return;
    }
    if (!fs.existsSync(filePath)) {
        sendJson(res, 404, { ok: false, error: 'Media file not found' });
        return;
    }
    let stat;
    try {
        stat = fs.statSync(filePath);
        if (!stat.isFile()) {
            sendJson(res, 404, { ok: false, error: 'Not a file' });
            return;
        }
    } catch (err) {
        sendJson(res, 500, { ok: false, error: err.message });
        return;
    }

    const total = stat.size;
    const contentType = MIME_MAP[ext] || 'application/octet-stream';
    const rangeHeader = req.headers.range;

    if (rangeHeader) {
        const match = /bytes=(\d*)-(\d*)/.exec(rangeHeader);
        if (match) {
            const start = match[1] ? parseInt(match[1], 10) : 0;
            const end = match[2] ? Math.min(parseInt(match[2], 10), total - 1) : total - 1;
            if (start >= total || start > end || start < 0) {
                res.writeHead(416, { 'Content-Range': `bytes */${total}` });
                res.end();
                return;
            }
            const chunkSize = end - start + 1;
            res.writeHead(206, {
                'Content-Range': `bytes ${start}-${end}/${total}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunkSize,
                'Content-Type': contentType,
                'Cache-Control': 'no-cache',
            });
            const stream = fs.createReadStream(filePath, { start, end });
            stream.on('error', () => {
                try { res.end(); } catch (_) {}
            });
            stream.pipe(res);
            return;
        }
    }

    res.writeHead(200, {
        'Content-Length': total,
        'Content-Type': contentType,
        'Accept-Ranges': 'bytes',
        'Cache-Control': 'no-cache',
    });
    const stream = fs.createReadStream(filePath);
    stream.on('error', () => {
        try { res.end(); } catch (_) {}
    });
    stream.pipe(res);
}

function listLibraryVideos() {
    ensureMediaDir();
    const baseUrl = `http://127.0.0.1:${mediaPort}`;
    const entries = [];
    try {
        for (const name of fs.readdirSync(MEDIA_DIR)) {
            const ext = path.extname(name).toLowerCase();
            if (!VIDEO_EXTS.has(ext)) continue;
            const full = path.join(MEDIA_DIR, name);
            try {
                const st = fs.statSync(full);
                if (!st.isFile() || st.size === 0) continue;
                entries.push({
                    name,
                    size: st.size,
                    mtimeMs: st.mtimeMs,
                    url: `${baseUrl}/stream/${encodeURIComponent(name)}`,
                });
            } catch (_) {}
        }
    } catch (_) {}
    entries.sort((a, b) => b.mtimeMs - a.mtimeMs);
    return entries;
}

function startMediaServer(candidatePort = 47921) {
    ensureMediaDir();
    const server = http.createServer((req, res) => {
        setCorsHeaders(res);
        if (req.method === 'OPTIONS') {
            res.writeHead(204);
            res.end();
            return;
        }

        let parsed;
        try {
            parsed = new URL(req.url || '/', `http://127.0.0.1:${mediaPort}`);
        } catch (_) {
            sendJson(res, 400, { ok: false, error: 'Bad URL' });
            return;
        }

        const pathname = parsed.pathname;

        if (req.method === 'GET' && pathname === '/health') {
            sendJson(res, 200, {
                ok: true,
                port: mediaPort,
                mediaDir: MEDIA_DIR,
                videoCount: listLibraryVideos().length,
            });
            return;
        }

        if (req.method === 'GET' && pathname === '/videos') {
            sendJson(res, 200, { ok: true, videos: listLibraryVideos() });
            return;
        }

        if (req.method === 'GET' && pathname.startsWith('/stream/')) {
            const rawName = decodeURIComponent(pathname.slice('/stream/'.length));
            const safeBase = path.basename(rawName);
            const targetPath = path.join(MEDIA_DIR, safeBase);
            streamMediaFile(req, res, targetPath);
            return;
        }

        if (req.method === 'GET' && pathname === '/stream-path') {
            const rawPath = parsed.searchParams.get('p') || '';
            if (!rawPath) {
                sendJson(res, 400, { ok: false, error: 'Missing path parameter' });
                return;
            }
            const resolved = path.resolve(rawPath.replace(/^["']|["']$/g, '').trim());
            streamMediaFile(req, res, resolved);
            return;
        }

        if (req.method === 'POST' && pathname === '/upload') {
            ensureMediaDir();
            const rawName = parsed.searchParams.get('name') || req.headers['x-filename'] || `video_${Date.now()}.mp4`;
            let safeName = sanitizeFilename(rawName);
            const ext = path.extname(safeName);
            const stem = path.basename(safeName, ext);
            let outPath = path.join(MEDIA_DIR, safeName);
            if (fs.existsSync(outPath)) {
                safeName = `${stem}_${Date.now().toString(36)}${ext}`;
                outPath = path.join(MEDIA_DIR, safeName);
            }

            const MAX_BYTES = 500 * 1024 * 1024; // 500 MB
            let written = 0;
            let aborted = false;
            const ws = fs.createWriteStream(outPath);

            req.on('data', (chunk) => {
                if (aborted) return;
                written += chunk.length;
                if (written > MAX_BYTES) {
                    aborted = true;
                    ws.destroy();
                    try { fs.unlinkSync(outPath); } catch (_) {}
                    sendJson(res, 413, { ok: false, error: 'File vuot qua gioi han 500MB' });
                    req.destroy();
                    return;
                }
                if (!ws.write(chunk)) {
                    req.pause();
                    ws.once('drain', () => req.resume());
                }
            });

            req.on('end', () => {
                if (aborted) return;
                ws.end(() => {
                    const url = `http://127.0.0.1:${mediaPort}/stream/${encodeURIComponent(safeName)}`;
                    log(`Saved uploaded media: ${safeName} (${(written / 1024 / 1024).toFixed(2)} MB)`);
                    sendJson(res, 200, { ok: true, name: safeName, size: written, url });
                });
            });

            req.on('error', (err) => {
                aborted = true;
                ws.destroy();
                try { fs.unlinkSync(outPath); } catch (_) {}
                sendJson(res, 500, { ok: false, error: err.message });
            });
            return;
        }

        if (req.method === 'POST' && pathname === '/import-path') {
            let body = '';
            req.on('data', (chunk) => {
                if (body.length < 32768) body += chunk;
            });
            req.on('end', () => {
                try {
                    const parsedBody = JSON.parse(body || '{}');
                    const cleaned = String(parsedBody.filePath || '').replace(/^["']|["']$/g, '').trim();
                    if (!cleaned) {
                        sendJson(res, 400, { ok: false, error: 'Duong dan file trong' });
                        return;
                    }
                    const absPath = path.resolve(cleaned);
                    const ext = path.extname(absPath).toLowerCase();
                    if (!VIDEO_EXTS.has(ext)) {
                        sendJson(res, 400, { ok: false, error: `Dinh dang khong ho tro (${ext || 'khong co duoi'}). Ho tro: MP4, WEBM, MOV, MKV, OGG.` });
                        return;
                    }
                    if (!fs.existsSync(absPath) || !fs.statSync(absPath).isFile()) {
                        sendJson(res, 404, { ok: false, error: `Khong tim thay file: ${absPath}` });
                        return;
                    }
                    const stat = fs.statSync(absPath);
                    if (parsedBody.copy) {
                        ensureMediaDir();
                        const safeName = sanitizeFilename(path.basename(absPath));
                        const dest = path.join(MEDIA_DIR, safeName);
                        fs.copyFileSync(absPath, dest);
                        const url = `http://127.0.0.1:${mediaPort}/stream/${encodeURIComponent(safeName)}`;
                        sendJson(res, 200, { ok: true, name: safeName, size: stat.size, url });
                        return;
                    }
                    const url = `http://127.0.0.1:${mediaPort}/stream-path?p=${encodeURIComponent(absPath)}`;
                    sendJson(res, 200, { ok: true, name: path.basename(absPath), size: stat.size, url, filePath: absPath });
                } catch (err) {
                    sendJson(res, 400, { ok: false, error: err.message });
                }
            });
            return;
        }

        if (req.method === 'DELETE' && pathname.startsWith('/videos/')) {
            const rawName = decodeURIComponent(pathname.slice('/videos/'.length));
            const safeBase = path.basename(rawName);
            const targetPath = path.join(MEDIA_DIR, safeBase);
            try {
                if (fs.existsSync(targetPath)) {
                    fs.unlinkSync(targetPath);
                    log(`Deleted media file: ${safeBase}`);
                }
                sendJson(res, 200, { ok: true, videos: listLibraryVideos() });
            } catch (err) {
                sendJson(res, 500, { ok: false, error: err.message });
            }
            return;
        }

        sendJson(res, 404, { ok: false, error: 'Not found' });
    });

    server.on('error', (err) => {
        if (err && err.code === 'EADDRINUSE' && candidatePort < 47935) {
            log(`Media port ${candidatePort} in use, trying ${candidatePort + 1}...`);
            startMediaServer(candidatePort + 1);
            return;
        }
        log(`Media server error: ${err.message}`);
    });

    server.listen(candidatePort, '127.0.0.1', () => {
        mediaServer = server;
        const portChanged = mediaPort !== candidatePort;
        mediaPort = candidatePort;
        log(`Local media streaming server listening at http://127.0.0.1:${mediaPort} (dir=${MEDIA_DIR})`);
        if (portChanged) {
            for (const s of sessions.values()) {
                s.reinject();
            }
        }
    });
}

function readConfig() {
    try {
        if (fs.existsSync(CONFIG_FILE)) {
            const parsed = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
            if (parsed && typeof parsed === 'object') {
                return { ...DEFAULT_CONFIG, ...parsed };
            }
        }
    } catch (err) {
        log(`Failed reading theme_config.json: ${err.message}`);
    }
    return { ...DEFAULT_CONFIG };
}

function saveConfig(next) {
    try {
        const merged = { ...readConfig(), ...next };
        fs.writeFileSync(CONFIG_FILE, JSON.stringify(merged, null, 2), 'utf8');
        return merged;
    } catch (err) {
        log(`Failed saving theme_config.json: ${err.message}`);
        return null;
    }
}

let missingPayloadLogged = false;
function buildInjectedSource() {
    if (!fs.existsSync(PAYLOAD_PATH)) {
        if (!missingPayloadLogged) {
            log(`Payload not built yet (${PAYLOAD_PATH}). Run: python scripts/build_payload.py`);
            missingPayloadLogged = true;
        }
        return null;
    }
    missingPayloadLogged = false;

    const cfg = readConfig();
    if (typeof cfg.videoUrl === 'string' && /^http:\/\/127\.0\.0\.1:\d+\/stream\//.test(cfg.videoUrl)) {
        cfg.videoUrl = cfg.videoUrl.replace(/^http:\/\/127\.0\.0\.1:\d+(?=\/stream\/)/, `http://127.0.0.1:${mediaPort}`);
    }
    const cfgJson = JSON.stringify(cfg);
    const mediaBase = JSON.stringify(`http://127.0.0.1:${mediaPort}`);
    const payloadCode = fs.readFileSync(PAYLOAD_PATH, 'utf8');
    return `window.__AGY_INITIAL_CONFIG__ = ${cfgJson};\nwindow.__AGY_MEDIA_BASE__ = ${mediaBase};\n${payloadCode}`;
}

function getPortInfo() {
    const portFile = resolvePortFile();
    if (!fs.existsSync(portFile)) return null;
    const lines = fs
        .readFileSync(portFile, 'utf8')
        .trim()
        .split(/\r?\n/)
        .map((s) => s.trim())
        .filter(Boolean);
    const port = parseInt(lines[0], 10);
    if (!Number.isFinite(port) || port <= 0) return null;
    return { port, token: lines[1] || '' };
}

function fetchJson(url) {
    return new Promise((resolve, reject) => {
        const req = http.get(url, { timeout: 2000 }, (res) => {
            let body = '';
            res.on('data', (chunk) => {
                body += chunk;
            });
            res.on('end', () => {
                try {
                    resolve(JSON.parse(body));
                } catch (err) {
                    reject(err);
                }
            });
        });
        req.on('timeout', () => req.destroy(new Error('HTTP timeout')));
        req.on('error', reject);
    });
}

const sessions = new Map();
let lastPort = null;
let reloadTimer = null;

function createSession(target) {
    const ws = new globalThis.WebSocket(target.webSocketDebuggerUrl);
    let nextId = 1;
    const pending = new Map();
    const session = { id: target.id, ws, target };
    sessions.set(target.id, session);

    function send(method, params = {}) {
        return new Promise((resolve, reject) => {
            if (ws.readyState !== 1) {
                reject(new Error('WebSocket is not open'));
                return;
            }
            const id = nextId++;
            pending.set(id, { resolve, reject });
            ws.send(JSON.stringify({ id, method, params }));
        });
    }

    session.reinject = async () => {
        const src = buildInjectedSource();
        if (!src) return;
        try {
            await send('Runtime.evaluate', { expression: src, awaitPromise: false });
        } catch (_) {}
    };

    ws.addEventListener('message', async (event) => {
        let msg;
        try {
            msg = JSON.parse(String(event.data));
        } catch (_) {
            return;
        }

        if (msg.id && pending.has(msg.id)) {
            const p = pending.get(msg.id);
            pending.delete(msg.id);
            if (msg.error) p.reject(new Error(msg.error.message || 'CDP error'));
            else p.resolve(msg.result);
            return;
        }

        if (msg.method === 'Runtime.bindingCalled' && msg.params && msg.params.name === 'agySaveThemeConfig') {
            try {
                const payload = JSON.parse(msg.params.payload || '{}');
                saveConfig(payload);
                for (const other of sessions.values()) {
                    if (other.id !== target.id) {
                        other.reinject();
                    }
                }
            } catch (err) {
                log(`Config binding error: ${err.message}`);
            }
            return;
        }

        if (msg.method === 'Page.frameNavigated' && msg.params && msg.params.frame && !msg.params.frame.parentId) {
            await session.reinject();
        }
    });

    ws.addEventListener('open', async () => {
        try {
            await send('Page.enable');
            await send('Runtime.enable');
            try {
                await send('Runtime.addBinding', { name: 'agySaveThemeConfig' });
            } catch (_) {}

            const src = buildInjectedSource();
            if (src) {
                await send('Page.addScriptToEvaluateOnNewDocument', { source: src });
                await send('Runtime.evaluate', { expression: src, awaitPromise: false });
            }
            log(`Attached target ${target.id} (${target.url})`);
        } catch (err) {
            log(`Attach error for ${target.id}: ${err.message}`);
        }
    });

    const cleanup = () => {
        for (const p of pending.values()) {
            p.reject(new Error('WebSocket closed'));
        }
        pending.clear();
        sessions.delete(target.id);
    };
    ws.addEventListener('close', cleanup);
    ws.addEventListener('error', cleanup);
}

async function scanPages() {
    const info = getPortInfo();
    if (!info) return;

    if (lastPort !== null && lastPort !== info.port) {
        for (const s of sessions.values()) {
            try {
                s.ws.close();
            } catch (_) {}
        }
        sessions.clear();
    }
    lastPort = info.port;

    let targets;
    try {
        targets = await fetchJson(`http://127.0.0.1:${info.port}/json`);
    } catch (_) {
        return;
    }
    if (!Array.isArray(targets)) return;

    const pages = targets.filter((t) => {
        if (!t || t.type !== 'page' || !t.webSocketDebuggerUrl) return false;
        const url = String(t.url || '');
        if (url.startsWith('devtools://') || url.startsWith('chrome-extension://')) return false;
        return url.includes('127.0.0.1') || url.includes('workbench') || url.includes('launchpad');
    });

    const liveIds = new Set(pages.map((p) => p.id));
    for (const [id, session] of sessions.entries()) {
        if (!liveIds.has(id)) {
            try {
                session.ws.close();
            } catch (_) {}
            sessions.delete(id);
        }
    }

    for (const page of pages) {
        if (!sessions.has(page.id)) {
            createSession(page);
        }
    }
}

function watchPayload() {
    try {
        if (!fs.existsSync(DIST_DIR)) {
            fs.mkdirSync(DIST_DIR, { recursive: true });
        }
        fs.watch(DIST_DIR, (_eventType, filename) => {
            if (filename && filename !== 'theme_payload.js') return;
            clearTimeout(reloadTimer);
            reloadTimer = setTimeout(() => {
                log('Detected dist/theme_payload.js update; hot-reloading attached pages.');
                for (const s of sessions.values()) {
                    s.reinject();
                }
            }, 250);
        });
    } catch (err) {
        log(`fs.watch skipped: ${err.message}`);
    }
}

function shutdown(signal) {
    log(`Shutting down on ${signal}.`);
    if (mediaServer) {
        try { mediaServer.close(); } catch (_) {}
    }
    for (const s of sessions.values()) {
        try {
            s.ws.close();
        } catch (_) {}
    }
    sessions.clear();
    removePidLock();
    process.exit(0);
}

acquirePidLock();
process.on('uncaughtException', (err) => {
    log(`Uncaught exception: ${err && err.stack ? err.stack : err}`);
});
process.on('unhandledRejection', (reason) => {
    log(`Unhandled rejection: ${reason && reason.stack ? reason.stack : reason}`);
});
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('exit', removePidLock);

log(`Theme daemon Pro started (PID ${process.pid}, platform=${process.platform}, portFile=${resolvePortFile()}).`);
startMediaServer(47921);
watchPayload();
scanPages();
setInterval(scanPages, 1500);
