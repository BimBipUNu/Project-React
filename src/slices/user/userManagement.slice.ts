//Silce user với state danh sách user cho Admin quản lý
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../apis";
import type { User } from "../../types/user.type";

const initialState: {
  data: User[];
  isLoading: boolean;
} = {
  data: [],
  isLoading: false,
};

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const res = await Api.user.GET();
  return res as User[];
});
export const deleteUser = createAsyncThunk(
  "user/delete",
  async (data: User) => {
    const res = await Api.user.DELETE(data);
    return res;
  }
);
export const updateUser = createAsyncThunk(
  "user/update",
  async (data: User) => {
    const res = await Api.user.PUT(data);
    return res;
  }
);
export const addNewUserByAdmin = createAsyncThunk(
  "user/addNewUserByAdmin",
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

const userManagementSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //fetch
    builder.addCase(fetchUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchUser.rejected, (state) => {
      state.isLoading = false;
    });
    //Add
    builder
      //Đăng ký
      .addCase(addNewUserByAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewUserByAdmin.fulfilled, (state) => {
        state.isLoading = false;
        // if (action.payload) {
        //   state.data = action.payload;
        // }
      })
      .addCase(addNewUserByAdmin.rejected, (state, action) => {
        console.error("Lỗi đăng ký:", action.error);
        state.isLoading = false;
      });

    //Delete
    builder.addCase(deleteUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.data = state.data.filter((booking) => booking.id != action.payload);
      state.isLoading = false;
    });
    builder.addCase(deleteUser.rejected, (state) => {
      state.isLoading = false;
    });

    //Update
    builder.addCase(updateUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      const index = state.data.findIndex(
        (booking) => booking.id === action.payload.id
      );
      if (index !== -1) {
        // Lấy lại đầy đủ thông tin user và course
        state.data[index] = action.payload;
      }
      state.isLoading = false;
    });
    builder.addCase(updateUser.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const userManagementReducer = userManagementSlice.reducer;
export const userManagementAction = userManagementSlice.actions;
