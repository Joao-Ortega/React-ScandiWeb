import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
      cart.splice(name, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      this.setState({ items: cart });
      store.dispatch(updateCartLength(cart.reduce((acc, item) => acc += item.qt, 0)))
    } else {
      cart[name].qt -= 1;
      localStorage.setItem('cart', JSON.stringify(cart));
      this.setState({ items: cart });
      store.dispatch(updateCartLength(cart.reduce((acc, item) => acc += item.qt, 0)));
    }
  }

  renderAttributes = (attr, k, item) => {
    const { fullCart } = this.props;
    const newList = [];
    newList[item[attr.name]] = 'choosed';
    if (attr.name === 'Color') {
      return (
        <div className={ fullCart ? "cart-attributes" : "attributes"} key={k}>
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
      <div className={ fullCart ? "cart-attributes" : "attributes"} key={k}>
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
    const { itemsQt, currentCurrency, fullCart } = this.props;
    const { items } = this.state;
    return (
      <div className={ fullCart ? "cart-container" : '' }>
        { !fullCart && (
          <div className="cart-preview-title">
            <span id="bag-text">My Bag, </span>
            <span id="items-quantity">{itemsQt} {itemsQt > 1 ? 'items' : 'item'}</span>
          </div>
        ) }
        <div className={fullCart ? "products" : "items-container"}>
          { items.map((item, i) => (
            <div key={i} className={fullCart ? "cart-infos" : "item-infos"}>
              <div className={ fullCart ? "product-container" : "container"}>
                <div className={ fullCart ? "attrs-container" : "cart"}>
                  <span className={ fullCart ? "name-on-cart-bolder" : "product-name"}>{item.id}</span>
                  <span className={ fullCart ? "name-on-cart" : "product-name"}>{item.name}</span>
                  <span className={ fullCart ? "cart-price" : "price-cart"}>
                    {`${currentCurrency} ${item.prices
                      .find((tag) => tag.currency.symbol === currentCurrency).amount}`}
                  </span>
                  {item.attributes.map((attrObj, k) => (
                    <div key={k}>
                      <span className={ fullCart ? "attr-name-cart" : "attr-name"}>{attrObj.name}:</span>
                      {this.renderAttributes(attrObj, k, item.selectedTraits)}
                    </div>
                  ))}
                </div>
                <div className={ fullCart ? "quantity-cart-container" : "quantity-container"}>
                  <button
                    type="button"
                    name={i}
                    className={ fullCart ? "qt-btns" : '' }
                    onClick={ this.sumProduct }
                  >
                    +
                  </button>
                  <span className={ fullCart ? "qt-number" : '' } >{item.qt}</span>
                  <button
                    type="button"
                    name={i}
                    className={ fullCart ? "qt-btns" : '' }
                    onClick={ this.subProduct }
                  >
                    -
                  </button>
                </div>
                <div className={ fullCart ? "container-img-on-cart" : "container-img"}>
                  <img className={ fullCart ? "img-on-cart" : "product-img-cart"} src={item.gallery} alt="product" />
                </div>
              </div>
              </div>
          )) }
        </div>
        <div id={ fullCart ? "total-cart" : "total-container"}>
          { fullCart && (
            <div className="taxes">
              <div className="infos-checkout">
                <span className="span-text">Tax 21%:</span>
                <span className="total-value">{`${currentCurrency}${(items
                  .reduce((acc, pr) => acc += (pr.prices
                  .find((tag) => tag.currency.symbol === currentCurrency).amount * pr.qt) , 0) * 0.21).toFixed(2)}`}</span>
              </div>
              <div className="infos-checkout">
                <span className="span-text">Quantity:</span>
                <span className="total-value">{ items.reduce((acc, item) => acc += item.qt , 0) }</span>
              </div>
            </div>
          ) }
          <span className={ fullCart ? "span-text" : "total-price"}>Total:</span>
          <span
            className={ fullCart ? "total-value" : "total-price"}
          >
            {`${currentCurrency}${items.reduce((acc, pr) => acc += (pr.prices
                  .find((tag) => tag.currency.symbol === currentCurrency).amount * pr.qt) , 0).toFixed(2)}`}
          </span>
        </div>
        <div className='btns-container'>
        { !fullCart && (
          <Link to="/cart" className="cart-link">
              VIEW BAG
          </Link>
        ) }
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
