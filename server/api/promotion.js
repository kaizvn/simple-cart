/**
 * Created by kainguyen on 6/20/17.
 */


const express = require('express');
const router = express.Router();
//const controller = require();
const controller = {
  model: {},
  getPromotions: (req, res) => {
    console.log('wtf');
    res.sendStatus(200)
  },
  addPromotion: () => console.log('ftw'),
  bindModel: (model) => this.model = model,
};

module.exports = (model) => {
  controller.bindModel(model);
  router.get('/promotions', controller.getPromotions);

  router.post('/promotion', controller.addPromotion);
  router.put('/promotion', controller.addPromotion);
  return router;
};

