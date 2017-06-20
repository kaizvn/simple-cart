/**
 * Created by kainguyen on 6/20/17.
 */


const model = [
  {
    id: 123,
    name: "rule 1",
    group: "Uni",
    isHighPriority: false,
    conditions: [{
      type: 12,
      quantity: 3
    }],
    promo: [{
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
    promo: [{
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
    promo: [{
      type: 1,
      value: 10
    }]
  }
];

module.exports = model;