import { createSlice } from '@reduxjs/toolkit';
import { currentCartLength } from '../Services/currentCartLength';

const initialState = {
  cartSize: currentCartLength() ,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateCartLength: (state, action) => {
      state.cartSize = action.payload
    }
  },
});

export const { updateCartLength } = cartSlice.actions;

export default cartSlice.reducer;