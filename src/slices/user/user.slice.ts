import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { User } from "../../types/user.type";
import Api from "../../apis";
const initialState = {
  data: {
    id: -1,
    fullName: "",
    email: "",
    password: "",
    role: "user",
  },
  isLogin: false,
  isLoading: false,
};

export const addNewUser = createAsyncThunk(
  "user/addNewUser",
  async (data: User) => {
    try {
      const result = await Api.user.POST(data);
      return result;
    } catch (error) {
      console.log("ERROR", error);
      throw error;
    }
  }
);
export const loginFlow = createAsyncThunk(
  "user/login",
  //Truyền user cần check tài khoản
  async (data: { email: string; password: string }) => {
    try {
      const res: User[] = await Api.user.GET();
      const userSelected: User | undefined = res.find(
        (user) => user.email === data.email && user.password === data.password
      );

      if (!userSelected) {
        throw new Error("Email hoặc mật khẩu không đúng");
      }
      return userSelected;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Đăng ký
      .addCase(addNewUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewUser.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.data = action.payload;
        }
      })
      .addCase(addNewUser.rejected, (state, action) => {
        console.error("Lỗi đăng ký:", action.error);
        state.isLoading = false;
      })

      //Đăng nhập
      .addCase(loginFlow.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginFlow.fulfilled, (state, action) => {
        if (action.payload) {
          state.data = action.payload;
          state.isLogin = true;
        }
        state.isLoading = false;
      })
      .addCase(loginFlow.rejected, (state, action) => {
        console.error("Lỗi đăng nhập:", action.error);
        state.isLoading = false;
      });
  },
});

export const userReducer = userSlice.reducer;
export const userAction = userSlice.actions;
