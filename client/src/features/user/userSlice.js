import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "./userService";

// fetch profile
export const fetchProfile = createAsyncThunk(
  "user/profile",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.accessToken;
      return await userService.getProfile(token);
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Failed to fetch profile";

      return thunkAPI.rejectWithValue(message);
    }
  },
);

// fetch users
export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async ({ page, limit }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.accessToken;
      return userService.getUsers({ page, limit, token });
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Failed to fetch profile";

      return thunkAPI.rejectWithValue(message);
    }
  },
);

// delete user
export const removeUser = createAsyncThunk(
  "user/deleteUser",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.accessToken;

      //  refetch users after delete
      const { page, limit } = thunkAPI.getState().user;

      // delete user
      await userService.deleteUser({ id, token });

      // refetch updated users
      return await userService.getUsers({ page, limit, token });
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Delete failed";
      return thunkAPI.rejectWithValue(message);
    }
  },
);

const initialState = {
  profile: null,
  users: [],
  page: 1,
  limit: 2,
  totalPages: 1,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      // profile
      .addCase(fetchProfile.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      })
      // users
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload.users;
        state.totalPages = action.payload.totalPages;
        state.page = action.payload.currentPage;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      // delete
      .addCase(removeUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })

      .addCase(removeUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload.users;
        state.totalPages = action.payload.totalPages;

        // if page becomes empty
        if (action.payload.users.length === 0 && state.page > 1) {
          state.page -= 1;
        } else {
          state.page = action.payload.currentPage;
        }
      })

      .addCase(removeUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, setPage } = userSlice.actions;
export default userSlice.reducer;
