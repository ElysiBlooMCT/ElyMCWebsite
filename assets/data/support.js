/*
  MODULE: ỦNG HỘ & VOTE
  Mỗi mục là một thẻ, có thể kèm các nút (buttons).
  - url: link thật, ví dụ "https://..." (đang để "#" là chưa có link, bấm sẽ chỉ nhảy lên đầu trang)
  - style: "primary" (nút hồng đặc) hoặc "secondary" (nút viền)
  - columns: số cột (2 hoặc 3)
*/
SITE.support = {
  title: "Ủng hộ & Vote",
  columns: 2,
  items: [
    {
      icon: "♡",
      title: "Ủng hộ server",
      text: "Sự ủng hộ của bạn giúp server duy trì máy chủ và phát triển thêm nhiều tính năng mới.",
      buttons: [{ label: "Ủng hộ ngay", url: "#", style: "primary" }],
    },
    {
      icon: "✦",
      title: "Vote cho server",
      text: "Bình chọn cho ElysiBlooMCT để server được nhiều người chơi biết đến hơn.",
      buttons: [{ label: "Vote ngay", url: "#", style: "primary" }],
    },
  ],
};
