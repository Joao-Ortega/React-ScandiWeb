import { configureStore } from '@reduxjs/toolkit';
import currencyReducer from '../Reducers/currenciesSlice';
import productsReducer from '../Reducers/productsSlice';

export const store = configureStore({
  reducer: {
    currencies: currencyReducer,
    products: productsReducer,
  },
});
