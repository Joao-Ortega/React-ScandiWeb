import React, { Component } from 'react'
import { connect } from 'react-redux';

class AttrsComp extends Component {
  constructor() {
    super();
    this.state = {
      attrSelected: ['choosed'],
    }
  }

  componentDidMount() {
    const { attribute, productName } = this.props;
    const obj = JSON.parse(localStorage.getItem('currentAttrs'));
    if (!obj) {
      localStorage.setItem('currentAttrs', JSON.stringify({
        [productName]: {[attribute]: 0}
      }))
    } else {
      if (obj[productName] && !obj[productName][attribute]) {
        localStorage.setItem('currentAttrs', JSON.stringify({
          ...obj,
          [productName]: {...obj[productName], [attribute]: 0}
        }))
      } else if (obj[productName] && obj[productName][attribute]) {
        localStorage.setItem('currentAttrs', JSON.stringify({
          ...obj,
          [productName]: { ...obj[productName] }
        }))
      } else {
        localStorage.setItem('currentAttrs', JSON.stringify({
          ...obj,
          [productName]: { [attribute]: 0 }
        }))
      }
    }
    const newLocal = JSON.parse(localStorage.getItem('currentAttrs'));
    const selecteds = [];
    selecteds[newLocal[productName][attribute]] = 'choosed';
    this.setState({ attrSelected: selecteds })
  }

  changeAttr = ({ target }) => {
    const { attribute, productName } = this.props;
    const attributesObj = JSON.parse(localStorage.getItem('currentAttrs'));
    const changeClass = []
    changeClass[target.id] = 'choosed'
    this.setState({
      attrSelected: changeClass,
      [attribute]: target.id,
    });
    if (!attributesObj) {
      localStorage.setItem('currentAttrs', JSON.stringify({[productName]: { [attribute]: target.id }}))
    } else {
      attributesObj[productName][attribute] = target.id;
      localStorage.setItem('currentAttrs', JSON.stringify(attributesObj))
    }
  }

  renderAttributes = () => {
    const { attribute, items } = this.props;
    const { attrSelected } = this.state;
    if (attribute === 'Color') {
      return (
        items.map(({ value }, i) => (
          <div
            key={i}
            className={`colors ${attrSelected[i]}`}
            value={value}
            id={i}
            onClick={ this.changeAttr }
            style={{ backgroundColor: value }}
          />
        ))
      )
    }
    return (
      items.map(({ value }, i) => (
        <div
          onClick={this.changeAttr}
          className={`attr-texts ${attrSelected[i]} `}
          id={i}
          value={value}
          key={value}
        >
          {value}
        </div>
      ))
    )
  }


  render() {
    return (
      <div>
        <div className="attr-container">
          {this.renderAttributes()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currency: state.currencies.currCurrency,
});

export default connect(mapStateToProps)(AttrsComp);