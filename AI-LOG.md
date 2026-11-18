# Nhật ký chỉnh sửa (AI-LOG)

Quy tắc: sau MỖI lần sửa, thêm một mục mới **lên trên cùng** theo mẫu dưới. Chi tiết xem `AGENTS.md`.

Mẫu:
```
## yyyy-mm-dd | Tên AI hoặc người sửa
- Đã làm: ...
- File đã sửa: ...
- Còn dang dở / cần chủ web làm: ...
```

---

## 2026-11-18 | Claude (favicon)
- Đã làm: thêm icon chữ E hồng làm favicon hiện trên tab trình duyệt (`assets/favicon.ico`, `favicon-32.png`, `favicon-192.png`, `apple-touch-icon.png`) và gắn vào đầu mọi file `.html`; số phiên bản `?v=20261118a`. Repo đã chuyển sang `ElysiBlooMCT/ElyMCWebsite`.
- File đã sửa: tất cả `*.html`, `assets/favicon*`, `assets/apple-touch-icon.png`, `AI-LOG.md`.
- Còn dang dở: như các mục bên dưới. Trình duyệt giữ favicon rất lâu, nếu chưa thấy icon mới thì đóng hẳn tab rồi mở lại.

---

## 2026-11-17 | Claude (xoá chú thích)
- Đã làm: xoá toàn bộ chú thích trong `assets/script.js`, `assets/mobile.js`, `assets/styles.css`, `assets/mobile.css` và các file `.html`; giữ nguyên chú thích hướng dẫn trong `assets/data/*.js`; thêm quy tắc "không chú thích trong code công khai" vào `AGENTS.md`; số phiên bản `?v=20261117c`. Code JS được định dạng lại, chức năng không đổi.
- File đã sửa: `assets/script.js`, `assets/mobile.js`, `assets/styles.css`, `assets/mobile.css`, tất cả `*.html`, `AGENTS.md`, `AI-LOG.md`.
- Còn dang dở: như các mục bên dưới.

---

## 2026-11-17 | Claude (soát lại điện thoại)
- Đã làm: sửa dòng "PLAY • BUILD • BLOOM" đè lên các nhãn trong thẻ IP trên điện thoại (chuyển sang xếp dưới cùng, `assets/mobile.css`); thêm `color-scheme: dark` và `<meta name="darkreader-lock">` để chế độ tối ép màu của trình duyệt (như Samsung Internet) không làm mờ nút "Chơi ngay"; sửa chú thích cũ trong `assets/script.js` nhắc đường dẫn `data/`; số phiên bản `?v=20261117b`. Soát cả 10 trang ở 360, 412, 768, 1024, 1440px: không tràn ngang, không lỗi JS, không chữ đè nhau.
- File đã sửa: `assets/mobile.css`, `assets/styles.css`, `assets/script.js`, tất cả `*.html`, `AI-LOG.md`.
- Còn dang dở: như các mục bên dưới.

---

## 2026-11-17 | Claude
- Đã làm: dời `styles.css`, `mobile.css`, `script.js`, `mobile.js`, `data/`, `fonts/`, `logo.png` vào thư mục `assets/` để thư mục gốc gọn (gõ `/script.js` giờ ra 404); `script.js` có thêm biến `ASSETS`; cập nhật đường dẫn trong mọi `*.html`, README, AGENTS; số phiên bản `?v=20261117a`. Thêm hướng dẫn Cloudflare trong README.
- File đã sửa: tất cả `*.html`, `assets/script.js`, `README.md`, `AGENTS.md`, `AI-LOG.md`.
- Còn dang dở: chủ web tự cấu hình Cloudflare nếu đổi được nameserver; các việc ở mục dưới.

---

## 2026-11-16 | Claude (lần 3)
- Đã làm: tách giao diện điện thoại thành module riêng `mobile.css` + `mobile.js`; trên màn ≤900px menu thành nút ba gạch xổ xuống (kiểu Faithful), giao diện máy tính giữ nguyên; thêm logo nhỏ vào chân trang (bật/tắt bằng `logo` trong `data/footer.js`); cập nhật số phiên bản `?v=20261116c`.
- File đã sửa: `styles.css` (bỏ phần media điện thoại), `mobile.css`, `mobile.js`, `script.js`, `data/footer.js`, tất cả `*.html`, `README.md`, `AGENTS.md`.
- Còn dang dở: như mục bên dưới.

---

## 2026-11-16 | Claude
- Đã làm: sửa giao diện điện thoại (menu tự xuống dòng, nút cao ≥40px, tắt hiệu ứng lấp lánh trên màn nhỏ); thêm số phiên bản `?v=` cho CSS/JS/data để tránh kẹt cache; cố định chân trang sát đáy; chân trang thành module `data/footer.js`; thêm `AGENTS.md`, `CLAUDE.md`, `.github/copilot-instructions.md` và file log này.
- File đã sửa: `styles.css`, `script.js`, tất cả `*.html`, `data/footer.js`, `AGENTS.md`, `CLAUDE.md`, `AI-LOG.md`, `.github/copilot-instructions.md`, `README.md`.
- Còn dang dở / cần chủ web làm: điền link Discord/Facebook/TikTok/ủng hộ/vote (đang `"#"` trong `data/support.js`, `data/community.js`); đổi tên đội ngũ `Tên_InGame`; điền ngày thật trong `data/changelog.js`; xác nhận port Bedrock 36918; viết lại luật trong `data/rules.js`.
- Ghi chú: giao diện máy tính chưa được kiểm tra kỹ.
