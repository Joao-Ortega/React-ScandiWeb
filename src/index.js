import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './Style/global.css';
import './Style/navBar.css'
import './Style/plp.css';
import './Style/pdp.css';
import './Style/itemsInCart.css';
import './Style/cart.css';

const container = document.getElementById('root');
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);