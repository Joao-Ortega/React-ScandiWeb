import { configureStore } from '@reduxjs/toolkit';
import currencyReducer from '../Reducers/currenciesSlice';
import productsReducer from '../Reducers/productsSlice';
import categoriesReducer from '../Reducers/categorySlice'

export const store = configureStore({
  reducer: {
    currencies: currencyReducer,
    products: productsReducer,
    categories: categoriesReducer,
  },
});
