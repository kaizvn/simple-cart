/**
 * Created by kainguyen on 6/21/17.
 */


const _ = require('lodash');

class PromotionModel {
  constructor() {
    this.promotions = [
      {
        id: 123,
        name: "rule 1",
        group: "Uni",
        isHighPriority: false,
        conditions: [{
          type: 12,
          quantity: 3
        }],
        promos: [{
          type: 3,
          value: 300
        }]
      },
      {
        id: 456,
        name: "rule 2",
        isHighPriority: true,
        group: "Uni",
        conditions: [{
          type: 23,
          quantity: 5
        }],
        promos: [{
          type: 2,
          value: 2
        }]
      },
      {
        id: 789,
        name: "rule 3",
        isHighPriority: true,
        group: "Uni",
        conditions: [{
          type: 34,
          quantity: 7
        },
          {
            type: 23,
            quantity: 9
          }],
        promos: [{
          type: 1,
          value: 10
        }]
      }
    ];
    this.promotionTypes = [
      {
        id: 1,
        name: "Add Package 1",
      }, {
        id: 2,
        name: "Add Package 2",
      }, {
        id: 3,
        name: "Discount price",
      }, {
        id: 4,
        name: "Discount percentage",
      },
    ];
  }

  getExistedPromotion(id) {
    if (!id)
      return null;
    return _.findIndex(this.promotions, {
      id: id
    });
  };

  setPromotion(id, data) {
    let existedPromotionIndex = this.getExistedPromotion(id);
    if (existedPromotionIndex) {
      data.id = id;
      this.promotions[existedPromotionIndex] = data;
      return true;
    } else {
      data.id = Date.now();
      this.promotions.push(data);
      return false;
    }
  }
}


module.exports = new PromotionModel();