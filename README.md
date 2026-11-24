# Antigravity Custom Theme Pro (`Playtime WLOP` Edition)

Gói giao diện tùy biến cho **Antigravity IDE & Manager** (Windows, macOS, Linux) — cấu hình sẵn preset **Playtime WLOP** (nền ảnh 2K sắc nét + hiệu ứng đom đóm 60 FPS, Zero Live Blur), giữ nguyên toàn bộ 12 preset gốc và 2 video nền trong `media/`.

## Yêu cầu
- **Node.js >= 22** (`brew install node@22` trên macOS hoặc tải từ https://nodejs.org/)
- **Antigravity** đã cài đặt

## Cài đặt & chạy nhanh trên macOS
1. Tải về:
   ```bash
   git clone https://github.com/sonbadao123/anticustom.git
   cd anticustom
   ```
   *(Hoặc tải ZIP về giải nén ra thư mục; nếu bị macOS Gatekeeper chặn do tải từ trình duyệt, chạy `xattr -cr . && chmod +x *.sh *.command` trong thư mục vừa giải nén).*
2. Cài đặt daemon & cấu hình vào `~/.gemini/config/skills/antigravity-custom-theme/`:
   ```bash
   bash CAI_DAT_MAC_LINUX.sh
   ```
   *(Hoặc nhấp đúp `CAI_DAT_MACOS.command` trong Finder).*
3. **Mở Antigravity có giao diện Custom Theme:**
   - Thoát hẳn Antigravity nếu đang mở (`Cmd + Q`).
   - Nhấp đúp **`MO_ANTIGRAVITY_THEME_MACOS.command`** (hoặc chạy trong Terminal):
     ```bash
     open -a "Antigravity" --args --remote-debugging-port=9000
     ```
4. Vào Antigravity -> nhấn **`Custom theme`** ở thanh bên trái (hoặc `Cmd/Ctrl + Alt + K`) để đổi ảnh nền, video nền, hiệu ứng hạt, màu sắc và avatar.

## Cài đặt trên Windows
1. Nhấp đúp **`CAI_DAT_WINDOWS.bat`**.
2. Thoát hẳn Antigravity (kể cả icon khay hệ thống) và chạy `Antigravity.exe --remote-debugging-port=9000`.

## Gỡ cài đặt sạch
- macOS / Linux: `bash GO_CAI_DAT_MAC_LINUX.sh`
- Windows: nhấp đúp `GO_CAI_DAT_WINDOWS.bat`
