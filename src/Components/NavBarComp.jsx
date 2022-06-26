import React, { Component } from 'react'
import { connect } from 'react-redux';
import logo from '../Images/a-logo.svg';
import cart from '../Images/cart.svg';
import { fetchCurrencies } from '../thunks/fetchs';
import { store } from '../store/store';

class NavBarComp extends Component {
  constructor() {
    super();
    this.state ={
      btnsClasses: ['selected', '', ''],
    }
  }
  componentDidMount() {
    store.dispatch(fetchCurrencies())
  }

  handleSymbol = ({ target }) => {
    console.log(target.value);
  }

  // handleClick = ({ target }) => {
  //   const { changeCategory } = this.props;
  //   changeCategory(target.name);
  //   if (target.classList.contains('selected')) {
  //     target.classList.remove('selected')
  //   } else {
  //     target.classList.add('selected')
  //   }
  // }

  handleClick = ({ target }) => {
    const { changeCategory } = this.props;
    changeCategory(target.name);
    const newClasses = ['', '', ''];
    newClasses[target.value] = 'selected'
    this.setState({ btnsClasses: newClasses})
  }

  render() {
    const { arrCurrencies: { currencies } } = this.props;
    const { btnsClasses } = this.state;
    return (
      <div className="navigation-bar">
        <div className="sections-container">
          <button className={`sections ${btnsClasses[0]}`} value={0} name="All" onClick={this.handleClick}>All</button>
          <button className={`sections ${btnsClasses[1]}`} name="Clothes" value={1}onClick={this.handleClick}>Clothes</button>
          <button className={`sections ${btnsClasses[2]}`} name="Tech" value={2} onClick={this.handleClick}>Tech</button>
        </div>
        <div className="store-logo">
          <img src={logo} alt="store logo" />
        </div>
        <div className="currencies-and-cart-container">
          <select
            name="currencies"
            id="currencies-symbols"
            onChange={ this.handleSymbol }
          >
            { currencies.map(({ symbol, label }) => (
              <option key={symbol} value={symbol}>{symbol}</option>
            )) }
          </select>
          <div>
            <img src={cart} alt="shopping cart" className="cart-img" />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  arrCurrencies: state.currencies,
});

export default connect(mapStateToProps)(NavBarComp);
