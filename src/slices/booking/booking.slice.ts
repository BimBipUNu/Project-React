import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../apis";
import type { Booking, BookingDetail } from "../../types/booking.type";
import type { BookingStatistics } from "../../apis/booking.api";

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
  statistics: BookingStatistics; // tính toán số loại lớp học
} = {
  data: [],
  isLoading: false,
  statistics: {
    gym: 0,
    yoga: 0,
    zumba: 0,
  },
};

export const fetchBooking = createAsyncThunk(
  "booking/fetchBooking",
  async () => {
    const res = await Api.booking.GET();
    return res as BookingDetail[];
  }
);
export const deleteBooking = createAsyncThunk(
  "booking/delete",
  async (data: Booking) => {
    const res = await Api.booking.DELETE(data);
    return res;
  }
);
export const updateBooking = createAsyncThunk(
  "booking/update",
  async (data: Booking) => {
    const res = await Api.booking.PUT(data);
    return res;
  }
);

export const fetchBookingStatistics = createAsyncThunk(
  "booking/fetchBookingStatistics",
  async () => {
    const res = await Api.booking.GET_STATISTICS();
    return res as BookingStatistics;
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

    //Delete
    builder.addCase(deleteBooking.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteBooking.fulfilled, (state, action) => {
      state.data = state.data.filter((booking) => booking.id != action.payload);
      state.isLoading = false;
    });
    builder.addCase(deleteBooking.rejected, (state) => {
      state.isLoading = false;
    });

    //Update
    builder.addCase(updateBooking.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateBooking.fulfilled, (state, action) => {
      const index = state.data.findIndex(
        (booking) => booking.id === action.payload.id
      );
      if (index !== -1) {
        // Lấy lại đầy đủ thông tin user và course
        state.data[index] = action.payload;
      }
      state.isLoading = false;
    });
    builder.addCase(updateBooking.rejected, (state) => {
      state.isLoading = false;
    });

    //Statistics
    builder.addCase(fetchBookingStatistics.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBookingStatistics.fulfilled, (state, action) => {
      state.statistics = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchBookingStatistics.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const bookingReducer = bookingSlice.reducer;
export const bookingAction = bookingSlice.actions;
