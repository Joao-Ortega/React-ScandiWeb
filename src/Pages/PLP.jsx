import React, { Component } from 'react'
import { connect } from 'react-redux';
import NavBarComp from '../Components/NavBarComp'
import ProductsCard from '../Components/ProductsCard';
import { hidePreview } from '../Reducers/cartSlice';
import { store } from '../store/store';
import { fetchAllProducts } from '../thunks/fetchs';

class PLP extends Component {
  constructor() {
    super();
    this.state = {
      currentCategory: 'All',
      listOfProducts: [],
      opacity: false,
    };
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    this.getInfos()
  }
  
  getInfos = async () => {
    await store.dispatch(fetchAllProducts())
    const { products: allProducts } = this.props;
    this.setState({ listOfProducts: allProducts.allProducts })
  }

  handleCategoryChange = (category) => {
    const { products: { allProducts } } = this.props;
    if (category === 'all') {
      this.setState({
        currentCategory: `${category.charAt(0).toUpperCase()}${category.slice(1)}`,
        listOfProducts: allProducts
      });
    } else {
      this.setState({
        currentCategory: `${category.charAt(0).toUpperCase()}${category.slice(1)}`,
        listOfProducts: allProducts.filter((pr) => pr.category === category)
      });
    }
  }

  changeOpacity = () => {
    const { opacity } = this.state;
    this.setState({ opacity: !opacity })
  }

  render() {
    const { currentCategory, listOfProducts, opacity } = this.state;
    const { cartOverlay } = this.props;
    return (
      <div>
        <NavBarComp
          changeOpacity={this.changeOpacity}
          changeCategory={this.handleCategoryChange}
        />
        <div
          className={ opacity ? "navigation-bar-opac" : "" }
          onClick={ () => {
            if (cartOverlay) {
              store.dispatch(hidePreview())
              this.changeOpacity()
            }
          } }
        >
          <h1 className="title">{currentCategory}</h1>
          { listOfProducts && (
            <ProductsCard allProducts={ listOfProducts } />
          ) }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  products: state.products,
  cartOverlay: state.cart.cartOverlay,
});

export default connect(mapStateToProps)(PLP);
