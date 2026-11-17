/*
  MODULE: ĐỘI NGŨ
  Mỗi thành viên là một khối { ... }. Copy thêm khối để thêm người.
  - name: tên in-game
  - role: chức vụ (Owner, Admin, Moderator...)
  - avatar: (không bắt buộc) một chữ cái hiện trong ô vuông, hoặc đường dẫn ảnh
            như "images/team/ten.png". Bỏ trống thì lấy chữ cái đầu của tên.
*/
SITE.team = {
  title: "Đội ngũ",
  members: [
    { name: "Tên_InGame", role: "Owner", avatar: "O" },
    { name: "Tên_InGame", role: "Admin", avatar: "A" },
    { name: "Tên_InGame", role: "Moderator", avatar: "M" },
  ],
};
