import React, { Component } from 'react'
import logo from '../Images/a-logo.svg';
import cart from '../Images/cart.svg';
import { currencies } from '../Services/currencies';

export default class NavBarComp extends Component {
  render() {
    return (
      <div className="navigation-bar">
        <div className="sections-container">
          <span className="sections">All</span>
          <span className="sections">Clothes</span>
          <span className="sections">Tech</span>
        </div>
        <div className="store-logo">
          <img src={logo} alt="store logo" />
        </div>
        <div className="currencies-and-cart-container">
          <select name="currencies" id="currencies-symbols">
            { currencies.map((currency) => (
              <option key={currency} value={currency.split(' ')[0]}>{currency}</option>
            )) }
          </select>
          <div>
            <img src={cart} alt="shopping cart" className="cart-img" />
          </div>
        </div>
      </div>
    )
  }
}
