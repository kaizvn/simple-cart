/**
 * Created by kainguyen on 6/21/17.
 */

const model = require(__dirname + '/model');

class ProductController {
  constructor() {

  }

  getProducts(req, res) {
    return res.json(model.productList);
  };
}

module.exports = new ProductController();