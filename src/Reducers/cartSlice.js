import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartSize: JSON.parse(localStorage.getItem('cart')) ? JSON
    .parse(localStorage.getItem('cart')).length : 0 ,
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