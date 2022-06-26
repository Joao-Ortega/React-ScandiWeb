import React, { Component } from 'react'
import { connect } from 'react-redux';
import NavBarComp from '../Components/NavBarComp'
import { store } from '../store/store';
import { fetchAllProducts } from '../thunks/fetchs';

class PLP extends Component {
  componentDidMount() {
    store.dispatch(fetchAllProducts())
  }

  render() {
    return (
      <div>
        <NavBarComp />
      </div>
    )
  }
}

export default connect(null)(PLP);
