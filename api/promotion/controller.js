/**
 * Created by kainguyen on 6/21/17.
 */


const model = require(__dirname + '/model');
const _ = require('lodash');

class PromotionController {
  constructor() {

  }

  getPromotion(req, res) {
    const id = +req.params['id'];
    if (id)
      res.status(200).json({
        data: _.find(model.promotions, {id: id}) || {}
      });
    else
      res.status(200).json({
        data: model.promotions.map((promo) => {
          return {
            name: promo.name,
            id: promo.id
          }
        })
      });
  }

  getPromotionTypes(req, res) {
    return res.status(200).json({
      status: 200,
      data: model.promotionTypes
    })
  }

  addPromotion(req, res) {
    res.end('working...');
  }

  updatePromotion(req, res) {
    res.end('working...');
  }
}

module.exports = new PromotionController();