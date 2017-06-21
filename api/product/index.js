/**
 * Created by kainguyen on 6/21/17.
 */



const controller = require(__dirname + '/controller');
const _ = require('lodash');


module.exports = (router) => {
  router.route('/product/:id*?')
    .get(controller.getProducts);
};