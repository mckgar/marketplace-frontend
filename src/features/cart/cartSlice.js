import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // cart items: { item: item, quantity: integer }
    // item: { item_id: uuid, ... }
    addToCart: (state, action) => {
      const index = state.findIndex(x => x.item.item_id === action.payload.item.item_id);
      if (index >= 0) {
        const newQuantity = state[index].quantity + action.payload.quantity;
        const item = { item: state[index].item, quantity: newQuantity };
        state[index] = item;
      } else {
        state.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      const index = state.findIndex(x => x.item.item_id === action.payload);
      if (index >= 0) {
        state.splice(index, 1);
      }
    }
  }
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
