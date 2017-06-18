/**
 * Created by kainguyen on 6/17/17.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Cart from './Cart';
import Promo from './../../stores/PromotionStore';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Cart data={Promo}/>, div);
});
