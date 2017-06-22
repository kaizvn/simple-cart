/**
 * Created by kainguyen on 6/17/17.
 */

import { extendObservable, computed, toJS } from 'mobx';
import storeService from '../services/promotionServices';

import * as _ from 'lodash';

class PromotionStore {
  constructor() {
    extendObservable(this, {
        promotions: [],
        products: [],
        promotionTypes: [],
        promotionList: computed(function () {
          return toJS(this.promotions);
        }),
        productList: computed(function () {
          return toJS(this.products);
        }),
        promotionTypesList: computed(function () {
          return toJS(this.promotionTypes);
        }),
        getPromotionForGroup: function (group) {
          return _.orderBy(
            _.filter(toJS(this.promotion), {group: group}),
            ['isHighPriority', 'conditions', 'conditions[0]quantity'],
            ['desc', 'desc', 'desc']
          )
        }
      }
    );

    storeService.fetchPromotions()
      .then(data => this.setItemsToStore(data, 'promotions'));

    storeService.fetchProducts()
      .then(data => this.setItemsToStore(data, 'products'));

    storeService.fetchPromotionTypes()
      .then(data => this.setItemsToStore(data, 'promotionTypes'));
  }

  defaultRule = () => {
    return {
      id: '',
      name: '',
      group: '',
      conditions: [],
      promos: [],
      isHighPriority: false,
    }
  };


  getPromotion = (id = 0) => {
    return storeService.getPromotion(id)
  };

  setItemsToStore = (resp, storeName) => {
    if (resp && resp.data)
      this[storeName] = resp.data;
  };

  doUpdatePromotion = (data) => {
    //TODO: refactor this
    let existedPromotion = {};
    if (existedPromotion.id) {
      _.extend(existedPromotion, data);
      return true;
    } else {
      data.id = data.id || Date.now();
      this.promotions.push(data);
      return false;
    }
  }
}

const promo = window.promotions = new PromotionStore(); //debug purpose

export default promo;