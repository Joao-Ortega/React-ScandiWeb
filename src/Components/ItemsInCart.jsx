import React, { Component } from 'react'
import { connect } from 'react-redux';

class ItemsInCart extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
    };
  };

  componentDidMount() {
    const items = JSON.parse(localStorage.getItem('cart'));
    if (items) {
      this.setState({ items })
    }
  }

  renderAttributes = (attr, k) => {
    if (attr.name === 'Color') {
      return (
        <div className="attributes" key={k}>
          {attr.items.map(({ value }, i) => (
          <div
            key={i}
            className="colors-cart"
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
          className="attrs-cart"
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
                      {this.renderAttributes(attrObj, k)}
                    </div>
                  ))}
                </div>
                <div className="quantity-container">
                  <button>
                    +
                  </button>
                  <span>1</span>
                  <button>
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
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentCurrency: state.currencies.currCurrency,
});

export default connect(mapStateToProps)(ItemsInCart);
