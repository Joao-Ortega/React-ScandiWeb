import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../Images/a-logo.svg';
import cart from '../Images/cart.svg';
import arrowDown from '../Images/Vector.svg';
import { fetchCategories, fetchCurrencies } from '../thunks/fetchs';
import { setCurrency } from '../Reducers/currenciesSlice';
import { store } from '../store/store';

class NavBarComp extends Component {
  constructor() {
    super();
    this.state = {
      btnsClasses: ['selected'],
      isClicked: false,
      currentCurrencie: '$'
    };
  }
  componentDidMount() {
    store.dispatch(fetchCurrencies());
    store.dispatch(fetchCategories());
  }

  changeCurrency = () => {
    const { isClicked } = this.state;
    this.setState({ isClicked: !isClicked });
  };

  handleSymbol = ({ target }) => {
    console.log(target.value);
  };

  currencyClick = ({ target: { id } }) => {
    this.setState({
      isClicked: false,
      currentCurrencie: id,
    });
    store.dispatch(setCurrency(id))
  }

  handleClick = ({ target }) => {
    const { changeCategory } = this.props;
    changeCategory(target.name);
    const newClasses = [];
    newClasses[target.value] = "selected";
    this.setState({ btnsClasses: newClasses });
  };

  treatName = (str) => {
    return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
  };

  render() {
    const {
      arrCurrencies: { currencies },
      arrCategories: { categories },
    } = this.props;
    const { btnsClasses, isClicked, currentCurrencie } = this.state;
    return (
      <div className="navigation-bar">
        <div className="sections-container">
          {categories &&
            categories.map(({ name }, i) => (
              <button
                key={i}
                className={`sections ${btnsClasses[i]}`}
                value={i}
                name={name}
                onClick={this.handleClick}
              >
                {name}
              </button>
            ))}
        </div>
        <div className="store-logo">
          <img src={logo} alt="store logo" />
        </div>
        <div className="currencies-and-cart-container">
          <div className="select-currencies-container">
            <button
              type="button"
              className="currencies-btn"
              onClick={this.changeCurrency}
            >
              {currentCurrencie} <img src={arrowDown} alt="arrow down" id="arrow-down" />
            </button>
            {isClicked && (
              <div className="currencies-label">
                { currencies.map(({ symbol, label }) => (
                <button
                  type="button"
                  key={symbol}
                  id={symbol}
                  className="options"
                  onClick={ this.currencyClick }
                >
                  {`${symbol} ${label}`}
                </button>
              )) }
              </div>
            )}
          </div>
          {/* <select
            name="currencies"
            id="currencies-symbols"
            onChange={ this.handleSymbol }
          > */}
          {/* { currencies.map(({ symbol, label }) => (
              <span key={symbol} value={symbol}>{`${symbol} ${label}`}</span>
            )) } */}
          {/* </select> */}
          <div>
            <img src={cart} alt="shopping cart" className="cart-img" />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  arrCurrencies: state.currencies,
  arrCategories: state.categories,
});

export default connect(mapStateToProps)(NavBarComp);
