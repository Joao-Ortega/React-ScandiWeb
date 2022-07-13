import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import addToCartBtn from '../Images/addToCart.svg';
import { updateCartLength } from '../Reducers/cartSlice';
import { setCurrency } from '../Reducers/currenciesSlice';
import { store } from '../store/store';

class ProductsCard extends Component {
  componentDidMount() {
    const exchange = JSON.parse(localStorage.getItem('exchange'));
    if (exchange) {
      store.dispatch(setCurrency(exchange))
    }
  }

  compareAttributes = (attr1, attr2) => JSON.stringify(attr1) === JSON.stringify(attr2);

  isEqual = (element1, element2 ) => element1 === element2; 

  handleProductsOnLocal = (cart, product) => {
      const findObj = cart.filter((obj) => this.isEqual(obj.id, product.id));
      if (findObj.length) {
        const sameAttrs = findObj.some((elem) => this.compareAttributes(elem.selectedTraits, product.selectedTraits))
        if (sameAttrs) {
          const foundedIndex = cart.findIndex((pr) => this.isEqual(pr.id, product.id) && sameAttrs);
          cart[foundedIndex].qt += 1
        } else cart.push(product)
      } else cart.push(product)
    store.dispatch(updateCartLength(cart.reduce((acc, item) => acc += item.qt, 0)))
    localStorage.setItem('cart', JSON.stringify(cart))
  }

  handleAdditionFromPLP = ({ target }) => {
    const { allProducts } = this.props;
    const { id, name, prices, attributes, gallery } = allProducts.find((item) => item.id === target.id);
    let choosedAttr = {}
    attributes.forEach((obj) => {
      choosedAttr[obj.name] = 0
    });
    const objToLocal = {
      id,
      name,
      prices,
      attributes,
      qt: 1,
      gallery: gallery[0],
      selectedTraits: choosedAttr, 
    }
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (!cart) {
      store.dispatch(updateCartLength([objToLocal].length))
      localStorage.setItem('cart', JSON.stringify([objToLocal]))
    } else {
      this.handleProductsOnLocal(cart, objToLocal)
    }
  }

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
                { `${currentCurrency} ${prices
                  .find((tag) => tag.currency.symbol === currentCurrency).amount}` }
              </p>
            </Link>
            <button
              type="button"
              className="addCartBtn"
              onClick={ this.handleAdditionFromPLP }
            >
              <img id={id} src={addToCartBtn} alt="add to cart button"  />
            </button>
          </div> :
          <div className="product-card-out" key={ id }>
            <p className="out-title">OUT OF STOCK</p>
            <img className="out-image" src={ gallery[0] } alt="" />
            <p className="product-name-out">{ name }</p>
            <p className="price-out">
              { `${currentCurrency} ${prices
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