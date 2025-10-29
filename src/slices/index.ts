import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./user/user.slice";
import { bookingReducer } from "./booking/booking.slice";
import { userManagementReducer } from "./user/userManagement.slice";
import { courseReducer } from "./course/course.slice";

const store = configureStore({
  reducer: {
    user: userReducer,
    userManagement: userManagementReducer,
    booking: bookingReducer,
    course: courseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
