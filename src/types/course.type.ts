export interface Course {
  id: number; // Mã định danh khóa học
  name: string; // Tên khóa học
  type: string; // Loại (Gym, Yoga, Zumba...)
  description: string; // Mô tả ngắn gọn
  price: number; // Giá tiền
  imageUrl: string; // Ảnh minh họa
}
