import { gql } from '@apollo/client';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { client } from '../App';
import { Markup } from 'interweave';
import AttrsComp from '../Components/AttrsComp';
import NavBarComp from '../Components/NavBarComp';
import { store } from '../store/store';
import { updateCartLength } from '../Reducers/cartSlice';
import { handleProductsOnLocal } from '../Services/handleProductsOnLocal';

class PDP extends Component {
  constructor() {
    super();
    this.state = {
      productClicked: { gallery: [] },
      currentImg: 0,
      productInfos: {},
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.fetchProductById();
  }

  fetchProductById = () => {
    const id = window.location.pathname.split("/")[1];
    client
      .query({
        query: gql`
        query productById {
          product(id: "${id}") {
            id,
            name,
            gallery,
            description,
            attributes {
              name,
              type,
              items {
                value,
              }
            }
            prices {
              currency {
                label,
                symbol
              }
              amount
            },
            brand
          }
      }`,
      })
      .then(({ data: { product } }) =>
        this.setState({ productClicked: product })
      );
  };

  handleAdditionFromPDP = () => {
    const { productClicked: {
      id, name, prices, attributes, gallery, brand,
    } } = this.state;
    const currentAttr = JSON.parse(localStorage.getItem('currentAttrs'));
    let buildObj = {}
    if (currentAttr && currentAttr[name]) {
      const keys = Object.keys(currentAttr[name]);
      const values = Object.values(currentAttr[name]);
      buildObj = keys.reduce((acc, key, i) => {
        acc[key] = Number(values[i]);
        return acc;
      }, {})
    }
    const objToLocal = {
      id,
      name,
      prices,
      attributes,
      qt: 1,
      gallery,
      brand,
      selectedTraits: buildObj,
    }
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (!cart) {
      store.dispatch(updateCartLength([objToLocal].length))
      localStorage.setItem('cart', JSON.stringify([objToLocal]))
    } else {
      handleProductsOnLocal(cart, objToLocal)
    }
  }

  changePicture = ({ target: { name } }) => {
    this.setState({ currentImg: Number(name) });
  };

  render() {
    const { productClicked, currentImg } = this.state;
    const { currency } = this.props;
    return (
      <div>
        <NavBarComp />
        <div className="product-detail-container">
          {productClicked && (
            <div className="gallery-container">
              {productClicked.gallery.map((imgs, i) => (
                <img
                  src={imgs}
                  alt="product gallery"
                  key={i}
                  name={i}
                  className="gallery-img"
                  onClick={this.changePicture}
                />
              ))}
            </div>
          )}
          <img
            src={productClicked.gallery[currentImg]}
            alt="bigger product"
            className="showing-img"
          />
          <div className="details-info">
            <span className="name-id">
              {productClicked.brand &&
                productClicked.brand
              }
            </span>
            <span className="product-name">{productClicked.name}</span>
            {productClicked.attributes &&
              productClicked.attributes.map((attr, i) => (
                <div className="all-attr" key={i}>
                  <span className="attr-names">{attr.name}:</span>
                  <AttrsComp
                    attribute={attr.name}
                    items={attr.items}
                    productName={productClicked.name}
                  />
                </div>
              ))}
            <span
              className="attr-names"
            >
              {productClicked.prices && productClicked.prices[0].__typename}:
            </span>
            <div className="price">
              {`${currency} ${productClicked.prices && productClicked.prices
                .find((obj) => obj.currency.symbol === currency).amount}`}
            </div>
            <button
              type="button"
              className="add-btn"
              onClick={ this.handleAdditionFromPDP }
            >
              ADD TO CART
            </button>
            <div className="description">
              {productClicked.description && (
                <Markup content={productClicked.description} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.currencies.currCurrency,
});

export default connect(mapStateToProps)(PDP);
