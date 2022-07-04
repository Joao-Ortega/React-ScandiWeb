import { gql } from '@apollo/client';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { client } from '..';
import AttrsComp from '../Components/AttrsComp';
import NavBarComp from '../Components/NavBarComp';

class PDP extends Component {
  constructor() {
    super();
    this.state = {
      productClicked: { gallery: [] },
      currentImg: 0,
      // attrSelected: ['choosed'],
      productInfos: {},
    };
  }

  componentDidMount() {
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
            }
          }
      }`,
      })
      .then(({ data: { product } }) =>
        this.setState({ productClicked: product })
      );
  };

  changePicture = ({ target: { name } }) => {
    this.setState({ currentImg: Number(name) });
  };

  render() {
    const { productClicked, currentImg } = this.state;
    const { currency } = this.props;
    const PARSER = new DOMParser();
    console.log('DESCRIÇÃO', productClicked.description);
    console.log(PARSER.parseFromString(productClicked.description, 'text/html'));
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
              {productClicked.id &&
                `${productClicked.id[0].toUpperCase()}${productClicked.id.slice(
                  1
                )}`}
            </span>
            <span className="product-name">{productClicked.name}</span>
            {productClicked.attributes &&
              productClicked.attributes.map((attr, i) => (
                <div className="all-attr" key={i}>
                  <span className="attr-names">{attr.name}:</span>
                  <AttrsComp
                    attribute={attr.name}
                    items={attr.items}
                    prices={productClicked.prices}
                  />
                </div>
              ))}
            <span className="attr-names">{productClicked.prices && productClicked.prices[0].__typename}:</span>
            <div className="price">
              {`${currency} ${productClicked.prices && productClicked.prices
                .find((obj) => obj.currency.symbol === currency).amount}`}
            </div>
            <button type="button" className="add-btn">ADD TO CART</button>
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
