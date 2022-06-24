import { configureStore } from '@reduxjs/toolkit';
import currencyReducer from '../Reducers/currenciesSlice';

export const store = configureStore({
  reducer: {
    currencies: currencyReducer,
  },
});
