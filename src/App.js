import React, { Component } from 'react'
import { Route, Routes } from 'react-router-dom'
import Cart from './Pages/Cart';
import PDP from './Pages/PDP'
import PLP from './Pages/PLP'
import { store } from './store/store';
import { fetchCategories, fetchCurrencies } from './thunks/fetchs';
import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});

class App extends Component {
  componentDidMount() {
    store.dispatch(fetchCurrencies());
    store.dispatch(fetchCategories());
  }

  render() {
    return (
      <Routes>
        <Route exact path='/' element={<PLP />} />
        <Route exact path='/:id' element={<PDP />} />
        <Route exact path='/cart' element={<Cart />} />
      </Routes>
    )
  }
}

export default App;

