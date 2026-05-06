import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

// check auth
export const refreshToken = createAsyncThunk(
  "/auth/refresh",
  async (_, thunkAPI) => {
    try {
      return await authService.refresh();
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// logout user
export const logoutUser = createAsyncThunk("auth/logout", async(_, thunkAPI) => {
 try{
 return await authService.logout()
 } catch(err){
   const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
   return thunkAPI.rejectWithValue(message)
 }
})

// login user
export const loginUser = createAsyncThunk("auth/login", async (formData, thunkAPI) => {
  try{
   return await authService.login(formData) 
  } catch(err){
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
   return thunkAPI.rejectWithValue(message)
  }
})

// register user
export const registerUser = createAsyncThunk("auth/register", async(formData, thunkAPI) => {
  try{
  return await authService.register(formData)
  } catch(err){
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
   return thunkAPI.rejectWithValue(message)
  }
})

const initialState = {
  user: null,
  accessToken: null,
  isLoading: true,
  isError: false,
  isSuccess: false,
  message: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
    // refresh token
      .addCase(refreshToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.accessToken = action.payload.accessToken
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.user = null
        state.accessToken = null
        state.isLoading = false
        state.isError = true
        state.message = action.payload;
      })
      // logout user
      .addCase(logoutUser.pending, (state) => {
        state.isLoading=true
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null
        state.accessToken = null
        state.isLoading=false
  
      })
      .addCase(logoutUser.rejected, (state, action) =>{
        state.isLoading=false
        state.isError=true
        state.message=action.payload
      })
      // login user
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(loginUser.fulfilled, (state,action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload.user
        state.accessToken = action.payload.accessToken
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // register user
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(registerUser.fulfilled, (state,action) => {
        state.isLoading = false
        state.isSuccess = true
        state.accessToken = action.payload.accessToken
        state.user = action.payload.user
        state.message = action.payload
      })
      .addCase(registerUser.rejected, (state, action) =>{
        state.isError = true
        state.isLoading = false
        state.message = action.payload
      })
  },
});

export const {reset} = authSlice.actions
export default authSlice.reducer

