import bookingApi from "./booking.api";
import courseApi from "./course.api";
import userApi from "./user.api";

const Api = {
  user: userApi,
  booking: bookingApi,
  course: courseApi,
};

export default Api;
