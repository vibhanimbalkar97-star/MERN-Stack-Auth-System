import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "./userService";


// fetch profile
export const fetchProfile = createAsyncThunk("user/profile", async(_, thunkAPI) => {
    try{
     const token = thunkAPI.getState().auth.accessToken;
     return await userService.getProfile(token)
    } catch(err){
     const message =
        err.response?.data?.message ||
        err.message ||
        "Failed to fetch profile";

      return thunkAPI.rejectWithValue(message);
    }
})

const initialState = {
  profile: null,
  users: [],
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
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchProfile.pending, (state) => {
        state.isLoading = true
        state.isError = false;
    state.message = "";
    })
    .addCase(fetchProfile.fulfilled, (state,action) => {
        state.isLoading = false
        state.isSuccess = true
        state.profile = action.payload
    })
    .addCase(fetchProfile.rejected, (state, action) => {
        state.isError = true
        state.isLoading = false
        state.isSuccess = false;
        state.message = action.payload
    })
  }
});

export const {reset} = userSlice.actions
export default userSlice.reducer
