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
    const { attribute, items } = this.props;
    this.setState({ [attribute]: items[0].value })
  }

  changeAttr = ({ target }) => {
    const { attribute } = this.props;
    const value = target.getAttribute('value');
    const changeClass = []
    changeClass[target.id] = 'choosed'
    this.setState({
      attrSelected: changeClass,
      [attribute]: value,
    })
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