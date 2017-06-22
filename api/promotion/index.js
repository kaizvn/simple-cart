/**
 * Created by kainguyen on 6/21/17.
 */


/**
 * Created by kainguyen on 6/20/17.
 */

const controller = require(__dirname + '/controller');

module.exports = (router) => {
  router.route('/promotion/:id*?')
    .get(controller.getPromotion)
    .post(controller.updatePromotion)
    .put(controller.addPromotion);

  router.get('/promotion-types', controller.getPromotionTypes);
};

