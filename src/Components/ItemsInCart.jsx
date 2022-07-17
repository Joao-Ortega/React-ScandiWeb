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
      reload: false,
      productsImgs: {},
    };
  };

  componentDidMount() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart) {
      const obj = {}
      cart.forEach((product, i) => {
        obj[i] = 0
      })
      this.setState({ items: cart, productsImgs: obj })
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

  handleIncreaseImg = ({ target: { id } }) => {
    const { productsImgs, items } = this.state;
    const next = productsImgs[id] += 1;
    if (!items[id].gallery[next]) {
      productsImgs[id] = 0
    } else {
      productsImgs[id] += 1
    }
    this.setState({productsImgs})
  }

  handleDecreaseImg = ({ target: { id } }) => {
    const { productsImgs, items } = this.state;
    const next = productsImgs[id] -= 1;
    if (!items[id].gallery[next]) {
      productsImgs[id] = items[id].gallery.length - 1;
    } else {
      productsImgs[id] -= 1
    }
    this.setState({productsImgs})
  }

  render() {
    const { itemsQt, currentCurrency, fullCart } = this.props;
    const { items, productsImgs } = this.state;
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
                  <span className={ fullCart ? "name-on-cart-bolder" : "product-name"}>{item.brand}</span>
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
                { fullCart ? (
                  <div className="container-img-on-cart">
                    <img className="img-on-cart" src={item.gallery[productsImgs[i] || 0]} alt="product" />
                    <div className="image-selection">
                      <button
                        type="button"
                        className="view-imgs-cart"
                        id={i}
                        name={ item.name }
                        onClick={ this.handleDecreaseImg }
                      >
                        {`<`}
                      </button>
                      <button
                        type="button"
                        className="view-imgs-cart"
                        id={i}
                        name={ item.name }
                        onClick={ this.handleIncreaseImg }
                      >
                        {`>`}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="container-img">
                    <img className="product-img-cart" src={item.gallery[0]} alt="product" />
                  </div>
                ) }
              </div>
              </div>
          )) }
        </div>
        <div
          id={ fullCart ? "total-cart" : "total-container"}
        >
          { fullCart && (
            <div className="taxes">
              <div className="infos-checkout">
                <span className="span-text">Tax 21%:</span>
                <span
                  className="total-value"
                >
                  {`${currentCurrency}${(items
                  .reduce((acc, pr) => acc += (pr.prices
                  .find((tag) => tag.currency.symbol === currentCurrency).amount * pr.qt) , 0) * 0.21).toFixed(2)}
                  `}
                </span>
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
        <div className={ fullCart ? "order-container" : "btns-container"}>
        { !fullCart && (
          <Link to="/cart" className="cart-link">
              VIEW BAG
          </Link>
        ) }
          <button
            type="button"
            className={ fullCart ? "order-btn" : "cart-btns"}
            id="checkout-btn"
          >
            {fullCart ? 'ORDER' : 'CHECKOUT'}
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentCurrency: state.currencies.currCurrency,
  cartLength: state.cart.cartSize,
});

export default connect(mapStateToProps)(ItemsInCart);
