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
    const items = JSON.parse(localStorage.getItem('cart'));
    if (items) {
      this.treatItems(items)
    }   
  }

  compareAttributes = (attr1, attr2) => JSON.stringify(attr1) === JSON.stringify(attr2);

  isEqual = (element1, element2 ) => element1 === element2; 

  treatItems = (cart) => {
    const treatedItems = cart.reduce((acc, item) => {
      const findObj = acc.filter((obj) => this.isEqual(obj.id, item.id));
      if (findObj.length) {
        const sameAttrs = findObj.some((elem) => this.compareAttributes(elem.selectedTraits, item.selectedTraits))
        if (sameAttrs) {
          const foundedIndex = acc.findIndex((pr) => this.isEqual(pr.id, item.id) && sameAttrs);
          acc[foundedIndex].qt += 1
        } else acc.push(item)
      } else acc.push(item)
      return acc;
    }, []);
    this.setState({ items: treatedItems })
  }

  sumProduct = ({ target: { id } }) => {
    const { items } = this.state;
    const product = {...items[id]};
    const cart = JSON.parse(localStorage.getItem('cart'));
    product.qt = 1;
    const newCart = [...cart, product];
    localStorage.setItem('cart', JSON.stringify(newCart))
    this.treatItems(newCart)
    store.dispatch(updateCartLength(newCart.length))
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
              <span className="product-name">{item.id}</span>
              <span className="product-name">{item.name}</span>
              <span className="price-cart">
                {`${currentCurrency} ${item.prices
                  .find((tag) => tag.currency.symbol === currentCurrency).amount}`}
              </span>
              <div className="container">
                <div className="cart">
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
                    id={i}
                    onClick={ this.sumProduct }
                  >
                    +
                  </button>
                  <span>{item.qt}</span>
                  <button
                    type="button"
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
          <span className="total-price">$3000</span>
        </div>
        <div>
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
