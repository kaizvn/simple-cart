/**
 * Created by kainguyen on 6/17/17.
 */

import { extendObservable, computed, toJS } from 'mobx';
import * as _ from 'lodash';

class promotion {
  constructor() {
    this.defaultPromo = function () {
      return {
        name: '',
        id: '',
        group: '',
        isHighPriority: false,
        conditions: [{
          type: 0,
          quantity: ''
        }, {
          type: 0,
          quantity: ''
        }],
        promo: {
          type: 0,
          value: ''
        }
      }
    };

    this.getProducts = function () {
      return [
        {
          id: 0,
          name: '---',
          price: 0
        }, {
          id: 12,
          name: 'item1',
          price: 123
        }, {
          id: 23,
          name: 'item2',
          price: 444
        }, {
          id: 34,
          name: 'item3',
          price: 999
        }];
    };

    this.getPromoTypes = function () {
      return [
        {
          id: 0,
          name: '---',
          price: 0
        }, {
          id: 1,
          name: 'discount percentage',
        }, {
          id: 2,
          name: 'discount price',
        }, {
          id: 3,
          name: 'bonus package 1',
        },
        {
          id: 4,
          name: 'bonus package 2',
        },
        {
          id: 5,
          name: 'bonus package 3',
        }
      ];
    }

    extendObservable(this, {
        promotion: [
          {
            id: 123,
            name: "rule 1",
            group: "Uni",
            isHighPriority: false,
            conditions: [{
              type: 12,
              quantity: 3
            }],
            promo: {
              type: 3,
              value: 300
            }
          },
          {
            id: 456,
            name: "rule 2",
            isHighPriority: true,
            group: "Aka",
            conditions: [{
              type: 23,
              quantity: 5
            }],
            promo: {
              type: 2,
              value: 2
            }
          },
          {
            id: 789,
            name: "rule 3",
            isHighPriority: false,
            group: "Eke",
            conditions: [{
              type: 34,
              quantity: 5
            }],
            promo: {
              type: 1,
              value: 10
            }
          }
        ],

        promotionNameList: computed(function () {
          return [new this.defaultPromo()].concat(_.map(this.promotion, (item) => {
            return {
              id: item.id,
              name: item.name
            }
          }));
        }),
        getPromotionForGroup: function (group) {
          return _.filter(this.promotion, (promo) => promo.group === group)
        }
      }
    );
  }

  getPromotion = (id, isNonObserve = true) => {
    if (id) {
      let result = _.find(this.promotion, {id: +id});
      if (result) {
        return isNonObserve ? toJS(result) : result;
      }
    }
    return new this.defaultPromo();
  };

  doUpdatePromotion = (data) => {
    let existedPromotion = this.getPromotion(data.id, false);
    if (existedPromotion.id) {
      _.extend(existedPromotion, data);
      return true;
    } else {
      data.id = data.id || Date.now();
      this.promotion.push(data);
      return false;
    }
  }
}

const Promo = window.promotion = new promotion();

export default Promo;