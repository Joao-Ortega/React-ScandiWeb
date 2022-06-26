import React, { Component } from 'react'

export default class ProductsCard extends Component {
  render() {
    const { allProducts } = this.props;
    return (
      <div>
        { allProducts && allProducts.map(({ id }) => (
          <div key={ id }>{id}</div>
        )) }
      </div>
    )
  }
}
