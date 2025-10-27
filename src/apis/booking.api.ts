import axios from "axios";
import type { Booking, BookingDetail } from "../types/booking.type";
import type { User } from "../types/user.type";
import type { Course } from "../types/course.type";

async function addNewBooking(data: Booking) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_LOCALHOST_API}/bookings`,
      data
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
      user: users.find((u: User) => u.id == b.userId), // Dùng == nếu không, cần stringtify lại dữ liệu, đang so khớp 1 == "1" => true
      course: courses.find((c: Course) => c.id == b.courseId),
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
    const response = await axios.put(
      `${import.meta.env.VITE_LOCALHOST_API}/bookings/${data.id}`,
      data
    );
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

const bookingApi = {
  GET: getAllBooking,
  POST: addNewBooking,
  DELETE: deleteBooking,
  PUT: updateBooking,
};

export default bookingApi;
