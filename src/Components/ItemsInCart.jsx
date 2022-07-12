import React, { Component } from 'react'
import { connect } from 'react-redux';

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
      const treatedItems = items.reduce((acc, item) => {
        const findObj = acc.filter((obj) => obj.id === item.id);
        if (findObj.length) {
          if (findObj.some((elem) => JSON.stringify(elem.selectedTraits) === JSON.stringify(item.selectedTraits))) {
            const foundedIndex = acc.findIndex(
              (pr) => pr.id === item.id && JSON.stringify(pr.selectedTraits) === JSON.stringify(item.selectedTraits)
            );
            acc[foundedIndex].qt += 1
          } else acc.push(item)
        } else acc.push(item)
        return acc;
      }, []);
      this.setState({ items: treatedItems })
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
    console.log(items);
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
                  <button>
                    +
                  </button>
                  <span>{item.qt}</span>
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
