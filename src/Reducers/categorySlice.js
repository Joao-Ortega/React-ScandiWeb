import { createSlice } from '@reduxjs/toolkit';
import { fetchCategories } from '../thunks/fetchs';

const initialState = {
  categories: [],
  mainUrl: '',
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    getMainUrl: (state, action) => {
      state.mainUrl = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    })
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.categories = action.error.message;
    })
  }
})

export const { getMainUrl } = categoriesSlice.actions

export default categoriesSlice.reducer;