export interface User {
  id: number; // Mã định danh người dùng
  email: string; // Địa chỉ email đăng nhập
  password: string; // Mật khẩu
  fullName: string; // Họ và tên người dùng
  role: "admin" | "user"; // Quyền người dùng
  phone?: string; // Số điện thoại
}
