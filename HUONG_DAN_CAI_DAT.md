# Hướng Dẫn Cài Đặt — Antigravity Custom Theme Pro

Gói cài đặt giao diện tùy biến cho **Antigravity IDE & Manager** (hỗ trợ **Windows, macOS và Linux**) — chạy mượt 60fps với kiến trúc **Zero Live Blur**, không sửa file cài đặt gốc của ứng dụng và có thể gỡ sạch bất cứ lúc nào.

---

## 1. Gói Này Bao Gồm Những Gì?

- **12 bộ chủ đề màu sắc (Theme Presets):** `Nordic Frost` (đang đặt mặc định), `Midnight Aqua`, `WLOP Cosmic`, `Midnight Obsidian`, `Kanagawa Wave`, `Sakura Dusk`, `Tokyo Night`, `Kanagawa Dragon`, `Cyberpunk Aurora`, `Crimson Eclipse`, `Emerald Celestial`, `Royal Amethyst`.
- **Nền Video động (Local HTTP 206 Range Streaming):** Kèm sẵn 2 video trong thư viện (`hiyuki-frost-blade-wuthering-waves-moewalls-com_mwnkr3b1.mp4` đang bật mặc định và `Cosmic_Aurora_HD.webm`), hỗ trợ tải thêm MP4/WebM/MOV/MKV trực tiếp trong menu.
- **6 hiệu ứng hạt / ánh sáng động (Motion FX):** `Mưa Neon Đêm` (mặc định), `Đom Đóm Tinh Tú`, `Cực Quang Vũ Trụ`, `Hoa Anh Đào Rơi`, `Sóng Lụa Ngọc`, hoặc tắt hiệu ứng.
- **4 kiểu khung nhập liệu & tùy chỉnh Avatar:** Kính pha lê trong suốt (`glass`), viền kép vàng ánh kim, đồng bộ hoa văn, tối giản; hỗ trợ ảnh đại diện User (kể cả ảnh động GIF) và AI Agent.
- **Tối ưu hiệu năng & Split-Browser Safe:** Không dùng `backdrop-filter: blur()` trên vùng cuộn, tự động khoét khung cho trình duyệt nhúng bên phải nên không làm mờ hay lệch màu trang web.
- **Đã đóng gói sẵn `dist/theme_payload.js`:** **Không cần cài Python**, **không cần `npm install`**.

---

## 2. Yêu Cầu Duy Nhất

- **Node.js >= 22** (sử dụng WebSocket tích hợp sẵn của Node 22+).
  - Tải nhanh tại: https://nodejs.org/ (chọn bản **LTS** >= 22).
  - Trên macOS có thể cài qua Homebrew: `brew install node@22`
- **Antigravity** đã cài đặt trên máy.

---

## 3. Cài Đặt 1-Click Theo Hệ Điều Hành

Giải nén toàn bộ file `.zip` ra một thư mục bất kỳ trước khi chạy (không chạy trực tiếp bên trong cửa sổ xem trước file nén).

