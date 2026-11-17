/*
  CHÂN TRANG (hiện ở cuối mọi trang)

  text: dòng chữ chính. Gõ {year} để tự chèn năm hiện tại, {name} để chèn tên server.
  links: các link nhỏ cạnh chữ. url dạng "/rules/" (trang trong web) hoặc "https://..." (link ngoài).
         Để trống [] nếu không muốn có link.
  logo: true/false = hiện logo nhỏ ở chân trang.
  backToTop: true = hiện nút "Lên đầu trang", false = ẩn.
*/
SITE.footer = {
  text: "© {year} {name}. Crafted with pink magic.",
  links: [
    { label: "Luật server", url: "/rules/" },
    { label: "Cộng đồng", url: "/community/" },
  ],
  backToTop: true,
  logo: true, // true = hiện logo nhỏ trên chân trang, false = ẩn
};
