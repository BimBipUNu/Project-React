import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { User } from "../../types/user.type";
import Api from "../../apis";
import { generateToken } from "../../utils/jwt.utils";

const initialState: {
  data: User;
  isLogin: boolean;
  isLoading: boolean;
} = {
  data: {
    id: -1,
    fullName: "",
    email: "",
    password: "",
    role: "user",
    token: "",
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

      // Generate JWT token với jose
      const token = await generateToken(userSelected.id, userSelected.role);

      // Return user data with token
      return {
        ...userSelected,
        token, // JWT token chứa id và role
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const restoreSession = createAsyncThunk(
  "user/restoreSession",
  async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('No token found');
      }

      // Check if token is expired
      const { isTokenExpired } = await import('../../utils/jwt.utils');
      if (isTokenExpired(token)) {
        localStorage.removeItem('token');
        throw new Error('Token expired');
      }

      // Verify token
      const { verifyToken } = await import('../../utils/jwt.utils');
      const payload = await verifyToken(token);
      
      if (!payload) {
        localStorage.removeItem('token');
        throw new Error('Invalid token');
      }

      // Get user data from API
      const res: User[] = await Api.user.GET();
      const userSelected: User | undefined = res.find(
        (user) => user.id.toString() === payload.id.toString()
      );

      if (!userSelected) {
        localStorage.removeItem('token');
        throw new Error('User not found');
      }

      // Return user data with token
      return {
        ...userSelected,
        token,
      };
    } catch (error) {
      console.log('Session restore failed:', error);
      throw error;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = initialState.data;
      state.isLogin = false;
      localStorage.removeItem('token');
      console.log('✅ User logged out');
    },
  },
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
          
          // Lưu token vào localStorage
          if (action.payload.token) {
            localStorage.setItem('token', action.payload.token);
            console.log('✅ JWT Token generated:', action.payload.token);
          }
        }
        state.isLoading = false;
      })
      .addCase(loginFlow.rejected, (state, action) => {
        console.error("Lỗi đăng nhập:", action.error);
        state.isLoading = false;
      })

      //Restore session từ token
      .addCase(restoreSession.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(restoreSession.fulfilled, (state, action) => {
        if (action.payload) {
          state.data = action.payload;
          state.isLogin = true;
          console.log('✅ Session restored from token');
        }
        state.isLoading = false;
      })
      .addCase(restoreSession.rejected, (state) => {
        console.log('ℹ️ No valid session found');
        state.isLoading = false;
      });
  },
});

export const userReducer = userSlice.reducer;
export const userAction = userSlice.actions;
