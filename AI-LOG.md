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

## 2026-11-16 | Claude
- Đã làm: sửa giao diện điện thoại (menu tự xuống dòng, nút cao ≥40px, tắt hiệu ứng lấp lánh trên màn nhỏ); thêm số phiên bản `?v=` cho CSS/JS/data để tránh kẹt cache; cố định chân trang sát đáy; chân trang thành module `data/footer.js`; thêm `AGENTS.md`, `CLAUDE.md`, `.github/copilot-instructions.md` và file log này.
- File đã sửa: `styles.css`, `script.js`, tất cả `*.html`, `data/footer.js`, `AGENTS.md`, `CLAUDE.md`, `AI-LOG.md`, `.github/copilot-instructions.md`, `README.md`.
- Còn dang dở / cần chủ web làm: điền link Discord/Facebook/TikTok/ủng hộ/vote (đang `"#"` trong `data/support.js`, `data/community.js`); đổi tên đội ngũ `Tên_InGame`; điền ngày thật trong `data/changelog.js`; xác nhận port Bedrock 36918; viết lại luật trong `data/rules.js`.
- Ghi chú: giao diện máy tính chưa được kiểm tra kỹ.
