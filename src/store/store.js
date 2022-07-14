import { configureStore } from '@reduxjs/toolkit';
import currencyReducer from '../Reducers/currenciesSlice';
import productsReducer from '../Reducers/productsSlice';
import categoriesReducer from '../Reducers/categorySlice'
import cartSlice from '../Reducers/cartSlice';

export const store = configureStore({
  reducer: {
    currencies: currencyReducer,
    products: productsReducer,
    categories: categoriesReducer,
    cart: cartSlice,
  },
});
