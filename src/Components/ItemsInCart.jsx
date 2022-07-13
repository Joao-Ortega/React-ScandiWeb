import React, { Component } from 'react'
import { connect } from 'react-redux';
import { updateCartLength } from '../Reducers/cartSlice';
import { store } from '../store/store';

class ItemsInCart extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      attrSelected: [],
    };
  };

  componentDidMount() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart) {
      this.setState({ items: cart })
      // this.treatItems(cart)
    }   
  }

  sumProduct = ({ target: { name } }) => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    cart[name].qt += 1;
    localStorage.setItem('cart', JSON.stringify(cart))
    this.setState({ items: cart })
    store.dispatch(updateCartLength(cart.reduce((acc, item) => acc += item.qt, 0)))
  }

  subProduct = ({ target: { name } }) => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const nextQuantity = cart[name].qt;
    if (nextQuantity - 1 === 0) {
      const newCart = cart.filter((item) => item.id !== cart[name].id);
      localStorage.setItem('cart', JSON.stringify(newCart));
      this.setState({ items: newCart });
      store.dispatch(updateCartLength(newCart.reduce((acc, item) => acc += item.qt, 0)))
    } else {
      cart[name].qt -= 1;
      localStorage.setItem('cart', JSON.stringify(cart));
      this.setState({ items: cart });
      store.dispatch(updateCartLength(cart.reduce((acc, item) => acc += item.qt, 0)));
    }
  }

  renderAttributes = (attr, k, item) => {
    const newList = [];
    newList[item[attr.name]] = 'choosed';
    if (attr.name === 'Color') {
      return (
        <div className="attributes" key={k}>
          {attr.items.map(({ value }, i) => (
          <div
            key={i}
            className={`colors-cart ${newList[i]}`}
            value={value}
            id={i}
            style={{ backgroundColor: value }}
          />
        ))}
        </div>
      )
    }
    return (
      <div className="attributes" key={k}>
        {attr.items.map(({ value }, i) => (
        <div
          className={`attrs-cart ${newList[i]}`}
          id={i}
          value={value}
          key={value}
        >
          {value}
        </div>
      ))}
      </div>
    )
  }

  render() {
    const { itemsQt, currentCurrency } = this.props;
    const { items } = this.state;
    return (
      <div>
        <div className="cart-preview-title">
          <span id="bag-text">My Bag, </span>
          <span id="items-quantity">{itemsQt} {itemsQt > 1 ? 'items' : 'item'}</span>
        </div>
        <div className="items-container">
          { items.map((item, i) => (
            <div key={i} className="item-infos">
              <div className="container">
                <div className="cart">
                  <span className="product-name">{item.id}</span>
                  <span className="product-name">{item.name}</span>
                  <span className="price-cart">
                    {`${currentCurrency} ${item.prices
                      .find((tag) => tag.currency.symbol === currentCurrency).amount}`}
                  </span>
                  {item.attributes.map((attrObj, k) => (
                    <div key={k}>
                      <span className="attr-name">{attrObj.name}:</span>
                      {this.renderAttributes(attrObj, k, item.selectedTraits)}
                    </div>
                  ))}
                </div>
                <div className="quantity-container">
                  <button
                    type="button"
                    name={i}
                    onClick={ this.sumProduct }
                  >
                    +
                  </button>
                  <span>{item.qt}</span>
                  <button
                    type="button"
                    name={i}
                    onClick={ this.subProduct }
                  >
                    -
                  </button>
                </div>
                <div className="container-img">
                  <img className="product-img-cart" src={item.gallery} alt="product" />
                </div>
              </div>
              </div>
          )) }
        </div>
        <div id="total-container">
          <span className="total-price">Total</span>
          <span
            className="total-price"
          >
            {`${currentCurrency}${items.reduce((acc, pr) => acc += (pr.prices
                  .find((tag) => tag.currency.symbol === currentCurrency).amount * pr.qt) , 0).toFixed(2)}`}
          </span>
        </div>
        <div className='btns-container'>
          <button
            type="button"
            className="cart-btns"
            id="page-cart-btn"
          >
            VIEW BAG
          </button>
          <button
            type="button"
            className="cart-btns"
            id="checkout-btn"
          >
            CHECKOUT
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentCurrency: state.currencies.currCurrency,
});

export default connect(mapStateToProps)(ItemsInCart);
