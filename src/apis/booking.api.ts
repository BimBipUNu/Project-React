import axios from "axios";
import type { Booking, BookingDetail } from "../types/booking.type";
import type { User } from "../types/user.type";
import type { Course } from "../types/course.type";

async function addNewBooking(data: Booking) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_LOCALHOST_API}/bookings`,
      { ...data, id: String(Date.now()) } //parse Id về string lưu JSON
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function getAllBooking() {
  try {
    // Gọi song song 3 API để nhanh hơn
    const [bookingsRes, usersRes, coursesRes] = await Promise.all([
      axios.get(`${import.meta.env.VITE_LOCALHOST_API}/bookings`),
      axios.get(`${import.meta.env.VITE_LOCALHOST_API}/users`),
      axios.get(`${import.meta.env.VITE_LOCALHOST_API}/courses`),
    ]);

    const bookings = bookingsRes.data;
    const users = usersRes.data;
    const courses = coursesRes.data;

    // Nối thêm user + course vào mỗi booking
    const merged: BookingDetail[] = bookings.map((b: Booking) => ({
      ...b,
      user: b.userId ? users.find((u: User) => u.id === b.userId) : undefined,
      course: courses.find((c: Course) => c.id === b.courseId),
    }));

    return merged;
  } catch (error) {
    console.error("Error loading bookings:", error);
    throw error;
  }
}

export async function deleteBooking(data: Booking) {
  try {
    await axios.delete(
      `${import.meta.env.VITE_LOCALHOST_API}/bookings/${data.id}`
    );
    return data.id;
  } catch (err) {
    console.log(err);
  }
}

export async function updateBooking(data: Booking) {
  try {
    const bookingData = {
      id: data.id,
      userId: data.userId,
      courseId: data.courseId,
      bookingDate: data.bookingDate,
      bookingTime: data.bookingTime,
      status: data.status,
    };

    const response = await axios.put(
      `${import.meta.env.VITE_LOCALHOST_API}/bookings/${data.id}`,
      bookingData
    );
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export interface BookingStatistics {
  gym: number;
  yoga: number;
  zumba: number;
  [key: string]: number;
}

export async function getBookingStatistics(): Promise<BookingStatistics> {
  try {
    // Gọi song song API để lấy bookings và courses
    const [bookingsRes, coursesRes] = await Promise.all([
      axios.get(`${import.meta.env.VITE_LOCALHOST_API}/bookings`),
      axios.get(`${import.meta.env.VITE_LOCALHOST_API}/courses`),
    ]);

    const bookings = bookingsRes.data;
    const courses = coursesRes.data;

    // Nối course vào mỗi booking
    const bookingsWithCourses = bookings.map((b: Booking) => ({
      ...b,
      course: courses.find((c: Course) => c.id === b.courseId),
    }));

    // Khởi tạo statistics với các loại lớp học phổ biến
    const statistics: BookingStatistics = {
      gym: 0,
      yoga: 0,
      zumba: 0,
    };

    // Đếm số lượng booking theo từng loại class
    bookingsWithCourses.forEach((booking: BookingDetail) => {
      if (booking.course?.type) {
        const type = booking.course.type.toLowerCase();
        if (statistics[type] !== undefined) {
          statistics[type]++;
        } else {
          statistics[type] = 1;
        }
      }
    });

    return statistics;
  } catch (error) {
    console.error("Error loading booking statistics:", error);
    throw error;
  }
}

const bookingApi = {
  GET: getAllBooking,
  POST: addNewBooking,
  DELETE: deleteBooking,
  PUT: updateBooking,
  GET_STATISTICS: getBookingStatistics,
};

export default bookingApi;
