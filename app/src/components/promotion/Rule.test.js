/**
 * Created by kainguyen on 6/17/17.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import PromotionRule from './Rule';
import Promo from './../../stores/PromotionStore';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PromotionRule data={Promo}/>, div);
});
