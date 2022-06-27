import React, { Component } from 'react'

export default class ProductsCard extends Component {
  render() {
    const { allProducts } = this.props;
    console.log(allProducts);
    return (
      <div className="products-container">
       { allProducts && allProducts.map(({ id, gallery, name, prices, inStock }) => (
         inStock
          ?
          <div className="product-card" key={ id }>
            <img className="products-images" src={ gallery[0] } alt="" />
            <p className="product-name">{ name }</p>
            <p>{ `${prices[0].currency.symbol}${prices[0].amount}` }</p>
          </div> :
          <div className="product-card-out" key={ id }>
            <p className="out-title">OUT OF STOCK</p>
            <img className="out-image" src={ gallery[0] } alt="" />
            <p className="product-name-out">{ name }</p>
            <p className="price-out">{ `${prices[0].currency.symbol}${prices[0].amount}` }</p>
          </div>
       )) }
      </div>
    )
  }
}