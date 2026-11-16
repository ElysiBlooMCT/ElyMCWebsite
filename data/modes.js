/*
  MODULE: CHẾ ĐỘ CHƠI
  Mỗi chế độ là một thẻ. Muốn thêm chế độ mới, copy một khối { ... } rồi sửa.
  - icon: một ký tự hoặc emoji hiện trong ô nhỏ phía trên
  - columns: số cột (2 hoặc 3)
*/
SITE.modes = {
  title: "Chế độ chơi",
  columns: 3,
  items: [
    {
      icon: "♡",
      title: "Survival Co-op",
      text: "Sinh tồn, phát triển căn cứ và bảo vệ thành quả cùng bạn bè.",
    },
    {
      icon: "✦",
      title: "Skyblock",
      text: "Bắt đầu từ hòn đảo nhỏ, mở rộng tài nguyên và xây đế chế trên trời.",
    },
    {
      icon: "✧",
      title: "Mini Games",
      text: "Đua tốc độ, PvP vui vẻ, parkour và nhiều thử thách ngắn theo tuần.",
    },
  ],
};
