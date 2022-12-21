import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

const initialState = {
  username: null,
  token: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
};

export const register = createAsyncThunk('auth/register', async (body, thunkAPI) => {
  try {
    const response = await authService.register(body);
    if (response.errors) {
      return thunkAPI.rejectWithValue(response.errors);
    }
    return { token: response.token, username: body.username };
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message)
      || err.message
      || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const login = createAsyncThunk('auth/login', async (body, thunkAPI) => {
  try {
    const response = await authService.login(body);
    if (response.errors) {
      return thunkAPI.rejectWithValue(response.errors);
    }
    return { token: response.token, username: body.username };
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message)
      || err.message
      || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  return true;
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: state => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    }
  },
  extraReducers: builder => {
    builder
      .addCase(register.pending, state => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.token = action.payload.token;
        state.username = action.payload.username;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.token = null;
      })
      .addCase(login.pending, state => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.token = action.payload.token;
        state.username = action.payload.username;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.token = null;
      })
      .addCase(logout.fulfilled, state => {
        state.token = null;
        state.username = null;
      })
  }
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
