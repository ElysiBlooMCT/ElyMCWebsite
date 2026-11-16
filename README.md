# ElysiBlooMCT

Landing page giới thiệu server Minecraft ElysiBlooMCT (static website).

## Chạy local

Vì dự án là static site, bạn có thể chạy nhanh bằng một trong các cách:

- Mở trực tiếp file `index.html` trên trình duyệt, hoặc
- Chạy local server trong thư mục dự án:

```bash
python -m http.server 8080
```

Sau đó truy cập `http://localhost:8080`.

## Tùy chỉnh nội dung server

Các nội dung chính nằm ở:

- `index.html`: tên thương hiệu, logo, mô tả, danh sách game modes, FAQ, hướng dẫn tham gia.
- `styles.css`: theme hồng/đỏ mận lấy màu từ logo (các biến màu nằm ở đầu file), layout responsive, hiệu ứng.
- `script.js`: hành vi client-side (copy IP, năm footer).
- `logo.png`: logo đã cắt sát viền để hiển thị gọn trên header. Ảnh gốc là `RUIDbcf7c16b5ec74af484df331f7d2fbcb4.png`.

Địa chỉ server hiện tại là `mc.elysibloomct.qzz.io`.

Để đổi IP server hiển thị và copy:

1. Sửa nội dung trong phần tử `#server-ip` tại `index.html`.
2. Sửa IP trong mục hướng dẫn tham gia (nếu muốn đồng bộ nội dung).

> Số liệu trạng thái cộng đồng hiện dùng dữ liệu mock để minh họa giao diện (chưa tích hợp backend/API).
