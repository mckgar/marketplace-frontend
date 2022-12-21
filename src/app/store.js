import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../features/cart/cartSlice';
import authReducer from '../features/auth/authSlice';
import itemReducer from '../features/item/itemSlice';

export default configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    item: itemReducer
  },
});