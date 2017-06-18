import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Cart from './components/cart/Cart';
import PromotionRule from './components/promotion/Rule';

import Promo from './stores/PromotionStore';

class App extends Component {
  render() {
    return (
      <div className="App container">
        <div className="App-header">
          <div className="App-banner">
            <img src={logo} className="App-logo" alt="logo"/>
            <h2>Welcome to React</h2>
          </div>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </div>
        <div className="App-content container-page">
          <PromotionRule data={Promo}/>
          <Cart data={Promo}/>
        </div>
      </div>
    );
  }
}

export default App;
