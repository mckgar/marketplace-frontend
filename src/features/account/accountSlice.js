import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import accountService from "./accountService";

const initialState = {
  response: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
};

export const getAccount = createAsyncThunk('account/getAccount', async (username, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    const response = await accountService.getAccount(username, token);
    if (response.message) return thunkAPI.rejectWithValue(response.message);
    return response;
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message)
      || err.message
      || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    reset: state => {
      state.response = null;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getAccount.pending, state => {
        state.isLoading = true;
      })
      .addCase(getAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.response = action.payload;
      })
      .addCase(getAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.response = null;
      })
  }
});

export const { reset } = accountSlice.actions;

export default accountSlice.reducer;