### A. Windows (10 / 11)
1. Nhấp đúp file **`CAI_DAT_WINDOWS.bat`**.
2. Script sẽ tự động:
   - Kiểm tra phiên bản Node.js >= 22.
   - Chép bộ Custom Theme vào vị trí cố định: `%USERPROFILE%\.gemini\config\skills\antigravity-custom-theme\`.
   - Đăng ký chạy ngầm khi mở máy (`Startup\AntigravityCustomTheme.lnk`) và khởi động ngay lập tức.
   - Kiểm tra kết nối trực tiếp với Antigravity (nếu đang mở, giao diện sẽ đổi ngay sau 1–2 giây).
3. Sau khi thấy dòng `HOAN TAT`, bạn có thể xóa file `.zip` và thư mục vừa giải nén.

*(Tùy chọn nâng cao trong PowerShell: chạy `.\install_windows.ps1 -NoStartup` nếu chỉ muốn chạy phiên hiện tại không khởi động cùng Windows, hoặc `-KeepExistingConfig` nếu muốn giữ cấu hình theme cũ).*

### B. macOS (Apple Silicon & Intel)
- **Cách 1 (Khuyên dùng — chạy Terminal):**
  Mở **Terminal**, gõ `bash ` rồi kéo thả file `CAI_DAT_MAC_LINUX.sh` vào cửa sổ Terminal và nhấn **Enter**:
  ```bash
  bash CAI_DAT_MAC_LINUX.sh
  ```
- **Cách 2 (Nhấp đúp trong Finder):**
  Nhấp đúp file **`CAI_DAT_MACOS.command`**.
  *(Nếu macOS hiện cảnh báo bảo mật Gatekeeper với file tải từ mạng, mở Terminal tại thư mục giải nén và chạy: `xattr -dr com.apple.quarantine . && bash CAI_DAT_MAC_LINUX.sh`)*.
- Script sẽ cài bộ theme cố định vào `~/.gemini/config/skills/antigravity-custom-theme/` và tạo LaunchAgent `~/Library/LaunchAgents/io.antigravity.custom-theme.plist` tự khởi động ngầm.

### C. Linux
Mở Terminal tại thư mục vừa giải nén và chạy:
```bash
bash CAI_DAT_MAC_LINUX.sh
```
Script sẽ cài vào `~/.gemini/config/skills/antigravity-custom-theme/` và tạo dịch vụ `systemd --user` (`antigravity-custom-theme.service`, hoặc tự dự phòng chạy nền bằng `nohup`).

---

## 4. Cách Tùy Chỉnh Giao Diện, Video & Avatar Trong Antigravity

Sau khi cài xong và mở Antigravity, bạn có thể đổi mọi thứ trực tiếp trong giao diện:
- **Cách 1:** Nhấn nút **`Custom theme`** ở thanh menu bên trái (nằm ngay bên dưới mục **Customizations**).
- **Cách 2:** Mở **Settings -> Appearance** -> nhấn nút **`Mở Theme Studio Pro (Ảnh & Video)`**.

Tại **Theme Studio Pro**, bạn có thể:
- Chọn 1 trong 12 bộ màu theme có sẵn hoặc chỉnh màu tùy ý.
- Đổi qua lại giữa **Ảnh nền**, **Video nền** (chọn 2 video có sẵn hoặc tải video MP4/WebM mới từ máy), hoặc **Hiệu ứng nền**.
- Thay **Avatar người dùng** / **Avatar AI** bằng ảnh của riêng bạn (đang cài sẵn bộ mặc định đi kèm gói share).
- Chỉnh độ tối màn nền (`dimming`), độ mờ kính, cường độ hiệu ứng FX và độ phát sáng (`glow`).

---

## 5. Xử Lý Nhanh Khi Gặp Lỗi

1. **Báo thiếu Node.js hoặc Node < 22:**
   Cài Node.js 22+ từ https://nodejs.org/, mở lại Terminal/cmd mới rồi chạy lại file cài đặt.
2. **Cài xong nhưng mở Antigravity chưa thấy đổi giao diện:**
   - Tắt hẳn Antigravity (Quit hoàn toàn) rồi mở lại.
   - Kiểm tra nhanh bằng lệnh:
     ```bash
     node ~/.gemini/config/skills/antigravity-custom-theme/scripts/verify_cdp.js
     ```
   - Xem nhật ký daemon tại:
     - Windows: `%USERPROFILE%\.gemini\config\skills\antigravity-custom-theme\daemon.log`
     - macOS / Linux: `~/.gemini/config/skills/antigravity-custom-theme/daemon.log`
   - Nếu Antigravity lưu `DevToolsActivePort` ở vị trí tùy chỉnh, có thể đặt biến môi trường `AGY_PORT_FILE=/duong/dan/DevToolsActivePort`.
3. **Bạn muốn dùng Skill để nhờ AI trong Antigravity tự tạo thêm theme mới:**
   Vì script đã cài sẵn vào `~/.gemini/config/skills/antigravity-custom-theme/`, mở một cuộc trò chuyện mới trong Antigravity là AI tự nhận diện skill `antigravity-custom-theme` ngay (nếu muốn tự build lại `dist/theme_payload.js` khi thêm preset mới vào `themes/themes.json` thì cần Python 3.9+).

---

## 6. Gỡ Cài Đặt Sạch (Khôi Phục Giao Diện Gốc)

- **Windows:** Nhấp đúp **`GO_CAI_DAT_WINDOWS.bat`** (hoặc chạy `node "%USERPROFILE%\.gemini\config\skills\antigravity-custom-theme\scripts\uninstall.js"`).
- **macOS / Linux:** Chạy `bash GO_CAI_DAT_MAC_LINUX.sh` (hoặc `node ~/.gemini/config/skills/antigravity-custom-theme/scripts/uninstall.js`).

Lệnh gỡ cài đặt sẽ tắt daemon chạy ngầm, xóa tự khởi động cùng hệ điều hành và trả Antigravity về giao diện mặc định ngay lập tức.

---

## 7. Cấu Hình Sẵn Trong Bản Đóng Gói Này & Mở Nhanh Trên macOS

- **Giao diện đang đặt mặc định (`theme_config.json`):** Preset **`Playtime WLOP`** (trích từ Wallpaper Engine *Playtime - WLOP 4K*, accent vàng cổ điển & ngọc bích, chế độ ảnh tĩnh + hiệu ứng hạt **Đom Đóm Tinh Tú**, `dimming: 18%`), kèm sẵn toàn bộ 12 preset còn lại và 2 video mẫu trong `media/`.
- **Lưu ý quan trọng khi mở Antigravity (Windows & macOS):** Bộ theme bơm qua cổng gỡ lỗi CDP (`DevToolsActivePort`), vì vậy Antigravity cần khởi chạy với cờ `--remote-debugging-port=9000` (sau khi đã thoát hẳn phiên chạy thường trước đó):
  - **macOS (1-click):** Nhấp đúp file **`MO_ANTIGRAVITY_THEME_MACOS.command`** (hoặc chạy `open -a "Antigravity" --args --remote-debugging-port=9000`). Nếu Finder báo quyền/Gatekeeper khi tải từ web, mở Terminal tại thư mục giải nén và chạy:
    ```bash
    xattr -cr . && chmod +x *.sh *.command && bash CAI_DAT_MAC_LINUX.sh
    ```
