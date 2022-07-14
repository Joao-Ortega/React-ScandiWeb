import React, { Component } from 'react'
import { Route, Routes } from 'react-router-dom'
import Cart from './Pages/Cart';
import PDP from './Pages/PDP'
import PLP from './Pages/PLP'
import { store } from './store/store';
import { fetchCategories, fetchCurrencies } from './thunks/fetchs';

export default class App extends Component {
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

