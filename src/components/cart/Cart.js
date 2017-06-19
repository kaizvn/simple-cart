/**
 * Created by kainguyen on 6/17/17.
 */
import React, { Component } from 'react';
import './Cart.css';
import { observer } from 'mobx-react';
//import * as _ from 'lodash';

const Cart = observer(class Cart extends Component {
  constructor() {
    super();
    this.state = {
      cart: {},
      group: 'Uni'
    };
  }

  componentWillMount() {
    const promotions = this.props.data.getPromotionForGroup(this.state.group);
    console.log('promotions', promotions);
  }

  /*doCalculate = () => {
    //let promotions = this.props.data.getPromotionForGroup(this.state.group);
    /!*todo:
     for each promotions
     stop when end of promotion or end of cart item.
     *!/

  };*/

  render() {
    return (
      <div className="Cart">
        <p className="Cart-intro">
          This is cart component
        </p>
      </div>
    );
  }
});

export default Cart;
