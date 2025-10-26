import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../apis";
import type { BookingDetail } from "../../types/booking.type";

/*
  data: {  BOOKING
    id: -1,
    userId: 1,
    courseId: 101,
    bookingDate: "2025-10-01",
    bookingTime: "09:00",
    status: "confirmed",
  },
   */
const initialState: {
  data: BookingDetail[];
  isLoading: boolean;
} = {
  data: [],
  isLoading: false,
};

export const fetchBooking = createAsyncThunk(
  "booking/fetchBooking",
  async () => {
    const res = await Api.booking.GET();
    return res as BookingDetail[];
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBooking.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBooking.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchBooking.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const bookingReducer = bookingSlice.reducer;
export const bookingAction = bookingSlice.actions;
