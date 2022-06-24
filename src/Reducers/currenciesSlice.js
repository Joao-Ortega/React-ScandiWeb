import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currencies: ['$ USD', '€ EUR', '¥ JPY'],
};

export const currencySlice = createSlice({
  name: 'currencies',
  initialState,
  reducers: {
    setCurrencies: (state, action) => {
      state.currencies = [action.payload]
    },
  }
})

export const { setCurrencies } = currencySlice.actions;

export default currencySlice.reducer;