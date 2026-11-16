# Quy tắc bắt buộc cho AI / người sửa website ElysiBlooMCT

> AI nào (Claude, Copilot, ChatGPT, Gemini...) hoặc người nào sửa repo này cũng PHẢI đọc file này trước khi sửa.

## Quy tắc quan trọng nhất

**Sau MỖI lần sửa, phải ghi một mục vào `AI-LOG.md`** (mục mới nhất nằm trên cùng): ngày, ai/AI nào sửa, đã sửa gì, file nào, việc còn dang dở. Không ghi log = chưa xong việc.

## Cấu trúc website

- Website tĩnh chạy trên GitHub Pages, **không có bước build**. Không thêm framework hay công cụ build.
- Mỗi trang là một thư mục (`/rules/index.html`...), chỉ chứa khung HTML nhỏ. Header, menu và chân trang do `script.js` dựng chung.
- **Nội dung nằm trong `data/*.js`** (mỗi module một file). Muốn đổi chữ/số liệu thì sửa file data, KHÔNG viết cứng vào HTML hay `script.js`.
  - `data/site.js`: IP, port Bedrock, menu. `data/footer.js`: chân trang. `data/changelog.js`: lịch sử cập nhật của server.
- Trong data: `{ip}`, `{port}`, `{name}` tự thay giá trị; `**chữ**` là in đậm; link nội bộ dạng `"/rules/"`.
- Thêm trang mới: xem mục "Thêm một trang mới" trong `README.md`.

## Giao diện

- Theme hồng / đỏ mận / đen lấy từ logo. Dùng các biến màu ở đầu `styles.css`, không tự thêm màu lạ.
- Font tiêu đề VT323 tự host trong `fonts/` (có tiếng Việt). Không đổi sang font thiếu ký tự tiếng Việt.
- Phải dùng tốt trên điện thoại (kiểm tra ở rộng 360px): không tràn ngang, nút bấm cao tối thiểu 40px, menu không bị cắt.
- Chân trang phải luôn nằm sát đáy màn hình kể cả khi nội dung ngắn (body là flex column, `main` có `flex: 1 0 auto`). Đừng phá điều này.

- **Điện thoại là module riêng**: `mobile.css` (chỉ có tác dụng khi màn ≤900px) và `mobile.js` (nút menu ba gạch). Sửa giao diện điện thoại ở đó; đừng thêm rule điện thoại vào `styles.css`. Giao diện máy tính (`styles.css`) giữ nguyên trừ khi chủ web yêu cầu.

## Khi sửa CSS / JS

- Mỗi lần sửa `styles.css` hoặc `script.js`, **đổi số phiên bản `?v=...`** trong mọi file `.html` (kể cả `404.html`) để điện thoại không giữ bản cũ. Ví dụ `styles.css?v=20261116c` đổi thành `?v=20261117a`. Mẹo: tìm `?v=` trong repo rồi thay đồng loạt.
- Không dùng `innerHTML` với nội dung từ data (dùng `textContent`/hàm `el()` có sẵn).
- Gõ sai data (thiếu dấu phẩy, dấu nháy) thì chỉ module đó bị ẩn; kiểm tra Console của trình duyệt.

## Quy trình

- Không sửa trực tiếp `main` nếu có thể tạo nhánh; chủ web sẽ duyệt rồi mới merge.
- Không xoá `CNAME` (tên miền riêng `mc.elysibloomct.qzz.io`).
- Việc còn để trống chờ chủ web điền (link Discord/Facebook/TikTok/ủng hộ/vote, tên đội ngũ, ngày changelog) ghi trong `AI-LOG.md`.
