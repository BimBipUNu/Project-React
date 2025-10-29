import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../apis";
import type { Course } from "../../types/course.type";

const initialState: {
  data: Course[];
  isLoading: boolean;
} = {
  data: [],
  isLoading: false,
};

export const fetchCourse = createAsyncThunk("course/fetchCourse", async () => {
  const res = await Api.course.GET();
  return res as Course[];
});
export const deleteCourse = createAsyncThunk(
  "course/delete",
  async (data: Course) => {
    const res = await Api.course.DELETE(data);
    return res;
  }
);
export const updateCourse = createAsyncThunk(
  "course/update",
  async (data: Course) => {
    const res = await Api.course.PUT(data);
    return res;
  }
);
export const addNewCourse = createAsyncThunk(
  "course/addNewCourse",
  async (data: Course) => {
    try {
      const result = await Api.course.POST(data);
      return result;
    } catch (error) {
      console.log("ERROR", error);
      throw error;
    }
  }
);

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCourse.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCourse.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchCourse.rejected, (state) => {
      state.isLoading = false;
    });

    //Add
    builder
      .addCase(addNewCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewCourse.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addNewCourse.rejected, (state, action) => {
        console.error("Lỗi đăng ký:", action.error);
        state.isLoading = false;
      });

    //Delete
    builder.addCase(deleteCourse.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteCourse.fulfilled, (state, action) => {
      state.data = state.data.filter((booking) => booking.id != action.payload);
      state.isLoading = false;
    });
    builder.addCase(deleteCourse.rejected, (state) => {
      state.isLoading = false;
    });

    //Update
    builder.addCase(updateCourse.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateCourse.fulfilled, (state, action) => {
      const index = state.data.findIndex(
        (booking) => booking.id === action.payload.id
      );
      if (index !== -1) {
        // Lấy lại đầy đủ thông tin user và course
        state.data[index] = action.payload;
      }
      state.isLoading = false;
    });
    builder.addCase(updateCourse.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const courseReducer = courseSlice.reducer;
export const courseAction = courseSlice.actions;
