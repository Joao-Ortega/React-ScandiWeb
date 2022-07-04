import React, { Component } from 'react'

export default class AttrsComp extends Component {
  constructor() {
    super();
    this.state = {
      attrSelected: ['choosed'],
    }
  }

  componentDidMount() {
    const { attribute, items } = this.props;
    console.log('BORA', attribute, items);
    this.setState({ [attribute]: items[0].value })
  }

  changeAttr = ({ target }) => {
    const { attribute } = this.props;
    const value = target.getAttribute('value');
    const changeClass = []
    changeClass[target.id] = 'choosed'
    this.setState((prevState) => ({
      attrSelected: changeClass,
      [attribute]: value,
    }))
  }

  renderAttributes = () => {
    const { attribute, items } = this.props;
    const { attrSelected } = this.state;
    if (attribute === 'Color') {
      return (
        items.map(({ value }, i) => (
          <div
            key={i}
            className="colors"
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
    const { attribute, items } = this.props;
    return (
      this.renderAttributes()
    )
  }
}
