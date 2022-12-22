import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cartService from "./cartService";

const initialState = {
  cart: [],
  populated: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: ''
};

export const populateCart = createAsyncThunk('cart/populateCart', async (_, thunkAPI) => {
  try {
    const cart = thunkAPI.getState().cart.cart;
    if (cart.length === 0) {
      return [];
    }
    const token = thunkAPI.getState().auth.token;
    const response = await cartService.populate(cart, token);
    if (response.message) return thunkAPI.rejectWithValue(response.message);
    return response.populated;
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message)
      || err.message
      || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const index = state.cart.findIndex(x => x.itemid === action.payload.itemid);
      if (index >= 0) {
        const newQuantity = Math.min(state.cart[index].quantity + action.payload.quantity, action.payload.maxQ);
        const item = { itemid: action.payload.itemid, quantity: newQuantity };
        state.cart[index] = item;
      } else {
        state.cart.push({ itemid: action.payload.itemid, quantity: action.payload.quantity });
      }
    },
    removeFromCart: (state, action) => {
      const index = state.cart.findIndex(x => x.itemid === action.payload);
      if (index >= 0) {
        state.cart.splice(index, 1);
      }
    },
    reset: state => {
      state.populated = null;
      state.isLoading = false;
      state.isSuccess= false;
      state.isError = false;
      state.message = '';
    }
  },
  extraReducers: builder => {
    builder
      .addCase(populateCart.pending, state => {
        state.isLoading = true;
      })
      .addCase(populateCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.populated = action.payload;
      })
      .addCase(populateCart.rejected, (state, action) => {
        console.log(action)
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.populated = null;
      })
  }
});

export const { addToCart, removeFromCart, reset } = cartSlice.actions;

export default cartSlice.reducer;
