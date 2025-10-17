export interface Booking {
  id: number; // Mã định danh booking
  userId: number; // ID người dùng (ví dụ: Nguyễn Văn A)
  courseId: number; // ID khóa học (ví dụ: Yoga Giảm Cân)
  bookingDate: string; // Ngày đặt lịch (định dạng: YYYY-MM-DD)
  bookingTime: string; // Giờ đặt lịch (định dạng: HH:mm)
  status: "confirmed" | "pending" | "cancelled"; // Trạng thái booking
}
