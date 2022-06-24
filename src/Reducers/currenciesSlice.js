import { createSlice } from '@reduxjs/toolkit';
import { fetchCurrencies } from '../thunks/fetchs';

const initialState = {
  currencies: [],
};

export const currencySlice = createSlice({
  name: 'currencies',
  initialState,
  reducers: {
    setCurrencies: (state, action) => {
      state.currencies = [action.payload]
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrencies.fulfilled, (state, action) => {
      state.currencies = action.payload
    })
  }
})

export const { setCurrencies } = currencySlice.actions;

export default currencySlice.reducer;