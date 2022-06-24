import React, { Component } from 'react'
import { connect } from 'react-redux';
import logo from '../Images/a-logo.svg';
import cart from '../Images/cart.svg';
import { fetchCurrencies } from '../thunks/fetchs';
import { store } from '../store/store';

class NavBarComp extends Component {

  componentDidMount() {
    store.dispatch(fetchCurrencies())
  }

  handleSymbol = ({ target }) => {
    console.log(target.value);
  }

  render() {
    const { arrCurrencies: { currencies } } = this.props;
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
          <select
            name="currencies"
            id="currencies-symbols"
            onChange={ this.handleSymbol }
          >
            { currencies.map(({ symbol, label }) => (
              <option key={symbol} value={symbol}>{symbol}</option>
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

const mapStateToProps = (state) => ({
  arrCurrencies: state.currencies,
});

export default connect(mapStateToProps)(NavBarComp);
