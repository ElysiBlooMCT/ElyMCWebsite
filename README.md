# ElysiBlooMCT

Landing page giới thiệu server Minecraft ElysiBlooMCT (static website).

## Chạy local

Vì dự án là static site, bạn có thể chạy nhanh bằng một trong các cách:

- Mở trực tiếp `/home/runner/work/ElysiBlooMCT/ElysiBlooMCT/index.html` trên trình duyệt, hoặc
- Chạy local server:

```bash
cd /home/runner/work/ElysiBlooMCT/ElysiBlooMCT
python -m http.server 8080
```

Sau đó truy cập `http://localhost:8080`.

## Tùy chỉnh nội dung server

Các nội dung chính nằm ở:

- `index.html`: tên thương hiệu, logo, mô tả, danh sách game modes, FAQ, hướng dẫn tham gia.
- `styles.css`: theme hồng neon/tím mận lấy cảm hứng từ logo, layout responsive, hiệu ứng.
- `script.js`: hành vi client-side (copy IP, năm footer).

Địa chỉ server hiện tại là `mc.elysibloomct.qzz.io`.

Để đổi IP server hiển thị và copy:

1. Sửa nội dung trong phần tử `#server-ip` tại `index.html`.
2. Sửa IP trong mục hướng dẫn tham gia (nếu muốn đồng bộ nội dung).

> Số liệu trạng thái cộng đồng hiện dùng dữ liệu mock để minh họa giao diện (chưa tích hợp backend/API).
