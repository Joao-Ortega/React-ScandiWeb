import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import addToCartBtn from '../Images/addToCart.svg';

class ProductsCard extends Component {
  render() {
    const { allProducts, currentCurrency } = this.props;
    return (
      <div className="products-container">
       { allProducts && allProducts.map(({ id, gallery, name, prices, inStock }) => (
         inStock
          ?
          <div className="product-card" key={ id }>
            <Link to={`/${id}`} style={{ textDecoration: "none", color: "#1d1f22" }}>
              <img className="products-images" src={ gallery[0] } alt="product" />
              <p className="product-name">{ name }</p>
              <p className="teste">
                { `${currentCurrency}${prices
                  .find((tag) => tag.currency.symbol === currentCurrency).amount}` }
              </p>
            </Link>
            <button className="addCartBtn">
              <img src={addToCartBtn} alt="add to cart button"  />
            </button>
          </div> :
          <div className="product-card-out" key={ id }>
            <p className="out-title">OUT OF STOCK</p>
            <img className="out-image" src={ gallery[0] } alt="" />
            <p className="product-name-out">{ name }</p>
            <p className="price-out">
              { `${currentCurrency}${prices
                  .find((tag) => tag.currency.symbol === currentCurrency).amount}` }
            </p>
          </div>
       )) }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentCurrency: state.currencies.currCurrency,
});

export default connect(mapStateToProps)(ProductsCard);