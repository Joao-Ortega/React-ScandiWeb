import { createSlice } from '@reduxjs/toolkit';
import { currentCartLength } from '../Services/currentCartLength';

const initialState = {
  cartSize: currentCartLength() ,
  cartOverlay: false,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateCartLength: (state, action) => {
      state.cartSize = action.payload
    },
    showPreview: (state) => {
      state.cartOverlay = true
    },
    hidePreview: (state) => {
      state.cartOverlay = false
    }
  },
});

export const { updateCartLength, showPreview, hidePreview } = cartSlice.actions;

export default cartSlice.reducer;