import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { User } from "../../types/user.type";
import Api from "../../apis";
const initialState: User = {
  id: -1,
  fullName: "",
  email: "",
  password: "",
  role: "user",
};

export const addNewUser = createAsyncThunk(
  "user/addNewUser",
  async (data: User) => {
    try {
      const result = await Api.user.POST(data);
      return result;
    } catch (error) {
      console.log("ERROR", error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewUser.pending, () => {
        console.log("Đang đăng ký...");
      })
      .addCase(addNewUser.fulfilled, (state, action) => {
        console.log("Đăng ký thành công:", action.payload);
        return { ...state, ...action.payload };
      })
      .addCase(addNewUser.rejected, () => {
        console.error("Lỗi đăng ký");
      });
  },
});

export const userReducer = userSlice.reducer;
export const userAction = userSlice.actions;
