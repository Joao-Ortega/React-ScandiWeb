import React, { Component } from 'react'
import { Route, Routes } from 'react-router-dom'
import PLP from './Pages/PLP'

export default class App extends Component {
  render() {
    return (
      <Routes>
        <Route exact path='/' element={<PLP />} />
      </Routes>
    )
  }
}

