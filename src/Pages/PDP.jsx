import { gql } from '@apollo/client';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { client } from '..';
import NavBarComp from '../Components/NavBarComp';

class PDP extends Component {
  constructor() {
    super();
    this.state = {
      productClicked: { gallery: [] },
      currentImg: 0,
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

  render() {
    const { productClicked, currentImg } = this.state;
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
            <span className="name-id" >{productClicked.id}</span>
            <span className="product-name" >{productClicked.name}</span>
            { productClicked.attributes && productClicked.attributes
              .map((attr, i) => (
                <span className="attr-names" key={i}>{attr.name}</span>
              )) }
            {/* <span
            >
              {productClicked.attributes['name']}
            </span> */}
          </div>
        </div>
      </div>
    )
  }
}


export default PDP;
