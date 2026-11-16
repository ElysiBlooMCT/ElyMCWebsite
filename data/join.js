/*
  MODULE: HƯỚNG DẪN THAM GIA
  Mỗi nền tảng (platforms) là một thẻ riêng, gồm tên và các bước.
  Trong bước, gõ {ip} và {port} để tự chèn IP / port từ data/site.js.
  Bọc chữ trong **hai dấu sao** để in đậm.
*/
SITE.join = {
  nav: "Tham gia",
  title: "Hướng dẫn tham gia",
  platforms: [
    {
      name: "Java Edition",
      steps: [
        "Mở Minecraft Java Edition phiên bản tương thích.",
        "Chọn Multiplayer → Add Server.",
        "Nhập tên tùy chọn và IP: **{ip}**.",
        "Bấm Join Server, hoàn tất xác thực trong game và bắt đầu chơi.",
      ],
    },
    {
      name: "Bedrock / PE (điện thoại, Windows)",
      steps: [
        "Mở Minecraft Bedrock Edition (PE) phiên bản tương thích.",
        "Chọn Play → Servers → Add Server.",
        "Nhập tên tùy chọn, địa chỉ **{ip}** và port **{port}**.",
        "Lưu lại, chọn server vừa thêm và bấm Join.",
      ],
    },
  ],
  note: "Không vào được? Kiểm tra lại địa chỉ, port (Bedrock) và phiên bản game của bạn.",
};
