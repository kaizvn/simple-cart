/**
 * Created by kainguyen on 6/17/17.
 */

import { extendObservable, computed } from 'mobx';
import * as _ from 'lodash';

class promotion {
  constructor() {
    this.defaultPromo = () => {
      return {
        name: '',
        id: '',
        group: '',
        isHighPriority: false,
        condition: {
          type: '',
          quantity: ''
        },
        promo: {
          type: '',
          value: ''
        }
      }
    };

    extendObservable(this, {
        cart: {},
        promotion: [
          {
            id: 123,
            name: "rule 1",
            group: "Uni",
            isHighPriority: false,
            condition: {
              type: "type1",
              quantity: 3
            },
            promo: {
              type: "discount",
              value: 300
            }
          },
          {
            id: 456,
            name: "rule 2",
            isHighPriority: true,
            group: "Aka",
            condition: {
              type: "type3",
              quantity: 5
            },
            promo: {
              type: "type1",
              value: 2
            }
          },
          {
            id: 789,
            name: "rule 3",
            isHighPriority: false,
            group: "Eke",
            condition: {
              type: "type2",
              quantity: 5
            },
            promo: {
              type: "percentage",
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
        })
      }
    );
  }

  getPromotion = (id, isNonObserve = true) => {
    let input = isNonObserve ? this.promotion.map(value => value) : this.promotion;
    return id ? _.find(input, {id: +id}) : new this.defaultPromo();
  };

  doUpdatePromotion = (data) => {
    let existedPromotion = this.getPromotion(data.id, false);
    if (existedPromotion.id) {
      _.extend(existedPromotion, data);
      console.log('existedPromotion', existedPromotion);
      return true;
    } else {
      data.id = data.id || Date.now();
      console.log('data', data);
      this.promotion.push(data);
      return false;
    }
  }
}

const Promo = window.promotion = new promotion();

export default Promo;