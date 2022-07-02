import { createSlice } from '@reduxjs/toolkit';
import { fetchCurrencies } from '../thunks/fetchs';

const initialState = {
  currencies: [],
  currCurrency: '$',
};

export const currencySlice = createSlice({
  name: 'currencies',
  initialState,
  reducers: {
    setCurrency: (state, action) => {
      state.currCurrency = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrencies.fulfilled, (state, action) => {
      state.currencies = action.payload
    })
  }
})

export const { setCurrency } = currencySlice.actions;

export default currencySlice.reducer;