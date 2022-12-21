import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import itemService from "./itemService";

const initialState = {
  response: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
};

export const getItem = createAsyncThunk('item/getItem', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    const response = await itemService.getItem(id, token);
    if (response.message) return thunkAPI.rejectWithValue(response.message);
    return response.item;
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message)
      || err.message
      || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getItems = createAsyncThunk('item/getItems',
  async (queries, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token || '';
      const response = await itemService.getItems(...queries, token);
      if (response.message) return thunkAPI.rejectWithValue(response.message);
      return response.items;
    } catch (err) {
      console.log(err)
      const message = (err.response && err.response.data && err.response.data.message)
        || err.message
        || err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  });

export const createItem = createAsyncThunk('item/createItem', async (body, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token || '';
    const response = await itemService.createItem(body, token);
    if (response.message) return thunkAPI.rejectWithValue(response.message);
    return response;
  } catch (err) {
    console.log(err)
    const message = (err.response && err.response.data && err.response.data.message)
      || err.message
      || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const itemSlice = createSlice({
  name: 'item',
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
      .addCase(getItem.pending, state => {
        state.isLoading = true;
      })
      .addCase(getItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.response = action.payload;
      })
      .addCase(getItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.response = null;
      })
      .addCase(getItems.pending, state => {
        state.isLoading = true;
      })
      .addCase(getItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.response = action.payload;
      })
      .addCase(getItems.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.response = null;
      })

      .addCase(createItem.pending, state => {
        state.isLoading = true;
      })
      .addCase(createItem.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.response = null;
      })
  }
});

export const { reset } = itemSlice.actions;

export default itemSlice.reducer;
