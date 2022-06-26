import { createSlice } from '@reduxjs/toolkit';
import { fetchAllProducts } from '../thunks/fetchs';

const initialState = {
  allProducts: [],
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.allProducts = action.payload;
    })
    builder.addCase(fetchAllProducts.rejected, (state, action) => {
      state.allProducts = action.error.message;
    })
  }
})

export default productsSlice.reducer;