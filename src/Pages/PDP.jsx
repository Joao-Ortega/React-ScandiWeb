import { gql } from '@apollo/client';
import React, { Component } from 'react';
import { client } from '..';
import NavBarComp from '../Components/NavBarComp';

class PDP extends Component {
  constructor() {
    super();
    this.state = {
      productClicked: { gallery: [] },
      currentImg: 0,
      attrSelected: ['choosed'],
      productInfos: {}
    }
  }

  componentDidMount() {
    this.fetchProductById()
  }

  fetchProductById = () => {
    const id = window.location.pathname.split('/')[1];
    client.query({
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
      }`
    }).then(({ data: { product } }) => this.setState({ productClicked: product }))
  }

  changePicture = ({ target: { name } }) => {
    this.setState({ currentImg: Number(name) })
  }

  changeAttr = ({ target: { id } }) => {
    const changeClass = []
    changeClass[id] = 'choosed'
    this.setState((prevState) => ({
      attrSelected: changeClass,
    }))
  }

  render() {
    const { productClicked, currentImg, attrSelected } = this.state;
    console.log(productClicked.attributes);
    return (
      <div>
        <NavBarComp />
        <div className="product-detail-container">
          { productClicked && (
            <div className="gallery-container">
              { productClicked.gallery.map((imgs, i) => (
                <img
                  src={imgs}
                  alt="product gallery"
                  key={i}
                  name={i}
                  className="gallery-img"
                  onClick={ this.changePicture }
                />
              )) }
            </div>
          ) }
          <img
            src={productClicked.gallery[currentImg]}
            alt="bigger product"
            className="showing-img"
          />
          <div className="details-info">
            <span
              className="name-id"
            >
              { productClicked.id && `${productClicked.id[0].toUpperCase()}${productClicked.id.slice(1)}`}
            </span>
            <span className="product-name" >{productClicked.name}</span>
            { productClicked.attributes && productClicked.attributes
              .map((attr, i) => (
                <div className="all-attr" key={i}>
                  <span className="attr-names">{attr.name}:</span>
                  <div className="attr-container">
                    {attr.items.map((size, i) => (
                      <div
                        onClick={ this.changeAttr }
                        className={`attr-values ${attrSelected[i]}`}
                        id={i}
                        value={size.value}
                        key={size.value}
                      >
                        {size.value}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    )
  }
}


export default PDP;
