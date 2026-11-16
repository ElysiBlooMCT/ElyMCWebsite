# ElysiBlooMCT

Website giới thiệu server Minecraft ElysiBlooMCT (static website, không cần build). Mỗi mục là một trang riêng: `/`, `/about/`, `/rules/`, `/changelog/`...

## Chạy local

Website dùng địa chỉ dạng `/rules/` nên cần chạy qua local server (mở thẳng file `index.html` sẽ không chuyển trang được):

```bash
python -m http.server 8080
```

Sau đó truy cập `http://localhost:8080`.

## Cấu trúc trang

| Địa chỉ | Thư mục | Module hiển thị |
| --- | --- | --- |
| `/` | `index.html` | thẻ IP server + `home` |
| `/about/` | `about/` | `about`, `features`, `stats` |
| `/modes/` | `modes/` | `modes` |
| `/join/` | `join/` | `join` |
| `/rules/` | `rules/` | `rules` |
| `/team/` | `team/` | `team` |
| `/changelog/` | `changelog/` | `changelog` |
| `/support/` | `support/` | `support` |
| `/community/` | `community/` | `community` |
| `/faq/` | `faq/` | `faq` |

Header (logo + menu) và footer được `script.js` dựng chung cho mọi trang, không cần sửa trong từng trang. `404.html` là trang hiện khi vào địa chỉ không tồn tại.

## Nội dung: mỗi mục là một module

Mỗi module có một file nội dung riêng trong thư mục `data/`. Sửa file đó, lưu và đẩy lên GitHub là trang tự cập nhật, không cần động vào HTML.

| Module | File nội dung |
| --- | --- |
| Thông tin chung (IP, port, nhãn nhỏ) và **menu** | `data/site.js` |
| Phần "Khám phá" ở trang chủ | `data/home.js` |
| Giới thiệu | `data/about.js` |
| Tính năng nổi bật | `data/features.js` |
| Cộng đồng đang phát triển | `data/stats.js` |
| Chế độ chơi | `data/modes.js` |
| Hướng dẫn tham gia (Java, Bedrock/PE) | `data/join.js` |
| Luật server | `data/rules.js` |
| Đội ngũ | `data/team.js` |
| Changelog | `data/changelog.js` |
| Ủng hộ & Vote | `data/support.js` |
| Cộng đồng & liên hệ | `data/community.js` |
| FAQ | `data/faq.js` |

Hướng dẫn cách viết nằm ngay đầu mỗi file. Vài điều chung:

- Đổi IP hoặc port ở `data/site.js`, mọi chỗ dùng `{ip}` / `{port}` tự đổi theo.
- Menu ở đầu trang sửa trong `data/site.js` (mục `SITE.nav`): thêm, xoá hoặc đổi thứ tự các dòng.
- Link nội bộ viết dạng `"/rules/"`, link ngoài viết đầy đủ `"https://..."` (tự mở tab mới).
- Bọc chữ trong `**hai dấu sao**` để in đậm.
- Gõ thiếu dấu nháy hoặc dấu phẩy thì mục đó tạm ẩn (các mục khác vẫn bình thường), xem lỗi ở Console của trình duyệt.

### Viết Changelog

Mở `data/changelog.js`, copy một khối `{ version: ..., changes: [...] }` dán lên đầu danh sách `entries`, rồi sửa. Mỗi thay đổi là một dòng `["loại", "nội dung"],` với loại là `new`, `fix`, `balance`, `change` hoặc `remove`.

### Thêm một trang mới

1. Copy một thư mục trang có sẵn (ví dụ `faq/`) thành `tên-mới/`, sửa `<title>`, `description` và `data-module="tên-mới"` trong `tên-mới/index.html`.
2. Tạo `data/tên-mới.js` (dạng `SITE.tênmới = { title: "...", ... }`).
3. Thêm một dòng vào `SITE.nav` trong `data/site.js`: `{ label: "Tên", url: "/tên-mới/" }`.
4. Nếu nội dung không phải dạng thẻ có sẵn, thêm hàm dựng vào `MODULE_RENDERERS` trong `script.js` (nội dung dạng các thẻ thì dùng lại `renderCards`).

Một trang có thể chứa nhiều module bằng cách thêm nhiều thẻ `<section data-module="...">` (xem `about/index.html`). Module đầu tiên của trang nên có `data-heading="h1"`.

Link cũ dạng `/#rules` trên trang chủ sẽ tự chuyển sang `/rules/`.

## Giao diện

- `styles.css`: theme hồng/đỏ mận lấy màu từ logo (các biến màu nằm ở đầu file), layout responsive, hiệu ứng.
- `fonts/`: font VT323 (giấy phép SIL OFL) tự host, có đủ ký tự tiếng Việt. Chữ thường dùng Nunito từ Google Fonts.
- `script.js`: nạp `data/`, dựng header/footer/menu và các module, copy IP.
- `logo.png`: logo đã cắt sát viền để hiển thị gọn trên header. Ảnh gốc là `RUIDbcf7c16b5ec74af484df331f7d2fbcb4.png`.

> Số liệu ở mục "Cộng đồng đang phát triển" là dữ liệu mock để minh họa giao diện (chưa tích hợp backend/API).
