import React from 'react';
import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import currencyReducer from '../Reducers/currenciesSlice';
import productsReducer from '../Reducers/productsSlice';
import categoriesReducer from '../Reducers/categorySlice';
import cartSlice from '../Reducers/cartSlice';
import { categories } from './mocks/categoriesMock';
import { products } from './mocks/productsMock';
import { currencies } from './mocks/currencyMock';
import { cart } from './mocks/cartSizeMock';
import { BrowserRouter } from 'react-router-dom';

// As a basic setup, import your same slice reducers

export function renderWithProviders(
  ui,
  {
    preloadedState = {
      categories,
      products,
      currencies,
      cart,
    },
    // Automatically create a store instance if no store was passed in
    store = configureStore(
      { reducer: {
        currencies: currencyReducer,
        products: productsReducer,
        categories: categoriesReducer,
        cart: cartSlice,
        }, preloadedState
      }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <BrowserRouter><Provider store={store}>{children}</Provider></BrowserRouter>
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}