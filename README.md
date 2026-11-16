# ElysiBlooMCT

Landing page giới thiệu server Minecraft ElysiBlooMCT (static website, không cần build).

## Chạy local

Mở trực tiếp file `index.html` trên trình duyệt, hoặc chạy local server trong thư mục dự án:

```bash
python -m http.server 8080
```

Sau đó truy cập `http://localhost:8080`.

## Nội dung: mỗi mục là một module

Mỗi mục trên trang (Giới thiệu, Luật, Changelog, FAQ...) là một **module** với file nội dung riêng trong thư mục `data/`.
Sửa file đó, lưu và đẩy lên GitHub là trang tự cập nhật, không cần động vào HTML.

| Mục trên trang | File nội dung |
| --- | --- |
| Thông tin chung (IP, port, nhãn nhỏ) | `data/site.js` |
| Giới thiệu | `data/about.js` |
| Chế độ chơi | `data/modes.js` |
| Tính năng nổi bật | `data/features.js` |
| Cộng đồng đang phát triển | `data/stats.js` |
| Hướng dẫn tham gia (Java, Bedrock/PE) | `data/join.js` |
| Luật server | `data/rules.js` |
| Đội ngũ | `data/team.js` |
| Changelog | `data/changelog.js` |
| Ủng hộ & Vote | `data/support.js` |
| Cộng đồng & liên hệ | `data/community.js` |
| FAQ | `data/faq.js` |

Hướng dẫn cách viết nằm ngay đầu mỗi file. Vài điều chung:

- Đổi IP hoặc port ở `data/site.js`, mọi chỗ dùng `{ip}` / `{port}` tự đổi theo.
- Bọc chữ trong `**hai dấu sao**` để in đậm.
- Dòng `nav: "..."` quyết định mục đó có hiện trên thanh menu hay không (xóa dòng này để ẩn khỏi menu).
- Gõ thiếu dấu nháy hoặc dấu phẩy thì mục đó tạm ẩn (các mục khác vẫn bình thường), xem lỗi ở Console của trình duyệt.

### Viết Changelog

Mở `data/changelog.js`, copy một khối `{ version: ..., changes: [...] }` dán lên đầu danh sách `entries`, rồi sửa. Mỗi thay đổi là một dòng `["loại", "nội dung"],` với loại là `new`, `fix`, `balance`, `change` hoặc `remove`.

### Thêm một mục hoàn toàn mới

1. Thêm `<section class="section" data-module="tênmới"></section>` vào `index.html` (đúng vị trí muốn hiện).
2. Tạo `data/tênmới.js` và thêm thẻ `<script src="./data/tênmới.js"></script>` trước `script.js`.
3. Thêm hàm dựng cho `tênmới` vào `MODULE_RENDERERS` trong `script.js` (có thể dùng lại `renderCards` nếu nội dung là các thẻ).

## Giao diện

- `styles.css`: theme hồng/đỏ mận lấy màu từ logo (các biến màu nằm ở đầu file), layout responsive, hiệu ứng.
- `script.js`: dựng các module từ `data/`, copy IP, năm ở footer.
- `logo.png`: logo đã cắt sát viền để hiển thị gọn trên header. Ảnh gốc là `RUIDbcf7c16b5ec74af484df331f7d2fbcb4.png`.

> Số liệu ở mục "Cộng đồng đang phát triển" là dữ liệu mock để minh họa giao diện (chưa tích hợp backend/API).
