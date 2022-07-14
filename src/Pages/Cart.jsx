import React, { Component } from 'react'
import { connect } from 'react-redux';
import ItemsInCart from '../Components/ItemsInCart'
import NavBarComp from '../Components/NavBarComp'

class Cart extends Component {
  render() {
    const { cartLength } = this.props;
    return (
      <div className="cart-page-container">
        <NavBarComp />
        <h1 className='cart-title'>
          CART
        </h1>
        <div>
          <ItemsInCart fullCart={true} itemsQt={cartLength} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  cartLength: state.cart.cartSize,
});

export default connect(mapStateToProps)(Cart);