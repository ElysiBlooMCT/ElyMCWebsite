/*
  MODULE: TRANG CHỦ — phần "Khám phá" bên dưới thẻ IP
  Mỗi thẻ dẫn tới một trang. Link nội bộ viết dạng "/tên-trang/".
  Muốn bỏ một thẻ thì xoá cả khối { ... } của nó.
*/
SITE.home = {
  title: "Khám phá ElysiBlooMCT",
  columns: 3,
  items: [
    {
      icon: "♡",
      title: "Giới thiệu",
      text: "Server là gì và có gì đặc biệt.",
      buttons: [{ label: "Xem chi tiết", url: "/about/", style: "secondary" }],
    },
    {
      icon: "✦",
      title: "Chế độ chơi",
      text: "Survival, Skyblock, Mini Games và nhiều hơn nữa.",
      buttons: [{ label: "Xem chi tiết", url: "/modes/", style: "secondary" }],
    },
    {
      icon: "✧",
      title: "Hướng dẫn tham gia",
      text: "Vào server bằng Java hoặc Bedrock / PE.",
      buttons: [{ label: "Xem chi tiết", url: "/join/", style: "secondary" }],
    },
    {
      icon: "♡",
      title: "Luật server",
      text: "Những điều cần nhớ để cùng chơi vui.",
      buttons: [{ label: "Xem chi tiết", url: "/rules/", style: "secondary" }],
    },
    {
      icon: "✦",
      title: "Đội ngũ",
      text: "Gặp đội ngũ vận hành ElysiBlooMCT.",
      buttons: [{ label: "Xem chi tiết", url: "/team/", style: "secondary" }],
    },
    {
      icon: "✧",
      title: "Changelog",
      text: "Theo dõi các bản cập nhật mới nhất.",
      buttons: [{ label: "Xem chi tiết", url: "/changelog/", style: "secondary" }],
    },
    {
      icon: "♡",
      title: "Ủng hộ & Vote",
      text: "Ủng hộ và vote để server phát triển.",
      buttons: [{ label: "Xem chi tiết", url: "/support/", style: "secondary" }],
    },
    {
      icon: "✦",
      title: "Cộng đồng & liên hệ",
      text: "Discord, mạng xã hội và kênh liên hệ.",
      buttons: [{ label: "Xem chi tiết", url: "/community/", style: "secondary" }],
    },
    {
      icon: "✧",
      title: "FAQ",
      text: "Giải đáp nhanh các câu hỏi thường gặp.",
      buttons: [{ label: "Xem chi tiết", url: "/faq/", style: "secondary" }],
    },
  ],
};
