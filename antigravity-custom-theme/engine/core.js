(() => {
  const THEMES = /*__THEMES_PLACEHOLDER__*/{};
  const THEME_KEYS = Object.keys(THEMES);
  const DEFAULT_THEME_KEY = THEME_KEYS[0] || 'Midnight Aqua';

  const STORAGE_THEME = 'agy_theme_v3';
  const STORAGE_BUBBLE = 'agy_bubble_v3';
  const STORAGE_INPUT = 'agy_input_v3';
  const STORAGE_DIMMING = 'agy_dimming_v3';
  const STORAGE_WP_ENABLED = 'agy_wp_enabled_v3';
  const STORAGE_CUSTOM_WP = 'agy_custom_wp_v3';
  const STORAGE_USER_AVATAR = 'agy_user_avatar_v3';
  const STORAGE_AGENT_AVATAR = 'agy_agent_avatar_v3';
  const STORAGE_GLASS_BLUR = 'agy_glass_blur_v3';
  const STORAGE_AVATAR_SIZE = 'agy_avatar_size_v3';
  const STORAGE_AVATAR_RADIUS = 'agy_avatar_radius_v3';

  // v4 Pro Video & Luxury UI keys
  const STORAGE_BG_MODE = 'agy_bg_mode_v4';
  const STORAGE_VIDEO_URL = 'agy_video_url_v4';
  const STORAGE_VIDEO_NAME = 'agy_video_name_v4';
  const STORAGE_VIDEO_MUTED = 'agy_video_muted_v4';
  const STORAGE_VIDEO_VOL = 'agy_video_vol_v4';
  const STORAGE_VIDEO_SPEED = 'agy_video_speed_v4';
  const STORAGE_VIDEO_FIT = 'agy_video_fit_v4';
  const STORAGE_VIDEO_BLUR = 'agy_video_blur_v4';
  const STORAGE_VIDEO_BRIGHT = 'agy_video_bright_v4';
  const STORAGE_VIDEO_SAT = 'agy_video_sat_v4';
  const STORAGE_VIDEO_PAUSED = 'agy_video_paused_v4';
  const STORAGE_VIDEO_AUTOPAUSE = 'agy_video_autopause_v4';
  const STORAGE_FX_PRESET = 'agy_fx_preset_v4';
  const STORAGE_FX_INTENSITY = 'agy_fx_intensity_v4';
  const STORAGE_CARD_OPACITY = 'agy_card_opacity_v4';
  const STORAGE_GLOW_LEVEL = 'agy_glow_level_v4';
  const STORAGE_ORNAMENTS = 'agy_ornaments_v4';
  const STORAGE_CUSTOM_COLORS = 'agy_custom_colors_v4';

  const MEDIA_BASE = () => window.__AGY_MEDIA_BASE__ || 'http://127.0.0.1:47921';

  const SVG_ICONS = {
    sparkle: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>`,
    video: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="14" x="2" y="5" rx="2"/><path d="m22 7-6 4 6 4V7Z"/></svg>`,
    image: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>`,
    play: `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 4 20 12 6 20 6 4"/></svg>`,
    pause: `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>`,
    volume: `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`,
    mute: `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="22" y1="9" x2="16" y2="15"/><line x1="16" y1="9" x2="22" y2="15"/></svg>`,
    upload: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>`,
    trash: `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>`,
    close: `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    check: `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    sliders: `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>`,
  };

  const INPUT_STYLES = {
    sync: {
      label: 'Khung Đồng Bộ Hoa Văn',
      desc: 'Theo sát dải viền gradient và hoa văn tinh xảo của giao diện đang chọn',
    },
    double_gold: {
      label: 'Viền Kép Vàng Ánh Kim',
      desc: 'Khung kim loại ấm áp với dải phản quang vàng sang trọng',
    },
    glass: {
      label: 'Kính Pha Lê Trong Suốt',
      desc: 'Xuyên thấu tối đa giúp thưởng thức trọn vẹn nền ảnh hoặc nền video',
    },
    minimal: {
      label: 'Tối Giản Thanh Lịch',
      desc: 'Đường viền mảnh tinh gọn, không kèm hoa văn trang trí bên trên',
    },
  };

  const FX_PRESETS = [
    { id: 'none', name: 'Tắt hiệu ứng', desc: 'Chỉ hiển thị ảnh tĩnh hoặc video gốc', dot: '#64748B' },
    { id: 'fireflies', name: 'Đom Đóm Tinh Tú', desc: 'Hạt ánh sáng bokeh & sao băng bay nhẹ trên nền', dot: '#FBBF24' },
    { id: 'aurora', name: 'Cực Quang Vũ Trụ', desc: 'Dải cực quang chuyển động mượt kèm tinh vân', dot: '#73DACA' },
    { id: 'neon_rain', name: 'Mưa Neon Đêm', desc: 'Làn mưa ánh sáng nghiêng phong cách Cyberpunk', dot: '#38BDF8' },
    { id: 'sakura', name: 'Hoa Anh Đào Rơi', desc: 'Cánh hoa anh đào phát sáng bay theo làn gió', dot: '#F472B6' },
    { id: 'aqua_wave', name: 'Sóng Lụa Ngọc', desc: 'Các dải sóng phát quang mềm mại chuyển động liên tục', dot: '#34D399' },
  ];

  const GLOW_LEVELS = {
    off: { label: 'Tắt', mult: 0 },
    soft: { label: 'Nhẹ', mult: 0.55 },
    normal: { label: 'Chuẩn', mult: 1.0 },
    vivid: { label: 'Rực rỡ', mult: 1.55 },
  };

  const QUICK_PALETTES = [
    { id: 'midnight-aqua', name: 'Midnight Aqua', dot: '#73DACA', theme: 'Midnight Aqua' },
    { id: 'cyberpunk-aurora', name: 'Cyberpunk Aurora', dot: '#00F5D4', theme: 'Cyberpunk Aurora' },
    { id: 'tokyo-night', name: 'Tokyo Night', dot: '#7AA2F7', theme: 'Tokyo Night' },
    { id: 'sakura-dusk', name: 'Sakura Dusk', dot: '#F472B6', theme: 'Sakura Dusk' },
    { id: 'crimson-eclipse', name: 'Crimson Eclipse', dot: '#FF4D6D', theme: 'Crimson Eclipse' },
    { id: 'emerald-celestial', name: 'Emerald Celestial', dot: '#34D399', theme: 'Emerald Celestial' },
    { id: 'royal-amethyst', name: 'Royal Amethyst', dot: '#C084FC', theme: 'Royal Amethyst' },
    { id: 'kanagawa-wave', name: 'Kanagawa Wave', dot: '#E5C283', theme: 'Kanagawa Wave' },
    { id: 'kanagawa-dragon', name: 'Kanagawa Dragon', dot: '#C8C093', theme: 'Kanagawa Dragon' },
    { id: 'nordic-frost', name: 'Nordic Frost', dot: '#88C0D0', theme: 'Nordic Frost' },
  ];

  function hexToRgb(hex, fallback = '115, 218, 202') {
    const clean = String(hex || '').trim().replace('#', '');
    if (clean.length === 3) {
      const r = parseInt(clean[0] + clean[0], 16);
      const g = parseInt(clean[1] + clean[1], 16);
      const b = parseInt(clean[2] + clean[2], 16);
      if (Number.isFinite(r) && Number.isFinite(g) && Number.isFinite(b)) return `${r}, ${g}, ${b}`;
    } else if (clean.length === 6) {
      const r = parseInt(clean.slice(0, 2), 16);
      const g = parseInt(clean.slice(2, 4), 16);
      const b = parseInt(clean.slice(4, 6), 16);
      if (Number.isFinite(r) && Number.isFinite(g) && Number.isFinite(b)) return `${r}, ${g}, ${b}`;
    }
    return fallback;
  }

  function rgbToHex(rgbStr, fallback = '#0D1520') {
    const parts = String(rgbStr || '').match(/\d+/g);
    if (!parts || parts.length < 3) return fallback;
    const toH = (n) => Math.max(0, Math.min(255, parseInt(n, 10) || 0)).toString(16).padStart(2, '0');
    return `#${toH(parts[0])}${toH(parts[1])}${toH(parts[2])}`.toUpperCase();
  }

  function safeJsonParse(raw, fallback) {
    if (!raw) return fallback;
    if (typeof raw === 'object') return raw;
    try {
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === 'object' ? parsed : fallback;
    } catch (_) {
      return fallback;
    }
  }

  function formatBytes(bytes) {
    const n = Number(bytes) || 0;
    if (n < 1024) return `${n} B`;
    if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
    return `${(n / (1024 * 1024)).toFixed(1)} MB`;
  }

  function getLs(key) {
    try { return localStorage.getItem(key); } catch (_) { return null; }
  }

  function getState() {
    const init = window.__AGY_INITIAL_CONFIG__ || {};
    const rawTheme = getLs(STORAGE_THEME) || init.themeName || DEFAULT_THEME_KEY;
    const themeName = THEMES[rawTheme] ? rawTheme : DEFAULT_THEME_KEY;
    const rawBubble = getLs(STORAGE_BUBBLE) || init.bubbleName || themeName;
    const bubbleName = THEMES[rawBubble] ? rawBubble : themeName;
    const inputStyle = getLs(STORAGE_INPUT) || init.inputStyle || 'glass';

    const rawDim = getLs(STORAGE_DIMMING);
    const dimming = parseInt(rawDim !== null ? rawDim : (init.dimming !== undefined ? init.dimming : 28), 10);

    const rawWpEn = getLs(STORAGE_WP_ENABLED);
    const wpEnabled = rawWpEn !== null ? rawWpEn !== 'false' : (init.wpEnabled !== undefined ? Boolean(init.wpEnabled) : true);

    const customWp = getLs(STORAGE_CUSTOM_WP) ?? init.customWp ?? '';
    const userAvatar = getLs(STORAGE_USER_AVATAR) ?? init.userAvatar ?? '';
    const agentAvatar = getLs(STORAGE_AGENT_AVATAR) ?? init.agentAvatar ?? '';

    const rawBlur = getLs(STORAGE_GLASS_BLUR) ?? init.glassBlur;
    const glassBlur = rawBlur !== undefined && rawBlur !== null && rawBlur !== '' ? parseInt(rawBlur, 10) : 4;

    const rawAvSize = getLs(STORAGE_AVATAR_SIZE) ?? init.avatarSize;
    const avatarSize = rawAvSize !== undefined && rawAvSize !== null && rawAvSize !== '' ? parseInt(rawAvSize, 10) : 34;

    const rawAvRad = getLs(STORAGE_AVATAR_RADIUS) ?? init.avatarRadius;
    const avatarRadius = rawAvRad !== undefined && rawAvRad !== null && rawAvRad !== '' ? parseInt(rawAvRad, 10) : 50;

    // v4 Video & Luxury UI state
    const bgMode = getLs(STORAGE_BG_MODE) || init.bgMode || 'image';
    const videoUrl = getLs(STORAGE_VIDEO_URL) ?? init.videoUrl ?? '';
    const videoName = getLs(STORAGE_VIDEO_NAME) ?? init.videoName ?? '';
    const rawMuted = getLs(STORAGE_VIDEO_MUTED);
    const videoMuted = rawMuted !== null ? rawMuted !== 'false' : (init.videoMuted !== undefined ? Boolean(init.videoMuted) : true);
    const rawVol = getLs(STORAGE_VIDEO_VOL) ?? init.videoVolume;
    const videoVolume = rawVol !== undefined && rawVol !== null && rawVol !== '' ? parseInt(rawVol, 10) : 0;
    const rawSpeed = getLs(STORAGE_VIDEO_SPEED) ?? init.videoSpeed;
    const videoSpeed = rawSpeed !== undefined && rawSpeed !== null && rawSpeed !== '' ? parseFloat(rawSpeed) : 1.0;
    const videoFit = getLs(STORAGE_VIDEO_FIT) || init.videoFit || 'cover';
    const rawVBlur = getLs(STORAGE_VIDEO_BLUR) ?? init.videoBlur;
    const videoBlur = rawVBlur !== undefined && rawVBlur !== null && rawVBlur !== '' ? parseFloat(rawVBlur) : 0;
    const rawVBright = getLs(STORAGE_VIDEO_BRIGHT) ?? init.videoBrightness;
    const videoBrightness = rawVBright !== undefined && rawVBright !== null && rawVBright !== '' ? parseInt(rawVBright, 10) : 100;
    const rawVSat = getLs(STORAGE_VIDEO_SAT) ?? init.videoSaturate;
    const videoSaturate = rawVSat !== undefined && rawVSat !== null && rawVSat !== '' ? parseInt(rawVSat, 10) : 112;
    const rawVPaused = getLs(STORAGE_VIDEO_PAUSED);
    const videoPaused = rawVPaused !== null ? rawVPaused === 'true' : Boolean(init.videoPaused);
    const rawAutoPause = getLs(STORAGE_VIDEO_AUTOPAUSE);
    const videoAutoPause = rawAutoPause !== null ? rawAutoPause !== 'false' : (init.videoAutoPause !== undefined ? Boolean(init.videoAutoPause) : true);

    const fxPreset = getLs(STORAGE_FX_PRESET) ?? init.fxPreset ?? 'fireflies';
    const rawFxInt = getLs(STORAGE_FX_INTENSITY) ?? init.fxIntensity;
    const fxIntensity = rawFxInt !== undefined && rawFxInt !== null && rawFxInt !== '' ? parseInt(rawFxInt, 10) : 65;

    const rawCardOp = getLs(STORAGE_CARD_OPACITY) ?? init.cardOpacity;
    const cardOpacity = rawCardOp !== undefined && rawCardOp !== null && rawCardOp !== '' ? parseInt(rawCardOp, 10) : 82;

    const glowLevel = getLs(STORAGE_GLOW_LEVEL) || init.glowLevel || 'normal';
    const rawOrn = getLs(STORAGE_ORNAMENTS);
    const showOrnaments = rawOrn !== null ? rawOrn !== 'false' : (init.showOrnaments !== undefined ? Boolean(init.showOrnaments) : true);

    const rawCustomColors = getLs(STORAGE_CUSTOM_COLORS);
    const customColors = safeJsonParse(rawCustomColors !== null ? rawCustomColors : init.customColors, {});

    return {
      themeName, bubbleName, inputStyle, dimming, wpEnabled, customWp,
      userAvatar, agentAvatar, glassBlur, avatarSize, avatarRadius,
      bgMode, videoUrl, videoName, videoMuted, videoVolume, videoSpeed,
      videoFit, videoBlur, videoBrightness, videoSaturate, videoPaused, videoAutoPause,
      fxPreset, fxIntensity, cardOpacity, glowLevel, showOrnaments, customColors,
    };
  }

  function saveStateToStorage(st) {
    try {
      localStorage.setItem(STORAGE_THEME, st.themeName);
      localStorage.setItem(STORAGE_BUBBLE, st.bubbleName);
      localStorage.setItem(STORAGE_INPUT, st.inputStyle);
      localStorage.setItem(STORAGE_DIMMING, String(st.dimming));
      localStorage.setItem(STORAGE_WP_ENABLED, String(st.wpEnabled));
      localStorage.setItem(STORAGE_CUSTOM_WP, st.customWp || '');
      localStorage.setItem(STORAGE_USER_AVATAR, st.userAvatar || '');
      localStorage.setItem(STORAGE_AGENT_AVATAR, st.agentAvatar || '');
      localStorage.setItem(STORAGE_GLASS_BLUR, String(st.glassBlur));
      localStorage.setItem(STORAGE_AVATAR_SIZE, String(st.avatarSize));
      localStorage.setItem(STORAGE_AVATAR_RADIUS, String(st.avatarRadius));

      localStorage.setItem(STORAGE_BG_MODE, st.bgMode);
      localStorage.setItem(STORAGE_VIDEO_URL, st.videoUrl || '');
      localStorage.setItem(STORAGE_VIDEO_NAME, st.videoName || '');
      localStorage.setItem(STORAGE_VIDEO_MUTED, String(st.videoMuted));
      localStorage.setItem(STORAGE_VIDEO_VOL, String(st.videoVolume));
      localStorage.setItem(STORAGE_VIDEO_SPEED, String(st.videoSpeed));
      localStorage.setItem(STORAGE_VIDEO_FIT, st.videoFit);
      localStorage.setItem(STORAGE_VIDEO_BLUR, String(st.videoBlur));
      localStorage.setItem(STORAGE_VIDEO_BRIGHT, String(st.videoBrightness));
      localStorage.setItem(STORAGE_VIDEO_SAT, String(st.videoSaturate));
      localStorage.setItem(STORAGE_VIDEO_PAUSED, String(st.videoPaused));
      localStorage.setItem(STORAGE_VIDEO_AUTOPAUSE, String(st.videoAutoPause));
      localStorage.setItem(STORAGE_FX_PRESET, st.fxPreset);
      localStorage.setItem(STORAGE_FX_INTENSITY, String(st.fxIntensity));
      localStorage.setItem(STORAGE_CARD_OPACITY, String(st.cardOpacity));
      localStorage.setItem(STORAGE_GLOW_LEVEL, st.glowLevel);
      localStorage.setItem(STORAGE_ORNAMENTS, String(st.showOrnaments));
      localStorage.setItem(STORAGE_CUSTOM_COLORS, JSON.stringify(st.customColors || {}));
    } catch (_) {}

    if (window.agySaveThemeConfig) {
      try {
        window.agySaveThemeConfig(JSON.stringify(st));
      } catch (_) {}
    }
  }

  function processAvatarUpload(file, callback) {
    // Preserve animated GIFs verbatim if under 3 MB
    if (file.type === 'image/gif' && file.size <= 3 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onload = () => callback(String(reader.result || ''));
      reader.readAsDataURL(file);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        try {
          const size = 192;
          const canvas = document.createElement('canvas');
          canvas.width = size;
          canvas.height = size;
          const ctx = canvas.getContext('2d');
          const natW = img.naturalWidth || size;
          const natH = img.naturalHeight || size;
          const side = Math.min(natW, natH);
          const sx = Math.max(0, Math.floor((natW - side) / 2));
          const sy = Math.max(0, Math.floor((natH - side) / 2));
          ctx.drawImage(img, sx, sy, side, side, 0, 0, size, size);
          const out = canvas.toDataURL('image/webp', 0.88);
          callback(out && out.startsWith('data:image/webp') ? out : canvas.toDataURL('image/png'));
        } catch (_) {
          callback(String(reader.result || ''));
        }
      };
      img.onerror = () => callback(String(reader.result || ''));
      img.src = String(reader.result || '');
    };
    reader.readAsDataURL(file);
  }

  // Pre-bake L-shaped header/sidebar glass blur once per static theme/dimming change (Zero Live Blur)
  function syncPrebakedGlass(wpUrl, overlayRgb, overlayAlpha, tintBg, blurStr) {
    const shell = document.querySelector('.agy-shell');
    if (!wpUrl) {
      if (shell) shell.style.removeProperty('--agy-l-glass-bg');
      return;
    }
    const key = `${wpUrl.slice(0, 64)}|${wpUrl.length}|${overlayRgb}|${overlayAlpha.toFixed(3)}|${tintBg}|${blurStr}`;
    window.__AGY_BLUR_CACHE__ = window.__AGY_BLUR_CACHE__ || {};
    const cached = window.__AGY_BLUR_CACHE__[key];
    if (cached) {
      if (shell) shell.style.setProperty('--agy-l-glass-bg', 'url("' + cached + '")');
      return;
    }
    const img = new Image();
    img.onload = () => {
      try {
        const w = 640;
        const h = Math.max(180, Math.round((img.naturalHeight || 1440) * (w / (img.naturalWidth || 2560))));
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const pxMatch = String(blurStr !== undefined ? blurStr : '4px').match(/(\d+(?:\.\d+)?)/);
        const scaledBlur = Math.max(0, Math.min(16, Math.round((pxMatch ? parseFloat(pxMatch[1]) : 4) * 0.75)));
        ctx.filter = scaledBlur > 0 ? `blur(${scaledBlur}px)` : 'none';
        ctx.drawImage(img, -12, -12, w + 24, h + 24);
        ctx.filter = 'none';
        ctx.fillStyle = `rgba(${overlayRgb}, ${Math.max(0.28, overlayAlpha)})`;
        ctx.fillRect(0, 0, w, h);
        if (tintBg) {
          ctx.fillStyle = tintBg;
          ctx.fillRect(0, 0, w, h);
        }
        const baked = canvas.toDataURL('image/webp', 0.85);
        window.__AGY_BLUR_CACHE__[key] = baked;
        const curShell = document.querySelector('.agy-shell');
        if (curShell) curShell.style.setProperty('--agy-l-glass-bg', 'url("' + baked + '")');
      } catch (_) {}
    };
    img.src = wpUrl;
  }

  // =========================================================================
  // GPU VIDEO BACKGROUND + 60 FPS AMBIENT MOTION CANVAS ENGINE
  // =========================================================================
  let motionRafId = 0;
  let motionState = {
    preset: 'none',
    standalone: false,
    intensity: 65,
    primaryRgb: '115, 218, 202',
    secondaryRgb: '122, 162, 247',
    overlayRgb: '9, 16, 25',
    particles: [],
    meteors: [],
    time: 0,
    lastTs: 0,
    w: 0,
    h: 0,
  };

  function ensureBackgroundStage() {
    const shell = document.querySelector('.agy-shell');
    if (!shell) return null;

    let stage = document.getElementById('agy-bg-stage');
    if (stage && stage.parentElement !== shell) {
      stage.remove();
      stage = null;
    }
    if (!stage) {
      stage = document.createElement('agy-bg-stage');
      stage.id = 'agy-bg-stage';
      stage.style.cssText = 'position:absolute;inset:0;z-index:0;pointer-events:none;overflow:hidden;contain:layout style paint;transform:translateZ(0);';

      const video = document.createElement('video');
      video.id = 'agy-bg-video';
      video.autoplay = true;
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.preload = 'auto';
      video.crossOrigin = 'anonymous';
      video.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:none;pointer-events:none;transform:translateZ(0);transition:opacity 0.35s ease;';

      const canvas = document.createElement('canvas');
      canvas.id = 'agy-bg-motion-canvas';
      canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:none;pointer-events:none;transform:translateZ(0);';

      const scrim = document.createElement('div');
      scrim.id = 'agy-bg-scrim';
      scrim.style.cssText = 'position:absolute;inset:0;pointer-events:none;transition:background 0.25s ease;';

      stage.appendChild(video);
      stage.appendChild(canvas);
      stage.appendChild(scrim);
      shell.insertBefore(stage, shell.firstChild);
    }
    return stage;
  }

  function stopMotionLoop() {
    if (motionRafId) {
      cancelAnimationFrame(motionRafId);
      motionRafId = 0;
    }
    if (window.__AGY_MOTION_RAF__) {
      cancelAnimationFrame(window.__AGY_MOTION_RAF__);
      window.__AGY_MOTION_RAF__ = 0;
    }
  }

  function seedParticles(preset, w, h, intensity) {
    const scale = Math.max(0.3, Math.min(1.4, (intensity || 65) / 65));
    const list = [];
    if (preset === 'fireflies') {
      const count = Math.round(52 * scale);
      for (let i = 0; i < count; i++) {
        list.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 1.1 + Math.random() * 2.8,
          vx: (Math.random() - 0.5) * 14,
          vy: -(8 + Math.random() * 22),
          phase: Math.random() * Math.PI * 2,
          speed: 0.7 + Math.random() * 1.4,
          hue: i % 3, // 0 primary, 1 gold, 2 secondary
        });
      }
    } else if (preset === 'aurora') {
      const count = Math.round(70 * scale);
      for (let i = 0; i < count; i++) {
        list.push({
          x: Math.random() * w,
          y: Math.random() * h * 0.85,
          r: 0.6 + Math.random() * 1.7,
          phase: Math.random() * Math.PI * 2,
          speed: 0.5 + Math.random() * 1.6,
        });
      }
    } else if (preset === 'neon_rain') {
      const count = Math.round(92 * scale);
      for (let i = 0; i < count; i++) {
        const depth = 0.4 + Math.random() * 0.9;
        list.push({
          x: Math.random() * (w + 300) - 100,
          y: Math.random() * h,
          len: (24 + Math.random() * 52) * depth,
          vy: (290 + Math.random() * 340) * depth,
          vx: -(45 + Math.random() * 35) * depth,
          alpha: (0.14 + Math.random() * 0.34) * depth,
          hue: i % 2,
        });
      }
    } else if (preset === 'sakura') {
      const count = Math.round(44 * scale);
      for (let i = 0; i < count; i++) {
        list.push({
          x: Math.random() * w,
          y: Math.random() * h,
          size: 4 + Math.random() * 7.5,
          vx: 18 + Math.random() * 28,
          vy: 24 + Math.random() * 32,
          rot: Math.random() * Math.PI * 2,
          vrot: (Math.random() - 0.5) * 2.1,
          sway: Math.random() * Math.PI * 2,
          tint: i % 3,
        });
      }
    } else if (preset === 'aqua_wave') {
      const count = Math.round(36 * scale);
      for (let i = 0; i < count; i++) {
        list.push({
          x: Math.random() * w,
          y: h * 0.45 + Math.random() * h * 0.55,
          r: 1 + Math.random() * 2.4,
          vx: 12 + Math.random() * 26,
          vy: -(6 + Math.random() * 16),
          phase: Math.random() * Math.PI * 2,
        });
      }
    }
    return list;
  }

  function renderMotionFrame(ts) {
    const canvas = document.getElementById('agy-bg-motion-canvas');
    if (!canvas || canvas.style.display === 'none') {
      stopMotionLoop();
      return;
    }
    if (document.hidden && getState().videoAutoPause) {
      motionState.lastTs = ts;
      motionRafId = requestAnimationFrame(renderMotionFrame);
      window.__AGY_MOTION_RAF__ = motionRafId;
      return;
    }

    const dt = motionState.lastTs ? Math.min(0.05, Math.max(0.001, (ts - motionState.lastTs) / 1000)) : 0.016;
    motionState.lastTs = ts;
    motionState.time += dt;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const cssW = canvas.clientWidth || window.innerWidth;
    const cssH = canvas.clientHeight || window.innerHeight;
    const targetW = Math.max(320, Math.round(cssW * dpr));
    const targetH = Math.max(200, Math.round(cssH * dpr));
    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
      motionState.w = cssW;
      motionState.h = cssH;
      motionState.particles = seedParticles(motionState.preset, cssW, cssH, motionState.intensity);
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.save();
    ctx.scale(dpr, dpr);

    const w = cssW;
    const h = cssH;
    const t = motionState.time;
    const pRgb = motionState.primaryRgb;
    const sRgb = motionState.secondaryRgb;
    const oRgb = motionState.overlayRgb;
    const alphaScale = Math.max(0.25, Math.min(1.25, motionState.intensity / 70));

    if (motionState.standalone) {
      const bgGrad = ctx.createLinearGradient(0, 0, w, h);
      bgGrad.addColorStop(0, `rgb(${oRgb})`);
      bgGrad.addColorStop(0.5, '#070C18');
      bgGrad.addColorStop(1, '#040710');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      const g1 = ctx.createRadialGradient(w * (0.28 + 0.06 * Math.sin(t * 0.2)), h * 0.3, 10, w * 0.3, h * 0.35, w * 0.55);
      g1.addColorStop(0, `rgba(${pRgb}, 0.22)`);
      g1.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, w, h);

      const g2 = ctx.createRadialGradient(w * (0.76 + 0.05 * Math.cos(t * 0.18)), h * 0.72, 10, w * 0.75, h * 0.7, w * 0.5);
      g2.addColorStop(0, `rgba(${sRgb}, 0.18)`);
      g2.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, w, h);
    } else {
      ctx.clearRect(0, 0, w, h);
    }

    const preset = motionState.preset;

    if (preset === 'fireflies') {
      for (const p of motionState.particles) {
        p.x += (p.vx + Math.sin(t * p.speed + p.phase) * 12) * dt;
        p.y += p.vy * dt;
        if (p.y < -20) { p.y = h + 20; p.x = Math.random() * w; }
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;

        const twinkle = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * p.speed * 1.9 + p.phase));
        const rgb = p.hue === 0 ? pRgb : (p.hue === 1 ? '255, 224, 150' : sRgb);
        const rad = p.r * 5.2;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, rad);
        grad.addColorStop(0, `rgba(${rgb}, ${(0.85 * twinkle * alphaScale).toFixed(3)})`);
        grad.addColorStop(0.35, `rgba(${rgb}, ${(0.28 * twinkle * alphaScale).toFixed(3)})`);
        grad.addColorStop(1, `rgba(${rgb}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, rad, 0, Math.PI * 2);
        ctx.fill();
      }
      // Occasional shooting star
      if (Math.random() < 0.012 * alphaScale && motionState.meteors.length < 3) {
        motionState.meteors.push({
          x: w * (0.2 + Math.random() * 0.8),
          y: Math.random() * h * 0.35,
          vx: -(360 + Math.random() * 240),
          vy: 150 + Math.random() * 140,
          life: 0,
          maxLife: 0.7 + Math.random() * 0.5,
        });
      }
      for (let i = motionState.meteors.length - 1; i >= 0; i--) {
        const m = motionState.meteors[i];
        m.life += dt;
        m.x += m.vx * dt;
        m.y += m.vy * dt;
        const p = m.life / m.maxLife;
        if (p >= 1) { motionState.meteors.splice(i, 1); continue; }
        const fade = Math.sin(p * Math.PI) * 0.85 * alphaScale;
        const tailX = m.x - m.vx * 0.16;
        const tailY = m.y - m.vy * 0.16;
        const lg = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
        lg.addColorStop(0, `rgba(255, 255, 255, ${fade.toFixed(3)})`);
        lg.addColorStop(0.4, `rgba(${pRgb}, ${(fade * 0.65).toFixed(3)})`);
        lg.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.strokeStyle = lg;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
      }
    } else if (preset === 'aurora') {
      // Flowing multi-ribbon aurora curtains
      for (let band = 0; band < 3; band++) {
        const rgb = band === 0 ? pRgb : (band === 1 ? sRgb : '187, 154, 247');
        const baseY = h * (0.22 + band * 0.13);
        ctx.beginPath();
        ctx.moveTo(0, baseY);
        for (let x = 0; x <= w; x += 48) {
          const wave = Math.sin(x * 0.0024 + t * (0.45 + band * 0.15) + band * 2.1) * 58
            + Math.cos(x * 0.0052 - t * 0.35 + band) * 26;
          ctx.lineTo(x, baseY + wave);
        }
        ctx.lineTo(w, baseY + 220);
        ctx.lineTo(0, baseY + 220);
        ctx.closePath();
        const ag = ctx.createLinearGradient(0, baseY - 60, 0, baseY + 210);
        ag.addColorStop(0, `rgba(${rgb}, 0)`);
        ag.addColorStop(0.32, `rgba(${rgb}, ${(0.22 * alphaScale).toFixed(3)})`);
        ag.addColorStop(0.65, `rgba(${rgb}, ${(0.08 * alphaScale).toFixed(3)})`);
        ag.addColorStop(1, `rgba(${rgb}, 0)`);
        ctx.fillStyle = ag;
        ctx.fill();
      }
      // Twinkling stars
      for (const s of motionState.particles) {
        const tw = 0.2 + 0.8 * (0.5 + 0.5 * Math.sin(t * s.speed * 2 + s.phase));
        ctx.fillStyle = `rgba(240, 249, 255, ${(tw * 0.72 * alphaScale).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (preset === 'neon_rain') {
      ctx.lineCap = 'round';
      for (const r of motionState.particles) {
        r.x += r.vx * dt;
        r.y += r.vy * dt;
        if (r.y > h + 60 || r.x < -120) {
          r.y = -40 - Math.random() * 140;
          r.x = Math.random() * (w + 300);
        }
        const rgb = r.hue === 0 ? pRgb : sRgb;
        const grad = ctx.createLinearGradient(r.x, r.y, r.x - r.vx * 0.14, r.y - r.len);
        grad.addColorStop(0, `rgba(${rgb}, ${(r.alpha * alphaScale).toFixed(3)})`);
        grad.addColorStop(1, `rgba(${rgb}, 0)`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(r.x, r.y);
        ctx.lineTo(r.x - r.vx * 0.14, r.y - r.len);
        ctx.stroke();
      }
    } else if (preset === 'sakura') {
      for (const f of motionState.particles) {
        f.x += (f.vx + Math.sin(t * 1.1 + f.sway) * 18) * dt;
        f.y += f.vy * dt;
        f.rot += f.vrot * dt;
        if (f.y > h + 24 || f.x > w + 24) {
          f.y = -20;
          f.x = Math.random() * (w + 180) - 180;
        }
        ctx.save();
        ctx.translate(f.x, f.y);
        ctx.rotate(f.rot);
        ctx.scale(1, 0.55 + 0.45 * Math.abs(Math.cos(t * 1.6 + f.sway)));
        const rgb = f.tint === 0 ? '255, 183, 213' : (f.tint === 1 ? '244, 114, 182' : '255, 228, 240');
        ctx.fillStyle = `rgba(${rgb}, ${(0.62 * alphaScale).toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(0, -f.size);
        ctx.bezierCurveTo(f.size * 0.9, -f.size * 0.5, f.size * 0.8, f.size * 0.7, 0, f.size);
        ctx.bezierCurveTo(-f.size * 0.8, f.size * 0.7, -f.size * 0.9, -f.size * 0.5, 0, -f.size);
        ctx.fill();
        ctx.restore();
      }
    } else if (preset === 'aqua_wave') {
      for (let i = 0; i < 5; i++) {
        const yBase = h * (0.52 + i * 0.09);
        const rgb = i % 2 === 0 ? pRgb : sRgb;
        ctx.beginPath();
        ctx.moveTo(0, h);
        for (let x = 0; x <= w; x += 36) {
          const y = yBase + Math.sin(x * 0.0032 + t * (0.7 + i * 0.14) + i * 1.3) * (24 + i * 6)
            + Math.cos(x * 0.0065 - t * 0.5 + i) * 10;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(w, h);
        ctx.closePath();
        const wg = ctx.createLinearGradient(0, yBase - 35, 0, h);
        wg.addColorStop(0, `rgba(${rgb}, ${(0.16 * alphaScale).toFixed(3)})`);
        wg.addColorStop(1, `rgba(${rgb}, 0.01)`);
        ctx.fillStyle = wg;
        ctx.fill();

        ctx.strokeStyle = `rgba(${rgb}, ${(0.36 * alphaScale).toFixed(3)})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
      for (const p of motionState.particles) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        if (p.y < h * 0.35 || p.x > w + 20) {
          p.y = h + 10;
          p.x = Math.random() * w;
        }
        ctx.fillStyle = `rgba(${pRgb}, ${(0.55 * alphaScale).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.restore();
    motionRafId = requestAnimationFrame(renderMotionFrame);
    window.__AGY_MOTION_RAF__ = motionRafId;
  }

  function syncBackgroundMedia(st, effPrimary, effSecondary, overlayRgb, overlayAlpha) {
    const stage = ensureBackgroundStage();
    if (!stage) return;
    const video = stage.querySelector('#agy-bg-video');
    const canvas = stage.querySelector('#agy-bg-motion-canvas');
    const scrim = stage.querySelector('#agy-bg-scrim');
    if (!video || !canvas || !scrim) return;

    const pRgb = hexToRgb(effPrimary, '115, 218, 202');
    const sRgb = hexToRgb(effSecondary, '122, 162, 247');

    // 1. Video layer
    const showVideo = Boolean(st.wpEnabled && st.bgMode === 'video' && st.videoUrl);
    if (showVideo) {
      if (video.dataset.currentSrc !== st.videoUrl) {
        video.dataset.currentSrc = st.videoUrl;
        video.src = st.videoUrl;
        video.load();
      }
      video.style.display = 'block';
      video.style.objectFit = st.videoFit === 'contain' ? 'contain' : 'cover';
      const filters = [];
      if (st.videoBlur > 0) filters.push(`blur(${st.videoBlur}px)`);
      if (st.videoBrightness !== 100) filters.push(`brightness(${st.videoBrightness}%)`);
      if (st.videoSaturate !== 100) filters.push(`saturate(${st.videoSaturate}%)`);
      video.style.filter = filters.length ? filters.join(' ') : 'none';
      video.style.transform = st.videoBlur > 0 ? 'scale(1.04) translateZ(0)' : 'translateZ(0)';
      video.muted = st.videoMuted || st.videoVolume <= 0;
      video.volume = Math.max(0, Math.min(1, (st.videoVolume || 0) / 100));
      video.playbackRate = Math.max(0.25, Math.min(2.0, Number(st.videoSpeed) || 1.0));
      if (st.videoPaused || (document.hidden && st.videoAutoPause)) {
        try { video.pause(); } catch (_) {}
      } else {
        const playPromise = video.play();
        if (playPromise && typeof playPromise.catch === 'function') {
          playPromise.catch(() => {
            // Autoplay fallback: force mute and retry
            video.muted = true;
            video.play().catch(() => {});
          });
        }
      }
    } else {
      try { video.pause(); } catch (_) {}
      video.style.display = 'none';
    }

    // 2. Motion canvas layer (standalone when bgMode === 'motion', or overlay when fxPreset !== 'none')
    const isStandaloneMotion = Boolean(st.wpEnabled && st.bgMode === 'motion');
    const effectiveFx = isStandaloneMotion
      ? (st.fxPreset && st.fxPreset !== 'none' ? st.fxPreset : 'aurora')
      : (st.wpEnabled && st.fxPreset && st.fxPreset !== 'none' ? st.fxPreset : 'none');

    if (effectiveFx !== 'none') {
      const needsReseed = motionState.preset !== effectiveFx
        || Math.abs(motionState.intensity - st.fxIntensity) > 8
        || motionState.particles.length === 0;
      motionState.preset = effectiveFx;
      motionState.standalone = isStandaloneMotion;
      motionState.intensity = st.fxIntensity;
      motionState.primaryRgb = pRgb;
      motionState.secondaryRgb = sRgb;
      motionState.overlayRgb = overlayRgb;
      canvas.style.display = 'block';
      canvas.style.mixBlendMode = isStandaloneMotion ? 'normal' : 'screen';
      canvas.style.opacity = isStandaloneMotion ? '1' : '0.9';
      if (needsReseed) {
        motionState.particles = seedParticles(
          effectiveFx,
          canvas.clientWidth || window.innerWidth,
          canvas.clientHeight || window.innerHeight,
          st.fxIntensity
        );
      }
      if (!motionRafId) {
        motionState.lastTs = 0;
        motionRafId = requestAnimationFrame(renderMotionFrame);
        window.__AGY_MOTION_RAF__ = motionRafId;
      }
    } else {
      stopMotionLoop();
      canvas.style.display = 'none';
    }

    // 3. Scrim layer over video / standalone motion (gives readability + cinema vignette)
    if (showVideo || isStandaloneMotion) {
      const a = Math.min(0.88, Math.max(0.05, overlayAlpha));
      scrim.style.display = 'block';
      scrim.style.background = `radial-gradient(ellipse at 50% 45%, rgba(${overlayRgb}, ${(a * 0.55).toFixed(3)}) 0%, rgba(${overlayRgb}, ${Math.min(0.92, a + 0.16).toFixed(3)}) 100%)`;
    } else {
      scrim.style.display = 'none';
    }
  }

  // =========================================================================
  // MAIN THEME ENGINE (ZERO LIVE BLUR + DYNAMIC THEME-REACTIVE LUXURY UI)
  // =========================================================================
  function applyTheme(overrides = {}) {
    const prev = getState();
    const st = { ...prev, ...overrides };
    if (overrides.customColors !== undefined) {
      st.customColors = overrides.customColors;
    }
    saveStateToStorage(st);

    const mainTheme = THEMES[st.themeName] || THEMES[DEFAULT_THEME_KEY];
    const bubbleTheme = THEMES[st.bubbleName] || mainTheme;
    const wpUrl = st.customWp || mainTheme.wallpaper || '';
    const cc = st.customColors || {};

    // Resolve effective colors (with live custom color overrides!)
    const effPrimary = cc.primary || mainTheme.primary || '#73DACA';
    const effSecondary = cc.secondary || mainTheme.secondary || '#7AA2F7';
    const pRgb = hexToRgb(effPrimary, '115, 218, 202');
    const sRgb = hexToRgb(effSecondary, '122, 162, 247');
    const overlayRgb = cc.scrimBg ? hexToRgb(cc.scrimBg, mainTheme.overlayRgb || '9, 16, 25') : (mainTheme.overlayRgb || '9, 16, 25');
    const cardRgb = cc.cardBg ? hexToRgb(cc.cardBg, overlayRgb) : hexToRgb(rgbToHex(mainTheme.aiCardBg, '#0D1520'), '13, 21, 32');
    const sidebarRgb = cc.sidebarBg ? hexToRgb(cc.sidebarBg, overlayRgb) : hexToRgb(rgbToHex(mainTheme.sidebarBg, '#0B121C'), '11, 18, 28');

    const glowCfg = GLOW_LEVELS[st.glowLevel] || GLOW_LEVELS.normal;
    const gM = glowCfg.mult;
    const effGlow = `rgba(${pRgb}, ${(0.34 * gM).toFixed(3)})`;
    const effSecondaryGlow = `rgba(${sRgb}, ${(0.24 * gM).toFixed(3)})`;
    const effBorderColor = `rgba(${pRgb}, ${(0.36 * Math.max(0.45, gM)).toFixed(3)})`;
    const effCardAlpha = Math.max(0.35, Math.min(0.95, (st.cardOpacity || 82) / 100));
    const effAiCardBg = `rgba(${cardRgb}, ${effCardAlpha.toFixed(2)})`;
    const effAiCardBorder = `rgba(${pRgb}, ${(0.24 * Math.max(0.5, gM)).toFixed(3)})`;

    const oldLegacy = document.getElementById('antigravity-ho-ly-chibi-theme');
    if (oldLegacy) oldLegacy.remove();

    let styleEl = document.getElementById('antigravity-custom-theme-active');
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'antigravity-custom-theme-active';
      document.head.appendChild(styleEl);
    }

    const overlayAlpha = mainTheme.clearBackdrop
      ? Math.min(0.92, Math.max(0.0, ((st.dimming - 10) / 82) * 0.85))
      : Math.min(0.92, Math.max(0.12, (st.dimming / 100) * 0.78));
    const bgPosition = mainTheme.bgPosition || 'center center';
    const secondaryGlowStop = `, radial-gradient(circle at 22% 72%, rgba(${sRgb}, 0.22) 0%, transparent 55%)`;

    let bgLayers = '';
    if (wpUrl) {
      bgLayers = mainTheme.clearBackdrop
        ? `linear-gradient(180deg, rgba(${overlayRgb}, ${overlayAlpha}) 0%, rgba(${overlayRgb}, ${overlayAlpha}) 100%), url("${wpUrl}")`
        : `radial-gradient(circle at 75% 40%, ${effGlow} 0%, transparent 65%)${secondaryGlowStop}, linear-gradient(180deg, rgba(${overlayRgb}, ${overlayAlpha * 0.85}) 0%, rgba(${overlayRgb}, ${overlayAlpha}) 100%), url("${wpUrl}")`;
    } else {
      bgLayers = mainTheme.pureBg || `radial-gradient(circle at 75% 30%, rgba(${pRgb}, 0.22) 0%, transparent 60%), linear-gradient(160deg, rgba(${overlayRgb}, 0.96) 0%, #070910 100%)`;
    }

    const isLiveMediaActive = Boolean(st.wpEnabled && ((st.bgMode === 'video' && st.videoUrl) || st.bgMode === 'motion'));
    const useUnifiedGlass = Boolean(st.wpEnabled && wpUrl && mainTheme.unifiedGlass && !isLiveMediaActive);

    if (useUnifiedGlass && typeof syncShellMetrics === 'function') {
      syncShellMetrics();
    }
    if (useUnifiedGlass) {
      const effectiveBlur = Number.isFinite(st.glassBlur) ? `${st.glassBlur}px` : (mainTheme.headerBlur || '4px');
      syncPrebakedGlass(wpUrl, overlayRgb, Math.max(0.28, overlayAlpha), mainTheme.headerBg || '', effectiveBlur);
    } else {
      syncPrebakedGlass(null);
    }

    // Sync video + motion canvas stage right away
    syncBackgroundMedia(st, effPrimary, effSecondary, overlayRgb, overlayAlpha);

    const wpCss = st.wpEnabled ? `
      .agy-shell {
        background-image: ${bgLayers} !important;
        background-size: cover !important;
        background-position: ${bgPosition} !important;
        background-repeat: no-repeat !important;
        image-rendering: auto !important;
        position: relative !important;
      }
      .agy-shell .overflow-y-auto {
        will-change: scroll-position;
      }
      .agy-sheet,
      .agy-inset-shell,
      .browser-hole-opaque,
      [data-main-content-body="true"],
      [data-side-panel-body="true"],
      [class*="agy-inset-shell"],
      [class*="--shell-canvas"],
      .agy-shell div.absolute.bottom-0.pointer-events-none,
      .agy-shell [class*="z-50"] .pointer-events-none.right-full,
      .agy-shell .bg-background:not(.settings-modal-container):not(.settings-modal-container *):not(#agy-custom-theme-modal-backdrop *):not(#agy-theme-studio-drawer):not(#agy-theme-studio-drawer *) {
        background: transparent !important;
        background-color: transparent !important;
        background-image: none !important;
      }
      body[data-has-browser-hole="true"] .agy-shell[data-agy-hole-active="1"] #agy-bg-stage {
        clip-path: var(--agy-hole-clip, none) !important;
      }
      body[data-has-browser-hole="true"] .agy-shell[data-agy-hole-active="1"]::after {
        content: "";
        position: absolute;
        inset: 0;
        z-index: 0;
        pointer-events: none;
        background-image: ${isLiveMediaActive ? 'none' : bgLayers};
        background-size: cover;
        background-position: ${bgPosition};
        background-repeat: no-repeat;
        clip-path: var(--agy-hole-clip, none);
        will-change: transform;
      }
      body[data-has-browser-hole="true"] .agy-shell[data-agy-hole-active="1"] > :not([data-has-browser-hole="true"]):not([data-browser-hole]:not([data-browser-hole="false"])):not(.settings-modal-container):not(#agy-bg-stage),
      body[data-has-browser-hole="true"] .agy-shell[data-agy-hole-active="1"] .browser-hole-opaque:not([data-has-browser-hole="true"]),
      body[data-has-browser-hole="true"] .agy-shell[data-agy-hole-active="1"] [data-pane-id]:not([data-has-browser-hole="true"]),
      body[data-has-browser-hole="true"] .agy-shell[data-agy-hole-active="1"] [data-tiling-pane]:not([data-has-browser-hole="true"]),
      body[data-has-browser-hole="true"] .agy-shell[data-agy-hole-active="1"] [data-main-content-header]:not([data-has-browser-hole="true"]),
      body[data-has-browser-hole="true"] .agy-shell[data-agy-hole-active="1"] [data-side-panel-strip]:not([data-has-browser-hole="true"]) {
        background: transparent !important;
        background-color: transparent !important;
        background-image: none !important;
      }
      body[data-has-browser-hole="true"] .agy-shell[data-agy-hole-active="1"] :is([data-main-content-body], [data-side-panel-body]):not([data-has-browser-hole="true"]) {
        box-shadow: none !important;
      }
    ` : `
      .agy-shell {
        background: #0B0F18 !important;
      }
    `;

    const defaultCornerSvg = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Cpath d='M2 20 L2 6 Q2 2 6 2 L20 2' stroke='%2373DACA' stroke-width='1.5' fill='none' opacity='0.65'/%3E%3Ccircle cx='6' cy='6' r='2' fill='%2373DACA' opacity='0.75'/%3E%3C/svg%3E";
    const cornerFiligreeUrl = bubbleTheme.cornerSvg || defaultCornerSvg;

    const showBubbleOrn = st.showOrnaments && bubbleTheme.sticker;
    const bubbleStickerCss = showBubbleOrn ? `
      .group\\/user-input-step {
        padding-top: 18px !important;
      }
      .agy-user-bubble-frame::before {
        content: "";
        position: absolute;
        top: ${bubbleTheme.stickerTop}px;
        right: ${bubbleTheme.stickerRight}px;
        width: ${bubbleTheme.stickerW}px;
        height: ${bubbleTheme.stickerH}px;
        background-image: url("${bubbleTheme.sticker}");
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        z-index: 25;
        pointer-events: none;
      }
    ` : `
      .agy-user-bubble-frame::before { display: none !important; }
    `;

    const showInputSticker = st.showOrnaments && st.inputStyle !== 'minimal' && bubbleTheme.sticker;
    const inputStickerCss = showInputSticker ? `
      .surface-composer {
        margin-top: 16px !important;
        overflow: visible !important;
      }
      .surface-composer::before {
        content: "";
        position: absolute;
        top: ${bubbleTheme.stickerTop}px;
        right: 16px;
        width: ${bubbleTheme.stickerW + 8}px;
        height: ${bubbleTheme.stickerH + 2}px;
        background-image: url("${bubbleTheme.sticker}");
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        z-index: 30;
        pointer-events: none;
      }
      .surface-composer::after {
        content: "";
        position: absolute;
        bottom: 3px;
        left: 4px;
        width: 16px;
        height: 16px;
        background-image: url("${cornerFiligreeUrl}");
        background-size: contain;
        background-repeat: no-repeat;
        transform: rotate(180deg);
        z-index: 25;
        pointer-events: none;
        opacity: 0.72;
      }
    ` : `
      .surface-composer::before,
      .surface-composer::after { display: none !important; }
    `;

    // Composer & bubble colors (respecting custom overrides!)
    const compBorderGrad = (cc.compBorder1 || cc.compBorder2 || cc.compBorder3)
      ? `linear-gradient(135deg, ${cc.compBorder1 || effPrimary} 0%, ${cc.compBorder2 || '#E1EEF4'} 50%, ${cc.compBorder3 || effSecondary} 100%)`
      : (st.inputStyle === 'double_gold'
        ? 'linear-gradient(135deg, #f59e0b 0%, rgba(251, 191, 36, 0.55) 50%, #fbbf24 100%)'
        : `linear-gradient(135deg, rgba(${pRgb}, 0.85) 0%, rgba(235, 244, 255, 0.65) 50%, rgba(${sRgb}, 0.85) 100%)`);

    const inputCardBg = (cc.compBg1 || cc.compBg2)
      ? `linear-gradient(145deg, ${cc.compBg1 || '#101B29'} 0%, ${cc.compBg2 || '#0A121D'} 100%)`
      : (st.inputStyle === 'glass'
        ? `rgba(${cardRgb}, 0.68)`
        : st.inputStyle === 'double_gold'
        ? 'linear-gradient(145deg, rgba(44, 28, 20, 0.90) 0%, rgba(24, 15, 12, 0.94) 100%)'
        : (bubbleTheme.inputCardBg || `linear-gradient(145deg, rgba(${cardRgb}, 0.90) 0%, rgba(${overlayRgb}, 0.94) 100%)`));

    const userBubbleFrameBg = cc.bubbleBorder
      ? `linear-gradient(135deg, ${cc.bubbleBorder} 0%, rgba(${sRgb}, 0.8) 100%)`
      : (bubbleTheme.frameBg || compBorderGrad);

    const userBubbleBg = (cc.bubbleBg1 || cc.bubbleBg2)
      ? `linear-gradient(145deg, ${cc.bubbleBg1 || '#153248'} 0%, ${cc.bubbleBg2 || '#0F2438'} 100%)`
      : (bubbleTheme.bg || `linear-gradient(145deg, rgba(${cardRgb}, 0.90) 0%, rgba(${overlayRgb}, 0.95) 100%)`);

    const isLight = Boolean(mainTheme.isLight);
    const uiInk = cc.mainText || mainTheme.uiTextColor || (isLight ? '#0f172a' : 'rgba(241, 247, 252, 0.96)');
    const uiMutedInk = cc.subText || mainTheme.uiMutedColor || (isLight ? '#334155' : 'rgba(203, 218, 232, 0.86)');
    const uiShadow = isLight ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.82)';
    const pillBg = mainTheme.pillBg || (isLight ? 'rgba(255, 255, 255, 0.80)' : `rgba(${cardRgb}, 0.78)`);
    const pillHoverBg = mainTheme.pillHoverBg || (isLight ? 'rgba(255, 255, 255, 0.96)' : `rgba(${cardRgb}, 0.94)`);
    const pillText = mainTheme.pillTextColor || (isLight ? '#0f172a' : '#f1f5f9');
    const pillBorder = mainTheme.pillBorder || `rgba(${pRgb}, 0.26)`;
    const preCodeBg = `rgba(${overlayRgb}, 0.74)`;
    const sidebarBg = `linear-gradient(180deg, rgba(${sidebarRgb}, ${isLiveMediaActive ? 0.62 : 0.44}) 0%, rgba(${sidebarRgb}, ${isLiveMediaActive ? 0.72 : 0.56}) 100%)`;
    const sidebarHoverBg = `rgba(${pRgb}, 0.14)`;
    const modalBg = `rgba(${overlayRgb}, 0.95)`;

    // Custom Avatars (FIXED selectors for modern Antigravity DOM!)
    const effectiveUserAvatar = st.userAvatar === 'none' ? '' : (st.userAvatar || mainTheme.userAvatar || '');
    const effectiveAgentAvatar = st.agentAvatar === 'none' ? '' : (st.agentAvatar || mainTheme.agentAvatar || '');
    const avSize = Math.min(52, Math.max(22, Number(st.avatarSize) || 34));
    const avAgentSize = Math.max(22, avSize - 2);
    const avRadius = Math.min(50, Math.max(0, Number.isFinite(Number(st.avatarRadius)) ? Number(st.avatarRadius) : 50));

    const avatarCss = `
      ${effectiveUserAvatar ? `
      .agy-shell [data-testid="user-message"],
      .agy-shell [role="article"][aria-label="User message"] .group\\/user-input-step > div:first-child {
        position: relative !important;
        padding-right: ${avSize + 12}px !important;
      }
      .agy-shell [data-testid="user-message"]::after,
      .agy-shell [role="article"][aria-label="User message"] .group\\/user-input-step > div:first-child::after {
        content: "";
        position: absolute;
        right: 0;
        bottom: 2px;
        width: ${avSize}px;
        height: ${avSize}px;
        border-radius: ${avRadius}%;
        background-image: url("${effectiveUserAvatar}");
        background-size: cover;
        background-position: center;
        border: 1.5px solid ${effPrimary};
        box-shadow: 0 3px 12px rgba(0, 0, 0, 0.5), 0 0 ${Math.round(10 * gM)}px ${effGlow};
        pointer-events: none;
      }
      ` : ''}
      ${effectiveAgentAvatar ? `
      .agy-shell [data-testid="agent-response"],
      .agy-shell [role="article"][aria-label="Agent response"] {
        position: relative !important;
        padding-left: ${avAgentSize + 24}px !important;
        min-height: ${avAgentSize + 24}px !important;
      }
      .agy-shell [data-testid="agent-response"]::before,
      .agy-shell [role="article"][aria-label="Agent response"]::before {
        content: "";
        position: absolute;
        top: 14px;
        left: 14px;
        width: ${avAgentSize}px;
        height: ${avAgentSize}px;
        border-radius: ${avRadius}%;
        background-image: url("${effectiveAgentAvatar}");
        background-size: cover;
        background-position: center;
        border: 1.5px solid ${effSecondary};
        box-shadow: 0 3px 12px rgba(0, 0, 0, 0.5), 0 0 ${Math.round(10 * gM)}px ${effSecondaryGlow};
        pointer-events: none;
      }
      ` : ''}
    `;

    // Single clean luxury AI reading card (NO double-nesting on [data-markdown-root]!)
    const aiCardCss = `
      .agy-shell [data-testid="agent-response"],
      .agy-shell [role="article"][aria-label="Agent response"] {
        background: ${effAiCardBg} !important;
        ${cc.mainText ? `color: ${cc.mainText} !important;` : ''}
        backdrop-filter: none !important;
        border: 1px solid ${effAiCardBorder} !important;
        border-radius: 16px !important;
        padding: 14px 18px !important;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.42), 0 0 ${Math.round(14 * gM)}px rgba(${pRgb}, ${(0.09 * gM).toFixed(3)}), inset 0 1px 0 rgba(255, 255, 255, 0.08) !important;
        box-sizing: border-box !important;
        overflow: hidden !important;
        transition: border-color 0.2s ease !important;
      }
      .agy-shell [role="article"][aria-label="Agent response"]:hover {
        border-color: rgba(${pRgb}, ${(0.38 * Math.max(0.5, gM)).toFixed(3)}) !important;
      }
      .agy-shell [data-markdown-root] {
        background: transparent !important;
        border: none !important;
        box-shadow: none !important;
        padding: 0 !important;
      }
      .agy-shell [role="article"][aria-label="Agent response"] pre {
        background: ${preCodeBg} !important;
        border: 1px solid rgba(${pRgb}, 0.20) !important;
        border-radius: 11px !important;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05) !important;
      }
      .agy-shell [role="article"][aria-label="Agent response"] :not(pre) > code {
        background: rgba(${pRgb}, 0.12) !important;
        color: ${effPrimary} !important;
        border: 1px solid rgba(${pRgb}, 0.18) !important;
        border-radius: 5px !important;
      }
      .agy-shell [role="article"][aria-label="Agent response"] blockquote {
        border-left: 3px solid ${effPrimary} !important;
        background: rgba(${pRgb}, 0.06) !important;
        border-radius: 0 8px 8px 0 !important;
        padding: 6px 12px !important;
      }
      .agy-shell [data-testid="agent-response"] .md-table-scroll,
      .agy-shell [role="article"][aria-label="Agent response"] .md-table-scroll {
        display: block !important;
        width: 100% !important;
        overflow-x: auto !important;
        scrollbar-width: auto !important;
      }
      .agy-shell [data-main-content-body="true"] h1,
      .agy-shell [data-main-content-body="true"] h2 {
        text-shadow: ${isLight ? 'none' : '0 2px 10px rgba(0, 0, 0, 0.72)'};
      }
    `;

    const sidePanelCss = st.wpEnabled ? `
      ${useUnifiedGlass ? `
      .agy-shell[data-agy-side-glass="1"]::before {
        clip-path: polygon(
          evenodd,
          0 0, 100% 0, 100% var(--agy-hdr-h, 75px),
          var(--agy-sidebar-w, 256px) var(--agy-hdr-h, 75px),
          var(--agy-sidebar-w, 256px) 100%, 0 100%, 0 0,
          var(--agy-side-l, 100%) var(--agy-side-t, 75px),
          var(--agy-side-r, 100%) var(--agy-side-t, 75px),
          var(--agy-side-r, 100%) var(--agy-side-b, 100%),
          var(--agy-side-l, 100%) var(--agy-side-b, 100%),
          var(--agy-side-l, 100%) var(--agy-side-t, 75px)
        ) !important;
      }
      ` : ''}
      body:not([data-has-browser-hole="true"]) .agy-shell [data-side-panel-body="true"]:not([data-has-browser-hole="true"]):not(:has([data-browser-hole]:not([data-browser-hole="false"]))) {
        background: ${effAiCardBg} !important;
        backdrop-filter: none !important;
        border-left: 1px solid ${effAiCardBorder} !important;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05) !important;
      }
      body:not([data-has-browser-hole="true"]) .agy-shell [data-side-panel-body="true"] pre {
        background: ${preCodeBg} !important;
        border: 1px solid ${effAiCardBorder} !important;
        border-radius: 10px !important;
      }
    ` : '';

    const headerCss = `
      .agy-shell > div:first-of-type {
        position: relative !important;
        z-index: 3 !important;
      }
      .agy-shell > div:not(:first-of-type) {
        position: relative !important;
        z-index: 2 !important;
      }
      ${useUnifiedGlass ? `
      .agy-shell::before {
        content: "";
        position: absolute;
        inset: 0;
        z-index: 1;
        pointer-events: none;
        background-color: rgba(${sidebarRgb}, 0.42);
        background-image: var(--agy-l-glass-bg, none);
        background-size: cover;
        background-position: ${bgPosition};
        background-repeat: no-repeat;
        backdrop-filter: none !important;
        will-change: transform;
        clip-path: polygon(
          0 0, 100% 0, 100% var(--agy-hdr-h, 75px),
          var(--agy-sidebar-w, 256px) var(--agy-hdr-h, 75px),
          var(--agy-sidebar-w, 256px) 100%, 0 100%
        );
      }
      .agy-shell [class*="@container/titlebar"] {
        background: transparent !important;
        backdrop-filter: none !important;
      }
      ` : `
      .agy-shell::before {
        content: none !important;
      }
      .agy-shell [class*="@container/titlebar"],
      .agy-shell [data-testid="title-menu-bar"] {
        background: rgba(${sidebarRgb}, ${isLiveMediaActive ? 0.64 : 0.48}) !important;
        backdrop-filter: none !important;
      }
      `}
      .agy-shell [data-testid="title-menu-bar"],
      .agy-shell [class*="@container/titlebar"] {
        border-bottom: 1px solid rgba(${pRgb}, ${(0.24 * Math.max(0.4, gM)).toFixed(3)}) !important;
        box-shadow: 0 2px 16px rgba(0, 0, 0, 0.34) !important;
      }
      .agy-shell [class*="@container/titlebar"] [data-testid="breadcrumb-segment"],
      .agy-shell [class*="@container/titlebar"] [data-testid="pane-titlebar-toolbar"] button,
      .agy-shell [class*="@container/titlebar"] [data-testid="pane-titlebar-toolbar"] span {
        color: ${uiInk} !important;
        text-shadow: ${uiShadow};
      }
    `;

    const sidebarOuterCss = useUnifiedGlass ? `
      .agy-shell aside,
      .agy-shell [data-sidebar="true"],
      .agy-shell .bg-sidebar {
        background: linear-gradient(180deg, rgba(${sidebarRgb}, 0.26) 0%, rgba(${sidebarRgb}, 0.42) 100%) !important;
        backdrop-filter: none !important;
      }
    ` : `
      .agy-shell aside,
      .agy-shell [data-sidebar="true"],
      .agy-shell .bg-sidebar {
        background: ${sidebarBg} !important;
        backdrop-filter: none !important;
      }
    `;

    styleEl.textContent = `
      ${wpCss}
      ${sidebarOuterCss}

      /* Clean inner sidebar layers */
      .agy-shell .bg-sidebar .bg-sidebar,
      .agy-shell [data-sidebar="true"] .bg-sidebar,
      .agy-shell .bg-sidebar [class*="group/headerbtn"],
      .agy-shell .bg-sidebar [class*="group/section-header"] {
        background: transparent !important;
        backdrop-filter: none !important;
      }
      .agy-shell .bg-sidebar .agy-scrolled > .w-full.relative > .bg-sidebar[style*="position: sticky"] {
        opacity: 0 !important;
        pointer-events: none !important;
        transition: opacity 0.14s ease !important;
      }

      /* Sidebar Typography & Clean Borderless Rows (NO box spam!) */
      .agy-shell .bg-sidebar a,
      .agy-shell .bg-sidebar span,
      .agy-shell .bg-sidebar button {
        color: ${uiInk};
        text-shadow: ${uiShadow};
      }
      .agy-shell .bg-sidebar .text-muted-foreground,
      .agy-shell .bg-sidebar .text-secondary-foreground {
        color: ${uiMutedInk} !important;
      }
      .agy-shell .bg-sidebar [data-testid="conversation-row-sidebar"],
      .agy-shell .bg-sidebar [data-testid="sidebar-navigation-items"] > a:not([data-testid="new-conversation-button"]),
      .agy-shell .bg-sidebar [data-testid="sidebar-navigation-items"] > button {
        border: 1px solid transparent !important;
        box-shadow: none !important;
        border-radius: 9px !important;
        transition: background-color 0.16s ease, border-color 0.16s ease, transform 0.14s ease !important;
      }
      .agy-shell .bg-sidebar [data-testid="conversation-row-sidebar"]:hover,
      .agy-shell .bg-sidebar [data-testid="sidebar-navigation-items"] > a:not([data-testid="new-conversation-button"]):hover,
      .agy-shell .bg-sidebar [data-testid="sidebar-navigation-items"] > button:hover {
        background: ${sidebarHoverBg} !important;
        border-color: rgba(${pRgb}, 0.24) !important;
      }
      /* Active conversation pill highlight */
      .agy-shell .bg-sidebar [data-testid="conversation-row-sidebar"]:has([aria-current="page"]),
      .agy-shell .bg-sidebar [data-testid="conversation-row-sidebar"][data-active="true"],
      .agy-shell .bg-sidebar a[aria-current="page"] {
        background: linear-gradient(90deg, rgba(${pRgb}, 0.22) 0%, rgba(${sRgb}, 0.10) 100%) !important;
        border: 1px solid rgba(${pRgb}, 0.38) !important;
        box-shadow: inset 3px 0 0 ${effPrimary}, 0 2px 12px rgba(0, 0, 0, 0.26) !important;
      }

      /* Signature Hero "+ New Conversation" Pill Button */
      .agy-shell [data-testid="new-conversation-button"] {
        background: linear-gradient(135deg, rgba(${pRgb}, 0.22) 0%, rgba(${sRgb}, 0.14) 100%) !important;
        border: 1px solid rgba(${pRgb}, 0.45) !important;
        border-radius: 10px !important;
        box-shadow: 0 3px 14px rgba(0, 0, 0, 0.30), 0 0 ${Math.round(12 * gM)}px rgba(${pRgb}, ${(0.20 * gM).toFixed(3)}), inset 0 1px 0 rgba(255, 255, 255, 0.12) !important;
        transition: all 0.18s ease !important;
      }
      .agy-shell [data-testid="new-conversation-button"]:hover {
        background: linear-gradient(135deg, rgba(${pRgb}, 0.34) 0%, rgba(${sRgb}, 0.22) 100%) !important;
        border-color: ${effPrimary} !important;
        box-shadow: 0 4px 18px rgba(0, 0, 0, 0.38), 0 0 ${Math.round(18 * gM)}px rgba(${pRgb}, ${(0.34 * gM).toFixed(3)}) !important;
      }

      /* Custom Theme sidebar entry */
      #agy-custom-theme-sidebar-btn {
        border: 1px solid transparent !important;
        box-shadow: none !important;
      }
      #agy-custom-theme-sidebar-btn:hover {
        background: linear-gradient(90deg, rgba(${pRgb}, 0.20) 0%, rgba(${sRgb}, 0.12) 100%) !important;
        border-color: rgba(${pRgb}, 0.36) !important;
        color: ${effPrimary} !important;
      }
      #agy-custom-theme-sidebar-btn svg {
        color: ${effPrimary} !important;
        stroke: ${effPrimary} !important;
        filter: drop-shadow(0 0 ${Math.round(5 * gM)}px rgba(${pRgb}, 0.65));
      }

      /* Theme-Reactive Luminous Sidebar Split Divider */
      .agy-shell [data-testid="sidebar-split"] > .bg-border,
      .agy-shell [data-testid="sidebar-split"] > div:nth-child(2),
      .agy-shell aside + div.bg-border,
      .agy-shell [data-split-sash] {
        background: linear-gradient(180deg, ${effPrimary} 0%, ${effSecondary} 50%, rgba(${pRgb}, 0.25) 100%) !important;
        box-shadow: 0 0 ${Math.round(10 * gM)}px rgba(${pRgb}, ${(0.75 * gM).toFixed(3)}), 0 0 ${Math.round(22 * gM)}px rgba(${sRgb}, ${(0.35 * gM).toFixed(3)}) !important;
        width: 1.5px !important;
        min-width: 1.5px !important;
        opacity: 0.95 !important;
        position: relative !important;
        z-index: 40 !important;
      }

      /* Floating Overview Panel & Popovers Glass Cohesion */
      .agy-shell [data-testid="overview-panel"] {
        background: rgba(${cardRgb}, 0.86) !important;
        border: 1px solid rgba(${pRgb}, 0.28) !important;
        border-radius: 14px !important;
        box-shadow: 0 12px 34px rgba(0, 0, 0, 0.52), 0 0 ${Math.round(16 * gM)}px rgba(${pRgb}, ${(0.12 * gM).toFixed(3)}), inset 0 1px 0 rgba(255, 255, 255, 0.08) !important;
      }
      .agy-shell [data-testid="overview-panel"] button:hover,
      .agy-shell [data-testid="overview-panel"] [role="button"]:hover {
        background: rgba(${pRgb}, 0.14) !important;
      }

      ${aiCardCss}
      ${sidePanelCss}
      ${avatarCss}
      ${headerCss}

      /* User Chat Bubble Double-Border Frame & Ornament */
      .agy-user-bubble-frame {
        background: ${userBubbleFrameBg} !important;
        border-radius: ${bubbleTheme.isScroll ? '6px' : '15px'} !important;
        box-shadow: 0 6px 22px rgba(0, 0, 0, 0.46), 0 0 ${Math.round(14 * gM)}px ${effGlow} !important;
        position: relative !important;
        overflow: visible !important;
        padding: 1.4px !important;
      }
      .agy-user-bubble-frame::after {
        content: "";
        position: absolute;
        top: 3px;
        left: 3px;
        width: 15px;
        height: 15px;
        background-image: url("${cornerFiligreeUrl}");
        background-size: contain;
        background-repeat: no-repeat;
        pointer-events: none;
        opacity: ${st.showOrnaments ? '0.78' : '0'};
      }
      .agy-user-bubble {
        background: ${userBubbleBg} !important;
        border-radius: ${bubbleTheme.isScroll ? '5px' : '13.6px'} !important;
        padding: 9px 16px !important;
        color: ${cc.mainText || bubbleTheme.textColor || '#E1EEF4'} !important;
        border: 1px solid rgba(${pRgb}, 0.18) !important;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08) !important;
        overflow: visible !important;
        font-weight: 450 !important;
      }
      .agy-user-bubble * {
        color: ${cc.mainText || bubbleTheme.textColor || '#E1EEF4'} !important;
      }

      /* Flagship Double-Border Input Composer with Focus Aura */
      .surface-composer {
        background: ${compBorderGrad} !important;
        border-radius: 17px !important;
        padding: 1.5px !important;
        box-shadow: 0 8px 28px rgba(0, 0, 0, 0.56), 0 0 ${Math.round(16 * gM)}px rgba(${pRgb}, ${(0.28 * gM).toFixed(3)}) !important;
        position: relative !important;
        transition: box-shadow 0.22s ease, transform 0.22s ease !important;
      }
      .surface-composer:focus-within {
        box-shadow: 0 10px 34px rgba(0, 0, 0, 0.64), 0 0 ${Math.round(28 * Math.max(0.6, gM))}px rgba(${pRgb}, ${(0.48 * Math.max(0.6, gM)).toFixed(3)}), 0 0 ${Math.round(14 * gM)}px rgba(${sRgb}, ${(0.28 * gM).toFixed(3)}) !important;
      }
      .surface-composer-card {
        background: ${inputCardBg} !important;
        backdrop-filter: none !important;
        border-radius: 15.5px !important;
        border: 1px solid rgba(${pRgb}, 0.22) !important;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.10) !important;
      }

      /* High-contrast pill badges for composer bar */
      .surface-composer [data-testid="project-selector-trigger"],
      .surface-composer [data-testid="branch-pill-trigger"],
      .surface-composer [aria-label="Select Environment"],
      .surface-composer > :not(.surface-composer-card) [data-testid="input-box-bottom-toolbar"] button,
      .surface-composer > :not(.surface-composer-card) [data-testid="input-box-bottom-toolbar"] [role="button"] {
        background: ${pillBg} !important;
        color: ${pillText} !important;
        border: 1px solid ${pillBorder} !important;
        border-radius: 9999px !important;
        font-weight: 500 !important;
        box-shadow: 0 1px 6px rgba(0, 0, 0, 0.25) !important;
        margin: 1px 2px !important;
        transition: background-color 0.15s ease, border-color 0.15s ease !important;
      }
      .surface-composer [data-testid="project-selector-trigger"]:hover,
      .surface-composer [data-testid="branch-pill-trigger"]:hover,
      .surface-composer [aria-label="Select Environment"]:hover,
      .surface-composer > :not(.surface-composer-card) [data-testid="input-box-bottom-toolbar"] button:hover,
      .surface-composer > :not(.surface-composer-card) [data-testid="input-box-bottom-toolbar"] [role="button"]:hover {
        background: ${pillHoverBg} !important;
        border-color: ${effPrimary} !important;
        color: ${pillText} !important;
      }
      .surface-composer [data-testid="project-selector-trigger"] *,
      .surface-composer [data-testid="branch-pill-trigger"] *,
      .surface-composer [aria-label="Select Environment"] *,
      .surface-composer > :not(.surface-composer-card) [data-testid="input-box-bottom-toolbar"] button *,
      .surface-composer > :not(.surface-composer-card) [data-testid="input-box-bottom-toolbar"] [role="button"] * {
        color: ${pillText} !important;
      }

      ${bubbleStickerCss}
      ${inputStickerCss}

      /* Sleek Theme-Reactive Scrollbars */
      .agy-shell ::-webkit-scrollbar {
        width: 6px !important;
        height: 6px !important;
      }
      .agy-shell ::-webkit-scrollbar-track {
        background: transparent !important;
      }
      .agy-shell ::-webkit-scrollbar-thumb {
        background: rgba(${pRgb}, 0.26) !important;
        border-radius: 9999px !important;
      }
      .agy-shell ::-webkit-scrollbar-thumb:hover {
        background: rgba(${pRgb}, 0.56) !important;
      }

      /* Custom Selection Color */
      .agy-shell ::selection {
        background: rgba(${pRgb}, 0.34) !important;
        color: #ffffff !important;
      }

      /* Settings Modal & Theme Studio Pro Drawer */
      .settings-modal-container {
        background: ${modalBg} !important;
        border: 1px solid ${effBorderColor} !important;
        box-shadow: 0 16px 52px rgba(0, 0, 0, 0.78), 0 0 ${Math.round(24 * gM)}px ${effGlow} !important;
        backdrop-filter: none !important;
      }
      #agy-theme-studio-drawer {
        border: 1.5px solid rgba(${pRgb}, 0.62) !important;
        box-shadow: 0 24px 64px rgba(0, 0, 0, 0.86), 0 0 ${Math.round(28 * Math.max(0.5, gM))}px rgba(${pRgb}, 0.26), inset 0 1px 0 rgba(255, 255, 255, 0.12) !important;
        --agy-accent: ${effPrimary};
        --agy-accent-rgb: ${pRgb};
        --agy-accent2: ${effSecondary};
        --agy-accent2-rgb: ${sRgb};
      }
      #agy-theme-studio-drawer ::-webkit-scrollbar {
        width: 5px;
      }
      #agy-theme-studio-drawer ::-webkit-scrollbar-thumb {
        background: rgba(${pRgb}, 0.32);
        border-radius: 999px;
      }
    `;

    syncTitleBarOverlay(st);
    scheduleTitleBarSync(st);
    syncStudioHeaderChrome(st, effPrimary, pRgb);
  }

  function syncStudioHeaderChrome(st, effPrimary, pRgb) {
    const drawer = document.getElementById('agy-theme-studio-drawer');
    if (!drawer) return;
    const dd = drawer.querySelector('#agy-studio-preset-dropdown');
    if (dd && dd.value !== st.themeName) dd.value = st.themeName;
    const badge = drawer.querySelector('#agy-studio-mode-badge');
    if (badge) {
      const label = st.bgMode === 'video' ? 'VIDEO' : (st.bgMode === 'motion' ? 'ĐỘNG 60FPS' : 'ẢNH');
      badge.textContent = label;
      badge.style.color = effPrimary;
      badge.style.borderColor = `rgba(${pRgb}, 0.42)`;
      badge.style.background = `rgba(${pRgb}, 0.14)`;
    }
  }

  function syncTitleBarOverlay(stOverride) {
    const st = stOverride || getState();
    const activeTh = THEMES[st.themeName] || THEMES[DEFAULT_THEME_KEY] || {};
    if (window.electronNative && typeof window.electronNative.setTitleBarOverlay === 'function') {
      try {
        window.electronNative.setTitleBarOverlay({
          color: st.wpEnabled ? '#00000000' : '#0B0F18',
          symbolColor: (st.wpEnabled && activeTh.isLight) ? '#0f172a' : '#f8fafc',
        });
      } catch (_) {}
    }
  }

  function clearTitleBarTimers() {
    if (Array.isArray(window.__AGY_TBO_TIMERS__)) {
      window.__AGY_TBO_TIMERS__.forEach(id => clearTimeout(id));
    }
    window.__AGY_TBO_TIMERS__ = [];
  }

  function scheduleTitleBarSync(stOverride) {
    clearTitleBarTimers();
    const st = stOverride || getState();
    syncTitleBarOverlay(st);
    [300, 900, 2000, 4000, 7000].forEach(ms => {
      window.__AGY_TBO_TIMERS__.push(setTimeout(() => syncTitleBarOverlay(), ms));
    });
  }

  function removeCustomTheme() {
    clearTitleBarTimers();
    stopMotionLoop();
    if (window.__AGY_SCROLL_AC__) {
      try { window.__AGY_SCROLL_AC__.abort(); } catch (_) {}
    }
    ['antigravity-custom-theme-active', 'agy-custom-theme-sidebar-btn', 'agy-custom-theme-settings-btn', 'agy-theme-studio-drawer', 'agy-bg-stage'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.remove();
    });
    const shell = document.querySelector('.agy-shell');
    if (shell) {
      delete shell.dataset.agyHoleActive;
      shell.style.removeProperty('--agy-hole-clip');
      shell.style.removeProperty('--agy-l-glass-bg');
    }
    if (window.electronNative && typeof window.electronNative.setTitleBarOverlay === 'function') {
      try {
        window.electronNative.setTitleBarOverlay({ color: '#111114', symbolColor: '#f8fafc' });
      } catch (_) {}
    }
  }

  window.__ANTIGRAVITY_APPLY_CUSTOM_THEME__ = applyTheme;
  window.__ANTIGRAVITY_REMOVE_CUSTOM_THEME__ = removeCustomTheme;
  window.__ANTIGRAVITY_OPEN_THEME_MODAL__ = openCustomThemeModal;

  // =========================================================================
  // THEME STUDIO PRO (6-TAB FLOATING STUDIO WITH FULL VIDEO ENGINE)
  // =========================================================================
  let activeStudioTab = 'video'; // 'profile' | 'video' | 'wallpaper' | 'glass' | 'color' | 'advanced'
  let videoLibraryCache = [];
  let mediaServerOnline = false;

  async function refreshVideoLibrary() {
    try {
      const res = await fetch(`${MEDIA_BASE()}/videos`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        mediaServerOnline = true;
        videoLibraryCache = Array.isArray(data.videos) ? data.videos : [];
        return videoLibraryCache;
      }
    } catch (_) {
      mediaServerOnline = false;
    }
    return videoLibraryCache;
  }

  async function uploadVideoFile(file) {
    if (!file) return;
    showStudioToast(`Đang nạp video "${file.name}"...`);
    try {
      const res = await fetch(`${MEDIA_BASE()}/upload?name=${encodeURIComponent(file.name)}`, {
        method: 'POST',
        headers: { 'X-Filename': encodeURIComponent(file.name) },
        body: file,
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.ok && data.url) {
          mediaServerOnline = true;
          applyTheme({
            wpEnabled: true,
            bgMode: 'video',
            videoUrl: data.url,
            videoName: data.name || file.name,
            videoPaused: false,
          });
          await refreshVideoLibrary();
          showStudioToast(`Đã lưu & phát nền video: ${data.name || file.name}`);
          renderActiveTab();
          return;
        }
      }
    } catch (_) {
      mediaServerOnline = false;
    }

    // Fallback: instant local Blob URL for current session if media server is offline
    const blobUrl = URL.createObjectURL(file);
    applyTheme({
      wpEnabled: true,
      bgMode: 'video',
      videoUrl: blobUrl,
      videoName: `${file.name} (tạm thời)`,
      videoPaused: false,
    });
    showStudioToast(`Đang phát video (chế độ phiên hiện tại): ${file.name}`);
    renderActiveTab();
  }

  async function applyVideoPathOrUrl(rawInput) {
    const val = String(rawInput || '').trim().replace(/^["']|["']$/g, '');
    if (!val) {
      showStudioToast('Vui lòng nhập đường dẫn file trên máy hoặc link video MP4/WebM.');
      return;
    }
    if (/^https?:\/\//i.test(val) || /^blob:/i.test(val)) {
      const guessName = decodeURIComponent(val.split('/').pop().split('?')[0] || 'Video Online');
      applyTheme({
        wpEnabled: true,
        bgMode: 'video',
        videoUrl: val,
        videoName: guessName,
        videoPaused: false,
      });
      showStudioToast(`Đang phát video từ URL: ${guessName}`);
      renderActiveTab();
      return;
    }
    // Local file path on Windows/macOS/Linux -> stream via daemon
    try {
      const res = await fetch(`${MEDIA_BASE()}/import-path`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filePath: val, copy: false }),
      });
      const data = await res.json();
      if (data && data.ok && data.url) {
        applyTheme({
          wpEnabled: true,
          bgMode: 'video',
          videoUrl: data.url,
          videoName: data.name || 'Video Cục Bộ',
          videoPaused: false,
        });
        showStudioToast(`Đã liên kết video cục bộ: ${data.name}`);
        renderActiveTab();
        return;
      }
      showStudioToast(data.error || 'Không mở được đường dẫn video cục bộ.');
    } catch (_) {
      showStudioToast('Máy chủ media cục bộ chưa sẵn sàng. Hãy dùng nút Chọn file Video.');
    }
  }

  function showStudioToast(msg) {
    const toast = document.getElementById('agy-studio-toast-msg');
    if (!toast) return;
    toast.textContent = msg;
    toast.style.opacity = '1';
    clearTimeout(window.__AGY_TOAST_TIMER__);
    window.__AGY_TOAST_TIMER__ = setTimeout(() => {
      if (toast) toast.style.opacity = '0.82';
    }, 3600);
  }

  function openCustomThemeModal(tabOverride) {
    if (tabOverride) activeStudioTab = tabOverride;
    toggleThemeStudio(true);
  }

  function toggleThemeStudio(forceOpen) {
    let drawer = document.getElementById('agy-theme-studio-drawer');
    if (!drawer) {
      drawer = createThemeStudioDrawer();
      document.body.appendChild(drawer);
    }
    const isClosed = drawer.style.display === 'none' || drawer.dataset.open !== '1';
    const shouldOpen = forceOpen !== undefined ? forceOpen : isClosed;

    if (shouldOpen) {
      drawer.style.display = 'flex';
      drawer.dataset.open = '1';
      requestAnimationFrame(() => {
        drawer.style.transform = 'translateX(0)';
        drawer.style.opacity = '1';
      });
      renderActiveTab();
    } else {
      drawer.style.transform = 'translateX(470px)';
      drawer.style.opacity = '0';
      drawer.dataset.open = '0';
      setTimeout(() => {
        if (drawer && drawer.dataset.open !== '1') drawer.style.display = 'none';
      }, 220);
    }
  }

  function createThemeStudioDrawer() {
    const st = getState();
    const mainTheme = THEMES[st.themeName] || THEMES[DEFAULT_THEME_KEY];
    const accent = (st.customColors && st.customColors.primary) || mainTheme.primary || '#73DACA';
    const accentRgb = hexToRgb(accent, '115, 218, 202');

    const drawer = document.createElement('div');
    drawer.id = 'agy-theme-studio-drawer';
    drawer.dataset.open = '0';
    drawer.style.cssText = `
      position: fixed;
      top: 14px;
      right: 16px;
      bottom: 14px;
      width: 452px;
      max-width: calc(100vw - 32px);
      z-index: 999999;
      display: none;
      flex-direction: column;
      background: linear-gradient(168deg, rgba(9, 15, 27, 0.985) 0%, rgba(6, 10, 19, 0.99) 100%);
      border: 1.5px solid rgba(${accentRgb}, 0.55);
      border-radius: 18px;
      box-shadow: 0 24px 64px rgba(0, 0, 0, 0.86), 0 0 28px rgba(${accentRgb}, 0.24), inset 0 1px 0 rgba(255, 255, 255, 0.12);
      color: #f1f5f9;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      overflow: hidden;
      transform: translateX(470px);
      opacity: 0;
      transition: transform 0.24s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease;
      box-sizing: border-box;
      --agy-accent: ${accent};
      --agy-accent-rgb: ${accentRgb};
    `;

    const tabs = [
      { id: 'video', label: 'Nền Video' },
      { id: 'profile', label: 'Hồ sơ' },
      { id: 'wallpaper', label: 'Hình nền' },
      { id: 'glass', label: 'Kính & Viền' },
      { id: 'color', label: 'Màu & Avatar' },
      { id: 'advanced', label: 'Nâng cao' },
    ];

    drawer.innerHTML = `
      <!-- Header -->
      <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 14px;border-bottom:1px solid rgba(255,255,255,0.08);background:linear-gradient(90deg, rgba(15,24,42,0.92) 0%, rgba(10,16,30,0.88) 100%);flex-shrink:0;gap:8px;">
        <div style="display:flex;align-items:center;gap:8px;min-width:0;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:8px;background:rgba(${accentRgb},0.16);border:1px solid rgba(${accentRgb},0.4);color:var(--agy-accent);flex-shrink:0;">
            ${SVG_ICONS.sparkle}
          </span>
          <div style="display:flex;flex-direction:column;min-width:0;">
            <div style="display:flex;align-items:center;gap:6px;">
              <span style="font-size:13.5px;font-weight:700;color:#f8fafc;letter-spacing:-0.2px;white-space:nowrap;">Theme Studio</span>
              <span id="agy-studio-mode-badge" style="font-size:9.5px;font-weight:700;padding:1.5px 6px;border-radius:999px;border:1px solid rgba(${accentRgb},0.42);background:rgba(${accentRgb},0.14);color:var(--agy-accent);letter-spacing:0.4px;">
                ${st.bgMode === 'video' ? 'VIDEO' : (st.bgMode === 'motion' ? 'ĐỘNG 60FPS' : 'ẢNH')}
              </span>
            </div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:6px;flex-shrink:0;">
          <select id="agy-studio-preset-dropdown" style="max-width:128px;background:rgba(15,26,48,0.9);border:1px solid rgba(${accentRgb},0.35);color:#e2e8f0;font-size:11px;border-radius:7px;padding:3.5px 6px;cursor:pointer;outline:none;font-weight:500;">
            ${THEME_KEYS.map(k => `<option value="${k}" ${k === st.themeName ? 'selected' : ''}>${k}</option>`).join('')}
          </select>
          <button id="agy-studio-save-btn" type="button" style="background:linear-gradient(135deg, var(--agy-accent) 0%, #2563EB 100%);border:none;border-radius:7px;padding:4px 10px;font-size:11px;font-weight:700;color:#06101a;cursor:pointer;box-shadow:0 2px 10px rgba(${accentRgb},0.32);">
            Lưu
          </button>
          <button id="agy-studio-close-btn" type="button" title="Đóng (Esc)" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);color:#cbd5e1;cursor:pointer;width:26px;height:26px;border-radius:7px;display:flex;align-items:center;justify-content:center;">
            ${SVG_ICONS.close}
          </button>
        </div>
      </div>

      <!-- Tab Bar -->
      <div id="agy-studio-tabs" style="display:flex;gap:3px;padding:7px 10px;border-bottom:1px solid rgba(255,255,255,0.08);background:rgba(8,13,24,0.72);flex-shrink:0;overflow-x:auto;">
        ${tabs.map(t => `
          <button class="agy-tab-btn" data-tab="${t.id}" type="button" style="flex-shrink:0;padding:4.5px 9px;font-size:11px;border-radius:7px;border:1px solid transparent;background:transparent;color:#94a3b8;cursor:pointer;transition:all 0.14s ease;">
            ${t.label}
          </button>
        `).join('')}
      </div>

      <!-- Body -->
      <div id="agy-studio-body" style="flex:1;overflow-y:auto;padding:13px 15px;display:flex;flex-direction:column;gap:13px;"></div>

      <!-- Footer -->
      <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 14px;border-top:1px solid rgba(255,255,255,0.08);background:rgba(7,12,22,0.92);flex-shrink:0;font-size:11px;gap:8px;">
        <div id="agy-studio-toast-msg" style="color:var(--agy-accent);font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;transition:opacity 0.25s ease;">
          Theme Studio Pro sẵn sàng • Hỗ trợ Nền Video 60 FPS
        </div>
        <div style="color:#64748B;font-size:10px;flex-shrink:0;">Ctrl+Alt+K</div>
      </div>
    `;

    drawer.querySelector('#agy-studio-close-btn').addEventListener('click', () => toggleThemeStudio(false));
    drawer.querySelector('#agy-studio-save-btn').addEventListener('click', () => {
      saveStateToStorage(getState());
      showStudioToast('Đã lưu vĩnh viễn toàn bộ cấu hình giao diện & video!');
    });
    drawer.querySelector('#agy-studio-preset-dropdown').addEventListener('change', (e) => {
      const thName = e.target.value;
      applyTheme({ themeName: thName, bubbleName: thName, customColors: {} });
      showStudioToast(`Đã đổi sang bộ giao diện: ${thName}`);
      renderActiveTab();
    });
    drawer.querySelectorAll('.agy-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeStudioTab = btn.dataset.tab;
        renderActiveTab();
      });
    });

    return drawer;
  }

  function renderActiveTab() {
    const drawer = document.getElementById('agy-theme-studio-drawer');
    if (!drawer) return;
    const st = getState();
    const th = THEMES[st.themeName] || THEMES[DEFAULT_THEME_KEY];
    const accent = (st.customColors && st.customColors.primary) || th.primary || '#73DACA';
    const accentRgb = hexToRgb(accent, '115, 218, 202');

    drawer.querySelectorAll('.agy-tab-btn').forEach(b => {
      const isAct = b.dataset.tab === activeStudioTab;
      b.style.border = isAct ? `1px solid rgba(${accentRgb}, 0.45)` : '1px solid transparent';
      b.style.background = isAct ? `rgba(${accentRgb}, 0.16)` : 'transparent';
      b.style.color = isAct ? accent : '#94a3b8';
      b.style.fontWeight = isAct ? '600' : '400';
    });

    const body = drawer.querySelector('#agy-studio-body');
    if (!body) return;

    if (activeStudioTab === 'video') renderVideoTab(body, accent, accentRgb);
    else if (activeStudioTab === 'profile') renderProfileTab(body, accent, accentRgb);
    else if (activeStudioTab === 'wallpaper') renderWallpaperTab(body, accent, accentRgb);
    else if (activeStudioTab === 'glass') renderGlassTab(body, accent, accentRgb);
    else if (activeStudioTab === 'color') renderColorTab(body, accent, accentRgb);
    else if (activeStudioTab === 'advanced') renderAdvancedTab(body, accent, accentRgb);
  }

  // -------------------------------------------------------------------------
  // TAB 1: NỀN VIDEO & HIỆU ỨNG ĐỘNG 60 FPS (NEW FLAGSHIP STUDIO)
  // -------------------------------------------------------------------------
  function renderVideoTab(container, accent, accentRgb) {
    const st = getState();
    const modeBtns = [
      { id: 'image', label: 'Ảnh tĩnh' },
      { id: 'video', label: 'Nền Video' },
      { id: 'motion', label: 'Cảnh Động 60 FPS' },
    ];

    container.innerHTML = `
      <!-- Background Mode Segmented Control -->
      <div>
        <div style="font-size:10.5px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.6px;margin-bottom:7px;">
          CHẾ ĐỘ NỀN HIỂN THỊ
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:5px;padding:4px;border-radius:10px;background:rgba(15,23,42,0.8);border:1px solid rgba(255,255,255,0.08);">
          ${modeBtns.map(m => {
            const act = st.bgMode === m.id;
            return `
              <button class="agy-bgmode-btn" data-mode="${m.id}" type="button" style="padding:6px 4px;border-radius:7px;font-size:11px;font-weight:${act ? '700' : '500'};cursor:pointer;transition:all 0.15s ease;${
                act
                  ? `background:rgba(${accentRgb},0.22);border:1px solid rgba(${accentRgb},0.55);color:${accent};box-shadow:0 0 12px rgba(${accentRgb},0.18);`
                  : 'background:transparent;border:1px solid transparent;color:#94a3b8;'
              }">${m.label}</button>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Video Upload & Drag-Drop Zone -->
      <div id="agy-video-dropzone" style="border:1.5px dashed rgba(${accentRgb},0.48);border-radius:12px;padding:14px 12px;background:linear-gradient(145deg, rgba(${accentRgb},0.08) 0%, rgba(15,23,42,0.72) 100%);text-align:center;transition:all 0.16s ease;">
        <div style="display:flex;align-items:center;justify-content:center;gap:8px;color:${accent};margin-bottom:5px;">
          ${SVG_ICONS.upload}
          <span style="font-size:12.5px;font-weight:700;">Tải hoặc Kéo thả Video MP4 / WebM / MOV</span>
        </div>
        <div style="font-size:10.5px;color:#94a3b8;margin-bottom:9px;">
          Lưu trực tiếp lên ổ cứng qua Daemon • Tự động phát lại sau khi mở lại Antigravity (hỗ trợ tối đa 500 MB)
        </div>
        <label style="display:inline-flex;align-items:center;gap:6px;padding:6px 14px;border-radius:8px;background:linear-gradient(135deg, ${accent} 0%, #2563EB 100%);color:#06101a;font-size:11.5px;font-weight:700;cursor:pointer;box-shadow:0 3px 12px rgba(${accentRgb},0.3);">
          ${SVG_ICONS.video}
          <span>Chọn file Video từ máy</span>
          <input id="agy-video-file-input" type="file" accept="video/mp4,video/webm,video/quicktime,video/ogg,.mp4,.webm,.mov,.mkv" style="display:none;" />
        </label>
      </div>

      <!-- Local Path or Direct URL Loader -->
      <div style="background:rgba(15,23,42,0.72);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:10px 11px;">
        <div style="font-size:10.5px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:6px;">
          ĐƯỜNG DẪN VIDEO TRÊN MÁY HOẶC LINK TRỰC TIẾP
        </div>
        <div style="display:flex;gap:6px;">
          <input id="agy-video-url-input" type="text" value="${(st.videoUrl || '').replace(/"/g, '&quot;')}" placeholder="Ví dụ: D:\\Videos\\anime.mp4 hoặc https://.../bg.mp4" style="flex:1;min-width:0;background:rgba(6,10,18,0.8);border:1px solid rgba(255,255,255,0.12);border-radius:7px;padding:6px 8px;color:#e2e8f0;font-size:11px;outline:none;" />
          <button id="agy-video-url-apply" type="button" style="padding:6px 11px;border-radius:7px;background:rgba(${accentRgb},0.20);border:1px solid rgba(${accentRgb},0.48);color:${accent};font-size:11px;font-weight:600;cursor:pointer;flex-shrink:0;">
            Áp dụng
          </button>
        </div>
      </div>

      <!-- Video Playback Deck -->
      <div style="background:rgba(15,23,42,0.76);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:10px 12px;display:flex;flex-direction:column;gap:9px;">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;">
          <div style="min-width:0;">
            <div style="font-size:10px;color:#64748b;text-transform:uppercase;font-weight:700;">VIDEO ĐANG CHỌN</div>
            <div style="font-size:11.5px;color:#e2e8f0;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
              ${st.videoName || (st.videoUrl ? 'Video tùy chỉnh' : 'Chưa chọn file video')}
            </div>
          </div>
          <div style="display:flex;gap:5px;flex-shrink:0;">
            <button id="agy-vid-play-btn" type="button" style="display:inline-flex;align-items:center;gap:4px;padding:5px 9px;border-radius:7px;background:rgba(${accentRgb},0.16);border:1px solid rgba(${accentRgb},0.42);color:${accent};font-size:11px;font-weight:600;cursor:pointer;">
              ${st.videoPaused ? SVG_ICONS.play : SVG_ICONS.pause}
              <span>${st.videoPaused ? 'Phát' : 'Tạm dừng'}</span>
            </button>
            <button id="agy-vid-mute-btn" type="button" title="Bật/Tắt tiếng" style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:7px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);color:${st.videoMuted ? '#94a3b8' : accent};cursor:pointer;">
              ${st.videoMuted ? SVG_ICONS.mute : SVG_ICONS.volume}
            </button>
          </div>
        </div>

        <!-- Speed & Fit row -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          <div>
            <div style="display:flex;justify-content:space-between;font-size:10.5px;color:#cbd5e1;margin-bottom:3px;">
              <span>Tốc độ phát</span>
              <span id="agy-vid-speed-val" style="font-family:monospace;color:${accent};">${st.videoSpeed.toFixed(2)}x</span>
            </div>
            <input id="agy-vid-speed" type="range" min="0.25" max="2.0" step="0.05" value="${st.videoSpeed}" style="width:100%;accent-color:${accent};cursor:pointer;height:4px;" />
          </div>
          <div>
            <div style="display:flex;justify-content:space-between;font-size:10.5px;color:#cbd5e1;margin-bottom:3px;">
              <span>Âm lượng</span>
              <span id="agy-vid-vol-val" style="font-family:monospace;color:${accent};">${st.videoMuted ? 'Tắt' : st.videoVolume + '%'}</span>
            </div>
            <input id="agy-vid-vol" type="range" min="0" max="100" value="${st.videoMuted ? 0 : st.videoVolume}" style="width:100%;accent-color:${accent};cursor:pointer;height:4px;" />
          </div>
        </div>

        <!-- Cinematic Filters -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;padding-top:4px;border-top:1px solid rgba(255,255,255,0.06);">
          <div>
            <div style="display:flex;justify-content:space-between;font-size:10.5px;color:#cbd5e1;margin-bottom:3px;">
              <span>Độ tối lớp phủ</span>
              <span id="agy-vid-dim-val" style="font-family:monospace;color:${accent};">${st.dimming}%</span>
            </div>
            <input id="agy-vid-dim" type="range" min="10" max="90" value="${st.dimming}" style="width:100%;accent-color:${accent};cursor:pointer;height:4px;" />
          </div>
          <div>
            <div style="display:flex;justify-content:space-between;font-size:10.5px;color:#cbd5e1;margin-bottom:3px;">
              <span>Làm mờ nhẹ Video</span>
              <span id="agy-vid-blur-val" style="font-family:monospace;color:${accent};">${st.videoBlur}px</span>
            </div>
            <input id="agy-vid-blur" type="range" min="0" max="12" step="0.5" value="${st.videoBlur}" style="width:100%;accent-color:${accent};cursor:pointer;height:4px;" />
          </div>
          <div>
            <div style="display:flex;justify-content:space-between;font-size:10.5px;color:#cbd5e1;margin-bottom:3px;">
              <span>Độ sáng</span>
              <span id="agy-vid-bright-val" style="font-family:monospace;color:${accent};">${st.videoBrightness}%</span>
            </div>
            <input id="agy-vid-bright" type="range" min="50" max="140" value="${st.videoBrightness}" style="width:100%;accent-color:${accent};cursor:pointer;height:4px;" />
          </div>
          <div>
            <div style="display:flex;justify-content:space-between;font-size:10.5px;color:#cbd5e1;margin-bottom:3px;">
              <span>Độ rực màu</span>
              <span id="agy-vid-sat-val" style="font-family:monospace;color:${accent};">${st.videoSaturate}%</span>
            </div>
            <input id="agy-vid-sat" type="range" min="50" max="180" value="${st.videoSaturate}" style="width:100%;accent-color:${accent};cursor:pointer;height:4px;" />
          </div>
        </div>

        <div style="display:flex;justify-content:space-between;align-items:center;font-size:11px;color:#cbd5e1;padding-top:4px;border-top:1px solid rgba(255,255,255,0.06);">
          <label style="display:flex;align-items:center;gap:6px;cursor:pointer;">
            <input id="agy-vid-autopause" type="checkbox" ${st.videoAutoPause ? 'checked' : ''} style="accent-color:${accent};cursor:pointer;" />
            <span>Tự tạm dừng khi ẩn cửa sổ (Tiết kiệm GPU)</span>
          </label>
          <select id="agy-vid-fit" style="background:rgba(8,14,26,0.9);border:1px solid rgba(255,255,255,0.14);color:#e2e8f0;font-size:10.5px;border-radius:6px;padding:2px 6px;cursor:pointer;">
            <option value="cover" ${st.videoFit === 'cover' ? 'selected' : ''}>Phủ đầy (Cover)</option>
            <option value="contain" ${st.videoFit === 'contain' ? 'selected' : ''}>Vừa khung (Contain)</option>
          </select>
        </div>
      </div>

      <!-- Saved Video Library -->
      <div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <span style="font-size:10.5px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;">
            THƯ VIỆN VIDEO ĐÃ LƯU
          </span>
          <span id="agy-media-srv-badge" style="font-size:10px;color:${mediaServerOnline ? '#34D399' : '#94a3b8'};">
            ${mediaServerOnline ? 'Máy chủ Media: Trực tuyến' : 'Đang kiểm tra thư viện...'}
          </span>
        </div>
        <div id="agy-video-library-list" style="display:flex;flex-direction:column;gap:5px;"></div>
      </div>

      <!-- Live 60 FPS Ambient Motion FX -->
      <div style="border-top:1px solid rgba(255,255,255,0.08);padding-top:10px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:7px;">
          <span style="font-size:10.5px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;">
            HIỆU ỨNG ĐỘNG 60 FPS (PHỦ TRÊN ẢNH / VIDEO)
          </span>
          <span id="agy-fx-int-val" style="font-family:monospace;font-size:10.5px;color:${accent};">Mật độ ${st.fxIntensity}%</span>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:8px;">
          ${FX_PRESETS.map(fx => {
            const act = st.fxPreset === fx.id;
            return `
              <button class="agy-fx-btn" data-fx="${fx.id}" type="button" style="display:flex;flex-direction:column;align-items:flex-start;gap:2px;padding:7px 9px;border-radius:8px;cursor:pointer;text-align:left;transition:all 0.14s ease;${
                act
                  ? `background:rgba(${accentRgb},0.16);border:1.5px solid ${accent};color:${accent};`
                  : 'background:rgba(15,23,42,0.68);border:1px solid rgba(255,255,255,0.08);color:#cbd5e1;'
              }">
                <div style="display:flex;align-items:center;gap:6px;font-size:11.5px;font-weight:600;">
                  <span style="width:7px;height:7px;border-radius:50%;background:${fx.dot};box-shadow:0 0 6px ${fx.dot};flex-shrink:0;"></span>
                  <span>${fx.name}</span>
                </div>
                <span style="font-size:9.8px;color:#94a3b8;line-height:1.25;">${fx.desc}</span>
              </button>
            `;
          }).join('')}
        </div>
        <input id="agy-fx-intensity" type="range" min="20" max="100" value="${st.fxIntensity}" style="width:100%;accent-color:${accent};cursor:pointer;height:4px;" />
      </div>
    `;

    // Bind Background Mode
    container.querySelectorAll('.agy-bgmode-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const mode = btn.dataset.mode;
        if (mode === 'video' && !getState().videoUrl && videoLibraryCache.length > 0) {
          const first = videoLibraryCache[0];
          applyTheme({ bgMode: 'video', wpEnabled: true, videoUrl: first.url, videoName: first.name, videoPaused: false });
          showStudioToast(`Đang phát video trong thư viện: ${first.name}`);
        } else {
          applyTheme({ bgMode: mode, wpEnabled: true });
          showStudioToast(
            mode === 'video' ? 'Đã bật chế độ Nền Video' :
            mode === 'motion' ? 'Đã bật chế độ Cảnh Động 60 FPS' : 'Đã chuyển về chế độ Ảnh tĩnh'
          );
        }
        renderActiveTab();
      });
    });

    // File input & Drag-Drop
    const fileInput = container.querySelector('#agy-video-file-input');
    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        const f = e.target.files && e.target.files[0];
        if (f) uploadVideoFile(f);
      });
    }
    const dropzone = container.querySelector('#agy-video-dropzone');
    if (dropzone) {
      dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.style.background = `rgba(${accentRgb}, 0.22)`;
        dropzone.style.borderColor = accent;
      });
      dropzone.addEventListener('dragleave', () => {
        dropzone.style.background = `linear-gradient(145deg, rgba(${accentRgb},0.08) 0%, rgba(15,23,42,0.72) 100%)`;
      });
      dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.style.background = `linear-gradient(145deg, rgba(${accentRgb},0.08) 0%, rgba(15,23,42,0.72) 100%)`;
        const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
        if (f) uploadVideoFile(f);
      });
    }

    // URL / Path loader
    const urlInput = container.querySelector('#agy-video-url-input');
    const urlApply = container.querySelector('#agy-video-url-apply');
    if (urlApply && urlInput) {
      urlApply.addEventListener('click', () => applyVideoPathOrUrl(urlInput.value));
      urlInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') applyVideoPathOrUrl(urlInput.value);
      });
    }

    // Playback deck handlers
    const playBtn = container.querySelector('#agy-vid-play-btn');
    if (playBtn) {
      playBtn.addEventListener('click', () => {
        const cur = getState();
        applyTheme({ videoPaused: !cur.videoPaused });
        renderActiveTab();
      });
    }
    const muteBtn = container.querySelector('#agy-vid-mute-btn');
    if (muteBtn) {
      muteBtn.addEventListener('click', () => {
        const cur = getState();
        const nextMuted = !cur.videoMuted;
        applyTheme({ videoMuted: nextMuted, videoVolume: nextMuted ? cur.videoVolume : Math.max(25, cur.videoVolume) });
        renderActiveTab();
      });
    }
    const bindSlider = (sel, valSel, key, fmt, parser = (v) => parseInt(v, 10)) => {
      const sl = container.querySelector(sel);
      const vl = container.querySelector(valSel);
      if (sl && vl) {
        sl.addEventListener('input', (e) => {
          const v = parser(e.target.value);
          vl.textContent = fmt(v);
          const patch = { [key]: v };
          if (key === 'videoVolume') patch.videoMuted = v <= 0;
          applyTheme(patch);
        });
      }
    };
    bindSlider('#agy-vid-speed', '#agy-vid-speed-val', 'videoSpeed', v => `${v.toFixed(2)}x`, parseFloat);
    bindSlider('#agy-vid-vol', '#agy-vid-vol-val', 'videoVolume', v => (v <= 0 ? 'Tắt' : `${v}%`));
    bindSlider('#agy-vid-dim', '#agy-vid-dim-val', 'dimming', v => `${v}%`);
    bindSlider('#agy-vid-blur', '#agy-vid-blur-val', 'videoBlur', v => `${v}px`, parseFloat);
    bindSlider('#agy-vid-bright', '#agy-vid-bright-val', 'videoBrightness', v => `${v}%`);
    bindSlider('#agy-vid-sat', '#agy-vid-sat-val', 'videoSaturate', v => `${v}%`);
    bindSlider('#agy-fx-intensity', '#agy-fx-int-val', 'fxIntensity', v => `Mật độ ${v}%`);

    const autoPauseCb = container.querySelector('#agy-vid-autopause');
    if (autoPauseCb) {
      autoPauseCb.addEventListener('change', (e) => applyTheme({ videoAutoPause: e.target.checked }));
    }
    const fitSel = container.querySelector('#agy-vid-fit');
    if (fitSel) {
      fitSel.addEventListener('change', (e) => applyTheme({ videoFit: e.target.value }));
    }

    container.querySelectorAll('.agy-fx-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const fx = btn.dataset.fx;
        applyTheme({ fxPreset: fx, wpEnabled: true });
        const item = FX_PRESETS.find(x => x.id === fx);
        showStudioToast(fx === 'none' ? 'Đã tắt hiệu ứng hạt động' : `Đã bật hiệu ứng: ${item ? item.name : fx}`);
        renderActiveTab();
      });
    });

    // Populate Video Library async from local media daemon
    const listEl = container.querySelector('#agy-video-library-list');
    const srvBadge = container.querySelector('#agy-media-srv-badge');
    const renderLibList = (items) => {
      if (!listEl) return;
      if (srvBadge) {
        srvBadge.textContent = mediaServerOnline ? `Máy chủ Media: Sẵn sàng (${items.length} video)` : 'Máy chủ Media: Ngoại tuyến';
        srvBadge.style.color = mediaServerOnline ? '#34D399' : '#f87171';
      }
      if (!items.length) {
        listEl.innerHTML = `<div style="font-size:11px;color:#64748b;padding:8px 10px;border-radius:8px;background:rgba(15,23,42,0.5);border:1px solid rgba(255,255,255,0.06);">Chưa có video nào được lưu. Hãy chọn file MP4/WebM ở khung trên để thêm vào thư viện.</div>`;
        return;
      }
      const curUrl = getState().videoUrl;
      listEl.innerHTML = items.map(v => {
        const active = curUrl === v.url && getState().bgMode === 'video';
        return `
          <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;padding:7px 10px;border-radius:8px;background:${active ? `rgba(${accentRgb},0.16)` : 'rgba(15,23,42,0.68)'};border:1px solid ${active ? accent : 'rgba(255,255,255,0.08)'};">
            <button class="agy-lib-play" data-url="${v.url}" data-name="${v.name}" type="button" style="flex:1;min-width:0;background:none;border:none;color:${active ? accent : '#e2e8f0'};cursor:pointer;display:flex;align-items:center;gap:8px;text-align:left;padding:0;">
              <span style="color:${accent};flex-shrink:0;">${active ? SVG_ICONS.check : SVG_ICONS.video}</span>
              <span style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:11.5px;font-weight:${active ? '700' : '500'};">${v.name}</span>
              <span style="font-size:10px;color:#94a3b8;font-family:monospace;flex-shrink:0;">${formatBytes(v.size)}</span>
            </button>
            <button class="agy-lib-del" data-name="${v.name}" type="button" title="Xóa video này" style="background:rgba(239,68,68,0.12);border:1px solid rgba(239,68,68,0.28);color:#fca5a5;border-radius:6px;width:24px;height:24px;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;">
              ${SVG_ICONS.trash}
            </button>
          </div>
        `;
      }).join('');

      listEl.querySelectorAll('.agy-lib-play').forEach(b => {
        b.addEventListener('click', () => {
          applyTheme({ wpEnabled: true, bgMode: 'video', videoUrl: b.dataset.url, videoName: b.dataset.name, videoPaused: false });
          showStudioToast(`Đang phát nền video: ${b.dataset.name}`);
          renderActiveTab();
        });
      });
      listEl.querySelectorAll('.agy-lib-del').forEach(b => {
        b.addEventListener('click', async () => {
          const name = b.dataset.name;
          try {
            await fetch(`${MEDIA_BASE()}/videos/${encodeURIComponent(name)}`, { method: 'DELETE' });
            const cur = getState();
            if (cur.videoName === name) {
              applyTheme({ bgMode: 'image', videoUrl: '', videoName: '' });
            }
            const next = await refreshVideoLibrary();
            renderLibList(next);
            showStudioToast(`Đã xóa video: ${name}`);
          } catch (_) {}
        });
      });
    };

    renderLibList(videoLibraryCache);
    refreshVideoLibrary().then(renderLibList);
  }

  // -------------------------------------------------------------------------
  // TAB 2: HỒ SƠ GIAO DIỆN (12 LUXURY PRESETS)
  // -------------------------------------------------------------------------
  function renderProfileTab(container, accent, accentRgb) {
    const st = getState();
    container.innerHTML = `
      <div style="font-size:10.5px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;">
        BỘ SƯU TẬP GIAO DIỆN CAO CẤP (${THEME_KEYS.length} BẢN MẪU)
      </div>
      <div style="display:flex;flex-direction:column;gap:7px;">
        ${THEME_KEYS.map(k => {
          const t = THEMES[k] || {};
          const isSel = k === st.themeName;
          return `
            <div class="agy-preset-card" data-name="${k}" style="border-radius:11px;border:${
              isSel ? `1.5px solid ${t.primary || accent}` : '1px solid rgba(255,255,255,0.09)'
            };background:${isSel ? `rgba(${hexToRgb(t.primary, accentRgb)}, 0.14)` : 'rgba(15,23,42,0.68)'};padding:10px 13px;cursor:pointer;transition:all 0.15s ease;">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:3px;">
                <div style="display:flex;align-items:center;gap:7px;">
                  <span style="width:9px;height:9px;border-radius:50%;background:${t.primary || '#73DACA'};box-shadow:0 0 8px ${t.primary || '#73DACA'};"></span>
                  <span style="font-size:12.5px;font-weight:700;color:${isSel ? (t.primary || accent) : '#f1f5f9'};">${k}</span>
                </div>
                ${isSel ? `<span style="font-size:10px;padding:2px 7px;border-radius:999px;background:rgba(${hexToRgb(t.primary, accentRgb)},0.22);color:${t.primary || accent};font-weight:700;">Đang dùng</span>` : ''}
              </div>
              <div style="font-size:10.5px;color:#94a3b8;margin-bottom:7px;">${t.concept || ''}</div>
              <div style="height:4px;border-radius:999px;background:${t.frameBg || `linear-gradient(90deg, ${t.primary || accent}, ${t.secondary || '#38bdf8'})`};"></div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    container.querySelectorAll('.agy-preset-card').forEach(card => {
      card.addEventListener('click', () => {
        const thName = card.dataset.name;
        applyTheme({ themeName: thName, bubbleName: thName, customColors: {} });
        showStudioToast(`Đã kích hoạt bộ giao diện: ${thName}`);
        renderActiveTab();
      });
    });
  }

  // -------------------------------------------------------------------------
  // TAB 3: HÌNH NỀN TĨNH
  // -------------------------------------------------------------------------
  function renderWallpaperTab(container, accent, accentRgb) {
    const st = getState();
    container.innerHTML = `
      <div style="font-size:10.5px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;">
        CÀI ĐẶT HÌNH NỀN TĨNH & ĐỘ TỐI
      </div>
      <div style="display:flex;flex-direction:column;gap:12px;background:rgba(15,23,42,0.72);border:1px solid rgba(255,255,255,0.08);border-radius:11px;padding:12px 14px;">
        <label style="display:flex;align-items:center;justify-content:space-between;font-size:12px;color:#e2e8f0;cursor:pointer;">
          <span>Bật hệ thống hình nền ứng dụng</span>
          <input id="agy-tab-wp-toggle" type="checkbox" ${st.wpEnabled ? 'checked' : ''} style="accent-color:${accent};cursor:pointer;width:16px;height:16px;" />
        </label>
        <div>
          <div style="display:flex;justify-content:space-between;font-size:11.5px;color:#cbd5e1;margin-bottom:5px;">
            <span>Độ tối lớp phủ ảnh nền (Dimming)</span>
            <span id="agy-tab-dim-val" style="font-family:monospace;color:${accent};">${st.dimming}%</span>
          </div>
          <input id="agy-tab-dim-slider" type="range" min="10" max="92" value="${st.dimming}" style="width:100%;cursor:pointer;accent-color:${accent};height:5px;" />
        </div>
        <div style="display:flex;gap:8px;">
          <label style="flex:1;padding:7px 12px;border-radius:8px;background:rgba(${accentRgb},0.16);border:1px solid rgba(${accentRgb},0.42);color:${accent};font-size:11.5px;font-weight:600;cursor:pointer;text-align:center;">
            Tải ảnh nền riêng
            <input id="agy-tab-wp-upload" type="file" accept="image/*" style="display:none;" />
          </label>
          <button id="agy-tab-wp-reset" type="button" style="flex:1;padding:7px 12px;border-radius:8px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);color:#cbd5e1;font-size:11.5px;cursor:pointer;">
            Dùng ảnh mặc định
          </button>
        </div>
      </div>
    `;

    container.querySelector('#agy-tab-wp-toggle')?.addEventListener('change', (e) => {
      applyTheme({ wpEnabled: e.target.checked });
      showStudioToast(e.target.checked ? 'Đã bật hình nền' : 'Đã tắt hình nền');
    });
    const dimSlider = container.querySelector('#agy-tab-dim-slider');
    const dimVal = container.querySelector('#agy-tab-dim-val');
    if (dimSlider && dimVal) {
      dimSlider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        dimVal.textContent = `${val}%`;
        applyTheme({ dimming: val });
      });
    }
    container.querySelector('#agy-tab-wp-upload')?.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        applyTheme({ customWp: String(ev.target.result || ''), wpEnabled: true, bgMode: 'image' });
        showStudioToast('Đã áp dụng ảnh nền tùy chỉnh');
      };
      reader.readAsDataURL(file);
    });
    container.querySelector('#agy-tab-wp-reset')?.addEventListener('click', () => {
      applyTheme({ customWp: '', bgMode: 'image', wpEnabled: true });
      showStudioToast('Đã khôi phục ảnh nền mặc định WLOP Cosmic');
    });
  }

  // -------------------------------------------------------------------------
  // TAB 4: KÍNH, VIỀN PHÁT SÁNG & KHUNG NHẬP
  // -------------------------------------------------------------------------
  function renderGlassTab(container, accent, accentRgb) {
    const st = getState();
    container.innerHTML = `
      <div style="font-size:10.5px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;">
        HIỆU ỨNG KÍNH MỜ, THẺ CHAT & VIỀN NEON
      </div>
      <div style="display:flex;flex-direction:column;gap:11px;background:rgba(15,23,42,0.72);border:1px solid rgba(255,255,255,0.08);border-radius:11px;padding:12px 14px;">
        <div>
          <div style="display:flex;justify-content:space-between;font-size:11.5px;color:#cbd5e1;margin-bottom:4px;">
            <span>Độ mờ kính Pre-baked (60 FPS)</span>
            <span id="agy-tab-blur-val" style="font-family:monospace;color:${accent};">${st.glassBlur}px</span>
          </div>
          <input id="agy-tab-blur-slider" type="range" min="0" max="16" value="${st.glassBlur}" style="width:100%;cursor:pointer;accent-color:${accent};height:4px;" />
        </div>
        <div>
          <div style="display:flex;justify-content:space-between;font-size:11.5px;color:#cbd5e1;margin-bottom:4px;">
            <span>Độ đặc nền thẻ tin nhắn AI</span>
            <span id="agy-tab-cardop-val" style="font-family:monospace;color:${accent};">${st.cardOpacity}%</span>
          </div>
          <input id="agy-tab-cardop-slider" type="range" min="35" max="95" value="${st.cardOpacity}" style="width:100%;cursor:pointer;accent-color:${accent};height:4px;" />
        </div>
        <div>
          <div style="font-size:11.5px;color:#cbd5e1;margin-bottom:6px;">Cường độ phát sáng viền Neon</div>
          <div style="display:grid;grid-template-columns:repeat(4, 1fr);gap:5px;">
            ${Object.keys(GLOW_LEVELS).map(k => {
              const act = st.glowLevel === k;
              return `
                <button class="agy-glow-btn" data-level="${k}" type="button" style="padding:5px 4px;border-radius:7px;font-size:11px;font-weight:${act ? '700' : '500'};cursor:pointer;${
                  act
                    ? `background:rgba(${accentRgb},0.22);border:1px solid ${accent};color:${accent};`
                    : 'background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:#94a3b8;'
                }">${GLOW_LEVELS[k].label}</button>
              `;
            }).join('')}
          </div>
        </div>
        <label style="display:flex;align-items:center;justify-content:space-between;font-size:11.5px;color:#cbd5e1;cursor:pointer;padding-top:4px;border-top:1px solid rgba(255,255,255,0.06);">
          <span>Hiển thị hoa văn trang trí trên bong bóng & khung nhập</span>
          <input id="agy-tab-orn-cb" type="checkbox" ${st.showOrnaments ? 'checked' : ''} style="accent-color:${accent};cursor:pointer;width:15px;height:15px;" />
        </label>
      </div>

      <div style="font-size:10.5px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;margin-top:4px;">
        KIỂU DÁNG KHUNG NHẬP TIN NHẮN
      </div>
      <div style="display:flex;flex-direction:column;gap:6px;">
        ${Object.keys(INPUT_STYLES).map(k => {
          const item = INPUT_STYLES[k];
          const isSel = st.inputStyle === k;
          return `
            <div class="agy-input-style-card" data-style="${k}" style="padding:8px 12px;border-radius:9px;cursor:pointer;transition:all 0.14s ease;${
              isSel
                ? `background:rgba(${accentRgb},0.16);border:1.5px solid ${accent};`
                : 'background:rgba(15,23,42,0.68);border:1px solid rgba(255,255,255,0.08);'
            }">
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <span style="font-size:12px;font-weight:600;color:${isSel ? accent : '#e2e8f0'};">${item.label}</span>
                ${isSel ? `<span style="color:${accent};">${SVG_ICONS.check}</span>` : ''}
              </div>
              <div style="font-size:10.5px;color:#94a3b8;margin-top:2px;">${item.desc}</div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    const blurSl = container.querySelector('#agy-tab-blur-slider');
    const blurVl = container.querySelector('#agy-tab-blur-val');
    if (blurSl && blurVl) {
      blurSl.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        blurVl.textContent = `${val}px`;
        applyTheme({ glassBlur: val });
      });
    }
    const cardSl = container.querySelector('#agy-tab-cardop-slider');
    const cardVl = container.querySelector('#agy-tab-cardop-val');
    if (cardSl && cardVl) {
      cardSl.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        cardVl.textContent = `${val}%`;
        applyTheme({ cardOpacity: val });
      });
    }
    container.querySelectorAll('.agy-glow-btn').forEach(b => {
      b.addEventListener('click', () => {
        applyTheme({ glowLevel: b.dataset.level });
        showStudioToast(`Đã đặt cường độ viền phát sáng: ${GLOW_LEVELS[b.dataset.level].label}`);
        renderActiveTab();
      });
    });
    container.querySelector('#agy-tab-orn-cb')?.addEventListener('change', (e) => {
      applyTheme({ showOrnaments: e.target.checked });
    });
    container.querySelectorAll('.agy-input-style-card').forEach(card => {
      card.addEventListener('click', () => {
        const styleKey = card.dataset.style;
        applyTheme({ inputStyle: styleKey });
        showStudioToast(`Đã chọn kiểu khung nhập: ${INPUT_STYLES[styleKey].label}`);
        renderActiveTab();
      });
    });
  }

  // -------------------------------------------------------------------------
  // TAB 5: MÀU SẮC LIVE & AVATAR (100% FUNCTIONAL LIVE COLOR OVERRIDES!)
  // -------------------------------------------------------------------------
  function renderColorTab(container, accent, accentRgb) {
    const st = getState();
    const th = THEMES[st.themeName] || THEMES[DEFAULT_THEME_KEY];
    const cc = st.customColors || {};

    const liveColorFields = [
      { key: 'primary', label: 'Màu nhấn chính', val: cc.primary || th.primary || '#73DACA' },
      { key: 'secondary', label: 'Màu phụ Gradient', val: cc.secondary || th.secondary || '#7AA2F7' },
      { key: 'cardBg', label: 'Nền Card AI', val: cc.cardBg || rgbToHex(th.aiCardBg, '#0D1520') },
      { key: 'sidebarBg', label: 'Nền Sidebar', val: cc.sidebarBg || rgbToHex(th.sidebarBg, '#0B121C') },
      { key: 'scrimBg', label: 'Màu phủ Scrim', val: cc.scrimBg || rgbToHex(th.overlayRgb, '#091019') },
      { key: 'mainText', label: 'Màu chữ chính', val: cc.mainText || '#E1EEF4' },
      { key: 'subText', label: 'Màu chữ phụ', val: cc.subText || '#94B8CE' },
      { key: 'bubbleBorder', label: 'Viền Bong bóng', val: cc.bubbleBorder || th.primary || '#73DACA' },
      { key: 'compBorder1', label: 'Viền Composer 1', val: cc.compBorder1 || th.primary || '#73DACA' },
      { key: 'compBorder3', label: 'Viền Composer 2', val: cc.compBorder3 || th.secondary || '#7AA2F7' },
      { key: 'compBg1', label: 'Nền Composer 1', val: cc.compBg1 || '#101B2E' },
      { key: 'compBg2', label: 'Nền Composer 2', val: cc.compBg2 || '#0A121E' },
    ];

    container.innerHTML = `
      <div>
        <div style="font-size:10.5px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:7px;">
          BẢNG MÀU NHANH (GIỮ NGUYÊN HÌNH NỀN & VIDEO)
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">
          ${QUICK_PALETTES.map(p => {
            const isSel = p.theme === st.themeName;
            return `
              <button class="agy-quick-palette-btn" data-theme="${p.theme}" type="button" style="display:flex;align-items:center;gap:7px;padding:6.5px 9px;font-size:11px;font-weight:${isSel ? '700' : '500'};border-radius:8px;cursor:pointer;text-align:left;transition:all 0.14s ease;${
                isSel
                  ? `background:rgba(${hexToRgb(p.dot, accentRgb)},0.18);border:1.5px solid ${p.dot};color:${p.dot};box-shadow:0 0 10px rgba(${hexToRgb(p.dot, accentRgb)},0.22);`
                  : 'background:rgba(15,23,42,0.68);border:1px solid rgba(255,255,255,0.09);color:#cbd5e1;'
              }">
                <span style="width:8px;height:8px;border-radius:50%;background:${p.dot};flex-shrink:0;box-shadow:0 0 6px ${p.dot};"></span>
                <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${p.name}</span>
              </button>
            `;
          }).join('')}
        </div>
      </div>

      <div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:7px;">
          <span style="font-size:10.5px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;">
            TINH CHỈNH MÀU TRỰC TIẾP (LIVE)
          </span>
          <button id="agy-reset-colors-btn" type="button" style="font-size:10px;padding:2px 7px;border-radius:5px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);color:#cbd5e1;cursor:pointer;">
            Đặt lại màu
          </button>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:5px;">
          ${liveColorFields.map(c => `
            <div style="display:flex;align-items:center;justify-content:space-between;background:rgba(15,23,42,0.72);border:1px solid rgba(255,255,255,0.08);border-radius:7px;padding:4.5px 7px;">
              <span style="color:#cbd5e1;font-size:10.5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${c.label}</span>
              <div style="display:flex;align-items:center;gap:4px;flex-shrink:0;">
                <span class="agy-color-hex" style="font-family:monospace;font-size:10px;color:#94a3b8;">${c.val.toUpperCase()}</span>
                <input type="color" class="agy-live-color-picker" data-key="${c.key}" value="${c.val}" style="width:17px;height:17px;border:none;border-radius:3px;cursor:pointer;padding:0;background:none;" />
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Avatar Customization -->
      <div style="border-top:1px solid rgba(255,255,255,0.08);padding-top:10px;">
        <div style="font-size:10.5px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;">
          AVATAR NGƯỜI DÙNG & TRỢ LÝ AI (HỖ TRỢ ẢNH ĐỘNG GIF)
        </div>
        <div style="display:flex;flex-direction:column;gap:9px;background:rgba(15,23,42,0.72);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:10px 12px;">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;">
            <div style="display:flex;align-items:center;gap:8px;">
              <div style="width:32px;height:32px;border-radius:${st.avatarRadius}%;border:1.5px solid ${accent};background:rgba(255,255,255,0.08) ${st.userAvatar ? `url('${st.userAvatar}') center/cover no-repeat` : ''};display:flex;align-items:center;justify-content:center;font-size:11px;color:${accent};flex-shrink:0;">
                ${st.userAvatar ? '' : 'U'}
              </div>
              <label style="padding:4px 8px;border-radius:6px;background:rgba(${accentRgb},0.16);border:1px solid rgba(${accentRgb},0.36);color:${accent};font-size:11px;font-weight:600;cursor:pointer;">
                Ảnh User
                <input id="agy-studio-user-av" type="file" accept="image/*" style="display:none;" />
              </label>
              ${st.userAvatar ? `<button id="agy-clear-user-av" type="button" style="padding:3px 6px;border-radius:5px;background:rgba(239,68,68,0.14);border:1px solid rgba(239,68,68,0.3);color:#fca5a5;font-size:10px;cursor:pointer;">Xóa</button>` : ''}
            </div>
            <div style="display:flex;align-items:center;gap:8px;">
              <div style="width:32px;height:32px;border-radius:${st.avatarRadius}%;border:1.5px solid ${th.secondary || accent};background:rgba(255,255,255,0.08) ${st.agentAvatar ? `url('${st.agentAvatar}') center/cover no-repeat` : ''};display:flex;align-items:center;justify-content:center;font-size:11px;color:${th.secondary || accent};flex-shrink:0;">
                ${st.agentAvatar ? '' : 'AI'}
              </div>
              <label style="padding:4px 8px;border-radius:6px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.16);color:#e2e8f0;font-size:11px;font-weight:600;cursor:pointer;">
                Ảnh AI
                <input id="agy-studio-agent-av" type="file" accept="image/*" style="display:none;" />
              </label>
              ${st.agentAvatar ? `<button id="agy-clear-agent-av" type="button" style="padding:3px 6px;border-radius:5px;background:rgba(239,68,68,0.14);border:1px solid rgba(239,68,68,0.3);color:#fca5a5;font-size:10px;cursor:pointer;">Xóa</button>` : ''}
            </div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
            <div>
              <div style="display:flex;justify-content:space-between;font-size:10.5px;color:#cbd5e1;margin-bottom:3px;">
                <span>Kích thước</span>
                <span id="agy-av-size-val" style="font-family:monospace;color:${accent};">${st.avatarSize}px</span>
              </div>
              <input id="agy-av-size" type="range" min="24" max="48" value="${st.avatarSize}" style="width:100%;accent-color:${accent};cursor:pointer;height:4px;" />
            </div>
            <div>
              <div style="display:flex;justify-content:space-between;font-size:10.5px;color:#cbd5e1;margin-bottom:3px;">
                <span>Bo góc</span>
                <span id="agy-av-rad-val" style="font-family:monospace;color:${accent};">${st.avatarRadius}%</span>
              </div>
              <input id="agy-av-rad" type="range" min="0" max="50" value="${st.avatarRadius}" style="width:100%;accent-color:${accent};cursor:pointer;height:4px;" />
            </div>
          </div>
        </div>
      </div>
    `;

    container.querySelectorAll('.agy-quick-palette-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const pTheme = btn.dataset.theme;
        applyTheme({ themeName: pTheme, bubbleName: pTheme, customColors: {} });
        showStudioToast(`Đã đổi bảng màu: ${pTheme}`);
        renderActiveTab();
      });
    });

    container.querySelector('#agy-reset-colors-btn')?.addEventListener('click', () => {
      applyTheme({ customColors: {} });
      showStudioToast('Đã khôi phục màu mặc định của bảng màu hiện tại');
      renderActiveTab();
    });

    container.querySelectorAll('.agy-live-color-picker').forEach(input => {
      input.addEventListener('input', (e) => {
        const key = e.target.dataset.key;
        const hex = e.target.value;
        const hexSpan = e.target.parentElement.querySelector('.agy-color-hex');
        if (hexSpan) hexSpan.textContent = hex.toUpperCase();
        const cur = getState();
        const nextColors = { ...(cur.customColors || {}), [key]: hex };
        applyTheme({ customColors: nextColors });
      });
    });

    container.querySelector('#agy-studio-user-av')?.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      processAvatarUpload(file, (dataUrl) => {
        applyTheme({ userAvatar: dataUrl });
        showStudioToast('Đã cập nhật ảnh đại diện người dùng');
        renderActiveTab();
      });
    });
    container.querySelector('#agy-studio-agent-av')?.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      processAvatarUpload(file, (dataUrl) => {
        applyTheme({ agentAvatar: dataUrl });
        showStudioToast('Đã cập nhật ảnh đại diện AI');
        renderActiveTab();
      });
    });
    container.querySelector('#agy-clear-user-av')?.addEventListener('click', () => {
      applyTheme({ userAvatar: '' });
      renderActiveTab();
    });
    container.querySelector('#agy-clear-agent-av')?.addEventListener('click', () => {
      applyTheme({ agentAvatar: '' });
      renderActiveTab();
    });

    const avSizeSl = container.querySelector('#agy-av-size');
    const avSizeVl = container.querySelector('#agy-av-size-val');
    if (avSizeSl && avSizeVl) {
      avSizeSl.addEventListener('input', (e) => {
        const v = parseInt(e.target.value, 10);
        avSizeVl.textContent = `${v}px`;
        applyTheme({ avatarSize: v });
      });
    }
    const avRadSl = container.querySelector('#agy-av-rad');
    const avRadVl = container.querySelector('#agy-av-rad-val');
    if (avRadSl && avRadVl) {
      avRadSl.addEventListener('input', (e) => {
        const v = parseInt(e.target.value, 10);
        avRadVl.textContent = `${v}%`;
        applyTheme({ avatarRadius: v });
      });
    }
  }

  // -------------------------------------------------------------------------
  // TAB 6: NÂNG CAO & CHẨN ĐOÁN HIỆU NĂNG
  // -------------------------------------------------------------------------
  function renderAdvancedTab(container, accent, accentRgb) {
    const st = getState();
    const vidEl = document.getElementById('agy-bg-video');
    const vidInfo = (vidEl && vidEl.videoWidth > 0)
      ? `${vidEl.videoWidth}x${vidEl.videoHeight} (${vidEl.paused ? 'Tạm dừng' : 'Đang phát'})`
      : 'Không phát video';

    container.innerHTML = `
      <div style="font-size:10.5px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;">
        TRẠNG THÁI ĐỘNG CƠ ĐỒ HỌA
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;font-size:11px;">
        <div style="background:rgba(15,23,42,0.72);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:8px 10px;">
          <div style="color:#64748b;font-size:10px;">Chế độ nền</div>
          <div style="color:${accent};font-weight:700;margin-top:2px;">${st.bgMode.toUpperCase()}</div>
        </div>
        <div style="background:rgba(15,23,42,0.72);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:8px 10px;">
          <div style="color:#64748b;font-size:10px;">Động cơ cuộn</div>
          <div style="color:#34D399;font-weight:700;margin-top:2px;">Zero-Live-Blur 120FPS</div>
        </div>
        <div style="background:rgba(15,23,42,0.72);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:8px 10px;">
          <div style="color:#64748b;font-size:10px;">Luồng Video GPU</div>
          <div style="color:#e2e8f0;font-weight:600;margin-top:2px;">${vidInfo}</div>
        </div>
        <div style="background:rgba(15,23,42,0.72);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:8px 10px;">
          <div style="color:#64748b;font-size:10px;">Máy chủ Media cục bộ</div>
          <div style="color:${mediaServerOnline ? '#34D399' : '#f87171'};font-weight:700;margin-top:2px;">${MEDIA_BASE().replace('http://', '')}</div>
        </div>
      </div>

      <div style="font-size:10.5px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;margin-top:4px;">
        SAO LƯU / PHỤC HỒI CẤU HÌNH JSON
      </div>
      <div style="display:flex;flex-direction:column;gap:9px;background:rgba(15,23,42,0.72);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:11px 12px;">
        <button id="agy-tab-export-btn" type="button" style="padding:6px 12px;border-radius:7px;background:rgba(${accentRgb},0.16);border:1px solid rgba(${accentRgb},0.4);color:${accent};font-size:11.5px;font-weight:600;cursor:pointer;">
          Sao chép mã cấu hình JSON
        </button>
        <textarea id="agy-tab-import-text" rows="3" placeholder="Dán mã cấu hình JSON vào đây..." style="width:100%;box-sizing:border-box;background:rgba(0,0,0,0.35);color:#f1f5f9;border:1px solid rgba(255,255,255,0.12);border-radius:7px;padding:6px 8px;font-family:monospace;font-size:10.5px;resize:vertical;"></textarea>
        <div style="display:flex;gap:8px;">
          <button id="agy-tab-import-btn" type="button" style="flex:1;padding:6px 12px;border-radius:7px;background:linear-gradient(135deg, ${accent} 0%, #2563EB 100%);color:#06101a;font-weight:700;font-size:11.5px;border:none;cursor:pointer;">
            Áp dụng JSON
          </button>
          <button id="agy-tab-reset-btn" type="button" style="padding:6px 12px;border-radius:7px;background:rgba(239,68,68,0.14);border:1px solid rgba(239,68,68,0.35);color:#fca5a5;font-size:11.5px;cursor:pointer;">
            Đặt lại gốc
          </button>
        </div>
      </div>
    `;

    container.querySelector('#agy-tab-export-btn')?.addEventListener('click', () => {
      const compact = { ...getState() };
      if (compact.userAvatar && compact.userAvatar.length > 400) compact.userAvatar = '[custom_avatar_omitted]';
      if (compact.agentAvatar && compact.agentAvatar.length > 400) compact.agentAvatar = '[custom_avatar_omitted]';
      navigator.clipboard.writeText(JSON.stringify(compact, null, 2))
        .then(() => showStudioToast('Đã sao chép cấu hình JSON vào bộ nhớ tạm!'))
        .catch(() => showStudioToast('Không truy cập được clipboard!'));
    });
    container.querySelector('#agy-tab-import-btn')?.addEventListener('click', () => {
      const txt = container.querySelector('#agy-tab-import-text');
      if (!txt) return;
      try {
        const parsed = JSON.parse(txt.value.trim());
        if (parsed.userAvatar === '[custom_avatar_omitted]') delete parsed.userAvatar;
        if (parsed.agentAvatar === '[custom_avatar_omitted]') delete parsed.agentAvatar;
        applyTheme(parsed);
        showStudioToast('Đã áp dụng cấu hình JSON thành công!');
        renderActiveTab();
      } catch (_) {
        showStudioToast('Mã JSON không hợp lệ!');
      }
    });
    container.querySelector('#agy-tab-reset-btn')?.addEventListener('click', () => {
      applyTheme({
        themeName: 'Midnight Aqua',
        bubbleName: 'Midnight Aqua',
        inputStyle: 'glass',
        dimming: 28,
        wpEnabled: true,
        customWp: '',
        glassBlur: 4,
        bgMode: 'image',
        videoUrl: '',
        videoName: '',
        videoPaused: false,
        fxPreset: 'fireflies',
        fxIntensity: 65,
        cardOpacity: 82,
        glowLevel: 'normal',
        showOrnaments: true,
        customColors: {},
      });
      showStudioToast('Đã khôi phục cài đặt mặc định Midnight Aqua Pro!');
      renderActiveTab();
    });
  }

  // =========================================================================
  // SIDEBAR & SETTINGS INJECTION + SHELL METRICS + LIFECYCLE
  // =========================================================================
  function injectMainSidebarButton() {
    if (document.getElementById('agy-custom-theme-sidebar-btn')) return;
    const allSpans = Array.from(document.querySelectorAll('.bg-sidebar span, aside span, nav span, span.truncate'));
    const customSpan = allSpans.find(s => s.textContent?.trim() === 'Customizations');
    if (!customSpan) return;

    const row = customSpan.closest('a, button, div[role="button"], .group\\/headerbtn') || customSpan.parentElement;
    if (!row || !row.parentNode) return;

    const btn = document.createElement('a');
    btn.id = 'agy-custom-theme-sidebar-btn';
    btn.className = 'agy-button agy-button-custom inline-flex items-center font-medium transition-colors select-none outline-none cursor-pointer disabled:opacity-50 flex-grow w-full justify-start font-normal h-8 min-w-0 gap-1.5 px-2 py-1 rounded-lg bg-transparent text-secondary-foreground hover:bg-sidebar-muted hover:text-foreground';
    btn.style.cssText = 'cursor:pointer;text-decoration:none;display:flex;align-items:center;gap:8px;user-select:none;';
    btn.innerHTML = `
      ${SVG_ICONS.sparkle}
      <span class="truncate text-sm" style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:inherit;">Custom theme</span>
    `;

    row.parentNode.insertBefore(btn, row.nextSibling);
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleThemeStudio();
    });
  }

  function injectSettingsModalButton() {
    const modal = document.querySelector('.settings-modal-container');
    if (!modal || document.getElementById('agy-custom-theme-settings-btn')) return;

    const headers = Array.from(modal.querySelectorAll('h2, h3'));
    const appearanceHeader = headers.find(h => h.textContent?.trim() === 'Appearance');
    if (!appearanceHeader) return;

    let targetContainer = appearanceHeader.parentElement;
    while (targetContainer && !targetContainer.className.includes('justify-between') && targetContainer !== modal) {
      targetContainer = targetContainer.parentElement;
    }
    if (!targetContainer || !targetContainer.parentNode) return;

    const btn = document.createElement('button');
    btn.id = 'agy-custom-theme-settings-btn';
    btn.type = 'button';
    btn.className = 'select-none rounded px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer text-white';
    btn.style.cssText = 'background:linear-gradient(135deg,#0ea5e9 0%,#2563eb 100%);border:1px solid rgba(115,218,202,0.45);box-shadow:0 2px 12px rgba(14,165,233,0.32);margin:8px 0;display:inline-flex;align-items:center;gap:6px;';
    btn.innerHTML = `${SVG_ICONS.sparkle}<span>Mở Theme Studio Pro (Ảnh & Video)</span>`;

    targetContainer.parentNode.insertBefore(btn, targetContainer.nextSibling);
    btn.addEventListener('click', () => openCustomThemeModal());
  }

  function hookSidebarScroll() {
    if (!window.__AGY_SCROLL_AC__) return;
    const scrollers = document.querySelectorAll('.agy-shell .bg-sidebar .overflow-y-auto');
    scrollers.forEach(sc => {
      if (sc.dataset.agyScrollBound) return;
      sc.dataset.agyScrollBound = '1';
      const sync = () => sc.classList.toggle('agy-scrolled', sc.scrollTop > 2);
      sync();
      sc.addEventListener('scroll', sync, { passive: true, signal: window.__AGY_SCROLL_AC__.signal });
    });
  }

  function syncShellMetrics() {
    const shell = document.querySelector('.agy-shell');
    if (!shell) return;
    const split = shell.querySelector('[data-testid="sidebar-split"]');
    const sidebarPane = split ? split.firstElementChild : null;
    const titleBar = shell.querySelector('[class*="@container/titlebar"]');
    const sw = sidebarPane ? Math.round(sidebarPane.getBoundingClientRect().width) : 0;
    const shellRect = shell.getBoundingClientRect();
    const hdrBottom = titleBar ? Math.round(titleBar.getBoundingClientRect().bottom - shellRect.top) : 35;
    shell.style.setProperty('--agy-sidebar-w', sw + 'px');
    shell.style.setProperty('--agy-hdr-h', hdrBottom + 'px');

    const hasHoleAttr = document.body.getAttribute('data-has-browser-hole') === 'true';
    const holeEl = hasHoleAttr ? shell.querySelector('[data-browser-hole]:not([data-browser-hole="false"])') : null;
    if (holeEl) {
      if (window.__AGY_SHELL_RO__ && window.__AGY_HOLE_EL__ !== holeEl) {
        try { window.__AGY_SHELL_RO__.observe(holeEl); } catch (_) {}
        window.__AGY_HOLE_EL__ = holeEl;
      }
      const hRect = holeEl.getBoundingClientRect();
      if (hRect.width > 1 && hRect.height > 1) {
        const l = Math.max(0, Math.round(hRect.left - shellRect.left));
        const t = Math.max(0, Math.round(hRect.top - shellRect.top));
        const r = Math.max(l, Math.round(hRect.right - shellRect.left));
        const b = Math.max(t, Math.round(hRect.bottom - shellRect.top));
        shell.style.setProperty(
          '--agy-hole-clip',
          `polygon(evenodd, 0 0, 100% 0, 100% 100%, 0 100%, 0 0, ${l}px ${t}px, ${r}px ${t}px, ${r}px ${b}px, ${l}px ${b}px, ${l}px ${t}px)`
        );
        shell.dataset.agyHoleActive = '1';
        delete shell.dataset.agySideGlass;
        return;
      }
    }
    window.__AGY_HOLE_EL__ = null;
    delete shell.dataset.agyHoleActive;
    shell.style.removeProperty('--agy-hole-clip');

    const sideBody = shell.querySelector('[data-side-panel-body="true"]');
    if (sideBody) {
      if (window.__AGY_SHELL_RO__ && window.__AGY_SIDE_EL__ !== sideBody) {
        try { window.__AGY_SHELL_RO__.observe(sideBody); } catch (_) {}
        window.__AGY_SIDE_EL__ = sideBody;
      }
      const sRect = sideBody.getBoundingClientRect();
      if (sideBody.children.length > 0 && sRect.width > 24 && sRect.height > 24 && sRect.left < shellRect.right - 8 && sRect.right > shellRect.left + 8) {
        const sl = Math.max(sw, Math.round(sRect.left - shellRect.left));
        const st = Math.max(hdrBottom, Math.round(sRect.top - shellRect.top));
        const sr = Math.min(Math.round(shellRect.width), Math.max(sl, Math.round(sRect.right - shellRect.left)));
        const sb = Math.min(Math.round(shellRect.height), Math.max(st, Math.round(sRect.bottom - shellRect.top)));
        if (sr - sl > 20 && sb - st > 20) {
          shell.style.setProperty('--agy-side-l', sl + 'px');
          shell.style.setProperty('--agy-side-t', st + 'px');
          shell.style.setProperty('--agy-side-r', sr + 'px');
          shell.style.setProperty('--agy-side-b', sb + 'px');
          shell.dataset.agySideGlass = '1';
          return;
        }
      }
    }
    delete shell.dataset.agySideGlass;
  }

  function hookShellMetrics() {
    const shell = document.querySelector('.agy-shell');
    if (!shell) return;
    if (!document.getElementById('agy-bg-stage')) {
      applyTheme();
    }
    if (!shell.dataset.agyTboMounted) {
      shell.dataset.agyTboMounted = '1';
      scheduleTitleBarSync();
    }
    if (!window.__AGY_SHELL_RO__ && typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(syncShellMetrics);
      ro.observe(shell);
      const sidebarPane = shell.querySelector('[data-testid="sidebar-split"]')?.firstElementChild;
      if (sidebarPane) ro.observe(sidebarPane);
      window.__AGY_SHELL_RO__ = ro;
    }
    syncShellMetrics();
  }

  function tick() {
    injectMainSidebarButton();
    injectSettingsModalButton();
    hookSidebarScroll();
    hookShellMetrics();
  }

  function scheduleTick() {
    if (window.__AGY_TICK_RAF__) return;
    window.__AGY_TICK_RAF__ = requestAnimationFrame(() => {
      window.__AGY_TICK_RAF__ = 0;
      tick();
    });
  }

  // Clean teardown of any previous injection before mounting Pro engine
  clearTitleBarTimers();
  stopMotionLoop();
  if (window.__AGY_TICK_RAF__) {
    cancelAnimationFrame(window.__AGY_TICK_RAF__);
    window.__AGY_TICK_RAF__ = 0;
  }
  if (window.__AGY_SHELL_RO__) {
    try { window.__AGY_SHELL_RO__.disconnect(); } catch (_) {}
    window.__AGY_SHELL_RO__ = null;
  }
  if (window.__AGY_SCROLL_AC__) {
    try { window.__AGY_SCROLL_AC__.abort(); } catch (_) {}
  }
  window.__AGY_SCROLL_AC__ = new AbortController();
  const sig = window.__AGY_SCROLL_AC__.signal;

  // Recreate drawer cleanly on payload hot-reload while preserving open state
  const oldDrawer = document.getElementById('agy-theme-studio-drawer');
  const wasOpen = oldDrawer ? oldDrawer.dataset.open === '1' : false;
  if (oldDrawer) oldDrawer.remove();

  // Global hotkey Ctrl+Alt+K & Escape (bound via AbortController so zero duplicate listeners!)
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.altKey && (e.key === 'k' || e.key === 'K')) {
      e.preventDefault();
      toggleThemeStudio();
    }
    if (e.key === 'Escape') {
      const drawer = document.getElementById('agy-theme-studio-drawer');
      if (drawer && drawer.dataset.open === '1') {
        toggleThemeStudio(false);
      }
    }
  }, { signal: sig });

  window.addEventListener('load', () => scheduleTitleBarSync(), { signal: sig });
  window.addEventListener('focus', () => syncTitleBarOverlay(), { signal: sig });
  document.addEventListener('visibilitychange', () => {
    const cur = getState();
    const vid = document.getElementById('agy-bg-video');
    if (document.hidden) {
      if (vid && cur.videoAutoPause) { try { vid.pause(); } catch (_) {} }
    } else {
      syncTitleBarOverlay();
      if (vid && cur.wpEnabled && cur.bgMode === 'video' && cur.videoUrl && !cur.videoPaused) {
        vid.play().catch(() => {});
      }
    }
  }, { signal: sig });

  document.querySelectorAll('[data-agy-scroll-bound]').forEach(el => delete el.dataset.agyScrollBound);
  document.querySelectorAll('[data-agy-tbo-mounted]').forEach(el => delete el.dataset.agyTboMounted);
  const staleBackdrop = document.getElementById('agy-custom-theme-modal-backdrop');
  if (staleBackdrop) staleBackdrop.remove();
  const staleSettingsBtn = document.getElementById('agy-custom-theme-settings-btn');
  if (staleSettingsBtn) staleSettingsBtn.remove();

  window.__AGY_HOLE_EL__ = null;
  if (window.__AGY_MODAL_OBSERVER__) {
    window.__AGY_MODAL_OBSERVER__.disconnect();
  }
  window.__AGY_MODAL_OBSERVER__ = new MutationObserver(scheduleTick);
  window.__AGY_MODAL_OBSERVER__.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['data-has-browser-hole', 'data-browser-hole'],
  });

  applyTheme();
  tick();
  refreshVideoLibrary();
  if (wasOpen) {
    setTimeout(() => toggleThemeStudio(true), 80);
  }

  return 'Antigravity Custom Theme Pro Engine (Video + 60FPS Motion) Ready!';
})();
