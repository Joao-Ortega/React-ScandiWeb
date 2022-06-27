import { createSlice } from '@reduxjs/toolkit';
import { fetchCategories } from '../thunks/fetchs';

const initialState = {
  categories: [],
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    })
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.categories = action.error.message;
    })
  }
})

export default categoriesSlice.reducer;