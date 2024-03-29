import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../Images/a-logo.svg';
import cart from '../Images/cart.svg';
import arrowDown from '../Images/Vector.svg';
import { hidePreview, showPreview } from '../Reducers/cartSlice';
import { setCurrency } from '../Reducers/currenciesSlice';
import { store } from '../store/store';
import ItemsInCart from './ItemsInCart';

class NavBarComp extends Component {
  constructor() {
    super();
    this.state = {
      btnsClasses: ['selected'],
      isClicked: false,
      currentCurrencie: '$',
      cartItems: 0,
      path: '',
    };
  }

  componentDidMount() {
    const { selectedCurrency  } = this.props;
    const exchange = JSON.parse(localStorage.getItem('exchange'));
    if (exchange) {
      this.setState({ currentCurrencie: exchange })  
    } else {
      this.setState({ currentCurrencie: selectedCurrency })
    }
    this.setState({ path: window.location.pathname })
  }


  changeCurrency = () => {
    const { isClicked, path } = this.state;
    const { changeOpacity, cartOverlay } = this.props;
    this.setState({
      isClicked: !isClicked,
    });
    if (cartOverlay && path !== '/cart') {
      store.dispatch(hidePreview())
      changeOpacity()
    }
  };

  currencyClick = ({ target: { id } }) => {
    this.setState({
      isClicked: false,
      currentCurrencie: id,
    });
    localStorage.setItem('exchange', JSON.stringify(id))
    store.dispatch(setCurrency(id))
  }

  handleClick = ({ target }) => {
    const { mainUrl } = this.props;
    const currentLocation = window.location.href;
    if (currentLocation === mainUrl) {
      const { changeCategory } = this.props;
      changeCategory(target.name);
      const newClasses = [];
      newClasses[target.value] = "selected";
      this.setState({ btnsClasses: newClasses });
    }
  };

  treatName = (str) => {
    return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
  };

  handleCartClick = () => {
    const { changeOpacity, cartOverlay } = this.props;
    if (!cartOverlay) {
      store.dispatch(showPreview())
    } else {
      store.dispatch(hidePreview())
    }
    this.setState({
      isClicked: false,
    })
    changeOpacity()
  }

  render() {
    const {
      arrCurrencies: { currencies },
      arrCategories: { categories },
      cartLength,
      cartOverlay,
      changeCategory,
      changeOpacity,
    } = this.props;
    const { btnsClasses, isClicked, currentCurrencie, path } = this.state;
    return (
      <div
        className="navigation-bar"
      >
        <div
          className="sections-container"
          onClick={ () => {
            if (cartOverlay) {
              store.dispatch(hidePreview())
              changeOpacity()
            }
          } }
        >
          { changeCategory ? (
            categories &&
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
              ))
          ) : (
            <Link to="/" style={{ textDecoration: "none", color: "black" }} >
              <span
              className="scandishop-btn"
              >
                ScandiShop
              </span>
            </Link>
          ) }
        </div>
        <div className="store-logo">
          <Link to="/" >
            <img src={logo} alt="store logo" />
          </Link>
        </div>
        <div className="currencies-and-cart-container">
          <div className="select-currencies-container">
            <button
              type="button"
              className="currencies-btn"
              data-testid="btn-currencies"
              onClick={this.changeCurrency}
            >
              {currentCurrencie} <img src={arrowDown} alt="arrow down" id="arrow-down" />
            </button>
            {isClicked && (
              <div className="currencies-label" data-testid="currencies-label">
                { currencies.map(({ symbol, label }) => (
                <button
                  type="button"
                  key={symbol}
                  data-testid={symbol}
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
          <div className="preview-container">
            <button
              type="button"
              className="cart-icon-btn"
              onClick={ this.handleCartClick }
            >
              <img src={cart} alt="shopping cart" className="cart-img" />
              {cartLength > 0 && (
                <span className="cart-length" >{cartLength}</span>
              )}
            </button>
            {cartOverlay && path !== "/cart" && (
              <div
                className="cart-preview"
              >
                <ItemsInCart itemsQt={cartLength} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  arrCurrencies: state.currencies,
  selectedCurrency: state.currencies.currCurrency,
  arrCategories: state.categories,
  mainUrl: state.categories.mainUrl,
  cartLength: state.cart.cartSize,
  cartOverlay: state.cart.cartOverlay,
});

export default connect(mapStateToProps)(NavBarComp);
