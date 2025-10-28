import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./user/user.slice";
import { bookingReducer } from "./booking/booking.slice";
import { userManagementReducer } from "./user/userManagement.slice";

const store = configureStore({
  reducer: {
    user: userReducer,
    userManagement: userManagementReducer,
    booking: bookingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
