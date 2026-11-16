/*
  MODULE: CHANGELOG — viết bản cập nhật mới vào đây, trang tự cập nhật.

  CÁCH THÊM BẢN MỚI
  Copy nguyên một khối { version: ..., changes: [...] },
  dán LÊN ĐẦU danh sách entries (bản mới nhất nằm trên cùng), rồi sửa nội dung.

  MỖI DÒNG THAY ĐỔI có dạng:   ["loại", "nội dung"],
  Các loại:
    "new"      = Mới
    "fix"      = Sửa lỗi
    "balance"  = Cân bằng
    "change"   = Thay đổi
    "remove"   = Gỡ bỏ
  Bọc chữ trong **hai dấu sao** để in đậm. Có thể thêm  title: "Tên bản cập nhật",  nếu muốn.

  LƯU Ý: giữ nguyên dấu nháy "..." và dấu phẩy , ở cuối mỗi dòng và mỗi khối.
  Nếu gõ thiếu dấu, mục Changelog sẽ tạm ẩn cho đến khi sửa lại (các mục khác vẫn bình thường).
*/
SITE.changelog = {
  nav: "Changelog",
  title: "Changelog",
  entries: [
    {
      version: "v1.1.0",
      date: "dd/mm/yyyy",
      changes: [
        ["new", "Thêm hỗ trợ chơi trên Bedrock / PE."],
        ["fix", "Mô tả bản vá lỗi tại đây."],
        ["balance", "Mô tả điều chỉnh cân bằng tại đây."],
      ],
    },
    {
      version: "v1.0.0",
      date: "dd/mm/yyyy",
      changes: [["new", "Khai trương ElysiBlooMCT."]],
    },
  ],
};
