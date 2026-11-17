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

Header (logo + menu) và footer được `assets/script.js` dựng chung cho mọi trang, không cần sửa trong từng trang. `404.html` là trang hiện khi vào địa chỉ không tồn tại.

## Nội dung: mỗi mục là một module

Mỗi module có một file nội dung riêng trong thư mục `assets/data/`. Sửa file đó, lưu và đẩy lên GitHub là trang tự cập nhật, không cần động vào HTML.

| Module | File nội dung |
| --- | --- |
| Thông tin chung (IP, port, nhãn nhỏ) và **menu** | `assets/data/site.js` |
| Phần "Khám phá" ở trang chủ | `assets/data/home.js` |
| Giới thiệu | `assets/data/about.js` |
| Tính năng nổi bật | `assets/data/features.js` |
| Cộng đồng đang phát triển | `assets/data/stats.js` |
| Chế độ chơi | `assets/data/modes.js` |
| Hướng dẫn tham gia (Java, Bedrock/PE) | `assets/data/join.js` |
| Luật server | `assets/data/rules.js` |
| Đội ngũ | `assets/data/team.js` |
| Changelog | `assets/data/changelog.js` |
| Ủng hộ & Vote | `assets/data/support.js` |
| Cộng đồng & liên hệ | `assets/data/community.js` |
| FAQ | `assets/data/faq.js` |

Hướng dẫn cách viết nằm ngay đầu mỗi file. Vài điều chung:

- Đổi IP hoặc port ở `assets/data/site.js`, mọi chỗ dùng `{ip}` / `{port}` tự đổi theo.
- Menu ở đầu trang sửa trong `assets/data/site.js` (mục `SITE.nav`): thêm, xoá hoặc đổi thứ tự các dòng.
- Link nội bộ viết dạng `"/rules/"`, link ngoài viết đầy đủ `"https://..."` (tự mở tab mới).
- Bọc chữ trong `**hai dấu sao**` để in đậm.
- Gõ thiếu dấu nháy hoặc dấu phẩy thì mục đó tạm ẩn (các mục khác vẫn bình thường), xem lỗi ở Console của trình duyệt.

### Chân trang

Sửa `assets/data/footer.js`: dòng chữ, các link nhỏ và nút "Lên đầu trang". Chân trang luôn nằm sát đáy màn hình dù trang ít nội dung.

### Quy tắc cho AI / người sửa hộ

Xem `AGENTS.md`. Mỗi lần sửa phải ghi vào `AI-LOG.md`. Khi nhờ AI khác sửa, bảo nó "đọc AGENTS.md trước".

### Viết Changelog

Mở `assets/data/changelog.js`, copy một khối `{ version: ..., changes: [...] }` dán lên đầu danh sách `entries`, rồi sửa. Mỗi thay đổi là một dòng `["loại", "nội dung"],` với loại là `new`, `fix`, `balance`, `change` hoặc `remove`.

### Thêm một trang mới

1. Copy một thư mục trang có sẵn (ví dụ `faq/`) thành `tên-mới/`, sửa `<title>`, `description` và `data-module="tên-mới"` trong `tên-mới/index.html`.
2. Tạo `assets/data/tên-mới.js` (dạng `SITE.tênmới = { title: "...", ... }`).
3. Thêm một dòng vào `SITE.nav` trong `assets/data/site.js`: `{ label: "Tên", url: "/tên-mới/" }`.
4. Nếu nội dung không phải dạng thẻ có sẵn, thêm hàm dựng vào `MODULE_RENDERERS` trong `assets/script.js` (nội dung dạng các thẻ thì dùng lại `renderCards`).

Một trang có thể chứa nhiều module bằng cách thêm nhiều thẻ `<section data-module="...">` (xem `about/index.html`). Module đầu tiên của trang nên có `data-heading="h1"`.

Link cũ dạng `/#rules` trên trang chủ sẽ tự chuyển sang `/rules/`.

## Cấu trúc thư mục

Thư mục gốc chỉ có các trang (`index.html`, `rules/`...), `404.html`, `CNAME`. Mọi file kỹ thuật (css, js, `data/`, `fonts/`, logo) nằm trong `assets/`.

## Giảm lộ file khi gõ thẳng đường dẫn (Cloudflare, tuỳ chọn)

GitHub Pages không chặn được người gõ thẳng `/assets/...`. Nếu tên miền đã chạy qua Cloudflare, tạo một luật trong Security > WAF > Custom rules:
- Điều kiện: `URI Path starts with /assets/` **và** `Referer does not contain mc.elysibloomct.qzz.io`
- Hành động: Block (có thể đặt trang trả lời tuỳ chỉnh là 404).
Trang vẫn chạy bình thường vì trình duyệt gửi Referer khi tải file; người gõ thẳng vào thanh địa chỉ sẽ bị chặn. Đây chỉ là giảm bớt, không phải bảo mật tuyệt đối.

## Giao diện

- `assets/mobile.css` + `assets/mobile.js`: giao diện điện thoại / máy tính bảng nhỏ (màn rộng ≤900px) là module riêng: menu ba gạch xổ xuống, chân trang xếp giữa. Giao diện máy tính nằm ở `assets/styles.css` và không bị ảnh hưởng. Sửa kiểu điện thoại thì sửa hai file này.
- `assets/styles.css`: theme hồng/đỏ mận lấy màu từ logo (các biến màu nằm ở đầu file), layout responsive, hiệu ứng.
- `assets/fonts/`: font VT323 (giấy phép SIL OFL) tự host, có đủ ký tự tiếng Việt. Chữ thường dùng Nunito từ Google Fonts.
- `assets/script.js`: nạp `assets/data/`, dựng header/footer/menu và các module, copy IP.
- `assets/logo.png`: logo đã cắt sát viền để hiển thị gọn trên header. Ảnh gốc là `RUIDbcf7c16b5ec74af484df331f7d2fbcb4.png`.

> Số liệu ở mục "Cộng đồng đang phát triển" là dữ liệu mock để minh họa giao diện (chưa tích hợp backend/API).
