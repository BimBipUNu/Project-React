import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./user/user.slice";
import { bookingReducer } from "./booking/booking.slice";

const store = configureStore({
  reducer: {
    user: userReducer,
    booking: bookingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
