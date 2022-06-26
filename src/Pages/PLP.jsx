import React, { Component } from 'react'
import { connect } from 'react-redux';
import NavBarComp from '../Components/NavBarComp'
import ProductsCard from '../Components/ProductsCard';
import { store } from '../store/store';
import { fetchAllProducts } from '../thunks/fetchs';

class PLP extends Component {
  constructor() {
    super();
    this.state = {
      currentCategory: 'All',
      listOfProducts: [],
    };
  };

  componentDidMount() {
    this.getInfos()
  }
  
  getInfos = async () => {
    await store.dispatch(fetchAllProducts())
    const { products: allProducts } = this.props;
    this.setState({ listOfProducts: allProducts.allProducts })
  }

  handleCategoryChange = (category) => {
    const { products: { allProducts } } = this.props;
    if (category === 'All') {
      this.setState({ currentCategory: category, listOfProducts: allProducts })
    } else {
      this.setState({
        currentCategory: category,
        listOfProducts: allProducts.filter((pr) => pr.category === category.toLowerCase())
      });
    }
  }

  render() {
    const { currentCategory, listOfProducts } = this.state;
    return (
      <div>
        <NavBarComp changeCategory={this.handleCategoryChange} />
        <h1 className="title">{currentCategory}</h1>
        { listOfProducts && (
          <ProductsCard allProducts={ listOfProducts } />
        ) }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  products: state.products,
});

export default connect(mapStateToProps)(PLP);
