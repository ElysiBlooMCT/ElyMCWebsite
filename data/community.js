/*
  MODULE: CỘNG ĐỒNG & LIÊN HỆ
  Cách viết giống data/support.js. Thay url: "#" bằng link thật
  (Discord, Facebook, TikTok...). Link bắt đầu bằng https:// sẽ tự mở ở tab mới.
*/
SITE.community = {
  title: "Cộng đồng & liên hệ",
  columns: 3,
  items: [
    {
      icon: "✦",
      title: "Discord",
      text: "Trò chuyện, tìm bạn chơi chung và nhận thông báo mới nhất từ server.",
      buttons: [{ label: "Vào Discord", url: "#", style: "primary" }],
    },
    {
      icon: "♡",
      title: "Mạng xã hội",
      text: "Theo dõi ElysiBlooMCT để xem video, hình ảnh và tin tức mới.",
      buttons: [
        { label: "Facebook", url: "#", style: "secondary" },
        { label: "TikTok", url: "#", style: "secondary" },
      ],
    },
    {
      icon: "✧",
      title: "Liên hệ & báo cáo",
      text: "Gặp lỗi hoặc người chơi vi phạm? Mở ticket trên Discord hoặc nhắn trực tiếp cho đội ngũ.",
      buttons: [{ label: "Gửi báo cáo", url: "#", style: "secondary" }],
    },
  ],
};
