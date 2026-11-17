/*
  THÔNG TIN CHUNG CỦA SERVER VÀ MENU

  Sửa ở đây thì IP / port tự đổi ở mọi nơi trên trang
  (thẻ IP đầu trang, hướng dẫn tham gia, FAQ...).

  Trong các file data khác, gõ {ip} hoặc {port} để chèn giá trị này.
  Muốn in đậm một đoạn chữ, bọc nó trong **hai dấu sao**.
*/
SITE.server = {
  name: "ElysiBlooMCT",
  ip: "mc.elysibloomct.qzz.io", // địa chỉ cho cả Java và Bedrock
  bedrockPort: 36918, // port cho Bedrock / PE
  chips: ["Java Edition", "Bedrock / PE", "Miễn phí"], // các nhãn nhỏ trong thẻ IP
};

/*
  MENU Ở ĐẦU TRANG (hiện trên mọi trang)
  Mỗi dòng là một mục: label = chữ hiện trên menu, url = địa chỉ trang, viết dạng "/tên-trang/".
  Thứ tự các dòng là thứ tự trên menu. Xoá một dòng để ẩn mục đó khỏi menu.
*/
SITE.nav = [
  { label: "Giới thiệu", url: "/about/" },
  { label: "Chế độ chơi", url: "/modes/" },
  { label: "Tham gia", url: "/join/" },
  { label: "Luật", url: "/rules/" },
  { label: "Đội ngũ", url: "/team/" },
  { label: "Changelog", url: "/changelog/" },
  { label: "Ủng hộ", url: "/support/" },
  { label: "Cộng đồng", url: "/community/" },
  { label: "FAQ", url: "/faq/" },
];
