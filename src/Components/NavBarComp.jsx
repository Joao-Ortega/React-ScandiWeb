import React, { Component } from 'react'
import logo from '../Images/a-logo.svg';

export default class NavBarComp extends Component {
  render() {
    return (
      <div className="navigation-bar">
        <div>
          <span className="sections">All</span>
          <span className="sections">Clothes</span>
          <span className="sections">Tech</span>
        </div>
        <div>
          <img src={logo} alt="store logo" />
        </div>
      </div>
    )
  }
}
